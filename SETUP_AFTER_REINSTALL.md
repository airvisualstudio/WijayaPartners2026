# 🚀 Panduan Setup & Migrasi Project (Setelah Install Ulang Laptop)

Panduan lengkap langkah demi langkah untuk mengamankan data project **Wijaya & Partners** sebelum install ulang laptop, serta cara setup ulang dari nol agar aplikasi bisa langsung berjalan normal kembali.

---

## 📋 DAFTAR ISI
1. [Langkah 1: SEBELUM Install Ulang (Backup & Amankan Data)](#1-sebelum-install-ulang-wajib-backup)
2. [Langkah 2: Software & Tools yang Perlu Di-install Ulang](#2-software--tools-yang-perlu-di-install)
3. [Langkah 3: Setup Project dari Awal](#3-setup-project-setelah-os-baru-siap)
4. [Langkah 4: Menjalankan Aplikasi & Verifikasi](#4-menjalankan-aplikasi--verifikasi)
5. [Langkah 5: Fitur Tambahan (Keystatic CMS & ngrok Tunnel)](#5-fitur-tambahan-cms--tunnel)
6. [Troubleshooting Umum](#troubleshooting-umum)

---

## 1. SEBELUM Install Ulang (Wajib Backup!) ⚠️

Karena install ulang akan menghapus semua file di drive lokal, pastikan 3 hal ini sudah Anda selamatkan:

### A. Push Semua Perubahan ke GitHub
Pastikan tidak ada commit atau file penting yang tertinggal di lokal:
```bash
# Cek status perubahan
git status

# Simpan semua perubahan jika ada
git add .
git commit -m "chore: backup before laptop reinstall"

# Push branch kerja Anda (misal: experimental & main)
git push origin experimental
git push origin main
```
> Repository URL: `https://github.com/airvisualstudio/WijayaPartners2026.git`

---

### B. Backup File `.env` (Sangat Penting!)
File `.env` di-ignore oleh Git sehingga **tidak tersimpan di GitHub**. Salin dan simpan file `.env` ke tempat aman (Google Drive, Notepad di flashdisk, Bitwarden/1Password, dll).

Variabel yang ada di dalam `.env`:
```env
NGROK_AUTHTOKEN=your_ngrok_authtoken_here
RESEND_API_KEY=your_resend_api_key_here
```

---

### C. Backup Akun & Kredensial
- Password / Akun **GitHub** (dan Personal Access Token / SSH Key jika diperlukan).
- Akun **ngrok** ([dashboard.ngrok.com](https://dashboard.ngrok.com)).
- Akun **Resend** ([resend.com](https://resend.com)).

---

## 2. Software & Tools yang Perlu Di-install

Setelah OS laptop baru selesai di-install, install software berikut:

| Software | Rekomendasi Versi | Link Download / Cara Install |
| :--- | :--- | :--- |
| **Git** | Versi terbaru | [git-scm.com](https://git-scm.com/) |
| **Node.js & npm** | **Node.js v20 LTS** atau **v22 LTS** (v24 juga kompatibel) | [nodejs.org](https://nodejs.org/) / via `nvm` |
| **Code Editor** | VS Code / Antigravity IDE / Cursor | [code.visualstudio.com](https://code.visualstudio.com/) |

### Rekomendasi Ekstensi Editor (VS Code / Antigravity):
- **Astro** (`astro-build.astro-vscode`)
- **Tailwind CSS IntelliSense** (`bradlc.vscode-tailwindcss`)
- **Prettier - Code formatter** (`esbenp.prettier-vscode`)
- **ESLint** (`dbaeumer.vscode-eslint`)

---

## 3. Setup Project Setelah OS Baru Siap

Buka Terminal / Command Prompt baru, lalu ikuti langkah-langkah berikut:

### Langkah 3.1: Konfigurasi Git Awal
```bash
git config --global user.name "Nama Anda"
git config --global user.email "email-anda@example.com"
```

### Langkah 3.2: Clone Repository
Pilih folder kerja Anda (misalnya di folder `Projects` atau `domus-somnia`):
```bash
# Masuk ke folder kerja Anda
cd ~/Projects   # atau path folder pilihan Anda

# Clone repository
git clone https://github.com/airvisualstudio/WijayaPartners2026.git

# Masuk ke direktori project
cd WijayaPartners2026
```

### Langkah 3.3: Switch ke Branch Kerja
Pastikan Anda berada di branch yang tepat (misal branch `experimental`):
```bash
git checkout experimental
```

### Langkah 3.4: Buat Kembali File `.env`
Buat file bernama `.env` di root folder project:
```bash
# Buat file .env (Linux/macOS)
nano .env

# Atau buka langsung di VS Code / editor dan simpan dengan nama .env
```
Masukkan nilai API key yang sudah Anda backup sebelumnya:
```env
NGROK_AUTHTOKEN=your_actual_ngrok_authtoken
RESEND_API_KEY=your_actual_resend_api_key
```

### Langkah 3.5: Install Dependencies
Jalankan perintah ini untuk mengunduh semua library (`node_modules`):
```bash
npm install
```
*(Atau gunakan `npm ci` jika ingin instalasi dependency yang 100% persis dengan `package-lock.json`)*.

---

## 4. Menjalankan Aplikasi & Verifikasi

### Jalankan Mode Development:
```bash
npm run dev
```

Output terminal akan menampilkan URL lokal:
- 🌐 **Website Utama**: [`http://localhost:4321`](http://localhost:4321)
- 📝 **Keystatic Admin CMS**: [`http://localhost:4321/keystatic`](http://localhost:4321/keystatic)

Buka link tersebut di browser untuk memastikan seluruh halaman berjalan normal.

---

## 5. Fitur Tambahan (CMS & Tunnel)

### A. Mengakses & Mengedit Konten (Keystatic CMS)
- Buka [`http://localhost:4321/keystatic`](http://localhost:4321/keystatic) saat `npm run dev` aktif.
- Anda bisa mengedit Tim, Klien, Pengaturan Website, Halaman Kontak, dll.
- Perubahan akan langsung tersimpan di file lokal `src/content/` dan langsung tampil di website.

### B. Menghubungkan ke Public Internet (ngrok Tunnel)
Jika Anda butuh membagikan link preview ke klien atau testing di HP:
1. Pastikan server Astro sedang berjalan (`npm run dev`).
2. Buka terminal baru di folder project, lalu jalankan:
   ```bash
   node tunnel.js
   ```
3. Salin URL publik `https://xxxx.ngrok-free.dev` yang muncul di terminal.

### C. Build & Production Preview
Untuk memastikan aplikasi siap deploy atau tidak ada error kompilasi:
```bash
npm run build
npm run preview
```

---

## Troubleshooting Umum

| Masalah | Solusi |
| :--- | :--- |
| **`command not found: node` / `npm`** | Pastikan Node.js sudah di-install dan path environment variable sudah masuk ke PATH (restart terminal). |
| **Form kontak / Email tidak terkirim** | Pastikan file `.env` sudah ada dan `RESEND_API_KEY` terisi dengan benar. |
| **ngrok error / unauthorized** | Periksa `NGROK_AUTHTOKEN` di file `.env` atau perbarui token di dashboard ngrok. |
| **Port 4321 bentrok / sudah terpakai** | Astro otomatis beralih ke port 4322, atau matikan proses lama dengan `killall node` (Linux/Mac) atau tutup terminal sebelumnya. |
| **Git Permission Denied saat push/clone** | Buat SSH Key baru (`ssh-keygen -t ed25519`) dan daftarkan ke GitHub Settings > SSH Keys, atau login menggunakan GitHub CLI (`gh auth login`). |

---

✅ **Semua sudah tercatat lengkap.** Setelah install ulang, cukup buka panduan ini dan ikuti Langkah 2 sampai Langkah 4.
