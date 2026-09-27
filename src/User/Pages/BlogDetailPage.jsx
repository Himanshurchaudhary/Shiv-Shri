import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
const API_BASEA = import.meta.env.VITE_API_URL;

function formatDate(d) {
  if (!d) return "";
  try {
    return new Date(d).toLocaleDateString("en-US", {
      month: "long", day: "numeric", year: "numeric",
    });
  } catch { return d; }
}

function useResponsive() {
  const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return { isMobile: width < 768, isTablet: width >= 768 && width < 1024 };
}

export default function BlogDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isMobile } = useResponsive();

  const [blog, setBlog] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relHovered, setRelHovered] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setLoading(true);

    fetch(`${API_BASEA}/api/blog/all`)
      .then(r => r.json())
      .then(data => {
        const all = (data.blogs || data.data || []).filter(b => b.isActive !== false);
        const found = all.find(b => b.id === id || b.slug === id || String(b.id) === String(id));
        if (!found) { setError("Blog not found."); return; }
        setBlog(found);
        // Related — same category, exclude current
        const rel = all
          .filter(b => {
            const catId = typeof b.category === "object" ? b.category?.id : b.category;
            const foundCatId = typeof found.category === "object" ? found.category?.id : found.category;
            return b.id !== found.id && catId === foundCatId;
          })
          .slice(0, 3);
        setRelated(rel.length > 0 ? rel : all.filter(b => b.id !== found.id).slice(0, 3));
      })
      .catch(() => setError("Failed to load blog."))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Georgia, serif", color: "#9c7c3e", fontSize: 16 }}>
      Loading…
    </div>
  );

  if (error || !blog) return (
    <div style={{ minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "Georgia, serif", gap: 16 }}>
      <div style={{ fontSize: 16, color: "#c0392b" }}>{error || "Blog not found."}</div>
      <button onClick={() => navigate("/user/blog")} style={backBtnStyle}>← Back to Blog</button>
    </div>
  );

  const author = typeof blog.author === "object" ? blog.author?.name : (blog.author || "Admin");
  const catName = typeof blog.category === "object" ? blog.category?.name : (blog.category || "");

  function stripHtml(str) { return (str || "").replace(/<[^>]+>/g, ""); }

  return (
    <div style={{ fontFamily: "Georgia, 'Times New Roman', serif", background: "#fdf9f4", minHeight: "100vh", padding: isMobile ? "0 0 48px" : "0 0 80px" }}>

      {/* ── Gold top bar ── */}
      <div style={{ height: 3, background: "linear-gradient(90deg, transparent, #c9a84c 30%, #e2c04a 50%, #c9a84c 70%, transparent)" }} />

      <div style={{ maxWidth: 900, margin: "0 auto", padding: isMobile ? "20px 14px 0" : "32px 24px 0" }}>

        {/* ── Back button ── */}
        <button
          onClick={() => navigate("/user/blog")}
          style={backBtnStyle}
          onMouseEnter={e => e.currentTarget.style.opacity = "0.7"}
          onMouseLeave={e => e.currentTarget.style.opacity = "1"}
        >
          ← Back to Blog
        </button>

        {/* ── Hero Image ── */}
        {blog.thumbnail && (
          <div style={{
            borderRadius: 2, overflow: "hidden",
            marginBottom: 28,
            height: isMobile ? 220 : 440,
            background: "#f5f0e8",
            border: "1px solid #e8e0d0",
            boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
          }}>
            <img src={blog.thumbnail} alt={blog.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          </div>
        )}

        {/* ── Main Article Card ── */}
        <article style={{
          background: "#fff",
          border: "1px solid #e8e0d0",
          borderRadius: 2,
          padding: isMobile ? "22px 16px 28px" : "40px 48px 44px",
          boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
          marginBottom: 28,
        }}>
          {/* Category + Meta */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 18 }}>
            {catName && (
              <span style={{
                fontSize: 10, fontWeight: 700, color: "#9c7c3e",
                background: "#fdf8ee", border: "1px solid #e8e0d0",
                padding: "3px 12px", borderRadius: 2,
                textTransform: "uppercase", letterSpacing: 1.2,
                fontFamily: "Georgia, serif",
              }}>
                {catName}
              </span>
            )}
            <span style={{ color: "#e0d0b0" }}>•</span>
            <span style={{ fontSize: 12, color: "#aaa", fontFamily: "Georgia, serif" }}>{formatDate(blog.createdAt)}</span>
            <span style={{ color: "#e0d0b0" }}>•</span>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 24, height: 24, borderRadius: "50%", background: "linear-gradient(135deg, #7a6c3e, #c9a84c)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 11, color: "#fff" }}>✍</span>
              </div>
              <span style={{ fontSize: 12, color: "#9c7c3e", fontFamily: "Georgia, serif", fontWeight: 600 }}>{author}</span>
            </div>
          </div>

          {/* Title */}
          <h1 style={{
            fontSize: isMobile ? 24 : 36,
            fontWeight: 700, color: "#1c1c1c",
            margin: "0 0 16px", lineHeight: 1.25,
            fontFamily: "Georgia, serif", letterSpacing: -0.5,
          }}>
            {blog.title}
          </h1>

          {/* Gold ornament divider */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 28 }}>
            <div style={{ width: 50, height: 2, background: "linear-gradient(90deg, #b8960c, #e2c04a)", borderRadius: 1 }} />
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#c9a84c" }} />
            <div style={{ width: 25, height: 1, background: "#e2c04a" }} />
          </div>

          {/* Blog Body */}
          <div
            style={{
              lineHeight: 1.9,
              color: "#3a3028",
              fontSize: isMobile ? 14 : 16,
              fontFamily: "Georgia, serif",
            }}
            dangerouslySetInnerHTML={{ __html: blog.description || "" }}
          />

          {/* Tags */}
          {(blog.tags || []).length > 0 && (
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 32, paddingTop: 22, borderTop: "1px solid #f0ebe0" }}>
              <span style={{ fontSize: 11, color: "#9c7c3e", fontWeight: 700, fontFamily: "Georgia, serif", letterSpacing: 0.8, textTransform: "uppercase", alignSelf: "center" }}>
                Tags:
              </span>
              {blog.tags.map(t => (
                <span
                  key={t}
                  onClick={() => navigate(`/user/blog?tag=${encodeURIComponent(t)}`)}
                  style={{
                    fontSize: 11, color: "#7a6c3e",
                    background: "#fdf8ee", border: "1px solid #e8e0d0",
                    borderRadius: 2, padding: "5px 14px",
                    fontFamily: "Georgia, serif", cursor: "pointer",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = "#f5edd8"}
                  onMouseLeave={e => e.currentTarget.style.background = "#fdf8ee"}
                >
                  {t}
                </span>
              ))}
            </div>
          )}
        </article>

        {/* ── Related Posts ── */}
        {related.length > 0 && (
          <div style={{ marginTop: 48 }}>
            {/* Related header */}
            <div style={{ textAlign: "center", marginBottom: 28 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 12 }}>
                <div style={{ flex: 1, height: 1, background: "linear-gradient(to right, transparent, #d4b896)" }} />
                <span style={{ fontSize: 10, fontWeight: 700, color: "#9c7c3e", letterSpacing: 4, textTransform: "uppercase", fontFamily: "Georgia, serif" }}>
                  Continue Reading
                </span>
                <div style={{ flex: 1, height: 1, background: "linear-gradient(to left, transparent, #d4b896)" }} />
              </div>
              <h2 style={{ fontSize: isMobile ? 22 : 30, fontWeight: 700, color: "#1c1c1c", margin: "0 0 12px", fontFamily: "Georgia, serif" }}>
                Related Posts
              </h2>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                <div style={{ width: 24, height: 1, background: "#c9a84c" }} />
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#c9a84c" }} />
                <div style={{ width: 32, height: 2, background: "#c9a84c" }} />
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#c9a84c" }} />
                <div style={{ width: 24, height: 1, background: "#c9a84c" }} />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: isMobile ? 14 : 20 }}>
              {related.map((rel, i) => {
                const isHov = relHovered === i;
                const relExcerpt = stripHtml(rel.description || "");
                return (
                  <article
                    key={rel.id || i}
                    onClick={() => navigate(`/user/blog/${rel.id}`)}
                    onMouseEnter={() => setRelHovered(i)}
                    onMouseLeave={() => setRelHovered(null)}
                    style={{
                      background: "#fff", border: "1px solid #e8e0d0",
                      borderRadius: 2, overflow: "hidden", cursor: "pointer",
                      boxShadow: isHov ? "0 8px 24px rgba(0,0,0,0.12)" : "0 2px 8px rgba(0,0,0,0.06)",
                      transform: isHov ? "translateY(-3px)" : "translateY(0)",
                      transition: "all 0.25s",
                    }}
                  >
                    <div style={{ height: 160, overflow: "hidden", background: "#f5f0e8" }}>
                      {rel.thumbnail
                        ? <img src={rel.thumbnail} alt={rel.title} style={{ width: "100%", height: "100%", objectFit: "cover", transform: isHov ? "scale(1.06)" : "scale(1)", transition: "transform 0.4s" }} />
                        : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36 }}>📰</div>
                      }
                    </div>
                    <div style={{ padding: "14px 16px 18px" }}>
                      <div style={{ fontSize: 10, color: "#aaa", fontFamily: "Georgia, serif", marginBottom: 6 }}>{formatDate(rel.createdAt)}</div>
                      <h3 style={{
                        fontSize: 14, fontWeight: 700,
                        color: isHov ? "#9c7c3e" : "#1c1c1c",
                        margin: "0 0 8px", lineHeight: 1.4,
                        fontFamily: "Georgia, serif", transition: "color 0.2s",
                        display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
                      }}>
                        {rel.title}
                      </h3>
                      <div style={{ width: isHov ? 36 : 20, height: 2, background: "#c9a84c", borderRadius: 1, marginBottom: 8, transition: "width 0.3s" }} />
                      <p style={{ fontSize: 12, color: "#888", fontFamily: "Georgia, serif", lineHeight: 1.6, margin: 0, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                        {relExcerpt.slice(0, 100)}{relExcerpt.length > 100 ? "…" : ""}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const backBtnStyle = {
  background: "none", border: "none", cursor: "pointer",
  display: "inline-flex", alignItems: "center", gap: 8,
  color: "#9c7c3e", fontSize: 12, fontWeight: 700,
  fontFamily: "Georgia, serif", letterSpacing: 1,
  textTransform: "uppercase", marginBottom: 22,
  padding: "6px 0", transition: "opacity 0.2s",
};