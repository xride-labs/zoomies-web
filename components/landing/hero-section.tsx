"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, Zap } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export function HeroSection() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" },
        },
    };

    const phoneVariants = {
        hidden: { opacity: 0, scale: 0.8, rotateY: -20 },
        visible: {
            opacity: 1,
            scale: 1,
            rotateY: 0,
            transition: { duration: 0.8, ease: "easeOut" },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, x: 0 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.6 },
        },
        float: {
            y: [0, -20, 0],
            transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
        },
    };

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-linear-to-br from-[#1a1a1a] via-[#222222] to-[#1a1a1a]" />

            {/* Decorative elements */}
            <motion.div
                className="absolute top-20 left-10 w-72 h-72 bg-brand-red/10 rounded-full blur-3xl"
                animate={{ x: [0, 20, -20, 0], y: [0, 30, -10, 0] }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute bottom-20 right-10 w-96 h-96 bg-brand-teal/10 rounded-full blur-3xl"
                animate={{ x: [0, -30, 10, 0], y: [0, -20, 20, 0] }}
                transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left content */}
                    <motion.div
                        className="text-center lg:text-left"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.div variants={itemVariants}>
                            <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm font-medium bg-brand-red/10 text-brand-red-light border-0 inline-flex items-center gap-2">
                                <Image src="/motorbike.png" alt="Motorbike" width={16} height={16} />
                                Built for Real Bikers
                            </Badge>
                        </motion.div>

                        <motion.h1
                            variants={itemVariants}
                            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6"
                        >
                            Ride Together,{" "}
                            <span className="text-brand-red-light">Build Your Tribe</span>
                        </motion.h1>

                        <motion.p
                            variants={itemVariants}
                            className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0"
                        >
                            The social platform where motorcycle riders discover clubs through people,
                            join organized rides like clan wars, and build their riding legacy.
                        </motion.p>

                        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
                            <Button size="lg" className="text-lg px-8 py-6 rounded-full" asChild>
                                <Link href="/signup">
                                    <Zap className="w-5 h-5 mr-2" />
                                    Start Riding
                                </Link>
                            </Button>
                            <Button size="lg" variant="outline" className="text-lg px-8 py-6 rounded-full" asChild>
                                <Link href="#how-it-works">Learn More</Link>
                            </Button>
                        </motion.div>

                        {/* Stats */}
                        <motion.div
                            variants={itemVariants}
                            className="flex flex-wrap gap-8 justify-center lg:justify-start"
                        >
                            <motion.div
                                className="text-center"
                                whileHover={{ scale: 1.1 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                                <div className="text-3xl font-bold text-foreground">10K+</div>
                                <div className="text-sm text-muted-foreground">Active Riders</div>
                            </motion.div>
                            <motion.div
                                className="text-center"
                                whileHover={{ scale: 1.1 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                                <div className="text-3xl font-bold text-foreground">500+</div>
                                <div className="text-sm text-muted-foreground">Clubs</div>
                            </motion.div>
                            <motion.div
                                className="text-center"
                                whileHover={{ scale: 1.1 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                                <div className="text-3xl font-bold text-foreground">2K+</div>
                                <div className="text-sm text-muted-foreground">Rides Completed</div>
                            </motion.div>
                        </motion.div>
                    </motion.div>

                    {/* Right content - Phone mockups / Image placeholder */}
                    <motion.div
                        className="relative flex justify-center lg:justify-end"
                        variants={phoneVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <div className="relative">
                            {/* Main phone mockup */}
                            <motion.div
                                className="w-72 h-145 bg-secondary rounded-[3rem] p-3 shadow-2xl"
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <div className="w-full h-full bg-[#1a1a1a] rounded-[2.5rem] overflow-hidden relative">
                                    {/* Phone content placeholder */}
                                    <div className="absolute inset-0 bg-linear-to-b from-brand-red/5 to-brand-red/20 flex flex-col items-center justify-center p-6">
                                        <motion.div
                                            className="w-20 h-20 bg-brand-red/20 rounded-full flex items-center justify-center mb-4"
                                            animate={{ scale: [1, 1.1, 1] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        >
                                            <Users className="w-10 h-10 text-brand-red-light" />
                                        </motion.div>
                                        <div className="text-center">
                                            <div className="font-semibold text-foreground mb-1">Desert Eagles MC</div>
                                            <div className="text-sm text-muted-foreground mb-4">128 members • Phoenix, AZ</div>
                                            <Badge className="bg-brand-green/10 text-brand-green border-0">
                                                <MapPin className="w-3 h-3 mr-1" />
                                                Ride in Progress
                                            </Badge>
                                        </div>

                                        {/* Rider avatars */}
                                        <div className="flex -space-x-3 mt-6">
                                            {[...Array(5)].map((_, i) => (
                                                <motion.div
                                                    key={i}
                                                    className="w-12 h-12 rounded-full bg-linear-to-br from-brand-red to-brand-red-light border-3 border-brand-grey flex items-center justify-center text-white font-semibold shadow-md"
                                                    animate={{ y: [0, -5, 0] }}
                                                    transition={{ duration: 2, delay: i * 0.1, repeat: Infinity }}
                                                >
                                                    {String.fromCharCode(65 + i)}
                                                </motion.div>
                                            ))}
                                            <div className="w-12 h-12 rounded-full bg-secondary border-3 border-brand-grey flex items-center justify-center text-white text-xs font-semibold shadow-md">
                                                +23
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Floating cards */}
                            <motion.div
                                className="absolute -left-16 top-20 bg-card rounded-2xl shadow-xl p-4 border border-border"
                                variants={cardVariants}
                                initial="hidden"
                                animate={["visible", "float"]}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-brand-green/10 rounded-full flex items-center justify-center">
                                        <MapPin className="w-5 h-5 text-brand-green" />
                                    </div>
                                    <div>
                                        <div className="font-medium text-sm">Live Tracking</div>
                                        <div className="text-xs text-muted-foreground">12 riders on route</div>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                className="absolute -right-8 bottom-32 bg-card rounded-2xl shadow-xl p-4 border border-border"
                                variants={cardVariants}
                                initial="hidden"
                                animate={["visible", "float"]}
                                transition={{ delay: 0.2 }}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-brand-teal/10 rounded-full flex items-center justify-center">
                                        <Zap className="w-5 h-5 text-brand-teal" />
                                    </div>
                                    <div>
                                        <div className="font-medium text-sm">Weekend Ride</div>
                                        <div className="text-xs text-muted-foreground">Starting in 2 days</div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center pt-2">
                    <motion.div
                        className="w-1.5 h-3 bg-muted-foreground/50 rounded-full"
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                </div>
            </motion.div>
        </section>
    );
}
