import { ScrollFade } from "@/components/animations/ScrollFade";
import { ScrollStagger } from "@/components/animations/ScrollStagger";
import { useLocale } from "@/contexts/LocaleContext";

export const RoadmapSection = () => {
  const { t } = useLocale();

  return (
    <section id="roadmap" className="bg-gray-50 dark:bg-[#070f1f] py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-10">
      <ScrollFade className="max-w-5xl mx-auto">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-blue-700 dark:text-blue-300 mb-3">
          {t.roadmap.eyebrow}
        </p>
        <h2 className="primary-heading">{t.roadmap.title}</h2>
        <p className="secondary-heading">{t.roadmap.text}</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
          {t.roadmap.items.map((item, index) => (
            <ScrollStagger key={item.city} index={index}>
              <article className="h-full rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#101b31] p-5">
                <p className="text-base font-bold text-gray-900 dark:text-gray-100">{item.city}</p>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{item.status}</p>
              </article>
            </ScrollStagger>
          ))}
        </div>
      </ScrollFade>
    </section>
  );
};
