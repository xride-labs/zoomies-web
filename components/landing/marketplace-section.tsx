"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Star, ShoppingBag, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

const listings = [
    {
        title: "Shoei RF-1400 Helmet",
        price: "₹37,500",
        condition: "Like New",
        location: "Austin, TX",
        seller: "RoadKing_Mike",
        clubs: ["Hill Country Riders", "Texas Thunder"],
        rating: 4.9,
    },
    {
        title: "Akrapovic Exhaust System",
        price: "₹99,000",
        condition: "Used",
        location: "Denver, CO",
        seller: "MountainCruiser",
        clubs: ["Rocky Mountain MC"],
        rating: 4.7,
    },
    {
        title: "Alpinestars GP Pro Gloves",
        price: "₹14,850",
        condition: "New",
        location: "Miami, FL",
        seller: "SunshineRider",
        clubs: ["Beach Cruisers", "305 Riders"],
        rating: 5.0,
    },
    {
        title: "Ohlins Rear Shock",
        price: "₹70,000",
        condition: "Excellent",
        location: "Seattle, WA",
        seller: "PNW_Rider",
        clubs: ["Pacific Northwest MC"],
        rating: 4.8,
    },
];

export function MarketplaceSection() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
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
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" },
        },
        hover: {
            y: -10,
            transition: { duration: 0.3 },
        },
    };

    return (
        <section id="marketplace" className="py-24 bg-white">
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
                            <ShoppingBag className="w-4 h-4 mr-1 inline" />
                            Marketplace
                        </Badge>
                    </motion.div>

                    <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                        Gear Up, Trust the Seller
                    </motion.h2>

                    <motion.p variants={itemVariants} className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Buy and sell motorcycle parts & gear. Every seller's clubs and reputation visible.
                        No faceless transactions.
                    </motion.p>
                </motion.div>

                {/* Listings grid */}
                <motion.div
                    className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {listings.map((listing, index) => (
                        <motion.div key={index} variants={cardVariants} whileHover="hover">
                            <Card className="border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg group cursor-pointer overflow-hidden h-full">
                                {/* Image placeholder */}
                                <div className="aspect-square bg-linear-to-br from-zinc-100 to-zinc-200 flex items-center justify-center relative overflow-hidden">
                                    <motion.div
                                        animate={{ scale: [1, 1.1, 1] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    >
                                        <Image
                                            src="/motorbike.png"
                                            alt="Motorbike"
                                            width={120}
                                            height={120}
                                            className="opacity-30"
                                        />
                                    </motion.div>
                                    <Badge className="absolute top-3 left-3 bg-white/90 text-foreground border-0 shadow-sm">
                                        {listing.condition}
                                    </Badge>
                                </div>

                                <CardContent className="p-4">
                                    <div className="flex items-start justify-between mb-2">
                                        <h3 className="font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                                            {listing.title}
                                        </h3>
                                    </div>

                                    <motion.div
                                        className="text-xl font-bold text-primary mb-3"
                                        whileHover={{ scale: 1.05 }}
                                    >
                                        {listing.price}
                                    </motion.div>

                                    {/* Seller info */}
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-full bg-linear-to-br from-orange-300 to-amber-400 flex items-center justify-center text-white text-xs font-semibold">
                                                {listing.seller[0]}
                                            </div>
                                            <span className="text-sm text-muted-foreground">{listing.seller}</span>
                                            <div className="flex items-center gap-0.5 ml-auto">
                                                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                                                <span className="text-xs font-medium">{listing.rating}</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                            <MapPin className="w-3 h-3" />
                                            {listing.location}
                                        </div>

                                        {/* Club badges */}
                                        <div className="flex flex-wrap gap-1">
                                            {listing.clubs.slice(0, 2).map((club, i) => (
                                                <Badge
                                                    key={i}
                                                    variant="secondary"
                                                    className="text-[10px] px-2 py-0.5 bg-secondary/50"
                                                >
                                                    {club}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>

                {/* CTA */}
                <motion.div
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    viewport={{ once: true }}
                >
                    <Button size="lg" variant="outline" className="rounded-full" asChild>
                        <Link href="/marketplace">
                            Browse All Listings
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                    </Button>
                </motion.div>
            </div>
        </section>
    );
}

