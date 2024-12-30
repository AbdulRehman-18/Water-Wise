import React, { useEffect } from 'react';
import './AIAssistant.css';

const AIAssistant = () => {
  useEffect(() => {
    // Initialize chatbot config
    window.embeddedChatbotConfig = {
      chatbotId: "1Kw6vTVBNPaA0nApTT2VM",
      domain: "www.chatbase.co"
    };

    // Create and append the script
    const script = document.createElement('script');
    script.src = "https://www.chatbase.co/embed.min.js";
    script.setAttribute('chatbotId', "1Kw6vTVBNPaA0nApTT2VM");
    script.setAttribute('domain', "www.chatbase.co");
    script.defer = true;
    document.body.appendChild(script);

    // Cleanup function
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="ai-container">
      <section className="ai-hero">
        <h1 className="ai-title">AI Water Conservation Assistant</h1>
        <p className="ai-subtitle">
          Get instant answers to your water conservation questions and personalized recommendations
        </p>
      </section>
      
      <div className="chatbot-container">
        {/* Chatbot will be embedded here */}
      </div>
    </div>
  );
};

export default AIAssistant;
