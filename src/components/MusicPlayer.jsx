import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import ReactPlayer from 'react-player';

const MusicPlayer = () => {
    const { currentTheme } = useTheme();
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMuted, setIsMuted] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    // Birds of a Feather - Billie Eilish
    const SONG_URL = "https://www.youtube.com/watch?v=d5gf9dXbPi0";

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
    };

    const toggleMute = () => {
        setIsMuted(!isMuted);
    };

    return (
        <div className="fixed bottom-6 left-6 z-50">
            {/* Hidden Player for YouTube Audio */}
            <div className="hidden">
                <ReactPlayer
                    url={SONG_URL}
                    playing={isPlaying}
                    muted={isMuted}
                    loop={true}
                    volume={1}
                    width="0"
                    height="0"
                    playsinline={true}
                />
            </div>

            <div className="flex items-center gap-2">
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsExpanded(!isExpanded)}
                    className={`p-3 rounded-full backdrop-blur-md border ${currentTheme.border} ${currentTheme.secondary} ${currentTheme.text} shadow-lg relative overflow-hidden`}
                >
                    <div className={`absolute inset-0 bg-gradient-to-tr ${currentTheme.gradient} opacity-50`} />
                    <div className="relative z-10">
                        <Music size={24} className={isPlaying ? 'animate-pulse' : ''} />
                    </div>
                </motion.button>

                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ width: 0, opacity: 0, x: -20 }}
                            animate={{ width: 'auto', opacity: 1, x: 0 }}
                            exit={{ width: 0, opacity: 0, x: -20 }}
                            className={`flex items-center gap-2 p-2 rounded-full backdrop-blur-md border ${currentTheme.border} ${currentTheme.secondary} overflow-hidden`}
                        >
                            <button onClick={togglePlay} className={`p-2 rounded-full hover:bg-white/10 ${currentTheme.text}`}>
                                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                            </button>

                            <button onClick={toggleMute} className={`p-2 rounded-full hover:bg-white/10 ${currentTheme.text}`}>
                                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default MusicPlayer;
