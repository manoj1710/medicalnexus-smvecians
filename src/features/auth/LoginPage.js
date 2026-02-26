import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../state/AuthContext';
import { useNavigate } from 'react-router-dom';
import { User, ShieldCheck, Mail, Lock, ChevronRight, Stethoscope } from 'lucide-react';

const LoginPage = () => {
    const [role, setRole] = useState('Patient');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        login(role);
        if (role === 'Patient') {
            navigate('/patient/home');
        } else {
            navigate('/admin/dashboard');
        }
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full"
            >
                <div className="text-center mb-8">
                    <div className="inline-flex p-3 bg-primary rounded-2xl mb-4 shadow-lg shadow-primary/20">
                        <Stethoscope className="h-8 w-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">MedIntel <span className="text-primary italic">Nexus</span></h1>
                    <p className="text-slate-500 font-medium">Healthcare Clinical Triage & Smart Appointment System</p>
                </div>

                <div className="card-premium bg-white p-8">
                    <div className="flex p-1 bg-slate-100 rounded-2xl mb-8 relative">
                        <motion.div
                            className="absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] bg-white rounded-xl shadow-sm z-0"
                            animate={{ x: role === 'Patient' ? 0 : '100%' }}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        />
                        <button
                            onClick={() => setRole('Patient')}
                            className={`relative z-10 flex-1 py-3 flex items-center justify-center space-x-2 text-sm font-bold transition-colors ${role === 'Patient' ? 'text-primary' : 'text-slate-400'}`}
                        >
                            <User className="h-4 w-4" />
                            <span>Patient</span>
                        </button>
                        <button
                            onClick={() => setRole('Admin')}
                            className={`relative z-10 flex-1 py-3 flex items-center justify-center space-x-2 text-sm font-bold transition-colors ${role === 'Admin' ? 'text-primary' : 'text-slate-400'}`}
                        >
                            <ShieldCheck className="h-4 w-4" />
                            <span>Admin</span>
                        </button>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="name@healthcare.com"
                                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-primary/10 transition-all outline-none font-medium text-slate-700"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-primary/10 transition-all outline-none font-medium text-slate-700"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-4 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/20 hover:bg-teal-800 transition-all flex items-center justify-center group"
                        >
                            <span>Login as {role}</span>
                            <ChevronRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>

                    <div className="mt-8 pt-8 border-t border-slate-100 flex flex-col items-center space-y-4">
                        <p className="text-xs text-slate-400 font-medium italic">Role-based Access Control Enabled</p>
                        <div className="flex space-x-4">
                            <span className="px-3 py-1 bg-panel text-[10px] font-black text-slate-500 rounded-lg uppercase tracking-wider border border-slate-200">Patient Demo</span>
                            <span className="px-3 py-1 bg-panel text-[10px] font-black text-slate-500 rounded-lg uppercase tracking-wider border border-slate-200">Admin Demo</span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default LoginPage;
