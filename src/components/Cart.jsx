import React, { useState } from "react";

export default function Cart({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveFromCart, onPlaceOrder }) {
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    email: "",
    notes: ""
  });
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [lastOrderDetails, setLastOrderDetails] = useState(null);

  if (!isOpen) return null;

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckout = (method) => {
    if (cartItems.length === 0) return;
    if (!customerInfo.name || !customerInfo.phone) {
      alert("Inserisci Nome e Telefono per completare l'ordine.");
      return;
    }

    // Prepare order payload
    const orderId = "ord-" + Date.now();
    const orderData = {
      id: orderId,
      customer: customerInfo,
      items: cartItems.map(item => ({
        id: item.id,
        name: item.name,
        category: item.category,
        price: item.price,
        quantity: item.quantity,
        size: item.size,
        color: item.color
      })),
      total: total,
      date: new Date().toLocaleDateString("it-IT"),
      status: "In attesa"
    };

    // Save order in admin panel state
    onPlaceOrder(orderData);
    setLastOrderDetails(orderData);
    setOrderCompleted(true);

    // Build order summary string
    let orderSummary = `Salve Morreale Abbigliamento, vorrei ordinare i seguenti capi:\n\n`;
    cartItems.forEach((item) => {
      orderSummary += `• ${item.name}\n  - Taglia: ${item.size}\n  - Colore: ${item.color}\n  - Qty: ${item.quantity} x €${item.price}\n\n`;
    });
    orderSummary += `*Totale Ordine: €${total}*\n\n`;
    orderSummary += `*Dati Cliente:*\n`;
    orderSummary += `- Nome: ${customerInfo.name}\n`;
    orderSummary += `- Telefono: ${customerInfo.phone}\n`;
    if (customerInfo.email) orderSummary += `- Email: ${customerInfo.email}\n`;
    if (customerInfo.notes) orderSummary += `- Note: ${customerInfo.notes}\n`;

    // Reset customer fields
    setCustomerInfo({
      name: "",
      phone: "",
      email: "",
      notes: ""
    });

    // Send actions
    const encodedText = encodeURIComponent(orderSummary);
    if (method === "whatsapp") {
      // Licata store default mock number or empty number
      const shopNumber = "393470000000"; // Placeholder whatsapp
      window.open(`https://wa.me/${shopNumber}?text=${encodedText}`, "_blank");
    } else if (method === "email") {
      const shopEmail = "ordini@morrealeabbigliamento.it";
      window.open(`mailto:${shopEmail}?subject=Nuovo Ordine ${orderId}&body=${encodedText}`, "_blank");
    }
  };

  const handleCloseSuccess = () => {
    setOrderCompleted(false);
    setLastOrderDetails(null);
    onClose();
  };

  return (
    <div className="slide-panel-overlay" onClick={onClose}>
      <div className="slide-panel cart-panel" onClick={(e) => e.stopPropagation()}>
        
        <div className="cart-header">
          <h2 className="cart-title">Il Tuo Carrello</h2>
          <button className="cart-close" onClick={onClose} aria-label="Chiudi carrello">×</button>
        </div>

        {orderCompleted ? (
          <div className="cart-success-view animate-fade-in">
            <div className="success-icon-wrapper">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
            </div>
            <h3>Ordine Registrato!</h3>
            <p className="success-intro">Il tuo ordine è stato registrato nel nostro database ed è in elaborazione.</p>
            
            <div className="success-order-box">
              <strong>Codice Ordine:</strong>
              <span>{lastOrderDetails?.id}</span>
              <br />
              <strong>Totale:</strong>
              <span>€{lastOrderDetails?.total}</span>
            </div>

            <p className="success-outro">Verrai contattato a breve per finalizzare la consegna.</p>
            <button className="btn btn-primary" style={{ width: "100%" }} onClick={handleCloseSuccess}>
              Continua lo Shopping
            </button>
          </div>
        ) : (
          <>
            {/* Cart Items List */}
            <div className="cart-items-container">
              {cartItems.length === 0 ? (
                <div className="cart-empty-message">
                  <p>Il tuo carrello è vuoto.</p>
                  <button className="btn btn-outline" style={{ marginTop: "20px" }} onClick={onClose}>
                    Torna allo Shop
                  </button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={`${item.id}-${item.size}-${item.color}`} className="cart-item">
                    <img src={item.imageUrl} alt={item.name} className="cart-item-img" />
                    <div className="cart-item-info">
                      <h4 className="cart-item-name">{item.name}</h4>
                      <span className="cart-item-details">Taglia: {item.size} | Colore: {item.color}</span>
                      <span className="cart-item-price">€{item.price}</span>
                      
                      <div className="quantity-controls">
                        <button 
                          className="qty-btn"
                          onClick={() => onUpdateQuantity(item.id, item.size, item.color, item.quantity - 1)}
                        >
                          -
                        </button>
                        <span className="qty-val">{item.quantity}</span>
                        <button 
                          className="qty-btn"
                          onClick={() => onUpdateQuantity(item.id, item.size, item.color, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button 
                      className="cart-item-remove"
                      onClick={() => onRemoveFromCart(item.id, item.size, item.color)}
                      title="Rimuovi"
                    >
                      ×
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Cart Footer Checkout Form */}
            {cartItems.length > 0 && (
              <div className="cart-footer">
                <div className="cart-total-row">
                  <span>Totale Stimato</span>
                  <span className="cart-total-price">€{total}</span>
                </div>

                <div className="cart-divider"></div>

                <form className="checkout-form" onSubmit={(e) => e.preventDefault()}>
                  <h3 className="checkout-form-title">Dati per l'Ordine</h3>
                  
                  <div className="form-group sm-group">
                    <label className="form-label" htmlFor="cart-name">Nome Completo *</label>
                    <input
                      type="text"
                      id="cart-name"
                      name="name"
                      className="form-input"
                      placeholder="Alessandro Morreale"
                      value={customerInfo.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group sm-group">
                    <label className="form-label" htmlFor="cart-phone">Telefono *</label>
                    <input
                      type="tel"
                      id="cart-phone"
                      name="phone"
                      className="form-input"
                      placeholder="+39 347 1234567"
                      value={customerInfo.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group sm-group">
                    <label className="form-label" htmlFor="cart-email">Email (opzionale)</label>
                    <input
                      type="email"
                      id="cart-email"
                      name="email"
                      className="form-input"
                      placeholder="alessandro@esempio.it"
                      value={customerInfo.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group sm-group">
                    <label className="form-label" htmlFor="cart-notes">Note di Spedizione / Dettagli</label>
                    <textarea
                      id="cart-notes"
                      name="notes"
                      className="form-textarea sm-textarea"
                      placeholder="Indirizzo per la consegna a Licata o note aggiuntive..."
                      value={customerInfo.notes}
                      onChange={handleChange}
                    ></textarea>
                  </div>

                  <div className="checkout-actions">
                    <button 
                      type="button" 
                      className="btn btn-primary checkout-btn wa-btn"
                      onClick={() => handleCheckout("whatsapp")}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: "8px" }}>
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.006 5.291 5.4 0 12.007 0c3.2 0 6.208 1.248 8.471 3.515 2.264 2.267 3.509 5.279 3.507 8.487-.006 6.709-5.4 12.001-12.008 12.001-1.996-.001-3.956-.492-5.702-1.43l-6.22 1.63zM6.59 18.06c1.642.975 3.257 1.488 4.954 1.489 5.432 0 9.849-4.298 9.854-9.58A9.378 9.378 0 0 0 18.6 3.42 9.39 9.39 0 0 0 12.006 1.4c-5.43 0-9.845 4.303-9.85 9.585-.002 1.834.498 3.626 1.448 5.236l-1.018 3.714 3.968-1.015L6.59 18.06zm10.252-4.103c-.276-.135-1.63-.787-1.884-.877-.253-.09-.438-.135-.623.135-.184.27-.714.877-.877 1.058-.162.18-.323.2-.6.066-.276-.135-1.162-.417-2.217-1.332-.821-.715-1.376-1.599-1.537-1.87-.162-.272-.017-.418.12-.553.123-.122.276-.315.415-.473.139-.158.185-.27.277-.45.093-.18.046-.338-.023-.473-.069-.135-.623-1.463-.854-2.002-.224-.526-.452-.455-.623-.464-.162-.008-.346-.01-.53-.01-.184 0-.485.068-.739.338-.253.27-.969.923-.969 2.25s.992 2.61 1.131 2.79c.139.18 1.954 2.912 4.733 4.083.661.278 1.177.444 1.579.57.665.207 1.27.177 1.748.107.534-.078 1.63-.65 1.859-1.278.228-.627.228-1.166.16-1.278-.07-.112-.254-.202-.53-.338z" />
                      </svg>
                      Invia tramite WhatsApp
                    </button>
                    
                    <button 
                      type="button" 
                      className="btn btn-outline checkout-btn email-btn"
                      onClick={() => handleCheckout("email")}
                    >
                      Ordina via Email
                    </button>
                  </div>
                </form>
              </div>
            )}
          </>
        )}
      </div>

      <style>{`
        .cart-panel {
          border-left: 1px solid var(--border-color);
        }

        .cart-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }

        .cart-title {
          font-size: 26px;
        }

        .cart-close {
          background: transparent;
          border: none;
          font-size: 32px;
          cursor: pointer;
          color: var(--text-primary);
          transition: var(--transition-fast);
        }

        .cart-close:hover {
          color: var(--accent-terracotta);
        }

        /* Cart Items List */
        .cart-items-container {
          flex-grow: 1;
          overflow-y: auto;
          margin-bottom: 20px;
          padding-right: 5px;
        }

        .cart-empty-message {
          text-align: center;
          padding: 80px 0;
          color: var(--text-muted);
        }

        .cart-item {
          display: flex;
          gap: 15px;
          padding: 16px 0;
          border-bottom: 1px solid var(--border-color);
          position: relative;
        }

        .cart-item-img {
          width: 70px;
          height: 90px;
          object-fit: cover;
          background-color: var(--bg-secondary);
        }

        .cart-item-info {
          flex-grow: 1;
          text-align: left;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .cart-item-name {
          font-family: var(--font-serif);
          font-size: 16px;
          font-weight: 500;
          color: var(--text-primary);
        }

        .cart-item-details {
          font-size: 12px;
          color: var(--text-muted);
        }

        .cart-item-price {
          font-size: 14px;
          font-weight: 500;
          color: var(--accent-terracotta);
        }

        .quantity-controls {
          display: inline-flex;
          align-items: center;
          border: 1px solid var(--border-color);
          margin-top: 8px;
          width: fit-content;
        }

        .qty-btn {
          background: transparent;
          border: none;
          width: 24px;
          height: 24px;
          cursor: pointer;
          font-size: 14px;
          color: var(--text-primary);
        }

        .qty-btn:hover {
          background-color: var(--bg-secondary);
        }

        .qty-val {
          padding: 0 10px;
          font-size: 12px;
          font-weight: 500;
        }

        .cart-item-remove {
          position: absolute;
          top: 16px;
          right: 0;
          background: transparent;
          border: none;
          font-size: 20px;
          cursor: pointer;
          color: var(--text-muted);
          transition: var(--transition-fast);
        }

        .cart-item-remove:hover {
          color: var(--error);
        }

        /* Cart Footer & Form */
        .cart-footer {
          margin-top: auto;
          display: flex;
          flex-direction: column;
        }

        .cart-total-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 16px;
          color: var(--text-secondary);
          margin-bottom: 12px;
        }

        .cart-total-price {
          font-size: 22px;
          font-family: var(--font-serif);
          color: var(--text-primary);
          font-weight: 500;
        }

        .cart-divider {
          height: 1px;
          background-color: var(--border-color);
          margin-bottom: 20px;
        }

        .checkout-form {
          text-align: left;
        }

        .checkout-form-title {
          font-size: 18px;
          margin-bottom: 15px;
          font-weight: 500;
        }

        .sm-group {
          margin-bottom: 12px;
        }

        .sm-group .form-input {
          padding: 8px 12px;
          font-size: 13px;
        }

        .sm-textarea {
          min-height: 60px;
          padding: 8px 12px;
          font-size: 13px;
        }

        .checkout-actions {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 20px;
        }

        .checkout-btn {
          width: 100%;
          font-size: 12px;
          padding: 10px 20px;
        }

        .wa-btn {
          background-color: #25D366;
        }

        .wa-btn:hover {
          background-color: #128C7E;
        }

        /* Success View */
        .cart-success-view {
          text-align: center;
          padding: 40px 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }

        .success-icon-wrapper {
          color: var(--success);
        }

        .success-intro {
          font-size: 15px;
          color: var(--text-secondary);
        }

        .success-order-box {
          background-color: var(--bg-secondary);
          border: 1px solid var(--border-color);
          padding: 16px;
          width: 100%;
          font-size: 14px;
          text-align: left;
        }

        .success-order-box strong {
          color: var(--text-primary);
        }

        .success-order-box span {
          float: right;
          color: var(--accent-terracotta);
          font-weight: 500;
        }

        .success-outro {
          font-size: 13px;
          color: var(--text-muted);
        }
      `}</style>
    </div>
  );
}
