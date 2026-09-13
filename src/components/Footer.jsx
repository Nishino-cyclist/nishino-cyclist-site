// ========================================
// フッターコンポーネント
// サイトのフッター情報
// ========================================

import { Bike, Heart, Youtube, Twitter } from 'lucide-react';
import './Footer.css';

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="container">
                {/* メインフッター */}
                <div className="footer__main">
                    {/* ロゴ・説明 */}
                    <div className="footer__brand">
                        <a href="#home" className="footer__logo">
                            <Bike className="footer__logo-icon" />
                            <span>にしの</span>
                        </a>
                        <p className="footer__tagline">自転車Vtuber</p>
                    </div>

                    {/* リンク */}
                    <div className="footer__links">
                        <h4 className="footer__links-title">リンク</h4>
                        <ul className="footer__links-list">
                            <li><a href="#home">ホーム</a></li>
                            <li><a href="#latest">最新動画</a></li>
                            <li><a href="#playlist">おすすめ動画</a></li>
                            <li><a href="#links">各種リンク</a></li>
                        </ul>
                    </div>

                    {/* SNS */}
                    <div className="footer__social">
                        <h4 className="footer__links-title">SNS</h4>
                        <div className="footer__social-icons">
                            <a
                                href="https://www.youtube.com/@Nishino_cyclist"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="YouTube"
                                className="footer__social-link"
                            >
                                <Youtube size={24} />
                            </a>
                            <a
                                href="https://twitter.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Twitter"
                                className="footer__social-link"
                            >
                                <Twitter size={24} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* コピーライト */}
                <div className="footer__bottom">
                    <p>
                        © {currentYear} にしの@自転車Vtuber. Made with{' '}
                        <Heart size={14} className="footer__heart" /> for cycling.
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
