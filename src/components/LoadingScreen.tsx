import React, { useEffect, useState } from 'react';
import { appData } from '../data/appData';

const LoadingScreen: React.FC = () => {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpacity(0);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className={`fixed inset-0 bg-[#1e3a8a] z-50 flex items-center justify-center transition-opacity duration-500`}
      style={{ opacity }}
    >
      <div className="relative flex flex-col items-center">
        <div className="w-24 h-24 bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <img 
            src={appData.iconUrl}
            alt="RoyalGold777"
            className="w-full h-full object-cover animate-pulse"
          />
        </div>
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-32 h-0.5 bg-white/50">
          <div className="h-full bg-white animate-[loading_1.5s_ease-in-out]" />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;