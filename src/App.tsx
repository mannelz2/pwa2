import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import AppHero from './components/AppHero';
import ScreenshotGallery from './components/ScreenshotGallery';
import AppDescription from './components/AppDescription';
import RatingSection from './components/RatingSection';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import { appData } from './data/appData';
import { ArrowDown } from 'lucide-react';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [showIOSPrompt, setShowIOSPrompt] = useState(false);

  useEffect(() => {
    // Check if running in standalone mode (added to home screen)
    const isStandalone = window.navigator.standalone === true;
    const isInStandaloneMode = window.matchMedia('(display-mode: standalone)').matches;

    if (isStandalone || isInStandaloneMode) {
      // Redirect immediately when launched from home screen
      window.location.replace('https://wlb787.com');
      return;
    }

    // Check if it's iOS
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    
    if (isIOS) {
      // Show iOS prompt if not in standalone mode and hasn't been dismissed
      if (!window.navigator.standalone && !sessionStorage.getItem('hideIOSPrompt')) {
        setShowIOSPrompt(true);
      }
      setIsLoading(false);
    } else {
      // Only show notification popup for non-iOS devices
      setTimeout(() => {
        setIsLoading(false);
        setShowPopup(true);
      }, 2000);
    }

    // Listen for showIOSPrompt event
    const handleShowIOSPrompt = () => {
      if (!window.navigator.standalone && !sessionStorage.getItem('hideIOSPrompt')) {
        setShowIOSPrompt(true);
      }
    };

    window.addEventListener('showIOSPrompt', handleShowIOSPrompt);

    return () => {
      window.removeEventListener('showIOSPrompt', handleShowIOSPrompt);
    };
  }, []);

  const handleCloseIOSPrompt = () => {
    sessionStorage.setItem('hideIOSPrompt', 'true');
    setShowIOSPrompt(false);
  };

  return (
    <>
      {isLoading && <LoadingScreen />}
      
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowPopup(false)} />
          <div className="relative bg-white rounded-xl p-6 max-w-sm mx-4 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500 border-2 border-white shadow-lg flex items-center justify-center">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </div>
            <div className="space-y-1">
              <p className="text-gray-800 text-lg font-bold">
                ATIVE AS NOTIFICAÇÕES ABAIXO
              </p>
              <p className="text-gray-800 text-lg">
                e ganhe bônus especial
              </p>
            </div>
            <button
              onClick={() => setShowPopup(false)}
              className="bg-green-600 text-white px-8 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors mt-6"
            >
              OK
            </button>
          </div>
        </div>
      )}

      {showIOSPrompt && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={handleCloseIOSPrompt} />
          <div className="relative bg-white rounded-xl p-6 max-w-sm mx-4">
            <div className="text-center mb-4">
              <div className="w-16 h-16 mx-auto mb-4">
                <img src={appData.iconUrl} alt="App Icon" className="w-full h-full rounded-xl shadow-lg" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Ganhe depósito em dobro</h3>
              <p className="text-gray-600">Para reivindicar bônus,</p>
              <p className="text-gray-600 font-bold">adicione nosso app à sua tela inicial</p>
            </div>
            <ol className="space-y-4 mb-6">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-600 text-white flex items-center justify-center text-sm">1</span>
                <p className="text-gray-700">Toque no botão compartilhar <span className="inline-block px-2 py-1 bg-gray-100 rounded">􀈂</span></p>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-600 text-white flex items-center justify-center text-sm">2</span>
                <p className="text-gray-700">Selecione "Adicionar à Tela de Início"</p>
              </li>
            </ol>
            <button
              onClick={handleCloseIOSPrompt}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
            >
              Entendi
            </button>
          </div>
          <div className="relative mt-16 animate-bounce">
            <ArrowDown className="w-48 h-48 text-white" />
          </div>
        </div>
      )}

      <div className="min-h-screen bg-gray-100">
        <div className="max-w-2xl mx-auto lg:max-w-4xl xl:max-w-6xl">
          <Header isLoading={isLoading} />
          
          <main>
            <AppHero 
              appName={appData.name}
              developer={appData.developer}
              rating={appData.rating}
              downloads={appData.downloads}
              imageUrl={appData.iconUrl}
            />
            
            <ScreenshotGallery screenshots={appData.screenshots} />
            
            <AppDescription 
              description={appData.description}
              category={appData.category}
            />
            
            <RatingSection
              rating={appData.rating}
              totalReviews={appData.downloads}
              ratingDistribution={appData.ratingDistribution}
            />
          </main>
          
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;