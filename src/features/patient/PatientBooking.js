import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Star,
    Clock,
    MapPin,
    Zap,
    CheckCircle2,
    Calendar,
    ChevronRight,
    Filter
} from 'lucide-react';
import { useLocation } from 'react-router-dom';

const CONFIRMED_APPOINTMENTS_KEY = 'medintel_confirmed_appointments';

const doctors = [
    {
        id: 1,
        name: "Dr. Adrian Vance",
        specialty: "Cardiology Specialist",
        experienceYears: 14,
        consultationFeeInr: 1800,
        rating: 4.9,
        reviews: 124,
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Adrian",
        slots: ["09:00 AM", "10:30 AM", "01:00 PM", "02:30 PM", "04:00 PM"],
        booked: ["10:30 AM", "04:00 PM"]
    },
    {
        id: 2,
        name: "Dr. Sarah Miller",
        specialty: "Neurological Surgeon",
        experienceYears: 16,
        consultationFeeInr: 2200,
        rating: 5.0,
        reviews: 89,
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
        slots: ["08:30 AM", "11:00 AM", "02:00 PM", "03:30 PM"],
        booked: ["08:30 AM", "11:00 AM"]
    },
    {
        id: 3,
        name: "Dr. Julian Chen",
        specialty: "Internal Medicine",
        experienceYears: 11,
        consultationFeeInr: 1200,
        rating: 4.8,
        reviews: 210,
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Julian",
        slots: ["10:00 AM", "11:30 AM", "01:30 PM", "03:00 PM", "04:30 PM"],
        booked: ["01:30 PM"]
    },
    {
        id: 4,
        name: "Dr. Elena Sofia",
        specialty: "Emergency Medicine",
        experienceYears: 13,
        consultationFeeInr: 1500,
        rating: 4.9,
        reviews: 156,
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena",
        slots: ["09:00 AM", "10:00 AM", "11:00 AM", "01:00 PM", "02:00 PM"],
        booked: ["09:00 AM", "11:00 AM"]
    },
    {
        id: 5,
        name: "Dr. Marcus Thorne",
        specialty: "Orthopedic Specialist",
        experienceYears: 10,
        consultationFeeInr: 1600,
        rating: 4.7,
        reviews: 95,
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
        slots: ["10:30 AM", "01:00 PM", "02:30 PM"],
        booked: []
    },
    {
        id: 6,
        name: "Dr. Aisha Rahman",
        specialty: "General Practitioner",
        experienceYears: 8,
        consultationFeeInr: 600,
        rating: 4.9,
        reviews: 312,
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aisha",
        slots: ["08:00 AM", "09:30 AM", "11:00 AM", "02:00 PM", "03:30 PM", "05:00 PM"],
        booked: ["09:30 AM", "05:00 PM"]
    }
];

const PatientBooking = () => {
    const location = useLocation();
    const triageScore = location.state?.score || Number(JSON.parse(localStorage.getItem('triageHistory') || '[]')[0]?.score || 0);
    const isHighPriority = triageScore >= 8;

    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [expandedDoctorId, setExpandedDoctorId] = useState(null);
    const [recommendedSpecialist, setRecommendedSpecialist] = useState('');
    const [recommendedDoctorId, setRecommendedDoctorId] = useState(null);
    const doctorRefs = useRef({});

    const normalizeSpecialty = (value) => (value || '')
        .toLowerCase()
        .replace('specialist', '')
        .replace('medicine', '')
        .replace('physician', '')
        .trim();

    const formatInr = (value) => `Rs. ${Number(value).toLocaleString('en-IN')}`;
    const isGeneralDoctor = (specialty) => specialty.toLowerCase().includes('general');
    const getPatientName = () => {
        const storedUser = JSON.parse(localStorage.getItem('medintel_user') || '{}');
        const email = storedUser?.email || 'patient@medintel.com';
        const rawName = email.split('@')[0].replace(/[._-]/g, ' ');
        return rawName
            .split(' ')
            .filter(Boolean)
            .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
            .join(' ');
    };

    useEffect(() => {
        const recommended = localStorage.getItem('recommendedSpecialist') || '';
        setRecommendedSpecialist(recommended);
        if (!recommended) return;

        const recommendedNormalized = normalizeSpecialty(recommended);
        const match = doctors.find((doc) => {
            const doctorNormalized = normalizeSpecialty(doc.specialty);
            return doctorNormalized.includes(recommendedNormalized) || recommendedNormalized.includes(doctorNormalized);
        });

        if (match) {
            setRecommendedDoctorId(match.id);
            setSelectedDoctor(match.id);
            const target = doctorRefs.current[match.id];
            if (target) {
                setTimeout(() => {
                    target.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 250);
            }
        }
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 py-12 lg:py-20">
            {/* High Priority Banner */}
            {isHighPriority && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-10 p-6 rounded-3xl bg-gradient-to-r from-urgent to-red-800 text-white shadow-2xl shadow-urgent/20 relative overflow-hidden flex flex-col md:flex-row items-center justify-between"
                >
                    <div className="flex items-center space-x-6 relative z-10">
                        <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-md">
                            <Zap className="h-8 w-8 text-white fill-white animate-pulse" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black italic uppercase tracking-wider mb-1">High Priority Case Detected</h2>
                            <p className="text-red-100 font-medium">Fast-track routing enabled. Immediate slots have been prioritized for your triage score of {triageScore}.</p>
                        </div>
                    </div>
                    <button className="mt-6 md:mt-0 px-8 py-3 bg-white text-urgent font-black rounded-xl hover:bg-slate-50 transition-colors uppercase tracking-widest text-sm shadow-xl relative z-10">
                        Activate Priority Route
                    </button>

                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Calendar className="h-40 w-40" />
                    </div>
                </motion.div>
            )}

            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                <div>
                    <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Smart Appointment Booking</h1>
                    <p className="text-slate-500 max-w-xl">
                        Select an AI-recommended specialist based on your assessment results.
                        Real-time availability is synchronized with our clinical network.
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-2 bg-white p-2 border border-slate-200 rounded-2xl shadow-sm w-full md:w-auto">
                    <button className="p-2 px-4 bg-primary text-white text-xs font-bold rounded-xl shadow-md">All Specialists</button>
                    <button className="p-2 px-4 text-slate-500 text-xs font-bold hover:bg-slate-50 rounded-xl transition-colors">Nearby</button>
                    <div className="w-px h-6 bg-slate-200 mx-2" />
                    <button className="p-2 text-primary hover:bg-primary/5 rounded-xl transition-colors">
                        <Filter className="h-5 w-5" />
                    </button>
                </div>
            </div>

            {/* Hero Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {doctors.map((doc, idx) => (
                    <motion.div
                        key={doc.id}
                        ref={(el) => { doctorRefs.current[doc.id] = el; }}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.05 }}
                        whileHover={{ y: -8 }}
                        className={`card-premium group relative ${selectedDoctor === doc.id ? 'ring-2 ring-primary border-primary' : ''} ${recommendedDoctorId === doc.id ? 'ring-2 ring-accent shadow-[0_0_0_3px_rgba(34,211,238,0.25)] border-accent' : ''}`}
                        onClick={() => setSelectedDoctor(doc.id)}
                    >
                        {recommendedDoctorId === doc.id && (
                            <div className="absolute -top-3 left-4 px-3 py-1 rounded-full bg-accent text-slate-900 text-[10px] font-black uppercase tracking-wider shadow-md">
                                Recommended by AI Triage
                            </div>
                        )}

                        <div className="flex items-start justify-between mb-6">
                            <div className="flex items-center space-x-4">
                                <div className="relative">
                                    <img src={doc.image} alt={doc.name} className="h-16 w-16 rounded-2xl bg-slate-100 border border-slate-100" />
                                    <div className="absolute -bottom-1 -right-1 h-5 w-5 bg-safe border-2 border-white rounded-full" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors">{doc.name}</h3>
                                    <p className="text-xs font-bold text-slate-400 capitalize flex items-center">
                                        <MapPin className="h-3 w-3 mr-1" /> Medical Center East
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col items-end">
                                <div className="flex items-center text-warning font-black text-sm">
                                    <Star className="h-4 w-4 fill-warning mr-1" /> {doc.rating}
                                </div>
                                <span className="text-[10px] text-slate-400 font-bold">{doc.reviews} Reviews</span>
                            </div>
                        </div>

                        <div className="mb-6">
                            <span className="inline-block px-3 py-1 bg-primary/5 text-primary text-[10px] font-black uppercase tracking-widest rounded-lg mb-4 border border-primary/10">
                                {doc.specialty}
                            </span>
                            {recommendedSpecialist && recommendedDoctorId === doc.id && (
                                <p className="text-[11px] font-bold text-accent mb-3">
                                    Matched from recommendation: {recommendedSpecialist}
                                </p>
                            )}
                            <div className="grid grid-cols-3 gap-2">
                                {doc.slots.map((slot) => {
                                    const isBooked = doc.booked.includes(slot);
                                    return (
                                        <button
                                            key={slot}
                                            disabled={isBooked}
                                            className={`text-[10px] font-bold py-2 rounded-lg border transition-all ${isBooked
                                                ? 'bg-slate-50 border-slate-100 text-slate-300 opacity-60 cursor-not-allowed'
                                                : selectedSlot === `${doc.id}-${slot}`
                                                    ? 'bg-primary border-primary text-white shadow-md'
                                                    : 'bg-white border-slate-200 text-slate-600 hover:border-primary hover:text-primary'
                                                }`}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedDoctor(doc.id);
                                                setSelectedSlot(`${doc.id}-${slot}`);
                                            }}
                                        >
                                            {slot}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                            <div className="flex items-center text-primary text-xs font-bold">
                                <Clock className="h-4 w-4 mr-1.5" /> Next: {doc.slots.find(s => !doc.booked.includes(s))}
                            </div>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setExpandedDoctorId((prev) => (prev === doc.id ? null : doc.id));
                                }}
                                className={`p-2 rounded-lg transition-all ${selectedDoctor === doc.id ? 'bg-primary text-white shadow-lg' : 'bg-slate-50 text-slate-400 group-hover:bg-primary group-hover:text-white'}`}
                            >
                                <ChevronRight className={`h-5 w-5 transition-transform ${expandedDoctorId === doc.id ? 'rotate-90' : ''}`} />
                            </button>
                        </div>

                        <AnimatePresence initial={false}>
                            {expandedDoctorId === doc.id && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                                    animate={{ opacity: 1, height: 'auto', marginTop: 14 }}
                                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                                    className="overflow-hidden"
                                >
                                    <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 space-y-2">
                                        <div className="flex items-center justify-between text-xs">
                                            <span className="font-bold text-slate-500 uppercase tracking-wider">Experience</span>
                                            <span className="font-black text-slate-800">{doc.experienceYears}+ years</span>
                                        </div>
                                        <div className="flex items-center justify-between text-xs">
                                            <span className="font-bold text-slate-500 uppercase tracking-wider">Consultation Fee</span>
                                            <span className={`font-black ${isGeneralDoctor(doc.specialty) ? 'text-safe' : 'text-warning'}`}>
                                                {formatInr(doc.consultationFeeInr)}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between text-xs">
                                            <span className="font-bold text-slate-500 uppercase tracking-wider">Rating</span>
                                            <span className="font-black text-slate-800">{doc.rating}/5 ({doc.reviews} reviews)</span>
                                        </div>
                                        <p className="text-[11px] text-slate-500 pt-1">
                                            {isGeneralDoctor(doc.specialty)
                                                ? 'General physician pricing is usually lower for routine consultation.'
                                                : 'Specialist consultation fee is higher due to advanced domain expertise.'}
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {(selectedDoctor && selectedSlot) && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        className="fixed bottom-4 sm:bottom-10 left-1/2 -translate-x-1/2 w-[92%] max-w-xl z-40"
                    >
                        <div className="bg-slate-900 rounded-3xl p-5 sm:p-6 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-white/10 backdrop-blur-xl">
                            <div className="flex items-center space-x-4">
                                <div className="p-3 bg-primary/20 rounded-2xl">
                                    <CheckCircle2 className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold">Booking Confirmation</h4>
                                    <p className="text-slate-400 text-xs">
                                        {doctors.find(d => d.id === selectedDoctor).name} - {selectedSlot.split('-')[1]}
                                    </p>
                                </div>
                            </div>
                            <button
                                className="w-full sm:w-auto px-8 py-3 bg-primary text-white font-black rounded-xl hover:bg-teal-800 transition-all text-sm uppercase tracking-widest shadow-lg shadow-primary/20"
                                onClick={() => {
                                    const chosenDoctor = doctors.find((d) => d.id === selectedDoctor);
                                    const appointmentRecord = {
                                        id: Date.now(),
                                        doc: chosenDoctor?.name || 'Assigned Doctor',
                                        time: selectedSlot.split('-')[1],
                                        patient: getPatientName(),
                                        status: 'Confirmed',
                                        specialty: chosenDoctor?.specialty || 'General',
                                        feeInr: chosenDoctor?.consultationFeeInr || 0,
                                        createdAt: new Date().toISOString()
                                    };
                                    const existing = JSON.parse(localStorage.getItem(CONFIRMED_APPOINTMENTS_KEY) || '[]');
                                    localStorage.setItem(
                                        CONFIRMED_APPOINTMENTS_KEY,
                                        JSON.stringify([appointmentRecord, ...existing].slice(0, 50))
                                    );
                                    alert("Appointment request received by MedIntel Nexus network.");
                                    setSelectedDoctor(null);
                                    setSelectedSlot(null);
                                }}
                            >
                                Confirm
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default PatientBooking;
