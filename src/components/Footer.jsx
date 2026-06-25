import { Link } from "react-router-dom";
import { TEMPLES } from "../data/content";

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-400">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Brand */}
        <div className="lg:col-span-1">
          <p className="font-['Cinzel'] font-black text-stone-100 tracking-widest text-sm mb-2">
            TEMPLE TRAYA
          </p>
          <p className="text-[11px] uppercase tracking-widest text-amber-700 mb-4">
            Bhaskararajapuram
          </p>
          <p className="text-xs leading-relaxed text-stone-500">
            A sacred heritage village in Tamil Nadu, home to four ancient temples, three holy rivers, and the legacy of the great saint Bhaskararaya.
          </p>
        </div>

        {/* Explore */}
        <div>
          <p className="text-[10px] uppercase tracking-widest text-stone-500 mb-4">Explore</p>
          <div className="flex flex-col gap-2">
            {[
              { label: "The Village", href: "/village" },
              { label: "The Saint", href: "/saint" },
              { label: "All Shrines", href: "/shrines" },
              { label: "Sacred Rivers", href: "/rivers" },
              { label: "Lalitha Sahasranamam", href: "/sahasranamam" },
              { label: "Divine Street", href: "/divine-street" },
              { label: "Srinivas Rama Trust", href: "/trust" },
            ].map((l) => (
              <Link key={l.href} to={l.href} className="text-sm text-stone-400 hover:text-amber-500 transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Temples */}
        <div>
          <p className="text-[10px] uppercase tracking-widest text-stone-500 mb-4">Four Shrines</p>
          <div className="flex flex-col gap-2">
            {TEMPLES.map((t) => (
              <Link key={t.id} to={`/temple/${t.id}`} className="text-sm text-stone-400 hover:text-amber-500 transition-colors flex items-center gap-2">
                <span className="text-amber-700 text-xs font-semibold">{t.num}</span>
                {t.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Location */}
        <div>
          <p className="text-[10px] uppercase tracking-widest text-stone-500 mb-4">Location</p>
          <div className="space-y-1 text-sm">
            <p>Bhaskararajapuram</p>
            <p>Near Mayiladuthurai</p>
            <p>Tamil Nadu, India</p>
          </div>
          <div className="mt-6 pt-6 border-t border-stone-800">
            <p className="text-[10px] uppercase tracking-widest text-stone-600">Sacred Rivers</p>
            <p className="text-xs mt-1 text-stone-500">Kaveri · Arasalar · Vennaru</p>
          </div>
        </div>
      </div>

      <div className="border-t border-stone-800 px-6 md:px-10 py-5 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="text-xs text-stone-600">© 2026 Bhaskararajapuram Heritage. All rights reserved.</p>
        <p className="text-xs text-stone-700">Tamil Nadu · India</p>
      </div>
    </footer>
  );
}
