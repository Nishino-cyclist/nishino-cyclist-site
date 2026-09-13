// ========================================
// ヘッダーコンポーネント
// グラスモーフィズム効果を持つ固定ナビゲーション
// ========================================

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import './Header.css';

function Header() {
    // スクロール状態を管理
    const [isScrolled, setIsScrolled] = useState(false);
    // モバイルメニューの開閉状態
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // スクロールイベントを監視
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // ナビゲーションリンク
    const navLinks = [
        { href: '#home', label: 'ホーム' },
        { href: '#latest', label: '最新動画' },
        { href: '#playlist', label: 'おすすめ' },
        { href: '#links', label: 'リンク' }
    ];

    return (
        <header className={`header ${isScrolled ? 'header--scrolled' : ''}`}>
            <div className="header__container container">
                {/* ロゴ */}
                <a href="#home" className="header__logo">
                    <img
                        src="/nishino-logo.svg"
                        alt="にしの - 自転車Vtuber"
                        className="header__logo-image"
                    />
                </a>

                {/* デスクトップナビゲーション */}
                <nav className="header__nav">
                    <ul className="header__nav-list">
                        {navLinks.map((link) => (
                            <li key={link.href} className="header__nav-item">
                                <a href={link.href} className="header__nav-link">
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* YouTubeボタン */}
                <a
                    href="https://www.youtube.com/@Nishino_cyclist"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="header__cta btn btn-primary"
                >
                    チャンネルを見る
                </a>

                {/* モバイルメニューボタン */}
                <button
                    className="header__mobile-toggle"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="メニュー"
                    aria-expanded={isMobileMenuOpen}
                    aria-controls="mobile-navigation"
                >
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* モバイルメニュー */}
            <div id="mobile-navigation" inert={!isMobileMenuOpen} className={`header__mobile-menu ${isMobileMenuOpen ? 'header__mobile-menu--open' : ''}`}>
                <nav className="header__mobile-nav">
                    <ul className="header__mobile-nav-list">
                        {navLinks.map((link) => (
                            <li key={link.href} className="header__mobile-nav-item">
                                <a
                                    href={link.href}
                                    className="header__mobile-nav-link"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;
