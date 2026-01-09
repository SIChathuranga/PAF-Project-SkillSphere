import React from 'react';

const Badge = ({
    children,
    variant = 'primary',
    size = 'md',
    dot = false,
    className = '',
    ...props
}) => {
    const variantClasses = {
        primary: 'badge-primary',
        secondary: 'badge-secondary',
        success: 'badge-success',
        warning: 'badge-warning',
        error: 'badge-error',
        neutral: 'bg-tertiary text-secondary'
    };

    const sizeClasses = {
        sm: 'text-[10px] px-1.5 py-0.5',
        md: 'text-xs px-2.5 py-0.5',
        lg: 'text-sm px-3 py-1'
    };

    if (dot) {
        return (
            <span
                className={`inline-block w-2 h-2 rounded-full ${variant === 'primary' ? 'bg-brand' :
                        variant === 'success' ? 'bg-green-500' :
                            variant === 'warning' ? 'bg-yellow-500' :
                                variant === 'error' ? 'bg-red-500' :
                                    'bg-gray-500'
                    } ${className}`}
                {...props}
            />
        );
    }

    return (
        <span
            className={`badge ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
            {...props}
        >
            {children}
        </span>
    );
};

export default Badge;
