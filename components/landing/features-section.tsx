"use client";

import { motion } from "framer-motion";
import {
    Users,
    MapPin,
    Radio,
    Shield,
    Compass
} from "lucide-react";

const features = [
    {
        icon: MapPin,
        title: "Live Group Tracking",
        description: "Real-time GPS tracking for your entire convoy. See all riders, their status, and keep everyone safe on the road. Never lose sight of your pack.",
        color: "#77ff00",
        size: "large", // Spans 2 columns
    },
    {
        icon: Users,
        title: "Rider Identity",
        description: "Build your motorcycle profile. Show off your clubs, rides, and reputation.",
        color: "#c83737",
        size: "small",
    },
    {
        icon: Shield,
        title: "Motorcycle Clubs",
        description: "Join exclusive clubs. Club badges show your brotherhood.",
        color: "#37c8c3",
        size: "small",
    },
    {
        icon: Compass,
        title: "Organized Rides",
        description: "Like clan wars for bikers. Schedule rides and epic group journeys.",
        color: "#77ff00",
        size: "small",
    },
    {
        icon: Radio,
        title: "Ride Chat",
        description: "Chat activates when rides start. Auto-archives after rides end.",
        color: "#c83737",
        size: "small",
    },
];

export function FeaturesSection() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" },
        },
    };

    return (
        <section id="features" className="py-28 bg-canvas">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section header */}
                <motion.div
                    className="text-center mb-20"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 uppercase tracking-tight">
                        The Bento{" "}
                        <span className="bg-linear-to-r from-brand-red-light to-brand-red bg-clip-text text-transparent">
                            Garage
                        </span>
                    </h2>
                    <p className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto font-medium">
                        Everything bikers need. From discovering clubs to tracking rides in real-time.
                    </p>
                </motion.div>

                {/* Bento Grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        const isLarge = feature.size === "large";

                        return (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className={`group relative ${isLarge ? "md:col-span-2" : ""}`}
                            >
                                <motion.div
                                    className={`
                                        relative overflow-hidden rounded-3xl bg-[#333333]/80 backdrop-blur-md
                                        border border-[#444444]/50 p-8
                                        shadow-atmospheric
                                        transition-all duration-500
                                        hover:border-teal/50
                                        ${isLarge ? "min-h-80" : "min-h-60"}
                                    `}
                                    whileHover={{
                                        scale: 1.02,
                                        boxShadow: "0 0 40px rgba(55, 200, 195, 0.2)"
                                    }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {/* Glow effect on hover */}
                                    <div
                                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                        style={{
                                            background: `radial-gradient(circle at 50% 50%, ${feature.color}10, transparent 70%)`
                                        }}
                                    />

                                    {/* Icon */}
                                    <motion.div
                                        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                                        style={{ backgroundColor: `${feature.color}15` }}
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        animate={{ y: [0, -5, 0] }}
                                        transition={{ duration: 3, repeat: Infinity, delay: index * 0.15 }}
                                    >
                                        <Icon className="w-8 h-8" style={{ color: feature.color }} />
                                    </motion.div>

                                    {/* Content */}
                                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 uppercase tracking-wide">
                                        {feature.title}
                                    </h3>
                                    <p className="text-text-secondary text-base leading-relaxed">
                                        {feature.description}
                                    </p>

                                    {/* Large card extra content - Map mockup */}
                                    {isLarge && (
                                        <div className="mt-8 relative">
                                            <div className="absolute inset-0 bg-linear-to-t from-surface to-transparent z-10" />
                                            <div className="relative h-40 bg-[#1a1a1a] rounded-2xl overflow-hidden">
                                                {/* Map mockup */}
                                                <div className="absolute inset-0 opacity-60">
                                                    <svg className="w-full h-full" viewBox="0 0 400 160">
                                                        {/* Grid lines */}
                                                        {[...Array(8)].map((_, i) => (
                                                            <line
                                                                key={`h-${i}`}
                                                                x1="0"
                                                                y1={i * 20 + 10}
                                                                x2="400"
                                                                y2={i * 20 + 10}
                                                                stroke="#333333"
                                                                strokeWidth="1"
                                                            />
                                                        ))}
                                                        {[...Array(20)].map((_, i) => (
                                                            <line
                                                                key={`v-${i}`}
                                                                x1={i * 20 + 10}
                                                                y1="0"
                                                                x2={i * 20 + 10}
                                                                y2="160"
                                                                stroke="#333333"
                                                                strokeWidth="1"
                                                            />
                                                        ))}
                                                        {/* Route path */}
                                                        <motion.path
                                                            d="M 30 120 Q 80 80 150 100 T 250 60 T 370 90"
                                                            fill="none"
                                                            stroke="#77ff00"
                                                            strokeWidth="3"
                                                            strokeLinecap="round"
                                                            initial={{ pathLength: 0 }}
                                                            whileInView={{ pathLength: 1 }}
                                                            viewport={{ once: true }}
                                                            transition={{ duration: 2 }}
                                                        />
                                                    </svg>
                                                </div>
                                                {/* Rider dots */}
                                                <div className="absolute inset-0">
                                                    {[
                                                        { x: "10%", y: "70%", delay: 0 },
                                                        { x: "35%", y: "55%", delay: 0.2 },
                                                        { x: "55%", y: "35%", delay: 0.4 },
                                                        { x: "85%", y: "50%", delay: 0.6 },
                                                    ].map((dot, i) => (
                                                        <motion.div
                                                            key={i}
                                                            className="absolute w-4 h-4"
                                                            style={{ left: dot.x, top: dot.y }}
                                                            animate={{
                                                                scale: [1, 1.3, 1],
                                                                opacity: [0.8, 1, 0.8]
                                                            }}
                                                            transition={{
                                                                duration: 2,
                                                                delay: dot.delay,
                                                                repeat: Infinity
                                                            }}
                                                        >
                                                            <div className="w-full h-full rounded-full bg-brand-red-light shadow-[0_0_15px_rgba(200,55,55,0.6)]" />
                                                        </motion.div>
                                                    ))}
                                                </div>
                                                {/* Status badge */}
                                                <div className="absolute bottom-3 left-3 z-20 flex items-center gap-2 bg-[#333333]/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
                                                    <div className="w-2 h-2 rounded-full bg-[#77ff00] animate-pulse" />
                                                    <span className="text-xs text-white font-medium">12 Riders Live</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Corner decoration */}
                                    <div
                                        className="absolute top-0 right-0 w-32 h-32 opacity-10"
                                        style={{
                                            background: `radial-gradient(circle at 100% 0%, ${feature.color}, transparent 70%)`
                                        }}
                                    />
                                </motion.div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
