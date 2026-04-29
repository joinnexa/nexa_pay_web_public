import { Gauge, ReceiptText, QrCode, ClipboardList } from "lucide-react";
import { ScrollFade } from "@/components/animations/ScrollFade";
import { ScrollStagger } from "@/components/animations/ScrollStagger";
import { useLocale } from "@/contexts/LocaleContext";

export const PillarsSection = () => {
  const { t } = useLocale();
  const icons = [Gauge, ReceiptText, QrCode, ClipboardList];

  return (
    <section id="pillars" className="bg-white dark:bg-[#070f1f] py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-10">
      <ScrollFade className="max-w-5xl mx-auto">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-blue-700 dark:text-blue-300 mb-3">
          {t.pillars.eyebrow}
        </p>
        <h2 className="primary-heading">{t.pillars.title}</h2>
        <p className="secondary-heading">{t.pillars.text}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          {t.pillars.cards.map((card, index) => {
            const Icon = icons[index] ?? Gauge;
            return (
              <ScrollStagger key={card.title} index={index}>
                <article className="h-full rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#101b31] p-5 md:p-6">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/50 flex items-center justify-center mb-4">
                    <Icon className="size-5 text-blue-700 dark:text-blue-300" />
                  </div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 mb-2">{card.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{card.text}</p>
                </article>
              </ScrollStagger>
            );
          })}
        </div>
      </ScrollFade>
    </section>
  );
};
