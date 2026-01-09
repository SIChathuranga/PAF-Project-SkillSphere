import React, { useEffect, useCallback } from 'react';
import { XIcon } from 'lucide-react';

const Modal = ({
    isOpen,
    onClose,
    children,
    title,
    size = 'md',
    showCloseButton = true,
    closeOnOverlayClick = true,
    closeOnEscape = true,
    className = ''
}) => {
    // Handle escape key press
    const handleEscape = useCallback((e) => {
        if (e.key === 'Escape' && closeOnEscape) {
            onClose();
        }
    }, [onClose, closeOnEscape]);

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = '';
        };
    }, [isOpen, handleEscape]);

    if (!isOpen) return null;

    const sizeClasses = {
        sm: 'max-w-sm',
        md: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl',
        full: 'max-w-full mx-4'
    };

    return (
        <div
            className="modal-overlay animate-fade-in"
            onClick={closeOnOverlayClick ? onClose : undefined}
        >
            <div
                className={`modal-content ${sizeClasses[size]} ${className}`}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                {(title || showCloseButton) && (
                    <div className="flex items-center justify-between p-5 border-b border-[rgb(var(--color-border))]">
                        {title && (
                            <h2 className="text-lg font-semibold text-primary">{title}</h2>
                        )}
                        {showCloseButton && (
                            <button
                                onClick={onClose}
                                className="p-1 rounded-lg text-tertiary hover:text-primary hover:bg-tertiary transition-colors"
                            >
                                <XIcon size={20} />
                            </button>
                        )}
                    </div>
                )}

                {/* Content */}
                <div className="p-5">
                    {children}
                </div>
            </div>
        </div>
    );
};

// Modal Header component
Modal.Header = ({ children, className = '' }) => (
    <div className={`mb-4 ${className}`}>
        {children}
    </div>
);

// Modal Body component
Modal.Body = ({ children, className = '' }) => (
    <div className={className}>
        {children}
    </div>
);

// Modal Footer component
Modal.Footer = ({ children, className = '' }) => (
    <div className={`mt-6 flex items-center justify-end gap-3 ${className}`}>
        {children}
    </div>
);

export default Modal;
