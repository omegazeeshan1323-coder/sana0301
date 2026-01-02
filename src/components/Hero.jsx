import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Gift } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Hero = () => {
    const { currentTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => {
        setIsOpen(true);
        const duration = 3000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const random = (min, max) => Math.random() * (max - min) + min;

        const interval = setInterval(() => {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti({ ...defaults, particleCount, origin: { x: random(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: random(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);
    };

    return (
        <div className={`h-[85vh] flex flex-col items-center justify-center relative overflow-hidden transition-colors duration-700`}>
            {/* Background Ambience */}
            <div className={`absolute inset-0 bg-gradient-to-b ${currentTheme.gradient} opacity-80`} />

            <div className="z-10 text-center px-4 w-full flex flex-col items-center justify-center">
                <AnimatePresence mode="wait">
                    {!isOpen ? (
                        <motion.div
                            key="gift"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0, rotate: 180 }}
                            transition={{ duration: 0.8, type: "spring" }}
                            className="cursor-pointer group relative"
                            onClick={handleOpen}
                        >
                            <div className={`relative p-6 rounded-2xl backdrop-blur-sm border ${currentTheme.border} ${currentTheme.secondary} group-hover:scale-105 transition-transform duration-300 flex flex-col items-center justify-center`}>
                                <Gift size={48} className={`${currentTheme.accent} animate-bounce`} />
                                <p className={`mt-3 ${currentTheme.text} font-serif tracking-widest text-xs opacity-80 group-hover:opacity-100`}>
                                    TAP TO OPEN
                                </p>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="message"
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="space-y-6"
                        >
                            <h1 className={`text-5xl md:text-7xl font-serif ${currentTheme.accentGradient} mb-4 pb-2 leading-relaxed`}>
                                Happy Birthday, Sana!
                            </h1>
                            <p className={`text-lg md:text-xl ${currentTheme.text} max-w-lg mx-auto leading-relaxed font-light opacity-90`}>
                                To the most beautiful soul, welcome to your special space.
                                <br />Scroll down to see why I love you.
                            </p>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 2, duration: 1 }}
                                className="pt-12"
                            >
                                <div className={`w-px h-24 mx-auto ${currentTheme.text} opacity-30`} />
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Hero;
