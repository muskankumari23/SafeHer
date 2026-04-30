import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Send, Bot } from 'lucide-react';

export default function Chat({ user }) {
  const [messages, setMessages] = useState([
    { text: "Hi there! I'm your SafeHer AI assistant. How can I help you stay safe today?", sender: "bot" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input;
    setMessages(prev => [...prev, { text: userMessage, sender: "user" }]);
    setInput('');
    setLoading(true);

    try {
      const res = await axios.post('http://127.0.0.1:5000/api/chat', { message: userMessage });
      setMessages(prev => [...prev, { text: res.data.response, sender: "bot" }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { text: "Sorry, I'm having trouble connecting right now.", sender: "bot" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{padding: '2rem 1rem'}}>
      <div style={{display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem'}}>
        <div style={{background: 'linear-gradient(135deg, var(--primary), var(--secondary))', padding: '0.75rem', borderRadius: '0.75rem', color: 'white'}}>
          <Bot size={28} />
        </div>
        <div>
          <h1 style={{fontSize: '1.5rem', margin: 0}}>AI Safety Assistant</h1>
          <p style={{color: '#6b7280', margin: 0, fontSize: '0.9rem'}}>Get practical safety advice instantly</p>
        </div>
      </div>

      <div className="chat-container">
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender}`}>
              {msg.text}
            </div>
          ))}
          {loading && (
            <div className="message bot" style={{background: '#f3f4f6', color: '#6b7280'}}>
              Typing...
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        <form className="chat-input-container" onSubmit={handleSend}>
          <input 
            type="text" 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            placeholder="Type your safety query here..."
            disabled={loading}
          />
          <button type="submit" className="btn btn-primary" disabled={loading || !input.trim()}>
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}
