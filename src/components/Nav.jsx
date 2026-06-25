import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { TEMPLES } from "../data/content";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Close menu on route change
  useEffect(() => { setOpen(false); }, [pathname]);

  const links = [
    { label: "Village", href: "/village" },
    { label: "The Saint", href: "/saint" },
    { label: "Shrines", href: "/shrines" },
    { label: "Rivers", href: "/rivers" },
    { label: "Sahasranamam", href: "/sahasranamam" },
    { label: "Divine Street", href: "/divine-street" },
    { label: "Trust", href: "/trust" },
  ];

  const navBg = scrolled || !isHome
    ? "bg-stone-50/95 backdrop-blur-md shadow-sm border-b border-stone-200"
    : "bg-transparent";

  const textColor = !scrolled && isHome ? "text-stone-900" : "text-stone-900";

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${navBg}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className={`font-['Cinzel'] text-sm font-black tracking-[0.2em] whitespace-nowrap transition-colors ${textColor} hover:text-amber-700`}
        >
          TEMPLE TRAYA
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              to={l.href}
              className={`text-[11px] uppercase tracking-widest transition-colors whitespace-nowrap
                ${pathname === l.href ? "text-amber-700 font-semibold" : `${textColor} hover:text-amber-700 opacity-70 hover:opacity-100`}`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col gap-[5px] p-1"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <motion.span
            animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            className="block w-6 h-px bg-stone-900 origin-center transition-all"
          />
          <motion.span
            animate={open ? { opacity: 0 } : { opacity: 1 }}
            className="block w-6 h-px bg-stone-900"
          />
          <motion.span
            animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            className="block w-6 h-px bg-stone-900 origin-center transition-all"
          />
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="md:hidden bg-stone-50 border-t border-stone-200 px-6 py-6 flex flex-col gap-1"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            style={{ overflow: "hidden" }}
          >
            {links.map((l, i) => (
              <motion.div
                key={l.href}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <Link
                  to={l.href}
                  className="block py-3 text-[13px] uppercase tracking-widest text-stone-700 hover:text-amber-700 border-b border-stone-100 last:border-0"
                >
                  {l.label}
                </Link>
              </motion.div>
            ))}

            <div className="mt-4 pt-4 border-t border-stone-200">
              <p className="text-[10px] uppercase tracking-widest text-stone-400 mb-3">Temples</p>
              {TEMPLES.map((t, i) => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (links.length + i) * 0.06 }}
                >
                  <Link
                    to={`/temple/${t.id}`}
                    className="block py-2 text-[12px] text-stone-600 hover:text-amber-700"
                  >
                    <span className="text-amber-600 mr-2 font-semibold">{t.num}</span>
                    {t.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
