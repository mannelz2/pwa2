import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';

interface AppDescriptionProps {
  description: string;
  category: string[];
}

const AppDescription: React.FC<AppDescriptionProps> = ({ description, category }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white py-4">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-medium text-gray-800">Sobre este app</h2>
          <ChevronRight className="w-6 h-6 text-gray-500" />
        </div>
        
        <div className="mt-3">
          <p className={`text-gray-600 ${expanded ? '' : 'line-clamp-3'}`}>
            {description}
          </p>
          {!expanded && description.length > 150 && (
            <button 
              onClick={() => setExpanded(true)}
              className="text-green-600 font-medium mt-2"
            >
              Mais
            </button>
          )}
        </div>
        
        <div className="mt-6 flex flex-wrap gap-2">
          {category.map((cat, index) => (
            <span 
              key={index}
              className="px-4 py-2 bg-gray-100 rounded-full text-gray-700 text-sm"
            >
              {cat}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AppDescription;