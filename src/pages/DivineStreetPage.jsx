import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Reveal, WipeReveal, PageTransition, Image3D, staggerContainer, staggerItem } from "../components/shared";
import { TEMPLES } from "../data/content";

export default function DivineStreetPage() {
  return (
    <PageTransition>
      {/* HERO */}
      <section className="relative min-h-[75dvh] flex items-end overflow-hidden">
        <Image3D
          src="/images/village_aerial.jpg"
          alt="Divine Street"
          className="absolute inset-0 w-full h-full object-cover"
          imgClassName="w-full h-full object-cover"
          style={{ width: "100%", height: "100%" }}
          hoverScale={1}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/95 via-stone-950/50 to-stone-950/20" />
        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-10 pb-16 md:pb-24">
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-stone-400 mb-6">
            <Link to="/" className="hover:text-amber-400 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-amber-400">Divine Street</span>
          </div>
          <WipeReveal>
            <h1 className="font-['Cinzel'] font-black text-white leading-tight mb-4"
              style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}>
              Divine Street
            </h1>
          </WipeReveal>
          <p className="font-['Cormorant_Garamond'] italic text-amber-300 text-xl md:text-2xl max-w-2xl">
            The Sacred Trail of Bhaskararajapuram: A Journey Through Temples, Tradition, and Tranquility.
          </p>
        </div>
      </section>

      {/* INTRO */}
      <section className="bg-stone-50 py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <Reveal>
            <h2 className="font-['Cinzel'] font-bold text-stone-900 leading-tight mb-8"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>
              What is the Divine Street?
            </h2>
          </Reveal>
          <div className="space-y-6 text-stone-600 text-base md:text-lg font-light leading-relaxed">
            <Reveal delay={0.1}>
              <p>
                "Divine Street" refers to a spiritual corridor or pilgrimage pathway in and around Bhaskararajapuram, encompassing a series of temples, shrines, heritage spots, and sacred sites closely connected with Shri Bhaskararaya's life, the Srividya tradition, Devi and Shiva worship, and a living culture of devotion.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p>
                This street is not merely physical — it's a symbolic path of spiritual elevation, designed to guide seekers through external pilgrimage and inner transformation.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* LANDMARKS */}
      <section className="bg-stone-100 py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <Reveal>
            <h2 className="font-['Cinzel'] font-bold text-stone-900 mb-10" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>
              Sacred Landmarks
            </h2>
          </Reveal>
          <div className="space-y-6">
            {TEMPLES.map((temple, i) => (
              <Reveal key={temple.id} delay={i * 0.1}>
                <div className="bg-white rounded-xl p-8 border border-stone-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  <div>
                    <h3 className="font-['Cinzel'] font-bold text-stone-900 text-xl md:text-2xl mb-2">{temple.name}</h3>
                    <p className="text-[10px] uppercase tracking-widest text-amber-700 mb-3">{temple.deity}</p>
                    <p className="text-stone-600 text-sm md:text-base leading-relaxed max-w-2xl">{temple.desc}</p>
                  </div>
                  <Link to={`/temple/${temple.id}`} className="shrink-0 text-[11px] uppercase tracking-widest font-semibold text-amber-700 hover:text-amber-900 transition-colors">
                    Explore Shrine →
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PILGRIMAGE PATH */}
      <section className="bg-stone-50 py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <Reveal>
              <h2 className="font-['Cinzel'] font-bold text-stone-900 mb-8" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>
                Suggested Spiritual Route
              </h2>
            </Reveal>
            <motion.div
              className="space-y-4"
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {[
                { step: "1. Purification", desc: "Begin with a dip at the river confluence (Triveni Sangamam)" },
                { step: "2. Invocation", desc: "Offer prayers at Ganesha shrines to remove obstacles" },
                { step: "3. Knowledge Path", desc: "Visit Bhaskarereswar Memorial for inner awakening" },
                { step: "4. Shakti Worship", desc: "Proceed to Vishnu Durgai Temple for divine strength" },
                { step: "5. Devotion", desc: "Offer bhakti at Kothanda Ramaswamy Temple" },
                { step: "6. Liberation Focus", desc: "End at Bhaskareswarar Temple, meditating on Shiva" },
              ].map((r, i) => (
                <motion.div key={r.step} variants={staggerItem} className="flex gap-4 p-4 bg-amber-50 rounded-lg border border-amber-100">
                  <div className="shrink-0 font-['Cinzel'] text-amber-700 font-bold">{i + 1}</div>
                  <div>
                    <h4 className="font-['Cinzel'] font-semibold text-stone-900 mb-1">{r.step.split('. ')[1]}</h4>
                    <p className="text-stone-600 text-sm">{r.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
          <Reveal delay={0.2}>
            <div className="relative rounded-2xl overflow-hidden shadow-xl" style={{ height: "500px" }}>
              <Image3D
                src="/images/rivers_panorama.jpg"
                alt="Sacred Path"
                className="w-full h-full"
                imgClassName="w-full h-full"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-stone-900 py-20 px-6 md:px-10 text-center">
        <Reveal>
          <p className="font-['Cormorant_Garamond'] italic text-stone-200 text-2xl mb-6 max-w-2xl mx-auto leading-relaxed">
            "The journey of life and liberation."
          </p>
          <Link to="/trust"
            className="inline-block bg-amber-700 text-white text-[11px] uppercase tracking-widest px-8 py-3 rounded-full hover:bg-amber-600 transition-colors font-semibold">
            Support the Trust →
          </Link>
        </Reveal>
      </section>
    </PageTransition>
  );
}
