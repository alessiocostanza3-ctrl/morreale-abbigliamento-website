import React, { useState } from "react";

export default function AdminPanel({ products, orders, bookings, onUpdateProducts, onUpdateOrders, onUpdateBookings }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  // Navigation
  const [activeTab, setActiveTab] = useState("dashboard"); // dashboard, products, orders, bookings
  
  // CRUD state
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  
  // Product Form state
  const [productForm, setProductForm] = useState({
    name: "",
    category: "cerimonia",
    price: 0,
    description: "",
    fabric: "",
    sizes: "",
    colors: "",
    imageUrl: ""
  });

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "admin123") {
      setIsAuthenticated(true);
    } else {
      alert("Credenziali non valide. Riprovare. (Username: admin, Password: admin123)");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername("");
    setPassword("");
  };

  // CRUD handlers
  const openEditModal = (product) => {
    setCurrentProduct(product);
    setProductForm({
      name: product.name,
      category: product.category,
      price: product.price,
      description: product.description,
      fabric: product.fabric,
      sizes: product.sizes.join(", "),
      colors: product.colors.join(", "),
      imageUrl: product.imageUrl
    });
    setIsEditing(true);
  };

  const openAddModal = () => {
    setProductForm({
      name: "",
      category: "cerimonia",
      price: 0,
      description: "",
      fabric: "",
      sizes: "46, 48, 50, 52, 54",
      colors: "Blu Notte, Grigio Antracite",
      imageUrl: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800&auto=format&fit=crop"
    });
    setIsAdding(true);
  };

  const handleDuplicateProduct = (product) => {
    setCurrentProduct(null);
    setProductForm({
      name: `${product.name} (Copia)`,
      category: product.category,
      price: product.price,
      description: product.description,
      fabric: product.fabric,
      sizes: product.sizes.join(", "),
      colors: product.colors.join(", "),
      imageUrl: product.imageUrl
    });
    setIsAdding(true);
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (!productForm.name || !productForm.fabric || productForm.price <= 0) {
      alert("Per favore, inserisci tutti i dati del prodotto.");
      return;
    }

    const formattedProduct = {
      id: isEditing ? currentProduct.id : "prod-" + Date.now(),
      name: productForm.name,
      category: productForm.category,
      price: Number(productForm.price),
      description: productForm.description,
      fabric: productForm.fabric,
      sizes: productForm.sizes.split(",").map(s => s.trim()).filter(Boolean),
      colors: productForm.colors.split(",").map(c => c.trim()).filter(Boolean),
      imageUrl: productForm.imageUrl
    };

    let updatedProducts;
    if (isEditing) {
      updatedProducts = products.map(p => p.id === currentProduct.id ? formattedProduct : p);
      setIsEditing(false);
    } else {
      updatedProducts = [formattedProduct, ...products];
      setIsAdding(false);
    }

    onUpdateProducts(updatedProducts);
    setCurrentProduct(null);
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm("Sei sicuro di voler eliminare questo prodotto?")) {
      const updatedProducts = products.filter(p => p.id !== productId);
      onUpdateProducts(updatedProducts);
    }
  };

  // Order status handler
  const handleUpdateOrderStatus = (orderId, newStatus) => {
    const updatedOrders = orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o);
    onUpdateOrders(updatedOrders);
  };

  const handleDeleteOrder = (orderId) => {
    if (window.confirm("Eliminare l'ordine definitivamente?")) {
      const updatedOrders = orders.filter(o => o.id !== orderId);
      onUpdateOrders(updatedOrders);
    }
  };

  // Booking status handler
  const handleUpdateBookingStatus = (bookingId, newStatus) => {
    const updatedBookings = bookings.map(b => b.id === bookingId ? { ...b, status: newStatus } : b);
    onUpdateBookings(updatedBookings);
  };

  const handleDeleteBooking = (bookingId) => {
    if (window.confirm("Eliminare questo appuntamento?")) {
      const updatedBookings = bookings.filter(b => b.id !== bookingId);
      onUpdateBookings(updatedBookings);
    }
  };

  // Stats calculators
  const stats = {
    totalRevenue: orders.reduce((acc, o) => acc + o.total, 0),
    totalOrders: orders.length,
    pendingOrders: orders.filter(o => o.status === "In attesa").length,
    totalBookings: bookings.length,
    pendingBookings: bookings.filter(b => b.status === "Da Confermare").length,
    totalProducts: products.length
  };

  if (!isAuthenticated) {
    return (
      <section className="section admin-login-section">
        <div className="container login-container">
          <div className="login-box">
            <span className="login-tag">Area Riservata</span>
            <h2 className="login-title">Morreale Admin</h2>
            <p className="login-subtitle">Accedi per gestire il catalogo prodotti, visualizzare gli ordini e gli appuntamenti della boutique.</p>
            
            <form onSubmit={handleLogin} className="login-form">
              <div className="form-group">
                <label className="form-label" htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  className="form-input"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label" htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  className="form-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary login-btn">
                Accedi al Pannello
              </button>
            </form>
          </div>
        </div>

        <style>{`
          .admin-login-section {
            min-height: 80vh;
            display: flex;
            align-items: center;
            padding-top: calc(var(--navbar-height) + 20px);
          }

          .login-container {
            max-width: 480px !important;
          }

          .login-box {
            background-color: var(--white);
            border: 1px solid var(--border-color);
            padding: 40px;
            box-shadow: var(--shadow-md);
            text-align: center;
          }

          .login-tag {
            font-size: 10px;
            text-transform: uppercase;
            letter-spacing: 0.2em;
            color: var(--accent-terracotta);
            font-weight: 600;
            display: block;
            margin-bottom: 10px;
          }

          .login-title {
            font-family: var(--font-serif);
            margin-bottom: 12px;
          }

          .login-subtitle {
            font-size: 14px;
            color: var(--text-muted);
            margin-bottom: 30px;
            line-height: 1.5;
          }

          .login-btn {
            width: 100%;
            margin-top: 10px;
          }
        `}</style>
      </section>
    );
  }

  return (
    <section className="section admin-dashboard-section">
      <div className="container admin-container">
        
        {/* Admin Header */}
        <div className="admin-header-bar">
          <div className="admin-title-area">
            <h2>Pannello di Amministrazione</h2>
            <p>Morreale Abbigliamento — Licata</p>
          </div>
          <button className="btn btn-outline admin-logout-btn" onClick={handleLogout}>
            Esci
          </button>
        </div>

        {/* Tab Links */}
        <div className="admin-nav-tabs">
          <button 
            className={`admin-tab ${activeTab === "dashboard" ? "active" : ""}`}
            onClick={() => setActiveTab("dashboard")}
          >
            Dashboard
          </button>
          <button 
            className={`admin-tab ${activeTab === "products" ? "active" : ""}`}
            onClick={() => setActiveTab("products")}
          >
            Prodotti ({stats.totalProducts})
          </button>
          <button 
            className={`admin-tab ${activeTab === "orders" ? "active" : ""}`}
            onClick={() => setActiveTab("orders")}
          >
            Ordini ({stats.totalOrders})
            {stats.pendingOrders > 0 && <span className="tab-pending-badge">{stats.pendingOrders}</span>}
          </button>
          <button 
            className={`admin-tab ${activeTab === "bookings" ? "active" : ""}`}
            onClick={() => setActiveTab("bookings")}
          >
            Appuntamenti ({stats.totalBookings})
            {stats.pendingBookings > 0 && <span className="tab-pending-badge">{stats.pendingBookings}</span>}
          </button>
        </div>

        {/* Contents */}
        {activeTab === "dashboard" && (
          <div className="admin-tab-content dashboard-tab animate-fade-in">
            {/* Stats Cards */}
            <div className="grid-4 stats-grid">
              <div className="stat-card">
                <span className="stat-label">Vendite Totali Stimati</span>
                <h3 className="stat-value">€{stats.totalRevenue}</h3>
              </div>
              <div className="stat-card">
                <span className="stat-label">Ordini Ricevuti</span>
                <h3 className="stat-value">{stats.totalOrders}</h3>
                <span className="stat-sub">{stats.pendingOrders} in attesa</span>
              </div>
              <div className="stat-card">
                <span className="stat-label">Appuntamenti Riservati</span>
                <h3 className="stat-value">{stats.totalBookings}</h3>
                <span className="stat-sub">{stats.pendingBookings} da confermare</span>
              </div>
              <div className="stat-card">
                <span className="stat-label">Prodotti a Catalogo</span>
                <h3 className="stat-value">{stats.totalProducts}</h3>
              </div>
            </div>

            {/* Overview grid */}
            <div className="grid-2 overview-grid" style={{ marginTop: "40px" }}>
              <div className="overview-card">
                <div className="overview-header">
                  <h4>Ultimi Ordini Ricevuti</h4>
                  <button className="btn-text" onClick={() => setActiveTab("orders")}>Vedi Tutti</button>
                </div>
                {orders.length === 0 ? (
                  <p className="empty-subtext">Nessun ordine presente.</p>
                ) : (
                  <div className="overview-list">
                    {orders.slice(0, 3).map(order => (
                      <div key={order.id} className="overview-item">
                        <div>
                          <strong>{order.customer.name}</strong>
                          <div className="overview-item-meta">{order.date} • {order.items.length} capi</div>
                        </div>
                        <span className="overview-item-price">€{order.total}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="overview-card">
                <div className="overview-header">
                  <h4>Prossimi Appuntamenti in Atelier</h4>
                  <button className="btn-text" onClick={() => setActiveTab("bookings")}>Vedi Tutti</button>
                </div>
                {bookings.length === 0 ? (
                  <p className="empty-subtext">Nessun appuntamento prenotato.</p>
                ) : (
                  <div className="overview-list">
                    {bookings.slice(0, 3).map(book => (
                      <div key={book.id} className="overview-item">
                        <div>
                          <strong>{book.name}</strong>
                          <div className="overview-item-meta">{book.date} alle {book.timeSlot}</div>
                        </div>
                        <span className="badge badge-olive">{book.status}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === "products" && (
          <div className="admin-tab-content products-tab animate-fade-in">
            <div className="tab-actions-row">
              <h3>Catalogo Capi Abbigliamento</h3>
              <button className="btn btn-primary" onClick={openAddModal}>+ Aggiungi Nuovo Capo</button>
            </div>

            <div className="admin-table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Foto</th>
                    <th>Nome Capo</th>
                    <th>Categoria</th>
                    <th>Tessuto</th>
                    <th>Prezzo</th>
                    <th>Taglie</th>
                    <th>Azioni</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr key={product.id}>
                      <td>
                        <img src={product.imageUrl} alt={product.name} className="table-img" />
                      </td>
                      <td>
                        <div className="table-name">{product.name}</div>
                        <div className="table-id">{product.id}</div>
                      </td>
                      <td><span className="table-category-label">{product.category}</span></td>
                      <td className="table-text-truncate">{product.fabric}</td>
                      <td className="table-price">€{product.price}</td>
                      <td>{product.sizes.join(", ")}</td>
                      <td>
                        <div className="table-actions">
                          <button className="table-action-btn edit-btn" onClick={() => openEditModal(product)}>Modifica</button>
                          <button className="table-action-btn duplicate-btn" onClick={() => handleDuplicateProduct(product)}>Duplica</button>
                          <button className="table-action-btn delete-btn" onClick={() => handleDeleteProduct(product.id)}>Elimina</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "orders" && (
          <div className="admin-tab-content orders-tab animate-fade-in">
            <h3>Gestione Ordini</h3>
            
            {orders.length === 0 ? (
              <div className="empty-state">
                <p>Nessun ordine ricevuto al momento.</p>
              </div>
            ) : (
              <div className="orders-cards-list">
                {orders.map(order => (
                  <div key={order.id} className="order-log-card">
                    <div className="order-log-header">
                      <div>
                        <span className="order-log-id">{order.id}</span>
                        <span className="order-log-date">{order.date}</span>
                      </div>
                      <div className="order-status-actions">
                        <span className={`status-pill ${order.status === "In attesa" ? "status-pending" : "status-completed"}`}>
                          {order.status}
                        </span>
                        {order.status === "In attesa" ? (
                          <button 
                            className="btn btn-secondary order-action-btn"
                            onClick={() => handleUpdateOrderStatus(order.id, "Completato")}
                          >
                            Completa Ordine
                          </button>
                        ) : (
                          <button 
                            className="btn btn-outline order-action-btn"
                            onClick={() => handleUpdateOrderStatus(order.id, "In attesa")}
                          >
                            Riapri Ordine
                          </button>
                        )}
                        <button className="order-delete-icon-btn" onClick={() => handleDeleteOrder(order.id)} title="Elimina Ordine">×</button>
                      </div>
                    </div>

                    <div className="grid-2 order-log-body">
                      <div className="client-details-col">
                        <h4>Dati Cliente</h4>
                        <p><strong>Nome:</strong> {order.customer.name}</p>
                        <p><strong>Telefono:</strong> {order.customer.phone}</p>
                        {order.customer.email && <p><strong>Email:</strong> {order.customer.email}</p>}
                        {order.customer.notes && <p><strong>Note di Spedizione:</strong> {order.customer.notes}</p>}
                      </div>

                      <div className="order-items-col">
                        <h4>Capi Ordinati</h4>
                        <div className="order-items-scroll">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="ordered-item-row">
                              <span>{item.name} (T: {item.size}, C: {item.color}) x{item.quantity}</span>
                              <strong>€{item.price * item.quantity}</strong>
                            </div>
                          ))}
                        </div>
                        <div className="order-log-total">
                          <span>Totale Ordine</span>
                          <strong>€{order.total}</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "bookings" && (
          <div className="admin-tab-content bookings-tab animate-fade-in">
            <h3>Appuntamenti Showroom Licata</h3>

            {bookings.length === 0 ? (
              <div className="empty-state">
                <p>Nessun appuntamento registrato.</p>
              </div>
            ) : (
              <div className="bookings-cards-list">
                {bookings.map(book => (
                  <div key={book.id} className="booking-log-card">
                    <div className="booking-log-header">
                      <div>
                        <strong className="book-client-name">{book.name}</strong>
                        <span className="book-log-date">Creato il {book.createdAt}</span>
                      </div>
                      <div className="booking-status-actions">
                        <span className={`status-pill ${book.status === "Da Confermare" ? "status-pending" : "status-completed"}`}>
                          {book.status}
                        </span>
                        {book.status === "Da Confermare" ? (
                          <button 
                            className="btn btn-primary booking-action-btn"
                            onClick={() => handleUpdateBookingStatus(book.id, "Confermato")}
                          >
                            Conferma Appuntamento
                          </button>
                        ) : (
                          <button 
                            className="btn btn-outline booking-action-btn"
                            onClick={() => handleUpdateBookingStatus(book.id, "Da Confermare")}
                          >
                            Ripristina in Attesa
                          </button>
                        )}
                        <button className="order-delete-icon-btn" onClick={() => handleDeleteBooking(book.id)}>×</button>
                      </div>
                    </div>

                    <div className="booking-details-body">
                      <div className="grid-3 booking-info-row">
                        <p><strong>Servizio:</strong><br />{book.service}</p>
                        <p><strong>Giorno:</strong><br />{book.date}</p>
                        <p><strong>Fascia Oraria:</strong><br />{book.timeSlot}</p>
                      </div>
                      <div className="grid-2 booking-contact-row" style={{ marginTop: "15px", borderTop: "1px solid var(--border-color)", paddingTop: "15px" }}>
                        <p><strong>Telefono:</strong> {book.phone}</p>
                        {book.email && <p><strong>Email:</strong> {book.email}</p>}
                      </div>
                      {book.notes && (
                        <div className="booking-notes-row" style={{ marginTop: "10px", backgroundColor: "var(--bg-secondary)", padding: "10px" }}>
                          <strong>Note Cliente:</strong>
                          <p style={{ marginTop: "4px" }}>{book.notes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>

      {/* CRUD Product Modal (Add/Edit) */}
      {(isAdding || isEditing) && (
        <div className="modal-overlay" onClick={() => { setIsAdding(false); setIsEditing(false); }}>
          <div className="modal-content admin-crud-modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => { setIsAdding(false); setIsEditing(false); }}>×</button>
            
            <form onSubmit={handleSaveProduct} className="crud-form">
              <h3>{isEditing ? "Modifica Capo Abbigliamento" : "Aggiungi Nuovo Capo"}</h3>
              <div className="modal-divider"></div>
              
              <div className="grid-2 form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="prod-name">Nome del Capo *</label>
                  <input
                    type="text"
                    id="prod-name"
                    className="form-input"
                    value={productForm.name}
                    onChange={e => setProductForm({ ...productForm, name: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="prod-category">Categoria *</label>
                  <select
                    id="prod-category"
                    className="form-select"
                    value={productForm.category}
                    onChange={e => setProductForm({ ...productForm, category: e.target.value })}
                  >
                    <option value="cerimonia">Cerimonia</option>
                    <option value="casual">Casual Raffinato</option>
                    <option value="intimo">Intimo Elegante</option>
                    <option value="accessori">Accessori</option>
                  </select>
                </div>
              </div>

              <div className="grid-2 form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="prod-price">Prezzo (€) *</label>
                  <input
                    type="number"
                    id="prod-price"
                    className="form-input"
                    value={productForm.price}
                    onChange={e => setProductForm({ ...productForm, price: e.target.value })}
                    min="1"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="prod-fabric">Tessuto e Composizione *</label>
                  <input
                    type="text"
                    id="prod-fabric"
                    className="form-input"
                    value={productForm.fabric}
                    onChange={e => setProductForm({ ...productForm, fabric: e.target.value })}
                    placeholder="Es: 100% Lana Vergine Loro Piana"
                    required
                  />
                  <div className="preset-badges">
                    {["100% Lana", "100% Cotone", "100% Seta", "Misto Lino", "Cashmere"].map(fab => (
                      <button 
                        key={fab} 
                        type="button" 
                        className={`preset-badge ${productForm.fabric === fab ? 'active' : ''}`}
                        onClick={() => setProductForm({ ...productForm, fabric: fab })}
                      >
                        {fab}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid-2 form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="prod-sizes">Taglie Disponibili (separate da virgola)</label>
                  <input
                    type="text"
                    id="prod-sizes"
                    className="form-input"
                    value={productForm.sizes}
                    onChange={e => setProductForm({ ...productForm, sizes: e.target.value })}
                    placeholder="Es: 46, 48, 50, 52"
                  />
                  <div className="preset-badges">
                    {["46", "48", "50", "52", "54", "S", "M", "L", "XL", "XXL"].map(size => {
                      const isSelected = (productForm.sizes || "").split(",").map(s => s.trim()).includes(size);
                      return (
                        <button 
                          key={size} 
                          type="button" 
                          className={`preset-badge ${isSelected ? 'active' : ''}`}
                          onClick={() => {
                            const currentVal = productForm.sizes || "";
                            const items = currentVal.split(",").map(s => s.trim()).filter(Boolean);
                            const idx = items.indexOf(size);
                            if (idx > -1) {
                              items.splice(idx, 1);
                            } else {
                              items.push(size);
                            }
                            setProductForm({ ...productForm, sizes: items.join(", ") });
                          }}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="prod-colors">Colori Disponibili (separati da virgola)</label>
                  <input
                    type="text"
                    id="prod-colors"
                    className="form-input"
                    value={productForm.colors}
                    onChange={e => setProductForm({ ...productForm, colors: e.target.value })}
                    placeholder="Es: Blu Notte, Nero, Grigio"
                  />
                  <div className="preset-badges">
                    {["Blu Notte", "Nero", "Grigio Antracite", "Bianco", "Marrone", "Sabbia", "Beige", "Verde Bosco"].map(color => {
                      const isSelected = (productForm.colors || "").split(",").map(s => s.trim()).includes(color);
                      return (
                        <button 
                          key={color} 
                          type="button" 
                          className={`preset-badge ${isSelected ? 'active' : ''}`}
                          onClick={() => {
                            const currentVal = productForm.colors || "";
                            const items = currentVal.split(",").map(s => s.trim()).filter(Boolean);
                            const idx = items.indexOf(color);
                            if (idx > -1) {
                              items.splice(idx, 1);
                            } else {
                              items.push(color);
                            }
                            setProductForm({ ...productForm, colors: items.join(", ") });
                          }}
                        >
                          {color}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="prod-image">URL Immagine</label>
                <input
                  type="text"
                  id="prod-image"
                  className="form-input"
                  value={productForm.imageUrl}
                  onChange={e => setProductForm({ ...productForm, imageUrl: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="prod-desc">Descrizione *</label>
                <textarea
                  id="prod-desc"
                  className="form-textarea"
                  value={productForm.description}
                  onChange={e => setProductForm({ ...productForm, description: e.target.value })}
                  required
                ></textarea>
              </div>

              <div className="form-submit-container" style={{ display: "flex", gap: "15px", justifyContent: "flex-end" }}>
                <button type="button" className="btn btn-outline" onClick={() => { setIsAdding(false); setIsEditing(false); }}>
                  Annulla
                </button>
                <button type="submit" className="btn btn-primary">
                  Salva Capo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        .admin-dashboard-section {
          background-color: var(--bg-primary);
          padding-top: calc(var(--navbar-height) + 20px);
          text-align: left;
        }

        .admin-container {
          max-width: 1200px !important;
        }

        .admin-header-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 20px;
          margin-bottom: 30px;
        }

        .admin-title-area h2 {
          font-size: 32px;
          font-weight: 500;
        }

        .admin-title-area p {
          font-size: 13px;
          color: var(--accent-terracotta);
          text-transform: uppercase;
          letter-spacing: 0.15em;
        }

        .admin-nav-tabs {
          display: flex;
          gap: 10px;
          margin-bottom: 40px;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 1px;
        }

        .admin-tab {
          background: transparent;
          border: none;
          border-bottom: 2px solid transparent;
          padding: 12px 24px;
          font-family: var(--font-sans);
          font-size: 14px;
          font-weight: 500;
          color: var(--text-secondary);
          cursor: pointer;
          transition: var(--transition-fast);
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .admin-tab:hover,
        .admin-tab.active {
          color: var(--text-primary);
        }

        .admin-tab.active {
          border-bottom-color: var(--accent-terracotta);
          color: var(--accent-terracotta);
        }

        .tab-pending-badge {
          background-color: var(--accent-terracotta);
          color: var(--white);
          font-size: 10px;
          padding: 2px 6px;
          border-radius: 10px;
          font-weight: 600;
        }

        /* Stats Cards */
        .stats-grid {
          margin-bottom: 30px;
        }

        .stat-card {
          background-color: var(--white);
          border: 1px solid var(--border-color);
          padding: 24px;
          box-shadow: var(--shadow-sm);
        }

        .stat-label {
          display: block;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--text-muted);
          margin-bottom: 8px;
        }

        .stat-value {
          font-size: 28px;
          font-family: var(--font-serif);
          color: var(--text-primary);
          font-weight: 500;
        }

        .stat-sub {
          display: block;
          font-size: 12px;
          color: var(--accent-terracotta);
          margin-top: 4px;
        }

        /* Overview cards */
        .overview-card {
          background-color: var(--white);
          border: 1px solid var(--border-color);
          padding: 24px;
          box-shadow: var(--shadow-sm);
        }

        .overview-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 12px;
        }

        .overview-header h4 {
          font-family: var(--font-serif);
          font-size: 18px;
        }

        .empty-subtext {
          color: var(--text-muted);
          font-size: 14px;
          padding: 20px 0;
        }

        .overview-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .overview-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 14px;
          padding-bottom: 12px;
          border-bottom: 1px dashed var(--border-color);
        }

        .overview-item:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .overview-item-meta {
          font-size: 12px;
          color: var(--text-muted);
          margin-top: 2px;
        }

        .overview-item-price {
          font-weight: 500;
          color: var(--accent-terracotta);
        }

        /* Product Table CRUD */
        .tab-actions-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .tab-actions-row h3 {
          font-family: var(--font-serif);
          font-size: 24px;
        }

        .admin-table-container {
          overflow-x: auto;
          background-color: var(--white);
          border: 1px solid var(--border-color);
          box-shadow: var(--shadow-sm);
        }

        .admin-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }

        .admin-table th, 
        .admin-table td {
          padding: 16px 20px;
          font-size: 14px;
          border-bottom: 1px solid var(--border-color);
        }

        .admin-table th {
          background-color: var(--bg-secondary);
          font-weight: 500;
          text-transform: uppercase;
          font-size: 11px;
          letter-spacing: 0.08em;
          color: var(--text-secondary);
        }

        .table-img {
          width: 44px;
          height: 56px;
          object-fit: cover;
          background-color: var(--bg-secondary);
          border: 1px solid var(--border-color);
        }

        .table-name {
          font-weight: 500;
          color: var(--text-primary);
        }

        .table-id {
          font-size: 11px;
          color: var(--text-muted);
          margin-top: 2px;
        }

        .table-category-label {
          font-size: 11px;
          text-transform: uppercase;
          background-color: var(--bg-secondary);
          padding: 4px 8px;
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
        }

        .table-text-truncate {
          max-width: 200px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .table-price {
          font-weight: 600;
          color: var(--accent-terracotta);
        }

        .table-actions {
          display: flex;
          gap: 12px;
        }

        .table-action-btn {
          background: transparent;
          border: none;
          font-size: 13px;
          cursor: pointer;
          font-weight: 500;
          font-family: var(--font-sans);
        }

        .table-action-btn.edit-btn {
          color: var(--accent-olive);
        }

        .table-action-btn.edit-btn:hover {
          text-decoration: underline;
        }

        .table-action-btn.duplicate-btn {
          color: var(--accent-terracotta);
        }

        .table-action-btn.duplicate-btn:hover {
          text-decoration: underline;
        }

        .table-action-btn.delete-btn {
          color: var(--error);
        }

        .table-action-btn.delete-btn:hover {
          text-decoration: underline;
        }

        /* Order Log cards */
        .orders-cards-list,
        .bookings-cards-list {
          display: flex;
          flex-direction: column;
          gap: 30px;
          margin-top: 20px;
        }

        .order-log-card,
        .booking-log-card {
          background-color: var(--white);
          border: 1px solid var(--border-color);
          box-shadow: var(--shadow-sm);
        }

        .order-log-header,
        .booking-log-header {
          background-color: var(--bg-secondary);
          padding: 16px 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 15px;
          border-bottom: 1px solid var(--border-color);
        }

        .order-log-id {
          font-weight: 600;
          font-family: var(--font-serif);
          font-size: 18px;
          margin-right: 12px;
        }

        .order-log-date,
        .book-log-date {
          font-size: 13px;
          color: var(--text-muted);
        }

        .book-client-name {
          font-family: var(--font-serif);
          font-size: 20px;
          margin-right: 12px;
          color: var(--text-primary);
        }

        .order-status-actions,
        .booking-status-actions {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .status-pill {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 2px;
        }

        .status-pending {
          background-color: var(--accent-terracotta-light);
          color: var(--accent-terracotta);
        }

        .status-completed {
          background-color: var(--accent-olive-light);
          color: var(--accent-olive);
        }

        .order-action-btn,
        .booking-action-btn {
          font-size: 11px;
          padding: 6px 14px;
        }

        .order-delete-icon-btn {
          background: transparent;
          border: none;
          font-size: 24px;
          color: var(--text-muted);
          cursor: pointer;
          line-height: 1;
        }

        .order-delete-icon-btn:hover {
          color: var(--error);
        }

        .order-log-body,
        .booking-details-body {
          padding: 24px;
        }

        .client-details-col h4,
        .order-items-col h4 {
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--text-muted);
          margin-bottom: 12px;
          border-bottom: 1px dashed var(--border-color);
          padding-bottom: 8px;
        }

        .client-details-col p {
          font-size: 14px;
          margin-bottom: 8px;
          color: var(--text-primary);
        }

        .order-items-scroll {
          max-height: 180px;
          overflow-y: auto;
          margin-bottom: 12px;
        }

        .ordered-item-row {
          display: flex;
          justify-content: space-between;
          font-size: 14px;
          margin-bottom: 8px;
          padding-right: 10px;
        }

        .order-log-total {
          display: flex;
          justify-content: space-between;
          border-top: 1px solid var(--border-color);
          padding-top: 10px;
          font-size: 15px;
        }

        .order-log-total strong {
          color: var(--accent-terracotta);
          font-size: 18px;
        }

        .booking-info-row p {
          font-size: 14px;
        }

        .booking-contact-row p {
          font-size: 14px;
        }

        .booking-notes-row {
          font-size: 13px;
        }

        .booking-notes-row p {
          color: var(--text-secondary);
        }

        /* Preset Badges */
        .preset-badges {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 8px;
        }

        .preset-badge {
          background-color: var(--bg-secondary);
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          font-family: var(--font-sans);
          font-size: 11px;
          padding: 4px 8px;
          cursor: pointer;
          transition: var(--transition-fast);
        }

        .preset-badge:hover {
          background-color: var(--bg-tertiary);
          color: var(--text-primary);
        }

        .preset-badge.active {
          background-color: var(--accent-olive);
          border-color: var(--accent-olive);
          color: var(--white);
        }

        /* CRUD Modal sizes */
        .admin-crud-modal {
          max-width: 650px;
          padding: 40px;
        }

        .crud-form h3 {
          font-size: 24px;
        }

        @media (max-width: 768px) {
          .admin-header-bar {
            flex-direction: column;
            align-items: flex-start;
            gap: 15px;
          }
          
          .admin-nav-tabs {
            flex-wrap: wrap;
          }
          
          .admin-tab {
            padding: 10px 14px;
            font-size: 12px;
          }
          
          .order-log-header,
          .booking-log-header {
            padding: 12px 16px;
          }
        }

        @media (max-width: 600px) {
          .admin-dashboard-section {
            padding-top: calc(var(--navbar-height) + 15px);
          }

          .admin-title-area h2 {
            font-size: 24px;
          }

          .stat-card {
            padding: 16px;
          }

          .stat-value {
            font-size: 22px;
          }

          .admin-crud-modal {
            padding: 20px !important;
          }

          .login-box {
            padding: 24px 16px !important;
          }

          .order-log-body, 
          .booking-details-body {
            padding: 16px !important;
          }

          .order-status-actions,
          .booking-status-actions {
            flex-direction: column;
            align-items: stretch;
            width: 100%;
            gap: 8px;
          }

          .order-action-btn,
          .booking-action-btn {
            width: 100%;
            text-align: center;
          }
        }
      `}</style>
    </section>
  );
}
