// ========================================
// にしの@自転車Vtuber 公式サイト - メインアプリ
// YouTube APIからの動的データ取得に対応
// ========================================

import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Profile from './components/Profile';
import VideoSection from './components/VideoSection';
import ActivityLinks from './components/ActivityLinks';
import Footer from './components/Footer';
import { fetchPlaylistVideos, fetchLatestVideos } from './data/youtubeApi';
import { latestVideos as mockLatest } from './data/videos';
import './index.css';

// にしのちゃんのプレイリストID
const FEATURED_PLAYLIST_ID = 'PLMecUOCOI5uF7283P-gMGNCyZegzPz6IU';

function App() {
  // 動画データの状態管理
  const [playlistVideos, setPlaylistVideos] = useState(mockLatest);
  const [latestVideos, setLatestVideos] = useState(mockLatest);
  const [isLoading, setIsLoading] = useState(true);

  // コンポーネントマウント時にYouTube APIからデータを取得
  useEffect(() => {
    const loadVideos = async () => {
      try {
        setIsLoading(true);

        // 並列でデータ取得
        const [playlist, latest] = await Promise.all([
          fetchPlaylistVideos(FEATURED_PLAYLIST_ID, 4), // プレイリストから4件
          fetchLatestVideos(4)  // 最新動画4件
        ]);

        setPlaylistVideos(playlist);
        setLatestVideos(latest);
      } catch (error) {
        console.error('Failed to load videos:', error);
        // エラー時はモックデータを使用（すでにセットされている）
      } finally {
        setIsLoading(false);
      }
    };

    loadVideos();
  }, []);

  // デバッグ用（あとで消します）
  const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
  const debugInfo = {
    exists: !!apiKey,
    length: apiKey ? apiKey.length : 0,
    firstChar: apiKey ? apiKey.substring(0, 3) + '...' : 'none'
  };

  return (
    <div className="app">
      {/* デバッグバナー */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 9999,
        background: 'rgba(0,0,0,0.8)',
        color: '#fff',
        padding: '10px',
        fontSize: '12px',
        pointerEvents: 'none'
      }}>
        API Key: {debugInfo.exists ? '✅ PRESENT' : '❌ MISSING'}<br />
        Length: {debugInfo.length}<br />
        Value: {debugInfo.firstChar}
      </div>

      {/* ヘッダー（固定ナビゲーション） */}
      <Header />

      {/* メインコンテンツ */}
      <main>
        {/* ヒーローセクション */}
        <Hero />

        {/* プロフィールセクション */}
        <Profile />

        {/* プレイリスト動画セクション（一番上） */}
        <VideoSection
          id="playlist"
          title="🎬 おすすめ動画"
          videos={playlistVideos}
          isLoading={isLoading}
        />

        {/* 最新動画セクション */}
        <VideoSection
          id="latest"
          title="🆕 最新動画"
          videos={latestVideos}
          isLoading={isLoading}
        />

        {/* 各種リンクセクション */}
        <ActivityLinks />
      </main>

      {/* フッター */}
      <Footer />
    </div>
  );
}

export default App;
