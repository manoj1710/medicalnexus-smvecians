import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Stethoscope, Calendar, ChevronRight } from 'lucide-react';

const CONFIRMED_APPOINTMENTS_KEY = 'medintel_confirmed_appointments';

const sortByTime = (items) => {
    const toMinutes = (t) => {
        const [time, period] = t.split(' ');
        const [hRaw, mRaw] = time.split(':');
        let hours = Number(hRaw);
        const mins = Number(mRaw);
        if (period === 'PM' && hours !== 12) hours += 12;
        if (period === 'AM' && hours === 12) hours = 0;
        return (hours * 60) + mins;
    };
    return [...items].sort((a, b) => toMinutes(a.time) - toMinutes(b.time));
};

const AdminAppointments = () => {
    const baseAppointments = [
        { id: 1, doc: "Dr. Adrian Vance", time: "09:00 AM", patient: "Alice Miller", status: "Checked In" },
        { id: 2, doc: "Dr. Sarah Miller", time: "10:30 AM", patient: "Robert Brown", status: "Delayed" },
        { id: 3, doc: "Dr. Julian Chen", time: "01:00 PM", patient: "Emily Davis", status: "Scheduled" },
        { id: 4, doc: "Dr. Elena Sofia", time: "02:30 PM", patient: "Michael Ross", status: "Confirmed" },
    ];

    const appointments = useMemo(() => {
        const stored = JSON.parse(localStorage.getItem(CONFIRMED_APPOINTMENTS_KEY) || '[]');
        const normalizedStored = Array.isArray(stored) ? stored.map((item) => ({
            id: `user-${item.id}`,
            doc: item.doc,
            time: item.time,
            patient: item.patient,
            status: item.status || 'Confirmed',
            userBooked: true
        })) : [];
        return sortByTime([...baseAppointments, ...normalizedStored]);
    }, []);

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between mb-10">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Active Schedule</h1>
                    <p className="text-slate-500 font-medium italic">Clinical load across all specialist nodes</p>
                </div>
                <button className="px-6 py-2 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200 transition-all text-xs">Calendar View</button>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {appointments.map((a, i) => (
                    <motion.div
                        key={a.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="card-premium p-6 bg-white hover:border-primary/20 transition-all group flex flex-col md:flex-row items-center justify-between"
                    >
                        <div className="flex items-center space-x-6">
                            <div className="p-4 bg-panel rounded-2xl">
                                <Calendar className="h-6 w-6 text-slate-400" />
                            </div>
                            <div>
                                <div className="flex items-center space-x-2">
                                    <span className="font-bold text-slate-900 text-lg">{a.time}</span>
                                    <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest ${a.status === 'Delayed' ? 'bg-warning/10 text-warning' : 'bg-safe/10 text-safe'}`}>
                                        {a.status}
                                    </span>
                                    {a.userBooked && (
                                        <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest bg-primary/10 text-primary">
                                            New Booking
                                        </span>
                                    )}
                                </div>
                                <div className="flex items-center text-slate-400 text-sm font-medium mt-1">
                                    <Stethoscope className="h-4 w-4 mr-1.5 translate-y-[1px]" /> {a.doc}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center space-x-12 mt-4 md:mt-0">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200" />
                                <div>
                                    <p className="text-sm font-black text-slate-700">{a.patient}</p>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Verified Patient</p>
                                </div>
                            </div>
                            <button className="p-2 text-slate-200 group-hover:text-primary transition-colors">
                                <ChevronRight className="h-6 w-6" />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default AdminAppointments;
