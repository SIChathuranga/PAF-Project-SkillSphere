import React from 'react';

const Button = ({
  children,
  variant = 'primary',
  className = '',
  type = 'button',
  onClick,
  icon,
  fullWidth = false,
  disabled = false
}) => {
  const baseStyles =
    'flex items-center justify-center gap-2 rounded-md px-4 py-2.5 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2';
  const variantStyles = {
    primary:
      'bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-700 hover:to-blue-600 shadow-sm',
    secondary: 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50',
    outline: 'bg-transparent text-blue-600 border border-blue-600 hover:bg-blue-50',
    social: 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
  };
  const widthClass = fullWidth ? 'w-full' : '';
  const disabledClass = disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${widthClass} ${disabledClass} ${className}`}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};

export default Button;
