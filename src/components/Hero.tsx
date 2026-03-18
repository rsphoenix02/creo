"use client";

import { motion } from "framer-motion";
import MagneticButton from "./MagneticButton";
import GridBackground from "./GridBackground";
import AnimatedCounter from "./AnimatedCounter";

const headlineWords = ["Never", "run", "a", "bad", "ad"];

const wordVariants = {
  hidden: { opacity: 0, y: 40, rotateX: -40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 14,
      delay: 0.3 + i * 0.1,
    },
  }),
};

const floatingOrbs = [
  { size: 200, x: "70%", y: "15%", delay: 0, duration: 18 },
  { size: 120, x: "85%", y: "60%", delay: 2, duration: 22 },
  { size: 160, x: "20%", y: "75%", delay: 4, duration: 20 },
  { size: 80, x: "55%", y: "85%", delay: 1, duration: 16 },
];

export default function Hero() {
  const scrollToAnalyzer = () => {
    document.getElementById("analyzer")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Animated dot grid background */}
      <GridBackground />

      {/* Floating accent orbs */}
      {floatingOrbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            background: `radial-gradient(circle, rgba(232, 255, 71, 0.06) 0%, transparent 70%)`,
            filter: "blur(40px)",
          }}
          animate={{
            x: [0, 30, -20, 10, 0],
            y: [0, -25, 15, -10, 0],
            scale: [1, 1.1, 0.95, 1.05, 1],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: orb.delay,
          }}
        />
      ))}

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-32 md:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left — Editorial content */}
          <div className="lg:col-span-7">
            {/* CREO badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: "spring", stiffness: 120, damping: 20, delay: 0.1 }}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-2 font-heading text-sm font-medium tracking-widest uppercase text-creo-accent">
                <motion.span
                  className="w-2 h-2 rounded-full bg-creo-accent"
                  animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
                CREO
              </span>
            </motion.div>

            {/* Word-by-word headline reveal */}
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight mb-8"
                style={{ perspective: "800px" }}>
              <span className="flex flex-wrap gap-x-[0.25em]">
                {headlineWords.map((word, i) => (
                  <motion.span
                    key={word + i}
                    custom={i}
                    variants={wordVariants}
                    initial="hidden"
                    animate="visible"
                    className="inline-block"
                    style={{ transformOrigin: "bottom center" }}
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
              <motion.span
                className="block text-creo-accent relative"
                initial={{ opacity: 0, y: 40, rotateX: -40 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 80,
                  damping: 14,
                  delay: 0.85,
                }}
                style={{ transformOrigin: "bottom center" }}
              >
                twice.
                {/* Accent underline that draws in */}
                <motion.span
                  className="absolute -bottom-2 left-0 h-[3px] bg-creo-accent rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{
                    type: "spring",
                    stiffness: 50,
                    damping: 15,
                    delay: 1.2,
                  }}
                />
              </motion.span>
            </h1>

            <motion.p
              className="text-creo-muted text-lg md:text-xl max-w-lg leading-relaxed mb-10 font-body"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 80, damping: 20, delay: 1.0 }}
            >
              Paste your ad copy. Get structured analysis across 5 performance
              dimensions. Know exactly what to fix before you spend a dollar.
            </motion.p>

            {/* CTA with shimmer effect */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 80, damping: 20, delay: 1.2 }}
            >
              <MagneticButton
                onClick={scrollToAnalyzer}
                className="group relative bg-creo-accent text-creo-bg font-heading font-semibold text-base px-8 py-4 rounded-full flex items-center gap-3 hover:brightness-110 transition-all duration-300 accent-glow overflow-hidden"
              >
                {/* Shimmer sweep */}
                <motion.span
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.3) 50%, transparent 60%)",
                    backgroundSize: "200% 100%",
                  }}
                  animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 }}
                />
                <span className="relative z-10 flex items-center gap-3">
                  Analyze Your Copy
                  <svg
                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </MagneticButton>
            </motion.div>
          </div>

          {/* Right — Preview card with clean CSS animations */}
          <div className="lg:col-span-5 hidden lg:block">
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: "spring", stiffness: 50, damping: 16, delay: 0.8 }}
            >
              <div className="relative animate-float">
                {/* Clean CSS rotating border */}
                <div
                  className="absolute -inset-[1px] rounded-2xl"
                  style={{
                    background: "linear-gradient(135deg, rgba(232,255,71,0.2), transparent 40%, transparent 60%, rgba(232,255,71,0.15))",
                  }}
                />

                <div className="relative rounded-2xl bg-creo-surface p-6 space-y-5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-creo-muted-2 uppercase tracking-wider">
                      Analysis Preview
                    </span>
                    <span className="w-2 h-2 rounded-full bg-creo-accent animate-pulse" />
                  </div>

                  {/* Static score bars — no re-triggering animations */}
                  <div className="space-y-4">
                    {[
                      { label: "Hook", score: 8.4, color: "#22C55E" },
                      { label: "Value Prop", score: 6.1, color: "#EAB308" },
                      { label: "Copy Flow", score: 7.8, color: "#22C55E" },
                      { label: "CTA", score: 9.2, color: "#E8FF47" },
                      { label: "Audience", score: 5.5, color: "#EAB308" },
                    ].map((item, i) => (
                      <div key={item.label} className="space-y-1.5">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-body text-creo-muted">{item.label}</span>
                          <AnimatedCounter
                            value={item.score}
                            duration={1000}
                            delay={800 + i * 150}
                            decimals={1}
                            className="text-xs font-mono font-bold"
                            style={{ color: item.color }}
                          />
                        </div>
                        <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                          <motion.div
                            className="h-full rounded-full"
                            style={{ backgroundColor: item.color }}
                            initial={{ width: "0%" }}
                            animate={{ width: `${item.score * 10}%` }}
                            transition={{
                              duration: 1,
                              ease: "easeOut",
                              delay: 1.0 + i * 0.15,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Overall score — static */}
                  <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
                    <span className="text-xs font-heading font-medium text-creo-muted">
                      Overall Score
                    </span>
                    <AnimatedCounter
                      value={7.4}
                      duration={1400}
                      delay={1600}
                      decimals={1}
                      className="text-2xl font-mono font-bold text-creo-accent"
                    />
                  </div>
                </div>
              </div>

              {/* Ambient decoration */}
              <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-creo-accent/[0.04] blur-2xl" />
              <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-creo-accent/[0.03] blur-3xl" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
