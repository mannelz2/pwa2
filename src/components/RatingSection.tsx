import React, { useState } from 'react';
import RatingStars from './RatingStars';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

interface RatingSectionProps {
  rating: number;
  totalReviews: string;
  ratingDistribution: {
    stars: number;
    percentage: number;
  }[];
}

interface Comment {
  id: number;
  user: string;
  avatar: string;
  rating: number;
  date: string;
  content: string;
  likes: number;
}

const comments: Comment[] = [
  {
    id: 1,
    user: "João S.",
    avatar: "https://i.pravatar.cc/150?img=68",
    rating: 5,
    date: "12/03/2024",
    content: "Melhor app de apostas que já usei! Interface intuitiva e pagamentos rápidos.",
    likes: 45
  },
  {
    id: 2,
    user: "Maria L.",
    avatar: "https://i.pravatar.cc/150?img=47",
    rating: 5,
    date: "10/03/2024",
    content: "Ótimo app! Os bônus são muito generosos.",
    likes: 38
  },
  {
    id: 3,
    user: "Pedro R.",
    avatar: "https://i.pravatar.cc/150?img=12",
    rating: 4,
    date: "08/03/2024",
    content: "Muito bom, mas poderia ter mais opções de jogos.",
    likes: 32
  }
];

const RatingSection: React.FC<RatingSectionProps> = ({ 
  rating, 
  totalReviews,
  ratingDistribution 
}) => {
  const [userRating, setUserRating] = useState(0);

  const handleRatingChange = (newRating: number) => {
    setUserRating(newRating);
  };

  return (
    <div className="bg-white py-6 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-xl font-medium text-gray-800">Avaliações e comentários</h2>
        
        <div className="mt-4 flex flex-col md:flex-row gap-8">
          <div className="flex flex-col items-center">
            <div className="text-5xl font-medium text-gray-800">{rating.toFixed(1)}</div>
            <RatingStars rating={rating} size="lg" />
            <div className="text-sm text-gray-500 mt-1">12 mil avaliações</div>
          </div>
          
          <div className="flex-grow">
            {ratingDistribution.map((item) => (
              <div key={item.stars} className="flex items-center gap-3 mb-2">
                <span className="text-sm text-gray-600 w-6">{item.stars}</span>
                <div className="flex-grow bg-gray-200 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-green-600 h-full rounded-full" 
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-800">Avalie este aplicativo</h3>
          <p className="text-sm text-gray-600 mt-1">Diga aos outros o que você pensa</p>
          
          <div className="mt-4">
            <RatingStars 
              rating={userRating} 
              size="lg" 
              interactive={true} 
              onRatingChange={handleRatingChange}
            />
          </div>
        </div>

        <div className="mt-8">
          {comments.map((comment) => (
            <div key={comment.id} className="py-4 border-b border-gray-100 last:border-0">
              <div className="flex items-start gap-4">
                <img 
                  src={comment.avatar} 
                  alt={comment.user}
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900">{comment.user}</span>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-500">{comment.date}</span>
                  </div>
                  <div className="mt-1">
                    <RatingStars rating={comment.rating} size="sm" />
                  </div>
                  <p className="mt-2 text-gray-700">{comment.content}</p>
                  <div className="flex items-center gap-6 mt-3">
                    <button className="flex items-center gap-2 text-gray-500 hover:text-gray-700">
                      <ThumbsUp className="w-4 h-4" />
                      <span className="text-sm">{comment.likes}</span>
                    </button>
                    <button className="flex items-center gap-2 text-gray-500 hover:text-gray-700">
                      <ThumbsDown className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RatingSection;