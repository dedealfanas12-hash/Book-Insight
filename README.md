# Jurnal Refleksi Membaca

Webapp statis (HTML + JS) untuk mencatat insight bacaan, dengan streak harian dan database Firebase Firestore.
Login memakai **nama + PIN** (tanpa Google). Semua orang bisa melihat progres dan buku yang dibaca tiap pembaca,
tetapi hanya pemilik PIN yang bisa menulis, mengubah, atau menghapus jurnal atas namanya.

## Isi repo

- `index.html` : seluruh aplikasi
- `firebase-config.js` : konfigurasi Firebase milikmu (wajib diisi)
- `firestore.rules` : aturan keamanan Firestore (wajib dipasang)

## Langkah setup

1. **Buat proyek Firebase** di https://console.firebase.google.com
2. **Aktifkan Firestore**: Build → Firestore Database → Create database (pilih lokasi terdekat, mode production).
3. **Pasang aturan**: tab *Rules* → tempel isi `firestore.rules` → Publish.
4. **Ambil konfigurasi**: Project settings → Your apps → tambah *Web app* (`</>`) → salin objek config ke `firebase-config.js`.
5. **Upload ke GitHub**: buat repo, push ketiga file di atas ke branch `main`.
6. **Aktifkan GitHub Pages**: Settings → Pages → Source: *Deploy from a branch* → `main` / `(root)`.
   Aplikasi akan tersedia di `https://USERNAME.github.io/NAMA-REPO/`.

Untuk mencoba di komputer sendiri, jalankan server lokal (modul JS tidak jalan dari `file://`):
`python3 -m http.server 8000` lalu buka http://localhost:8000.

## Cara kerja PIN

- Saat mendaftar, PIN di-hash (SHA-256) di browser dan disimpan di koleksi `secrets`, yang **tidak bisa dibaca** siapa pun.
- Setiap simpan/ubah/hapus mengirim bukti hash PIN dalam satu batch yang sama. Aturan Firestore memeriksanya,
  jadi tanpa PIN yang benar server menolak penulisan.
- Profil dan jurnal bisa dibaca publik. Jangan tulis hal yang benar-benar rahasia di sini.

## Batasan yang perlu diketahui

- PIN 4–6 angka secara teori bisa ditebak lewat percobaan berulang karena tidak ada pembatasan percobaan.
  Cocok untuk komunitas kecil atau teman, bukan untuk data sensitif.
- PIN tidak bisa direset. Kalau lupa, daftar dengan nama baru (atau hapus dokumen `secrets/nama`, `gate/nama`,
  dan `profiles/nama` lewat Firebase Console).
- Aplikasi belum diuji pada proyek Firebase sungguhan. Setelah memasang aturan, coba daftar, tulis jurnal, lalu
  coba tulis dengan PIN salah untuk memastikan ditolak.
