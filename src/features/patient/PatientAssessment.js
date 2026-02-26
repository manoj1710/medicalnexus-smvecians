import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    RefreshCcw,
    BrainCircuit,
    Stethoscope,
    Activity,
    ClipboardList,
    AlertTriangle,
    PhoneCall,
    ChevronDown,
    ChevronUp
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const getRiskColor = (level) => {
    switch (level) {
        case 'Low':
            return '#16a34a';
        case 'Moderate':
            return '#eab308';
        case 'High':
            return '#f97316';
        case 'Critical':
            return '#dc2626';
        default:
            return '#64748b';
    }
};

const getSymptomClass = (severity) => {
    if (severity >= 8) return 'Severe symptom profile';
    if (severity >= 5) return 'Moderate symptom profile';
    return 'Low-intensity symptom profile';
};

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const RiskMeter = ({ score, riskLevel }) => {
    const [animatedScore, setAnimatedScore] = useState(0);
    const normalizedScore = Math.max(0, Math.min(Number(score) || 0, 10));
    const radius = 72;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference * (1 - animatedScore / 10);

    useEffect(() => {
        let start = 0;
        setAnimatedScore(0);
        const interval = setInterval(() => {
            start += 0.1;
            if (start >= normalizedScore) {
                clearInterval(interval);
                setAnimatedScore(normalizedScore);
                return;
            }
            setAnimatedScore(Number(start.toFixed(1)));
        }, 20);

        return () => clearInterval(interval);
    }, [normalizedScore]);

    return (
        <div className="flex flex-col items-center">
            <div className="relative w-40 h-40 md:w-48 md:h-48">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 180 180">
                    <circle
                        cx="90"
                        cy="90"
                        r={radius}
                        fill="none"
                        stroke="#e2e8f0"
                        strokeWidth="10"
                    />
                    <circle
                        cx="90"
                        cy="90"
                        r={radius}
                        fill="none"
                        stroke={getRiskColor(riskLevel)}
                        strokeWidth="10"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        className="transition-all duration-200"
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl md:text-5xl font-black" style={{ color: getRiskColor(riskLevel) }}>
                        {animatedScore.toFixed(1)}
                    </span>
                    <p className="text-[10px] font-bold text-slate-400 mt-1">TRIAGE SCORE</p>
                </div>
            </div>
        </div>
    );
};

const PatientAssessment = () => {
    const navigate = useNavigate();
    const [symptoms, setSymptoms] = useState('');
    const [severity, setSeverity] = useState(5);
    const [aiStage, setAiStage] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [triageResult, setTriageResult] = useState(null);
    const [showExplanation, setShowExplanation] = useState(false);

    const handleTriage = async () => {
        if (!symptoms.trim()) return;

        setLoading(true);
        setAiStage('Analyzing symptoms...');
        setError(null);
        setTriageResult(null);
        setShowExplanation(false);

        let coldStartTimer;
        let abortTimer;

        try {
            await delay(700);
            setAiStage('Identifying risk factors...');
            await delay(700);
            setAiStage('Matching specialist...');
            await delay(700);
            setAiStage('Submitting to triage engine...');

            const controller = new AbortController();
            coldStartTimer = setTimeout(() => {
                setAiStage('Backend is waking up, still analyzing...');
            }, 12000);
            abortTimer = setTimeout(() => controller.abort(), 45000);

            const response = await fetch('https://medica-backend-00co.onrender.com/triage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    symptoms,
                    severity
                }),
                signal: controller.signal
            });

            if (!response.ok) {
                throw new Error('Backend error');
            }

            const data = await response.json();
            let parsed;

            if (typeof data?.ai_response === 'string') {
                const cleaned = data.ai_response
                    .trim()
                    .replace(/^```json\s*/i, '')
                    .replace(/^```\s*/i, '')
                    .replace(/\s*```$/, '')
                    .trim();
                try {
                    parsed = JSON.parse(cleaned);
                } catch {
                    throw new Error('Invalid AI response format');
                }
            } else if (data?.ai_response && typeof data.ai_response === 'object') {
                parsed = data.ai_response;
            } else if (data && typeof data === 'object' && ('triage_score' in data || 'risk_level' in data)) {
                parsed = data;
            } else {
                throw new Error('Invalid AI response format');
            }

            setTriageResult(parsed);
            localStorage.setItem('recommendedSpecialist', parsed.recommended_specialist || '');

            const historyRecord = {
                date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
                symptoms: symptoms.trim(),
                score: Number(parsed.triage_score || 0),
                specialist: parsed.recommended_specialist || 'General Medicine',
                status: 'Completed'
            };
            const existingHistory = JSON.parse(localStorage.getItem('triageHistory') || '[]');
            localStorage.setItem('triageHistory', JSON.stringify([historyRecord, ...existingHistory].slice(0, 25)));
        } catch (err) {
            if (err.name === 'AbortError') {
                setError('Request timed out. Please retry after a moment.');
            } else {
                setError(err.message || 'Failed to complete assessment');
            }
        } finally {
            clearTimeout(coldStartTimer);
            clearTimeout(abortTimer);
            setLoading(false);
            setAiStage('');
        }
    };

    const clearForm = () => {
        setSymptoms('');
        setSeverity(5);
        setError(null);
        setTriageResult(null);
        setShowExplanation(false);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-12 lg:py-20">
            <div className="mb-12 text-center max-w-3xl mx-auto">
                <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Clinical Assessment Engine</h1>
                <p className="text-slate-500 text-lg">
                    Describe your symptoms in natural language. Our AI will analyze clinical severity and route you to the appropriate care level.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                {/* Left: Input Panel */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="card-premium h-full"
                >
                    <div className="flex items-center space-x-3 mb-8">
                        <div className="p-2 bg-primary/10 rounded-lg">
                            <ClipboardList className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800">Symptom Description</h3>
                    </div>

                    <div className="space-y-8">
                        <div>
                            <label className="block text-sm font-bold text-slate-500 mb-3 uppercase tracking-wider">
                                What are you experiencing?
                            </label>
                            <textarea
                                value={symptoms}
                                onChange={(e) => setSymptoms(e.target.value)}
                                placeholder="e.g. Persistent sharp pain in upper abdomen, radiating to back. Started 2 hours ago..."
                                className="w-full h-48 px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all resize-none text-slate-700 leading-relaxed"
                            />
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <label className="text-sm font-bold text-slate-500 uppercase tracking-wider">
                                    Subjective Severity
                                </label>
                                <span className="px-3 py-1 bg-slate-100 rounded-full text-xs font-black text-slate-700">
                                    Level {severity}/10
                                </span>
                            </div>
                            <input
                                type="range"
                                min="1"
                                max="10"
                                value={severity}
                                onChange={(e) => setSeverity(parseInt(e.target.value, 10))}
                                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-primary"
                            />
                            <div className="flex justify-between mt-2 text-[10px] font-bold text-slate-400">
                                <span>MILD</span>
                                <span>MODERATE</span>
                                <span>EXTREME</span>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
                            <button
                                onClick={handleTriage}
                                disabled={loading || !symptoms.trim()}
                                className={`w-full sm:flex-1 btn-primary flex items-center justify-center space-x-2 ${(loading || !symptoms.trim()) && 'opacity-50 cursor-not-allowed'
                                    }`}
                            >
                                {loading ? (
                                    <RefreshCcw className="h-5 w-5 animate-spin" />
                                ) : (
                                    <BrainCircuit className="h-5 w-5" />
                                )}
                                <span>{loading ? 'Analyzing symptoms...' : 'Submit to AI Engine'}</span>
                            </button>
                            <button
                                onClick={clearForm}
                                className="w-full sm:w-auto p-4 rounded-2xl bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700 transition-all"
                            >
                                <RefreshCcw className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* Right: Analysis Panel */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="relative min-h-[500px]"
                >
                    <AnimatePresence mode="wait">
                        {!triageResult && !loading && !error && (
                            <motion.div
                                key="empty"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 flex flex-col items-center justify-center text-center p-10 card-premium border-dashed border-2 border-slate-200 bg-transparent shadow-none"
                            >
                                <div className="p-6 bg-slate-50 rounded-full mb-6">
                                    <Activity className="h-12 w-12 text-slate-300" />
                                </div>
                                <h4 className="text-xl font-bold text-slate-400 mb-2">Ready for Analysis</h4>
                                <p className="text-slate-400 max-w-xs mx-auto">
                                    Submit your symptoms to see real-time triage scoring and specialist recommendations.
                                </p>
                            </motion.div>
                        )}

                        {loading && (
                            <motion.div
                                key="loading"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 flex flex-col items-center justify-center text-center p-10 card-premium bg-white/60 backdrop-blur-sm z-20"
                            >
                                <div className="relative mb-8">
                                    <div className="w-24 h-24 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                                    <BrainCircuit className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-8 w-8 text-primary animate-pulse" />
                                </div>
                                <h4 className="text-xl font-bold text-slate-900 mb-2 italic">Neural Processing...</h4>
                                <p className="text-slate-500 animate-pulse font-mono text-sm uppercase tracking-tighter">
                                    {aiStage}
                                </p>
                            </motion.div>
                        )}

                        {error && !loading && (
                            <motion.div
                                key="error"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="card-premium h-full bg-white"
                            >
                                <div className="flex items-center space-x-3 mb-6">
                                    <div className="p-2 bg-red-100 rounded-lg">
                                        <Activity className="h-5 w-5 text-red-600" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900">Assessment Error</h3>
                                </div>
                                <div className="p-4 rounded-xl border border-red-200 bg-red-50 text-red-700 text-sm font-medium">
                                    {error}
                                </div>
                            </motion.div>
                        )}

                        {triageResult && !loading && !error && (
                            <motion.div
                                key="result"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="card-premium h-full bg-white relative overflow-hidden"
                            >
                                {triageResult.risk_level === 'Critical' && (
                                    <div
                                        className="mb-6 p-4 rounded-2xl border border-red-200 bg-red-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                                        style={{ animation: 'criticalPulse 2s infinite' }}
                                    >
                                        <div className="flex items-center space-x-3">
                                            <AlertTriangle className="h-6 w-6 text-red-600" />
                                            <div>
                                                <p className="text-sm font-black text-red-700 uppercase tracking-wider">Critical Condition Detected</p>
                                                <p className="text-xs text-red-600">Immediate medical intervention is strongly advised.</p>
                                            </div>
                                        </div>
                                        <a
                                            href="tel:911"
                                            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-5 py-2.5 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-colors"
                                        >
                                            <PhoneCall className="h-4 w-4" />
                                            <span>Call Emergency Services</span>
                                        </a>
                                    </div>
                                )}

                                <div className="flex items-center justify-between mb-10">
                                    <div className="flex items-center space-x-3">
                                        <div className="p-2 bg-accent/10 rounded-lg">
                                            <Stethoscope className="h-5 w-5 text-accent" />
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-900">Analysis Results</h3>
                                    </div>
                                </div>

                                <div className="space-y-8">
                                    <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-5">Risk Meter</h4>
                                        <RiskMeter score={triageResult.triage_score} riskLevel={triageResult.risk_level} />
                                    </div>

                                    <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Risk Level</h4>
                                        <p className="text-2xl font-black" style={{ color: getRiskColor(triageResult.risk_level) }}>
                                            {triageResult.risk_level}
                                        </p>
                                    </div>

                                    <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Recommended Specialist</h4>
                                        <p className="text-lg font-bold text-slate-900">
                                            {triageResult.recommended_specialist}
                                        </p>
                                    </div>

                                    <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Clinical Advice</h4>
                                        <p className="text-sm text-slate-700 leading-relaxed">
                                            {triageResult.advice}
                                        </p>

                                        <button
                                            className="mt-4 inline-flex items-center space-x-2 text-xs font-bold text-primary hover:text-teal-800 transition-colors"
                                            onClick={() => setShowExplanation((prev) => !prev)}
                                        >
                                            <span>Why this risk level?</span>
                                            {showExplanation ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                                        </button>

                                        {showExplanation && (
                                            <div className="mt-4 p-4 rounded-xl border border-slate-200 bg-white">
                                                <p className="text-xs text-slate-600 mb-2">
                                                    <span className="font-bold text-slate-700">Severity input weight:</span> {severity}/10
                                                </p>
                                                <p className="text-xs text-slate-600 mb-2">
                                                    <span className="font-bold text-slate-700">Symptom-based classification:</span> {getSymptomClass(severity)}
                                                </p>
                                                <p className="text-xs text-slate-600">
                                                    <span className="font-bold text-slate-700">AI confidence:</span> {triageResult.ai_confidence || 'Not provided by model'}
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    <button
                                        onClick={() => navigate('/patient/booking', {
                                            state: { score: Number(triageResult.triage_score || 0) }
                                        })}
                                        className={`w-full py-4 rounded-2xl font-bold shadow-lg transition-all ${triageResult.risk_level === 'Critical'
                                            ? 'bg-urgent text-white shadow-urgent/30 ring-4 ring-urgent/20'
                                            : 'bg-slate-900 text-white shadow-slate-900/20'
                                            }`}
                                    >
                                        Proceed to Booking
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    );
};

export default PatientAssessment;
