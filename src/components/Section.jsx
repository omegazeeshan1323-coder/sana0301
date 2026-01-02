import React from 'react';
import { motion } from 'framer-motion';

const Section = ({ children, className = "" }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`w-full ${className}`}
        >
            {children}
        </motion.div>
    );
};

export default Section;
