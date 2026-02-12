
import React, { useState, useEffect } from 'react';
import { AppView, Fragrance, DiffusionIntensity } from './types';
import Onboarding from './views/Onboarding';
import Pairing from './views/Pairing';
import Dashboard from './views/Dashboard';
import Library from './views/Library';
import Moments from './views/Moments';
import Profile from './views/Profile';
import { Navbar } from './components/Navbar';

const MOCK_FRAGRANCE: Fragrance = {
  id: 'santal-01',
  name: 'Santal Parfum',
  brand: 'YSL Luxury',
  notes: [
    { level: 'Top', name: 'Cardamom', description: 'Bright and spicy opening' },
    { level: 'Heart', name: 'Iris & Papyrus', description: 'The powdery, woody core' },
    { level: 'Base', name: 'Sandalwood & Leather', description: 'Deep, enveloping warmth' }
  ],
  moods: ['Elegant', 'Enigmatic', 'Confident'],
  description: 'A study in sandalwood, ethically harvested and distilled with precision.',
  story: 'Inspired by the silence of high-altitude forests at dawn.',
  intensity: DiffusionIntensity.BALANCED,
  remainingPercentage: 82
};

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.ONBOARDING);
  const [activeFragrance, setActiveFragrance] = useState<Fragrance | null>(null);

  // Persistence logic (simplified)
  useEffect(() => {
    const savedFragrance = localStorage.getItem('activeFragrance');
    if (savedFragrance) {
      setActiveFragrance(JSON.parse(savedFragrance));
      // If we have a fragrance, we can skip onboarding if desired
      // For this demo, we start at onboarding for the full experience
    }
  }, []);

  const handleFragrancePair = (fragrance: Fragrance) => {
    setActiveFragrance(fragrance);
    localStorage.setItem('activeFragrance', JSON.stringify(fragrance));
    setCurrentView(AppView.DASHBOARD);
  };

  const renderView = () => {
    switch (currentView) {
      case AppView.ONBOARDING:
        return <Onboarding onComplete={() => setCurrentView(AppView.PAIRING)} />;
      case AppView.PAIRING:
        return <Pairing onPair={() => handleFragrancePair(MOCK_FRAGRANCE)} />;
      case AppView.DASHBOARD:
        return <Dashboard activeFragrance={activeFragrance} />;
      case AppView.LIBRARY:
        return <Library activeFragrance={activeFragrance} />;
      case AppView.MOMENTS:
        return <Moments />;
      case AppView.PROFILE:
        return <Profile />;
      default:
        return <Onboarding onComplete={() => setCurrentView(AppView.PAIRING)} />;
    }
  };

  const showNav = currentView !== AppView.ONBOARDING && currentView !== AppView.PAIRING;

  return (
    <div className="flex flex-col h-screen w-full max-w-md mx-auto relative bg-[#F9F7F2] shadow-2xl overflow-hidden">
      <main className="flex-1 overflow-y-auto pb-24">
        {renderView()}
      </main>
      
      {showNav && (
        <Navbar 
          currentView={currentView} 
          onNavigate={(view) => setCurrentView(view)} 
        />
      )}
    </div>
  );
};

export default App;
