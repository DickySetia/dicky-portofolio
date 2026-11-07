import { useEffect } from "react";
import { X, ArrowUpRight, Check, Code2 } from "lucide-react";

/*
  Field project yang dipakai:
  wajib   : title, image, category, year, description, technologies, role
  opsional: contribution, features[], liveUrl, githubUrl
*/
function ProjectModal({ project, onClose }) {
  // tutup dengan tombol Esc + kunci scroll halaman di belakang modal
  useEffect(() => {
    if (!project) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    const prevOverflow = document.body.style.overflow;

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [project, onClose]);

  if (!project) return null;

  const hasLinks = project.liveUrl || project.githubUrl;

  return (
    <div
      className="modal-overlay fixed inset-0 z-50 flex items-center justify-center bg-[#05080f]/80 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        className="modal-panel relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-gray-800 bg-[#0d1322] shadow-2xl shadow-blue-950/40 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Tombol tutup: tetap terlihat saat konten di-scroll */}
        <div className="pointer-events-none sticky top-0 z-20 h-0">
          <button
            onClick={onClose}
            aria-label="Close project details"
            className="pointer-events-auto absolute right-4 top-4 rounded-full border border-gray-700 bg-[#0b0f19]/80 p-2 text-gray-300 backdrop-blur transition hover:border-blue-500 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        {/* Gambar project */}
        <div className="relative overflow-hidden bg-[#0a0f1c] px-6 pb-8 pt-14 sm:px-10">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(59,130,246,0.22),transparent_65%)]"
          />
          <img
            src={project.image}
            alt={project.title}
            className="relative mx-auto max-h-72 w-full rounded-lg object-contain drop-shadow-2xl"
          />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0d1322] to-transparent" />
        </div>

        <div className="px-6 pb-6 sm:px-10 sm:pb-8">
          {/* Judul */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-400">
              {project.category}
            </span>
            <span className="rounded-full border border-gray-700 px-3 py-1 text-xs font-medium text-gray-400">
              {project.year}
            </span>
          </div>

          <h2
            id="project-modal-title"
            className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl [font-family:'Space_Grotesk',sans-serif]"
          >
            {project.title}
          </h2>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-400">
            {project.description}
          </p>

          {/* Kontribusi */}
          {project.contribution && (
            <div className="mt-8 rounded-xl border border-gray-800 bg-[#111827]/60 p-5">
              <h3 className="text-sm font-semibold text-white">
                My Contribution
              </h3>
              <p className="mt-2 text-sm leading-7 text-gray-400">
                {project.contribution}
              </p>
            </div>
          )}

          {/* Fitur */}
          {project.features?.length > 0 && (
            <div className="mt-8">
              <h3 className="text-sm font-semibold text-white">Key Features</h3>
              <ul className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                {project.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 text-sm leading-6 text-gray-400"
                  >
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-400">
                      <Check size={12} strokeWidth={3} />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Teknologi */}
          <div className="mt-8">
            <h3 className="text-sm font-semibold text-white">Technologies</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.technologies.map((technology) => (
                <span
                  key={technology}
                  className="rounded-lg border border-gray-700 bg-[#111827] px-3 py-1.5 text-xs font-medium text-gray-300"
                >
                  {technology}
                </span>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 flex flex-col gap-4 border-t border-gray-800 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs text-gray-500">My Role</p>
              <p className="mt-1 text-sm font-medium text-gray-200">
                {project.role}
              </p>
            </div>

            {hasLinks && (
              <div className="flex flex-wrap gap-3">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-gray-700 px-5 py-2.5 text-sm font-semibold text-gray-200 transition hover:border-blue-500 hover:text-blue-400"
                  >
                    <Code2 size={16} />
                    Source Code
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500"
                  >
                    Live Demo
                    <ArrowUpRight size={16} />
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectModal;
