import { useEffect, useRef, useState } from "react";

/*
  Animasi muncul saat di-scroll (sekali saja per elemen).
  variant: "up" | "left" | "right" | "zoom" | "fade"
  delay  : jeda dalam ms (untuk efek berurutan)
*/
const HIDDEN_TRANSFORM = {
  up: "translate3d(0, 28px, 0)",
  left: "translate3d(-40px, 0, 0)",
  right: "translate3d(40px, 0, 0)",
  zoom: "scale(0.94)",
  fade: "none",
};

function Reveal({
  variant = "up",
  delay = 0,
  duration = 1300,
  className = "",
  children,
}) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduce || !("IntersectionObserver" in window)) {
      setShown(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // transform dikembalikan ke "none" setelah muncul, supaya elemen fixed
  // di dalamnya (misalnya modal) tidak ikut terpengaruh
  const style = {
    opacity: shown ? 1 : 0,
    transform: shown ? "none" : HIDDEN_TRANSFORM[variant],
    transition: `opacity ${duration}ms ease-out ${delay}ms, transform ${duration}ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
  };

  return (
    <div ref={ref} style={style} className={className}>
      {children}
    </div>
  );
}

export default Reveal;
