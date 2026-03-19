"use client";

import React from "react";
import { motion } from "framer-motion";
import { getScoreColor } from "@/lib/api";

interface DimensionScoreCardProps {
  index: number;
  label: string;
  description: string;
  reasoning?: string;
  suggestion?: string;
  score: number | null;
  colorClass: string;
  onClick?: () => void;
  delay?: number;
}

export default function DimensionScoreCard({
  index,
  label,
  description,
  reasoning,
  suggestion,
  score,
  colorClass,
  onClick,
  delay = 0,
}: DimensionScoreCardProps) {
  const hasApiData = Boolean(reasoning || suggestion);
  const scoreColor = score !== null ? getScoreColor(score) : undefined;
  const progressWidth = score !== null ? `${score * 10}%` : "0%";

  return (
    <motion.div
      className={`dimension-score-card ${colorClass}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay,
      }}
      onClick={onClick}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider">
          0{index + 1}
        </span>
        {score !== null && (
          <motion.span
            className="text-lg font-mono font-bold"
            style={{ color: scoreColor }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: delay + 0.2 }}
          >
            {score}
          </motion.span>
        )}
        {score === null && (
          <span className="text-lg font-mono font-bold text-white/10">—</span>
        )}
      </div>

      {/* Title */}
      <h3 className="font-heading font-semibold text-sm text-creo-text mb-1 leading-tight">
        {label}
      </h3>

      {/* Reasoning + Suggestion (from API) or static description */}
      {hasApiData ? (
        <div className="mb-4 space-y-2">
          {reasoning && (
            <p className="text-xs text-white/50 leading-relaxed">
              {reasoning}
            </p>
          )}
          {suggestion && (
            <div className="flex items-start gap-1.5 pt-1.5 border-t border-white/[0.06]">
              <svg
                className="w-3 h-3 text-creo-accent mt-0.5 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              <p className="text-xs text-white/60 leading-relaxed">
                {suggestion}
              </p>
            </div>
          )}
        </div>
      ) : (
        <p className="text-[11px] text-white/40 leading-relaxed mb-4">
          {description}
        </p>
      )}

      {/* Progress bar */}
      <div className="mt-auto">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] font-mono text-white/30">Score</span>
          <span
            className="text-[10px] font-mono font-semibold"
            style={{ color: scoreColor || "rgba(255,255,255,0.1)" }}
          >
            {score !== null ? `${score}/10` : "—/10"}
          </span>
        </div>
        <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: scoreColor || "transparent" }}
            initial={{ width: "0%" }}
            animate={{ width: progressWidth }}
            transition={{ duration: 0.8, ease: "easeOut", delay: delay + 0.3 }}
          />
        </div>
      </div>
    </motion.div>
  );
}
