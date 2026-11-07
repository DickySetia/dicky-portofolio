import Reveal from "./Reveal";

const EDUCATION = [
  {
    title: "S1 Informatics Engineering",
    place: "Universitas Teknologi Bandung",
    period: "2022 — 2026",
    note: "Thesis: SPMB Information System. Focus on software development, databases, software engineering, and web application development.",
  },
  {
    title: "Software Engineering",
    place: "SMK Budi Bakti Ciwidey",
    period: "2018 — 2021",
    note: "Final project: SPP (school fee) Information System.",
  },
];

const EXPERIENCE = [
  {
    title: "Freelance Programmer",
    type: "Project Based",
    period: "2025 — Present",
    points: [
      "Built web applications with Laravel, PHP, and MySQL based on client needs.",
      "Handled requirements analysis, database design, feature implementation, and system testing.",
      "Developed a web-based company information system for a BPR and a personal finance tracking app.",
    ],
  },
  {
    title: "IoT Project Developer",
    type: "Project Based",
    period: "2025",
    points: [
      "Developed Internet of Things solutions for monitoring and automation.",
      "Integrated hardware and software for real-time data collection and processing.",
      "Tested devices and system integration, and documented the implementation.",
    ],
  },
  {
    title: "Private Tutor",
    type: "Freelance",
    period: "2023",
    points: [
      "Taught Microsoft Word, Excel, and PowerPoint.",
      "Prepared structured learning materials adapted to each student's needs.",
    ],
  },
];

function About() {
  return (
    <section id="about" className="scroll-mt-10 px-6 py-20 md:px-12">
      <div className="mx-auto max-w-7xl">
        {/* Main About Content */}
        <div className="grid items-center gap-10 md:grid-cols-[1.2fr_0.8fr]">
          {/* Introduction */}
          <Reveal variant="left">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
              About Me
            </p>

            <h2 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl">
              Dicky Setiawan
            </h2>

            <p className="mt-5 max-w-2xl text-base leading-8 text-gray-400">
              I'm a Software Engineer and Web Developer with a background in
              Informatics Engineering and hands-on experience building web
              applications through freelance projects. I enjoy developing
              practical solutions across frontend and backend technologies.
            </p>

            {/* Action Buttons */}
            <div className="mt-7 flex flex-wrap gap-4">
              <a
                href="/cv-dicky-setiawan.pdf"
                download
                className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
              >
                Download CV
              </a>

              <a
                href="#work"
                className="rounded-lg border border-gray-600 px-6 py-3 text-sm font-semibold text-white transition hover:border-blue-400 hover:text-blue-400"
              >
                View Project
              </a>
            </div>
          </Reveal>

          {/* Profile Photo */}
          <Reveal
            variant="right"
            delay={150}
            className="flex justify-center md:justify-end"
          >
            <div className="relative h-56 w-56 rounded-full border-4 border-blue-500/40 p-2 md:h-72 md:w-72">
              <div className="h-full w-full overflow-hidden rounded-full bg-gray-800">
                <img
                  src="/images/pas_foto.png"
                  alt="Dicky Setiawan"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="absolute -bottom-3 -right-3 h-14 w-14 rounded-full border-4 border-[#0b0f19] bg-blue-500/20" />
            </div>
          </Reveal>
        </div>

        {/* Education & Experience */}
        <div className="mt-16 grid gap-12 border-t border-gray-700/70 pt-8 md:grid-cols-2">
          {/* Education */}
          <Reveal>
            <h3 className="text-xl font-bold text-white">Education</h3>

            <div className="mt-5 space-y-6">
              {EDUCATION.map((item, index) => (
                <div
                  key={item.title}
                  className={`border-l-2 pl-5 ${
                    index === 0 ? "border-blue-500" : "border-gray-600"
                  }`}
                >
                  <h4 className="font-semibold text-white">{item.title}</h4>
                  <p className="mt-1 text-sm text-gray-400">{item.place}</p>
                  <p className="mt-2 text-xs text-gray-500">{item.period}</p>
                  <p className="mt-3 text-sm leading-6 text-gray-400">
                    {item.note}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Experience */}
          <Reveal delay={150}>
            <h3 className="text-xl font-bold text-white">Experience</h3>

            <div className="mt-5 space-y-8">
              {EXPERIENCE.map((item, index) => (
                <div
                  key={item.title}
                  className={`border-l-2 pl-5 ${
                    index === 0 ? "border-blue-500" : "border-gray-600"
                  }`}
                >
                  <h4 className="font-semibold text-white">{item.title}</h4>
                  <p className="mt-1 text-sm text-gray-400">
                    {item.type}
                    <span className="mx-2 text-gray-600">•</span>
                    <span className="text-xs text-gray-500">{item.period}</span>
                  </p>

                  <ul className="mt-3 space-y-2">
                    {item.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-3 text-sm leading-6 text-gray-400"
                      >
                        <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-blue-500" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default About;
