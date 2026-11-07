export const projects = [
  {
    id: 1,
    title: "Buku Saku Digital — BPR",
    category: "Web Application",
    description:
      "A web-based information portal developed to organize and present company information, including products, operational procedures, regulations, and employee guidelines.",
    image: "/images/bpr.png",
    technologies: ["PHP Native", "Bootstrap", "MySQL"],
    year: "2025",
    role: "Solo Developer",

    contribution:
      "Designed and developed the application independently, including CRUD functionality for managing links and information content.",

    features: [
      "Information management for company products and services.",
      "Access to regulations and operational requirements.",
      "Information pages for SOP, management decisions, and employee guidelines.",
      "CRUD functionality to manage links and information content.",
    ],
  },

  {
    id: 2,
    title: "Uangku — Personal Finance Management App",
    category: "Web Application",
    description:
      "A personal finance management application designed to help users track daily expenses and manage monthly budgets. Users can set spending budgets, record transactions, and monitor their remaining budget through an interactive dashboard with financial summaries and category-based expense analysis.",
    image: "/images/uangku.png",
    technologies: ["PHP Native", "Tailwind CSS", "MySQL"],
    year: "2025",
    role: "Solo Developer",

    contribution:
      "Designed and developed the application independently, including budget management, expense tracking, dashboard analytics, transaction history, and financial reporting features.",

    features: [
      "Dashboard displaying daily and monthly expenses, average daily spending, and remaining budget.",
      "Monthly budget planning with automatic budget deduction based on recorded expenses.",
      "Expense tracking and transaction history.",
      "Category-based expense breakdowns, including food and transportation.",
      "Monthly expense comparisons to monitor spending trends.",
      "Financial reports with monthly and category-based summaries.",
    ],
  },

  {
    id: 3,
    title: "SPMB — Student Admission & Readiness Assessment System",
    category: "Web Application",
    description:
      "A web-based student admission system designed for junior and senior high schools. The platform streamlines online registration and integrates the Simple Additive Weighting (SAW) method to assess student readiness based on three criteria: diniyah certificate ownership, report card scores, and Quran reading test scores. The assessment results classify students into red, yellow, and green zones to identify students who may need additional guidance.",
    image: "/images/spmb.png",
    technologies: ["PHP", "Laravel", "MySQL", "Tailwind CSS", "JavaScript"],
    year: "2026",
    role: "Solo Developer",

    contribution:
      "Designed and developed the application independently as a full-stack developer, handling frontend and backend development, database management, online admission workflows, and SAW algorithm implementation.",

    features: [
      "Online student registration and document upload.",
      "Applicant data verification and admission management.",
      "Automated student readiness assessment using the SAW method.",
      "Student classification into red, yellow, and green readiness zones.",
      "Monitoring features for school principals and admission officers.",
      "School information pages, including extracurricular activities.",
      "Public announcements and admission-related information.",
    ],
  },

  {
    id: 4,
    title: "Wedding Organizer — Wedding Service Management System",
    category: "Web Application",
    description:
      "A web-based wedding organizer platform that connects prospective couples with wedding services while helping wedding organizers manage their operations. The platform offers WO D-Day, Wedding Planner, and Wedding Package services, along with vendor registration. The FIFO algorithm is implemented to manage vendor and customer registration queues based on their application order.",
    image: "/images/wo.png",
    technologies: ["PHP", "Laravel", "MySQL", "Tailwind CSS", "JavaScript"],
    year: "2026",
    role: "Solo Developer",

    contribution:
      "Designed and developed the application independently as a full-stack developer, handling frontend and backend development, database management, wedding service management, registration workflows, and FIFO algorithm implementation.",

    features: [
      "Wedding services, including WO D-Day, Wedding Planner, and Wedding Package.",
      "Wedding package browsing, service selection, and booking requests.",
      "Vendor registration and application management.",
      "Customer registration and application management.",
      "Vendor and customer queue management using the FIFO algorithm.",
      "Management of wedding packages, services, pricing, schedules, and customer data.",
      "Order and booking status management.",
      "Customer communication through email and WhatsApp.",
      "Wedding galleries and service information.",
    ],
  },

  {
    id: 5,
    title: "SIAKAD — School Academic Information System",
    category: "Web Application",
    description:
      "A web-based academic information system developed to manage school operations, including student and teacher records, subjects, and class schedules. The system implements Role-Based Access Control (RBAC) with dynamic permission management, allowing administrative staff to control user access to specific pages and actions.",
    image: "/images/siakad.png",
    technologies: ["PHP", "Laravel", "MySQL", "Tailwind CSS", "JavaScript"],
    year: "2026",
    role: "Solo Developer",

    contribution:
      "Designed and developed the application independently as a full-stack developer, handling frontend and backend development, database management, academic data management, and dynamic role-based access control implementation.",

    features: [
      "Student and teacher data management.",
      "Subject and class schedule management.",
      "Teacher attendance management for students.",
      "Student grade input and management.",
      "Personal teaching schedules for teachers.",
      "Academic reports and monitoring for school principals.",
      "Dynamic role and permission management using RBAC.",
      "Granular access control for pages and actions, including create, read, update, and delete permissions.",
      "Administrative access management for staff.",
    ],
  },

  {
    id: 6,
    title: "Bansos — Social Assistance Selection System",
    category: "Web Application",
    description:
      "A web-based social assistance selection system developed to help administrators and officers manage resident data and identify potential assistance recipients. The system implements the Simple Additive Weighting (SAW) method to automatically calculate and rank candidates based on three criteria: income (cost), number of dependents (benefit), and housing condition (benefit).",
    image: "/images/bansos.png",
    technologies: ["PHP", "Laravel", "MySQL", "Tailwind CSS", "JavaScript"],
    year: "2026",
    role: "Solo Developer",

    contribution:
      "Designed and developed the application independently as a full-stack developer, handling frontend and backend development, database management, resident data management, SAW algorithm implementation, and reporting functionality.",

    features: [
      "Resident and potential assistance recipient data management.",
      "Automated candidate assessment using the SAW method.",
      "Candidate ranking based on income, number of dependents, and housing condition.",
      "Dashboard displaying total residents and assessed candidates.",
      "Ranking results to support assistance prioritization.",
      "Selection reports and printable reports.",
    ],
  },
];
