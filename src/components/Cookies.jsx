import { useState, useEffect } from "react";

const COOKIE_CONSENT_KEY = "energyrec_cookie_consent";

export default function Cookies({ page_name, onShowPrivacy }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
      setVisible(true);
  }, []);

  const acceptCookies = () => {
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <>
      <div className="cookie-banner">
        <div className="cookie-text">
          🍪 We use cookies to improve your experience. By continuing, you accept our{" "}
          <button className="cookie-link" onClick={onShowPrivacy}>
            Privacy Policy
          </button>.
        </div>
        <button className="cookie-accept" onClick={acceptCookies}>
          Accept
        </button>
      </div>

      <style>{`

        .cookie-banner {
          position: fixed;
          bottom: 60px;
          left: 0;
          right: 0;
          margin: 0 auto;
          max-width: 700px;
          width: calc(100% - 2rem); /* Makes sure it doesn't go full width */
          background-color: #f9f9f9;
          color: #1d1d1f;
          padding: 1rem 1.25rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          font-size: 0.95rem;
          z-index: 9999;
          flex-wrap: wrap;
          gap: 1rem;
        }

        @media (max-width: 480px) {
          .cookie-banner {
            width: calc(100% - 3rem); /* narrower on small screens */
          }
        }


        .cookie-text {
          flex: 1;
          min-width: 200px;
        }

        .cookie-link {
          background: none;
          border: none;
          color: #61dbfb;
          text-decoration: underline;
          cursor: pointer;
          font-size: inherit;
          font-family: inherit;
          padding: 0;
        }

        .cookie-link:hover {
          color: #0077b6;
        }

        .cookie-accept {
          background-color: #61dbfb;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s ease;
        }

        .cookie-accept:hover {
          background-color: #4ccde2;
        }

        @media (max-width: 480px) {
          .cookie-banner {
            flex-direction: column;
            align-items: stretch;
            text-align: left;
          }

          .cookie-accept {
            width: 100%;
          }
        }
      `}</style>
    </>
  );
}
