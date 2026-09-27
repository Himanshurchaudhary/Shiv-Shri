import { useState, useEffect } from "react";
import { openLoginModal } from "../utils/authEvents";
import { addToCart, toggleWishlist, fetchWishlist } from "../utils/cartWishlist";
import { useNavigate } from "react-router-dom";

const API_BASEA = import.meta.env.VITE_API_URL;

// ─── Responsive Hook ──────────────────────────────────────────────────────────
const useResponsive = () => {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );
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

// ─── Cart Toast ───────────────────────────────────────────────────────────────
const CartToast = () => {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const handler = (e) => {
      const id = Date.now() + Math.random();
      const { name, image } = e.detail || {};
      setToasts((prev) => [...prev, { id, name, image, exiting: false }]);
      setTimeout(() => {
        setToasts((prev) =>
          prev.map((t) => (t.id === id ? { ...t, exiting: true } : t))
        );
      }, 2800);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 3200);
    };
    window.addEventListener("cart:added", handler);
    return () => window.removeEventListener("cart:added", handler);
  }, []);

  if (toasts.length === 0) return null;

  return (
    <>
      <style>{`
        @keyframes toastSlideIn { from { opacity: 0; transform: translateX(110%); } to { opacity: 1; transform: translateX(0); } }
        @keyframes toastSlideOut { from { opacity: 1; transform: translateX(0); } to { opacity: 0; transform: translateX(110%); } }
        @keyframes toastProgress { from { width: 100%; } to { width: 0%; } }
      `}</style>
      <div
        style={{
          position: "fixed",
          bottom: 24,
          right: 20,
          zIndex: 9999,
          display: "flex",
          flexDirection: "column",
          gap: 10,
          alignItems: "flex-end",
          pointerEvents: "none",
        }}
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              background: "#fff",
              borderRadius: 12,
              boxShadow:
                "0 8px 32px rgba(0,0,0,0.14), 0 2px 8px rgba(45,158,45,0.10)",
              padding: "10px 16px 10px 10px",
              minWidth: 260,
              maxWidth: 320,
              border: "1.5px solid #e8f5e9",
              position: "relative",
              overflow: "hidden",
              animation: toast.exiting
                ? "toastSlideOut 0.38s cubic-bezier(0.4,0,1,1) forwards"
                : "toastSlideIn 0.38s cubic-bezier(0,0,0.2,1) forwards",
              pointerEvents: "auto",
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 8,
                overflow: "hidden",
                flexShrink: 0,
                background: "#f0f9f0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid #e8f5e9",
              }}
            >
              {toast.image ? (
                <img
                  src={toast.image}
                  alt={toast.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <span style={{ fontSize: 24 }}>🛒</span>
              )}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  marginBottom: 2,
                }}
              >
                <span
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: "50%",
                    background: "#2d9e2d",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                  >
                    <polyline
                      points="1.5,5 4,7.5 8.5,2.5"
                      stroke="#fff"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span
                  style={{ fontSize: 12, fontWeight: 800, color: "#2d9e2d" }}
                >
                  Added to Cart!
                </span>
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: "#555",
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {toast.name || "Product"}
              </div>
            </div>
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                height: 3,
                background: "#2d9e2d",
                borderRadius: "0 0 0 12px",
                animation: `toastProgress 3s linear forwards`,
              }}
            />
          </div>
        ))}
      </div>
    </>
  );
};

// ─── Product Card ─────────────────────────────────────────────────────────────
const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { isMobile } = useResponsive();
  const [wished, setWished] = useState(false);
  const [added, setAdded] = useState(false);
  const [loading, setLoading] = useState(false);

  const oldPrice = Number(product.price || product.buyingPrice || 0);
  const price = Number(product.oldPrice || product.sellingPrice);
  const name = product.name || product.title || "Product";
  const unit = product.unit || product.weight || "1 KG";
  const image = product.image || product.thumbnail || product.images?.[0];
  const stock = product.stockQuantity ?? 0;
  const isOutOfStock = stock === 0;
  const isLowStock = stock > 0 && stock <= 10;
  const discount =
    oldPrice && price ? Math.round((1 - price / oldPrice) * 100) : 0;

  const isLoggedIn = () => !!localStorage.getItem("userToken");

  useEffect(() => {
    if (!isLoggedIn()) return;
    fetchWishlist()
      .then((data) => {
        const ids = (data.products || []).map((p) => p.id || p);
        setWished(ids.includes(product.id));
      })
      .catch(() => {});
  }, [product.id]);

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    if (!isLoggedIn()) {
      openLoginModal();
      return;
    }
    if (loading) return;
    setLoading(true);
    try {
      await addToCart(product.id);
      setAdded(true);
      setTimeout(() => setAdded(false), 1800);
      window.dispatchEvent(
        new CustomEvent("cart:added", { detail: { name, image } })
      );
    } catch {
      alert("Failed to add to cart. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleWishlist = async (e) => {
    e.stopPropagation();
    if (!isLoggedIn()) {
      openLoginModal();
      return;
    }
    try {
      await toggleWishlist(product.id, wished);
      setWished((w) => !w);
    } catch {
      alert("Failed to update wishlist. Please try again.");
    }
  };

  const description =
    product.description ||
    product.shortDescription ||
    "Premium quality product, freshly sourced and delivered to your door.";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

        @keyframes ps-pop {
          0%   { transform: scale(1); }
          45%  { transform: scale(1.28); }
          100% { transform: scale(1.18); }
        }
        @keyframes ps-checkpop {
          0%   { transform: scale(0.7); opacity: 0; }
          60%  { transform: scale(1.15); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes ps-ripple {
          0%   { transform: scale(0); opacity: 0.35; }
          100% { transform: scale(3.5); opacity: 0; }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .ps-card {
          font-family: 'Inter', sans-serif;
          background: #ffffff;
          border-radius: 0;
          border: 1.5px solid #e8e8e8;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          transition: box-shadow 0.3s ease, transform 0.25s ease;
          position: relative;
        }
        .ps-card:hover {
          box-shadow: 0 12px 40px rgba(0,0,0,0.15);
          transform: translateY(-4px);
          border-color: #c8a96e;
          z-index: 2;
        }

        .ps-img-zone {
          position: relative;
          overflow: hidden;
          background: #f9f9f9;
          flex-shrink: 0;
        }
        .ps-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          padding: 20px;
          transition: transform 0.4s ease;
        }
        .ps-card:hover .ps-img { transform: scale(1.08); }

        .ps-badge-discount {
          position: absolute;
          top: 12px; left: 12px;
          background: #c8a96e;
          color: #1a1a1a;
          font-size: 9px;
          font-weight: 800;
          padding: 3px 8px;
          border-radius: 2px;
          letter-spacing: 0.5px;
          z-index: 3;
          text-transform: uppercase;
        }

        .ps-wish-btn {
          position: absolute;
          top: 12px; right: 12px;
          background: rgba(255,255,255,0.95);
          border: none;
          border-radius: 50%;
          width: 34px; height: 34px;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 2px 8px rgba(0,0,0,0.12);
          transition: background 0.2s, transform 0.2s;
          z-index: 3;
        }
        .ps-wish-btn:hover { background: #fff; transform: scale(1.1); }
        .ps-wish-btn.active svg { animation: ps-pop 0.35s ease forwards; }

        .ps-stock-pill {
          position: absolute;
          bottom: 10px; left: 10px;
          font-size: 9px;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: 2px;
          letter-spacing: 0.3px;
          z-index: 3;
          text-transform: uppercase;
        }
        .ps-stock-pill.out  { background: rgba(200,50,50,0.12);  color: #c03030; }
        .ps-stock-pill.low  { background: rgba(200,120,30,0.12); color: #a05020; }
        .ps-stock-pill.in   { background: rgba(200,169,110,0.12); color: #8a6c30; }

        .ps-body {
          padding: 16px 18px 20px;
          display: flex;
          flex-direction: column;
          flex: 1;
          gap: 6px;
          text-align: center;
        }

        .ps-name {
          font-weight: 700;
          color: #111;
          line-height: 1.3;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          letter-spacing: -0.2px;
        }

        .ps-desc {
          font-size: 11.5px;
          color: #888;
          line-height: 1.5;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          font-weight: 400;
        }

        .ps-price {
          font-weight: 900;
          color: #c8a96e;
          letter-spacing: -0.3px;
          margin-top: 2px;
        }

        .ps-atc-btn {
          position: relative;
          overflow: hidden;
          width: 100%;
          border: 1.5px solid #c8a96e;
          border-radius: 2px;
          font-family: 'Inter', sans-serif;
          font-weight: 700;
          letter-spacing: 1px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: background 0.22s, color 0.22s, box-shadow 0.22s;
          margin-top: 8px;
          text-transform: uppercase;
          font-size: 11px;
        }
        .ps-atc-btn:not(:disabled):hover {
          background: #c8a96e !important;
          color: #fff !important;
          box-shadow: 0 4px 16px rgba(200,169,110,0.35);
        }
        .ps-atc-btn:not(:disabled):active { transform: scale(0.97); }
        .ps-atc-btn .ps-ripple {
          position: absolute;
          width: 60px; height: 60px;
          border-radius: 50%;
          background: rgba(200,169,110,0.25);
          transform: scale(0);
          pointer-events: none;
        }
        .ps-atc-btn:not(:disabled):active .ps-ripple {
          animation: ps-ripple 0.5s ease-out forwards;
        }
        .ps-check { animation: ps-checkpop 0.3s ease forwards; }
      `}</style>

      <div
        className="ps-card"
        onClick={() => product.slug && navigate(`/products/${product.slug}`)}
      >
        {/* Image Zone */}
        <div className="ps-img-zone" style={{ height: isMobile ? 160 : 200 }}>
          {image ? (
            <img
              className="ps-img"
              src={image}
              alt={name}
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: isMobile ? 48 : 64,
                background: "#f5f0e8",
              }}
            >
              ☕
            </div>
          )}

          {discount > 0 && (
            <span className="ps-badge-discount">{discount}% Off</span>
          )}

          <button
            className={`ps-wish-btn${wished ? " active" : ""}`}
            onClick={handleWishlist}
            aria-label="Wishlist"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill={wished ? "#e74c3c" : "none"}
              stroke={wished ? "#e74c3c" : "#888"}
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>

          <span
            className={`ps-stock-pill ${
              isOutOfStock ? "out" : isLowStock ? "low" : "in"
            }`}
          >
            {isOutOfStock
              ? "Out of Stock"
              : isLowStock
              ? `Only ${stock} left`
              : "In Stock"}
          </span>
        </div>

        {/* Body */}
        <div className="ps-body">
          <div className="ps-name" style={{ fontSize: isMobile ? 13 : 15 }}>
            {name}
          </div>

          <div className="ps-desc">{description}</div>

          <div className="ps-price" style={{ fontSize: isMobile ? 17 : 20 }}>
            ₹{price.toFixed(2)}
            {oldPrice > 0 && oldPrice !== price && (
              <span
                style={{
                  fontSize: 12,
                  color: "#bbb",
                  textDecoration: "line-through",
                  marginLeft: 8,
                  fontWeight: 500,
                }}
              >
                ₹{oldPrice.toFixed(2)}
              </span>
            )}
          </div>

          <button
            className="ps-atc-btn"
            onClick={handleAddToCart}
            disabled={isOutOfStock || loading}
            style={{
              padding: isMobile ? "9px 0" : "11px 0",
              background: isOutOfStock
                ? "#e8e8e8"
                : added
                ? "#c8a96e"
                : "transparent",
              color: isOutOfStock ? "#aaa" : added ? "#fff" : "#c8a96e",
              borderColor: isOutOfStock ? "#e8e8e8" : "#c8a96e",
            }}
          >
            <span className="ps-ripple" />
            {isOutOfStock ? (
              "Out of Stock"
            ) : loading ? (
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                style={{ animation: "spin 0.8s linear infinite" }}
              >
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
              </svg>
            ) : added ? (
              <>
                <svg
                  className="ps-check"
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Added!
              </>
            ) : (
              <>
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
                Add to Cart
              </>
            )}
          </button>
        </div>
      </div>
    </>
  );
};

// ─── Product Section ──────────────────────────────────────────────────────────
const ProductSection = () => {
  const { isMobile, isTablet } = useResponsive();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("All");

  useEffect(() => {
    fetch(`${API_BASEA}/api/Category/all`)
      .then((r) => r.json())
      .then((data) => {
        const cats = Array.isArray(data)
          ? data
          : data.categories || data.data || [];
        setCategories(cats.filter((c) => c.isActive));
      })
      .catch(() => {});

    const fetchAllProducts = async () => {
      try {
        let allProducts = [],
          p = 1,
          totalPages = 1;
        do {
          const res = await fetch(
            `${API_BASEA}/api/Products/allFree?page=${p}&limit=100`
          );
          const data = await res.json();
          const batch = Array.isArray(data)
            ? data
            : data.products || data.data || [];
          allProducts = [...allProducts, ...batch];
          totalPages = data.totalPages || 1;
          p++;
        } while (p <= totalPages);
        setProducts(allProducts);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAllProducts();
  }, []);

  const tabLabels = ["All", ...categories.map((c) => c.name)];

  const getProductCatId = (p) => {
    if (!p.category) return "";
    if (typeof p.category === "object") return p.category.id || "";
    return p.category;
  };

  const displayedProducts = (() => {
    if (activeTab === "All") return products.slice(0, 8);
    const selectedCat = categories.find((c) => c.name === activeTab);
    if (!selectedCat) return [];
    return products
      .filter((p) => getProductCatId(p) === selectedCat.id)
      .slice(0, 8);
  })();

  const cols = isMobile
    ? "repeat(2, 1fr)"
    : isTablet
    ? "repeat(3, 1fr)"
    : "repeat(4, 1fr)";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Inter:wght@400;500;600;700&display=swap');

        .ps-section-root {
          background: linear-gradient(160deg, #fff8f0 0%, #fef0e0 50%, #fde8cc 100%);
          padding: 70px 0 80px;
          font-family: 'Inter', sans-serif;
        }

        .ps-eyebrow {
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: #b8860b;
          letter-spacing: 3px;
          text-transform: uppercase;
          text-align: center;
          margin-bottom: 10px;
        }

        .ps-main-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(32px, 5vw, 54px);
          font-weight: 900;
          color: #1a1a1a;
          text-align: center;
          margin: 0 0 6px;
          line-height: 1.1;
          position: relative;
        }

        .ps-main-title-bg {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-family: 'Playfair Display', serif;
          font-size: clamp(52px, 9vw, 100px);
          font-weight: 900;
          color: rgba(180,100,0,0.07);
          white-space: nowrap;
          pointer-events: none;
          letter-spacing: 2px;
          z-index: 0;
        }

        .ps-tabs-wrapper {
          display: flex;
          gap: 0;
          justify-content: center;
          margin: 32px 0 40px;
          flex-wrap: wrap;
          gap: 8px;
          padding: 0 16px;
        }

        .ps-tab {
          padding: 8px 22px;
          border: 1.5px solid rgba(180,100,0,0.25);
          background: rgba(255,255,255,0.6);
          color: #7a5c30;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.8px;
          text-transform: uppercase;
          cursor: pointer;
          border-radius: 2px;
          transition: all 0.22s ease;
          font-family: 'Inter', sans-serif;
        }
        .ps-tab:hover {
          border-color: #c8a96e;
          color: #b8860b;
          background: rgba(255,255,255,0.9);
        }
        .ps-tab.active {
          background: #c8a96e;
          border-color: #c8a96e;
          color: #1a1a1a;
        }

        .ps-skeleton {
          background: linear-gradient(90deg, #f5e6d0 25%, #fad9b0 50%, #f5e6d0 75%);
          background-size: 200% 100%;
          animation: ps-shimmer-bg 1.4s ease-in-out infinite;
          border-radius: 0;
        }
        @keyframes ps-shimmer-bg {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        .ps-view-all-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 48px auto 0;
          width: fit-content;
          padding: 14px 48px;
          background: transparent;
          border: 1.5px solid #b8860b;
          color: #b8860b;
          font-family: 'Inter', sans-serif;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          cursor: pointer;
          border-radius: 2px;
          transition: background 0.22s, color 0.22s, box-shadow 0.22s;
        }
        .ps-view-all-btn:hover {
          background: #c8a96e;
          border-color: #c8a96e;
          color: #1a1a1a;
          box-shadow: 0 4px 20px rgba(200,169,110,0.4);
        }
      `}</style>

      <CartToast />

      <section className="ps-section-root">
        <div
          style={{
            maxWidth: 1400,
            margin: "0 auto",
            padding: isMobile ? "0 12px" : "0 24px",
          }}
        >
          {/* Header */}
          <div style={{ position: "relative", marginBottom: 0 }}>
            <div className="ps-eyebrow">Choose your product</div>
            <div style={{ position: "relative", textAlign: "center" }}>
              <span className="ps-main-title-bg">Products</span>
              <h2 className="ps-main-title" style={{ position: "relative", zIndex: 1 }}>
                Recent Products
              </h2>
            </div>
          </div>

          {/* Tabs */}
          <div className="ps-tabs-wrapper">
            {tabLabels.map((t) => (
              <button
                key={t}
                className={`ps-tab${activeTab === t ? " active" : ""}`}
                onClick={() => setActiveTab(t)}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Product Grid */}
          {loading ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: cols,
                gap: 0,
                border: "1px solid #e8d5b0",
                maxWidth: displayedProducts.length < 4 && !isMobile ? `${displayedProducts.length * 25}%` : "100%",
                margin: "0 auto",
              }}
            >
              {[...Array(isMobile ? 4 : 8)].map((_, i) => (
                <div
                  key={i}
                  className="ps-skeleton"
                  style={{ height: isMobile ? 280 : 340, borderRight: "1px solid #e8d5b0", borderBottom: "1px solid #e8d5b0" }}
                />
              ))}
            </div>
          ) : displayedProducts.length > 0 ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile
                  ? "repeat(2, 1fr)"
                  : isTablet
                  ? `repeat(${Math.min(displayedProducts.length, 3)}, 1fr)`
                  : `repeat(${Math.min(displayedProducts.length, 4)}, 1fr)`,
                gap: 0,
                border: "1px solid #e0c898",
                borderRight: "none",
                borderBottom: "none",
                maxWidth: !isMobile && displayedProducts.length < 4
                  ? `${Math.min(displayedProducts.length, 4) * 280}px`
                  : "100%",
                margin: "0 auto",
              }}
            >
              {displayedProducts.map((p, i) => (
                <div
                  key={p.id || i}
                  style={{ borderRight: "1px solid #e0c898", borderBottom: "1px solid #e0c898" }}
                >
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          ) : (
            <div
              style={{
                textAlign: "center",
                padding: 60,
                color: "rgba(140,90,20,0.4)",
                fontSize: 15,
              }}
            >
              No products found in this category.
            </div>
          )}

          {/* View All */}
          <button
            className="ps-view-all-btn"
            onClick={() => navigate("/user/product")}
          >
            View All Products
          </button>
        </div>
      </section>
    </>
  );
};

export default ProductSection;