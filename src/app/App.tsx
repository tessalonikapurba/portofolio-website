import { useState, useEffect, useRef, createContext, useContext } from "react";
import { Github, Instagram, Linkedin, ExternalLink, Mail, MapPin, Send, Award, Star, Menu, X, Moon, Sun } from "lucide-react";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import profilePhoto from "../imports/portopic.jpeg";
import certPufa from "@/imports/PRINT__5___5_.png";
import certPust from "@/imports/24__1_.png";
import certAngel from "@/imports/angel_page-0001.jpg";
import godsalPhoto from "@/imports/WhatsApp_Image_2026-06-17_at_11.12.58.jpeg";
import mcPhoto1 from "@/imports/WhatsApp_Image_2026-06-17_at_11.00.48.jpeg";
import mcPhoto2 from "@/imports/WhatsApp_Image_2026-06-17_at_10.55.52.jpeg";
import mcPhoto3 from "@/imports/WhatsApp_Image_2026-06-17_at_11.28.11.jpeg";
import volunteerPhoto1 from "@/imports/image-1.png";
import volunteerPhoto2 from "@/imports/image-2.png";
import sospro1 from "@/imports/WhatsApp_Image_2026-06-17_at_11.36.23.jpeg";
import sospro2 from "@/imports/WhatsApp_Image_2026-06-17_at_11.36.23__1_.jpeg";
import jbzPhoto from "@/imports/image-4.png";

// ─── Theme ───────────────────────────────────────────────────────────────────
const dark = {
  bg: "#06040f",
  fg: "#e8e4f8",
  fgSub: "#c4b8f0",
  fgMuted: "#8b7fc4",
  cardBg: "rgba(255,255,255,0.03)",
  cardBorder: "rgba(155,109,255,0.15)",
  navBg: "rgba(6,4,15,0.75)",
  navBorder: "rgba(155,109,255,0.1)",
  dropdownBg: "rgba(6,4,15,0.97)",
  inputBg: "rgba(255,255,255,0.04)",
  inputBorder: "rgba(155,109,255,0.2)",
  inputBorderFocus: "rgba(155,109,255,0.5)",
  primary: "#9b6dff",
  accent: "#4f8eff",
  purple: "#c084fc",
  blue: "#60a5fa",
  gradient: "linear-gradient(135deg, #9b6dff, #4f8eff)",
  starColor: "rgba(200,180,255,",
  starOpacity: 0.6,
  orbColor1: "radial-gradient(circle, #9b6dff, transparent)",
  orbColor2: "radial-gradient(circle, #4f8eff, transparent)",
  orbColor3: "radial-gradient(circle, #c084fc, transparent)",
  toggleRaisedBg: "#1a1530",
  toggleRaisedShadow: "4px 4px 10px rgba(0,0,0,0.6), -2px -2px 6px rgba(155,109,255,0.15)",
  togglePressedShadow: "1px 1px 3px rgba(0,0,0,0.8), inset 2px 2px 5px rgba(0,0,0,0.5)",
};

const light = {
  bg: "#f3f0ff",
  fg: "#1a1230",
  fgSub: "#3b2a6e",
  fgMuted: "#6b5ca5",
  cardBg: "rgba(255,255,255,0.75)",
  cardBorder: "rgba(124,58,237,0.15)",
  navBg: "rgba(243,240,255,0.8)",
  navBorder: "rgba(124,58,237,0.12)",
  dropdownBg: "rgba(243,240,255,0.98)",
  inputBg: "rgba(124,58,237,0.05)",
  inputBorder: "rgba(124,58,237,0.2)",
  inputBorderFocus: "rgba(124,58,237,0.5)",
  primary: "#7c3aed",
  accent: "#2563eb",
  purple: "#9333ea",
  blue: "#3b82f6",
  gradient: "linear-gradient(135deg, #7c3aed, #2563eb)",
  starColor: "rgba(120,90,200,",
  starOpacity: 0.35,
  orbColor1: "radial-gradient(circle, rgba(124,58,237,0.25), transparent)",
  orbColor2: "radial-gradient(circle, rgba(37,99,235,0.2), transparent)",
  orbColor3: "radial-gradient(circle, rgba(147,51,234,0.15), transparent)",
  toggleRaisedBg: "#ffffff",
  toggleRaisedShadow: "4px 4px 10px rgba(124,58,237,0.2), -2px -2px 6px rgba(255,255,255,0.9)",
  togglePressedShadow: "1px 1px 3px rgba(124,58,237,0.3), inset 2px 2px 5px rgba(124,58,237,0.15)",
};

type Theme = typeof dark;
const ThemeCtx = createContext<{ t: Theme; isDark: boolean; toggle: () => void }>({
  t: dark, isDark: true, toggle: () => {},
});
const useTheme = () => useContext(ThemeCtx);

// ─── Stars ────────────────────────────────────────────────────────────────────
function StarField({ t, isDark }: { t: Theme; isDark: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animId: number;
    let stars: { x: number; y: number; r: number; alpha: number; twinkleSpeed: number }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight;
      stars = Array.from({ length: 180 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.3,
        alpha: Math.random(),
        twinkleSpeed: Math.random() * 0.01 + 0.005,
      }));
    };

    let tick = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      tick++;
      for (const s of stars) {
        s.alpha = 0.3 + 0.7 * Math.abs(Math.sin(tick * s.twinkleSpeed));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `${t.starColor}${s.alpha})`;
        ctx.fill();
      }
      animId = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, [t, isDark]);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" style={{ opacity: t.starOpacity }} />;
}

// ─── Orb ─────────────────────────────────────────────────────────────────────
function Orb({ className, bg }: { className?: string; bg: string }) {
  return <div className={`absolute rounded-full blur-3xl pointer-events-none ${className}`} style={{ background: bg }} />;
}

// ─── Tactile Toggle Button ────────────────────────────────────────────────────
function ThemeToggle() {
  const { t, isDark, toggle } = useTheme();
  const [pressed, setPressed] = useState(false);

  const handlePress = () => {
    setPressed(true);
    toggle();
    setTimeout(() => setPressed(false), 200);
  };

  return (
    <button
      onClick={handlePress}
      aria-label="Toggle theme"
      className="flex items-center justify-center w-10 h-10 rounded-full transition-all duration-150"
      style={{
        background: t.toggleRaisedBg,
        color: t.primary,
        boxShadow: pressed ? t.togglePressedShadow : t.toggleRaisedShadow,
        transform: pressed ? "scale(0.93) translateY(1px)" : "scale(1) translateY(0)",
        border: `1px solid ${t.primary}30`,
      }}
    >
      {isDark ? <Sun size={17} /> : <Moon size={17} />}
    </button>
  );
}

// ─── Nav ─────────────────────────────────────────────────────────────────────
function Nav() {
  const { t } = useTheme();
  const [open, setOpen] = useState(false);
  const links = ["Home", "About", "Experience", "Certificates", "Projects", "Contact"];

  const scroll = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4"
      style={{ background: t.navBg, backdropFilter: "blur(16px)", borderBottom: `1px solid ${t.navBorder}`, transition: "background 0.4s, border-color 0.4s" }}
    >
      <span className="font-mono text-lg font-bold" style={{ color: t.primary, fontFamily: "Space Mono, monospace" }}>TA.</span>

      <ul className="hidden md:flex gap-8 items-center">
        {links.map((l) => (
          <li key={l}>
            <button
              onClick={() => scroll(l)}
              className="text-sm font-medium transition-colors hover:text-white"
              style={{ color: t.fgMuted, fontFamily: "Space Grotesk, sans-serif" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = t.fg; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = t.fgMuted; }}
            >
              {l}
            </button>
          </li>
        ))}
        <li><ThemeToggle /></li>
      </ul>

      <div className="md:hidden flex items-center gap-3">
        <ThemeToggle />
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center justify-center w-9 h-9 rounded-full transition-colors"
          style={{ color: t.primary, background: `${t.primary}15`, border: `1px solid ${t.primary}25` }}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open && (
        <div
          className="absolute top-full left-0 right-0 flex flex-col gap-4 px-6 py-6"
          style={{ background: t.dropdownBg, borderBottom: `1px solid ${t.cardBorder}`, backdropFilter: "blur(16px)" }}
        >
          {links.map((l) => (
            <button
              key={l}
              onClick={() => scroll(l)}
              className="text-left text-base font-medium transition-colors"
              style={{ color: t.fgSub, fontFamily: "Space Grotesk, sans-serif" }}
            >
              {l}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

// ─── Social Button ────────────────────────────────────────────────────────────
function SocialButton({ href, icon, label, color }: { href: string; icon: React.ReactNode; label: string; color: string }) {
  const { t } = useTheme();
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105"
      style={{ background: t.cardBg, border: `1px solid ${color}40`, color, fontFamily: "Space Grotesk, sans-serif", backdropFilter: "blur(8px)" }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = `${color}18`; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = t.cardBg; }}
    >
      {icon}
      {label}
    </a>
  );
}

// ─── Glass Card ───────────────────────────────────────────────────────────────
function GlassCard({ children, className = "", style = {} }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const { t } = useTheme();
  return (
    <div
      className={`rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] ${className}`}
      style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}`, backdropFilter: "blur(12px)", ...style }}
    >
      {children}
    </div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const certs = [
  { title: "PUFA Computer Science", org: "Faculty of Computer Science", year: "2024–2025", role: "Member of Communication & Multimedia", colorKey: "primary" as const },
  { title: "JBZ", org: "Organization", year: "2025", role: "Head of Graphic Design", colorKey: "accent" as const },
];

const projects = [
  { title: "SpendWise", desc: "A personal finance tracker app with smart budgeting insights and beautiful data visualization built with React and Firebase.", tags: ["React", "Firebase", "Recharts", "Tailwind"], link: "#", colorKey: "primary" as const },
  { title: "EduSync Platform", desc: "Learning management system for university students — course management, assignments, and real-time progress tracking.", tags: ["Next.js", "PostgreSQL", "Prisma", "TypeScript"], link: "#", colorKey: "accent" as const },
  { title: "MediTrack", desc: "Health record management web app for clinics, featuring appointment scheduling and patient data dashboard.", tags: ["Laravel", "MySQL", "Bootstrap", "Alpine.js"], link: "#", colorKey: "purple" as const },
  { title: "ConstellaChat", desc: "Real-time group chat application with end-to-end encryption, emoji reactions, and dark space-themed UI.", tags: ["Socket.io", "Node.js", "MongoDB", "React"], link: "#", colorKey: "blue" as const },
];

// ─── Experience Section ───────────────────────────────────────────────────────

// Leadership & Organizations
const leadershipOrgs = [
  {
    title: "PUFA Computer Science",
    period: "2024 – 2025",
    role: "Member of Communication & Multimedia Division",
    icon: "🏛️",
    color: "#9b6dff",
    responsibilities: [
      "Created visual content and promotional materials for organizational activities.",
      "Managed event documentation and social media content.",
      "Collaborated with team members to support branding and communication strategies.",
      "Assisted in organizing academic and student events.",
    ],
  },
  {
    title: "JBZ",
    period: "2025",
    role: "Head of Media Division",
    icon: "📱",
    color: "#4f8eff",
    responsibilities: [
      "Led the media team in creating promotional and visual content for organizational activities.",
      "Coordinated content planning and publication across digital platforms.",
      "Managed event documentation, including photography, videography, and post-event content.",
      "Collaborated with other divisions to support communication and branding initiatives.",
    ],
  },
];

// Volunteer Experience
const volunteerExperiences = [
  {
    title: "Happy Bus — AIESEC",
    role: "Volunteer",
    icon: "🌍",
    color: "#34d399",
    responsibilities: [
      "Assisted in educational and social impact activities for local communities.",
      "Collaborated with volunteers to ensure smooth event execution.",
    ],
    photos: [volunteerPhoto1, volunteerPhoto2], // Multiple photos for carousel
    hasCarousel: true,
  },
  {
    title: "Social Project — PUFA Computer Science",
    role: "Volunteer",
    icon: "❤️",
    color: "#f472b6",
    responsibilities: [
      "Participated in community service and social impact programs.",
      "Supported event operations and participant engagement activities.",
    ],
    photos: [sospro1, sospro2], // Multiple photos for carousel
    hasCarousel: true,
  },
];

// Activities & Events
const activities = [
  {
    category: "Master of Ceremony",
    icon: "🎤",
    color: "#9b6dff",
    events: ["Campus Events", "Student Gatherings", "Academic Seminars"],
    photos: [mcPhoto1, mcPhoto2, mcPhoto3], // Multiple photos for carousel
    hasCarousel: true,
  },
  {
    category: "Documentation Team",
    icon: "📷",
    color: "#60a5fa",
    role: "GODSAL 2025",
    events: ["Captured event photos and videos", "Managed event documentation for publication and archives"],
    photo: godsalPhoto,
  },
  {
    category: "Event Organizer",
    icon: "📋",
    color: "#c084fc",
    role: "ECD 2025",
    events: ["Assisted in event planning and coordination", "Managed event flow and participant activities"],
  },
];

function ExperienceSection() {
  const { t } = useTheme();
  const [mcSlideIndex, setMcSlideIndex] = useState(0);
  const [aiesecSlideIndex, setAiesecSlideIndex] = useState(0);
  const [soproSlideIndex, setSoproSlideIndex] = useState(0);
  const mcTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const aiesecTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const soproTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Auto-rotate for MC carousel
  const startMcTimer = () => {
    const mcActivity = activities.find(a => a.hasCarousel);
    if (!mcActivity || !mcActivity.photos) return;
    
    if (mcTimerRef.current) clearInterval(mcTimerRef.current);
    mcTimerRef.current = setInterval(() => {
      setMcSlideIndex(c => (c + 1) % mcActivity.photos!.length);
    }, 3500);
  };

  // Auto-rotate for AIESEC carousel
  const startAiesecTimer = () => {
    const aiesecVol = volunteerExperiences[0];
    if (!aiesecVol.photos) return;
    
    if (aiesecTimerRef.current) clearInterval(aiesecTimerRef.current);
    aiesecTimerRef.current = setInterval(() => {
      setAiesecSlideIndex(c => (c + 1) % aiesecVol.photos!.length);
    }, 3500);
  };

  // Auto-rotate for Social Project carousel
  const startSoproTimer = () => {
    const soproVol = volunteerExperiences[1];
    if (!soproVol.photos) return;
    
    if (soproTimerRef.current) clearInterval(soproTimerRef.current);
    soproTimerRef.current = setInterval(() => {
      setSoproSlideIndex(c => (c + 1) % soproVol.photos!.length);
    }, 3500);
  };

  useEffect(() => {
    startMcTimer();
    startAiesecTimer();
    startSoproTimer();
    return () => { 
      if (mcTimerRef.current) clearInterval(mcTimerRef.current);
      if (aiesecTimerRef.current) clearInterval(aiesecTimerRef.current);
      if (soproTimerRef.current) clearInterval(soproTimerRef.current);
    };
  }, []);

  const goToMcSlide = (i: number) => {
    setMcSlideIndex(i);
    startMcTimer();
  };

  const goToAiesecSlide = (i: number) => {
    setAiesecSlideIndex(i);
    startAiesecTimer();
  };

  const goToSoproSlide = (i: number) => {
    setSoproSlideIndex(i);
    startSoproTimer();
  };

  return (
    <section id="experience" className="relative z-10 py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <p className="text-xs font-mono tracking-widest uppercase mb-2" style={{ color: t.primary, fontFamily: "Space Mono, monospace" }}>
          MY JOURNEY
        </p>
        <h2 className="text-3xl md:text-4xl font-bold mb-12" style={{ fontFamily: "Space Grotesk, sans-serif", color: t.fg }}>
          Experience
        </h2>

        {/* Leadership & Organizations */}
        <div className="mb-16">
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2" style={{ color: t.fg, fontFamily: "Space Grotesk, sans-serif" }}>
            <span style={{ color: t.primary }}>⭐</span> Leadership & Organizations
          </h3>
          {leadershipOrgs.map((org) => (
            <GlassCard key={org.title} className="group cursor-default">
              <div className="flex items-start gap-4 mb-4">
                <div
                  className="text-2xl w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110"
                  style={{ background: `${org.color}18`, border: `1px solid ${org.color}30` }}
                >
                  {org.icon}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold mb-1" style={{ color: t.fg, fontFamily: "Space Grotesk, sans-serif" }}>
                    {org.title}
                  </h4>
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className="text-xs px-2 py-0.5 rounded-full font-mono"
                      style={{ background: `${org.color}15`, color: org.color, border: `1px solid ${org.color}25`, fontFamily: "Space Mono, monospace" }}>
                      {org.period}
                    </span>
                    <span className="text-sm" style={{ color: t.fgMuted }}>{org.role}</span>
                  </div>
                  <ul className="space-y-1.5 mt-3">
                    {org.responsibilities.map((resp, i) => (
                      <li key={i} className="text-sm flex items-start gap-2" style={{ color: t.fgMuted }}>
                        <span style={{ color: org.color, marginTop: "0.2rem" }}>•</span>
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {/* Photo */}
              // @ts-ignore
{(org as any).photo && (
                <div
                  className="rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.01] mt-auto"
                  style={{
                    border: `1px solid ${org.color}25`,
                    boxShadow: `0 4px 20px ${org.color}20`,
                  }}
                >
                  <ImageWithFallback
                    // @ts-ignore
src={org.photo}
                    alt={org.title}
                    className="w-full h-auto object-cover"
                    style={{ aspectRatio: "16/9" }}
                  />
                </div>
              )}
            </GlassCard>
          ))}
        </div>

        {/* Volunteer Experience */}
        <div className="mb-16">
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2" style={{ color: t.fg, fontFamily: "Space Grotesk, sans-serif" }}>
            <span style={{ color: t.accent }}>🤝</span> Volunteer Experience
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {volunteerExperiences.map((vol, volIdx) => {
              // Determine which slide index to use based on volunteer index
              const currentSlideIndex = volIdx === 0 ? aiesecSlideIndex : soproSlideIndex;
              const goToSlide = volIdx === 0 ? goToAiesecSlide : goToSoproSlide;
              
              return (
                <GlassCard key={vol.title} className="group cursor-default flex flex-col">
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className="text-2xl w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110"
                      style={{ background: `${vol.color}18`, border: `1px solid ${vol.color}30` }}
                    >
                      {vol.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1" style={{ color: t.fg, fontFamily: "Space Grotesk, sans-serif" }}>
                        {vol.title}
                      </h4>
                      <span className="text-xs px-2 py-0.5 rounded-full font-mono inline-block"
                        style={{ background: `${vol.color}15`, color: vol.color, border: `1px solid ${vol.color}25`, fontFamily: "Space Mono, monospace" }}>
                        {vol.role}
                      </span>
                      <ul className="space-y-1.5 mt-3">
                        {vol.responsibilities.map((resp, i) => (
                          <li key={i} className="text-sm flex items-start gap-2" style={{ color: t.fgMuted }}>
                            <span style={{ color: vol.color, marginTop: "0.2rem" }}>•</span>
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  {/* Photo or Carousel */}
                  {vol.hasCarousel && vol.photos ? (
                    <div className="mt-auto">
                      {/* Main carousel */}
                      <div
                        className="rounded-xl overflow-hidden transition-all duration-300 relative"
                        style={{
                          border: `1px solid ${vol.color}25`,
                          boxShadow: `0 4px 20px ${vol.color}20`,
                        }}
                      >
                        {vol.photos.map((photo, i) => (
                          <div
                            key={i}
                            className="transition-all duration-700"
                            style={{
                              display: i === currentSlideIndex ? 'block' : 'none',
                              opacity: i === currentSlideIndex ? 1 : 0,
                            }}
                          >
                            <ImageWithFallback
                              src={photo}
                              alt={`${vol.title} - Photo ${i + 1}`}
                              className="w-full h-auto object-cover"
                              style={{ aspectRatio: "16/9" }}
                            />
                          </div>
                        ))}
                        
                        {/* Slide counter */}
                        <div
                          className="absolute bottom-3 right-4 text-xs font-mono px-2 py-1 rounded-full"
                          style={{ background: `${vol.color}90`, color: "#fff", fontFamily: "Space Mono, monospace" }}
                        >
                          {currentSlideIndex + 1} / {vol.photos.length}
                        </div>

                        {/* Navigation arrows */}
                        <button
                          onClick={() => goToSlide((currentSlideIndex - 1 + vol.photos.length) % vol.photos.length)}
                          className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110"
                          style={{ background: `${vol.color}25`, backdropFilter: "blur(8px)", color: "#fff", border: `1px solid ${vol.color}40` }}
                        >
                          ‹
                        </button>
                        <button
                          onClick={() => goToSlide((currentSlideIndex + 1) % vol.photos.length)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110"
                          style={{ background: `${vol.color}25`, backdropFilter: "blur(8px)", color: "#fff", border: `1px solid ${vol.color}40` }}
                        >
                          ›
                        </button>
                      </div>

                      {/* Dot indicators */}
                      <div className="flex gap-2 justify-center mt-3">
                        {vol.photos.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => goToSlide(i)}
                            className="rounded-full transition-all duration-300"
                            style={{
                              width: i === currentSlideIndex ? 24 : 8,
                              height: 8,
                              background: i === currentSlideIndex ? vol.color : `${vol.color}35`,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div
                      className="rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.01] mt-auto"
                      style={{
                        border: `1px solid ${vol.color}25`,
                        boxShadow: `0 4px 20px ${vol.color}20`,
                      }}
                    >
                      <ImageWithFallback
                        src={vol.photos[0]!}
                        alt={vol.title}
                        className="w-full h-auto object-cover"
                        style={{ aspectRatio: "16/9" }}
                      />
                    </div>
                  )}
                </GlassCard>
              );
            })}
          </div>
        </div>

        {/* Activities & Events */}
        <div>
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2" style={{ color: t.fg, fontFamily: "Space Grotesk, sans-serif" }}>
            <span style={{ color: t.purple }}>✨</span> Activities & Events
          </h3>
          {/* Row 1: MC and Documentation Team */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {activities.slice(0, 2).map((activity) => (
              <GlassCard key={activity.category} className="group cursor-default flex flex-col">
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className="text-2xl w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110"
                    style={{ background: `${activity.color}18`, border: `1px solid ${activity.color}30` }}
                  >
                    {activity.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1" style={{ color: t.fg, fontFamily: "Space Grotesk, sans-serif" }}>
                      {activity.category}
                    </h4>
                    {activity.role && (
                      <span className="text-xs px-2 py-0.5 rounded-full font-mono inline-block mb-2"
                        style={{ background: `${activity.color}15`, color: activity.color, border: `1px solid ${activity.color}25`, fontFamily: "Space Mono, monospace" }}>
                        {activity.role}
                      </span>
                    )}
                    <ul className="space-y-1.5 mt-2">
                      {activity.events.map((event, i) => (
                        <li key={i} className="text-sm flex items-start gap-2" style={{ color: t.fgMuted }}>
                          <span style={{ color: activity.color, marginTop: "0.2rem" }}>•</span>
                          <span>{event}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                {/* Photo or Carousel */}
                {activity.hasCarousel && activity.photos ? (
                  <div className="mt-auto">
                    {/* Main carousel */}
                    <div
                      className="rounded-xl overflow-hidden transition-all duration-300 relative"
                      style={{
                        border: `1px solid ${activity.color}25`,
                        boxShadow: `0 4px 20px ${activity.color}20`,
                      }}
                    >
                      {activity.photos.map((photo, i) => (
                        <div
                          key={i}
                          className="transition-all duration-700"
                          style={{
                            display: i === mcSlideIndex ? 'block' : 'none',
                            opacity: i === mcSlideIndex ? 1 : 0,
                          }}
                        >
                          <ImageWithFallback
                            src={photo}
                            alt={`${activity.category} - Photo ${i + 1}`}
                            className="w-full h-auto object-cover"
                            style={{ aspectRatio: "16/9" }}
                          />
                        </div>
                      ))}
                      
                      {/* Slide counter */}
                      <div
                        className="absolute bottom-3 right-4 text-xs font-mono px-2 py-1 rounded-full"
                        style={{ background: `${activity.color}90`, color: "#fff", fontFamily: "Space Mono, monospace" }}
                      >
                        {mcSlideIndex + 1} / {activity.photos.length}
                      </div>

                      {/* Navigation arrows */}
                      <button
                        onClick={() => goToMcSlide((mcSlideIndex - 1 + activity.photos.length) % activity.photos.length)}
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110"
                        style={{ background: `${activity.color}25`, backdropFilter: "blur(8px)", color: "#fff", border: `1px solid ${activity.color}40` }}
                      >
                        ‹
                      </button>
                      <button
                        onClick={() => goToMcSlide((mcSlideIndex + 1) % activity.photos.length)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110"
                        style={{ background: `${activity.color}25`, backdropFilter: "blur(8px)", color: "#fff", border: `1px solid ${activity.color}40` }}
                      >
                        ›
                      </button>
                    </div>

                    {/* Dot indicators */}
                    <div className="flex gap-2 justify-center mt-3">
                      {activity.photos.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => goToMcSlide(i)}
                          className="rounded-full transition-all duration-300"
                          style={{
                            width: i === mcSlideIndex ? 24 : 8,
                            height: 8,
                            background: i === mcSlideIndex ? activity.color : `${activity.color}35`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                ) : activity.photo ? (
                  <div
                    className="rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.01] mt-auto"
                    style={{
                      border: `1px solid ${activity.color}25`,
                      boxShadow: `0 4px 20px ${activity.color}20`,
                    }}
                  >
                    <ImageWithFallback
                      src={activity.photo}
                      alt={activity.category}
                      className="w-full h-auto object-cover"
                      style={{ aspectRatio: "16/9" }}
                    />
                  </div>
                ) : null}
              </GlassCard>
            ))}
          </div>
          {/* Row 2: Event Organizer (full width) */}
          <div>
            {activities.slice(2).map((activity) => (
              <GlassCard key={activity.category} className="group cursor-default flex flex-col">
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className="text-2xl w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110"
                    style={{ background: `${activity.color}18`, border: `1px solid ${activity.color}30` }}
                  >
                    {activity.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1" style={{ color: t.fg, fontFamily: "Space Grotesk, sans-serif" }}>
                      {activity.category}
                    </h4>
                    {activity.role && (
                      <span className="text-xs px-2 py-0.5 rounded-full font-mono inline-block mb-2"
                        style={{ background: `${activity.color}15`, color: activity.color, border: `1px solid ${activity.color}25`, fontFamily: "Space Mono, monospace" }}>
                        {activity.role}
                      </span>
                    )}
                    <ul className="space-y-1.5 mt-2">
                      {activity.events.map((event, i) => (
                        <li key={i} className="text-sm flex items-start gap-2" style={{ color: t.fgMuted }}>
                          <span style={{ color: activity.color, marginTop: "0.2rem" }}>•</span>
                          <span>{event}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                {/* Photo or Carousel */}
                {activity.hasCarousel && activity.photos ? (
                  <div className="mt-auto">
                    {/* Main carousel */}
                    <div
                      className="rounded-xl overflow-hidden transition-all duration-300 relative"
                      style={{
                        border: `1px solid ${activity.color}25`,
                        boxShadow: `0 4px 20px ${activity.color}20`,
                      }}
                    >
                      {activity.photos.map((photo, i) => (
                        <div
                          key={i}
                          className="transition-all duration-700"
                          style={{
                            display: i === mcSlideIndex ? 'block' : 'none',
                            opacity: i === mcSlideIndex ? 1 : 0,
                          }}
                        >
                          <ImageWithFallback
                            src={photo}
                            alt={`${activity.category} - Photo ${i + 1}`}
                            className="w-full h-auto object-cover"
                            style={{ aspectRatio: "16/9" }}
                          />
                        </div>
                      ))}
                      
                      {/* Slide counter */}
                      <div
                        className="absolute bottom-3 right-4 text-xs font-mono px-2 py-1 rounded-full"
                        style={{ background: `${activity.color}90`, color: "#fff", fontFamily: "Space Mono, monospace" }}
                      >
                        {mcSlideIndex + 1} / {activity.photos.length}
                      </div>

                      {/* Navigation arrows */}
                      <button
                        onClick={() => goToMcSlide((mcSlideIndex - 1 + activity.photos.length) % activity.photos.length)}
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110"
                        style={{ background: `${activity.color}25`, backdropFilter: "blur(8px)", color: "#fff", border: `1px solid ${activity.color}40` }}
                      >
                        ‹
                      </button>
                      <button
                        onClick={() => goToMcSlide((mcSlideIndex + 1) % activity.photos.length)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110"
                        style={{ background: `${activity.color}25`, backdropFilter: "blur(8px)", color: "#fff", border: `1px solid ${activity.color}40` }}
                      >
                        ›
                      </button>
                    </div>

                    {/* Dot indicators */}
                    <div className="flex gap-2 justify-center mt-3">
                      {activity.photos.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => goToMcSlide(i)}
                          className="rounded-full transition-all duration-300"
                          style={{
                            width: i === mcSlideIndex ? 24 : 8,
                            height: 8,
                            background: i === mcSlideIndex ? activity.color : `${activity.color}35`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                ) : activity.photo ? (
                  <div
                    className="rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.01] mt-auto"
                    style={{
                      border: `1px solid ${activity.color}25`,
                      boxShadow: `0 4px 20px ${activity.color}20`,
                    }}
                  >
                    <ImageWithFallback
                      src={activity.photo}
                      alt={activity.category}
                      className="w-full h-auto object-cover"
                      style={{ aspectRatio: "16/9" }}
                    />
                  </div>
                ) : null}
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Main App ────────────────────────────────────────────────────────────────
export default function App() {
  const [isDark, setIsDark] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const t = isDark ? dark : light;
  const toggle = () => setIsDark(d => !d);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => setSent(false), 3000);
  };

  const getColor = (key: "primary" | "accent" | "purple" | "blue") => t[key];

  return (
    <ThemeCtx.Provider value={{ t, isDark, toggle }}>
      <div className="min-h-screen relative" style={{ background: t.bg, transition: "background 0.4s", fontFamily: "Poppins, sans-serif" }}>
        <StarField t={t} isDark={isDark} />

        {/* Ambient orbs */}
        <Orb className="w-96 h-96 top-10 left-[-6rem] opacity-25" bg={t.orbColor1} />
        <Orb className="w-80 h-80 top-40 right-[-4rem] opacity-20" bg={t.orbColor2} />
        <Orb className="w-72 h-72 top-[60%] left-[40%] opacity-15" bg={t.orbColor3} />

        <Nav />

        {/* ─── HERO ─── */}
        <section id="home" className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16">
          <div className="max-w-5xl w-full mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col gap-5">
              <p className="text-xs font-mono tracking-widest uppercase" style={{ color: t.primary, fontFamily: "Space Mono, monospace" }}>
                ✦ Hello, World!
              </p>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight" style={{ fontFamily: "Space Grotesk, sans-serif", color: t.fg }}>
                Hi, I&apos;m<br />
                <span style={{ backgroundImage: t.gradient, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", color: "transparent" }}>Tessalonika</span>
                <br />
                <span style={{ backgroundImage: t.gradient, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", color: "transparent" }}>Angeline Purba</span>
              </h1>

              <p className="text-xl md:text-2xl font-semibold tracking-wide" style={{ color: t.fgSub, fontFamily: "Space Grotesk, sans-serif" }}>
                Code.{" "}
                <span style={{ backgroundImage: t.gradient, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", color: "transparent" }}>Create.</span>{" "}
                Innovate.
              </p>

              <p className="text-base leading-relaxed" style={{ color: t.fgMuted }}>
                From web development and UI/UX design to video editing and music, I enjoy bringing creativity and technology together to build meaningful projects.
              </p>

              <div className="flex flex-wrap gap-3 mt-1">
                <SocialButton href="https://www.linkedin.com/in/tessalonika-angeline-purba-21bb29322/" icon={<Linkedin size={16} />} label="LinkedIn" color={t.accent} />
                <SocialButton href="https://www.instagram.com/angelaaaax__?igsh=Y2xrMjFlZngxYWth" icon={<Instagram size={16} />} label="Instagram" color={t.purple} />
                <SocialButton href="https://github.com/tessalonikapurba" icon={<Github size={16} />} label="GitHub" color={t.primary} />
              </div>

              <div className="flex gap-4 mt-1">
                <button
                  onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                  className="px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105"
                  style={{ background: t.gradient, color: "#fff", fontFamily: "Space Grotesk, sans-serif" }}
                >
                  View Projects
                </button>
                <button
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                  className="px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105"
                  style={{ background: `${t.primary}15`, color: t.primary, border: `1px solid ${t.primary}30`, fontFamily: "Space Grotesk, sans-serif" }}
                >
                  Contact Me
                </button>
              </div>
            </div>

            {/* Photo */}
            <div className="flex justify-center md:justify-end">
              <div className="relative">
                <div className="absolute inset-0 rounded-full opacity-40 blur-2xl scale-110"
                  style={{ background: `radial-gradient(circle, ${t.primary} 0%, ${t.accent} 50%, transparent 80%)` }} />
                <div className="absolute inset-[-16px] rounded-full opacity-20"
                  style={{ border: `1px solid ${t.primary}`, animation: "spin 20s linear infinite" }} />
                <div className="absolute inset-[-32px] rounded-full opacity-10"
                  style={{ border: `1px dashed ${t.accent}`, animation: "spin 30s linear infinite reverse" }} />
                <div className="relative w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden"
                  style={{ border: `2px solid ${t.primary}60`, boxShadow: `0 0 40px ${t.primary}40` }}>
                  <ImageWithFallback src={profilePhoto} alt="Tessalonika Angeline Purba" className="w-full h-full object-cover" />
                </div>
                <Star size={14} className="absolute top-2 right-[-8px]" style={{ color: t.primary, fill: t.primary }} />
                <Star size={10} className="absolute bottom-8 left-[-12px]" style={{ color: t.accent, fill: t.accent }} />
                <Star size={8} className="absolute top-1/2 right-[-20px]" style={{ color: t.purple, fill: t.purple }} />
              </div>
            </div>
          </div>
        </section>

        {/* ─── ABOUT ─── */}
        <section id="about" className="relative z-10 py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <p className="text-xs font-mono tracking-widest uppercase mb-2" style={{ color: t.primary, fontFamily: "Space Mono, monospace" }}>WHO AM I</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-12" style={{ fontFamily: "Space Grotesk, sans-serif", color: t.fg }}>About Me</h2>

            <div className="grid md:grid-cols-3 gap-6">
              <GlassCard className="md:col-span-2">
                <p className="text-base leading-relaxed mb-4" style={{ color: t.fgSub }}>
                  I&apos;m <strong style={{ color: t.fg }}>Tessalonika Angeline Purba</strong>, a Computer Science student with a strong interest in full-stack development and UI/UX design. I enjoy transforming ideas into digital experiences that are both functional and visually appealing.
                </p>
                <p className="text-base leading-relaxed mb-4" style={{ color: t.fgMuted }}>
                  Beyond technology, I have a passion for creativity through piano, video editing, and photo editing. These interests have helped me develop an eye for detail, visual storytelling, and user-centered thinking — skills that naturally complement my work as a developer.
                </p>
                <p className="text-base leading-relaxed" style={{ color: t.fgMuted }}>
                  I am continuously learning new technologies, exploring innovative solutions, and seeking opportunities to grow through meaningful projects and collaborations.
                </p>
              </GlassCard>

              <div className="flex flex-col gap-4">
                {[
                  { label: "Location", value: "Indonesia", icon: <MapPin size={16} />, colorKey: "primary" as const },
                  { label: "Focus", value: "Web & Mobile Dev", icon: <Star size={16} />, colorKey: "accent" as const },
                  { label: "Status", value: "Open to Opportunities", icon: <Mail size={16} />, colorKey: "purple" as const },
                ].map((item) => (
                  <GlassCard key={item.label} className="!p-4">
                    <div className="flex items-center gap-2 mb-1" style={{ color: getColor(item.colorKey) }}>
                      {item.icon}
                      <span className="text-xs font-mono uppercase tracking-wider" style={{ fontFamily: "Space Mono, monospace" }}>{item.label}</span>
                    </div>
                    <p className="text-sm font-medium" style={{ color: t.fg, fontFamily: "Space Grotesk, sans-serif" }}>{item.value}</p>
                  </GlassCard>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── EXPERIENCE ─── */}
        <ExperienceSection />

        {/* ─── CERTIFICATES ─── */}
        <section id="certificates" className="relative z-10 py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <p className="text-xs font-mono tracking-widest uppercase mb-2" style={{ color: t.primary, fontFamily: "Space Mono, monospace" }}>MY ACHIEVEMENTS</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-12" style={{ fontFamily: "Space Grotesk, sans-serif", color: t.fg }}>Certificates</h2>

            <div className="grid sm:grid-cols-2 gap-5">
              {[
                { src: certPufa, alt: "Certificate of Appreciation – Public Relation Internal CSGO 2025", label: "CSGO 2025 · Public Relation Internal" },
                { src: certPust, alt: "Certificate of Appreciation – Member of PR Internal Division, President University Sport Tournament 2025", label: "PUST 2025 · PR Internal Division" },
                { src: certAngel, alt: "Certificate of Appreciation – COMPSCIGALA 2025 PIC PR INTERNAL", label: "COMPSCIGALA 2025 · PIC PR INTERNAL" },
              ].map(({ src, alt, label }) => (
                <div key={label} className="group flex flex-col gap-3">
                  <div
                    className="rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02]"
                    style={{ border: `1px solid ${t.cardBorder}`, boxShadow: `0 4px 24px ${t.primary}18` }}
                  >
                    <ImageWithFallback src={src} alt={alt} className="w-full h-auto object-contain" />
                  </div>
                  <p className="text-xs font-mono text-center" style={{ color: t.fgMuted, fontFamily: "Space Mono, monospace" }}>{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── PROJECTS ─── */}
        <section id="projects" className="relative z-10 py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <p className="text-xs font-mono tracking-widest uppercase mb-2" style={{ color: t.primary, fontFamily: "Space Mono, monospace" }}>MY WORK</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-12" style={{ fontFamily: "Space Grotesk, sans-serif", color: t.fg }}>Projects</h2>

            <div className="flex flex-col items-center justify-center py-16">
              <GlassCard className="max-w-md text-center">
                <div className="flex flex-col items-center gap-6">
                  <div 
                    className="w-20 h-20 rounded-full flex items-center justify-center"
                    style={{ background: t.gradient, boxShadow: `0 0 30px ${t.primary}40` }}
                  >
                    <Star size={32} style={{ color: "#fff", fill: "#fff" }} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3" style={{ 
                      fontFamily: "Space Grotesk, sans-serif",
                      backgroundImage: t.gradient, 
                      WebkitBackgroundClip: "text", 
                      backgroundClip: "text", 
                      WebkitTextFillColor: "transparent", 
                      color: "transparent" 
                    }}>
                      Coming Soon
                    </h3>
                    <p className="text-base leading-relaxed" style={{ color: t.fgMuted }}>
                      Exciting projects are currently in development. Stay tuned for updates!
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {[t.primary, t.accent, t.purple].map((color, i) => (
                      <div 
                        key={i}
                        className="w-2 h-2 rounded-full animate-pulse"
                        style={{ 
                          background: color,
                          animationDelay: `${i * 0.2}s`,
                          boxShadow: `0 0 8px ${color}`
                        }}
                      />
                    ))}
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>
        </section>

        {/* ─── CONTACT ─── */}
        <section id="contact" className="relative z-10 py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <p className="text-xs font-mono tracking-widest uppercase mb-2" style={{ color: t.primary, fontFamily: "Space Mono, monospace" }}>LET&apos;S TALK</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "Space Grotesk, sans-serif", color: t.fg }}>Contact Me</h2>
            <p className="text-base mb-12" style={{ color: t.fgMuted }}>Have a project in mind or just want to say hi? My inbox is always open.</p>

            <div className="grid md:grid-cols-5 gap-8">
              <div className="md:col-span-2 flex flex-col gap-5">
                <GlassCard className="!p-5">
                  <div className="flex items-center gap-3 mb-2" style={{ color: t.primary }}>
                    <Mail size={18} />
                    <span className="text-xs font-mono uppercase tracking-wider" style={{ fontFamily: "Space Mono, monospace" }}>Email</span>
                  </div>
                  <p className="text-sm break-all" style={{ color: t.fgSub }}>angelinepurbat@gmail.com</p>
                </GlassCard>

                <GlassCard className="!p-5">
                  <div className="flex items-center gap-3 mb-2" style={{ color: t.accent }}>
                    <MapPin size={18} />
                    <span className="text-xs font-mono uppercase tracking-wider" style={{ fontFamily: "Space Mono, monospace" }}>Location</span>
                  </div>
                  <p className="text-sm" style={{ color: t.fgSub }}>Indonesia</p>
                </GlassCard>

                <div className="flex flex-col gap-3 mt-2">
                  <p className="text-xs font-mono uppercase tracking-wider" style={{ color: t.fgMuted, fontFamily: "Space Mono, monospace" }}>Find me on</p>
                  <div className="flex flex-col gap-2">
                    <SocialButton href="https://www.linkedin.com/in/tessalonika-angeline-purba-21bb29322/" icon={<Linkedin size={15} />} label="LinkedIn" color={t.accent} />
                    <SocialButton href="https://www.instagram.com/angelaaaax__?igsh=Y2xrMjFlZngxYWth" icon={<Instagram size={15} />} label="Instagram" color={t.purple} />
                    <SocialButton href="https://github.com/tessalonikapurba" icon={<Github size={15} />} label="GitHub" color={t.primary} />
                  </div>
                </div>
              </div>

              <div className="md:col-span-3">
                <GlassCard>
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      {(["name", "email"] as const).map((field) => (
                        <div key={field}>
                          <label className="block text-xs font-mono uppercase tracking-wider mb-2"
                            style={{ color: t.fgMuted, fontFamily: "Space Mono, monospace" }}>
                            {field === "name" ? "Name" : "Email"}
                          </label>
                          <input
                            type={field === "email" ? "email" : "text"}
                            required
                            value={formData[field]}
                            onChange={e => setFormData(p => ({ ...p, [field]: e.target.value }))}
                            placeholder={field === "name" ? "Your name" : "your@email.com"}
                            className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                            style={{ background: t.inputBg, border: `1px solid ${t.inputBorder}`, color: t.fg, fontFamily: "Poppins, sans-serif" }}
                            onFocus={e => { (e.target as HTMLInputElement).style.borderColor = t.inputBorderFocus; }}
                            onBlur={e => { (e.target as HTMLInputElement).style.borderColor = t.inputBorder; }}
                          />
                        </div>
                      ))}
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider mb-2"
                        style={{ color: t.fgMuted, fontFamily: "Space Mono, monospace" }}>Message</label>
                      <textarea
                        required
                        rows={5}
                        value={formData.message}
                        onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                        placeholder="Tell me about your project or idea..."
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all resize-none"
                        style={{ background: t.inputBg, border: `1px solid ${t.inputBorder}`, color: t.fg, fontFamily: "Poppins, sans-serif" }}
                        onFocus={e => { (e.target as HTMLTextAreaElement).style.borderColor = t.inputBorderFocus; }}
                        onBlur={e => { (e.target as HTMLTextAreaElement).style.borderColor = t.inputBorder; }}
                      />
                    </div>
                    <button
                      type="submit"
                      className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-[1.02]"
                      style={{ background: t.gradient, color: "#fff", fontFamily: "Space Grotesk, sans-serif" }}
                    >
                      {sent ? "Message Sent ✦" : <><Send size={16} /> Send Message</>}
                    </button>
                  </form>
                </GlassCard>
              </div>
            </div>
          </div>
        </section>

        {/* ─── FOOTER ─── */}
        <footer className="relative z-10 py-8 px-6 text-center" style={{ borderTop: `1px solid ${t.cardBorder}` }}>
          <p className="text-sm font-mono" style={{ color: t.fgMuted, fontFamily: "Space Mono, monospace" }}>
            © 2025 <span style={{ color: t.primary }}>Tessalonika Angeline Purba</span>
          </p>
        </footer>

        <style>{`
          @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
          ::-webkit-scrollbar { width: 6px; }
          ::-webkit-scrollbar-track { background: transparent; }
          ::-webkit-scrollbar-thumb { background: rgba(155,109,255,0.3); border-radius: 3px; }
          ::-webkit-scrollbar-thumb:hover { background: rgba(155,109,255,0.5); }
          html { scroll-behavior: smooth; }
        `}</style>
      </div>
    </ThemeCtx.Provider>
  );
}