import { test } from 'node:test';
import assert from 'node:assert/strict';
import process from 'node:process';
import handler from '../api/youtube.js';
import { fetchLatestVideos } from '../src/data/youtubeApi.js';

function response() {
    return {
        headers: {}, code: 200,
        setHeader(key, value) { this.headers[key] = value; },
        status(code) { this.code = code; return this; },
        json(body) { this.body = body; return this; },
    };
}

test('server keeps credentials private, validates requests, caches, and handles failures', async () => {
    const originalFetch = globalThis.fetch;
    const originalKey = process.env.YOUTUBE_API_KEY;
    const fakeKey = 'test-only-secret';
    let calls = 0;
    try {
        delete process.env.YOUTUBE_API_KEY;
        let res = response();
        await handler({ method: 'GET', url: '/api/youtube' }, res);
        assert.equal(res.code, 503);
        process.env.YOUTUBE_API_KEY = fakeKey;
        globalThis.fetch = async (url, options) => {
            calls++;
            assert.equal(options.headers['X-Goog-Api-Key'], fakeKey);
            assert.ok(!String(url).includes(fakeKey));
            const resource = url.pathname.split('/').at(-1);
            const items = resource === 'channels' ? [{ id: 'channel' }]
                : resource === 'search' ? [{ id: { videoId: 'video' } }]
                : resource === 'playlistItems' ? [{ contentDetails: { videoId: 'video', videoPublishedAt: '2026-01-01' } }]
                : [{ id: 'video', snippet: { title: 'Title', thumbnails: { high: { url: 'https://example.com/image.jpg' } }, publishedAt: '2026-01-01' }, statistics: { viewCount: '123' }, contentDetails: { duration: 'PT2M3S' } }];
            return { ok: true, json: async () => ({ items }) };
        };
        for (const url of ['/api/youtube?kind=invalid', '/api/youtube?channelId=other', '/api/youtube?kind=latest&kind=playlist']) {
            res = response();
            await handler({ method: 'GET', url }, res);
            assert.equal(res.code, 400);
        }
        res = response();
        await handler({ method: 'POST', url: '/api/youtube' }, res);
        assert.equal(res.code, 405);
        assert.equal(calls, 0);
        for (const kind of ['latest', 'playlist']) {
            res = response();
            await handler({ method: 'GET', url: `/api/youtube?kind=${kind}` }, res);
            assert.equal(res.code, 200);
            assert.equal(res.body.videos[0].duration, '2:03');
            assert.ok(!JSON.stringify(res).includes(fakeKey));
            const before = calls;
            await handler({ method: 'GET', url: `/api/youtube?kind=${kind}` }, response());
            assert.equal(calls, before);
        }
        globalThis.fetch = async () => { throw new Error(fakeKey); };
        res = response();
        await handler({ method: 'GET', url: '/api/youtube?kind=popular' }, res);
        assert.equal(res.code, 502);
        assert.equal(res.headers['Cache-Control'], 'no-store');
        assert.ok(!JSON.stringify(res).includes(fakeKey));
        assert.ok((await fetchLatestVideos()).length > 0);
        globalThis.fetch = async url => {
            assert.equal(url, '/api/youtube?kind=latest');
            return { ok: true, json: async () => ({ videos: [{ id: 'fresh' }] }) };
        };
        assert.equal((await fetchLatestVideos())[0].id, 'fresh');
    } finally {
        globalThis.fetch = originalFetch;
        if (originalKey === undefined) delete process.env.YOUTUBE_API_KEY;
        else process.env.YOUTUBE_API_KEY = originalKey;
    }
});
