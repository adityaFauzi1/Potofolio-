// import heroWorkspaceImg from '../assets/images/hero_workspace_architecture_1791202150561.jpg';
import adityaBeachPortraitImg from '../assets/images/aditya_beach_cutout_centered.png';
import adityaFauziImg from '../assets/images/aditya fauzi.png';
import projectInventoryImg from '../assets/images/project_inventory_jaya_lestari_dashboard.png';
import projectEcommerceImg from '../assets/images/project_ecommerce.png';
import portofolioWebsiteImg from '../assets/images/portofolio_website.png';

export interface BlackBoxTestCase {
  id: string;
  module: string;
  scenario: string;
  inputData: string;
  expectedOutput: string;
  status: 'Berhasil / Valid';
}

export interface UmlArtifact {
  type: 'Use Case Diagram' | 'Activity Diagram' | 'Sequence Diagram' | 'Class Diagram';
  summary: string;
  actorsOrEntities: string;
  flowHighlight: string;
}

export interface ProjectItem {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  clientOrContext: string;
  category: 'fullstack' | 'architecture';
  categoryLabel: string;
  secondaryCategoryLabel?: string;
  period: string;
  liveUrl?: string;
  githubUrl?: string;
  disclaimer?: string;
  featured: boolean;
  image: string;
  techStack: string[];
  problemStatement: string;
  solutionSummary: string;
  highlights: string[];
  accessRoles: {
    role: string;
    permissions: string;
  }[];
  databaseTables: {
    tableName: string;
    primaryKey: string;
    columns: string;
    relation: string;
  }[];
  umlDiagrams: UmlArtifact[];
  blackBoxTests: BlackBoxTestCase[];
}

export const PROFILE_DATA = {
  name: 'Aditya Fauzi',
  npm: '2022804042',
  birthInfo: 'Bogor, 13 September 2004',
  degreeTitle: 'Sarjana Komputer (S.Kom)',
  roleTitle: 'Web Developer',
  coreFocus: 'PHP CodeIgniter · MySQL · Analisis Sistem Informasi',
  location: 'Tangerang, Banten',
  fullAddress: 'Kp. Cisereh RT 01 / RW 06, Desa Kadu Jaya, Kec. Curug, Tangerang, Banten',
  phone: '+62 882-9083-0504',
  phoneRaw: '6288290830504',
  email: 'adityafauzi399@gmail.com',
  // heroImage: heroWorkspaceImg,
  portraitImage: adityaFauziImg,
  summary:
    'Lulusan Sistem Informasi (IPK 3.40/4.00) dengan pengalaman merancang dan membangun sistem informasi berbasis web menggunakan PHP dan CodeIgniter, termasuk mengembangkan Sistem Informasi Inventory untuk UD. Jaya Lestari sebagai proyek skripsi serta Praktik Kerja Lapangan mengelola data produksi di PT Wilson Surya Unggul. Terbiasa menerapkan metode Prototype, pemodelan UML, dan pengujian Black Box Testing. Memiliki pemahaman basis data relasional (MySQL), pengalaman organisasi di bidang hubungan masyarakat, dan requirement gathering untuk menerjemahkan kebutuhan pengguna menjadi solusi sistem yang efektif.',
  cvSummary:
    'Lulusan S1 Sistem Informasi dari Universitas Insan Pembangunan Indonesia (UNIPI) dengan IPK 3.40/4.00. Memiliki latar belakang akademik pada pengembangan perangkat lunak, analisis sistem, dan manajemen basis data.',
  keyMetrics: [
    {
      value: '3.40 / 4.00',
      label: 'Indeks Prestasi Kumulatif',
      context: 'S1 Sistem Informasi · UNIPI (NPM 2022804042)',
    },
  ],
};

export const THESIS_METADATA = {
  title: 'ANALISA DAN PERANCANGAN SISTEM INFORMASI INVENTORY BERBASIS WEB PADA UD. JAYA LESTARI',
  author: 'Aditya Fauzi',
  npm: '2022804042',
  programStudi: 'Sistem Informasi (S1)',
  fakultas: 'Fakultas Ilmu Komputer',
  universitas: 'Universitas Insan Pembangunan Indonesia (UNIPI)',
  kampusAddress: 'Jl. Raya Serang KM 10 Bitung – Tangerang',
  academicYear: '2025/2026',
  defenseDate: '23 Agustus 2026',
  skNumber: '0236/DKN-FIK/UNIPI/VIII/2026',
  examRoom: 'FK 203',
  companyObject: 'UD. Jaya Lestari (Didirikan tahun 2003 oleh Bapak H. Marsudin)',
  companyBusiness: 'Jasa pemotongan kayu gelondongan menjadi balok kayu serta perdagangan jual beli kayu',
  companyAddress: 'Jl. Veteran No. 94, Kp. Cisereh, RT 001/RW 006, Desa Kadu Jaya, Kec. Curug, Kab. Tangerang, Banten 15810',
  researchPeriod: 'April s.d. Juli 2026 (4 Bulan)',
  advisors: {
    pembimbingMateri: 'Mustar Aman, S.Kom., M.Kom. (NUPTK: 7153754869130123)',
    pembimbingTeknis: 'Vanessa Stefanny, S.Kom., M.Kom. (NUPTK: 6259771672230253)',
    penguji1: 'Gusti Nyoman B, S.Kom., M.M. (NUPTK: 3760754655130102)',
    penguji2: 'Adiyanto, S.Kom., M.Kom. (NUPTK: 0435748649130103)',
    kaprodi: 'Nurasiah, S.Kom., MMSI. (NUPTK: 6041757658231123)',
    dekan: 'Dr. Jaka Suwita, S.Kom., MMSI. (NUPTK: 6741751652131122)',
  },
  abstrakId:
    'Pengelolaan persediaan barang merupakan salah satu faktor penting dalam mendukung kelancaran operasional perusahaan. UD. Jaya Lestari masih melakukan proses pencatatan barang masuk, barang keluar, dan stok barang secara manual menggunakan buku sehingga sering menimbulkan permasalahan seperti kesalahan pencatatan, kehilangan data, keterlambatan penyusunan laporan, serta kesulitan dalam memperoleh informasi stok secara cepat dan akurat. Penelitian ini bertujuan untuk merancang dan membangun Sistem Informasi Inventory Berbasis Web pada UD. Jaya Lestari menggunakan metode Prototype, bahasa pemrograman PHP, framework CodeIgniter, database MySQL, serta dimodelkan menggunakan UML (Use Case Diagram, Activity Diagram, Sequence Diagram, dan Class Diagram) dan diuji menggunakan Black Box Testing. Hasil penelitian menunjukkan bahwa sistem mampu membantu proses pengelolaan data barang, data Supplier, transaksi barang masuk, transaksi barang keluar, retur barang, pesanan barang, kalkulasi ukuran & kubikasi kayu (m³), stock opname, manajemen pengguna, serta penyajian laporan stok secara otomatis dan real-time.',
  keywords: ['Sistem Informasi Inventory', 'Database MySQL', 'Prototype', 'CodeIgniter', 'Persediaan Barang'],
  useCasesList: [
    { no: 1, name: 'Login', actor: 'Admin & Bagian Gudang', desc: 'Autentikasi pengguna menggunakan username dan password sesuai role.' },
    { no: 2, name: 'Kelola User', actor: 'Admin', desc: 'Menambah, mengubah, menghapus, dan melihat data pengguna sistem.' },
    { no: 3, name: 'Kelola Supplier', actor: 'Admin', desc: 'Mengelola data pemasok (PT. Dunia Kayu, PT. Wilson Surya Unggul, PT. Runhui Indonesia, PT. Parindo Jaya).' },
    { no: 4, name: 'Kelola Kategori', actor: 'Admin', desc: 'Mengelola pengelompokan jenis barang (Bahan Baku, Barang Jadi, Lain-lain).' },
    { no: 5, name: 'Kelola Barang', actor: 'Admin & Bagian Gudang', desc: 'Mengelola data master kayu (Kayu Gelondongan Sengon, Balok Kayu Meranti, Kaso Kayu Sengon).' },
    { no: 6, name: 'Kelola Barang Masuk', actor: 'Admin & Bagian Gudang', desc: 'Pencatatan penerimaan barang dari supplier sehingga stok bertambah otomatis.' },
    { no: 7, name: 'Kelola Barang Keluar', actor: 'Admin & Bagian Gudang', desc: 'Pencatatan pengeluaran barang ke pelanggan/tujuan sehingga stok berkurang otomatis.' },
    { no: 8, name: 'Kelola Retur', actor: 'Admin & Bagian Gudang', desc: 'Pencatatan pengembalian barang rusak/tidak sesuai spesifikasi (retur masuk & retur keluar).' },
    { no: 9, name: 'Lihat Semua Laporan', actor: 'Admin & Bagian Gudang', desc: 'Melihat, memfilter periode, mencetak PDF, atau mengekspor Excel seluruh laporan inventory.' },
    { no: 10, name: 'Logout', actor: 'Admin & Bagian Gudang', desc: 'Mengakhiri sesi pengguna dengan aman dan kembali ke halaman login.' },
    { no: 11, name: 'Kelola Pesanan', actor: 'Admin & Bagian Gudang', desc: 'Mengelola data pemesanan barang kepada supplier beserta status pesanan.' },
    { no: 12, name: 'Kelola Ukuran & Kubikasi Kayu', actor: 'Admin & Bagian Gudang', desc: 'Menghitung otomatis dimensi fisik kayu (Panjang, Lebar, Tinggi/Tebal) ke volume kubikasi (m³) & nilai harga.' },
    { no: 13, name: 'Stock Opname', actor: 'Admin & Bagian Gudang', desc: 'Menyamakan stok riil fisik kayu di gudang dengan stok sistem dan mencatat selisih.' },
  ],
  sourceCodeSnippet: `<?= $this->include('layouts/header') ?>
<?= $this->include('layouts/sidebar') ?>
<div class="main-content">
  <?= $this->include('layouts/topbar') ?>
  <div class="page-content">
    <?php if (session()->getFlashdata('success')): ?>
      <div class="alert alert-success alert-dismissible fade show">
        <i class="fas fa-check-circle"></i> <?= session()->getFlashdata('success') ?>
      </div>
    <?php endif; ?>
    <div class="card">
      <div class="card-header d-flex justify-content-between align-items-center">
        <span><i class="fas fa-users-cog"></i> Manajemen User</span>
        <a href="<?= base_url('users/create') ?>" class="btn btn-primary btn-sm">
          <i class="fas fa-plus"></i> Tambah User
        </a>
      </div>
      <div class="card-body">
        <table class="table table-striped table-hover">
          <thead class="table-dark">
            <tr><th>No</th><th>Nama User</th><th>Username</th><th>Email</th><th>Role</th><th>Aksi</th></tr>
          </thead>
          <tbody>
            <?php $no = 1; foreach ($users as $u): ?>
              <tr>
                <td><?= $no++ ?></td>
                <td><?= $u['nama_user'] ?></td>
                <td><?= $u['username'] ?></td>
                <td><?= $u['email'] ?? '-' ?></td>
                <td>
                  <?php if ($u['role'] == 'admin'): ?>
                    <span class="badge bg-primary">Administrator</span>
                  <?php else: ?>
                    <span class="badge bg-success">Admin Gudang</span>
                  <?php endif; ?>
                </td>
              </tr>
            <?php endforeach; ?>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>`,
};

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'inventory-ud-jaya-lestari',
    index: '01',
    title: 'Sistem Informasi Inventory Berbasis Web UD. Jaya Lestari',
    subtitle: 'Transformasi Digital Pengelolaan Kayu Gelondongan & Balok Kayu dengan 13 Modul Terintegrasi',
    clientOrContext: 'UD. Jaya Lestari — Kadu Jaya, Curug, Tangerang (2025/2026)',
    category: 'fullstack',
    categoryLabel: 'Full-Stack Web & Database',
    secondaryCategoryLabel: 'Analisis Sistem & QA',
    period: 'April – Juli 2026',
    liveUrl: 'https://udjayalestari.ai.studio/',
    githubUrl: 'https://github.com/adityafauzi/inventory-ud-jaya-lestari', // TODO: ganti dengan URL repositori GitHub asli kamu
    featured: true,
    image: projectInventoryImg,
    techStack: ['PHP', 'CodeIgniter (MVC)', 'MySQL (phpMyAdmin)', 'VSCode', 'Draw.io (UML)', 'Black Box Testing'],
    problemStatement:
      'UD. Jaya Lestari (perusahaan pengolahan kayu gelondongan menjadi balok kayu milik Bapak H. Marsudin) sebelumnya mencatat barang masuk, barang keluar, dan stok menggunakan buku tulis manual. Hal ini memicu human error, duplikasi data, kesulitan menghitung stok fisik (stock opname), serta keterlambatan laporan bulanan.',
    solutionSummary:
      'Merancang dan membangun Sistem Informasi Inventory Berbasis Web menggunakan PHP, framework CodeIgniter, dan 10 tabel database MySQL dengan 2 hak akses (Administrator & Admin Gudang), dilengkapi fitur Kalkulator Ukuran & Kubikasi Kayu (m³), Monitoring Stok Real-Time, Stock Opname, Pesanan, Retur, dan Ekspor Laporan PDF/Excel.',
    highlights: [
      'Merancang dan membangun sistem informasi inventory berbasis web untuk UD. Jaya Lestari menggunakan PHP, framework CodeIgniter, dan database MySQL, menggantikan pencatatan barang masuk, barang keluar, dan stok kayu yang sebelumnya dilakukan manual.',
      'Mengembangkan 13 modul utama: Login Multi-Role, Data Barang, Kategori (Bahan Baku & Barang Jadi), Supplier, Barang Masuk, Barang Keluar, Retur Barang, Pesanan Barang, Monitoring Stok Real-Time, Stock Opname, Kalkulator Ukuran & Kubikasi Kayu (m³), Semua Laporan (PDF/Excel), serta Manajemen User.',
      'Menerapkan metode pengembangan Prototype dengan pemodelan UML (Use Case, Activity, Sequence, dan Class Diagram) menggunakan Draw.io serta pengujian 14 skenario Black Box Testing dengan hasil 100% Valid.',
    ],
    accessRoles: [
      {
        role: 'Administrator (admin / admin123)',
        permissions:
          'Hak akses penuh: mengelola Manajemen User, Supplier (PT. Dunia Kayu, PT. Wilson Surya Unggul, PT. Runhui Indonesia, PT. Parindo Jaya), Kategori, Data Barang, Pesanan, Barang Masuk/Keluar, Retur, Kalkulator Kubikasi Kayu, Stock Opname, dan cetak Semua Laporan.',
      },
      {
        role: 'Bagian Gudang / Admin Gudang (gudang / gudang123)',
        permissions:
          'Hak akses operasional gudang: mengelola Data Barang, mencatat transaksi Barang Masuk, Barang Keluar, Retur Barang, Stock Opname fisik kayu, Kalkulasi Kubikasi Kayu, serta mencetak Laporan Persediaan & Surat Jalan.',
      },
    ],
    databaseTables: [
      {
        tableName: 'tabel_barang (Tabel 4.18)',
        primaryKey: 'id_barang INT(11)',
        columns: 'kode_barang VARCHAR(20), nama_barang VARCHAR(100), id_kategori INT(11), jenis_barang VARCHAR(50), harga DECIMAL(15,2), satuan VARCHAR(20), stok INT(11), stok_minimum INT(11), deskripsi TEXT',
        relation: 'Berelasi dengan tabel_kategori, tabel_barang_masuk, tabel_barang_keluar, dan tabel_retur',
      },
      {
        tableName: 'tabel_barang_keluar (Tabel 4.19)',
        primaryKey: 'id_keluar INT(11)',
        columns: 'no_transaksi VARCHAR(30), tanggal_keluar DATE, id_barang INT(11), jumlah INT(11), tujuan VARCHAR(150), penerima VARCHAR(100), keterangan TEXT, id_user INT(11)',
        relation: 'Otomatis mengurangi saldo stok pada tabel_barang',
      },
      {
        tableName: 'tabel_barang_masuk (Tabel 4.20)',
        primaryKey: 'id_masuk INT(11)',
        columns: 'no_transaksi VARCHAR(30), tanggal_masuk DATE, id_supplier INT(11), id_barang INT(11), jumlah INT(11), harga DECIMAL(15,2), total_harga DECIMAL(15,2), keterangan TEXT, id_user INT(11)',
        relation: 'Otomatis menambah saldo stok pada tabel_barang',
      },
      {
        tableName: 'tabel_kategori (Tabel 4.21)',
        primaryKey: 'id_kategori INT(11)',
        columns: 'nama_kategori VARCHAR(100), created_at DATETIME, updated_at DATETIME',
        relation: 'One-to-Many dengan tabel_barang (Bahan Baku, Barang Jadi, Lain-lain)',
      },
      {
        tableName: 'tabel_pesanan & pesanan_detail (Tabel 4.22 & 4.23)',
        primaryKey: 'id_pesanan INT(11) / id_detail INT(11)',
        columns: 'no_pesanan VARCHAR(30), tanggal_pesan DATE, id_supplier INT(11), status VARCHAR(30), qty INT(11), harga DECIMAL(15,2), subtotal DECIMAL(15,2)',
        relation: 'Pemesanan stok kayu kepada supplier beserta rincian item',
      },
      {
        tableName: 'tabel_retur (Tabel 4.24)',
        primaryKey: 'id_retur INT(11)',
        columns: 'no_retur VARCHAR(30), tanggal_retur DATE, id_barang INT(11), jumlah_retur INT(11), jenis_retur ENUM, keterangan TEXT, id_user INT(11)',
        relation: 'Penyesuaian stok otomatis untuk barang rusak/tidak sesuai spesifikasi',
      },
      {
        tableName: 'tabel_supplier (Tabel 4.25)',
        primaryKey: 'id_supplier INT(11)',
        columns: 'kode_supplier VARCHAR(20), nama_supplier VARCHAR(100), alamat TEXT, no_telp VARCHAR(20), email VARCHAR(100), keterangan TEXT',
        relation: 'Menyimpan data pemasok (SUP001 s/d SUP004)',
      },
      {
        tableName: 'tabel_ukuran_kayu (Tabel 4.26)',
        primaryKey: 'id_ukuran INT(11)',
        columns: 'nama_ukuran VARCHAR(50), panjang_m DECIMAL(10,2), lebar_cm DECIMAL(10,2), tinggi_cm DECIMAL(10,2), harga_per_kubik DECIMAL(15,2), keterangan TEXT',
        relation: 'Kalkulasi otomatis volume kubikasi kayu (m³) dan harga per kubik',
      },
      {
        tableName: 'tabel_users (Tabel 4.27)',
        primaryKey: 'id_user INT(11)',
        columns: 'nama_user VARCHAR(100), username VARCHAR(50), password VARCHAR(255), email VARCHAR(100), role ENUM(admin, gudang), foto VARCHAR(255)',
        relation: 'Otorisasi sesi pengguna dan audit trail transaksi',
      },
    ],
    umlDiagrams: [
      {
        type: 'Use Case Diagram',
        summary: 'Memetakan interaksi 2 aktor sistem usulan (Admin & Bagian Gudang) terhadap 13 Use Case fungsional (Gambar 4.4 Skripsi).',
        actorsOrEntities: 'Aktor: Admin (Akses Penuh) & Bagian Gudang (Operasional Gudang)',
        flowHighlight: 'Mencakup Kelola User, Kategori, Supplier, Pesanan, Barang, Barang Masuk/Keluar, Retur, Laporan, Stock Opname, & Ukuran Kubikasi Kayu.',
      },
      {
        type: 'Activity Diagram',
        summary: 'Memodelkan 13 alur aktivitas sistem usulan menggunakan Swimlane Admin/Bagian Gudang dan Sistem (Gambar 4.5 s/d 4.17).',
        actorsOrEntities: 'Swimlane: Admin Dan Bagian Gudang · Sistem Aplikasi',
        flowHighlight: 'Setiap input data melewati Decision Node "Valid?" sebelum disimpan ke database MySQL.',
      },
      {
        type: 'Sequence Diagram',
        summary: 'Menggambarkan urutan pesan antar Actor, Boundary (Menu Utama, Halaman, Form), Control (Proses), dan Entity (Gambar 4.18 s/d 4.30).',
        actorsOrEntities: 'Lifeline: Actor -> Menu Utama -> Halaman -> Form -> Control Proses -> Entity Database',
        flowHighlight: 'Mendukung operasi Tambah, Edit, Hapus, Kalkulasi Kubikasi Otomatis, serta Cetak/Export PDF Laporan Stok.',
      },
      {
        type: 'Class Diagram',
        summary: 'Menjelaskan struktur 10 kelas/tabel database yang saling berelasi beserta tipe data, Primary Key, Foreign Key, dan method operasi (Gambar 4.31).',
        actorsOrEntities: 'Kelas: Kategori, Barang, BarangMasuk, BarangKeluar, Retur, Pesanan, PesananDetail, Supplier, UkuranKayu, Users',
        flowHighlight: 'Relasi kardinalitas 1..* dan 0..* menjamin integritas referensial seluruh histori stok kayu.',
      },
    ],
    blackBoxTests: [
      {
        id: 'UJI-01',
        module: 'Login & Logout (No. 1 & 14)',
        scenario: 'Memasukkan username dan password yang benar lalu menguji fungsi Logout',
        inputData: 'username: "admin", password: "********"',
        expectedOutput: 'Menampilkan halaman Dashboard utama sesuai role dan kembali ke halaman login saat Logout',
        status: 'Berhasil / Valid',
      },
      {
        id: 'UJI-02',
        module: 'Data Barang, Kategori & Supplier (No. 2, 3, 4)',
        scenario: 'Menambah data barang kayu baru, kategori barang, dan data supplier',
        inputData: 'BRG008 (Kayu Gelondongan Sengon), Kategori: Bahan Baku, Supplier: SUP004',
        expectedOutput: 'Data barang, kategori, dan supplier berhasil disimpan ke database MySQL',
        status: 'Berhasil / Valid',
      },
      {
        id: 'UJI-03',
        module: 'Barang Masuk, Barang Keluar & Retur (No. 5, 6, 7)',
        scenario: 'Menambahkan transaksi barang masuk, barang keluar, dan retur barang',
        inputData: 'Masuk: +32 Batang · Keluar: -10 Batang · Retur: +2 Batang',
        expectedOutput: 'Data transaksi tersimpan dan saldo stok bertambah/berkurang secara otomatis dan real-time',
        status: 'Berhasil / Valid',
      },
      {
        id: 'UJI-04',
        module: 'Monitoring Stok & Stock Opname (No. 9 & 10)',
        scenario: 'Membuka halaman monitoring stok dan menyimpan hasil pencocokan stok fisik (Stock Opname)',
        inputData: 'Stok Sistem: 32 Batang, Stok Fisik: 32 Batang (Selisih: 0)',
        expectedOutput: 'Sistem menampilkan stok terbaru, indikator Stok Menipis, dan menyimpan hasil opname',
        status: 'Berhasil / Valid',
      },
      {
        id: 'UJI-05',
        module: 'Ukuran & Kubikasi Kayu serta Laporan PDF/Excel (No. 12 & 13)',
        scenario: 'Menghitung kubikasi data kayu (m³) dan mencetak laporan periode',
        inputData: 'Panjang: 2m, Lebar: 30cm, Tebal: 3cm, Jml: 3 Batang -> 0,054 m³ (Rp 54.000)',
        expectedOutput: 'Sistem menghitung kubikasi dengan cepat & akurat serta laporan berhasil dicetak ke PDF/Excel',
        status: 'Berhasil / Valid',
      },
    ],
  },
  {
    id: 'ecommerce-keyword-sneakers',
    index: '02',
    title: 'Aplikasi Web E-Commerce Toko Sneaker',
    subtitle: 'Proyek Pembelajaran Mata Kuliah — Aplikasi Web Penjualan dengan Fitur Flash Sale, Keranjang, Voucher & Multi-Toko',
    clientOrContext: 'Tugas Mata Kuliah — Proyek Web Penjualan (E-Commerce)',
    category: 'fullstack',
    categoryLabel: 'Full-Stack Web & Database',
    period: 'Januari – Maret 2026',
    githubUrl: 'https://github.com/adityafauzi/ecommerce-sneaker', // TODO: ganti dengan URL repositori GitHub asli kamu
    featured: true,
    image: projectEcommerceImg,
    techStack: ['HTML', 'CSS', 'MySQL (phpMyAdmin)', 'VSCode'],
    disclaimer:
      'Proyek ini dikerjakan sebagai tugas mata kuliah dari dosen, yaitu membangun aplikasi web penjualan (e-commerce) toko sneaker sebagai media pembelajaran.',
    problemStatement:
      'Proyek ini dikerjakan sebagai tugas mata kuliah dari dosen untuk membangun sebuah aplikasi web e-commerce toko sneaker sebagai media pembelajaran. Tujuannya adalah mempraktikkan perancangan antarmuka (UI) serta penerapan HTML, CSS, dan basis data MySQL (phpMyAdmin) pada studi kasus penjualan sneaker secara online, yang mencakup katalog produk, pencarian & filter, halaman Flash Sale, keranjang belanja, sistem voucher, dan alur checkout multi-tahap.',
    solutionSummary:
      'Merancang antarmuka (UI) dan membangun aplikasi web e-commerce toko sneaker sebagai proyek tugas mata kuliah menggunakan HTML dan CSS dengan basis data MySQL (phpMyAdmin). Aplikasi menyediakan katalog produk sneaker, pencarian & filter, halaman Flash Sale dengan hitungan mundur otomatis, keranjang belanja interaktif, sistem voucher, serta alur checkout multi-tahap (pengiriman, kurir, dan pembayaran) dengan tata letak (layout) responsif yang modern.',
    highlights: [
      'Merancang antarmuka (UI) dan membangun aplikasi web e-commerce toko sneaker sebagai proyek tugas mata kuliah menggunakan HTML dan CSS dengan basis data MySQL (phpMyAdmin).',
      'Mengembangkan halaman utama (beranda) dengan banner carousel "Sneaker Collection", menu navigasi (Home, All Products, Flash Sale, Vouchers, Stores), serta kotak pencarian produk yang responsif.',
      'Menyediakan fitur Flash Sale dengan timer hitungan mundur (countdown) real-time, label diskon pada kartu produk, dan tautan "See All" untuk menampilkan seluruh produk promo.',
      'Menerapkan keranjang belanja (shopping cart) interaktif dengan penambahan/pengurangan jumlah item, perhitungan subtotal otomatis, dan penerapan kode voucher potongan harga.',
      'Membangun alur checkout multi-tahap yang mencakup data pengiriman, pemilihan kurir, metode pembayaran, serta riwayat dan status pesanan (pending, dibayar, dikirim, selesai).',
      'Menerapkan hak akses multi-role (Pelanggan, Penjual/Admin Toko, dan Administrator) untuk memisahkan hak kelola katalog, transaksi, dan konfigurasi sistem.',
      'Menjaga tampilan responsif (desktop, tablet, dan mobile) menggunakan CSS modern beserta tata letak grid & flexbox agar nyaman diakses di berbagai perangkat.',
    ],

    accessRoles: [
      {
        role: 'Pelanggan / Customer',
        permissions: 'Mencari & melihat produk, menambahkan ke keranjang, menggunakan voucher, melakukan checkout, dan melacak status pesanan.',
      },
      {
        role: 'Penjual / Admin Toko',
        permissions: 'Mengelola data toko, menambah & memperbarui produk (nama, harga, stok, diskon, gambar), mengatur Flash Sale, serta memproses pesanan masuk.',
      },
      {
        role: 'Administrator',
        permissions: 'Mengelola seluruh akun pengguna & toko, kategori produk, master voucher, verifikasi pembayaran, dan melihat laporan penjualan keseluruhan.',
      },
    ],
    databaseTables: [
      {
        tableName: 'tabel_produk',
        primaryKey: 'id_produk',
        columns: 'nama, merek, id_kategori, harga, diskon, stok, gambar, rating, deskripsi',
        relation: 'Sumber data utama katalog sneaker yang dirender ke halaman Beranda, All Products, dan Flash Sale.',
      },
      {
        tableName: 'tabel_kategori',
        primaryKey: 'id_kategori',
        columns: 'nama_kategori (Running, Basketball, Casual, Lifestyle)',
        relation: 'Digunakan untuk mengelompokkan produk serta mengaktifkan fitur filter pada halaman katalog.',
      },
      {
        tableName: 'tabel_keranjang',
        primaryKey: 'id_keranjang',
        columns: 'id_produk, id_pengguna, qty, subtotal',
        relation: 'Diperbarui setiap pengguna menambah/mengurangi item; subtotal dihitung otomatis saat checkout.',
      },
      {
        tableName: 'tabel_voucher',
        primaryKey: 'kode_voucher',
        columns: 'tipe (potongan/persen), nilai, min_belanja, masa_berlaku',
        relation: 'Divalidasi terhadap subtotal keranjang sebelum diskon diterapkan pada total pembayaran.',
      },
      {
        tableName: 'tabel_flash_sale',
        primaryKey: 'id_flash',
        columns: 'id_produk, harga_flash, diskon_persen, stok_flash, waktu_selesai',
        relation: 'waktu_selesai menjadi acuan timer hitungan mundur (countdown) real-time di halaman Flash Sale.',
      },
      {
        tableName: 'tabel_pesanan',
        primaryKey: 'id_pesanan',
        columns: 'no_pesanan, id_pengguna, alamat_kirim, kurir, metode_bayar, total, status (pending, dibayar, dikirim, selesai)',
        relation: 'Dirangkai dari isi keranjang saat checkout dan ditampilkan pada riwayat & status pesanan pengguna.',
      },
      {
        tableName: 'tabel_detail_pesanan',
        primaryKey: 'id_detail',
        columns: 'id_pesanan, id_produk, qty, harga_satuan, subtotal',
        relation: 'Merinci setiap item dalam satu pesanan serta mengurangi stok pada tabel_produk setelah pembayaran terkonfirmasi.',
      },
    ],

    umlDiagrams: [
      {
        type: 'Use Case Diagram',
        summary: 'Memetakan interaksi 3 aktor (Pelanggan, Penjual, & Administrator) terhadap 12 Use Case utama seperti Cari Produk, Kelola Keranjang, Checkout, Kelola Flash Sale, dan Verifikasi Pembayaran.',
        actorsOrEntities: 'Aktor: Pelanggan (Customer), Penjual/Admin Toko (Seller), & Administrator (Akses Penuh)',
        flowHighlight: 'Mencakup Lihat/Cari Produk, Keranjang, Voucher, Checkout & Pembayaran, Kelola Toko/Produk, Flash Sale, serta Laporan Penjualan.',
      },
      {
        type: 'Activity Diagram',
        summary: 'Memodelkan alur aktivitas pembelian sneaker mulai dari memilih produk, menambahkan ke keranjang, menerapkan voucher, hingga penyelesaian pembayaran menggunakan Swimlane Pelanggan dan Sistem.',
        actorsOrEntities: 'Swimlane: Pelanggan · Antarmuka Aplikasi (UI) · Metode Pembayaran',
        flowHighlight: 'Setiap tahap melewati Decision Node "Stok tersedia?" dan "Voucher valid?" sebelum status pesanan diperbarui.',
      },
      {
        type: 'Sequence Diagram',
        summary: 'Menggambarkan urutan interaksi antar Pengguna, Komponen Antarmuka (Halaman Produk & Checkout), serta Basis Data MySQL (phpMyAdmin) pada alur pemesanan dan flash sale.',
        actorsOrEntities: 'Lifeline: Pengguna -> Halaman Produk -> Keranjang -> Query MySQL -> Tabel Produk/Pesanan',
        flowHighlight: 'Mendukung operasi Tambah ke Keranjang, Hitung Subtotal Otomatis, Terap Voucher, serta Perbarui Stok pada basis data setelah checkout.',
      },
      {
        type: 'Class Diagram',
        summary: 'Menjelaskan struktur entitas basis data relasional MySQL yang saling berelasi melalui kunci primer & kunci asing untuk mengelola katalog, keranjang, serta pesanan.',
        actorsOrEntities: 'Entitas: Produk, Kategori, Keranjang, Voucher, FlashSale, Pesanan, Detail Pesanan, Pengguna',
        flowHighlight: 'Relasi antar entitas (Foreign Key) menjamin integritas katalog produk dan perhitungan keranjang belanja.',
      },
    ],

    blackBoxTests: [
      {
        id: 'UJI-01',
        module: 'Registrasi, Login & Logout',
        scenario: 'Mendaftar akun pelanggan baru, masuk dengan kredensial benar, lalu menguji fungsi Logout',
        inputData: 'email: "pembeli@email.com", password: "********"',
        expectedOutput: 'Akun berhasil terdaftar, pelanggan diarahkan ke beranda sesuai role, dan keluar dari sistem saat Logout',
        status: 'Berhasil / Valid',
      },
      {
        id: 'UJI-02',
        module: 'Pencarian, Filter & Detail Produk',
        scenario: 'Mencari kata kunci sneaker, memfilter berdasarkan kategori/merek, dan membuka halaman detail produk',
        inputData: 'Kata kunci: "Nike", Filter: Kategori "Running", Merek: "Nike"',
        expectedOutput: 'Sistem menampilkan daftar produk sesuai kata kunci & filter beserta halaman detail lengkap dengan harga, diskon, dan stok',
        status: 'Berhasil / Valid',
      },
      {
        id: 'UJI-03',
        module: 'Keranjang & Voucher',
        scenario: 'Menambahkan produk ke keranjang, mengubah jumlah item, dan menerapkan kode voucher potongan harga',
        inputData: 'Produk: Nike Air Zoom (Rp 1.200.000) x1 · Voucher: "HEMAT100K" (Rp 100.000)',
        expectedOutput: 'Subtotal terhitung otomatis, voucher valid mengurangi total belanja, dan data keranjang tersimpan pada tabel keranjang di basis data MySQL',
        status: 'Berhasil / Valid',
      },
      {
        id: 'UJI-04',
        module: 'Checkout & Pembayaran',
        scenario: 'Melakukan checkout dengan mengisi alamat pengiriman, memilih kurir & metode pembayaran, lalu menyelesaikan pesanan',
        inputData: 'Kurir: JNE REG · Metode: Transfer Bank · Total: Rp 1.175.000',
        expectedOutput: 'Pesanan tersimpan pada tabel pesanan dengan status "pending", stok produk diperbarui di basis data, dan rincian pembayaran tercatat pada ringkasan pesanan',
        status: 'Berhasil / Valid',
      },
      {
        id: 'UJI-05',
        module: 'Flash Sale & Hitungan Mundur',
        scenario: 'Membuka halaman Flash Sale dan menguji tampilan timer hitungan mundur serta pembelian produk promo sebelum waktu habis',
        inputData: 'Produk: Adidas Superstar — Harga Flash Rp 899.000 (Diskon 25%), Sisa waktu: 00:59:35',
        expectedOutput: 'Timer berjalan mundur real-time, label FLASH SALE & harga diskon tampil benar, dan pembelian berhasil selama stok flash masih tersedia',
        status: 'Berhasil / Valid',
      },
    ],
  },
  {
    id: 'portfolio-website',
    index: '03',
    title: 'Portfolio Website Aditya Fauzi',
    subtitle: 'Personal Portfolio & Showcase Project — Web Developer PHP CodeIgniter & MySQL',
    clientOrContext: 'Personal Project — Aditya Fauzi | Web Developer Portfolio',
    category: 'fullstack',
    categoryLabel: 'Full-Stack Web & Portfolio',
    secondaryCategoryLabel: 'Personal Branding & UI/UX',
    period: 'Agustus – Oktober 2026',
    githubUrl: 'https://github.com/adityaFauzi1/Potofolio-.git',
    featured: false,
    image: portofolioWebsiteImg,
    techStack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Lucide React'],
    problemStatement:
      'Sebagai lulusan Sistem Informasi (IPK 3.40/4.00) dengan pengalaman merancang dan membangun sistem informasi berbasis web menggunakan PHP dan CodeIgniter, diperlukan platform digital untuk menampilkan profil, proyek, dan kompetensi sebagai Web Developer kepada calon klien atau pemberi kerja. Portfolio perlu menyajikan informasi terkait lulusan Sistem Informasi, proyek skripsi Sistem Informasi Inventory untuk UD. Jaya Lestari, Praktik Kerja Lapangan mengelola data produksi di PT Wilson Surya Unggul, serta keterampilan dalam metode Prototype, pemodelan UML, dan pengujian Black Box Testing.',
    solutionSummary:
      'Membangun portfolio website modern dan responsif menggunakan React, TypeScript, Vite, dan Tailwind CSS. Website menampilkan section Home (hero dengan typewriter effect), About (profil & pengalaman), Portfolio/Projects (karya terkait sistem informasi dan web development), serta Contact. Dilengkapi dark mode toggle, animasi scroll reveal, dan navigasi yang mudah diakses. Data konten terstruktur terpusat di portfolioData.ts untuk memudahkan pemeliharaan dan pembaruan.',
    highlights: [
      'Membangun portfolio website pribadi sebagai platform menampilkan profil, proyek, dan kompetensi Web Developer.',
      'Menggunakan React, TypeScript, Vite, Tailwind CSS, dan Framer Motion untuk tampilan modern, responsif, dan interaktif.',
      'Menampilkan informasi lulusan Sistem Informasi (IPK 3.40/4.00), pengalaman PHP CodeIgniter, proyek skripsi Inventory UD. Jaya Lestari, dan PKL PT Wilson Surya Unggul.',
      'Dilengkapi dark mode toggle, animasi scroll reveal, serta navigasi yang mudah diakses.',
      'Data konten terstruktur terpusat di portfolioData.ts untuk memudahkan pemeliharaan dan pembaruan.',
    ],
    accessRoles: [],
    databaseTables: [],
    umlDiagrams: [],
    blackBoxTests: [],
  },

];

export const SKILLS_CATEGORIES = [
  {
    index: '01',
    title: 'Programming & Framework',
    description: 'Mengembangkan aplikasi web dan membangun fitur sesuai kebutuhan pengguna.',
    items: ['PHP', 'CodeIgniter', 'Laravel'],
  },
  {
    index: '02',
    title: 'Database Management',
    description: 'Mengelola, menyimpan, dan mengintegrasikan data aplikasi.',
    items: ['MySQL'],
  },
  {
    index: '03',
    title: 'Development Tools',
    description: 'Mengembangkan, menjalankan, dan menguji aplikasi berbasis web.',
    items: ['Visual Studio Code', 'XAMPP'],
  },
  {
    index: '04',
    title: 'System Design',
    description: 'Menganalisis kebutuhan serta merancang alur dan struktur sistem.',
    items: ['Prototype', 'UML (Use Case, Activity, Sequence, Class Diagram)'],
  },
  {
    index: '05',
    title: 'Software Testing',
    description: 'Menguji fungsionalitas aplikasi untuk memastikan setiap fitur berjalan sesuai kebutuhan.',
    items: ['Black Box Testing'],
  },
  {
    index: '06',
    title: 'Requirement Analysis',
    description: 'Mengidentifikasi kebutuhan sistem melalui observasi, wawancara, dan dokumentasi.',
    items: ['Requirement Gathering'],
  },
];

export const EXPERIENCE_DATA = [
  {
    id: 'pkl-wilson-surya-unggul',
    type: 'Pengalaman Kerja / Industri',
    role: 'Praktik Kerja Lapangan (PKL) – Produksi',
    organization: 'PT Wilson Surya Unggul',
    period: 'Program PKL Industri',
    metricHighlight: '98% Akurasi Data Stok Fisik & ERP',
    summary:
      'Mengelola dan mencatat data produksi kabel harian serta menjaga sinkronisasi stok fisik dengan sistem ERP perusahaan.',
    responsibilities: [
      'Mencatat data produksi harian dan merekap data kabel (NYA, NYM, NYY, dan seri lainnya).',
      'Menjaga akurasi stok fisik dengan sistem ERP hingga 98%.',
      'Mendukung pelaporan harian untuk meminimalkan selisih data material.',
    ],
  },
  {
    id: 'humas-hmsi-unipi',
    type: 'Pengalaman Organisasi & Kepemimpinan',
    role: 'Hubungan Masyarakat (Humas)',
    organization: 'HMSI — Universitas Insan Pembangunan Indonesia (UNIPI)',
    period: '2023 – 2024',
    metricHighlight: 'Komunikasi Internal & Eksternal Kampus',
    summary:
      'Menjembatani komunikasi strategis HMSI dengan mahasiswa, civitas akademika, dan mitra eksternal kampus.',
    responsibilities: [
      'Membangun komunikasi dan kerja sama HMSI dengan pihak internal & eksternal kampus.',
      'Menyampaikan informasi kegiatan, koordinasi lintas divisi, dan publikasi organisasi.',
      'Mengasah kemampuan requirement gathering, teamwork, dan relationship building.',
    ],
  },
];

export const EDUCATION_DATA = {
  degree: 'Sarjana Komputer (S.Kom)',
  major: 'Sistem Informasi (S1)',
  npm: '2022804042',
  university: 'Universitas Insan Pembangunan Indonesia (UNIPI)',
  location: 'Jl. Raya Serang KM 10 Bitung – Tangerang, Banten',
  period: '2022 – 2026 (Sidang: 23 Agustus 2026)',
  gpa: '3.40 / 4.00',
  focusAreas: ['Pengembangan Perangkat Lunak', 'Analisis Sistem', 'Manajemen Basis Data'],
  thesisTitle: 'Analisa Dan Perancangan Sistem Informasi Inventory Berbasis Web pada UD. Jaya Lestari',
  advisors: 'Mustar Aman, S.Kom., M.Kom. (Materi) & Vanessa Stefanny, S.Kom., M.Kom. (Teknis)',
  priorSchools: ['SMK AL-Hikmah', 'MTS Miftahul Khaer', 'MIN 1 Tangerang'],
  thesisTags: ['Metode Prototype', 'PHP CodeIgniter', 'MySQL (10 Tabel)', 'UML (Draw.io)', 'Black Box Testing (14 Fitur)'],
};

export interface SimInventoryItem {
  kode: string;
  nama: string;
  kategori: string;
  supplier: string;
  satuan: string;
  hargaSatuan: number;
  stokAwal: number;
  stokSaatIni: number;
  stokMinimal: number;
}

export const INITIAL_SIM_INVENTORY: SimInventoryItem[] = [
  {
    kode: 'BRG008',
    nama: 'Kayu Gelondongan Sengon (Bahan Baku)',
    kategori: 'Bahan Baku Kayu',
    supplier: 'PT. DUNIA KAYU (SUP004)',
    satuan: 'Batang',
    hargaSatuan: 25000,
    stokAwal: 32,
    stokSaatIni: 32,
    stokMinimal: 10,
  },
  {
    kode: 'BRG009',
    nama: 'Balok Kayu Meranti (Barang Jadi)',
    kategori: 'Barang Jadi Kayu',
    supplier: 'PT. PARINDO JAYA (SUP001)',
    satuan: 'Batang',
    hargaSatuan: 55000,
    stokAwal: 45,
    stokSaatIni: 45,
    stokMinimal: 10,
  },
  {
    kode: 'BRG011',
    nama: 'Kaso Kayu Sengon 2m x 30cm x 3cm',
    kategori: 'Barang Jadi Kayu',
    supplier: 'PT. RUNHUI INDONESIA (SUP002)',
    satuan: 'Batang',
    hargaSatuan: 18000,
    stokAwal: 60,
    stokSaatIni: 60,
    stokMinimal: 15,
  },
  {
    kode: 'KBL-NYA',
    nama: 'Kabel Instalasi NYA / NYM / NYY (Rekap PKL)',
    kategori: 'Komponen & Kabel',
    supplier: 'PT. WILSON SURYA UNGGUL (SUP003)',
    satuan: 'Roll',
    hargaSatuan: 120000,
    stokAwal: 85,
    stokSaatIni: 85,
    stokMinimal: 20,
  },
];
