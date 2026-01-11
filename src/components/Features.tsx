import { motion } from 'framer-motion'

type Feature = {
    title: string
    description: string
    icon: React.ReactNode
    accent: string
}

const features: Feature[] = [
    {
        title: 'Smart Matching',
        description: 'Ride intent, style, and safety preferences blend into matches that feel natural and real.',
        accent: 'from-[var(--color-primary)]/15 to-[var(--color-accent)]/10',
        icon: (
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M9 12a3 3 0 1 0-3 3" />
                <path d="M15 12a3 3 0 1 1 3 3" />
                <path d="M9 12h6" />
                <path d="M6 15h3l3 4 3-4h3" />
            </svg>
        ),
    },
    {
        title: 'Safety Verified',
        description: 'Layered trust with ID checks, safety prompts, and optional verification badges.',
        accent: 'from-[var(--color-secondary)]/40 to-[var(--color-dark)]/60',
        icon: (
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M12 4 5 7v5c0 4 2.8 7.5 7 8 4.2-.5 7-4 7-8V7z" />
                <path d="m9.5 12 1.7 1.7 3.3-3.4" />
            </svg>
        ),
    },
    {
        title: 'Photo Verification',
        description: 'Guided prompts confirm that photos are recent, authentic, and match the rider.',
        accent: 'from-[var(--color-primary)]/20 to-[var(--color-secondary)]/30',
        icon: (
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6">
                <rect x="4" y="6" width="16" height="12" rx="2" />
                <circle cx="12" cy="12" r="3" />
                <path d="M9 6 10.5 4h3L15 6" />
            </svg>
        ),
    },
    {
        title: 'Message Safely',
        description: 'Encrypted delivery, content controls, and quick report shortcuts keep chats respectful.',
        accent: 'from-[var(--color-dark)]/50 to-[var(--color-secondary)]/30',
        icon: (
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M5 5h14v10H8l-3 3z" />
                <path d="M12 9v2" />
                <path d="M12 13h.01" />
            </svg>
        ),
    },
    {
        title: 'Join Rides',
        description: 'Post a ride, pick your pace, and match with riders heading the same route.',
        accent: 'from-[var(--color-primary)]/18 to-[var(--color-accent)]/12',
        icon: (
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M5 17a3 3 0 1 1 0-6h3l3-4h5" />
                <path d="M16 17a3 3 0 1 0 0-6h-2" />
                <path d="m9 11 3 6" />
            </svg>
        ),
    },
    {
        title: 'Community Events',
        description: 'RSVP to curated biker socials, safety workshops, and long-ride weekends.',
        accent: 'from-[var(--color-secondary)]/35 to-[var(--color-dark)]/55',
        icon: (
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M7 4v3" />
                <path d="M17 4v3" />
                <rect x="4" y="7" width="16" height="13" rx="2" />
                <path d="M4 11h16" />
                <path d="M9 14h3" />
            </svg>
        ),
    },
]

const container = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.12 },
    },
}

const item = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.65 },
    },
}

export default function Features() {
    return (
        <motion.section
            id="features"
            className="relative py-24 px-4 md:px-8 overflow-hidden bg-darker"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={container}
        >
            <div className="absolute inset-0 pointer-events-none">
                <motion.div
                    className="absolute -top-20 left-10 w-72 h-72 rounded-full bg-primary blur-3xl opacity-20"
                    animate={{ y: [0, 40, 0], rotate: [0, 90, 0] }}
                    transition={{ duration: 12, repeat: Infinity }}
                />
                <motion.div
                    className="absolute -bottom-16 right-4 w-96 h-96 rounded-full bg-secondary blur-3xl opacity-25"
                    animate={{ y: [0, -40, 0], rotate: [0, -90, 0] }}
                    transition={{ duration: 13, repeat: Infinity }}
                />

                {/* More decorative elements */}
                <motion.div
                    className="absolute top-40 right-32 text-5xl opacity-10"
                    animate={{ rotate: [0, 20, -10, 0], y: [0, -25, 0] }}
                    transition={{ duration: 8, repeat: Infinity }}
                >
                    🛡️
                </motion.div>

                <motion.div
                    className="absolute bottom-40 left-32 text-6xl opacity-10"
                    animate={{ rotate: [0, -25, 15, 0], y: [0, 20, 0] }}
                    transition={{ duration: 7, repeat: Infinity, delay: 0.5 }}
                >
                    ⭐
                </motion.div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <motion.div
                    className="text-center mb-20"
                    variants={item}
                >
                    <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-base text-neutral-light mb-8">
                        <span className="h-2.5 w-2.5 rounded-full bg-primary animate-pulse" />
                        Built for bikers who want real connections
                    </div>
                    <h2 className="text-4xl md:text-7xl lg:text-8xl font-black text-neutral-light leading-none tracking-tight mb-8">
                        SAY YES TO
                        <br />
                        <span style={{
                            backgroundImage: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}>
                            SAFE RIDES
                        </span>
                    </h2>
                    <p className="text-lg md:text-2xl text-white/70 max-w-3xl mx-auto font-semibold">
                        Everything from trust layers to ride planning lives in one focused experience.
                    </p>
                </motion.div>

                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
                    variants={item}
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            className="relative p-6 rounded-2xl border border-white/10 bg-secondary/65 backdrop-blur group overflow-hidden"
                            variants={item}
                            whileHover={{ y: -8, scale: 1.01 }}
                        >
                            <div className={`absolute inset-0 bg-linear-to-br ${feature.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                            <div className="relative flex items-center justify-between mb-4">
                                <div className="h-12 w-12 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center text-neutral-light">
                                    {feature.icon}
                                </div>
                                <motion.span
                                    className="text-xs px-3 py-1 rounded-full bg-white/10 border border-white/15 text-white/70"
                                    animate={{ opacity: [0.6, 1, 0.6] }}
                                    transition={{ duration: 3 + index * 0.2, repeat: Infinity }}
                                >
                                    Ride-ready
                                </motion.span>
                            </div>
                            <h3 className="relative text-xl font-semibold text-neutral-light mb-2">
                                {feature.title}
                            </h3>
                            <p className="relative text-white/70 leading-relaxed text-sm">
                                {feature.description}
                            </p>
                            <motion.div
                                className="relative mt-5 h-1 rounded-full bg-white/10"
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.7, delay: 0.1 * index }}
                            />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </motion.section>
    )
}
