import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X, Sparkles, Trophy, Gamepad2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useTheme } from '../context/ThemeContext';

const QUESTIONS = [
    {
        id: 1,
        question: "What is my absolute favorite food?",
        options: ["Pizza", "Biryani", "Burgers", "Pasta"],
        answer: "Biryani", // Placeholder
        successMessage: "You know the way to my heart! 🍗"
    },
    {
        id: 2,
        question: "Where did we have our first date?",
        options: ["Coffee Shop", "Park", "Cinema", "Beach"],
        answer: "Coffee Shop", // Placeholder
        successMessage: "It was magical, wasn't it? ☕"
    },
    {
        id: 3,
        question: "What color do I look best in?",
        options: ["Black", "Blue", "White", "Red"],
        answer: "Black", // Placeholder
        successMessage: "You have great taste! 🖤"
    },
    {
        id: 4,
        question: "Which date is our Anniversary?",
        options: ["May 9th", "Sep 5th", "Dec 1st", "Feb 14th"],
        answer: "May 9th", // Based on password hint 0905
        successMessage: "A day I'll never forget! 📅"
    }
];

const RelationshipQuiz = () => {
    const { currentTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const [currentQ, setCurrentQ] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [feedback, setFeedback] = useState(null); // 'correct' or 'wrong'

    const handleAnswer = (option) => {
        if (option === QUESTIONS[currentQ].answer) {
            setScore(s => s + 1);
            setFeedback('correct');
            confetti({
                particleCount: 50,
                spread: 60,
                origin: { y: 0.7 }
            });
            setTimeout(() => {
                setFeedback(null);
                if (currentQ < QUESTIONS.length - 1) {
                    setCurrentQ(c => c + 1);
                } else {
                    setShowResult(true);
                    confetti({
                        particleCount: 200,
                        spread: 100,
                        origin: { y: 0.6 }
                    });
                }
            }, 1500);
        } else {
            setFeedback('wrong');
            setTimeout(() => setFeedback(null), 1000);
        }
    };

    const resetQuiz = () => {
        setCurrentQ(0);
        setScore(0);
        setShowResult(false);
    };

    return (
        <div className="py-12 flex justify-center">
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(true)}
                className={`flex items-center gap-3 px-8 py-4 rounded-full border ${currentTheme.border} ${currentTheme.secondary} backdrop-blur-md shadow-lg group transition-all duration-300`}
            >
                <Gamepad2 className={`${currentTheme.accent} group-hover:rotate-12`} size={24} />
                <span className={`font-serif text-xl ${currentTheme.text}`}>How well do you know me?</span>
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="w-full max-w-lg bg-gray-900/90 border border-pink-500/30 rounded-2xl p-6 shadow-2xl relative overflow-hidden"
                        >
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute top-4 right-4 text-gray-400 hover:text-white"
                            >
                                <X size={24} />
                            </button>

                            {!showResult ? (
                                <>
                                    <div className="mb-6 flex justify-between items-center">
                                        <span className="text-pink-400 font-medium">
                                            Question {currentQ + 1}/{QUESTIONS.length}
                                        </span>
                                        <span className="text-gray-400 text-sm">
                                            Score: {score}
                                        </span>
                                    </div>

                                    <h2 className="text-2xl font-bold text-white mb-8 min-h-[4rem]">
                                        {QUESTIONS[currentQ].question}
                                    </h2>

                                    <div className="grid grid-cols-1 gap-3">
                                        {QUESTIONS[currentQ].options.map((opt, idx) => (
                                            <motion.button
                                                key={idx}
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={() => handleAnswer(opt)}
                                                disabled={feedback !== null}
                                                className={`p-4 rounded-xl text-left transition-all border ${feedback === 'correct' && opt === QUESTIONS[currentQ].answer
                                                    ? 'bg-green-500/20 border-green-500 text-green-200'
                                                    : feedback === 'wrong'
                                                        ? 'bg-red-500/20 border-red-500 text-red-200'
                                                        : 'bg-white/5 border-white/10 hover:bg-white/10 text-white'
                                                    }`}
                                            >
                                                {opt}
                                            </motion.button>
                                        ))}
                                    </div>

                                    <AnimatePresence>
                                        {feedback === 'correct' && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0 }}
                                                className="mt-4 text-center text-green-400 font-medium flex items-center justify-center gap-2"
                                            >
                                                <Sparkles size={18} />
                                                {QUESTIONS[currentQ].successMessage}
                                            </motion.div>
                                        )}
                                        {feedback === 'wrong' && (
                                            <motion.div
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: [0, -10, 10, -10, 0] }}
                                                exit={{ opacity: 0 }}
                                                className="mt-4 text-center text-red-400 font-medium"
                                            >
                                                Oops! Try again babe 😘
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </>
                            ) : (
                                <div className="text-center py-8">
                                    <Trophy className="w-20 h-20 text-yellow-400 mx-auto mb-6 animate-bounce" />
                                    <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 mb-4">
                                        Love Score: {score}/{QUESTIONS.length}
                                    </h2>
                                    <p className="text-gray-300 mb-8">
                                        {score === QUESTIONS.length
                                            ? "Perfect! You know me better than anyone! ❤️"
                                            : "Not bad! Did you forget some things? 😉"}
                                    </p>
                                    <div className="flex gap-4 justify-center">
                                        <button
                                            onClick={resetQuiz}
                                            className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
                                        >
                                            Play Again
                                        </button>
                                        <button
                                            onClick={() => setIsOpen(false)}
                                            className="px-6 py-2 bg-pink-600 hover:bg-pink-700 rounded-full text-white transition-colors"
                                        >
                                            Close
                                        </button>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default RelationshipQuiz;
