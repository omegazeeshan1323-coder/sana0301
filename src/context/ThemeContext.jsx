import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('rose'); // default theme

    const themes = {
        rose: {
            bg: 'bg-[#1a0507]',
            text: 'text-rose-100',
            accent: 'text-rose-500',
            accentGradient: 'bg-gradient-to-r from-rose-400 to-pink-600 bg-clip-text text-transparent',
            border: 'border-rose-500/30',
            gradient: 'from-[#1a0507] via-[#2c0b0e] to-[#1a0507]',
            button: 'bg-rose-600 hover:bg-rose-700 text-white',
            secondary: 'bg-rose-900/20'
        },
        forest: {
            bg: 'bg-[#051108]',
            text: 'text-emerald-100',
            accent: 'text-emerald-500',
            accentGradient: 'bg-gradient-to-r from-emerald-400 to-green-600 bg-clip-text text-transparent',
            border: 'border-emerald-500/30',
            gradient: 'from-[#051108] via-[#0c1a12] to-[#051108]',
            button: 'bg-emerald-600 hover:bg-emerald-700 text-white',
            secondary: 'bg-emerald-900/20'
        },
        sky: {
            bg: 'bg-[#040816]',
            text: 'text-blue-100',
            accent: 'text-blue-500',
            accentGradient: 'bg-gradient-to-r from-blue-400 to-cyan-600 bg-clip-text text-transparent',
            border: 'border-blue-500/30',
            gradient: 'from-[#040816] via-[#081028] to-[#040816]',
            button: 'bg-blue-600 hover:bg-blue-700 text-white',
            secondary: 'bg-blue-900/20'
        }
    };

    const toggleTheme = (newTheme) => {
        if (themes[newTheme]) {
            setTheme(newTheme);
        }
    };

    return (
        <ThemeContext.Provider value={{ theme, currentTheme: themes[theme], toggleTheme }}>
            <div className={`min-h-screen ${themes[theme].bg} ${themes[theme].text} transition-colors duration-700`}>
                {children}
            </div>
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
