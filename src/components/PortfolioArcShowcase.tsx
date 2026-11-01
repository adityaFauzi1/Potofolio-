import React, { useState } from 'react';
import {
  PROJECTS_DATA,
  EXPERIENCE_DATA,
  EDUCATION_DATA,
  ProjectItem,
} from '../data/portfolioData';
import { ResilientImage } from './ResilientImage';
import { ScrollReveal } from './ScrollReveal';
import {
  ArrowRight,
  Award,
  Code2,
  Cpu,
  ExternalLink,
  Github,
  X,
  CheckCircle2,
  Building2,
  GraduationCap,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PortfolioArcShowcaseProps {
  customPortrait: string | null;
  onSelectProject: (project: ProjectItem) => void;
  onOpenCvModal: () => void;
}

type ShowcaseTab = 'projects' | 'certificates' | 'techstack';

interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  recipient: string;
  period: string;
  roleOrProgram: string;
  predicate: string;
  description: string;
  badgeCode: string;
  driveUrl?: string;
}

const CERTIFICATES_LIST: CertificateItem[] = [
  {
    id: 'cert-bootcamp-task-manager-laravel',
    title: 'SERTIFIKAT',
    issuer: 'UNIVERSITAS INSAN PEMBANGUNAN INDONESIA · UNIPI',
    recipient: 'ADITYA FAUZI (NPM: 2022804042)',
    period: '14–16 Maret 2025 · Bootcamp Online — Peserta',
    roleOrProgram:',
    description:
      'Diberikan kepada Aditya Fauzi sebagai peserta pada kegiatan Bootcamp Online “Membangun Aplikasi Task Manager dengan Laravel” tanggal 14–16 Maret 2025 — dari belajar teori hingga praktik.',
    badgeCode: 'Bootcamp · Laravel · Task Manager · 14–16 Mar 2025',
    driveUrl: 'https://drive.google.com/drive/folders/1zNOY18iluk7EWvo6wa8mgUSkzy938y3S',
  },
];

interface TechStackBadge {
  name: string;
  category: string;
  level: string;
  bgColor: string;
  textColor: string;
  borderColor: string;
  logoType: 'php' | 'codeigniter' | 'mysql' | 'html5' | 'css3' | 'js' | 'bootstrap' | 'uml' | 'vscode';
}

const TECH_STACK_GRID: TechStackBadge[] = [
  {
    name: 'PHP',
    category: 'Backend Language',
    bgColor: '#4F5B93',
    textColor: '#FFFFFF',
    borderColor: 'rgba(119,123,179,0.45)',
    logoType: 'php',
    level: 'Beginner',
  },
  {
    name: 'CodeIgniter',
    category: 'MVC Framework',
    bgColor: '#EE4323',
    textColor: '#FFFFFF',
    borderColor: 'rgba(238,67,35,0.45)',
    logoType: 'codeigniter',
    level: 'Beginner',
  },
  {
    name: 'MySQL',
    category: 'Relational Database',
    bgColor: '#00758F',
    textColor: '#FFFFFF',
    borderColor: 'rgba(0,117,143,0.45)',
    logoType: 'mysql',
    level: 'Beginner',
  },
  {
    name: 'HTML',
    category: 'Markup Language',
    bgColor: '#E34F26',
    textColor: '#FFFFFF',
    borderColor: 'rgba(227,79,38,0.45)',
    logoType: 'html5',
    level: 'Beginner',
  },
  {
    name: 'CSS',
    category: 'Styling & Layout',
    bgColor: '#1572B6',
    textColor: '#FFFFFF',
    borderColor: 'rgba(21,114,182,0.45)',
    logoType: 'css3',
    level: 'Beginner',
  },
  {
    name: 'JavaScript',
    category: 'Interactive UI',
    bgColor: '#F7DF1E',
    textColor: '#111111',
    borderColor: 'rgba(247,223,30,0.45)',
    logoType: 'js',
    level: 'Beginner',
  },
  {
    name: 'Bootstrap',
    category: 'Frontend UI Kit',
    bgColor: '#7952B3',
    textColor: '#FFFFFF',
    borderColor: 'rgba(121,82,179,0.45)',
    logoType: 'bootstrap',
    level: 'Beginner',
  },
  {
    name: 'UML (Draw.io)',
    category: 'System Modeling',
    bgColor: '#F08705',
    textColor: '#FFFFFF',
    borderColor: 'rgba(240,135,5,0.45)',
    logoType: 'uml',
    level: 'Beginner',
  },
  {
    name: 'VS Code / XAMPP',
    category: 'Dev Environment',
    bgColor: '#007ACC',
    textColor: '#FFFFFF',
    borderColor: 'rgba(0,122,204,0.45)',
    logoType: 'vscode',
    level: 'Beginner',
  },
];

export const PortfolioArcShowcase: React.FC<PortfolioArcShowcaseProps> = ({
  onSelectProject,
  onOpenCvModal,
}) => {
  const [activeTab, setActiveTab] = useState<ShowcaseTab>('projects');
  const [selectedCertificate, setSelectedCertificate] = useState<CertificateItem | null>(null);

  const renderTechIcon = (item: TechStackBadge) => {
    switch (item.logoType) {
      case 'php':
        return (
          <div className="w-16 h-16 rounded-2xl bg-[#4F5B93] flex items-center justify-center shadow-inner border border-white/15">
            <span className="font-mono-tabular italic font-extrabold text-xl tracking-tight text-white">
              php
            </span>
          </div>
        );
      case 'codeigniter':
        return (
          <div className="w-16 h-16 rounded-2xl bg-[#EE4323]/15 border border-[#EE4323]/40 flex items-center justify-center">
            <svg viewBox="0 0 32 32" className="w-10 h-10 fill-[#EE4323]">
              <path d="M16.8 3.2c.6 3.5-1.8 5.8-3.5 7.9-1.9 2.3-2.9 4.9-1.8 8.1-1.9-1.2-2.7-3.6-2-5.9-2.8 2.1-4.3 5.7-3.4 9.3.8 3.2 3.6 5.6 6.9 6.2-2.1-1.6-3-4.3-1.8-6.8 1.1 1.7 3.2 2.2 4.6 3.8 1.5 1.7 1 4.2-.5 5.4 4.7-.7 8.6-4.4 9.2-9.2.6-4.6-2-8.8-5.7-11.2.6 1.8-.2 3.6-1.8 4.4 1.3-3.8.9-8.4-.2-12z" />
            </svg>
          </div>
        );
      case 'mysql':
        return (
          <div className="w-16 h-16 rounded-2xl bg-[#00758F]/15 border border-[#00758F]/40 flex flex-col items-center justify-center">
            <svg viewBox="0 0 36 28" className="w-9 h-7 stroke-[#00758F] dark:stroke-[#38BDF8] fill-none" strokeWidth="2.2">
              <path d="M5 22 C7 14, 15 7, 25 5 C23 9, 24 12, 29 14 C24 15, 21 18, 20 23" />
              <circle cx="21" cy="9" r="1.2" className="fill-current" />
            </svg>
            <span className="text-[10px] font-extrabold tracking-tight text-[#00758F] dark:text-[#38BDF8] mt-0.5">
              MySQL
            </span>
          </div>
        );
      case 'html5':
        return (
          <div className="w-16 h-16 rounded-2xl bg-[#E34F26] flex flex-col items-center justify-center text-white shadow-inner">
            <span className="text-[9px] font-mono-tabular font-bold tracking-widest opacity-90">
              HTML
            </span>
            <span className="text-2xl font-extrabold leading-none mt-0.5">5</span>
          </div>
        );
      case 'css3':
        return (
          <div className="w-16 h-16 rounded-2xl bg-[#1572B6] flex flex-col items-center justify-center text-white shadow-inner">
            <span className="text-[9px] font-mono-tabular font-bold tracking-widest opacity-90">
              CSS
            </span>
            <span className="text-2xl font-extrabold leading-none mt-0.5">3</span>
          </div>
        );
      case 'js':
        return (
          <div className="w-16 h-16 rounded-2xl bg-[#F7DF1E] flex items-end justify-end p-2.5 text-[#111111] shadow-inner">
            <span className="text-2xl font-extrabold leading-none tracking-tighter">
              JS
            </span>
          </div>
        );
      case 'bootstrap':
        return (
          <div className="w-16 h-16 rounded-2xl bg-[#7952B3] flex items-center justify-center text-white shadow-inner">
            <span className="text-3xl font-extrabold leading-none">B</span>
          </div>
        );
      case 'uml':
        return (
          <div className="w-16 h-16 rounded-2xl bg-[#F08705] flex flex-col items-center justify-center text-white shadow-inner">
            <span className="text-sm font-mono-tabular font-extrabold tracking-tight">
              UML
            </span>
            <span className="text-[10px] font-mono-tabular opacity-90">2.5</span>
          </div>
        );
      case 'vscode':
        return (
          <div className="w-16 h-16 rounded-2xl bg-[#007ACC] flex items-center justify-center text-white shadow-inner">
            <Code2 className="w-8 h-8" />
          </div>
        );
    }
  };

  return (
    <section
      id="proyek"
      className="relative bg-[#E6E6E6] text-[#141414] border-b border-[#141414]/15 py-16 sm:py-24 px-4 sm:px-8 overflow-hidden"
    >
      {/* Background kontinu kini ditangani oleh <PortfolioArcBackground /> pada
          wrapper "arc-region" di App.tsx sehingga mengalir dari showcase ke kontak. */}

      {/* Subtle architectural crosshair markers preserved on the native background */}
      <div
        className="pointer-events-none max-w-[1200px] mx-auto mb-4 flex justify-between text-[#141414]/35 text-xs font-mono-tabular"
        aria-hidden="true"
      >
        <span>+</span>
        <span>+</span>
        <span>+</span>
        <span>+</span>
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto">
        {/* ===================================================================
            HEADER: "Portfolio Showcase" + Subtitle (Matching Video 0:19)
        ==================================================================== */}
        <ScrollReveal direction="up" distance={24} className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#141414]">
            Portfolio Showcase
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-[#141414]/70 leading-relaxed">
            Explore my journey through projects, certifications, and technical expertise.
          </p>
        </ScrollReveal>

        {/* ===================================================================
            3-TAB SWITCHER BAR: Projects | Certificates | Tech Stack (Video 0:19)
        ==================================================================== */}
        <ScrollReveal direction="up" distance={20} delay={0.06} className="mt-8 sm:mt-10">
          <div className="portfolio-tabs-bar max-w-[780px] mx-auto p-1.5 rounded-2xl border shadow-sm grid grid-cols-3 gap-1.5">
            {[
              { id: 'projects' as const, label: 'Projects', icon: Code2 },
              { id: 'certificates' as const, label: 'Certificates', icon: Award },
              { id: 'techstack' as const, label: 'Tech Stack', icon: Cpu },
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              const IconComp = tab.icon;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`portfolio-tab-btn relative py-3 sm:py-3.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    isActive
                      ? 'portfolio-tab-active'
                      : 'portfolio-tab-inactive'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="portfolio-showcase-active-tab"
                      transition={{ type: 'spring', stiffness: 360, damping: 30 }}
                      className="portfolio-tab-pill absolute inset-0 rounded-xl"
                    />
                  )}
                  <IconComp className="relative z-10 w-4 h-4 shrink-0" />
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* ===================================================================
            TAB CONTENT AREA
        ==================================================================== */}
        <div className="mt-10 sm:mt-12">
          <AnimatePresence mode="wait">
            {/* TAB 1: PROJECTS (Matching Video 0:19 - 0:26) */}
            {activeTab === 'projects' && (
              <motion.div
                key="tab-projects"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {PROJECTS_DATA.map((project) => (
                  <article
                    key={project.id}
                    onClick={() => onSelectProject(project)}
                    className="group cursor-pointer rounded-2xl bg-white border border-[#141414]/12 hover:border-[#2563EB]/50 p-4 sm:p-5 flex flex-col shadow-[0_14px_34px_-12px_rgba(0,0,0,0.1)] hover:-translate-y-1 hover:shadow-[0_22px_44px_-14px_rgba(0,0,0,0.18)] transition-all duration-300"
                  >
                    {/* Preview tangkapan layar proyek (rapi, sudut membulat) */}
                    <div className="relative h-44 sm:h-52 w-full rounded-xl overflow-hidden bg-[#0D0F14] border border-[#141414]/10">
                      <ResilientImage
                        src={project.image}
                        alt={project.title}
                        fallbackTitle={project.title}
                        fallbackSubtitle={project.techStack.join(' · ')}
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                    </div>

                    {/* Judul & Deskripsi Singkat (rata tengah) */}
                    <div className="mt-5 text-center">
                      <h3 className="text-lg sm:text-xl font-bold text-[#141414] group-hover:text-[#2563EB] transition-colors leading-snug">
                        {project.title}
                      </h3>
                      <p className="mt-2.5 text-xs sm:text-sm text-[#141414]/65 leading-relaxed line-clamp-3">
                        {project.subtitle}
                      </p>
                    </div>

                    {/* Tech Stack (dipisah koma, warna aksen) */}
                    <div className="mt-4 text-center">
                      <p className="text-[11px] sm:text-xs font-mono-tabular font-semibold text-[#2563EB] leading-relaxed">
                        {project.techStack.slice(0, 4).join(', ')}
                      </p>
                    </div>

                    {/* Baris Aksi Bawah: Repositori GitHub & Tautan Demo */}
                    <div className="mt-auto pt-5 flex items-center gap-2.5">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          aria-label={`Lihat repositori GitHub ${project.title}`}
                          title="Repositori GitHub"
                          className="w-9 h-9 rounded-lg flex items-center justify-center text-[#141414]/70 hover:text-white hover:bg-[#141414] border border-[#141414]/12 transition-colors cursor-pointer"
                        >
                          <Github className="w-[18px] h-[18px]" />
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          aria-label={`Buka demo langsung ${project.title}`}
                          title="Buka demo langsung"
                          className="w-9 h-9 rounded-lg flex items-center justify-center text-[#141414]/70 hover:text-[#2563EB] hover:bg-[#2563EB]/10 border border-[#141414]/12 transition-colors cursor-pointer"
                        >
                          <ExternalLink className="w-[18px] h-[18px]" />
                        </a>
                      )}
                    </div>
                  </article>
                ))}
              </motion.div>
            )}

            {/* TAB 2: CERTIFICATES (Matching Video 0:28 - 0:31) */}
            {activeTab === 'certificates' && (
              <motion.div
                key="tab-certificates"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#141414]">Certificates</h2>
                  <p className="text-xs sm:text-sm text-[#141414]/60 mt-1">
                    Sertifikat dan pengakuan yang telah diperoleh
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {CERTIFICATES_LIST.map((cert) => (
                  <div
                    key={cert.id}
                    onClick={() => setSelectedCertificate(cert)}
                    className="group cursor-pointer rounded-2xl bg-white border border-[#141414]/12 hover:border-[#2563EB]/50 p-4 flex flex-col justify-between shadow-[0_14px_34px_-12px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300"
                  >
                    {/* Google Drive Certificate Link */}
                    <div className="relative h-44 sm:h-48 w-full rounded-xl border border-[#141414]/10 bg-[#0D0F14] flex items-center justify-center overflow-hidden group-hover:border-[#2563EB]/50 transition-colors">
                      <a
                        href={cert.driveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center justify-center h-full w-full px-6 py-4 text-center"
                      >
                        <span className="mb-2 text-2xl">📁</span>
                        <span className="text-sm font-semibold text-[#2563EB] uppercase tracking-wider group-hover:underline">
                          Buka Sertifikat di Google Drive
                        </span>
                      </a>
                    </div>

                    {/* Bottom Caption */}
                    <div className="mt-3.5 flex items-center justify-between px-1">
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-[#141414] group-hover:text-[#2563EB] transition-colors">
                          {cert.title}
                        </h4>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#141414]/45 group-hover:text-[#2563EB] group-hover:translate-x-0.5 transition-all shrink-0" />
                    </div>
                  </div>
                ))}
                </div>
              </motion.div>
            )}

            {/* TAB 3: TECH STACK (Horizontal skill cards + level on hover) */}
            {activeTab === 'techstack' && (
              <motion.div
                key="tab-techstack"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="max-w-[1000px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
              >
                {TECH_STACK_GRID.map((tech) => (
                  <div
                    key={tech.name}
                    className="group rounded-xl bg-white border border-[#141414]/12 hover:border-[#2563EB]/50 p-4 flex items-center gap-4 text-left shadow-[0_10px_26px_-12px_rgba(0,0,0,0.08)] hover:shadow-[0_16px_34px_-14px_rgba(37,99,235,0.35)] transition-all duration-300"
                  >
                    {/* Logo teknologi (kiri) */}
                    <div className="shrink-0 group-hover:scale-110 transition-transform duration-300">
                      {renderTechIcon(tech)}
                    </div>

                    {/* Nama & level (kanan) */}
                    <div className="min-w-0 flex-1">
                      <div className="text-sm sm:text-base font-bold text-[#141414] truncate">
                        {tech.name}
                      </div>
                      {/* Level keterampilan — muncul saat hover */}
                      <div className="mt-0.5 text-[11px] sm:text-xs font-mono-tabular font-semibold text-[#2563EB] opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                        {tech.level}
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ===================================================================
          CERTIFICATE LIGHTBOX MODAL (Matching Video 0:30 - 0:31)
      ==================================================================== */}
      <AnimatePresence>
        {selectedCertificate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCertificate(null)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm p-4 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl rounded-2xl bg-[#FAF9F5] text-[#111111] border-4 border-[#D4AF37]/60 p-6 sm:p-10 shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setSelectedCertificate(null)}
                aria-label="Tutup Sertifikat"
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/10 hover:bg-black/20 flex items-center justify-center text-[#111111] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="border-2 border-[#1E3A8A]/25 rounded-xl p-6 sm:p-8 text-center">
                <div className="w-12 h-12 mx-auto rounded-full bg-[#1E3A8A]/10 border border-[#1E3A8A]/30 flex items-center justify-center text-[#1E3A8A] mb-3">
                  {selectedCertificate.id.includes('pkl') ? (
                    <Building2 className="w-6 h-6" />
                  ) : (
                    <GraduationCap className="w-6 h-6" />
                  )}
                </div>

                <div className="text-xs font-mono-tabular font-bold tracking-widest uppercase text-[#1E3A8A]">
                  {selectedCertificate.issuer}
                </div>

                <h3 className="mt-2 text-2xl sm:text-3xl font-serif font-extrabold tracking-widest text-[#111111] uppercase">
                  SERTIFIKAT
                </h3>
                <div className="text-xs font-mono-tabular text-[#111111]/60 mt-0.5">
                  {selectedCertificate.badgeCode}
                </div>

                {selectedCertificate.driveUrl && (
                  <div className="mt-5 mx-auto max-w-md w-full flex justify-center">
                    <a
                      href={selectedCertificate.driveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-full max-w-xs py-4 bg-[#111111]/5 border border-[#111111]/15 rounded-xl hover:bg-[#111111]/10 hover:border-[#2563EB]/50 transition-colors text-sm font-semibold text-[#111111] uppercase tracking-wider"
                    >
                      <span className="mr-2">📁</span>
                      Buka Sertifikat di Google Drive
                    </a>
                  </div>
                )}

                <div className="mt-5 text-xs text-[#111111]/70">Diberikan kepada:</div>
                <div className="mt-1 text-xl sm:text-2xl font-extrabold text-[#111111] underline decoration-[#D4AF37] decoration-2 underline-offset-4">
                  {selectedCertificate.recipient}
                </div>

                <div className="mt-4 text-xs sm:text-sm font-bold text-[#1E3A8A]">
                  {selectedCertificate.roleOrProgram}
                </div>
                <div className="text-xs text-[#111111]/65 mt-0.5">
                  {selectedCertificate.period}
                </div>

                <p className="mt-4 text-xs sm:text-sm text-[#111111]/80 leading-relaxed max-w-lg mx-auto">
                  {selectedCertificate.description}
                </p>

                <div className="mt-6 pt-5 border-t border-[#111111]/15 flex flex-wrap items-center justify-between gap-4 text-xs">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-800 font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Predikat: {selectedCertificate.predicate}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCertificate(null);
                      onOpenCvModal();
                    }}
                    className="px-4 py-2 rounded-lg bg-[#111111] text-white font-semibold hover:bg-[#2563EB] transition-colors cursor-pointer"
                  >
                    Lihat di Dokumen CV Lengkap
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
