import React from "react"
import { UserPlus, CheckCircle, Rocket } from "lucide-react"
import { ScrollFade } from "@/components/animations/ScrollFade"
import { ScrollStagger } from "@/components/animations/ScrollStagger"
import { useLocale } from "@/contexts/LocaleContext"

export const AccessSection = () => {
  const { t } = useLocale();
  const icons = [UserPlus, CheckCircle, Rocket];
  const steps = t.access.steps.map((step, index) => ({
    icon: icons[index] ?? UserPlus,
    title: step.title,
    description: step.description,
  }));
  return (
    <section id="howItWorks" className="bg-white dark:bg-[#070f1f] py-8 sm:py-14 md:py-20 px-4 sm:px-6 md:px-10">
      <ScrollFade className="max-w-5xl mx-auto text-center">
        {/* Title */}
        <h2 className="primary-heading mb-4 sm:mb-6 md:mb-10">
          {t.access.title}
        </h2>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-12">
          {steps.map((step, index) => (
            <ScrollStagger key={index} index={index}>
              <StepCard {...step} />
            </ScrollStagger>
          ))}
        </div>

        {/* Notice */}
        <div className="flex gap-1 items-center justify-center mt-6 sm:mt-8 md:mt-10 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-600/40 rounded-lg md:rounded-xl py-2.5 sm:py-3 md:py-4 px-4 md:px-6 text-xs sm:text-sm text-yellow-800 dark:text-yellow-200">
          <p className="font-semibold">{t.access.noteLabel}</p>
          {t.access.noteText}
        </div>
      </ScrollFade>
    </section>
  )
}

const StepCard = ({ icon: Icon, title, description }) => (
  <div className="flex flex-col items-center text-center max-sm:gap-0">
    {/* Icon box */}
    <div className="w-11 h-11 md:w-14 md:h-14 flex items-center justify-center rounded-lg md:rounded-xl bg-blue-600 text-white mb-3 md:mb-6 shadow-md [&_svg]:size-[22px] sm:[&_svg]:size-6">
      <Icon size={24} />
    </div>

    <h3 className="text-sm max-sm:text-sm md:text-lg font-medium text-gray-900 dark:text-gray-100 mb-1.5 sm:mb-2">
      {title}
    </h3>
    <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 leading-snug max-sm:leading-snug">
      {description}
    </p>
  </div>
)
