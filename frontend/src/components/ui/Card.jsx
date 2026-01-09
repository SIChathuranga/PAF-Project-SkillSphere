import React from 'react';

const Card = ({
  children,
  className = '',
  variant = 'solid',
  hover = true,
  padding = 'default',
  onClick,
  ...props
}) => {
  const variantClasses = {
    solid: 'card',
    glass: 'glass-card',
    outline: 'border rounded-xl bg-transparent',
    flat: 'rounded-xl bg-primary'
  };

  const paddingClasses = {
    none: '',
    sm: 'p-3',
    default: 'p-5',
    lg: 'p-6',
    xl: 'p-8'
  };

  const classes = [
    variantClasses[variant],
    paddingClasses[padding],
    hover && onClick ? 'cursor-pointer' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div
      className={classes}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};

// Card Header component
Card.Header = ({ children, className = '', ...props }) => (
  <div
    className={`pb-4 border-b border-[rgb(var(--color-border))] mb-4 ${className}`}
    {...props}
  >
    {children}
  </div>
);

// Card Body component
Card.Body = ({ children, className = '', ...props }) => (
  <div className={className} {...props}>
    {children}
  </div>
);

// Card Footer component
Card.Footer = ({ children, className = '', ...props }) => (
  <div
    className={`pt-4 border-t border-[rgb(var(--color-border))] mt-4 ${className}`}
    {...props}
  >
    {children}
  </div>
);

export default Card;
