import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Flower, Trees, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

const ThemeToggle = () => {
    const { theme, toggleTheme, currentTheme } = useTheme();

    const buttons = [
        { id: 'rose', icon: Flower, label: 'Rose' },
        { id: 'forest', icon: Trees, label: 'Forest' },
        { id: 'sky', icon: Moon, label: 'Sky' },
    ];

    return (
        <div className="fixed top-6 right-6 z-50">
            <div className={`flex gap-2 p-2 rounded-full backdrop-blur-md border ${currentTheme.border} ${currentTheme.secondary}`}>
                {buttons.map((btn) => (
                    <button
                        key={btn.id}
                        onClick={() => toggleTheme(btn.id)}
                        className={`p-2 rounded-full transition-all duration-300 ${theme === btn.id
                                ? 'bg-white text-black shadow-lg scale-110'
                                : `${currentTheme.text} hover:bg-white/10`
                            }`}
                        aria-label={btn.label}
                    >
                        <btn.icon size={20} />
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ThemeToggle;
