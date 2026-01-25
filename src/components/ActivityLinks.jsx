// ========================================
// アクティビティリンクセクション
// SNSやプラットフォームへのリンク集
// ========================================

import { Youtube, Twitter, Bike, MessageCircle, ExternalLink, ShoppingBag, Gift, Headphones, FileText } from 'lucide-react';
import { activityLinks } from '../data/videos';
import './ActivityLinks.css';

// アイコンマッピング
const iconMap = {
    youtube: Youtube,
    twitter: Twitter,
    bike: Bike,
    'message-circle': MessageCircle,
    'shopping-bag': ShoppingBag,
    'gift': Gift,
    'headphones': Headphones,
    'file-text': FileText
};

function ActivityLinks() {
    return (
        <section id="links" className="activity-section section">
            <div className="container">
                {/* セクションタイトル */}
                <h2 className="section-title">各種リンク</h2>
                <p className="activity-section__subtitle">
                    にしのの活動をフォローしよう！
                </p>

                {/* リンクグリッド */}
                <div className="activity-grid">
                    {activityLinks.map((link, index) => {
                        const IconComponent = iconMap[link.icon] || ExternalLink;
                        return (
                            <a
                                key={link.id}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="activity-card"
                                style={{
                                    animationDelay: `${index * 0.1}s`,
                                    '--accent-color': link.color
                                }}
                            >
                                {/* アイコン */}
                                <div className="activity-card__icon">
                                    <IconComponent size={32} />
                                </div>

                                {/* 情報 */}
                                <div className="activity-card__info">
                                    <h3 className="activity-card__name">{link.name}</h3>
                                    <p className="activity-card__description">{link.description}</p>
                                </div>

                                {/* 矢印 */}
                                <ExternalLink className="activity-card__arrow" size={20} />
                            </a>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

export default ActivityLinks;
