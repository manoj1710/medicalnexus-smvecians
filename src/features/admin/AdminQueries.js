import React from 'react';
import { motion } from 'framer-motion';
import { Filter, MoreVertical, Search, Download } from 'lucide-react';

const AdminQueries = () => {
    const queries = [
        { patient: "Sarah Wilson", uid: "#9920", symptoms: "Severe migrating headache", score: 8.4, specialist: "Dr. Miller (Neuro)", status: "Critical" },
        { patient: "James Brown", uid: "#9921", symptoms: "Sharp abdominal cramping", score: 6.2, specialist: "Dr. Chen (Internal)", status: "Pending" },
        { patient: "Emily Davis", uid: "#9922", symptoms: "Sore throat, mild fever", score: 2.5, specialist: "PCP General", status: "Routed" },
        { patient: "Michael Ross", uid: "#9923", symptoms: "Chest pressure, left arm pain", score: 9.8, specialist: "Dr. Vance (Cardio)", status: "Emergency" },
    ];

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300" />
                    <input
                        type="text"
                        placeholder="Search query by patient or symptom..."
                        className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-primary/5 outline-none font-medium shadow-sm"
                    />
                </div>
                <div className="flex items-center space-x-3">
                    <button className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-primary transition-all shadow-sm"><Filter className="h-5 w-5" /></button>
                    <button className="px-6 py-3 bg-slate-900 text-white font-bold rounded-2xl flex items-center space-x-2 shadow-lg shadow-slate-900/20 hover:bg-slate-800 transition-all">
                        <Download className="h-4 w-4" />
                        <span className="text-sm">Export Data</span>
                    </button>
                </div>
            </div>

            <div className="card-premium bg-white p-0 overflow-hidden shadow-2xl shadow-slate-200/50">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50/50">
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Patient Profile</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Clinical Presentation</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">AI Triage</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Assigned Specialist</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Network Status</th>
                                <th className="px-8 py-5"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {queries.map((q, i) => (
                                <motion.tr
                                    key={i}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: i * 0.05 }}
                                    className={`hover:bg-slate-50 transition-colors group ${q.score >= 8 ? 'bg-urgent/5' : ''}`}
                                >
                                    <td className="px-8 py-6">
                                        <p className="font-bold text-slate-900">{q.patient}</p>
                                        <p className="text-[10px] text-slate-400 font-black italic">{q.uid}</p>
                                    </td>
                                    <td className="px-8 py-6 text-sm text-slate-500 italic max-w-xs truncate">{q.symptoms}</td>
                                    <td className="px-8 py-6 text-center text-sm font-black tracking-tighter italic">
                                        <span className={`px-4 py-1.5 rounded-full ${q.score >= 8 ? 'text-urgent bg-urgent/10' : q.score >= 4 ? 'text-warning bg-warning/10' : 'text-safe bg-safe/10'}`}>
                                            {q.score}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-sm font-bold text-slate-700">{q.specialist}</td>
                                    <td className="px-8 py-6">
                                        <span className={`px-3 py-1 text-[9px] font-black uppercase rounded-lg tracking-widest ${q.status === 'Critical' ? 'bg-urgent text-white' : 'bg-slate-100 text-slate-400'}`}>
                                            {q.status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <button className="p-2 text-slate-300 hover:text-primary transition-colors"><MoreVertical className="h-5 w-5" /></button>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminQueries;
