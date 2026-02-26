import React from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, Calendar, Activity, ChevronRight, ArrowUpRight, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const PatientHome = () => {
    const stats = [
        { title: "Last Triage Score", value: "7.2", trend: "Stable", icon: <Activity className="h-5 w-5 text-accent" />, color: "bg-accent/10" },
        { title: "Upcoming Appts", value: "1", trend: "Mar 12", icon: <Calendar className="h-5 w-5 text-primary" />, color: "bg-primary/10" },
        { title: "Health Index", value: "Normal", trend: "+2%", icon: <Heart className="h-5 w-5 text-safe" />, color: "bg-safe/10" }
    ];

    return (
        <div className="max-w-7xl mx-auto py-10 lg:py-16">
            <div className="mb-12">
                <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Welcome back, Alex.</h1>
                <p className="text-slate-500 font-medium">Ready to assess your symptoms or book a specialist?</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {stats.map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="card-premium p-6 flex items-center justify-between"
                    >
                        <div className="flex items-center space-x-4">
                            <div className={`p-3 rounded-2xl ${stat.color}`}>
                                {stat.icon}
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.title}</p>
                                <p className="text-xl font-black text-slate-900">{stat.value}</p>
                            </div>
                        </div>
                        <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded-lg">
                            {stat.trend}
                        </span>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="card-premium bg-slate-900 p-10 text-white relative overflow-hidden group"
                >
                    <div className="relative z-10">
                        <h3 className="text-3xl font-black mb-4 tracking-tight">AI Clinical Triage</h3>
                        <p className="text-slate-400 mb-8 max-w-sm">Experience our neural-guided symptom assessment and get routed to the right care in seconds.</p>
                        <Link to="/patient/assessment" className="btn-primary inline-flex items-center space-x-2">
                            <span>Start New Assessment</span>
                            <BrainCircuit className="h-5 w-5" />
                        </Link>
                    </div>
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <BrainCircuit className="h-60 w-60" />
                    </div>
                </motion.div>

                <div className="space-y-8">
                    <div className="card-premium p-8 bg-white h-full flex flex-col justify-between">
                        <div className="flex items-center justify-between mb-8">
                            <h4 className="text-xl font-bold text-slate-900">AI Health Insights</h4>
                            <button className="text-primary hover:scale-110 transition-transform">
                                <ArrowUpRight className="h-6 w-6" />
                            </button>
                        </div>
                        <div className="space-y-4">
                            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                                <p className="text-sm font-bold text-slate-700">Recommended: Hydration Intake</p>
                                <p className="text-xs text-slate-500 mt-1">Based on last assessment, increase water intake to improve metabolic stability.</p>
                            </div>
                            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                                <p className="text-sm font-bold text-slate-700">Wait-time Notice</p>
                                <p className="text-xs text-slate-500 mt-1">Cardiac specialists have low wait times near you today.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PatientHome;
