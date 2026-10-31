import React, { useEffect, useState } from 'react';
import { ProjectItem } from '../data/portfolioData';
import { ResilientImage } from './ResilientImage';
import { X, ArrowLeft, ArrowRight, Globe, ExternalLink, Info } from 'lucide-react';

interface ProjectLightboxModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onSelectProject: (project: ProjectItem) => void;
  allProjects: ProjectItem[];
}

export const ProjectLightboxModal: React.FC<ProjectLightboxModalProps> = ({
  project,
  onClose,
  onSelectProject,
  allProjects,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'uml' | 'database' | 'blackbox'>('overview');

  useEffect(() => {
    setActiveTab('overview');
  }, [project?.id]);

  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  const currentIndex = allProjects.findIndex((p) => p.id === project.id);
  const prevProject =
    allProjects[(currentIndex - 1 + allProjects.length) % allProjects.length];
  const nextProject = allProjects[(currentIndex + 1) % allProjects.length];

  // Bedakan proyek E-Commerce dari proyek Inventory untuk menyesuaikan label seksi.
  const isEcommerce = project.id === 'ecommerce-keyword-sneakers';

  return (
    <div
      className="fixed inset-0 z-50 bg-[#050505]/85 backdrop-blur-sm overflow-y-auto flex items-start justify-center p-4 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl bg-[#F4F4F0] text-[#111111] rounded-2xl border border-[#111111]/20 overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Modal Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#111111] text-[#F4F4F0]">
          <div className="flex items-center gap-2 text-xs font-mono-tabular text-[#F4F4F0]/80">
            <span>Studi Kasus {project.index}</span>
            <span aria-hidden="true">·</span>
            <span>{project.clientOrContext}</span>
            <span aria-hidden="true">·</span>
            <span>{project.period}</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors cursor-pointer"
            aria-label="Tutup detail proyek (ESC)"
          >
            <span>Tutup (ESC)</span>
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* High-res Visual Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 border-b border-[#111111]/10">
          <div className="lg:col-span-7 bg-[#111111] relative min-h-[260px] md:min-h-[340px]">
            <ResilientImage
              src={project.image}
              alt={project.title}
              fallbackTitle={project.title}
              fallbackSubtitle={project.techStack.join(' · ')}
              className="w-full h-full object-contain object-center"
            />
          </div>
          <div className="lg:col-span-5 p-6 md:p-8 flex flex-col justify-between bg-[#EAEAE4]">
            <div>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-mono-tabular text-[#111111]/60">
                <span>{project.categoryLabel}</span>
                {project.secondaryCategoryLabel && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span>{project.secondaryCategoryLabel}</span>
                  </>
                )}
                <span aria-hidden="true">·</span>
                <span>{project.period}</span>
              </div>
              <h2
                id="modal-project-title"
                className="text-2xl md:text-3xl font-bold tracking-tight text-[#111111] mt-2 leading-tight"
                style={{ textWrap: 'balance' }}
              >
                {project.title}
              </h2>
              <p className="mt-3 text-sm text-[#111111]/75 leading-relaxed">
                {project.subtitle}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#111111]/10">
              <div className="text-xs font-semibold text-[#111111]/60 mb-1">
                Teknologi & Metodologi
              </div>
              <div className="text-xs font-mono-tabular text-[#111111] leading-relaxed">
                {project.techStack.join(' · ')}
              </div>
            </div>

            {project.disclaimer && (
              <div className="mt-4 flex items-start gap-2.5 p-3 rounded-xl bg-amber-500/10 border border-amber-500/40">
                <Info className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                <p className="text-xs text-[#111111]/80 leading-relaxed">
                  <span className="font-semibold text-amber-700">Catatan: </span>
                  {project.disclaimer}
                </p>
              </div>
            )}

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-semibold transition-colors"
              >
                <Globe className="w-4 h-4" />
                <span>Lihat Demo Langsung</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        {/* Interactive Section Tabs inside Lightbox */}
        <div className="px-6 pt-4 bg-[#F4F4F0] border-b border-[#111111]/10 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1 p-1 bg-[#EAEAE4] rounded-lg overflow-x-auto">
            <button
              type="button"
              onClick={() => setActiveTab('overview')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'overview'
                  ? 'bg-[#111111] text-[#F4F4F0]'
                  : 'text-[#111111]/70 hover:text-[#111111]'
              }`}
            >
              01. Ringkasan & Hak Akses
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('uml')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'uml'
                  ? 'bg-[#111111] text-[#F4F4F0]'
                  : 'text-[#111111]/70 hover:text-[#111111]'
              }`}
            >
              02. Pemodelan UML ({project.umlDiagrams.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('database')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'database'
                  ? 'bg-[#111111] text-[#F4F4F0]'
                  : 'text-[#111111]/70 hover:text-[#111111]'
              }`}
            >
              03. Skema Database MySQL ({project.databaseTables.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('blackbox')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'blackbox'
                  ? 'bg-[#111111] text-[#F4F4F0]'
                  : 'text-[#111111]/70 hover:text-[#111111]'
              }`}
            >
              04. Pengujian Black Box ({project.blackBoxTests.length})
            </button>
          </div>
        </div>

        {/* Tab Content Body */}
        <div className="p-6 md:p-8">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="p-5 bg-white border border-[#111111]/10 rounded-xl">
                <div className="text-xs font-mono-tabular text-[#2563EB] mb-1">
                  Arsitektur Solusi Web
                </div>
                <h4 className="text-base font-semibold text-[#111111] mb-2">
                  {isEcommerce
                    ? 'Implementasi Antarmuka Toko Online Interaktif'
                    : 'Implementasi Sistem Terintegrasi Real-Time'}
                </h4>
                <p className="text-sm text-[#111111]/80 leading-relaxed">
                  {project.solutionSummary}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-[#111111] mb-3">
                  Rincian Kontribusi & Pencapaian Teknis (Sesuai CV)
                </h4>
                <div className="space-y-2.5">
                  {project.highlights.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-white border border-[#111111]/10 rounded-xl flex items-start gap-3 text-sm text-[#111111]/85"
                    >
                      <span className="font-mono-tabular font-semibold text-[#2563EB] shrink-0">
                        0{idx + 1}.
                      </span>
                      <p className="leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-[#111111] mb-3">
                  Pembagian Hak Akses Pengguna (Role-Based Access Control)
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.accessRoles.map((roleItem) => (
                    <div
                      key={roleItem.role}
                      className="p-4 bg-[#EAEAE4] border border-[#111111]/10 rounded-xl"
                    >
                      <div className="text-sm font-semibold text-[#111111]">
                        Level Akses: {roleItem.role}
                      </div>
                      <p className="text-xs text-[#111111]/75 mt-1.5 leading-relaxed">
                        {roleItem.permissions}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'uml' && (
            <div>
              <div className="mb-4">
                <h4 className="text-base font-semibold text-[#111111]">
                  Spesifikasi Pemodelan Sistem UML (Unified Modeling Language)
                </h4>
                <p className="text-xs text-[#111111]/70 mt-1">
                  {isEcommerce
                    ? 'Dirancang menggunakan metode Prototype untuk memvalidasi alur interaksi antarmuka bersama pengguna sebelum dan selama penulisan kode HTML dan CSS dengan basis data MySQL (phpMyAdmin).'
                    : 'Dirancang menggunakan metode Prototype untuk memvalidasi alur sistem bersama pengguna sebelum dan selama penulisan kode PHP CodeIgniter.'}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.umlDiagrams.map((uml, idx) => (
                  <div
                    key={uml.type}
                    className="p-5 bg-white border border-[#111111]/10 rounded-xl flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs font-mono-tabular text-[#2563EB] mb-1.5">
                        <span>Diagram 0{idx + 1}</span>
                        <span>Standar UML 2.5</span>
                      </div>
                      <h5 className="text-base font-semibold text-[#111111]">
                        {uml.type}
                      </h5>
                      <p className="text-sm text-[#111111]/75 mt-2 leading-relaxed">
                        {uml.summary}
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-[#111111]/10 text-xs font-mono-tabular space-y-1">
                      <div className="text-[#111111]/90">{uml.actorsOrEntities}</div>
                      <div className="text-[#111111]/60">{uml.flowHighlight}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'database' && (
            <div>
              <div className="mb-4">
                <h4 className="text-base font-semibold text-[#111111]">
                  {isEcommerce
                    ? 'Struktur Tabel Basis Data Relasional (MySQL / phpMyAdmin)'
                    : 'Struktur Tabel Basis Data Relasional (MySQL / XAMPP)'}
                </h4>
                <p className="text-xs text-[#111111]/70 mt-1">
                  {isEcommerce
                    ? 'Rancangan entitas relasional untuk menjamin integritas katalog produk, keranjang belanja, voucher, dan alur pesanan.'
                    : 'Rancangan entitas relasional untuk menjamin integritas stok barang masuk, barang keluar, retur, dan histori pelaporan real-time.'}
                </p>
              </div>
              <div className="overflow-x-auto bg-white border border-[#111111]/10 rounded-xl">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-[#111111]/10 bg-[#EAEAE4] text-[#111111]/70 font-mono-tabular">
                      <th className="py-3 px-4">Nama Tabel</th>
                      <th className="py-3 px-4">Primary Key</th>
                      <th className="py-3 px-4">Atribut / Kolom Utama</th>
                      <th className="py-3 px-4">Relasi & Trigger Bisnis</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#111111]/10">
                    {project.databaseTables.map((tb) => (
                      <tr key={tb.tableName}>
                        <td className="py-3 px-4 font-mono-tabular font-semibold text-[#2563EB]">
                          {tb.tableName}
                        </td>
                        <td className="py-3 px-4 font-mono-tabular text-[#111111]">
                          {tb.primaryKey}
                        </td>
                        <td className="py-3 px-4 font-mono-tabular text-[#111111]/80">
                          {tb.columns}
                        </td>
                        <td className="py-3 px-4 text-[#111111]/75">
                          {tb.relation}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'blackbox' && (
            <div>
              <div className="mb-4">
                <h4 className="text-base font-semibold text-[#111111]">
                  Matriks Pengujian Fungsional Black Box Testing
                </h4>
                <p className="text-xs text-[#111111]/70 mt-1">
                  Pengujian seluruh modul fungsional untuk memastikan kesesuaian antara spesifikasi kebutuhan pengguna dan hasil eksekusi sistem.
                </p>
              </div>
              <div className="overflow-x-auto bg-white border border-[#111111]/10 rounded-xl">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-[#111111]/10 bg-[#EAEAE4] text-[#111111]/70 font-mono-tabular">
                      <th className="py-3 px-4">ID Uji</th>
                      <th className="py-3 px-4">Modul Diuji</th>
                      <th className="py-3 px-4">Skenario & Input Uji</th>
                      <th className="py-3 px-4">Hasil yang Diharapkan</th>
                      <th className="py-3 px-4 text-right">Kesimpulan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#111111]/10">
                    {project.blackBoxTests.map((test) => (
                      <tr key={test.id}>
                        <td className="py-3 px-4 font-mono-tabular font-semibold text-[#111111]">
                          {test.id}
                        </td>
                        <td className="py-3 px-4 font-semibold text-[#111111]">
                          {test.module}
                        </td>
                        <td className="py-3 px-4 text-[#111111]/80">
                          <div>{test.scenario}</div>
                          <div className="font-mono-tabular text-[#111111]/60 mt-0.5">
                            {test.inputData}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-[#111111]/80">
                          {test.expectedOutput}
                        </td>
                        <td className="py-3 px-4 text-right font-mono-tabular font-semibold text-emerald-800 whitespace-nowrap">
                          {test.status}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation between projects */}
        <div className="px-6 py-4 bg-[#EAEAE4] border-t border-[#111111]/10 flex items-center justify-between gap-4">
          {allProjects.length > 1 ? (
            <>
              <button
                type="button"
                onClick={() => onSelectProject(prevProject)}
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#111111]/80 hover:text-[#111111] transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Sebelumnya: {prevProject.title}</span>
              </button>
              <button
                type="button"
                onClick={() => onSelectProject(nextProject)}
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#111111]/80 hover:text-[#111111] transition-colors cursor-pointer text-right"
              >
                <span>Selanjutnya: {nextProject.title}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </>
          ) : (
            <span className="text-xs font-mono-tabular text-[#111111]/50">
              Proyek Unggulan · {project.index} / {String(allProjects.length).padStart(2, '0')}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
