import { Building2, Store, UserRound } from "lucide-react";
import { ScrollFade } from "@/components/animations/ScrollFade";
import { ScrollStagger } from "@/components/animations/ScrollStagger";
import { useLocale } from "@/contexts/LocaleContext";

export const SegmentsSection = () => {
  const { t } = useLocale();
  const iconMap = [UserRound, Store, Building2];

  return (
    <section id="segments" className="bg-gray-50 dark:bg-[#070f1f] py-8 sm:py-14 md:py-20 px-4 sm:px-6 md:px-10">
      <ScrollFade className="max-w-5xl mx-auto">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-blue-700 dark:text-blue-300 mb-3">
          {t.segments.eyebrow}
        </p>
        <h2 className="primary-heading">{t.segments.title}</h2>
        <p className="secondary-heading">{t.segments.text}</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-6">
          {t.segments.cards.map((card, index) => {
            const Icon = iconMap[index] ?? UserRound;
            return (
              <ScrollStagger key={card.title} index={index}>
                <article className="h-full rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#101b31] p-4 md:p-6 max-sm:py-3.5 shadow-sm">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-blue-100 dark:bg-blue-950/50 flex items-center justify-center mb-3 sm:mb-4">
                    <Icon className="size-[18px] sm:size-5 text-blue-700 dark:text-blue-300" />
                  </div>
                  <h3 className="text-[0.9375rem] sm:text-base font-bold text-gray-900 dark:text-gray-100 mb-1.5 sm:mb-2">{card.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-snug max-sm:leading-snug">{card.text}</p>
                </article>
              </ScrollStagger>
            );
          })}
        </div>
      </ScrollFade>
    </section>
  );
};
