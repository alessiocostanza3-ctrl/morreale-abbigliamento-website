import React, { useState } from "react";

export default function Hero({ setView }) {
  const [activeSide, setActiveSide] = useState(null); // null, 'left', 'right'

  return (
    <section className="hero-section split-hero">
      
      {/* Left Column: Cerimonia */}
      <div 
        className={`hero-split split-left ${activeSide === 'left' ? 'expanded' : activeSide === 'right' ? 'collapsed' : ''}`}
      >
        <div className="split-bg">
          <video 
            src="https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c054e54bc28c0d99bc323067e2a9b6c4&profile_id=165&oauth2_token_id=57447761" 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="split-video"
            poster="https://images.unsplash.com/photo-1593030103066-0093718efeb9?q=80&w=1200&auto=format&fit=crop"
          />
        </div>
        <div className="split-overlay"></div>
        <div className="split-content-box">
          <span className="split-tag">Esclusivo &amp; Formale</span>
          <h2 className="split-title">Collezione Cerimonia</h2>
          <p className="split-desc">Abiti tre pezzi, smoking e accessori sartoriali per occasioni solenni e nozze impeccabili.</p>
          <button 
            className="btn btn-primary split-btn" 
            onClick={() => setView("shop", "cerimonia")}
            onMouseEnter={() => setActiveSide('left')}
            onMouseLeave={() => setActiveSide(null)}
          >
            Esplora Cerimonia
          </button>
        </div>
      </div>

      {/* Right Column: Casual Sartoriale */}
      <div 
        className={`hero-split split-right ${activeSide === 'right' ? 'expanded' : activeSide === 'left' ? 'collapsed' : ''}`}
      >
        <div className="split-bg">
          <video 
            src="https://player.vimeo.com/external/435674703.sd.mp4?s=7fdf1eb1a47a750c6d7a229a1b1d4a04dcd69cf9&profile_id=165&oauth2_token_id=57447761" 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="split-video"
            poster="https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop"
          />
        </div>
        <div className="split-overlay"></div>
        <div className="split-content-box">
          <span className="split-tag">Morbido &amp; Naturale</span>
          <h2 className="split-title">Casual Sartoriale</h2>
          <p className="split-desc">Giacche sfoderate in lino e camicie fiammate pensate per un'eleganza quotidiana senza sforzo.</p>
          <button 
            className="btn btn-primary split-btn" 
            onClick={() => setView("shop", "casual")}
            onMouseEnter={() => setActiveSide('right')}
            onMouseLeave={() => setActiveSide(null)}
          >
            Scopri il Casual
          </button>
        </div>
      </div>

      <div className="center-brand-logo">
        <span className="logo-text">Morreale</span>
        <span className="logo-sub">Licata</span>
      </div>

      {/* Pillars block */}
      <div className="hero-pillars container">
        <div className="pillar">
          <span className="pillar-num">01</span>
          <h3 className="pillar-title">Tessuti Pregiati</h3>
          <p className="pillar-text">Selezioniamo esclusivamente filati nobili delle migliori tessiture italiane come Loro Piana e Vitale Barberis Canonico.</p>
        </div>
        <div className="pillar">
          <span className="pillar-num">02</span>
          <h3 className="pillar-title">Cura del Dettaglio</h3>
          <p className="pillar-text">Ogni asola, cucitura e rifinitura racconta l'esperienza della grande tradizione sartoriale italiana.</p>
        </div>
        <div className="pillar">
          <span className="pillar-num">03</span>
          <h3 className="pillar-title">Consulenza di Stile</h3>
          <p className="pillar-text">Accompagniamo ogni cliente nella scelta dell'abito perfetto, guidandolo nella definizione di ogni accessorio.</p>
        </div>
      </div>

      <style>{`
        .split-hero {
          height: 100vh;
          position: relative;
          display: flex;
          width: 100%;
          overflow: hidden;
          background-color: var(--text-primary);
        }

        .hero-split {
          position: relative;
          flex: 1;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: flex 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          overflow: hidden;
          padding: 40px;
          padding-top: calc(var(--navbar-height) + 20px);
        }

        .hero-split.expanded {
          flex: 1.25;
        }

        .hero-split.collapsed {
          flex: 0.75;
          opacity: 0.6;
        }

        .split-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          background-color: #1a1918;
        }

        .split-video {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.8s ease;
        }

        .hero-split.expanded .split-video {
          transform: scale(1.06);
        }

        .split-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(180deg, rgba(28, 27, 26, 0.5) 0%, rgba(28, 27, 26, 0.85) 100%);
          z-index: 2;
          transition: background 0.4s ease;
        }

        .hero-split.expanded .split-overlay {
          background: linear-gradient(180deg, rgba(28, 27, 26, 0.3) 0%, rgba(28, 27, 26, 0.75) 100%);
        }

        .split-content-box {
          position: relative;
          z-index: 3;
          max-width: 420px;
          text-align: center;
          color: var(--white);
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .split-tag {
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.25em;
          color: var(--accent-terracotta);
          font-weight: 600;
          margin-bottom: 12px;
        }

        .split-title {
          font-family: var(--font-serif);
          font-size: clamp(2rem, 3.5vw, 3rem);
          line-height: 1.15;
          font-weight: 400;
          color: var(--white);
          margin-bottom: 16px;
        }

        .split-desc {
          font-size: 14px;
          color: #E2D7CC;
          margin-bottom: 24px;
          line-height: 1.6;
          font-weight: 300;
        }

        .split-btn {
          margin-top: 10px;
          font-size: 12px;
          padding: 10px 24px;
        }

        .center-brand-logo {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 4;
          background-color: rgba(252, 250, 247, 0.95);
          backdrop-filter: blur(8px);
          border: 1px solid #C5A059;
          padding: 28px 45px;
          display: flex;
          flex-direction: column;
          align-items: center;
          pointer-events: none;
          box-shadow: 0 30px 60px rgba(28, 27, 26, 0.18);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }

        .hero-split.expanded ~ .center-brand-logo {
          opacity: 0.15;
          transform: translate(-50%, -50%) scale(0.92);
        }

        .logo-text {
          font-family: var(--font-serif);
          font-size: 26px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--text-primary);
          line-height: 1;
        }

        .logo-sub {
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.3em;
          color: var(--accent-terracotta);
          margin-top: 6px;
        }

        /* Pillars block placement */
        .split-hero .hero-pillars {
          position: absolute;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%);
          width: calc(100% - 80px);
          max-width: 1200px;
          z-index: 5;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .split-hero .pillar {
          background-color: rgba(245, 239, 235, 0.9);
          backdrop-filter: blur(8px);
          padding: 20px 24px;
          border: 1px solid var(--border-color);
          box-shadow: var(--shadow-sm);
        }

        .split-hero .pillar-num {
          font-size: 24px;
          margin-bottom: 4px;
        }

        .split-hero .pillar-title {
          font-size: 16px;
          margin-bottom: 6px;
        }

        .split-hero .pillar-text {
          font-size: 12px;
          line-height: 1.4;
        }

        @media (max-width: 1024px) {
          .split-hero {
            height: auto;
            flex-direction: column;
          }

          .hero-split {
            flex: none;
            width: 100%;
            height: 50vh;
            padding-top: 80px;
            padding-bottom: 40px;
          }

          .hero-split.expanded,
          .hero-split.collapsed {
            flex: none;
            opacity: 1;
          }

          .center-brand-logo {
            display: none;
          }

          .split-hero .hero-pillars {
            position: relative;
            bottom: 0;
            left: 0;
            transform: none;
            width: 100%;
            margin-top: 0;
            padding: 20px;
            grid-template-columns: 1fr;
            background-color: var(--bg-primary);
          }
        }
      `}</style>
    </section>
  );
}
