// src/components/UserNavbar.jsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, NavLink, useLocation } from 'react-router-dom';
import { Search, ShoppingCart, User, LogOut, X, Menu } from 'lucide-react';
import AuthModal from '../Pages/UserLogin';
import { fetchCart, fetchWishlist } from "../utils/cartWishlist";
import CartDrawer from "../Components/Cartdrawer";
const API_BASEA = import.meta.env.VITE_API_URL;

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Our Shop', to: '/user/product' },
  { label: 'About Us', to: '/user/about' },
  { label: 'Blog', to: '/user/blog' },
  { label: 'Contact Us', to: '/user/contect' },
];

const ANNOUNCEMENTS = [
  '🌿 100% Fresh & Organic Products',
  '🚚 Free Delivery on Orders Above ₹499',
  '🌾 Direct from Farm to Your Doorstep',
  '💚 Trusted by 10,000+ Happy Customers',
  '🎁 Use Code GRAMIN10 for 10% Off Your First Order',
  '⚡ Same Day Delivery Available in Select Areas',
];

const AnnouncementBar = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY < 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div style={{
      background: '#050505',
      color: '#fff',
      height: 36,
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden',
      position: 'relative',
      flexShrink: 0,
    }}>
      <style>{`
        @keyframes marqueeScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .ann-track {
          display: flex;
          align-items: center;
          white-space: nowrap;
          animation: marqueeScroll 28s linear infinite;
          will-change: transform;
        }
        .ann-track:hover { animation-play-state: paused; }
        .ann-item {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          font-weight: 500;
          padding: 0 40px;
          letter-spacing: 0.8px;
          font-family: 'Georgia', 'Times New Roman', serif;
        }
        .ann-sep {
          display: inline-block;
          width: 4px;
          height: 4px;
          background: #c9a84c;
          border-radius: 50%;
          flex-shrink: 0;
        }
      `}</style>
      <div className="ann-track">
        {[...ANNOUNCEMENTS, ...ANNOUNCEMENTS].map((msg, i) => (
          <span key={i} className="ann-item">
            {msg}
            <span className="ann-sep" />
          </span>
        ))}
      </div>
    </div>
  );
};

function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

const UserNavbar = () => {
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem('userToken'));
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();
  const hasFetchedRef = useRef(false);

  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (mobileMenuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (!isLoggedIn) {
      hasFetchedRef.current = false;
      setCartCount(0);
      setWishlistCount(0);
      return;
    }
    if (hasFetchedRef.current) return;
    hasFetchedRef.current = true;
    fetchCart().then(data => {
      const total = (data?.items || []).reduce((sum, i) => sum + (i.quantity || 0), 0);
      setCartCount(total);
    }).catch(() => setCartCount(0));
    fetchWishlist().then(data => {
      setWishlistCount((data?.products || []).length);
    }).catch(() => setWishlistCount(0));
  }, [isLoggedIn]);

  const onCartUpdate = useCallback((e) => {
    const total = (e.detail?.items || []).reduce((sum, i) => sum + (i.quantity || 0), 0);
    setCartCount(total);
  }, []);

  useEffect(() => {
    window.addEventListener("cart-updated", onCartUpdate);
    return () => window.removeEventListener("cart-updated", onCartUpdate);
  }, [onCartUpdate]);

  useEffect(() => {
    const handler = () => { setAuthMode('login'); setShowAuth(true); };
    window.addEventListener("open-login-modal", handler);
    return () => window.removeEventListener("open-login-modal", handler);
  }, []);

  useEffect(() => {
    if (searchOpen) setTimeout(() => searchRef.current?.focus(), 50);
  }, [searchOpen]);

  const handleSearch = useCallback((e) => {
    e?.preventDefault();
    const q = searchQuery.trim();
    if (q) {
      navigate(`/user/product?search=${encodeURIComponent(q)}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  }, [searchQuery, navigate]);

  const handleLogout = useCallback(() => {
    localStorage.removeItem('userToken');
    setIsLoggedIn(false);
    setShowDropdown(false);
    setMobileMenuOpen(false);
    setCartCount(0);
    setWishlistCount(0);
    navigate('/');
  }, [navigate]);

  const handleNavClick = useCallback((link) => {
    setMobileMenuOpen(false);
    if (!link.scrollTo) { navigate(link.to); return; }
    const scrollToSection = () => {
      const el = document.getElementById(link.scrollTo);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    if (location.pathname === link.to) scrollToSection();
    else { navigate(link.to); setTimeout(scrollToSection, 300); }
  }, [navigate, location.pathname]);

  const openLogin = () => { setAuthMode('login'); setShowAuth(true); };
  const handleLoginSuccess = useCallback((token) => {
    localStorage.setItem('userToken', token);
    setIsLoggedIn(true);
    setShowAuth(false);
    navigate('/');
  }, [navigate]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap');

        .zb-navbar {
          font-family: 'Georgia', 'Times New Roman', serif;
          background: #fff;
          border-bottom: 1px solid #e8e0d0;
          position: sticky;
          top: 0;
          z-index: 40;
          box-shadow: 0 1px 8px rgba(0,0,0,0.04);
        }
        .zb-inner {
          display: flex;
          align-items: center;
          height: 80px;
          padding: 0 48px;
          position: relative;
          max-width: 1400px;
          margin: 0 auto;
        }
        .zb-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          flex-shrink: 0;
          text-decoration: none;
        }
        .zb-logo img { height: 75px; width: 100px; }

        /* ── Nav links ── */
        .zb-nav {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
          gap: 36px;
        }
        .zb-link {
          font-size: 14px;
          font-weight: 500;
          color: #1c1c1c;
          text-decoration: none;
          white-space: nowrap;
          letter-spacing: 0.9px;
          padding-bottom: 3px;
          border-bottom: 1.5px solid transparent;
          transition: color 0.2s, border-color 0.2s;
          background: none;
          border-top: none;
          border-left: none;
          border-right: none;
          cursor: pointer;
          font-family: 'Georgia', 'Times New Roman', serif;
          position: relative;
        }
        .zb-link:hover {
          color: #9c7c3e;
          border-bottom-color: #c9a84c;
        }
        .zb-link.active {
          color: #9c7c3e;
          border-bottom-color: #c9a84c;
        }

        /* ── Actions ── */
        .zb-actions {
          margin-left: auto;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .zb-action-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: none;
          background: transparent;
          color: #374151;
          cursor: pointer;
          position: relative;
          transition: color 0.15s, background 0.15s;
        }
        .zb-action-btn:hover {
          color: #9c7c3e;
          background: #fdf8ee;
        }
        .zb-badge {
          position: absolute;
          top: 2px;
          right: 2px;
          background: #9c7c3e;
          color: #fff;
          font-size: 10px;
          font-weight: 700;
          min-width: 16px;
          height: 16px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 3px;
          font-family: 'Georgia', serif;
        }
        .zb-login-btn {
          font-size: 14px;
          font-weight: 500;
          color: #1c1c1c;
          background: none;
          border: 1px solid #c9a84c;
          border-radius: 3px;
          cursor: pointer;
          padding: 7px 18px;
          letter-spacing: 0.9px;
          transition: color 0.2s, background 0.2s, border-color 0.2s;
          font-family: 'Georgia', 'Times New Roman', serif;
        }
        .zb-login-btn:hover {
          color: #fff;
          background: #9c7c3e;
          border-color: #9c7c3e;
        }

        /* ── Search overlay ── */
        .zb-search-overlay {
          position: absolute;
          left: 0; right: 0; top: 0; bottom: 0;
          background: #fff;
          display: flex;
          align-items: center;
          padding: 0 48px;
          z-index: 10;
          gap: 12px;
          border-bottom: 1px solid #e8e0d0;
        }
        .zb-search-input {
          flex: 1;
          height: 42px;
          border: 1.5px solid #e8e0d0;
          border-radius: 3px;
          padding: 0 16px;
          font-size: 15px;
          color: #1c1c1c;
          outline: none;
          font-family: 'Georgia', serif;
          letter-spacing: 0.3px;
          transition: border-color 0.2s;
        }
        .zb-search-input:focus { border-color: #c9a84c; }
        .zb-search-input::placeholder { color: #b0a090; }
        .zb-search-submit {
          height: 42px;
          padding: 0 22px;
          background: linear-gradient(135deg, #7a6c3e, #c9a84c);
          color: #fff;
          border: none;
          border-radius: 3px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          font-family: 'Georgia', serif;
          letter-spacing: 1px;
          transition: opacity 0.2s;
        }
        .zb-search-submit:hover { opacity: 0.88; }
        .zb-search-close {
          background: none;
          border: none;
          cursor: pointer;
          color: #9ca3af;
          display: flex;
          align-items: center;
          padding: 4px;
          transition: color 0.15s;
        }
        .zb-search-close:hover { color: #9c7c3e; }

        /* ── Dropdown ── */
        .zb-dropdown {
          position: absolute;
          right: 48px;
          top: 78px;
          background: #fff;
          border: 1px solid #e8e0d0;
          border-radius: 3px;
          box-shadow: 0 8px 28px rgba(0,0,0,0.10);
          width: 170px;
          padding: 6px 0;
          z-index: 50;
        }
        .zb-dd-item {
          width: 100%;
          text-align: left;
          padding: 10px 18px;
          font-size: 13px;
          border: none;
          background: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: 'Georgia', serif;
          letter-spacing: 0.5px;
          color: #1c1c1c;
          transition: background 0.12s, color 0.12s;
        }
        .zb-dd-item:hover { background: #fdf8ee; color: #9c7c3e; }
        .zb-dd-item.danger { color: #c0392b; }
        .zb-dd-item.danger:hover { background: #fef2f2; color: #c0392b; }

        /* ── Mobile ── */
        .zb-mobile {
          display: none;
          align-items: center;
          justify-content: space-between;
          padding: 0 16px;
          height: 64px;
        }
        @media (max-width: 767px) {
          .zb-inner { display: none; }
          .zb-mobile { display: flex; }
          .zb-dropdown { right: 16px; top: 64px; }
        }

        @keyframes mobileSlide {
          from { transform: translateX(-100%); }
          to   { transform: translateX(0); }
        }

        /* ── Thin gold top border on navbar ── */
        .zb-navbar::before {
          content: '';
          display: block;
          height: 2px;
          background: linear-gradient(90deg, transparent, #c9a84c 30%, #e2c04a 50%, #c9a84c 70%, transparent);
        }
      `}</style>

      <AnnouncementBar />

      <header className="zb-navbar">

        {/* ═══ DESKTOP ═══ */}
        <div className="zb-inner">
          <div className="zb-logo" onClick={() => navigate('/')}>
            <img src="/UserLogo.png" alt="Logo" />
          </div>

          <nav className="zb-nav">
            {NAV_LINKS.map((link) =>
              link.scrollTo ? (
                <button key={link.label} onClick={() => handleNavClick(link)} className="zb-link">
                  {link.label}
                </button>
              ) : (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) => `zb-link${isActive ? ' active' : ''}`}
                >
                  {link.label}
                </NavLink>
              )
            )}
          </nav>

          {searchOpen && (
            <div className="zb-search-overlay">
              <form onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1 }}>
                <input
                  ref={searchRef}
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search products…"
                  className="zb-search-input"
                  autoComplete="off"
                />
                <button type="submit" className="zb-search-submit">Search</button>
              </form>
              <button className="zb-search-close" onClick={() => { setSearchOpen(false); setSearchQuery(''); }}>
                <X size={20} />
              </button>
            </div>
          )}

          <div className="zb-actions">
            <button className="zb-action-btn" onClick={() => setSearchOpen(true)} aria-label="Search">
              <Search size={20} />
            </button>
            {isLoggedIn ? (
              <button className="zb-action-btn" onClick={() => setShowDropdown(p => !p)} aria-label="Account">
                <User size={20} />
              </button>
            ) : (
              <button className="zb-login-btn" onClick={openLogin}>Login</button>
            )}
            <button className="zb-action-btn" onClick={() => setCartOpen(true)} aria-label="Cart">
              <ShoppingCart size={20} />
              {cartCount > 0 && <span className="zb-badge">{cartCount}</span>}
            </button>
          </div>
        </div>

        {showDropdown && isLoggedIn && (
          <div className="zb-dropdown">
            <button className="zb-dd-item" onClick={() => { navigate('/user/userDashboard'); setShowDropdown(false); }}>
              <User size={14} /> Dashboard
            </button>
            <hr style={{ margin: '4px 0', border: 'none', borderTop: '1px solid #f0ede8' }} />
            <button className="zb-dd-item danger" onClick={handleLogout}>
              <LogOut size={14} /> Logout
            </button>
          </div>
        )}

        {/* ═══ MOBILE HEADER ═══ */}
        <div className="zb-mobile">
          <button
            onClick={() => setMobileMenuOpen(p => !p)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#5c4a10', padding: 4 }}
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
            <img src="/UserLogo.png" alt="Logo" style={{ height: 60, width: 75 }} />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <button className="zb-action-btn" onClick={() => setSearchOpen(p => !p)} aria-label="Search">
              <Search size={20} />
            </button>
            {isLoggedIn ? (
              <button className="zb-action-btn" onClick={() => setCartOpen(true)} style={{ position: 'relative' }} aria-label="Cart">
                <ShoppingCart size={20} />
                {cartCount > 0 && <span className="zb-badge">{cartCount}</span>}
              </button>
            ) : (
              <button className="zb-login-btn" onClick={openLogin} style={{ fontSize: 12, padding: '5px 12px' }}>Login</button>
            )}
          </div>
        </div>

        {searchOpen && (
          <div style={{ padding: '0 16px 12px', background: '#fff' }}>
            <form onSubmit={handleSearch} style={{ display: 'flex', gap: 8 }}>
              <input
                ref={searchRef}
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search products…"
                className="zb-search-input"
                style={{ flex: 1, fontSize: 14 }}
              />
              <button type="submit" className="zb-search-submit" style={{ fontSize: 12, padding: '0 14px' }}>Go</button>
            </form>
          </div>
        )}
      </header>

      {/* ═══ MOBILE MENU DRAWER ═══ */}
      {mobileMenuOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 200 }}>
          <div
            style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.45)' }}
            onClick={() => setMobileMenuOpen(false)}
          />
          <div style={{
            position: 'absolute', left: 0, top: 0,
            height: '100%', width: 275,
            background: '#fff',
            animation: 'mobileSlide 0.25s ease',
            display: 'flex', flexDirection: 'column',
            borderRight: '1px solid #e8e0d0',
          }}>
            {/* Drawer Header */}
            <div style={{
              padding: '16px 20px',
              borderBottom: '1px solid #e8e0d0',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              background: 'linear-gradient(135deg, #fdf8ee, #fff)',
            }}>
              <img src="/UserLogo.png" alt="Logo" style={{ height: 40, objectFit: 'contain' }} />
              <button onClick={() => setMobileMenuOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9c7c3e' }}>
                <X size={20} />
              </button>
            </div>

            {/* Gold divider */}
            <div style={{ height: 2, background: 'linear-gradient(90deg, #c9a84c, #e2c04a, #c9a84c)' }} />

            <nav style={{ flex: 1, overflowY: 'auto', padding: '10px 0' }}>
              {NAV_LINKS.map(link =>
                link.scrollTo ? (
                  <button key={link.label} onClick={() => handleNavClick(link)}
                    style={{
                      width: '100%', textAlign: 'left',
                      padding: '13px 24px',
                      border: 'none', background: 'none',
                      fontSize: 14, fontWeight: 500,
                      color: '#1c1c1c', cursor: 'pointer',
                      fontFamily: 'Georgia, serif',
                      letterSpacing: '0.8px',
                      borderBottom: '1px solid #f5f0e8',
                    }}>
                    {link.label}
                  </button>
                ) : (
                  <NavLink key={link.to} to={link.to} onClick={() => setMobileMenuOpen(false)}
                    style={({ isActive }) => ({
                      display: 'block',
                      padding: '13px 24px',
                      fontSize: 14,
                      fontWeight: 500,
                      fontFamily: 'Georgia, serif',
                      letterSpacing: '0.8px',
                      color: isActive ? '#9c7c3e' : '#1c1c1c',
                      textDecoration: 'none',
                      background: isActive ? '#fdf8ee' : 'transparent',
                      borderBottom: '1px solid #f5f0e8',
                      borderLeft: isActive ? '3px solid #c9a84c' : '3px solid transparent',
                    })}>
                    {link.label}
                  </NavLink>
                )
              )}
            </nav>

            {/* Drawer Footer */}
            <div style={{
              padding: '16px 20px',
              borderTop: '2px solid #e8e0d0',
              background: '#fdf8ee',
            }}>
              {isLoggedIn ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <button onClick={() => { navigate('/user/userDashboard'); setMobileMenuOpen(false); }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 8,
                      background: 'none', border: '1px solid #c9a84c',
                      borderRadius: 3, fontSize: 13, cursor: 'pointer',
                      color: '#9c7c3e', fontFamily: 'Georgia, serif',
                      letterSpacing: '0.6px', padding: '9px 16px',
                    }}>
                    <User size={14} /> Dashboard
                  </button>
                  <button onClick={handleLogout}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 8,
                      background: 'none', border: '1px solid #e0c0c0',
                      borderRadius: 3, fontSize: 13, cursor: 'pointer',
                      color: '#c0392b', fontFamily: 'Georgia, serif',
                      letterSpacing: '0.6px', padding: '9px 16px',
                    }}>
                    <LogOut size={14} /> Logout
                  </button>
                </div>
              ) : (
                <button onClick={() => { openLogin(); setMobileMenuOpen(false); }}
                  style={{
                    width: '100%',
                    background: 'linear-gradient(135deg, #7a6c3e, #c9a84c)',
                    color: '#fff', border: 'none', borderRadius: 3,
                    padding: '12px 0', fontSize: 13, fontWeight: 600,
                    cursor: 'pointer', fontFamily: 'Georgia, serif',
                    letterSpacing: '1.5px', textTransform: 'uppercase',
                  }}>
                  Login / Register
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {showDropdown && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 30 }} onClick={() => setShowDropdown(false)} />
      )}

      {showAuth && (
        <AuthModal mode={authMode} onClose={() => setShowAuth(false)} onLoginSuccess={handleLoginSuccess} />
      )}

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
};

export default UserNavbar;