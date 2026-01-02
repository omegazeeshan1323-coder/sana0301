import React from 'react';
import { motion } from 'framer-motion';
import { Moon, Star } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const BirthdayMoon = () => {
    const { currentTheme } = useTheme();

    return (
        <section className="py-20 px-4 relative overflow-hidden">
            <div className="max-w-4xl mx-auto text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <h2 className={`text-3xl md:text-5xl font-serif mb-4 ${currentTheme.accent}`}>
                        Under This Moon
                    </h2>
                    <p className={`text-lg md:text-xl opacity-80 ${currentTheme.text} font-light`}>
                        On January 3rd, 2007, the sky looked just like this when an angel was born.
                    </p>
                </motion.div>

                <div className="relative w-64 h-64 mx-auto mb-12">
                    {/* Glowing Moon Effect */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.5 }}
                        className="w-full h-full rounded-full bg-slate-200 shadow-[0_0_100px_rgba(255,255,255,0.3)] relative overflow-hidden"
                    >
                        {/* Craters for texture */}
                        <div className="absolute top-10 left-12 w-8 h-8 bg-slate-300 rounded-full opacity-50" />
                        <div className="absolute top-32 right-10 w-12 h-12 bg-slate-300 rounded-full opacity-40" />
                        <div className="absolute bottom-10 left-20 w-6 h-6 bg-slate-300 rounded-full opacity-60" />

                        {/* Glow */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-white/30 rounded-full" />
                    </motion.div>

                    {/* Orbiting Stars */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-[-50%] z-0"
                    >
                        <Star className="absolute top-0 left-1/2 w-4 h-4 text-yellow-200 animate-pulse" />
                        <Star className="absolute bottom-0 left-1/2 w-3 h-3 text-purple-200 animate-pulse delay-75" />
                        <Star className="absolute top-1/2 left-0 w-5 h-5 text-blue-200 animate-pulse delay-150" />
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className={`p-6 rounded-2xl border ${currentTheme.border} ${currentTheme.secondary} backdrop-blur-sm inline-block`}
                >
                    <p className={`${currentTheme.text} italic`}>
                        "The moon is beautiful, isn't it?"
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default BirthdayMoon;
