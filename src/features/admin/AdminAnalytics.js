import React from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Activity, TrendingUp, Users, AlertTriangle, CircleDot } from 'lucide-react';

const AdminAnalytics = () => {
    const lineData = [
        { name: 'Mon', load: 120 }, { name: 'Tue', load: 156 }, { name: 'Wed', load: 210 },
        { name: 'Thu', load: 184 }, { name: 'Fri', load: 245 }, { name: 'Sat', load: 190 }, { name: 'Sun', load: 140 },
    ];

    const pieData = [
        { name: 'Cardiology', value: 400 },
        { name: 'Neurology', value: 300 },
        { name: 'Orthopedics', value: 300 },
        { name: 'General', value: 200 },
    ];

    const COLORS = ['#0F766E', '#22D3EE', '#14B8A6', '#94A3B8'];
    const totalSpecialists = pieData.reduce((sum, item) => sum + item.value, 0);
    const peakDay = lineData.reduce((max, day) => (day.load > max.load ? day : max), lineData[0]);
    const avgLoad = Math.round(lineData.reduce((sum, day) => sum + day.load, 0) / lineData.length);
    const growth = Math.round(((lineData[lineData.length - 1].load - lineData[0].load) / lineData[0].load) * 100);

    return (
        <div className="space-y-8 lg:space-y-10">
            <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-5"
            >
                <div className="card-premium p-5 lg:p-6 bg-gradient-to-br from-teal-50 to-white border-teal-100">
                    <div className="flex items-center justify-between mb-5">
                        <p className="text-xs font-black uppercase tracking-widest text-slate-500">Avg Daily Load</p>
                        <Activity className="h-5 w-5 text-primary" />
                    </div>
                    <p className="text-3xl font-black text-slate-900">{avgLoad}</p>
                    <p className="text-xs text-slate-500 mt-2">Across the last 7 days</p>
                </div>

                <div className="card-premium p-5 lg:p-6">
                    <div className="flex items-center justify-between mb-5">
                        <p className="text-xs font-black uppercase tracking-widest text-slate-500">Peak Utilization</p>
                        <TrendingUp className="h-5 w-5 text-accent" />
                    </div>
                    <p className="text-3xl font-black text-slate-900">{peakDay.load}</p>
                    <p className="text-xs text-slate-500 mt-2">Highest on {peakDay.name}</p>
                </div>

                <div className="card-premium p-5 lg:p-6">
                    <div className="flex items-center justify-between mb-5">
                        <p className="text-xs font-black uppercase tracking-widest text-slate-500">Specialist Pool</p>
                        <Users className="h-5 w-5 text-primary" />
                    </div>
                    <p className="text-3xl font-black text-slate-900">{totalSpecialists}</p>
                    <p className="text-xs text-slate-500 mt-2">Active specialist capacity</p>
                </div>

                <div className="card-premium p-5 lg:p-6">
                    <div className="flex items-center justify-between mb-5">
                        <p className="text-xs font-black uppercase tracking-widest text-slate-500">Weekly Shift</p>
                        <AlertTriangle className={`h-5 w-5 ${growth >= 0 ? 'text-warning' : 'text-safe'}`} />
                    </div>
                    <p className={`text-3xl font-black ${growth >= 0 ? 'text-warning' : 'text-safe'}`}>{growth >= 0 ? `+${growth}` : growth}%</p>
                    <p className="text-xs text-slate-500 mt-2">Load change Mon to Sun</p>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 }}
                    className="card-premium p-6 lg:p-8 h-[400px] lg:h-[440px]"
                >
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                        <h3 className="text-xl font-bold">Daily Network Load</h3>
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-slate-50 border border-slate-200">
                            <CircleDot className="h-3 w-3 text-primary mr-2" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Realtime Capacity</span>
                        </div>
                    </div>
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={lineData}>
                            <defs>
                                <linearGradient id="colorLoad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#0F766E" stopOpacity={0.1} />
                                    <stop offset="95%" stopColor="#0F766E" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} />
                            <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                            <Area type="monotone" dataKey="load" stroke="#0F766E" strokeWidth={3} fillOpacity={1} fill="url(#colorLoad)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.12 }}
                    className="card-premium p-6 lg:p-8 h-[400px] lg:h-[440px]"
                >
                    <h3 className="text-xl font-bold mb-6">Specialist Distribution</h3>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={pieData}
                                cx="50%"
                                cy="50%"
                                innerRadius={80}
                                outerRadius={120}
                                fill="#8884d8"
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="card-premium p-6 lg:p-8"
            >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    <div>
                        <h4 className="text-lg font-black text-slate-900 mb-2">Operational Insights</h4>
                        <p className="text-slate-500 text-sm max-w-2xl">
                            Cardiology and Neurology currently consume the highest routing volume. Maintain surge coverage for late-week spikes and rebalance weekend staffing where projected load drops.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 w-full lg:w-auto">
                        {pieData.map((item, idx) => (
                            <div key={item.name} className="px-4 py-3 rounded-xl border border-slate-100 bg-slate-50/60 min-w-[160px]">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: COLORS[idx] }} />
                                    <p className="text-xs font-black uppercase tracking-wider text-slate-500">{item.name}</p>
                                </div>
                                <p className="text-xl font-black text-slate-900">{Math.round((item.value / totalSpecialists) * 100)}%</p>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default AdminAnalytics;
