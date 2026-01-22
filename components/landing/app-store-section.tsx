"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Apple, Play, Heart } from "lucide-react";
import { useState } from "react";

export function AppStoreSection() {
    const [showInterest, setShowInterest] = useState(false);
    const [interested, setInterested] = useState(false);

    const handleShowInterest = () => {
        setInterested(!interested);
        setShowInterest(true);
        setTimeout(() => setShowInterest(false), 2000);
    };

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
            transition: { duration: 0.5, ease: "easeOut" },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.5, ease: "easeOut" },
        },
        hover: {
            y: -10,
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
            transition: { duration: 0.3 },
        },
    };

    return (
        <section className="py-24 bg-linear-to-b from-white to-orange-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section header */}
                <motion.div
                    className="text-center mb-16"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <motion.div variants={itemVariants} className="mb-4">
                        <Badge variant="secondary" className="px-4 py-2 text-sm font-medium bg-primary/10 text-primary border-0">
                            📱 Download Our App
                        </Badge>
                    </motion.div>

                    <motion.h2
                        variants={itemVariants}
                        className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4"
                    >
                        Ride On-the-Go
                    </motion.h2>

                    <motion.p variants={itemVariants} className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Get the Zoomies app and stay connected with your riding community anytime, anywhere.
                    </motion.p>
                </motion.div>

                {/* App store cards */}
                <motion.div
                    className="grid sm:grid-cols-2 gap-8 mb-12 max-w-2xl mx-auto"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {/* Google Play Store */}
                    <motion.div
                        variants={cardVariants}
                        whileHover="hover"
                        className="relative group cursor-pointer"
                    >
                        <div className="relative bg-white rounded-2xl p-8 border-2 border-gray-200 overflow-hidden">
                            {/* Coming Soon Badge with Opacity */}
                            <motion.div
                                initial={{ opacity: 0.6, y: -10 }}
                                whileInView={{ opacity: 0.7, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="absolute top-4 right-4 z-10"
                            >
                                <Badge className="bg-yellow-100/70 text-yellow-800 border-yellow-300/50 backdrop-blur-sm">
                                    Coming Soon
                                </Badge>
                            </motion.div>

                            <div className="flex flex-col items-center justify-center">
                                {/* Icon */}
                                <motion.div
                                    whileHover={{ rotate: 10, scale: 1.1 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                    className="mb-4 p-4 bg-green-50 rounded-xl"
                                >
                                    <Play className="w-12 h-12 text-green-600 fill-green-600" />
                                </motion.div>

                                {/* Text */}
                                <h3 className="text-xl font-bold text-foreground mb-2">Google Play Store</h3>
                                <p className="text-sm text-muted-foreground text-center mb-6">
                                    Android app available soon
                                </p>

                                {/* Button */}
                                <Button
                                    onClick={handleShowInterest}
                                    className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl"
                                    disabled={interested}
                                >
                                    {interested ? (
                                        <>
                                            <Heart className="w-4 h-4 mr-2 fill-white" />
                                            Interest Registered
                                        </>
                                    ) : (
                                        <>
                                            <Heart className="w-4 h-4 mr-2" />
                                            Show Interest
                                        </>
                                    )}
                                </Button>

                                {/* Success message */}
                                {showInterest && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        className="text-xs text-green-600 mt-3 font-medium"
                                    >
                                        ✓ Thanks for your interest!
                                    </motion.p>
                                )}
                            </div>

                            {/* Decorative gradient */}
                            <div className="absolute inset-0 bg-linear-to-br from-green-100/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                    </motion.div>

                    {/* Apple App Store */}
                    <motion.div
                        variants={cardVariants}
                        whileHover="hover"
                        className="relative group cursor-pointer"
                    >
                        <div className="relative bg-white rounded-2xl p-8 border-2 border-gray-200 overflow-hidden">
                            {/* Coming Soon Badge with Opacity */}
                            <motion.div
                                initial={{ opacity: 0.6, y: -10 }}
                                whileInView={{ opacity: 0.7, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="absolute top-4 right-4 z-10"
                            >
                                <Badge className="bg-yellow-100/70 text-yellow-800 border-yellow-300/50 backdrop-blur-sm">
                                    Coming Soon
                                </Badge>
                            </motion.div>

                            <div className="flex flex-col items-center justify-center">
                                {/* Icon */}
                                <motion.div
                                    whileHover={{ rotate: -10, scale: 1.1 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                    className="mb-4 p-4 bg-gray-50 rounded-xl"
                                >
                                    <Apple className="w-12 h-12 text-gray-900 fill-gray-900" />
                                </motion.div>

                                {/* Text */}
                                <h3 className="text-xl font-bold text-foreground mb-2">Apple App Store</h3>
                                <p className="text-sm text-muted-foreground text-center mb-6">
                                    iOS app coming this Q1
                                </p>

                                {/* Button */}
                                <Button
                                    onClick={handleShowInterest}
                                    className="w-full bg-gray-900 hover:bg-gray-800 text-white rounded-xl"
                                    disabled={interested}
                                >
                                    {interested ? (
                                        <>
                                            <Heart className="w-4 h-4 mr-2 fill-white" />
                                            Interest Registered
                                        </>
                                    ) : (
                                        <>
                                            <Heart className="w-4 h-4 mr-2" />
                                            Show Interest
                                        </>
                                    )}
                                </Button>

                                {/* Success message */}
                                {showInterest && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        className="text-xs text-gray-600 mt-3 font-medium"
                                    >
                                        ✓ Thanks for your interest!
                                    </motion.p>
                                )}
                            </div>

                            {/* Decorative gradient */}
                            <div className="absolute inset-0 bg-linear-to-br from-gray-100/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                    </motion.div>
                </motion.div>

                {/* Bottom CTA */}
                <motion.div
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    viewport={{ once: true }}
                >
                    <p className="text-muted-foreground">
                        In the meantime, use our web platform to connect with your community.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
