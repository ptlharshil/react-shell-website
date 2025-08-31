import { useEffect, useState } from "react";
import Community from "./Community";
import AIDriven from "./AIDriven";

export default function Main({ pages, page_name }) {
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [placeholder, setPlaceholder] = useState("");
  const [prompt, setPrompt] = useState(""); 
//   const [aiResponse, setAiResponse] = useState(null); 
  const [response, setResponse] = useState("");
  const [submittedPrompt, setSubmittedPrompt] = useState("");

  const phrases = [
    "Type Hey and hit send...",
    "Ask the AI assistant...",
    "Find top talent fast...",
    "Share knowledge with the help of AI...",
    "Smarter hiring starts here with AI...",
  ];

  const typingSpeed = 100; // time between letters
  const pauseAfterTyping = 2000; // pause after full phrase shown

  useEffect(() => {
    let phraseIndex = 0;
    let charIndex = 0;
    setResponse("");
    setSubmittedPrompt("");
    const typePhrase = () => {
      const currentPhrase = phrases[phraseIndex];
      const typingInterval = setInterval(() => {
        setPlaceholder(currentPhrase.slice(0, charIndex));
        charIndex++;

        if (charIndex > currentPhrase.length) {
          clearInterval(typingInterval);

          // Pause, then go to next phrase
          setTimeout(() => {
            phraseIndex = (phraseIndex + 1) % phrases.length;
            charIndex = 0;
            typePhrase(); // start next phrase
          }, pauseAfterTyping);
        }
      }, typingSpeed);
    };

    typePhrase(); // Start typing on mount

    // Cleanup
    return () => {
      setPlaceholder("");
    };
  }, []);

  const page = page_name;

  return (
    <>
      <div
        style={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: "2rem 1rem",
        }}
      >
        <header>
          <h1 style={{ fontWeight: 700, fontSize: "2rem", margin: 0 }}>
            {pages[page].header}
          </h1>
          <h2
            style={{
              fontWeight: 400,
              fontSize: "1.25rem",
              color: "#555",
              margin: "0.5rem 0 0",
            }}
          >
            {pages[page].subHeader}
          </h2>
        </header>

        <main
          style={{
            fontSize: "1rem",
            lineHeight: 1.6,
            color: "#222",
            maxWidth: "700px",
            marginTop: "1.5rem",
          }}
        >
        <Community pages={pages} page_name={page}/>

        <AIDriven page_name={page}/>

        </main>
      </div>
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
        .prompt-send {
          background: #61DBFB;
          color: white;
          border: none;
          border-radius: 12px;
          padding: 0.5rem 1rem;
          margin-left: 0.5rem;
          cursor: pointer;
          font-weight: 500;
          transition: background 0.2s ease;
        }
        .prompt-send:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .spinner {
          width: 18px;
          height: 18px;
          border: 2px solid #ccc;
          border-top: 2px solid #1d1d1f;
          border-radius: 50%;
          animation: spin 0.6s linear infinite;
          display: inline-block;
          vertical-align: middle;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      
        .prompt-container {
          position: relative;
          display: flex;
          align-self: center;
          align-items: center;
          padding: 0.75rem 1rem;
          border: 1px solid #e0e0e0;
          border-radius: 16px;
          margin-top: 2rem;
          max-width: 700px;
          width: 100%;
          background: #f9f9f9;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
          box-sizing: border-box;
        }

        .prompt-input {
          flex: 1;
          border: none;
          font-size: 1rem;
          padding: 0.5rem;
          background: transparent;
          outline: none;
          font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif;
          position: relative;
          z-index: 2;
        }

        .typing-placeholder {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: #999;
          pointer-events: none;
          font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif;
          white-space: nowrap;
          user-select: none;
          z-index: 1;
          border-right: 1px solid #999;
          animation: blink-caret 1s step-end infinite;
        }

        @keyframes blink-caret {
          from, to {
            border-color: transparent;
          }
          50% {
            border-color: #999;
          }
        }

        @media (max-width: 480px) {
          .prompt-container {
            flex-direction: column;
            align-items: stretch;
            padding: 0.5rem 0.75rem;
            border-radius: 12px;
          }

          .prompt-input {
            font-size: 0.9rem;
            padding: 0.5rem 0.75rem;
            margin-bottom: 0.5rem;
          }

          .prompt-send {
            font-size: 1rem;
            padding: 0.5rem;
            border-radius: 10px;
            width: 100%;
            margin-left: 0;
          }

          .typing-placeholder {
            left: 0.75rem;
          }
        }
         .ai-response {
  margin-top: 1rem;
  background: #f0f8ff;
  border-left: 4px solid #61DBFB;
  padding: 1rem;
  border-radius: 8px;
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif;
  text-align: left;
  max-width: 700px;
  width: 100%;
  box-sizing: border-box;
}

.user-prompt {
  margin-bottom: 0.5rem;
}


      `}</style>
    </>
  );
}
