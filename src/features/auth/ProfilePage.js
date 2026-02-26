import React from 'react';
import { motion } from 'framer-motion';
import {
    User,
    Settings,
    Bell,
    Shield,
    LogOut,
    CreditCard,
    History,
    HeartPulse
} from 'lucide-react';

const ProfilePage = () => {
    const profile = {
        name: "Alex Thompson",
        role: "Patient / Clinical Tester",
        id: "MED-99201",
        email: "alex.t@clinical.nexus",
        joined: "Feb 2026",
        blood: "O- Positive",
        allergies: "Penicillin",
    };

    const sections = [
        { title: "Medical History", icon: <History className="h-5 w-5" />, color: "bg-primary/10 text-primary" },
        { title: "Vital Statistics", icon: <HeartPulse className="h-5 w-5" />, color: "bg-accent/10 text-accent" },
        { title: "Billing & Insurance", icon: <CreditCard className="h-5 w-5" />, color: "bg-slate-100 text-slate-600" },
        { title: "Security Settings", icon: <Shield className="h-5 w-5" />, color: "bg-slate-100 text-slate-600" },
    ];

    return (
        <div className="max-w-4xl mx-auto px-4 py-12 lg:py-20">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="card-premium bg-white p-8 lg:p-12"
            >
                <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-10 mb-12">
                    <div className="relative">
                        <img
                            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
                            className="w-32 h-32 rounded-3xl bg-slate-50 border-4 border-white shadow-xl"
                            alt="Profile"
                        />
                        <div className="absolute -bottom-2 -right-2 bg-primary p-2 rounded-xl text-white shadow-lg">
                            <Settings className="h-5 w-5" />
                        </div>
                    </div>

                    <div className="flex-1 text-center md:text-left">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                            <div>
                                <h1 className="text-3xl font-black text-slate-900 tracking-tight">{profile.name}</h1>
                                <p className="text-primary font-bold italic tracking-wide">{profile.role}</p>
                            </div>
                            <div className="flex space-x-2 justify-center">
                                <button className="p-3 bg-slate-50 text-slate-500 rounded-2xl hover:bg-slate-100 transition-colors">
                                    <Bell className="h-5 w-5" />
                                </button>
                                <button className="p-3 bg-slate-900 text-white rounded-2xl hover:bg-slate-800 transition-colors shadow-lg">
                                    Edit Profile
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</p>
                                <p className="text-sm font-bold text-safe uppercase flex items-center">
                                    <span className="w-1.5 h-1.5 rounded-full bg-safe mr-1.5 animate-pulse" /> Active
                                </p>
                            </div>
                            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Blood Group</p>
                                <p className="text-sm font-bold text-slate-700">{profile.blood}</p>
                            </div>
                            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">ID Number</p>
                                <p className="text-sm font-bold text-slate-700">{profile.id}</p>
                            </div>
                            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Member Since</p>
                                <p className="text-sm font-bold text-slate-700">{profile.joined}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-10 border-t border-slate-100">
                    {sections.map((section, idx) => (
                        <button
                            key={idx}
                            className="flex items-center justify-between p-6 rounded-2xl bg-white border border-slate-100 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all group"
                        >
                            <div className="flex items-center space-x-4">
                                <div className={`p-3 rounded-xl ${section.color} group-hover:scale-110 transition-transform`}>
                                    {section.icon}
                                </div>
                                <span className="font-bold text-slate-700">{section.title}</span>
                            </div>
                            <span className="text-slate-300 group-hover:text-primary transition-colors">→</span>
                        </button>
                    ))}
                </div>

                <div className="mt-12 p-8 rounded-3xl bg-slate-900 text-white relative overflow-hidden">
                    <div className="flex items-center justify-between relative z-10">
                        <div>
                            <h4 className="text-xl font-bold mb-1">Clinical AI Support</h4>
                            <p className="text-slate-400 text-sm">Need help interpreting your results?</p>
                        </div>
                        <button className="px-6 py-2 bg-primary text-white font-bold rounded-xl hover:bg-teal-800 transition-all text-xs">
                            Open AI Chat
                        </button>
                    </div>
                    <div className="absolute top-0 right-0 p-4 opacity-5 translate-x-1/4 -translate-y-1/4">
                        <User className="h-40 w-40" />
                    </div>
                </div>

                <button className="w-full mt-10 py-4 flex items-center justify-center space-x-2 text-urgent font-bold hover:bg-urgent/5 rounded-2xl transition-all">
                    <LogOut className="h-5 w-5" />
                    <span>Sign out from MedIntel Nexus</span>
                </button>
            </motion.div>
        </div>
    );
};

export default ProfilePage;
