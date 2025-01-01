import React from 'react';

const LoadingGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="bg-gray-200 aspect-w-1 aspect-h-1 rounded-md mb-4" />
          <div className="h-4 bg-gray-200 rounded mb-2" />
          <div className="h-4 bg-gray-200 rounded w-2/3" />
        </div>
      ))}
    </div>
  );
};

export default LoadingGrid;