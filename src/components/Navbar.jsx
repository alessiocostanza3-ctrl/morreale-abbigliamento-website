import React, { useState, useEffect } from "react";

export default function Navbar({ currentView, setView, cartCount, openCart }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`nav-header ${isScrolled ? "scrolled" : ""}`}>
      <div className="container nav-container">
        <div className="nav-brand" onClick={() => setView("landing")}>
          <span className="brand-sub">Sartoria Italiana</span>
          <span className="brand-main">Morreale</span>
          <span className="brand-location">Licata</span>
        </div>

        <nav className="nav-menu">
          <button 
            className={`nav-link ${currentView === "landing" ? "active" : ""}`}
            onClick={() => setView("landing")}
          >
            Home
          </button>
          <a href="#philosophy" className="nav-link" onClick={() => setView("landing")}>
            Filosofia
          </a>
          <a href="#appointment" className="nav-link" onClick={() => setView("landing")}>
            Prenota Visita
          </a>
          <button 
            className={`nav-link ${currentView === "shop" ? "active" : ""}`}
            onClick={() => setView("shop")}
          >
            Boutique Shop
          </button>
        </nav>

        <div className="nav-actions">
          <button 
            className={`nav-link nav-admin-link ${currentView === "admin" ? "active" : ""}`}
            onClick={() => setView("admin")}
            title="Pannello di Amministrazione"
          >
            Area Riservata
          </button>
          
          <button className="cart-trigger" onClick={openCart} aria-label="Apri carrello">
            <svg 
              width="22" 
              height="22" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
        </div>
      </div>

      <style>{`
        .nav-header {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: var(--navbar-height);
          display: flex;
          align-items: center;
          z-index: 100;
          transition: var(--transition-smooth);
          border-bottom: 1px solid transparent;
        }

        .nav-header.scrolled {
          background-color: rgba(252, 250, 247, 0.85);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--border-color);
          height: 70px;
        }

        .nav-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 100%;
        }

        .nav-brand {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          cursor: pointer;
        }

        .brand-sub {
          font-size: 8px;
          text-transform: uppercase;
          letter-spacing: 0.25em;
          color: var(--text-muted);
          line-height: 1;
        }

        .brand-main {
          font-family: var(--font-serif);
          font-size: 26px;
          font-weight: 500;
          line-height: 1.1;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: var(--text-primary);
        }

        .brand-location {
          font-size: 9px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--accent-terracotta);
          line-height: 1;
          margin-top: 2px;
        }

        .nav-menu {
          display: flex;
          gap: 30px;
          align-items: center;
        }

        .nav-link {
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--text-secondary);
          background: transparent;
          border: none;
          cursor: pointer;
          font-weight: 400;
          transition: var(--transition-fast);
          padding: 8px 0;
          position: relative;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 1px;
          background-color: var(--accent-terracotta);
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 0.3s ease;
        }

        .nav-link:hover::after,
        .nav-link.active::after {
          transform: scaleX(1);
          transform-origin: left;
        }

        .nav-link:hover,
        .nav-link.active {
          color: var(--text-primary);
        }

        .nav-actions {
          display: flex;
          align-items: center;
          gap: 24px;
        }

        .nav-admin-link {
          font-size: 11px;
          color: var(--accent-olive);
          border: 1px solid var(--accent-olive);
          padding: 6px 12px;
          transition: var(--transition-smooth);
        }

        .nav-admin-link:hover,
        .nav-admin-link.active {
          background-color: var(--accent-olive);
          color: var(--white);
        }

        .nav-admin-link::after {
          display: none;
        }

        .cart-trigger {
          background: transparent;
          border: none;
          color: var(--text-primary);
          cursor: pointer;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          transition: var(--transition-fast);
        }

        .cart-trigger:hover {
          color: var(--accent-terracotta);
          transform: scale(1.05);
        }

        .cart-badge {
          position: absolute;
          top: 2px;
          right: 2px;
          background-color: var(--accent-terracotta);
          color: var(--white);
          font-size: 9px;
          font-weight: 600;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        @media (max-width: 768px) {
          .nav-menu {
            display: none; /* simple responsive fallback - menu accessible via view toggles */
          }
          
          .brand-main {
            font-size: 20px;
          }
        }
      `}</style>
    </header>
  );
}
