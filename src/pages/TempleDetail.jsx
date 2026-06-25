import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Reveal, WipeReveal, Image3D, PageTransition, staggerContainer, staggerItem } from "../components/shared";
import { TEMPLES } from "../data/content";

export default function TempleDetail() {
  const { id } = useParams();
  const temple = TEMPLES.find((t) => t.id === id);
  if (!temple) return <Navigate to="/shrines" replace />;
  const nextTemple = TEMPLES[(TEMPLES.indexOf(temple) + 1) % TEMPLES.length];

  return (
    <PageTransition>
      {/* HERO */}
      <section className="relative min-h-[100dvh] flex items-center justify-center text-center overflow-hidden">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8, ease: "easeOut" }}
        >
          <Image3D
            src={temple.heroImg}
            alt={temple.name}
            className="w-full h-full"
            imgClassName="w-full h-full"
            style={{ width: "100%", height: "100%" }}
            hoverScale={1}
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/95 via-stone-950/50 to-stone-950/15" />

        <div className="relative z-10 max-w-5xl mx-auto w-full px-5 md:px-10 flex flex-col items-center">
          <div className="flex items-center justify-center gap-2 mb-8 text-[10px] uppercase tracking-widest text-stone-400">
            <Link to="/" className="hover:text-amber-400 transition-colors">Home</Link>
            <span>/</span>
            <Link to="/shrines" className="hover:text-amber-400 transition-colors">Shrines</Link>
            <span>/</span>
            <span className="text-amber-400">{temple.name}</span>
          </div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.3 }}>
            <div className="font-['Philosopher'] text-amber-500 text-sm font-semibold tracking-widest mb-3">
              Shrine {temple.num}
            </div>
            <h1 className="font-['Philosopher'] font-black text-white leading-tight mb-4"
              style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}>
              {temple.name}
            </h1>
            <p className="text-[11px] uppercase tracking-widest text-amber-400 mb-5">{temple.deity}</p>
            <p className="font-['Cormorant_Garamond'] italic text-stone-200 text-xl md:text-2xl max-w-xl leading-relaxed">
              {temple.tagline}
            </p>
          </motion.div>
        </div>
      </section>

      {/* STORY */}
      <section className="bg-stone-50 py-12 md:py-32">
        <div className="max-w-4xl mx-auto px-5 md:px-10">
          <div className="space-y-8">
            {temple.fullStory.map((para, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <p className={`text-stone-600 leading-relaxed font-light ${i === 0
                  ? "text-xl md:text-2xl font-['Cormorant_Garamond'] text-stone-700"
                  : "text-base md:text-lg"}`}>
                  {para}
                </p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.3}>
            <div className="mt-14 border-l-4 border-amber-600 pl-8 py-2">
              <p className="font-['Cormorant_Garamond'] italic text-stone-700 leading-snug"
                style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)" }}>
                {temple.quote}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FACTS */}
      <section className="bg-stone-100 py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <Reveal>
            <WipeReveal>
              <h2 className="font-['Philosopher'] font-bold text-stone-900 mb-10"
                style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>
                Shrine Details
              </h2>
            </WipeReveal>
          </Reveal>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {temple.facts.map((f) => (
              <motion.div key={f.label} variants={staggerItem}
                className="bg-white rounded-xl p-6 border border-stone-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                <p className="text-[10px] uppercase tracking-widest text-amber-700 mb-2">{f.label}</p>
                <p className="font-['Philosopher'] font-semibold text-stone-900 text-lg">{f.value}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* OTHER SHRINES */}
      <section className="bg-stone-50 py-20">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <Reveal>
            <p className="text-[10px] uppercase tracking-widest text-amber-700 mb-6">Other Shrines</p>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {TEMPLES.filter((t) => t.id !== temple.id).map((t, i) => (
              <Reveal key={t.id} delay={i * 0.08}>
                <Link to={`/temple/${t.id}`} className="block group">
                  <div className="relative rounded-xl overflow-hidden shadow-md" style={{ height: "220px" }}>
                    <Image3D
                      src={t.img}
                      alt={t.name}
                      className="absolute inset-0 w-full h-full rounded-xl overflow-hidden"
                      imgClassName="transition-transform duration-600 group-hover:scale-105"
                      style={{ width: "100%", height: "100%" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 to-transparent pointer-events-none" />
                    <div className="absolute bottom-0 left-0 right-0 p-5 pointer-events-none">
                      <p className="text-[10px] uppercase tracking-widest text-amber-400 mb-1">{t.deity}</p>
                      <h3 className="font-['Philosopher'] font-bold text-white text-base leading-tight">{t.name}</h3>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* NEXT SHRINE */}
      <section className="bg-stone-900 py-20">
        <div className="max-w-7xl mx-auto px-5 md:px-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-stone-500 mb-1">Next Shrine</p>
            <p className="font-['Philosopher'] font-bold text-white text-2xl">{nextTemple.name}</p>
            <p className="text-amber-600 text-xs uppercase tracking-widest mt-1">{nextTemple.deity}</p>
          </div>
          <Link to={`/temple/${nextTemple.id}`}
            className="bg-amber-700 text-white text-[11px] uppercase tracking-widest px-8 py-3 rounded-full hover:bg-amber-600 transition-colors font-semibold whitespace-nowrap">
            Enter Shrine {nextTemple.num} →
          </Link>
        </div>
      </section>
    </PageTransition>
  );
}
