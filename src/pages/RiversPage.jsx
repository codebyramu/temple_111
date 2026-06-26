import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal, PageTransition } from "../components/shared";
import { RIVERS } from "../data/content";

export default function RiversPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  return (
    <PageTransition>
      {/* HERO */}
      <section ref={heroRef} className="relative min-h-[80dvh] flex items-center justify-center text-center overflow-hidden">
        <motion.img
          src="/images/rivers_panorama.jpg"
          alt="Sacred rivers"
          className="absolute inset-0 w-full object-cover origin-top"
          style={{ height: "120%", y: imgY }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/40 to-transparent" />
        <div className="relative z-10 max-w-5xl mx-auto w-full px-5 md:px-10 flex flex-col items-center">
          <div className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest text-stone-400 mb-6">
            <Link to="/" className="hover:text-amber-400 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-amber-400">Sacred Rivers</span>
          </div>
          <h1 className="font-['Philosopher'] font-black text-white leading-tight mb-4"
            style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}>
            Three Sacred Rivers.
          </h1>
          <p className="font-['Cormorant_Garamond'] italic text-amber-300 text-xl md:text-2xl max-w-xl mx-auto text-center">
            Where water becomes worship, and the land becomes divine.
          </p>
        </div>
      </section>

      {/* INTRO */}
      <section className="bg-gradient-to-b from-[#1c1917] to-[#161412] py-12 md:py-32">
        <div className="max-w-4xl mx-auto px-5 md:px-10">
          <Reveal>
            <SplitText className="font-['Philosopher'] font-bold text-stone-100 leading-tight mb-8"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>
              A Divine Triangle of Waters
            </SplitText>
          </Reveal>
          <div className="space-y-5 text-stone-400 text-base md:text-lg font-light leading-relaxed">
            <Reveal delay={0.1}><p>In ancient Indian tradition, a land touched by three sacred rivers is considered supremely blessed — a Triveni Sangam in spirit, where the energy of the waters amplifies the spiritual power of the land. Bhaskararajapuram is exactly such a place.</p></Reveal>
            <Reveal delay={0.15}><p>The Kaveri, Arasalar, and Vennaru rivers form a living mandala around the village. Devotees believe these waters carry not just the mineral richness of the earth, but the accumulated prayers of millions of pilgrims who have bathed in them across centuries.</p></Reveal>
            <Reveal delay={0.2}><p>The saint Bhaskararaya is said to have performed his most intense tapas on the banks of these rivers — and his presence sanctified them even further. Today, the rivers continue to nourish both the land and the spirit of all who encounter them.</p></Reveal>
          </div>
        </div>
      </section>

      {/* RIVERS DETAIL */}
      {RIVERS.map((r, i) => (
        <section key={r.id} className={i % 2 === 0 ? "bg-[#12100e] py-20" : "bg-gradient-to-b from-[#1c1917] to-[#161412] py-20"}>
          <div className="max-w-7xl mx-auto px-5 md:px-10">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-14 items-center ${i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}>
              <Reveal>
                <div className="relative rounded-2xl overflow-hidden shadow-xl" style={{ height: "400px" }}>
                  <img src={r.img} alt={r.name} className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-stone-950/30" />
                  <div className="absolute bottom-6 left-6">
                    <p className="font-['Philosopher'] font-black text-white text-4xl">{r.name}</p>
                    <p className="text-amber-300 text-[11px] uppercase tracking-widest mt-1">{r.role}</p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-amber-500 mb-3">Sacred River {["I", "II", "III"][i]}</p>
                  <SplitText className="font-['Philosopher'] font-bold text-stone-100 leading-tight mb-3"
                    style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}>
                    {r.name}
                  </SplitText>
                  <p className="font-['Cormorant_Garamond'] italic text-stone-400 text-xl mb-6">{r.tagline}</p>
                  <p className="text-stone-400 text-base font-light leading-relaxed mb-4">{r.desc}</p>
                  <p className="text-stone-500 text-sm leading-relaxed">{r.story}</p>
                  <div className="mt-6 bg-amber-50 border border-amber-100 rounded-xl px-5 py-4">
                    <p className="text-[10px] uppercase tracking-widest text-amber-500 mb-1">Spiritual Significance</p>
                    <p className="text-stone-300 text-sm">{r.significance}</p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      ))}

      {/* CLOSING */}
      <section className="bg-stone-900 py-24 px-5 md:px-10 text-center">
        <Reveal>
          <p className="font-['Cormorant_Garamond'] italic text-stone-100 leading-snug mb-8"
            style={{ fontSize: "clamp(1.6rem, 4vw, 3rem)" }}>
            "Their waters purify.<br />Their meeting is prayer."
          </p>
          <div className="w-10 h-px bg-amber-700 mx-auto mb-6" />
          <Link to="/shrines"
            className="inline-block bg-gradient-to-r from-amber-600 to-amber-800 text-stone-50 border border-amber-500/30 shadow-[0_0_20px_rgba(180,83,9,0.3)] hover:shadow-[0_0_30px_rgba(180,83,9,0.6)] text-[11px] uppercase tracking-widest px-8 py-3 rounded-full hover:bg-amber-600 transition-colors font-semibold">
            Explore the Four Shrines →
          </Link>
        </Reveal>
      </section>
      {/* Massive Spacing */}
      <div className="h-32 md:h-56 bg-[#12100e]" />
    </PageTransition>
  );
}
