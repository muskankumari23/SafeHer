import { useState, useEffect } from 'react';
import SOSButton from '../components/SOSButton';
import axios from 'axios';
import { MapPin, Clock, ShieldCheck, AlertTriangle, Navigation } from 'lucide-react';

export default function Dashboard({ user }) {
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(false);
  const [routeData, setRouteData] = useState(null);

  const getSafetyScore = async () => {
    setLoading(true);
    try {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;
          const currentHour = new Date().getHours();
          
          const res = await axios.post('http://127.0.0.1:5000/api/score', {
            lat: latitude,
            lng: longitude,
            hour: currentHour
          });
          setScore(res.data);
          setLoading(false);
        }, () => {
          alert('Could not get location for safety score.');
          setLoading(false);
        });
      } else {
        alert('Geolocation not supported by this browser.');
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const getSafeRoute = async () => {
    try {
      // Mock start and end coords
      const res = await axios.post('http://127.0.0.1:5000/api/route', {
        start: { lat: 40.7128, lng: -74.0060 },
        end: { lat: 40.7580, lng: -73.9855 }
      });
      setRouteData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container" style={{padding: '2rem 1rem'}}>
      <h1 style={{fontSize: '2rem', marginBottom: '1rem'}}>Hello, {user.email}</h1>
      <p style={{color: '#6b7280', marginBottom: '2rem'}}>Stay safe and alert. We're here for you.</p>

      {/* Main SOS Section */}
      <div style={{background: 'white', padding: '3rem 1rem', borderRadius: '1rem', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', textAlign: 'center', marginBottom: '2rem'}}>
        <h2 style={{fontSize: '1.5rem', marginBottom: '1rem'}}>Emergency SOS</h2>
        <p style={{color: '#6b7280', maxWidth: '400px', margin: '0 auto 1rem'}}>Tap the button below in case of an emergency to instantly share your location with your trusted contacts.</p>
        <SOSButton />
      </div>

      <div className="dashboard-grid">
        {/* Safety Score Card */}
        <div className="card">
          <h3 style={{color: 'var(--secondary)'}}><ShieldCheck /> Environment Safety</h3>
          <p style={{color: '#6b7280', marginBottom: '1.5rem', fontSize: '0.9rem'}}>Check the safety prediction of your current location and time.</p>
          
          {score ? (
            <div style={{background: score.score > 60 ? '#f0fff4' : '#fff5f5', padding: '1.5rem', borderRadius: '0.5rem', textAlign: 'center'}}>
              <div style={{fontSize: '3rem', fontWeight: 800, color: score.score > 60 ? '#10b981' : '#ef4444'}}>{score.score}</div>
              <div style={{fontWeight: 600, color: '#374151'}}>{score.status}</div>
              <div style={{fontSize: '0.85rem', color: '#6b7280', marginTop: '0.5rem'}}>{score.message}</div>
            </div>
          ) : (
            <button onClick={getSafetyScore} disabled={loading} className="btn" style={{width: '100%', background: '#f3f4f6', border: '1px solid #e5e7eb'}}>
              {loading ? 'Analyzing...' : 'Analyze Current Location'}
            </button>
          )}
        </div>

        {/* Safe Routes Card */}
        <div className="card">
          <h3 style={{color: 'var(--primary)'}}><Navigation /> Safe Route Planner</h3>
          <p style={{color: '#6b7280', marginBottom: '1.5rem', fontSize: '0.9rem'}}>Plan a safe route avoiding high-risk areas.</p>
          
          {routeData ? (
            <div style={{background: '#f8fafc', padding: '1rem', borderRadius: '0.5rem'}}>
              <div style={{fontWeight: 500, color: '#0f172a', marginBottom: '0.5rem'}}><AlertTriangle size={16} style={{display: 'inline', marginRight: '0.5rem'}}/> {routeData.message}</div>
              <div style={{fontSize: '0.85rem', color: '#64748b'}}>Waypoints calculated: {routeData.route.length}</div>
            </div>
          ) : (
            <button onClick={getSafeRoute} className="btn" style={{width: '100%', background: '#f3f4f6', border: '1px solid #e5e7eb'}}>
              Suggest Route
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
