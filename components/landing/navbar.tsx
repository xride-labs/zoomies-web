"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { motion } from "framer-motion";

export function Navbar() {
    return (
        <motion.nav
            className="fixed top-0 left-0 right-0 z-50 bg-canvas/80 backdrop-blur-md"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3">
                        <Image
                            src="/motorbike.png"
                            alt="Zoomies"
                            width={44}
                            height={44}
                            className="w-11 h-11"
                        />
                        <span className="text-2xl font-bold text-white tracking-wide uppercase">
                            Zoomies
                        </span>
                    </Link>

                    {/* Single CTA - Get the App */}
                    <Button
                        asChild
                        className="rounded-full px-8 py-6 text-base font-semibold bg-linear-to-r from-brand-red-light to-brand-red hover:from-[#d94444] hover:to-[#960000] text-white border-0 shadow-[0_10px_30px_rgba(200,55,55,0.3)] transition-all duration-300 hover:shadow-[0_15px_40px_rgba(200,55,55,0.4)] hover:scale-105"
                    >
                        <Link href="/signup">Get the App</Link>
                    </Button>
                </div>
            </div>
        </motion.nav>
    );
}
