import { useState } from "react";
import { Helmet } from "react-helmet-async";

const sections = [
  {
    id: "information",
    icon: "🗂️",
    title: "Information We Collect",
    content: [
      {
        subtitle: "Personal Information",
        text: "When you create an account or place an order on Vardhan Foods, we collect your name, email address, phone number, and delivery address to process and fulfill your orders.",
      },
      {
        subtitle: "Usage Data",
        text: "We automatically collect information about how you interact with our platform — including pages visited, products viewed, search queries, and device/browser details — to improve your shopping experience.",
      },
      {
        subtitle: "Payment Information",
        text: "Payment transactions are processed through secure, encrypted third-party gateways. Vardhan Foods does not store your full card details on our servers.",
      },
    ],
  },
  {
    id: "usage",
    icon: "⚙️",
    title: "How We Use Your Information",
    content: [
      {
        subtitle: "Order Processing",
        text: "Your personal data is used to confirm, process, and deliver your oil orders and to communicate updates regarding your purchases.",
      },
      {
        subtitle: "Personalization",
        text: "We use your browsing and purchase history to recommend products and offers that match your preferences and dietary needs.",
      },
      {
        subtitle: "Service Improvement",
        text: "Aggregate usage data helps us improve our platform, add new product features, and ensure a smooth, reliable experience for all customers.",
      },
    ],
  },
  {
    id: "sharing",
    icon: "🤝",
    title: "Information Sharing",
    content: [
      {
        subtitle: "Delivery Partners",
        text: "We share your name, address, and contact number with our delivery partners solely to fulfill your orders. They are not permitted to use this data for any other purpose.",
      },
      {
        subtitle: "No Third-Party Selling",
        text: "Vardhan Foods does not sell, rent, or trade your personal information to any third-party marketers or advertisers.",
      },
      {
        subtitle: "Legal Obligations",
        text: "We may disclose your information if required by law, court order, or to protect the rights and safety of Vardhan Foods, our users, or the public.",
      },
    ],
  },
  {
    id: "security",
    icon: "🔒",
    title: "Data Security",
    content: [
      {
        subtitle: "Encryption",
        text: "All data transmitted between your device and our servers is protected using industry-standard SSL/TLS encryption to prevent unauthorized access.",
      },
      {
        subtitle: "Access Control",
        text: "Only authorized Vardhan Foods personnel have access to your personal data, and only to the extent necessary to perform their duties.",
      },
      {
        subtitle: "Breach Response",
        text: "In the unlikely event of a data breach, we will notify affected users promptly and take immediate steps to mitigate any harm.",
      },
    ],
  },
  {
    id: "rights",
    icon: "✋",
    title: "Your Rights",
    content: [
      {
        subtitle: "Access & Correction",
        text: "You have the right to access the personal information we hold about you and to request corrections if any details are inaccurate or incomplete.",
      },
      {
        subtitle: "Deletion",
        text: "You may request the deletion of your account and associated data at any time by contacting our support team at vardhanfoods9@gmail.com.",
      },
      {
        subtitle: "Opt-Out",
        text: "You can opt out of promotional emails and notifications at any time via your account settings or by clicking the unsubscribe link in any marketing email.",
      },
    ],
  },
  {
    id: "cookies",
    icon: "🍪",
    title: "Cookies & Tracking",
    content: [
      {
        subtitle: "Essential Cookies",
        text: "We use essential cookies to keep you logged in and remember your cart. These are required for the platform to function correctly.",
      },
      {
        subtitle: "Analytics Cookies",
        text: "Analytics cookies help us understand how users navigate our site so we can improve performance and usability. You may disable these in your browser settings.",
      },
      {
        subtitle: "Marketing Cookies",
        text: "We may use marketing cookies to show you relevant offers. You can manage your cookie preferences at any time through the cookie settings panel.",
      },
    ],
  },
  {
    id: "children",
    icon: "👶",
    title: "Children's Privacy",
    content: [
      {
        subtitle: "Age Restriction",
        text: "Vardhan Foods is not directed at children under the age of 13. We do not knowingly collect personal information from children.",
      },
      {
        subtitle: "Parental Action",
        text: "If you believe your child has provided us with personal data, please contact us immediately at vardhanfoods9@gmail.com and we will delete it from our systems.",
      },
    ],
  },
  {
    id: "updates",
    icon: "📋",
    title: "Policy Updates",
    content: [
      {
        subtitle: "Changes",
        text: "We may update this Privacy Policy from time to time to reflect changes in our practices or applicable laws. The updated policy will be posted on this page with a revised date.",
      },
      {
        subtitle: "Notification",
        text: "For significant changes, we will notify registered users via email or a prominent notice on our platform before the changes take effect.",
      },
    ],
  },
];

export default function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState(null);

  return (
    <>
      <Helmet>
        <title>Privacy Policy - Vardhan Foods | Your Data is Safe With Us</title>
        <meta
          name="description"
          content="Read Vardhan Foods' Privacy Policy. We are transparent about how we collect, use, and protect your personal information on our cold-pressed oil platform."
        />
        <link rel="canonical" href="https://vardhanfoods.com/privacy-policy" />
      </Helmet>

      <div
        className="min-h-screen font-sans"
        style={{ backgroundColor: "#f5f0e8" }}
      >
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');

          * { box-sizing: border-box; }

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
            font-family: 'DM Sans', sans-serif;
            font-weight: 900;
            font-size: 9rem;
            color: rgba(255,255,255,0.04);
            line-height: 1;
            user-select: none;
            pointer-events: none;
          }

          .vd-badge {
            background: rgba(212,160,23,0.18);
            border: 1px solid rgba(212,160,23,0.4);
            color: #d4a017;
            font-family: 'DM Sans', sans-serif;
            font-weight: 600;
            font-size: 11px;
            letter-spacing: 1.5px;
            text-transform: uppercase;
          }

          .vd-section-card {
            transition: box-shadow 0.25s ease, transform 0.2s ease;
            cursor: pointer;
            background: #ffffff;
            border: 1px solid rgba(212,160,23,0.18);
          }
          .vd-section-card:hover {
            box-shadow: 0 8px 32px rgba(212,160,23,0.14);
            transform: translateY(-2px);
          }
          .vd-section-card.active {
            border-color: rgba(212,160,23,0.55) !important;
            box-shadow: 0 8px 32px rgba(212,160,23,0.18);
          }

          .content-reveal {
            animation: slideDown 0.3s ease;
          }
          @keyframes slideDown {
            from { opacity: 0; transform: translateY(-8px); }
            to   { opacity: 1; transform: translateY(0); }
          }

          .vd-divider {
            background: linear-gradient(to right, #2d3a1e, #d4a017, transparent);
          }

          .vd-toc-link {
            transition: color 0.2s, padding-left 0.2s;
            text-decoration: none;
            color: #8a7040;
            font-family: 'DM Sans', sans-serif;
            font-size: 13px;
          }
          .vd-toc-link:hover {
            color: #c8850a;
            padding-left: 4px;
          }

          .vd-icon-box {
            background: rgba(212,160,23,0.10);
          }

          .vd-contact-box {
            background: radial-gradient(ellipse at 60% 40%, #4a5e28 0%, #3b4a1f 35%, #2d3a1e 70%, #1e2814 100%);
            position: relative;
            overflow: hidden;
          }
          .vd-contact-box::before {
            content: '';
            position: absolute;
            inset: 0;
            background:
              radial-gradient(ellipse at 20% 60%, rgba(212,160,23,0.12) 0%, transparent 55%),
              radial-gradient(ellipse at 85% 10%, rgba(255,255,255,0.04) 0%, transparent 40%);
            pointer-events: none;
          }
          .vd-contact-watermark {
            position: absolute;
            right: 24px;
            top: 50%;
            transform: translateY(-50%);
            font-family: 'DM Sans', sans-serif;
            font-weight: 900;
            font-size: 5rem;
            color: rgba(255,255,255,0.06);
            line-height: 1;
            user-select: none;
            pointer-events: none;
          }
        `}</style>

        {/* ── HERO ── */}
        <div className="vd-hero-bg vd-font px-6 py-16 md:py-24">
          <span className="vd-watermark" style={{ left: "16px", top: "50%", transform: "translateY(-50%)" }}>V</span>
          <span className="vd-watermark" style={{ right: "16px", bottom: "-20px" }}>VD</span>

          <div className="relative z-10 max-w-4xl mx-auto text-center">
            {/* Badge */}
            <span className="vd-badge inline-block px-4 py-1.5 rounded-full mb-6">
              🌿 Vardhan Foods · 100% Natural Cold-Pressed Oils
            </span>

            <h1
              className="mb-4 text-white"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "clamp(2.4rem, 5vw, 4rem)",
                fontWeight: 800,
                lineHeight: 1.12,
                letterSpacing: "-0.5px",
              }}
            >
              Privacy{" "}
              <span style={{ color: "#d4a017" }}>Policy</span>
            </h1>

            <p
              className="max-w-xl mx-auto"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "1.05rem",
                lineHeight: 1.7,
                color: "rgba(255,255,255,0.80)",
              }}
            >
              At Vardhan Foods, your trust is as pure as our oils. We are fully
              transparent about how we collect, use, and protect your personal
              information on our platform.
            </p>

            <div
              className="mt-8 flex flex-wrap justify-center gap-4 text-sm"
              style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.65)" }}
            >
              <span>📅 Effective: January 1, 2026</span>
              <span className="opacity-40">|</span>
              <span>📅 Last Updated: July 2026</span>
              <span className="opacity-40">|</span>
              <span>📍 Dhansoi, Buxar, Bihar</span>
            </div>
          </div>
        </div>

        {/* ── MAIN CONTENT ── */}
        <div className="max-w-5xl mx-auto px-4 py-12 vd-font">
          <div className="flex flex-col lg:flex-row gap-10">

            {/* ── SIDEBAR TOC ── */}
            <aside className="lg:w-56 shrink-0">
              <div className="sticky top-8">
                <p
                  className="text-xs uppercase tracking-widest mb-3"
                  style={{ color: "#a08040", fontWeight: 600 }}
                >
                  Contents
                </p>
                <nav className="flex flex-col gap-2">
                  {sections.map((s) => (
                    <a
                      key={s.id}
                      href={`#${s.id}`}
                      className="vd-toc-link"
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveSection(activeSection === s.id ? null : s.id);
                        document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                      }}
                    >
                      {s.icon} {s.title}
                    </a>
                  ))}
                </nav>

                {/* Sidebar contact card */}
                <div
                  className="mt-8 p-4 rounded-xl"
                  style={{
                    backgroundColor: "rgba(212,160,23,0.08)",
                    border: "1px solid rgba(212,160,23,0.25)",
                  }}
                >
                  <p
                    className="text-xs font-bold uppercase tracking-widest mb-2"
                    style={{ color: "#c8850a" }}
                  >
                    Contact Us
                  </p>
                  <a
                    href="mailto:vardhanfoods9@gmail.com"
                    className="text-xs font-semibold block mb-1 hover:underline"
                    style={{ color: "#8a5c0a", lineHeight: 1.6 }}
                  >
                    ✉️ vardhanfoods9@gmail.com
                  </a>
                  <a
                    href="tel:+919229566651"
                    className="text-xs font-semibold block mb-1"
                    style={{ color: "#8a5c0a" }}
                  >
                    📞 +91 92295 66651
                  </a>
                  <a
                    href="tel:+917765026501"
                    className="text-xs font-semibold block mb-1"
                    style={{ color: "#8a5c0a" }}
                  >
                    📞 +91 77650 26501
                  </a>
                  <p className="text-xs text-gray-500">
                    🕐 Mon–Sat, 9AM–6PM IST
                  </p>
                </div>
              </div>
            </aside>

            {/* ── SECTIONS ── */}
            <div className="flex-1 flex flex-col gap-4">

              {/* Intro card */}
              <div
                className="bg-white rounded-2xl p-6 shadow-sm"
                style={{ border: "1px solid rgba(212,160,23,0.18)" }}
              >
                <p
                  className="text-gray-600"
                  style={{ fontSize: "0.97rem", lineHeight: 1.8 }}
                >
                  This Privacy Policy explains how{" "}
                  <strong style={{ color: "#2d3a1e" }}>Vardhan Foods</strong> ("we", "our",
                  or "us") collects, uses, shares, and protects information obtained from
                  users ("you") of our website and mobile application. By using Vardhan
                  Foods, you agree to the practices described in this policy. This policy
                  applies to all services offered by Vardhan Foods in India since our
                  founding in 2026.
                </p>
              </div>

              {/* Accordion Sections */}
              {sections.map((section, idx) => (
                <div
                  key={section.id}
                  id={section.id}
                  className={`vd-section-card rounded-2xl overflow-hidden ${
                    activeSection === section.id ? "active" : ""
                  }`}
                  onClick={() =>
                    setActiveSection(activeSection === section.id ? null : section.id)
                  }
                >
                  {/* Header */}
                  <div className="flex items-center justify-between px-6 py-5">
                    <div className="flex items-center gap-3">
                      <span
                        className="vd-icon-box w-9 h-9 rounded-xl flex items-center justify-center text-lg shrink-0"
                      >
                        {section.icon}
                      </span>
                      <h2
                        className="text-gray-900"
                        style={{ fontSize: "1rem", fontWeight: 700 }}
                      >
                        {idx + 1}. {section.title}
                      </h2>
                    </div>
                    <span
                      className="text-xl transition-transform duration-200"
                      style={{
                        color: "#c8850a",
                        transform:
                          activeSection === section.id
                            ? "rotate(45deg)"
                            : "rotate(0deg)",
                        display: "inline-block",
                      }}
                    >
                      +
                    </span>
                  </div>

                  {/* Expanded Content */}
                  {activeSection === section.id && (
                    <div className="content-reveal px-6 pb-6">
                      <div className="vd-divider h-px mb-5" />
                      <div className="flex flex-col gap-4">
                        {section.content.map((item, i) => (
                          <div key={i}>
                            <h3
                              className="mb-1"
                              style={{
                                color: "#2d3a1e",
                                fontWeight: 600,
                                fontSize: "0.85rem",
                                textTransform: "uppercase",
                                letterSpacing: "0.05em",
                              }}
                            >
                              {item.subtitle}
                            </h3>
                            <p
                              className="text-gray-600"
                              style={{ fontSize: "0.95rem", lineHeight: 1.75 }}
                            >
                              {item.text}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* ── CONTACT BOX ── */}
              <div className="vd-contact-box rounded-2xl p-8 text-white mt-2">
                <div className="vd-contact-watermark">🌿</div>
                <div className="relative z-10">
                  {/* Pill */}
                  <span
                    className="vd-badge inline-block px-4 py-1.5 rounded-full mb-4 text-xs"
                    style={{ letterSpacing: "1.5px" }}
                  >
                    📬 GET IN TOUCH
                  </span>

                  <h2
                    className="mb-2"
                    style={{ fontSize: "1.6rem", fontWeight: 800, lineHeight: 1.2 }}
                  >
                    Have questions or{" "}
                    <span style={{ color: "#d4a017" }}>concerns?</span>
                  </h2>

                  <p
                    className="mb-5 max-w-md"
                    style={{
                      fontSize: "0.95rem",
                      lineHeight: 1.7,
                      color: "rgba(255,255,255,0.80)",
                    }}
                  >
                    Our support team is here to help with any privacy-related queries
                    about your Vardhan Foods account. We respond within 2 business days.
                  </p>

                  <div className="flex flex-wrap gap-3">
                    <a
                      href="mailto:vardhanfoods9@gmail.com"
                      className="font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors"
                      style={{ backgroundColor: "#d4a017", color: "#1e2814" }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      ✉️ vardhanfoods9@gmail.com
                    </a>
                    <a
                      href="tel:+919229566651"
                      className="border text-white font-semibold text-sm px-5 py-2.5 rounded-xl"
                      style={{
                        borderColor: "rgba(212,160,23,0.4)",
                        background: "rgba(212,160,23,0.15)",
                        backdropFilter: "blur(4px)",
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      📞 +91 92295 66651
                    </a>
                    <a
                      href="tel:+917765026501"
                      className="border text-white font-semibold text-sm px-5 py-2.5 rounded-xl"
                      style={{
                        borderColor: "rgba(212,160,23,0.4)",
                        background: "rgba(212,160,23,0.15)",
                        backdropFilter: "blur(4px)",
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      📞 +91 77650 26501
                    </a>
                  </div>

                  {/* Address + FSSAI */}
                  <p
                    className="mt-5 text-xs"
                    style={{ color: "rgba(255,255,255,0.55)" }}
                  >
                    📍 C/O Mubarak Hussain, Dhansoi, Dumraon, Buxar, Bihar — 802117
                    &nbsp;·&nbsp; FSSAI Reg. No. 20424042000223
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}