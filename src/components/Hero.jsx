import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ArrowUpRight, UserRound } from "lucide-react";
import { SocialLinks } from "./socials";

/* ------------------------------------------------------------------ */
/*  PENGATURAN FISIKA — silakan diutak-atik sesuai selera              */
/* ------------------------------------------------------------------ */
const ANCHOR_X = 160; // posisi x ujung atas tali (di dalam rig)
const TOP_EXTRA = 12; // tali menjulur sedikit di atas tepi atas halaman
const DESKTOP_PIVOT_Y = 250; // desktop: titik gantung kartu diukur dari atas halaman (besar = kartu turun, tali lebih panjang)
/* --- khusus HP (tidak mempengaruhi desktop) --- */
const MOBILE_ANCHOR_Y = 70; // titik awal tali diukur dari atas halaman (70 = tersembunyi di balik menu bar)
const MOBILE_ROPE_LEN = 150; // panjang tali di HP (besar = tali lebih panjang, kartu lebih turun)
const CARD_W = 230; // lebar kartu
const LANYARD_TEXT = "DS · PORTFOLIO"; // tulisan di tali

const GRAVITY = 2200; // makin besar = kartu terasa makin berat
const ROPE_K = 140; // kekakuan tali (kecil = lebih melar seperti karet)
const ROPE_DAMP = 5; // redaman getaran tali
const AIR_DAMP = 0.55; // redaman udara (besar = lebih cepat berhenti)
const ANGLE_K = 70; // seberapa cepat kartu mengikuti arah tali
const ANGLE_DAMP = 7; // redaman putaran kartu (kecil = lebih goyang)
const PULL_K = 420; // kekuatan tarikan kursor
const PULL_DAMP = 38; // redaman saat kartu ditarik
const MAX_STRETCH = 2.1; // tali maksimal melar sampai 2.1x panjang awal
const DROP_GRAVITY = 1200; // percepatan jatuh di awal
const STEP = 1 / 240; // langkah simulasi (detik)

/* kalimat yang diketik bergantian (berputar kembali ke kalimat pertama) */
const TYPED_PHRASES = [
  "Fresh Graduate..",
  "Happy Coding..",
  "Turning Ideas into Code..",
];
const TYPE_SPEED = 95; // ms per huruf saat mengetik
const DELETE_SPEED = 50; // ms per huruf saat menghapus
const HOLD_TIME = 1800; // jeda setelah kalimat selesai diketik
const GAP_TIME = 450; // jeda setelah kalimat terhapus habis

function useTypewriter(phrases) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const full = phrases[index];
    let t;

    if (!deleting && text === full) {
      t = setTimeout(() => setDeleting(true), HOLD_TIME);
    } else if (deleting && text === "") {
      t = setTimeout(() => {
        setDeleting(false);
        setIndex((i) => (i + 1) % phrases.length);
      }, GAP_TIME);
    } else {
      t = setTimeout(
        () =>
          setText(
            deleting
              ? full.slice(0, text.length - 1)
              : full.slice(0, text.length + 1),
          ),
        deleting ? DELETE_SPEED : TYPE_SPEED,
      );
    }
    return () => clearTimeout(t);
  }, [text, deleting, index, phrases]);

  return text;
}

const DEG = Math.PI / 180;
const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

function Hero() {
  const [hasPhoto, setHasPhoto] = useState(true);
  const [dragging, setDragging] = useState(false);
  const typed = useTypewriter(TYPED_PHRASES);

  const wrapRef = useRef(null);
  const rigRef = useRef(null);
  const svgRef = useRef(null);
  const cardRef = useRef(null);

  const sim = useRef({
    x: ANCHOR_X,
    y: 0,
    vx: 0,
    vy: 0,
    phi: 0, // sudut kartu (derajat)
    w: 0, // kecepatan sudut
    off: 0, // offset jatuh seluruh tali
    offV: 0,
    bow: 0, // lengkung tali
    anchorY: -200, // dihitung otomatis dari posisi rig di halaman
    ropeLen: 370,
    dropFrom: -900,
    drag: null,
    running: false,
    wake: () => {},
  });

  useLayoutEffect(() => {
    const s = sim.current;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // ujung atas tali selalu menempel di tepi atas halaman
    const measure = () => {
      const docTop =
        rigRef.current.getBoundingClientRect().top + window.scrollY;
      const desktop = window.matchMedia("(min-width: 768px)").matches;
      if (desktop) {
        // tali menempel di tepi atas halaman
        s.anchorY = -(docTop + TOP_EXTRA);
        s.ropeLen = DESKTOP_PIVOT_Y + TOP_EXTRA;
        s.dropFrom = -(docTop + 720);
      } else {
        // HP: tali keluar dari balik menu bar
        s.anchorY = MOBILE_ANCHOR_Y - docTop;
        s.ropeLen = MOBILE_ROPE_LEN;
        s.dropFrom = -(MOBILE_ROPE_LEN + 60);
      }

      // beri ruang cukup di HP supaya kartu tidak menimpa teks di bawahnya
      if (wrapRef.current) {
        const cardH = cardRef.current ? cardRef.current.offsetHeight : 400;
        wrapRef.current.style.minHeight = desktop
          ? ""
          : `${s.anchorY + s.ropeLen + cardH + 40}px`;
      }
    };
    measure();

    // keadaan awal
    s.off = reduce ? 0 : s.dropFrom;
    s.offV = 0;
    s.x = ANCHOR_X;
    s.y = s.anchorY + s.off + s.ropeLen + 20;
    s.vx = reduce ? 0 : 260; // dorongan ke samping supaya berayun
    s.vy = 0;
    s.phi = 0;
    s.w = 0;
    s.bow = 0;
    s.drag = null;

    const strapEls = Array.from(
      svgRef.current.querySelectorAll("[data-strap]"),
    );
    const textEl = svgRef.current.querySelector("[data-text]");

    /* ---------------- satu langkah simulasi ---------------- */
    const step = (dt) => {
      // 1. seluruh tali jatuh dari atas, lalu "berhenti mendadak"
      if (s.off < 0) {
        s.offV += DROP_GRAVITY * dt;
        s.off += s.offV * dt;
        if (s.off >= 0) {
          s.off = 0;
          s.offV = 0;
        }
      }

      const ax = ANCHOR_X;
      const ay = s.anchorY + s.off;

      // 2. gaya tali elastis
      let dx = s.x - ax;
      let dy = s.y - ay;
      let d = Math.hypot(dx, dy) || 0.0001;
      let nx = dx / d;
      let ny = dy / d;

      let fx = 0;
      let fy = GRAVITY;

      const stretch = d - s.ropeLen;
      if (stretch > 0) {
        const relV = s.vx * nx + (s.vy - s.offV) * ny;
        const force = Math.max(
          0,
          ROPE_K * stretch * (1 + (2 * stretch) / s.ropeLen) + ROPE_DAMP * relV,
        );
        fx -= nx * force;
        fy -= ny * force;
      }

      // 3. tarikan kursor (menarik titik yang dipegang di kartu)
      if (s.drag) {
        const c = Math.cos(s.phi * DEG);
        const sn = Math.sin(s.phi * DEG);
        const gx = s.x + c * s.drag.ox - sn * s.drag.oy;
        const gy = s.y + sn * s.drag.ox + c * s.drag.oy;
        fx += PULL_K * (s.drag.px - gx) - PULL_DAMP * s.vx;
        fy += PULL_K * (s.drag.py - gy) - PULL_DAMP * s.vy;
      }

      // 4. integrasi
      s.vx += fx * dt;
      s.vy += fy * dt;
      const air = Math.exp(-AIR_DAMP * dt);
      s.vx *= air;
      s.vy *= air;
      s.x += s.vx * dt;
      s.y += s.vy * dt;

      // 5. batas maksimum tali melar
      dx = s.x - ax;
      dy = s.y - ay;
      d = Math.hypot(dx, dy) || 0.0001;
      nx = dx / d;
      ny = dy / d;
      const maxD = s.ropeLen * MAX_STRETCH;
      if (d > maxD) {
        s.x = ax + nx * maxD;
        s.y = ay + ny * maxD;
        const vn = s.vx * nx + s.vy * ny;
        if (vn > 0) {
          s.vx -= nx * vn;
          s.vy -= ny * vn;
        }
        dx = s.x - ax;
        dy = s.y - ay;
      }

      // 6. kartu berputar mengikuti arah tali (dengan pegas = ada efek goyang)
      const theta = clamp(Math.atan2(dx, dy) / DEG, -85, 85);
      const alpha = ANGLE_K * (-theta - s.phi) - ANGLE_DAMP * s.w;
      s.w += alpha * dt;
      s.phi += s.w * dt;
    };

    /* ---------------- gambar ke DOM ---------------- */
    const render = () => {
      const ax = ANCHOR_X;
      const ay = s.anchorY + s.off;
      const ex = s.x;
      const ey = s.y;
      const dx = ex - ax;
      const dy = ey - ay;
      const d = Math.hypot(dx, dy) || 1;

      // tali sedikit melengkung berlawanan arah gerak (terasa seperti kain)
      const px = -dy / d;
      const py = dx / d;
      const vPerp = s.vx * px + s.vy * py;
      s.bow += (clamp(-vPerp * 0.03, -18, 18) - s.bow) * 0.18;
      const b = s.bow;

      const path = `M ${ax} ${ay} C ${ax + dx * 0.33 + px * b} ${
        ay + dy * 0.33 + py * b
      } ${ax + dx * 0.66 + px * b} ${ay + dy * 0.66 + py * b} ${ex} ${ey}`;

      // tali menipis saat melar seperti karet
      const stretch = Math.max(0, d - s.ropeLen);
      const scale = clamp(1 / (1 + (stretch / s.ropeLen) * 0.8), 0.5, 1);

      strapEls.forEach((el) => {
        el.setAttribute("d", path);
        const w = el.getAttribute("data-w");
        if (w) el.setAttribute("stroke-width", String(Number(w) * scale));
      });
      if (textEl) textEl.setAttribute("font-size", String(11 * scale));

      cardRef.current.style.transform = `translate3d(${ex}px, ${ey}px, 0) rotate(${s.phi}deg)`;

      // muncul perlahan saat mulai jatuh
      rigRef.current.style.opacity = String(
        clamp((s.off - s.dropFrom) / 160, 0, 1),
      );
    };

    /* ---------------- loop animasi ---------------- */
    let raf = 0;
    let last = performance.now();
    let acc = 0;
    let calm = 0;

    const frame = (now) => {
      acc += Math.min(0.05, (now - last) / 1000);
      last = now;
      while (acc >= STEP) {
        step(STEP);
        acc -= STEP;
      }
      render();

      const still =
        !s.drag &&
        s.off === 0 &&
        Math.abs(s.vx) < 1.5 &&
        Math.abs(s.vy) < 1.5 &&
        Math.abs(s.w) < 1;
      calm = still ? calm + 1 : 0;

      if (calm > 30) {
        s.running = false; // sudah diam, hemat baterai
      } else {
        raf = requestAnimationFrame(frame);
      }
    };

    s.wake = () => {
      if (s.running) return;
      s.running = true;
      last = performance.now();
      acc = 0;
      calm = 0;
      raf = requestAnimationFrame(frame);
    };

    const onResize = () => {
      measure();
      s.wake();
    };
    window.addEventListener("resize", onResize);

    render();
    s.wake();

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
      s.running = false;
    };
  }, []);

  /* ---------------- interaksi kursor / sentuh ---------------- */
  const toLocal = (event) => {
    const rect = rigRef.current.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  };

  const handlePointerDown = (event) => {
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);

    const s = sim.current;
    const p = toLocal(event);
    const c = Math.cos(s.phi * DEG);
    const sn = Math.sin(s.phi * DEG);
    const wx = p.x - s.x;
    const wy = p.y - s.y;

    // titik yang dipegang, disimpan dalam koordinat lokal kartu
    s.drag = {
      px: p.x,
      py: p.y,
      ox: c * wx + sn * wy,
      oy: -sn * wx + c * wy,
    };
    setDragging(true);
    s.wake();
  };

  const handlePointerMove = (event) => {
    const s = sim.current;
    if (!s.drag) return;
    const p = toLocal(event);
    s.drag.px = p.x;
    s.drag.py = p.y;
  };

  const handlePointerUp = () => {
    const s = sim.current;
    s.drag = null;
    setDragging(false);
    s.wake();
  };

  return (
    <section
      id="home"
      className="mx-auto grid min-h-screen max-w-7xl items-center gap-12 px-6 pb-16 pt-28 md:grid-cols-2 md:pt-32 md:px-12"
    >
      {/* Left Content */}
      <div className="relative z-10">
        <p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
          Software Engineer · Web Developer
        </p>

        <h1 className="max-w-2xl text-5xl font-bold leading-[1.15] tracking-tight md:text-7xl [font-family:'Space_Grotesk',sans-serif]">
          Building Digital
          <span className="block text-blue-400">Experiences.</span>
        </h1>

        {/* Teks mengetik otomatis */}
        <p
          className="mt-5 h-10 text-2xl font-medium text-slate-200 md:text-3xl [font-family:'Space_Grotesk',sans-serif]"
          aria-label={TYPED_PHRASES.join(", ")}
        >
          <span aria-hidden="true">{typed}</span>
          <span
            aria-hidden="true"
            className="ml-1 inline-block h-[1em] w-[2px] translate-y-[0.15em] animate-pulse bg-blue-400"
          />
        </p>

        <p className="mt-7 max-w-xl text-base leading-8 text-slate-400 md:text-lg">
          Hello, I'm Dicky Setiawan. I develop functional web applications and
          meaningful digital solutions using modern technologies.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="#work"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-500 px-6 py-3 font-semibold text-white transition hover:bg-blue-400"
          >
            Explore Projects <ArrowUpRight size={18} />
          </a>

          <a
            href="#contact"
            className="rounded-lg border border-slate-700 px-6 py-3 font-semibold text-slate-200 transition hover:border-blue-400 hover:text-blue-400"
          >
            Contact Me
          </a>
        </div>

        <SocialLinks className="mt-8" />
      </div>

      {/* Hanging ID Card */}
      <div
        ref={wrapRef}
        className="relative order-first flex items-start justify-center pt-2 md:order-none md:min-h-[480px]"
      >
        <div
          ref={rigRef}
          className="relative h-[480px] w-[320px]"
          style={{ opacity: 0 }}
        >
          {/* Tali kain: satu pita */}
          <svg
            ref={svgRef}
            className="pointer-events-none absolute left-0 top-0 z-10 overflow-visible"
            width="320"
            height="660"
            viewBox="0 0 320 660"
            fill="none"
          >
            <defs>
              {/* jalur untuk tulisan, ikut bergerak bersama tali */}
              <path id="strapTextPath" data-strap stroke="none" />
            </defs>

            {/* pinggiran gelap */}
            <path
              data-strap
              data-w="32"
              stroke="#0f172a"
              strokeLinecap="round"
            />
            {/* warna kain */}
            <path
              data-strap
              data-w="27"
              stroke="#1d4ed8"
              strokeLinecap="round"
            />
            <path
              data-strap
              data-w="19"
              stroke="#3b82f6"
              strokeLinecap="round"
            />
            {/* kilau tengah */}
            <path
              data-strap
              data-w="7"
              stroke="#bfdbfe"
              strokeOpacity="0.45"
              strokeLinecap="round"
            />
            {/* jahitan di tepi kain */}
            <path
              data-strap
              data-w="1.5"
              stroke="#dbeafe"
              strokeDasharray="3 6"
              strokeLinecap="round"
              opacity="0.7"
            />

            {/* tulisan pada tali */}
            <text
              data-text
              fill="#ffffff"
              fontSize="11"
              fontWeight="800"
              letterSpacing="2"
              textAnchor="middle"
              dominantBaseline="central"
            >
              <textPath href="#strapTextPath" startOffset="45%">
                {LANYARD_TEXT}
              </textPath>
            </text>
          </svg>

          {/* Kartu: titik (0,0) wrapper = titik gantung kartu */}
          <div
            ref={cardRef}
            className="absolute left-0 top-0 z-30 h-0 w-0"
            style={{ transformOrigin: "0 0", willChange: "transform" }}
          >
            <div
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              className={`absolute w-[230px] select-none rounded-2xl border border-slate-600/60 bg-[#151c2b] p-3 shadow-2xl shadow-blue-950/40 ${
                dragging ? "cursor-grabbing" : "cursor-grab"
              }`}
              style={{
                left: -CARD_W / 2,
                top: 8,
                touchAction: "none",
              }}
            >
              <div className="mb-3 flex items-center justify-between px-2 pt-1">
                <span className="text-xs font-bold tracking-widest text-blue-400">
                  DS / PROFILE
                </span>
                <span className="h-2 w-2 rounded-full bg-green-400" />
              </div>

              <div className="flex h-[265px] items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-slate-700 to-slate-900">
                {hasPhoto ? (
                  <img
                    src="/images/pas_foto.png"
                    alt="Dicky Setiawan"
                    draggable="false"
                    className="h-full w-full object-cover"
                    onError={() => setHasPhoto(false)}
                  />
                ) : (
                  <div className="text-center text-slate-400">
                    <UserRound size={70} className="mx-auto mb-3" />
                    <p className="text-sm">Your Photo Here</p>
                  </div>
                )}
              </div>

              <div className="px-2 pb-2 pt-4">
                <h3 className="text-lg font-bold text-white">Dicky Setiawan</h3>
                <p className="mt-1 text-xs text-slate-400">Software Engineer</p>
              </div>
            </div>

            {/* Klip logam: ikut berputar bersama kartu */}
            <div className="pointer-events-none absolute -left-[22px] -top-[14px] h-8 w-11 rounded-md border-2 border-slate-400 bg-gradient-to-b from-slate-200 to-slate-500 shadow-md">
              <div className="mx-auto mt-[7px] h-2.5 w-5 rounded-full border-2 border-slate-600 bg-[#151c2b]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
