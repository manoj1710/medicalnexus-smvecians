import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Users, AlertCircle, Terminal, Lock } from 'lucide-react';

const AdminSecurity = () => {
    return (
        <div className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-8">
                    <div className="card-premium bg-slate-900 p-10 text-white flex flex-col justify-between">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="text-2xl font-black mb-2 tracking-tight">AI Confidence Monitor</h3>
                                <p className="text-slate-500 text-sm italic font-medium">Neural Triage Accuracy Index</p>
                            </div>
                            <div className="p-4 bg-primary/20 rounded-3xl border border-primary/20">
                                <ShieldCheck className="h-10 w-10 text-primary" />
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="flex justify-between items-end">
                                <span className="text-sm font-bold text-slate-400">Model Reliability Score</span>
                                <span className="text-4xl font-black text-accent tracking-tighter">98.4%</span>
                            </div>
                            <div className="w-full bg-white/5 h-3 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: '98.4%' }}
                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                    className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                                />
                            </div>
                            <div className="flex justify-between items-center pt-4 border-t border-white/5">
                                <div className="flex -space-x-3">
                                    {[1, 2, 3, 4].map(i => (
                                        <img key={i} src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 100}`} className="w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-800" alt="Admin" />
                                    ))}
                                    <div className="w-10 h-10 rounded-full bg-slate-800 border-2 border-slate-900 flex items-center justify-center text-[10px] font-bold text-slate-400">+8</div>
                                </div>
                                <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">12 Clinical Ops Active</p>
                            </div>
                        </div>
                    </div>

                    <div className="card-premium p-8 bg-white border-urgent/10 bg-urgent/5">
                        <div className="flex items-center space-x-4 mb-6">
                            <div className="p-3 bg-urgent/10 rounded-2xl">
                                <AlertCircle className="h-6 w-6 text-urgent" />
                            </div>
                            <h4 className="text-xl font-bold text-slate-900 uppercase tracking-tighter italic">Critical Incident Alert</h4>
                        </div>
                        <p className="text-slate-600 font-medium mb-6">Unusually high triage volume detected in Cardiac network (New York Node). Automatic resource reallocation deployed.</p>
                        <div className="p-4 rounded-xl bg-urgent/10 border border-urgent/10 font-mono text-xs text-urgent">
                            ERR_NODE_PEAK_LOAD: NY_CENTRAL_CARDIO :: 240% AVG
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="card-premium p-8 bg-white">
                        <h4 className="font-bold text-slate-900 mb-6 flex items-center">
                            <Terminal className="h-4 w-4 mr-2 text-slate-400" />
                            System Audit Log
                        </h4>
                        <div className="space-y-6">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="flex space-x-3 opacity-60 hover:opacity-100 transition-opacity">
                                    <div className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-1.5" />
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-700">Auth success: admin_992</p>
                                        <p className="text-[10px] text-slate-400">10:4{i} AM · 192.168.1.{i}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="card-premium p-8 bg-slate-100 border-dashed border-2 border-slate-200 shadow-none">
                        <div className="flex flex-col items-center text-center">
                            <Lock className="h-10 w-10 text-slate-300 mb-4" />
                            <h5 className="font-bold text-slate-400">Encryption Active</h5>
                            <p className="text-[10px] text-slate-400 mt-1">AES-256 Medical Data Wrapper</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminSecurity;
