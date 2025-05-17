import React from 'react';
import { Menu, Search } from 'lucide-react';

interface HeaderProps {
  isLoading?: boolean;
}

const Header: React.FC<HeaderProps> = ({ isLoading = false }) => {
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  
  if (isLoading) return null;
  
  return (
    <header className="bg-white sticky top-0 z-50 border-b border-gray-200">
      <div className="w-full px-4 py-2">
        <div className="flex items-center gap-3">
          {!isIOS && <Menu className="h-5 w-5 text-gray-600" />}
          <div className="flex items-center">
            {isIOS ? (
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/6/67/App_Store_%28iOS%29.svg" 
                alt="App Store" 
                className="h-8" 
              />
            ) : (
              <img 
                src="https://www.gstatic.com/android/market_images/web/play_prism_hlock_2x.png" 
                alt="Google Play" 
                className="h-5" 
              />
            )}
          </div>
          <div className="flex-grow"></div>
          <button className="p-1.5 hover:bg-gray-100 rounded-full">
            <Search className="h-5 w-5 text-gray-600" />
          </button>
          {!isIOS && (
            <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-600 text-sm font-medium">U</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;