import { useState } from "react";
import { Helmet } from "react-helmet-async";

const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";

// ─── Responsive Hook ───────────────────────────────────────────────────────────
const useResponsive = () => {
  const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  return {
    isMobile: width < 600,
    isTablet: width >= 600 && width < 1024,
    isDesktop: width >= 1024,
    width,
  };
};

// ─── Icons ─────────────────────────────────────────────────────────────────────
const PhoneIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.38 2 2 0 0 1 3.58 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.56a16 16 0 0 0 6 6l.87-.87a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const MailIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const LocationIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const ClockIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const SendIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

// ─── Section Header (same as HomePage) ────────────────────────────────────────
const SectionHeader = ({ eyebrow, title }) => {
  const { isMobile } = useResponsive();
  return (
    <div style={{ textAlign: "center", marginBottom: isMobile ? 28 : 48 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, marginBottom: 14 }}>
        <div style={{ flex: 1, height: 1, background: "linear-gradient(to right, transparent, #d4b896)" }} />
        <span style={{
          fontSize: isMobile ? 10 : 11, fontWeight: 700, color: "#9c7c3e",
          letterSpacing: 4, textTransform: "uppercase", fontFamily: "Georgia, serif",
        }}>{eyebrow}</span>
        <div style={{ flex: 1, height: 1, background: "linear-gradient(to left, transparent, #d4b896)" }} />
      </div>
      <h2 style={{
        fontSize: isMobile ? 28 : 42, fontWeight: 700, color: "#1c1c1c",
        margin: "0 0 16px", fontFamily: "Georgia, 'Times New Roman', serif",
        letterSpacing: -0.5, lineHeight: 1.15,
      }}>
        {title}
      </h2>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
        <div style={{ width: 30, height: 1, background: "#c9a84c" }} />
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#c9a84c" }} />
        <div style={{ width: 40, height: 2, background: "#c9a84c" }} />
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#c9a84c" }} />
        <div style={{ width: 30, height: 1, background: "#c9a84c" }} />
      </div>
    </div>
  );
};

// ─── Info Card ─────────────────────────────────────────────────────────────────
const InfoCard = ({ icon, label, value, sub }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex", alignItems: "flex-start", gap: 16,
        padding: "20px 22px",
        background: "#fff", border: "1px solid #e8e0d0",
        borderRadius: 2, fontFamily: "Georgia, serif",
        transition: "box-shadow 0.25s, transform 0.25s",
        boxShadow: hovered ? "0 6px 24px rgba(0,0,0,0.10)" : "0 1px 4px rgba(0,0,0,0.05)",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
      }}
    >
      <div style={{
        width: 48, height: 48, borderRadius: 2,
        background: "#fdf8ee", border: "1px solid #e8e0d0",
        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
      }}>
        {icon}
      </div>
      <div>
        <div style={{ fontSize: 10, fontWeight: 700, color: "#9c7c3e", textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 4 }}>
          {label}
        </div>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#1c1c1c", marginBottom: 2 }}>
          {value}
        </div>
        {sub && <div style={{ fontSize: 12, color: "#888" }}>{sub}</div>}
      </div>
    </div>
  );
};

// ─── Input Field ───────────────────────────────────────────────────────────────
const inputStyle = (focused) => ({
  width: "100%", padding: "12px 16px",
  border: `1px solid ${focused ? "#c9a84c" : "#e8e0d0"}`,
  borderRadius: 2, fontSize: 13, color: "#1c1c1c",
  fontFamily: "Georgia, serif", outline: "none",
  background: "#fdfbf7",
  boxShadow: focused ? "0 0 0 3px rgba(201,168,76,0.12)" : "none",
  transition: "border-color 0.2s, box-shadow 0.2s",
  boxSizing: "border-box",
});

// ─── Main ContactPage ──────────────────────────────────────────────────────────
export default function ContactPage() {
  const { isMobile, isTablet } = useResponsive();

  const [form, setForm] = useState({ fullName: "", phone: "", subject: "", message: "" });
  const [focused, setFocused] = useState({});
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleFocus = (name) => setFocused((prev) => ({ ...prev, [name]: true }));
  const handleBlur = (name) => setFocused((prev) => ({ ...prev, [name]: false }));

  const handleSubmit = async () => {
    if (!form.fullName || !form.phone || !form.subject || !form.message) {
      setErrorMsg("Please fill in all required fields.");
      setStatus("error");
      return;
    }
    setStatus("sending");
    setErrorMsg("");

    try {
      if (!window.emailjs) {
        await new Promise((resolve, reject) => {
          const s = document.createElement("script");
          s.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
          s.onload = resolve;
          s.onerror = reject;
          document.head.appendChild(s);
        });
        window.emailjs.init(EMAILJS_PUBLIC_KEY);
      }
      await window.emailjs.send(
        EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID,
        { from_name: form.fullName, phone: form.phone, subject: form.subject, message: form.message },
        EMAILJS_PUBLIC_KEY
      );
      setStatus("success");
      setForm({ fullName: "", phone: "", subject: "", message: "" });
    } catch {
      if (EMAILJS_SERVICE_ID === "YOUR_SERVICE_ID" || EMAILJS_PUBLIC_KEY === "YOUR_PUBLIC_KEY") {
        setStatus("demo");
      } else {
        setErrorMsg("Failed to send message. Please try again.");
        setStatus("error");
      }
    }
  };

  const infoCards = [
    { icon: <PhoneIcon />, label: "Call Us", value: "+91 98765 43210", sub: "Mon–Sat, 9 AM – 6 PM" },
    { icon: <MailIcon />, label: "Email Us", value: "hello@sevencups.in", sub: "We reply within 24 hours" },
    { icon: <LocationIcon />, label: "Visit Us", value: "Noida, Uttar Pradesh", sub: "Sector 62, 201309" },
    { icon: <ClockIcon />, label: "Support Hours", value: "24 / 7 Online", sub: "Always here for you" },
  ];

  return (
    <>
      <Helmet>
        <title>Contact Us | Seven Cups</title>
      </Helmet>

      <style>{`
        * { box-sizing: border-box; }
        body { font-family: 'Georgia', 'Times New Roman', serif; }
        ::placeholder { color: #bbb; font-family: Georgia, serif; font-size: 13px; }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
      `}</style>

      <div style={{ maxWidth: 1400, margin: "0 auto", padding: isMobile ? "32px 12px 48px" : "48px 24px 80px", fontFamily: "Georgia, serif" }}>

        {/* ── Section Header ── */}
        <SectionHeader eyebrow="Get In Touch" title="Contact Us" />

        {/* ── Info Cards ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr 1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
          gap: isMobile ? 10 : 16,
          marginBottom: isMobile ? 32 : 56,
        }}>
          {infoCards.map((card, i) => <InfoCard key={i} {...card} />)}
        </div>

        {/* ── Main Content: Form + Map ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr" : "1fr 1fr",
          gap: isMobile ? 24 : 32,
        }}>

          {/* ── Contact Form ── */}
          <div style={{
            background: "#fff", border: "1px solid #e8e0d0",
            borderRadius: 2, padding: isMobile ? "24px 18px" : "40px 40px",
            boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
          }}>
            {/* Form header */}
            <div style={{ marginBottom: 28 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: "#9c7c3e", letterSpacing: 3, textTransform: "uppercase", marginBottom: 8 }}>
                Send A Message
              </div>
              <h3 style={{ fontSize: isMobile ? 20 : 26, fontWeight: 700, color: "#1c1c1c", margin: 0, fontFamily: "Georgia, serif", lineHeight: 1.2 }}>
                Can't find what you're looking for?
              </h3>
              <p style={{ fontSize: 13, color: "#888", marginTop: 8, lineHeight: 1.7 }}>
                Our friendly team is here to help you with any queries, 24 hours a day.
              </p>
              <div style={{ width: 40, height: 2, background: "#c9a84c", marginTop: 12, borderRadius: 1 }} />
            </div>

            {/* Row: Name + Phone */}
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 16, marginBottom: 16 }}>
              <div>
                <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#555", letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>
                  Full Name <span style={{ color: "#c9a84c" }}>*</span>
                </label>
                <input
                  name="fullName" value={form.fullName}
                  onChange={handleChange}
                  onFocus={() => handleFocus("fullName")}
                  onBlur={() => handleBlur("fullName")}
                  placeholder="Enter full name"
                  style={inputStyle(focused.fullName)}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#555", letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>
                  Phone Number <span style={{ color: "#c9a84c" }}>*</span>
                </label>
                <input
                  name="phone" value={form.phone}
                  onChange={handleChange}
                  onFocus={() => handleFocus("phone")}
                  onBlur={() => handleBlur("phone")}
                  placeholder="Enter phone number"
                  style={inputStyle(focused.phone)}
                />
              </div>
            </div>

            {/* Subject */}
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#555", letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>
                Subject <span style={{ color: "#c9a84c" }}>*</span>
              </label>
              <input
                name="subject" value={form.subject}
                onChange={handleChange}
                onFocus={() => handleFocus("subject")}
                onBlur={() => handleBlur("subject")}
                placeholder="Enter subject line"
                style={inputStyle(focused.subject)}
              />
            </div>

            {/* Message */}
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#555", letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>
                Message <span style={{ color: "#c9a84c" }}>*</span>
              </label>
              <textarea
                name="message" value={form.message}
                onChange={handleChange}
                onFocus={() => handleFocus("message")}
                onBlur={() => handleBlur("message")}
                placeholder="Write your message here..."
                rows={6}
                style={{ ...inputStyle(focused.message), resize: "vertical", lineHeight: 1.7 }}
              />
            </div>

            {/* Status messages */}
            {status === "error" && (
              <div style={{
                padding: "10px 16px", background: "#fff5f5", border: "1px solid #f0c0c0",
                borderRadius: 2, marginBottom: 16,
                fontSize: 12, color: "#c0392b", fontFamily: "Georgia, serif",
              }}>
                ⚠ {errorMsg}
              </div>
            )}
            {status === "success" && (
              <div style={{
                padding: "10px 16px", background: "#f0fdf4", border: "1px solid #b6e8c8",
                borderRadius: 2, marginBottom: 16,
                fontSize: 12, color: "#2d6a4f", fontFamily: "Georgia, serif",
              }}>
                ✓ Message sent successfully! We'll get back to you soon.
              </div>
            )}
            {status === "demo" && (
              <div style={{
                padding: "12px 16px", background: "#fdfbee", border: "1px solid #e8d87a",
                borderRadius: 2, marginBottom: 16,
                fontSize: 12, color: "#7a6c1c", fontFamily: "Georgia, serif", lineHeight: 1.6,
              }}>
                <strong>⚠ Demo Mode</strong> — Replace EmailJS credentials at the top of the file to enable real email delivery.
              </div>
            )}

            {/* Submit button */}
            <button
              onClick={handleSubmit}
              disabled={status === "sending"}
              style={{
                width: "100%", padding: "14px 0",
                background: status === "sending"
                  ? "#d4b87a"
                  : "linear-gradient(135deg, #7a6c3e, #c9a84c)",
                color: "#fff", border: "none", borderRadius: 2,
                fontSize: 12, fontWeight: 700, cursor: status === "sending" ? "not-allowed" : "pointer",
                letterSpacing: 2.5, textTransform: "uppercase",
                fontFamily: "Georgia, serif",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                transition: "opacity 0.2s, transform 0.2s",
                boxShadow: "0 4px 16px rgba(140,110,20,0.22)",
              }}
              onMouseEnter={e => { if (status !== "sending") { e.currentTarget.style.opacity = "0.88"; e.currentTarget.style.transform = "translateY(-1px)"; } }}
              onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <SendIcon />
              {status === "sending" ? "Sending…" : "Send Message"}
            </button>
          </div>

          {/* ── Right: Illustration + Quick Info ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

            {/* Decorative panel */}
            <div style={{
              background: "linear-gradient(145deg, #fdf8ee 0%, #f5edd8 100%)",
              border: "1px solid #e8d8b0",
              borderRadius: 2, padding: isMobile ? "28px 20px" : "40px 40px",
              position: "relative", overflow: "hidden",
              flex: 1,
            }}>
              {/* Corner decorative border */}
              <div style={{ position: "absolute", inset: 10, border: "1px solid rgba(201,168,76,0.25)", borderRadius: 1, pointerEvents: "none" }} />

              {/* Gold dot top-right decoration */}
              <div style={{ position: "absolute", top: 24, right: 24, width: 48, height: 48, borderRadius: "50%", background: "rgba(201,168,76,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: 24, height: 24, borderRadius: "50%", background: "rgba(201,168,76,0.25)" }} />
              </div>

              <div style={{ fontSize: 10, fontWeight: 700, color: "#9c7c3e", letterSpacing: 3, textTransform: "uppercase", marginBottom: 12 }}>
                Why Choose Us
              </div>
              <h3 style={{ fontSize: isMobile ? 20 : 26, fontWeight: 700, color: "#1c1c1c", margin: "0 0 16px", fontFamily: "Georgia, serif", lineHeight: 1.25 }}>
                We're always here to help
              </h3>
              <div style={{ width: 40, height: 2, background: "#c9a84c", marginBottom: 24, borderRadius: 1 }} />
              <p style={{ fontSize: 13, color: "#666", lineHeight: 1.8, marginBottom: 28 }}>
                Whether you have a question about our products, an order, or anything else — our team is ready to answer all your questions.
              </p>

              {/* Feature list */}
              {[
                "Expert support team available 24/7",
                "Quick response within 2–4 hours",
                "Dedicated order tracking assistance",
                "Easy returns & refund process",
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                  <div style={{
                    width: 22, height: 22, borderRadius: "50%",
                    background: "linear-gradient(135deg, #7a6c3e, #c9a84c)",
                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                  }}>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <polyline points="1.5,5 4,7.5 8.5,2.5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span style={{ fontSize: 13, color: "#555", fontFamily: "Georgia, serif" }}>{item}</span>
                </div>
              ))}

              {/* Stats row */}
              <div style={{
                display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
                gap: 12, marginTop: 28,
                borderTop: "1px solid #e8d8b0", paddingTop: 24,
              }}>
                {[
                  { stat: "2–4h", label: "Response Time" },
                  { stat: "98%", label: "Satisfaction" },
                  { stat: "24/7", label: "Support" },
                ].map((s, i) => (
                  <div key={i} style={{ textAlign: "center" }}>
                    <div style={{ fontSize: isMobile ? 18 : 22, fontWeight: 700, color: "#9c7c3e", fontFamily: "Georgia, serif" }}>{s.stat}</div>
                    <div style={{ fontSize: 10, color: "#888", marginTop: 2, fontFamily: "Georgia, serif", letterSpacing: 0.5 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social / Quick links */}
            <div style={{
              background: "#fff", border: "1px solid #e8e0d0",
              borderRadius: 2, padding: "20px 24px",
              display: "flex", alignItems: "center", justifyContent: "space-between",
              flexWrap: "wrap", gap: 12,
            }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#9c7c3e", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 4 }}>
                  Follow Us
                </div>
                <div style={{ fontSize: 12, color: "#888" }}>Stay connected on social media</div>
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                {["Instagram", "Facebook", "Twitter"].map((s, i) => (
                  <button key={i} style={{
                    padding: "8px 16px", borderRadius: 2,
                    border: "1px solid #c9a84c", background: "#fff",
                    color: "#9c7c3e", fontSize: 11, fontWeight: 700,
                    cursor: "pointer", fontFamily: "Georgia, serif",
                    letterSpacing: 0.5, transition: "all 0.2s",
                  }}
                    onMouseEnter={e => { e.currentTarget.style.background = "linear-gradient(135deg, #7a6c3e, #c9a84c)"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "#c9a84c"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = "#9c7c3e"; }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}