import { useEffect, useState } from "react";

export default function AIDriven({ page_name }) {
    const [aiLoading, setAiLoading] = useState(false);
    const [placeholder, setPlaceholder] = useState("");
    const [prompt, setPrompt] = useState("");
    const [response, setResponse] = useState("");
    const [submittedPrompt, setSubmittedPrompt] = useState("");
    const [thinking, setThinking] = useState(false);

    const phrases = [
        "Type Hey and hit send...",
        "Ask the AI assistant...",
        "Find top talent fast...",
        "Share knowledge with the help of AI...",
        "Smarter hiring starts here with AI...",
    ];

    useEffect(() => {
        if (aiLoading) {
            setThinking(true);
        }else{
            setThinking(false);
        }
    },[aiLoading])

    const typingSpeed = 100; // time between letters
    const pauseAfterTyping = 2000; // pause after full phrase shown

    useEffect(() => {
        let phraseIndex = 0;
        let charIndex = 0;
        
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

    useEffect(() => {
        setResponse("");
        setSubmittedPrompt("");
        setPrompt("");
    }, [page_name])
    const page = page_name;

    return (
        <>
            {page === "ai" && (
                <>
                    {/* Show AI response */}
                    {response && submittedPrompt && (
                        <div className="ai-response">
                            <div className="user-prompt"><strong>You:</strong> {submittedPrompt}</div>
                            <div><strong>EnergyRec AI:</strong> {response}</div>
                        </div>
                    )} 

                    {thinking && (
                        <div className="ai-response">
                            <em>EnergyRec AI is thinking...</em>
                        </div>
                    )}
                    {/* Prompt Input */}


                    <div className="prompt-wrapper">
  <div className="input-box">
    <input
      type="text"
      className="prompt-input"
      value={prompt}
      onChange={(e) => {
        setPrompt(e.target.value);
        if (e.target.value) setPlaceholder("");
      }}
      placeholder=""
    />
    {!prompt && (
      <div className="typing-placeholder">{placeholder}</div>
    )}
  </div>

  <button
    className="prompt-send"
    onClick={() => {
      if (!prompt.trim()) return;
      setAiLoading(true);
      setSubmittedPrompt(prompt);
      setPrompt("");
      setResponse("");

      setTimeout(() => {
        setAiLoading(false);
        setResponse(
          "Hey there! This is EnergyRec AI. How are you doing? I am here to assist you with recruitment and talent acquisition and share community knowledge."
        );
      }, 1000);
    }}
    disabled={aiLoading}
  >
    {aiLoading ? <span className="spinner"></span> : "➤"}
  </button>
</div>


                </>
            )}

            <style>{`
        
                        /* Container for input + button */
.prompt-wrapper {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 2rem;
  max-width: 100vw;      
  width: 100%;
  box-sizing: border-box;
  padding: 0 1rem;
  overflow-x: hidden;
}

/* Input container */
.input-box {
  position: relative;
  flex-grow: 1;
  min-width: 0; /* critical to allow shrinking */
  border: 1px solid #e0e0e0;
  border-radius: 16px;
  background: #f9f9f9;
  padding: 0.75rem 1rem;
  box-sizing: border-box;
}

/* Actual input */
.prompt-input {
  flex: 1;
  font-size: 1rem;
  padding: 0.75rem 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  outline: none;
  box-sizing: border-box;
  font-family: inherit;
  min-width: 0;
}

.ai-response {
  margin-top: 1rem;
  background: #f0f8ff;
  border-left: 4px solid #61DBFB;
  padding: 1rem;
  border-radius: 8px;
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif;
  text-align: left;
  max-width: 100%;          /* Don't exceed width */
  width: 100%;
  box-sizing: border-box;
  word-wrap: break-word;    /* Wrap long words */
  overflow-wrap: break-word;
  white-space: normal;
}


/* Typing placeholder */
.typing-placeholder {
  position: absolute;
  top: 50%;
  left: 1rem;
  transform: translateY(-50%);
  color: #999;
  pointer-events: none;
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  z-index: 1;
  border-right: 1px solid #999;
  animation: blink-caret 1s step-end infinite;
  max-width: calc(100% - 2rem);
}

/* Send button - default desktop */
.prompt-send {
  width: 48px !important;       /* force size */
  height: 48px !important;
  background: #61DBFB !important;
  color: white !important;
  border: none !important;
  border-radius: 50% !important;
  font-size: 1.5rem !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  cursor: pointer !important;
  transition: background 0.25s ease, transform 0.1s ease;
  flex-shrink: 0 !important;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1) !important;
  position: relative !important;
  margin-left: 0 !important;
}

/* Hover & active */
.prompt-send:hover {
  background: #3ac0e0 !important;
}
.prompt-send:active {
  transform: scale(0.95) !important;
}
.prompt-send:disabled {
  opacity: 0.6 !important;
  cursor: not-allowed !important;
}

/* Spinner */
.spinner {
  width: 20px !important;
  height: 20px !important;
  border: 2px solid #ccc !important;
  border-top: 2px solid #fff !important;
  border-radius: 50% !important;
  animation: spin 0.6s linear infinite !important;
  display: inline-block !important;
  vertical-align: middle !important;
}

/* MOBILE styles */
@media (max-width: 480px) {
  .prompt-wrapper {
    padding: 0 0.75rem !important;
  }
  .prompt-send {
    width: 44px !important;
    height: 44px !important;
    font-size: 1.4rem !important;
    position: relative !important;
    margin-left: 0.5rem !important;
  }
  .prompt-input {
    font-size: 0.95rem !important;
  }
  .typing-placeholder {
    font-size: 0.9rem !important;
  }
}

/* Keyframe animations */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes blink-caret {
  from, to {
    border-color: transparent;
  }
  50% {
    border-color: #999;
  }
}




                        `}
            </style>
        </>
    );
}
