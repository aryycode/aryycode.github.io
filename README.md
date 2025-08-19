# 🌟 Aryy Code Portfolio

[![Portfolio](https://img.shields.io/badge/Portfolio-Live-brightgreen)](https://aryycode.github.io)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Responsive](https://img.shields.io/badge/Responsive-Design-blue)](https://web.dev/responsive-web-design-basics/)

> Portfolio website modern dan responsif yang menampilkan profil profesional, keahlian, pengalaman, dan proyek-proyek terbaru.

## 📋 Deskripsi

Portfolio website ini dirancang dengan pendekatan modern dan user-friendly untuk menampilkan profil profesional secara komprehensif. Website ini menggunakan teknologi web terdepan dengan desain responsif yang optimal di semua perangkat.

## ✨ Fitur Utama

### 🎨 **Desain & UI/UX**

- **Dark/Light Theme Toggle** - Tema gelap dan terang dengan transisi halus
- **Responsive Design** - Optimal di desktop, tablet, dan mobile
- **Modern Animations** - Smooth scrolling dan efek hover yang elegan
- **Typography Effect** - Efek mengetik dinamis pada hero section
- **Glass Morphism** - Efek kaca modern pada modal dan komponen

### 🚀 **Fungsionalitas**

- **Dynamic Content Loading** - Konten dimuat dari file JSON
- **Interactive Navigation** - Navigasi smooth dengan highlight aktif
- **Mobile-First Approach** - Hamburger menu untuk perangkat mobile
- **Contact Modal** - Form kontak dengan validasi
- **Project Showcase** - Galeri proyek dengan detail lengkap
- **Skills Visualization** - Tampilan keahlian dengan progress indicator

### 🔧 **Teknologi & Performance**

- **Vanilla JavaScript** - Tanpa framework untuk performa optimal
- **CSS Custom Properties** - Sistem tema yang fleksibel
- **Semantic HTML** - Struktur markup yang accessible
- **Optimized Assets** - Gambar dan ikon yang dioptimalkan
- **Fast Loading** - Minimal dependencies untuk loading cepat

## 🛠️ Teknologi yang Digunakan

| Kategori        | Teknologi                            |
| --------------- | ------------------------------------ |
| **Frontend**    | HTML5, CSS3, JavaScript (ES6+)       |
| **Styling**     | CSS Custom Properties, Flexbox, Grid |
| **Icons**       | Lucide Icons                         |
| **Fonts**       | Google Fonts (Inter)                 |
| **Build Tools** | Native Web APIs                      |
| **Deployment**  | GitHub Pages                         |

## 📁 Struktur Proyek

```
aryycode.github.io/
├── 📄 index.html              # Halaman utama
├── 📁 css/
│   └── style.css              # Stylesheet utama
├── 📁 js/
│   └── script.js              # JavaScript utama
├── 📁 data/
│   ├── skills.json            # Data keahlian
│   ├── experience.json        # Data pengalaman
│   └── projects.json          # Data proyek
├── 📁 images/
│   ├── profile.jpg            # Foto profil
│   ├── projects/              # Screenshot proyek
│   └── favicon.svg            # Logo/favicon
├── 📁 assets/
│   └── resume.pdf             # CV/Resume
└── 📄 README.md               # Dokumentasi
```

## 🚀 Instalasi & Menjalankan

### Prasyarat

- Web browser modern (Chrome, Firefox, Safari, Edge)
- Python 3.x (untuk local server) atau Live Server extension

### Langkah Instalasi

1. **Clone Repository**

   ```bash
   git clone https://github.com/aryycode/aryycode.github.io.git
   cd aryycode.github.io
   ```

2. **Jalankan Local Server**

   **Menggunakan Python:**

   ```bash
   python -m http.server 3000
   ```

   **Menggunakan Node.js:**

   ```bash
   npx serve .
   ```

   **Menggunakan PHP:**

   ```bash
   php -S localhost:3000
   ```

3. **Akses Website**
   Buka browser dan kunjungi: `http://localhost:3000`

## 📧 Setup EmailJS (Form Kontak)

Untuk mengaktifkan form kontak yang dapat mengirim email sungguhan:

### 1. Buat Akun EmailJS

1. Kunjungi [https://www.emailjs.com/](https://www.emailjs.com/)
2. Daftar akun gratis
3. Verifikasi email Anda

### 2. Setup Email Service

1. Di dashboard EmailJS, pilih **"Email Services"**
2. Klik **"Add New Service"**
3. Pilih provider email (Gmail, Outlook, Yahoo, dll)
4. Ikuti instruksi untuk menghubungkan akun email
5. Catat **Service ID** yang diberikan

### 3. Buat Email Template

1. Pilih **"Email Templates"**
2. Klik **"Create New Template"**
3. Gunakan template berikut:

```html
Subject: New Contact from {{from_name}}

Hi,

You have received a new message from your portfolio website:

Name: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}

---
Sent from your portfolio contact form
```

4. Catat **Template ID** yang diberikan

### 4. Dapatkan User ID

1. Buka **"Account"** > **"General"**
2. Catat **User ID** Anda

### 5. Konfigurasi di Kode

Edit file `js/script.js` dan ganti konfigurasi EmailJS:

```javascript
const EMAILJS_CONFIG = {
  serviceID: 'service_xxxxxxx',     // Ganti dengan Service ID Anda
  templateID: 'template_xxxxxxx',   // Ganti dengan Template ID Anda
  userID: 'user_xxxxxxxxxxxxxxx'    // Ganti dengan User ID Anda
};
```

### 6. Test Form Kontak

1. Buka website di browser
2. Isi form kontak
3. Klik "Send Message"
4. Periksa email Anda untuk memastikan pesan diterima

> **💡 Tips**: EmailJS gratis memberikan 200 email per bulan. Untuk kebutuhan lebih besar, upgrade ke plan berbayar.

## 🎯 Kustomisasi

### Mengubah Konten

1. **Data Pribadi**: Edit file `data/*.json`
2. **Styling**: Modifikasi `css/style.css`
3. **Fungsionalitas**: Update `js/script.js`
4. **Gambar**: Ganti file di folder `images/`

### Menambah Proyek Baru

Edit file `data/projects.json`:

```json
{
  "id": "project-id",
  "title": "Nama Proyek",
  "description": "Deskripsi proyek",
  "image": "images/projects/project.jpg",
  "technologies": ["HTML", "CSS", "JavaScript"],
  "github": "https://github.com/username/repo",
  "demo": "https://demo-url.com"
}
```

## 📱 Responsive Breakpoints

| Device  | Breakpoint     | Layout                        |
| ------- | -------------- | ----------------------------- |
| Mobile  | < 768px        | Single column, hamburger menu |
| Tablet  | 768px - 1024px | Adapted layout                |
| Desktop | > 1024px       | Full layout                   |

## 🎨 Tema & Styling

### CSS Custom Properties

```css
:root {
  --primary-color: #3b82f6;
  --secondary-color: #1e40af;
  --accent-color: #f59e0b;
  --text-primary: #1f2937;
  --bg-primary: #ffffff;
}

[data-theme="dark"] {
  --text-primary: #f9fafb;
  --bg-primary: #111827;
}
```

## 📊 Performance

- **Lighthouse Score**: 95+
- **Loading Time**: < 2s
- **Bundle Size**: < 500KB
- **Mobile Friendly**: ✅
- **SEO Optimized**: ✅

## 🤝 Kontribusi

Kontribusi sangat diterima! Silakan:

1. Fork repository ini
2. Buat branch fitur (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## 📄 Lisensi

Project ini menggunakan lisensi MIT. Lihat file `LICENSE` untuk detail.

## 📞 Kontak

**Aryy Code**

- 🌐 Website: [aryycode.github.io](https://aryycode.github.io)
- 📧 Email: [aryy.code@gmail.com](mailto:aryy.code@gmail.com)
- 💼 LinkedIn: [linkedin.com/in/aryycode](https://linkedin.com/in/aryycode)
- 🐱 GitHub: [@aryycode](https://github.com/aryycode)

---

<div align="center">
  <p>⭐ Jika project ini membantu, berikan star ya! ⭐</p>
  <p>Made with ❤️ by <strong>Aryy Code</strong></p>
</div>
