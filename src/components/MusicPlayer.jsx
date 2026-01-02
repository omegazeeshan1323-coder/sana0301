import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import ReactPlayer from 'react-player';

const MusicPlayer = forwardRef((props, ref) => {
    const { currentTheme } = useTheme();
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false); // Unmuted by default for manual trigger
    const [isExpanded, setIsExpanded] = useState(false);

    // Birds of a Feather - Billie Eilish (Lyric Video - Better Embed Support)
    const SONG_URL = "https://www.youtube.com/watch?v=haGkI4Y0g7E";

    useImperativeHandle(ref, () => ({
        playMusic: () => {
            setIsPlaying(true);
            // Attempt to unmute after a short delay to allow player to start
            setTimeout(() => setIsMuted(false), 1000);
        }
    }));

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
    };

    const toggleMute = () => {
        setIsMuted(!isMuted);
    };

    return (
        <div className="fixed bottom-6 left-6 z-50">
            {/* Hidden Player for YouTube Audio - Kept on-screen to avoid browser throttling */}
            <div className="fixed bottom-0 right-0 w-2 h-2 opacity-[0.01] pointer-events-none z-[-1]">
                <ReactPlayer
                    url={SONG_URL}
                    playing={isPlaying}
                    muted={isMuted}
                    loop={true}
                    volume={1}
                    width="1px"
                    height="1px"
                    playsinline={true}
                    config={{
                        youtube: {
                            playerVars: {
                                origin: window.location.origin,
                                autoplay: 1,
                                playsinline: 1
                            }
                        }
                    }}
                    onReady={() => console.log("Music Player Ready")}
                    onStart={() => console.log("Music Player Started")}
                    onPlay={() => console.log("Music Player Playing")}
                    onError={(e) => console.error("Music Player Error:", e)}
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
