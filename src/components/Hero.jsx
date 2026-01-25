// ========================================
// ヒーローセクションコンポーネント
// サイトのメインビジュアル・キャッチコピー
// ========================================

import { Play, ChevronDown } from 'lucide-react';
import { profileInfo } from '../data/videos';
import './Hero.css';

function Hero() {
    return (
        <section id="home" className="hero">
            {/* 背景エフェクト */}
            <div className="hero__bg">
                <div className="hero__bg-gradient"></div>
                <div className="hero__bg-particles"></div>
            </div>

            <div className="hero__container container">
                {/* メインコンテンツ */}
                <div className="hero__content">
                    {/* タグ */}
                    <span className="hero__tag animate-fade-in">🚴‍♀️ 自転車Vtuber</span>

                    {/* タイトル */}
                    <h1 className="hero__title animate-fade-in">
                        <span className="hero__title-name">{profileInfo.name}</span>
                        <span className="hero__title-tagline">{profileInfo.tagline}</span>
                    </h1>

                    {/* 説明文 */}
                    <p className="hero__description animate-fade-in">
                        {profileInfo.description}
                    </p>

                    {/* CTAボタン */}
                    <div className="hero__buttons animate-fade-in">
                        <a
                            href={profileInfo.channelUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary hero__btn"
                        >
                            <Play size={20} />
                            チャンネルを見る
                        </a>
                        <a href="#latest" className="btn btn-secondary hero__btn">
                            最新動画をチェック
                        </a>
                    </div>
                </div>

                {/* ビジュアル要素 - にしのアバター */}
                <div className="hero__visual">
                    <div className="hero__avatar-container animate-float">
                        <div className="hero__avatar-glow"></div>
                        <img
                            src="/nishino-avatar.png"
                            alt="にしの - 自転車Vtuber"
                            className="hero__avatar-image"
                        />
                    </div>
                    {/* イラストレータークレジット */}
                    <p className="hero__illustrator-credit">
                        illustrator：ヒトミン
                    </p>
                </div>
            </div>

            {/* スクロールインジケーター */}
            <a href="#latest" className="hero__scroll-indicator">
                <span>Scroll</span>
                <ChevronDown className="hero__scroll-icon" />
            </a>
        </section>
    );
}

export default Hero;
