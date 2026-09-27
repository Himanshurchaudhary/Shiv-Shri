import { useState, useEffect } from "react";
import { openLoginModal } from "../utils/authEvents";
import { addToCart, toggleWishlist, fetchWishlist } from "../utils/cartWishlist";
import { useNavigate } from "react-router-dom";
const API_BASEA = import.meta.env.VITE_API_URL;

// ─── Responsive Hook ──────────────────────────────────────────────────────────
const useResponsive = () => {
  const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return {
    isMobile: width < 600,
    isTablet: width >= 600 && width < 1024,
    isDesktop: width >= 1024,
    width,
  };
};

// ─── Icons ────────────────────────────────────────────────────────────────────
const HeartIcon = ({ filled }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? "#9c7c3e" : "none"} stroke={filled ? "#9c7c3e" : "#bbb"} strokeWidth="2">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const CartIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);

const StarIcon = ({ filled }) => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill={filled ? "#c9a84c" : "#ddd"} stroke={filled ? "#c9a84c" : "#ddd"} strokeWidth="1">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const ChevronLeft = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);
const ChevronRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const StarRating = ({ rating = 4 }) => (
  <span style={{ display: "flex", gap: 1 }}>
    {[1, 2, 3, 4, 5].map(i => <StarIcon key={i} filled={i <= rating} />)}
  </span>
);

// ─── Cart Toast ───────────────────────────────────────────────────────────────
const CartToast = () => {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const handler = (e) => {
      const id = Date.now() + Math.random();
      const { name, image } = e.detail || {};
      setToasts(prev => [...prev, { id, name, image, exiting: false }]);
      setTimeout(() => {
        setToasts(prev => prev.map(t => t.id === id ? { ...t, exiting: true } : t));
      }, 2800);
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
      }, 3200);
    };
    window.addEventListener("cart:added", handler);
    return () => window.removeEventListener("cart:added", handler);
  }, []);

  if (toasts.length === 0) return null;

  return (
    <>
      <style>{`
        @keyframes toastSlideIn { from { opacity:0; transform:translateX(110%); } to { opacity:1; transform:translateX(0); } }
        @keyframes toastSlideOut { from { opacity:1; transform:translateX(0); } to { opacity:0; transform:translateX(110%); } }
        @keyframes toastProgress { from { width:100%; } to { width:0%; } }
      `}</style>
      <div style={{
        position: "fixed", bottom: 24, right: 20, zIndex: 9999,
        display: "flex", flexDirection: "column", gap: 10,
        alignItems: "flex-end", pointerEvents: "none",
      }}>
        {toasts.map(toast => (
          <div key={toast.id} style={{
            display: "flex", alignItems: "center", gap: 12,
            background: "#fff", borderRadius: 4,
            boxShadow: "0 8px 32px rgba(0,0,0,0.14)",
            padding: "10px 16px 10px 10px",
            minWidth: 260, maxWidth: 320,
            border: "1.5px solid #e8e0d0",
            position: "relative", overflow: "hidden",
            animation: toast.exiting
              ? "toastSlideOut 0.38s cubic-bezier(0.4,0,1,1) forwards"
              : "toastSlideIn 0.38s cubic-bezier(0,0,0.2,1) forwards",
            pointerEvents: "auto",
            fontFamily: "Georgia, serif",
          }}>
            <div style={{
              width: 48, height: 48, borderRadius: 2, overflow: "hidden", flexShrink: 0,
              background: "#fdf8ee", display: "flex", alignItems: "center", justifyContent: "center",
              border: "1px solid #e8e0d0",
            }}>
              {toast.image
                ? <img src={toast.image} alt={toast.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                : <span style={{ fontSize: 24 }}>🛒</span>
              }
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
                <span style={{
                  width: 18, height: 18, borderRadius: "50%",
                  background: "linear-gradient(135deg, #7a6c3e, #c9a84c)",
                  display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <polyline points="1.5,5 4,7.5 8.5,2.5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span style={{ fontSize: 12, fontWeight: 700, color: "#9c7c3e", fontFamily: "Georgia, serif" }}>Added to Cart!</span>
              </div>
              <div style={{ fontSize: 11, color: "#555", fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", fontFamily: "Georgia, serif" }}>
                {toast.name || "Product"}
              </div>
            </div>
            <div style={{
              position: "absolute", bottom: 0, left: 0, height: 3,
              background: "linear-gradient(90deg, #7a6c3e, #c9a84c)",
              borderRadius: "0 0 0 4px",
              animation: "toastProgress 3s linear forwards",
            }} />
          </div>
        ))}
      </div>
    </>
  );
};

// ─── Hero Banner ──────────────────────────────────────────────────────────────
const HeroBanner = () => {
  const { isMobile, isTablet } = useResponsive();
  const [slide, setSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await fetch(`${API_BASEA}/api/banner/list`);
        const data = await res.json();
        if (data.success) setSlides(data.data.filter(b => b.status === "Active"));
      } catch (err) {
        console.error("Banner fetch failed:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBanners();
  }, []);

  const goTo = (i) => {
    if (i === slide || isTransitioning || slides.length === 0) return;
    setIsTransitioning(true);
    setTimeout(() => { setSlide(i); setIsTransitioning(false); }, 300);
  };

  useEffect(() => {
    if (slides.length === 0) return;
    const t = setInterval(() => goTo((slide + 1) % slides.length), 4500);
    return () => clearInterval(t);
  }, [slide, slides.length]);

  const aspectPadding = isMobile ? "43.75%" : "41.67%";

  if (loading) return (
    <div style={{
      width: "100%", paddingTop: aspectPadding, position: "relative",
      borderRadius: isMobile ? 4 : 6, background: "#e8e0d0",
      marginBottom: isMobile ? 32 : isTablet ? 48 : 80,
    }} />
  );

  if (slides.length === 0) return null;

  return (
    <div style={{
      position: "relative", width: "100%", paddingTop: aspectPadding,
      borderRadius: isMobile ? 4 : 6, overflow: "hidden",
      marginBottom: isMobile ? 32 : isTablet ? 48 : 80,
      boxShadow: "0 4px 24px rgba(0,0,0,0.14)",
      border: "1px solid #e8e0d0",
    }}>
      <img
        key={slide}
        src={slides[slide].bannerImage}
        alt={slides[slide].title}
        style={{
          position: "absolute", inset: 0, width: "100%", height: "100%",
          objectFit: "cover", objectPosition: "center center",
          opacity: isTransitioning ? 0 : 1, transition: "opacity 0.4s ease",
        }}
      />
      {/* Dots */}
      <div style={{
        position: "absolute", bottom: isMobile ? 10 : 20,
        left: 0, right: 0, display: "flex", justifyContent: "center", gap: 5,
      }}>
        {slides.map((_, i) => (
          <button key={i} onClick={() => goTo(i)} style={{
            width: i === slide ? 22 : 8, height: 8, borderRadius: 4,
            background: i === slide ? "#c9a84c" : "rgba(255,255,255,0.55)",
            border: "none", cursor: "pointer", transition: "width 0.3s", padding: 0,
          }} />
        ))}
      </div>
      {/* Prev */}
      <button onClick={() => goTo((slide - 1 + slides.length) % slides.length)} style={{
        position: "absolute", top: "50%", left: isMobile ? 6 : 12,
        transform: "translateY(-50%)", width: isMobile ? 28 : 38, height: isMobile ? 28 : 38,
        borderRadius: "50%", background: "rgba(255,255,255,0.3)",
        border: "1px solid rgba(201,168,76,0.5)", color: "#fff", cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center",
        backdropFilter: "blur(4px)",
      }}>
        <ChevronLeft />
      </button>
      {/* Next */}
      <button onClick={() => goTo((slide + 1) % slides.length)} style={{
        position: "absolute", top: "50%", right: isMobile ? 6 : 12,
        transform: "translateY(-50%)", width: isMobile ? 28 : 38, height: isMobile ? 28 : 38,
        borderRadius: "50%", background: "rgba(255,255,255,0.3)",
        border: "1px solid rgba(201,168,76,0.5)", color: "#fff", cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center",
        backdropFilter: "blur(4px)",
      }}>
        <ChevronRight />
      </button>
    </div>
  );
};

// ─── Section Header ───────────────────────────────────────────────────────────
const SectionHeader = ({ title }) => {
  const { isMobile } = useResponsive();
  return (
    <div style={{ textAlign: "center", marginBottom: isMobile ? 20 : 36 }}>
      <h2 style={{
        fontSize: isMobile ? 26 : 40,
        fontWeight: 700,
        color: "#1c1c1c",
        margin: "0 0 12px",
        fontFamily: "Georgia, 'Times New Roman', serif",
        letterSpacing: -0.5,
        lineHeight: 1.15,
      }}>
        {title}
      </h2>
      <div style={{
        width: 60, height: 3,
        background: "linear-gradient(90deg, #b8960c, #e2c04a, #b8960c)",
        borderRadius: 2, margin: "0 auto",
      }} />
    </div>
  );
};

const categoryEmojis = ["🥦", "🐟", "🍎", "🥩", "🧀", "🍞", "🌶️", "🫒", "🥚"];

// ─── Feature Categories ───────────────────────────────────────────────────────
const FeatureCategories = ({ categories, loading, products }) => {
  const navigate = useNavigate();
  const { isMobile, isTablet } = useResponsive();
  const [start, setStart] = useState(0);

  const visible = isMobile ? 1 : isTablet ? 2 : 3;
  const total = categories.length;

  const getCount = (catId) =>
    products.filter(p => {
      const cid = typeof p.category === "object" ? p.category?.id : p.category;
      return cid === catId;
    }).length;

  const handleCategoryClick = (catId) => navigate(`/user/product?categories=${catId}`);
  const visibleCats = categories.slice(start, start + visible);
  const middleIdx = Math.floor(visible / 2);

  return (
    <section id="feature-categories" style={{
      marginBottom: isMobile ? 40 : isTablet ? 60 : 100,
      scrollMarginTop: 80,
    }}>
      {/* Section Header */}
      <div style={{ textAlign: "center", marginBottom: isMobile ? 28 : 48 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, marginBottom: 14 }}>
          <div style={{ flex: 1, height: 1, background: "linear-gradient(to right, transparent, #d4b896)" }} />
          <span style={{
            fontSize: isMobile ? 10 : 11, fontWeight: 700, color: "#9c7c3e",
            letterSpacing: 4, textTransform: "uppercase", fontFamily: "Georgia, serif",
          }}>Our Collections</span>
          <div style={{ flex: 1, height: 1, background: "linear-gradient(to left, transparent, #d4b896)" }} />
        </div>
        <h2 style={{
          fontSize: isMobile ? 28 : 42, fontWeight: 700, color: "#1c1c1c",
          margin: "0 0 16px", fontFamily: "Georgia, 'Times New Roman', serif",
          letterSpacing: -0.5, lineHeight: 1.15,
        }}>
          Feature Category
        </h2>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          <div style={{ width: 30, height: 1, background: "#c9a84c" }} />
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#c9a84c" }} />
          <div style={{ width: 40, height: 2, background: "#c9a84c" }} />
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#c9a84c" }} />
          <div style={{ width: 30, height: 1, background: "#c9a84c" }} />
        </div>
      </div>

      {/* Nav arrows */}
      {total > visible && (
        <div style={{ display: "flex", justifyContent: "center", gap: 10, marginBottom: 24 }}>
          {[
            { fn: () => setStart(s => Math.max(0, s - 1)), icon: <ChevronLeft /> },
            { fn: () => setStart(s => Math.min(Math.max(0, total - visible), s + 1)), icon: <ChevronRight /> },
          ].map((btn, i) => (
            <button key={i} onClick={btn.fn} style={{
              width: 38, height: 38, borderRadius: "50%",
              border: "1px solid #c9a84c", background: "#fff",
              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
              color: "#9c7c3e", transition: "all 0.2s", boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = "#c9a84c"; e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = "#9c7c3e"; }}
            >{btn.icon}</button>
          ))}
        </div>
      )}

      {/* Grid */}
      {loading ? (
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${visible}, 1fr)`, gap: isMobile ? 12 : 22 }}>
          {[...Array(visible)].map((_, i) => (
            <div key={i} style={{ height: isMobile ? 280 : 440, borderRadius: 2, background: "#f0ede8", animation: "pulse 1.4s ease-in-out infinite" }} />
          ))}
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${visible}, 1fr)`, gap: isMobile ? 12 : 22, alignItems: "end" }}>
          {visibleCats.map((cat, i) => {
            const img = cat.thumbnail || cat.image;
            const count = getCount(cat.id);
            const isMiddle = i === middleIdx && visible === 3;

            return (
              <div key={cat.id || i} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                {/* Card */}
                <div
                  onClick={() => handleCategoryClick(cat.id)}
                  style={{
                    position: "relative", width: "100%", height: isMobile ? 280 : 440,
                    cursor: "pointer", overflow: "hidden", borderRadius: 2,
                    boxShadow: "0 4px 24px rgba(0,0,0,0.10)", background: "#f5f0e8",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.querySelector("img") && (e.currentTarget.querySelector("img").style.transform = "scale(1.06)");
                    e.currentTarget.querySelector(".overlay-dark").style.opacity = "0.45";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.querySelector("img") && (e.currentTarget.querySelector("img").style.transform = "scale(1)");
                    e.currentTarget.querySelector(".overlay-dark").style.opacity = "0.18";
                  }}
                >
                  {img ? (
                    <img src={img} alt={cat.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.55s cubic-bezier(0.25,0.46,0.45,0.94)" }} onError={e => { e.target.style.display = "none"; }} />
                  ) : (
                    <div style={{ width: "100%", height: "100%", background: "linear-gradient(145deg, #f5f0e8 0%, #e2d5c0 100%)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: isMobile ? 64 : 90 }}>
                      {categoryEmojis[i % categoryEmojis.length]}
                    </div>
                  )}
                  <div className="overlay-dark" style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.18)", transition: "opacity 0.3s" }} />
                  <div style={{ position: "absolute", inset: 10, border: "1px solid rgba(201,168,76,0.35)", borderRadius: 1, pointerEvents: "none" }} />
                  {/* Badge */}
                  <div style={{
                    position: "absolute", top: isMobile ? 18 : 22, right: isMobile ? 18 : 22,
                    background: "rgba(140,110,20,0.88)", color: "#fff",
                    fontSize: isMobile ? 11 : 12, fontWeight: 700,
                    padding: isMobile ? "4px 12px" : "5px 16px", borderRadius: 3,
                    letterSpacing: 0.5, fontFamily: "Georgia, serif",
                    backdropFilter: "blur(4px)", boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                  }}>
                    {count} Item
                  </div>
                </div>

                {/* Name below */}
                {!isMiddle && (
                  <div style={{ marginTop: isMobile ? 14 : 20, textAlign: "center" }}>
                    <div style={{ fontSize: isMobile ? 16 : 22, fontWeight: 700, color: "#1c1c1c", fontFamily: "Georgia, 'Times New Roman', serif", letterSpacing: 0.2, marginBottom: 6 }}>
                      {cat.name}
                    </div>
                    <div style={{ width: 30, height: 2, background: "#c9a84c", margin: "0 auto", borderRadius: 1 }} />
                  </div>
                )}

                {/* Middle card CTA */}
                {isMiddle && (
                  <div style={{ marginTop: isMobile ? 14 : 20, width: "100%", textAlign: "center" }}>
                    <div style={{ fontSize: isMobile ? 16 : 22, fontWeight: 700, color: "#1c1c1c", fontFamily: "Georgia, 'Times New Roman', serif", marginBottom: 14 }}>
                      {cat.name}
                    </div>
                    <button
                      onClick={() => handleCategoryClick(cat.id)}
                      style={{
                        width: "100%", padding: isMobile ? "12px 0" : "15px 0",
                        background: "linear-gradient(135deg, #5c4a10, #9c7c2e, #c9a84c)",
                        color: "#fff", border: "none", borderRadius: 40,
                        fontSize: isMobile ? 11 : 12, fontWeight: 700, cursor: "pointer",
                        letterSpacing: 2.5, textTransform: "uppercase", fontFamily: "Georgia, serif",
                        transition: "opacity 0.25s, transform 0.25s",
                        boxShadow: "0 6px 20px rgba(140,110,20,0.28)",
                      }}
                      onMouseEnter={e => { e.currentTarget.style.opacity = "0.88"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                      onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}
                    >
                      Shop The Collection
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

// ─── Promo Banners ────────────────────────────────────────────────────────────
const PromoBanners = () => {
  const { isMobile, isTablet } = useResponsive();
  const [ads, setAds] = useState([]);

  useEffect(() => {
    fetch(`${API_BASEA}/api/ad/`)
      .then(r => r.json())
      .then(data => setAds((data.ads || []).filter(a => a.isActive)))
      .catch(() => { });
  }, []);

  const bannerHeight = isMobile ? 110 : isTablet ? 220 : 300;

  const fallbacks = [
    { bg: "#fdf8ee", tagline: "Fresh & Healthy", heading: "Farm Fresh\nVegetables", sub: "Delivered right to your doorstep", badge: "20% OFF", badgeBg: "#9c7c3e", emoji: "🥦", accent: "#9c7c3e" },
    { bg: "#fdf6ee", tagline: "Limited Time Offer", heading: "Daily\nGrocery Sale", sub: "Best prices on daily essentials", badge: "SAVE 50%", badgeBg: "#b8960c", emoji: "🛒", accent: "#b8960c" },
  ];

  const items = ads.length > 0 ? ads.slice(0, 2) : null;

  return (
    <div style={{
      display: "grid", gridTemplateColumns: "1fr 1fr",
      gap: isMobile ? 8 : 16,
      marginBottom: isMobile ? 32 : isTablet ? 48 : 80,
    }}>
      {items
        ? items.map((ad, i) => (
          <div key={ad.id || i} style={{
            height: bannerHeight, borderRadius: 2, overflow: "hidden",
            boxShadow: "0 2px 10px rgba(0,0,0,0.08)", background: "#f5f0e8",
            cursor: "pointer", transition: "transform 0.2s",
            border: "1px solid #e8e0d0",
          }}
            onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-2px)")}
            onMouseLeave={e => (e.currentTarget.style.transform = "translateY(0)")}
          >
            <img src={ad.image} alt={ad.title || "Promo"} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          </div>
        ))
        : fallbacks.map((item, i) => (
          <div key={i} style={{
            height: bannerHeight, background: item.bg, borderRadius: 2, overflow: "hidden",
            boxShadow: "0 2px 10px rgba(0,0,0,0.07)", border: "1px solid #e8e0d0",
            cursor: "pointer", display: "flex", alignItems: "stretch", transition: "transform 0.2s",
          }}
            onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-2px)")}
            onMouseLeave={e => (e.currentTarget.style.transform = "translateY(0)")}
          >
            <div style={{ flex: "0 0 38%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: isMobile ? 36 : 80, userSelect: "none" }}>
              {item.emoji}
            </div>
            <div style={{ width: 1, background: "rgba(201,168,76,0.2)", margin: "16px 0" }} />
            <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: isMobile ? "10px 8px" : "24px 28px", overflow: "hidden" }}>
              <div style={{ fontSize: isMobile ? 8 : 11, fontWeight: 700, color: item.accent, textTransform: "uppercase", letterSpacing: isMobile ? 0.5 : 1.2, marginBottom: isMobile ? 3 : 6, fontFamily: "Georgia, serif" }}>
                {item.tagline}
              </div>
              <div style={{ fontSize: isMobile ? 12 : 26, fontWeight: 700, color: "#1c1c1c", lineHeight: 1.15, marginBottom: isMobile ? 4 : 8, whiteSpace: "pre-line", fontFamily: "Georgia, serif" }}>
                {item.heading}
              </div>
              <div style={{ fontSize: isMobile ? 8 : 12, color: "#888", marginBottom: isMobile ? 8 : 20, lineHeight: 1.4, display: isMobile ? "none" : "block", fontFamily: "Georgia, serif" }}>
                {item.sub}
              </div>
              <span style={{
                display: "inline-block", background: item.badgeBg, color: "#fff",
                fontWeight: 700, fontSize: isMobile ? 9 : 11,
                padding: isMobile ? "3px 8px" : "5px 14px", borderRadius: 2,
                alignSelf: "flex-start", letterSpacing: 1, fontFamily: "Georgia, serif",
              }}>
                {item.badge}
              </span>
            </div>
          </div>
        ))
      }
    </div>
  );
};




// ─── Latest Blogs ─────────────────────────────────────────────────────────────
// ─── Latest Blog Detail (inline) ─────────────────────────────────────────────


// ─── Latest Blogs ─────────────────────────────────────────────────────────────
const LatestBlogs = () => {
  const navigate = useNavigate();
  const { isMobile, isTablet } = useResponsive();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    fetch(`${API_BASEA}/api/blog/all`)
      .then(r => r.json())
      .then(data => {
        const all = data.blogs || data.data || [];
        setBlogs(all.filter(b => b.isActive !== false).slice(0, 3));
      })
      .catch(() => { })
      .finally(() => setLoading(false));
  }, []);

  function formatDate(d) {
    if (!d) return "";
    try { return new Date(d).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }); }
    catch { return d; }
  }

  function stripHtml(str) {
    return (str || "").replace(/<[^>]+>/g, "");
  }

  // ── Detail view ──
  

  const cols = isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(3, 1fr)";

  if (!loading && blogs.length === 0) return null;

  return (
    <section id="latest-blogs" style={{ marginBottom: isMobile ? 40 : 80, fontFamily: "Georgia, 'Times New Roman', serif" }}>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: isMobile ? 28 : 48 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, marginBottom: 14 }}>
          <div style={{ flex: 1, height: 1, background: "linear-gradient(to right, transparent, #d4b896)" }} />
          <span style={{ fontSize: isMobile ? 10 : 11, fontWeight: 700, color: "#9c7c3e", letterSpacing: 4, textTransform: "uppercase", fontFamily: "Georgia, serif" }}>
            From Our Journal
          </span>
          <div style={{ flex: 1, height: 1, background: "linear-gradient(to left, transparent, #d4b896)" }} />
        </div>
        <h2 style={{ fontSize: isMobile ? 28 : 42, fontWeight: 700, color: "#1c1c1c", margin: "0 0 16px", fontFamily: "Georgia, 'Times New Roman', serif", letterSpacing: -0.5, lineHeight: 1.15 }}>
          Latest From Blog
        </h2>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          <div style={{ width: 30, height: 1, background: "#c9a84c" }} />
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#c9a84c" }} />
          <div style={{ width: 40, height: 2, background: "#c9a84c" }} />
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#c9a84c" }} />
          <div style={{ width: 30, height: 1, background: "#c9a84c" }} />
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div style={{ display: "grid", gridTemplateColumns: cols, gap: 20 }}>
          {[...Array(3)].map((_, i) => (
            <div key={i} style={{ height: 360, background: "#f5f0e8", borderRadius: 2, animation: "pulse 1.4s ease-in-out infinite" }} />
          ))}
        </div>
      ) : (
        <>
          <div style={{ display: "grid", gridTemplateColumns: cols, gap: isMobile ? 16 : 24 }}>
            {blogs.map((blog, i) => {
              const excerpt = stripHtml(blog.description || "");
              const isHovered = hovered === i;

              return (
                <article
                  key={blog.id || i}
                  onClick={() => navigate(`/user/blog/${blog.id}`)}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    background: "#fff", border: "1px solid #e8e0d0",
                    borderRadius: 2, overflow: "hidden", cursor: "pointer",
                    display: "flex", flexDirection: "column",
                    transition: "box-shadow 0.25s, transform 0.25s",
                    boxShadow: isHovered ? "0 8px 28px rgba(0,0,0,0.13)" : "0 2px 8px rgba(0,0,0,0.06)",
                    transform: isHovered ? "translateY(-4px)" : "translateY(0)",
                  }}
                >
                  {/* Image */}
                  <div style={{ position: "relative", height: isMobile ? 200 : 220, overflow: "hidden", background: "#f5f0e8", flexShrink: 0 }}>
                    {blog.thumbnail ? (
                      <img
                        src={blog.thumbnail}
                        alt={blog.title}
                        style={{
                          width: "100%", height: "100%", objectFit: "cover", display: "block",
                          transition: "transform 0.5s ease",
                          transform: isHovered ? "scale(1.06)" : "scale(1)",
                        }}
                      />
                    ) : (
                      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 48, background: "#fdf8ee" }}>
                        📰
                      </div>
                    )}
                    {/* Date badge */}
                    <div style={{
                      position: "absolute", top: 14, left: 14,
                      background: "linear-gradient(135deg, #7a6c3e, #c9a84c)",
                      color: "#fff", fontSize: 11, fontWeight: 700,
                      padding: "5px 12px", borderRadius: 2,
                      fontFamily: "Georgia, serif", letterSpacing: 0.5,
                      boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                    }}>
                      {formatDate(blog.createdAt)}
                    </div>
                    {/* Category badge */}
                    {blog.category && (
                      <div style={{
                        position: "absolute", bottom: 14, left: 14,
                        background: "rgba(255,255,255,0.92)", color: "#9c7c3e",
                        fontSize: 10, fontWeight: 700, padding: "3px 10px",
                        borderRadius: 2, fontFamily: "Georgia, serif",
                        letterSpacing: 0.8, textTransform: "uppercase",
                        border: "1px solid rgba(201,168,76,0.3)",
                      }}>
                        {typeof blog.category === "object" ? blog.category.name : blog.category}
                      </div>
                    )}
                  </div>

                  {/* Body */}
                  <div style={{ padding: isMobile ? "16px 16px 18px" : "20px 22px 24px", display: "flex", flexDirection: "column", flex: 1 }}>
                    <h3 style={{
                      fontSize: isMobile ? 16 : 18, fontWeight: 700,
                      color: isHovered ? "#9c7c3e" : "#1c1c1c",
                      margin: "0 0 10px", lineHeight: 1.35,
                      fontFamily: "Georgia, serif",
                      display: "-webkit-box", WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical", overflow: "hidden",
                      transition: "color 0.2s",
                    }}>
                      {blog.title}
                    </h3>
                    {/* Gold divider */}
                    <div style={{ width: isHovered ? 50 : 30, height: 2, background: "#c9a84c", marginBottom: 12, borderRadius: 1, transition: "width 0.3s" }} />
                    {/* Excerpt */}
                    <p style={{
                      fontSize: isMobile ? 12 : 13, color: "#666",
                      lineHeight: 1.7, margin: "0 0 16px",
                      fontFamily: "Georgia, serif", flex: 1,
                      display: "-webkit-box", WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical", overflow: "hidden",
                    }}>
                      {excerpt.slice(0, 150)}{excerpt.length > 150 ? "…" : ""}
                    </p>
                    {/* Footer */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 12, borderTop: "1px solid #f0ebe0" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg, #7a6c3e, #c9a84c)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <span style={{ fontSize: 12, color: "#fff" }}>✍</span>
                        </div>
                        <span style={{ fontSize: 11, color: "#999", fontFamily: "Georgia, serif" }}>
                          {typeof blog.author === "object" ? blog.author?.name : (blog.author || "Admin")}
                        </span>
                      </div>
                      {/* Read More button */}
                      <span
                        onClick={e => {
                          e.stopPropagation();
                          navigate(`/user/blog/${blog.id}`);
                        }}
                        style={{
                          fontSize: 11, fontWeight: 700, color: "#9c7c3e",
                          letterSpacing: 1, textTransform: "uppercase",
                          fontFamily: "Georgia, serif",
                          borderBottom: "1px solid #c9a84c",
                          paddingBottom: 1, cursor: "pointer",
                          transition: "color 0.2s",
                        }}
                        onMouseEnter={e => e.currentTarget.style.color = "#7a6c3e"}
                        onMouseLeave={e => e.currentTarget.style.color = "#9c7c3e"}
                      >
                        Read More →
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* View All button → blog page navigate */}
          <div style={{ textAlign: "center", marginTop: 32 }}>
            <button
              onClick={() => navigate("/user/blog")}
              style={{
                padding: "12px 48px", background: "#fff",
                border: "1.5px solid #c9a84c", color: "#7a6c3e",
                borderRadius: 2, fontWeight: 600, fontSize: 13,
                cursor: "pointer", fontFamily: "Georgia, serif",
                letterSpacing: 1.5, textTransform: "uppercase", transition: "all 0.2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "linear-gradient(135deg, #7a6c3e, #c9a84c)"; e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = "#7a6c3e"; }}
            >
              View All Posts
            </button>
          </div>
        </>
      )}
    </section>
  );
};
// ─── Product Card ─────────────────────────────────────────────────────────────
const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { isMobile } = useResponsive();
  const [wished, setWished] = useState(false);
  const [added, setAdded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hovered, setHovered] = useState(false);

  const oldPrice = Number(product.price || product.buyingPrice || 0);
  const price = Number(product.oldPrice || product.sellingPrice);
  const name = product.name || product.title || "Product";
  const unit = product.unit || product.weight || "1 KG";
  const image = product.image || product.thumbnail || product.images?.[0];
  const stock = product.stockQuantity ?? 0;
  const isOutOfStock = stock === 0;
  const isLowStock = stock > 0 && stock <= 10;

  const isLoggedIn = () => !!localStorage.getItem("userToken");

  useEffect(() => {
    if (!isLoggedIn()) return;
    fetchWishlist()
      .then(data => {
        const ids = (data.products || []).map(p => p.id || p);
        setWished(ids.includes(product.id));
      })
      .catch(() => { });
  }, [product.id]);

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    if (!isLoggedIn()) { openLoginModal(); return; }
    if (loading) return;
    setLoading(true);
    try {
      await addToCart(product.id);
      setAdded(true);
      setTimeout(() => setAdded(false), 1800);
      window.dispatchEvent(new CustomEvent("cart:added", { detail: { name, image } }));
    } catch {
      alert("Failed to add to cart. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleWishlist = async (e) => {
    e.stopPropagation();
    if (!isLoggedIn()) { openLoginModal(); return; }
    try {
      await toggleWishlist(product.id, wished);
      setWished(w => !w);
    } catch {
      alert("Failed to update wishlist.");
    }
  };

  const imgHeight = isMobile ? 160 : 220;

  return (
    <div
      onClick={() => product.slug && navigate(`/products/${product.slug}`)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#fff", borderRadius: 0, border: "1px solid #e8e0d0",
        cursor: "pointer", transition: "box-shadow 0.25s", display: "flex",
        flexDirection: "column", overflow: "hidden",
        boxShadow: hovered ? "0 6px 24px rgba(0,0,0,0.12)" : "0 1px 4px rgba(0,0,0,0.06)",
        fontFamily: "Georgia, 'Times New Roman', serif",
      }}
    >
      {/* Image */}
      <div style={{ position: "relative", height: imgHeight, background: "#f9f6f0", overflow: "hidden" }}>
        {image
          ? <img src={image} alt={name} style={{
            width: "100%", height: "100%", objectFit: "contain",
            transition: "transform 0.45s ease",
            transform: hovered ? "scale(1.06)" : "scale(1)",
            padding: "8px",
          }} />
          : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 48 }}>🛒</div>
        }

        {/* Discount badge */}
        {oldPrice > price && (
          <span style={{
            position: "absolute", top: 10, left: 10,
            background: "#9c7c3e", color: "#fff", fontSize: 10, fontWeight: 700,
            padding: "3px 8px", borderRadius: 2, fontFamily: "Georgia, serif", letterSpacing: 0.5,
          }}>
            {Math.round((1 - price / oldPrice) * 100)}% OFF
          </span>
        )}

        {/* Out of stock */}
        {isOutOfStock && (
          <div style={{
            position: "absolute", inset: 0, background: "rgba(255,255,255,0.75)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ background: "#c0392b", color: "#fff", fontSize: 11, fontWeight: 700, padding: "5px 14px", borderRadius: 2, letterSpacing: 1, fontFamily: "Georgia, serif" }}>
              OUT OF STOCK
            </span>
          </div>
        )}

        {/* Hover icons */}
        <div style={{
          position: "absolute", top: 10, right: 10,
          display: "flex", flexDirection: "column", gap: 6,
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateX(0)" : "translateX(10px)",
          transition: "opacity 0.25s, transform 0.25s",
        }}>
          <button
            onClick={e => { e.stopPropagation(); product.slug && navigate(`/products/${product.slug}`); }}
            style={{
              width: 34, height: 34, borderRadius: "50%", background: "#fff",
              border: "1px solid #e8e0d0", display: "flex", alignItems: "center",
              justifyContent: "center", cursor: "pointer", boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              transition: "background 0.2s, color 0.2s", color: "#555",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "#9c7c3e"; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = "#555"; }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </button>
          <button
            onClick={handleWishlist}
            style={{
              width: 34, height: 34, borderRadius: "50%",
              background: wished ? "#9c7c3e" : "#fff",
              border: "1px solid #e8e0d0", display: "flex", alignItems: "center",
              justifyContent: "center", cursor: "pointer", boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              transition: "background 0.2s",
            }}
            onMouseEnter={e => { if (!wished) e.currentTarget.style.background = "#fdf8ee"; }}
            onMouseLeave={e => { if (!wished) e.currentTarget.style.background = "#fff"; }}
          >
            <HeartIcon filled={wished} />
          </button>
        </div>
      </div>

      {/* Info */}
      <div style={{ padding: isMobile ? "10px 10px 12px" : "14px 14px 16px", display: "flex", flexDirection: "column", flex: 1 }}>
        {/* Category */}
        <div style={{ fontSize: 10, color: "#9c7c3e", fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6, fontFamily: "Georgia, serif" }}>
          {typeof product.category === "object" ? (product.category?.name || "") : (product.category || "")}
        </div>

        {/* Name */}
        <div style={{
          fontSize: isMobile ? 12 : 13, fontWeight: 400, color: "#1a6fa8",
          marginBottom: 8, lineHeight: 1.45, minHeight: isMobile ? 36 : 52,
          overflow: "hidden", display: "-webkit-box",
          WebkitLineClamp: 3, WebkitBoxOrient: "vertical",
          fontFamily: "Georgia, serif", cursor: "pointer",
        }}>
          {name}
        </div>

        {/* Stars */}
        <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 6 }}>
          <StarRating rating={product.rating || 4} />
        </div>

        {/* Low stock */}
        {isLowStock && !isOutOfStock && (
          <div style={{ fontSize: 10, color: "#b8960c", marginBottom: 6, fontFamily: "Georgia, serif" }}>
            ⚠️ Only {stock} left
          </div>
        )}

        {/* Price */}
        <div style={{ marginBottom: 10, marginTop: "auto" }}>
          <div style={{ fontSize: 10, color: "#555", fontFamily: "Georgia, serif", marginBottom: 2 }}>
            <span style={{ fontWeight: 700 }}>MRP</span>{" "}
            <span style={{ fontStyle: "italic", fontSize: 9 }}>(Inclusive of all taxes)</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            {oldPrice > price && (
              <span style={{ fontSize: isMobile ? 10 : 11, color: "#aaa", textDecoration: "line-through", fontFamily: "Georgia, serif" }}>
                ₹{oldPrice.toFixed(2)}
              </span>
            )}
            <span style={{ fontSize: isMobile ? 15 : 17, fontWeight: 700, color: "#1c1c1c", fontFamily: "Georgia, serif" }}>
              ₹{price.toFixed(2)}
            </span>
            <span style={{ fontSize: 10, color: "#9c7c3e", fontFamily: "Georgia, serif" }}>({unit})</span>
          </div>
        </div>

        {/* Cart button */}
        <button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          style={{
            width: "100%", padding: "9px 0",
            background: isOutOfStock
              ? "#e0d8cc"
              : added
                ? "linear-gradient(135deg, #5c4a10, #9c7c2e)"
                : "linear-gradient(135deg, #7a6c3e, #c9a84c)",
            color: isOutOfStock ? "#aaa" : "#fff",
            border: "none", borderRadius: 2, fontSize: 11, fontWeight: 700,
            cursor: isOutOfStock ? "not-allowed" : "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            letterSpacing: 1.2, textTransform: "uppercase", fontFamily: "Georgia, serif",
            transition: "opacity 0.2s", marginTop: 4,
          }}
          onMouseEnter={e => { if (!isOutOfStock) e.currentTarget.style.opacity = "0.88"; }}
          onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}
        >
          <CartIcon />
          {isOutOfStock ? "Out of Stock" : added ? "✓ Added!" : "Add To Cart"}
        </button>
      </div>
    </div>
  );
};

// ─── Popular Products ─────────────────────────────────────────────────────────
const PopularProducts = ({ products, loading }) => {
  const { isMobile, isTablet } = useResponsive();
  const [activeTab, setActiveTab] = useState("All");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch(`${API_BASEA}/api/Category/all`)
      .then(r => r.json())
      .then(data => {
        const cats = Array.isArray(data) ? data : data.categories || data.data || [];
        setCategories(cats.filter(c => c.isActive));
      })
      .catch(() => { });
  }, []);

  const tabLabels = ["All", ...categories.map(c => c.name)];

  const getProductCatId = (p) => {
    if (!p.category) return "";
    if (typeof p.category === "object") return p.category.id || "";
    return p.category;
  };

  const getDisplayedProducts = () => {
    if (activeTab === "All") {
      const result = [];
      categories.forEach(cat => {
        products.filter(p => getProductCatId(p) === cat.id).slice(0, 2).forEach(p => result.push(p));
      });
      return result.length > 0 ? result.slice(0, 8) : products.slice(0, 8);
    }
    const selectedCat = categories.find(c => c.name === activeTab);
    if (!selectedCat) return [];
    return products.filter(p => getProductCatId(p) === selectedCat.id).slice(0, 8);
  };

  const displayedProducts = getDisplayedProducts();
  const productCols = isMobile ? "repeat(2, 1fr)" : isTablet ? "repeat(3, 1fr)" : "repeat(4, 1fr)";

  return (
    <section id="popular-product" style={{ marginBottom: isMobile ? 40 : 60, fontFamily: "Georgia, 'Times New Roman', serif" }}>
      <SectionHeader title="Popular Products" />

      {/* Tabs */}
      <div style={{
        display: "flex", gap: 8, flexWrap: "nowrap", overflowX: "auto",
        marginBottom: 24, paddingBottom: 2, scrollbarWidth: "none",
        WebkitOverflowScrolling: "touch",
        justifyContent: isMobile ? "flex-start" : "center",
      }}>
        {tabLabels.map(t => (
          <button key={t} onClick={() => setActiveTab(t)} style={{
            padding: isMobile ? "6px 16px" : "8px 22px", borderRadius: 30,
            fontSize: isMobile ? 12 : 13, fontWeight: activeTab === t ? 700 : 500,
            whiteSpace: "nowrap", flexShrink: 0, cursor: "pointer", transition: "all 0.2s",
            border: activeTab === t ? "none" : "1px solid #c9a84c",
            background: activeTab === t ? "linear-gradient(135deg, #5c4a10, #9c7c2e, #c9a84c)" : "#fff",
            color: activeTab === t ? "#fff" : "#7a6c3e",
            fontFamily: "Georgia, serif", letterSpacing: 0.5,
            boxShadow: activeTab === t ? "0 3px 10px rgba(140,110,20,0.25)" : "none",
          }}>
            {t}
          </button>
        ))}
      </div>

      {/* Grid */}
      {loading ? (
        <div style={{ display: "grid", gridTemplateColumns: productCols, gap: 16 }}>
          {[...Array(isMobile ? 4 : 8)].map((_, i) => (
            <div key={i} style={{ height: 320, background: "#f5f0e8", animation: "pulse 1.4s ease-in-out infinite" }} />
          ))}
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: productCols, gap: 16 }}>
          {displayedProducts.length > 0
            ? displayedProducts.map((p, i) => <ProductCard key={p.id || i} product={p} />)
            : <div style={{ gridColumn: "1/-1", textAlign: "center", padding: 48, color: "#bbb", fontSize: 14, fontFamily: "Georgia, serif" }}>No products found.</div>
          }
        </div>
      )}
    </section>
  );
};

// ─── Stats Bar ────────────────────────────────────────────────────────────────
const StatsBar = () => {
  const { isMobile } = useResponsive();

  return (
    <div style={{
      display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
      background: "#fdf8ee", borderRadius: 2,
      border: "1px solid #e8e0d0",
      marginBottom: isMobile ? 32 : 48, overflow: "hidden",
    }}>
      {[
        { emoji: "👥", stat: "90%", label: "User Positive Feedback" },
        { emoji: "🕐", stat: "24/7", label: "Online Support" },
        { emoji: "🔒", stat: "48+", label: "Secure Payment Gateways" },
      ].map((item, i) => (
        <div key={i} style={{
          padding: isMobile ? "14px 6px" : "28px 20px",
          borderRight: i < 2 ? "1px solid #e8e0d0" : "none",
          display: "flex", flexDirection: isMobile ? "column" : "row",
          alignItems: "center", justifyContent: "center",
          gap: isMobile ? 4 : 14, textAlign: isMobile ? "center" : "left",
        }}>
          <span style={{ fontSize: isMobile ? 22 : 34, opacity: 0.8 }}>{item.emoji}</span>
          <div>
            <div style={{ fontSize: isMobile ? 18 : 26, fontWeight: 700, color: "#9c7c3e", lineHeight: 1.2, fontFamily: "Georgia, serif" }}>
              {item.stat}
            </div>
            <div style={{ fontSize: isMobile ? 10 : 12, color: "#666", lineHeight: 1.3, wordBreak: "break-word", fontFamily: "Georgia, serif" }}>
              {item.label}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// ─── Just For You ─────────────────────────────────────────────────────────────
const JustForYou = ({ products, loading }) => {
  const { isMobile, isTablet } = useResponsive();
  const [page, setPage] = useState(0);
  const perPage = 12;
  const paginated = products.slice(page * perPage, (page + 1) * perPage);
  const cols = isMobile ? "repeat(2, 1fr)" : isTablet ? "repeat(3, 1fr)" : "repeat(6, 1fr)";

  return (
    <section style={{ marginBottom: 48, fontFamily: "Georgia, serif" }}>
      <SectionHeader title="Just For You" />
      {loading ? (
        <div style={{ display: "grid", gridTemplateColumns: cols, gap: 16 }}>
          {[...Array(isMobile ? 4 : 12)].map((_, i) => (
            <div key={i} style={{ height: 300, background: "#f5f0e8", animation: "pulse 1.4s ease-in-out infinite" }} />
          ))}
        </div>
      ) : (
        <>
          <div style={{ display: "grid", gridTemplateColumns: cols, gap: 16 }}>
            {paginated.map((p, i) => <ProductCard key={p.id || i} product={p} />)}
          </div>
          {products.length > perPage && (
            <div style={{ textAlign: "center", marginTop: 32 }}>
              <button
                onClick={() => setPage(pg => pg + 1)}
                style={{
                  padding: "12px 48px", background: "#fff",
                  border: "1.5px solid #c9a84c", color: "#7a6c3e",
                  borderRadius: 2, fontWeight: 600, fontSize: 13,
                  cursor: "pointer", fontFamily: "Georgia, serif",
                  letterSpacing: 1.5, textTransform: "uppercase", transition: "all 0.2s",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = "linear-gradient(135deg, #7a6c3e, #c9a84c)"; e.currentTarget.style.color = "#fff"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = "#7a6c3e"; }}
              >
                Load More Products
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
};

// ─── Root App ─────────────────────────────────────────────────────────────────
export default function HomePage() {
  const { isMobile } = useResponsive();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [catLoading, setCatLoading] = useState(true);
  const [prodLoading, setProdLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (window.location.hash === "#feature-categories") {
      const timer = setTimeout(() => {
        const el = document.getElementById("feature-categories");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 150);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    fetch(`${API_BASEA}/api/Category/all`)
      .then(r => r.json())
      .then(data => { setCategories(Array.isArray(data) ? data : data.categories || data.data || []); setCatLoading(false); })
      .catch(() => { setCatLoading(false); setError("Could not load categories."); });

    const fetchAllProducts = async () => {
      try {
        let allProducts = [], p = 1, totalPages = 1;
        do {
          const res = await fetch(`${API_BASEA}/api/Products/allFree?page=${p}&limit=100`);
          const data = await res.json();
          const batch = Array.isArray(data) ? data : data.products || data.data || [];
          allProducts = [...allProducts, ...batch];
          totalPages = data.totalPages || 1;
          p++;
        } while (p <= totalPages);
        setProducts(allProducts);
      } catch (err) {
        console.error(err);
      } finally {
        setProdLoading(false);
      }
    };
    fetchAllProducts();
  }, []);

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
        body { font-family: 'Georgia', 'Times New Roman', serif; }
        ::-webkit-scrollbar { display: none; }
        button { touch-action: manipulation; }
        img { max-width: 100%; }
      `}</style>

      <CartToast />

      <div style={{ maxWidth: 1400, margin: "0 auto", padding: isMobile ? "10px 10px 0" : "16px 16px 0" }}>
        {error && (
          <div style={{
            background: "#fdf8ee", border: "1px solid #c9a84c", borderRadius: 2,
            padding: "10px 14px", marginBottom: 14, fontSize: 13,
            color: "#7a6c3e", fontFamily: "Georgia, serif",
          }}>⚠️ {error}</div>
        )}
        <HeroBanner />
        <PromoBanners />
        <FeatureCategories categories={categories} loading={catLoading} products={products} />
        <PopularProducts products={products} loading={prodLoading} />
        <StatsBar />
        <JustForYou products={products} loading={prodLoading} />
        <LatestBlogs />
      </div>
    </>
  );
}