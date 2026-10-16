# Templat Prompt Tugas (untuk Product Owner)

Aturan tetap agent ada di GEMINI.md. Templat di bawah ini hanya untuk disalin dan diisi per tugas, supaya setiap tugas punya bentuk yang sama. File ini untuk kamu, bukan untuk dibaca agent setiap sesi.

## 1. Tugas baru (rencana dulu)

```
Tugas: <nomor tugas dan judul dari dokumen kerja>
Branch: <feat/...> dari <branch atau main>

Tujuan: <satu atau dua kalimat>

Cakupan (hanya ini):
- <butir 1>
- <butir 2>

Di luar cakupan (jangan disentuh):
- <butir 1>

Syarat selesai:
- <perintah verifikasi yang harus lolos>
- <perilaku yang harus terbukti>

Keputusan yang sudah final dan berlaku: <kutip ID dari PROGRESS.md>
Keputusan terbuka yang membatasi: <kutip ID, misalnya OPEN-01>

Susun rencana sesuai aturan kerja di GEMINI.md, lalu tunggu LANJUT.
```

## 2. Izin eksekusi

```
LANJUT. Eksekusi persis rencana yang kamu tampilkan, dengan perubahan ini:
- <perubahan 1>

Ingat: bukti mentah di blok kode, satu commit, tanpa push.
```

## 3. Pemeriksaan bukti (baca-saja)

```
Giliran ini hanya pemeriksaan baca-saja. Jangan mengubah file dan jangan commit.
Jalankan dan tampilkan mentah:
1. <perintah 1>
2. <perintah 2>
Jangan menjalankan perintah lain. Setelah itu berhenti.
```

## 4. Debug

```
Masalah: <apa yang terjadi, di mana, sejak kapan>
Perilaku yang diharapkan: <...>
Pesan galat persis (salin dari terminal): <...>
Yang sudah dicoba: <...>

Langkah: (1) reproduksi dan tampilkan outputnya, (2) jelaskan penyebab dengan bukti, (3) usulkan perbaikan minimal dan tunggu LANJUT. Jangan memperbaiki sebelum penyebabnya terbukti. Jika dua percobaan gagal, berhenti dan laporkan.
```

## 5. Review diff sebelum PR

```
Tinjau git diff main...HEAD. Periksa: kesesuaian dengan cakupan tugas, rahasia atau data pribadi yang tidak sengaja masuk, kebijakan RLS tanpa tes pgTAP, tabel tanpa RLS, dependensi baru yang belum kuizinkan, tes yang dilonggarkan, dan perubahan di luar cakupan. Laporkan temuan berurutan dari yang paling serius. Jangan mengubah apa pun.
```

## 6. Penutup sesi

```
Perbarui docs/PROGRESS.md: tugas yang selesai, keputusan baru, utang teknis, dan langkah berikutnya. Tampilkan diff mentah, satu commit, tanpa push, lalu berhenti.
```
