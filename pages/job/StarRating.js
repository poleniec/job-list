import React from 'react';

function StarRating({ rating }) {
  const starIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 20 20"
      stroke="currentColor"
      className="w-6 h-6 text-yellow-500"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10 16.582l-5.427 3.289a1 1 0 01-1.445-1.054l1.04-5.715L.18 7.183a1 1 0 01.568-1.705L6.04 5.3l2.306-5.267a1 1 0 011.788 0l2.306 5.267 5.292.778a1 1 0 01.568 1.705l-3.928 3.288 1.04 5.715a1 1 0 01-1.446 1.054L10 16.582z"
      />
    </svg>
  );

  return (
    <div className="flex items-center">
      {[...Array(rating)].map((_, index) => (
        <span key={index}>{starIcon}</span>
      ))}
    </div>
  );
}

export default StarRating;