import { Link, useNavigate } from 'react-router-dom';
import { Shield, LogOut, User } from 'lucide-react';
import { logoutUser } from '../firebase';

export default function Navbar({ user }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="container navbar-content">
        <Link to="/" className="navbar-logo">
          <Shield color="#ec4899" size={28} />
          SafeHer AI
        </Link>
        <div className="nav-links">
          {user ? (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/chat">AI Assistant</Link>
              <button onClick={handleLogout} className="btn" style={{color: '#ef4444', background: 'none', padding: 0}}>
                <LogOut size={20} />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn" style={{border: '1px solid var(--primary)', color: 'var(--primary)'}}>Login</Link>
              <Link to="/register" className="btn btn-primary">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
