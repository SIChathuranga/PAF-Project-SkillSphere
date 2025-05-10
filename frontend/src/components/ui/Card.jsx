import React from 'react';

const Card = ({
  children,
  className = '',
  padding = 'medium'
}) => {
  const paddingClasses = {
    none: 'p-0',
    small: 'p-3',
    medium: 'p-5',
    large: 'p-8'
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-100 ${paddingClasses[padding]} ${className}`}>
      {children}
    </div>
  );
};

export default Card;
