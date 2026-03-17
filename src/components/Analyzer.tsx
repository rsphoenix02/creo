"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AnalysisState } from "@/types";
import { analyzeCopy } from "@/lib/api";
import { EXAMPLE_COPIES, DIMENSIONS } from "@/lib/constants";
import MagneticButton from "./MagneticButton";
import ScoreRing from "./ScoreRing";
import DimensionCard from "./DimensionCard";
import TopImprovement from "./TopImprovement";

export default function Analyzer() {
  const [adCopy, setAdCopy] = useState("");
  const [state, setState] = useState<AnalysisState>({ status: "idle" });

  const handleAnalyze = useCallback(async () => {
    const trimmed = adCopy.trim();
    if (!trimmed) return;

    setState({ status: "loading" });

    try {
      const result = await analyzeCopy(trimmed);
      setState({ status: "success", result });
    } catch (err) {
      setState({
        status: "error",
        message:
          err instanceof Error ? err.message : "Something went wrong.",
      });
    }
  }, [adCopy]);

  const handleExample = (copy: string) => {
    setAdCopy(copy);
    setState({ status: "idle" });
  };

  const wordCount = adCopy.trim().split(/\s+/).filter(Boolean).length;

  return (
    <section id="analyzer" className="py-24 md:py-32 lg:py-40 relative">
      <div className="max-w-4xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          className="mb-12"
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
              rows={8}
              className="w-full bg-transparent text-creo-text placeholder:text-creo-muted-2 font-body text-base leading-relaxed p-5 rounded-xl resize-none focus:outline-none focus:ring-1 focus:ring-creo-accent/30 focus:shadow-[0_0_20px_rgba(232,255,71,0.08)] transition-all duration-500"
            />
            <div className="flex items-center justify-between px-5 pb-3">
              <span className="text-xs font-mono text-creo-muted-2">
                {wordCount} {wordCount === 1 ? "word" : "words"}
              </span>
              {adCopy.length > 0 && (
                <button
                  onClick={() => {
                    setAdCopy("");
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
          className="flex flex-wrap gap-2 mb-6"
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

        {/* Results / Loading / Error states */}
        <AnimatePresence mode="wait">
          {state.status === "loading" && (
            <motion.div
              key="loading"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="mt-12"
            >
              <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                {/* Skeleton overall score */}
                <div className="md:col-span-6">
                  <div className="card-bezel">
                    <div className="card-bezel-inner flex items-center justify-center py-12">
                      <div className="w-32 h-32 rounded-full skeleton" />
                    </div>
                  </div>
                </div>
                {/* Skeleton dimension cards */}
                {[3, 3, 2, 2, 2].map((span, i) => (
                  <div key={i} className={`md:col-span-${span}`}>
                    <div className="card-bezel">
                      <div className="card-bezel-inner space-y-3 h-48">
                        <div className="h-4 w-24 rounded skeleton" />
                        <div className="h-3 w-full rounded skeleton" />
                        <div className="h-3 w-3/4 rounded skeleton" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {state.status === "error" && (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="mt-12"
            >
              <div className="card-bezel">
                <div className="card-bezel-inner text-center py-12">
                  <div className="w-12 h-12 rounded-full bg-creo-score-low/10 flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-6 h-6 text-creo-score-low"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                  </div>
                  <p className="text-creo-text font-heading font-semibold mb-2">
                    Analysis failed
                  </p>
                  <p className="text-creo-muted text-sm mb-6">
                    {state.message}
                  </p>
                  <button
                    onClick={handleAnalyze}
                    className="text-sm font-heading font-semibold text-creo-accent hover:underline"
                  >
                    Try again
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {state.status === "success" && (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-12"
            >
              <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-stretch">
                {/* Overall Score */}
                <motion.div
                  className="md:col-span-6"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 20,
                  }}
                >
                  <div className="card-bezel">
                    <div className="card-bezel-inner flex flex-col items-center py-10">
                      <span className="text-xs font-mono text-creo-muted-2 uppercase tracking-widest mb-6">
                        Overall Score
                      </span>
                      <ScoreRing
                        score={state.result.overall_score}
                        size={140}
                        strokeWidth={5}
                      />
                      <p className="text-creo-muted text-sm mt-4 font-body">
                        across 5 dimensions
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Dimension Cards — Bento layout */}
                {DIMENSIONS.map((dim, i) => (
                  <DimensionCard
                    key={dim.key}
                    label={dim.label}
                    data={state.result[dim.key]}
                    index={i}
                    gridSpan={i < 2 ? "md:col-span-3" : "md:col-span-2"}
                  />
                ))}

                {/* Top Improvement */}
                <TopImprovement text={state.result.top_improvement} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
