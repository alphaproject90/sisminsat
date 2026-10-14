## Nomor Tugas Dokumen Kerja
<!-- Contoh: 0.1, 0.2, atau nomor Sprint -->

## Deskripsi Singkat
<!-- Jelaskan perubahan secara padat dan modul yang terdampak -->

## Tipe Perubahan
- [ ] `feat`: Fitur baru
- [ ] `fix`: Perbaikan bug
- [ ] `chore`: Konfigurasi, migrasi, atau dependensi
- [ ] `docs`: Pembaruan dokumentasi / ADR

## Checklist Kualitas (Definition of Done)
- [ ] Kode berukuran di bawah 400 baris (Trunk-based PR kecil)
- [ ] `npm run lint` dan `npm run typecheck` lolos tanpa peringatan
- [ ] Tes unit lolos (jika menambah logika bisnis)
- [ ] Menyentuh tabel bertenant atau data anak? Jika ya, tes RLS lintas-tenant sudah ditambahkan
- [ ] Tidak ada kunci rahasia / service role key yang bocor ke bundle klien
- [ ] Format commit mengikuti Conventional Commits (`feat:`, `fix:`, `chore:`)
