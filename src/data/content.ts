export const profile = {
  name: "Moțpan Liviu",
  handle: "liviu5m",
  role: "High School Student · Full-Stack Developer",
  location: "Nisporeni, Republic of Moldova",
  email: "motpanliviuwork@gmail.com",
  phone: "+373 68 530 326",
  github: "https://github.com/liviu5m",
  leetcode: "https://leetcode.com/u/motpanliviu",
  summary:
    "Coding since age 10, with structured, self-directed study of programming languages, paradigms, and mental models since age 11. Competitive-programming background in national Mathematics & Informatics Olympiads. Builds production-style, microservice-based full-stack systems and low-level systems software, with 650+ solved DSA problems.",
};

export const buffers = [
  { id: "home", label: "home.md", num: 1 },
  { id: "projects", label: "projects/", num: 2 },
  { id: "experience", label: "experience.log", num: 3 },
  { id: "settings", label: "config.lua", num: 4 },
] as const;

export type BufferId = (typeof buffers)[number]["id"];

export const skills = {
  Languages: ["JavaScript", "TypeScript", "Python", "Java", "C", "C++", "PHP", "SQL", "HTML", "CSS"],
  "Frameworks": ["React", "Next.js", "Tailwind CSS", "Spring Boot", "FastAPI", "Laravel"],
  "Systems & Data": ["Microservices", "REST APIs", "JWT/OAuth2", "PostgreSQL", "MySQL", "MongoDB", "Docker", "RabbitMQ", "Eureka"],
  Tools: ["Git", "Linux/Terminal (100+ WPM)", "VS Code", "Neovim", "PyCharm", "Figma"],
};

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  stack: string[];
  url: string;
  bullets: string[];
}

export const projects: Project[] = [
  {
    slug: "foodroute",
    name: "FoodRoute",
    tagline: "Full-stack food ordering platform (microservices)",
    stack: ["React 19", "TypeScript", "Tailwind", "Spring Boot", "MongoDB", "Stripe", "Cloudinary"],
    url: "https://food-route.vercel.app/",
    bullets: [
      "Microservices backend (auth, product, order, cart, review, user) on Spring Boot with MongoDB persistence",
      "Clerk + Google OAuth authentication with role-based access separating customer/admin flows",
      "Stripe checkout, Cloudinary image pipelines, admin dashboard with sales analytics",
      "React 19 frontend with TanStack Query + Zustand for real-time cart and inventory updates",
    ],
  },
  {
    slug: "apointy",
    name: "Apointy",
    tagline: "Microservice appointment scheduling platform",
    stack: ["Spring Boot", "React", "TypeScript", "Eureka", "RabbitMQ", "PostgreSQL", "Docker Compose"],
    url: "https://apointy.vercel.app/",
    bullets: [
      "Eureka service registry + API Gateway performing JWT verification and Google OAuth2 login",
      "user-service: registration, Google account sync, email verification, password reset via RabbitMQ events",
      "booking-service + notification-service for scheduling, availability queues, automated reminders",
    ],
  },
  {
    slug: "evolve",
    name: "Evolve",
    tagline: "Fitness & wellness tracking platform",
    stack: ["TypeScript", "React", "Java", "Spring Boot"],
    url: "https://evolveapp.vercel.app/",
    bullets: [
      "Workout planning, meal tracking, progress monitoring, and grocery management",
      "Decoupled TypeScript frontend + Java/Spring Boot backend, same service patterns as FoodRoute/Apointy",
      "Data model built around recurring domains for trend and history views",
    ],
  },
  {
    slug: "hive",
    name: "Hive",
    tagline: "Full-stack social platform",
    stack: ["TypeScript", "Java", "Spring Boot", "JWT", "Google OAuth2"],
    url: "https://gethive.vercel.app/",
    bullets: [
      "Posts, real-time chat, and a social graph with customizable profile pages",
      "JWT sessions, OTP email verification with resend/expiry logic, Google OAuth login",
      "Auth-guarded routing separating onboarding from protected routes",
    ],
  },
  {
    slug: "kern",
    name: "kern",
    tagline: "Custom Unix-like shell",
    stack: ["C", "POSIX", "GNU Readline"],
    url: "https://github.com/liviu5m/kern",
    bullets: [
      "POSIX-style interactive shell from scratch: custom prompt, built-ins, PATH-based execution",
      "Process management for pipelines, command chaining (&&), I/O redirection, background jobs",
      "GNU Readline integration for persistent history and TAB completion",
    ],
  },
];

export interface TimelineEntry {
  when: string;
  title: string;
  detail: string;
  tag: string;
}

export const timeline: TimelineEntry[] = [
  {
    when: "Age 10",
    title: "First lines of code",
    detail: "Started programming, well before any formal instruction.",
    tag: "origin",
  },
  {
    when: "Age 11",
    title: "Structured self-study begins",
    detail: "Deliberate study of programming languages, paradigms, and mental models, alongside math.",
    tag: "growth",
  },
  {
    when: "Ongoing",
    title: "National Mathematics & Informatics Olympiad",
    detail: "3x Honorable Mention (4th place), 3x 3rd place. Consistent Top 10 nationally in Mathematics, Top 6 in Informatics.",
    tag: "competition",
  },
  {
    when: "10th Grade",
    title: "Liceul Teoretic \"Boris Cazacu\"",
    detail: "Academic average 9.87 / 10.",
    tag: "education",
  },
  {
    when: "11th Grade",
    title: "Liceul Teoretic \"Boris Cazacu\"",
    detail: "Academic average 9.95 / 10. Expected graduation 2027.",
    tag: "education",
  },
  {
    when: "650+",
    title: "DSA problems solved",
    detail: "Consistent competitive programming practice on LeetCode.",
    tag: "practice",
  },
];

export const certifications = [
  "Cambridge English Qualification — B2 First",
  "Certiport — JavaScript",
  "Certiport — Databases",
  "Certiport — Network Security",
];

export const languages = [
  { name: "Romanian", level: "native" },
  { name: "English", level: "B2, Cambridge-certified" },
  { name: "French", level: "conversational" },
];
