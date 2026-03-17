"use client";

import { motion } from "framer-motion";
import { PRICING_TIERS } from "@/lib/constants";
import { PricingTier } from "@/types";
import ScrollReveal from "./ScrollReveal";
import TiltCard from "./TiltCard";
import MagneticButton from "./MagneticButton";

function CheckIcon() {
  return (
    <svg className="w-4 h-4 text-creo-accent flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function DashIcon() {
  return (
    <svg className="w-4 h-4 text-creo-muted-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
    </svg>
  );
}

function PricingCard({ tier, index }: { tier: PricingTier; index: number }) {
  const ctaClassName =
    tier.ctaVariant === "accent"
      ? "w-full bg-creo-accent text-creo-bg font-heading font-semibold text-sm py-3 rounded-full hover:brightness-110 transition-all duration-300 accent-glow"
      : tier.ctaVariant === "glass"
        ? "w-full glass text-creo-text font-heading font-semibold text-sm py-3 rounded-full hover:bg-white/[0.08] transition-all duration-300"
        : "w-full border border-white/[0.1] text-creo-text font-heading font-semibold text-sm py-3 rounded-full hover:border-creo-accent/30 hover:text-creo-accent transition-all duration-300";

  const cardContent = (
    <div className={`card-bezel h-full ${tier.recommended ? "gradient-border-spin" : ""}`}>
      <div className={`card-bezel-inner h-full flex flex-col ${tier.recommended ? "bg-creo-elevated" : ""}`}>
        {/* Recommended badge */}
        {tier.recommended && (
          <motion.div
            className="mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.3 }}
          >
            <span className="inline-flex items-center gap-1.5 bg-creo-accent/10 text-creo-accent text-[10px] font-mono uppercase tracking-wider px-3 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-creo-accent animate-pulse" />
              Recommended
            </span>
          </motion.div>
        )}

        {/* Tier name & tagline */}
        <h3 className="font-heading font-semibold text-lg text-creo-text">
          {tier.name}
        </h3>
        <p className="text-sm text-creo-muted font-body mt-1 mb-6">
          {tier.tagline}
        </p>

        {/* Price */}
        <div className="mb-6">
          <span className={`font-display ${tier.recommended ? "text-5xl text-creo-accent" : "text-4xl text-creo-text"}`}>
            {tier.price}
          </span>
          <span className="text-sm text-creo-muted-2 font-mono ml-2">
            {tier.priceSuffix}
          </span>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/[0.06] mb-6" />

        {/* Feature list */}
        <ul className="space-y-3 flex-1 mb-8">
          {tier.features.map((feature) => (
            <li key={feature.text} className="flex items-start gap-3">
              {feature.included ? <CheckIcon /> : <DashIcon />}
              <span
                className={
                  feature.included
                    ? feature.highlight
                      ? "text-sm text-creo-text"
                      : "text-sm text-creo-muted"
                    : "text-sm text-creo-muted-2 line-through"
                }
              >
                {feature.text}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <MagneticButton
          onClick={() => {
            document.getElementById("analyzer")?.scrollIntoView({ behavior: "smooth" });
          }}
          className={ctaClassName}
        >
          {tier.ctaText}
        </MagneticButton>
      </div>
    </div>
  );

  return (
    <ScrollReveal delay={0.1 * index} className="h-full">
      <TiltCard tiltStrength={6} className="h-full">
        {cardContent}
      </TiltCard>
    </ScrollReveal>
  );
}

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 md:py-32 lg:py-40 relative">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <span className="font-mono text-xs text-creo-accent uppercase tracking-widest">
            Pricing
          </span>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-creo-text mt-3 mb-4">
            Invest in better copy.
          </h2>
          <p className="text-creo-muted text-base md:text-lg max-w-2xl mb-16">
            Start free. Upgrade when your ads demand it.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {PRICING_TIERS.map((tier, i) => (
            <PricingCard key={tier.id} tier={tier} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
