import React, { useState } from 'react';
import { INITIAL_SIM_INVENTORY, SimInventoryItem } from '../data/portfolioData';
import {
  ArrowUpRight,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Printer,
  Calculator,
  Boxes,
} from 'lucide-react';

interface TransactionLog {
  id: string;
  timestamp: string;
  type: 'BARANG MASUK' | 'BARANG KELUAR' | 'RETUR BARANG' | 'STOCK OPNAME';
  itemCode: string;
  itemName: string;
  qty: number;
  actorRole: 'Administrator' | 'Admin Gudang';
  suratJalanNo?: string;
  blackBoxResult: string;
  isError?: boolean;
}

interface SavedKubikasiRow {
  id: string;
  namaUkuran: string;
  panjangM: number;
  lebarCm: number;
  tinggiCm: number;
  jumlahBatang: number;
  volumePerBatang: number;
  totalKubikasi: number;
  hargaPerKubik: number;
  totalNilai: number;
}

export const InventorySimulator: React.FC = () => {
  const [simMode, setSimMode] = useState<'inventory' | 'kubikasi'>('inventory');
  const [activeRole, setActiveRole] = useState<'Administrator' | 'Admin Gudang'>('Administrator');
  const [items, setItems] = useState<SimInventoryItem[]>(INITIAL_SIM_INVENTORY);
  const [selectedCode, setSelectedCode] = useState<string>(INITIAL_SIM_INVENTORY[0].kode);
  const [txType, setTxType] = useState<'MASUK' | 'KELUAR' | 'RETUR'>('MASUK');
  const [qtyInput, setQtyInput] = useState<number>(10);
  const [noteInput, setNoteInput] = useState<string>('UD. Jaya Lestari — Desa Kadu Jaya, Curug');
  const [activeSuratJalan, setActiveSuratJalan] = useState<TransactionLog | null>(null);

  // Kalkulator Kubikasi Kayu state (Matching Gambar 4.44 Hal. 130 Skripsi)
  const [namaUkuran, setNamaUkuran] = useState<string>('Kaso Kayu Sengon Standar');
  const [panjangM, setPanjangM] = useState<number>(2);
  const [lebarCm, setLebarCm] = useState<number>(30);
  const [tinggiCm, setTinggiCm] = useState<number>(3);
  const [jumlahBatang, setJumlahBatang] = useState<number>(3);
  const [hargaPerKubik, setHargaPerKubik] = useState<number>(1000000);
  const [kubikasiRows, setKubikasiRows] = useState<SavedKubikasiRow[]>([
    {
      id: 'UKR-001',
      namaUkuran: 'Kaso Kayu Sengon (Sesuai Gambar 4.44 Skripsi)',
      panjangM: 2,
      lebarCm: 30,
      tinggiCm: 3,
      jumlahBatang: 3,
      volumePerBatang: 0.018,
      totalKubikasi: 0.054,
      hargaPerKubik: 1000000,
      totalNilai: 54000,
    },
    {
      id: 'UKR-002',
      namaUkuran: 'Balok Kayu Meranti Konstruksi',
      panjangM: 4,
      lebarCm: 20,
      tinggiCm: 10,
      jumlahBatang: 5,
      volumePerBatang: 0.08,
      totalKubikasi: 0.4,
      hargaPerKubik: 2500000,
      totalNilai: 1000000,
    },
  ]);

  const [logs, setLogs] = useState<TransactionLog[]>([
    {
      id: 'TRX-2026-001',
      timestamp: '08:30 WIB',
      type: 'BARANG MASUK',
      itemCode: 'BRG008',
      itemName: 'Kayu Gelondongan Sengon (Bahan Baku)',
      qty: 32,
      actorRole: 'Administrator',
      blackBoxResult: 'VALID (Tabel 4.28 No. 5): Data tersimpan di tabel_barang_masuk & stok bertambah +32 Batang.',
    },
    {
      id: 'TRX-2026-002',
      timestamp: '09:15 WIB',
      type: 'BARANG KELUAR',
      itemCode: 'BRG009',
      itemName: 'Balok Kayu Meranti (Barang Jadi)',
      qty: 10,
      actorRole: 'Admin Gudang',
      suratJalanNo: 'SJ/JYL/2026/06/025',
      blackBoxResult: 'VALID (Tabel 4.28 No. 6): Data tersimpan di tabel_barang_keluar & stok berkurang otomatis.',
    },
  ]);

  const selectedItem = items.find((i) => i.kode === selectedCode) || items[0];

  // Kalkulasi Kubikasi Kayu: Volume per batang (m³) = Panjang (m) * (Lebar (cm)/100) * (Tinggi (cm)/100)
  const volumePerBatang = Math.max(0, (panjangM * lebarCm * tinggiCm) / 10000);
  const totalVolumeKubikasi = volumePerBatang * Math.max(1, jumlahBatang);
  const totalNilaiKayu = Math.round(totalVolumeKubikasi * Math.max(0, hargaPerKubik));

  const handleSaveKubikasi = (e: React.FormEvent) => {
    e.preventDefault();
    const newRow: SavedKubikasiRow = {
      id: `UKR-00${kubikasiRows.length + 1}`,
      namaUkuran: namaUkuran || 'Ukuran Kayu Custom',
      panjangM,
      lebarCm,
      tinggiCm,
      jumlahBatang,
      volumePerBatang,
      totalKubikasi: totalVolumeKubikasi,
      hargaPerKubik,
      totalNilai: totalNilaiKayu,
    };
    setKubikasiRows((prev) => [newRow, ...prev]);
  };

  const handleExecuteTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItem || qtyInput <= 0) return;

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} WIB`;
    const txId = `TRX-2026-${String(logs.length + 3).padStart(3, '0')}`;

    if (txType === 'KELUAR' && qtyInput > selectedItem.stokSaatIni) {
      const failedLog: TransactionLog = {
        id: txId,
        timestamp: timeStr,
        type: 'BARANG KELUAR',
        itemCode: selectedItem.kode,
        itemName: selectedItem.nama,
        qty: qtyInput,
        actorRole: activeRole,
        isError: true,
        blackBoxResult: `DITOLAK (Validasi Stok): Permintaan keluar (${qtyInput} ${selectedItem.satuan}) melebihi stok tersedia (${selectedItem.stokSaatIni} ${selectedItem.satuan}).`,
      };
      setLogs((prev) => [failedLog, ...prev.slice(0, 5)]);
      return;
    }

    const updatedItems = items.map((item) => {
      if (item.kode !== selectedItem.kode) return item;
      const delta = txType === 'MASUK' ? qtyInput : txType === 'KELUAR' ? -qtyInput : qtyInput;
      return {
        ...item,
        stokSaatIni: Math.max(0, item.stokSaatIni + delta),
      };
    });

    setItems(updatedItems);

    const sjNumber =
      txType === 'KELUAR'
        ? `SJ/JYL/2026/06/${String(26 + logs.length).padStart(3, '0')}`
        : undefined;

    const newLog: TransactionLog = {
      id: txId,
      timestamp: timeStr,
      type:
        txType === 'MASUK'
          ? 'BARANG MASUK'
          : txType === 'KELUAR'
          ? 'BARANG KELUAR'
          : 'RETUR BARANG',
      itemCode: selectedItem.kode,
      itemName: selectedItem.nama,
      qty: qtyInput,
      actorRole: activeRole,
      suratJalanNo: sjNumber,
      blackBoxResult:
        txType === 'MASUK'
          ? `VALID (Tabel 4.28 No. 5): INSERT tabel_barang_masuk · Stok ${selectedItem.kode} +${qtyInput} ${selectedItem.satuan}.`
          : txType === 'KELUAR'
          ? `VALID (Tabel 4.28 No. 6): INSERT tabel_barang_keluar · Surat Jalan ${sjNumber} siap cetak.`
          : `VALID (Tabel 4.28 No. 7): INSERT tabel_retur · Stok dikalibrasi +${qtyInput} ${selectedItem.satuan}.`,
    };

    setLogs((prev) => [newLog, ...prev.slice(0, 5)]);
    if (txType === 'KELUAR') {
      setActiveSuratJalan(newLog);
    }
  };

  const handleResetDemo = () => {
    setItems(INITIAL_SIM_INVENTORY);
    setActiveSuratJalan(null);
  };

  const totalUnits = items.reduce((acc, item) => acc + item.stokSaatIni, 0);
  const totalStokValueRp = items.reduce(
    (acc, item) => acc + item.stokSaatIni * item.hargaSatuan,
    0
  );

  return (
    <div className="border border-[#111111]/15 bg-white rounded-2xl p-6 md:p-8 shadow-sm">
      {/* Top header bar of simulator */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-6 border-b border-[#111111]/10">
        <div>
          <p className="text-xs font-mono-tabular text-[#DF2925] font-bold">
            + Implementasi Bab IV Skripsi · UD. Jaya Lestari (PHP CodeIgniter & MySQL)
          </p>
          <h3 className="text-xl md:text-2xl font-bold tracking-tight text-[#111111] mt-1">
            Simulasi Monitoring Stok Real-Time & Kalkulator Kubikasi Kayu (m³)
          </h3>
          <p className="text-sm text-[#111111]/75 mt-1 max-w-2xl leading-relaxed">
            Pilih mode simulasi di bawah untuk menguji langsung{' '}
            <strong className="text-[#111111]">Transaksi Keluar-Masuk & Monitoring Stok</strong>{' '}
            (Gambar 4.37–4.42 Skripsi) atau{' '}
            <strong className="text-[#111111]">Kalkulator Ukuran & Kubikasi Kayu</strong> (Gambar
            4.44 Hal. 130 Skripsi).
          </p>
        </div>

        {/* Mode Switcher: Monitoring Stok vs Kalkulator Kubikasi Kayu */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#0B0D13] border border-white/10 rounded-xl shadow-md">
            <button
              type="button"
              onClick={() => setSimMode('inventory')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                simMode === 'inventory'
                  ? 'bg-[#DF2925] text-white shadow-sm'
                  : 'text-white/75 hover:text-white hover:bg-white/10'
              }`}
            >
              <Boxes className="w-3.5 h-3.5" />
              <span>01. Transaksi & Monitoring Stok</span>
            </button>
            <button
              type="button"
              onClick={() => setSimMode('kubikasi')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                simMode === 'kubikasi'
                  ? 'bg-[#DF2925] text-white shadow-sm'
                  : 'text-white/75 hover:text-white hover:bg-white/10'
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>02. Kalkulator Kubikasi Kayu (m³)</span>
            </button>
          </div>
        </div>
      </div>

      {simMode === 'inventory' ? (
        <>
          {/* Role Context & Summary Metrics matching Gambar 4.33 & 4.41 Skripsi */}
          <div className="py-3.5 px-4 my-5 bg-[#F4F4F0] border-l-2 border-[#2563EB] flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-semibold text-[#111111]">Login Sebagai:</span>
              <div className="inline-flex items-center gap-1 p-0.5 bg-[#EAEAE4] border border-[#111111]/15 rounded-md">
                <button
                  type="button"
                  onClick={() => setActiveRole('Administrator')}
                  className={`px-2.5 py-1 text-xs font-semibold rounded transition-colors cursor-pointer ${
                    activeRole === 'Administrator'
                      ? 'bg-[#2563EB] text-white'
                      : 'text-[#111111]/70 hover:text-[#111111]'
                  }`}
                >
                  Administrator (admin)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveRole('Admin Gudang')}
                  className={`px-2.5 py-1 text-xs font-semibold rounded transition-colors cursor-pointer ${
                    activeRole === 'Admin Gudang'
                      ? 'bg-[#16A34A] text-white'
                      : 'text-[#111111]/70 hover:text-[#111111]'
                  }`}
                >
                  Admin Gudang (gudang)
                </button>
              </div>
              <button
                type="button"
                onClick={handleResetDemo}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-[#111111]/70 hover:text-[#111111] border border-[#111111]/15 rounded bg-white cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Stok</span>
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-4 font-mono-tabular text-[#111111]/75">
              <span>
                Total Stok: <strong className="text-[#111111]">{totalUnits} Unit</strong>
              </span>
              <span>·</span>
              <span>
                Total Nilai Stok:{' '}
                <strong className="text-[#2563EB]">
                  Rp {totalStokValueRp.toLocaleString('id-ID')}
                </strong>
              </span>
            </div>
          </div>

          {/* Main 12-column grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-4">
            {/* Form Input Transaksi */}
            <form
              onSubmit={handleExecuteTransaction}
              className="lg:col-span-5 bg-[#F4F4F0] border border-[#111111]/10 rounded-xl p-5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between border-b border-[#111111]/10 pb-3 mb-4">
                  <h4 className="text-sm font-semibold text-[#111111]">
                    Form Input Transaksi Gudang
                  </h4>
                  <span className="text-xs font-mono-tabular text-[#111111]/60">
                    Tabel 4.19 – 4.24
                  </span>
                </div>

                {/* Jenis Transaksi */}
                <div className="mb-4">
                  <label className="block text-xs font-semibold text-[#111111]/80 mb-1.5">
                    Pilih Menu Transaksi (Gambar 4.37 – 4.39)
                  </label>
                  <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#EAEAE4] rounded-lg">
                    <button
                      type="button"
                      onClick={() => setTxType('MASUK')}
                      className={`py-2 px-3 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                        txType === 'MASUK'
                          ? 'bg-[#2563EB] text-white'
                          : 'text-[#111111]/70 hover:text-[#111111]'
                      }`}
                    >
                      Barang Masuk
                    </button>
                    <button
                      type="button"
                      onClick={() => setTxType('KELUAR')}
                      className={`py-2 px-3 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                        txType === 'KELUAR'
                          ? 'bg-[#2563EB] text-white'
                          : 'text-[#111111]/70 hover:text-[#111111]'
                      }`}
                    >
                      Barang Keluar
                    </button>
                    <button
                      type="button"
                      onClick={() => setTxType('RETUR')}
                      className={`py-2 px-3 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                        txType === 'RETUR'
                          ? 'bg-[#2563EB] text-white'
                          : 'text-[#111111]/70 hover:text-[#111111]'
                      }`}
                    >
                      Retur Barang
                    </button>
                  </div>
                </div>

                {/* Pilih Barang */}
                <div className="mb-4">
                  <label
                    htmlFor="sim-item-select"
                    className="block text-xs font-semibold text-[#111111]/80 mb-1.5"
                  >
                    Pilih Data Barang (tabel_barang — Tabel 4.18)
                  </label>
                  <select
                    id="sim-item-select"
                    value={selectedCode}
                    onChange={(e) => setSelectedCode(e.target.value)}
                    className="w-full px-3 py-2.5 text-sm bg-white border border-[#111111]/20 rounded-lg text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                  >
                    {items.map((item) => (
                      <option key={item.kode} value={item.kode}>
                        {item.kode} — {item.nama} (Stok: {item.stokSaatIni} {item.satuan})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Kuantitas */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-1.5">
                    <label
                      htmlFor="sim-qty-input"
                      className="text-xs font-semibold text-[#111111]/80"
                    >
                      Jumlah ({selectedItem.satuan})
                    </label>
                    {txType === 'KELUAR' && (
                      <button
                        type="button"
                        onClick={() => setQtyInput(selectedItem.stokSaatIni + 15)}
                        className="text-xs text-[#2563EB] hover:underline font-mono-tabular cursor-pointer"
                      >
                        Uji melebihi stok ({selectedItem.stokSaatIni + 15})
                      </button>
                    )}
                  </div>
                  <input
                    id="sim-qty-input"
                    type="number"
                    min={1}
                    max={999}
                    value={qtyInput}
                    onChange={(e) => setQtyInput(Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm font-mono-tabular bg-white border border-[#111111]/20 rounded-lg text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                  />
                </div>

                {/* Keterangan / Tujuan */}
                <div className="mb-5">
                  <label
                    htmlFor="sim-note-input"
                    className="block text-xs font-semibold text-[#111111]/80 mb-1.5"
                  >
                    Supplier / Tujuan Pengiriman / Alasan Retur
                  </label>
                  <input
                    id="sim-note-input"
                    type="text"
                    value={noteInput}
                    onChange={(e) => setNoteInput(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white border border-[#111111]/20 rounded-lg text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
              >
                <span>Simpan Transaksi & Uji Black Box</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </form>

            {/* Tabel Monitoring Stok Real-Time & Log Black Box */}
            <div className="lg:col-span-7 flex flex-col gap-5">
              <div className="bg-[#F4F4F0] border border-[#111111]/10 rounded-xl p-5">
                <div className="flex items-center justify-between border-b border-[#111111]/10 pb-3 mb-3">
                  <h4 className="text-sm font-semibold text-[#111111]">
                    Halaman Monitoring Stok Real-Time (Gambar 4.41 Skripsi)
                  </h4>
                  <span className="text-xs font-mono-tabular text-[#111111]/60">
                    Database: MySQL
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-[#111111]/10 text-xs text-[#111111]/60">
                        <th className="py-2 pr-3 font-medium">Kode</th>
                        <th className="py-2 pr-3 font-medium">Nama Barang</th>
                        <th className="py-2 pr-3 font-medium">Supplier</th>
                        <th className="py-2 pr-3 font-medium text-right">Stok Sistem</th>
                        <th className="py-2 pr-3 font-medium text-right">Nilai Stok</th>
                        <th className="py-2 font-medium text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#111111]/8 text-xs">
                      {items.map((item) => {
                        const isLow = item.stokSaatIni <= item.stokMinimal;
                        const isSelected = item.kode === selectedCode;
                        const nilaiStok = item.stokSaatIni * item.hargaSatuan;
                        return (
                          <tr
                            key={item.kode}
                            onClick={() => setSelectedCode(item.kode)}
                            className={`cursor-pointer transition-colors ${
                              isSelected ? 'bg-[#2563EB]/8' : 'hover:bg-[#111111]/4'
                            }`}
                          >
                            <td className="py-2.5 pr-3 font-mono-tabular font-semibold text-[#111111]">
                              {item.kode}
                            </td>
                            <td className="py-2.5 pr-3 text-[#111111]">
                              <div className="font-medium">{item.nama}</div>
                              <div className="text-[#111111]/55">{item.kategori}</div>
                            </td>
                            <td className="py-2.5 pr-3 text-[#111111]/70">
                              {item.supplier}
                            </td>
                            <td className="py-2.5 pr-3 text-right font-mono-tabular font-semibold text-[#111111]">
                              {item.stokSaatIni} {item.satuan}
                            </td>
                            <td className="py-2.5 pr-3 text-right font-mono-tabular text-[#111111]/85">
                              Rp {nilaiStok.toLocaleString('id-ID')}
                            </td>
                            <td className="py-2.5 text-right font-mono-tabular">
                              {isLow ? (
                                <span className="text-amber-700 font-semibold">
                                  Stok Menipis
                                </span>
                              ) : (
                                <span className="text-emerald-800 font-semibold">
                                  Aman
                                </span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Hasil Log Black Box Testing */}
              <div className="bg-[#F4F4F0] border border-[#111111]/10 rounded-xl p-5">
                <div className="flex items-center justify-between border-b border-[#111111]/10 pb-2.5 mb-3">
                  <h4 className="text-sm font-semibold text-[#111111]">
                    Log Verifikasi Pengujian Sistem (Tabel 4.28 Skripsi)
                  </h4>
                  <span className="text-xs font-mono-tabular text-[#111111]/60">
                    Black Box Testing
                  </span>
                </div>

                <div className="space-y-2.5">
                  {logs.slice(0, 3).map((log) => (
                    <div
                      key={log.id}
                      className={`p-3 rounded-lg border text-xs ${
                        log.isError
                          ? 'bg-red-50/80 border-red-300 text-red-950'
                          : 'bg-white border-[#111111]/10 text-[#111111]'
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5 font-mono-tabular">
                          {log.isError ? (
                            <AlertTriangle className="w-3.5 h-3.5 text-red-700 shrink-0" />
                          ) : (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                          )}
                          <span className="font-semibold">{log.id}</span>
                          <span aria-hidden="true">·</span>
                          <span>{log.type}</span>
                          <span aria-hidden="true">·</span>
                          <span>{log.actorRole}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          {log.suratJalanNo && (
                            <button
                              type="button"
                              onClick={() => setActiveSuratJalan(log)}
                              className="inline-flex items-center gap-1 text-[#2563EB] font-semibold hover:underline cursor-pointer"
                            >
                              <Printer className="w-3 h-3" />
                              <span>Lihat Surat Jalan ({log.suratJalanNo})</span>
                            </button>
                          )}
                          <span className="font-mono-tabular text-[#111111]/55">
                            {log.timestamp}
                          </span>
                        </div>
                      </div>
                      <p className="mt-1.5 text-[#111111]/80 font-mono-tabular">
                        {log.blackBoxResult}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Preview Surat Jalan Otomatis */}
          {activeSuratJalan && (
            <div className="mt-6 bg-white border border-[#111111]/20 rounded-xl p-5">
              <div className="flex items-center justify-between border-b border-[#111111]/10 pb-3 mb-3">
                <div>
                  <span className="text-xs font-mono-tabular text-[#2563EB] font-semibold">
                    DOKUMEN PENGIRIMAN GUDANG — UD. JAYA LESTARI
                  </span>
                  <h5 className="text-base font-semibold text-[#111111]">
                    Pratinjau Cetak Surat Jalan Otomatis ({activeSuratJalan.suratJalanNo})
                  </h5>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveSuratJalan(null)}
                  className="px-3 py-1 text-xs font-medium text-[#111111]/70 hover:text-[#111111] border border-[#111111]/15 rounded-md cursor-pointer"
                >
                  Tutup Pratinjau
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs font-mono-tabular">
                <div>
                  <span className="text-[#111111]/55 block">No. Transaksi</span>
                  <span className="font-semibold text-[#111111]">{activeSuratJalan.id}</span>
                </div>
                <div>
                  <span className="text-[#111111]/55 block">Kode & Nama Barang</span>
                  <span className="font-semibold text-[#111111]">
                    {activeSuratJalan.itemCode} · {activeSuratJalan.itemName}
                  </span>
                </div>
                <div>
                  <span className="text-[#111111]/55 block">Kuantitas Keluar</span>
                  <span className="font-semibold text-[#111111]">{activeSuratJalan.qty} Batang/Unit</span>
                </div>
                <div>
                  <span className="text-[#111111]/55 block">Otorisasi & Tujuan</span>
                  <span className="font-semibold text-[#111111]">{activeSuratJalan.actorRole} · {noteInput}</span>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        /* =====================================================================
           MODE 2: KALKULATOR UKURAN & KUBIKASI KAYU (Gambar 4.44 Hal. 130 Skripsi)
        ====================================================================== */
        <div className="mt-6 space-y-6">
          <div className="bg-white border border-[#111111]/12 rounded-xl p-6">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#111111]/10 pb-4 mb-5">
              <div>
                <span className="text-xs font-mono-tabular text-[#DF2925] font-semibold">
                  FITUR KHUSUS SKRIPSI · GAMBAR 4.44 (HALAMAN 130) & TABEL 4.26
                </span>
                <h4 className="text-lg font-bold text-[#111111] mt-0.5">
                  Kalkulator Ukuran & Kubikasi Kayu Otomatis (m³) — UD. Jaya Lestari
                </h4>
              </div>
              <button
                type="button"
                onClick={() => {
                  setNamaUkuran('Kaso Kayu Sengon Standar');
                  setPanjangM(2);
                  setLebarCm(30);
                  setTinggiCm(3);
                  setJumlahBatang(3);
                  setHargaPerKubik(1000000);
                }}
                className="px-3 py-1.5 text-xs font-semibold bg-[#EAEAE4] hover:bg-[#111111] hover:text-white text-[#111111] rounded-md transition-colors cursor-pointer"
              >
                Reset ke Nilai Contoh Skripsi (2m × 30cm × 3cm)
              </button>
            </div>

            <form onSubmit={handleSaveKubikasi} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-[#111111]/80 mb-1">
                    Nama / Jenis Ukuran Kayu
                  </label>
                  <input
                    type="text"
                    value={namaUkuran}
                    onChange={(e) => setNamaUkuran(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-[#F4F4F0] border border-[#111111]/20 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#111111]/80 mb-1">
                    Panjang (m) *
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0.1"
                    value={panjangM}
                    onChange={(e) => setPanjangM(Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm font-mono-tabular bg-[#F4F4F0] border border-[#111111]/20 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#111111]/80 mb-1">
                    Lebar (cm) *
                  </label>
                  <input
                    type="number"
                    step="1"
                    min="1"
                    value={lebarCm}
                    onChange={(e) => setLebarCm(Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm font-mono-tabular bg-[#F4F4F0] border border-[#111111]/20 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#111111]/80 mb-1">
                    Tinggi / Tebal (cm) *
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    min="0.5"
                    value={tinggiCm}
                    onChange={(e) => setTinggiCm(Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm font-mono-tabular bg-[#F4F4F0] border border-[#111111]/20 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#111111]/80 mb-1">
                    Jumlah Batang *
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={jumlahBatang}
                    onChange={(e) => setJumlahBatang(Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm font-mono-tabular bg-[#F4F4F0] border border-[#111111]/20 rounded-lg"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pt-2">
                <div className="w-full sm:w-72">
                  <label className="block text-xs font-semibold text-[#111111]/80 mb-1">
                    Harga per m³ (Rp)
                  </label>
                  <input
                    type="number"
                    step="50000"
                    min="0"
                    value={hargaPerKubik}
                    onChange={(e) => setHargaPerKubik(Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm font-mono-tabular bg-[#F4F4F0] border border-[#111111]/20 rounded-lg"
                  />
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs sm:text-sm font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                >
                  + Hitung & Simpan ke Tabel Ukuran Kayu
                </button>
              </div>
            </form>

            {/* 3 Hasil Kalkulasi Card sesuai Gambar 4.44 Skripsi */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
              <div className="p-5 rounded-xl bg-[#0D9488] text-white">
                <div className="text-xs text-white/80">Volume per Batang</div>
                <div className="text-2xl sm:text-3xl font-bold font-mono-tabular mt-1">
                  {volumePerBatang.toLocaleString('id-ID', {
                    minimumFractionDigits: 3,
                    maximumFractionDigits: 4,
                  })}
                </div>
                <div className="text-xs font-mono-tabular text-white/80 mt-0.5">
                  m³ / batang
                </div>
              </div>

              <div className="p-5 rounded-xl bg-[#16A34A] text-white">
                <div className="text-xs text-white/80">Total Volume (Kubikasi)</div>
                <div className="text-2xl sm:text-3xl font-bold font-mono-tabular mt-1">
                  {totalVolumeKubikasi.toLocaleString('id-ID', {
                    minimumFractionDigits: 3,
                    maximumFractionDigits: 4,
                  })}
                </div>
                <div className="text-xs font-mono-tabular text-white/80 mt-0.5">
                  m³ ({jumlahBatang} Batang)
                </div>
              </div>

              <div className="p-5 rounded-xl bg-[#2563EB] text-white">
                <div className="text-xs text-white/80">Total Nilai</div>
                <div className="text-2xl sm:text-3xl font-bold font-mono-tabular mt-1">
                  Rp {totalNilaiKayu.toLocaleString('id-ID')}
                </div>
                <div className="text-xs font-mono-tabular text-white/80 mt-0.5">
                  harga per m³ Rp {hargaPerKubik.toLocaleString('id-ID')}
                </div>
              </div>
            </div>
          </div>

          {/* Tabel Data Ukuran Kayu (Tabel 4.26 Skripsi) */}
          <div className="bg-[#F4F4F0] border border-[#111111]/10 rounded-xl p-5">
            <div className="flex items-center justify-between border-b border-[#111111]/10 pb-3 mb-3">
              <h5 className="text-sm font-semibold text-[#111111]">
                Data Tersimpan pada Tabel Ukuran Kayu (MySQL: tabel_ukuran_kayu — Tabel 4.26)
              </h5>
              <span className="text-xs font-mono-tabular text-[#111111]/60">
                {kubikasiRows.length} Baris Data
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-[#111111]/10 text-[#111111]/60 font-mono-tabular">
                    <th className="py-2 pr-3">ID</th>
                    <th className="py-2 pr-3">Nama Ukuran</th>
                    <th className="py-2 pr-3">Dimensi (P × L × T)</th>
                    <th className="py-2 pr-3 text-right">Vol/Batang</th>
                    <th className="py-2 pr-3 text-right">Total Kubikasi</th>
                    <th className="py-2 text-right">Total Nilai</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#111111]/8 font-mono-tabular">
                  {kubikasiRows.map((row) => (
                    <tr key={row.id}>
                      <td className="py-2.5 pr-3 font-semibold text-[#111111]">{row.id}</td>
                      <td className="py-2.5 pr-3 font-sans font-medium text-[#111111]">
                        {row.namaUkuran}
                      </td>
                      <td className="py-2.5 pr-3 text-[#111111]/80">
                        {row.panjangM}m × {row.lebarCm}cm × {row.tinggiCm}cm ({row.jumlahBatang} btg)
                      </td>
                      <td className="py-2.5 pr-3 text-right text-[#111111]">
                        {row.volumePerBatang.toLocaleString('id-ID', {
                          minimumFractionDigits: 3,
                        })}{' '}
                        m³
                      </td>
                      <td className="py-2.5 pr-3 text-right font-semibold text-emerald-800">
                        {row.totalKubikasi.toLocaleString('id-ID', {
                          minimumFractionDigits: 3,
                        })}{' '}
                        m³
                      </td>
                      <td className="py-2.5 text-right font-semibold text-[#2563EB]">
                        Rp {row.totalNilai.toLocaleString('id-ID')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
