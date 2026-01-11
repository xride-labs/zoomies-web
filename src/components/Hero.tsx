import { motion } from 'framer-motion'

export default function Hero() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8 },
        },
    }

    const floatingVariants = {
        animate: {
            y: [0, -20, 0],
            transition: {
                duration: 4,
                repeat: Infinity,
            },
        },
    }

    return (
        <section className="relative min-h-screen flex items-center justify-center px-4 md:px-8 pt-32 pb-16 overflow-hidden">
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-linear-to-b from-secondary via-dark to-darker" />

            {/* Animated Orbs */}
            <motion.div
                className="absolute top-20 left-10 w-72 h-72 rounded-full opacity-20"
                style={{
                    background: 'radial-gradient(circle, var(--color-primary) 0%, transparent 70%)',
                    filter: 'blur(40px)',
                }}
                animate={{
                    y: [0, 30, 0],
                    x: [0, 20, 0],
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                }}
            />

            <motion.div
                className="absolute bottom-20 right-10 w-96 h-96 rounded-full opacity-15"
                style={{
                    background: 'radial-gradient(circle, var(--color-accent) 0%, transparent 70%)',
                    filter: 'blur(40px)',
                }}
                animate={{
                    y: [0, -30, 0],
                    x: [0, -20, 0],
                }}
                transition={{
                    duration: 7,
                    repeat: Infinity,
                }}
            />

            {/* Floating Elements */}
            <motion.div
                className="absolute top-40 right-20 text-4xl opacity-10"
                variants={floatingVariants}
                animate="animate"
            >
                🏍️
            </motion.div>

            <motion.div
                className="absolute bottom-40 left-20 text-5xl opacity-10"
                variants={floatingVariants}
                animate="animate"
                transition={{ delay: 1 }}
            >
                ⚡
            </motion.div>

            {/* More Decorative Elements */}
            <motion.div
                className="absolute top-20 left-32 text-6xl opacity-20"
                animate={{ rotate: [0, 10, -10, 0], y: [0, -15, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
            >
                🛣️
            </motion.div>

            <motion.div
                className="absolute top-60 right-40 text-5xl opacity-15"
                animate={{ rotate: [0, -15, 15, 0], y: [0, 20, 0] }}
                transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
            >
                ⛽
            </motion.div>

            <motion.div
                className="absolute bottom-32 right-24 text-6xl opacity-20"
                animate={{ rotate: [0, 20, -10, 0], y: [0, -25, 0] }}
                transition={{ duration: 7, repeat: Infinity, delay: 1 }}
            >
                🏁
            </motion.div>

            {/* Content */}
            <motion.div
                className="relative z-10 max-w-6xl mx-auto text-center"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div variants={itemVariants} className="mb-12">
                    <h1 className="text-5xl md:text-8xl lg:text-9xl font-black leading-none tracking-tight mb-8">
                        <span style={{
                            backgroundImage: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            display: 'block',
                            marginBottom: '0.25em'
                        }}>
                            RIDE
                        </span>
                        <span className="text-neutral-light block" style={{ fontSize: '0.7em' }}>
                            THE WAY YOU
                        </span>
                        <span style={{
                            backgroundImage: 'linear-gradient(135deg, var(--color-accent), var(--color-primary))',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}>
                            CONNECT
                        </span>
                    </h1>
                </motion.div>

                <motion.p variants={itemVariants} className="text-xl md:text-3xl text-neutral-light font-bold mb-12 max-w-3xl mx-auto leading-relaxed">
                    Find Your Tribe. Share The Road.
                </motion.p>

                <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 justify-center mb-20">
                    <button className="px-12 py-6 text-white font-black text-xl rounded-full hover:scale-105 transition-all shadow-2xl" style={{
                        background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))',
                        boxShadow: '0 20px 60px -10px rgba(232, 76, 61, 0.5)',
                    }}>
                        Join Waitlist →
                    </button>
                </motion.div>

                {/* App Preview Card */}
                <motion.div
                    variants={itemVariants}
                    className="relative mt-16 flex justify-center items-end gap-4"
                >
                    {/* Left Phone Mockup */}
                    <motion.div
                        animate={{ y: [0, -15, 0] }}
                        transition={{ duration: 5, repeat: Infinity }}
                        className="w-48 md:w-56"
                    >
                        <div className="rounded-3xl border-8 p-2 shadow-2xl" style={{
                            backgroundColor: 'var(--color-secondary)',
                            borderColor: 'var(--color-neutral-dark)',
                        }}>
                            <div className="bg-black rounded-2xl aspect-9/16 flex items-center justify-center relative overflow-hidden">
                                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center" style={{
                                    background: 'linear-gradient(to bottom, rgba(232, 76, 61, 0.5), black, black)',
                                }}>
                                    <div className="text-3xl mb-2">🏍️</div>
                                    <div className="text-sm font-bold text-neutral-light">Explore</div>
                                    <div className="text-xs opacity-60 mt-2" style={{ color: 'var(--color-neutral-light)' }}>Find nearby riders</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Center Phone Mockup - Highlighted */}
                    <motion.div
                        animate={{ y: [-20, 0, -20] }}
                        transition={{ duration: 5, repeat: Infinity }}
                        className="w-56 md:w-64 -mx-4 z-10"
                    >
                        <div className="rounded-3xl border-8 p-2 shadow-2xl relative" style={{
                            backgroundColor: 'var(--color-secondary)',
                            borderColor: 'var(--color-primary)',
                        }}>
                            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold text-white" style={{
                                backgroundColor: 'var(--color-primary)',
                            }}>
                                Available Soon
                            </div>
                            <div className="bg-black rounded-2xl aspect-9/16 flex items-center justify-center relative overflow-hidden">
                                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center" style={{
                                    background: 'linear-gradient(to bottom, rgba(255, 107, 91, 0.5), black, black)',
                                }}>
                                    <div className="text-4xl mb-2">❤️</div>
                                    <div className="text-sm font-bold text-neutral-light">Connect</div>
                                    <div className="text-xs opacity-60 mt-2" style={{ color: 'var(--color-neutral-light)' }}>Match with riders</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Phone Mockup */}
                    <motion.div
                        animate={{ y: [0, -15, 0] }}
                        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                        className="w-48 md:w-56"
                    >
                        <div className="rounded-3xl border-8 p-2 shadow-2xl" style={{
                            backgroundColor: 'var(--color-secondary)',
                            borderColor: 'var(--color-neutral-dark)',
                        }}>
                            <div className="bg-black rounded-2xl aspect-9/16 flex items-center justify-center relative overflow-hidden">
                                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center" style={{
                                    background: 'linear-gradient(to bottom, rgba(232, 76, 61, 0.5), black, black)',
                                }}>
                                    <div className="text-3xl mb-2">🗺️</div>
                                    <div className="text-sm font-bold text-neutral-light">Discover</div>
                                    <div className="text-xs opacity-60 mt-2" style={{ color: 'var(--color-neutral-light)' }}>Plan group rides</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Stats */}
                <motion.div variants={itemVariants} className="grid grid-cols-3 gap-4 md:gap-8 mt-24 px-4">
                    <div>
                        <div className="text-3xl md:text-4xl font-bold" style={{ color: 'var(--color-primary)' }}>10K+</div>
                        <p className="text-sm opacity-60 mt-2" style={{ color: 'var(--color-neutral-light)' }}>Bikers Waiting</p>
                    </div>
                    <div>
                        <div className="text-3xl md:text-4xl font-bold" style={{ color: 'var(--color-primary)' }}>50+</div>
                        <p className="text-sm opacity-60 mt-2" style={{ color: 'var(--color-neutral-light)' }}>Cities</p>
                    </div>
                    <div>
                        <div className="text-3xl md:text-4xl font-bold" style={{ color: 'var(--color-primary)' }}>100%</div>
                        <p className="text-sm opacity-60 mt-2" style={{ color: 'var(--color-neutral-light)' }}>Safe & Secure</p>
                    </div>
                </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <div style={{ color: 'var(--color-primary)', opacity: 0.6 }}>
                    <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </div>
            </motion.div>
        </section>
    )
}
