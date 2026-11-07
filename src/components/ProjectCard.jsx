import { useState } from "react";
import ProjectModal from "./ProjectModal";

const MAX_TECH = 4; // jumlah teknologi yang tampil di kartu (sisanya jadi "+n")

function ProjectCard({ project }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const shownTech = project.technologies.slice(0, MAX_TECH);
  const extraTech = project.technologies.length - shownTech.length;

  return (
    <>
      <article className="h-full">
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="group flex h-full w-full flex-col overflow-hidden rounded-xl border border-gray-800 bg-[#111827]/60 text-left transition duration-300 hover:-translate-y-1 hover:border-blue-500/60 hover:shadow-lg hover:shadow-blue-950/40"
        >
          {/* Gambar: penuh tanpa ruang kosong (bagian atas screenshot yang ditampilkan) */}
          <div className="aspect-[16/10] overflow-hidden bg-[#0a0f1c]">
            <img
              src={project.image}
              alt={project.title}
              className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.04]"
            />
          </div>

          <div className="flex flex-1 flex-col p-5">
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-lg font-bold leading-snug text-white">
                {project.title}
              </h3>
              <span className="mt-0.5 text-blue-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                ↗
              </span>
            </div>

            <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-blue-400">
              {project.category}
            </p>

            <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-400">
              {project.description}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {shownTech.map((technology) => (
                <span
                  key={technology}
                  className="rounded-md border border-gray-700 bg-[#111827] px-2.5 py-1 text-xs font-medium text-gray-300"
                >
                  {technology}
                </span>
              ))}
              {extraTech > 0 && (
                <span className="rounded-md px-2 py-1 text-xs font-medium text-gray-500">
                  +{extraTech}
                </span>
              )}
            </div>

            <p className="mt-auto pt-5 text-xs font-semibold uppercase tracking-wider text-gray-500">
              {project.role} · {project.year}
            </p>
          </div>
        </button>
      </article>

      {isModalOpen && (
        <ProjectModal project={project} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
}

export default ProjectCard;
