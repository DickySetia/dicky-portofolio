import { useState } from "react";
import { projects } from "../data/projects";
import ProjectCard from "./ProjectCard";
import Certificates from "./Certificates";
import TechStack from "./TechStack";
import Reveal from "./Reveal";

function PortfolioShowcase() {
  const [activeTab, setActiveTab] = useState("Projects");

  const tabs = ["Projects", "Certificates", "Tech Stack"];

  return (
    <section id="work" className="scroll-mt-10 px-6 py-24 md:px-12">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <Reveal className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
            My Collection
          </p>

          <h2 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
            Portfolio Showcase
            <span className="text-blue-500">.</span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-gray-400">
            A collection of my projects, achievements, and technologies.
          </p>
        </Reveal>

        {/* Tabs */}
        <Reveal
          delay={120}
          className="mt-10 flex flex-wrap justify-center gap-3"
        >
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-lg px-6 py-3 text-sm font-semibold transition-all duration-300 ${
                activeTab === tab
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                  : "border border-gray-700 text-gray-400 hover:border-blue-500 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </Reveal>

        {/* Projects: muncul berurutan per kolom */}
        {activeTab === "Projects" && (
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <Reveal
                key={project.id}
                variant="zoom"
                delay={(index % 3) * 120}
                className="h-full"
              >
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        )}

        {/* Certificates */}
        {activeTab === "Certificates" && <Certificates />}

        {/* Tech Stack */}
        {activeTab === "Tech Stack" && <TechStack />}
      </div>
    </section>
  );
}

export default PortfolioShowcase;
