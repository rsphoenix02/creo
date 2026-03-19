"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { DIMENSIONS } from "@/lib/constants";
import ScrollReveal from "./ScrollReveal";

const dimensionIcons = [
  <svg key="hook" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
  </svg>,
  <svg key="vp" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 3.75H6A2.25 2.25 0 003.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0120.25 6v1.5m0 9V18A2.25 2.25 0 0118 20.25h-1.5m-9 0H6A2.25 2.25 0 013.75 18v-1.5M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>,
  <svg key="flow" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
  </svg>,
  <svg key="cta" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59" />
  </svg>,
  <svg key="aud" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
  </svg>,
];

const CARD_COUNT = DIMENSIONS.length;

function DeckCard({
  index,
  icon,
  label,
  description,
  scrollYProgress,
}: {
  index: number;
  icon: React.ReactNode;
  label: string;
  description: string;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  // Each card occupies 1/CARD_COUNT of the scroll range
  const segment = 1 / CARD_COUNT;
  const start = index * segment;
  const end = start + segment;

  // Card is "active" (front) when scroll is in its segment
  // Before its segment: stacked behind (scaled down, offset back)
  // During its segment: front and center, then animates away
  // After its segment: gone (moved up and faded out)

  const y = useTransform(
    scrollYProgress,
    [start, end],
    [0, -120]
  );

  const scale = useTransform(
    scrollYProgress,
    // Before start: stacked behind at smaller scale
    // At start: full size (front)
    // At end: shrinking as it moves away
    [Math.max(0, start - segment * 0.1), start, end - segment * 0.2, end],
    [0.92 - index * 0.01, 1, 1, 0.85]
  );

  const opacity = useTransform(
    scrollYProgress,
    [start, end - segment * 0.3, end],
    [1, 1, 0]
  );

  // Unified y motion — first card uses simple range, others include stack offset
  const combinedY = useTransform(
    scrollYProgress,
    [Math.max(0, start - segment), start, end],
    [index * 10, 0, -120]
  );

  const zIndex = CARD_COUNT - index;

  return (
    <motion.div
      className="absolute inset-0"
      style={{
        y: index === 0 ? y : combinedY,
        scale,
        opacity,
        zIndex,
      }}
    >
      <div className="card-bezel h-full">
        <div className="card-bezel-inner h-full">
          <div className="flex flex-col h-full">
            {/* Top row: number + icon */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-creo-accent/10 flex items-center justify-center text-creo-accent">
                  {icon}
                </div>
                <div>
                  <span className="text-xs font-mono text-creo-accent/60 block mb-0.5">
                    Dimension {index + 1} / {CARD_COUNT}
                  </span>
                  <h3 className="font-heading font-semibold text-xl text-creo-text">
                    {label}
                  </h3>
                </div>
              </div>

              {/* Progress dots */}
              <div className="flex gap-1.5">
                {Array.from({ length: CARD_COUNT }).map((_, dotIdx) => (
                  <div
                    key={dotIdx}
                    className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                      dotIdx <= index ? "bg-creo-accent" : "bg-white/[0.1]"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Description */}
            <p className="text-creo-muted text-base leading-relaxed flex-1">
              {description}
            </p>

            {/* Bottom accent bar */}
            <div className="mt-6 pt-4 border-t border-white/[0.06]">
              <div className="h-1 rounded-full bg-white/[0.04] overflow-hidden">
                <div
                  className="h-full rounded-full bg-creo-accent/40"
                  style={{ width: `${((index + 1) / CARD_COUNT) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function DimensionGridCard({
  index,
  icon,
  label,
  description,
  featured = false,
}: {
  index: number;
  icon: React.ReactNode;
  label: string;
  description: string;
  featured?: boolean;
}) {
  if (featured) {
    return (
      <div className="card-bezel h-full">
        <div className="card-bezel-inner h-full !p-5">
          <div className="flex flex-col h-full">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-creo-accent/10 flex items-center justify-center text-creo-accent flex-shrink-0">
                {icon}
              </div>
              <div>
                <span className="text-[10px] font-mono text-creo-accent/50 block mb-0.5">
                  0{index + 1}
                </span>
                <h4 className="font-heading font-semibold text-base text-creo-text">
                  {label}
                </h4>
              </div>
            </div>
            <p className="text-sm text-creo-muted leading-relaxed flex-1">
              {description}
            </p>
            <div className="mt-3 pt-3 border-t border-white/[0.06]">
              <div className="h-1 rounded-full bg-white/[0.04] overflow-hidden">
                <div className="h-full rounded-full bg-creo-accent/40 w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card-bezel h-full">
      <div className="card-bezel-inner h-full !p-5">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-creo-accent/10 flex items-center justify-center text-creo-accent flex-shrink-0">
              {icon}
            </div>
            <div>
              <span className="text-[10px] font-mono text-creo-accent/50 block mb-0.5">
                0{index + 1}
              </span>
              <h4 className="font-heading font-semibold text-sm text-creo-text">
                {label}
              </h4>
            </div>
          </div>
          <p className="text-sm text-creo-muted leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Dimensions() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Fade out only the subtext + deck, keep heading visible
  const deckOpacity = useTransform(scrollYProgress, [0.8, 0.95], [1, 0]);
  // Grid fades in as the deck fades out
  const gridOpacity = useTransform(scrollYProgress, [0.85, 1], [0, 1]);
  const gridY = useTransform(scrollYProgress, [0.85, 1], [30, 0]);

  // Bento grid span config: card 0 is featured (wide), rest are standard
  const bentoSpans = [
    "col-span-2 md:col-span-4",  // Hook — featured wide card
    "col-span-1 md:col-span-2",  // Value Prop
    "col-span-1 md:col-span-2",  // Copy Flow
    "col-span-1 md:col-span-2",  // CTA
    "col-span-1 md:col-span-2",  // Audience
  ];

  return (
    <section id="dimensions">
      {/* Scroll container — deck animation + grid crossfade */}
      <div ref={containerRef} className="relative" style={{ height: `${CARD_COUNT * 80}vh` }}>
        {/* Sticky inner — stays in viewport while user scrolls through */}
        <div className="sticky top-0 h-screen flex flex-col justify-center py-16 md:py-24 overflow-hidden">
          <div className="max-w-5xl mx-auto px-6 w-full">
            {/* Section heading — always visible, uses whileInView for sticky safety */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px" }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
              <span className="font-mono text-xs text-creo-accent uppercase tracking-widest">
                The Framework
              </span>
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-creo-text mt-3 mb-4">
                Five dimensions. One clear picture.
              </h2>
            </motion.div>

            {/* Crossfade zone — deck and bento grid share this bounded space */}
            <div className="relative overflow-hidden" style={{ height: "clamp(540px, 65vh, 640px)" }}>
              {/* Deck: subtext + sliding cards — fades out */}
              <motion.div
                className="absolute inset-0"
                style={{ opacity: deckOpacity }}
              >
                <p className="text-creo-muted text-base md:text-lg max-w-2xl mb-8 md:mb-12">
                  Every ad is scored across five distinct lenses — so you know exactly where it&apos;s strong and where it breaks down.
                </p>

                <div className="max-w-3xl mx-auto relative" style={{ height: 240 }}>
                  {DIMENSIONS.map((dim, i) => (
                    <DeckCard
                      key={dim.key}
                      index={i}
                      icon={dimensionIcons[i]}
                      label={dim.label}
                      description={dim.description}
                      scrollYProgress={scrollYProgress}
                    />
                  ))}
                </div>
              </motion.div>

              {/* Bento grid — fades in over the exact same space */}
              <motion.div
                className="absolute inset-0 flex items-start pt-2"
                style={{
                  opacity: gridOpacity,
                  y: gridY,
                }}
              >
                <div className="w-full grid grid-cols-2 md:grid-cols-6 gap-2 md:gap-3">
                  {DIMENSIONS.map((dim, i) => (
                    <div key={dim.key} className={`${bentoSpans[i]} h-full`}>
                      <DimensionGridCard
                        index={i}
                        icon={dimensionIcons[i]}
                        label={dim.label}
                        description={dim.description}
                        featured={i === 0}
                      />
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
