import { useEffect, useRef, useState } from "react";

// ─── Design tokens ────────────────────────────────────────────────────────────
const T = {
  gold: "#C8922A",
  goldLight: "#E8B84B",
  goldPale: "#FDF4DC",
  goldGlow: "rgba(200,146,42,0.18)",
  olive: "#2C3A1E",
  oliveLight: "#4A5E30",
  cream: "#FAF6ED",
  ink: "#1A1A14",
  white: "#FFFFFF",
};

// ─── Cert data ────────────────────────────────────────────────────────────────
const CERTS = [
  {
    id: "fssai", short: "FSSAI", label: "Food Safety Certified",
    number: "20424042000223", issuer: "Food Safety & Standards Authority of India",
   category: "Vegetable Oil & Processing",
    icon: FSSAIIcon, graphic: DropGraphic, accentAngle: "135deg",
  },
  {
    id: "gst", short: "GST", label: "GST Registered",
    number: "10FHXPP7007M1ZR", issuer: "Government of India — Regular Registration",
     category: "M/s Roviial Agro, Bihar",
    icon: GSTIcon, graphic: SealGraphic, accentAngle: "160deg",
  },
  {
    id: "udyam", short: "MSME", label: "MSME Udyam Registered",
    number: "UDYAM-BR-09-0015154", issuer: "Ministry of Micro, Small & Medium Enterprises",
   category: "Micro Enterprise · Manufacturing",
    icon: UdyamIcon, graphic: LeafGraphic, accentAngle: "45deg",
  },
  {
    id: "edp", short: "KVIC", label: "PMEGP Certified",
    number: "SMD1395001924108", issuer: "Khadi & Village Industries Commission",
     category: "Entrepreneurship Development · 10-Day",
    icon: KVICIcon, graphic: StarGraphic, accentAngle: "110deg",
  },
];

// ─── Ratio data (3 different styles) ─────────────────────────────────────────
const PURITY_RATIOS = [
  { label: "Cold-Press Oil", pct: 100, color: T.gold },
  { label: "Zero Chemicals", pct: 100, color: T.oliveLight },
  { label: "Natural Vitamins", pct: 97, color: "#B87333" },
  { label: "Authentic Flavour", pct: 95, color: "#8A9E60" },
];

const NUTRITION_RADIALS = [
  { label: "Omega-3", value: 82, color: T.gold },
  { label: "Vitamin E", value: 74, color: T.oliveLight },
  { label: "Antioxidants", value: 91, color: "#C47A2A" },
];

const PROCESS_STEPS = [
  { label: "Seed Selection", pct: 100, icon: "🌱" },
  { label: "Cold Pressing",  pct: 100, icon: "⚙️" },
  { label: "Filtration",     pct: 100, icon: "🔬" },
  { label: "FSSAI Testing",  pct: 100, icon: "✅" },
  { label: "Sealed Bottling",pct: 100, icon: "🫙" },
];

// ─── SVG Icons ────────────────────────────────────────────────────────────────
function FSSAIIcon({ size = 36, color = T.gold }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
      <circle cx="18" cy="18" r="16" stroke={color} strokeWidth="2" fill="none" />
      <path d="M10 18c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M13 22l2-4 3 2 3-2 2 4" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="18" cy="13" r="2" fill={color} />
    </svg>
  );
}
function GSTIcon({ size = 36, color = T.gold }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
      <rect x="6" y="8" width="24" height="20" rx="3" stroke={color} strokeWidth="2" fill="none" />
      <path d="M6 14h24" stroke={color} strokeWidth="1.5" />
      <path d="M12 20h4M12 24h7" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M24 19l2 2-2 2" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function UdyamIcon({ size = 36, color = T.gold }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
      <path d="M6 28V16l6-6 6 6V28" stroke={color} strokeWidth="2" strokeLinejoin="round" fill="none" />
      <path d="M18 28V20h6v8" stroke={color} strokeWidth="2" strokeLinejoin="round" fill="none" />
      <path d="M4 28h28" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="20" r="2" fill={color} />
    </svg>
  );
}
function KVICIcon({ size = 36, color = T.gold }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
      <polygon points="18,4 22,14 33,14 24,21 27,32 18,25 9,32 12,21 3,14 14,14"
        stroke={color} strokeWidth="1.8" fill="none" strokeLinejoin="round" />
    </svg>
  );
}

// ─── BG Graphics ──────────────────────────────────────────────────────────────
function DropGraphic() {
  return (
    <svg viewBox="0 0 120 140" fill="none" style={{ position:"absolute", right:-16, bottom:-12, width:100, height:120, opacity:0.12, pointerEvents:"none" }}>
      <path d="M60 10C60 10 20 60 20 90C20 113 38 130 60 130C82 130 100 113 100 90C100 60 60 10 60 10Z" fill={T.gold} />
    </svg>
  );
}
function SealGraphic() {
  return (
    <svg viewBox="0 0 120 120" fill="none" style={{ position:"absolute", right:-10, bottom:-10, width:90, height:90, opacity:0.1, pointerEvents:"none" }}>
      {[0,30,60,90,120,150,180,210,240,270,300,330].map((deg,i) => (
        <rect key={i} x="56" y="4" width="8" height="22" rx="4" fill={T.gold} transform={`rotate(${deg} 60 60)`} />
      ))}
      <circle cx="60" cy="60" r="30" fill={T.gold} />
    </svg>
  );
}
function LeafGraphic() {
  return (
    <svg viewBox="0 0 120 120" fill="none" style={{ position:"absolute", right:-14, bottom:-14, width:100, height:100, opacity:0.11, pointerEvents:"none" }}>
      <path d="M60 110C30 80 10 50 30 20C50-10 90 10 100 40C110 70 80 100 60 110Z" fill={T.gold} />
      <path d="M60 110L60 30" stroke={T.goldLight} strokeWidth="2" />
      <path d="M60 70L40 50M60 85L80 65" stroke={T.goldLight} strokeWidth="1.5" />
    </svg>
  );
}
function StarGraphic() {
  return (
    <svg viewBox="0 0 120 120" fill="none" style={{ position:"absolute", right:-10, bottom:-10, width:90, height:90, opacity:0.1, pointerEvents:"none" }}>
      <polygon points="60,5 72,42 110,42 80,64 92,100 60,78 28,100 40,64 10,42 48,42" fill={T.gold} />
    </svg>
  );
}

// ─── Floating seeds bg ────────────────────────────────────────────────────────
const SEEDS = Array.from({ length: 20 }, (_, i) => ({
  id: i, x: Math.random() * 100,
  delay: Math.random() * 7, duration: 7 + Math.random() * 7,
  size: 3 + Math.random() * 5, opacity: 0.05 + Math.random() * 0.09,
}));
function FloatingSeeds() {
  return (
    <div style={{ position:"absolute", inset:0, overflow:"hidden", pointerEvents:"none" }}>
      {SEEDS.map(s => (
        <div key={s.id} style={{
          position:"absolute", left:`${s.x}%`, bottom:"-10px",
          width:s.size, height:s.size*1.6,
          borderRadius:"50% 50% 50% 50% / 60% 60% 40% 40%",
          background:T.gold, opacity:s.opacity,
          animation:`floatSeed ${s.duration}s ${s.delay}s infinite linear`,
        }} />
      ))}
    </div>
  );
}

// ─── CountUp ──────────────────────────────────────────────────────────────────
function CountUp({ target, duration = 1400, suffix = "" }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      let start = null;
      const step = ts => {
        if (!start) start = ts;
        const p = Math.min((ts - start) / duration, 1);
        setVal(Math.floor(p * target));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target, duration]);
  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}

// ─── useInView hook ───────────────────────────────────────────────────────────
function useInView(threshold = 0.25) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

// ══════════════════════════════════════════════════════════════════════════════
// RATIO STYLE 1 — Horizontal liquid fill bars  (with floating bottle left)
// ══════════════════════════════════════════════════════════════════════════════
function LiquidBarRatios() {
  const [secRef, secVisible] = useInView(0.2);
  const [animated, setAnimated] = useState(false);
  useEffect(() => { if (secVisible) setTimeout(() => setAnimated(true), 200); }, [secVisible]);

  return (
    <div
      ref={secRef}
      style={{
        display:"grid", gridTemplateColumns:"1fr 1fr", gap:0,
        background:T.olive, borderRadius:24, overflow:"hidden",
        marginBottom:56,
        opacity: secVisible ? 1 : 0,
        transform: secVisible ? "translateY(0)" : "translateY(40px)",
        transition:"opacity 0.7s ease, transform 0.7s ease",
      }}
    >
      {/* LEFT — floating bottle */}
      <div style={{
        position:"relative", overflow:"hidden",
        background:`linear-gradient(160deg, #1A2710 0%, ${T.olive} 100%)`,
        display:"flex", alignItems:"center", justifyContent:"center",
        minHeight:340, padding:"40px 24px",
      }}>
        {/* radial glow */}
        <div style={{
          position:"absolute", width:260, height:260, borderRadius:"50%",
          background:`radial-gradient(circle, ${T.goldGlow} 0%, transparent 70%)`,
          top:"50%", left:"50%", transform:"translate(-50%,-50%)",
          pointerEvents:"none",
        }} />
        {/* Bottle image — animated float */}
        <img
          src="/vardhan-oil.png"
          alt="Vardhan Cold Press Mustard Oil"
          style={{
            width:160, maxHeight:300, objectFit:"contain",
            position:"relative", zIndex:1,
            animation:"bottleFloat 4s ease-in-out infinite",
            filter:"drop-shadow(0 24px 32px rgba(0,0,0,0.5))",
          }}
          onError={e => { e.target.src="/bottle.webp"; }}
        />
        {/* badges */}
        <div style={{
          position:"absolute", bottom:28, left:24,
          display:"flex", flexDirection:"column", gap:8,
        }}>
          {["100% Natural","Zero Chemicals","Cold Press"].map((b,i) => (
            <span key={i} style={{
              fontSize:11, fontWeight:700, color:T.gold,
              background:"rgba(200,146,42,0.15)",
              border:`1px solid rgba(200,146,42,0.3)`,
              borderRadius:20, padding:"4px 12px",
              opacity: animated ? 1 : 0,
              transform: animated ? "translateX(0)" : "translateX(-20px)",
              transition:`opacity 0.5s ${0.4 + i*0.15}s ease, transform 0.5s ${0.4+i*0.15}s ease`,
            }}>{b}</span>
          ))}
        </div>
      </div>

      {/* RIGHT — liquid bars */}
      <div style={{
        padding:"40px 36px", background:T.cream,
        display:"flex", flexDirection:"column", justifyContent:"center", gap:28,
      }}>
        <div>
          <h3 style={{ margin:"0 0 6px", fontSize:22, fontWeight:900, color:T.ink }}>
            Purity, Measured.
          </h3>
          <p style={{ margin:0, fontSize:13, color:"#7A6840", lineHeight:1.6 }}>
            Every batch of Vardhan oil undergoes FSSAI-grade testing before it reaches your kitchen.
          </p>
        </div>
        {PURITY_RATIOS.map((r, i) => (
          <div key={i}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
              <span style={{ fontSize:13, fontWeight:700, color:T.ink }}>{r.label}</span>
              <span style={{ fontSize:13, fontWeight:800, color:r.color }}>
                {animated ? r.pct : 0}%
              </span>
            </div>
            {/* track */}
            <div style={{ height:10, background:"#E8DFC8", borderRadius:99, overflow:"hidden" }}>
              <div style={{
                height:"100%", borderRadius:99,
                background:`linear-gradient(90deg, ${r.color}cc, ${r.color})`,
                width: animated ? `${r.pct}%` : "0%",
                transition:`width 1.1s ${0.1 + i*0.15}s cubic-bezier(.4,0,.2,1)`,
                boxShadow:`0 0 10px ${r.color}66`,
              }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// RATIO STYLE 2 — Circular radial / donut rings  (bottle floats right side)
// ══════════════════════════════════════════════════════════════════════════════
function RadialRings() {
  const [secRef, secVisible] = useInView(0.2);
  const [animated, setAnimated] = useState(false);
  useEffect(() => { if (secVisible) setTimeout(() => setAnimated(true), 300); }, [secVisible]);

  const R = 44, C = 2 * Math.PI * R;

  return (
    <div
      ref={secRef}
      style={{
        display:"grid", gridTemplateColumns:"1fr 1fr", gap:0,
        background:T.cream, borderRadius:24, overflow:"hidden",
        border:`1.5px solid #E8DFC8`, marginBottom:56,
        opacity: secVisible ? 1 : 0,
        transform: secVisible ? "translateY(0)" : "translateY(40px)",
        transition:"opacity 0.7s ease, transform 0.7s ease",
      }}
    >
      {/* LEFT — donut rings */}
      <div style={{
        padding:"44px 40px", display:"flex", flexDirection:"column",
        justifyContent:"center", gap:32,
      }}>
        <div>
          <h3 style={{ margin:"0 0 6px", fontSize:22, fontWeight:900, color:T.ink }}>
            Nutrition Profile
          </h3>
          <p style={{ margin:0, fontSize:13, color:"#7A6840", lineHeight:1.6 }}>
            Cold-press extraction retains what heat destroys — natural fatty acids, vitamin E, and antioxidants.
          </p>
        </div>
        <div style={{ display:"flex", gap:28, flexWrap:"wrap" }}>
          {NUTRITION_RADIALS.map((n, i) => {
            const offset = animated ? C - (n.value / 100) * C : C;
            return (
              <div key={i} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:10 }}>
                <svg width={110} height={110} viewBox="0 0 110 110">
                  {/* bg ring */}
                  <circle cx="55" cy="55" r={R} fill="none" stroke="#EDE7D4" strokeWidth="10" />
                  {/* value ring */}
                  <circle cx="55" cy="55" r={R} fill="none"
                    stroke={n.color} strokeWidth="10"
                    strokeDasharray={C} strokeDashoffset={offset}
                    strokeLinecap="round"
                    transform="rotate(-90 55 55)"
                    style={{ transition:`stroke-dashoffset 1.3s ${0.2+i*0.2}s cubic-bezier(.4,0,.2,1)` }}
                  />
                  {/* label inside */}
                  <text x="55" y="50" textAnchor="middle" fontSize="18" fontWeight="900" fill={n.color}>
                    {animated ? n.value : 0}
                  </text>
                  <text x="55" y="65" textAnchor="middle" fontSize="9" fill="#9B8A60">
                    /100
                  </text>
                </svg>
                <span style={{ fontSize:12, fontWeight:700, color:T.ink }}>{n.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* RIGHT — bottle with glow + oil drop rain */}
      <div style={{
        position:"relative", overflow:"hidden",
        background:`linear-gradient(145deg, ${T.goldPale} 0%, #F0E8CC 100%)`,
        display:"flex", alignItems:"center", justifyContent:"center",
        minHeight:340,
      }}>
        {/* animated oil drops */}
        {[...Array(8)].map((_, i) => (
          <div key={i} style={{
            position:"absolute",
            left:`${15 + i*10}%`,
            top:`${-10 + (i%3)*5}%`,
            width: 6 + (i%3)*4,
            height: (6 + (i%3)*4) * 1.5,
            borderRadius:"50% 50% 50% 50% / 60% 60% 40% 40%",
            background:`linear-gradient(180deg, ${T.goldLight}, ${T.gold})`,
            opacity:0.25,
            animation:`dropFall ${2.5+i*0.4}s ${i*0.3}s infinite ease-in`,
          }} />
        ))}
        <img
          src="/vardhan-oil.png"
          alt="Vardhan Mustard Oil Nutrition"
          style={{
            width:170, maxHeight:310, objectFit:"contain",
            position:"relative", zIndex:2,
            animation:"bottleFloat 3.5s ease-in-out infinite",
            filter:"drop-shadow(0 20px 28px rgba(200,146,42,0.35))",
          }}
          onError={e => { e.target.src="/vardhan-oil.png"; }}
        />
        {/* floating stat pill */}
        <div style={{
          position:"absolute", top:32, right:24,
          background:T.olive, borderRadius:14, padding:"10px 16px",
          opacity: animated ? 1 : 0,
          transform: animated ? "translateY(0)" : "translateY(-12px)",
          transition:"opacity 0.6s 0.8s ease, transform 0.6s 0.8s ease",
        }}>
          <div style={{ fontSize:20, fontWeight:900, color:T.goldLight, lineHeight:1 }}>
            <CountUp target={100} />%
          </div>
          <div style={{ fontSize:10, color:"#BFB08A", marginTop:2 }}>Pure Extract</div>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// RATIO STYLE 3 — Vertical step progress (process chain) + bottle hero
// ══════════════════════════════════════════════════════════════════════════════
function ProcessSteps() {
  const [secRef, secVisible] = useInView(0.2);

  return (
    <div
      ref={secRef}
      style={{
        background: T.olive, borderRadius:24, overflow:"hidden",
        padding:"52px 48px", marginBottom:56,
        position:"relative",
        opacity: secVisible ? 1 : 0,
        transform: secVisible ? "translateY(0)" : "translateY(40px)",
        transition:"opacity 0.7s ease, transform 0.7s ease",
      }}
    >
      {/* Section label */}
      <div style={{ textAlign:"center", marginBottom:44 }}>
        <span style={{ fontSize:11, color:T.gold, fontWeight:700, letterSpacing:"0.12em" }}>
          FROM SEED TO BOTTLE
        </span>
        <h3 style={{ margin:"10px 0 0", fontSize:24, fontWeight:900, color:T.white }}>
          Our Cold-Press Process
        </h3>
      </div>

      {/* 3-col layout: steps | bottle | steps */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr auto 1fr", gap:"0 36px", alignItems:"center" }}>

        {/* Left steps */}
        <div style={{ display:"flex", flexDirection:"column", gap:0 }}>
          {PROCESS_STEPS.slice(0,3).map((s, i) => (
            <StepRow key={i} step={s} index={i} visible={secVisible} align="right" />
          ))}
        </div>

        {/* Center bottle */}
        <div style={{ position:"relative", display:"flex", flexDirection:"column", alignItems:"center" }}>
          {/* vertical line behind bottle */}
          <div style={{
            position:"absolute", top:0, bottom:0, width:2,
            background:`linear-gradient(to bottom, transparent, ${T.gold}44, transparent)`,
            left:"50%", transform:"translateX(-50%)",
          }} />
          <div style={{
            position:"relative", zIndex:2,
            background:`radial-gradient(circle, rgba(200,146,42,0.12) 0%, transparent 70%)`,
            borderRadius:"50%", padding:16,
          }}>
            <img
              src="/vardhan-oil.png"
              alt="Vardhan Oil Bottle"
              style={{
                width:110, objectFit:"contain",
                animation:"bottleFloat 4s ease-in-out infinite",
                filter:"drop-shadow(0 16px 24px rgba(0,0,0,0.5))",
              }}
              onError={e => { e.target.src="/vardhan-oil.png"; }}
            />
          </div>
          {/* FSSAI badge below bottle */}
          <div style={{
            marginTop:12, background:T.gold, borderRadius:12,
            padding:"8px 18px", textAlign:"center",
            opacity: secVisible ? 1 : 0,
            transition:"opacity 0.6s 1s ease",
          }}>
            <div style={{ fontSize:10, fontWeight:800, color:T.olive, letterSpacing:"0.06em" }}>FSSAI</div>
            <div style={{ fontSize:9, color:T.olive, opacity:0.8 }}>Certified</div>
          </div>
        </div>

        {/* Right steps */}
        <div style={{ display:"flex", flexDirection:"column", gap:0 }}>
          {PROCESS_STEPS.slice(2,5).map((s, i) => (
            <StepRow key={i} step={s} index={i+2} visible={secVisible} align="left" />
          ))}
        </div>
      </div>
    </div>
  );
}

function StepRow({ step, index, visible, align }) {
  return (
    <div style={{
      display:"flex", alignItems:"center",
      flexDirection: align === "right" ? "row-reverse" : "row",
      gap:14, marginBottom:28,
      opacity: visible ? 1 : 0,
      transform: visible
        ? "translateX(0)"
        : align === "right" ? "translateX(-24px)" : "translateX(24px)",
      transition:`opacity 0.55s ${0.2 + index*0.12}s ease, transform 0.55s ${0.2+index*0.12}s ease`,
    }}>
      {/* icon circle */}
      <div style={{
        width:44, height:44, borderRadius:"50%",
        background:"rgba(200,146,42,0.15)",
        border:`1.5px solid rgba(200,146,42,0.35)`,
        display:"flex", alignItems:"center", justifyContent:"center",
        fontSize:20, flexShrink:0,
      }}>
        {step.icon}
      </div>
      {/* text */}
      <div style={{ textAlign: align === "right" ? "right" : "left" }}>
        <div style={{ fontSize:13, fontWeight:700, color:T.white }}>{step.label}</div>
        <div style={{ fontSize:11, color:T.goldLight, marginTop:2 }}>100% Verified</div>
      </div>
    </div>
  );
}

// ─── Cert card ────────────────────────────────────────────────────────────────
function CertCard({ cert, index }) {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef(null);
  const Icon = cert.icon;
  const Graphic = cert.graphic;

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setTimeout(() => setVisible(true), index * 110); obs.disconnect(); }
    }, { threshold: 0.2 });
    if (cardRef.current) obs.observe(cardRef.current);
    return () => obs.disconnect();
  }, [index]);

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position:"relative", overflow:"hidden",
        background:T.white,
        border:`1.5px solid ${hovered ? T.gold : "#E8DFC8"}`,
        borderRadius:16, padding:"28px 24px 24px",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(32px) scale(0.97)",
        transition:"opacity 0.55s ease, transform 0.55s ease, border-color 0.25s, box-shadow 0.25s",
        boxShadow: hovered
          ? `0 12px 40px rgba(200,146,42,0.18), 0 2px 8px rgba(0,0,0,0.06)`
          : "0 2px 16px rgba(0,0,0,0.06)",
      }}
    >
      <div style={{
        position:"absolute", top:0, left:0, right:0, height:3,
        background:`linear-gradient(${cert.accentAngle}, ${T.gold}, ${T.goldLight})`,
        borderRadius:"16px 16px 0 0",
        transform: hovered ? "scaleX(1)" : "scaleX(0.35)",
        transformOrigin:"left",
        transition:"transform 0.35s ease",
      }} />
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:16 }}>
        <div style={{
          display:"inline-flex", alignItems:"center", gap:6,
          background:T.goldPale, border:`1px solid ${T.gold}33`,
          borderRadius:8, padding:"5px 12px",
        }}>
          <Icon size={18} color={T.gold} />
          <span style={{ fontSize:11, fontWeight:700, color:T.olive, letterSpacing:"0.04em" }}>{cert.short}</span>
        </div>
        <div style={{
          width:28, height:28, borderRadius:"50%",
          background: hovered ? T.gold : "#F0EBDC",
          display:"flex", alignItems:"center", justifyContent:"center",
          transition:"background 0.25s",
        }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 7l3 3 5-5" stroke={hovered ? T.white : T.gold} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
      <p style={{ margin:"0 0 6px", fontSize:14, fontWeight:700, color:T.ink }}>{cert.label}</p>
      <p style={{
        margin:"0 0 12px", fontSize:11, fontFamily:"monospace",
        color:T.gold, letterSpacing:"0.08em", fontWeight:600,
        background:T.goldPale, display:"inline-block", padding:"3px 8px", borderRadius:5,
      }}>{cert.number}</p>
      <div style={{ height:1, background:"#EDE7D4", margin:"0 0 12px" }} />
      <p style={{ margin:"0 0 4px", fontSize:12, color:"#6B5F3E", lineHeight:1.5 }}>{cert.issuer}</p>
      <p style={{ margin:"0 0 4px", fontSize:11.5, color:T.oliveLight, fontWeight:600 }}>{cert.category}</p>
      <p style={{ margin:0, fontSize:11, color:"#9B8A60", display:"flex", alignItems:"center", gap:5 }}>
        <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
          <circle cx="5.5" cy="5.5" r="4.5" stroke="#9B8A60" strokeWidth="1"/>
          <path d="M5.5 3v2.5l1.5 1" stroke="#9B8A60" strokeWidth="1" strokeLinecap="round"/>
        </svg>
        {cert.validity}
      </p>
      <Graphic />
    </div>
  );
}

// ─── Trust stats ──────────────────────────────────────────────────────────────
function TrustStats() {
  const stats = [
    { value:4,    suffix:"+",  label:"Gov't Certifications" },
    { value:100,  suffix:"%",  label:"Cold Press Purity"    },
    { value:0,    suffix:"",   label:"Chemicals Used"       },
    { value:2024, suffix:"",   label:"Est. Year"            },
  ];
  return (
    <div style={{
      display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:1,
      background:"#D4C49A", borderRadius:14, overflow:"hidden", marginBottom:56,
    }}>
      {stats.map((s,i) => (
        <div key={i} style={{ background:T.olive, padding:"22px 16px", textAlign:"center" }}>
          <div style={{ fontSize:28, fontWeight:800, color:T.goldLight, lineHeight:1, marginBottom:4 }}>
            <CountUp target={s.value} />{s.suffix}
          </div>
          <div style={{ fontSize:11, color:"#BFB08A" }}>{s.label}</div>
        </div>
      ))}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// MAIN EXPORT
// ══════════════════════════════════════════════════════════════════════════════
export default function CertificationSection() {
  const [titleVisible, setTitleVisible] = useState(false);
  const titleRef = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setTitleVisible(true); },
      { threshold: 0.3 }
    );
    if (titleRef.current) obs.observe(titleRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @keyframes floatSeed {
          0%  { transform:translateY(0) rotate(0deg); opacity:0; }
          10% { opacity:1; }
          90% { opacity:1; }
          100%{ transform:translateY(-110vh) rotate(360deg); opacity:0; }
        }
        @keyframes bottleFloat {
          0%,100% { transform:translateY(0px) rotate(-1deg); }
          50%     { transform:translateY(-14px) rotate(1deg); }
        }
        @keyframes dropFall {
          0%   { transform:translateY(-40px); opacity:0; }
          20%  { opacity:1; }
          100% { transform:translateY(120vh); opacity:0; }
        }
        @media (max-width: 900px) {
          .ratio-grid-2col { grid-template-columns: 1fr !important; }
          .cert-grid-4col  { grid-template-columns: 1fr 1fr !important; }
          .process-3col    { grid-template-columns: 1fr !important; }
          .process-3col > *:nth-child(2) { order:-1; }
          .stats-4col      { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 540px) {
          .cert-grid-4col { grid-template-columns: 1fr !important; }
          .stats-4col     { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>

      <section id="certifications" style={{
        position:"relative", background:T.cream,
        padding:"80px 0 100px", overflow:"hidden",
      }}>
        {/* Decorative top arc */}
        <div style={{
          position:"absolute", top:-120, left:"50%",
          transform:"translateX(-50%)", width:"140%", height:200,
          borderRadius:"50%", background:T.olive, opacity:0.05, pointerEvents:"none",
        }} />

        <FloatingSeeds />

        <div style={{ maxWidth:1100, margin:"0 auto", padding:"0 24px", position:"relative" }}>

          {/* ── Header ── */}
          <div ref={titleRef} style={{
            textAlign:"center", marginBottom:52,
            opacity: titleVisible ? 1 : 0,
            transform: titleVisible ? "translateY(0)" : "translateY(24px)",
            transition:"opacity 0.6s ease, transform 0.6s ease",
          }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:10, marginBottom:16 }}>
              <span style={{ display:"block", width:32, height:1.5, background:T.gold, borderRadius:2 }} />
              <span style={{ fontSize:12, color:T.gold, fontWeight:700, letterSpacing:"0.12em" }}>
                VERIFIED · TRUSTED · CERTIFIED
              </span>
              <span style={{ display:"block", width:32, height:1.5, background:T.gold, borderRadius:2 }} />
            </div>
            <h2 style={{
              fontSize:38, fontWeight:900, color:T.ink, lineHeight:1.15,
              margin:"0 0 14px", maxWidth:560, marginLeft:"auto", marginRight:"auto",
            }}>
              Every Bottle Backed{" "}
              <span style={{ position:"relative", display:"inline-block", color:T.olive }}>
                by Proof
                <svg viewBox="0 0 140 12" style={{ position:"absolute", bottom:-4, left:0, width:"100%", overflow:"visible" }}>
                  <path d="M4 8C40 2 100 12 136 6" stroke={T.gold} strokeWidth="3" fill="none" strokeLinecap="round"/>
                </svg>
              </span>
            </h2>
            <p style={{ fontSize:15, color:"#6B5F3E", maxWidth:460, margin:"0 auto", lineHeight:1.7 }}>
              Vardhan Foods holds every certification required to manufacture,
              sell, and stand behind 100% cold-press mustard oil in India.
            </p>
          </div>

          {/* ── Stats ── */}
          <div className="stats-4col">
            <TrustStats />
          </div>

          {/* ══ RATIO 1 — Liquid fill bars + bottle left ══ */}
          <div className="ratio-grid-2col">
            <LiquidBarRatios />
          </div>

          {/* ══ RATIO 2 — Donut radial rings + bottle right ══ */}
          <div className="ratio-grid-2col">
            <RadialRings />
          </div>

          {/* ══ RATIO 3 — Process step chain + bottle centre ══ */}
          <div className="process-3col">
            <ProcessSteps />
          </div>

          {/* ── Cert cards ── */}
          <div className="cert-grid-4col" style={{
            display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:20, marginBottom:40,
          }}>
            {CERTS.map((cert, i) => <CertCard key={cert.id} cert={cert} index={i} />)}
          </div>

          {/* ── Footer line ── */}
          <div style={{
            textAlign:"center", display:"flex", alignItems:"center",
            justifyContent:"center", gap:12, opacity:0.65,
          }}>
            <div style={{ flex:1, height:1, background:"#D4C49A", maxWidth:120 }} />
            <p style={{ margin:0, fontSize:12, color:"#8A7650" }}>
              All certifications are government-issued and publicly verifiable
            </p>
            <div style={{ flex:1, height:1, background:"#D4C49A", maxWidth:120 }} />
          </div>
        </div>
      </section>
    </>
  );
}