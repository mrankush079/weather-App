import React, { useState, useEffect } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // close mobile menu on window resize > 820px
  useEffect(() => {
    function onResize() {
      if (window.innerWidth > 820) setOpen(false);
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="nav-inner">
        <div className="brand">
          {/* Use the small tab icon as brand logo from public/tab.png (copied earlier) */}
          <img className="brand-logo-img" src="/tab.png" alt="WeatherFlow logo" />
          <div className="brand-text" aria-hidden>
            <span className="brand-title">Weather</span>
            <span className="brand-sub">Flow</span>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div className="nav-actions" aria-hidden={open ? "true" : "false"}>
            <a className="nav-link" href="#features" onClick={() => setOpen(false)}>Features</a>
            <a className="nav-link" href="#forecast" onClick={() => setOpen(false)}>Forecast</a>
            <a className="nav-cta" href="#search" onClick={(e)=>{ e.preventDefault(); document.querySelector('.search-input')?.focus(); setOpen(false); }}>Search</a>
          </div>

          {/* Hamburger */}
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            className="nav-hamburger"
            onClick={() => setOpen((s) => !s)}
          >
            {/* simple hamburger icon */}
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#072035" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {open ? <g><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></g> : <g><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></g>}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu overlay */}
      <div className={`mobile-menu ${open ? "open" : ""}`} role="menu" aria-hidden={!open}>
        <a className="mobile-link" href="#features" onClick={() => setOpen(false)}>Features</a>
        <a className="mobile-link" href="#forecast" onClick={() => setOpen(false)}>Forecast</a>
        <a className="mobile-link mobile-cta" href="#search" onClick={(e)=>{ e.preventDefault(); document.querySelector('.search-input')?.focus(); setOpen(false); }}>Search</a>
      </div>
    </nav>
  );
}
