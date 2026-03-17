"use client";

import { motion } from "framer-motion";
import { getScoreColor } from "@/lib/api";
import AnimatedCounter from "./AnimatedCounter";

interface ScoreRingProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  showLabel?: boolean;
  delay?: number;
}

export default function ScoreRing({
  score,
  size = 80,
  strokeWidth = 4,
  className = "",
  showLabel = true,
  delay = 0,
}: ScoreRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const fillPercentage = score / 10;
  const dashOffset = circumference * (1 - fillPercentage);
  const color = getScoreColor(score);

  return (
    <motion.div
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 15,
        delay,
      }}
    >
      {/* Glow behind ring */}
      <div
        className="absolute inset-0 rounded-full blur-xl opacity-30"
        style={{ backgroundColor: color }}
      />

      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90"
      >
        {/* Background ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={strokeWidth}
        />
        {/* Score ring with spring fill */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: dashOffset }}
          transition={{
            type: "spring",
            stiffness: 40,
            damping: 12,
            delay: delay + 0.3,
          }}
        />
      </svg>

      {/* Animated counter label */}
      {showLabel && (
        <AnimatedCounter
          value={score}
          delay={(delay + 0.3) * 1000}
          duration={1000}
          decimals={score % 1 === 0 ? 0 : 1}
          className="absolute font-mono font-bold"
          style={{
            color,
            fontSize: size * 0.28,
          }}
        />
      )}
    </motion.div>
  );
}
