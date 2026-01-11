import { useState } from 'react'
import { motion } from 'framer-motion'

export default function Header() {
    const [isOpen, setIsOpen] = useState(false)

    const navItems = ['Features', 'App', 'FAQ']

    const menuVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, y: -10 },
        visible: { opacity: 1, y: 0 },
    }

    return (
        <header className="fixed top-0 w-full bg-dark-900/80 backdrop-blur-md border-b border-pink-500/10 z-1000 px-4 md:px-8 py-4">
            <div className="max-w-6xl mx-auto flex justify-between items-center gap-8">
                <motion.div
                    className="cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
                        <span>🏍️</span> <span style={{ color: 'var(--color-neutral-light)' }}>RideMatch</span>
                    </h1>
                </motion.div>

                <nav
                    className={`${isOpen ? 'flex' : 'hidden'
                        } md:flex absolute md:relative top-16 md:top-0 left-0 right-0 md:left-auto md:right-auto flex-col md:flex-row gap-4 md:gap-8 bg-dark-900/95 md:bg-transparent px-4 md:px-0 py-4 md:py-0 border-b md:border-0 border-pink-500/10`}
                >
                    <motion.div
                        className="flex flex-col md:flex-row gap-4 md:gap-8 w-full md:w-auto"
                        variants={menuVariants}
                        initial="hidden"
                        animate={isOpen ? 'visible' : 'hidden'}
                    >
                        {navItems.map((item) => (
                            <motion.a
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                variants={itemVariants}
                                className="text-white font-medium relative group hover:text-pink-500 transition-colors duration-300"
                                onClick={() => setIsOpen(false)}
                            >
                                {item}
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-pink-500 group-hover:w-full transition-all duration-300"></span>
                            </motion.a>
                        ))}
                    </motion.div>
                </nav>

                <motion.button
                    className="hidden md:block px-6 py-2 text-white font-bold rounded-full transition-colors"
                    style={{ backgroundColor: 'var(--color-primary)' }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Join Waitlist
                </motion.button>

                <button
                    className="md:hidden flex flex-col gap-1.5 bg-none border-none cursor-pointer p-0"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <span
                        className={`w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''
                            }`}
                    ></span>
                    <span
                        className={`w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? 'opacity-0' : ''
                            }`}
                    ></span>
                    <span
                        className={`w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''
                            }`}
                    ></span>
                </button>
            </div>
        </header>
    )
}
