import React, { useState } from 'react';
import { THESIS_METADATA, PROJECTS_DATA } from '../data/portfolioData';
import { ScrollReveal } from './ScrollReveal';
import { BookOpen, Database, Code2, CheckCircle2, Layers } from 'lucide-react';

export const ThesisArchiveSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'pengesahan' | 'usecase' | 'database' | 'code'>('pengesahan');

  const flagshipProject = PROJECTS_DATA[0];

  return (
    <section
      id="skripsi"
      className="relative bg-[#E6E6E6] text-[#141414] border-b border-[#141414]/15 py-14 sm:py-20 px-4 sm:px-8 overflow-hidden"
    >
      {/* Top Architectural Crosshair Markers (+) matching Proyek Web */}
      <div
        className="pointer-events-none max-w-[1360px] mx-auto mb-6 flex justify-between text-[#141414]/35 text-xs font-mono-tabular"
        aria-hidden="true"
      >
        <span>+</span>
        <span>+</span>
        <span>+</span>
        <span>+</span>
      </div>

      <div className="max-w-[1360px] mx-auto">
        <ScrollReveal direction="up" distance={26} className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#141414]/15">
            <div className="flex items-start gap-3.5">
              {/* Crimson Red Vertical Accent Pillar matching Proyek Web */}
              <span
                className="w-2.5 h-16 sm:h-20 bg-[#DF2925] rounded-xs shrink-0 mt-1"
                aria-hidden="true"
              />
              <div>
                <div className="text-xs font-mono-tabular text-[#DF2925] font-extrabold tracking-wider uppercase">
                  Dokumentasi Ilmiah Skripsi S1 Sistem Informasi · NPM {THESIS_METADATA.npm}
                </div>
                <h2
                  className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#141414] mt-1"
                  style={{ textWrap: 'balance' }}
                >
                  Bedah Lengkap Karya Ilmiah Skripsi (Bab I – V & Lampiran)
                </h2>
                <p className="text-xs sm:text-sm text-[#141414]/75 mt-2 max-w-3xl leading-relaxed">
                  "{THESIS_METADATA.title}" — Disusun oleh{' '}
                  <strong className="text-[#141414]">{THESIS_METADATA.author}</strong> untuk
                  memenuhi syarat mencapai gelar Sarjana Komputer (S.Kom) pada{' '}
                  {THESIS_METADATA.universitas}, Tahun Akademik {THESIS_METADATA.academicYear}.
                </p>
              </div>
            </div>

            {/* Interactive Tabs Styled in Dark Cosmic & Crimson Red like Proyek Web */}
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2 p-2 bg-[#0B0D13] border border-white/10 rounded-2xl shadow-[0_18px_40px_-12px_rgba(11,13,19,0.45)] shrink-0">
              <button
                type="button"
                onClick={() => setActiveTab('pengesahan')}
                className={`inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                  activeTab === 'pengesahan'
                    ? 'bg-[#DF2925] text-white shadow-[0_6px_18px_rgba(223,41,37,0.45)]'
                    : 'text-white/75 hover:text-white hover:bg-white/10'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 shrink-0" />
                <span>Abstrak & Pengesahan</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('usecase')}
                className={`inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                  activeTab === 'usecase'
                    ? 'bg-[#DF2925] text-white shadow-[0_6px_18px_rgba(223,41,37,0.45)]'
                    : 'text-white/75 hover:text-white hover:bg-white/10'
                }`}
              >
                <Layers className="w-3.5 h-3.5 shrink-0" />
                <span>13 Use Case & UML</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('database')}
                className={`inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                  activeTab === 'database'
                    ? 'bg-[#DF2925] text-white shadow-[0_6px_18px_rgba(223,41,37,0.45)]'
                    : 'text-white/75 hover:text-white hover:bg-white/10'
                }`}
              >
                <Database className="w-3.5 h-3.5 shrink-0" />
                <span>10 Tabel MySQL</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('code')}
                className={`inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                  activeTab === 'code'
                    ? 'bg-[#DF2925] text-white shadow-[0_6px_18px_rgba(223,41,37,0.45)]'
                    : 'text-white/75 hover:text-white hover:bg-white/10'
                }`}
              >
                <Code2 className="w-3.5 h-3.5 shrink-0" />
                <span>Source Code & Black Box</span>
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* Content Container Styled with Proyek Web Card Themes */}
        <ScrollReveal direction="up" distance={28} delay={0.08}>
          <div>
            {activeTab === 'pengesahan' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left Column: Dark Cosmic Card (#0B0D13) + Crimson Red Card (#DF2925) */}
                <div className="lg:col-span-7 flex flex-col gap-6">
                  {/* Dark Cosmic Card: Abstrak Penelitian */}
                  <div className="relative bg-[#0B0D13] text-white rounded-[26px] p-6 sm:p-7 shadow-[0_22px_45px_-12px_rgba(11,13,19,0.45)] ring-1 ring-white/10 overflow-hidden">
                    <div
                      className="pointer-events-none absolute -right-12 -top-12 w-44 h-44 rounded-full bg-sky-500/15 blur-2xl"
                      aria-hidden="true"
                    />
                    <div className="relative z-10">
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono-tabular text-white/60 border-b border-white/12 pb-3">
                        <div className="flex items-center gap-2">
                          <span>+</span>
                          <span className="font-extrabold text-sky-400">
                            ABSTRAK PENELITIAN (HALAMAN vi – vii)
                          </span>
                        </div>
                        <span>Metode: Kualitatif & Prototype +</span>
                      </div>

                      <p className="text-xs sm:text-sm text-white/85 leading-relaxed text-justify mt-4">
                        {THESIS_METADATA.abstrakId}
                      </p>

                      <div className="mt-5 p-4 bg-white/5 rounded-2xl border border-white/10">
                        <div className="text-xs font-bold text-white">
                          Kata Kunci Penelitian:
                        </div>
                        <div className="text-xs font-mono-tabular text-sky-300 mt-1">
                          {THESIS_METADATA.keywords.join(' · ')}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Crimson Red Card (#DF2925): Objek & Lokasi Penelitian UD. Jaya Lestari */}
                  <div className="arc-red-card relative bg-[#DF2925] text-[#141414] rounded-[26px] p-6 sm:p-7 shadow-[0_22px_45px_-12px_rgba(223,41,37,0.4)] ring-1 ring-[#141414]/15 overflow-hidden">
                    <svg
                      viewBox="0 0 120 120"
                      className="pointer-events-none absolute -right-6 -bottom-6 w-36 h-36 stroke-[#141414]/12 fill-none"
                      strokeWidth="6"
                      aria-hidden="true"
                    >
                      <path d="M35 45 C35 22, 85 22, 85 45 C102 52, 102 68, 85 75 C85 98, 35 98, 35 75 C18 68, 18 52, 35 45 Z" />
                      <circle cx="60" cy="60" r="8" />
                    </svg>

                    <div className="relative z-10 space-y-2 text-xs">
                      <div className="flex items-center justify-between font-mono-tabular text-[#141414]/75">
                        <span className="font-extrabold bg-white/25 px-2.5 py-0.5 rounded text-[#141414]">
                          OBJEK & LOKASI PENELITIAN (BAB III)
                        </span>
                        <span>+</span>
                      </div>
                      <div className="text-base sm:text-lg font-extrabold text-[#141414] pt-1">
                        {THESIS_METADATA.companyObject}
                      </div>
                      <p className="text-[#141414]/90 font-medium leading-relaxed">
                        <strong>Bidang Usaha:</strong> {THESIS_METADATA.companyBusiness}
                      </p>
                      <p className="text-[#141414]/85 font-mono-tabular">
                        <strong>Alamat:</strong> {THESIS_METADATA.companyAddress}
                      </p>
                      <p className="text-[#141414]/85 font-mono-tabular">
                        <strong>Waktu Penelitian:</strong> {THESIS_METADATA.researchPeriod} (Wawancara: 18 Mei 2026)
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Column: Technical Architect Card (#FAFAFA) — Berita Acara & Persetujuan */}
                <div className="lg:col-span-5 bg-[#FAFAFA] text-[#141414] rounded-[26px] p-6 sm:p-7 shadow-[0_22px_45px_-12px_rgba(0,0,0,0.16)] ring-1 ring-[#141414]/15 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono-tabular text-[#141414]/60 border-b border-[#141414]/12 pb-3">
                      <span className="font-extrabold text-[#DF2925]">
                        + BERITA ACARA & PENGESAHAN (HAL. ii – iv)
                      </span>
                      <span>S.Kom · 2026 +</span>
                    </div>

                    <div className="mt-4 space-y-3 text-xs">
                      <div className="flex justify-between gap-2">
                        <span className="text-[#141414]/60">Nama / NPM</span>
                        <span className="font-mono-tabular font-bold text-[#141414] text-right">
                          {THESIS_METADATA.author} / {THESIS_METADATA.npm}
                        </span>
                      </div>
                      <div className="flex justify-between gap-2">
                        <span className="text-[#141414]/60">SK Dekan FIK</span>
                        <span className="font-mono-tabular font-bold text-[#141414] text-right">
                          {THESIS_METADATA.skNumber}
                        </span>
                      </div>
                      <div className="flex justify-between gap-2">
                        <span className="text-[#141414]/60">Tanggal Sidang / Ruang</span>
                        <span className="font-mono-tabular font-bold text-[#141414] text-right">
                          {THESIS_METADATA.defenseDate} · Ruang {THESIS_METADATA.examRoom}
                        </span>
                      </div>
                    </div>

                    <div className="mt-5 pt-4 border-t border-[#141414]/12 space-y-3.5 text-xs">
                      <div>
                        <span className="text-[#141414]/60 block">Dosen Pembimbing Materi</span>
                        <span className="font-bold text-[#141414]">
                          {THESIS_METADATA.advisors.pembimbingMateri}
                        </span>
                      </div>
                      <div>
                        <span className="text-[#141414]/60 block">Dosen Pembimbing Teknis</span>
                        <span className="font-bold text-[#141414]">
                          {THESIS_METADATA.advisors.pembimbingTeknis}
                        </span>
                      </div>
                      <div>
                        <span className="text-[#141414]/60 block">Tim Dosen Penguji Sidang</span>
                        <span className="font-bold text-[#141414] block">
                          1. {THESIS_METADATA.advisors.penguji1}
                        </span>
                        <span className="font-bold text-[#141414] block">
                          2. {THESIS_METADATA.advisors.penguji2}
                        </span>
                      </div>
                      <div>
                        <span className="text-[#141414]/60 block">Ketua Program Studi & Dekan FIK</span>
                        <span className="font-bold text-[#141414] block">
                          Kaprodi SI: {THESIS_METADATA.advisors.kaprodi}
                        </span>
                        <span className="font-bold text-[#141414] block">
                          Dekan FIK: {THESIS_METADATA.advisors.dekan}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#141414]/12 flex items-center justify-between text-xs font-mono-tabular">
                    <span className="px-2.5 py-1 rounded-full bg-[#DF2925] text-white font-extrabold">
                      STATUS: LULUS SIDANG
                    </span>
                    <span className="font-bold text-[#141414]">
                      T.A. {THESIS_METADATA.academicYear}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'usecase' && (
              <div className="bg-[#0B0D13] text-white rounded-[26px] p-6 sm:p-8 shadow-[0_22px_45px_-12px_rgba(11,13,19,0.45)] ring-1 ring-white/10">
                <div className="mb-6 flex flex-wrap items-center justify-between gap-2 border-b border-white/12 pb-4">
                  <div>
                    <div className="text-xs font-mono-tabular text-sky-400 font-bold">
                      + PEMODELAN SISTEM USULAN · UML 2.5
                    </div>
                    <h3 className="text-base sm:text-lg font-extrabold text-white mt-0.5">
                      Daftar 13 Use Case Sistem Usulan (Tabel 4.4 & Gambar 4.4 Hal. 67–74 Skripsi)
                    </h3>
                    <p className="text-xs text-white/65 mt-0.5">
                      Setiap Use Case dilengkapi dengan Activity Diagram (Gambar 4.5–4.17) dan Sequence Diagram (Gambar 4.18–4.30).
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#DF2925] text-white text-xs font-mono-tabular font-bold">
                    Tools: Draw.io · UML 2.5
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {THESIS_METADATA.useCasesList.map((uc, idx) => {
                    const isAccentRed = idx % 4 === 1;
                    return (
                      <div
                        key={uc.no}
                        className={`p-4 rounded-2xl flex flex-col justify-between border transition-transform hover:-translate-y-0.5 ${
                          isAccentRed
                            ? 'arc-red-card bg-[#DF2925] text-[#141414] border-[#DF2925]'
                            : 'bg-white/5 text-white border-white/10 hover:border-sky-400/40'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between text-xs font-mono-tabular">
                            <span
                              className={`font-extrabold ${
                                isAccentRed ? 'text-white' : 'text-sky-400'
                              }`}
                            >
                              + UC-{String(uc.no).padStart(2, '0')}
                            </span>
                            <span
                              className={
                                isAccentRed ? 'text-[#141414]/80 font-bold' : 'text-white/60'
                              }
                            >
                              {uc.actor}
                            </span>
                          </div>
                          <h4
                            className={`text-sm font-extrabold mt-1.5 ${
                              isAccentRed ? 'text-[#141414]' : 'text-white'
                            }`}
                          >
                            {uc.name}
                          </h4>
                          <p
                            className={`text-xs mt-1.5 leading-relaxed ${
                              isAccentRed ? 'text-[#141414]/90 font-medium' : 'text-white/75'
                            }`}
                          >
                            {uc.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {activeTab === 'database' && (
              <div className="bg-[#0B0D13] text-white rounded-[26px] p-6 sm:p-8 shadow-[0_22px_45px_-12px_rgba(11,13,19,0.45)] ring-1 ring-white/10">
                <div className="mb-6 flex flex-wrap items-center justify-between gap-2 border-b border-white/12 pb-4">
                  <div>
                    <div className="text-xs font-mono-tabular text-sky-400 font-bold">
                      + ARSITEKTUR BASIS DATA RELASIONAL (3NF)
                    </div>
                    <h3 className="text-base sm:text-lg font-extrabold text-white mt-0.5">
                      Spesifikasi 10 Tabel Database MySQL (Tabel 4.18 s/d Tabel 4.27 Hal. 115–120 Skripsi)
                    </h3>
                    <p className="text-xs text-white/65 mt-0.5">
                      Dirancang berdasarkan Class Diagram Sistem Usulan (Gambar 4.31) dan dikelola menggunakan phpMyAdmin & XAMPP.
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#DF2925] text-white text-xs font-mono-tabular font-bold">
                    RDBMS: MySQL / MariaDB
                  </span>
                </div>

                <div className="overflow-x-auto border border-white/12 rounded-2xl">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-[#DF2925] text-white font-mono-tabular">
                        <th className="py-3.5 px-4 font-extrabold">Nama Tabel di Skripsi</th>
                        <th className="py-3.5 px-4 font-extrabold">Primary Key</th>
                        <th className="py-3.5 px-4 font-extrabold">Struktur Field & Tipe Data</th>
                        <th className="py-3.5 px-4 font-extrabold">Fungsi & Relasi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      {flagshipProject.databaseTables.map((tb) => (
                        <tr key={tb.tableName} className="hover:bg-white/5 transition-colors">
                          <td className="py-3.5 px-4 font-mono-tabular font-extrabold text-sky-400">
                            {tb.tableName}
                          </td>
                          <td className="py-3.5 px-4 font-mono-tabular font-bold text-white">
                            {tb.primaryKey}
                          </td>
                          <td className="py-3.5 px-4 font-mono-tabular text-white/80">
                            {tb.columns}
                          </td>
                          <td className="py-3.5 px-4 text-white/75">
                            {tb.relation}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'code' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left: Source Code View CodeIgniter Asli dari Lampiran Hal. 164-166 */}
                <div className="lg:col-span-6 bg-[#0B0D13] text-white rounded-[26px] p-6 shadow-[0_22px_45px_-12px_rgba(11,13,19,0.45)] ring-1 ring-white/10">
                  <div className="flex items-center justify-between text-xs font-mono-tabular text-sky-400 font-extrabold mb-3">
                    <span>+ LAMPIRAN SOURCE CODE ASLI (HAL. 164 – 166)</span>
                    <span>MVC +</span>
                  </div>
                  <div className="bg-black/60 text-[#F4F4F0] rounded-2xl p-4 overflow-x-auto border border-white/10">
                    <div className="flex items-center justify-between text-[11px] font-mono-tabular text-white/55 border-b border-white/10 pb-2 mb-3">
                      <span>app/Views/users/index.php (CodeIgniter MVC)</span>
                      <span className="text-[#DF2925] font-bold">PHP 8 · Bootstrap 5</span>
                    </div>
                    <pre className="text-[11px] leading-relaxed font-mono-tabular text-sky-300 overflow-x-auto">
                      <code>{THESIS_METADATA.sourceCodeSnippet}</code>
                    </pre>
                  </div>
                </div>

                {/* Right: Tabel 4.28 Pengujian Sistem Black Box (14 Fitur) */}
                <div className="lg:col-span-6 bg-[#FAFAFA] text-[#141414] rounded-[26px] p-6 shadow-[0_22px_45px_-12px_rgba(0,0,0,0.16)] ring-1 ring-[#141414]/15">
                  <div className="flex items-center justify-between text-xs font-mono-tabular text-[#DF2925] font-extrabold mb-3">
                    <span>+ TABEL 4.28 HASIL PENGUJIAN BLACK BOX (HAL. 134)</span>
                    <span>14 FITUR +</span>
                  </div>
                  <div className="space-y-2.5 max-h-[430px] overflow-y-auto pr-1">
                    {[
                      { no: 1, fitur: 'Login', skenario: 'Memasukkan username dan password yang benar', hasil: 'Halaman dashboard tampil sesuai role' },
                      { no: 2, fitur: 'Data Barang', skenario: 'Menambah data barang kayu baru', hasil: 'Data barang berhasil disimpan' },
                      { no: 3, fitur: 'Kategori Barang', skenario: 'Menambah kategori barang (Bahan Baku / Barang Jadi)', hasil: 'Data kategori berhasil disimpan' },
                      { no: 4, fitur: 'Supplier', skenario: 'Menambah data Supplier (SUP001–SUP004)', hasil: 'Data Supplier berhasil disimpan' },
                      { no: 5, fitur: 'Barang Masuk', skenario: 'Menambahkan transaksi barang masuk', hasil: 'Data tersimpan dan stok bertambah otomatis' },
                      { no: 6, fitur: 'Barang Keluar', skenario: 'Menambahkan transaksi barang keluar', hasil: 'Data tersimpan dan stok berkurang otomatis' },
                      { no: 7, fitur: 'Retur Barang', skenario: 'Menambahkan data retur barang', hasil: 'Data retur berhasil disimpan' },
                      { no: 8, fitur: 'Pesanan Barang', skenario: 'Menambahkan data pesanan barang ke supplier', hasil: 'Data pesanan berhasil disimpan' },
                      { no: 9, fitur: 'Monitoring Stok', skenario: 'Membuka halaman monitoring stok real-time', hasil: 'Sistem menampilkan stok barang terbaru' },
                      { no: 10, fitur: 'Stok Opname', skenario: 'Menyimpan hasil stok opname fisik vs sistem', hasil: 'Data stok opname berhasil disimpan' },
                      { no: 11, fitur: 'Manajemen User', skenario: 'Menambah data pengguna (Administrator / Admin Gudang)', hasil: 'Data pengguna berhasil disimpan' },
                      { no: 12, fitur: 'Ukuran Dan Kubikasi', skenario: 'Menghitung kubikasi data kayu (m³)', hasil: 'Sistem menghitung kubikasi dengan cepat dan akurat' },
                      { no: 13, fitur: 'Laporan', skenario: 'Mencetak laporan ke PDF / Excel', hasil: 'Laporan berhasil ditampilkan/dicetak' },
                      { no: 14, fitur: 'Logout', skenario: 'Memilih menu logout', hasil: 'Sistem kembali ke halaman login' },
                    ].map((item) => (
                      <div
                        key={item.no}
                        className="p-3.5 bg-[#E6E6E6] border border-[#141414]/12 rounded-xl flex items-start justify-between gap-3 text-xs"
                      >
                        <div>
                          <div className="font-extrabold text-[#141414]">
                            {item.no}. {item.fitur}
                          </div>
                          <div className="text-[#141414]/75 mt-0.5">
                            {item.skenario} →{' '}
                            <span className="text-[#141414] font-semibold">{item.hasil}</span>
                          </div>
                        </div>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#DF2925] text-white font-mono-tabular font-bold text-[10px] shrink-0">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Valid</span>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
