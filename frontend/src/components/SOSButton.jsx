import { useState } from 'react';
import { AlertCircle } from 'lucide-react';

export default function SOSButton() {
  const [active, setActive] = useState(false);

  const handleSOS = () => {
    setActive(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        console.log(`SOS Activated! Location: ${latitude}, ${longitude}`);
        // In a real app, send this location to the backend
        alert(`Emergency Contacts Notified! Location: ${latitude}, ${longitude}`);
        setTimeout(() => setActive(false), 5000);
      }, (err) => {
        alert('SOS Activated, but location could not be fetched.');
        setTimeout(() => setActive(false), 5000);
      });
    } else {
      alert('SOS Activated! (Geolocation not supported)');
      setTimeout(() => setActive(false), 5000);
    }
  };

  return (
    <button 
      onClick={handleSOS} 
      className={`sos-big ${active ? 'animate-pulse-sos' : ''}`}
    >
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem'}}>
        <AlertCircle size={48} />
        <span>SOS</span>
      </div>
    </button>
  );
}
