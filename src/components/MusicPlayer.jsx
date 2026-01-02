import React, { useState, useRef, forwardRef, useImperativeHandle, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import bgMusic from '../assets/audio/bg_music.mp3';

const MusicPlayer = forwardRef((props, ref) => {
    const { currentTheme } = useTheme();
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const audioRef = useRef(null);

    useImperativeHandle(ref, () => ({
        playMusic: () => {
            if (audioRef.current) {
                audioRef.current.volume = 1;
                audioRef.current.muted = false;
                const playPromise = audioRef.current.play();

                if (playPromise !== undefined) {
                    playPromise.then(() => {
                        setIsPlaying(true);
                        setIsMuted(false);
                    }).catch(error => {
                        console.error("Autoplay prevented:", error);
                        // If blocked, we state it's paused so user can click play
                        setIsPlaying(false);
                    });
                }
            }
        }
    }));

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const toggleMute = () => {
        if (audioRef.current) {
            audioRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.loop = true;
        }
    }, []);

    return (
        <div className="fixed bottom-6 left-6 z-50">
            {/* Native Audio Element */}
            <audio ref={audioRef} src={bgMusic} preload="auto" />

            <div className="flex items-center gap-2">
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsExpanded(!isExpanded)}
                    className={`p-3 rounded-full backdrop-blur-md border ${currentTheme.border} ${currentTheme.secondary} ${currentTheme.text} shadow-lg relative overflow-hidden`}
                >
                    <div className={`absolute inset-0 bg-gradient-to-tr ${currentTheme.gradient} opacity-50`} />
                    <div className="relative z-10">
                        <motion.div
                            animate={{ rotate: isPlaying ? 360 : 0 }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        >
                            <Music size={24} />
                        </motion.div>
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
});

export default MusicPlayer;
