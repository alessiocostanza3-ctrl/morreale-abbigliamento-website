import React, { useState } from "react";

export default function AppointmentForm({ onAddBooking }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    timeSlot: "10:30 - 12:00",
    service: "Consulenza Abito da Sposo / Cerimonia",
    notes: ""
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);

  const timeSlots = [
    "09:00 - 10:30",
    "10:30 - 12:00",
    "16:00 - 17:30",
    "17:30 - 19:00"
  ];

  const services = [
    "Consulenza Abito da Sposo / Cerimonia",
    "Prova Sartoriale Abito Su Misura",
    "Personal Styling & Casual Rinnovato",
    "Consulenza Accessori & Dettagli"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.date) {
      alert("Si prega di compilare i campi obbligatori (Nome, Telefono, Data).");
      return;
    }

    const newBooking = {
      id: "book-" + Date.now(),
      ...formData,
      createdAt: new Date().toLocaleDateString("it-IT"),
      status: "Da Confermare"
    };

    onAddBooking(newBooking);
    setIsSubmitted(true);

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      date: "",
      timeSlot: "10:30 - 12:00",
      service: "Consulenza Abito da Sposo / Cerimonia",
      notes: ""
    });

    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  return (
    <section id="appointment" className="section appointment-section">
      <div className="container appointment-container">
        
        <div className="appointment-header">
          <span className="appointment-tag">Servizio Dedicato</span>
          <h2 className="appointment-title">Riserva il Tuo Spazio in Atelier</h2>
          <p className="appointment-subtitle">
            Ti offriamo una consulenza privata ed esclusiva per assisterti nella scelta del tuo capo o per una prova sartoriale su misura. Compila il modulo e ti riserveremo l'intero showroom a Licata.
          </p>
        </div>

        <div className="appointment-box">
          {isSubmitted ? (
            <div className="appointment-success animate-fade-in">
              <div className="success-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <h3>Richiesta Inviata con Successo</h3>
              <p>Grazie per aver scelto Morreale Abbigliamento. Ti contatteremo telefonicamente entro 24 ore per confermare il giorno e l'orario del tuo appuntamento.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="appointment-form">
              <div className="grid-2 form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="name">Nome Completo *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-input"
                    placeholder="Esempio: Alessandro Morreale"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="phone">Numero di Telefono *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="form-input"
                    placeholder="Esempio: +39 347 1234567"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="grid-2 form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="email">Indirizzo Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-input"
                    placeholder="Esempio: alessandro@esempio.it"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="service">Servizio Richiesto</label>
                  <select
                    id="service"
                    name="service"
                    className="form-select"
                    value={formData.service}
                    onChange={handleChange}
                  >
                    {services.map((svc) => (
                      <option key={svc} value={svc}>{svc}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid-2 form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="date">Giorno Desiderato *</label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    className="form-input"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="timeSlot">Fascia Oraria</label>
                  <select
                    id="timeSlot"
                    name="timeSlot"
                    className="form-select"
                    value={formData.timeSlot}
                    onChange={handleChange}
                  >
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="notes">Note o Esigenze Particolari</label>
                <textarea
                  id="notes"
                  name="notes"
                  className="form-textarea"
                  placeholder="Se hai preferenze su taglie, tessuti o stili scrivilo qui..."
                  value={formData.notes}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className="form-submit-container">
                <button type="submit" className="btn btn-primary btn-submit">
                  Invia Richiesta Appuntamento
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      <style>{`
        .appointment-section {
          background-color: var(--bg-secondary);
          border-top: 1px solid var(--border-color);
        }

        .appointment-container {
          max-width: 900px !important;
        }

        .appointment-header {
          text-align: center;
          margin-bottom: 50px;
        }

        .appointment-tag {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.25em;
          color: var(--accent-terracotta);
          font-weight: 600;
          display: block;
          margin-bottom: 12px;
        }

        .appointment-title {
          font-family: var(--font-serif);
          margin-bottom: 20px;
        }

        .appointment-subtitle {
          font-size: 16px;
          color: var(--text-secondary);
          max-width: 700px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .appointment-box {
          background-color: var(--white);
          border: 1px solid var(--border-color);
          box-shadow: var(--shadow-md);
          padding: 50px;
        }

        .form-row {
          gap: 24px;
        }

        .form-submit-container {
          text-align: center;
          margin-top: 30px;
        }

        .btn-submit {
          width: 100%;
          max-width: 380px;
        }

        .appointment-success {
          text-align: center;
          padding: 40px 20px;
        }

        .success-icon {
          color: var(--success);
          margin-bottom: 20px;
        }

        .appointment-success h3 {
          font-size: 26px;
          margin-bottom: 16px;
        }

        .appointment-success p {
          font-size: 15px;
          color: var(--text-secondary);
          max-width: 500px;
          margin: 0 auto;
        }

        @media (max-width: 768px) {
          .appointment-box {
            padding: 30px 20px;
          }
        }
      `}</style>
    </section>
  );
}
