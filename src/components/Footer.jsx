import { Link } from "react-router-dom";
import { TEMPLES } from "../data/content";
import { motion } from "framer-motion";

export default function Footer() {
  const links = [
    { label: "The Village", href: "/village" },
    { label: "The Saint", href: "/saint" },
    { label: "All Shrines", href: "/shrines" },
    { label: "Sacred Rivers", href: "/rivers" },
    { label: "Lalitha Sahasranamam", href: "/sahasranamam" },
    { label: "Divine Street", href: "/divine-street" },
    { label: "Srinivas Rama Trust", href: "/trust" },
  ];

  return (
    <footer className="bg-[#181512] text-stone-400 relative overflow-hidden">
      {/* Subtle top gradient bar */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-amber-700 to-transparent opacity-60" />

      {/* Decorative glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(180,83,9,0.1) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-5 md:px-10 pt-16 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8 mb-14">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="inline-block mb-4"
            >
              <p className="font-['Philosopher'] font-bold text-stone-100 tracking-[0.2em] text-base mb-1">
                TEMPLE TRAYA
              </p>
              <div className="h-[1.5px] w-full bg-gradient-to-r from-amber-700 to-transparent" />
            </motion.div>
            <p className="text-[11px] uppercase tracking-widest text-amber-700 mb-4">
              Bhaskararajapuram · Tamil Nadu
            </p>
            <p className="text-xs leading-relaxed text-stone-500 max-w-[220px]">
              A sacred heritage village home to four ancient temples, three holy rivers, and the legacy of the great saint Bhaskararaya.
            </p>
          </div>

          {/* Explore */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-stone-600 mb-5 font-semibold">Explore</p>
            <div className="flex flex-col gap-3">
              {links.map((l) => (
                <Link
                  key={l.href}
                  to={l.href}
                  className="text-[13px] text-stone-500 hover:text-amber-500 transition-colors leading-none"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Temples */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-stone-600 mb-5 font-semibold">Four Shrines</p>
            <div className="flex flex-col gap-3">
              {TEMPLES.map((t) => (
                <Link
                  key={t.id}
                  to={`/temple/${t.id}`}
                  className="text-[13px] text-stone-500 hover:text-amber-500 transition-colors flex items-center gap-2 leading-snug"
                >
                  <span className="text-amber-700/60 text-[10px] font-bold tabular-nums">{t.num}</span>
                  {t.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Location */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-stone-600 mb-5 font-semibold">Sacred Location</p>
            <div className="space-y-2 text-[13px] text-stone-500">
              <p>Bhaskararajapuram</p>
              <p>Near Mayiladuthurai</p>
              <p>Tamil Nadu, India</p>
            </div>
            <div className="mt-6 pt-5 border-t border-stone-800">
              <p className="text-[10px] uppercase tracking-widest text-stone-700 mb-2">Sacred Rivers</p>
              <p className="text-xs text-stone-500">Kaveri · Arasalar · Vennaru</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-stone-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-stone-700">
            © 2026 Bhaskararajapuram Heritage. All rights reserved.
          </p>
          <p className="text-[11px] text-stone-700">Tamil Nadu · India</p>
        </div>
      </div>
    </footer>
  );
}
