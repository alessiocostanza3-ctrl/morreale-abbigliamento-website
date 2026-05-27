import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Philosophy from "./components/Philosophy";
import AppointmentForm from "./components/AppointmentForm";
import Shop from "./components/Shop";
import Cart from "./components/Cart";
import AdminPanel from "./components/AdminPanel";
import { initialProducts } from "./data/initialProducts";
import "./App.css";

export default function App() {
  // Global States
  const [view, setView] = useState("landing"); // 'landing' | 'shop' | 'admin'
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem("morreale_products");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed.map(savedProd => {
            const match = initialProducts.find(ip => ip.id === savedProd.id);
            return match ? { ...savedProd, imageUrl: match.imageUrl } : savedProd;
          });
        }
      }
    } catch (e) {
      console.error("Errore caricamento prodotti da localStorage:", e);
    }
    return initialProducts;
  });

  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("morreale_cart");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch (e) {
      console.error("Errore caricamento carrello da localStorage:", e);
    }
    return [];
  });

  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem("morreale_orders");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch (e) {
      console.error("Errore caricamento ordini da localStorage:", e);
    }
    return [];
  });

  const [bookings, setBookings] = useState(() => {
    try {
      const saved = localStorage.getItem("morreale_bookings");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch (e) {
      console.error("Errore caricamento appuntamenti da localStorage:", e);
    }
    return [];
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem("morreale_products", JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem("morreale_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("morreale_orders", JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem("morreale_bookings", JSON.stringify(bookings));
  }, [bookings]);

  // Cart operations
  const handleAddToCart = (product, size, color) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) => item.id === product.id && item.size === size && item.color === color
      );

      if (existingItemIndex > -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += 1;
        return updatedCart;
      } else {
        return [
          ...prevCart,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            imageUrl: product.imageUrl,
            category: product.category,
            fabric: product.fabric,
            size: size,
            color: color,
            quantity: 1
          }
        ];
      }
    });
    
    // Automatically open the cart to show progress
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id, size, color, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveFromCart(id, size, color);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id && item.size === size && item.color === color
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const handleRemoveFromCart = (id, size, color) => {
    setCart((prevCart) =>
      prevCart.filter((item) => !(item.id === id && item.size === size && item.color === color))
    );
  };

  const handlePlaceOrder = (order) => {
    setOrders((prevOrders) => [order, ...prevOrders]);
    setCart([]); // Clear cart after placing order
  };

  const handleAddBooking = (booking) => {
    setBookings((prevBookings) => [booking, ...prevBookings]);
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Smooth scroll helper with hash support
  const handleNavigate = (newView, hash) => {
    setView(newView);
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash.replace("#", ""));
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div id="root">
      {/* Navigation Header */}
      <Navbar 
        currentView={view} 
        setView={handleNavigate} 
        cartCount={cartCount} 
        openCart={() => setIsCartOpen(true)} 
      />

      {/* Main Views Router */}
      <main className="main-content">
        {view === "landing" && (
          <div className="animate-fade-in">
            <Hero setView={handleSetView} />
            <Philosophy />
            <AppointmentForm onAddBooking={handleAddBooking} />
          </div>
        )}

        {view === "shop" && (
          <div className="animate-fade-in">
            <Shop products={products} onAddToCart={handleAddToCart} />
          </div>
        )}

        {view === "admin" && (
          <div className="animate-fade-in">
            <AdminPanel 
              products={products}
              orders={orders}
              bookings={bookings}
              onUpdateProducts={setProducts}
              onUpdateOrders={setOrders}
              onUpdateBookings={setBookings}
            />
          </div>
        )}
      </main>

      {/* Slide-out Shopping Cart */}
      <Cart 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveFromCart={handleRemoveFromCart}
        onPlaceOrder={handlePlaceOrder}
      />

      {/* Footer Section */}
      <footer className="footer">
        <div className="container footer-grid">
          
          <div className="footer-col brand-col">
            <span className="footer-brand-sub">Atelier Sartoriale</span>
            <h3 className="footer-brand-title">MORREALE</h3>
            <p className="footer-brand-desc">
              Espressione classica dell'abbigliamento maschile italiano. Nel centro storico di Licata, vestiamo l'eleganza quotidiana e le cerimonie più importanti con passione e competenza.
            </p>
          </div>

          <div className="footer-col links-col">
            <h4 className="footer-col-title">Navigazione</h4>
            <ul className="footer-links-list">
              <li><button onClick={() => handleSetView("landing")}>Home Page</button></li>
              <li><a href="#philosophy" onClick={() => handleSetView("landing")}>La Nostra Filosofia</a></li>
              <li><a href="#appointment" onClick={() => handleSetView("landing")}>Prenota un Appuntamento</a></li>
              <li><button onClick={() => handleSetView("shop")}>Boutique Shop</button></li>
              <li><button onClick={() => handleSetView("admin")}>Pannello Admin</button></li>
            </ul>
          </div>

          <div className="footer-col info-col">
            <h4 className="footer-col-title">Orari di Apertura</h4>
            <p className="footer-info-text">
              <strong>Lunedì - Sabato:</strong><br />
              09:00 - 13:00<br />
              16:30 - 20:30
            </p>
            <p className="footer-info-text" style={{ marginTop: "12px" }}>
              <strong>Domenica:</strong> Chiuso
            </p>
          </div>

          <div className="footer-col contact-col">
            <h4 className="footer-col-title">Contatti &amp; Boutique</h4>
            <p className="footer-info-text">
              Corso Vittorio Emanuele, 120<br />
              92019 Licata (Agrigento)<br />
              Sicilia, Italia
            </p>
            <p className="footer-info-text" style={{ marginTop: "12px" }}>
              <strong>Telefono:</strong> +39 0922 856789<br />
              <strong>Email:</strong> info@morrealeabbigliamento.it
            </p>
          </div>

        </div>

        <div className="container footer-bottom">
          <div className="footer-bottom-divider"></div>
          <div className="footer-bottom-row">
            <p className="copyright-text">
              &copy; {new Date().getFullYear()} Morreale Abbigliamento. Tutti i diritti riservati.
            </p>
            <p className="designer-text">
              Licata, Sicilia — Eleganza Classica Italiana
            </p>
          </div>
        </div>
      </footer>

      <style>{`
        .footer {
          background-color: var(--bg-secondary);
          border-top: 1px solid var(--border-color);
          padding: 80px 0 40px 0;
          color: var(--text-secondary);
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1.2fr 1.3fr;
          gap: 50px;
          text-align: left;
        }

        @media (max-width: 1024px) {
          .footer-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 40px;
          }
        }

        @media (max-width: 600px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 30px;
          }
        }

        .footer-col {
          display: flex;
          flex-direction: column;
        }

        .footer-brand-sub {
          font-size: 8px;
          text-transform: uppercase;
          letter-spacing: 0.25em;
          color: var(--accent-terracotta);
          margin-bottom: 4px;
        }

        .footer-brand-title {
          font-family: var(--font-serif);
          font-size: 28px;
          font-weight: 500;
          letter-spacing: 0.1em;
          color: var(--text-primary);
          margin-bottom: 16px;
        }

        .footer-brand-desc {
          font-size: 14px;
          line-height: 1.6;
          color: var(--text-muted);
        }

        .footer-col-title {
          font-family: var(--font-serif);
          font-size: 18px;
          font-weight: 500;
          color: var(--text-primary);
          margin-bottom: 20px;
        }

        .footer-links-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .footer-links-list a,
        .footer-links-list button {
          font-family: var(--font-sans);
          font-size: 14px;
          color: var(--text-secondary);
          background: transparent;
          border: none;
          text-align: left;
          cursor: pointer;
          width: fit-content;
          transition: var(--transition-fast);
        }

        .footer-links-list a:hover,
        .footer-links-list button:hover {
          color: var(--accent-terracotta);
          padding-left: 4px;
        }

        .footer-info-text {
          font-size: 14px;
          line-height: 1.6;
          color: var(--text-secondary);
        }

        .footer-info-text strong {
          color: var(--text-primary);
          font-weight: 500;
        }

        /* Footer Bottom */
        .footer-bottom-divider {
          height: 1px;
          background-color: var(--border-color);
          margin: 50px 0 30px 0;
        }

        .footer-bottom-row {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          color: var(--text-muted);
          flex-wrap: wrap;
          gap: 15px;
        }

        .copyright-text,
        .designer-text {
          font-size: 12px;
          font-weight: 300;
        }
      `}</style>
    </div>
  );
}
