import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { History, Calendar, Stethoscope, ChevronRight, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PatientHistory = () => {
    const navigate = useNavigate();
    const records = useMemo(() => {
        const stored = JSON.parse(localStorage.getItem('triageHistory') || '[]');
        return Array.isArray(stored) ? stored : [];
    }, []);

    return (
        <div className="max-w-7xl mx-auto py-10 lg:py-16">
            <div className="mb-12">
                <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Clinical History</h1>
                <p className="text-slate-500 font-medium">Your historical triage records and assessment scores.</p>
            </div>

            {records.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="card-premium bg-white p-10 md:p-14 text-center flex flex-col items-center"
                >
                    <div className="p-5 rounded-full bg-slate-50 border border-slate-100 mb-6">
                        <Activity className="h-10 w-10 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">No previous assessments</h3>
                    <p className="text-slate-500 max-w-md mb-7">Your AI triage history will appear here.</p>
                    <button
                        onClick={() => navigate('/patient/assessment')}
                        className="btn-primary w-full sm:w-auto"
                    >
                        Start New Assessment
                    </button>
                </motion.div>
            ) : (
                <div className="card-premium bg-white p-0 overflow-hidden shadow-2xl shadow-slate-200/50">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-slate-50/50">
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Date</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Symptoms Analyzed</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Triage Score</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Specialist</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                                    <th className="px-8 py-5"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50 transition-colors">
                                {records.map((record, i) => (
                                    <motion.tr
                                        key={i}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="hover:bg-slate-50/80 group cursor-pointer"
                                    >
                                        <td className="px-8 py-6 font-bold text-slate-600 flex items-center">
                                            <Calendar className="h-4 w-4 mr-3 text-slate-300" />
                                            {record.date}
                                        </td>
                                        <td className="px-8 py-6 text-sm text-slate-500 max-w-xs truncate">{record.symptoms}</td>
                                        <td className="px-8 py-6 text-center">
                                            <span className={`px-4 py-1.5 rounded-full text-xs font-black shadow-sm ${record.score >= 8 ? 'bg-urgent/10 text-urgent' : record.score >= 4 ? 'bg-warning/10 text-warning' : 'bg-safe/10 text-safe'
                                                }`}>
                                                {record.score}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center text-sm font-bold text-slate-700">
                                                <Stethoscope className="h-4 w-4 mr-2 text-primary/40" />
                                                {record.specialist}
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="text-[10px] font-black uppercase text-slate-400 flex items-center">
                                                <span className="w-1.5 h-1.5 rounded-full bg-slate-300 mr-2" />
                                                {record.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <ChevronRight className="h-5 w-5 text-slate-200 group-hover:text-primary transition-colors inline" />
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            <div className="mt-12 flex justify-center">
                <button className="flex items-center space-x-2 text-slate-400 hover:text-primary font-bold italic text-sm transition-colors">
                    <History className="h-4 w-4" />
                    <span>Request full clinical data export (PDF)</span>
                </button>
            </div>
        </div>
    );
};

export default PatientHistory;
