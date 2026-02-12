
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
  id: 'ysl-libre-01',
  name: 'Libre Eau de Parfum',
  brand: 'YVES SAINT LAURENT',
  notes: [
    { 
      level: 'Top', 
      name: 'Diva Lavender', 
      description: 'A fresh, floral lavender from Provence.',
      sourcing: {
        origin: 'Provence, France',
        sustainabilityScore: 94,
        ethicalPractices: ['Eco-designed harvesting', 'Biodiversity protection'],
        story: 'Sourced from the high plateaus of Provence, this lavender is a tension between the masculine and feminine.',
        methods: 'Grown using low-input agriculture and mechanical harvesting techniques that protect the local ecosystem.',
        communityImpact: 'Part of YSL’s commitment to supporting generational farming families in the Drôme region.',
        certifications: ['Fair For Life', 'For Life Social Responsibility'],
        journeySteps: [
          { title: 'Cultivation', description: 'Grown at 800m altitude in the heart of Provence.' },
          { title: 'Harvest', description: 'Steam-distilled within 24 hours of picking to preserve the Diva essence.' },
          { title: 'Refinement', description: 'Exclusive molecular distillation to remove camphoric notes.' }
        ]
      }
    },
    { 
      level: 'Heart', 
      name: 'Orange Blossom', 
      description: 'The burning heart of the fragrance.',
      sourcing: {
        origin: 'Ourika Gardens, Morocco',
        sustainabilityScore: 98,
        ethicalPractices: ['Regenerative Agriculture', 'Women Empowerment'],
        story: 'The Ourika Community Gardens are a pioneering social program for the brand.',
        methods: 'Irrigated using traditional "Seguia" methods and solar energy to ensure zero-carbon cultivation.',
        communityImpact: 'Directly supports a cooperative of 32 local women, providing financial independence and literacy programs.',
        certifications: ['Fair Trade Moroccan Origin', 'Regenerative Organic Certified'],
        journeySteps: [
          { title: 'Hand-Picking', description: 'Flowers are picked individually by hand at dawn.' },
          { title: 'Transformation', description: 'Cold-pressed extraction in the Atlas foothills.' },
          { title: 'Provenance', description: 'Traceable to the specific garden plot within the Ourika valley.' }
        ]
      }
    },
    { 
      level: 'Base', 
      name: 'Vanilla Bourbon', 
      description: 'Sultry, deep, and enveloping.',
      sourcing: {
        origin: 'Sava Region, Madagascar',
        sustainabilityScore: 91,
        ethicalPractices: ['Traceable Sourcing', 'Reforestation'],
        story: 'Exceptional vanilla beans from the SAVA region, hand-selected for their balsamic profile.',
        methods: 'Pollination is done entirely by hand, followed by a long, traditional curing process.',
        communityImpact: 'YSL funds local primary schools and health centers for over 10,000 community members in Madagascar.',
        certifications: ['UEBT Certified', 'Fair Trade Madagascar'],
        journeySteps: [
          { title: 'Pollination', description: 'Individual flowers are hand-pollinated during a 4-hour window.' },
          { title: 'Curing', description: 'Sweating and sun-drying for 6 months to develop over 200 aromatic compounds.' },
          { title: 'Extraction', description: 'CO2 extraction for a creamy, textured vanilla absolute.' }
        ]
      }
    }
  ],
  moods: ['Liberated', 'Powerful', 'Sensual'],
  description: 'The fragrance of freedom. A floral lavender scent that balances cool and warm.',
  story: 'Libre represents the tension between the masculine lavender and the feminine orange blossom.',
  intensity: DiffusionIntensity.BALANCED,
  remainingPercentage: 78
};

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.ONBOARDING);
  const [activeFragrance, setActiveFragrance] = useState<Fragrance | null>(null);

  useEffect(() => {
    const savedFragrance = localStorage.getItem('activeFragrance');
    if (savedFragrance) {
      setActiveFragrance(JSON.parse(savedFragrance));
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
