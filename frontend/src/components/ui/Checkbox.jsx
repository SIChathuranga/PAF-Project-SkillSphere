import React from 'react';
import { CheckIcon } from 'lucide-react';

const Checkbox = ({
    label,
    checked,
    onChange,
    disabled = false,
    error,
    className = '',
    ...props
}) => {
    return (
        <label className={`flex items-start gap-3 cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}>
            <div className="relative flex-shrink-0 mt-0.5">
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={onChange}
                    disabled={disabled}
                    className="sr-only"
                    {...props}
                />
                <div
                    className={`
            w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200
            ${checked
                            ? 'bg-brand border-brand'
                            : 'border-[rgb(var(--color-border))] bg-primary hover:border-brand'
                        }
            ${error ? 'border-red-500' : ''}
          `}
                >
                    {checked && (
                        <CheckIcon size={14} className="text-white" strokeWidth={3} />
                    )}
                </div>
            </div>
            {label && (
                <span className={`text-sm ${error ? 'text-red-500' : 'text-secondary'}`}>
                    {label}
                </span>
            )}
        </label>
    );
};

export default Checkbox;
