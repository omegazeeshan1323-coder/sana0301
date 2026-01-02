import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Heart } from 'lucide-react';

const Reasons = () => {
    const { currentTheme } = useTheme();

    const reasonsList = [
        "Your smile lights up my darkest days.",
        "The way you understand me without words.",
        "Your laugh is my favorite melody.",
        "You support my dreams like no one else.",
        "Every moment with you is a treasure.",
        "Reason #6: You inspire me to be a better person every day.",
        "You make the world feel like a better place."
    ];

    const [cards, setCards] = useState(reasonsList);

    const removeCard = (index) => {
        setCards((prev) => {
            const newCards = [...prev];
            const removed = newCards.splice(index, 1)[0];
            // Optional: Add back to bottom for infinite loop
            newCards.unshift(removed);
            return newCards;
        });
    };

    return (
        <div className="py-20 px-4 flex flex-col items-center overflow-hidden">
            <h2 className={`text-4xl font-serif text-center mb-12 ${currentTheme.accent}`}>Why I Love You</h2>

            <div className="relative w-72 h-96 md:w-80 md:h-[400px]">
                <AnimatePresence>
                    {cards.slice().reverse().map((reason, index) => {
                        const isTop = index === cards.length - 1;
                        return (
                            <motion.div
                                key={reason} // Use reason as key if unique, or add IDs
                                initial={{ scale: 0.9 + index * 0.05, y: index * -10, opacity: 0 }}
                                animate={{
                                    scale: 1 - (cards.length - 1 - index) * 0.05,
                                    y: (cards.length - 1 - index) * 10,
                                    opacity: 1 - (cards.length - 1 - index) * 0.2,
                                    zIndex: index
                                }}
                                exit={{ x: 200, opacity: 0, rotate: 20 }}
                                drag={isTop ? "x" : false}
                                dragConstraints={{ left: 0, right: 0 }}
                                onDragEnd={(_, info) => {
                                    if (Math.abs(info.offset.x) > 100 && isTop) {
                                        removeCard(index);
                                    }
                                }}
                                onClick={() => isTop && removeCard(index)} // Click to shuffle too
                                className={`absolute inset-0 rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-2xl cursor-grab active:cursor-grabbing border ${currentTheme.border} ${currentTheme.bg}`}
                                style={{
                                    background: `linear-gradient(135deg, ${currentTheme.bg} 0%, ${currentTheme.secondary.split(' ')[0].replace('bg-', '')} 100%)` // Crude approx for gradient
                                }}
                            >
                                <div className={`absolute inset-0 bg-gradient-to-br ${currentTheme.gradient} opacity-90 rounded-2xl -z-10`} />
                                <Heart size={32} className={`mb-6 ${currentTheme.accent}`} fill={isTop ? "currentColor" : "none"} />
                                <p className={`text-xl font-serif ${currentTheme.text} leading-relaxed select-none`}>
                                    "{reason}"
                                </p>
                                {isTop && (
                                    <p className={`absolute bottom-6 text-xs tracking-widest uppercase opacity-40 ${currentTheme.text}`}>
                                        Swipe or Tap
                                    </p>
                                )}
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Reasons;
