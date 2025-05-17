import React from 'react';

interface RatingStarsProps {
  rating: number;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  onRatingChange?: (newRating: number) => void;
}

const RatingStars: React.FC<RatingStarsProps> = ({ 
  rating, 
  size = 'md', 
  interactive = false,
  onRatingChange 
}) => {
  const starSizes = {
    sm: 'w-3 h-3',
    md: 'w-5 h-5',
    lg: 'w-7 h-7'
  };
  
  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  const handleStarClick = (starIndex: number) => {
    if (interactive && onRatingChange) {
      onRatingChange(starIndex + 1);
    }
  };

  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, index) => {
        const isFullStar = index < Math.floor(rating);
        const isHalfStar = !isFullStar && index === Math.floor(rating) && rating % 1 !== 0;
        
        return (
          <button 
            key={index}
            onClick={() => handleStarClick(index)}
            className={`${interactive ? 'cursor-pointer hover:scale-110' : ''} transition-all duration-200 p-0.5 relative`}
            disabled={!interactive}
          >
            {/* Background star (gray) */}
            <svg 
              className={`${starSizes[size]} text-gray-300 fill-current absolute inset-0.5`}
              viewBox="0 0 24 24"
            >
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
            
            {/* Foreground star (yellow) */}
            <svg 
              className={`${starSizes[size]} ${isFullStar || isHalfStar ? 'text-yellow-400' : 'text-transparent'} fill-current relative`}
              viewBox="0 0 24 24"
            >
              {isHalfStar ? (
                <path d="M12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27V2Z" />
              ) : (
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              )}
            </svg>
          </button>
        );
      })}
    </div>
  );
};

export default RatingStars;