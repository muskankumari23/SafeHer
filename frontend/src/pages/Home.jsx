import { Link } from 'react-router-dom';
import { Shield, Navigation, MessageSquare, Bell } from 'lucide-react';

export default function Home() {
  return (
    <div>
      <section className="hero">
        <div className="container">
          <h1>Your Safety, Empowered by AI.</h1>
          <p>
            SafeHer AI is a modern women's safety platform combining real-time location sharing, 
            intelligent risk prediction, and a smart chatbot assistant to ensure you're never alone.
          </p>
          <div style={{display: 'flex', gap: '1rem', justifyContent: 'center'}}>
            <Link to="/register" className="btn btn-primary" style={{fontSize: '1.1rem', padding: '0.75rem 2rem'}}>
              Get Started
            </Link>
          </div>
        </div>
      </section>

      <section style={{padding: '5rem 1rem', background: 'white'}}>
        <div className="container">
          <h2 style={{textAlign: 'center', fontSize: '2.5rem', marginBottom: '3rem'}}>Smart Features</h2>
          <div className="dashboard-grid">
            <div className="card">
              <h3 style={{color: 'var(--danger)'}}><Bell /> Emergency SOS</h3>
              <p>One tap to alert your trusted contacts with your live location instantly.</p>
            </div>
            <div className="card">
              <h3 style={{color: 'var(--primary)'}}><MessageSquare /> AI Chatbot</h3>
              <p>Get immediate advice and support from our specialized safety assistant.</p>
            </div>
            <div className="card">
              <h3 style={{color: 'var(--secondary)'}}><Shield /> Safety Score</h3>
              <p>Predictive analysis of your surroundings based on time and location.</p>
            </div>
            <div className="card">
              <h3 style={{color: '#10b981'}}><Navigation /> Safe Routes</h3>
              <p>Navigate securely with AI-suggested routes that avoid known high-risk areas.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
