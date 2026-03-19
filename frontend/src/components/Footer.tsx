import ScrollReveal from "./ScrollReveal";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            {/* Left — Brand */}
            <div>
              <div className="font-heading font-bold text-lg text-creo-text mb-1">
                CREO
              </div>
              <p className="text-sm text-creo-muted-2">
                Never run a bad ad twice.
              </p>
            </div>

            {/* Center — Builder credit */}
            <div className="text-sm text-creo-muted-2">
              Built with FastAPI + Claude API
            </div>

            {/* Right — Links */}
            <div className="flex items-center gap-6 text-sm text-creo-muted-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-creo-text transition-colors duration-300"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-creo-text transition-colors duration-300"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </footer>
  );
}
