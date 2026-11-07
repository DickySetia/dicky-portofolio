/*
  Background halus: pola titik + dua cahaya biru lembut.
  Tinggal atur angka opacity (0.xx) di bawah kalau mau lebih tipis / tebal.
*/
const DOT_OPACITY = 0.14; // pola titik (0 = hilang)
const GLOW_OPACITY = 0.16; // cahaya biru kanan atas
const GLOW_2_OPACITY = 0.09; // cahaya indigo kiri bawah

function BackgroundDecor() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* cahaya biru, kanan atas (di belakang ID card) */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(700px circle at 82% 12%, rgba(59,130,246,${GLOW_OPACITY}), transparent 65%)`,
        }}
      />

      {/* cahaya indigo, kiri bawah */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(600px circle at 8% 85%, rgba(99,102,241,${GLOW_2_OPACITY}), transparent 65%)`,
        }}
      />

      {/* pola titik, memudar ke arah tepi */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(rgba(148,163,184,${DOT_OPACITY}) 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
          WebkitMaskImage:
            "radial-gradient(ellipse at 50% 35%, black 25%, transparent 75%)",
          maskImage:
            "radial-gradient(ellipse at 50% 35%, black 25%, transparent 75%)",
        }}
      />
    </div>
  );
}

export default BackgroundDecor;
