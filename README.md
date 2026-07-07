# SkillSync AI - Web Project

Proyek ini adalah sebuah platform berbasis web yang dibangun menggunakan **Laravel 11**, **Inertia.js**, dan **React**. Aplikasi ini juga dilengkapi dengan layanan Artificial Intelligence (AI) berbasis Python (FastAPI) untuk memproses fitur-fitur pintar seperti pencocokan CV (*CV Matcher*) dan simulasi wawancara.

---

## 🛠 Persyaratan Sistem (Prerequisites)

Sebelum menjalankan proyek ini, pastikan Anda telah menginstal:
- **PHP** (minimal versi 8.3)
- **Composer** (untuk dependensi PHP)
- **Node.js** & **pnpm / npm** (untuk dependensi Frontend)
- **Python** (minimal versi 3.10+) (untuk layanan AI / Machine Learning)

---

## 🚀 Cara Menjalankan Proyek (Web / Frontend & Backend)

Untuk menjalankan bagian utama dari aplikasi web ini, ikuti langkah-langkah berikut:

1. **Buka terminal** di direktori utama proyek (`Web-Bengkod`).
2. **Instal dependensi PHP & Node.js** (jika belum):
   ```bash
   composer install
   pnpm install  # atau npm install
   ```
3. **Siapkan environment**:
   Salin *file* `.env.example` menjadi `.env` dan jalankan perintah:
   ```bash
   php artisan key:generate
   ```
4. **Siapkan Database**:
   Jalankan migrasi dan seeder untuk menyiapkan struktur *database* dan akun *dummy* (seperti `admin@bengkod.com`):
   ```bash
   php artisan migrate --seed
   ```
5. **Jalankan Aplikasi Web (Development Server)**:
   Proyek ini sudah dikonfigurasi untuk menjalankan *server* PHP dan Vite secara bersamaan dengan satu perintah:
   ```bash
   composer run dev
   ```
   *Aplikasi kini bisa diakses melalui http://localhost:8000.*

---

## 🤖 Cara Menjalankan AI / Machine Learning Service

Aplikasi web ini bergantung pada *service* AI yang berada di dalam folder `ai-service`. Jika Anda menggunakan fitur *CV Matcher* atau *Interview AI*, **Anda wajib menjalankan servis ini**.

1. **Buka terminal baru** dan masuk ke dalam folder `ai-service`:
   ```bash
   cd ai-service
   ```
2. **Buat dan aktifkan Virtual Environment Python** (Disarankan):
   ```bash
   # Windows
   python -m venv venv
   venv\Scripts\activate

   # Mac/Linux
   python3 -m venv venv
   source venv/bin/activate
   ```
3. **Instal dependensi Python**:
   ```bash
   pip install -r requirements.txt
   ```
4. **Jalankan Uvicorn Server**:
   Jalankan perintah berikut untuk menghidupkan *service* AI:
   ```bash
   uvicorn app.main:app --reload --port 8001
   ```
   *Servis AI kini berjalan di http://localhost:8001 dan akan terhubung secara otomatis ke Laravel web app Anda.*

---

## 💡 Akun Uji Coba (Seeder)
Jika Anda sudah menjalankan `php artisan migrate --seed`, Anda bisa masuk ke aplikasi menggunakan akun bawaan:
- **Email**: `admin@bengkod.com`
- **Password**: `password` (secara bawaan)
