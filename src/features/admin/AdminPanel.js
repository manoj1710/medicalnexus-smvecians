import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Users,
    MessageSquare,
    Calendar,
    BarChart3,
    Search,
    MoreVertical,
    ArrowUpRight,
    Filter,
    Download,
    ShieldCheck,
    AlertTriangle
} from 'lucide-react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area
} from 'recharts';

const AdminPanel = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const analyticsData = [
        { date: '02/19', queries: 85, urgent: 12 },
        { date: '02/20', queries: 92, urgent: 15 },
        { date: '02/21', queries: 78, urgent: 8 },
        { date: '02/22', queries: 110, urgent: 22 },
        { date: '02/23', queries: 95, urgent: 18 },
        { date: '02/24', queries: 105, urgent: 20 },
        { date: '02/25', queries: 120, urgent: 25 },
    ];

    const queries = [
        { id: '1', patient: 'Sarah Johnson', symptoms: 'Severe chest pain, left arm numbness', score: 9, specialist: 'Dr. Vance (Cardio)', status: 'Pending Approval', time: '10 mins ago' },
        { id: '2', patient: 'Michael Chen', symptoms: 'Abdominal cramping, nausea', score: 5, specialist: 'Dr. Sofia (Emergency)', status: 'Routed', time: '25 mins ago' },
        { id: '3', patient: 'Elena Rodriguez', symptoms: 'Migraine, visual aura, dizziness', score: 8, specialist: 'Dr. Miller (Neuro)', status: 'Waitlist', time: '45 mins ago' },
        { id: '4', patient: 'David Smith', symptoms: 'Sore throat, mild fever', score: 2, specialist: 'Dr. Rahman (GP)', status: 'Scheduled', time: '1 hr ago' },
        { id: '5', patient: 'James Wilson', symptoms: 'Possible ankle fracture', score: 7, specialist: 'Dr. Thorne (Ortho)', status: 'Emergency Room', time: '2 hrs ago' },
        { id: '6', patient: 'Anna Lee', symptoms: 'Skin rash, itching', score: 3, specialist: 'Dermatology Dept', status: 'Follow-up', time: '3 hrs ago' },
    ];

    const sidebarItems = [
        { name: 'Overview', icon: <BarChart3 className="h-5 w-5" />, active: true },
        { name: 'Queries', icon: <MessageSquare className="h-5 w-5" /> },
        { name: 'Appointments', icon: <Calendar className="h-5 w-5" /> },
        { name: 'Staff Analytics', icon: <Users className="h-5 w-5" /> },
        { name: 'Security', icon: <ShieldCheck className="h-5 w-5" /> },
    ];

    return (
        <div className="flex bg-[#F8FAFC] min-h-[calc(100vh-80px)]">
            {/* Mini Sidebar */}
            <aside className="w-20 lg:w-64 bg-white border-r border-slate-200 hidden md:flex flex-col">
                <div className="p-6 flex-1">
                    <nav className="space-y-2">
                        {sidebarItems.map((item) => (
                            <button
                                key={item.name}
                                className={`w-full flex items-center justify-center lg:justify-start lg:space-x-3 p-3 lg:px-4 rounded-2xl transition-all ${item.active
                                        ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                        : 'text-slate-500 hover:bg-slate-50 hover:text-primary'
                                    }`}
                            >
                                {item.icon}
                                <span className="hidden lg:block text-sm font-bold">{item.name}</span>
                            </button>
                        ))}
                    </nav>
                </div>
            </aside>

            {/* Main Admin Content */}
            <main className="flex-1 p-6 lg:p-10">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                        <div>
                            <h1 className="text-3xl font-black text-slate-900 tracking-tight">System Administration</h1>
                            <p className="text-slate-500 font-medium">Real-time medical triage & network oversight</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Filter by patient..."
                                    className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 outline-none w-64"
                                />
                            </div>
                            <button className="p-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
                                <Download className="h-5 w-5 text-slate-600" />
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
                        {/* Chart View */}
                        <div className="lg:col-span-2 card-premium bg-white p-8">
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900">Query Analytics</h3>
                                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Clinical Load (7D)</p>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center text-xs font-bold text-slate-500">
                                        <span className="w-3 h-3 bg-primary rounded-full mr-2" /> Total Queries
                                    </div>
                                    <div className="flex items-center text-xs font-bold text-slate-500">
                                        <span className="w-3 h-3 bg-urgent rounded-full mr-2" /> Urgent
                                    </div>
                                </div>
                            </div>
                            <div className="h-[280px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={analyticsData}>
                                        <defs>
                                            <linearGradient id="colorQueries" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#0F766E" stopOpacity={0.1} />
                                                <stop offset="95%" stopColor="#0F766E" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                        <XAxis
                                            dataKey="date"
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 700 }}
                                            dy={10}
                                        />
                                        <YAxis
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 700 }}
                                        />
                                        <Tooltip
                                            contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="queries"
                                            stroke="#0F766E"
                                            strokeWidth={3}
                                            fillOpacity={1}
                                            fill="url(#colorQueries)"
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="urgent"
                                            stroke="#DC2626"
                                            strokeWidth={3}
                                            strokeDasharray="5 5"
                                            fill="transparent"
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* System Health */}
                        <div className="space-y-6">
                            <div className="bg-slate-900 rounded-3xl p-8 text-white">
                                <h3 className="text-lg font-bold mb-6 flex items-center">
                                    <ShieldCheck className="h-5 w-5 mr-3 text-accent" /> Network Integrity
                                </h3>
                                <div className="space-y-6">
                                    <div className="flex justify-between items-end">
                                        <span className="text-xs font-bold text-slate-400 capitalize">AI Confidence Index</span>
                                        <span className="text-xl font-black text-accent">94.2%</span>
                                    </div>
                                    <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                                        <div className="bg-accent w-[94%] h-full rounded-full" />
                                    </div>

                                    <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                                        <div className="flex -space-x-3">
                                            {[1, 2, 3].map(i => (
                                                <img key={i} src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 10}`} className="w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-800" alt="avatar" />
                                            ))}
                                        </div>
                                        <span className="text-xs text-slate-400 font-bold">12 Active Staff</span>
                                    </div>
                                </div>
                            </div>

                            <div className="card-premium p-6 flex items-center justify-between border-urgent/10 bg-urgent/5">
                                <div className="flex items-center space-x-4">
                                    <div className="p-3 bg-urgent/10 rounded-2xl">
                                        <AlertTriangle className="h-6 w-6 text-urgent" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900">Incident Alert</h4>
                                        <p className="text-xs text-slate-500">Peak load detected in Cardiac.</p>
                                    </div>
                                </div>
                                <button className="text-urgent hover:scale-110 transition-transform">
                                    <ArrowUpRight className="h-6 w-6" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Table Area */}
                    <div className="card-premium bg-white overflow-hidden p-0">
                        <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                            <h3 className="text-xl font-bold text-slate-900">Clinical Triage Feed</h3>
                            <div className="flex space-x-2">
                                <button className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 italic transition-all flex items-center">
                                    <Filter className="h-3.5 w-3.5 mr-2" /> All Score Range
                                </button>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-slate-50/50">
                                        <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Patient Details</th>
                                        <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Description</th>
                                        <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Score</th>
                                        <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Assigned Route</th>
                                        <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                                        <th className="px-8 py-4"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {queries.map((q) => (
                                        <motion.tr
                                            key={q.id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className={`${q.score >= 8 ? 'bg-urgent/5' : ''} hover:bg-slate-50 transition-colors group`}
                                        >
                                            <td className="px-8 py-5">
                                                <p className="font-bold text-slate-900">{q.patient}</p>
                                                <p className="text-xs text-slate-400 font-medium tracking-tight">UID: #020{q.id}</p>
                                            </td>
                                            <td className="px-8 py-5 text-sm text-slate-500 max-w-xs">{q.symptoms}</td>
                                            <td className="px-8 py-5 text-center">
                                                <span className={`px-4 py-1 rounded-full text-xs font-black italic shadow-sm ${q.score >= 8 ? 'bg-urgent text-white' : q.score >= 4 ? 'bg-warning text-white' : 'bg-safe text-white'
                                                    }`}>
                                                    {q.score}/10
                                                </span>
                                            </td>
                                            <td className="px-8 py-5">
                                                <div className="flex items-center space-x-2">
                                                    <span className="font-semibold text-slate-700 text-sm">{q.specialist}</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5">
                                                <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-600 uppercase tracking-tighter">
                                                    {q.status}
                                                </span>
                                            </td>
                                            <td className="px-8 py-5 text-right opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="p-2 text-slate-400 hover:text-primary transition-colors">
                                                    <MoreVertical className="h-5 w-5" />
                                                </button>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="p-6 bg-slate-50/50 border-t border-slate-50 flex items-center justify-center">
                            <button className="text-xs font-bold text-primary hover:underline italic">Load more activity logs ...</button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminPanel;
