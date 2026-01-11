import { motion } from 'framer-motion'

type PhoneMock = {
    title: string
    subtitle: string
    badge: string
    gradient: string
    accent: string
}

const phones: PhoneMock[] = [
    {
        title: 'Ride Radar',
        subtitle: 'Explore biker meetups near you and plan routes with friends.',
        badge: 'Explore',
        gradient: 'from-[var(--color-secondary)] via-[var(--color-dark)] to-[var(--color-darker)]',
        accent: 'shadow-[0_15px_60px_-25px_rgba(232,76,61,0.7)]',
    },
    {
        title: 'Live Threads',
        subtitle: 'Connect in real time with riders headed the same way.',
        badge: 'Connect',
        gradient: 'from-[var(--color-primary)] via-[var(--color-accent)] to-[var(--color-secondary)]',
        accent: 'shadow-[0_15px_60px_-25px_rgba(255,107,91,0.9)]',
    },
    {
        title: 'Ride Stories',
        subtitle: 'Discover photo-verified profiles and ride highlights.',
        badge: 'Discover',
        gradient: 'from-[var(--color-dark)] via-[var(--color-secondary)] to-[var(--color-darker)]',
        accent: 'shadow-[0_15px_60px_-25px_rgba(26,26,46,0.8)]',
    },
]

const container = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.18, delayChildren: 0.12 },
    },
}

const item = {
    hidden: { opacity: 0, y: 28 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7 },
    },
}

export default function AppShowcase() {
    return (
        <motion.section
            id="showcase"
            className="relative overflow-hidden py-24 px-4 md:px-8 bg-[var(--color-darker)]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={container}
        >
            <div className="absolute inset-0 pointer-events-none">
                <motion.div
                    className="absolute -left-24 top-10 w-80 h-80 rounded-full bg-[var(--color-primary)] blur-3xl opacity-20"
                    animate={{ y: [0, -30, 0] }}
                    transition={{ duration: 9, repeat: Infinity }}
                />
                <motion.div
                    className="absolute -right-20 bottom-0 w-96 h-96 rounded-full bg-[var(--color-secondary)] blur-3xl opacity-25"
                    animate={{ y: [0, 30, 0] }}
                    transition={{ duration: 10, repeat: Infinity }}
                />

                {/* Decorative floating elements */}
                <motion.div
                    className="absolute top-32 right-16 text-5xl opacity-15"
                    animate={{ rotate: [0, 15, -15, 0], y: [0, -20, 0] }}
                    transition={{ duration: 7, repeat: Infinity }}
                >
                    🏍️
                </motion.div>

                <motion.div
                    className="absolute bottom-24 left-24 text-4xl opacity-15"
                    animate={{ rotate: [0, -20, 20, 0], y: [0, 15, 0] }}
                    transition={{ duration: 6, repeat: Infinity, delay: 0.5 }}
                >
                    🛑
                </motion.div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <motion.div
                    className="text-center max-w-4xl mx-auto mb-20"
                    variants={item}
                >
                    <motion.div
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--color-secondary)]/60 border border-white/10 text-base text-[var(--color-neutral-light)] mb-8"
                        whileHover={{ scale: 1.04 }}
                    >
                        <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-primary)] animate-pulse" />
                        Your Ride Starts Here
                    </motion.div>
                    <h2 className="text-4xl md:text-7xl lg:text-8xl font-black text-[var(--color-neutral-light)] mb-8 leading-none tracking-tight">
                        EXPERIENCE THE
                        <br />
                        <span style={{
                            backgroundImage: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}>
                            FREEDOM
                        </span>
                    </h2>
                    <p className="text-lg md:text-2xl text-white/70 font-semibold max-w-2xl mx-auto">
                        Three powerful features designed for the modern rider
                    </p>
                </motion.div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
                    variants={item}
                >
                    {phones.map((phone, index) => (
                        <motion.div
                            key={phone.title}
                            className={`relative aspect-[9/18] rounded-[32px] border border-white/10 bg-gradient-to-b ${phone.gradient} p-6 flex flex-col justify-between overflow-hidden ${phone.accent}`}
                            animate={{ y: [0, -14, 0] }}
                            transition={{ duration: 5 + index, repeat: Infinity }}
                            whileHover={{ scale: 1.02 }}
                        >
                            <div className="flex items-center justify-between text-xs text-white/60">
                                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 uppercase tracking-wide">
                                    {phone.badge}
                                </span>
                                <span className="h-2 w-2 rounded-full bg-[var(--color-primary)]" />
                            </div>
                            <div className="space-y-3">
                                <div className="h-9 w-24 rounded-full bg-white/10" />
                                <div className="h-12 w-full rounded-2xl bg-white/5" />
                                <div className="grid grid-cols-3 gap-3">
                                    <div className="h-16 rounded-xl bg-white/5" />
                                    <div className="h-16 rounded-xl bg-white/5" />
                                    <div className="h-16 rounded-xl bg-white/5" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-xl font-bold text-[var(--color-neutral-light)]">{phone.title}</h3>
                                <p className="text-sm text-white/70 leading-relaxed">{phone.subtitle}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-4"
                    variants={item}
                >
                    {['Explore rides near you with curated routes.', 'Connect instantly with verified bikers.', 'Discover stories, photos, and ride vibes.'].map(
                        (copy, idx) => (
                            <motion.div
                                key={copy}
                                className="p-5 rounded-2xl bg-[var(--color-secondary)]/60 border border-white/10 backdrop-blur"
                                whileHover={{ y: -6, scale: 1.01 }}
                            >
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="h-10 w-10 rounded-full bg-[var(--color-primary)]/15 border border-[var(--color-primary)]/30 flex items-center justify-center text-[var(--color-neutral-light)] font-semibold">
                                        {idx === 0 ? 'Explore' : idx === 1 ? 'Connect' : 'Discover'}
                                    </div>
                                    <p className="text-sm font-semibold text-[var(--color-neutral-light)]">{idx === 0 ? 'Explore' : idx === 1 ? 'Connect' : 'Discover'}</p>
                                </div>
                                <p className="text-white/70 text-sm leading-relaxed">{copy}</p>
                            </motion.div>
                        )
                    )}
                </motion.div>
            </div>
        </motion.section>
    )
}
