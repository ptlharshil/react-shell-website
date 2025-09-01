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
        
                        /* FLEX LAYOUT FOR INPUT + BUTTON */
.prompt-wrapper {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.75rem;
  margin-top: 2rem;
  max-width: 700px;
  width: 100%;
}

/* INPUT CONTAINER */
.input-box {
  position: relative;
  flex: 1;
  border: 1px solid #e0e0e0;
  border-radius: 16px;
  background: #f9f9f9;
  padding: 0.75rem 1rem;
  box-sizing: border-box;
}

/* INPUT FIELD */
.prompt-input {
  width: 100%;
  border: none;
  outline: none;
  font-size: 1rem;
  background: transparent;
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif;
  position: relative;
  z-index: 2;
}

/* PLACEHOLDER */
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

/* BIGGER + NICER BUTTON */
.prompt-send {
  width: 48px;
  height: 48px;
  background: #61DBFB;
  color: white;
  border: none;
  border-radius: 50%;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.25s ease, transform 0.1s ease;
  flex-shrink: 0;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}

.prompt-send:hover {
  background: #3ac0e0;
}

.prompt-send:active {
  transform: scale(0.95);
}

.prompt-send:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* SPINNER */
.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid #ccc;
  border-top: 2px solid #fff;
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

@keyframes blink-caret {
  from, to {
    border-color: transparent;
  }
  50% {
    border-color: #999;
  }
}

/* MOBILE RESPONSIVE */
@media (max-width: 480px) {
  .prompt-wrapper {
    flex-direction: row;
    gap: 0.5rem;
  }

  .prompt-input {
    font-size: 0.95rem;
  }

  .prompt-send {
    width: 44px;
    height: 44px;
    font-size: 1.4rem;
  }

  .typing-placeholder {
    font-size: 0.9rem;
  }
}



                        `}
            </style>
        </>
    );
}
