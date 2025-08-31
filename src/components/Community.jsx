import { useEffect, useState } from "react";

export default function Community({ pages, page_name }) {
  const [loading, setLoading] = useState(false);
  
  const page = page_name;
  return (
    <>
      
          <p>{pages[page].body}</p>

          {page === "community" && (
            <button
              className="community-button"
              onClick={() => {
                setLoading(true);
                setTimeout(() => {
                  setLoading(false);
                }, 1000); 
              }}
            >
              {loading ? <span className="spinner"></span> : "Community Hub"}
            </button>
          )}

          
        
      <style>{`
        .community-button {
          background-color: #e5e5ea;
          color: #1d1d1f;
          font-size: 16px;
          font-weight: 500;
          padding: 10px 15px;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif;
          box-shadow: inset 0 0 0 1px rgba(60,60,67,0.1);
        }

        .community-button:hover {
          background-color: #e5e5ea;
          transform: translateY(-1px);
        }

        .community-button:active {
          background-color: #dcdce0;
          transform: translateY(0);
        }
      `}</style>
    </>
  );
}
