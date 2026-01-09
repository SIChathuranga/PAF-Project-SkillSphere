import React, { forwardRef, useState } from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

const Input = forwardRef(({
  label,
  error,
  icon,
  type = 'text',
  className = '',
  containerClassName = '',
  required = false,
  helperText,
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className={containerClassName}>
      {label && (
        <label className="label">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          type={inputType}
          className={`
            input
            ${icon ? 'pl-10' : ''}
            ${isPassword ? 'pr-10' : ''}
            ${error ? 'input-error' : ''}
            ${className}
          `}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted hover:text-secondary transition-colors"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeOffIcon size={18} />
            ) : (
              <EyeIcon size={18} />
            )}
          </button>
        )}
      </div>
      {helperText && !error && (
        <p className="mt-1.5 text-xs text-tertiary">{helperText}</p>
      )}
      {error && (
        <p className="mt-1.5 text-xs text-red-500">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
