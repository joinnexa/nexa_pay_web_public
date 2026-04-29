import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";

export const WhyWeExist = () => {
    const { t } = useLocale();
    const issues = t.why.fixingList;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.6 },
        },
    };

    return (
        <section id="overview" className="py-16 md:py-24 px-4 sm:px-6 md:px-8 bg-white dark:bg-[#070f1f]">
            <div className="max-w-4xl mx-auto">
                {/* Primary Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="-mb-1"
                >
                    <h2 className="primary-heading">
                        {t.why.title}
                    </h2>
                </motion.div>

                {/* Secondary Heading */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    viewport={{ once: true }}
                    className="secondary-heading"
                >
                    {t.why.text}
                </motion.p>

                {/* Content Section */}
                <div className="grid md:grid-cols-2 gap-12 md:gap-16">
                    {/* What We're Fixing */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
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
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
                            {t.why.buildingTitle}
                        </h3>
                        <div className="bg-blue-50 dark:bg-blue-950/35 border-l-4 border-[#0e2771] dark:border-blue-500 p-6 rounded-lg">
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
