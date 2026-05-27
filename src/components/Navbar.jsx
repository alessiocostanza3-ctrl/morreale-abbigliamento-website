import React, { useState, useEffect } from "react";
import { OWNER_CONFIG } from "../config/ownerConfig";

export default function Navbar({ currentView, setView, cartCount, openCart }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

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
        <div className="nav-brand" onClick={() => { setView("landing"); setIsMobileOpen(false); }}>
          <span className="brand-sub">Sartoria Italiana</span>
          <span className="brand-main">{OWNER_CONFIG.boutiqueName.split(" ")[0]}</span>
          <span className="brand-location">{OWNER_CONFIG.address.city}</span>
        </div>

        <nav className="nav-menu">
          <button 
            className={`nav-link ${currentView === "landing" ? "active" : ""}`}
            onClick={() => setView("landing")}
          >
            Home
          </button>
          <a 
            href="#philosophy" 
            className="nav-link" 
            onClick={(e) => {
              e.preventDefault();
              setView("landing", "philosophy");
            }}
          >
            Filosofia
          </a>
          <a 
            href="#appointment" 
            className="nav-link" 
            onClick={(e) => {
              e.preventDefault();
              setView("landing", "appointment");
            }}
          >
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

          <button 
            className={`mobile-menu-trigger ${isMobileOpen ? "open" : ""}`}
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="Menu"
          >
            <span className="hamburger-box">
              <span className="hamburger-inner"></span>
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <div className={`mobile-nav-drawer ${isMobileOpen ? "open" : ""}`}>
        <div className="mobile-nav-content">
          <button 
            className="mobile-nav-link" 
            onClick={() => { setView("landing"); setIsMobileOpen(false); }}
          >
            Home
          </button>
          <a 
            href="#philosophy" 
            className="mobile-nav-link" 
            onClick={(e) => {
              e.preventDefault();
              setView("landing", "philosophy");
              setIsMobileOpen(false);
            }}
          >
            La Nostra Filosofia
          </a>
          <a 
            href="#appointment" 
            className="mobile-nav-link" 
            onClick={(e) => {
              e.preventDefault();
              setView("landing", "appointment");
              setIsMobileOpen(false);
            }}
          >
            Prenota un Appuntamento
          </a>
          <button 
            className="mobile-nav-link" 
            onClick={() => { setView("shop"); setIsMobileOpen(false); }}
          >
            Boutique Shop
          </button>
          <button 
            className="mobile-nav-link mobile-nav-admin" 
            onClick={() => { setView("admin"); setIsMobileOpen(false); }}
          >
            Area Riservata (Admin)
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
          background-color: rgba(252, 250, 247, 0.92);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--border-color);
        }

        .nav-header.scrolled {
          background-color: rgba(252, 250, 247, 0.95);
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

        .mobile-menu-trigger {
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 8px;
          z-index: 1002;
          position: relative;
          display: none;
        }

        .hamburger-box {
          width: 24px;
          height: 18px;
          display: inline-block;
          position: relative;
        }

        .hamburger-inner,
        .hamburger-inner::before,
        .hamburger-inner::after {
          width: 24px;
          height: 1.5px;
          background-color: var(--text-primary);
          position: absolute;
          transition: transform 0.25s ease, background-color 0.25s ease;
        }

        .hamburger-inner {
          top: 50%;
          transform: translateY(-50%);
        }

        .hamburger-inner::before {
          content: "";
          top: -7px;
          left: 0;
        }

        .hamburger-inner::after {
          content: "";
          bottom: -7px;
          left: 0;
        }

        /* Hamburger open state */
        .mobile-menu-trigger.open .hamburger-inner {
          background-color: transparent;
        }

        .mobile-menu-trigger.open .hamburger-inner::before {
          transform: translateY(7px) rotate(45deg);
        }

        .mobile-menu-trigger.open .hamburger-inner::after {
          transform: translateY(-7px) rotate(-45deg);
        }

        /* Mobile drawer */
        .mobile-nav-drawer {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          background-color: rgba(252, 250, 247, 0.98);
          backdrop-filter: blur(16px);
          z-index: 1001;
          display: flex;
          align-items: center;
          justify-content: center;
          transform: translateY(-100%);
          transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          overflow-y: auto;
        }

        .mobile-nav-drawer.open {
          transform: translateY(0);
        }

        .mobile-nav-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 24px;
          width: 100%;
          padding: 80px 40px 40px 40px;
          max-height: 100%;
          overflow-y: auto;
        }

        .mobile-nav-link {
          font-family: var(--font-serif);
          font-size: 26px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--text-primary);
          background: transparent;
          border: none;
          cursor: pointer;
          transition: var(--transition-fast);
          padding: 5px 0;
          text-align: center;
        }

        .mobile-nav-link:hover {
          color: var(--accent-terracotta);
        }

        .mobile-nav-admin {
          font-family: var(--font-sans);
          font-size: 14px;
          color: var(--accent-olive);
          border: 1px solid var(--accent-olive);
          padding: 10px 24px;
          margin-top: 15px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          font-weight: 500;
        }

        .mobile-nav-admin:hover {
          background-color: var(--accent-olive);
          color: var(--white);
        }

        @media (max-width: 768px) {
          .nav-menu {
            display: none;
          }
          
          .nav-admin-link {
            display: none;
          }

          .mobile-menu-trigger {
            display: block;
          }
          
          .brand-main {
            font-size: 20px;
          }

          .nav-actions {
            gap: 12px;
          }
        }
      `}</style>
    </header>
  );
}
