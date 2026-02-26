import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Stethoscope, Menu, X, User, LogOut, HeartPulse, ClipboardList, Calendar, History } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../state/AuthContext';

const PatientLayout = ({ children }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navLinks = [
        { name: 'Home', path: '/patient/home', icon: <HeartPulse className="h-4 w-4" /> },
        { name: 'Assessment', path: '/patient/assessment', icon: <ClipboardList className="h-4 w-4" /> },
        { name: 'Booking', path: '/patient/booking', icon: <Calendar className="h-4 w-4" /> },
        { name: 'History', path: '/patient/history', icon: <History className="h-4 w-4" /> },
    ];

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-slate-100 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-20">
                        <div className="flex items-center">
                            <Link to="/patient/home" className="flex items-center space-x-2 group">
                                <div className="p-2 bg-primary rounded-xl group-hover:scale-110 transition-transform">
                                    <Stethoscope className="h-6 w-6 text-white" />
                                </div>
                                <span className="text-xl font-bold text-slate-900 tracking-tight">MedIntel <span className="text-primary italic">Nexus</span></span>
                            </Link>
                        </div>

                        <div className="hidden md:flex items-center space-x-8">
                            {navLinks.map((link) => (
                                <NavLink
                                    key={link.name}
                                    to={link.path}
                                    className={({ isActive }) =>
                                        `relative text-sm font-semibold flex items-center space-x-2 transition-colors duration-200 ${isActive ? 'text-primary' : 'text-slate-600 hover:text-primary'}`
                                    }
                                >
                                    {({ isActive }) => (
                                        <>
                                            {link.icon}
                                            <span>{link.name}</span>
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
                            <div className="flex items-center space-x-4 pl-8 border-l border-slate-100">
                                <Link to="/patient/profile" className="p-2 text-slate-500 hover:text-primary transition-colors">
                                    <User className="h-5 w-5" />
                                </Link>
                                <button onClick={handleLogout} className="p-2 text-slate-500 hover:text-urgent transition-colors">
                                    <LogOut className="h-5 w-5" />
                                </button>
                            </div>
                        </div>

                        <div className="md:hidden flex items-center">
                            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600 hover:text-primary p-2">
                                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                            </button>
                        </div>
                    </div>
                </div>

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
                                            `block px-3 py-4 rounded-xl text-base font-semibold transition-all ${isActive ? 'bg-primary/10 text-primary' : 'text-slate-600 hover:bg-slate-50'}`
                                        }
                                    >
                                        {link.name}
                                    </NavLink>
                                ))}
                                <div className="pt-4 border-t border-slate-50 space-y-2">
                                    <Link to="/patient/profile" onClick={() => setIsOpen(false)} className="block px-3 py-4 rounded-xl text-base font-semibold text-slate-600 hover:bg-slate-50">Profile</Link>
                                    <button onClick={handleLogout} className="w-full text-left px-3 py-4 rounded-xl text-base font-semibold text-urgent hover:bg-urgent/5">Logout</button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            <main className="pt-20 px-4">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    {children}
                </motion.div>
            </main>
        </div>
    );
};

export default PatientLayout;
