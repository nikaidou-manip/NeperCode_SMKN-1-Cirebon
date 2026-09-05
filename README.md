Himasantika — Landing Page

Landing page Himasantika (Himpunan Mahasiswa Jurusan Teknik Informatika, Universitas Muhammadiyah Cirebon).

Konsep Desain

Desain mengusung gaya "Corporate Academic" dengan palet warna dari aset Himasantika:

- Navy `#101869` — warna utama, memberi kesan profesional & terpercaya
- Rust Red `#C3503B` — warna aksen untuk CTA & highlight
- Off-White `#F9F9FB` — background bersih & nyaman dibaca
- Charcoal `#1A1A24` — teks utama, kontras tinggi

Layout landing page: Header → Hero → About → BPH → Divisi → Kegiatan → Bergabung → Tujuan → Kontak → Footer. Menggunakan grid 12-kolom responsif (desktop 2-kolom, mobile 1-kolom). Tipografi memadukan Space Grotesk (display/heading) dan Inter (body text).

Fitur interaktif:
- Filter tabs pada section Divisi (Semua / Lembaga / Departemen)
- Klik kartu divisi untuk membuka popup modal berisi flowchart staff (Ketua di atas, garis turun ke 2 kolom: Staff Angkatan 24 & Staff Angkatan 25)
- Form kontak dengan validasi & toast notification

Teknologi

| Kategori | Teknologi |
|----------|-----------|
| Markup | HTML5 semantic |
| Styling | CSS3 (CSS Variables, Grid, Flexbox) — tanpa framework |
| Script | Vanilla JavaScript (ES6) — tanpa library |
| Fonts | Google Fonts (Space Grotesk + Inter) |
| Icons | Inline SVG (Lucide-style) |
| Asset | Logo & foto asli Himasantika dari Google Drive |

Cara Menjalankan

Opsi 1 — Buka langsung
1. Extract file zip ini
2. Klik dua kali file `index.html`
3. Halaman akan terbuka di browser default Anda

Opsi 2 — Local server
```bash
# Pakai Python (sudah tersedia di mayoritas OS)
python3 -m http.server 8000

atau pakai Node.js
npx serve
```
Lalu buka `http://localhost:8000` di browser.

Struktur File

```
himasantika-landing-page/
├── index.html        # struktur halaman
├── style.css         # styling + palet warna
├── script.js         # interaksi (navbar, tabs, form, toast)
└── assets/           # logo & foto asli Himasantika
```
