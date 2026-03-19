"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const steps = [
  {
    number: "01",
    title: "Paste your ad copy",
    description:
      "Drop in any short-form persuasive copy — Facebook ads, Google ads, landing page headlines, email subject lines.",
  },
  {
    number: "02",
    title: "CREO analyzes across 5 dimensions",
    description:
      "AI evaluates hook strength, value proposition, copy flow, CTA effectiveness, and audience fit in seconds.",
  },
  {
    number: "03",
    title: "Fix what matters, run better ads",
    description:
      "Get specific, actionable suggestions ranked by impact. Know exactly what to change before you spend a dollar.",
  },
];

function StepCard({ step, index }: { step: typeof steps[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="relative">
      {/* Large background number — fades and scales in */}
      <motion.span
        className="font-display text-6xl md:text-7xl text-white/[0.08] absolute -top-6 -left-2 select-none"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ type: "spring", stiffness: 80, damping: 15, delay: index * 0.15 }}
      >
        {step.number}
      </motion.span>

      <div className="relative pt-8">
        {/* Accent dot with pulse ring */}
        <div className="relative w-3 h-3 mb-5">
          <motion.div
            className="w-3 h-3 rounded-full bg-creo-accent"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.2 + index * 0.15 }}
          />
          <motion.div
            className="absolute inset-0 rounded-full bg-creo-accent"
            initial={{ scale: 1, opacity: 0.4 }}
            animate={isInView ? {
              scale: [1, 2.5, 1],
              opacity: [0.4, 0, 0.4],
            } : {}}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              delay: 0.5 + index * 0.3,
              ease: "easeOut",
            }}
          />
        </div>

        <motion.h3
          className="font-heading font-semibold text-lg text-creo-text mb-3"
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.3 + index * 0.15 }}
        >
          {step.title}
        </motion.h3>

        <motion.p
          className="text-creo-muted text-sm leading-relaxed"
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.4 + index * 0.15 }}
        >
          {step.description}
        </motion.p>
      </div>

      {/* Animated connector line */}
      {index < steps.length - 1 && (
        <motion.div
          className="hidden md:block absolute top-12 -right-3 h-px bg-creo-accent/20 origin-left"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 + index * 0.15, ease: [0.22, 1, 0.36, 1] }}
          style={{ width: 24 }}
        />
      )}
    </div>
  );
}

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 md:py-32 lg:py-40">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <span className="font-mono text-xs text-creo-accent uppercase tracking-widest">
            How It Works
          </span>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-creo-text mt-3 mb-16">
            Three steps. Zero guesswork.
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
          {steps.map((step, i) => (
            <StepCard key={step.number} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
