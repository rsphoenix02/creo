"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const navLinks = [
  { label: "How It Works", target: "how-it-works" },
  { label: "Dimensions", target: "dimensions" },
  { label: "Pricing", target: "pricing" },
] as const;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{
          opacity: mounted ? 1 : 0,
          y: mounted ? 0 : -20,
          maxWidth: scrolled ? 580 : 1280,
          borderRadius: scrolled ? 9999 : 0,
          paddingTop: scrolled ? 12 : 24,
          paddingBottom: scrolled ? 12 : 8,
          paddingLeft: 24,
          paddingRight: 24,
          marginTop: scrolled ? 20 : 0,
        }}
        transition={{
          opacity: { duration: 0.5, ease: "easeOut", delay: mounted && !scrolled ? 0.2 : 0 },
          y: { duration: 0.5, ease: "easeOut", delay: mounted && !scrolled ? 0.2 : 0 },
          default: { type: "spring", stiffness: 180, damping: 28 },
        }}
        style={{
          width: "100%",
          background: scrolled ? "rgba(255, 255, 255, 0.04)" : "transparent",
          backdropFilter: scrolled ? "blur(24px)" : "blur(0px)",
          WebkitBackdropFilter: scrolled ? "blur(24px)" : "blur(0px)",
          borderWidth: 1,
          borderStyle: "solid",
          borderColor: scrolled ? "rgba(255, 255, 255, 0.06)" : "transparent",
          transition: "background 0.5s ease, backdrop-filter 0.5s ease, -webkit-backdrop-filter 0.5s ease, border-color 0.5s ease",
        }}
        className="relative flex items-center pointer-events-auto"
      >
        {/* Logo — fixed width to help center the links */}
        <span className="font-heading font-bold text-sm tracking-wide text-creo-text whitespace-nowrap min-w-[60px]">
          CREO
        </span>

        {/* Nav links — always absolutely centered */}
        <div className="hidden md:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
          {navLinks.map(({ label, target }) => (
            <button
              key={target}
              onClick={() => scrollTo(target)}
              className="text-creo-muted text-sm font-body hover:text-creo-text transition-colors duration-300 whitespace-nowrap"
            >
              {label}
            </button>
          ))}
        </div>

        {/* CTA — always pushed to far right */}
        <motion.button
          onClick={() => scrollTo("analyzer")}
          animate={{
            paddingLeft: scrolled ? 16 : 20,
            paddingRight: scrolled ? 16 : 20,
            paddingTop: scrolled ? 6 : 8,
            paddingBottom: scrolled ? 6 : 8,
          }}
          transition={{ type: "spring", stiffness: 180, damping: 28 }}
          className="ml-auto bg-creo-accent text-creo-bg text-sm font-heading font-semibold rounded-full hover:brightness-110 transition-all duration-300 whitespace-nowrap"
        >
          Try It
        </motion.button>
      </motion.nav>
    </div>
  );
}
