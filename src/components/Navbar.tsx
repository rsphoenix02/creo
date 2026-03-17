"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ y: -80, opacity: 0, x: "-50%" }}
          animate={{ y: 0, opacity: 1, x: "-50%" }}
          exit={{ y: -80, opacity: 0, x: "-50%" }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
          className="fixed top-5 left-1/2 z-50 glass rounded-full px-6 py-3 flex items-center gap-6"
        >
          <span className="font-heading font-bold text-sm tracking-wide text-creo-text">
            CREO
          </span>

          <div className="w-px h-4 bg-white/10" />

          <button
            onClick={() => scrollTo("how-it-works")}
            className="text-creo-muted text-sm font-body hover:text-creo-text transition-colors duration-300"
          >
            How It Works
          </button>

          <button
            onClick={() => scrollTo("dimensions")}
            className="text-creo-muted text-sm font-body hover:text-creo-text transition-colors duration-300"
          >
            Dimensions
          </button>

          <button
            onClick={() => scrollTo("pricing")}
            className="text-creo-muted text-sm font-body hover:text-creo-text transition-colors duration-300"
          >
            Pricing
          </button>

          <button
            onClick={() => scrollTo("analyzer")}
            className="bg-creo-accent text-creo-bg text-sm font-heading font-semibold px-4 py-1.5 rounded-full hover:brightness-110 transition-all duration-300"
          >
            Try It
          </button>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
