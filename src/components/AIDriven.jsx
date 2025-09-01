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


                    <div className="prompt-container">
                        <input
                            type="text"
                            className="prompt-input"
                            value={prompt}
                            onChange={(e) => {
                                setPrompt(e.target.value);
                                if (e.target.value) setPlaceholder(""); // Clear placeholder on typing
                            }}
                            placeholder={!prompt ? placeholder : ""}
                        />
                        <button
                            className="prompt-send"
                            onClick={() => {
                                if (!prompt.trim()) return;
                                setAiLoading(true);
                                setSubmittedPrompt(prompt);
                                setPrompt("");
                                setResponse(""); // Clear old response

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


                        `}
            </style>
        </>
    );
}
