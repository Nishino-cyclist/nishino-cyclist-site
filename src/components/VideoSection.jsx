// ========================================
// ビデオセクションコンポーネント
// 動画一覧をグリッドで表示
// ========================================

import { Play, Clock, Eye } from 'lucide-react';
import './VideoSection.css';

function VideoSection({ title, videos, id }) {
    return (
        <section id={id} className="video-section section">
            <div className="container">
                {/* セクションタイトル */}
                <h2 className="section-title">{title}</h2>

                {/* ビデオグリッド */}
                <div className="video-grid">
                    {videos.map((video, index) => (
                        <a
                            key={video.id}
                            href={video.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="video-card"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            {/* サムネイル */}
                            <div className="video-card__thumbnail">
                                <img src={video.thumbnail} alt={video.title} loading="lazy" />
                                <div className="video-card__overlay">
                                    <Play className="video-card__play-icon" />
                                </div>
                                <span className="video-card__duration">
                                    <Clock size={12} />
                                    {video.duration}
                                </span>
                            </div>

                            {/* 情報 */}
                            <div className="video-card__info">
                                <h3 className="video-card__title">{video.title}</h3>
                                <div className="video-card__meta">
                                    <span className="video-card__views">
                                        <Eye size={14} />
                                        {video.views}
                                    </span>
                                    <span className="video-card__date">{video.date}</span>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>

                {/* もっと見るボタン */}
                <div className="video-section__more">
                    <a
                        href="https://www.youtube.com/@Nishino_cyclist/videos"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-secondary"
                    >
                        すべての動画を見る
                    </a>
                </div>
            </div>
        </section>
    );
}

export default VideoSection;
