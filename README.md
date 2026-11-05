# Catatan Kuliah - CRUD React Native + Expo Go

**Mata Kuliah:** Konsep dan Pengembangan Aplikasi Web dan Mobile
**Pertemuan 10 - Sub-CPMK-4**

**Anggota:**
- Nama: [Nayva Talitha Annisa]
- NIM: [240705132]

## Cara Menjalankan
1. `npm install`
2. `npx expo start`
3. Scan QR Code pake aplikasi Expo Go di HP (HP & laptop WiFi sama)

## Fitur
- Tambah catatan (Create)
- Lihat daftar catatan (Read)
- Edit catatan (Update)
- Hapus catatan (Delete)
- Validasi judul minimal 3 karakter
- Penyimpanan SQLite (data tidak hilang walau app ditutup)

## Struktur Folder
- `src/db/database.ts` - Koneksi database & migrate tabel
- `src/services/noteService.ts` - Fungsi CRUD
- `src/app/index.tsx` - Tampilan utama
- `src/app/_layout.tsx` - Layout Expo Router