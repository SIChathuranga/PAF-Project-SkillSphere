import React, { useState, useRef, useEffect } from 'react';

const Dropdown = ({
    trigger,
    children,
    align = 'right',
    className = ''
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const alignClasses = {
        left: 'left-0',
        right: 'right-0',
        center: 'left-1/2 -translate-x-1/2'
    };

    const handleItemClick = (e, childOnClick) => {
        if (childOnClick) {
            childOnClick(e);
        }
        setIsOpen(false);
    };

    return (
        <div className={`relative ${className}`} ref={dropdownRef}>
            <div onClick={() => setIsOpen(!isOpen)}>
                {trigger}
            </div>

            {isOpen && (
                <div
                    className={`
                        absolute top-full mt-2 z-50
                        ${alignClasses[align]} 
                        min-w-[180px]
                        bg-primary rounded-xl
                        border border-[rgb(var(--color-border))]
                        shadow-lg
                        animate-fade-in
                        py-1
                    `}
                >
                    {React.Children.map(children, (child) => {
                        if (!React.isValidElement(child)) return child;

                        // Don't modify Divider components
                        if (child.type === Dropdown.Divider) {
                            return child;
                        }

                        return React.cloneElement(child, {
                            onClick: (e) => handleItemClick(e, child.props.onClick)
                        });
                    })}
                </div>
            )}
        </div>
    );
};

// Dropdown Item component
const DropdownItem = ({
    children,
    icon,
    danger = false,
    disabled = false,
    className = '',
    onClick,
    ...props
}) => (
    <button
        className={`
            w-full flex items-center px-4 py-2.5 text-sm text-left
            transition-colors duration-150
            hover:bg-tertiary
            ${danger ? 'text-red-500 hover:bg-red-50 dark:hover:bg-red-950' : 'text-secondary hover:text-primary'}
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            ${className}
        `}
        disabled={disabled}
        onClick={onClick}
        {...props}
    >
        {icon && <span className="mr-3 text-muted">{icon}</span>}
        {children}
    </button>
);

// Dropdown Divider component
const DropdownDivider = () => (
    <div className="border-t border-[rgb(var(--color-border))] my-1" />
);

// Attach sub-components
Dropdown.Item = DropdownItem;
Dropdown.Divider = DropdownDivider;

export default Dropdown;
