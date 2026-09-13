import { latestVideos, popularVideos } from './videos.js';

// ブラウザーは同じサイトのAPIだけを呼ぶ。秘密情報は送信しない。
async function fetchVideos(kind, maxResults, fallback) {
    try {
        const response = await fetch(`/api/youtube?kind=${kind}`, {
            signal: AbortSignal.timeout(15000),
        });
        if (!response.ok) throw new Error('Videos unavailable');
        const data = await response.json();
        if (!Array.isArray(data.videos) || !data.videos.length) throw new Error('Videos unavailable');
        return data.videos.slice(0, maxResults);
    } catch {
        return fallback.slice(0, maxResults);
    }
}
export const CHANNEL_HANDLE = '@Nishino_cyclist';
export const FEATURED_PLAYLIST_ID = 'PLMecUOCOI5uF7283P-gMGNCyZegzPz6IU';
export function fetchLatestVideos(maxResults = 4) {
    return fetchVideos('latest', maxResults, latestVideos);
}
export function fetchPopularVideos(maxResults = 4) {
    return fetchVideos('popular', maxResults, popularVideos);
}
export function fetchPlaylistVideos(playlistId, maxResults = 4) {
    if (playlistId !== FEATURED_PLAYLIST_ID) return Promise.resolve(latestVideos.slice(0, maxResults));
    return fetchVideos('playlist', maxResults, latestVideos);
}
