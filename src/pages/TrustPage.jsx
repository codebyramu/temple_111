import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Reveal, WipeReveal, HoverRow, PageTransition, Image3D, staggerContainer, staggerItem } from "../components/shared";

export default function TrustPage() {
  return (
    <PageTransition>
      {/* HERO */}
      <section className="relative min-h-[55dvh] md:min-h-[75dvh] flex items-center justify-center text-center overflow-hidden">
        <Image3D
          src="/images/village_aerial.jpg"
          alt="Srinivas Rama Trust"
          className="absolute inset-0 w-full h-full object-cover"
          imgClassName="w-full h-full object-cover grayscale-[30%] sepia-[20%]"
          style={{ width: "100%", height: "100%" }}
          hoverScale={1}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/95 via-stone-950/60 to-stone-950/20" />
        <div className="relative z-10 max-w-5xl mx-auto w-full px-5 md:px-10 flex flex-col items-center">
          <div className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest text-stone-400 mb-6">
            <Link to="/" className="hover:text-amber-400 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-amber-400">Srinivas Rama Trust</span>
          </div>
          <SplitText
            className="font-['Philosopher'] font-black text-white leading-tight mb-4"
            style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}
          >
            Srinivas Rama Trust
          </SplitText>
          <p className="font-['Cormorant_Garamond'] italic text-amber-300 text-xl md:text-2xl max-w-2xl">
            Preserving the spiritual and cultural heritage of Bhaskararajapuram for future generations.
          </p>
        </div>
      </section>

      {/* OVERVIEW */}
      <section className="bg-gradient-to-b from-[#1c1917] to-[#161412] py-12 md:py-32">
        <div className="max-w-4xl mx-auto px-5 md:px-10">
          <Reveal>
            <SplitText
              className="font-['Philosopher'] font-bold text-stone-100 leading-tight mb-10"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              About the Trust
            </SplitText>
          </Reveal>
          <div className="space-y-6 text-stone-400 text-base md:text-lg font-light leading-relaxed">
            <Reveal delay={0.1}>
              <p>
                The <strong>Srinivas Rama Trust</strong> is a corpus put together by the residents and well-wishers of Bhaskararajapuram to carry out the maintenance, preservation, and due celebrations of the village's sacred landmarks throughout the year.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p>
                Our mission is to safeguard the spiritual legacy of Shri Bhaskararaya, support the four ancient shrines, and maintain the sanctity of the Divine Street. The Trust invites devotees, visitors, and well-wishers to actively contribute to the growth and vibrant functioning of these temple activities.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* OPPORTUNITIES */}
      <section className="bg-[#12100e] py-12 md:py-32">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <Reveal>
            <SplitText
              className="font-['Philosopher'] font-bold text-stone-100 mb-12 text-center"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              Opportunities to Serve
            </SplitText>
          </Reveal>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {[
              { title: "Volunteering", desc: "Assist in daily temple activities, flower decoration, organizing festivals, and managing crowds during events." },
              { title: "Donations & Sponsorships", desc: "Financial contributions support temple maintenance, renovation projects, festival celebrations, and charity work." },
              { title: "Internships & Apprenticeships", desc: "For youth interested in temple administration, event planning, or traditional arts like Vedic chanting." },
              { title: "Cultural & Educational Programs", desc: "Participate in or help organize workshops, lecture series, and spiritual retreats hosted by the trust." },
              { title: "Pilgrimage Assistance", desc: "Volunteer as guides or support staff for pilgrims visiting the temple complex and memorials." },
              { title: "Environmental Initiatives", desc: "Join efforts for cleaning temple surroundings, planting sacred trees, and promoting eco-friendly practices." },
            ].map((o, i) => (
              <motion.div key={o.title} variants={staggerItem} className="group relative bg-[#292524]/60 backdrop-blur-md rounded-2xl p-8 border border-stone-700/50/50 hover:bg-[#292524] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300">
                <div className="w-10 h-1 bg-amber-500 mb-6 rounded-full origin-left group-hover:scale-x-150 transition-transform duration-500" />
                <h3 className="font-['Philosopher'] font-bold text-stone-100 text-lg mb-3">{o.title}</h3>
                <p className="text-stone-400 text-sm leading-relaxed">{o.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* GET IN TOUCH */}
      <section className="bg-gradient-to-b from-[#1c1917] to-[#161412] py-12 md:py-32">
        <div className="max-w-4xl mx-auto px-5 md:px-10 text-center">
          <Reveal>
            <SplitText className="font-['Philosopher'] font-bold text-stone-100 leading-tight mb-8"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>
              Contact & Donations
            </SplitText>
            <p className="text-stone-400 text-base md:text-lg font-light leading-relaxed mb-8">
              Donations can be made for temple upkeep, festival sponsorship, educational scholarships, and medical aid. For more details on volunteering or making a contribution, please get in touch with the Trust office.
            </p>
            <div className="inline-flex flex-col items-center gap-4 bg-[#292524] p-8 rounded-2xl border border-stone-700/50 shadow-sm">
              <p className="font-['Philosopher'] font-bold text-stone-100 text-xl">Srinivas Rama Trust</p>
              <p className="text-stone-500 text-sm uppercase tracking-widest">Bhaskararajapuram, Tamil Nadu</p>
              <div className="w-16 h-px bg-stone-300 my-2" />
              <p className="text-stone-400 text-sm">To volunteer or donate, please email us or visit the temple office.</p>
              <a href="mailto:contact@bhaskararajapuram.com" className="mt-4 bg-gradient-to-r from-amber-600 to-amber-800 text-stone-50 border border-amber-500/30 shadow-[0_0_20px_rgba(180,83,9,0.3)] hover:shadow-[0_0_30px_rgba(180,83,9,0.6)] text-[11px] uppercase tracking-widest px-8 py-3 rounded-full hover:bg-amber-600 transition-colors font-semibold">
                Email the Trust
              </a>
            </div>
          </Reveal>
        </div>
      </section>
      {/* Massive Spacing */}
      <div className="h-32 md:h-56 bg-[#12100e]" />
    </PageTransition>
  );
}
