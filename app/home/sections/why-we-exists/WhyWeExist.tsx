"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";
import { useIsPhone } from "@/hooks/useIsPhone";

export const WhyWeExist = () => {
    const { t } = useLocale();
    const isPhone = useIsPhone();
    const d = isPhone ? 0.35 : 0.6;
    const yIn = isPhone ? 10 : 20;
    const issues = t.why.fixingList;

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
        <section id="overview" className="py-10 md:py-24 px-4 sm:px-6 md:px-8 bg-white dark:bg-[#070f1f]">
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
                        {t.why.title}
                    </h2>
                </motion.div>

                {/* Secondary Heading */}
                <motion.p
                    initial={{ opacity: 0, y: yIn }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: d, delay: isPhone ? 0.05 : 0.1 }}
                    viewport={{ once: true }}
                    className="secondary-heading"
                >
                    {t.why.text}
                </motion.p>

                {/* Content Section */}
                <div className="grid md:grid-cols-2 gap-7 md:gap-16">
                    {/* What We're Fixing */}
                    <motion.div
                        initial={{ opacity: 0, y: yIn }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: d, delay: isPhone ? 0.1 : 0.2 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
                            {t.why.fixingTitle}
                        </h3>
                        <motion.ul
                            className="space-y-3"
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            {issues.map((issue, index) => (
                                <motion.li
                                    key={index}
                                    variants={itemVariants}
                                    className="flex gap-3 items-start"
                                >
                                    <CheckCircle2 className="size-4 text-green-500 dark:text-green-400 flex-shrink-0 mt-0.5" />
                                    <span className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{issue}</span>
                                </motion.li>
                            ))}
                        </motion.ul>
                    </motion.div>

                    {/* What We're Building */}
                    <motion.div
                        initial={{ opacity: 0, y: yIn }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: d, delay: isPhone ? 0.12 : 0.3 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
                            {t.why.buildingTitle}
                        </h3>
                        <div className="bg-blue-50 dark:bg-blue-950/35 border-l-4 border-[#0e2771] dark:border-blue-500 p-4 sm:p-6 rounded-lg">
                            <p className="text-gray-900 dark:text-gray-100 leading-relaxed font-medium text-sm">
                                {t.why.buildingText}
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
