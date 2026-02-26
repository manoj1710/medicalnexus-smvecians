import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Stethoscope, Menu, X, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    const navLinks = [
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'Assessment', path: '/assessment' },
        { name: 'Booking', path: '/booking' },
        { name: 'Admin', path: '/admin' },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-slate-100 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center space-x-2 group">
                            <div className="p-2 bg-primary rounded-xl group-hover:scale-110 transition-transform">
                                <Stethoscope className="h-6 w-6 text-white" />
                            </div>
                            <span className="text-xl font-bold text-slate-900 tracking-tight">
                                MedIntel <span className="text-primary italic">Nexus</span>
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.name}
                                to={link.path}
                                className={({ isActive }) =>
                                    `relative text-sm font-semibold transition-colors duration-200 ${isActive ? 'text-primary' : 'text-slate-600 hover:text-primary'
                                    }`
                                }
                            >
                                {({ isActive }) => (
                                    <>
                                        {link.name}
                                        {isActive && (
                                            <motion.div
                                                layoutId="nav-underline"
                                                className="absolute -bottom-[26px] left-0 right-0 h-1 bg-primary rounded-full"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ duration: 0.3 }}
                                            />
                                        )}
                                    </>
                                )}
                            </NavLink>
                        ))}
                        <Link
                            to="/profile"
                            className="flex items-center space-x-2 p-2 px-4 rounded-full bg-panel text-slate-700 hover:bg-slate-200 transition-colors"
                        >
                            <User className="h-4 w-4" />
                            <span className="text-sm font-medium">Profile</span>
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-slate-600 hover:text-primary p-2"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="md:hidden bg-white border-b border-slate-100 overflow-hidden"
                    >
                        <div className="px-4 pt-2 pb-6 space-y-1">
                            {navLinks.map((link) => (
                                <NavLink
                                    key={link.name}
                                    to={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className={({ isActive }) =>
                                        `block px-3 py-4 rounded-xl text-base font-semibold transition-all ${isActive ? 'bg-primary/10 text-primary' : 'text-slate-600 hover:bg-slate-50'
                                        }`
                                    }
                                >
                                    {link.name}
                                </NavLink>
                            ))}
                            <Link
                                to="/profile"
                                className="block px-3 py-4 rounded-xl text-base font-semibold text-slate-600 hover:bg-slate-50"
                            >
                                Profile
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
