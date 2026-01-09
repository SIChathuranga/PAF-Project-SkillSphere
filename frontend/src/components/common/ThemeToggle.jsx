import React from 'react';
import { SunIcon, MoonIcon } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const ThemeToggle = ({ className = '' }) => {
    const { theme, toggleTheme, isDark } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className={`
        relative p-2.5 rounded-xl
        bg-tertiary hover:bg-hover
        border border-[rgb(var(--color-border))]
        transition-all duration-300 ease-in-out
        hover:scale-105 active:scale-95
        group
        ${className}
      `}
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        >
            <div className="relative w-5 h-5">
                {/* Sun Icon */}
                <SunIcon
                    size={20}
                    className={`
            absolute inset-0 transition-all duration-300
            ${isDark
                            ? 'opacity-100 rotate-0 text-yellow-400'
                            : 'opacity-0 rotate-90 text-yellow-500'
                        }
          `}
                />
                {/* Moon Icon */}
                <MoonIcon
                    size={20}
                    className={`
            absolute inset-0 transition-all duration-300
            ${isDark
                            ? 'opacity-0 -rotate-90 text-blue-400'
                            : 'opacity-100 rotate-0 text-blue-500'
                        }
          `}
                />
            </div>

            {/* Glow effect on hover */}
            <div className={`
        absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300
        ${isDark
                    ? 'bg-yellow-400/10'
                    : 'bg-blue-500/10'
                }
      `}></div>
        </button>
    );
};

// Alternative toggle with text - defined as separate component
const ThemeToggleWithText = ({ className = '' }) => {
    const { theme, toggleTheme, isDark } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className={`
        flex items-center gap-2 px-4 py-2 rounded-xl
        bg-tertiary hover:bg-hover
        border border-[rgb(var(--color-border))]
        transition-all duration-200
        text-secondary hover:text-primary
        ${className}
      `}
        >
            {isDark ? (
                <>
                    <SunIcon size={18} className="text-yellow-400" />
                    <span className="text-sm font-medium">Light</span>
                </>
            ) : (
                <>
                    <MoonIcon size={18} className="text-blue-500" />
                    <span className="text-sm font-medium">Dark</span>
                </>
            )}
        </button>
    );
};

// Pill toggle style - defined as separate component
const ThemeTogglePill = ({ className = '' }) => {
    const { theme, toggleTheme, isDark } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className={`
        relative w-14 h-7 rounded-full p-1
        bg-tertiary border border-[rgb(var(--color-border))]
        transition-colors duration-300
        ${className}
      `}
        >
            {/* Toggle circle */}
            <div
                className={`
          absolute top-1 w-5 h-5 rounded-full
          transition-all duration-300 ease-out
          flex items-center justify-center
          ${isDark
                        ? 'left-1 bg-slate-700'
                        : 'left-[calc(100%-1.5rem)] gradient-bg'
                    }
        `}
            >
                {isDark ? (
                    <MoonIcon size={12} className="text-blue-400" />
                ) : (
                    <SunIcon size={12} className="text-white" />
                )}
            </div>
        </button>
    );
};

// Attach variants to main component
ThemeToggle.WithText = ThemeToggleWithText;
ThemeToggle.Pill = ThemeTogglePill;

export default ThemeToggle;
