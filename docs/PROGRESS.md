# Progres Pengembangan Sisminsat

Dokumen pelacak status implementasi, roadmap per fase, keputusan final, keputusan terbuka, blocker, dan jadwal.

---

## Ringkasan Proyek

- **Versi Dokumen Kerja**: v1.0 (14 Oktober 2026)
- **Status Saat Ini**: Fase 0 (Persiapan & Fondasi)
- **Sprint Aktif**: Sprint 0 (Setup Repositori & Tooling Lokal)
- **Target MVP**: 3–5 Gudep Pilot, input absensi < 60 detik (offline-first)
- **Terakhir Diperbarui**: 14 Oktober 2026

---

## Keputusan Final

1. **Sumber Kebenaran**: Sumber kebenaran pekerjaan adalah dokumen kerja di `docs/`.
2. **Infrastruktur Supabase**: 1 lokal (Docker CLI) + 2 cloud (staging dan produksi). Deployment Preview Vercel memakai project staging.
3. **Arsitektur RLS**: Pola standar `org_id in (select private.accessible_org_ids())` tanpa caching manual. Performa dijaga via indeks dan diukur dengan `EXPLAIN ANALYZE`. Pencabutan keanggotaan langsung memutus akses data seketika.
4. **Data NIK**: NIK anak tidak dikumpulkan di tahap MVP. Kolom `nik_enc` tidak dibuat sekarang.
5. **Alur Deployment & Secrets**: Deployment Vercel berjalan melalui integrasi Git langsung (tanpa `VERCEL_TOKEN` di GitHub Actions). Secret GitHub Actions hanya `SUPABASE_ACCESS_TOKEN`, `SUPABASE_DB_PASSWORD`, dan `SUPABASE_PROJECT_REF`, dipisahkan per GitHub Environment (`staging` dan `production`).
6. **Branding Awal**: Logo berupa placeholder wordmark teks "Sisminsat" tanpa lambang resmi Pramuka (ditangani pada tugas 0.7).

---

## Keputusan Terbuka (Open Decisions)

| ID | Topik | Deskripsi Isu | Dampak / Batasan Tindakan | Status |
|---|---|---|---|---|
| **OPEN-01** | Kebijakan RLS Anggota vs Hak Akses Kwartir | Matriks RLS saat ini membuat pengurus kwartir bisa membaca baris anggota di gudep turunan, padahal dokumen (E7) menyebut kwartir hanya melihat data agregat. | Dilarang menulis migrasi RLS untuk tabel `members` sebelum keputusan final ditetapkan. | **Terbuka** |
| **OPEN-02** | Handle Akun GitHub di CODEOWNERS | Menentukan username/organisasi GitHub resmi untuk peninjau kode default. | Telah disepakati menggunakan `@alphaproject90`. | **Selesai** |
| **OPEN-03** | Pilihan Library Komponen shadcn: Base UI vs Radix UI | Preset `base-nova` dari shadcn menginstal `@base-ui/react` sebagai library komponen primitif. Semua tes, typecheck, dan build lolos. | Perlu diputuskan sebelum Sprint 1 apakah mempertahankan Base UI atau beralih ke Radix UI jika dibutuhkan komponen tertentu. | **Terbuka** |
| **OPEN-04** | Konfigurasi DB Major Version & Auth Supabase | Nilai `major_version` di bagian `[db]` pada `supabase/config.toml` (saat ini 17) harus disamakan dengan project cloud setelah project staging dibuat. Pengaturan auth (`site_url`, konfirmasi email) diputuskan di Sprint 1. | Sinkronisasi versi DB lokal dan cloud sebelum pengujian migrasi; keputusan auth di Sprint 1. | **Terbuka** |

---

## Blocker Aktif

| Tanggal | Isu Blocker | Dampak | Tindak Lanjut / PIC |
|---|---|---|---|
| 14-10-2026 | Docker Desktop belum terpasang di Windows | `supabase start` lokal belum bisa dijalankan untuk pengujian DB | Akan diinstal manual oleh User di luar CLI |

---

## Catatan Jadwal & Catatan Teknis

- **Ketergantungan Branch PR 0.2 & 0.3**: Branch `feat/0-3-supabase-skeleton` dibuat dari HEAD branch `feat/0-2-nextjs-scaffold`. PR untuk tugas 0.2 harus di-merge ke `main` lebih dulu sebelum PR tugas 0.3 di-merge.
- **Versi Supabase CLI**: Supabase CLI terpasang 2.117.0, versi di CI di-pin di 0.5.
- **Playwright (E2E Testing)**: Ditunda hingga **Sprint 2**, disiapkan bertepatan dengan pengujian integrasi PWA dan sinkronisasi absensi offline-ke-online.
- **Sentry & Observabilitas**: Ditunda hingga **Tugas 0.6**, disiapkan setelah fondasi Next.js (0.2) stabil.
- **Dukungan Node 24**: Versi Node lokal dikunci pada 24 (`.nvmrc`) dan engine di `package.json` mendukung `>=20.9.0`. Dukungan Node 24 di Vercel diverifikasi di tugas 0.4.
- **Next 16 (Proxy & Cookies Async)**: Middleware konvensi diganti menjadi proxy (`proxy.ts`), dan `cookies()` bersifat async (`await cookies()`). Verifikasi dari dokumentasi lokal sebelum Sprint 1.
- **Tailwind Turbopack vs Webpack (Serwist)**: `next.config.ts` memakai aturan loader `@tailwindcss/turbopack` yang hanya berlaku di Turbopack. Jika Serwist butuh build webpack di Sprint 2, integrasi Tailwind harus diganti ke jalur PostCSS resmi.
- **Dependensi shadcn & Risiko Audit**: `shadcn` ada di `dependencies` dan dibutuhkan build lewat `@import 'shadcn/tailwind.css'` di `globals.css`. Audit menemukan temuan high di rantai `braces`. Keputusan: diterima sebagai risiko untuk sementara, ditinjau ulang di 0.5 dengan `npm audit --omit=dev` di CI. Dilarang memindahkan `shadcn` ke `devDependencies` tanpa build ulang.

---

## Log Keputusan Arsitektur (ADR Index)

| Nomor | Judul Keputusan | Status | Target / Catatan |
|---|---|---|---|
| ADR-001 | Pemilihan Stack: Next.js App Router + Supabase + Serwist | **Diusulkan** | Fondasi Next/TS/Tailwind lolos uji 0.2; Serwist dan Supabase belum diverifikasi. Penerimaan keputusan ada di Product Owner. |
| ADR-002 | Absensi Offline: Client Component + IndexedDB, Sinkronisasi via Supabase Browser Client | **Diusulkan** | Target finalisasi Sprint 2 |

---

## Pelacakan Roadmap per Fase

### Fase 0: Fondasi
- [ ] **0.1 Setup Repository & Tata Kelola Git**
  - [x] Inisialisasi Git (`git init -b main`) & konfigurasi `.gitignore` ketat
  - [x] Enforce LF line endings (`.gitattributes`)
  - [x] GitHub PR Template (`.github/pull_request_template.md`)
  - [x] Reviewer default (`.github/CODEOWNERS`)
  - [x] Pelacak progres (`docs/PROGRESS.md`)
  - [ ] *[Manual User]* Buat repo GitHub & pasang proteksi branch `main` (wajib review & CI hijau)
- [x] **0.2 Scaffolding Codebase Next.js**
  - [x] Scaffold Next.js App Router (TS strict, Tailwind CSS, shadcn/ui)
  - [x] Menetapkan versi Node via `.nvmrc` atau `engines` (disamakan dengan CI)
  - [x] ESLint, Prettier, skrip `lint`, `typecheck`, `test`
- [ ] **0.3 Provisioning Lingkungan Supabase**
  - [x] Konfigurasi `supabase init` lokal
  - [ ] *[Manual User]* Buat project cloud Staging & Produksi (Singapore)
  - [ ] *[Manual User]* Konfigurasi GitHub Environment Secrets
- [ ] **0.4 Integrasi Vercel**
  - [ ] *[Manual User]* Sambungkan repo ke Vercel (Region `sin1`)
  - [ ] Konfigurasi env vars staging untuk Preview per PR
- [ ] **0.5 Konfigurasi CI/CD Pipeline (GitHub Actions)**
  - [ ] Workflow CI: lint, typecheck, Vitest, pgTAP
  - [ ] Auto-migrate ke staging, manual approval untuk produksi
- [ ] **0.6 Observabilitas & Health Check**
  - [ ] Endpoint `/health`
  - [ ] Setup Sentry SDK & uji exception capture
- [ ] **0.7 Desain Sistem & Wireframe (Track Desain)**
  - [ ] Placeholder logo wordmark teks "Sisminsat"
  - [ ] File Figma disetujui Pemilik Produk
- [ ] **0.8 Validasi Rubrik 9 Standar (Track Produk)**
  - [ ] Dokumen rubrik v1 ditandatangani Pemilik Produk

### Fase 1: MVP Pilot (6 Minggu, 3 Sprint)
- [ ] **Sprint 1: Identitas, Tenant, dan Manajemen Anggota**
  - Migrasi identitas, auth wizard, undang anggota via email, CRUD Buku Induk, impor CSV, tes pgTAP isolasi tenant.
- [ ] **Sprint 2: Absensi Cepat dan PWA Offline-First**
  - Migrasi sesi/absensi, PWA Serwist, IndexedDB snapshot roster & queue, rekap kehadiran, tes Playwright sinkronisasi offline.
- [ ] **Sprint 3: Vault Bukti, Mesin Skor Awal, dan Onboarding Gudep Pilot**
  - Migrasi 9 standar, upload bukti via signed URL, mesin skor (Standar 1, 2, 5), onboarding 3–5 gudep pilot.

### Fase 2: Pelengkapan 9 Standar Akreditasi (6 Minggu, 3 Sprint)
- [ ] **Sprint 4: Keuangan & Inventaris/Sarpras (Standar 7)**
- [ ] **Sprint 5: Tata Kelola, Surat-Menyurat, Risalah Rapat, & Logbook (Standar 2 & 3)**
- [ ] **Sprint 6: Kredensial Pembina, SKU/SKK Tracker, Prestasi, & Ekspor Dosir Akreditasi (PDF/ZIP)**

### Fase 3: Portal Kwartir, Mode Asesor, & Monetisasi (5 Minggu)
- [ ] Dashboard agregat Kwarcab/Kwarran (peta kesiapan & filter wilayah)
- [ ] Mode asesor (penugasan, dosir read-only, catatan per indikator)
- [ ] Billing & integrasi pembayaran (Midtrans/Xendit)
- [ ] Portal orang tua / peserta didik & Web Push notification

### Fase 4: Pengerasan, Keamanan, & Peluncuran Resmi (4 Minggu)
- [ ] Uji beban (k6), pentest sederhana, dan audit RLS
- [ ] Kepatuhan hukum UU PDP No. 27/2022
- [ ] Dokumentasi pengguna, pusat bantuan, dan latihan pemulihan bencana (restore drill)
