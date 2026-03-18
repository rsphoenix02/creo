"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "How It Works", target: "how-it-works" },
  { label: "Dimensions", target: "dimensions" },
  { label: "Join Waitlist", target: "waitlist" },
] as const;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scrollTo = useCallback((id: string) => {
    setMobileOpen(false);
    // Small delay so menu closes before scroll
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 150);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none px-4 md:px-0">
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{
          opacity: mounted ? 1 : 0,
          y: mounted ? 0 : -20,
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
          maxWidth: mobileOpen ? 1280 : scrolled ? 580 : 1280,
          borderRadius: mobileOpen ? 20 : scrolled ? 9999 : 0,
          background: scrolled || mobileOpen ? "rgba(255, 255, 255, 0.04)" : "transparent",
          backdropFilter: scrolled || mobileOpen ? "blur(24px)" : "blur(0px)",
          WebkitBackdropFilter: scrolled || mobileOpen ? "blur(24px)" : "blur(0px)",
          borderWidth: 1,
          borderStyle: "solid",
          borderColor: scrolled || mobileOpen ? "rgba(255, 255, 255, 0.06)" : "transparent",
          transition: "background 0.5s ease, backdrop-filter 0.5s ease, -webkit-backdrop-filter 0.5s ease, border-color 0.5s ease",
        }}
        className="relative flex flex-wrap items-center pointer-events-auto"
      >
        {/* Logo */}
        <span className="font-heading font-bold text-sm tracking-wide text-creo-text whitespace-nowrap min-w-[60px]">
          CREO
        </span>

        {/* Nav links — desktop: absolutely centered */}
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

        {/* Mobile hamburger — AnimatePresence wraps full SVGs (not inside SVG) */}
        <button
          onClick={() => setMobileOpen((prev) => !prev)}
          className="md:hidden ml-auto mr-3 p-2 text-creo-muted hover:text-creo-text transition-colors"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          <AnimatePresence mode="wait" initial={false}>
            {mobileOpen ? (
              <motion.svg
                key="close"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </motion.svg>
            ) : (
              <motion.svg
                key="menu"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                initial={{ opacity: 0, rotate: 90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -90 }}
                transition={{ duration: 0.2 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </motion.svg>
            )}
          </AnimatePresence>
        </button>

        {/* CTA — pushed to far right on desktop, after hamburger on mobile */}
        <motion.button
          onClick={() => scrollTo("analyzer")}
          animate={{
            paddingLeft: scrolled ? 16 : 20,
            paddingRight: scrolled ? 16 : 20,
            paddingTop: scrolled ? 6 : 8,
            paddingBottom: scrolled ? 6 : 8,
          }}
          transition={{ type: "spring", stiffness: 180, damping: 28 }}
          className="md:ml-auto bg-creo-accent text-creo-bg text-sm font-heading font-semibold rounded-full hover:brightness-110 transition-all duration-300 whitespace-nowrap"
        >
          Try It
        </motion.button>

        {/* Mobile dropdown menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="md:hidden w-full overflow-hidden"
            >
              <div className="flex flex-col gap-1 pt-4 pb-2 border-t border-white/[0.06] mt-3">
                {navLinks.map(({ label, target }, i) => (
                  <motion.button
                    key={target}
                    onClick={() => scrollTo(target)}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ delay: i * 0.05, type: "spring", stiffness: 200, damping: 20 }}
                    className="text-left text-creo-muted text-sm font-body py-2.5 px-2 rounded-lg hover:text-creo-text hover:bg-white/[0.04] transition-colors duration-200"
                  >
                    {label}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
}
