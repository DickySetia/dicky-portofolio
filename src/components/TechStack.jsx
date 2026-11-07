import { useEffect, useRef, useState } from "react";

const techStacks = [
  {
    name: "HTML5",
    logo: "html5/html5-original.svg",
  },
  {
    name: "CSS3",
    logo: "css3/css3-original.svg",
  },
  {
    name: "JavaScript",
    logo: "javascript/javascript-original.svg",
  },
  {
    name: "PHP",
    logo: "php/php-original.svg",
  },
  {
    name: "Laravel",
    logo: "laravel/laravel-original.svg",
  },
  {
    name: "MySQL",
    logo: "mysql/mysql-original.svg",
  },
  {
    name: "Bootstrap",
    logo: "bootstrap/bootstrap-original.svg",
  },
  {
    name: "Git",
    logo: "git/git-original.svg",
  },
  {
    name: "GitHub",
    logo: "github/github-original.svg",
    invert: true, // logo hitam -> dibuat putih supaya terlihat di latar gelap
  },
  {
    name: "Tailwind CSS",
    logo: "tailwindcss/tailwindcss-original.svg",
  },
  {
    name: "React",
    logo: "react/react-original.svg",
  },
];

/* ------------------------------------------------------------------ */
/*  PENGATURAN ANIMASI                                                 */
/* ------------------------------------------------------------------ */
const DURATION = 1100; // lama tiap kotak terbang ke tempatnya (ms)
const STAGGER = 110; // jeda antar kotak (ms)
const FAR = [180, 280]; // jarak awal terbang (px): [minimum, maksimum]

const rand = (min, max) => min + Math.random() * (max - min);
const sign = () => (Math.random() < 0.5 ? -1 : 1);

// arah awal bergantian: atas, kiri, kanan, bawah
function scatterFor(index) {
  const dir = ["top", "left", "right", "bottom"][index % 4];
  const far = rand(FAR[0], FAR[1]);
  const side = sign() * rand(30, 110);
  const rot = sign() * rand(12, 40);

  if (dir === "top") return { x: side, y: -far, rot };
  if (dir === "bottom") return { x: side, y: far, rot };
  if (dir === "left") return { x: -far, y: side, rot };
  return { x: far, y: side, rot };
}

function TechStack() {
  const gridRef = useRef(null);
  const [shown, setShown] = useState(false);

  // posisi awal acak, dibuat sekali saja
  const [scatter] = useState(() => techStacks.map((_, i) => scatterFor(i)));

  useEffect(() => {
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
      { threshold: 0.15 },
    );
    observer.observe(gridRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    // overflow-x-clip: kotak yang datang dari samping tidak membuat halaman bisa digeser
    <div
      ref={gridRef}
      className="mt-14 grid grid-cols-2 gap-5 overflow-x-clip sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
    >
      {techStacks.map((tech, index) => {
        const from = scatter[index];

        const style = {
          opacity: shown ? 1 : 0,
          transform: shown
            ? "none"
            : `translate3d(${from.x}px, ${from.y}px, 0) rotate(${from.rot}deg) scale(0.55)`,
          transition: `opacity ${DURATION * 0.6}ms ease-out ${index * STAGGER}ms, transform ${DURATION}ms cubic-bezier(0.22, 1, 0.36, 1) ${index * STAGGER}ms`,
        };

        return (
          <div key={tech.name} style={style}>
            <div className="flex h-full flex-col items-center justify-center gap-4 rounded-xl border border-gray-800 bg-[#111827]/60 p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-500/60">
              <img
                src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${tech.logo}`}
                alt={tech.name}
                className={`h-12 w-12 object-contain ${
                  tech.invert ? "brightness-0 invert" : ""
                }`}
                loading="lazy"
              />

              <span className="text-sm font-medium text-gray-300">
                {tech.name}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default TechStack;
