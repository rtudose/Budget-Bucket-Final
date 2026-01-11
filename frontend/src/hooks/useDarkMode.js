import { useEffect, useState } from "react";

export default function useDarkMode() {
    // Initialize theme state (check localStorage or system preference for theme)
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const colorTheme = theme === 'dark' ? 'light' : 'dark';

    useEffect(() => {
        const root = window.document.documentElement;

        root.classList.remove(colorTheme);
        root.classList.add(theme);

        // Save theme to localStorage
        localStorage.setItem('theme', theme);
    }, [theme, colorTheme]);

    return [colorTheme, setTheme];
} 