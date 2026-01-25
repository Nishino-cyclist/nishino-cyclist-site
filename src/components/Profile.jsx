// ========================================
// プロフィールセクションコンポーネント
// にしのちゃんの詳細プロフィールを表示
// ========================================

import { Calendar, User, Ruler, Heart, Zap } from 'lucide-react';
import { profileInfo, hashtags } from '../data/videos';
import './Profile.css';

function Profile() {
    const { details } = profileInfo;

    return (
        <section id="profile" className="profile-section section">
            <div className="container">
                {/* セクションタイトル */}
                <h2 className="section-title">👤 プロフィール</h2>

                <div className="profile-container">
                    {/* プロフィールカード */}
                    <div className="profile-card">
                        <div className="profile-card__grid">
                            <div className="profile-item">
                                <Calendar className="profile-item__icon" size={20} />
                                <span className="profile-item__label">誕生日</span>
                                <span className="profile-item__value">{details.birthday}</span>
                            </div>
                            <div className="profile-item">
                                <User className="profile-item__icon" size={20} />
                                <span className="profile-item__label">年齢</span>
                                <span className="profile-item__value">{details.age}</span>
                            </div>
                            <div className="profile-item">
                                <span className="profile-item__icon">🦘</span>
                                <span className="profile-item__label">性別</span>
                                <span className="profile-item__value">{details.species}</span>
                            </div>
                            <div className="profile-item">
                                <Ruler className="profile-item__icon" size={20} />
                                <span className="profile-item__label">身長</span>
                                <span className="profile-item__value">{details.height}</span>
                            </div>
                            <div className="profile-item">
                                <Heart className="profile-item__icon" size={20} />
                                <span className="profile-item__label">好き</span>
                                <span className="profile-item__value">{details.likes}</span>
                            </div>
                            <div className="profile-item">
                                <Zap className="profile-item__icon" size={20} />
                                <span className="profile-item__label">苦手</span>
                                <span className="profile-item__value">{details.dislikes}</span>
                            </div>
                        </div>
                    </div>

                    {/* ハッシュタグ */}
                    <div className="profile-tags">
                        <h3 className="profile-tags__title">ハッシュタグ</h3>
                        <div className="profile-tags__list">
                            <div className="profile-tag">
                                <span className="profile-tag__icon">🎨</span>
                                <span className="profile-tag__label">絵のタグ</span>
                                <span className="profile-tag__value">{hashtags.illustration}</span>
                            </div>
                            <div className="profile-tag">
                                <span className="profile-tag__icon">📺</span>
                                <span className="profile-tag__label">配信タグ</span>
                                <span className="profile-tag__value">{hashtags.stream}</span>
                            </div>
                            <div className="profile-tag">
                                <span className="profile-tag__icon">🚴</span>
                                <span className="profile-tag__label">チームメイト用</span>
                                <span className="profile-tag__value">{hashtags.team.join(' ')}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Profile;
