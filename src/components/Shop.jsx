import React, { useState, useMemo } from "react";

export default function Shop({ products, onAddToCart, onRequestFitting, initialCategory, onClearCategory }) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [selectedProduct, setSelectedProduct] = useState(null);

  React.useEffect(() => {
    if (initialCategory && initialCategory !== "all") {
      setSelectedCategory(initialCategory);
      if (onClearCategory) {
        onClearCategory();
      }
    }
  }, [initialCategory, onClearCategory]);
  
  // Details Selection State
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  const categories = [
    { id: "all", label: "Tutte le Collezioni" },
    { id: "cerimonia", label: "Cerimonia" },
    { id: "casual", label: "Casual Raffinato" },
    { id: "intimo", label: "Intimo Elegante" },
    { id: "accessori", label: "Accessori" }
  ];

  // Filters & Sorting logic
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by Category
    if (selectedCategory !== "all") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.fabric.toLowerCase().includes(q)
      );
    }

    // Sorting
    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, selectedCategory, searchQuery, sortBy]);

  const handleOpenDetail = (product) => {
    setSelectedProduct(product);
    setSelectedSize(product.sizes ? product.sizes[0] : "");
    setSelectedColor(product.colors ? product.colors[0] : "");
  };

  const handleCloseDetail = () => {
    setSelectedProduct(null);
  };

  const handleAddToCart = () => {
    if (!selectedProduct) return;
    onAddToCart(selectedProduct, selectedSize, selectedColor);
    handleCloseDetail();
  };

  return (
    <section className={`section shop-section dynamic-theme-${selectedCategory}`}>
      <div className="container">
        
        <div className="shop-header">
          <span className="shop-tag">Collezioni Morreale</span>
          <h2 className="shop-title">L'Eleganza da Indossare</h2>
          <p className="shop-subtitle">
            Capi sartoriali, tessuti di pregio e abiti da cerimonia. Esplora le nostre collezioni e ordina in tutta sicurezza.
          </p>
        </div>

        {/* Filters Panel */}
        <div className="filters-panel">
          <div className="category-tabs">
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`category-tab ${selectedCategory === cat.id ? "active" : ""}`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="search-sort-bar">
            <div className="search-input-wrapper">
              <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input
                type="text"
                className="shop-search-input"
                placeholder="Cerca per tessuto o abito..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="sort-wrapper">
              <label htmlFor="sort" className="sort-label">Ordina:</label>
              <select
                id="sort"
                className="shop-sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="default">In Evidenza</option>
                <option value="price-asc">Prezzo: Minore a Maggiore</option>
                <option value="price-desc">Prezzo: Maggiore a Minore</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="shop-empty">
            <p>Nessun capo corrisponde ai criteri di ricerca selezionati.</p>
            <button className="btn btn-outline" onClick={() => { setSelectedCategory("all"); setSearchQuery(""); }}>
              Reimposta Filtri
            </button>
          </div>
        ) : (
          <div className="grid-4 products-grid">
            {filteredProducts.map((product) => (
              <div 
                key={product.id} 
                className="product-card"
                onClick={() => handleOpenDetail(product)}
              >
                <div className="product-image-wrapper">
                  <img 
                    src={product.imageUrl} 
                    alt={product.name} 
                    className="product-card-img"
                    loading="lazy"
                  />
                  <div className="card-hover-overlay">
                    <span className="overlay-btn-text">Visualizza Dettagli</span>
                  </div>
                  <span className="product-card-category">{product.category}</span>
                </div>
                <div className="product-card-info">
                  <span className="product-card-fabric">{product.fabric.split(" ")[0]} {product.fabric.split(" ")[1] || ""}</span>
                  <h3 className="product-card-title">{product.name}</h3>
                  <span className="product-card-price">€{product.price}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="modal-overlay" onClick={handleCloseDetail}>
          <div className="modal-content product-detail-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={handleCloseDetail} aria-label="Chiudi">×</button>
            
            <div className="grid-2 modal-grid">
              <div className="modal-image-col">
                <img 
                  src={(selectedProduct.colorImages && selectedProduct.colorImages[selectedColor]) || selectedProduct.imageUrl} 
                  alt={selectedProduct.name} 
                  className="modal-product-img"
                />
              </div>

              <div className="modal-info-col">
                <span className="modal-category">{selectedProduct.category}</span>
                <h2 className="modal-title">{selectedProduct.name}</h2>
                <span className="modal-price">€{selectedProduct.price}</span>
                
                <div className="modal-divider"></div>
                
                <p className="modal-desc">{selectedProduct.description}</p>
                
                <div className="modal-meta-row fabric-meta-row" style={{ display: "flex", alignItems: "center", gap: "15px", margin: "20px 0" }}>
                  <div style={{ flex: "1" }}>
                    <strong>Tessuto / Composizione:</strong>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "4px" }}>
                      <span className="fabric-quality-badge" style={{
                        fontSize: "9px",
                        backgroundColor: "var(--accent-olive-light)",
                        color: "var(--accent-olive)",
                        padding: "2px 6px",
                        border: "1px solid var(--accent-olive)",
                        textTransform: "uppercase",
                        fontWeight: "600",
                        letterSpacing: "0.05em",
                        whiteSpace: "nowrap"
                      }}>
                        Fibra Pregiata
                      </span>
                      <span style={{ fontSize: "14px" }}>{selectedProduct.fabric}</span>
                    </div>
                  </div>
                  
                  {/* Visual Weave Preview Zoom (Zegna/Loro Piana Concept) */}
                  <div className="fabric-preview-circle" style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "50%",
                    border: "2px solid var(--border-color)",
                    overflow: "hidden",
                    flexShrink: "0",
                    position: "relative",
                    boxShadow: "var(--shadow-sm)",
                    background: "radial-gradient(circle, #dfd5c8 10%, #c4b6a4 90%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }} title="Dettaglio texture fibra naturale">
                    <div style={{
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      opacity: "0.45",
                      backgroundImage: "repeating-linear-gradient(45deg, #1C1B1A, #1C1B1A 1px, transparent 1px, transparent 4px), repeating-linear-gradient(-45deg, #1C1B1A, #1C1B1A 1px, transparent 1px, transparent 4px)"
                    }}></div>
                    <span style={{ fontSize: "8px", fontWeight: "600", color: "var(--text-primary)", zIndex: "1", textTransform: "uppercase", letterSpacing: "0.05em" }}>Zoom</span>
                  </div>
                </div>

                {/* Size Selector */}
                {selectedProduct.sizes && selectedProduct.sizes.length > 0 && (
                  <div className="selection-group">
                    <span className="selection-label">Taglia Disponibile:</span>
                    <div className="options-row">
                      {selectedProduct.sizes.map((size) => (
                        <button
                          key={size}
                          className={`option-btn ${selectedSize === size ? "selected" : ""}`}
                          onClick={() => setSelectedSize(size)}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Color Selector */}
                {selectedProduct.colors && selectedProduct.colors.length > 0 && (
                  <div className="selection-group">
                    <span className="selection-label">Colore:</span>
                    <div className="options-row">
                      {selectedProduct.colors.map((color) => (
                        <button
                          key={color}
                          className={`option-btn ${selectedColor === color ? "selected" : ""}`}
                          onClick={() => setSelectedColor(color)}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="modal-action-row" style={{ display: "flex", gap: "10px", width: "100%", marginTop: "20px" }}>
                  <button className="btn btn-primary modal-buy-btn" style={{ flex: "1" }} onClick={handleAddToCart}>
                    Aggiungi al Carrello
                  </button>
                  <button 
                    className="btn btn-secondary modal-fitting-btn" 
                    style={{ flex: "1" }} 
                    onClick={() => {
                      if (onRequestFitting) {
                        onRequestFitting(selectedProduct, selectedSize, selectedColor);
                      }
                      handleCloseDetail();
                    }}
                  >
                    Prova in Atelier
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      <style>{`
        .shop-section {
          background-color: var(--bg-primary);
          padding-top: calc(var(--navbar-height) + 40px);
        }

        .shop-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .shop-tag {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.25em;
          color: var(--accent-terracotta);
          font-weight: 600;
          display: block;
          margin-bottom: 12px;
        }

        .shop-title {
          font-family: var(--font-serif);
          margin-bottom: 16px;
        }

        .shop-subtitle {
          font-size: 16px;
          color: var(--text-secondary);
          max-width: 600px;
          margin: 0 auto;
        }

        /* Filters and Options */
        .filters-panel {
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 24px;
          margin-bottom: 40px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .category-tabs {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          justify-content: center;
        }

        .category-tab {
          background-color: transparent;
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          padding: 8px 20px;
          font-size: 13px;
          font-family: var(--font-sans);
          letter-spacing: 0.05em;
          cursor: pointer;
          transition: var(--transition-smooth);
        }

        .category-tab:hover,
        .category-tab.active {
          border-color: var(--accent-terracotta);
          color: var(--text-primary);
        }

        .category-tab.active {
          background-color: var(--accent-terracotta-light);
          color: var(--accent-terracotta);
          font-weight: 500;
        }

        .search-sort-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          flex-wrap: wrap;
        }

        .search-input-wrapper {
          position: relative;
          width: 320px;
          max-width: 100%;
        }

        .search-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
        }

        .shop-search-input {
          width: 100%;
          padding: 10px 14px 10px 42px;
          background-color: var(--white);
          border: 1px solid var(--border-color);
          font-family: var(--font-sans);
          font-size: 14px;
          outline: none;
          transition: var(--transition-fast);
        }

        .shop-search-input:focus {
          border-color: var(--accent-terracotta);
        }

        .sort-wrapper {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .sort-label {
          font-size: 13px;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .shop-sort-select {
          padding: 10px 14px;
          background-color: var(--white);
          border: 1px solid var(--border-color);
          font-family: var(--font-sans);
          font-size: 13px;
          color: var(--text-primary);
          outline: none;
          cursor: pointer;
        }

        /* Product Cards */
        .products-grid {
          row-gap: 40px;
        }

        .product-card {
          text-align: left;
          cursor: pointer;
          background-color: var(--bg-primary);
          border: 1px solid transparent;
          padding: 10px;
          transition: var(--transition-smooth);
        }

        .product-card:hover {
          background-color: var(--white);
          border-color: var(--border-color);
          box-shadow: var(--shadow-md);
          transform: translateY(-6px);
        }

        .product-image-wrapper {
          position: relative;
          height: 380px;
          overflow: hidden;
          background-color: var(--bg-secondary);
        }

        .product-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .product-card:hover .product-card-img {
          transform: scale(1.04);
        }

        .card-hover-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(28, 27, 26, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: var(--transition-fast);
        }

        .product-card:hover .card-hover-overlay {
          opacity: 1;
        }

        .overlay-btn-text {
          background-color: var(--bg-primary);
          color: var(--text-primary);
          padding: 10px 20px;
          font-size: 12px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .product-card-category {
          position: absolute;
          top: 15px;
          left: 15px;
          background-color: var(--white);
          color: var(--text-primary);
          font-size: 10px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          padding: 4px 8px;
          border: 1px solid var(--border-color);
        }

        .product-card-info {
          padding-top: 15px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .product-card-fabric {
          font-size: 11px;
          text-transform: uppercase;
          color: var(--accent-olive);
          letter-spacing: 0.05em;
          font-weight: 500;
        }

        .product-card-title {
          font-family: var(--font-serif);
          font-size: 18px;
          line-height: 1.2;
          font-weight: 400;
          color: var(--text-primary);
        }

        .product-card-price {
          font-family: var(--font-sans);
          font-size: 16px;
          font-weight: 500;
          color: var(--accent-terracotta);
        }

        

        .shop-empty {
          text-align: center;
          padding: 80px 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }

        /* Detail Modal Styles */
        .product-detail-modal {
          max-width: 960px;
        }

        .modal-grid {
          gap: 0;
        }

        .modal-image-col {
          height: min(600px, 65vh);
          background-color: var(--bg-secondary);
        }

        .modal-product-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .modal-info-col {
          padding: 50px;
          text-align: left;
          display: flex;
          flex-direction: column;
        }

        .modal-category {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--accent-olive);
          font-weight: 600;
          margin-bottom: 10px;
        }

        .modal-title {
          font-size: 32px;
          line-height: 1.15;
          margin-bottom: 10px;
        }

        .modal-price {
          font-size: 24px;
          color: var(--accent-terracotta);
          font-weight: 500;
          margin-bottom: 20px;
        }

        .modal-divider {
          height: 1px;
          background-color: var(--border-color);
          margin-bottom: 24px;
        }

        .modal-desc {
          font-size: 15px;
          line-height: 1.6;
          color: var(--text-secondary);
          margin-bottom: 20px;
        }

        .modal-meta-row {
          font-size: 14px;
          margin-bottom: 30px;
          display: flex;
          gap: 8px;
        }

        .modal-meta-row strong {
          font-weight: 500;
          color: var(--text-primary);
        }

        .modal-meta-row span {
          color: var(--text-secondary);
        }

        .selection-group {
          margin-bottom: 24px;
        }

        .selection-label {
          display: block;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--text-muted);
          margin-bottom: 10px;
          font-weight: 500;
        }

        .options-row {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .option-btn {
          background-color: var(--white);
          border: 1px solid var(--border-color);
          color: var(--text-primary);
          padding: 8px 16px;
          font-size: 13px;
          font-family: var(--font-sans);
          cursor: pointer;
          transition: var(--transition-fast);
        }

        .option-btn:hover {
          border-color: var(--text-primary);
        }

        .option-btn.selected {
          border-color: var(--accent-terracotta);
          background-color: var(--accent-terracotta-light);
          color: var(--accent-terracotta);
          font-weight: 500;
        }

        .modal-action-row {
          margin-top: auto;
          padding-top: 20px;
        }

        .modal-buy-btn {
          width: 100%;
        }

        @media (max-width: 1024px) {
          .modal-image-col {
            height: 400px;
          }
          
          .modal-info-col {
            padding: 30px;
          }
        }

        @media (max-width: 768px) {
          .modal-grid {
            grid-template-columns: 1fr;
          }
          
          .modal-image-col {
            height: 350px;
          }
        }

        @media (max-width: 600px) {
          .shop-section {
            padding-top: calc(var(--navbar-height) + 15px);
          }

          .shop-header {
            margin-bottom: 30px;
          }

          .filters-panel {
            gap: 15px;
            margin-bottom: 25px;
            padding-bottom: 15px;
          }

          .category-tabs {
            justify-content: flex-start;
            overflow-x: auto;
            flex-wrap: nowrap;
            padding-bottom: 8px;
            -webkit-overflow-scrolling: touch;
            width: 100%;
          }

          .category-tab {
            flex: 0 0 auto;
            padding: 6px 14px;
            font-size: 12px;
          }

          .search-sort-bar {
            flex-direction: column;
            align-items: stretch;
            gap: 12px;
          }

          .search-input-wrapper {
            width: 100%;
          }

          .sort-wrapper {
            justify-content: space-between;
            width: 100%;
          }

          .products-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 12px !important;
            row-gap: 20px !important;
          }

          .product-card {
            padding: 6px;
          }

          .product-image-wrapper {
            height: 200px;
          }

          .product-card-info {
            padding-top: 8px;
            gap: 4px;
          }

          .product-card-title {
            font-size: 14px;
          }

          .product-card-price {
            font-size: 13px;
          }

          .product-card-fabric {
            font-size: 9px;
          }

          .modal-info-col {
            padding: 20px;
          }

          .modal-title {
            font-size: 24px;
          }

          .modal-price {
            font-size: 20px;
            margin-bottom: 12px;
          }

          .modal-desc {
            font-size: 13px;
            margin-bottom: 15px;
          }

          .options-row {
            gap: 6px;
          }

          .option-btn {
            padding: 6px 12px;
            font-size: 11px;
          }
        }

        /* Dynamic Luxury Dark Theme for Cerimonia (Zegna / Rubinacci Concept) */
        .shop-section {
          position: relative;
          transition: background-color 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .shop-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0.02;
          pointer-events: none;
          background-image: repeating-linear-gradient(45deg, #000, #000 1px, transparent 1px, transparent 4px), 
                            repeating-linear-gradient(-45deg, #000, #000 1px, transparent 1px, transparent 4px);
          z-index: 0;
        }

        .shop-section .container {
          position: relative;
          z-index: 1;
        }

        .dynamic-theme-cerimonia {
          background-color: #121110 !important;
        }

        .dynamic-theme-cerimonia::before {
          opacity: 0.035;
          background-image: repeating-linear-gradient(45deg, #fff, #fff 1px, transparent 1px, transparent 4px), 
                            repeating-linear-gradient(-45deg, #fff, #fff 1px, transparent 1px, transparent 4px);
        }

        .dynamic-theme-cerimonia .shop-title {
          color: #FCFAF7;
        }

        .dynamic-theme-cerimonia .shop-subtitle {
          color: #B2A79C;
        }

        .dynamic-theme-cerimonia .shop-tag {
          color: #C5A059; /* Satin Brass */
        }

        .dynamic-theme-cerimonia .filters-panel {
          border-bottom-color: #282624;
        }

        .dynamic-theme-cerimonia .category-tab {
          color: #B2A79C;
          border-color: #383532;
        }

        .dynamic-theme-cerimonia .category-tab:hover {
          border-color: #C5A059;
          color: #FCFAF7;
        }

        .dynamic-theme-cerimonia .category-tab.active {
          background-color: rgba(197, 160, 89, 0.12);
          border-color: #C5A059;
          color: #C5A059;
        }

        .dynamic-theme-cerimonia .shop-search-input {
          background-color: #1A1918;
          border-color: #383532;
          color: #FCFAF7;
        }

        .dynamic-theme-cerimonia .shop-search-input:focus {
          border-color: #C5A059;
        }

        .dynamic-theme-cerimonia .sort-label {
          color: #B2A79C;
        }

        .dynamic-theme-cerimonia .shop-sort-select {
          background-color: #1A1918;
          border-color: #383532;
          color: #FCFAF7;
        }

        .dynamic-theme-cerimonia .product-card {
          background-color: #121110;
          border-color: transparent;
        }

        .dynamic-theme-cerimonia .product-card:hover {
          background-color: #1A1918;
          border-color: #282624;
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.5);
        }

        .dynamic-theme-cerimonia .product-card-title {
          color: #FCFAF7;
        }

        .dynamic-theme-cerimonia .product-card-price {
          color: #C5A059;
        }

        .dynamic-theme-cerimonia .product-card-fabric {
          color: #A5B29B; /* softer olive */
        }

        .dynamic-theme-cerimonia .product-card-category {
          background-color: #1A1918;
          color: #FCFAF7;
          border-color: #282624;
        }

        /* Modal Ceremony theme styling */
        .dynamic-theme-cerimonia .modal-content {
          background-color: #151413;
          border: 1px solid #383532;
          box-shadow: 0 30px 70px rgba(0, 0, 0, 0.6);
        }

        .dynamic-theme-cerimonia .modal-title {
          color: #FCFAF7;
        }

        .dynamic-theme-cerimonia .modal-price {
          color: #C5A059;
        }

        .dynamic-theme-cerimonia .modal-desc {
          color: #B2A79C;
        }

        .dynamic-theme-cerimonia .modal-divider {
          background-color: #282624;
        }

        .dynamic-theme-cerimonia .modal-meta-row strong {
          color: #FCFAF7;
        }

        .dynamic-theme-cerimonia .modal-meta-row span {
          color: #B2A79C;
        }

        .dynamic-theme-cerimonia .selection-label {
          color: #B2A79C;
        }

        .dynamic-theme-cerimonia .option-btn {
          background-color: #1A1918;
          border-color: #282624;
          color: #FCFAF7;
        }

        .dynamic-theme-cerimonia .option-btn:hover {
          border-color: #C5A059;
          color: #FCFAF7;
        }

        .dynamic-theme-cerimonia .option-btn.selected {
          border-color: #C5A059;
          background-color: rgba(197, 160, 89, 0.15);
          color: #C5A059;
        }

        .dynamic-theme-cerimonia .modal-close {
          background-color: rgba(26, 25, 24, 0.8);
          color: #FCFAF7;
        }

        .dynamic-theme-cerimonia .modal-close:hover {
          background-color: #FCFAF7;
          color: #121110;
        }
      `}</style>
    </section>
  );
}
