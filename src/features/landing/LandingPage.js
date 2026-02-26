import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Bot, ShieldCheck, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    const features = [
        {
            title: "Automated Triage Engine",
            description: "Fast-track your clinical assessment with our advanced AI symptom analysis system.",
            icon: <Bot className="h-8 w-8 text-primary" />,
            delay: 0.1
        },
        {
            title: "Smart Specialist Routing",
            description: "Intelligently connect with the right medical expert based on your specific needs.",
            icon: <ShieldCheck className="h-8 w-8 text-accent" />,
            delay: 0.2
        },
        {
            title: "Priority-Based Booking",
            description: "Critical cases receive immediate attention with our priority scheduling algorithm.",
            icon: <Zap className="h-8 w-8 text-warning" />,
            delay: 0.3
        }
    ];

    return (
        <div className="overflow-hidden">
            {/* Hero Section */}
            <section className="relative pt-16 pb-24 lg:pt-32 lg:pb-40 bg-white">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl opacity-50" />
                    <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl opacity-50" />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="inline-block py-1 px-4 rounded-full bg-primary/10 text-primary text-sm font-bold mb-6 tracking-wider uppercase">
                                Intelligence meets Healthcare
                            </span>
                            <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1] mb-8">
                                AI-Assisted Clinical Triage <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                                    & Smart Appointment System
                                </span>
                            </h1>
                            <p className="text-xl text-slate-500 mb-12 max-w-2xl mx-auto leading-relaxed">
                                Automated symptom analysis. Intelligent prioritization.
                                Experience a faster, smarter way to access healthcare when you need it most.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                                <Link to="/assessment">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="btn-primary flex items-center group"
                                    >
                                        Start Assessment
                                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                    </motion.button>
                                </Link>
                                <Link to="/how-it-works" className="text-slate-600 font-semibold hover:text-primary transition-colors">
                                    Learn how it works →
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 bg-slate-50 border-t border-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: feature.delay }}
                                whileHover={{ y: -10 }}
                                className="card-premium group"
                            >
                                <div className="mb-6 p-4 rounded-2xl bg-white shadow-sm border border-slate-50 inline-block group-hover:shadow-md transition-shadow">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-4">{feature.title}</h3>
                                <p className="text-slate-500 leading-relaxed">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
