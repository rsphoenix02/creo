"use client";

import { motion } from "framer-motion";

interface TopImprovementProps {
  text: string;
}

export default function TopImprovement({ text }: TopImprovementProps) {
  return (
    <motion.div
      className="md:col-span-6"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 80, damping: 18, delay: 0.9 }}
    >
      <div className="rounded-2xl p-[1px] bg-gradient-to-r from-creo-accent/30 via-creo-accent/10 to-creo-accent/30">
        <div className="rounded-[15px] bg-creo-surface p-6 md:p-8">
          <div className="flex items-start gap-4">
            {/* Icon */}
            <div className="w-10 h-10 rounded-xl bg-creo-accent/10 flex items-center justify-center flex-shrink-0">
              <svg
                className="w-5 h-5 text-creo-accent"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>

            {/* Content */}
            <div>
              <h3 className="font-heading font-semibold text-sm text-creo-accent mb-2 uppercase tracking-wider">
                Top Improvement
              </h3>
              <p className="text-creo-text text-base leading-relaxed">
                {text}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
