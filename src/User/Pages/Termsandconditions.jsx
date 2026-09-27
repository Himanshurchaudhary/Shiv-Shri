import { useState } from "react";
import { Helmet } from "react-helmet-async";

const sections = [
  {
    id: "acceptance",
    title: "Acceptance of Terms",
    content: `By accessing or using the Vardhan Foods website, mobile application, or any of our services, you confirm that you have read, understood, and agree to be bound by these Terms & Conditions. If you do not agree, please discontinue use of our platform immediately.

These terms apply to all visitors, users, and customers of Vardhan Foods. We reserve the right to update these terms at any time, and continued use of the platform constitutes acceptance of any revised terms.`,
  },
  {
    id: "about",
    title: "About Vardhan Foods",
    content: `Vardhan Foods is a FSSAI-registered food business (Registration No. 20424042000223) specializing in 100% natural, cold-pressed vegetable oils — including mustard oil and other traditionally extracted oils. We are committed to delivering pure, chemical-free, authentic-flavour oils directly to your doorstep.

Our mission is to revive traditional cold-press extraction methods that preserve natural fatty acids, vitamin E, and antioxidants — offering you healthier alternatives to refined oils. Vardhan Foods is operated by Sanjida Perween, C/O Mubarak Hussain, Dhansoi, Dumraon, Buxar, Bihar — 802117.`,
  },
  {
    id: "eligibility",
    title: "Eligibility & Account",
    content: `To use Vardhan Foods, you must be at least 18 years of age or have parental/guardian consent. By creating an account, you represent that all information provided is accurate, current, and complete.

You are responsible for maintaining the confidentiality of your account credentials. You agree to notify us immediately of any unauthorized use of your account. Vardhan Foods shall not be liable for any losses arising from unauthorized account access due to your failure to safeguard login information.`,
  },
  {
    id: "orders",
    title: "Orders & Payments",
    content: `All orders placed on Vardhan Foods are subject to product availability and order confirmation. We reserve the right to cancel or refuse any order at our discretion, including cases of suspected fraud, pricing errors, or stock unavailability.

Payments must be made through our supported payment methods including UPI, credit/debit cards, net banking, and cash on delivery (where available). Prices are listed in Indian Rupees (INR) and are inclusive of applicable taxes unless stated otherwise.`,
  },
  {
    id: "product",
    title: "Product Quality & FSSAI Compliance",
    content: `All Vardhan Foods products are manufactured and sold in compliance with the Food Safety and Standards Act, 2006 (FSS Act) and regulations issued by the Food Safety and Standards Authority of India (FSSAI).

Our cold-pressed oils are extracted without heat or chemicals, preserving their natural nutritional profile. While we strive for the highest quality, individual results may vary based on storage conditions and usage. Please store oils in a cool, dry place away from direct sunlight.

FSSAI Registration Number: 20424042000223`,
  },
  {
    id: "delivery",
    title: "Delivery Policy",
    content: `Vardhan Foods strives to deliver your orders within the estimated timeframe shown at checkout. Delivery timelines may vary based on your location, product availability, and external factors such as weather or public holidays.

Delivery charges, if applicable, will be clearly displayed before order confirmation. Risk of loss and title for products pass to you upon successful delivery. For bulk or wholesale orders, please contact us directly for customized delivery arrangements.`,
  },
  {
    id: "returns",
    title: "Returns & Refunds",
    content: `We want you to be completely satisfied with every Vardhan Foods purchase. If you receive a damaged, leaking, tampered, or incorrect product, please report it within 24 hours of delivery through our app or customer support with photographic evidence.

Opened or partially used oil bottles are not eligible for return unless they are proven to be defective or adulterated. Refunds, where approved, will be processed to the original payment method within 5–7 business days.`,
  },
  {
    id: "prohibited",
    title: "Prohibited Activities",
    content: `Users must not engage in any activity that disrupts, damages, or impairs the Vardhan Foods platform. This includes but is not limited to: placing fraudulent orders, scraping or harvesting data without authorization, impersonating Vardhan Foods staff, uploading malicious content, or attempting unauthorized access to our systems.

Reselling Vardhan Foods products under a different brand without prior written authorization is strictly prohibited. Violation of these prohibitions may result in immediate account suspension and legal action where applicable.`,
  },
  {
    id: "ip",
    title: "Intellectual Property",
    content: `All content on the Vardhan Foods platform — including the Vardhan logo, product names, images, descriptions, and website design — is the exclusive property of Vardhan Foods or its licensors and is protected under applicable intellectual property laws.

You may not reproduce, distribute, modify, or create derivative works from any content on our platform without prior written permission from Vardhan Foods.`,
  },
  {
    id: "privacy",
    title: "Privacy & Data",
    content: `Your privacy matters to us. Vardhan Foods collects and processes personal data in accordance with our Privacy Policy. By using our platform, you consent to the collection and use of your data as described therein.

We implement industry-standard security measures to protect your personal and payment information. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.`,
  },
  {
    id: "liability",
    title: "Limitation of Liability",
    content: `To the maximum extent permitted by law, Vardhan Foods shall not be liable for any indirect, incidental, special, or consequential damages arising out of your use of or inability to use our platform or products.

Our total liability for any claim arising in connection with these terms shall not exceed the amount paid by you for the specific order giving rise to the claim. We strongly recommend consulting a healthcare professional before making significant dietary changes.`,
  },
  {
    id: "governing",
    title: "Governing Law",
    content: `These Terms & Conditions shall be governed by and construed in accordance with the laws of India. Any disputes arising out of or in connection with these terms shall be subject to the exclusive jurisdiction of the courts located in Buxar, Bihar.

If any provision of these terms is found to be unenforceable, the remaining provisions shall continue in full force and effect.`,
  },
  {
    id: "contact",
    title: "Contact Us",
    content: `If you have any questions, concerns, or feedback regarding these Terms & Conditions, please reach out to us:

Email: vardhanfoods9@gmail.com
Phone / WhatsApp: +91 92295 66651 | +91 77650 26501
Address: C/O Mubarak Hussain, Dhansoi, Dumraon, Buxar, Bihar — 802117
FSSAI Reg. No.: 20424042000223
Support Hours: Monday – Saturday, 9:00 AM – 6:00 PM IST`,
  },
];

export default function TermsAndConditions() {
  const [activeId, setActiveId] = useState("acceptance");

  const handleScroll = (id) => {
    setActiveId(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const heroGradient = {
    background:
      "radial-gradient(ellipse at 60% 40%, #4a5e28 0%, #3b4a1f 35%, #2d3a1e 70%, #1e2814 100%)",
    position: "relative",
    overflow: "hidden",
  };

  return (
    <>
      <Helmet>
        <title>Terms & Conditions - Vardhan Foods | Cold-Pressed Oils</title>
        <meta
          name="description"
          content="Read Vardhan Foods' Terms & Conditions for purchasing 100% natural cold-pressed mustard and vegetable oils. FSSAI registered food business."
        />
        <link rel="canonical" href="https://vardhanfoods.com/terms-and-conditions" />
      </Helmet>

      <div className="min-h-screen" style={{ backgroundColor: "#f5f0e8" }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
          .vd-font { font-family: 'DM Sans', sans-serif; }

          .hero-overlay::before {
            content: '';
            position: absolute;
            inset: 0;
            background:
              radial-gradient(ellipse at 25% 60%, rgba(212,160,23,0.12) 0%, transparent 55%),
              radial-gradient(ellipse at 80% 10%, rgba(255,255,255,0.05) 0%, transparent 40%);
            pointer-events: none;
          }

          .vd-pill {
            background: rgba(212,160,23,0.18);
            border: 1px solid rgba(212,160,23,0.4);
            backdrop-filter: blur(4px);
          }

          .watermark {
            position: absolute;
            font-family: 'DM Sans', sans-serif;
            font-weight: 900;
            font-size: 8rem;
            color: rgba(255,255,255,0.05);
            line-height: 1;
            letter-spacing: -4px;
            user-select: none;
            pointer-events: none;
          }

          .sidebar-btn-active {
            background-color: rgba(212,160,23,0.15);
            color: #c8850a;
            font-weight: 700;
            border-left: 3px solid #c8850a;
          }
          .sidebar-btn-inactive {
            color: #6b7280;
            border-left: 3px solid transparent;
          }
          .sidebar-btn-inactive:hover {
            background-color: rgba(212,160,23,0.08);
            color: #c8850a;
          }

          .section-card {
            background: #ffffff;
            border: 1px solid rgba(212,160,23,0.18);
          }

          .section-number {
            background: radial-gradient(ellipse at 60% 40%, #4a5e28 0%, #2d3a1e 100%);
          }

          .fssai-badge {
            background: rgba(212,160,23,0.10);
            border: 1px solid rgba(212,160,23,0.30);
          }
        `}</style>

        {/* ── HERO ── */}
        <div
          className="w-full py-16 px-4 text-center hero-overlay vd-font"
          style={heroGradient}
        >
          <span
            className="watermark"
            style={{ left: "16px", top: "50%", transform: "translateY(-50%)" }}
          >
            V
          </span>
          <span className="watermark" style={{ right: "16px", bottom: "-20px" }}>
            VD
          </span>

          {/* Brand pill */}
          <div className="relative z-10 inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6 vd-pill">
            <span className="text-sm">🌿</span>
            <span
              className="text-xs font-semibold tracking-widest uppercase"
              style={{ color: "#d4a017" }}
            >
              Vardhan Foods · 100% Natural Cold-Pressed Oils
            </span>
          </div>

          {/* Heading */}
          <h1 className="relative z-10 text-4xl md:text-5xl font-bold text-white mb-4 vd-font">
            Terms &amp;{" "}
            <span style={{ color: "#d4a017" }}>Conditions</span>
          </h1>

          <p
            className="relative z-10 text-sm md:text-base max-w-lg mx-auto leading-relaxed vd-font"
            style={{ color: "rgba(255,255,255,0.80)" }}
          >
            Please read these terms carefully before purchasing or using
            Vardhan Foods products and services. By continuing, you agree to
            the following.
          </p>

          {/* FSSAI badge */}
          <div className="relative z-10 inline-flex items-center gap-2 mt-5 px-4 py-2 rounded-full fssai-badge">
            <span className="text-xs" style={{ color: "#d4a017" }}>✅</span>
            <span className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.75)" }}>
              FSSAI Registered · Reg. No. 20424042000223
            </span>
          </div>

          {/* Meta badges */}
          <div className="relative z-10 flex flex-wrap justify-center gap-6 mt-6 vd-font">
            {[
              "📅 Effective: January 1, 2026",
              "📅 Last Updated: July 2026",
              "📄 Version 1.0",
            ].map((text) => (
              <div
                key={text}
                className="flex items-center gap-2 text-xs"
                style={{ color: "rgba(255,255,255,0.65)" }}
              >
                {text}
              </div>
            ))}
          </div>
        </div>

        {/* ── BODY ── */}
        <div className="max-w-5xl mx-auto px-4 py-10 flex flex-col lg:flex-row gap-8 vd-font">

          {/* ── Sidebar ── */}
          <aside className="lg:w-64 shrink-0">
            <div
              className="lg:sticky lg:top-6 rounded-2xl overflow-hidden border shadow-sm"
              style={{ borderColor: "rgba(212,160,23,0.25)" }}
            >
              {/* Sidebar header */}
              <div
                className="px-4 py-3"
                style={{
                  background:
                    "radial-gradient(ellipse at 70% 50%, #4a5e28 0%, #1e2814 100%)",
                }}
              >
                <p
                  className="text-xs font-bold tracking-widest uppercase"
                  style={{ color: "#d4a017" }}
                >
                  Table of Contents
                </p>
              </div>

              <div className="bg-white p-2">
                {sections.map((s, i) => (
                  <button
                    key={s.id}
                    onClick={() => handleScroll(s.id)}
                    className={`w-full text-left rounded-lg px-3 py-2 mb-0.5 text-xs leading-snug transition-colors ${
                      activeId === s.id
                        ? "sidebar-btn-active"
                        : "sidebar-btn-inactive"
                    }`}
                  >
                    {i + 1}. {s.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick contact card */}
            <div
              className="mt-4 rounded-2xl border p-4"
              style={{
                borderColor: "rgba(212,160,23,0.3)",
                backgroundColor: "rgba(212,160,23,0.07)",
              }}
            >
              <p
                className="text-xs font-bold uppercase tracking-widest mb-3"
                style={{ color: "#c8850a" }}
              >
                Quick Contact
              </p>
              <a
                href="tel:+919229566651"
                className="flex items-center gap-2 text-xs text-gray-700 hover:text-amber-700 mb-2"
              >
                <span>📞</span> +91 92295 66651
              </a>
              <a
                href="tel:+917765026501"
                className="flex items-center gap-2 text-xs text-gray-700 hover:text-amber-700 mb-2"
              >
                <span>📞</span> +91 77650 26501
              </a>
              <a
                href="mailto:vardhanfoods9@gmail.com"
                className="flex items-center gap-2 text-xs text-gray-700 hover:text-amber-700 mb-2"
              >
                <span>✉️</span> vardhanfoods9@gmail.com
              </a>
              <p className="flex items-center gap-2 text-xs text-gray-500">
                <span>🕐</span> Mon–Sat, 9AM–6PM IST
              </p>
            </div>

            {/* FSSAI info card */}
            <div
              className="mt-4 rounded-2xl border p-4"
              style={{
                borderColor: "rgba(45,58,30,0.2)",
                backgroundColor: "rgba(45,58,30,0.05)",
              }}
            >
              <p
                className="text-xs font-bold uppercase tracking-widest mb-3"
                style={{ color: "#2d3a1e" }}
              >
                FSSAI Details
              </p>
              <p className="text-xs text-gray-600 mb-1">
                <span className="font-semibold">Reg. No.:</span> 20424042000223
              </p>
              <p className="text-xs text-gray-600 mb-1">
                <span className="font-semibold">Business:</span> Vegetable Oil & Processing
              </p>
              <p className="text-xs text-gray-600">
                <span className="font-semibold">Authority:</span> Govt. of Bihar, FSSAI
              </p>
            </div>
          </aside>

          {/* ── Main Content ── */}
          <main className="flex-1 min-w-0">

            {/* Info banner */}
            <div
              className="rounded-2xl p-4 mb-8 flex gap-3"
              style={{
                backgroundColor: "#fef9ec",
                border: "1px solid #d4a017",
              }}
            >
              <span className="text-xl shrink-0 mt-0.5">⚠️</span>
              <p className="text-sm leading-relaxed" style={{ color: "#7c5a04" }}>
                These Terms &amp; Conditions govern your use of Vardhan Foods'
                platform and purchase of our cold-pressed oil products. By
                placing an order or creating an account, you legally agree to
                these terms. Questions? Email{" "}
                <strong>vardhanfoods9@gmail.com</strong>
              </p>
            </div>

            {/* Sections */}
            <div className="space-y-4">
              {sections.map((section, index) => (
                <div
                  key={section.id}
                  id={section.id}
                  className="section-card rounded-2xl shadow-sm overflow-hidden scroll-mt-6"
                  style={{ transition: "box-shadow 0.2s" }}
                >
                  {/* Section header */}
                  <div
                    className="flex items-center gap-3 px-5 py-4"
                    style={{ borderBottom: "1px solid rgba(212,160,23,0.15)" }}
                  >
                    <span
                      className="section-number w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                      style={{ color: "#d4a017" }}
                    >
                      {index + 1}
                    </span>
                    <h2 className="font-bold text-gray-900 text-base">
                      {section.title}
                    </h2>
                  </div>

                  {/* Section body */}
                  <div className="px-5 py-4">
                    {section.content.split("\n\n").map((para, i) => (
                      <p
                        key={i}
                        className="text-sm text-gray-600 leading-relaxed mb-3 last:mb-0 whitespace-pre-line"
                      >
                        {para}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* ── Footer CTA ── */}
            <div
              className="mt-10 rounded-2xl p-8 text-center hero-overlay"
              style={heroGradient}
            >
              <span
                className="watermark"
                style={{ right: "20px", bottom: "-10px", fontSize: "5rem" }}
              >
                🌿
              </span>

              <div className="relative z-10">
                {/* Pill */}
                <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-4 vd-pill">
                  <span className="text-sm">🫒</span>
                  <span
                    className="text-xs font-semibold tracking-widest uppercase"
                    style={{ color: "#d4a017" }}
                  >
                    The Vardhan Promise
                  </span>
                </div>

                <h3
                  className="font-bold text-2xl mb-2 vd-font"
                  style={{ color: "#ffffff" }}
                >
                  You're in{" "}
                  <span style={{ color: "#d4a017" }}>good hands</span>
                </h3>

                <p
                  className="text-sm max-w-md mx-auto leading-relaxed mb-6 vd-font"
                  style={{ color: "rgba(255,255,255,0.80)" }}
                >
                  By choosing Vardhan Foods, you trust us with your health and
                  your family's nutrition. We promise to uphold purity,
                  transparency, and quality in every bottle we deliver.
                </p>

                {/* CTA buttons */}
                <div className="flex flex-wrap justify-center gap-3">
                  <a
                    href="mailto:vardhanfoods9@gmail.com"
                    className="font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors vd-font"
                    style={{ backgroundColor: "#d4a017", color: "#1e2814" }}
                  >
                    ✉️ vardhanfoods9@gmail.com
                  </a>
                  <a
                    href="tel:+919229566651"
                    className="border text-white font-semibold text-sm px-5 py-2.5 rounded-xl vd-font"
                    style={{
                      borderColor: "rgba(212,160,23,0.5)",
                      background: "rgba(212,160,23,0.15)",
                      backdropFilter: "blur(4px)",
                    }}
                  >
                    📞 +91 92295 66651
                  </a>
                  <a
                    href="tel:+917765026501"
                    className="border text-white font-semibold text-sm px-5 py-2.5 rounded-xl vd-font"
                    style={{
                      borderColor: "rgba(212,160,23,0.5)",
                      background: "rgba(212,160,23,0.15)",
                      backdropFilter: "blur(4px)",
                    }}
                  >
                    📞 +91 77650 26501
                  </a>
                </div>

                {/* Address */}
                <p
                  className="mt-6 text-xs vd-font"
                  style={{ color: "rgba(255,255,255,0.55)" }}
                >
                  📍 C/O Mubarak Hussain, Dhansoi, Dumraon, Buxar, Bihar — 802117
                  &nbsp;·&nbsp; FSSAI Reg. No. 20424042000223
                </p>
              </div>
            </div>

          </main>
        </div>
      </div>
    </>
  );
}