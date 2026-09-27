import { useEffect, useState, useRef } from "react";

const useIsMobile = () => {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => {
    const h = () => setW(window.innerWidth);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return w < 768;
};

// ── Icons ─────────────────────────────────────────────────────────────────────
const IconSeeds = () => (
  <svg viewBox="0 0 56 56" fill="none" width="54" height="54">
    <ellipse cx="28" cy="44" rx="14" ry="6" stroke="#c8960a" strokeWidth="1.8"/>
    <path d="M28 38 Q20 24 22 14 Q24 7 28 5 Q32 7 34 14 Q36 24 28 38Z" stroke="#c8960a" strokeWidth="1.8" fill="none"/>
    <path d="M22 14 Q14 19 12 27" stroke="#c8960a" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M34 14 Q42 19 44 27" stroke="#c8960a" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="28" cy="5" r="2.5" fill="#c8960a" opacity="0.45"/>
  </svg>
);
const IconStore = () => (
  <svg viewBox="0 0 56 56" fill="none" width="54" height="54">
    <rect x="8" y="22" width="40" height="26" rx="2" stroke="#c8960a" strokeWidth="1.8"/>
    <path d="M8 22 L14 10 h28 l6 12" stroke="#c8960a" strokeWidth="1.8" strokeLinejoin="round"/>
    <path d="M8 22 h40" stroke="#c8960a" strokeWidth="1.5"/>
    <rect x="20" y="32" width="16" height="16" rx="1" stroke="#c8960a" strokeWidth="1.5"/>
    <line x1="28" y1="32" x2="28" y2="48" stroke="#c8960a" strokeWidth="1.2"/>
  </svg>
);
const IconPress = () => (
  <svg viewBox="0 0 56 56" fill="none" width="54" height="54">
    <rect x="10" y="20" width="22" height="28" rx="2" stroke="#c8960a" strokeWidth="1.8"/>
    <path d="M32 30 h10 l6 6 v12 H32 V30Z" stroke="#c8960a" strokeWidth="1.8"/>
    <path d="M16 14 Q20 6 24 12" stroke="#c8960a" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="40" cy="44" r="4" fill="none" stroke="#c8960a" strokeWidth="1.5"/>
  </svg>
);
const IconTruck = () => (
  <svg viewBox="0 0 56 56" fill="none" width="54" height="54">
    <rect x="4" y="22" width="32" height="22" rx="3" stroke="#c8960a" strokeWidth="1.8"/>
    <path d="M36 30 h8 l8 8 v8 H36 V30Z" stroke="#c8960a" strokeWidth="1.8"/>
    <circle cx="14" cy="46" r="5" fill="none" stroke="#c8960a" strokeWidth="1.8"/>
    <circle cx="14" cy="46" r="2" fill="#c8960a"/>
    <circle cx="42" cy="46" r="5" fill="none" stroke="#c8960a" strokeWidth="1.8"/>
    <circle cx="42" cy="46" r="2" fill="#c8960a"/>
    <path d="M10 22 V16 Q10 12 14 12 h14 l8 10" stroke="#c8960a" strokeWidth="1.5"/>
  </svg>
);

const Signature = () => (
  <svg viewBox="0 0 210 75" fill="none" width="170" height="60">
    <path d="M8 58 C18 20, 38 15, 52 35 C62 50, 72 55, 85 28 C95 8, 108 5, 120 32 C130 52, 142 58, 158 30 C168 12, 182 8, 196 38"
      stroke="#3d1f00" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 66 Q80 62, 140 64 Q170 65, 198 62" stroke="#3d1f00" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
  </svg>
);

// ── Animated background particles ─────────────────────────────────────────────
const FloatingParticles = () => {
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    size: 3 + Math.random() * 7,
    x: Math.random() * 100,
    delay: Math.random() * 6,
    duration: 5 + Math.random() * 8,
    opacity: 0.08 + Math.random() * 0.18,
  }));
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
      {particles.map((p) => (
        <div key={p.id} className="fp-particle" style={{
          width: p.size, height: p.size,
          left: `${p.x}%`,
          bottom: "-10px",
          opacity: p.opacity,
          animationDelay: `${p.delay}s`,
          animationDuration: `${p.duration}s`,
        }} />
      ))}
    </div>
  );
};

// ── Animated oil drop SVG ─────────────────────────────────────────────────────
const AnimatedDrop = ({ style, size = 22, delay = "0s" }) => (
  <svg viewBox="0 0 30 40" fill="none" width={size} height={size * 1.3}
    style={{ position: "absolute", opacity: 0.55, animationDelay: delay, ...style }}
    className="oil-drop-svg">
    <path d="M15 2 Q26 14 26 24 A11 11 0 0 1 4 24 Q4 14 15 2Z" fill="#c8960a" fillOpacity="0.35" stroke="#c8960a" strokeWidth="1" strokeOpacity="0.5"/>
    <ellipse cx="10" cy="20" rx="3" ry="5" fill="#fff" fillOpacity="0.25" transform="rotate(-20 10 20)"/>
  </svg>
);

// ── Sparkle star ─────────────────────────────────────────────────────────────
const Sparkle = ({ style, size = 16, delay = "0s", color = "#c8960a" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size}
    style={{ position: "absolute", animationDelay: delay, ...style }}
    className="sparkle-svg">
    <path d="M12 2 L13.5 10.5 L22 12 L13.5 13.5 L12 22 L10.5 13.5 L2 12 L10.5 10.5 Z" fill={color} fillOpacity="0.7"/>
  </svg>
);

// ── Curved decorative line ────────────────────────────────────────────────────
const CurveLine = ({ style }) => (
  <svg viewBox="0 0 200 60" fill="none" width="200" height="60"
    style={{ position: "absolute", opacity: 0.09, pointerEvents: "none", ...style }}>
    <path d="M0 50 Q50 0 100 30 Q150 60 200 10" stroke="#c8960a" strokeWidth="2" fill="none" strokeLinecap="round"/>
  </svg>
);

// ── Product Showcase ──────────────────────────────────────────────────────────
const ProductShowcase = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [animating, setAnimating] = useState(false);
  const timerRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  const products = [
    { src: "/product1.png", label: "Cold Press Mustard Oil" },
    { src: "/product2.png", label: "500ml Bottle" },
    { src: "/product3.png", label: "1L Premium Pack" },
  ];

  const goTo = (idx) => {
    if (animating || idx === activeIdx) return;
    setAnimating(true);
    setTimeout(() => { setActiveIdx(idx); setAnimating(false); }, 320);
  };

  useEffect(() => {
    if (hovered) return;
    timerRef.current = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setActiveIdx((p) => (p + 1) % products.length);
        setAnimating(false);
      }, 320);
    }, 3400);
    return () => clearInterval(timerRef.current);
  }, [hovered, products.length]);

  return (
    <div className="ps-root"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>

      {/* Rotating ring layers */}
      <div className="ps-ring ps-ring-1" />
      <div className="ps-ring ps-ring-2" />
      <div className="ps-ring ps-ring-3" />

      {/* Glow core */}
      <div className="ps-glow-core" />

      {/* Accent dots on orbit */}
      {[0, 72, 144, 216, 288].map((deg, i) => (
        <div key={i} className="ps-orbit-dot" style={{
          transform: `rotate(${deg}deg) translateX(130px)`,
          animationDelay: `${i * 0.4}s`,
        }} />
      ))}

      {/* Oil drops floating around */}
      <AnimatedDrop style={{ top: "8%", right: "8%"  }} size={18} delay="0s" />
      <AnimatedDrop style={{ bottom: "22%", left: "5%" }} size={14} delay="1.2s" />
      <AnimatedDrop style={{ top: "38%", right: "3%"  }} size={11} delay="2.4s" />

      {/* Sparkles */}
      <Sparkle style={{ top: "12%", left: "18%"  }} size={12} delay="0s" />
      <Sparkle style={{ top: "22%", right: "18%" }} size={9}  delay="0.8s" color="#e0b040" />
      <Sparkle style={{ bottom: "30%", right: "10%" }} size={10} delay="1.6s" />
      <Sparkle style={{ bottom: "18%", left: "14%"  }} size={8}  delay="2.2s" color="#d4a020" />

      {/* Badge */}
      <div className="ps-badge">✦ 100% Pure</div>

      {/* FSSAI tag */}
      <div className="ps-tag-fssai">FSSAI Certified</div>

      {/* Product image — NO filter/opacity tricks, full visibility */}
      <div className={`ps-img-wrap ${animating ? "ps-out" : "ps-in"}`}>
        <img
          src={products[activeIdx].src}
          alt={products[activeIdx].label}
          className="ps-img"
        />
      </div>

      {/* Reflection / shine sweep */}
      <div className="ps-shine" />

      {/* Label pill */}
      <div className="ps-label">{products[activeIdx].label}</div>

      {/* Dots */}
      <div className="ps-dots">
        {products.map((_, i) => (
          <button key={i} className={`ps-dot ${i === activeIdx ? "ps-dot-a" : ""}`}
            onClick={() => goTo(i)} aria-label={`Product ${i + 1}`} />
        ))}
      </div>
    </div>
  );
};

// ── Cards ─────────────────────────────────────────────────────────────────────
const CARDS = [
  { Icon: IconSeeds, title: "Premium quality seeds", text: "Only hand-picked, premium-grade mustard seeds — quality-checked at every step from seed to bottle, delivering pure and authentic flavour." },
  { Icon: IconStore, title: "Many points of sale",   text: "Available at your doorstep, local grocery stores, hotels, and now online too. Vardhan is everywhere you need it — vardhanfoods.com" },
  { Icon: IconPress, title: "Professional cold press",text: "Oil extracted via Cold Press method — no heat, no chemicals. Prepared in a fully hygienic, FSSAI-certified facility preserving all natural nutrients." },
  { Icon: IconTruck, title: "24/7 fast delivery",    text: "Order now and receive fresh, sealed packaging delivered straight to your home. We're always ready for wholesale orders too." },
];

// ── Main ──────────────────────────────────────────────────────────────────────
export default function AboutSection() {
  const isMobile = useIsMobile();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,800;0,900;1,700&display=swap');

        /* ── Section ── */
        .ab-section {
          background: linear-gradient(160deg, #fdf8ef 0%, #f5f0e4 40%, #faf5ea 100%);
          padding: ${isMobile ? "52px 18px 60px" : "90px 5% 100px"};
          position: relative;
          overflow: hidden;
          border-top: 1px solid #e8ddc8;
          border-bottom: 1px solid #e8ddc8;
        }

        /* animated background blobs */
        .ab-blob {
          position: absolute; border-radius: 50%;
          filter: blur(70px); pointer-events: none; z-index: 0;
          animation: blob-drift 12s ease-in-out infinite alternate;
        }
        .ab-blob-1 { width: 380px; height: 380px; background: rgba(200,150,10,0.07); top: -80px; right: -60px; animation-delay: 0s; }
        .ab-blob-2 { width: 280px; height: 280px; background: rgba(180,120,10,0.05); bottom: -60px; left: -40px; animation-delay: 3s; }
        .ab-blob-3 { width: 200px; height: 200px; background: rgba(220,170,30,0.06); top: 50%; left: 35%; animation-delay: 6s; }
        @keyframes blob-drift {
          0%   { transform: translate(0,0) scale(1); }
          100% { transform: translate(20px, 15px) scale(1.08); }
        }

        /* decorative grid lines */
        .ab-grid {
          position: absolute; inset: 0; pointer-events: none; z-index: 0;
          background-image:
            linear-gradient(rgba(200,150,10,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(200,150,10,0.04) 1px, transparent 1px);
          background-size: 60px 60px;
        }

        /* floating particles */
        .fp-particle {
          position: absolute; border-radius: 50%;
          background: radial-gradient(circle, #c8960a 0%, transparent 70%);
          animation: rise-up linear infinite;
        }
        @keyframes rise-up {
          0%   { transform: translateY(0) scale(1);   opacity: 0; }
          15%  { opacity: 1; }
          85%  { opacity: 0.6; }
          100% { transform: translateY(-600px) scale(0.3); opacity: 0; }
        }

        /* oil drops */
        .oil-drop-svg { animation: drop-float 3.5s ease-in-out infinite; }
        @keyframes drop-float {
          0%,100% { transform: translateY(0) rotate(-8deg); }
          50%     { transform: translateY(-10px) rotate(6deg); }
        }

        /* sparkles */
        .sparkle-svg { animation: sparkle-pulse 2s ease-in-out infinite; }
        @keyframes sparkle-pulse {
          0%,100% { transform: scale(1) rotate(0deg);   opacity: 0.6; }
          50%     { transform: scale(1.4) rotate(20deg); opacity: 1; }
        }

        .ab-inner {
          max-width: 1200px; margin: 0 auto; position: relative; z-index: 1;
          display: grid;
          grid-template-columns: ${isMobile ? "1fr" : "0.95fr 1fr 1.25fr"};
          gap: ${isMobile ? "44px" : "48px"};
          align-items: center;
        }

        /* ── LEFT ── */
        .ab-left { position: relative; }
        .ab-eyebrow {
          font-family: 'Playfair Display', serif; font-style: italic;
          font-size: 17px; font-weight: 700; color: #c8960a;
          margin-bottom: 10px; letter-spacing: 0.3px;
          animation: fade-up 0.7s ease both;
        }
        .ab-heading {
          font-family: 'Playfair Display', serif; font-weight: 900;
          font-size: ${isMobile ? "38px" : "clamp(40px,4.5vw,58px)"};
          color: #12100a; line-height: 1.08; margin: 0 0 22px;
          animation: fade-up 0.75s 0.1s ease both;
        }
        /* animated underline on heading */
        .ab-heading-line {
          display: block; width: 72px; height: 3px;
          background: linear-gradient(90deg, #c8960a, #e8b830, transparent);
          border-radius: 2px; margin-bottom: 24px;
          animation: expand-line 1s 0.5s ease both;
        }
        @keyframes expand-line {
          from { width: 0; opacity: 0; }
          to   { width: 72px; opacity: 1; }
        }
        .ab-body {
          font-size: 15.5px; color: #5c4530; line-height: 1.88;
          max-width: 400px; margin-bottom: 28px;
          animation: fade-up 0.8s 0.2s ease both;
        }
        /* stats row */
        .ab-stats {
          display: flex; gap: 28px; margin-bottom: 28px; flex-wrap: wrap;
          animation: fade-up 0.85s 0.3s ease both;
        }
        .ab-stat { text-align: center; }
        .ab-stat-num {
          font-family: 'Playfair Display', serif; font-size: 28px;
          font-weight: 900; color: #c8960a; line-height: 1;
          display: block;
        }
        .ab-stat-lbl { font-size: 11px; color: #a07850; letter-spacing: 0.5px; margin-top: 4px; display: block; }
        .ab-stat-divider { width: 1px; background: #e0d0b8; align-self: stretch; margin: 2px 0; }

        .ab-sig-wrap { animation: fade-up 0.9s 0.4s ease both; }
        .ab-sig-name {
          font-family: 'Playfair Display', serif; font-style: italic;
          font-size: 15px; color: #3d1f00; margin-top: 6px; line-height: 1.3;
        }
        .ab-sig-sub { font-size: 11px; color: #a07850; margin-top: 3px; letter-spacing: 0.5px; }

        @keyframes fade-up {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── PRODUCT SHOWCASE ── */
        .ps-root {
          position: relative; width: 100%; max-width: 300px;
          margin: 0 auto; aspect-ratio: 1 / 1.2;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          user-select: none; cursor: default;
        }

        /* Rings */
        .ps-ring {
          position: absolute; border-radius: 50%; border: 1.5px solid #c8960a;
          pointer-events: none;
        }
        .ps-ring-1 {
          width: 92%; height: 92%; opacity: 0.14;
          border-style: dashed;
          animation: ring-spin 22s linear infinite;
        }
        .ps-ring-2 {
          width: 76%; height: 76%; opacity: 0.10;
          animation: ring-spin 18s linear infinite reverse;
        }
        .ps-ring-3 {
          width: 60%; height: 60%; opacity: 0.07;
          border-style: dotted;
          animation: ring-spin 12s linear infinite;
        }
        @keyframes ring-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        .ps-glow-core {
          position: absolute; width: 55%; height: 55%; border-radius: 50%;
          background: radial-gradient(circle, rgba(200,150,10,0.12) 0%, transparent 70%);
          animation: glow-pulse 3s ease-in-out infinite;
          pointer-events: none;
        }
        @keyframes glow-pulse {
          0%,100% { transform: scale(1);   opacity: 0.8; }
          50%     { transform: scale(1.15); opacity: 1; }
        }

        /* orbit dots */
        .ps-orbit-dot {
          position: absolute; width: 7px; height: 7px; border-radius: 50%;
          background: #c8960a; opacity: 0.3;
          top: 50%; left: 50%; margin-top: -3.5px; margin-left: -3.5px;
          transform-origin: 0 0;
          animation: orbit-fade 4s ease-in-out infinite;
        }
        @keyframes orbit-fade {
          0%,100% { opacity: 0.15; transform: rotate(var(--r,0deg)) translateX(130px) scale(0.7); }
          50%     { opacity: 0.45; transform: rotate(var(--r,0deg)) translateX(130px) scale(1.2); }
        }

        .ps-badge {
          position: absolute; top: 5%; left: 0%;
          background: linear-gradient(135deg, #c8960a, #e8b830);
          color: #fff; font-size: 11px; font-weight: 700;
          letter-spacing: 0.8px; padding: 6px 13px;
          border-radius: 20px; z-index: 5;
          text-transform: uppercase;
          box-shadow: 0 4px 14px rgba(200,150,10,0.4);
          animation: badge-bob 3s ease-in-out infinite;
        }
        @keyframes badge-bob {
          0%,100% { transform: translateY(0) rotate(-2deg); }
          50%     { transform: translateY(-5px) rotate(1deg); }
        }

        .ps-tag-fssai {
          position: absolute; bottom: 22%; right: 0%;
          background: rgba(255,255,255,0.92);
          border: 1px solid #c8960a; color: #7a5c3a;
          font-size: 10px; font-weight: 600; letter-spacing: 0.5px;
          padding: 4px 10px; border-radius: 12px; z-index: 5;
          animation: badge-bob 3.5s 1s ease-in-out infinite;
        }

        /* ── IMAGE — fully visible, no wash ── */
        .ps-img-wrap {
          position: relative; z-index: 4;
          width: 68%; display: flex; align-items: center; justify-content: center;
          filter: drop-shadow(0 20px 40px rgba(80,40,5,0.28));
          transition: opacity 0.32s ease, transform 0.32s ease;
          animation: bottle-float 4.5s ease-in-out infinite;
        }
        @keyframes bottle-float {
          0%,100% { transform: translateY(0px)   rotate(-0.8deg); }
          50%     { transform: translateY(-14px)  rotate(0.8deg); }
        }
        .ps-out { opacity: 0; transform: translateY(12px) scale(0.95) !important; animation: none !important; }
        .ps-in  { opacity: 1; }

        /* THE FIX: image must be fully opaque, no filter on parent */
        .ps-img {
          width: 100%; height: auto; object-fit: contain;
          max-height: 290px;
          display: block;
        }

        /* Shine sweep across bottle */
        .ps-shine {
          position: absolute; z-index: 5; pointer-events: none;
          width: 30%; height: 80%; border-radius: 50%;
          background: linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.18) 50%, transparent 70%);
          animation: shine-sweep 4s ease-in-out infinite;
        }
        @keyframes shine-sweep {
          0%,100% { transform: translateX(-60px) skewX(-10deg); opacity: 0; }
          40%     { opacity: 1; }
          60%     { transform: translateX(60px) skewX(-10deg); opacity: 0; }
        }

        .ps-label {
          position: absolute; bottom: 14%; z-index: 6;
          background: rgba(253,248,235,0.95);
          border: 1.5px solid rgba(200,150,10,0.3);
          color: #7a5c3a; font-size: 12px; letter-spacing: 0.5px;
          padding: 6px 16px; border-radius: 20px;
          box-shadow: 0 4px 16px rgba(200,150,10,0.12);
          white-space: nowrap;
          animation: label-pop 0.4s ease;
        }
        @keyframes label-pop {
          from { transform: scale(0.9); opacity: 0; }
          to   { transform: scale(1);   opacity: 1; }
        }
        .ps-dots { position: absolute; bottom: 2%; display: flex; gap: 8px; z-index: 6; }
        .ps-dot {
          width: 8px; height: 8px; border-radius: 50%;
          border: 1.5px solid #c8960a; background: transparent;
          cursor: pointer; padding: 0; transition: all 0.25s;
        }
        .ps-dot-a { background: #c8960a; transform: scale(1.3); }

        /* ── RIGHT CARDS ── */
        .ab-cards {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: ${isMobile ? "26px 18px" : "32px 36px"};
        }
        .ab-card {
          display: flex; flex-direction: column;
          padding: 20px; border-radius: 16px;
          background: rgba(255,255,255,0.55);
          border: 1px solid rgba(200,150,10,0.12);
          backdrop-filter: blur(8px);
          transition: transform 0.28s ease, box-shadow 0.28s ease, background 0.28s;
          cursor: default;
          animation: fade-up 0.8s ease both;
        }
        .ab-card:hover {
          transform: translateY(-6px);
          background: rgba(255,255,255,0.85);
          box-shadow: 0 12px 36px rgba(200,150,10,0.14);
        }
        .ab-card:nth-child(1) { animation-delay: 0.1s; }
        .ab-card:nth-child(2) { animation-delay: 0.2s; }
        .ab-card:nth-child(3) { animation-delay: 0.3s; }
        .ab-card:nth-child(4) { animation-delay: 0.4s; }

        .ab-card-icon {
          width: 48px; height: 48px;
          background: rgba(200,150,10,0.09);
          border-radius: 12px; display: flex; align-items: center; justify-content: center;
          margin-bottom: 14px;
          transition: background 0.25s, transform 0.25s;
        }
        .ab-card:hover .ab-card-icon {
          background: rgba(200,150,10,0.18);
          transform: scale(1.1) rotate(-4deg);
        }
        .ab-card-title {
          font-family: 'Playfair Display', serif;
          font-size: ${isMobile ? "14px" : "16px"};
          font-weight: 800; color: #12100a; margin: 0 0 8px; line-height: 1.25;
        }
        .ab-card-text { font-size: 13px; color: #7a5c3a; line-height: 1.75; margin: 0; }

        /* card number accent */
        .ab-card-num {
          font-size: 10px; font-weight: 700; color: #c8960a;
          letter-spacing: 0.8px; margin-bottom: 6px; opacity: 0.7;
        }

        @media(max-width:900px){
          .ab-inner { grid-template-columns: 1fr 1fr; }
          .ab-left  { grid-column: 1 / -1; }
          .ps-root  { max-width: 260px; }
        }
        @media(max-width:600px){
          .ab-inner { grid-template-columns: 1fr; }
          .ab-cards { grid-template-columns: 1fr; gap: 20px; }
          .ab-heading { font-size: 34px; }
        }
      `}</style>

      <section className="ab-section">
        {/* Background layers */}
        <div className="ab-grid" />
        <div className="ab-blob ab-blob-1" />
        <div className="ab-blob ab-blob-2" />
        <div className="ab-blob ab-blob-3" />
        <FloatingParticles />

        {/* Curve accents */}
        <CurveLine style={{ top: 30, right: 80 }} />
        <CurveLine style={{ bottom: 40, left: 40, transform: "scaleX(-1)" }} />

        <div className="ab-inner">

          {/* ── LEFT ── */}
          <div className="ab-left">
            <p className="ab-eyebrow">Who we are</p>
            <h2 className="ab-heading">About<br />Vardhan</h2>
            <span className="ab-heading-line" />
            <p className="ab-body">
              Vardhan Foods began with a single dream — to bring pure, natural, and
              nutrition-rich mustard oil to every kitchen. Using Cold Press technology,
              we press seeds without heat or chemicals, preserving all natural vitamins
              and antioxidants. That purity is what sets Vardhan apart.
            </p>

            {/* Stats row */}
            <div className="ab-stats">
              <div className="ab-stat">
                <span className="ab-stat-num">100%</span>
                <span className="ab-stat-lbl">Natural</span>
              </div>
              <div className="ab-stat-divider" />
              <div className="ab-stat">
                <span className="ab-stat-num">0</span>
                <span className="ab-stat-lbl">Chemicals</span>
              </div>
              <div className="ab-stat-divider" />
              <div className="ab-stat">
                <span className="ab-stat-num">FSSAI</span>
                <span className="ab-stat-lbl">Certified</span>
              </div>
            </div>

            <div className="ab-sig-wrap">
              <Signature />
              <div className="ab-sig-name">Vardhan Foods Team</div>
              <div className="ab-sig-sub">Dhansoi, Buxar, Bihar</div>
            </div>
          </div>

          {/* ── CENTRE ── */}
          <ProductShowcase />

          {/* ── RIGHT CARDS ── */}
          <div className="ab-cards">
            {CARDS.map(({ Icon, title, text }, i) => (
              <div className="ab-card" key={title}>
                <div className="ab-card-num">0{i + 1}</div>
                <div className="ab-card-icon"><Icon /></div>
                <h3 className="ab-card-title">{title}</h3>
                <p className="ab-card-text">{text}</p>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}
