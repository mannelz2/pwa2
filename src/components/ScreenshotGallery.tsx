import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ScreenshotGalleryProps {
  screenshots: string[];
}

const ScreenshotGallery: React.FC<ScreenshotGalleryProps> = ({ screenshots }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToImage = (index: number) => {
    setCurrentIndex(index);
    if (scrollRef.current) {
      const scrollContainer = scrollRef.current;
      const imageElement = scrollContainer.children[index] as HTMLElement;
      if (imageElement) {
        scrollContainer.scrollTo({
          left: imageElement.offsetLeft - scrollContainer.offsetLeft,
          behavior: 'smooth'
        });
      }
    }
  };

  const nextImage = () => {
    const newIndex = (currentIndex + 1) % screenshots.length;
    scrollToImage(newIndex);
  };

  const prevImage = () => {
    const newIndex = (currentIndex - 1 + screenshots.length) % screenshots.length;
    scrollToImage(newIndex);
  };

  return (
    <div className="relative py-2 bg-white">
      <div className="w-full px-4">
        <div className="relative">
          <button 
            onClick={prevImage}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 rounded-full p-1.5 shadow-md"
            aria-label="Captura de tela anterior"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          
          <div 
            ref={scrollRef}
            className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide snap-x"
          >
            {screenshots.map((screenshot, index) => (
              <div 
                key={index} 
                className={`flex-shrink-0 transition-opacity duration-300 snap-center ${
                  index === currentIndex ? 'opacity-100' : 'opacity-70'
                }`}
              >
                <img 
                  src={screenshot} 
                  alt={`Captura de tela ${index + 1}`}
                  className="rounded-lg shadow-md h-[360px] sm:h-[420px] md:h-[480px] w-auto object-cover"
                  style={{ aspectRatio: '9/16' }}
                />
              </div>
            ))}
          </div>
          
          <button 
            onClick={nextImage}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 rounded-full p-1.5 shadow-md"
            aria-label="Próxima captura de tela"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScreenshotGallery