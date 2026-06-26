import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useInView,
  animate,
} from "framer-motion";

/* ─────────────────────────────────────────
   MOBILE DETECTOR HOOK
───────────────────────────────────────── */
function useIsTouch() {
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    setIsTouch(window.matchMedia("(hover: none) and (pointer: coarse)").matches);
  }, []);
  return isTouch;
}

/* ─────────────────────────────────────────
   SCROLL TO TOP (noop — handled in PageTransition)
───────────────────────────────────────── */
export function ScrollToTop() { return null; }

/* ─────────────────────────────────────────
   SCROLL PROGRESS BAR
───────────────────────────────────────── */
export function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const el = document.documentElement;
      setProgress((el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100);
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 z-[9998] h-[2px] pointer-events-none bg-transparent">
      <motion.div
        className="h-full bg-amber-600 origin-left"
        style={{ scaleX: progress / 100 }}
        transition={{ duration: 0 }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────
   MAGNETIC CURSOR (desktop only)
───────────────────────────────────────── */
export function MagneticCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const scale = useMotionValue(1);
  const sx = useSpring(x, { stiffness: 220, damping: 26 });
  const sy = useSpring(y, { stiffness: 220, damping: 26 });
  const ss = useSpring(scale, { stiffness: 200, damping: 20 });
  const [isTouch, setIsTouch] = useState(true);

  useEffect(() => {
    const q = window.matchMedia("(hover: none) and (pointer: coarse)");
    setIsTouch(q.matches);
    if (q.matches) return;

    const move = (e) => { x.set(e.clientX - 10); y.set(e.clientY - 10); };
    const grow = () => scale.set(2.5);
    const shrink = () => scale.set(1);

    window.addEventListener("mousemove", move);
    document.querySelectorAll("a, button, [data-cursor-grow]").forEach((el) => {
      el.addEventListener("mouseenter", grow);
      el.addEventListener("mouseleave", shrink);
    });
    return () => {
      window.removeEventListener("mousemove", move);
      document.querySelectorAll("a, button, [data-cursor-grow]").forEach((el) => {
        el.removeEventListener("mouseenter", grow);
        el.removeEventListener("mouseleave", shrink);
      });
    };
  }, [x, y, scale]);

  if (isTouch) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-5 h-5 rounded-full border border-amber-600 pointer-events-none z-[9999] mix-blend-multiply hidden md:block"
      style={{ translateX: sx, translateY: sy, scale: ss }}
    />
  );
}

/* ─────────────────────────────────────────
   PAGE TRANSITION WRAPPER
───────────────────────────────────────── */
export function PageTransition({ children }) {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   FADE-UP REVEAL — NO blur on mobile
───────────────────────────────────────── */
export function Reveal({ children, delay = 0, className = "" }) {
  const isTouch = useIsTouch();
  return (
    <motion.div
      className={className}
      initial={isTouch
        ? { opacity: 0, y: 20 }
        : { opacity: 0, y: 30, filter: "blur(8px)" }
      }
      whileInView={isTouch
        ? { opacity: 1, y: 0 }
        : { opacity: 1, y: 0, filter: "blur(0px)" }
      }
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: isTouch ? 0.6 : 1.0, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   WIPE REVEAL — simplified on mobile
───────────────────────────────────────── */
export function WipeReveal({ children, delay = 0, className = "" }) {
  const isTouch = useIsTouch();
  return (
    <motion.div
      className={className}
      initial={isTouch
        ? { opacity: 0, y: 16 }
        : { clipPath: "inset(0 100% 0 0)", opacity: 0, x: -10 }
      }
      whileInView={isTouch
        ? { opacity: 1, y: 0 }
        : { clipPath: "inset(0 0% 0 0)", opacity: 1, x: 0 }
      }
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: isTouch ? 0.5 : 1.1, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   SPLIT TEXT — word-by-word on mobile, char on desktop
───────────────────────────────────────── */
export function SplitText({ children, delay = 0, className = "", style = {} }) {
  const isTouch = useIsTouch();
  if (typeof children !== "string") return <div className={className} style={style}>{children}</div>;

  const words = children.split(" ");

  // Mobile: simple fade-up per word (much lighter)
  if (isTouch) {
    return (
      <motion.div
        className={className}
        style={{ display: "flex", flexWrap: "wrap", gap: "0 0.3em", ...style }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.07, delayChildren: delay } },
        }}
      >
        {words.map((word, i) => (
          <motion.span
            key={i}
            style={{ display: "inline-block", whiteSpace: "nowrap" }}
            variants={{
              hidden: { opacity: 0, y: 14 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
            }}
          >
            {word}
          </motion.span>
        ))}
      </motion.div>
    );
  }

  // Desktop: character-by-character
  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.035, delayChildren: delay } },
  };
  const child = {
    visible: { opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)", transition: { type: "spring", damping: 14, stiffness: 120 } },
    hidden:  { opacity: 0, y: 18, rotateX: -70, filter: "blur(6px)" },
  };

  return (
    <motion.div
      style={{ display: "flex", flexWrap: "wrap", perspective: "800px", gap: "0 0.25em", ...style }}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className={className}
    >
      {words.map((word, idx) => (
        <span key={idx} style={{ display: "inline-block", whiteSpace: "nowrap" }}>
          {Array.from(word).map((letter, i) => (
            <motion.span key={i} variants={child} style={{ display: "inline-block" }}>
              {letter}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   IMAGE 3D — disabled on mobile
───────────────────────────────────────── */
export function Image3D({ src, alt, className = "", imgClassName = "", style = {}, children, hoverScale = 1.02 }) {
  const ref = useRef(null);
  const isTouch = useIsTouch();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-1, 1], [8, -8]), { stiffness: 260, damping: 28 });
  const rotateY = useSpring(useTransform(mx, [-1, 1], [-8, 8]), { stiffness: 260, damping: 28 });

  const glareBackground = useTransform([mx, my], ([x, y]) => {
    const px = ((x + 0.5) * 100).toFixed(1);
    const py = ((y + 0.5) * 100).toFixed(1);
    return `radial-gradient(circle at ${px}% ${py}%, rgba(255,255,255,0.12) 0%, transparent 60%)`;
  });

  function handleMouseMove(e) {
    if (isTouch || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mx.set(((e.clientX - rect.left) / rect.width - 0.5) * 2);
    my.set(((e.clientY - rect.top) / rect.height - 0.5) * 2);
  }
  function handleMouseLeave() { mx.set(0); my.set(0); }

  // Mobile: plain img, no 3D overhead
  if (isTouch) {
    const isAbsolute = className.includes('absolute');
    return (
      <div className={`${isAbsolute ? '' : 'relative'} ${className}`} style={style}>
        <img src={src} alt={alt} className={`w-full h-full object-cover ${imgClassName}`} />
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 900, ...style }}
      className={`${className.includes('absolute') ? '' : 'relative'} ${className}`}
      whileHover={{ scale: hoverScale }}
      transition={{ scale: { duration: 0.3 } }}
    >
      <img src={src} alt={alt} className={`w-full h-full object-cover ${imgClassName}`} />
      <motion.div
        aria-hidden
        className="absolute inset-0 rounded-inherit pointer-events-none z-10 opacity-0 hover:opacity-100 transition-opacity duration-300"
        style={{ background: glareBackground }}
      />
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   ANIMATED COUNTER
───────────────────────────────────────── */
export function AnimatedCounter({ target, suffix = "", prefix = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const ctrl = animate(0, target, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.floor(v)),
    });
    return ctrl.stop;
  }, [isInView, target]);

  return (
    <span ref={ref} className="inline-block tabular-nums">
      {prefix}
      <motion.span
        key={display}
        initial={{ y: 6, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.1 }}
      >
        {display}
      </motion.span>
      {suffix}
    </span>
  );
}

/* ─────────────────────────────────────────
   MAGNETIC BUTTON
───────────────────────────────────────── */
export function MagneticButton({ children, className = "" }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 20 });
  const sy = useSpring(y, { stiffness: 300, damping: 20 });
  const isTouch = useIsTouch();

  function handleMouseMove(e) {
    if (isTouch || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.25);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.25);
  }
  function handleMouseLeave() { x.set(0); y.set(0); }

  return (
    <motion.div
      ref={ref}
      className={`inline-block ${className}`}
      style={isTouch ? {} : { x: sx, y: sy }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   FLOAT — disabled on mobile
───────────────────────────────────────── */
export function Float({ children, amplitude = 8, duration = 4, delay = 0 }) {
  const isTouch = useIsTouch();
  if (isTouch) return <div>{children}</div>;
  return (
    <motion.div
      animate={{ y: [-amplitude / 2, amplitude / 2, -amplitude / 2] }}
      transition={{ repeat: Infinity, duration, ease: "easeInOut", delay }}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   STAGGER VARIANTS
───────────────────────────────────────── */
export const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};
export const staggerItem = {
  hidden: { opacity: 0, y: 22 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};
