import React, { useState } from "react";

export default function Philosophy({ onRequestFabricFitting }) {
  const [showcaseTab, setShowcaseTab] = useState('jacket'); // 'jacket' | 'fabrics'

  const hotspots = [
    {
      id: "shoulder",
      label: "La Spalla 'a Camicia'",
      top: "18%",
      left: "30%",
      desc: "Tipica della tradizione napoletana ed italiana, è una spalla priva di imbottitura interna. Il tessuto in esubero viene convogliato nel giromanica e arricciato finemente a mano (*mappina*). Questo dona assoluta libertà di movimento e una silhouette destrutturata di estrema eleganza naturale.",
      sartoNote: "Il giromanica deve essere ridotto e cucito interamente a mano per adagiarsi perfettamente sulla conformazione naturale del corpo.",
      imageUrl: "https://images.unsplash.com/photo-1598257006458-087169a1f08d?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: "lapel",
      label: "Il Rever a Lancia",
      top: "28%",
      left: "48%",
      desc: "Un rever pronunciato e tagliato verso l'alto che allarga visivamente la linea delle spalle ed assottiglia il punto vita. Tipico dell'abito formale da cerimonia o del doppiopetto sartoriale, esprime slancio e forte personalità.",
      sartoNote: "La curvatura (*rollio*) del rever viene cucita stendendo i punti interni su una tela di crine naturale, modellata a vapore e mai stirata a piatto.",
      imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: "linings",
      label: "Sfoderata & Mezza Fodera",
      top: "45%",
      left: "38%",
      desc: "La scelta di lasciare la giacca sfoderata o a mezza fodera interna riduce drasticamente il peso del capo, lasciando visibili le rifiniture interne. Scegliamo solo pura seta o cupro per massimizzare la traspirabilità della camicia.",
      sartoNote: "L'assenza di fodera interna è la prova regina della qualità: non potendo nascondere nulla, le cuciture interne devono essere rifinite a capolavoro.",
      imageUrl: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: "buttons",
      label: "Bottoni in Corozo e Asola a Mano",
      top: "58%",
      left: "45%",
      desc: "Utilizziamo esclusivamente bottoni in materiali organici come il Corozo (avorio vegetale) o in Madreperla Australiana spessa. Ogni singola asola è intagliata ed asolata a mano con finissimo filo di seta lucido.",
      sartoNote: "L'asola fatta a mano si riconosce dalla tridimensionalità e morbidezza del rilievo ricamato, e dalla caratteristica imperfezione che certifica l'autenticità.",
      imageUrl: "https://images.unsplash.com/photo-1589756823695-278bc923f962?q=80&w=400&auto=format&fit=crop"
    }
  ];

  const [activeHotspot, setActiveHotspot] = useState(hotspots[0]);

  const fabricsData = [
    {
      id: "wool-lp",
      name: "Lana Vergine Super 130s",
      mill: "Loro Piana (Biella)",
      weight: "240g/m (Quattro Stagioni)",
      weave: "Twill Leggero",
      desc: "Fibra finissima e setosa, ideale per abiti da cerimonia e da lavoro. La lana Super 130s offre una straordinaria caduta del pantalone ed una resistenza naturale alle pieghe.",
      textureCSS: "radial-gradient(circle, #3d4a5d 10%, #212c3b 90%)"
    },
    {
      id: "linen-belg",
      name: "Lino Fiammato Belga",
      mill: "Solbiati (Varese)",
      weight: "210g/m (Estivo)",
      weave: "Tela Rustica",
      desc: "La caratteristica fiammatura del lino solbiati crea una texture tridimensionale ed irregolare. Estremamente traspirante e perfetto per le giornate estive siciliane.",
      textureCSS: "radial-gradient(circle, #d2c1aa 10%, #aa977f 90%)"
    },
    {
      id: "silk-como",
      name: "Seta Mulberry Jacquard",
      mill: "Tessiture Seriche di Como",
      weight: "95g/m (Leggero)",
      weave: "Raso Jacquard",
      desc: "Finitura brillante e mano ultra-liscia, impiegata per i dettagli degli smoking (rever in raso) e per le fodere interne delle giacche su misura più prestigiose.",
      textureCSS: "radial-gradient(circle, #6f263d 10%, #471221 90%)"
    },
    {
      id: "cashmere-lp",
      name: "Cashmere Spazzolato",
      mill: "Loro Piana (Biella)",
      weight: "480g/m (Invernale)",
      weave: "Sassonia Pesante",
      desc: "La fibra più nobile ed isolante, sottoposta a finitura con cardi naturali per donare la caratteristica lucentezza ad onda. Riservata ai cappotti invernali d'eccellenza.",
      textureCSS: "radial-gradient(circle, #484440 10%, #2b2826 90%)"
    }
  ];

  const [activeFabric, setActiveFabric] = useState(fabricsData[0]);

  return (
    <section id="philosophy" className="section philosophy-section">
      <div className="container">
        
        {/* Filosofia Grid */}
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

        {/* Interactive Sartorial Showcase (Anatomia & Tessutoteca) */}
        <div className="sartorial-showcase">
          <div className="showcase-header">
            <span className="philosophy-tag">Dettagli di Pregio</span>
            <h3 className="showcase-title">Il Know-How dell'Atelier</h3>
            
            {/* Tab Toggles */}
            <div className="showcase-tabs">
              <button 
                type="button" 
                className={`showcase-tab-btn ${showcaseTab === 'jacket' ? 'active' : ''}`}
                onClick={() => setShowcaseTab('jacket')}
              >
                Anatomia della Giacca
              </button>
              <button 
                type="button" 
                className={`showcase-tab-btn ${showcaseTab === 'fabrics' ? 'active' : ''}`}
                onClick={() => setShowcaseTab('fabrics')}
              >
                La Tessutoteca
              </button>
            </div>
          </div>

          {showcaseTab === 'jacket' ? (
            <div className="jacket-anatomy-container animate-fade-in">
              <div className="grid-2 anatomy-grid" style={{ alignItems: "center" }}>
                {/* Visual diagram wrapper */}
                <div className="jacket-visual-box">
                  <img 
                    src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=600&auto=format&fit=crop" 
                    alt="Giacca Sartoriale Morreale" 
                    className="anatomy-jacket-img"
                  />
                  
                  {/* Hotspots */}
                  {hotspots.map(spot => (
                    <button
                      key={spot.id}
                      type="button"
                      className={`jacket-hotspot ${activeHotspot.id === spot.id ? 'active' : ''}`}
                      style={{ top: spot.top, left: spot.left }}
                      onClick={() => setActiveHotspot(spot)}
                      title={spot.label}
                    >
                      +
                    </button>
                  ))}
                </div>

                {/* Details box */}
                <div className="jacket-details-box">
                  <div style={{ display: "flex", gap: "24px", alignItems: "flex-start", flexWrap: "wrap" }}>
                    <div style={{ flex: "1", minWidth: "260px" }}>
                      <span className="details-tag">Dettaglio Sartoriale</span>
                      <h4 className="details-title">{activeHotspot.label}</h4>
                      <p className="details-text">{activeHotspot.desc}</p>
                      
                      <div className="sarto-note-box">
                        <span className="note-title">Nota del Sarto</span>
                        <p className="note-text">{activeHotspot.sartoNote}</p>
                      </div>
                    </div>
                    {activeHotspot.imageUrl && (
                      <div className="macro-zoom-preview-box" style={{
                        width: "160px",
                        height: "220px",
                        border: "1px solid var(--border-color)",
                        boxShadow: "var(--shadow-sm)",
                        overflow: "hidden",
                        flexShrink: "0",
                        position: "relative",
                        marginTop: "10px"
                      }}>
                        <img 
                          src={activeHotspot.imageUrl} 
                          alt={activeHotspot.label} 
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                        <div className="macro-zoom-label" style={{
                          position: "absolute",
                          bottom: "8px",
                          left: "50%",
                          transform: "translateX(-50%)",
                          backgroundColor: "rgba(28, 27, 26, 0.85)",
                          color: "var(--white)",
                          fontSize: "8px",
                          textTransform: "uppercase",
                          padding: "2px 8px",
                          letterSpacing: "0.1em",
                          whiteSpace: "nowrap"
                        }}>
                          Macro Zoom
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="fabrics-library-container animate-fade-in">
              <div className="grid-4 fabrics-grid">
                {fabricsData.map(fabric => (
                  <div 
                    key={fabric.id} 
                    className={`fabric-card ${activeFabric.id === fabric.id ? 'active' : ''}`}
                    onClick={() => setActiveFabric(fabric)}
                  >
                    <div className="fabric-texture-preview" style={{ background: fabric.textureCSS }}>
                      <div className="fabric-weave-lines"></div>
                    </div>
                    <div className="fabric-info-box">
                      <span className="fabric-prov">{fabric.mill}</span>
                      <h4 className="fabric-title">{fabric.name}</h4>
                    </div>
                  </div>
                ))}
              </div>
 
              <div className="selected-fabric-detail-box">
                <div className="fabric-desc-col">
                  <span className="fabric-prov-tag">Filato Certificato — {activeFabric.mill}</span>
                  <h3 className="selected-fabric-title">{activeFabric.name}</h3>
                  <p className="selected-fabric-desc">{activeFabric.desc}</p>
                  <div className="fabric-meta-grid">
                    <div className="meta-item">
                      <span className="meta-label">Peso</span>
                      <strong className="meta-value">{activeFabric.weight}</strong>
                    </div>
                    <div className="meta-item">
                      <span className="meta-label">Struttura</span>
                      <strong className="meta-value">{activeFabric.weave}</strong>
                    </div>
                  </div>
                </div>
                <div className="fabric-action-col">
                  <button 
                    type="button" 
                    className="btn btn-primary"
                    onClick={(e) => {
                      if (onRequestFabricFitting) {
                        onRequestFabricFitting(activeFabric);
                      } else {
                        const formEl = document.getElementById("appointment");
                        if (formEl) {
                          formEl.scrollIntoView({ behavior: "smooth" });
                        }
                      }
                    }}
                  >
                    Richiedi Fitting con questo Tessuto
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Citazione Monumentale e Territorio */}
        <div className="philosophy-monument-quote">
          <span className="quote-tag">La Cura del Dettaglio</span>
          <blockquote className="quote-body">
            “La moda passa, lo stile e la precisione del dettaglio siciliano restano nel tempo.”
          </blockquote>
          <cite className="quote-author">
            — Fabrizio Morreale, Fondatore
          </cite>
          
          <p className="territory-story">
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

        /* Showcase styles */
        .sartorial-showcase {
          margin-top: 100px;
          border-top: 1px solid var(--border-color);
          padding-top: 80px;
        }

        .showcase-title {
          font-family: var(--font-serif);
          font-size: 32px;
          margin-top: 6px;
        }

        .showcase-tabs {
          display: flex;
          justify-content: center;
          gap: 16px;
          margin-top: 30px;
          margin-bottom: 50px;
        }

        .showcase-tab-btn {
          background: transparent;
          border: 1px solid var(--border-color);
          padding: 12px 28px;
          font-family: var(--font-sans);
          font-size: 13px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--text-secondary);
          cursor: pointer;
          transition: var(--transition-fast);
        }

        .showcase-tab-btn:hover {
          background-color: var(--bg-secondary);
          color: var(--text-primary);
        }

        .showcase-tab-btn.active {
          background-color: var(--accent-terracotta);
          border-color: var(--accent-terracotta);
          color: var(--white);
        }

        /* Jacket Anatomy */
        .jacket-visual-box {
          position: relative;
          background-color: var(--bg-secondary);
          padding: 40px;
          border: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: center;
          height: 480px;
        }

        .anatomy-jacket-img {
          max-height: 100%;
          width: auto;
          object-fit: contain;
          mix-blend-mode: multiply;
          opacity: 0.9;
        }

        .jacket-hotspot {
          position: absolute;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background-color: var(--accent-terracotta);
          color: var(--white);
          border: 2px solid var(--white);
          font-size: 18px;
          font-weight: 500;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: var(--shadow-md);
          transition: var(--transition-smooth);
          z-index: 10;
        }

        .jacket-hotspot::after {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border: 2px solid var(--accent-terracotta);
          top: -2px;
          left: -2px;
          opacity: 0;
          pointer-events: none;
          box-sizing: content-box;
        }

        .jacket-hotspot.active {
          background-color: var(--accent-olive);
          border-color: var(--white);
          transform: scale(1.1);
        }

        .jacket-hotspot.active::after {
          animation: hotspotPulse 2s infinite ease-out;
          border-color: var(--accent-olive);
        }

        .jacket-hotspot:hover {
          background-color: var(--accent-olive);
          transform: scale(1.15);
        }

        @keyframes hotspotPulse {
          0% {
            transform: scale(1);
            opacity: 0.8;
          }
          100% {
            transform: scale(2.2);
            opacity: 0;
          }
        }

        .jacket-details-box {
          padding: 30px;
          text-align: left;
        }

        .details-tag {
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.25em;
          color: var(--accent-terracotta);
          font-weight: 600;
          display: block;
        }

        .details-title {
          font-family: var(--font-serif);
          font-size: 28px;
          margin: 12px 0 20px 0;
          font-weight: 400;
        }

        .details-text {
          font-size: 16px;
          line-height: 1.7;
          color: var(--text-secondary);
        }

        .sarto-note-box {
          margin-top: 35px;
          padding: 20px 24px;
          border-left: 2px solid var(--accent-olive);
          background-color: var(--bg-secondary);
        }

        .note-title {
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--accent-olive);
          font-weight: 600;
          display: block;
          margin-bottom: 6px;
        }

        .note-text {
          font-size: 14px;
          color: var(--text-muted);
          font-style: italic;
          line-height: 1.5;
        }

        /* Fabrics Library */
        .fabric-card {
          background-color: var(--white);
          border: 1px solid var(--border-color);
          padding: 16px;
          cursor: pointer;
          transition: var(--transition-smooth);
          box-shadow: var(--shadow-sm);
        }

        .fabric-card:hover,
        .fabric-card.active {
          border-color: var(--accent-terracotta);
          box-shadow: var(--shadow-md);
          transform: translateY(-4px);
        }

        .fabric-texture-preview {
          height: 130px;
          width: 100%;
          border: 1px solid var(--border-color);
          position: relative;
          overflow: hidden;
        }

        .fabric-weave-lines {
          position: absolute;
          width: 100%;
          height: 100%;
          opacity: 0.25;
          background-image: repeating-linear-gradient(45deg, #000, #000 1px, transparent 1px, transparent 4px), repeating-linear-gradient(-45deg, #000, #000 1px, transparent 1px, transparent 4px);
        }

        .fabric-info-box {
          margin-top: 15px;
          text-align: left;
        }

        .fabric-prov {
          font-size: 10px;
          text-transform: uppercase;
          color: var(--accent-terracotta);
          font-weight: 600;
        }

        .fabric-title {
          font-family: var(--font-serif);
          font-size: 18px;
          color: var(--text-primary);
          margin-top: 4px;
          font-weight: 400;
        }

        .selected-fabric-detail-box {
          margin-top: 40px;
          padding: 40px;
          border: 1px solid var(--border-color);
          background-color: var(--white);
          box-shadow: var(--shadow-sm);
          display: flex;
          gap: 40px;
          flex-wrap: wrap;
          text-align: left;
        }

        .fabric-desc-col {
          flex: 1.5;
          min-width: 300px;
        }

        .fabric-prov-tag {
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: var(--accent-terracotta);
          font-weight: 600;
          display: block;
        }

        .selected-fabric-title {
          font-family: var(--font-serif);
          font-size: 32px;
          margin: 12px 0 20px 0;
          font-weight: 400;
        }

        .selected-fabric-desc {
          font-size: 15px;
          line-height: 1.7;
          color: var(--text-secondary);
        }

        .fabric-meta-grid {
          display: flex;
          gap: 30px;
          margin-top: 30px;
          border-top: 1px dashed var(--border-color);
          padding-top: 20px;
        }

        .meta-item {
          display: flex;
          flex-direction: column;
        }

        .meta-label {
          font-size: 11px;
          color: var(--text-muted);
        }

        .meta-value {
          font-size: 15px;
          color: var(--text-primary);
          margin-top: 4px;
        }

        .fabric-action-col {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 250px;
        }

        /* Citazione Monumentale */
        .philosophy-monument-quote {
          margin: 100px auto 0 auto;
          padding-top: 80px;
          border-top: 1px solid var(--border-color);
          text-align: center;
          max-width: 850px;
        }

        .quote-tag {
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: var(--accent-terracotta);
          font-weight: 600;
          display: block;
        }

        .quote-body {
          font-family: var(--font-serif);
          font-size: clamp(24px, 4vw, 36px);
          line-height: 1.3;
          color: var(--text-primary);
          margin: 24px 0;
          font-style: italic;
          font-weight: 400;
        }

        .quote-author {
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--text-muted);
          font-style: normal;
          font-weight: 500;
          display: block;
        }

        .territory-story {
          margin-top: 50px;
          font-size: 15px;
          line-height: 1.8;
          color: var(--text-secondary);
          text-align: justify;
          text-justify: inter-word;
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

          .anatomy-grid {
            grid-template-columns: 1fr;
          }

          .jacket-visual-box {
            height: 380px;
          }

          .jacket-details-box {
            padding: 20px 0;
          }

          .selected-fabric-detail-box {
            padding: 24px 16px;
            gap: 24px;
          }
        }
      `}</style>
    </section>
  );
}
