import { useNavigate } from "react-router-dom";

export default function HeroBanner() {
  const navigate = useNavigate();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,900&family=Inter:wght@400;600;700;800&display=swap');

        .hb-root {
          position: relative;
          width: 100%;
          height: 100vh;
          min-height: 700px;
          overflow: hidden;
          margin-top: -80px;
        }

        .hb-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
        }
        .hb-bg img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          display: block;
        }

        /* Center dark overlay — dono sides se fade */
        .hb-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(0,0,0,0.30) 0%,
            rgba(0,0,0,0.55) 40%,
            rgba(0,0,0,0.55) 60%,
            rgba(0,0,0,0.20) 100%
          );
          z-index: 1;
        }

        /* ── KEY CHANGE: center aligned ── */
        .hb-content {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 2;
          width: 100%;
          max-width: 760px;
          padding: 0 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        @keyframes hb-up {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .hb-a1 { animation: hb-up 0.6s 0.1s both ease-out; }
        .hb-a2 { animation: hb-up 0.6s 0.25s both ease-out; }
        .hb-a3 { animation: hb-up 0.6s 0.40s both ease-out; }
        .hb-a4 { animation: hb-up 0.6s 0.55s both ease-out; }

        .hb-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.65);
          margin-bottom: 20px;
        }
        .hb-line {
          width: 36px; height: 1px;
          background: rgba(255,255,255,0.40);
        }

        .hb-headline {
          font-family: 'Playfair Display', serif;
          font-size: clamp(64px, 9vw, 120px);
          font-weight: 900;
          font-style: italic;
          color: #fff;
          line-height: 0.95;
          margin: 0 0 28px;
          letter-spacing: -2px;
          text-shadow: 0 4px 40px rgba(0,0,0,0.50);
          white-space: pre-line;
        }

        .hb-sub {
          font-family: 'Inter', sans-serif;
          font-size: 15px;
          font-weight: 400;
          color: rgba(255,255,255,0.70);
          line-height: 1.75;
          max-width: 420px;
          margin-bottom: 36px;
          text-align: center;
        }

        .hb-btns {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
        }

        .hb-btn-primary {
          font-family: 'Inter', sans-serif;
          font-size: 12px;
          font-weight: 700;
          padding: 14px 40px;
          border-radius: 3px;
          border: none;
          cursor: pointer;
          background: #1a9e3f;
          color: #fff;
          letter-spacing: 1.2px;
          text-transform: uppercase;
          display: flex;
          align-items: center;
          gap: 10px;
          transition: background 0.2s, transform 0.15s;
        }
        .hb-btn-primary:hover { background: #148032; transform: translateY(-2px); }

        .hb-btn-ghost {
          font-family: 'Inter', sans-serif;
          font-size: 12px;
          font-weight: 600;
          padding: 13px 34px;
          border-radius: 3px;
          border: 1.5px solid rgba(255,255,255,0.55);
          background: transparent;
          color: #fff;
          cursor: pointer;
          letter-spacing: 1px;
          text-transform: uppercase;
          transition: border-color 0.2s, background 0.2s;
        }
        .hb-btn-ghost:hover { border-color: #fff; background: rgba(255,255,255,0.10); }

        /* Scroll indicator */
        .hb-scroll {
          position: absolute;
          bottom: 32px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 3;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }
        .hb-scroll-label {
          font-family: 'Inter', sans-serif;
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 3px;
          color: rgba(255,255,255,0.35);
          text-transform: uppercase;
        }
        .hb-scroll-bar {
          width: 1px; height: 48px;
          background: rgba(255,255,255,0.20);
          position: relative; overflow: hidden;
        }
        @keyframes hb-scrollbar {
          0%   { top: -100%; }
          100% { top: 100%; }
        }
        .hb-scroll-bar::after {
          content: '';
          position: absolute;
          width: 100%; height: 50%;
          background: rgba(255,255,255,0.70);
          animation: hb-scrollbar 1.5s ease-in-out infinite;
        }

        @media (max-width: 768px) {
          .hb-root {
            height: 100svh;
            min-height: 500px;
            margin-top: -60px;
          }
          .hb-content {
            left: 50%;
            right: auto;
            top: 50%;
            transform: translate(-50%, -50%);
            width: 100%;
            max-width: 100%;
            padding: 0 24px;
            align-items: center;
            text-align: center;
          }
          .hb-eyebrow {
            font-size: 10px;
            letter-spacing: 2.5px;
            margin-bottom: 14px;
          }
          .hb-line { width: 24px; }
          .hb-headline {
            font-size: clamp(42px, 11vw, 64px);
            letter-spacing: -1px;
            margin-bottom: 22px;
          }
          .hb-sub { display: none; }
          .hb-btns {
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: center;
            gap: 10px;
          }
          .hb-btn-primary {
            padding: 12px 28px;
            font-size: 11px;
          }
          .hb-btn-ghost {
            padding: 11px 24px;
            font-size: 11px;
          }
          .hb-scroll { display: none; }
        }
      `}</style>

      <div className="hb-root">
        <div className="hb-bg">
          <img src="/banner1.png" alt="VARDHAN" />
        </div>
        <div className="hb-overlay" />

        <div className="hb-content">
          <div className="hb-eyebrow hb-a1">
            <span className="hb-line" />
            100% Organic &amp; Fresh
            <span className="hb-line" />
          </div>

          <h1 className="hb-headline hb-a2">{"VARDHAN"}</h1>

          <div className="hb-btns hb-a4">
            <button className="hb-btn-primary" onClick={() => navigate('/user/product')}>
              Shop Now
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </button>
            <button className="hb-btn-ghost" onClick={() => navigate('/user/product')}>
              Browse All
            </button>
          </div>
        </div>

        <div className="hb-scroll">
          <span className="hb-scroll-label">Scroll</span>
          <div className="hb-scroll-bar" />
        </div>
      </div>
    </>
  );
}