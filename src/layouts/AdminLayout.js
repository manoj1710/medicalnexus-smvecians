import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
    BarChart3,
    MessageSquare,
    Calendar,
    ShieldCheck,
    LogOut,
    Stethoscope,
    ChevronRight,
    TrendingUp
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../state/AuthContext';

const AdminLayout = ({ children }) => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const menuItems = [
        { name: 'Dashboard', path: '/admin/dashboard', icon: <BarChart3 className="h-5 w-5" /> },
        { name: 'Queries', path: '/admin/queries', icon: <MessageSquare className="h-5 w-5" /> },
        { name: 'Appointments', path: '/admin/appointments', icon: <Calendar className="h-5 w-5" /> },
        { name: 'Analytics', path: '/admin/analytics', icon: <TrendingUp className="h-5 w-5" /> },
        { name: 'Security', path: '/admin/security', icon: <ShieldCheck className="h-5 w-5" /> },
    ];

    return (
        <div className="flex bg-[#F8FAFC] min-h-screen">
            {/* Admin Sidebar */}
            <aside className="w-20 lg:w-64 bg-slate-900 border-r border-slate-800 flex flex-col fixed h-full z-50">
                <div className="p-6 mb-8 flex items-center justify-center lg:justify-start lg:space-x-3">
                    <div className="p-2 bg-primary rounded-xl shrink-0">
                        <Stethoscope className="h-6 w-6 text-white" />
                    </div>
                    <span className="hidden lg:block text-white font-black text-xl tracking-tight">MedIntel <span className="text-primary italic">Nexus</span></span>
                </div>

                <nav className="flex-1 px-4 space-y-2">
                    {menuItems.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            className={({ isActive }) =>
                                `w-full flex items-center justify-center lg:justify-start lg:space-x-4 p-4 rounded-2xl transition-all group ${isActive
                                    ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                    : 'text-slate-400 hover:bg-white/5 hover:text-white'
                                }`
                            }
                        >
                            <div className="shrink-0">{item.icon}</div>
                            <span className="hidden lg:block text-sm font-bold tracking-tight">{item.name}</span>
                            <ChevronRight className="hidden lg:block h-4 w-4 ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                        </NavLink>
                    ))}
                </nav>

                <div className="p-4 border-t border-white/5">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center lg:justify-start lg:space-x-4 p-4 rounded-2xl text-slate-400 hover:bg-urgent/10 hover:text-urgent transition-all"
                    >
                        <LogOut className="h-5 w-5 shrink-0" />
                        <span className="hidden lg:block text-sm font-bold">Logout System</span>
                    </button>
                </div>
            </aside>

            {/* Admin Content Area */}
            <div className="flex-1 ml-20 lg:ml-64">
                <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-8 sticky top-0 z-40 backdrop-blur-md bg-white/80">
                    <h2 className="text-xl font-bold text-slate-900 tracking-tight">System Administration</h2>
                    <div className="flex items-center space-x-4">
                        <span className="text-[10px] font-black italic bg-primary/10 text-primary px-3 py-1 rounded-full uppercase tracking-widest">Global Oversight Active</span>
                        <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200" />
                    </div>
                </header>

                <main className="p-8 lg:p-12">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
