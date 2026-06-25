import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Reveal, WipeReveal, PageTransition, Image3D, SplitText, staggerContainer, staggerItem } from "../components/shared";

export default function SahasranamamPage() {
  return (
    <PageTransition>
      {/* HERO */}
      <section className="relative min-h-[75dvh] flex items-end overflow-hidden">
        <Image3D
          src="/images/saint_scholar.jpg"
          alt="Sri Lalitha Sahasranamam"
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
            <span className="text-amber-400">Sri Lalitha Sahasranamam</span>
          </div>
          <SplitText
            className="font-['Cinzel'] font-black text-white leading-tight mb-4"
            style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}
          >
            Sri Lalitha Sahasranamam
          </SplitText>
          <p className="font-['Cormorant_Garamond'] italic text-amber-300 text-xl md:text-2xl max-w-2xl">
            A Thousand Names of the Divine Mother — The Essence of Shakta Worship.
          </p>
        </div>
      </section>

      {/* INTRO */}
      <section className="bg-stone-50 py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <Reveal>
            <SplitText
              className="font-['Cinzel'] font-bold text-stone-900 leading-tight mb-10"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              What is Lalitha Sahasranamam?
            </SplitText>
          </Reveal>
          <div className="space-y-6 text-stone-600 text-base md:text-lg font-light leading-relaxed">
            <Reveal delay={0.1}>
              <p>
                <strong>Sri Lalitha Sahasranamam</strong> is one of the most revered texts in Sanatana Dharma. It comprises 1,000 sacred names of Goddess Lalita Tripura Sundari, the supreme embodiment of the Divine Feminine energy (Shakti).
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p>
                Each name in the Sahasranama is not just a title, but a mantra (sacred sound) that holds deep spiritual meaning, metaphysical power, and symbolic wisdom. It is found in the Brahmanda Purana, in the section called Lalitopakhyana, believed to have been revealed by eight divine sages and originally chanted by Lord Hayagriva to Sage Agastya.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p>
                Lalita Tripura Sundari is the Supreme Goddess of beauty, compassion, and wisdom. She is the ruler of Sri Chakra, the geometric representation of the universe, and embodies Satchidananda (Truth, Consciousness, Bliss).
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="bg-stone-100 py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <Reveal>
            <SplitText
              className="font-['Cinzel'] font-bold text-stone-900 mb-4"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              Benefits of Chanting
            </SplitText>
            <p className="text-stone-500 font-light mb-16 max-w-xl text-lg">
              Reciting or listening to the Lalitha Sahasranamam is considered a powerful spiritual practice.
            </p>
          </Reveal>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {[
              { title: "Mental Peace", desc: "Calms the mind and reduces anxiety" },
              { title: "Spiritual Growth", desc: "Aids in self-realization and consciousness expansion" },
              { title: "Health & Healing", desc: "Said to improve vitality and immunity" },
              { title: "Protection", desc: "Removes fear, negativity, and evil influences" },
              { title: "Success & Prosperity", desc: "Brings abundance and good fortune" },
              { title: "Divine Grace", desc: "Opens the heart to unconditional love and divine guidance" },
            ].map((b, i) => (
              <motion.div key={b.title} variants={staggerItem} className="group relative bg-white/70 backdrop-blur-md rounded-2xl p-8 border border-stone-200/60 hover:border-amber-300 h-full hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                <div className="absolute -right-10 -top-10 w-32 h-32 bg-amber-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="w-10 h-1 bg-amber-500 mb-6 rounded-full origin-left group-hover:scale-x-150 transition-transform duration-500" />
                <h3 className="relative z-10 font-['Cinzel'] font-bold text-stone-900 text-lg mb-3">{b.title}</h3>
                <p className="relative z-10 text-stone-600 text-sm md:text-base leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* THE VILLAGE CONNECTION */}
      <section className="bg-stone-50 py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <Reveal>
            <h2 className="font-['Cinzel'] font-bold text-stone-900 leading-tight mb-8"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>
              Central to Bhaskararajapuram
            </h2>
          </Reveal>
          <div className="space-y-6 text-stone-600 text-base md:text-lg font-light leading-relaxed">
            <Reveal delay={0.1}>
              <p>
                Bhaskararajapuram is closely associated with Shri Bhaskararaya, the master interpreter of Lalitha Sahasranamam. His commentary, <em>Lalita Sahasranama Bhashya</em>, is considered the authoritative explanation, where each name is unpacked with grammar, philosophical meaning, and cross-references to Upanishads and Tantras.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p>
                The village is a spiritual seat for Srividya upasana and Sri Chakra worship. The Sahasranamam is chanted daily and on special occasions by devotees and priests here, serving as a living tradition, not just a text.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-stone-900 py-20 px-6 md:px-10 text-center">
        <Reveal>
          <p className="font-['Cormorant_Garamond'] italic text-stone-200 text-2xl mb-6 max-w-2xl mx-auto leading-relaxed">
            "Each name corresponds to a specific section of the Sri Chakra, revealing the path from gross consciousness to cosmic union."
          </p>
          <Link to="/saint"
            className="inline-block bg-amber-700 text-white text-[11px] uppercase tracking-widest px-8 py-3 rounded-full hover:bg-amber-600 transition-colors font-semibold">
            Learn about Shri Bhaskararaya →
          </Link>
        </Reveal>
      </section>
    </PageTransition>
  );
}
