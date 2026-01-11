import { motion } from 'framer-motion'

export default function Footer() {
    const currentYear = new Date().getFullYear()

    const footerLinks = {
        Product: ['Features', 'Download', 'Safety', 'How It Works'],
        Company: ['About Us', 'Blog', 'Careers', 'Contact'],
        Resources: ['Support', 'Community', 'Guidelines', 'Tips'],
        Legal: ['Privacy Policy', 'Terms', 'Safety Center', 'Trust'],
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 },
        },
    }

    return (
        <footer className="relative bg-dark-900 border-t border-pink-500/10 py-16 px-4 md:px-8">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12 pb-12 border-b border-pink-500/10"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <motion.div variants={itemVariants} className="col-span-1 lg:col-span-1">
                        <h3 className="text-2xl font-bold mb-3 flex items-center gap-2">
                            <span>🏍️</span> <span style={{ color: 'var(--color-neutral-light)' }}>RideMatch</span>
                        </h3>
                        <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--color-neutral-light)', opacity: 0.6 }}>
                            Connect with passionate bikers. Share your journey.
                        </p>
                        <div className="flex gap-3">
                            <a
                                href="#"
                                className="w-10 h-10 flex items-center justify-center bg-pink-500/10 border border-pink-500/20 rounded-full text-pink-500 hover:bg-pink-500 hover:text-white transition-all duration-300"
                                aria-label="Twitter"
                            >
                                𝕏
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 flex items-center justify-center bg-pink-500/10 border border-pink-500/20 rounded-full text-pink-500 hover:bg-pink-500 hover:text-white transition-all duration-300"
                                aria-label="LinkedIn"
                            >
                                in
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 flex items-center justify-center bg-pink-500/10 border border-pink-500/20 rounded-full text-pink-500 hover:bg-pink-500 hover:text-white transition-all duration-300"
                                aria-label="GitHub"
                            >
                                ⚙
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 flex items-center justify-center bg-pink-500/10 border border-pink-500/20 rounded-full text-pink-500 hover:bg-pink-500 hover:text-white transition-all duration-300"
                                aria-label="Discord"
                            >
                                ◇
                            </a>
                        </div>
                    </motion.div>

                    {Object.entries(footerLinks).map(([category, links]) => (
                        <motion.div key={category} variants={itemVariants} className="col-span-1">
                            <h4 className="text-white font-bold mb-4 text-sm">{category}</h4>
                            <ul className="space-y-2">
                                {links.map((link) => (
                                    <li key={link}>
                                        <a
                                            href="#"
                                            className="text-gray-400 text-sm hover:text-pink-500 transition-colors duration-300"
                                        >
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    viewport={{ once: true }}
                >
                    <p className="text-gray-500 text-sm">&copy; {currentYear} SparkPlug. All rights reserved.</p>
                    <p className="text-gray-500 text-sm">Made with ✨ by the SparkPlug team</p>
                </motion.div>
            </div>
        </footer>
    )
}
