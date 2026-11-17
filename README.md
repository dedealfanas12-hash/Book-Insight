# Jurnal Refleksi Membaca

Webapp statis (HTML + JS) untuk mencatat insight bacaan, dengan streak harian dan database Firebase Firestore.
Masuk memakai **nama + PIN** (tanpa Google). Semua orang bisa melihat progres dan buku yang dibaca tiap pembaca,
tetapi hanya pemilik PIN yang bisa menulis, mengubah, atau menghapus jurnal atas namanya.

Isi repo: `index.html` (aplikasi), `firebase-config.js` (config milikmu), `firestore.rules` (aturan keamanan).

## Langkah setup

1. Buat proyek Firebase di https://console.firebase.google.com
2. Build → **Firestore Database** → Create database (mode production).
3. Build → **Authentication** → Get started → Sign-in method → **Anonymous** → Enable → Save.
   (Dipakai di belakang layar untuk mengikat perangkat ke nama yang PIN-nya benar. Pengunjung tidak perlu login apa pun.)
4. Firestore → tab **Rules** → tempel isi `firestore.rules` → **Publish**.
5. Project settings → Your apps → tambah Web app (`</>`) → salin config ke `firebase-config.js`.
6. Push semua file ke GitHub (branch `main`) → Settings → Pages → Deploy from a branch → `main` / root.

Setelah push, tunggu sekitar 1 menit lalu muat ulang dengan Ctrl+Shift+R agar versi lama tidak tersimpan di cache.
Untuk uji lokal: `python3 -m http.server 8000`, buka http://localhost:8000 (tidak bisa dari `file://`).

## Cara kerja PIN

- Saat daftar, PIN di-hash (SHA-256) di browser dan disimpan di `secrets` (tidak bisa dibaca siapa pun).
- Saat masuk, aplikasi membuat dokumen sesi `sessions/<uid anonim>`. Aturan Firestore hanya mengizinkannya jika hash PIN cocok.
- Menulis jurnal hanya diizinkan bagi perangkat yang punya sesi untuk nama tersebut. Profil dan jurnal tetap bisa dibaca publik.

## Jika daftar atau masuk gagal

Kotak masuk/daftar menampilkan langkah yang gagal beserta kode errornya.

- `auth/operation-not-allowed` atau `auth/configuration-not-found`: Anonymous belum diaktifkan (langkah 3).
- `permission-denied` pada langkah simpan PIN, buat sesi, atau buat profil: aturan terbaru belum di-Publish (langkah 4).
- `permission-denied` pada langkah cek PIN: PIN atau nama salah.
- Detail lain ada di Console browser (F12).

## Batasan

- PIN 4–6 angka bisa ditebak lewat percobaan berulang karena tidak ada pembatasan percobaan. Cocok untuk komunitas kecil, bukan data sensitif.
- PIN tidak bisa direset. Kalau lupa, daftar dengan nama baru, atau hapus dokumen `secrets/nama` dan `profiles/nama` lewat Firebase Console.
- Belum diuji pada proyek Firebase sungguhan.
