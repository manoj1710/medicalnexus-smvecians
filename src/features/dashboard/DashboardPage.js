import React from 'react';
import { motion } from 'framer-motion';
import {
    Activity,
    Users,
    Calendar,
    AlertTriangle,
    ArrowUpRight,
    ChevronRight,
    ClipboardList,
    LayoutDashboard,
    Settings,
    HelpCircle
} from 'lucide-react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell
} from 'recharts';

const DashboardPage = () => {
    const kpis = [
        { label: 'Total Queries', value: '1,284', icon: <ClipboardList className="h-6 w-6 text-primary" />, trend: '+12%', color: 'bg-primary/10' },
        { label: 'Urgent Cases', value: '42', icon: <AlertTriangle className="h-6 w-6 text-urgent" />, trend: 'High Priority', color: 'bg-urgent/10' },
        { label: 'Appointments Today', value: '18', icon: <Calendar className="h-6 w-6 text-accent" />, trend: 'Next: 2:00 PM', color: 'bg-accent/10' },
        { label: 'Avg Triage Score', value: '4.8', icon: <Activity className="h-6 w-6 text-safe" />, trend: '-0.5', color: 'bg-safe/10' },
    ];

    const chartData = [
        { name: 'Cardiology', appointments: 12 },
        { name: 'Neurology', appointments: 8 },
        { name: 'Pediatrics', appointments: 15 },
        { name: 'Orthopedics', appointments: 10 },
        { name: 'Dermatology', appointments: 6 },
        { name: 'General', appointments: 22 },
    ];

    const urgentCases = [
        { id: 'QA-882', patient: 'Sarah Johnson', symptoms: 'Chest pain, shortness of breath', score: 9 },
        { id: 'QA-885', patient: 'Michael Chen', symptoms: 'Severe abdominal pain', score: 8 },
        { id: 'QA-889', patient: 'Elena Rodriguez', symptoms: 'Sudden vision loss (Right eye)', score: 10 },
    ];

    const sidebarLinks = [
        { name: 'Overview', icon: <LayoutDashboard className="h-5 w-5" />, active: true },
        { name: 'Patient Files', icon: <Users className="h-5 w-5" /> },
        { name: 'Schedule', icon: <Calendar className="h-5 w-5" /> },
        { name: 'Settings', icon: <Settings className="h-5 w-5" /> },
        { name: 'Help Support', icon: <HelpCircle className="h-5 w-5" /> },
    ];

    return (
        <div className="flex bg-slate-50 min-h-[calc(100vh-80px)]">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-slate-200 hidden lg:block overflow-y-auto">
                <div className="p-6">
                    <nav className="space-y-2">
                        {sidebarLinks.map((link) => (
                            <button
                                key={link.name}
                                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${link.active
                                        ? 'bg-primary text-white shadow-md shadow-primary/20'
                                        : 'text-slate-500 hover:bg-slate-50 hover:text-primary'
                                    }`}
                            >
                                {link.icon}
                                <span>{link.name}</span>
                            </button>
                        ))}
                    </nav>

                    <div className="mt-10 pt-10 border-t border-slate-100">
                        <div className="p-4 rounded-2xl bg-gradient-to-br from-primary to-teal-800 text-white shadow-xl shadow-primary/20">
                            <p className="text-xs font-medium text-teal-100 mb-2 uppercase tracking-wider">System Status</p>
                            <h4 className="font-bold mb-4">MedIntel Nexus AI</h4>
                            <div className="space-y-2 text-xs text-teal-50">
                                <div className="flex justify-between">
                                    <span>Accuracy</span>
                                    <span>98.4%</span>
                                </div>
                                <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden">
                                    <div className="bg-white w-[98%] h-full rounded-full" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 lg:p-10 overflow-y-auto">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                        <div>
                            <h2 className="text-3xl font-extrabold text-slate-900">Clinical Overview</h2>
                            <p className="text-slate-500 mt-1">Intelligent summary of current facility status</p>
                        </div>
                        <div className="flex space-x-3">
                            <button className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-sm font-semibold text-slate-700 hover:border-primary transition-colors">
                                Export Data
                            </button>
                            <button className="px-4 py-2 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-teal-800 transition-colors shadow-lg shadow-primary/10">
                                Today's Schedule
                            </button>
                        </div>
                    </div>

                    {/* KPI Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                        {kpis.map((kpi, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: idx * 0.1 }}
                                whileHover={{ scale: 1.02 }}
                                className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 group transition-all hover:shadow-xl hover:shadow-slate-200/50"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className={`p-3 rounded-xl ${kpi.color} group-hover:scale-110 transition-transform`}>
                                        {kpi.icon}
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{kpi.label}</span>
                                </div>
                                <div className="flex items-end justify-between">
                                    <h3 className="text-3xl font-black text-slate-900">{kpi.value}</h3>
                                    <div className="flex items-center text-xs font-bold text-slate-500">
                                        <span className={kpi.label === 'Urgent Cases' ? 'text-urgent' : 'text-primary'}>{kpi.trend}</span>
                                        <ArrowUpRight className="h-3 w-3 ml-1" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Chart Area */}
                        <div className="lg:col-span-2 space-y-8">
                            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                                <div className="flex items-center justify-between mb-8">
                                    <h3 className="text-xl font-bold text-slate-900">Appointments by Department</h3>
                                    <select className="bg-slate-50 border-none text-xs font-bold text-slate-500 rounded-lg px-3 py-2 outline-none cursor-pointer">
                                        <option>Last 7 Days</option>
                                        <option>Month to date</option>
                                    </select>
                                </div>
                                <div className="h-[300px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={chartData}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                            <XAxis
                                                dataKey="name"
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }}
                                                dy={10}
                                            />
                                            <YAxis
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }}
                                            />
                                            <Tooltip
                                                cursor={{ fill: '#f8fafc' }}
                                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                            />
                                            <Bar dataKey="appointments" radius={[6, 6, 0, 0]} barSize={40}>
                                                {chartData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={index === 5 ? '#0F766E' : '#22D3EE'} />
                                                ))}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* Quick Actions */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="p-6 rounded-2xl bg-accent/5 border border-accent/10 hover:bg-accent/10 transition-colors cursor-pointer group">
                                    <h4 className="font-bold text-slate-900 mb-2 flex items-center">
                                        Review Wait Times <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                    </h4>
                                    <p className="text-sm text-slate-500">Predictive analysis of peak load hours today.</p>
                                </div>
                                <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10 hover:bg-primary/10 transition-colors cursor-pointer group">
                                    <h4 className="font-bold text-slate-900 mb-2 flex items-center">
                                        Resource Allocation <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                    </h4>
                                    <p className="text-sm text-slate-500">Reassign staff based on current triage density.</p>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar / List Area */}
                        <div className="space-y-8">
                            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
                                    Recent Urgent Cases
                                    <span className="ml-3 px-2 py-0.5 bg-urgent/10 text-urgent text-[10px] uppercase font-black rounded-lg">High Risk</span>
                                </h3>
                                <div className="space-y-4">
                                    {urgentCases.map((item, idx) => (
                                        <motion.div
                                            key={item.id}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.5 + idx * 0.1 }}
                                            className="p-4 rounded-xl bg-slate-50 border-l-4 border-urgent group hover:bg-urgent/5 transition-colors cursor-pointer"
                                        >
                                            <div className="flex justify-between items-start mb-2">
                                                <span className="text-xs font-bold text-slate-400">{item.id}</span>
                                                <span className="text-sm font-black text-urgent animate-pulse">{item.score}/10</span>
                                            </div>
                                            <h4 className="font-bold text-slate-900 leading-tight mb-1">{item.patient}</h4>
                                            <p className="text-xs text-slate-500 line-clamp-1">{item.symptoms}</p>
                                        </motion.div>
                                    ))}
                                </div>
                                <button className="w-full mt-6 py-3 rounded-xl bg-slate-50 text-slate-600 text-sm font-bold hover:bg-slate-100 transition-colors">
                                    View All Urgent Cases
                                </button>
                            </div>

                            <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-150 transition-transform duration-700">
                                    <Activity className="h-40 w-40" />
                                </div>
                                <h3 className="text-2xl font-bold mb-4 relative z-10">Smart Triage Pro <span className="text-accent underline decoration-accent/30 italic">2.0</span></h3>
                                <p className="text-slate-400 text-sm leading-relaxed mb-8 relative z-10">
                                    Our latest neural model is now active, providing 15% better diagnosis accuracy for neurological symptoms.
                                </p>
                                <button className="w-full py-3 rounded-xl bg-white text-slate-900 text-sm font-black hover:bg-accent transition-all relative z-10">
                                    Explore Updates
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DashboardPage;
