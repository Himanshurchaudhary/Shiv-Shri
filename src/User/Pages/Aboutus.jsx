import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";

const stats = [
  { value: "2K+", label: "Happy Customers" },
  { value: "10+", label: "Oil Variants" },
  { value: "100%", label: "Natural & Chemical-Free" },
  { value: "1", label: "FSSAI Certified Unit" },
];

const values = [
  {
    icon: "🌿",
    title: "100% Natural",
    desc: "Every bottle of Vardhan oil is extracted without heat, chemicals, or additives — preserving the natural goodness your family deserves.",
  },
  {
    icon: "🏭",
    title: "Cold-Press Extraction",
    desc: "Our traditional cold-press method retains natural fatty acids, vitamin E, and antioxidants that heat-refining destroys.",
  },
  {
    icon: "✅",
    title: "FSSAI Certified",
    desc: "Vardhan Foods is registered under the Food Safety and Standards Authority of India (Reg. No. 20424042000223), ensuring every product meets strict safety standards.",
  },
  {
    icon: "🤝",
    title: "Direct from Source",
    desc: "We source raw seeds directly from local farmers in Bihar, cutting out middlemen to deliver purer oil at honest prices.",
  },
];

function CountUp({ target }) {
  const [count, setCount] = useState(0);
  const numeric = parseInt(target.replace(/\D/g, ""));

  useEffect(() => {
    if (!numeric) return;
    let start = 0;
    const step = Math.ceil(numeric / 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= numeric) {
        setCount(numeric);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 20);
    return () => clearInterval(timer);
  }, [numeric]);

  if (!numeric) return <span>{target}</span>;

  return (
    <span>
      {count.toLocaleString("en-IN")}
      {target.replace(/[0-9,]/g, "")}
    </span>
  );
}

export default function AboutUs() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <Helmet>
        <title>About Us - Vardhan Foods | Cold-Pressed Natural Oils</title>
        <meta
          name="description"
          content="Learn about Vardhan Foods — a FSSAI-certified cold-pressed oil brand from Bihar delivering 100% natural mustard and vegetable oils directly to your doorstep."
        />
        <link rel="canonical" href="https://vardhanfoods.com/about" />
      </Helmet>

      <div
        className="min-h-screen font-sans text-gray-800"
        style={{ backgroundColor: "#f5f0e8" }}
      >
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
          .vd-font { font-family: 'DM Sans', sans-serif; }

          .vd-hero-bg {
            background: radial-gradient(ellipse at 60% 40%, #4a5e28 0%, #3b4a1f 35%, #2d3a1e 70%, #1e2814 100%);
            position: relative;
            overflow: hidden;
          }

          .vd-hero-bg::before {
            content: '';
            position: absolute;
            inset: 0;
            background:
              radial-gradient(ellipse at 25% 60%, rgba(212,160,23,0.12) 0%, transparent 55%),
              radial-gradient(ellipse at 80% 10%, rgba(255,255,255,0.04) 0%, transparent 40%);
            pointer-events: none;
          }

          .vd-watermark {
            position: absolute;
            font-weight: 900;
            font-size: 9rem;
            color: rgba(255,255,255,0.04);
            line-height: 1;
            user-select: none;
            pointer-events: none;
          }

          .vd-value-card:hover {
            border-color: rgba(212,160,23,0.45) !important;
            box-shadow: 0 4px 20px rgba(212,160,23,0.12);
          }

          .vd-contact-card:hover {
            border-color: rgba(212,160,23,0.45) !important;
            box-shadow: 0 4px 20px rgba(212,160,23,0.10);
          }

          .vd-timeline-dot {
            background: radial-gradient(ellipse at 60% 40%, #4a5e28 0%, #2d3a1e 100%);
          }
        `}</style>

        {/* ── HERO ── */}
        <section className="vd-hero-bg vd-font">
          <span className="vd-watermark" style={{ left: "16px", top: "50%", transform: "translateY(-50%)" }}>V</span>
          <span className="vd-watermark" style={{ right: "16px", bottom: "-20px" }}>VD</span>

          <div
            className={`relative z-10 max-w-4xl mx-auto px-6 py-24 text-center transition-all duration-700 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            {/* Badge */}
            <span
              className="inline-block text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-widest mb-5"
              style={{
                backgroundColor: "rgba(212,160,23,0.18)",
                border: "1px solid rgba(212,160,23,0.4)",
                color: "#d4a017",
              }}
            >
              Est. 2026 · Dhansoi, Buxar, Bihar
            </span>

            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-5 text-white drop-shadow">
              Pure Oils, Pressed the{" "}
              <br />
              <span style={{ color: "#d4a017" }}>Traditional Way</span>
            </h1>

            <p className="text-lg max-w-xl mx-auto leading-relaxed" style={{ color: "rgba(255,255,255,0.80)" }}>
              Vardhan Foods is a FSSAI-certified cold-pressed oil brand from Bihar —
              bringing you 100% natural mustard and vegetable oils with zero chemicals
              and authentic flavour.
            </p>

            {/* FSSAI pill */}
            <div
              className="inline-flex items-center gap-2 mt-6 px-4 py-2 rounded-full"
              style={{
                backgroundColor: "rgba(212,160,23,0.12)",
                border: "1px solid rgba(212,160,23,0.3)",
              }}
            >
              <span style={{ color: "#d4a017" }}>✅</span>
              <span className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.75)" }}>
                FSSAI Reg. No. 20424042000223 · Vegetable Oil & Processing
              </span>
            </div>
          </div>
        </section>

        {/* ── STATS ── */}
        <section className="bg-white border-b vd-font" style={{ borderColor: "rgba(212,160,23,0.2)" }}>
          <div className="max-w-4xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl font-extrabold" style={{ color: "#c8850a" }}>
                  <CountUp target={s.value} />
                </p>
                <p className="text-sm text-gray-500 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── OUR STORY ── */}
        <section className="max-w-4xl mx-auto px-6 py-16 vd-font">
          <div className="flex flex-col md:flex-row gap-12 items-center">

            {/* Left text */}
            <div className="md:w-1/2">
              <span
                className="text-xs font-bold uppercase tracking-widest"
                style={{ color: "#c8850a" }}
              >
                Our Story
              </span>
              <h2 className="text-3xl font-extrabold mt-2 mb-5 text-gray-800 leading-snug">
                Born from a belief in{" "}
                <span style={{ color: "#c8850a" }}>Pure, Honest Food</span>
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Vardhan Foods was founded in 2026 in Dhansoi, Buxar, Bihar — by people
                who believed families deserved better than chemically refined oils. The
                idea was simple: go back to the roots.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Our cold-press extraction process mimics the traditional wooden churner
                (Kachi Ghani) method, working at low temperatures to preserve every drop
                of nutrition — natural fatty acids, vitamin E, and antioxidants that
                refining destroys.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Today, Vardhan Foods is proudly FSSAI-certified and trusted by customers
                who refuse to compromise on what they put in their kitchen.
              </p>
            </div>

            {/* Timeline card */}
            <div className="md:w-1/2">
              <div
                className="rounded-2xl p-8"
                style={{
                  background: "linear-gradient(135deg, rgba(212,160,23,0.08) 0%, rgba(45,58,30,0.06) 100%)",
                  border: "1px solid rgba(212,160,23,0.22)",
                }}
              >
                <div className="space-y-5">
                  {[
                    { year: "2026", text: "Founded in Dhansoi, Buxar, Bihar" },
                    { year: "2026", text: "FSSAI Registration obtained (No. 20424042000223)" },
                    { year: "2026", text: "First batch of cold-pressed mustard oil delivered" },
                    { year: "2026 →", text: "Expanding product range & reaching more households across India" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div
                        className="vd-timeline-dot min-w-[72px] text-xs font-bold px-2 py-1 rounded text-center mt-0.5"
                        style={{ color: "#d4a017" }}
                      >
                        {item.year}
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── VALUES ── */}
        <section
          className="border-y vd-font"
          style={{
            backgroundColor: "#ffffff",
            borderColor: "rgba(212,160,23,0.18)",
          }}
        >
          <div className="max-w-4xl mx-auto px-6 py-16">
            <div className="text-center mb-12">
              <span
                className="text-xs font-bold uppercase tracking-widest"
                style={{ color: "#c8850a" }}
              >
                What We Stand For
              </span>
              <h2 className="text-3xl font-extrabold mt-2 text-gray-800">Our Values</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {values.map((v, i) => (
                <div
                  key={i}
                  className="vd-value-card flex gap-4 p-6 rounded-xl bg-white transition-all duration-300"
                  style={{ border: "1px solid rgba(212,160,23,0.18)" }}
                >
                  <div className="text-3xl mt-1">{v.icon}</div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">{v.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CONTACT US ── */}
        <section className="max-w-4xl mx-auto px-6 py-16 vd-font">
          <div className="text-center mb-10">
            <span
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: "#c8850a" }}
            >
              Get in Touch
            </span>
            <h2 className="text-3xl font-extrabold mt-2 text-gray-800">Contact Us</h2>
            <p className="text-gray-500 mt-3 text-sm max-w-md mx-auto">
              Have questions about our oils or want to place a bulk order? We'd love to hear from you.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

            {/* Phone 1 */}
            <a
              href="tel:+919229566651"
              className="vd-contact-card flex items-center gap-4 p-5 rounded-xl bg-white transition-all duration-300 group"
              style={{ border: "1px solid rgba(212,160,23,0.2)" }}
            >
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center text-xl transition-colors group-hover:opacity-80"
                style={{ backgroundColor: "rgba(212,160,23,0.12)" }}
              >
                📞
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium mb-0.5">WhatsApp / Call</p>
                <p className="font-bold text-gray-800">+91 92295 66651</p>
              </div>
            </a>

            {/* Phone 2 */}
            <a
              href="tel:+917765026501"
              className="vd-contact-card flex items-center gap-4 p-5 rounded-xl bg-white transition-all duration-300 group"
              style={{ border: "1px solid rgba(212,160,23,0.2)" }}
            >
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center text-xl transition-colors group-hover:opacity-80"
                style={{ backgroundColor: "rgba(212,160,23,0.12)" }}
              >
                📞
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium mb-0.5">WhatsApp / Call</p>
                <p className="font-bold text-gray-800">+91 77650 26501</p>
              </div>
            </a>

            {/* Email */}
            <a
              href="mailto:vardhanfoods9@gmail.com"
              className="vd-contact-card flex items-center gap-4 p-5 rounded-xl bg-white transition-all duration-300 group"
              style={{ border: "1px solid rgba(212,160,23,0.2)" }}
            >
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center text-xl transition-colors group-hover:opacity-80"
                style={{ backgroundColor: "rgba(212,160,23,0.12)" }}
              >
                ✉️
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium mb-0.5">Email Us</p>
                <p className="font-bold text-gray-800">vardhanfoods9@gmail.com</p>
              </div>
            </a>

            {/* Address */}
            <div
              className="flex items-center gap-4 p-5 rounded-xl bg-white"
              style={{ border: "1px solid rgba(212,160,23,0.2)" }}
            >
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center text-xl shrink-0"
                style={{ backgroundColor: "rgba(212,160,23,0.12)" }}
              >
                📍
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium mb-0.5">Our Address</p>
                <p className="font-bold text-gray-800 leading-snug text-sm">
                  C/O Mubarak Hussain, Dhansoi,<br />
                  Dumraon, Buxar, Bihar — 802117
                </p>
              </div>
            </div>
          </div>

          {/* FSSAI note */}
          <div
            className="mt-6 rounded-xl p-4 flex items-center gap-3"
            style={{
              backgroundColor: "rgba(45,58,30,0.05)",
              border: "1px solid rgba(45,58,30,0.15)",
            }}
          >
            <span className="text-lg">🏛️</span>
            <p className="text-xs text-gray-600">
              <span className="font-semibold">FSSAI Registered</span> · Registration No.{" "}
              <span className="font-semibold">20424042000223</span> · Issued by Department
              of Health & Family Welfare, Government of Bihar under FSS Act, 2006
            </p>
          </div>
        </section>

        {/* ── CTA BANNER ── */}
        <section
          className="vd-font"
          style={{
            background: "radial-gradient(ellipse at 60% 40%, #4a5e28 0%, #2d3a1e 70%, #1e2814 100%)",
          }}
        >
          <div className="max-w-4xl mx-auto px-6 py-14 text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold mb-3 text-white">
              Cook Pure. Live Healthy.{" "}
              <span style={{ color: "#d4a017" }}>🌿</span>
            </h2>
            <p className="mb-8 text-base" style={{ color: "rgba(255,255,255,0.75)" }}>
              Join thousands of families already cooking with Vardhan's cold-pressed oils.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href="tel:+919229566651"
                className="font-semibold text-sm px-6 py-3 rounded-xl"
                style={{ backgroundColor: "#d4a017", color: "#1e2814" }}
              >
                📞 Order Now — +91 92295 66651
              </a>
              <a
                href="mailto:vardhanfoods9@gmail.com"
                className="font-semibold text-sm px-6 py-3 rounded-xl border text-white"
                style={{
                  borderColor: "rgba(212,160,23,0.4)",
                  background: "rgba(212,160,23,0.15)",
                }}
              >
                ✉️ vardhanfoods9@gmail.com
              </a>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}