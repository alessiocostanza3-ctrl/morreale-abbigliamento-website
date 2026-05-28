import React from "react";

export default function Philosophy() {
  return (
    <section id="philosophy" className="section philosophy-section">
      <div className="container">
        <div className="grid-2 philosophy-grid">
          
          <div className="philosophy-text-container">
            <span className="philosophy-tag">La Nostra Visione</span>
            <h2 className="philosophy-title">Il Rito del Vestire Bene</h2>
            
            <p className="philosophy-paragraph">
              Nel nostro negozio al centro di Licata, crediamo che l'abito non sia semplicemente un indumento, ma un'espressione di personalità e rispetto per sé stessi. Ci dedichiamo a conservare l'autentica classicità italiana, selezionando capi in cui ogni dettaglio è studiato per durare nel tempo.
            </p>
            
            <div className="philosophy-highlight-box">
              <h4 className="highlight-title">Abiti da Cerimonia &amp; Sartoria</h4>
              <p className="highlight-desc">
                Che si tratti del giorno del tuo matrimonio o di un evento formale, ti offriamo un servizio di consulenza dedicato per trovare il taglio perfetto, adattandolo alle tue misure con precisione millimetrica.
              </p>
            </div>
            
            <p className="philosophy-paragraph">
              Dalla scelta della fodera interna alla morbidezza dell'intimo in puro cotone, fino al nodo perfetto di una cravatta in seta: ogni elemento concorre a definire l'eleganza maschile contemporanea.
            </p>
          </div>

          <div className="philosophy-images-container">
            <div className="image-card card-large">
              <img 
                src="https://images.unsplash.com/photo-1598257006458-087169a1f08d?q=80&w=800&auto=format&fit=crop" 
                alt="Misura dell'abito sartoriale"
                className="philosophy-img"
              />
              <div className="image-overlay-info">
                <span>Tradizione</span>
                <strong>Misura &amp; Precisione</strong>
              </div>
            </div>
            
            <div className="image-card card-small">
              <img 
                src="https://images.unsplash.com/photo-1598032895397-b9472444bf93?q=80&w=600&auto=format&fit=crop" 
                alt="Tessuti italiani e dettagli"
                className="philosophy-img"
              />
              <div className="image-overlay-info">
                <span>Materie Prime</span>
                <strong>Fibre Naturali Italiane</strong>
              </div>
            </div>
          </div>

        </div>

        <div className="philosophy-monument-quote" style={{
          marginTop: "80px",
          paddingTop: "60px",
          borderTop: "1px solid var(--border-color)",
          textAlign: "center",
          maxWidth: "850px",
          margin: "80px auto 0 auto"
        }}>
          <span style={{
            fontSize: "10px",
            textTransform: "uppercase",
            letterSpacing: "0.2em",
            color: "var(--accent-terracotta)",
            fontWeight: "600"
          }}>
            La Cura del Dettaglio
          </span>
          <blockquote style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(24px, 4vw, 36px)",
            lineHeight: "1.3",
            color: "var(--text-primary)",
            margin: "20px 0",
            fontStyle: "italic"
          }}>
            “La moda passa, lo stile e la precisione del dettaglio siciliano restano nel tempo.”
          </blockquote>
          <cite style={{
            fontSize: "12px",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "var(--text-muted)",
            fontStyle: "normal",
            fontWeight: "500"
          }}>
            — Fabrizio Morreale, Fondatore
          </cite>
          
          <p className="territory-story" style={{
            marginTop: "40px",
            fontSize: "15px",
            lineHeight: "1.8",
            color: "var(--text-secondary)",
            textAlign: "justify",
            textJustify: "inter-word"
          }}>
            Morreale Abbigliamento nasce nel cuore di Licata, un territorio plasmato dal calore del sole e dalla luce riflessa del Mediterraneo. Questa atmosfera e i colori della nostra costa ispirano ogni giorno la selezione delle nostre collezioni. Crediamo che vestire sia un rito antico che unisce il rigore del taglio alla morbidezza e alla freschezza delle materie naturali, creando un ponte invisibile tra la solennità delle occasioni speciali e la spontaneità dell'eleganza quotidiana.
          </p>
        </div>

      </div>

      <style>{`
        .philosophy-section {
          background-color: var(--bg-primary);
          overflow: hidden;
          margin-top: 60px; /* offset for hero pillars */
        }

        @media (max-width: 1024px) {
          .philosophy-section {
            margin-top: 0;
          }
        }

        .philosophy-grid {
          align-items: center;
          gap: 60px;
        }

        .philosophy-text-container {
          text-align: left;
        }

        .philosophy-tag {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.25em;
          color: var(--accent-terracotta);
          font-weight: 600;
          display: block;
          margin-bottom: 12px;
        }

        .philosophy-title {
          font-family: var(--font-serif);
          margin-bottom: 30px;
          line-height: 1.15;
        }

        .philosophy-paragraph {
          font-size: 16px;
          color: var(--text-secondary);
          margin-bottom: 25px;
          line-height: 1.7;
        }

        .philosophy-highlight-box {
          border-left: 2px solid var(--accent-olive);
          padding-left: 24px;
          margin: 35px 0;
        }

        .highlight-title {
          font-family: var(--font-serif);
          font-size: 20px;
          margin-bottom: 8px;
          color: var(--text-primary);
        }

        .highlight-desc {
          font-size: 15px;
          color: var(--text-muted);
          line-height: 1.6;
        }

        /* Images collage */
        .philosophy-images-container {
          position: relative;
          display: flex;
          height: 550px;
          width: 100%;
        }

        .image-card {
          position: absolute;
          overflow: hidden;
          box-shadow: var(--shadow-lg);
          border: 1px solid var(--border-color);
          background-color: var(--bg-secondary);
        }

        .philosophy-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.8s ease;
        }

        .image-card:hover .philosophy-img {
          transform: scale(1.06);
        }

        .card-large {
          top: 0;
          left: 0;
          width: 70%;
          height: 80%;
          z-index: 1;
        }

        .card-small {
          bottom: 0;
          right: 0;
          width: 50%;
          height: 60%;
          z-index: 2;
          border: 4px solid var(--bg-primary);
        }

        .image-overlay-info {
          position: absolute;
          bottom: 20px;
          left: 20px;
          z-index: 3;
          background: rgba(28, 27, 26, 0.85);
          backdrop-filter: blur(4px);
          padding: 12px 20px;
          color: var(--white);
          text-align: left;
          display: flex;
          flex-direction: column;
        }

        .image-overlay-info span {
          font-size: 9px;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--accent-terracotta);
          margin-bottom: 2px;
        }

        .image-overlay-info strong {
          font-family: var(--font-serif);
          font-size: 16px;
          font-weight: 400;
          letter-spacing: 0.05em;
        }

        @media (max-width: 768px) {
          .philosophy-grid {
            grid-template-columns: 1fr;
          }
          
          .philosophy-images-container {
            height: 400px;
          }
          
          .card-large {
            width: 75%;
            height: 75%;
          }
          
          .card-small {
            width: 55%;
            height: 55%;
          }

          .image-overlay-info {
            padding: 8px 12px;
            bottom: 10px;
            left: 10px;
          }

          .image-overlay-info strong {
            font-size: 13px;
          }

          .image-overlay-info span {
            font-size: 8px;
          }
        }
      `}</style>
    </section>
  );
}
