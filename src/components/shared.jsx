import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useInView,
  animate,
} from "framer-motion";

/* ─────────────────────────────────────────
   SCROLL TO TOP on route change
───────────────────────────────────────── */
/* ─────────────────────────────────────────
   SCROLL TO TOP on route change
───────────────────────────────────────── */
export function ScrollToTop() {
  return null;
}

/* ─────────────────────────────────────────
   SCROLL PROGRESS BAR (top of viewport)
───────────────────────────────────────── */
export function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop / (el.scrollHeight - el.clientHeight);
      setProgress(scrolled * 100);
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 z-[9998] h-[2px] bg-stone-200 pointer-events-none">
      <motion.div
        className="h-full bg-amber-600 origin-left"
        style={{ scaleX: progress / 100 }}
        transition={{ duration: 0 }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────
   MAGNETIC CURSOR
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
    const touchQuery = window.matchMedia("(hover: none) and (pointer: coarse)");
    setIsTouch(touchQuery.matches);
    if (touchQuery.matches) return;

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
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   FADE-UP REVEAL on scroll
───────────────────────────────────────── */
export function Reveal({ children, delay = 0, className = "" }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   CLIP-PATH WIPE REVEAL (left → right)
───────────────────────────────────────── */
export function WipeReveal({ children, delay = 0, className = "" }) {
  return (
    <motion.div
      className={className}
      initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0, filter: "blur(10px)", x: -20 }}
      whileInView={{ clipPath: "inset(0 0% 0 0)", opacity: 1, filter: "blur(0px)", x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1.4, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   SPLIT TEXT REVEAL (Character by Character)
───────────────────────────────────────── */
export function SplitText({ children, delay = 0, className = "" }) {
  if (typeof children !== "string") return <div className={className}>{children}</div>;
  
  const words = children.split(" ");
  
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.04, delayChildren: delay * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      filter: "blur(0px)",
      transition: { type: "spring", damping: 12, stiffness: 100 },
    },
    hidden: {
      opacity: 0,
      y: 20,
      rotateX: -90,
      filter: "blur(10px)",
    },
  };

  return (
    <motion.div
      style={{ display: "flex", flexWrap: "wrap", perspective: "1000px" }}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className={className}
    >
      {words.map((word, idx) => (
        <span key={idx} style={{ display: "inline-block", marginRight: "0.25em", whiteSpace: "nowrap" }}>
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
   IMAGE 3D — tilts toward cursor like a card
───────────────────────────────────────── */
export function Image3D({ src, alt, className = "", imgClassName = "", style = {}, children, hoverScale = 1.02 }) {
  const ref = useRef(null);
  const [isTouch, setIsTouch] = useState(true);

  useEffect(() => {
    setIsTouch(window.matchMedia("(hover: none) and (pointer: coarse)").matches);
  }, []);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-1, 1], [10, -10]), { stiffness: 260, damping: 28 });
  const rotateY = useSpring(useTransform(mx, [-1, 1], [-10, 10]), { stiffness: 260, damping: 28 });
  
  const glareBackground = useTransform([mx, my], ([x, y]) => {
    const px = ((x + 0.5) * 100).toFixed(1);
    const py = ((y + 0.5) * 100).toFixed(1);
    return `radial-gradient(circle at ${px}% ${py}%, rgba(255,255,255,0.15) 0%, transparent 60%)`;
  });

  function handleMouseMove(e) {
    if (isTouch || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    mx.set(nx);
    my.set(ny);
  }

  function handleMouseLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: isTouch ? 0 : rotateX,
        rotateY: isTouch ? 0 : rotateY,
        transformPerspective: 900,
        ...style
      }}
      className={`relative ${className}`}
      whileHover={isTouch ? {} : { scale: hoverScale }}
      transition={{ scale: { duration: 0.3 } }}
    >
      <img src={src} alt={alt} className={`w-full h-full object-cover ${imgClassName}`} />
      {!isTouch && (
        <motion.div
          aria-hidden
          className="absolute inset-0 rounded-inherit pointer-events-none z-10 opacity-0 hover:opacity-100 transition-opacity duration-300"
          style={{ background: glareBackground }}
        />
      )}
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   ANIMATED COUNTER — 0 → number drift up
───────────────────────────────────────── */
export function AnimatedCounter({ target, suffix = "", prefix = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const ctrl = animate(0, target, {
      duration: 2,
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
        initial={{ y: 8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.12 }}
      >
        {display}
      </motion.span>
      {suffix}
    </span>
  );
}

/* ─────────────────────────────────────────
   MAGNETIC BUTTON — follows cursor slightly
───────────────────────────────────────── */
export function MagneticButton({ children, className = "", onClick, to, as: Tag = "button" }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 25 });
  const sy = useSpring(y, { stiffness: 300, damping: 25 });

  function handleMove(e) {
    const rect = ref.current.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    x.set(dx * 0.25);
    y.set(dy * 0.25);
  }

  function handleLeave() { x.set(0); y.set(0); }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: sx, y: sy }}
      className="inline-block"
      data-cursor-grow
    >
      <Tag onClick={onClick} className={className}>{children}</Tag>
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   FLOATING ELEMENT — infinite subtle float
───────────────────────────────────────── */
export function Float({ children, amplitude = 8, duration = 4, delay = 0 }) {
  return (
    <motion.div
      animate={{ y: [0, -amplitude, 0] }}
      transition={{ repeat: Infinity, duration, delay, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   STAGGER CHILDREN wrapper
───────────────────────────────────────── */
export const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
};

/* ─────────────────────────────────────────
   SECTION DIVIDER dot
───────────────────────────────────────── */
export function Divider() {
  return (
    <div className="flex items-center gap-4 my-2">
      <div className="flex-1 h-px bg-stone-200" />
      <div className="w-1.5 h-1.5 rounded-full bg-amber-600" />
      <div className="flex-1 h-px bg-stone-200" />
    </div>
  );
}
