import React from "react";

export default function Hero({ setView }) {
  return (
    <section className="hero-section">
      <div className="hero-bg-overlay"></div>
      <div className="container hero-container">
        <div className="hero-content animate-slide-up">
          <span className="hero-subtitle">Atelier &amp; Boutique a Licata</span>
          <h1 className="hero-title">L'Eleganza che Racconta una Storia</h1>
          <p className="hero-description">
            Nel centro storico di Licata, un ambiente dedicato all'uomo che ricerca il buon gusto e la classicità italiana. Dagli abiti da cerimonia più raffinati alle collezioni casual di alta qualità.
          </p>
          <div className="hero-actions">
            <button className="btn btn-primary" onClick={() => setView("shop")}>
              Esplora lo Shop
            </button>
            <a href="#appointment" className="btn btn-outline btn-hero-outline">
              Prenota un Appuntamento
            </a>
          </div>
        </div>
      </div>

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
        .hero-section {
          height: 90vh;
          position: relative;
          background-image: url('https://images.unsplash.com/photo-1593030103066-0093718efeb9?q=80&w=1600&auto=format&fit=crop');
          background-size: cover;
          background-position: center 30%;
          display: flex;
          align-items: center;
          color: var(--white);
          margin-top: 0;
          padding-top: var(--navbar-height);
        }

        .hero-bg-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to right, rgba(28, 27, 26, 0.75) 40%, rgba(28, 27, 26, 0.25) 100%);
          z-index: 1;
        }

        .hero-container {
          position: relative;
          z-index: 2;
          width: 100%;
        }

        .hero-content {
          max-width: 650px;
          text-align: left;
        }

        .hero-subtitle {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.3em;
          color: var(--accent-terracotta);
          font-weight: 600;
          display: block;
          margin-bottom: 15px;
        }

        .hero-title {
          font-family: var(--font-serif);
          color: var(--white);
          margin-bottom: 24px;
          font-size: clamp(2.5rem, 5.5vw, 4.5rem);
          font-weight: 400;
          line-height: 1.1;
        }

        .hero-description {
          font-size: clamp(1rem, 1.2vw, 1.25rem);
          color: #E2D7CC;
          margin-bottom: 40px;
          line-height: 1.6;
          font-weight: 300;
        }

        .hero-actions {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
        }

        .btn-hero-outline {
          color: var(--white);
          border-color: rgba(255, 255, 255, 0.4);
        }

        .btn-hero-outline:hover {
          background-color: var(--white);
          color: var(--text-primary);
          border-color: var(--white);
        }

        /* Pillars block */
        .hero-pillars {
          position: absolute;
          bottom: -80px;
          left: 50%;
          transform: translateX(-50%);
          width: 100%;
          z-index: 5;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
        }

        .pillar {
          background-color: var(--bg-secondary);
          padding: 35px 30px;
          border: 1px solid var(--border-color);
          box-shadow: var(--shadow-md);
          text-align: left;
          transition: var(--transition-smooth);
        }

        .pillar:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-lg);
          border-color: var(--accent-terracotta);
        }

        .pillar-num {
          font-family: var(--font-serif);
          font-size: 32px;
          color: var(--accent-terracotta);
          opacity: 0.5;
          display: block;
          margin-bottom: 10px;
        }

        .pillar-title {
          font-size: 20px;
          margin-bottom: 12px;
          font-weight: 500;
        }

        .pillar-text {
          font-size: 14px;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        @media (max-width: 1024px) {
          .hero-section {
            height: auto;
            flex-direction: column;
            align-items: flex-start;
            padding-top: calc(var(--navbar-height) + 40px);
            padding-bottom: 80px;
          }
          
          .hero-pillars {
            position: relative;
            bottom: 0;
            left: 0;
            transform: none;
            margin-top: 40px;
            grid-template-columns: 1fr;
            gap: 20px;
          }
        }
      `}</style>
    </section>
  );
}
