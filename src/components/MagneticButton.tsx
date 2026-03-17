"use client";

import { useRef, useState, type MouseEvent, type ReactNode } from "react";
import { motion, useSpring } from "framer-motion";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  strength?: number;
}

export default function MagneticButton({
  children,
  className = "",
  onClick,
  type = "button",
  disabled = false,
  strength = 0.3,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useSpring(0, { stiffness: 150, damping: 15, mass: 0.1 });
  const y = useSpring(0, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
    if (!ref.current || disabled) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.button
      ref={ref}
      type={type}
      disabled={disabled}
      className={className}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileTap={{ scale: 0.97 }}
      data-hovered={isHovered}
    >
      {children}
    </motion.button>
  );
}
