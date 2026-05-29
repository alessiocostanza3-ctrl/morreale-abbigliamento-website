import React, { useState, useEffect, useRef } from "react";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Lino vs Lana monthly logic
  const month = new Date().getMonth();
  const isWinter = month === 11 || month === 0 || month === 1 || month === 2 || month === 10;
  
  const botName = isWinter ? "Lana" : "Lino";
  const botTitle = isWinter ? "La tua consulente di stile" : "Il tuo consulente di stile";
  const botType = isWinter ? "Lana spessa e accogliente" : "Fresco lino siciliano";

  // Initial welcome message
  useEffect(() => {
    const welcomeText = isWinter 
      ? "Benvenuto in Atelier! Sono Lana, la tua consulente virtuale. Come posso aiutarti oggi a scegliere tessuti, capi o prenotare una prova?"
      : "Benvenuto in Atelier! Sono Lino, il tuo consulente virtuale. Come posso aiutarti oggi a scegliere tessuti, capi o prenotare una prova?";
    
    setMessages([
      {
        id: "msg-welcome",
        role: "model",
        text: welcomeText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  }, [isWinter]);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  const handleSend = async (textToSend) => {
    const text = textToSend || inputValue;
    if (!text.trim()) return;

    if (!textToSend) {
      setInputValue("");
    }

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg = {
      id: "msg-user-" + Date.now(),
      role: "user",
      text: text,
      time: time
    };

    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    // Get API Key from localStorage
    const geminiKey = localStorage.getItem("morreale_gemini_key") || "";

    setTimeout(async () => {
      let replyText = "";
      
      if (geminiKey) {
        try {
          replyText = await callGeminiAPI(geminiKey, text, messages);
        } catch (error) {
          console.error("Errore chiamata Gemini:", error);
          replyText = getLocalResponse(text, true);
        }
      } else {
        // Fallback local keyword responder
        replyText = getLocalResponse(text);
      }

      const botMsg = {
        id: "msg-bot-" + Date.now(),
        role: "model",
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 1000); // Simulate natural typing delay
  };

  // Call official Gemini API
  const callGeminiAPI = async (apiKey, prompt, chatHistory) => {
    const systemPrompt = `
      Sei ${botName}, ${botTitle} di Morreale Abbigliamento, boutique di abbigliamento maschile di lusso situata a Licata (Sicilia), fondata da Fabrizio Morreale.
      Rispondi in modo estremamente cortese, elegante e caloroso. Usa un tono professionale ma accogliente, tipico di un atelier di lusso italiano.
      Sei in grado di consigliare capi, spiegare la qualità delle fibre naturali (come la lana Super 130s di Loro Piana, il lino fiammato Solbiati, la seta di Como) e guidare l'utente sia nell'acquisto online sullo Shop del sito sia nella prenotazione di un appuntamento.

      Informazioni utili sulla boutique e sul catalogo dello Shop:
      - Fondatore: Fabrizio Morreale.
      - Indirizzo: Via Corso Umberto I, Licata (AG).
      - Email di Fabrizio (test): alessiocostanza3@gmail.com
      - Telefono: +39 0922 851000.
      - Orari: Lunedì - Sabato: 09:00-13:00, 16:30-20:30. Domenica chiuso.
      - Servizi: Abiti da cerimonia uomo, abiti su misura, casual sartoriale, intimo di pregio, accessori. Prova in boutique gratuita con prenotazione.
      - Spedizioni: Gratuite in tutta Italia per ordini sopra i 150€. Consegna in 2-3 giorni lavorativi.
      - Pagamenti: Carta di credito, PayPal, contrassegno (pagamento alla consegna).
      - Prodotti principali disponibili nello Shop (acquistabili direttamente online sul sito):
        * Abito Tre Pezzi 'Principe di Galles' (Cerimonia, €890, in lana Super 130s Loro Piana).
        * Tuxedo Classico 'Midnight Blue' (Cerimonia, €1100, misto lana e seta).
        * Completo Lino 'Palermo' Estivo (Cerimonia, €750).
        * Giacca Sfoderata in Lino e Seta (Casual, €450).
        * Camicia Sartoriale in Lino Fiammato (Casual, €135, nei colori Bianco, Azzurro Polvere e Lino Naturale).
        * Camicia di Seta Nera 'Notte Siciliana' (Casual, €240, in Nero o Panna).
        * Maglia a Polo in Filo di Scozia (Casual, €180).
        * Pantaloni Chino in Cotone Supima (Casual, €165).
        * Cappotto Doppiopetto in Cashmere (Casual, €1450, in cashmere Loro Piana).
        * Intimo di pregio (es. Boxer Sartoriale in Seta Jacquard a €65, Vestaglia in Seta a €320, Pigiama in Popeline a €185).
        * Accessori (Cravatta in Seta Tricot a €95, Scarpe Oxford in pelle a €340, Cintura intrecciata in cuoio a €110, Gemelli in Argento a €190).

      Regole di risposta importanti:
      1. Mantieni le risposte brevi ed eleganti (massimo 3-4 frasi), a meno che non sia richiesta una spiegazione tecnica dettagliata.
      2. Se il cliente chiede di vedere modelli, comprare vestiti, o che cosa c'è di disponibile, descrivi i capi disponibili nello Shop del sito (ad esempio, le camicie in lino fiammato o in seta nera) e invitalo ad acquistarli direttamente online sul sito scorrendo in basso fino alla sezione Shop, oppure ad aggiungerli al carrello.
      3. Non spingere il cliente a venire fisicamente in boutique o a prenotare un appuntamento a meno che non stia esplicitamente cercando abiti su misura, abiti da sposo/cerimonia complessi o una prova di persona. Se vuole comprare online, aiutalo a scegliere e digli che può completare l'acquisto sul sito.
      4. Sii coerente con la tua personalità: sei ${botName}, assistente virtuale ${isWinter ? 'femminile fatta di lana calda e accogliente' : 'maschile fatto di una fresca fibra di lino siciliana'}.
    `;

    // Map history to Gemini API format
    const formattedHistory = chatHistory.map(msg => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.text }]
    }));

    // Add current user prompt
    formattedHistory.push({
      role: "user",
      parts: [{ text: prompt }]
    });

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: systemPrompt }]
          },
          contents: formattedHistory
        })
      }
    );

    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.error?.message || "Errore sconosciuto API Gemini");
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  };

  // Local Fallback Keyword Matching
  const getLocalResponse = (text, isErrorFallback = false) => {
    const q = text.toLowerCase();
    
    if (q.includes("orari") || q.includes("apertura") || q.includes("chiuso") || q.includes("sabato") || q.includes("domenica")) {
      return "Siamo aperti dal Lunedì al Sabato dalle 09:00 alle 13:00 e il pomeriggio dalle 16:30 alle 20:30. La Domenica la boutique è chiusa. Ti consigliamo di prenotare una visita in Atelier se desideri una prova personalizzata!";
    }
    if (q.includes("dove") || q.includes("indirizzo") || q.includes("licata") || q.includes("mappa") || q.includes("trova")) {
      return "La boutique Morreale Abbigliamento si trova nel centro storico di Licata (Agrigento), in Via Corso Umberto I. Vieni a trovarci per toccare con mano le nostre collezioni!";
    }
    if (q.includes("contatt") || q.includes("telefono") || q.includes("mail") || q.includes("chiamare") || q.includes("whatsapp")) {
      return "Puoi chiamarci al numero +39 0922 851000, scriverci via email a alessiocostanza3@gmail.com o avviare un ordine via WhatsApp direttamente dal carrello. Siamo a tua completa disposizione!";
    }
    if (q.includes("appuntament") || q.includes("prenot") || q.includes("visita") || q.includes("prova")) {
      return "Prenotare un appuntamento è semplicissimo! Puoi scorrere in fondo alla Home Page e compilare il nostro modulo di prenotazione scegliendo data, ora e il servizio desiderato (es. Prova abito o Sartoria su misura). Ti invieremo una conferma immediata.";
    }
    if (q.includes("tessut") || q.includes("lana") || q.includes("lino") || q.includes("seta") || q.includes("cashmere") || q.includes("loro piana")) {
      return "Selezioniamo solo filati nobili. Utilizziamo Lana Super 130s e Cashmere di Loro Piana, Lino Fiammato di Solbiati e Pura Seta delle storiche tessiture di Como. Puoi esplorare la nostra 'Tessutoteca' nella sezione Filosofia della Home Page!";
    }
    if (q.includes("spedizion") || q.includes("consegna") || q.includes("costo") || q.includes("tempi") || q.includes("spedire")) {
      return "Le spedizioni sono gratuite in tutta Italia per ordini superiori a 150€. Per cifre inferiori, la tariffa standard è di 8€. La consegna avviene tramite corriere espresso in 2-3 giorni lavorativi.";
    }
    if (q.includes("pagamento") || q.includes("paypal") || q.includes("carta") || q.includes("contrassegno") || q.includes("pagare")) {
      return "Accettiamo pagamenti sicuri con Carta di Credito, PayPal e contrassegno (pagamento in contanti direttamente al corriere alla consegna del pacco senza costi aggiuntivi).";
    }
    if (q.includes("fabrizio") || q.includes("proprietario") || q.includes("fondatore")) {
      return "Il titolare della boutique è Fabrizio Morreale. Da anni seleziona personalmente i migliori capi sartoriali e tessuti per offrire ai clienti di Licata e di tutta Italia un'eleganza classica senza tempo.";
    }
    if (q.includes("camicia") || q.includes("camicie") || q.includes("modelli") || q.includes("catalogo") || q.includes("comprare") || q.includes("vestiti") || q.includes("capi") || q.includes("abito") || q.includes("abiti") || q.includes("prodotto") || q.includes("prodotti") || q.includes("shop") || q.includes("acquistare") || q.includes("disponibil")) {
      return "Nel nostro Shop online (scorrendo in basso nella pagina principale) puoi trovare la nostra collezione esclusiva. Abbiamo splendidi abiti da cerimonia (come l'Abito Tre Pezzi Loro Piana), giacche casual sfoderate e camicie di pregio (la Camicia in Lino Fiammato a 135€ o la Camicia in Seta 'Notte Siciliana' a 240€). Puoi visualizzarli e acquistarli direttamente sul sito!";
    }

    if (isErrorFallback) {
      return `Scusami, ho riscontrato un piccolo rallentamento temporaneo nella connessione. Posso comunque darti risposte rapide su orari, indirizzo, contatti, spedizioni o prenotazione appuntamenti. Di cosa hai bisogno?`;
    }

    // Default local fallback
    return `Sono ${botName}, il tuo assistente virtuale di Morreale Abbigliamento. 
    
Posso darti risposte veloci su: Orari, Indirizzo a Licata, Contatti, Prenotazione Appuntamenti, Spedizioni, Tessuti pregiati (Loro Piana, Solbiati) e i modelli disponibili nello Shop. Di cosa hai bisogno?`;
  };

  const suggestions = [
    "Quali sono i vostri orari?",
    "Come prenoto un appuntamento?",
    "Quali tessuti di lusso usate?",
    "Quali sono i metodi di pagamento?"
  ];

  return (
    <>
      {/* Floating Toggle Button */}
      <button 
        type="button"
        className={`chatbot-trigger ${isOpen ? "active" : ""} ${isWinter ? "winter" : "summer"}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Apri assistenza virtuale"
      >
        {isOpen ? (
          <span className="close-icon">×</span>
        ) : (
          <div className="bot-avatar-btn">
            {isWinter ? (
              // Lana avatar (pink/cream ball of wool)
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="9" />
                <path d="M7 12c2-3 8-3 10 0" />
                <path d="M8 9c2 2 6 2 8 0" />
                <path d="M9 15c2-2 4-2 6 0" />
              </svg>
            ) : (
              // Lino avatar (linen blue flower/weave)
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2v20M2 12h20" />
                <path d="M12 2c3 4 3 14 0 20M12 2C9 6 9 16 12 22" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
            <span className="trigger-badge">Style AI</span>
          </div>
        )}
      </button>

      {/* Chat Window Panel */}
      <div className={`chatbot-window ${isOpen ? "open" : ""} ${isWinter ? "winter" : "summer"}`}>
        {/* Header */}
        <div className="chat-header">
          <div className="chat-header-avatar">
            {isWinter ? (
              <div className="avatar-circle wool-pink">🐑</div>
            ) : (
              <div className="avatar-circle lino-blue">🌾</div>
            )}
          </div>
          <div className="chat-header-info">
            <h4 className="chat-bot-name">{botName}</h4>
            <span className="chat-bot-status">
              <span className="status-dot"></span> Online • {botTitle}
            </span>
          </div>
          <button type="button" className="chat-close-btn" onClick={() => setIsOpen(false)}>×</button>
        </div>

        {/* Messages Body */}
        <div className="chat-messages-container">
          {messages.map(msg => (
            <div key={msg.id} className={`chat-message-row ${msg.role === "user" ? "user-row" : "bot-row"}`}>
              <div className="chat-bubble">
                <div className="chat-bubble-text">{msg.text}</div>
                <span className="chat-bubble-time">{msg.time}</span>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="chat-message-row bot-row">
              <div className="chat-bubble typing-bubble">
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggestions chips */}
        {messages.length === 1 && !isTyping && (
          <div className="chat-suggestions-box">
            {suggestions.map((sug, i) => (
              <button 
                key={i} 
                type="button" 
                className="suggestion-chip"
                onClick={() => handleSend(sug)}
              >
                {sug}
              </button>
            ))}
          </div>
        )}

        {/* Input Footer */}
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="chat-input-footer"
        >
          <input
            type="text"
            className="chat-input-field"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={`Chiedi a ${botName} sui tessuti, orari, abiti...`}
          />
          <button type="submit" className="chat-send-btn" aria-label="Invia messaggio">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </form>
      </div>

      <style>{`
        /* Chatbot Floating Button */
        .chatbot-trigger {
          position: fixed;
          bottom: 30px;
          right: 30px;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          border: none;
          cursor: pointer;
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          color: var(--white);
        }

        .chatbot-trigger.summer {
          background-color: var(--accent-terracotta);
        }
        .chatbot-trigger.summer:hover {
          background-color: var(--accent-terracotta-hover);
          transform: scale(1.08) rotate(5deg);
        }

        .chatbot-trigger.winter {
          background-color: var(--accent-olive);
        }
        .chatbot-trigger.winter:hover {
          background-color: var(--accent-olive-hover);
          transform: scale(1.08) rotate(-5deg);
        }

        .chatbot-trigger.active {
          transform: rotate(90deg);
          background-color: var(--text-primary) !important;
        }

        .close-icon {
          font-size: 28px;
          line-height: 1;
        }

        .bot-avatar-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
        }

        .trigger-badge {
          position: absolute;
          top: -24px;
          font-size: 8px;
          background-color: var(--text-primary);
          color: var(--white);
          padding: 2px 6px;
          border-radius: 10px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          white-space: nowrap;
          box-shadow: var(--shadow-sm);
        }

        /* Chat Window */
        .chatbot-window {
          position: fixed;
          bottom: 105px;
          right: 30px;
          width: 380px;
          height: 520px;
          max-height: 70vh;
          background-color: rgba(252, 250, 247, 0.95);
          backdrop-filter: blur(12px);
          border: 1px solid var(--border-color);
          box-shadow: var(--shadow-lg);
          z-index: 1000;
          display: flex;
          flex-direction: column;
          transform: translateY(30px);
          opacity: 0;
          pointer-events: none;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .chatbot-window.open {
          transform: translateY(0);
          opacity: 1;
          pointer-events: auto;
        }

        /* Summer vs Winter subtle styling overrides */
        .chatbot-window.summer {
          border-top: 4px solid var(--accent-terracotta);
        }
        .chatbot-window.winter {
          border-top: 4px solid var(--accent-olive);
        }

        /* Header */
        .chat-header {
          display: flex;
          align-items: center;
          padding: 16px 20px;
          border-bottom: 1px solid var(--border-color);
          background-color: rgba(255, 255, 255, 0.5);
        }

        .chat-header-avatar {
          margin-right: 12px;
        }

        .avatar-circle {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
        }

        .wool-pink {
          background-color: #F8D7DA;
          border: 1px solid #F5C6CB;
        }

        .lino-blue {
          background-color: #CCE5FF;
          border: 1px solid #B8DAFF;
        }

        .chat-header-info {
          flex: 1;
          text-align: left;
        }

        .chat-bot-name {
          font-family: var(--font-serif);
          font-size: 18px;
          margin: 0;
          line-height: 1.2;
        }

        .chat-bot-status {
          font-size: 11px;
          color: var(--text-muted);
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .status-dot {
          width: 6px;
          height: 6px;
          background-color: #28a745;
          border-radius: 50%;
          display: inline-block;
        }

        .chat-close-btn {
          background: transparent;
          border: none;
          font-size: 22px;
          cursor: pointer;
          color: var(--text-muted);
          transition: var(--transition-fast);
        }
        .chat-close-btn:hover {
          color: var(--text-primary);
        }

        /* Messages area */
        .chat-messages-container {
          flex: 1;
          overflow-y: auto;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          background-color: rgba(255, 255, 255, 0.2);
        }

        .chat-message-row {
          display: flex;
          width: 100%;
        }

        .user-row {
          justify-content: flex-end;
        }

        .bot-row {
          justify-content: flex-start;
        }

        .chat-bubble {
          max-width: 80%;
          padding: 12px 16px;
          position: relative;
          text-align: left;
        }

        .user-row .chat-bubble {
          background-color: var(--accent-terracotta);
          color: var(--white);
          border-radius: 12px 12px 0 12px;
        }

        .bot-row .chat-bubble {
          background-color: var(--white);
          color: var(--text-primary);
          border: 1px solid var(--border-color);
          border-radius: 12px 12px 12px 0;
        }

        .chat-bubble-text {
          font-size: 14px;
          line-height: 1.5;
          white-space: pre-wrap;
        }

        .chat-bubble-time {
          font-size: 9px;
          display: block;
          margin-top: 4px;
          text-align: right;
          opacity: 0.6;
        }

        /* Typing indicator bubble */
        .typing-bubble {
          display: flex;
          gap: 4px;
          padding: 10px 16px;
          align-items: center;
        }

        .typing-dot {
          width: 6px;
          height: 6px;
          background-color: var(--text-muted);
          border-radius: 50%;
          animation: typingBounce 1.4s infinite ease-in-out both;
        }

        .typing-dot:nth-child(1) { animation-delay: -0.32s; }
        .typing-dot:nth-child(2) { animation-delay: -0.16s; }

        @keyframes typingBounce {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1); }
        }

        /* Suggestions chips */
        .chat-suggestions-box {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          padding: 10px 20px;
          background-color: rgba(255, 255, 255, 0.4);
          border-top: 1px solid var(--border-color);
        }

        .suggestion-chip {
          background-color: var(--white);
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          padding: 6px 12px;
          border-radius: 15px;
          font-size: 11px;
          cursor: pointer;
          transition: var(--transition-fast);
          text-align: left;
        }

        .suggestion-chip:hover {
          border-color: var(--accent-terracotta);
          color: var(--accent-terracotta);
          background-color: var(--accent-terracotta-light);
        }

        /* Input footer */
        .chat-input-footer {
          display: flex;
          padding: 12px 16px;
          border-top: 1px solid var(--border-color);
          background-color: var(--white);
          gap: 10px;
        }

        .chat-input-field {
          flex: 1;
          border: 1px solid var(--border-color);
          padding: 10px 14px;
          font-size: 13px;
          font-family: var(--font-sans);
          outline: none;
          transition: var(--transition-fast);
          border-radius: 4px;
        }
        .chat-input-field:focus {
          border-color: var(--accent-terracotta);
        }

        .chat-send-btn {
          background-color: var(--text-primary);
          color: var(--white);
          border: none;
          width: 36px;
          height: 36px;
          border-radius: 4px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--transition-fast);
        }
        .chat-send-btn:hover {
          background-color: var(--accent-terracotta);
        }

        @media (max-width: 480px) {
          .chatbot-window {
            width: calc(100vw - 40px);
            right: 20px;
            bottom: 95px;
          }
          .chatbot-trigger {
            right: 20px;
            bottom: 20px;
          }
        }
      `}</style>
    </>
  );
}
