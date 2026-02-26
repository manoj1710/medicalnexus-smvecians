import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    RefreshCcw,
    BrainCircuit,
    Stethoscope,
    Activity,
    ClipboardList
} from 'lucide-react';

const AssessmentPage = () => {
    const [symptoms, setSymptoms] = useState('');
    const [severity, setSeverity] = useState(5);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [triageResult, setTriageResult] = useState(null);
    const [requestMessage, setRequestMessage] = useState('');

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

    const handleTriage = async () => {
        if (!symptoms.trim()) return;

        setLoading(true);
        setError(null);
        setRequestMessage('Analyzing symptoms...');
        setTriageResult(null);

        let timeoutId;
        let abortId;

        try {
            const controller = new AbortController();
            timeoutId = setTimeout(() => {
                setRequestMessage('Backend is waking up, still analyzing...');
            }, 12000);
            abortId = setTimeout(() => controller.abort(), 45000);

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
        } catch (err) {
            if (err.name === 'AbortError') {
                setError('Request timed out. Please try again in a moment.');
            } else {
                setError(err.message || 'Failed to complete assessment');
            }
        } finally {
            clearTimeout(timeoutId);
            clearTimeout(abortId);
            setLoading(false);
            setRequestMessage('');
        }
    };

    const clearForm = () => {
        setSymptoms('');
        setSeverity(5);
        setError(null);
        setTriageResult(null);
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
                                onChange={(e) => setSeverity(parseInt(e.target.value))}
                                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-primary"
                            />
                            <div className="flex justify-between mt-2 text-[10px] font-bold text-slate-400">
                                <span>MILD</span>
                                <span>MODERATE</span>
                                <span>EXTREME</span>
                            </div>
                        </div>

                        <div className="flex space-x-4 pt-4">
                            <button
                                onClick={handleTriage}
                                disabled={loading || !symptoms.trim()}
                                className={`flex-1 btn-primary flex items-center justify-center space-x-2 ${(loading || !symptoms.trim()) && 'opacity-50 cursor-not-allowed'
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
                                className="p-4 rounded-2xl bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700 transition-all"
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
                                    {requestMessage || 'Analyzing symptoms...'}
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
                                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Triage Score</h4>
                                        <p className="text-4xl font-black text-slate-900">
                                            {triageResult.triage_score}/10
                                        </p>
                                    </div>

                                    <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Risk Level</h4>
                                        <p
                                            className="text-2xl font-extrabold"
                                            style={{ color: getRiskColor(triageResult.risk_level) }}
                                        >
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
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    );
};

export default AssessmentPage;
