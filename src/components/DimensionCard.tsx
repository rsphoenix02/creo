"use client";

import { motion } from "framer-motion";
import ScoreRing from "./ScoreRing";
import TiltCard from "./TiltCard";
import { DimensionScore } from "@/types";

interface DimensionCardProps {
  label: string;
  data: DimensionScore;
  index: number;
  gridSpan?: string;
}

export default function DimensionCard({
  label,
  data,
  index,
  gridSpan = "md:col-span-3",
}: DimensionCardProps) {
  return (
    <motion.div
      className={`${gridSpan} h-full`}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: 0.15 * index,
      }}
    >
      <TiltCard tiltStrength={6} className="h-full">
        <div className="card-bezel h-full">
          <div className="card-bezel-inner h-full flex flex-col">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-heading font-semibold text-base text-creo-text">
                  {label}
                </h3>
                <span className="text-xs font-mono text-creo-muted-2 mt-0.5 block">
                  Dimension {index + 1}/5
                </span>
              </div>
              <ScoreRing
                score={data.score}
                size={56}
                strokeWidth={3}
                delay={0.15 * index}
              />
            </div>

            {/* Reasoning */}
            <p className="text-sm text-creo-muted leading-relaxed mb-4 flex-1">
              {data.reasoning}
            </p>

            {/* Suggestion */}
            <div className="pt-3 border-t border-white/[0.06]">
              <div className="flex items-start gap-2">
                <svg
                  className="w-4 h-4 text-creo-accent mt-0.5 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
                <p className="text-sm text-creo-text/80 leading-relaxed">
                  {data.suggestion}
                </p>
              </div>
            </div>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}
