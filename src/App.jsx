import About from "./components/About";
import Contact from "./components/Contact";
import { useState, useCallback } from "react";
import { Menu, X } from "lucide-react";
import WelcomeScreen from "./components/WelcomeScreen";
import Hero from "./components/Hero";
import PortfolioShowcase from "./components/PortfolioShowcase";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Portfolio", href: "#work" },
];

const backgroundStyle = {
  backgroundColor: "#0b0f19",
  backgroundImage: [
    "radial-gradient(700px circle at 82% 12%, rgba(59,130,246,0.20), transparent 65%)",
    "radial-gradient(600px circle at 8% 85%, rgba(99,102,241,0.12), transparent 65%)",
    "radial-gradient(rgba(148,163,184,0.18) 1px, transparent 1px)",
  ].join(", "),
  backgroundSize: "100% 100%, 100% 100%, 28px 28px",
  backgroundAttachment: "fixed",
};

function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  const finishWelcome = useCallback(() => {
    setShowWelcome(false);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      {showWelcome && <WelcomeScreen onFinish={finishWelcome} />}

      <main className="min-h-screen text-[#f1f5f9]" style={backgroundStyle}>
        {/* Navigation */}
        <header className="fixed inset-x-0 top-0 z-50 px-6 pt-4 md:px-12">
          <div className="relative mx-auto max-w-7xl">
            {/* Bar: tanpa border, dibedakan lewat warna + bayangan */}
            <div className="flex items-center justify-between rounded-2xl bg-[#161e31]/90 px-6 py-4 shadow-xl shadow-black/30 backdrop-blur-xl">
              {/* Logo */}
              <a
                href="#home"
                onClick={closeMenu}
                className="text-2xl font-extrabold tracking-tight text-white"
              >
                DS<span className="text-blue-500">.</span>
              </a>

              {/* Menu desktop */}
              <nav className="hidden items-center gap-6 text-sm font-medium text-gray-300 md:flex">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="transition-colors hover:text-blue-400"
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href="#contact"
                  className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-500"
                >
                  Contact ↗
                </a>
              </nav>

              {/* Tombol burger (HP) */}
              <button
                type="button"
                onClick={() => setMenuOpen((open) => !open)}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-200 transition hover:bg-white/5 hover:text-blue-400 md:hidden"
              >
                {menuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>

            {/* Menu dropdown (HP) */}
            {menuOpen && (
              <nav
                id="mobile-menu"
                className="absolute inset-x-0 top-full mt-2 rounded-2xl bg-[#161e31] p-3 shadow-xl shadow-black/40 md:hidden"
              >
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                    className="block rounded-lg px-4 py-3 text-sm font-medium text-gray-200 transition hover:bg-white/5 hover:text-blue-400"
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href="#contact"
                  onClick={closeMenu}
                  className="mt-2 block rounded-lg bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-blue-500"
                >
                  Contact ↗
                </a>
              </nav>
            )}
          </div>
        </header>

        {/* Hero */}
        <Hero />

        {/* About */}
        <About />

        {/* Portfolio Showcase */}
        <PortfolioShowcase />

        {/* Contact */}
        <Contact />
      </main>
    </>
  );
}

export default App;
