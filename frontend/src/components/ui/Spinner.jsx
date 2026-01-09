import React from 'react';

const Spinner = ({
    size = 'md',
    className = ''
}) => {
    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-6 h-6',
        lg: 'w-8 h-8',
        xl: 'w-12 h-12'
    };

    return (
        <div
            className={`
                animate-spin rounded-full 
                border-2 border-t-transparent
                border-[rgb(var(--color-brand-500))]
                ${sizeClasses[size]} 
                ${className}
            `}
        />
    );
};

// Full page loading spinner
const SpinnerPage = ({ message = 'Loading...' }) => (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-secondary z-50">
        <div className="relative">
            <div className="w-16 h-16 border-4 border-t-transparent border-[rgb(var(--color-brand-500))] rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-[rgb(var(--color-secondary-500))] rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
        </div>
        <p className="text-secondary mt-6 animate-pulse">{message}</p>
    </div>
);

// Inline loading with text
const SpinnerInline = ({ message = 'Loading...' }) => (
    <div className="flex items-center justify-center gap-3 py-8 text-secondary">
        <Spinner size="md" />
        <span className="text-sm">{message}</span>
    </div>
);

// Attach sub-components
Spinner.Page = SpinnerPage;
Spinner.Inline = SpinnerInline;

export default Spinner;
