import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, X, Calendar, Clock, Send } from 'lucide-react';

const DATE_TYPES = [
    "Romantic Dinner 🕯️",
    "Movie Night 🎬",
    "Long Drive 🚗",
    "Stargazing ✨",
    "Surprise Me 🎁"
];

const DateScheduler = ({ onClose }) => {
    const [formData, setFormData] = useState({
        date: '',
        time: '',
        type: DATE_TYPES[0],
        note: ''
    });
    const [status, setStatus] = useState('idle'); // idle, sending, success, error

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');

        try {
            const response = await fetch("https://formsubmit.co/ajax/zeesh.baig.1323@gmail.com", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    _subject: `New Date Night Request: ${formData.type}`,
                    _template: "table",
                    date_type: formData.type,
                    requested_date: formData.date,
                    requested_time: formData.time,
                    special_note: formData.note
                })
            });

            if (response.ok) {
                setStatus('success');
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error("FormSubmit Error:", error);
            setStatus('error');
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                className="w-full max-w-md bg-gray-900/90 border border-purple-500/30 rounded-2xl p-6 shadow-2xl relative"
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white"
                >
                    <X size={24} />
                </button>

                <h2 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Plan Our Date Night 🌙
                </h2>

                {status === 'success' ? (
                    <div className="text-center py-8">
                        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Heart className="w-8 h-8 text-green-400 fill-green-400" />
                        </div>
                        <h3 className="text-xl text-white font-medium mb-2">Request Sent!</h3>
                        <p className="text-gray-400 mb-6">
                            I've received your invitation. I'll confirm with you soon! ❤️
                        </p>
                        <button
                            onClick={onClose}
                            className="w-full py-3 bg-gray-800 rounded-xl text-white hover:bg-gray-700 transition-colors"
                        >
                            Close
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-gray-400 text-sm mb-1">Date Type</label>
                            <div className="grid grid-cols-2 gap-2">
                                {DATE_TYPES.map((type) => (
                                    <button
                                        key={type}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, type })}
                                        className={`p-2 text-sm rounded-lg border transition-all ${formData.type === type
                                                ? 'bg-purple-600/30 border-purple-500 text-white'
                                                : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                                            }`}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-400 text-sm mb-1">Date</label>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-3 text-gray-500 w-4 h-4" />
                                    <input
                                        type="date"
                                        required
                                        value={formData.date}
                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white focus:border-purple-500 focus:outline-none"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-gray-400 text-sm mb-1">Time</label>
                                <div className="relative">
                                    <Clock className="absolute left-3 top-3 text-gray-500 w-4 h-4" />
                                    <input
                                        type="time"
                                        required
                                        value={formData.time}
                                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white focus:border-purple-500 focus:outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-gray-400 text-sm mb-1">Special Note (Optional)</label>
                            <textarea
                                rows="2"
                                value={formData.note}
                                onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                                placeholder="Anything special in mind?..."
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-purple-500 focus:outline-none resize-none"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={status === 'sending'}
                            className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white font-medium shadow-lg shadow-purple-900/20 hover:shadow-purple-900/40 transform hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                        >
                            {status === 'sending' ? (
                                'Sending Request...'
                            ) : (
                                <>
                                    <Send size={18} />
                                    Book Date Night
                                </>
                            )}
                        </button>
                    </form>
                )}
            </motion.div>
        </div>
    );
};

export default DateScheduler;
