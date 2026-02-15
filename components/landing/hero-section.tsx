"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
    Smartphone,
    Map,
    Shield,
    Compass,
    Download,
    ArrowRight,
} from "lucide-react";

export function HeroSection() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.7, ease: "easeOut" },
        },
    };

    // Floating animation for 3D assets
    const floatVariants = {
        float1: {
            y: [0, -20, 0],
            rotate: [0, 5, 0],
            transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
        },
        float2: {
            y: [0, -15, 0],
            rotate: [0, -3, 0],
            transition: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
        },
        float3: {
            y: [0, -25, 0],
            rotate: [0, 8, 0],
            transition: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 },
        },
        float4: {
            y: [0, -18, 0],
            rotate: [0, -5, 0],
            transition: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 },
        },
        float5: {
            y: [0, -22, 0],
            rotate: [0, 4, 0],
            transition: { duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.7 },
        },
    };

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-canvas">
            {/* Background gradient orbs */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    className="absolute top-1/4 -left-32 w-96 h-96 bg-linear-to-r from-brand-red-light/20 to-brand-red/10 rounded-full blur-3xl"
                    animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute bottom-1/4 -right-32 w-125 h-125 bg-linear-to-l from-brand-teal/15 to-transparent rounded-full blur-3xl"
                    animate={{ x: [0, -40, 0], y: [0, -20, 0] }}
                    transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 bg-neon-green/5 rounded-full blur-3xl"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left content */}
                    <motion.div
                        className="text-center lg:text-left"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.h1
                            variants={itemVariants}
                            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-8 uppercase tracking-tight"
                        >
                            Ride Together.{" "}
                            <span className="bg-linear-to-r from-brand-red-light to-brand-red bg-clip-text text-transparent">
                                Build Your Tribe.
                            </span>
                        </motion.h1>

                        <motion.p
                            variants={itemVariants}
                            className="text-lg sm:text-xl text-text-secondary mb-10 max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed"
                        >
                            The social platform where motorcycle riders discover clubs through people,
                            join organized rides like clan wars, and build their riding legacy.
                        </motion.p>

                        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            {/* Primary CTA — Riders */}
                            <Button
                                size="lg"
                                className="text-lg px-10 py-7 rounded-full bg-linear-to-r from-brand-red-light to-brand-red hover:from-[#d94444] hover:to-[#960000] text-white border-0 shadow-[0_20px_50px_rgba(200,55,55,0.4)] transition-all duration-300 hover:shadow-[0_25px_60px_rgba(200,55,55,0.5)] hover:scale-105 font-bold uppercase tracking-wide"
                                asChild
                            >
                                <a href="#download">
                                    <Download className="w-5 h-5 mr-2" />
                                    Get the App
                                </a>
                            </Button>
                            {/* Secondary CTA — Partners */}
                            <Button
                                size="lg"
                                className="text-lg px-10 py-7 rounded-full bg-transparent border-2 border-teal text-teal hover:bg-teal/10 hover:shadow-[0_0_30px_rgba(55,200,195,0.25)] transition-all duration-300 hover:scale-105 font-bold uppercase tracking-wide"
                                asChild
                            >
                                <Link href="/login">
                                    Partner Access
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </Link>
                            </Button>
                        </motion.div>

                        {/* Stats row */}
                        <motion.div
                            variants={itemVariants}
                            className="flex flex-wrap gap-10 justify-center lg:justify-start mt-14"
                        >
                            {[
                                { value: "10K+", label: "Active Riders" },
                                { value: "500+", label: "Clubs" },
                                { value: "2K+", label: "Rides" },
                            ].map((stat, i) => (
                                <div key={i} className="text-center">
                                    <div className="text-3xl sm:text-4xl font-bold text-[#77ff00]">{stat.value}</div>
                                    <div className="text-sm text-text-secondary uppercase tracking-wider mt-1">{stat.label}</div>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Right content - Floating 3D Asset Cloud */}
                    <motion.div
                        className="relative h-125 lg:h-150 flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                    >
                        {/* Helmet asset */}
                        <motion.div
                            className="absolute w-32 h-32 sm:w-40 sm:h-40 top-8 left-4 sm:left-8"
                            animate="float1"
                            variants={floatVariants}
                        >
                            <div className="w-full h-full bg-surface/80 backdrop-blur-md rounded-3xl shadow-atmospheric flex items-center justify-center border border-[#444444]/50">
                                <Shield className="w-16 h-16 sm:w-20 sm:h-20 text-brand-red-light" />
                            </div>
                            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#333333] text-white text-xs px-3 py-1 rounded-full font-medium">
                                Helmet
                            </div>
                        </motion.div>

                        {/* Phone App Screen */}
                        <motion.div
                            className="absolute w-48 h-80 sm:w-56 sm:h-96 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
                            animate="float2"
                            variants={floatVariants}
                        >
                            <div className="w-full h-full bg-[#333333]/90 backdrop-blur-md rounded-[2.5rem] shadow-[0_30px_70px_rgba(0,0,0,0.6)] p-2 border border-[#444444]/50">
                                <div className="w-full h-full bg-[#1a1a1a] rounded-4xl overflow-hidden relative">
                                    {/* App UI mockup */}
                                    <div className="absolute inset-0 p-4">
                                        <div className="bg-linear-to-b from-brand-red-light/20 to-transparent rounded-2xl p-4 mb-4">
                                            <div className="text-brand-red-light text-xs font-bold uppercase mb-1">Live Now</div>
                                            <div className="text-white font-bold text-sm">Desert Eagles MC</div>
                                            <div className="text-text-secondary text-xs">12 riders • Route 66</div>
                                        </div>
                                        <div className="space-y-3">
                                            {[1, 2, 3].map((i) => (
                                                <div key={i} className="flex items-center gap-3 bg-[#333333]/50 rounded-xl p-3">
                                                    <div className="w-8 h-8 rounded-full bg-linear-to-r from-brand-red-light to-brand-red" />
                                                    <div className="flex-1">
                                                        <div className="h-2 bg-[#444444] rounded w-20 mb-1" />
                                                        <div className="h-2 bg-[#444444]/50 rounded w-14" />
                                                    </div>
                                                    <div className="w-6 h-6 rounded-full bg-[#77ff00]/20 flex items-center justify-center">
                                                        <div className="w-2 h-2 rounded-full bg-[#77ff00]" />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Wheel asset */}
                        <motion.div
                            className="absolute w-28 h-28 sm:w-36 sm:h-36 bottom-16 left-0 sm:left-4"
                            animate="float3"
                            variants={floatVariants}
                        >
                            <div className="w-full h-full bg-surface/80 backdrop-blur-md rounded-full shadow-atmospheric flex items-center justify-center border border-[#444444]/50">
                                <motion.div
                                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-[#37c8c3] flex items-center justify-center"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                >
                                    <div className="w-6 h-6 rounded-full bg-[#37c8c3]" />
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* Route Map asset */}
                        <motion.div
                            className="absolute w-36 h-28 sm:w-44 sm:h-36 top-4 right-0 sm:right-4"
                            animate="float4"
                            variants={floatVariants}
                        >
                            <div className="w-full h-full bg-surface/80 backdrop-blur-md rounded-3xl shadow-atmospheric flex items-center justify-center border border-[#444444]/50 p-4">
                                <div className="relative w-full h-full">
                                    <Map className="w-10 h-10 text-[#77ff00] absolute top-0 left-0" />
                                    {/* Route line */}
                                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 80">
                                        <motion.path
                                            d="M 10 60 Q 30 20 50 50 T 90 30"
                                            fill="none"
                                            stroke="#77ff00"
                                            strokeWidth="3"
                                            strokeLinecap="round"
                                            initial={{ pathLength: 0 }}
                                            animate={{ pathLength: 1 }}
                                            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                                        />
                                    </svg>
                                    {/* Dots on route */}
                                    <div className="absolute bottom-1 right-1 flex -space-x-1">
                                        {[...Array(3)].map((_, i) => (
                                            <motion.div
                                                key={i}
                                                className="w-3 h-3 rounded-full bg-brand-red-light border border-surface"
                                                animate={{ scale: [1, 1.2, 1] }}
                                                transition={{ duration: 1, delay: i * 0.2, repeat: Infinity }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Compass asset */}
                        <motion.div
                            className="absolute w-24 h-24 sm:w-28 sm:h-28 bottom-24 right-8 sm:right-16"
                            animate="float5"
                            variants={floatVariants}
                        >
                            <div className="w-full h-full bg-surface/80 backdrop-blur-md rounded-3xl shadow-atmospheric flex items-center justify-center border border-teal/30 group hover:border-teal transition-colors">
                                <motion.div
                                    animate={{ rotate: [0, 360] }}
                                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                >
                                    <Compass className="w-12 h-12 sm:w-14 sm:h-14 text-[#37c8c3]" />
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* Smartphone icon */}
                        <motion.div
                            className="absolute w-20 h-20 sm:w-24 sm:h-24 bottom-4 right-1/3"
                            animate={{
                                y: [0, -12, 0],
                                rotate: [0, -8, 0],
                            }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                        >
                            <div className="w-full h-full bg-linear-to-br from-brand-red-light to-brand-red rounded-2xl shadow-[0_20px_50px_rgba(200,55,55,0.4)] flex items-center justify-center">
                                <Smartphone className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
            >
                <div className="w-6 h-10 border-2 border-text-secondary/30 rounded-full flex justify-center pt-2">
                    <motion.div
                        className="w-1.5 h-3 bg-text-secondary/50 rounded-full"
                        animate={{ opacity: [1, 0, 1], y: [0, 4, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                </div>
            </motion.div>
        </section>
    );
}
