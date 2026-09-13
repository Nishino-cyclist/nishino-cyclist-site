import process from 'node:process';

const CHANNEL_HANDLE = 'Nishino_cyclist';
const PLAYLIST_ID = 'PLMecUOCOI5uF7283P-gMGNCyZegzPz6IU';
const cache = new Map();
const pending = new Map();
let channelId;

async function youtube(resource, params, apiKey) {
    const url = new URL(`https://www.googleapis.com/youtube/v3/${resource}`);
    url.search = new URLSearchParams(params).toString();
    const response = await fetch(url, {
        headers: { 'X-Goog-Api-Key': apiKey },
        signal: AbortSignal.timeout(10000),
    });
    // 上流の応答・秘密情報をログやクライアントへ出さない。
    if (!response.ok) throw new Error('YouTube unavailable');
    return response.json();
}

async function loadVideos(kind, apiKey) {
    let ids;
    if (kind === 'playlist') {
        const data = await youtube('playlistItems', {
            part: 'snippet,contentDetails', playlistId: PLAYLIST_ID, maxResults: '4',
        }, apiKey);
        ids = (data.items || [])
            .sort((a, b) => new Date(b.contentDetails.videoPublishedAt) - new Date(a.contentDetails.videoPublishedAt))
            .map(item => item.contentDetails.videoId);
    } else {
        if (!channelId) {
            const data = await youtube('channels', { part: 'id', forHandle: CHANNEL_HANDLE }, apiKey);
            channelId = data.items?.[0]?.id;
            if (!channelId) throw new Error('Channel unavailable');
        }
        const data = await youtube('search', {
            part: 'snippet', channelId, order: kind === 'popular' ? 'viewCount' : 'date',
            maxResults: '4', type: 'video',
        }, apiKey);
        ids = (data.items || []).map(item => item.id.videoId);
    }
    if (!ids.length) return [];
    const data = await youtube('videos', {
        part: 'snippet,statistics,contentDetails', id: ids.join(','),
    }, apiKey);
    return ids.map(id => data.items?.find(video => video.id === id)).filter(Boolean).map(video => ({
        id: video.id,
        title: video.snippet.title,
        thumbnail: video.snippet.thumbnails.high.url,
        views: formatViewCount(video.statistics.viewCount),
        date: formatDate(video.snippet.publishedAt),
        duration: formatDuration(video.contentDetails.duration),
        url: `https://www.youtube.com/watch?v=${video.id}`,
    }));
}

export default async function handler(req, res) {
    res.setHeader('Cache-Control', 'no-store');
    if (req.method !== 'GET') {
        res.setHeader('Allow', 'GET');
        return res.status(405).json({ error: 'Method not allowed' });
    }
    const params = new URL(req.url, 'https://localhost').searchParams;
    const kind = params.get('kind') || 'latest';
    // 他のチャンネル等に使える汎用プロキシにはしない。
    if (!['latest', 'popular', 'playlist'].includes(kind) ||
        [...params.keys()].some(key => key !== 'kind') || params.getAll('kind').length > 1) {
        return res.status(400).json({ error: 'Invalid request' });
    }
    const apiKey = process.env.YOUTUBE_API_KEY;
    if (!apiKey) return res.status(503).json({ error: 'Videos unavailable' });
    try {
        let entry = cache.get(kind);
        if (!entry || entry.expires <= Date.now()) {
            if (!pending.has(kind)) {
                pending.set(kind, loadVideos(kind, apiKey).then(videos => {
                    const next = { videos, expires: Date.now() + 3600000 };
                    cache.set(kind, next);
                    return next;
                }).finally(() => pending.delete(kind)));
            }
            entry = await pending.get(kind);
        }
        res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=3600, stale-while-revalidate=300');
        return res.status(200).json({ videos: entry.videos });
    } catch {
        return res.status(502).json({ error: 'Videos unavailable' });
    }
}

function formatViewCount(count) {
    if (!count) return '0回視聴';
    const num = parseInt(count, 10);
    if (num >= 10000) {
        return `${(num / 10000).toFixed(1)}万回視聴`;
    }
    return `${num.toLocaleString()}回視聴`;
}

/**
 * 日付をフォーマット (例: 2026-01-25T... -> "2026年1月25日")
 */
function formatDate(isoDate) {
    const date = new Date(isoDate);
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
}

/**
 * ISO 8601 の動画時間をフォーマット (例: PT1H23M45S -> "1:23:45")
 */
function formatDuration(isoDuration) {
    const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) return '0:00';

    const hours = match[1] ? parseInt(match[1], 10) : 0;
    const minutes = match[2] ? parseInt(match[2], 10) : 0;
    const seconds = match[3] ? parseInt(match[3], 10) : 0;

    if (hours > 0) {
        return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}




