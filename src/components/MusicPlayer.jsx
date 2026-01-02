import React, { useState, useRef, forwardRef, useImperativeHandle, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Play, Pause, Volume2, VolumeX, SkipBack, SkipForward } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import bgMusic from '../assets/audio/bg_music.mp3';
import billie from '../assets/audio/Billie Eilish - LUNCH (Official Lyric Video) - BillieEilishVEVO.mp3';
import jvke from '../assets/audio/JVKE - her (official lyric video) - JVKE.mp3';

const MusicPlayer = forwardRef((props, ref) => {
    const { currentTheme } = useTheme();
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const audioRef = useRef(null);

    const songs = [
        { title: "Background Music", src: bgMusic },
        { title: "LUNCH - Billie Eilish", src: billie },
        { title: "her - JVKE", src: jvke }
    ];

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

    const nextSong = () => {
        let newIndex = (currentSongIndex + 1) % songs.length;
        setCurrentSongIndex(newIndex);
    };

    const prevSong = () => {
        let newIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        setCurrentSongIndex(newIndex);
    };

    // Auto-play when song changes if it was already playing
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.src = songs[currentSongIndex].src;
            if (isPlaying) {
                audioRef.current.play().catch((e) => console.log("Play interrupted or failed", e));
            }
        }
    }, [currentSongIndex]);

    // Loop logic: when one song ends, go to next
    useEffect(() => {
        const handleEnded = () => nextSong();
        const audioEl = audioRef.current;
        if (audioEl) {
            audioEl.addEventListener('ended', handleEnded);
            return () => audioEl.removeEventListener('ended', handleEnded);
        }
    }, [currentSongIndex]); // Re-bind if needed, though ref should be stable. Dependent on nextSong closure if not useCallbacked, but here it's fine as state updates trigger re-render.

    return (
        <div className="fixed bottom-6 left-6 z-50">
            {/* Native Audio Element */}
            {/* src is handled by useEffect/ref direct assignment, but good to have initial */}
            <audio ref={audioRef} preload="auto" />

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
                            <button onClick={prevSong} className={`p-2 rounded-full hover:bg-white/10 ${currentTheme.text}`}>
                                <SkipBack size={20} />
                            </button>

                            <button onClick={togglePlay} className={`p-2 rounded-full hover:bg-white/10 ${currentTheme.text}`}>
                                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                            </button>

                            <button onClick={nextSong} className={`p-2 rounded-full hover:bg-white/10 ${currentTheme.text}`}>
                                <SkipForward size={20} />
                            </button>

                            <button onClick={toggleMute} className={`p-2 rounded-full hover:bg-white/10 ${currentTheme.text}`}>
                                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                            </button>

                            {/* Optional: Song Title Marquee or Tooltip could go here */}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
});

export default MusicPlayer;
