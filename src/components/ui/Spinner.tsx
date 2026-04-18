import React from 'react';

export const Spinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      {/* Container do SVG para simular os anéis cortados da ElyteSpark */}
      <div className="relative w-24 h-24 flex items-center justify-center">
        <svg className="absolute w-full h-full text-gray-200 animate-[spin_3s_linear_infinite]" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="44" stroke="currentColor" strokeWidth="6" strokeDasharray="60 40" strokeLinecap="round" />
        </svg>
        <svg className="absolute w-16 h-16 text-elyte animate-[spin_1.5s_linear_reverse_infinite]" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="36" stroke="currentColor" strokeWidth="8" strokeDasharray="50 50" strokeLinecap="round" />
        </svg>
        <svg className="absolute w-10 h-10 text-gray-300 animate-[spin_2s_linear_infinite]" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="28" stroke="currentColor" strokeWidth="6" strokeDasharray="30 60" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
};