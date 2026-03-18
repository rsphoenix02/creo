"use client";

import React from "react";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Input } from "@/components/ui/input";
import MagneticButton from "./MagneticButton";

export default function JoinWaitlist() {
  return (
    <section
      id="waitlist"
      className="relative w-full overflow-hidden"
    >
      {/* Top fade — blends Dimensions section into the beams */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-creo-bg to-transparent z-10 pointer-events-none" />

      {/* Main content area */}
      <div className="relative h-[40rem] flex flex-col items-center justify-center antialiased">
        <div className="max-w-2xl mx-auto p-4 relative z-10">
          {/* Section label — matches site pattern */}
          <span className="block font-mono text-xs text-creo-accent uppercase tracking-widest text-center mb-4">
            Early Access
          </span>

          <h2 className="text-3xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-creo-accent via-creo-text to-creo-muted text-center font-heading font-bold">
            Join the waitlist
          </h2>

          <p className="text-creo-muted max-w-lg mx-auto mt-4 mb-8 text-sm md:text-base text-center font-body leading-relaxed">
            Creo is building the future of ad copy analysis. Be the first to get
            access to AI-powered scoring across five dimensions — hook strength,
            value proposition, copy flow, CTA effectiveness, and audience fit.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="you@example.com"
              className="flex-1"
            />
            <MagneticButton
              className="bg-creo-accent text-creo-bg font-heading font-semibold text-sm py-2.5 px-6 rounded-full hover:brightness-110 transition-all duration-300 accent-glow whitespace-nowrap"
            >
              Notify Me
            </MagneticButton>
          </div>

          <p className="text-creo-muted-2 text-xs text-center mt-3 font-mono">
            No spam. We&apos;ll only email you when we launch.
          </p>
        </div>

        <BackgroundBeams />
      </div>

      {/* Bottom fade — blends beams into the footer */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-creo-bg to-transparent z-10 pointer-events-none" />
    </section>
  );
}
