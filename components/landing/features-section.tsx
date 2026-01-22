"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Users,
    MapPin,
    ShoppingBag,
    Radio,
    Shield,
    Compass
} from "lucide-react";
import { motion } from "framer-motion";

const features = [
    {
        icon: Users,
        title: "Rider Identity",
        description: "Build your motorcycle profile. Show off your clubs, rides, and reputation. Your profile tells your riding story.",
        color: "bg-orange-100 text-orange-600",
    },
    {
        icon: Shield,
        title: "Motorcycle Clubs",
        description: "Join exclusive clubs. Request access through rider profiles. Club badges show your brotherhood on your profile.",
        color: "bg-blue-100 text-blue-600",
    },
    {
        icon: Compass,
        title: "Organized Rides",
        description: "Like clan wars for bikers. Schedule rides, track countdowns, and participate in epic group journeys.",
        color: "bg-green-100 text-green-600",
    },
    {
        icon: MapPin,
        title: "Live Convoy Tracking",
        description: "Real-time GPS tracking for your entire convoy. See all riders, their status, and keep everyone safe on the road.",
        color: "bg-purple-100 text-purple-600",
    },
    {
        icon: Radio,
        title: "Ride Chat",
        description: "Chat activates when rides start. Keep communication clean and focused. Auto-archives after rides end.",
        color: "bg-amber-100 text-amber-600",
    },
    {
        icon: ShoppingBag,
        title: "Marketplace",
        description: "Buy and sell bike parts, gear, and accessories. See seller's clubs and reputation before you deal.",
        color: "bg-pink-100 text-pink-600",
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

    const headerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0,
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
        hidden: { opacity: 0, scale: 0.8, y: 20 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" },
        },
        hover: {
            y: -8,
            transition: { duration: 0.3 },
        },
    };

    return (
        <section id="features" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section header */}
                <motion.div
                    className="text-center mb-16"
                    variants={headerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <motion.div variants={itemVariants}>
                        <Badge variant="secondary" className="mb-4 px-4 py-2 text-sm font-medium bg-primary/10 text-primary border-0">
                            Features
                        </Badge>
                    </motion.div>

                    <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                        Everything Bikers Need
                    </motion.h2>

                    <motion.p variants={itemVariants} className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        From discovering clubs to tracking rides in real-time. Built by riders, for riders.
                    </motion.p>
                </motion.div>

                {/* Features grid */}
                <motion.div
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <motion.div key={index} variants={cardVariants} whileHover="hover">
                                <Card className="border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg group h-full">
                                    <CardContent className="p-6">
                                        <motion.div
                                            className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-4`}
                                            whileHover={{ scale: 1.1, rotate: 10 }}
                                            animate={{ y: [0, -5, 0] }}
                                            transition={{ duration: 2, repeat: Infinity, delay: index * 0.1 }}
                                        >
                                            <Icon className="w-7 h-7" />
                                        </motion.div>

                                        <h3 className="text-xl font-semibold text-foreground mb-2">
                                            {feature.title}
                                        </h3>

                                        <p className="text-muted-foreground">
                                            {feature.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}

