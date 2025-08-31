import { useState } from "react";
import logo from '../logo.svg'; 

export default function Navbar({pages, page_name, page_key}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
      <>
      <nav
        style={{
            position: "sticky",
            top: 0,
            zIndex: 1000,
            backgroundColor: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "1rem 0",
            borderBottom: "1px solid #eee",
        }}
      >
        {/* Logo + Name */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", cursor: "pointer" }} 
          onClick={() => {
            // setPageName("home");
            page_key("home");
            setIsMenuOpen(false);
          }} 
            role="button" tabIndex={0}
        >
          <img src={logo} alt="EnergyRec" style={{ width: 36, height: 36 }} />
          <span style={{ fontWeight: 600, fontSize: "1.25rem" }}>EnergyRec</span>
        </div>

        {/* Hamburger icon with toggle animation */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`hamburger ${isMenuOpen ? 'open' : ''}`}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "none",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            gap: "4px",
            padding: "0.25rem",
            zIndex: 20,
          }}
          aria-label="Toggle menu"
        >
          <div className="bar top"></div>
          <div className="bar middle"></div>
          <div className="bar bottom"></div>
        </button>

        {/* Nav Links */}
        <div
          className={`nav-links ${isMenuOpen ? "show" : ""}`}
        >
          {Object.keys(pages).map((key) => (
            <button
              key={key}
              onClick={() => {
                page_key(key);
                setIsMenuOpen(false);
              }}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: page_name === key ? "#61DBFB" : "#444",
                borderBottom: page_name === key ? "2px solid #61DBFB" : "none",
                paddingBottom: "0.25rem",
                fontSize: "1rem",
                textAlign: "left",
              }}
            >
              {key === "home" ? pages[key].header_name : pages[key].header}
            </button>
          ))}
        </div>
      </nav>

      <style>
        {`
          .nav-links {
            display: flex;
            gap: 1.5rem;
            transition: max-height 0.3s ease;
          }

          @media (max-width: 768px) {
            .hamburger {
              display: flex !important;
            }

            .nav-links {
              overflow: hidden;
              max-height: 0;
              flex-direction: column;
              gap: 1rem;
              position: absolute;
              top: 100%;
              right: 0;
              background: white;
              border: 1px solid #eee;
              padding: 0 1rem;
              z-index: 10;
              box-shadow: 0 2px 8px rgba(0,0,0,0.05);
              width: max-content;
              transition: max-height 0.3s ease;
            }

            .nav-links.show {
              max-height: 500px;
              padding: 1rem;
            }

            /* Hamburger animation */
            .hamburger .bar {
              width: 24px;
              height: 2px;
              background-color: #333;
              transition: all 0.3s ease;
            }

            .hamburger.open .top {
              transform: translateY(6px) rotate(45deg);
            }

            .hamburger.open .middle {
              opacity: 0;
            }

            .hamburger.open .bottom {
              transform: translateY(-6px) rotate(-45deg);
            }
          }

          @media (min-width: 769px) {
            .nav-links {
              display: flex !important;
              flex-direction: row;
              position: static;
              background: none;
              border: none;
              padding: 0;
              box-shadow: none;
              max-height: none !important;
            }
          }
          
        `}
      </style>
    </>
  );
}
