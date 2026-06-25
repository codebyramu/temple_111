import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Reveal, WipeReveal, Image3D, PageTransition, staggerContainer, staggerItem } from "../components/shared";
import { TEMPLES } from "../data/content";

export default function ShrinesPage() {
  return (
    <PageTransition>
      {/* HERO */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 bg-stone-100 overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
          style={{ background: "radial-gradient(circle at 65% 40%, #b45309 0%, transparent 65%)" }}
        />
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-stone-400 mb-8">
            <Link to="/" className="hover:text-amber-700 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-amber-700">Shrines</span>
          </div>
          <Reveal>
            <WipeReveal>
              <h1 className="font-['Cinzel'] font-black text-stone-900 leading-tight"
                style={{ fontSize: "clamp(2.8rem, 7vw, 6rem)" }}>
                Four Sacred Shrines.
              </h1>
            </WipeReveal>
            <p className="font-['Cormorant_Garamond'] italic text-amber-700 mt-3"
              style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)" }}>
              Pillars of the village's spiritual life.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-stone-600 text-lg font-light leading-relaxed max-w-2xl mt-6">
              Each temple in Bhaskararajapuram carries a unique aspect of the divine. Together, they form a sacred constellation anchoring the spiritual life of this village for centuries.
            </p>
          </Reveal>
        </div>
      </section>

      {/* TEMPLES — alternating layout */}
      <section className="bg-stone-50 py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-10 space-y-10">
          {TEMPLES.map((t, i) => (
            <Reveal key={t.id} delay={i * 0.07}>
              <Link to={`/temple/${t.id}`} className="group block">
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-500 ${i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}>
                  {/* 3D Image */}
                  <div className="relative overflow-hidden" style={{ height: "clamp(280px, 45vw, 460px)" }}>
                    <Image3D
                      src={t.img}
                      alt={t.name}
                      className="absolute inset-0 w-full h-full rounded-none"
                      imgClassName=""
                      style={{ width: "100%", height: "100%" }}
                    />
                    <div className="absolute inset-0 bg-stone-950/15 group-hover:bg-stone-950/5 transition-all duration-500 pointer-events-none" />
                    <div className="absolute top-5 left-5 font-['Cinzel'] text-5xl font-black text-white/20 pointer-events-none">
                      {t.num}
                    </div>
                  </div>
                  {/* Content */}
                  <div className="bg-white p-8 md:p-12 flex flex-col justify-center">
                    <p className="text-[10px] uppercase tracking-widest text-amber-700 mb-3">{t.deity}</p>
                    <h2 className="font-['Cinzel'] font-bold text-stone-900 leading-tight mb-4"
                      style={{ fontSize: "clamp(1.5rem, 3vw, 2.4rem)" }}>
                      {t.name}
                    </h2>
                    <p className="font-['Cormorant_Garamond'] italic text-stone-600 text-lg mb-4 leading-snug">{t.tagline}</p>
                    <p className="text-stone-500 text-sm leading-relaxed mb-8">{t.desc}</p>
                    <div className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-amber-700 group-hover:gap-5 transition-all duration-300 font-semibold">
                      Enter this Shrine
                      <motion.span
                        animate={{ x: [0, 4, 0] }}
                        transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
                        className="text-base"
                      >→</motion.span>
                    </div>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-stone-900 py-20 px-6 md:px-10 text-center">
        <Reveal>
          <p className="font-['Cormorant_Garamond'] italic text-stone-200 text-2xl mb-6 max-w-2xl mx-auto leading-relaxed">
            "The four shrines form a sacred geometry — each one a point of light in the divine constellation of Bhaskararajapuram."
          </p>
          <Link to="/saint"
            className="inline-block bg-amber-700 text-white text-[11px] uppercase tracking-widest px-8 py-3 rounded-full hover:bg-amber-600 transition-colors font-semibold">
            Learn about the Saint →
          </Link>
        </Reveal>
      </section>
    </PageTransition>
  );
}
