import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Lock, Unlock } from 'lucide-react';

const LockScreen = ({ onUnlock }) => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [isUnlocked, setIsUnlocked] = useState(false);

    // The secret password based on user request
    const CORRECT_PASSWORD = '0905';

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === CORRECT_PASSWORD) {
            // Immediately trigger music (synchronous with click)
            onUnlock(true); // Helper flag to say "just start music"

            setIsUnlocked(true);
            // The unmounting happens after animation, but music starts NOW.
        } else {
            setError(true);
            setTimeout(() => setError(false), 500);
            setPassword('');
        }
    };

    return (
        <AnimatePresence>
            {!isUnlocked && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, duration: 1 }}
                    className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 text-white overflow-hidden"
                >
                    {/* Background Ambient Effects */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-pink-500/20 rounded-full blur-[100px]" />
                        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/20 rounded-full blur-[100px]" />
                    </div>

                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="relative z-10 w-full max-w-md p-8 text-center"
                    >
                        <motion.div
                            animate={{
                                scale: [1, 1.1, 1],
                                rotate: error ? [0, -10, 10, -10, 10, 0] : 0,
                            }}
                            transition={{ duration: 0.5 }}
                            className="mb-8 flex justify-center"
                        >
                            <div className="relative">
                                <div className="absolute inset-0 bg-pink-500 blur-xl opacity-50 animate-pulse" />
                                <div className="relative bg-white/10 p-6 rounded-full backdrop-blur-md border border-white/20">
                                    {error ? (
                                        <Lock className="w-12 h-12 text-pink-400" />
                                    ) : (
                                        <Heart className="w-12 h-12 text-pink-500 fill-pink-500 animate-pulse" />
                                    )}
                                </div>
                            </div>
                        </motion.div>

                        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 bg-clip-text text-transparent">
                            Access My Heart
                        </h1>
                        <p className="text-white/60 mb-8 font-light">
                            Enter the special date to continue
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="relative group">
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter passcode"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-center text-xl tracking-widest text-white placeholder-white/20 focus:outline-none focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/50 transition-all group-hover:bg-white/10"
                                    autoFocus
                                />
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-medium py-4 rounded-xl shadow-lg shadow-pink-500/20 hover:shadow-pink-500/40 transition-all border border-white/10"
                            >
                                Unlock Love
                            </motion.button>
                        </form>

                        {error && (
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-4 text-red-400 text-sm"
                            >
                                Wrong key to my heart... try again 💔
                            </motion.p>
                        )}
                    </motion.div>
                </motion.div>
            )}

            {/* Success Animation Overlay */}
            {isUnlocked && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-transparent pointer-events-none"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: [0, 1.5, 30] }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        className="w-64 h-64 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full blur-xl opacity-20"
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default LockScreen;
