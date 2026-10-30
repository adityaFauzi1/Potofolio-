/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  PROFILE_DATA,
  PROJECTS_DATA,
  SKILLS_CATEGORIES,
  EXPERIENCE_DATA,
  EDUCATION_DATA,
  ProjectItem,
} from './data/portfolioData';
import { ResilientImage } from './components/ResilientImage';
import { ProjectLightboxModal } from './components/ProjectLightboxModal';
import { CvDocumentModal } from './components/CvDocumentModal';
import { PortfolioArcShowcase } from './components/PortfolioArcShowcase';
import { PortfolioArcBackground } from './components/PortfolioArcBackground';
import { ScrollReveal } from './components/ScrollReveal';
import { InteractiveLanyardCard } from './components/InteractiveLanyardCard';
import {
  ArrowUpRight,
  Copy,
  Check,
  FileText,
  Send,
  Sun,
  Moon,
  Menu,
  X,
  Code2,
  Award,
  Globe,
} from 'lucide-react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'motion/react';

const HERO_ROTATING_BADGES = [
  'Fresh Graduate',
  'S1 Sistem Informasi',
  'Junior Programmer',
  'Happy Coding',
];

export default function App() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isCvModalOpen, setIsCvModalOpen] = useState<boolean>(false);
  const [activeUmlStage, setActiveUmlStage] = useState<number>(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState<'home' | 'about' | 'portfolio' | 'contact'>('home');

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem('aditya_portfolio_theme');
      // Default ke mode gelap (latar hitam) kecuali pengguna sebelumnya memilih 'light'.
      return stored === null ? true : stored === 'dark';
    } catch {
      return true;
    }
  });

  useEffect(() => {
    const rootEl = document.documentElement;
    if (isDarkMode) {
      rootEl.classList.add('dark');
    } else {
      rootEl.classList.remove('dark');
    }
    try {
      localStorage.setItem('aditya_portfolio_theme', isDarkMode ? 'dark' : 'light');
    } catch {
      // ignore
    }
  }, [isDarkMode]);

  const prefersReducedMotion = useReducedMotion();
  const heroSectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);

  // Typewriter profile identity text under the Web Developer headline
  const [heroPhraseIndex, setHeroPhraseIndex] = useState(0);
  const [heroTypedLength, setHeroTypedLength] = useState(0);
  const [heroIsDeleting, setHeroIsDeleting] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) {
      setHeroTypedLength(HERO_ROTATING_BADGES[0].length);
      return;
    }
    const currentPhrase = HERO_ROTATING_BADGES[heroPhraseIndex];
    let delay = heroIsDeleting ? 38 : 75;
    if (!heroIsDeleting && heroTypedLength === currentPhrase.length) {
      delay = 1800; // pause when full text is typed
    } else if (heroIsDeleting && heroTypedLength === 0) {
      delay = 350; // short pause before typing next phrase
    }
    const timeoutId = window.setTimeout(() => {
      if (!heroIsDeleting && heroTypedLength === currentPhrase.length) {
        setHeroIsDeleting(true);
      } else if (heroIsDeleting && heroTypedLength === 0) {
        setHeroIsDeleting(false);
        setHeroPhraseIndex((prev) => (prev + 1) % HERO_ROTATING_BADGES.length);
      } else if (heroIsDeleting) {
        setHeroTypedLength((prev) => Math.max(0, prev - 1));
      } else {
        setHeroTypedLength((prev) => Math.min(currentPhrase.length, prev + 1));
      }
    }, delay);
    return () => window.clearTimeout(timeoutId);
  }, [prefersReducedMotion, heroPhraseIndex, heroTypedLength, heroIsDeleting]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScrollSpy = () => {
      const scrollY = window.scrollY + 200;
      const contactEl = document.getElementById('kontak');
      const portfolioEl = document.getElementById('proyek');
      const aboutEl = document.getElementById('about');

      if (contactEl && scrollY >= contactEl.offsetTop) {
        setActiveNav('contact');
      } else if (portfolioEl && scrollY >= portfolioEl.offsetTop) {
        setActiveNav('portfolio');
      } else if (aboutEl && scrollY >= aboutEl.offsetTop) {
        setActiveNav('about');
      } else {
        setActiveNav('home');
      }
    };

    window.addEventListener('scroll', handleScrollSpy, { passive: true });
    handleScrollSpy();
    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  // Global page scroll progress bar
  const { scrollYProgress } = useScroll();
  const smoothScrollProgress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 28,
    restDelta: 0.001,
  });

  // Contact copy states
  const [copiedField, setCopiedField] = useState<'email' | 'phone' | null>(null);

  // Interactive Contact Form state
  const [senderName, setSenderName] = useState('');
  const [senderCompany, setSenderCompany] = useState('');
  const [inquiryTopic, setInquiryTopic] = useState('Rekrutmen Full-Time Web Developer');
  const [inquiryMessage, setInquiryMessage] = useState(
    'Halo Aditya, kami tertarik dengan portofolio Sistem Informasi Inventory berbasis PHP CodeIgniter & MySQL yang Anda kembangkan.'
  );
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const handleCopy = (text: string, field: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
    const subject = encodeURIComponent(
      `[${inquiryTopic}] Pesan dari ${senderName || 'Rekruter'} ${
        senderCompany ? `- ${senderCompany}` : ''
      }`
    );
    const body = encodeURIComponent(
      `${inquiryMessage}\n\n---\nPengirim: ${senderName || '-'}\nPerusahaan/Instansi: ${
        senderCompany || '-'
      }`
    );
    window.location.href = `mailto:${PROFILE_DATA.email}?subject=${subject}&body=${body}`;
  };

  const umlMethodologySteps = [
    {
      step: '01',
      title: 'Requirement Gathering & Analisis Kebutuhan',
      artifact: 'Observasi Lapangan & Wawancara Pengguna',
      detail:
        'Mengidentifikasi kendala pencatatan stok manual berbasis buku di UD. Jaya Lestari dan kebutuhan rekonsiliasi data produksi harian hingga akurasi 98% pada lingkungan industri.',
    },
    {
      step: '02',
      title: 'Pemodelan UML (Use Case, Activity, Sequence, Class)',
      artifact: '4 Diagram Standar UML 2.5',
      detail:
        'Memetakan hak akses dua tingkat (Administrator & Admin Gudang), alur prosedur barang masuk/keluar/retur, interaksi MVC Controller-Model, serta struktur kelas dan tabel relasional.',
    },
    {
      step: '03',
      title: 'Implementasi Prototype PHP CodeIgniter & MySQL',
      artifact: 'VSCode · CodeIgniter MVC · XAMPP Web Server',
      detail:
        'Membangun modul pengelolaan master barang, supplier, transaksi masuk/keluar terintegrasi, stock opname, pencetakan surat jalan, serta pelaporan stok otomatis secara real-time.',
    },
    {
      step: '04',
      title: 'Pengujian Fungsional Black Box Testing',
      artifact: 'Equivalence Partitioning & Boundary Value Validation',
      detail:
        'Menguji setiap modul terhadap skenario input valid dan tidak valid (seperti penolakan otomatis saat pengeluaran barang melebihi saldo stok yang tersedia).',
    },
  ];

  return (
    <div className="min-h-screen page-bg text-[#111111] flex flex-col">
      {/* Smooth Top Scroll Progress Indicator */}
      <motion.div
        style={{ scaleX: smoothScrollProgress, transformOrigin: '0% 50%' }}
        className="no-print fixed top-0 left-0 right-0 z-50 h-[3px] bg-gradient-to-r from-[#2563EB] via-[#E11D48] to-[#141414]"
      />

      {/* =====================================================================
          FLOATING DARK GLASSMORPHIC NAVIGATION BAR (Matching Reference Video)
          Left: Monospace "aditya.dev" | Right: Home, About, Portfolio, Contact + Active Underline
      ====================================================================== */}
      <header
        ref={headerRef}
        className="no-print sticky top-3 z-40 px-4 sm:px-8 pt-2"
      >
        <div className="relative max-w-[1360px] mx-auto h-14 sm:h-16 px-5 sm:px-8 rounded-2xl bg-[#0D0F14]/88 backdrop-blur-md border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.28)] flex items-center justify-between gap-4 text-white">
          {/* Left: Monospace Brand Identity ("aditya.dev" matching "rifqi.dev" in video) */}
          <a
            href="#beranda"
            onClick={() => setActiveNav('home')}
            className="font-mono-tabular text-sm sm:text-base font-medium tracking-tight text-white/90 hover:text-white transition-colors shrink-0"
          >
            aditya.dev
          </a>

          {/* Right: Monospace Nav Links + Theme Toggle + Mobile Hamburger */}
          <div className="flex items-center gap-4 sm:gap-7">
            <nav
              aria-label="Navigasi Utama"
              className="hidden md:flex items-center gap-7 font-mono-tabular text-xs sm:text-sm"
            >
              {[
                { id: 'home' as const, label: 'Home', href: '#beranda' },
                { id: 'about' as const, label: 'About', href: '#about' },
                { id: 'portfolio' as const, label: 'Portfolio', href: '#proyek' },
                { id: 'contact' as const, label: 'Contact', href: '#kontak' },
              ].map((item) => {
                const isActive = activeNav === item.id;
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={() => setActiveNav(item.id)}
                    className={`relative py-1.5 transition-colors ${
                      isActive
                        ? 'text-white font-semibold'
                        : 'text-white/55 hover:text-white/90'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <motion.span
                        layoutId="navbar-active-underline"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        className="absolute left-0 right-0 -bottom-0.5 h-[2px] bg-white rounded-full"
                      />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* Subtle Divider + Theme Toggle + Mobile Hamburger */}
            <div className="flex items-center gap-2 sm:gap-2.5 pl-1 md:border-l md:border-white/12 md:pl-4">
              <button
                type="button"
                onClick={() => setIsDarkMode((prev) => !prev)}
                aria-label={isDarkMode ? 'Aktifkan Mode Terang' : 'Aktifkan Mode Gelap'}
                title={isDarkMode ? 'Beralih ke Mode Terang' : 'Beralih ke Mode Gelap'}
                className="w-9 h-9 inline-flex items-center justify-center rounded-lg border border-white/12 bg-white/5 text-white/85 hover:bg-white/12 hover:text-white transition-colors cursor-pointer"
              >
                {isDarkMode ? (
                  <Sun className="w-4 h-4 text-amber-400" />
                ) : (
                  <Moon className="w-4 h-4 text-sky-400" />
                )}
              </button>

              <button
                type="button"
                onClick={() => setIsMenuOpen((prev) => !prev)}
                aria-label={isMenuOpen ? 'Tutup Menu' : 'Buka Menu'}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
                className="md:hidden w-10 h-10 inline-flex items-center justify-center rounded-lg border border-white/12 bg-white/5 text-white hover:bg-white/12 transition-colors cursor-pointer"
              >
                {isMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Dropdown Navigation Panel */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.nav
                id="mobile-menu"
                aria-label="Navigasi Mobile"
                initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? { opacity: 0, y: 0 } : { opacity: 0, y: -8 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.2, ease: 'easeOut' }}
                className="md:hidden absolute top-full left-0 right-0 mt-2 rounded-2xl bg-[#0D0F14]/95 backdrop-blur-md border border-white/12 shadow-2xl px-6 py-2 flex flex-col font-mono-tabular"
              >
                {[
                  { id: 'home' as const, label: 'Home', href: '#beranda' },
                  { id: 'about' as const, label: 'About', href: '#about' },
                  { id: 'portfolio' as const, label: 'Portfolio', href: '#proyek' },
                  { id: 'contact' as const, label: 'Contact', href: '#kontak' },
                ].map((item) => {
                  const isActive = activeNav === item.id;
                  return (
                    <a
                      key={item.id}
                      href={item.href}
                      onClick={() => {
                        setActiveNav(item.id);
                        setIsMenuOpen(false);
                      }}
                      className={`min-h-[48px] flex items-center justify-between text-sm border-b border-white/10 transition-colors ${
                        isActive ? 'text-white font-semibold' : 'text-white/65 hover:text-white'
                      }`}
                    >
                      <span>{item.label}</span>
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-white" />
                      )}
                    </a>
                  );
                })}
                <button
                  type="button"
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsCvModalOpen(true);
                  }}
                  className="min-h-[48px] w-full flex items-center text-left text-sm text-white/75 hover:text-white transition-colors cursor-pointer"
                >
                  Dokumen CV
                </button>
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </header>

      <main className="flex-1">
        {/* =====================================================================
            HERO SECTION (HOME): Matching Reference Video (0:04 - 0:10)
            Left: Developer Typography + Terminal Prompts
            Right: Interactive Swinging Digital ID Card Lanyard
        ====================================================================== */}
        <section
          ref={heroSectionRef}
          id="beranda"
          className="relative bg-black text-white border-b border-white/10 pt-4 sm:pt-6 pb-14 px-4 sm:px-8 overflow-hidden min-h-[calc(100vh-76px)] flex flex-col justify-between"
        >
          {/* Architectural Dark Grid Pattern Overlay Matching Video */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.075]"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(255,255,255,0.55) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.55) 1px, transparent 1px)',
              backgroundSize: '36px 36px',
            }}
            aria-hidden="true"
          />

          {/* Subtle ambient radial vignette */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(circle at 22% 40%, rgba(255,255,255,0.05) 0%, transparent 55%)',
            }}
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-[1200px] w-full mx-auto my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Column: Typography + Terminal Prompts (7 cols) */}
            <div className="lg:col-span-7 pt-6 lg:pt-4">
              {/* Status Indicator: • AVAILABLE FOR WORK */}
              <div className="inline-flex items-center gap-2.5 text-[11px] sm:text-xs font-mono-tabular tracking-[0.22em] uppercase text-white mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.9)]" />
                <span className="text-white">AVAILABLE FOR WORK</span>
              </div>

              {/* Stacked Display Headline Matching Video */}
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-[-0.03em] leading-[1.03] text-white">
                <span className="block text-white">Web</span>
                <span className="block text-white mt-1">Developer</span>
              </h1>

              {/* Typewriter profile identity text under Web Developer headline */}
              <div className="mt-5 flex min-h-[34px] items-center">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.06] px-3.5 py-1.5 font-mono-tabular text-[11px] sm:text-xs tracking-wide text-white">
                  <span className="text-emerald-300">&gt;_</span>
                  <span aria-live="polite">
                    {HERO_ROTATING_BADGES[heroPhraseIndex].slice(0, heroTypedLength)}
                  </span>
                  <motion.span
                    aria-hidden="true"
                    className="inline-block h-[14px] w-[2px] bg-emerald-300"
                    animate={prefersReducedMotion ? { opacity: 1 } : { opacity: [1, 0, 1] }}
                    transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.9, repeat: Infinity, ease: 'linear' }}
                  />
                </span>
              </div>

              {/* Terminal Prompt Lines (> explore my work below / > open to full-time & freelance opportunities) */}
              <div className="mt-7 space-y-1.5 font-mono-tabular text-xs text-white">
                <div className="flex items-center gap-2">
                  <span className="text-white">&gt;</span>
                  <a
                    href="#proyek"
                    onClick={() => setActiveNav('portfolio')}
                    className="text-white hover:underline transition-colors"
                  >
                    explore my work below
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-white">&gt;</span>
                  <span className="text-white">open to full-time &amp; freelance opportunities</span>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Hanging Digital ID Card Lanyard (5 cols) */}
            <div className="lg:col-span-5 flex justify-center items-start -mt-6 lg:-mt-10">
              <InteractiveLanyardCard />
            </div>
          </div>

          {/* Bottom Centered SCROLL ↓ Indicator Matching Video */}
          <div className="relative z-10 mt-6 flex justify-center">
            <a
              href="#about"
              onClick={() => setActiveNav('about')}
              className="inline-flex items-center gap-2 text-[11px] font-mono-tabular tracking-[0.25em] uppercase text-white hover:opacity-85 transition-opacity"
            >
              <span className="text-white">SCROLL</span>
              <span className="animate-bounce text-white">↓</span>
            </a>
          </div>
        </section>

        {/* =====================================================================
            ABOUT ME SECTION: Matching Reference Video (0:11 - 0:18)
        ====================================================================== */}
        <section
          id="about"
          className="relative bg-black text-white border-b border-white/10 py-16 sm:py-24 px-4 sm:px-8 overflow-hidden"
        >
          {/* Subtle architectural grid background matching reference video */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.5) 1px, transparent 1px)',
              backgroundSize: '36px 36px',
            }}
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-[1200px] mx-auto">
            {/* Top Split: Left Bio + Quote + Buttons | Right Circular Portrait */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              {/* Left Column (7 cols) */}
              <ScrollReveal direction="up" distance={28} className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 text-xs font-mono-tabular tracking-[0.2em] uppercase text-white mb-3">
                  <span className="text-white">ABOUT ME</span>
                </div>

                <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.06] text-white">
                  <span className="block text-white">Aditya</span>
                  <span className="block text-white">Fauzi</span>
                </h2>

                <p className="mt-5 text-sm sm:text-[15px] text-white leading-relaxed max-w-2xl">
                  {PROFILE_DATA.summary}
                </p>

                {/* Quote Pill Box from Video */}
                <div className="mt-6 px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 text-xs sm:text-sm italic text-white font-mono-tabular">
                  &ldquo;Turning user requirements into clean, structured, and reliable web information systems.&rdquo;
                </div>

                {/* Action Buttons: Download CV & View Projects (Identical Styling Blended with Background) */}
                <div className="mt-7 flex flex-wrap items-center gap-3.5">
                  <button
                    type="button"
                    onClick={() => setIsCvModalOpen(true)}
                    className="about-action-tab inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer"
                  >
                    <FileText className="w-4 h-4 shrink-0" />
                    <span>Lihat CV</span>
                  </button>

                  <a
                    href="#proyek"
                    onClick={() => setActiveNav('portfolio')}
                    className="about-action-tab inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer"
                  >
                    <Code2 className="w-4 h-4 shrink-0" />
                    <span>View Projects</span>
                  </a>
                </div>
              </ScrollReveal>

              {/* Right Column: Circular Portrait Avatar with Subtle Glow (5 cols) */}
              <ScrollReveal
                direction="up"
                distance={32}
                delay={0.1}
                className="lg:col-span-5 flex justify-center lg:justify-end"
              >
                <div className="relative w-64 h-64 sm:w-76 sm:h-76 md:w-84 md:h-84 rounded-full p-1.5 bg-gradient-to-b from-white/20 via-white/5 to-transparent shadow-[0_24px_60px_rgba(0,0,0,0.65)]">
                  <div className="relative w-full h-full rounded-full overflow-hidden bg-gradient-to-b from-[#1E2433] to-[#0D0F14] border border-white/10 flex items-end justify-center">
                    <ResilientImage
                      src={PROFILE_DATA.portraitImage}
                      alt="Aditya Fauzi — About Me Portrait"
                      fallbackTitle="Aditya Fauzi"
                      className="w-[92%] h-[94%] object-contain object-bottom select-none pointer-events-none drop-shadow-[0_12px_24px_rgba(0,0,0,0.5)]"
                    />
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Bottom 3 Stat Cards Matching Video (PROJECTS, GPA / ACADEMIC, COMPLETED WORKS) */}
            <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
              {[
                {
                  icon: Code2,
                  count: String(PROJECTS_DATA.length),
                  title: 'PROJECTS',
                  subtitle: 'Web Information Systems & Database Solutions',
                  href: '#proyek',
                },
                {
                  icon: Award,
                  count: '3.40',
                  title: 'IPK / S1 SISTEM INFORMASI',
                  subtitle: 'Universitas Insan Pembangunan Indonesia (NPM 2022804042)',
                  href: '#pendidikan',
                },
                {
                  icon: Globe,
                  count: String(EXPERIENCE_DATA.length),
                  title: 'COMPLETED WORKS',
                  subtitle: 'PT Wilson Surya Unggul · UD. Jaya Lestari · HIMASI',
                  href: '#pengalaman',
                },
              ].map((stat, idx) => {
                const IconComponent = stat.icon;
                return (
                  <ScrollReveal
                    key={stat.title}
                    direction="up"
                    distance={24}
                    delay={idx * 0.08}
                  >
                    <a
                      href={stat.href}
                      className="group block p-5 sm:p-6 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/12 hover:border-white/25 transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <div className="w-10 h-10 rounded-full bg-white/[0.08] border border-white/15 flex items-center justify-center text-white group-hover:scale-105 transition-transform">
                          <IconComponent className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-2xl sm:text-3xl font-extrabold font-mono-tabular text-white">
                          {stat.count}
                        </span>
                      </div>

                      <div className="mt-5 flex items-end justify-between gap-2">
                        <div>
                          <div className="text-xs font-mono-tabular font-bold tracking-wider uppercase text-white">
                            {stat.title}
                          </div>
                          <div className="text-[11px] text-white mt-1 leading-snug">
                            {stat.subtitle}
                          </div>
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                      </div>
                    </a>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* =====================================================================
            EDITORIAL MARQUEE RIBBON DIVIDER
        ====================================================================== */}
        <div
          className="border-y border-[#111111]/12 bg-[#EAEAE4] py-3.5 overflow-hidden select-none"
          aria-hidden="true"
        >
          <div className="animate-marquee flex items-center gap-8 text-xs font-mono-tabular text-[#111111]/70">
            {[...Array(2)].map((_, groupIdx) => (
              <div key={groupIdx} className="flex items-center gap-8 shrink-0">
                <span>sistem informasi inventory berbasis web</span>
                <span>·</span>
                <span>php & framework codeigniter</span>
                <span>·</span>
                <span>mysql relational database</span>
                <span>·</span>
                <span>metode pengembangan prototype</span>
                <span>·</span>
                <span>pemodelan uml (use case, activity, sequence, class diagram)</span>
                <span>·</span>
                <span>pengujian black box testing</span>
                <span>·</span>
                <span>akurasi data fisik & erp 98%</span>
                <span>·</span>
              </div>
            ))}
          </div>
        </div>

        {/* =====================================================================
            PROYEK PERANCANGAN & PENGEMBANGAN WEB (Kinetic Wave & Rotating Arc Fan)
        ====================================================================== */}
        {/* Backdrop kontinu mengalir dari Showcase (#proyek) → Keahlian → Kontak
            ("Mari Berdiskusi untuk Kebutuhan Sistem Informasi Anda"). */}
        <div className="arc-region">
          <PortfolioArcBackground />

          <PortfolioArcShowcase
            customPortrait={null}
            onSelectProject={(proj) => setSelectedProject(proj)}
            onOpenCvModal={() => setIsCvModalOpen(true)}
          />

        {/* =====================================================================
            KEMAMPUAN TEKNIS
        ====================================================================== */}
        <section
          id="keahlian"
          className="max-w-[1360px] mx-auto px-6 py-16 md:py-24 border-b border-[#111111]/10"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left: 4 Competency Pillars from CV (7 cols) */}
            <div className="lg:col-span-7">
              <ScrollReveal direction="up" distance={24}>
                <div className="text-xs font-mono-tabular text-[#2563EB] font-semibold">
                  03. Kompetensi & Kualifikasi Teknis
                </div>
                <h2
                  className="text-2xl sm:text-4xl font-bold tracking-tight text-[#111111] mt-1"
                  style={{ textWrap: 'balance' }}
                >
                  KEMAMPUAN TEKNIS
                </h2>
                <p className="text-sm text-[#111111]/70 mt-2 max-w-xl">
                  Mengembangkan aplikasi web dengan PHP, CodeIgniter & Laravel, mengelola dan menyimpan data dengan MySQL, menggunakan VS Code dan XAMPP untuk mengembangkan serta menguji aplikasi berbasis web, merancang sistem dengan Prototype & UML, menguji fungsionalitas dengan Black Box Testing, dan mengidentifikasi kebutuhan sistem melalui Requirement Gathering.
                </p>
              </ScrollReveal>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
                {SKILLS_CATEGORIES.map((cat, idx) => (
                  <ScrollReveal
                    key={cat.index}
                    direction="up"
                    distance={30}
                    delay={idx * 0.09}
                    className="h-full"
                  >
                    <div className="h-full p-6 bg-white border border-[#111111]/12 rounded-2xl flex flex-col justify-between">
                      <div>
                        <div className="text-xs font-mono-tabular text-[#2563EB] font-semibold">
                          Bidang {cat.index}
                        </div>
                        <h3 className="text-lg font-bold text-[#111111] mt-1">
                          {cat.title}
                        </h3>
                        <p className="text-xs text-[#111111]/70 mt-2 leading-relaxed">
                          {cat.description}
                        </p>
                      </div>

                      <div className="mt-5 pt-4 border-t border-[#111111]/10 text-xs font-mono-tabular font-semibold text-[#111111]">
                        {cat.items.join(' · ')}
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>

            {/* Right: Interactive Prototype & UML Engineering Lifecycle (5 cols) */}
            <ScrollReveal
              direction="left"
              distance={36}
              delay={0.15}
              className="lg:col-span-5"
            >
              <div className="bg-[#111111] text-[#F4F4F0] rounded-2xl p-6 md:p-8 h-full flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono-tabular text-white/60">
                    Alur Kerja Analisis & Pengembangan Sistem
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mt-1">
                    Siklus Metode Prototype & Pemodelan UML
                  </h3>
                  <p className="text-xs text-white/70 mt-2 leading-relaxed">
                    Pilih tahapan di bawah untuk melihat bagaimana kebutuhan pengguna diterjemahkan menjadi solusi perangkat lunak yang teruji.
                  </p>

                  <div className="mt-6 space-y-2.5">
                    {umlMethodologySteps.map((item, index) => {
                      const isActive = activeUmlStage === index;
                      return (
                        <button
                          key={item.step}
                          type="button"
                          onClick={() => setActiveUmlStage(index)}
                          className={`w-full text-left p-4 rounded-xl border transition-colors cursor-pointer ${
                            isActive
                              ? 'bg-[#2563EB] border-[#2563EB] text-white'
                              : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10'
                          }`}
                        >
                          <div className="flex items-center justify-between text-xs font-mono-tabular">
                            <span>Tahap {item.step}</span>
                            <span className={isActive ? 'text-white/90' : 'text-white/50'}>
                              {item.artifact}
                            </span>
                          </div>
                          <div className="text-sm font-semibold mt-1">
                            {item.title}
                          </div>
                          {isActive && (
                            <p className="text-xs text-white/90 mt-2 leading-relaxed border-t border-white/20 pt-2">
                              {item.detail}
                            </p>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/15 flex items-center justify-between text-xs font-mono-tabular text-white/65">
                  <span>Tools: Visual Studio Code · XAMPP</span>
                  <span>Target: 100% Lulus Black Box</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* =====================================================================
            PENGALAMAN KERJA, ORGANISASI & PENDIDIKAN AKADEMIK
        ====================================================================== */}
        <section
          id="pengalaman"
          className="max-w-[1360px] mx-auto px-6 py-16 md:py-24 border-b border-[#111111]/10"
        >
          <ScrollReveal direction="up" distance={24} className="mb-10">
            <div className="text-xs font-mono-tabular text-[#2563EB] font-semibold">
              04. Rekam Jejak Industri, Organisasi & Akademik
            </div>
            <h2
              className="text-2xl sm:text-4xl font-bold tracking-tight text-[#111111] mt-1"
              style={{ textWrap: 'balance' }}
            >
              Pengalaman Kerja, Organisasi & Pendidikan
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Pengalaman Kerja & Organisasi (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {EXPERIENCE_DATA.map((exp, idx) => (
                <ScrollReveal
                  key={exp.id}
                  direction="up"
                  distance={32}
                  delay={idx * 0.12}
                >
                  <article className="p-6 md:p-8 bg-white border border-[#111111]/12 rounded-2xl">
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono-tabular text-[#111111]/60">
                      <span>
                        0{idx + 1}. {exp.type}
                      </span>
                      <span>{exp.period}</span>
                    </div>

                    <h3 className="text-xl font-bold text-[#111111] mt-2">
                      {exp.role}
                    </h3>
                    <div className="text-sm font-semibold text-[#2563EB] mt-0.5">
                      {exp.organization} · {exp.metricHighlight}
                    </div>

                    <p className="mt-3 text-sm text-[#111111]/80 leading-relaxed">
                      {exp.summary}
                    </p>

                    <div className="mt-4 pt-4 border-t border-[#111111]/10 space-y-2">
                      {exp.responsibilities.map((resp, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2.5 text-xs text-[#111111]/85"
                        >
                          <span className="font-mono-tabular font-semibold text-[#2563EB] shrink-0">
                            ·
                          </span>
                          <span className="leading-relaxed">{resp}</span>
                        </div>
                      ))}
                    </div>
                  </article>
                </ScrollReveal>
              ))}
            </div>

            {/* Pendidikan & Tugas Akhir Skripsi (5 cols) */}
            <ScrollReveal
              direction="left"
              distance={36}
              delay={0.15}
              className="lg:col-span-5"
            >
              <div className="p-6 md:p-8 bg-[#EAEAE4] border border-[#111111]/15 rounded-2xl h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs font-mono-tabular text-[#111111]/65">
                    <span>Pendidikan Tinggi</span>
                    <span>{EDUCATION_DATA.period}</span>
                  </div>

                  <h3 className="text-2xl font-bold text-[#111111] mt-2">
                    {EDUCATION_DATA.major}
                  </h3>
                  <p className="text-sm font-semibold text-[#111111]/80 mt-1">
                    {EDUCATION_DATA.university}
                  </p>
                  <p className="text-xs font-mono-tabular text-[#111111]/60 mt-0.5">
                    {EDUCATION_DATA.location}
                  </p>

                  {/* GPA Proof */}
                  <div className="my-6 p-5 bg-white border border-[#111111]/10 rounded-xl flex items-center justify-between">
                    <div>
                      <div className="text-xs text-[#111111]/60">
                        Indeks Prestasi Kumulatif (IPK)
                      </div>
                      <div className="text-2xl font-bold font-mono-tabular text-[#111111] mt-0.5">
                        {EDUCATION_DATA.gpa}
                      </div>
                    </div>
                    <div className="text-right text-xs font-mono-tabular text-[#2563EB] font-semibold">
                      Lulusan Sistem Informasi
                    </div>
                  </div>

                  {/* Fokus Studi */}
                  <div className="mb-6">
                    <div className="text-xs font-semibold text-[#111111]/70 mb-2">
                      Fokus Studi Utama
                    </div>
                    <div className="text-xs font-mono-tabular text-[#111111] leading-relaxed">
                      {EDUCATION_DATA.focusAreas.join(' · ')}
                    </div>
                  </div>

                  {/* Riwayat Pendidikan Sebelumnya dari Lampiran Biodata Skripsi */}
                  <div className="mt-4 pt-4 border-t border-[#111111]/10 text-xs text-[#111111]/75">
                    <span className="font-semibold text-[#111111]">Riwayat Pendidikan: </span>
                    <span>{EDUCATION_DATA.priorSchools.join(' · ')}</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#111111]/10 flex items-center justify-between">
                  <span className="text-xs text-[#111111]/65">
                    Ingin melihat format CV standar?
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsCvModalOpen(true)}
                    className="text-xs font-semibold text-[#2563EB] hover:underline cursor-pointer"
                  >
                    Buka Lembar CV Resmi →
                  </button>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* =====================================================================
            KONTAK & KOLABORASI
        ====================================================================== */}
        <section id="kontak" className="max-w-[1360px] mx-auto px-6 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Contact Info & Direct Copy Actions (5 cols) */}
            <ScrollReveal direction="right" distance={32} className="lg:col-span-5">
              <div className="text-xs font-mono-tabular text-[#2563EB] font-semibold">
                05. Kontak & Kesempatan Karir
              </div>
              <h2
                className="text-2xl sm:text-4xl font-bold tracking-tight text-[#111111] mt-1"
                style={{ textWrap: 'balance' }}
              >
                Mari Berdiskusi untuk Kebutuhan Sistem Informasi Anda
              </h2>
              <p className="text-sm text-[#111111]/75 mt-3 leading-relaxed">
                Saya terbuka untuk peluang karir Full-Time, Kontrak di wilayah Tangerang, Jabodetabek, atau Remote.
              </p>

              <div className="mt-8 space-y-4">
                {/* Email Card */}
                <div className="p-5 bg-white border border-[#111111]/12 rounded-xl flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <div className="text-xs text-[#111111]/60">Alamat Email Resmi</div>
                    <div className="text-sm font-mono-tabular font-semibold text-[#111111] truncate mt-0.5">
                      {PROFILE_DATA.email}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(PROFILE_DATA.email, 'email')}
                    className="px-3.5 py-2 text-xs font-semibold bg-[#EAEAE4] hover:bg-[#111111] hover:text-white text-[#111111] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5"
                  >
                    {copiedField === 'email' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Tersalin</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Salin Email</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Telepon / WhatsApp Card */}
                <div className="p-5 bg-white border border-[#111111]/12 rounded-xl flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <div className="text-xs text-[#111111]/60">
                      Telepon / WhatsApp ({PROFILE_DATA.location})
                    </div>
                    <div className="text-sm font-mono-tabular font-semibold text-[#111111] mt-0.5">
                      {PROFILE_DATA.phone}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(PROFILE_DATA.phone, 'phone')}
                    className="px-3.5 py-2 text-xs font-semibold bg-[#EAEAE4] hover:bg-[#111111] hover:text-white text-[#111111] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5"
                  >
                    {copiedField === 'phone' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Tersalin</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Salin Nomor</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </ScrollReveal>

            {/* Right Interactive Inquiry Composer (7 cols) */}
            <ScrollReveal
              direction="left"
              distance={32}
              delay={0.12}
              className="lg:col-span-7"
            >
              <form
                onSubmit={handleContactSubmit}
                className="bg-white border border-[#111111]/15 rounded-2xl p-6 md:p-8"
              >
                <div className="flex items-center justify-between border-b border-[#111111]/10 pb-4 mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-[#111111]">
                      Kirim Pesan / Undangan Wawancara
                    </h3>
                    <p className="text-xs text-[#111111]/65 mt-0.5">
                      Formulir ini menyiapkan email terstruktur langsung ke {PROFILE_DATA.email}
                    </p>
                  </div>
                  <span className="text-xs font-mono-tabular text-[#2563EB] font-semibold">
                    Respon Cepat
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-semibold text-[#111111]/80 mb-1.5"
                    >
                      Nama Anda
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      placeholder="Contoh: Budi Santoso"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-[#F4F4F0] border border-[#111111]/20 rounded-lg text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-company"
                      className="block text-xs font-semibold text-[#111111]/80 mb-1.5"
                    >
                      Perusahaan / Instansi
                    </label>
                    <input
                      id="contact-company"
                      type="text"
                      placeholder="Contoh: PT Maju Bersama"
                      value={senderCompany}
                      onChange={(e) => setSenderCompany(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-[#F4F4F0] border border-[#111111]/20 rounded-lg text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="contact-topic"
                    className="block text-xs font-semibold text-[#111111]/80 mb-1.5"
                  >
                    Keperluan Diskusi
                  </label>
                  <select
                    id="contact-topic"
                    value={inquiryTopic}
                    onChange={(e) => setInquiryTopic(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-[#F4F4F0] border border-[#111111]/20 rounded-lg text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                  >
                    <option value="Rekrutmen Full-Time Web Developer">
                      Rekrutmen Full-Time Web Developer (PHP CodeIgniter / MySQL)
                    </option>
                    <option value="Posisi System Analyst / QA Tester">
                      Posisi System Analyst (UML) / QA Black Box Tester
                    </option>
                    <option value="Posisi Admin ERP & Produksi">
                      Posisi Pengelolaan Data Produksi & Rekonsiliasi ERP
                    </option>
                    <option value="Proyek Pengembangan Sistem Informasi Web">
                      Proyek Pengembangan Sistem Informasi Inventory / Gudang
                    </option>
                  </select>
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-semibold text-[#111111]/80 mb-1.5"
                  >
                    Pesan Singkat
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    required
                    value={inquiryMessage}
                    onChange={(e) => setInquiryMessage(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-[#F4F4F0] border border-[#111111]/20 rounded-lg text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                  />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <Send className="w-4 h-4" />
                    <span>Kirim Pesan via Email</span>
                  </button>

                  {contactSubmitted && (
                    <span className="text-xs font-mono-tabular text-emerald-800 font-semibold">
                      Aplikasi email Anda telah dibuka untuk mengirim pesan ke Aditya Fauzi.
                    </span>
                  )}
                </div>
              </form>
            </ScrollReveal>
          </div>
        </section>
        </div>
      </main>

      {/* =====================================================================
          CLEAN FOOTER (Quiet copyright, navigation, and real user actions)
      ====================================================================== */}
      <footer className="no-print border-t border-[#111111]/12 bg-[#EAEAE4] py-8">
        <div className="max-w-[1360px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#111111]/70">
          <div>
            <span className="font-semibold text-[#111111]">Aditya Fauzi</span>
            <span className="mx-2" aria-hidden="true">·</span>
            <span>Web Developer (PHP CodeIgniter & MySQL)</span>
            <span className="mx-2" aria-hidden="true">·</span>
            <span>Tangerang, Banten</span>
          </div>
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => setIsCvModalOpen(true)}
              className="hover:text-[#111111] underline underline-offset-4 cursor-pointer"
            >
              Cetak CV
            </button>
            <a href="#proyek" className="hover:text-[#111111]">
              Proyek
            </a>
            <a href="#kontak" className="hover:text-[#111111]">
              Kontak
            </a>
          </div>
        </div>
      </footer>

      {/* =====================================================================
          MODALS: Fullscreen Project Case Study Lightbox & Printable CV Sheet
      ====================================================================== */}
      <ProjectLightboxModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onSelectProject={(proj) => setSelectedProject(proj)}
        allProjects={PROJECTS_DATA}
      />

      <CvDocumentModal
        isOpen={isCvModalOpen}
        onClose={() => setIsCvModalOpen(false)}
      />
    </div>
  );
}
