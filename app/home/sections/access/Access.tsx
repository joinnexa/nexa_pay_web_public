import React from "react"
import { UserPlus, CheckCircle, Rocket } from "lucide-react"
import { ScrollFade } from "@/components/animations/ScrollFade"
import { ScrollStagger } from "@/components/animations/ScrollStagger"

const STEPS = [
  {
    icon: UserPlus,
    title: "Join the waitlist",
    description: "Share your details so we can prioritize Morocco's most common use cases."
  },
  {
    icon: CheckCircle,
    title: "Get selected for private beta",
    description: "We onboard in small groups to keep performance smooth and support responsive."
  },
  {
    icon: Rocket,
    title: "Start using Nexa Pay",
    description: "Try Nexa Pay features during beta while we expand services and coverage."
  }
]

export const AccessSection = () => {
  return (
    <section id="howItWorks" className="bg-white py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-10">
      <ScrollFade className="max-w-5xl mx-auto text-center">
        {/* Title */}
        <h2 className="primary-heading mb-6 md:mb-10">
          How Early Access Works
        </h2>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-12">
          {STEPS.map((step, index) => (
            <ScrollStagger key={index} index={index}>
              <StepCard {...step} />
            </ScrollStagger>
          ))}
        </div>

        {/* Notice */}
        <div className="flex gap-1 items-center justify-center mt-8 md:mt-10 bg-yellow-50 border border-yellow-200 rounded-lg md:rounded-xl py-3 md:py-4 px-4 md:px-6 text-xs sm:text-sm text-yellow-800">
          <p className="font-semibold">Beta Note:</p>
          Access is limited. Features and limits apply during testing.
        </div>
      </ScrollFade>
    </section>
  )
}

const StepCard = ({ icon: Icon, title, description }) => (
  <div className="flex flex-col items-center text-center">
    {/* Icon box */}
    <div className="w-12 md:w-14 h-12 md:h-14 flex items-center justify-center rounded-lg md:rounded-xl bg-blue-600 text-white mb-4 md:mb-6 shadow-md">
      <Icon size={24} />
    </div>

    <h3 className="text-base md:text-lg font-medium text-gray-900 mb-2">
      {title}
    </h3>
    <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
      {description}
    </p>
  </div>
)
