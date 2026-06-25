import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    fn();
    return () => window.removeEventListener("scroll", fn);
  }, []);

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

  const isTransparent = !scrolled && isHome && !open;

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[100] transition-all duration-500"
      style={{
        background: isTransparent
          ? "transparent"
          : "rgba(250,249,247,0.96)",
        backdropFilter: isTransparent ? "none" : "blur(18px)",
        WebkitBackdropFilter: isTransparent ? "none" : "blur(18px)",
        borderBottom: isTransparent ? "none" : "1px solid rgba(0,0,0,0.07)",
        boxShadow: isTransparent ? "none" : "0 2px 20px rgba(0,0,0,0.04)",
      }}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-10 h-[60px] md:h-[68px] flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="font-['Philosopher'] text-[13px] md:text-sm font-bold tracking-[0.22em] whitespace-nowrap transition-colors hover:text-amber-700"
          style={{ color: isTransparent ? "#ffffff" : "#1c1917" }}
        >
          TEMPLE TRAYA
        </Link>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              to={l.href}
              className="relative text-[11px] uppercase tracking-widest font-medium transition-colors whitespace-nowrap group"
              style={{
                color: isTransparent
                  ? (pathname === l.href ? "#fbbf24" : "rgba(255,255,255,0.85)")
                  : (pathname === l.href ? "#b45309" : "#57534e"),
              }}
            >
              {l.label}
              <span
                className="absolute -bottom-0.5 left-0 h-px bg-amber-600 transition-all duration-300"
                style={{ width: pathname === l.href ? "100%" : "0%" }}
              />
              <span className="absolute -bottom-0.5 left-0 h-px bg-amber-600 w-0 group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
        </div>

        {/* Hamburger — mobile */}
        <button
          className="lg:hidden flex flex-col justify-center gap-[5px] p-2 -mr-2"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <motion.span
            animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.25 }}
            className="block w-[22px] h-[1.5px] origin-center rounded-full"
            style={{ background: isTransparent ? "#fff" : "#1c1917" }}
          />
          <motion.span
            animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.2 }}
            className="block w-[22px] h-[1.5px] rounded-full"
            style={{ background: isTransparent ? "#fff" : "#1c1917" }}
          />
          <motion.span
            animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.25 }}
            className="block w-[22px] h-[1.5px] origin-center rounded-full"
            style={{ background: isTransparent ? "#fff" : "#1c1917" }}
          />
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="lg:hidden border-t overflow-hidden"
            style={{
              background: "rgba(250,249,247,0.98)",
              backdropFilter: "blur(20px)",
              borderColor: "rgba(0,0,0,0.08)",
            }}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="px-5 py-5 flex flex-col gap-0.5">
              {links.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                >
                  <Link
                    to={l.href}
                    className="flex items-center justify-between py-3.5 text-sm font-medium border-b border-stone-100 last:border-0 transition-colors"
                    style={{ color: pathname === l.href ? "#b45309" : "#292524" }}
                  >
                    <span>{l.label}</span>
                    {pathname === l.href && (
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                    )}
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
