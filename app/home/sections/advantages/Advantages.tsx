"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";
import { useIsPhone } from "@/hooks/useIsPhone";

export const AdvantagesSection = () => {
    const { t } = useLocale();
    const isPhone = useIsPhone();
    const d = isPhone ? 0.35 : 0.6;
    const yIn = isPhone ? 10 : 20;
    const advantages = t.advantages.list;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: isPhone ? 0.05 : 0.1,
                delayChildren: isPhone ? 0.1 : 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, x: isPhone ? -8 : -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: d },
        },
    };

    return (
        <section className="py-10 md:py-24 px-4 sm:px-6 md:px-8 bg-white dark:bg-[#070f1f]">
            <div className="max-w-4xl mx-auto">
                {/* Primary Heading */}
                <motion.div
                    initial={{ opacity: 0, y: yIn }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: d }}
                    viewport={{ once: true }}
                    className="-mb-1"
                >
                    <h2 className="primary-heading">
                        {t.advantages.title1}
                        <br />
                        {t.advantages.title2}
                    </h2>
                </motion.div>

                {/* Secondary Description */}
                <motion.p
                    initial={{ opacity: 0, y: yIn }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: d, delay: isPhone ? 0.05 : 0.1 }}
                    viewport={{ once: true }}
                    className="secondary-heading"
                >
                    {t.advantages.text}
                </motion.p>

                {/* What Makes Nexa Pay Different */}
                <motion.div
                    initial={{ opacity: 0, y: yIn }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: d, delay: isPhone ? 0.1 : 0.2 }}
                    viewport={{ once: true }}
                >
                    <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4 ">
                        {t.advantages.listTitle}
                    </h3>

                    <motion.ul
                        className="space-y-3"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {advantages.map((advantage, index) => (
                            <motion.li key={index} variants={itemVariants} className="flex gap-2 items-start">
                                <CheckCircle2 className="size-5 text-blue-600 dark:text-blue-300 flex-shrink-0 mt-0.5" />
                                <span className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                                    {advantage}
                                </span>
                            </motion.li>
                        ))}
                    </motion.ul>
                </motion.div>
            </div>
        </section>
    );
};
