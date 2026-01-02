import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Mail, X } from 'lucide-react';

const LoveLetter = () => {
    const { currentTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex justify-center py-10">
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(true)}
                className={`flex items-center gap-3 px-8 py-4 rounded-full border ${currentTheme.border} ${currentTheme.secondary} backdrop-blur-md shadow-lg group`}
            >
                <Mail className={`${currentTheme.accent} group-hover:rotate-12 transition-transform duration-300`} />
                <span className={`font-serif text-lg ${currentTheme.text} tracking-wide`}>Read My Letter</span>
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                        onClick={() => setIsOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.8, rotate: -5, opacity: 0 }}
                            animate={{ scale: 1, rotate: 0, opacity: 1 }}
                            exit={{ scale: 0.8, rotate: 5, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-[#fdfbf7] w-full max-w-2xl p-8 md:p-12 rounded-lg shadow-2xl relative max-h-[80vh] overflow-y-auto custom-scrollbar text-gray-800"
                        >
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute top-4 right-4 p-2 hover:bg-black/5 rounded-full transition-colors"
                            >
                                <X size={24} className="text-gray-500" />
                            </button>

                            <div className="font-cursive text-2xl md:text-3xl leading-relaxed space-y-6">
                                <p>My Cutie Sana,</p>
                                <p>
                                    Happy Birthday, my doryyyy! 🎉
                                </p>
                                <p>
                                    On this special day, I want to remind you of how incredibly precious and important you are to me.
                                    Since May 9, 2023, you have filled my life with more joy, laughter, and warmth than I ever imagined possible.
                                </p>
                                <p>
                                    Watching you being autistic, being a chef and being a GOOD fucking person (ykwim)is my greatest privilege.
                                    You are not just my girlfriend, you are my best friend, my safe space, and my home.
                                </p>
                                <p>
                                    May this year bring you as much happiness as you bring into my life every single day.
                                    I love you more than words can say. I know im bad editing videos but i can do something which im decent at which is this. Sooooooo here you go cutie
                                </p>
                                <p className="text-right mt-12">
                                    Forever yours,<br />
                                    <span className="text-4xl">Niggshan/Dogshan/Zeeshan/Slaveshan</span>
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default LoveLetter;
