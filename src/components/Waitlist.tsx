import { motion } from 'framer-motion'
import { useState } from 'react'

type Status = 'idle' | 'success' | 'error'

const container = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
}

const item = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6 },
    },
}

export default function Waitlist() {
    const [email, setEmail] = useState('')
    const [status, setStatus] = useState<Status>('idle')
    const [message, setMessage] = useState('')

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const isValid = /[^\s@]+@[^\s@]+\.[^\s@]+/.test(email)

        if (!isValid) {
            setStatus('error')
            setMessage('Enter a valid email to join the waitlist.')
            return
        }

        setStatus('success')
        setMessage('You are in! Watch your inbox for the first ride drop.')
        setEmail('')
    }

    return (
        <motion.section
            id="waitlist"
            className="relative overflow-hidden py-24 px-4 md:px-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={container}
        >
            <div className="absolute inset-0 bg-linear-to-br from-secondary via-dark to-darker" />
            <motion.div
                className="absolute -left-10 top-10 w-72 h-72 rounded-full bg-primary blur-3xl opacity-25"
                animate={{ y: [0, -25, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
                className="absolute -right-16 bottom-10 w-80 h-80 rounded-full bg-accent blur-3xl opacity-20"
                animate={{ y: [0, 25, 0] }}
                transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
            />

            <div className="max-w-5xl mx-auto relative z-10">
                <motion.div
                    className="text-center mb-16"
                    variants={item}
                >
                    <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-base text-neutral-light mb-8">
                        <span className="h-2.5 w-2.5 rounded-full bg-primary animate-pulse" />
                        Exclusive early access
                    </div>
                    <h2 className="text-4xl md:text-7xl lg:text-8xl font-black text-neutral-light leading-none tracking-tight mb-8">
                        READY TO
                        <br />
                        <span style={{
                            backgroundImage: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}>
                            HIT THE ROAD?
                        </span>
                    </h2>
                    <p className="text-lg md:text-2xl text-white/70 font-semibold max-w-2xl mx-auto">
                        Get launch invites, safety updates, and first access to ride meetups near you.
                    </p>
                </motion.div>

                <motion.form
                    onSubmit={handleSubmit}
                    className="p-6 md:p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-lg shadow-xl"
                    variants={item}
                >
                    <div className="flex flex-col md:flex-row gap-3 md:gap-4 items-center">
                        <div className="w-full">
                            <label className="block text-sm text-white/70 mb-2">Email address</label>
                            <div className={`flex items-center rounded-full border px-3 md:px-4 transition-all duration-300 bg-darker/70 ${status === 'error' ? 'border-red-400/70 shadow-[0_0_0_4px_rgba(232,76,61,0.15)]' : 'border-white/15'
                                }`}>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    className="w-full bg-transparent py-3 md:py-4 text-neutral-light placeholder:text-white/50 focus:outline-none"
                                />
                            </div>
                        </div>
                        <motion.button
                            type="submit"
                            className="w-full md:w-auto whitespace-nowrap px-6 md:px-8 py-3 md:py-4 rounded-full bg-primary text-neutral-light font-semibold hover:scale-105 hover:shadow-[0_15px_50px_-20px_rgba(232,76,61,0.9)] transition-all"
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.97 }}
                        >
                            Get early access
                        </motion.button>
                    </div>
                    {status !== 'idle' && (
                        <motion.p
                            className={`mt-4 text-sm ${status === 'success' ? 'text-green-300' : 'text-red-300'}`}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            {message}
                        </motion.p>
                    )}
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3 text-white/60 text-sm">
                        {['Safety-first verification', 'Ride match notifications', 'Opt-out anytime'].map((bullet) => (
                            <motion.div
                                key={bullet}
                                className="flex items-center gap-2"
                                whileHover={{ x: 4 }}
                            >
                                <span className="h-2 w-2 rounded-full bg-accent" />
                                <span>{bullet}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.form>
            </div>
        </motion.section>
    )
}
