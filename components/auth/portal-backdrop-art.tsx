'use client'

import { motion } from 'framer-motion'

interface PortalBackdropArtProps {
    accent?: 'red' | 'teal'
}

export function PortalBackdropArt({ accent = 'red' }: PortalBackdropArtProps) {
    const glow = accent === 'teal' ? '#37c8c3' : '#c83737'
    const glowSoft = accent === 'teal' ? 'rgba(55, 200, 195, 0.22)' : 'rgba(200, 55, 55, 0.22)'

    return (
        <motion.svg
            aria-hidden="true"
            viewBox="0 0 1440 900"
            className="pointer-events-none absolute inset-0 h-full w-full opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
        >
            <defs>
                <linearGradient id="portal-grid" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor={glow} stopOpacity="0.65" />
                    <stop offset="100%" stopColor="#77ff00" stopOpacity="0.28" />
                </linearGradient>
                <radialGradient id="portal-halo" cx="50%" cy="40%" r="62%">
                    <stop offset="0%" stopColor={glowSoft} />
                    <stop offset="100%" stopColor="rgba(18, 18, 18, 0)" />
                </radialGradient>
            </defs>

            <rect width="1440" height="900" fill="url(#portal-halo)" />

            <g stroke="url(#portal-grid)" strokeWidth="1" fill="none" opacity="0.5">
                <path d="M0 180 C220 120, 360 280, 560 220 S940 120, 1440 210" />
                <path d="M0 330 C190 250, 420 420, 640 330 S1020 240, 1440 320" />
                <path d="M0 500 C230 430, 450 620, 680 520 S1060 420, 1440 500" />
                <path d="M0 670 C200 600, 440 780, 720 680 S1080 590, 1440 700" />
            </g>

            <g stroke={glow} strokeWidth="1.2" fill="none" opacity="0.4">
                <circle cx="230" cy="190" r="90" />
                <circle cx="1180" cy="650" r="120" />
                <path d="M860 160 L980 120 L1100 160 L1060 290 L900 320 Z" />
            </g>

            <g fill={glow} opacity="0.5">
                <circle cx="160" cy="590" r="3" />
                <circle cx="420" cy="740" r="2.5" />
                <circle cx="980" cy="210" r="2.5" />
                <circle cx="1260" cy="430" r="3" />
            </g>
        </motion.svg>
    )
}
