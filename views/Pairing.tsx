
import React, { useState, useEffect } from 'react';

interface PairingProps {
  onPair: () => void;
}

const Pairing: React.FC<PairingProps> = ({ onPair }) => {
  const [status, setStatus] = useState<'idle' | 'searching' | 'pairing' | 'paired'>('idle');

  const startPairing = () => {
    setStatus('searching');
    setTimeout(() => setStatus('pairing'), 2000);
    setTimeout(() => {
      setStatus('paired');
      setTimeout(onPair, 1500);
    }, 4500);
  };

  return (
    <div className="h-full w-full flex flex-col items-center justify-center p-8 text-center bg-[#F9F7F2]">
      <div className="mb-12 relative">
        <div className={`w-64 h-64 rounded-full border border-[#D1CEC5] flex items-center justify-center transition-all duration-1000 ${status !== 'idle' ? 'scale-110' : ''}`}>
          {/* Mock Bracelet visual */}
          <div className={`w-48 h-48 rounded-full border-[8px] border-[#8E795B]/20 flex items-center justify-center ${status === 'pairing' ? 'animate-pulse' : ''}`}>
             <span className="serif text-3xl text-[#8E795B]">L&apos;E</span>
          </div>
        </div>
        
        {status === 'searching' && (
          <div className="absolute inset-0 w-full h-full rounded-full border border-[#8E795B] animate-ping opacity-20" />
        )}
      </div>

      <div className="max-w-xs fade-in">
        <h2 className="text-3xl mb-4">Pair Your Object</h2>
        <p className="text-[#6B6658] font-light leading-relaxed mb-12">
          Place your bracelet near your phone. A gentle tap on the jewel will begin the connection.
        </p>

        {status === 'idle' && (
          <button 
            onClick={startPairing}
            className="border border-[#8E795B] text-[#8E795B] px-12 py-4 rounded-full text-xs tracking-[0.2em] font-medium hover:bg-[#8E795B] hover:text-white transition-all"
          >
            CONNECT BRACELET
          </button>
        )}

        {status === 'searching' && <p className="text-xs tracking-widest text-[#AFAFA8] animate-pulse">SEARCHING...</p>}
        {status === 'pairing' && <p className="text-xs tracking-widest text-[#8E795B] animate-pulse">AUTHENTICATING CART...</p>}
        {status === 'paired' && (
          <div className="flex items-center justify-center gap-2 text-green-700">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
            <span className="text-xs tracking-widest uppercase">Connected</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pairing;
