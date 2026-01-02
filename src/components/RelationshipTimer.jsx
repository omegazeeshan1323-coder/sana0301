import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const RelationshipTimer = () => {
    const { currentTheme } = useTheme();
    const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    // Start date: May 9, 2023
    const START_DATE = new Date("2023-05-09T00:00:00");

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            const difference = now.getTime() - START_DATE.getTime();

            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((difference / 1000 / 60) % 60);
            const seconds = Math.floor((difference / 1000) % 60);

            setTime({ days, hours, minutes, seconds });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="py-20 px-4 text-center">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                className="inline-block relative"
            >
                <div className={`absolute -top-8 left-1/2 -translate-x-1/2 ${currentTheme.accent} animate-bounce`}>
                    <Heart size={32} fill="currentColor" className="opacity-80" />
                </div>
                <h3 className={`text-3xl md:text-4xl font-cursive mb-12 ${currentTheme.text} drop-shadow-sm`}>
                    Loving you for
                </h3>
            </motion.div>

            <div className="flex flex-wrap justify-center gap-6 md:gap-10">
                {[
                    { label: 'Days', value: time.days },
                    { label: 'Hours', value: time.hours },
                    { label: 'Minutes', value: time.minutes },
                    { label: 'Seconds', value: time.seconds }
                ].map((item, index) => (
                    <motion.div
                        key={item.label}
                        whileHover={{ scale: 1.1, rotate: index % 2 === 0 ? 2 : -2 }}
                        className={`flex flex-col items-center p-6 rounded-2xl border ${currentTheme.border} ${currentTheme.secondary} backdrop-blur-md shadow-lg min-w-[100px] md:min-w-[120px] transition-colors duration-300`}
                    >
                        <span className={`text-3xl md:text-5xl font-sans font-bold ${currentTheme.accent} tabular-nums`}>
                            {item.value}
                        </span>
                        <span className={`text-xs md:text-sm uppercase tracking-widest mt-2 opacity-60 ${currentTheme.text}`}>
                            {item.label}
                        </span>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default RelationshipTimer;
