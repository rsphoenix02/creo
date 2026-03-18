"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AnalysisState } from "@/types";
import { analyzeCopy, getScoreColor } from "@/lib/api";
import { EXAMPLE_COPIES, DIMENSIONS } from "@/lib/constants";
import MagneticButton from "./MagneticButton";
import ScoreRing from "./ScoreRing";
import DimensionScoreCard from "./ui/dimension-score-card";

function getScoreClass(score: number): string {
  if (score >= 9) return "score-perfect";
  if (score >= 7) return "score-high";
  if (score >= 5) return "score-mid";
  if (score >= 4) return "score-mid-low";
  return "score-low";
}

const DIM_SPANS = [
  "md:col-span-2",
  "md:col-span-2",
  "md:col-span-2",
  "md:col-span-3",
  "md:col-span-3",
];

export default function Analyzer() {
  const [adCopy, setAdCopy] = useState("");
  const [state, setState] = useState<AnalysisState>({ status: "idle" });
  const [analyzedCopy, setAnalyzedCopy] = useState("");
  const [ctaAttention, setCtaAttention] = useState(false);
  const [showWaitlistModal, setShowWaitlistModal] = useState(false);

  const handleCardClick = useCallback(() => {
    // Mobile: show bottom-sheet modal (CTA is off-screen)
    // Desktop: pulse the inline CTA
    if (window.innerWidth < 1024) {
      setShowWaitlistModal(true);
    } else {
      setCtaAttention(false);
      setTimeout(() => setCtaAttention(true), 10);
    }
  }, []);

  const analyzeText = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    setState({ status: "loading" });

    try {
      const result = await analyzeCopy(trimmed);
      setAnalyzedCopy(trimmed);
      setState({ status: "success", result });
    } catch (err) {
      setState({
        status: "error",
        message:
          err instanceof Error ? err.message : "Something went wrong.",
      });
    }
  }, []);

  const handleAnalyze = useCallback(() => {
    analyzeText(adCopy);
  }, [adCopy, analyzeText]);

  const handleExample = useCallback((copy: string) => {
    setAdCopy(copy);
  }, []);

  const wordCount = adCopy.trim().split(/\s+/).filter(Boolean).length;
  const isStale = state.status === "success" && adCopy.trim() !== analyzedCopy;

  return (
    <section id="analyzer" className="py-24 md:py-32 lg:py-40 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header — full width above both columns */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-creo-text mb-3">
            Try it now
          </h2>
          <p className="text-creo-muted text-base md:text-lg">
            Paste any ad copy and get instant, structured analysis.
          </p>
        </motion.div>

        {/* Side-by-side layout: input left, results right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left column — input (sticky on desktop) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 z-10">
            {/* Input area */}
            <motion.div
              className="card-bezel mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
            >
              <div className="rounded-[15px] bg-creo-surface p-1">
                <textarea
                  value={adCopy}
                  onChange={(e) => setAdCopy(e.target.value)}
                  placeholder="Paste your ad copy here..."
                  rows={10}
                  className="w-full bg-transparent text-creo-text placeholder:text-creo-muted-2 font-body text-base leading-relaxed p-5 rounded-xl resize-none focus:outline-none focus:ring-1 focus:ring-creo-accent/30 focus:shadow-[0_0_20px_rgba(232,255,71,0.08)] transition-all duration-500 lg:min-h-[280px]"
                />
                <div className="flex items-center justify-between px-5 pb-3">
                  <span className="text-xs font-mono text-creo-muted-2">
                    {wordCount} {wordCount === 1 ? "word" : "words"}
                  </span>
                  {adCopy.length > 0 && (
                    <button
                      onClick={() => {
                        setAdCopy("");
                        setAnalyzedCopy("");
                        setState({ status: "idle" });
                      }}
                      className="text-xs text-creo-muted-2 hover:text-creo-muted transition-colors"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Example copy chips */}
            <motion.div
              className="flex flex-wrap gap-2 mb-5"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-xs text-creo-muted-2 font-mono self-center mr-1">
                Examples:
              </span>
              {EXAMPLE_COPIES.map((example) => (
                <button
                  key={example.label}
                  onClick={() => handleExample(example.copy)}
                  className="text-xs font-body text-creo-muted border border-white/[0.08] rounded-full px-3 py-1.5 hover:border-creo-accent/30 hover:text-creo-accent transition-all duration-300"
                >
                  {example.label}
                </button>
              ))}
            </motion.div>

            {/* Analyze button */}
            <MagneticButton
              onClick={handleAnalyze}
              disabled={!adCopy.trim() || state.status === "loading"}
              className="w-full bg-creo-accent text-creo-bg font-heading font-semibold text-base py-4 rounded-xl hover:brightness-110 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed accent-glow"
            >
              {state.status === "loading" ? (
                <span className="flex items-center justify-center gap-3">
                  <motion.span
                    className="w-4 h-4 border-2 border-creo-bg/30 border-t-creo-bg rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                    style={{ display: "inline-block" }}
                  />
                  Analyzing...
                </span>
              ) : (
                "Analyze"
              )}
            </MagneticButton>
          </div>

          {/* Right column — results */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {/* IDLE — placeholder score cards */}
              {state.status === "idle" && (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="opacity-40"
                >
                  {/* Placeholder overall score */}
                  <div className="card-bezel mb-3">
                    <div className="card-bezel-inner !py-4 !px-5 flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full border-2 border-dashed border-white/[0.1] flex items-center justify-center flex-shrink-0">
                        <span className="text-lg font-mono font-bold text-creo-muted-2">&mdash;</span>
                      </div>
                      <div>
                        <span className="text-xs font-mono text-creo-muted-2 uppercase tracking-widest">
                          Overall Score
                        </span>
                        <p className="text-creo-muted-2 text-xs mt-0.5">
                          Paste ad copy and hit Analyze
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Placeholder dimension cards with null scores */}
                  <div className="grid grid-cols-1 md:grid-cols-6 gap-2">
                    {DIMENSIONS.map((dim, i) => (
                      <div key={dim.key} className={DIM_SPANS[i]}>
                        <DimensionScoreCard
                          index={i}
                          label={dim.label}
                          description={dim.description}
                          score={null}
                          colorClass="score-none"
                          delay={0.05 * i}
                        />
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* LOADING — compact skeleton */}
              {state.status === "loading" && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ type: "spring", stiffness: 100, damping: 20 }}
                >
                  <div className="card-bezel mb-3">
                    <div className="card-bezel-inner !py-4 !px-5 flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full skeleton" />
                      <div className="space-y-2 flex-1">
                        <div className="h-3 w-24 rounded skeleton" />
                        <div className="h-2 w-32 rounded skeleton" />
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-6 gap-2">
                    {DIM_SPANS.map((spanClass, i) => (
                      <div key={i} className={spanClass}>
                        <div className="card-bezel">
                          <div className="card-bezel-inner !p-3 space-y-2 h-24">
                            <div className="h-3 w-20 rounded skeleton" />
                            <div className="h-2 w-full rounded skeleton" />
                            <div className="h-2 w-3/4 rounded skeleton" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* ERROR */}
              {state.status === "error" && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ type: "spring", stiffness: 100, damping: 20 }}
                >
                  <div className="card-bezel">
                    <div className="card-bezel-inner text-center py-10">
                      <div className="w-12 h-12 rounded-full bg-creo-score-low/10 flex items-center justify-center mx-auto mb-4">
                        <svg className="w-6 h-6 text-creo-score-low" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      </div>
                      <p className="text-creo-text font-heading font-semibold mb-2">Analysis failed</p>
                      <p className="text-creo-muted text-sm mb-4">{state.message}</p>
                      <button onClick={handleAnalyze} className="text-sm font-heading font-semibold text-creo-accent hover:underline">
                        Try again
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* SUCCESS — score cards + waitlist CTA */}
              {state.status === "success" && (
                <motion.div
                  key="results"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {/* Stale indicator */}
                  <AnimatePresence>
                    {isStale && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.3 }}
                        className="mb-3 flex items-center gap-2"
                      >
                        <span className="text-xs font-mono text-creo-muted-2">Input changed</span>
                        <span className="text-xs text-creo-muted-2">&mdash;</span>
                        <button onClick={handleAnalyze} className="text-xs font-mono text-creo-accent hover:underline">
                          Re-analyze
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.div
                    animate={{ opacity: isStale ? 0.35 : 1, scale: isStale ? 0.985 : 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                    {/* Compact overall score — horizontal bar */}
                    <motion.div
                      className="card-bezel mb-3"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    >
                      <div className="card-bezel-inner !py-4 !px-5 flex items-center gap-4">
                        <ScoreRing
                          score={state.result.overall_score}
                          size={56}
                          strokeWidth={3}
                        />
                        <div className="flex-1">
                          <span className="text-xs font-mono text-creo-muted-2 uppercase tracking-widest">
                            Overall Score
                          </span>
                          <div className="flex items-center gap-3 mt-1">
                            <div className="flex-1 h-2 rounded-full bg-white/[0.06] overflow-hidden">
                              <motion.div
                                className="h-full rounded-full"
                                style={{ backgroundColor: getScoreColor(state.result.overall_score) }}
                                initial={{ width: "0%" }}
                                animate={{ width: `${state.result.overall_score * 10}%` }}
                                transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                              />
                            </div>
                            <span className="text-xs font-mono text-creo-muted">/ 10</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Dimension score cards — teaser bento grid */}
                    <div className="grid grid-cols-1 md:grid-cols-6 gap-2">
                      {DIMENSIONS.map((dim, i) => {
                        const data = state.result[dim.key];
                        return (
                          <div key={dim.key} className={DIM_SPANS[i]}>
                            <DimensionScoreCard
                              index={i}
                              label={dim.label}
                              description={dim.description}
                              score={data.score}
                              colorClass={getScoreClass(data.score)}
                              onClick={handleCardClick}
                              delay={0.08 * i}
                            />
                          </div>
                        );
                      })}
                    </div>

                    {/* Waitlist CTA — only visible after results */}
                    <motion.div
                      className={`mt-4 rounded-2xl p-[1px] bg-gradient-to-r from-creo-accent/30 via-creo-accent/10 to-creo-accent/30 ${
                        ctaAttention ? "cta-attention-pulse" : ""
                      }`}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ type: "spring", stiffness: 80, damping: 18, delay: 0.5 }}
                      onAnimationEnd={() => setCtaAttention(false)}
                    >
                      <div className="rounded-[15px] bg-creo-surface px-5 py-4 flex flex-col sm:flex-row items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-creo-accent/10 flex items-center justify-center flex-shrink-0">
                          <svg className="w-5 h-5 text-creo-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                          </svg>
                        </div>
                        <div className="flex-1 text-center sm:text-left">
                          <h3 className="font-heading font-semibold text-sm text-creo-text mb-0.5">
                            Want detailed reasoning &amp; rewrite suggestions?
                          </h3>
                          <p className="text-xs text-creo-muted leading-relaxed">
                            Full per-dimension analysis, actionable rewrites, and competitor benchmarks — coming soon.
                          </p>
                        </div>
                        <button className="flex-shrink-0 bg-creo-accent text-creo-bg font-heading font-semibold text-xs px-5 py-2.5 rounded-lg hover:brightness-110 transition-all whitespace-nowrap">
                          Join Waitlist
                        </button>
                      </div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Mobile waitlist bottom-sheet modal */}
      <AnimatePresence>
        {showWaitlistModal && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowWaitlistModal(false)}
            />
            {/* Bottom sheet */}
            <motion.div
              className="fixed bottom-0 inset-x-0 z-50 px-4 pb-8"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="rounded-2xl p-[1px] bg-gradient-to-t from-creo-accent/30 via-creo-accent/10 to-white/[0.06]">
                <div className="rounded-[15px] bg-creo-surface px-6 py-6">
                  {/* Drag handle */}
                  <div className="w-10 h-1 rounded-full bg-white/[0.15] mx-auto mb-5" />

                  <div className="flex flex-col items-center text-center">
                    <div className="w-14 h-14 rounded-2xl bg-creo-accent/10 flex items-center justify-center mb-4">
                      <svg className="w-7 h-7 text-creo-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                      </svg>
                    </div>

                    <h3 className="font-heading font-bold text-lg text-creo-text mb-2">
                      Unlock full analysis
                    </h3>
                    <p className="text-sm text-creo-muted leading-relaxed mb-6 max-w-xs">
                      Get detailed per-dimension reasoning, actionable rewrite suggestions, and competitor benchmarks.
                    </p>

                    <button
                      className="w-full bg-creo-accent text-creo-bg font-heading font-semibold text-sm py-3.5 rounded-xl hover:brightness-110 transition-all accent-glow"
                      onClick={() => setShowWaitlistModal(false)}
                    >
                      Join Waitlist
                    </button>
                    <button
                      className="mt-3 text-xs text-creo-muted hover:text-creo-text transition-colors"
                      onClick={() => setShowWaitlistModal(false)}
                    >
                      Maybe later
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
