/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                rose: {
                    950: '#2c0b0e', // Deep rose background
                },
                forest: {
                    950: '#0c1a12', // Deep forest background
                },
                sky: {
                    950: '#081028', // Deep sky background
                }
            },
            fontFamily: {
                serif: ['"Playfair Display"', 'serif'],
                sans: ['"Inter"', 'sans-serif'],
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                }
            }
        },
    },
    plugins: [],
    darkMode: 'class', // We will manage themes via class or data attributes manually if needed, or just utility classes
}
