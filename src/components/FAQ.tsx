import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

type FaqItem = {
    question: string
    answer: string
}

const faqs: FaqItem[] = [
    {
        question: 'How does matching work for riders?',
        answer: 'We blend ride preferences, proximity, and activity times to surface the safest, most compatible biker matches near you.',
    },
    {
        question: 'What safety checks are in place?',
        answer: 'Every profile can enable ID review, ride history signals, and in-app safety prompts before meeting up. We also support quick SOS shortcuts.',
    },
    {
        question: 'Can I verify my photos?',
        answer: 'Yes. Photo verification uses guided poses and light checks to confirm that your profile photos are recent and authentic.',
    },
    {
        question: 'Do I have to share my exact location?',
        answer: 'No. You control precision. Share approximate areas for discovery and only reveal exact meetup spots when you are ready.',
    },
    {
        question: 'What about group rides and events?',
        answer: 'You can join hosted rides, RSVP to community events, and share itineraries with matched riders directly in the app.',
    },
    {
        question: 'Is messaging secure?',
        answer: 'Chats are protected with transport encryption, report shortcuts, and privacy controls that let you limit incoming requests.',
    },
]

const container = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.08, delayChildren: 0.12 },
    },
}

const item = {
    hidden: { opacity: 0, y: 18 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.55 },
    },
}

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0)

    const toggle = (index: number) => {
        setOpenIndex((prev) => (prev === index ? null : index))
    }

    return (
        <motion.section
            id="faq"
            className="relative py-24 px-4 md:px-8 bg-darker"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={container}
        >
            <div className="max-w-5xl mx-auto">
                <motion.div
                    className="text-center mb-12"
                    variants={item}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-neutral-light">
                        <span className="h-2 w-2 rounded-full bg-primary" />
                        Answers for safer riding
                    </div>
                    <h2 className="mt-6 text-4xl md:text-5xl font-extrabold text-neutral-light">
                        Frequently asked questions
                    </h2>
                    <p className="mt-3 text-white/65">
                        Everything about matching, safety, and joining the biker community.
                    </p>
                </motion.div>

                <motion.div
                    className="space-y-3"
                    variants={item}
                >
                    {faqs.map((faq, index) => {
                        const isOpen = openIndex === index
                        return (
                            <motion.div
                                key={faq.question}
                                className="rounded-2xl border border-white/10 bg-secondary/60 backdrop-blur"
                                initial={false}
                                whileHover={{ scale: 1.01 }}
                            >
                                <button
                                    className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left text-neutral-light"
                                    onClick={() => toggle(index)}
                                >
                                    <span className="text-lg font-semibold">{faq.question}</span>
                                    <motion.span
                                        className="h-9 w-9 rounded-full border border-white/15 flex items-center justify-center text-sm"
                                        animate={{ rotate: isOpen ? 45 : 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        +
                                    </motion.span>
                                </button>
                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            key="content"
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.25 }}
                                            className="px-5 pb-5"
                                        >
                                            <p className="text-white/70 leading-relaxed text-sm md:text-base">
                                                {faq.answer}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        )
                    })}
                </motion.div>
            </div>
        </motion.section>
    )
}
