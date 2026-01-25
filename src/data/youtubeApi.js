// ========================================
// YouTube Data API v3 サービス
// チャンネルの動画情報を取得
// ========================================

// YouTube Data API v3 のエンドポイント
const YOUTUBE_API_BASE = 'https://www.googleapis.com/youtube/v3';

// にしのちゃんのチャンネルハンドル名
const CHANNEL_HANDLE = '@Nishino_cyclist';

// キャッシュ用（チャンネルIDを保存）
let cachedChannelId = null;

/**
 * 環境変数からAPIキーを取得
 * .envファイルに VITE_YOUTUBE_API_KEY=your_api_key を設定してください
 */
const getApiKey = () => {
    const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;

    // デバッグ用ログ
    console.log('--- Debug Info ---');
    console.log('VITE_YOUTUBE_API_KEY exists:', !!apiKey);
    console.log('API Key length:', apiKey ? apiKey.length : 0);
    console.log('ENV keys:', Object.keys(import.meta.env).filter(k => k.startsWith('VITE_')));
    console.log('------------------');

    if (!apiKey) {
        console.warn('YouTube API key not found. Using mock data.');
        return null;
    }
    return apiKey;
};

/**
 * ハンドル名からチャンネルIDを取得
 * @returns {Promise<string|null>} チャンネルID
 */
async function getChannelId(apiKey) {
    // キャッシュがあればそれを返す
    if (cachedChannelId) {
        return cachedChannelId;
    }

    try {
        const channelUrl = `${YOUTUBE_API_BASE}/channels?` + new URLSearchParams({
            key: apiKey,
            forHandle: CHANNEL_HANDLE.replace('@', ''),
            part: 'id'
        });

        const response = await fetch(channelUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch channel ID');
        }

        const data = await response.json();
        if (data.items && data.items.length > 0) {
            cachedChannelId = data.items[0].id;
            console.log('Channel ID found:', cachedChannelId);
            return cachedChannelId;
        }

        throw new Error('Channel not found');
    } catch (error) {
        console.error('Error fetching channel ID:', error);
        return null;
    }
}

/**
 * チャンネルの最新動画を取得
 * @param {number} maxResults - 取得する動画数（デフォルト: 4）
 * @returns {Promise<Array>} 動画リスト
 */
export async function fetchLatestVideos(maxResults = 4) {
    const apiKey = getApiKey();

    // APIキーがない場合はモックデータを返す
    if (!apiKey) {
        const { latestVideos } = await import('./videos.js');
        return latestVideos;
    }

    try {
        // チャンネルIDを取得
        const channelId = await getChannelId(apiKey);
        if (!channelId) {
            throw new Error('Could not get channel ID');
        }

        // チャンネルの動画を検索
        const searchUrl = `${YOUTUBE_API_BASE}/search?` + new URLSearchParams({
            key: apiKey,
            channelId: channelId,
            part: 'snippet',
            order: 'date',
            maxResults: maxResults.toString(),
            type: 'video'
        });

        const searchResponse = await fetch(searchUrl);
        if (!searchResponse.ok) {
            throw new Error('Failed to fetch videos');
        }

        const searchData = await searchResponse.json();

        // 動画がない場合
        if (!searchData.items || searchData.items.length === 0) {
            console.warn('No videos found');
            const { latestVideos } = await import('./videos.js');
            return latestVideos;
        }

        // 動画IDを取得して詳細情報を取得
        const videoIds = searchData.items.map(item => item.id.videoId).join(',');

        const videosUrl = `${YOUTUBE_API_BASE}/videos?` + new URLSearchParams({
            key: apiKey,
            id: videoIds,
            part: 'snippet,statistics,contentDetails'
        });

        const videosResponse = await fetch(videosUrl);
        if (!videosResponse.ok) {
            throw new Error('Failed to fetch video details');
        }

        const videosData = await videosResponse.json();

        // データを整形して返す
        return videosData.items.map(video => ({
            id: video.id,
            title: video.snippet.title,
            thumbnail: video.snippet.thumbnails.high.url,
            views: formatViewCount(video.statistics.viewCount),
            date: formatDate(video.snippet.publishedAt),
            duration: formatDuration(video.contentDetails.duration),
            url: `https://www.youtube.com/watch?v=${video.id}`
        }));

    } catch (error) {
        console.error('Error fetching YouTube videos:', error);
        // エラー時はモックデータにフォールバック
        const { latestVideos } = await import('./videos.js');
        return latestVideos;
    }
}

/**
 * 人気動画を取得（再生回数順）
 * @param {number} maxResults - 取得する動画数（デフォルト: 4）
 * @returns {Promise<Array>} 動画リスト
 */
export async function fetchPopularVideos(maxResults = 4) {
    const apiKey = getApiKey();

    if (!apiKey) {
        const { popularVideos } = await import('./videos.js');
        return popularVideos;
    }

    try {
        // チャンネルIDを取得
        const channelId = await getChannelId(apiKey);
        if (!channelId) {
            throw new Error('Could not get channel ID');
        }

        const searchUrl = `${YOUTUBE_API_BASE}/search?` + new URLSearchParams({
            key: apiKey,
            channelId: channelId,
            part: 'snippet',
            order: 'viewCount', // 再生回数順
            maxResults: maxResults.toString(),
            type: 'video'
        });

        const searchResponse = await fetch(searchUrl);
        if (!searchResponse.ok) {
            throw new Error('Failed to fetch videos');
        }

        const searchData = await searchResponse.json();

        // 動画がない場合
        if (!searchData.items || searchData.items.length === 0) {
            console.warn('No popular videos found');
            const { popularVideos } = await import('./videos.js');
            return popularVideos;
        }

        const videoIds = searchData.items.map(item => item.id.videoId).join(',');

        const videosUrl = `${YOUTUBE_API_BASE}/videos?` + new URLSearchParams({
            key: apiKey,
            id: videoIds,
            part: 'snippet,statistics,contentDetails'
        });

        const videosResponse = await fetch(videosUrl);
        if (!videosResponse.ok) {
            throw new Error('Failed to fetch video details');
        }

        const videosData = await videosResponse.json();

        return videosData.items.map(video => ({
            id: video.id,
            title: video.snippet.title,
            thumbnail: video.snippet.thumbnails.high.url,
            views: formatViewCount(video.statistics.viewCount),
            date: formatDate(video.snippet.publishedAt),
            duration: formatDuration(video.contentDetails.duration),
            url: `https://www.youtube.com/watch?v=${video.id}`
        }));

    } catch (error) {
        console.error('Error fetching popular videos:', error);
        const { popularVideos } = await import('./videos.js');
        return popularVideos;
    }
}

/**
 * プレイリストの動画を取得（新しい順）
 * @param {string} playlistId - プレイリストID
 * @param {number} maxResults - 取得する動画数（デフォルト: 4）
 * @returns {Promise<Array>} 動画リスト
 */
export async function fetchPlaylistVideos(playlistId, maxResults = 4) {
    const apiKey = getApiKey();

    if (!apiKey) {
        const { latestVideos } = await import('./videos.js');
        return latestVideos;
    }

    try {
        // プレイリストのアイテムを取得
        const playlistUrl = `${YOUTUBE_API_BASE}/playlistItems?` + new URLSearchParams({
            key: apiKey,
            playlistId: playlistId,
            part: 'snippet,contentDetails',
            maxResults: maxResults.toString()
        });

        const playlistResponse = await fetch(playlistUrl);
        if (!playlistResponse.ok) {
            throw new Error('Failed to fetch playlist');
        }

        const playlistData = await playlistResponse.json();

        // 動画がない場合
        if (!playlistData.items || playlistData.items.length === 0) {
            console.warn('No playlist videos found');
            const { latestVideos } = await import('./videos.js');
            return latestVideos;
        }

        // 動画IDを取得して詳細情報を取得
        const videoIds = playlistData.items.map(item => item.contentDetails.videoId).join(',');

        const videosUrl = `${YOUTUBE_API_BASE}/videos?` + new URLSearchParams({
            key: apiKey,
            id: videoIds,
            part: 'snippet,statistics,contentDetails'
        });

        const videosResponse = await fetch(videosUrl);
        if (!videosResponse.ok) {
            throw new Error('Failed to fetch video details');
        }

        const videosData = await videosResponse.json();

        // プレイリストアイテムから位置情報を取得し、新しい順（= 逆順）でソート
        const itemsWithPosition = playlistData.items.map((item, index) => ({
            videoId: item.contentDetails.videoId,
            position: item.snippet.position,
            publishedAt: item.contentDetails.videoPublishedAt
        }));

        // 新しい順にソート（publishedAtで降順）
        itemsWithPosition.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

        // ソートされた順序で動画データをマッピング
        const sortedVideos = itemsWithPosition
            .map(item => videosData.items.find(v => v.id === item.videoId))
            .filter(Boolean);

        return sortedVideos.map(video => ({
            id: video.id,
            title: video.snippet.title,
            thumbnail: video.snippet.thumbnails.high.url,
            views: formatViewCount(video.statistics.viewCount),
            date: formatDate(video.snippet.publishedAt),
            duration: formatDuration(video.contentDetails.duration),
            url: `https://www.youtube.com/watch?v=${video.id}`
        }));

    } catch (error) {
        console.error('Error fetching playlist videos:', error);
        const { latestVideos } = await import('./videos.js');
        return latestVideos;
    }
}

// ========================================
// ヘルパー関数
// ========================================

/**
 * 再生回数をフォーマット (例: 1234 -> "1,234回視聴")
 */
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

export { CHANNEL_HANDLE };
