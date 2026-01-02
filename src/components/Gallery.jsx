import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const Gallery = () => {
    const { currentTheme } = useTheme();

    // Placeholder items until user uploads photos
    const memories = [1, 2, 3, 4, 5, 6];

    return (
        <div className="py-20 px-4">
            <h2 className={`text-4xl font-serif text-center mb-16 ${currentTheme.accent}`}>Memory Lane</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto px-4">
                {memories.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className={`relative rounded-xl overflow-hidden cursor-pointer group ${index % 3 === 0 ? 'col-span-2 row-span-2 aspect-square' : 'col-span-1 row-span-1 aspect-square'
                            }`}
                    >
                        {/* Placeholder Background - In real app, use <img src={...} /> */}
                        <div className={`absolute inset-0 ${currentTheme.secondary} transition-transform duration-500 group-hover:scale-110`} />

                        <div className={`absolute inset-0 flex items-center justify-center ${currentTheme.text} opacity-30 font-medium`}>
                            Memory {item}
                        </div>

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="absolute bottom-4 left-4">
                                <p className="text-white font-serif tracking-wide text-sm md:text-base">
                                    Our Moment {item}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Gallery;
