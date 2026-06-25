import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  Reveal,
  WipeReveal,
  Image3D,
  AnimatedCounter,
  MagneticButton,
  Float,
  staggerContainer,
  staggerItem,
} from "../components/shared";
import { TEMPLES, RIVERS } from "../data/content";

/* ───────────────────────────────────────
   HOVER ROW (Full Width Trigger)
─────────────────────────────────────── */
function HoverRow({ word, i }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      className="border-b border-stone-200 last:border-0 px-6 md:px-10 py-6 flex items-center cursor-pointer relative"
      initial={{ x: i % 2 === 0 ? -60 : 60, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 1, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-cursor-grow
    >
      {/* Background Fill */}
      <motion.div
        className="absolute inset-0 bg-amber-400 origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      />
      {/* Text overlay */}
      <span
        className="relative z-10 mix-blend-multiply font-['Cinzel'] font-black text-stone-900 pointer-events-none"
        style={{ fontSize: "clamp(3.5rem, 9vw, 8rem)" }}
      >
        {word}
      </span>
    </motion.div>
  );
}

/* ───────────────────────────────────────
   FILL WORDS SECTION
─────────────────────────────────────── */
function FillWordsSection() {
  const words = ["Ancient.", "Spiritual.", "Sacred."];
  return (
    <section className="bg-stone-100 border-y border-stone-200 overflow-hidden">
      {words.map((word, i) => (
        <HoverRow key={word} word={word} i={i} />
      ))}
    </section>
  );
}

/* ───────────────────────────────────────
   HORIZONTAL TEMPLE TRACK
─────────────────────────────────────── */
function ShrinesTrack() {
  const wrapRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["2%", "-58%"]);

  return (
    <section id="shrines" className="bg-stone-100">
      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-24 pb-10">
        <Reveal>
          <WipeReveal>
            <h2
              className="font-['Cinzel'] font-bold text-stone-900 leading-tight"
              style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
            >
              Four Shrines. One Sacred Truth.
            </h2>
          </WipeReveal>
          <p className="text-stone-500 mt-3 text-base font-light">
            Click any shrine to enter its story.
          </p>
        </Reveal>
      </div>

      <div ref={wrapRef} style={{ height: "260vh" }}>
        <div className="sticky top-0 min-h-[100dvh] flex items-center overflow-hidden">
          <motion.div className="flex gap-6 px-6 md:px-10" style={{ x }}>
            {TEMPLES.map((t, i) => (
              <Link
                key={t.id}
                to={`/temple/${t.id}`}
                className="block flex-shrink-0"
                style={{ width: "clamp(280px, 38vw, 460px)" }}
              >
                <motion.div
                  className="relative rounded-2xl overflow-hidden shadow-lg group"
                  style={{ height: "clamp(360px, 65vh, 560px)" }}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* 3D image inside the card */}
                  <Image3D
                    src={t.img}
                    alt={t.name}
                    className="absolute inset-0 rounded-2xl overflow-hidden"
                    imgClassName="transition-transform duration-700 group-hover:scale-105"
                    style={{ width: "100%", height: "100%" }}
                  >
                    {/* Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/92 via-stone-950/25 to-transparent pointer-events-none" />

                    {/* Roman numeral */}
                    <div className="absolute top-5 left-5 font-['Cinzel'] text-2xl font-black text-white/20 pointer-events-none">
                      {t.num}
                    </div>

                    {/* Explore badge */}
                    <div className="absolute top-5 right-5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1 text-[10px] uppercase tracking-widest text-white opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0 whitespace-nowrap pointer-events-none">
                      Explore →
                    </div>

                    {/* Bottom info */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 pointer-events-none">
                      <p className="text-[10px] uppercase tracking-widest text-amber-400 mb-1">
                        {t.deity}
                      </p>
                      <h3
                        className="font-['Cinzel'] font-bold text-white leading-tight mb-2"
                        style={{ fontSize: "clamp(1.1rem, 2.2vw, 1.6rem)" }}
                      >
                        {t.name}
                      </h3>
                      <p className="text-stone-300 text-xs leading-relaxed font-light line-clamp-2">
                        {t.desc}
                      </p>
                    </div>
                  </Image3D>
                </motion.div>
              </Link>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────
   RIVERS PREVIEW
─────────────────────────────────────── */
function RiversPreview() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section id="rivers" ref={ref} className="bg-stone-50 py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

          {/* Parallax + 3D image */}
          <Reveal>
            <div
              className="relative rounded-2xl overflow-hidden shadow-xl"
              style={{ height: "520px" }}
            >
              <motion.div
                className="absolute inset-0 w-full"
                style={{ height: "120%", y: imgY, top: "-10%" }}
              >
                <Image3D
                  src="/images/rivers_panorama.jpg"
                  alt="Sacred rivers"
                  className="w-full h-full rounded-2xl overflow-hidden"
                  imgClassName=""
                  style={{ height: "100%" }}
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/65 to-transparent pointer-events-none rounded-2xl" />
              <div className="absolute bottom-8 left-8 right-8 pointer-events-none">
                <p className="font-['Cormorant_Garamond'] text-2xl italic text-white leading-snug">
                  "Their meeting makes the land
                  <br />
                  <span className="text-amber-300">eternally sacred.</span>"
                </p>
              </div>
            </div>
          </Reveal>

          {/* Rivers list */}
          <div>
            <Reveal>
              <WipeReveal>
                <h2
                  className="font-['Cinzel'] font-bold text-stone-900 leading-tight mb-8"
                  style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}
                >
                  Three Rivers.
                  <br />
                  <span className="text-amber-700">One Sacred Land.</span>
                </h2>
              </WipeReveal>
            </Reveal>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {RIVERS.map((r) => (
                <motion.div
                  key={r.id}
                  variants={staggerItem}
                  className="py-6 border-b border-stone-200 last:border-0"
                >
                  <div className="flex items-baseline gap-4 mb-2 flex-wrap">
                    <span
                      className="font-['Cinzel'] font-bold text-stone-900 whitespace-nowrap"
                      style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)" }}
                    >
                      {r.name}
                    </span>
                    <span className="text-[10px] uppercase tracking-widest text-amber-700 font-semibold whitespace-nowrap">
                      {r.role}
                    </span>
                  </div>
                  <p className="text-stone-500 text-sm leading-relaxed">{r.desc}</p>
                </motion.div>
              ))}
            </motion.div>

            <Reveal delay={0.3}>
              <MagneticButton
                as="div"
                className="mt-8"
              >
                <Link
                  to="/rivers"
                  className="inline-flex items-center gap-2 text-[11px] uppercase tracking-widest text-amber-700 hover:text-amber-900 transition-colors font-semibold"
                >
                  Explore the Rivers
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    className="text-base"
                  >
                    →
                  </motion.span>
                </Link>
              </MagneticButton>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────
   MAIN HOME PAGE
─────────────────────────────────────── */
export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(heroScroll, [0, 1], ["0%", "20%"]);
  const textY = useTransform(heroScroll, [0, 1], ["0%", "38%"]);
  const heroOpacity = useTransform(heroScroll, [0, 0.7], [1, 0]);

  const words = ["SPIRIT", "IN", "STONE"];

  return (
    <PageTransition>
      {/* ── HERO ── */}
      <section ref={heroRef} className="relative min-h-[100dvh] flex items-end overflow-hidden bg-stone-100">
        <motion.div
          className="absolute inset-0 z-0 overflow-hidden"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8, ease: "easeOut" }}
          style={{ y: useTransform(useScroll().scrollY, [0, 1000], [0, 300]) }}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            src="/videos/hero_bg.mp4"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-100 via-stone-100/45 to-transparent" />
        </motion.div>

        <motion.div
          className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-10 pb-16 md:pb-24"
          style={{ y: textY, opacity: heroOpacity }}
        >
          <div className="overflow-hidden mb-6">
            <motion.p
              className="text-[10px] uppercase tracking-[0.4em] text-amber-700 font-semibold"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Bhaskararajapuram · Tamil Nadu
            </motion.p>
          </div>

          {words.map((w, i) => (
            <div key={w} className="overflow-hidden">
              <motion.span
                className="block font-['Cinzel'] font-black leading-none tracking-tight text-stone-900"
                style={{ fontSize: "clamp(3.5rem, 9.5vw, 9.5rem)" }}
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.1, delay: 0.4 + i * 0.13, ease: [0.16, 1, 0.3, 1] }}
              >
                {w}
              </motion.span>
            </div>
          ))}

          <motion.p
            className="text-stone-600 text-lg md:text-xl font-light leading-relaxed max-w-md mt-7"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.95 }}
          >
            A village where ancient wisdom breathes — through stone, river, and sacred flame.
          </motion.p>

          <motion.div
            className="mt-10 flex items-center gap-6 flex-wrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <MagneticButton>
              <Link
                to="/shrines"
                className="bg-amber-700 text-white text-[11px] uppercase tracking-widest px-7 py-3 rounded-full hover:bg-amber-800 transition-colors font-semibold"
              >
                Explore Temples
              </Link>
            </MagneticButton>
            <Link
              to="/village"
              className="text-[11px] uppercase tracking-widest text-stone-700 hover:text-amber-700 transition-colors font-semibold flex items-center gap-2"
            >
              Our Story
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
              >
                →
              </motion.span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <motion.div
            className="w-px h-12 bg-amber-600 origin-top"
            animate={{ scaleY: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          />
          <p className="text-[9px] uppercase tracking-[0.3em] text-stone-500">Scroll</p>
        </motion.div>
      </section>

      {/* ── VILLAGE INTRO ── */}
      <section id="village" className="bg-stone-50 py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <Reveal>
              <WipeReveal>
                <h2
                  className="font-['Cinzel'] font-bold text-stone-900 leading-tight mb-6"
                  style={{ fontSize: "clamp(2rem, 4.5vw, 3.75rem)" }}
                >
                  A Place Where
                  <br />
                  <em className="text-amber-700 not-italic">Divinity Dwells</em>
                </h2>
              </WipeReveal>
              <div className="space-y-4 text-stone-600 text-base font-light leading-relaxed">
                <p>
                  Bhaskararajapuram is a peaceful spiritual village near Mayiladuthurai, Tamil Nadu. Its name carries the legacy of the great saint Bhaskararaya — a scholar whose presence made this land permanently sacred.
                </p>
                <p>
                  Surrounded by four ancient temples and three sacred rivers, the village has been a center of Sanskrit learning, deep worship, and unbroken temple tradition for centuries.
                </p>
              </div>

              {/* Animated stats */}
              <div className="grid grid-cols-3 gap-5 mt-10 pt-8 border-t border-stone-200">
                {[
                  { target: 4, suffix: "", label: "Sacred Temples" },
                  { target: 3, suffix: "", label: "Holy Rivers" },
                  { target: 40, suffix: "+", label: "Sanskrit Works" },
                ].map((s) => (
                  <div key={s.label}>
                    <div
                      className="font-['Cinzel'] font-black text-amber-700 leading-none"
                      style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)" }}
                    >
                      <AnimatedCounter target={s.target} suffix={s.suffix} />
                    </div>
                    <div className="text-[10px] uppercase tracking-widest text-stone-500 mt-1">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>

              <MagneticButton className="mt-8">
                <Link
                  to="/village"
                  className="inline-flex items-center gap-2 text-[11px] uppercase tracking-widest text-amber-700 hover:text-amber-900 font-semibold transition-colors"
                >
                  Full Village Story
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
                  >
                    →
                  </motion.span>
                </Link>
              </MagneticButton>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="relative">
                <Float amplitude={6} duration={5}>
                  <div className="absolute -bottom-4 -right-4 w-full h-full rounded-2xl bg-amber-100" />
                  <Image3D
                    src="/images/village_aerial.jpg"
                    alt="Village"
                    className="relative rounded-2xl overflow-hidden shadow-xl"
                    style={{ height: "460px" }}
                  />
                </Float>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── FILL WORDS ── */}
      <FillWordsSection />

      {/* ── SAINT TEASER ── */}
      <section className="bg-stone-50 py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <Reveal delay={0.1}>
              <div className="relative">
                <Float amplitude={5} duration={6} delay={0.5}>
                  <div className="absolute -top-4 -left-4 w-full h-full rounded-2xl bg-amber-50" />
                  <Image3D
                    src="/images/saint_scholar.jpg"
                    alt="Shri Bhaskararaya"
                    className="relative rounded-2xl overflow-hidden shadow-xl"
                    style={{ height: "520px" }}
                  >
                    <div className="absolute bottom-6 left-6 right-6 bg-stone-50/90 backdrop-blur-sm rounded-xl p-4 border border-stone-200 pointer-events-none">
                      <p className="font-['Cormorant_Garamond'] text-lg italic text-stone-700 leading-snug">
                        "His teachings made this land permanently sacred."
                      </p>
                      <p className="text-[10px] uppercase tracking-widest text-amber-700 mt-1">
                        — Village legacy
                      </p>
                    </div>
                  </Image3D>
                </Float>
              </div>
            </Reveal>

            <Reveal>
              <WipeReveal>
                <h2
                  className="font-['Cinzel'] font-bold text-stone-900 leading-tight mb-3"
                  style={{ fontSize: "clamp(2rem, 4.5vw, 3.75rem)" }}
                >
                  Shri Bhaskararaya
                </h2>
              </WipeReveal>
              <p className="text-amber-700 text-sm uppercase tracking-widest font-semibold mb-6">
                The Great Saint & Scholar
              </p>
              <div className="space-y-4 text-stone-600 text-base font-light leading-relaxed">
                <p>
                  Born in Hyderabad, mastered the Vedas in Kashi. Bhaskararaya became India's foremost scholar of Srividya — the sacred science of Goddess Lalita worship.
                </p>
                <p>
                  He authored more than 40 Sanskrit works that remain authoritative texts to this day. His presence transformed Bhaskararajapuram into an eternal center of divine knowledge.
                </p>
              </div>
              <MagneticButton className="mt-8">
                <Link
                  to="/saint"
                  className="inline-flex items-center gap-2 text-[11px] uppercase tracking-widest text-amber-700 hover:text-amber-900 font-semibold transition-colors"
                >
                  The Saint's Full Story →
                </Link>
              </MagneticButton>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── TEMPLES HORIZONTAL TRACK ── */}
      <ShrinesTrack />

      {/* ── RIVERS PREVIEW ── */}
      <RiversPreview />

      {/* ── CLOSING QUOTE ── */}
      <section className="bg-stone-900 py-28 md:py-44 px-6 md:px-10 overflow-hidden relative">
        {/* Decorative glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div
            className="w-96 h-96 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(180,83,9,0.15) 0%, transparent 70%)" }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <Reveal>
            <Float amplitude={4} duration={5}>
              <p
                className="font-['Cormorant_Garamond'] italic text-stone-100 leading-snug mb-8"
                style={{ fontSize: "clamp(1.6rem, 4.5vw, 3.5rem)" }}
              >
                "For devotees, Bhaskararajapuram is a place of peace, prayer, and wisdom."
              </p>
            </Float>
            <motion.div
              className="w-10 h-px bg-amber-600 mx-auto mb-5"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            />
            <p className="text-[10px] uppercase tracking-widest text-amber-700">
              Village Legacy · Tamil Nadu
            </p>
          </Reveal>
        </div>
      </section>
    </PageTransition>
  );
}
