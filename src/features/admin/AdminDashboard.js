import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Users, MessageSquare, Activity, ArrowUpRight, AlertTriangle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const AdminDashboard = () => {
    const kpis = [
        { title: "Total Queries", value: "1,284", delta: "+12.5%", icon: <MessageSquare className="h-5 w-5 text-primary" />, color: "bg-primary/10 text-primary" },
        { title: "Urgent Cases", value: "48", delta: "+3", icon: <AlertTriangle className="h-5 w-5 text-urgent" />, color: "bg-urgent/10 text-urgent" },
        { title: "Appointments Today", value: "256", delta: "-4%", icon: <BarChart3 className="h-5 w-5 text-accent" />, color: "bg-accent/10 text-accent" },
        { title: "Avg Triage Score", value: "5.4", delta: "Stable", icon: <Activity className="h-5 w-5 text-safe" />, color: "bg-safe/10 text-safe" },
    ];

    const chartData = [
        { name: 'Cardio', appointments: 65 },
        { name: 'Neuro', appointments: 42 },
        { name: 'Ortho', appointments: 38 },
        { name: 'ER', appointments: 52 },
        { name: 'PCP', appointments: 59 },
    ];

    const urgentCases = [
        { name: "John Doe", symptoms: "Chest pain, dizziness", score: 9.2, time: "10m ago" },
        { name: "Maria Garcia", symptoms: "Left arm numbness", score: 8.8, time: "15m ago" },
        { name: "Robert Smith", symptoms: "Severe abdominal pain", score: 8.5, time: "25m ago" },
    ];

    return (
        <div className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {kpis.map((kpi, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="card-premium p-6"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 rounded-xl ${kpi.color}`}>{kpi.icon}</div>
                            <span className={`text-[10px] font-black italic ${kpi.delta.includes('+') ? 'text-safe' : 'text-slate-400'}`}>{kpi.delta}</span>
                        </div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{kpi.title}</p>
                        <p className="text-2xl font-black text-slate-900 mt-1">{kpi.value}</p>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 card-premium p-8 h-[400px] flex flex-col">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-xl font-bold text-slate-900">Appointments by Department</h3>
                        <span className="text-xs text-slate-400 font-bold italic">Real-time Load Balancing</span>
                    </div>
                    <div className="flex-1">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 700 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 700 }} />
                                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }} />
                                <Bar dataKey="appointments" radius={[6, 6, 0, 0]} barSize={40}>
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={index === 0 ? '#0F766E' : '#22D3EE'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="card-premium p-8 bg-white overflow-hidden">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-xl font-bold text-slate-900">Urgent Triage</h3>
                        <button className="text-primary hover:scale-110 transition-transform"><ArrowUpRight className="h-6 w-6" /></button>
                    </div>
                    <div className="space-y-4">
                        {urgentCases.map((c, i) => (
                            <div key={i} className="p-4 rounded-2xl bg-urgent/5 border border-urgent/10 flex items-center justify-between group hover:bg-urgent/10 transition-all">
                                <div className="flex items-center space-x-4">
                                    <div className="w-2 h-10 bg-urgent rounded-full" />
                                    <div>
                                        <h4 className="font-bold text-slate-900">{c.name}</h4>
                                        <p className="text-xs text-slate-500 truncate max-w-[120px]">{c.symptoms}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="text-sm font-black text-urgent">{c.score}</span>
                                    <p className="text-[10px] text-slate-400 font-bold">{c.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-8 py-4 bg-slate-50 text-slate-400 text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-slate-100 transition-all italic">View All High Risk Events</button>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
