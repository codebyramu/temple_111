import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Reveal, WipeReveal, PageTransition, Image3D, staggerContainer, staggerItem } from "../components/shared";

export default function TrustPage() {
  return (
    <PageTransition>
      {/* HERO */}
      <section className="relative min-h-[75dvh] flex items-end overflow-hidden">
        <Image3D
          src="/images/village_aerial.jpg"
          alt="Srinivas Rama Trust"
          className="absolute inset-0 w-full h-full object-cover"
          imgClassName="w-full h-full object-cover grayscale-[30%] sepia-[20%]"
          style={{ width: "100%", height: "100%" }}
          hoverScale={1}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/95 via-stone-950/60 to-stone-950/20" />
        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-10 pb-16 md:pb-24">
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-stone-400 mb-6">
            <Link to="/" className="hover:text-amber-400 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-amber-400">Srinivas Rama Trust</span>
          </div>
          <WipeReveal>
            <h1 className="font-['Cinzel'] font-black text-white leading-tight mb-4"
              style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}>
              Srinivas Rama Trust
            </h1>
          </WipeReveal>
          <p className="font-['Cormorant_Garamond'] italic text-amber-300 text-xl md:text-2xl max-w-2xl">
            Preserving the spiritual and cultural heritage of Bhaskararajapuram for future generations.
          </p>
        </div>
      </section>

      {/* OVERVIEW */}
      <section className="bg-stone-50 py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <Reveal>
            <h2 className="font-['Cinzel'] font-bold text-stone-900 leading-tight mb-8"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>
              About the Trust
            </h2>
          </Reveal>
          <div className="space-y-6 text-stone-600 text-base md:text-lg font-light leading-relaxed">
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
      <section className="bg-stone-100 py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <Reveal>
            <h2 className="font-['Cinzel'] font-bold text-stone-900 mb-10" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>
              Opportunities to Serve
            </h2>
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
              <motion.div key={o.title} variants={staggerItem} className="bg-white rounded-xl p-8 border border-stone-200 hover:shadow-md transition-shadow">
                <div className="w-8 h-px bg-amber-600 mb-4" />
                <h3 className="font-['Cinzel'] font-bold text-stone-900 text-lg mb-3">{o.title}</h3>
                <p className="text-stone-600 text-sm leading-relaxed">{o.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* GET IN TOUCH */}
      <section className="bg-stone-50 py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-6 md:px-10 text-center">
          <Reveal>
            <h2 className="font-['Cinzel'] font-bold text-stone-900 leading-tight mb-8"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>
              Contact & Donations
            </h2>
            <p className="text-stone-600 text-base md:text-lg font-light leading-relaxed mb-8">
              Donations can be made for temple upkeep, festival sponsorship, educational scholarships, and medical aid. For more details on volunteering or making a contribution, please get in touch with the Trust office.
            </p>
            <div className="inline-flex flex-col items-center gap-4 bg-white p-8 rounded-2xl border border-stone-200 shadow-sm">
              <p className="font-['Cinzel'] font-bold text-stone-900 text-xl">Srinivas Rama Trust</p>
              <p className="text-stone-500 text-sm uppercase tracking-widest">Bhaskararajapuram, Tamil Nadu</p>
              <div className="w-16 h-px bg-stone-300 my-2" />
              <p className="text-stone-600 text-sm">To volunteer or donate, please email us or visit the temple office.</p>
              <a href="mailto:contact@bhaskararajapuram.com" className="mt-4 bg-amber-700 text-white text-[11px] uppercase tracking-widest px-8 py-3 rounded-full hover:bg-amber-600 transition-colors font-semibold">
                Email the Trust
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </PageTransition>
  );
}
