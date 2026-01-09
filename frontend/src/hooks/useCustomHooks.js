import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Hook to manage localStorage with React state
 */
export const useLocalStorage = (key, initialValue) => {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error('Error reading from localStorage:', error);
            return initialValue;
        }
    });

    const setValue = (value) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.error('Error writing to localStorage:', error);
        }
    };

    return [storedValue, setValue];
};

/**
 * Hook for debouncing values
 */
export const useDebounce = (value, delay = 300) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
};

/**
 * Hook for handling click outside an element
 */
export const useClickOutside = (ref, handler) => {
    useEffect(() => {
        const listener = (event) => {
            if (!ref.current || ref.current.contains(event.target)) {
                return;
            }
            handler(event);
        };

        document.addEventListener('mousedown', listener);
        document.addEventListener('touchstart', listener);

        return () => {
            document.removeEventListener('mousedown', listener);
            document.removeEventListener('touchstart', listener);
        };
    }, [ref, handler]);
};

/**
 * Hook for media queries
 */
export const useMediaQuery = (query) => {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const media = window.matchMedia(query);
        if (media.matches !== matches) {
            setMatches(media.matches);
        }

        const listener = () => setMatches(media.matches);
        media.addEventListener('change', listener);

        return () => media.removeEventListener('change', listener);
    }, [matches, query]);

    return matches;
};

/**
 * Responsive breakpoint hooks
 */
export const useIsMobile = () => useMediaQuery('(max-width: 639px)');
export const useIsTablet = () => useMediaQuery('(min-width: 640px) and (max-width: 1023px)');
export const useIsDesktop = () => useMediaQuery('(min-width: 1024px)');

/**
 * Hook for toggle state
 */
export const useToggle = (initialValue = false) => {
    const [value, setValue] = useState(initialValue);

    const toggle = useCallback(() => setValue(v => !v), []);
    const setTrue = useCallback(() => setValue(true), []);
    const setFalse = useCallback(() => setValue(false), []);

    return [value, toggle, setTrue, setFalse];
};

/**
 * Hook for managing loading state with async operations
 */
export const useAsync = (asyncFunction, immediate = false) => {
    const [status, setStatus] = useState('idle');
    const [value, setValue] = useState(null);
    const [error, setError] = useState(null);

    const execute = useCallback(async (...args) => {
        setStatus('pending');
        setValue(null);
        setError(null);

        try {
            const response = await asyncFunction(...args);
            setValue(response);
            setStatus('success');
            return response;
        } catch (error) {
            setError(error);
            setStatus('error');
            throw error;
        }
    }, [asyncFunction]);

    useEffect(() => {
        if (immediate) {
            execute();
        }
    }, [execute, immediate]);

    return { execute, status, value, error, isLoading: status === 'pending' };
};

/**
 * Hook for previous value
 */
export const usePrevious = (value) => {
    const ref = useRef();

    useEffect(() => {
        ref.current = value;
    }, [value]);

    return ref.current;
};

/**
 * Hook for window scroll position
 */
export const useScrollPosition = () => {
    const [scrollPosition, setScrollPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleScroll = () => {
            setScrollPosition({
                x: window.scrollX,
                y: window.scrollY
            });
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return scrollPosition;
};

/**
 * Hook to detect if scrolled past a threshold
 */
export const useScrolled = (threshold = 50) => {
    const { y } = useScrollPosition();
    return y > threshold;
};

/**
 * Hook for keyboard shortcuts
 */
export const useKeyPress = (targetKey, handler) => {
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === targetKey) {
                handler(event);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [targetKey, handler]);
};

/**
 * Hook for intersection observer (lazy loading, infinite scroll)
 */
export const useIntersectionObserver = (options = {}) => {
    const [ref, setRef] = useState(null);
    const [isIntersecting, setIsIntersecting] = useState(false);

    useEffect(() => {
        if (!ref) return;

        const observer = new IntersectionObserver(([entry]) => {
            setIsIntersecting(entry.isIntersecting);
        }, options);

        observer.observe(ref);

        return () => observer.disconnect();
    }, [ref, options]);

    return [setRef, isIntersecting];
};

/**
 * Hook for copy to clipboard
 */
export const useCopyToClipboard = () => {
    const [copiedText, setCopiedText] = useState(null);

    const copy = useCallback(async (text) => {
        if (!navigator?.clipboard) {
            console.warn('Clipboard not supported');
            return false;
        }

        try {
            await navigator.clipboard.writeText(text);
            setCopiedText(text);
            return true;
        } catch (error) {
            console.error('Copy failed:', error);
            setCopiedText(null);
            return false;
        }
    }, []);

    return [copiedText, copy];
};

export default {
    useLocalStorage,
    useDebounce,
    useClickOutside,
    useMediaQuery,
    useIsMobile,
    useIsTablet,
    useIsDesktop,
    useToggle,
    useAsync,
    usePrevious,
    useScrollPosition,
    useScrolled,
    useKeyPress,
    useIntersectionObserver,
    useCopyToClipboard
};
