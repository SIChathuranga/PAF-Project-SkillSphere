import React from 'react';

const Avatar = ({
    src,
    alt,
    name,
    size = 'md',
    online = false,
    className = '',
    onClick,
    ...props
}) => {
    const sizeClasses = {
        xs: 'avatar-sm w-6 h-6 text-[10px]',
        sm: 'avatar-sm',
        md: 'avatar-md',
        lg: 'avatar-lg',
        xl: 'avatar-xl',
        '2xl': 'avatar-2xl'
    };

    // Get initials from name
    const getInitials = (name) => {
        if (!name) return '?';
        const words = name.trim().split(' ');
        if (words.length >= 2) {
            return `${words[0][0]}${words[1][0]}`.toUpperCase();
        }
        return name.substring(0, 2).toUpperCase();
    };

    const classes = [
        'avatar',
        sizeClasses[size],
        online ? 'avatar-online' : '',
        onClick ? 'cursor-pointer' : '',
        className
    ].filter(Boolean).join(' ');

    return (
        <div
            className={classes}
            onClick={onClick}
            {...props}
        >
            {src ? (
                <img
                    src={src}
                    alt={alt || name || 'Avatar'}
                    className="w-full h-full object-cover"
                />
            ) : (
                <span className="text-white font-medium">
                    {getInitials(name)}
                </span>
            )}
        </div>
    );
};

// Avatar Group component for displaying multiple avatars
Avatar.Group = ({ children, max = 4, className = '' }) => {
    const childArray = React.Children.toArray(children);
    const displayCount = Math.min(childArray.length, max);
    const remaining = childArray.length - max;

    return (
        <div className={`flex -space-x-2 ${className}`}>
            {childArray.slice(0, displayCount).map((child, index) => (
                <div
                    key={index}
                    className="ring-2 ring-[rgb(var(--color-bg-primary))] rounded-full"
                    style={{ zIndex: displayCount - index }}
                >
                    {child}
                </div>
            ))}
            {remaining > 0 && (
                <div
                    className="avatar avatar-md ring-2 ring-[rgb(var(--color-bg-primary))] bg-tertiary"
                    style={{ zIndex: 0 }}
                >
                    <span className="text-xs text-secondary font-medium">
                        +{remaining}
                    </span>
                </div>
            )}
        </div>
    );
};

export default Avatar;
