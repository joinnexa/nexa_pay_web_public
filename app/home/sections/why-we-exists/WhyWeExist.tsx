import { motion } from "framer-motion";
import { SplitText } from "@/components/animations/SplitText";
import { CheckCircle2 } from "lucide-react";

export const WhyWeExist = () => {
    const issues = [
        "High money-transfer fees that quietly add up",
        "Transfers that feel slow, unclear, or complicated",
        "Merchant payments that still depend too much on cash",
        "Too many apps for daily needs (payments, services, and more)",
    ];

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
        <section className="py-16 md:py-24 px-4 sm:px-6 md:px-8 bg-white">
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
                        Built by the people, for the people
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
                    Let's keep it real: basic money movement shouldn't come with unnecessary steps, stress, or costs. Nexa Pay was created to solve the problems we face on this side — the everyday issues that waste time and make simple transactions harder than they should be.
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
                        <h3 className="text-lg font-bold text-gray-900 mb-4">
                            What we're fixing:
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
                                    <CheckCircle2 className="size-4 text-green-500 flex-shrink-0 mt-0.5" />
                                    <span className="text-gray-700 text-sm leading-relaxed">{issue}</span>
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
                        <h3 className="text-lg font-bold text-gray-900 mb-4">
                            What we're building instead:
                        </h3>
                        <div className="bg-blue-50 border-l-4 border-[#0e2771] p-6 rounded-lg">
                            <p className="text-gray-900 leading-relaxed font-medium text-sm">
                                A secure Moroccan wallet that keeps things straightforward — less friction, fewer steps, and lower transfer costs, so more value stays with people.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
