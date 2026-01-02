import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Heart, Star } from 'lucide-react';

// Import images
import imgCafe from '../assets/memories/cafe.jpg';
import imgPlushies from '../assets/memories/plushies.jpg';
import imgTravel from '../assets/memories/travel.jpg';
import imgCarrying from '../assets/memories/carrying.jpg';
import imgMirror from '../assets/memories/mirror.jpg';

const Timeline = () => {
    const { currentTheme } = useTheme();

    const milestones = [
        {
            year: "The Beginning",
            title: "First Glance",
            description: "The moment our eyes met, time stood still. A new chapter began.",
            icon: <Heart size={16} fill="currentColor" />,
            image: imgCafe
        },
        {
            year: "Year 1",
            title: "Adventures Start",
            description: "From shopping sprees to finding our favorite toys. Every day is an adventure.",
            icon: <Star size={16} fill="currentColor" />,
            image: imgPlushies
        },
        {
            year: "Reflections",
            title: "Growing Stronger",
            description: "Building our style, building our life. Together in every reflection.",
            icon: <Heart size={16} fill="currentColor" />,
            image: imgMirror
        },
        {
            year: "Journeys",
            title: "Traveling Together",
            description: "Sleepy heads on long journeys. Finding comfort in just being close.",
            icon: <Star size={16} fill="currentColor" />,
            image: imgTravel
        },
        {
            year: "Now",
            title: "Forever & Always",
            description: "Carrying each other through life, literally and figuratively. I got you.",
            icon: <Heart size={16} fill="currentColor" />,
            image: imgCarrying
        }
    ];

    return (
        <div className="py-20 px-4 max-w-4xl mx-auto relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[600px] bg-pink-500/10 blur-[100px] rounded-full pointer-events-none" />

            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className={`text-5xl font-serif text-center mb-24 bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 bg-clip-text text-transparent`}
            >
                Our Memories
            </motion.h2>

            <div className="relative">
                {/* Central Line - Glowing Gradient */}
                <div className={`absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 md:-translate-x-1/2 bg-gradient-to-b from-transparent via-pink-500 to-transparent opacity-50 shadow-[0_0_15px_rgba(236,72,153,0.6)]`} />

                <div className="space-y-24">
                    {milestones.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, delay: index * 0.1, type: "spring", bounce: 0.4 }}
                            className={`flex flex-col md:flex-row gap-8 items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                        >
                            {/* Card Content - Glassmorphism */}
                            <motion.div
                                whileHover={{ scale: 1.03, boxShadow: "0 0 25px rgba(236, 72, 153, 0.2)" }}
                                className="flex-1 w-full md:w-1/2 relative group"
                            >
                                <div className={`overflow-hidden rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-xl transition-all duration-300 group-hover:bg-white/10 group-hover:border-pink-500/30`}>

                                    {/* Image Section */}
                                    <div className="h-48 overflow-hidden relative">
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute bottom-3 left-4 z-20">
                                            <div className={`inline-flex items-center gap-2 py-1 px-3 rounded-full text-xs font-bold tracking-widest border border-pink-500/30 bg-pink-500/20 text-pink-300 backdrop-blur-sm`}>
                                                {item.year}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Text Content */}
                                    <div className="p-6">
                                        <h3 className={`text-2xl font-serif text-white mb-2 group-hover:text-pink-200 transition-colors`}>
                                            {item.title}
                                        </h3>
                                        <p className={`text-gray-300 font-light leading-relaxed group-hover:text-white transition-colors`}>
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Center Dot - Pulsing Heart */}
                            <div className="absolute left-4 md:left-1/2 -translate-x-1/2 flex items-center justify-center">
                                <motion.div
                                    whileInView={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className={`w-10 h-10 rounded-full border-2 border-pink-500 bg-gray-900 flex items-center justify-center z-10 shadow-[0_0_15px_rgba(236,72,153,0.5)]`}
                                >
                                    <div className="text-pink-400">
                                        {item.icon}
                                    </div>
                                </motion.div>
                            </div>

                            {/* Empty Side for balance on desktop */}
                            <div className="hidden md:block flex-1" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Timeline;
