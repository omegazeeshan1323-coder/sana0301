import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Heart } from 'lucide-react';

const Footer = () => {
    const { currentTheme } = useTheme();

    return (
        <footer className={`py-8 text-center border-t ${currentTheme.border} backdrop-blur-sm mt-20`}>
            <div className="flex items-center justify-center gap-2 mb-2">
                <span className={`text-sm ${currentTheme.text} opacity-70`}>Made with</span>
                <Heart size={16} className={`${currentTheme.accent} animate-pulse`} fill="currentColor" />
                <span className={`text-sm ${currentTheme.text} opacity-70`}>for Sana</span>
            </div>
            <p className={`text-xs ${currentTheme.text} opacity-40 font-serif`}>
                Forever & Always • {new Date().getFullYear()}
            </p>
        </footer>
    );
};

export default Footer;
