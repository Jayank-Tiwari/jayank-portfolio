"use client";
import { useState, useEffect, useRef } from "react";
import {
  Github,
  Linkedin,
  Mail,
  Briefcase,
  Layers,
  PhoneCall,
  MessageSquare,
  ExternalLink,
  Cpu,
  Terminal,
  Zap,
  Code,
  Atom,
  Box,
  Database,
  Cloud,
  Sparkles,
  Rocket,
  FileCode,
  Globe,
  Server,
  ShoppingCart,
  Utensils,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- (1) Data moved to a constant for easier editing ---
const resumeData = {
  name: "Jayank Tiwari",
  title: "AI & Full Stack Developer",
  location: "Ghaziabad, Uttar Pradesh, India",
  email: "jayank226633@gmail.com",
  social: {
    linkedin: "https://linkedin.com/in/jayank-tiwari-developer",
    github: "https://github.com/Jayank-Tiwari",
  },
  about:
    "AI Engineer and Full Stack Developer with hands-on experience in Generative AI, Conversational Agents, Azure OpenAI, Vector Databases, Next.js, TypeScript, and Python. Skilled in building scalable, data-driven applications with strong AI and full-stack expertise.",
  experience: [
    {
      title: "AI Software Engineer",
      company: "CloudConverge",
      date: "July 2025 - Present",
      description:
        "Specializing in generative AI, conversational agents, and agentic frameworks. Leveraging Azure OpenAI and vector databases to build and deploy intelligent systems, advanced chatbots, and semantic search solutions. Integrating AI systems with full-stack web applications using Next.js, TypeScript, and Python.",
    },
    {
      title: "Full Stack Developer",
      company: "Freelance / Personal Projects",
      date: "July 2023 - July 2025",
      description:
        "Developed and delivered a full-stack web application using Laravel, leveraging its MVC architecture, Eloquent ORM, and authentication features. Gained hands-on experience in project development, deployment, and client communication.",
    },
    {
      title: "Full Stack Developer Intern",
      company: "Bandbaajabarat.com",
      date: "March 2023",
      description:
        "Streamlined web development using HTML, CSS, and JavaScript to improve site performance. Contributed to building a landing page, boosting traffic by 20%, and created an Admin Dashboard with access authentication in CodeIgniter.",
    },
    {
      title: "Frontend Web Developer Intern",
      company: "CarrierGuide.com",
      date: "June 2022 - Aug 2022",
      description:
        "Contributed to building a landing page for CarrierGuide.com, boosting traffic by 20%. Collaborated with developers and designers to enhance UI/UX for client websites using HTML, CSS, and JavaScript.",
    },
  ],
  projects: [
    {
      title: "Intelligent PDF Search",
      tech: ["Python", "Google AI Studio", "GenAI"],
      description:
        "A semantic search application to find information across a personal library of PDF documents. Ingests and indexes multiple PDFs for deep searching, locating exact phrases and semantically similar concepts.",
    },
    {
      title: "Automated Patient Image Processor",
      tech: ["Python", "OpenCV", "OCR"],
      description:
        "A self-contained automation script for sorting and renaming medical images. Monitors an input folder, uses OCR to extract Patient IDs, renames files, and isolates unreadable images for manual review.",
    },
    {
      title: "EcomX Marketplace",
      tech: ["Laravel", "Livewire", "MySQL"],
      description:
        "A multi-vendor e-commerce platform with product catalogs, shopping cart, and payment gateway integration. Features an admin dashboard for order management and sales analytics.",
    },
    {
      title: "Imperial Restaurant System",
      tech: ["Laravel", "PHP", "Bootstrap"],
      url: "https://www.imperialspice.es",
      description:
        "A complete restaurant management system for Imperial Spice. Features online ordering, reservation management, and delivery assignment with OTP verification. Visit the live site at www.imperialspice.es.",
    },
  ],
  skills: [
    "Generative AI",
    "Python",
    "JavaScript",
    "TypeScript",
    "Next.js",
    "React.js",
    "Laravel",
    "FastAPI",
    "LangChain",
    "Vector Databases",
    "Azure OpenAI",
    "Docker",
    "PostgreSQL",
    "MySQL",
    "Tailwind CSS",
    "Git & GitHub",
  ],
};

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState<number>(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const homeRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const experienceRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileMenuOpen(false);
  };

  // Track scroll progress, active section and shrink header on scroll
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const scrollHeight = container.scrollHeight - container.clientHeight;

      // Calculate scroll progress as percentage (0-100)
      const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, progress)));

      // Toggle shrink-on-scroll header state
      setIsScrolled(scrollTop > 8);

      // Determine active section by checking which section covers the container midpoint
      const sectionRefs = [homeRef, aboutRef, experienceRef, projectsRef];
      const midpoint = container.clientHeight / 2;
      let current = 0;
      const containerRect = container.getBoundingClientRect();
      sectionRefs.forEach((ref, idx) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const top = rect.top - containerRect.top;
        const bottom = top + rect.height;
        if (top <= midpoint && bottom >= midpoint) {
          current = idx;
        }
      });
      setActiveSection(current);
    };

    container.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <style>{`
        /* Scroll container */
        .scroll-snap-container {
          height: 100vh;
          overflow-y: scroll;
          scroll-behavior: smooth;
        }

        /* Progress bar styles */
        .progress-bar-container {
          position: fixed;
          top: 3.4rem;
          left: 0;
          right: 0;
          height: 4px;
          background: rgba(255, 255, 255, 0.05);
          z-index: 40;
        }

        .progress-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899);
          transition: width 0.3s ease-out;
          box-shadow: 0 0 10px rgba(139, 92, 246, 0.5);
        }

        .animated-bg {
          /* layered background: dark base + subtle colored radial highlights */
          background-image: 
            radial-gradient(circle at var(--p1-x,20%) var(--p1-y,20%), rgba(124,58,237,var(--bg-opacity,0.06)) 0%, rgba(124,58,237,calc(var(--bg-opacity,0.06) * 0.2)) 8%, transparent 30%),
            radial-gradient(circle at var(--p2-x,80%) var(--p2-y,80%), rgba(6,182,212,calc(var(--bg-opacity,0.06) * 0.7)) 0%, rgba(52,211,153,calc(var(--bg-opacity,0.06) * 0.18)) 10%, transparent 35%),
            linear-gradient(120deg, rgba(6,7,23,1) 0%, rgba(11,14,28,1) 40%, rgba(7,10,20,1) 100%);
          background-blend-mode: screen, screen, normal;
          background-size: 180% 180%;
          transition: background-position 1.5s linear;
          animation: move-bg var(--bg-speed,22s) ease-in-out infinite;
          background-attachment: fixed;
        }

        @keyframes move-bg {
          0% {
            --p1-x: 10%; --p1-y: 20%; --p2-x: 80%; --p2-y: 70%;
          }
          50% {
            --p1-x: 78%; --p1-y: 28%; --p2-x: 22%; --p2-y: 82%;
          }
          100% {
            --p1-x: 10%; --p1-y: 20%; --p2-x: 80%; --p2-y: 70%;
          }
        }

        /* Starfield provided by tsparticles (loaded from CDN) */

        /* Modal and resume viewer styling - Responsive */
        .resume-modal { 
          max-width: 1100px; 
          width: 95%; 
          border-radius: 10px; 
        }
        
        @media (max-width: 640px) {
          .resume-modal { 
            width: 98%; 
            max-height: 90vh;
            border-radius: 8px; 
          }
          .resume-modal .canvas-wrap { 
            max-height: 60vh; 
            padding: 4px; 
          }
        }
        
        .resume-modal .header { 
          display: flex; 
          align-items: center; 
          justify-content: space-between; 
          gap: 12px; 
          flex-wrap: wrap; 
        }
        
        .resume-modal .controls { 
          display: flex; 
          align-items: center; 
          gap: 8px; 
          flex-wrap: wrap; 
        }
        
        .resume-modal .canvas-wrap { 
          max-height: 70vh; 
          overflow: auto; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          padding: 8px; 
          -webkit-overflow-scrolling: touch;
        }
        
        .resume-modal canvas { 
          border-radius: 6px; 
          box-shadow: 0 6px 18px rgba(2,6,23,0.6); 
          background: #fff; 
          max-width: 100%;
          height: auto;
        }

        /* Improved scrollbar styling for the modal canvas wrapper */
        .resume-modal .canvas-wrap::-webkit-scrollbar { width: 12px; }
        .resume-modal .canvas-wrap::-webkit-scrollbar-track { background: rgba(255,255,255,0.02); border-radius: 6px; }
        .resume-modal .canvas-wrap::-webkit-scrollbar-thumb { background: linear-gradient(180deg, rgba(124,58,237,0.6), rgba(6,182,212,0.6)); border-radius: 8px; }

        /* Hide scrollbar for snap container but keep functionality */
        .scroll-snap-container::-webkit-scrollbar { width: 0; height: 0; }
        .scroll-snap-container { scrollbar-width: none; }
        
        /* Mobile scrollbar - thinner */
        @media (max-width: 768px) {
          .resume-modal .canvas-wrap::-webkit-scrollbar { width: 8px; }
        }
        
        /* Prevent text selection on interactive elements */
        button, a {
          -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
          user-select: none;
        }
        
        /* Smooth transitions for responsive changes */
        * {
          transition-property: margin, padding;
          transition-duration: 0.2s;
          transition-timing-function: ease-in-out;
        }
      `}</style>
      {/* Progress Bar */}
      <div className="progress-bar-container">
        <div
          className="progress-bar-fill"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>{" "}
      {/* Fixed Header Navigation */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 border-b transition-all ${
          isScrolled
            ? "bg-zinc-950/80 backdrop-blur-xl border-zinc-800/80 shadow-lg shadow-black/20"
            : "bg-zinc-950/60 backdrop-blur-md border-zinc-800/50"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`flex items-center justify-between transition-all ${
              isScrolled ? "h-14" : "h-16"
            }`}
          >
            <button
              onClick={() => scrollToSection(homeRef)}
              className="text-xl font-bold bg-linear-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent hover:from-blue-400 hover:to-purple-400 transition-all"
            >
              {resumeData.name}
            </button>

            <div className="hidden md:flex items-center space-x-6">
              <button
                onClick={() => scrollToSection(homeRef)}
                className={`group relative px-0.5 pb-1 text-sm font-semibold transition-colors ${
                  activeSection === 0
                    ? "text-white"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                Home
                <span
                  className={`absolute -bottom-2 left-0 h-0.5 rounded-full transition-all duration-300 ${
                    activeSection === 0
                      ? "w-full bg-linear-to-r from-blue-500 to-purple-500"
                      : "w-0 bg-transparent group-hover:w-full group-hover:bg-zinc-500/40"
                  }`}
                />
              </button>
              <button
                onClick={() => scrollToSection(aboutRef)}
                className={`group relative px-0.5 pb-1 text-sm font-semibold transition-colors ${
                  activeSection === 1
                    ? "text-white"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                About
                <span
                  className={`absolute -bottom-2 left-0 h-0.5 rounded-full transition-all duration-300 ${
                    activeSection === 1
                      ? "w-full bg-linear-to-r from-blue-500 to-purple-500"
                      : "w-0 bg-transparent group-hover:w-full group-hover:bg-zinc-500/40"
                  }`}
                />
              </button>
              <button
                onClick={() => scrollToSection(experienceRef)}
                className={`group relative px-0.5 pb-1 text-sm font-semibold transition-colors ${
                  activeSection === 2
                    ? "text-white"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                Experience
                <span
                  className={`absolute -bottom-2 left-0 h-0.5 rounded-full transition-all duration-300 ${
                    activeSection === 2
                      ? "w-full bg-linear-to-r from-blue-500 to-purple-500"
                      : "w-0 bg-transparent group-hover:w-full group-hover:bg-zinc-500/40"
                  }`}
                />
              </button>
              <button
                onClick={() => scrollToSection(projectsRef)}
                className={`group relative px-0.5 pb-1 text-sm font-semibold transition-colors ${
                  activeSection === 3
                    ? "text-white"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                Projects
                <span
                  className={`absolute -bottom-2 left-0 h-0.5 rounded-full transition-all duration-300 ${
                    activeSection === 3
                      ? "w-full bg-linear-to-r from-blue-500 to-purple-500"
                      : "w-0 bg-transparent group-hover:w-full group-hover:bg-zinc-500/40"
                  }`}
                />
              </button>
              <a
                href={`mailto:${resumeData.email}`}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-linear-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-500 hover:to-purple-500 transition-all"
              >
                Contact
              </a>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-zinc-400 hover:text-white"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden py-4 space-y-2">
              <button
                onClick={() => scrollToSection(homeRef)}
                className={`block w-full text-left px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeSection === 0
                    ? "text-white bg-zinc-800"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-800"
                }`}
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection(aboutRef)}
                className={`block w-full text-left px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeSection === 1
                    ? "text-white bg-zinc-800"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-800"
                }`}
              >
                About
              </button>
              <button
                onClick={() => scrollToSection(experienceRef)}
                className={`block w-full text-left px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeSection === 2
                    ? "text-white bg-zinc-800"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-800"
                }`}
              >
                Experience
              </button>
              <button
                onClick={() => scrollToSection(projectsRef)}
                className={`block w-full text-left px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeSection === 3
                    ? "text-white bg-zinc-800"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-800"
                }`}
              >
                Projects
              </button>
            </div>
          )}
        </nav>
      </header>
      {/* Main Content - Continuous Scroll */}
      <div ref={containerRef} className="scroll-snap-container">
        <section
          ref={homeRef}
          className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 pb-12 bg-linear-to-b from-zinc-950 via-zinc-900 to-zinc-950"
        >
          <HomeSection />
        </section>

        <section
          ref={aboutRef}
          className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 md:py-20 bg-linear-to-b from-zinc-950 via-zinc-900 to-zinc-950"
        >
          <AboutSection />
        </section>

        <section
          ref={experienceRef}
          className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 md:py-20 bg-linear-to-b from-zinc-950 via-zinc-900 to-zinc-950"
        >
          <ExperienceSection />
        </section>

        <section
          ref={projectsRef}
          className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 md:py-20 bg-linear-to-b from-zinc-950 via-zinc-900 to-zinc-950"
        >
          <ProjectsSection />
        </section>

        <footer className="border-t border-zinc-800 py-8 bg-zinc-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <h3 className="text-lg font-bold text-white mb-1">
                  {resumeData.name}
                </h3>
                <p className="text-sm text-zinc-400">{resumeData.title}</p>
              </div>

              <div className="flex items-center gap-4">
                <a
                  href={resumeData.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-zinc-400 hover:text-white transition-colors"
                  aria-label="GitHub"
                >
                  <Github size={20} />
                </a>
                <a
                  href={resumeData.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-zinc-400 hover:text-white transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href={`mailto:${resumeData.email}`}
                  className="p-2 text-zinc-400 hover:text-white transition-colors"
                  aria-label="Email"
                >
                  <Mail size={20} />
                </a>
              </div>

              <p className="text-sm text-zinc-500">
                © {new Date().getFullYear()} All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
      <FloatingContact />
    </>
  );
}

// --- (3) Reusable Components ---

// Section Header Component - optimized without motion
function SectionHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="mb-10 md:mb-12 text-center animate-fadeIn">
      <h2 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      <div className="flex items-center justify-center gap-4 mt-4">
        <div className="h-px w-16 bg-linear-to-r from-transparent via-blue-500 to-blue-500 hidden sm:block" />
        <p className="text-base sm:text-lg text-zinc-400 font-medium">
          {subtitle}
        </p>
        <div className="h-px w-16 bg-linear-to-l from-transparent via-purple-500 to-purple-500 hidden sm:block" />
      </div>
    </div>
  );
}

// Skill Tag Component with enhanced styling
function SkillTag({ skill }: { skill: string }) {
  return (
    <span className="inline-flex px-3 py-1.5 text-sm font-semibold text-blue-300 bg-blue-500/10 rounded-lg border border-blue-500/30 items-center gap-2 transition-all duration-200 hover:bg-blue-500/20 hover:border-blue-500/50 hover:scale-105">
      <span className="inline-flex h-4 w-4 text-blue-400 items-center justify-center">
        {getSkillIcon(skill)}
      </span>
      <span>{skill}</span>
    </span>
  );
}

// Simple emoji icon mapping for core skills (fallback if no SVG available)
function getSkillIcon(skill: string) {
  // Use lucide-react icons for consistent crisp visuals
  switch (skill) {
    case "Generative AI":
      return <Cpu className="h-4 w-4" />;
    case "Python":
      return <Terminal className="h-4 w-4" />;
    case "JavaScript":
      return <Zap className="h-4 w-4" />;
    case "TypeScript":
      return <Code className="h-4 w-4" />;
    case "Next.js":
      return <ExternalLink className="h-4 w-4" />;
    case "React.js":
      return <Atom className="h-4 w-4" />;
    case "Docker":
      return <Box className="h-4 w-4" />;
    case "PostgreSQL":
    case "MySQL":
      return <Database className="h-4 w-4" />;
    case "Azure OpenAI":
      return <Cloud className="h-4 w-4" />;
    default:
      return <Cpu className="h-4 w-4" />;
  }
}

// --- (4) Section Content Components ---

// Home Section
function HomeSection() {
  const [resumeAvailable, setResumeAvailable] = useState(false);
  const [checkingResume, setCheckingResume] = useState(true);
  const [showResumeNotice, setShowResumeNotice] = useState(false);
  const [showResumeModal, setShowResumeModal] = useState(false);

  const rawBase = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const basePath = rawBase
    ? rawBase.startsWith("/")
      ? rawBase.replace(/\/$/, "")
      : `/${rawBase.replace(/\/$/, "")}`
    : "";
  const [resumeUrl, setResumeUrl] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    async function checkResume() {
      try {
        // Try multiple candidate locations: basePath + root, and common lowercase variants
        const candidates = [
          `${basePath}/Jayank_Tiwari_Resume.pdf`,
          `/Jayank_Tiwari_Resume.pdf`,
          `/jayank-portfolio/Jayank_Tiwari_Resume.pdf`,
          `${basePath}/jayank_tiwari_resume.pdf`,
          `/jayank_tiwari_resume.pdf`,
        ].filter(Boolean);

        // local tracker to avoid reading resumeUrl from outer scope (prevents stale/dependency issues)
        let foundUrl: string | null = null;

        for (const url of candidates) {
          try {
            const res = await fetch(url, { method: "HEAD" });
            if (!mounted) return;
            if (res && res.ok) {
              setResumeAvailable(true);
              setResumeUrl(url);
              foundUrl = url;
              break;
            }
          } catch {
            // ignore and try next
          }
        }

        // Fallback: try an .htm variant at basePath and root if nothing found above
        if (!foundUrl) {
          const fallbacks = [
            `${basePath}/Jayank_Tiwari_Resume.htm`,
            `/Jayank_Tiwari_Resume.htm`,
          ];
          for (const f of fallbacks) {
            try {
              const r2 = await fetch(f, { method: "HEAD" });
              if (!mounted) return;
              if (r2 && r2.ok) {
                setResumeAvailable(true);
                setResumeUrl(f);
                foundUrl = f;
                break;
              }
            } catch {
              // ignore
            }
          }
        }
      } catch {
        // ignore - assume not available
      } finally {
        if (mounted) setCheckingResume(false);
      }
    }
    checkResume();
    return () => {
      mounted = false;
    };
  }, [basePath]);

  return (
    <>
      <div className="w-full max-w-7xl mx-auto animate-fadeIn">
        {/* Hero Section */}
        <div className="space-y-6 sm:space-y-8">
          {/* Name & Title */}
          <div className="space-y-3 sm:space-y-4">
            <div>
              <div className="h-1 w-16 sm:w-20 bg-linear-to-r from-blue-500 to-purple-600 rounded-full mb-4 sm:mb-6 animate-slideRight" />
              <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight">
                Jayank Tiwari
              </h1>
              <div className="mt-3 sm:mt-4 flex items-center gap-2 sm:gap-3">
                <div className="h-px flex-1 bg-linear-to-r from-blue-500/50 to-transparent" />
                <h2 className="text-base font-semibold text-blue-400 sm:text-xl lg:text-2xl xl:text-3xl whitespace-nowrap">
                  AI Engineer & Full Stack Developer
                </h2>
                <div className="h-px flex-1 bg-linear-to-l from-purple-500/50 to-transparent" />
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="max-w-4xl text-base sm:text-lg lg:text-xl xl:text-2xl text-zinc-300 leading-relaxed">
            Building intelligent systems that solve real problems. Specialized
            in{" "}
            <span className="text-blue-400 font-semibold">Generative AI</span>,{" "}
            <span className="text-purple-400 font-semibold">
              Full-Stack Development
            </span>
            , and{" "}
            <span className="text-emerald-400 font-semibold">
              Cloud Architecture
            </span>
            .
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 sm:gap-4 pt-2 sm:pt-4">
            <a
              href={resumeData.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 min-h-11 text-sm font-semibold text-white bg-linear-to-r from-blue-600 to-blue-700 rounded-xl transition-all duration-300 hover:from-blue-500 hover:to-blue-600 hover:shadow-xl hover:shadow-blue-500/30 hover:scale-105 sm:px-8 sm:py-4 sm:min-h-12 sm:text-base lg:text-lg"
            >
              <Github size={22} className="shrink-0" />
              <span>GitHub</span>
            </a>
            <a
              href={resumeData.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 min-h-12 text-base font-semibold text-white bg-linear-to-r from-zinc-800 to-zinc-700 rounded-xl transition-all duration-300 hover:from-zinc-700 hover:to-zinc-600 hover:shadow-xl hover:shadow-purple-500/20 hover:scale-105 sm:text-lg"
            >
              <Linkedin size={22} className="shrink-0" />
              <span>LinkedIn</span>
            </a>
            <a
              href={`mailto:${resumeData.email}`}
              className="inline-flex items-center gap-2 px-8 py-4 min-h-12 text-base font-bold text-white bg-linear-to-r from-purple-600 to-purple-700 rounded-xl transition-all duration-300 hover:from-purple-500 hover:to-purple-600 hover:shadow-xl hover:shadow-purple-500/30 hover:scale-105 sm:text-lg"
            >
              <Mail size={22} className="shrink-0" />
              <span>Get in Touch</span>
            </a>
            {/* Resume Button */}
            {checkingResume ? (
              <button
                disabled
                className="inline-flex items-center gap-2 px-8 py-4 min-h-12 text-base font-medium text-zinc-400 bg-zinc-800/40 rounded-xl border border-zinc-700 sm:text-lg"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5 shrink-0 animate-pulse"
                >
                  <path d="M3 14.5a1 1 0 011-1h12a1 1 0 011 1V16a2 2 0 01-2 2H5a2 2 0 01-2-2v-1.5z" />
                </svg>
                <span>Loading...</span>
              </button>
            ) : resumeAvailable ? (
              <button
                onClick={() => setShowResumeModal(true)}
                aria-label="Open resume preview"
                className="inline-flex items-center gap-2 px-8 py-4 min-h-12 text-base font-semibold text-white bg-transparent rounded-xl border-2 border-blue-500/40 transition-all duration-300 hover:bg-blue-500/10 hover:border-blue-500 hover:scale-105 sm:text-lg"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5 shrink-0"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 14.5a1 1 0 011-1h12a1 1 0 011 1V16a2 2 0 01-2 2H5a2 2 0 01-2-2v-1.5zM9 2a1 1 0 012 0v6.586l1.293-1.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 011.414-1.414L9 8.586V2z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>View Resume</span>
              </button>
            ) : (
              <button
                onClick={() => setShowResumeNotice(true)}
                aria-label="Resume not available"
                className="inline-flex items-center gap-2 px-8 py-4 min-h-12 text-base font-medium text-white bg-transparent rounded-xl border-2 border-zinc-700 transition-all duration-300 hover:bg-zinc-800 hover:scale-105 sm:text-lg"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5 shrink-0"
                >
                  <path d="M3 14.5a1 1 0 011-1h12a1 1 0 011 1V16a2 2 0 01-2 2H5a2 2 0 01-2-2v-1.5z" />
                </svg>
                <span>Resume</span>
              </button>
            )}
          </div>
        </div>

        {/* Stats/Highlights Section */}
        <div className="grid grid-cols-1 gap-4 mt-8 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6 animate-fadeInUp">
          <div className="group relative p-4 sm:p-6 bg-linear-to-br from-zinc-900 via-zinc-900/90 to-zinc-900/80 rounded-xl sm:rounded-2xl border border-zinc-800 transition-all duration-300 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="p-3 bg-linear-to-br from-blue-500/20 to-blue-600/10 rounded-xl">
                <Zap size={28} className="text-blue-400" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-zinc-400 mb-1.5 uppercase tracking-wide">
                  Location
                </h4>
                <p className="text-lg font-bold text-white">
                  {resumeData.location}
                </p>
              </div>
            </div>
          </div>

          <div className="group relative p-6 bg-linear-to-br from-zinc-900 via-zinc-900/90 to-zinc-900/80 rounded-2xl border border-zinc-800 transition-all duration-300 hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/10 hover:-translate-y-1">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-linear-to-br from-purple-500/20 to-purple-600/10 rounded-xl">
                <Mail size={28} className="text-purple-400" />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-sm font-semibold text-zinc-400 mb-1.5 uppercase tracking-wide">
                  Email
                </h4>
                <p className="text-lg font-bold text-white truncate">
                  {resumeData.email}
                </p>
              </div>
            </div>
          </div>

          <div className="group relative p-6 bg-linear-to-br from-zinc-900 via-zinc-900/90 to-zinc-900/80 rounded-2xl border border-zinc-800 transition-all duration-300 hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-500/10 hover:-translate-y-1 sm:col-span-2 lg:col-span-1">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-linear-to-br from-emerald-500/20 to-emerald-600/10 rounded-xl">
                <Code size={28} className="text-emerald-400" />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-sm font-semibold text-zinc-400 mb-3 uppercase tracking-wide">
                  Top Skills
                </h4>
                <div className="flex flex-wrap gap-2">
                  {resumeData.skills.slice(0, 5).map((s) => (
                    <SkillTag key={s} skill={s} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Small transient notice when resume is missing */}
      <AnimatePresence>
        {showResumeNotice && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            role="alertdialog"
            aria-live="polite"
            className="z-50 max-w-sm px-4 py-3 text-sm text-zinc-200 bg-zinc-900/90 rounded-md shadow-lg fixed left-1/2 bottom-24 -translate-x-1/2"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-medium">Resume not found</p>
                <p className="text-xs text-zinc-400">
                  Place `Jayank_Tiwari_Resume.pdf` in the `public/` folder or
                  contact me to request it.
                </p>
              </div>
              <button
                onClick={() => setShowResumeNotice(false)}
                aria-label="Close resume notice"
                className="ml-2 px-2 py-1 text-xs bg-zinc-800/60 rounded min-h-8"
              >
                Close
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <ResumeModal
        open={showResumeModal}
        onClose={() => setShowResumeModal(false)}
        pdfUrl={resumeUrl ?? `${basePath}/Jayank_Tiwari_Resume.pdf`}
      />
    </>
  );
}

// Enhanced About section with icons and animations
function AboutSection() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
      <SectionHeader
        title="About Me"
        subtitle="Building the future with AI & Code"
      />

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
        {/* Main Description */}
        <div className="space-y-6">
          <div className="p-8 bg-linear-to-br from-zinc-900/90 to-zinc-900/60 rounded-2xl border border-zinc-800 shadow-xl">
            <p className="text-lg leading-relaxed text-zinc-300 sm:text-xl">
              {resumeData.about}
            </p>
          </div>

          <div className="p-8 bg-linear-to-br from-blue-900/30 to-purple-900/30 rounded-2xl border border-blue-800/40 shadow-xl">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 bg-blue-500/15 rounded-xl">
                <Cpu size={24} className="text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white">What I Do</h3>
            </div>
            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed">
              I build production-grade systems that combine modern front-end
              frameworks with robust back-end APIs and scalable infrastructure.
              My work focuses on pragmatic AI applications — building
              conversational agents, embedding-based semantic search, and
              automated data pipelines.
            </p>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="space-y-6">
          <div className="p-8 bg-linear-to-br from-zinc-900/90 to-zinc-900/60 rounded-2xl border border-zinc-800 shadow-xl">
            <div className="flex items-center gap-4 mb-5">
              <div className="p-3 bg-purple-500/15 rounded-xl">
                <Code size={24} className="text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white">
                Technical Expertise
              </h3>
            </div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.04 } },
              }}
              className="flex flex-wrap gap-2.5"
            >
              {resumeData.skills.map((skill) => (
                <motion.div
                  key={skill}
                  variants={{
                    hidden: { opacity: 0, scale: 0.8 },
                    visible: { opacity: 1, scale: 1 },
                  }}
                >
                  <SkillTag skill={skill} />
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-6">
            <div className="p-6 bg-linear-to-br from-emerald-900/30 to-emerald-900/20 rounded-2xl border border-emerald-800/40 text-center shadow-xl transition-all duration-300 hover:border-emerald-500/50 hover:-translate-y-1">
              <div className="flex justify-center mb-3">
                <div className="p-3 bg-emerald-500/15 rounded-xl">
                  <Briefcase size={24} className="text-emerald-400" />
                </div>
              </div>
              <div className="text-3xl font-bold text-white">
                {resumeData.experience.length}+
              </div>
              <div className="text-sm text-zinc-400 mt-2 font-medium">
                Positions
              </div>
            </div>
            <div className="p-6 bg-linear-to-br from-blue-900/30 to-purple-900/30 rounded-2xl border border-blue-800/40 text-center shadow-xl transition-all duration-300 hover:border-blue-500/50 hover:-translate-y-1">
              <div className="flex justify-center mb-3">
                <div className="p-3 bg-blue-500/15 rounded-xl">
                  <Layers size={24} className="text-blue-400" />
                </div>
              </div>
              <div className="text-3xl font-bold text-white">
                {resumeData.projects.length}+
              </div>
              <div className="text-sm text-zinc-400 mt-2 font-medium">
                Projects
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// (AboutSection replaced lower to add animations and icons)

// Experience Section
function ExperienceSection() {
  // Unique icon for each experience based on job title/company
  const getExperienceIcon = (title: string, company: string) => {
    if (title.includes("AI") || company.includes("CloudConverge"))
      return Sparkles;
    if (company.includes("Freelance") || company.includes("Personal"))
      return Rocket;
    if (company.includes("Bandbaajabarat")) return FileCode;
    if (company.includes("CarrierGuide")) return Globe;
    return Cpu;
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
      <SectionHeader
        title="Work Experience"
        subtitle="My professional journey"
      />

      <div className="relative">
        {/* Timeline line */}
        <div className="hidden md:block absolute left-8 top-0 bottom-0 w-0.5 bg-linear-to-b from-blue-500 via-purple-500 to-transparent" />

        <div className="space-y-8">
          {resumeData.experience.map((job) => {
            const Icon = getExperienceIcon(job.title, job.company);
            return (
              <div key={job.title + job.company} className="relative">
                {/* Timeline dot */}
                <div className="hidden md:flex absolute left-6 top-8 w-5 h-5 bg-blue-500 rounded-full border-4 border-zinc-950 z-10 items-center justify-center shadow-lg shadow-blue-500/50">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                </div>

                <div className="md:ml-20 group">
                  <div className="p-6 md:p-8 bg-linear-to-br from-zinc-900/90 to-zinc-900/60 rounded-2xl border border-zinc-800 shadow-xl transition-all duration-300 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1">
                    <div className="flex items-start gap-5 mb-4">
                      <div className="p-3 bg-linear-to-br from-blue-500/20 to-purple-500/10 rounded-xl shrink-0">
                        <Icon size={28} className="text-blue-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                          <div>
                            <h3 className="text-xl font-bold text-white sm:text-2xl">
                              {job.title}
                            </h3>
                            <h4 className="text-base sm:text-lg font-semibold text-blue-400 mt-2">
                              {job.company}
                            </h4>
                          </div>
                          <span className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-purple-300 bg-purple-500/15 rounded-xl border border-purple-500/30 shrink-0">
                            <svg
                              className="w-4 h-4"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                clipRule="evenodd"
                              />
                            </svg>
                            {job.date}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-base sm:text-lg text-zinc-300 leading-relaxed ml-0 md:ml-16">
                      {job.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Projects Section
function ProjectsSection() {
  // Unique icon for each project based on title
  const getProjectIcon = (title: string) => {
    if (title.includes("PDF") || title.includes("Search")) return Database;
    if (title.includes("Patient") || title.includes("Image")) return Cpu;
    if (title.includes("EcomX") || title.includes("Marketplace"))
      return ShoppingCart;
    if (title.includes("Restaurant") || title.includes("Imperial"))
      return Utensils;
    return Server;
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
      <SectionHeader title="Projects" subtitle="Featured work & experiments" />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
        {resumeData.projects.map((project) => {
          const Icon = getProjectIcon(project.title);
          return (
            <div key={project.title} className="group h-full">
              <div className="flex flex-col h-full p-6 md:p-8 bg-linear-to-br from-zinc-900/90 to-zinc-900/60 rounded-2xl border border-zinc-800 shadow-xl transition-all duration-300 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/10 hover:-translate-y-1">
                {/* Header with Icon */}
                <div className="flex items-start gap-5 mb-5">
                  <div className="p-4 bg-linear-to-br from-blue-500/20 to-purple-500/20 rounded-2xl border border-blue-500/40 group-hover:border-purple-500/60 transition-all duration-300 shadow-lg">
                    <Icon
                      size={32}
                      className="text-blue-400 group-hover:text-purple-400 transition-colors"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors sm:text-3xl">
                      {project.title}
                    </h3>
                  </div>
                </div>

                {/* Description */}
                <p className="text-base sm:text-lg text-zinc-300 leading-relaxed mb-6 flex-1">
                  {project.description}
                </p>

                {/* Tech Stack & Link */}
                <div className="space-y-4 pt-5 border-t border-zinc-800/60">
                  <div className="flex flex-wrap gap-2.5">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center px-3 py-1.5 text-sm font-semibold text-blue-300 bg-blue-500/10 rounded-lg border border-blue-500/30 hover:bg-blue-500/20 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-white bg-linear-to-r from-blue-600 to-purple-600 rounded-xl transition-all duration-300 hover:from-blue-500 hover:to-purple-500 hover:shadow-xl hover:shadow-purple-500/30 hover:scale-105"
                    >
                      <ExternalLink size={18} className="shrink-0" />
                      <span className="truncate">Visit Project</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Floating contact button component
function FloatingContact() {
  const [open, setOpen] = useState(false);
  const phone = "+918826709461";
  const waLink = `https://wa.me/918826709461`;
  const callRef = useRef<HTMLAnchorElement | null>(null);
  const waRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) {
      document.addEventListener("keydown", onKey);
      // focus first action
      setTimeout(() => callRef.current?.focus(), 0);
    } else {
      document.removeEventListener("keydown", onKey);
    }
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // Simple focus trap for the two action links + toggle button
  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key !== "Tab") return;
    const focusable = [callRef.current, waRef.current];
    if (!focusable[0] || !focusable[1]) return;
    const first = focusable[0];
    const last = focusable[1];
    const active = document.activeElement;
    if (e.shiftKey && active === first) {
      e.preventDefault();
      last?.focus();
    } else if (!e.shiftKey && active === last) {
      e.preventDefault();
      first?.focus();
    }
  }

  return (
    <div className="z-50 fixed bottom-6 right-6 flex flex-col items-end">
      <div className="flex flex-col space-y-2 items-end">
        {open && (
          <div
            onKeyDown={handleKeyDown}
            className="flex flex-col mb-2 space-y-2 items-end"
          >
            <a
              ref={callRef}
              href={`tel:${phone}`}
              className="flex space-x-2 px-4 py-2 min-h-11 text-sm font-medium text-white bg-zinc-800 rounded-md shadow-md items-center hover:bg-zinc-700"
            >
              <PhoneCall size={16} />
              <span>Call</span>
            </a>
            <a
              ref={waRef}
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex space-x-2 px-4 py-2 min-h-11 text-sm font-medium text-white bg-purple-600 rounded-md shadow-md items-center hover:bg-purple-500"
            >
              <MessageSquare size={16} />
              <span>WhatsApp</span>
            </a>
          </div>
        )}

        <button
          onClick={() => setOpen((s) => !s)}
          aria-expanded={open}
          aria-label="Contact options"
          className="flex h-12 w-12 p-3 text-white bg-linear-to-br from-blue-600 to-blue-700 rounded-full shadow-lg transition-all duration-300 items-center justify-center hover:scale-110 hover:shadow-xl hover:shadow-blue-500/30"
        >
          {/* phone icon */}
          <PhoneCall size={20} />
        </button>
      </div>
    </div>
  );
}

// Bottom nav for small screens
// Resume preview modal (client-only)
function ResumeModal({
  open,
  onClose,
  pdfUrl,
}: {
  open: boolean;
  onClose: () => void;
  pdfUrl: string;
}) {
  // Use pdfjs-dist to render a simple canvas-based viewer with prev/next controls
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNum, setPageNum] = useState(1);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    (async () => {
      // start load
      try {
        // Load pdf.js from CDN at runtime to avoid bundling node-specific code
        const w = window as unknown as { pdfjsLib?: unknown };
        if (!w.pdfjsLib) {
          await new Promise<void>((resolve, reject) => {
            const s = document.createElement("script");
            s.src =
              "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.min.js";
            s.onload = () => resolve();
            s.onerror = () => reject();
            document.head.appendChild(s);
          });
          // set worker src if available
          try {
            (
              window as unknown as {
                pdfjsLib: { GlobalWorkerOptions: { workerSrc?: string } };
              }
            ).pdfjsLib.GlobalWorkerOptions.workerSrc =
              "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js";
          } catch {
            // ignore
          }
        }

        const pdfjs = (window as unknown as { pdfjsLib: unknown })
          .pdfjsLib as unknown as {
          getDocument: (src: string | { data: ArrayBuffer }) => {
            promise: Promise<unknown>;
          };
        };
        const loadingTask = pdfjs.getDocument(pdfUrl);
        const pdf = (await loadingTask.promise) as unknown as {
          numPages: number;
          getPage: (n: number) => Promise<unknown>;
        };
        if (cancelled) return;
        const pdfObj = pdf as unknown as { numPages: number };
        setNumPages(pdfObj.numPages || null);

        interface PDFPageLike {
          getViewport(opts: { scale: number }): {
            width: number;
            height: number;
          };
          render(ctx: unknown): { promise: Promise<void> };
        }

        async function renderPage(pageNumber: number) {
          const page = (await pdf.getPage(
            pageNumber
          )) as unknown as PDFPageLike;
          const naturalViewport = page.getViewport({ scale: 1 });
          const canvas = canvasRef.current;
          if (!canvas) return;

          // Determine a scale that fits the modal/container width (use 80% of window width)
          const containerMaxWidth = Math.min(window.innerWidth * 0.8, 1100);
          const scale = Math.min(
            1.0,
            containerMaxWidth / naturalViewport.width
          );

          const viewport = page.getViewport({ scale });
          const context = canvas.getContext("2d");
          canvas.width = Math.floor(viewport.width);
          canvas.height = Math.floor(viewport.height);

          const renderContext = {
            canvasContext: context as CanvasRenderingContext2D,
            viewport,
          };
          await page.render(renderContext).promise;
        }

        await renderPage(pageNum);
      } catch {
        // ignore errors loading or rendering PDF
      } finally {
        // finished
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [open, pdfUrl, pageNum]);

  function recordDownload() {
    try {
      const prev = parseInt(
        localStorage.getItem("resume_downloads") || "0",
        10
      );
      localStorage.setItem("resume_downloads", String(prev + 1));
    } catch {
      // ignore
    }
  }

  if (!open) return null;
  return (
    <div className="z-50 flex fixed inset-0 items-center justify-center p-2 sm:p-4">
      <div onClick={onClose} className="bg-black/60 absolute inset-0" />
      <div className="z-10 w-full max-w-[1100px] p-3 sm:p-4 bg-zinc-900/95 rounded-md shadow-lg relative resume-modal">
        <div className="header flex-wrap">
          <h3 className="text-base sm:text-lg font-semibold text-white">
            Resume Preview
          </h3>
          <div className="controls">
            <a
              href={pdfUrl}
              download
              onClick={recordDownload}
              className="px-3 py-2 min-h-10 text-xs sm:text-sm font-medium text-white bg-zinc-800 rounded-md hover:bg-zinc-700"
            >
              Download
            </a>
            <button
              onClick={onClose}
              className="px-3 py-2 min-h-10 text-xs sm:text-sm text-white bg-zinc-800 rounded-md hover:bg-zinc-700"
            >
              Close
            </button>
          </div>
        </div>
        <div className="mt-3">
          <div className="flex mb-2 items-center justify-center gap-2 sm:gap-3">
            <button
              onClick={() => setPageNum((p) => Math.max(1, p - 1))}
              disabled={pageNum <= 1}
              className="px-3 py-2 min-h-10 text-xs sm:text-sm text-white bg-zinc-800 rounded disabled:opacity-50 hover:bg-zinc-700 disabled:hover:bg-zinc-800"
            >
              Prev
            </button>
            <div className="text-xs sm:text-sm text-zinc-400">
              Page {pageNum}
              {numPages ? ` of ${numPages}` : ""}
            </div>
            <button
              onClick={() => setPageNum((p) => Math.min(numPages ?? 1, p + 1))}
              disabled={numPages ? pageNum >= numPages : true}
              className="px-3 py-2 min-h-10 text-xs sm:text-sm text-white bg-zinc-800 rounded disabled:opacity-50 hover:bg-zinc-700 disabled:hover:bg-zinc-800"
            >
              Next
            </button>
          </div>

          <div className="overflow-auto flex max-h-[70vh] canvas-wrap items-center justify-center">
            <canvas
              ref={canvasRef}
              className="max-w-full pt-[31vw] rounded-md bg-black"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
