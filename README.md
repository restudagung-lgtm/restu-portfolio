# RESTU.DEV — Personal Portfolio Website

<p>
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/Firebase-Optional-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" alt="Firebase Optional">
  <img src="https://img.shields.io/badge/Status-In%20Development-orange?style=for-the-badge" alt="Status">
</p>

Website portofolio pribadi bertema *"From Gamer to Game Developer"*. Dibangun dengan HTML, CSS, dan JavaScript murni (vanilla, tanpa framework), sepenuhnya statis sehingga bisa langsung di-*deploy* ke GitHub Pages atau hosting statis lainnya.

---

## Pratinjau Tampilan

<img src="https://img.shields.io/badge/Perlu%20Screenshot-d32f2f?style=flat-square" alt="Perlu Screenshot">

Saya belum menyertakan gambar pratinjau (screenshot) di sini karena saya tidak boleh menebak atau memasukkan gambar hasil asumsi sendiri.

Di dalam file yang diunggah, ada dua kumpulan gambar terpisah (`rencana.zip` dan `rencana_tampilan_web.zip`) yang tampak seperti gambar *rencana desain* untuk situs ini — bukan hasil kode `restu-portfolio` yang sebenarnya. Saya **tidak tahu** apakah gambar-gambar itu memang dimaksudkan untuk dipakai sebagai pratinjau di README ini atau hanya referensi desain saat proses pembuatan.

Kalau kamu mau README ini punya bagian pratinjau dengan gambar, tolong konfirmasi salah satu:
1. Pakai gambar dari `rencana.zip` / `rencana_tampilan_web.zip` (sebutkan file mana), atau
2. Ambil screenshot langsung dari `index.html` yang sudah jadi (jalankan di browser, lalu kirim gambarnya ke saya atau simpan sendiri sebagai mis. `preview.png` di folder proyek).

Setelah gambarnya ada, tinggal tambahkan baris berikut di bagian ini:
```markdown
![Preview](preview.png)
```

---

## Fitur

- **Hero Section** — perkenalan singkat dengan ilustrasi bertema malam (gunung, bulan, karakter duduk)
- **About Me** — deskripsi diri, kartu avatar, dan statistik ringkas
- **Gaming Journey** — daftar game yang dimainkan
- **Game Projects** — daftar proyek game yang sedang/sudah dibuat (engine, bahasa, status, tautan demo & repo)
- **IT / Programming Projects** — daftar proyek IT non-game
- **Skills** — daftar skill dengan indikator level (Learning / Familiar / Intermediate / Advanced)
- **Learning Journey** — linimasa (timeline) proses belajar
- **Achievements** — daftar pencapaian
- **Gallery** — grid galeri gambar (placeholder, belum ada gambar asli — lihat catatan di bawah)
- **Devlog** — daftar catatan pengembangan
- **Contact** — daftar kontak + formulir pesan (belum terhubung ke backend apa pun)
- **Navigasi responsif** — menu atas untuk desktop, tab bar + drawer "Menu" untuk mobile

---

## Struktur Folder

```
restu-portfolio/
├── index.html          # Struktur halaman (semua section)
├── css/
│   └── style.css       # Semua styling
└── js/
    ├── data.js         # Semua konten/data (edit di sini untuk update isi)
    ├── backend.js       # Placeholder koneksi Firebase (belum aktif)
    ├── render.js         # Mengubah data.js menjadi elemen HTML
    ├── nav.js            # Logika navigasi (menu mobile, scroll-active, dst.)
    └── animations.js     # Efek animasi saat scroll (reveal)
```

---

## Cara Menjalankan

Proyek ini statis, tidak perlu instalasi atau server khusus.

1. Unduh / clone folder `restu-portfolio`.
2. Buka file `index.html` langsung di browser, **atau**
3. Jalankan lewat *live server* lokal (mis. ekstensi "Live Server" di VS Code) agar path relatif (CSS/JS) selalu berjalan konsisten.

Untuk publikasi online, folder ini bisa langsung diunggah ke **GitHub Pages**, **Netlify**, atau **Vercel** tanpa proses build tambahan.

---

## Cara Mengubah Konten

Semua konten (nama game, daftar proyek, skill, achievement, dll.) terpusat di satu file:

```
js/data.js
```

Cukup ubah isi array/objek di file tersebut (contoh: `DATA_GAMES`, `DATA_GAMEDEV`, `DATA_ITPROJECTS`, `DATA_SKILLS`, dst.), lalu `render.js` akan otomatis menampilkannya ke halaman — tidak perlu menyentuh `index.html` maupun `render.js`.

Catatan data yang masih berupa **placeholder** dan perlu diisi/diganti dengan data asli:
- `DATA_CONTACT` — email, username GitHub, dan Discord masih contoh (`example@gmail.com`, `@username`)
- `SOCIAL_LINKS` — semua tautan sosial media masih mengarah ke `#`
- `DATA_GAMEDEV` (tombol *Play Demo* & *GitHub*) — tautan masih `#`
- `DATA_ITPROJECTS` (tautan proyek) — masih `#`
- `DATA_GALLERY` — hanya berisi label teks ("Game Screenshot", "Coding Session", dll.), **belum ada file gambar asli**. Kalau ingin galeri menampilkan gambar sungguhan, saya butuh kamu kirim file gambarnya terlebih dahulu — saya tidak akan mengarang atau mengambil gambar sembarangan.

---

## Backend (Opsional)

Form kontak saat ini bersifat statis (`onsubmit="return false"`) dan belum tersambung ke mana pun. File `js/backend.js` sudah berisi kerangka kode untuk menghubungkan ke **Firebase Firestore** jika suatu saat ingin form kontak benar-benar menyimpan pesan. Langkah aktivasinya sudah dijelaskan sebagai komentar di dalam file tersebut.

---

## Teknologi yang Digunakan

<p>
  <img src="https://img.shields.io/badge/-HTML5-E34F26?style=flat-square&logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/-CSS3-1572B6?style=flat-square&logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/-JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/-Google%20Fonts-4285F4?style=flat-square&logo=googlefonts&logoColor=white" alt="Google Fonts">
  <img src="https://img.shields.io/badge/-Firebase%20(opsional)-FFCA28?style=flat-square&logo=firebase&logoColor=black" alt="Firebase">
</p>

Font yang dipakai: **Space Grotesk**, **JetBrains Mono**, dan **Caveat** (dimuat via Google Fonts).

---

## Lisensi

Belum ada file lisensi disertakan. Kalau proyek ini ingin dibagikan secara publik dengan lisensi tertentu (mis. MIT), beri tahu saya lisensinya dan saya akan buatkan file `LICENSE`-nya.

---

<p align="center">
  <sub>Dibuat oleh Restu — Play · Code · Create</sub>
</p>
