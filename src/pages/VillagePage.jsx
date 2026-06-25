import { Link } from "react-router-dom";
import { Reveal, PageTransition, Image3D } from "../components/shared";

const TIMELINE = [
  { year: "Ancient Era", event: "Village established along the sacred banks of the Kaveri, Arasalar, and Vennaru rivers." },
  { year: "17th Century", event: "Shri Bhaskararaya arrives and begins his intensive spiritual practice at the Bhaskareswarar shrine." },
  { year: "1690s", event: "Bhaskararaya completes his magnum opus on Srividya and Lalita Sahasranama — works still revered today." },
  { year: "Post Bhaskararaya", event: "The village becomes a pilgrimage destination. Seekers from across India travel here to absorb the saint's energy." },
  { year: "Temple Expansion", event: "The four shrines are renovated and expanded to their current form, following Agama tradition." },
  { year: "Present Day", event: "Bhaskararajapuram remains a living spiritual center — daily rituals, Vedic chanting, and pilgrimage continue unbroken." },
];

export default function VillagePage() {
  return (
    <PageTransition>
      {/* HERO */}
      <section className="relative min-h-[60dvh] md:min-h-[75dvh] flex items-center justify-center text-center overflow-hidden">
        <Image3D
          src="/images/village_aerial.jpg"
          alt="Bhaskararajapuram village"
          className="absolute inset-0 w-full h-full"
          imgClassName="w-full h-full object-cover"
          style={{ width: "100%", height: "100%" }}
          hoverScale={1}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/40 to-transparent" />
        <div className="relative z-10 max-w-5xl mx-auto w-full px-5 md:px-10 flex flex-col items-center">
          <div className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest text-stone-400 mb-4 md:mb-6">
            <Link to="/" className="hover:text-amber-400 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-amber-400">The Village</span>
          </div>
          <h1 className="font-['Philosopher'] font-black text-white leading-tight mb-3 md:mb-4"
            style={{ fontSize: "clamp(2rem, 7vw, 6rem)" }}>
            Bhaskararajapuram
          </h1>
          <p className="font-['Cormorant_Garamond'] italic text-amber-300 text-lg md:text-2xl max-w-xl mx-auto text-center">
            A peaceful spiritual village where time moves to the rhythm of temple bells.
          </p>
        </div>
      </section>

      {/* INTRO */}
      <section className="bg-stone-50 py-14 md:py-32">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-start">
            <div>
              <Reveal>
                <h2 className="font-['Philosopher'] font-bold text-stone-900 leading-tight mb-6"
                  style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.8rem)" }}>
                  The Land Itself is Sacred
                </h2>
                <div className="space-y-5 text-stone-600 text-base md:text-lg font-light leading-relaxed">
                  <p>Bhaskararajapuram is not just a village — it is a living spiritual ecosystem. Located near Mayiladuthurai in Tamil Nadu, it sits at the confluence of three sacred rivers and carries the accumulated prayers of centuries in its soil.</p>
                  <p>The village takes its name from the great saint Bhaskararaya — a 17th-century scholar and devotee whose presence transformed this quiet settlement into one of the most spiritually significant sites in southern India.</p>
                  <p>Even today, the village maintains an atmosphere unlike any other. The sound of Vedic chanting begins before dawn and continues through the evening. The fragrance of incense, marigolds, and sacred camphor is ever-present. The pace of life here is calibrated not to the clock, but to the rhythm of ritual.</p>
                </div>
              </Reveal>
            </div>

            <div className="space-y-5">
              <Reveal delay={0.1}>
                <div className="relative rounded-2xl overflow-hidden" style={{ height: "300px" }}>
                  <Image3D src="/images/village_aerial.jpg" alt="Village aerial" className="w-full h-full" imgClassName="w-full h-full object-cover" style={{ width: "100%", height: "100%" }} />
                </div>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
                  <p className="text-[10px] uppercase tracking-widest text-amber-700 mb-3">Location</p>
                  <p className="font-['Cinzel'] font-bold text-stone-900 text-lg mb-1">Near Mayiladuthurai</p>
                  <p className="text-stone-600 text-sm">Tamil Nadu, South India</p>
                  <div className="mt-4 pt-4 border-t border-amber-200 grid grid-cols-2 gap-4 text-sm text-stone-600">
                    <div><span className="block text-[10px] uppercase tracking-wider text-amber-700 mb-1">Temples</span>4 Ancient Shrines</div>
                    <div><span className="block text-[10px] uppercase tracking-wider text-amber-700 mb-1">Rivers</span>3 Sacred Rivers</div>
                    <div><span className="block text-[10px] uppercase tracking-wider text-amber-700 mb-1">Legacy</span>Saint Bhaskararaya</div>
                    <div><span className="block text-[10px] uppercase tracking-wider text-amber-700 mb-1">Tradition</span>Vedic, Tamil Agama</div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="bg-stone-100 py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <Reveal>
            <h2 className="font-['Cinzel'] font-bold text-stone-900 mb-16"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>
              A Living History
            </h2>
          </Reveal>
          <div className="space-y-0">
            {TIMELINE.map((t, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="flex gap-8 pb-10 relative">
                  <div className="flex flex-col items-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-600 mt-1.5 flex-shrink-0" />
                    {i < TIMELINE.length - 1 && <div className="w-px flex-1 bg-stone-300 mt-2" />}
                  </div>
                  <div className="pb-2">
                    <p className="text-[10px] uppercase tracking-widest text-amber-700 font-semibold mb-2">{t.year}</p>
                    <p className="text-stone-600 text-base leading-relaxed">{t.event}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* LINKS */}
      <section className="bg-stone-50 py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <Reveal>
            <h2 className="font-['Cinzel'] font-bold text-stone-900 mb-8" style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)" }}>
              Continue Exploring
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { title: "The Saint", sub: "Shri Bhaskararaya", href: "/saint", img: "/images/saint_scholar.jpg" },
              { title: "Four Shrines", sub: "Sacred temples", href: "/shrines", img: "/images/shiva_shrine_1782367275777.jpg" },
              { title: "Three Rivers", sub: "Holy waters", href: "/rivers", img: "/images/rivers_panorama.jpg" },
            ].map((c, i) => (
              <Reveal key={c.href} delay={i * 0.1}>
                <Link to={c.href} className="block group relative rounded-xl overflow-hidden" style={{ height: "220px" }}>
                  <Image3D src={c.img} alt={c.title} className="absolute inset-0 w-full h-full" imgClassName="transition-transform duration-600 group-hover:scale-105 w-full h-full object-cover" style={{ width: "100%", height: "100%" }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 to-transparent pointer-events-none" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 pointer-events-none">
                    <p className="font-['Cinzel'] font-bold text-white text-base">{c.title}</p>
                    <p className="text-amber-400 text-[10px] uppercase tracking-widest mt-0.5">{c.sub}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
