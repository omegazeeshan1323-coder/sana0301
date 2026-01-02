import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const Gallery = () => {
    const { currentTheme } = useTheme();

    // Dynamically import all images from the gallery folder
    // This allows the user to just drop files in src/assets/gallery without changing code
    const images = import.meta.glob('../assets/gallery/*.{png,jpg,jpeg,svg}', { eager: true });

    // Convert object of modules to array of image paths
    const memories = Object.values(images).map(img => img.default);

    // Placeholder if no images found
    if (memories.length === 0) {
        return (
            <div className="py-20 px-4 text-center">
                <h2 className={`text-4xl font-serif mb-8 ${currentTheme.accent}`}>Memory Lane</h2>
                <p className="text-gray-400">Add photos to src/assets/gallery to see them here!</p>
            </div>
        );
    }

    return (
        <div className="py-20 px-4">
            <h2 className={`text-4xl font-serif text-center mb-16 ${currentTheme.accent}`}>Memory Lane</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto px-4">
                {memories.map((src, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className={`relative rounded-xl overflow-hidden cursor-pointer group ${index % 3 === 0 ? 'col-span-2 row-span-2 aspect-square' : 'col-span-1 row-span-1 aspect-square'
                            }`}
                    >
                        {/* Real Image */}
                        <img
                            src={src}
                            alt={`Memory ${index + 1}`}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="absolute bottom-4 left-4">
                                <p className="text-white font-serif tracking-wide text-sm md:text-base">
                                    Our Moment {index + 1}
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
