import React from 'react';
import Navbar from '../ui/Navbar';
import { motion } from 'framer-motion';

const MainLayout = ({ children }) => {
    return (
        <div className="min-h-screen bg-background font-sans">
            <Navbar />
            <motion.main
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="pt-20"
            >
                {children}
            </motion.main>
        </div>
    );
};

export default MainLayout;
