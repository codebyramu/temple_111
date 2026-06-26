import { Link } from "react-router-dom";
import { Reveal, PageTransition, Image3D } from "../components/shared";

const WORKS = [
  { title: "Tripura Upanishad Bhashya", desc: "Commentary on the Tripura Upanishad — a foundational text on Goddess Tripura Sundari worship." },
  { title: "Lalita Sahasranama Bhashyam", desc: "The definitive commentary on the 1000 names of Goddess Lalita. Still the gold standard reference." },
  { title: "Varivasya Rahasya", desc: "A profound treatise on Srividya and the inner science of the sacred diagram Sri Chakra." },
  { title: "Saubhagya Bhaskara", desc: "A commentary on Lalita Trishati — one hundred more names of the goddess with deep philosophical insight." },
  { title: "Setubandha", desc: "A commentary on the Nityashodashikarnava — a tantric scripture revealing the sixteen forms of the goddess." },
  { title: "Guptavati", desc: "Commentary on Durgasaptashati, connecting the fierce form of Durga to the supreme consciousness of Lalita." },
];

export default function SaintPage() {
  return (
    <PageTransition>
      {/* HERO */}
      <section className="relative min-h-[55dvh] md:min-h-[75dvh] flex items-center justify-center text-center overflow-hidden">
        <Image3D src="/images/saint_scholar.jpg" alt="Shri Bhaskararaya" className="absolute inset-0 w-full h-full" imgClassName="w-full h-full object-cover" style={{ width: "100%", height: "100%" }} hoverScale={1} />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/95 via-stone-950/50 to-stone-950/10" />
        <div className="relative z-10 max-w-5xl mx-auto w-full px-5 md:px-10 flex flex-col items-center">
          <div className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest text-stone-400 mb-6">
            <Link to="/" className="hover:text-amber-400 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-amber-400">The Saint</span>
          </div>
          <h1 className="font-['Philosopher'] font-black text-white leading-tight mb-3"
            style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}>
            Shri Bhaskararaya
          </h1>
          <p className="font-['Cormorant_Garamond'] italic text-amber-300 text-xl md:text-2xl max-w-xl mx-auto text-center">
            The greatest scholar-saint of the Srividya tradition.
          </p>
        </div>
      </section>

      {/* BIO */}
      <section className="bg-gradient-to-b from-[#1c1917] to-[#161412] py-12 md:py-32">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 md:gap-16 items-start">
            <div className="lg:col-span-3 space-y-6 text-stone-400 text-base md:text-lg font-light leading-relaxed">
              <Reveal>
                <p className="font-['Cormorant_Garamond'] text-stone-300 leading-relaxed"
                  style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)" }}>
                  Bhaskararaya Makhin was one of the greatest spiritual scholars India has ever produced — a man whose life was an act of total devotion to the Goddess.
                </p>
              </Reveal>
              <Reveal delay={0.1}><p>Born in Hyderabad in the late 17th century, Bhaskararaya showed extraordinary spiritual aptitude from childhood. He traveled to Kashi (Varanasi) — the spiritual capital of India — where he mastered the Vedas, the Upanishads, the Shastras, and the secret science of Srividya under the guidance of great masters.</p></Reveal>
              <Reveal delay={0.15}><p>He is particularly celebrated for his mastery of the Srividya tradition — the worship of the Goddess as the supreme, all-encompassing consciousness called Sri Lalita Tripura Sundari. Through this path, he understood that the universe itself is the body of the Goddess, and every act of existence is an act of divine worship.</p></Reveal>
              <Reveal delay={0.2}><p>Eventually, he came to Bhaskararajapuram and made it his home — practicing, teaching, and writing here. His presence transformed this humble village into a radiating center of spiritual knowledge. After his mahasamadhi (conscious departure from the body), his samadhi became a place of pilgrimage that continues to draw seekers from across the world.</p></Reveal>

              {/* Quote */}
              <Reveal delay={0.25}>
                <div className="border-l-4 border-amber-600 pl-6 py-2 mt-6">
                  <p className="font-['Cormorant_Garamond'] italic text-stone-300"
                    style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)" }}>
                    "He did not merely study the goddess. He became her instrument."
                  </p>
                </div>
              </Reveal>
            </div>

            {/* Sidebar facts */}
            <div className="lg:col-span-2 space-y-4">
              <Reveal delay={0.1}>
                <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6 space-y-4">
                  {[
                    ["Born", "Hyderabad, 17th century"],
                    ["Education", "Vedas & Shastras at Kashi"],
                    ["Tradition", "Srividya, Lalita worship"],
                    ["Written Works", "40+ Sanskrit texts"],
                    ["Samadhi", "Bhaskararajapuram"],
                    ["Legacy", "Centuries of living tradition"],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between items-start gap-4 pb-3 border-b border-amber-100 last:border-0">
                      <p className="text-[10px] uppercase tracking-wider text-amber-500 whitespace-nowrap">{k}</p>
                      <p className="text-stone-300 text-sm text-right">{v}</p>
                    </div>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="relative rounded-2xl overflow-hidden shadow-lg" style={{ height: "220px" }}>
                  <Image3D src="/images/samadhi_shrine_1782367323868.jpg" alt="Saint memorial" className="w-full h-full" imgClassName="w-full h-full object-cover" style={{ width: "100%", height: "100%" }} />
                </div>
                <p className="text-[10px] uppercase tracking-widest text-stone-400 text-center mt-3">
                  The Bhaskarereswar Memorial, Bhaskararajapuram
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* WORKS */}
      <section className="bg-[#12100e] py-12 md:py-32">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <Reveal>
            <SplitText className="font-['Philosopher'] font-bold text-stone-100 mb-4" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>
              40+ Sanskrit Works
            </SplitText>
            <p className="text-stone-500 font-light mb-14 max-w-xl mx-auto text-center">
              Bhaskararaya's writings remain authoritative texts in the Srividya tradition to this day. Here are some of his most celebrated works.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {WORKS.map((w, i) => (
              <Reveal key={w.title} delay={i * 0.07}>
                <div className="relative bg-stone-900/95 md:bg-stone-900/60 md:backdrop-blur-xl rounded-2xl p-6 border border-white/5 hover:border-amber-500/30 hover:bg-stone-900/80 shadow-2xl overflow-hidden group transition-all duration-500 h-full">
                  <div className="w-8 h-px bg-amber-600 mb-4" />
                  <h3 className="font-['Philosopher'] font-semibold text-stone-100 text-base mb-3">{w.title}</h3>
                  <p className="text-stone-500 text-sm leading-relaxed">{w.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-stone-900 py-20 px-5 md:px-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-8">
          <div>
            <p className="font-['Cormorant_Garamond'] italic text-stone-200 text-2xl max-w-xl leading-relaxed">
              "Visit the samadhi of the saint and feel his presence for yourself."
            </p>
          </div>
          <Link to="/temple/bhaskarereswar-memorial"
            className="flex-shrink-0 bg-gradient-to-r from-amber-600 to-amber-800 text-stone-50 border border-amber-500/30 shadow-[0_0_20px_rgba(180,83,9,0.3)] hover:shadow-[0_0_30px_rgba(180,83,9,0.6)] text-[11px] uppercase tracking-widest px-8 py-3 rounded-full hover:bg-amber-600 transition-colors font-semibold">
            Visit the Memorial →
          </Link>
        </div>
      </section>
      {/* Massive Spacing */}
      <div className="h-32 md:h-56 bg-[#12100e]" />
    </PageTransition>
  );
}
