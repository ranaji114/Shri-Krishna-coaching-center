<div align="center">

  # 🎓 Shri Krishna Coaching Center — Official Web Application

  **A Modern, Full-Stack Production Educational Platform & Management Portal**

  [![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
  [![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
  [![Supabase](https://img.shields.io/badge/Supabase-Database%20%26%20Storage-3FCF8E?style=for-the-badge&logo=supabase)](https://supabase.com/)
  [![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38BDF8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
  [![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel)](https://vercel.com/)

  ---

  ### 👤 Lead Engineer & Designer
  ### **Designed & Developed by [Ankur Rana](mailto:ranaankur442@gmail.com)**
  *Full-Stack Engineer & Product Architect* • 📩 **[ranaankur442@gmail.com](mailto:ranaankur442@gmail.com)**

</div>

---

## 🌟 Executive Summary

**Shri Krishna Coaching Center** (Established 2021, Kadipur, Sultanpur, UP) is a premier coaching institute providing specialized tuition for Classes 6th to 12th in Physics, Chemistry, Mathematics, Biology, and English.

This repository houses the **complete full-stack web application**, featuring a high-converting public platform, dynamic student admission workflows, real-time notice board, image gallery, and a **secure management portal** for institute administrators.

---

## 🔗 Quick Links & Live URLs

- 📦 **GitHub Repository**: [https://github.com/ranaji114/Shri-Krishna-coaching-center](https://github.com/ranaji114/Shri-Krishna-coaching-center)
- ⚡ **Database & Storage Provider**: [Supabase Cloud Project](https://uvpjhaqwscwevxizrdiv.supabase.co)
- 📍 **Institute Location (Google Maps)**: [Mohan Book Depo, Mudila Bazar Pin Location](https://maps.app.goo.gl/rVJBWrLrpXegVhCy8)
- 💬 **WhatsApp Inquiry Direct**: [Chat on WhatsApp (+91 6389647711)](https://wa.me/916389647711)

---

## ✨ Key System Features & Highlights

### 🏛️ Public Platform
- **Hero & Editorial Design System**: Premium gold (`#C48A2A`) and dark obsidian (`#18181B`) color palette with responsive typography.
- **Dynamic Course Showcase**: Detailed curriculum and fee breakdowns for Classes 6th-10th & 11th-12th (Physics, Chemistry, Math, Biology, English).
- **Faculty Spotlight**: Highlighting lead faculty members **Krishna Sir** (B.Com, LL.B.) and **Priyanshu Singh Sir** with real profile media & micro-animations.
- **Interactive Google Maps Embed**: Accurate coordinates pin (`26.1793424, 82.4637253`) for instant direction lookup.

### 📝 Admission & Contact Pipelines
- **Digital Admission Application Form**: Multi-step student registration form capturing parent details, class target, subject choices, and previous school info.
- **Direct Message System**: Instant contact inquiry form transmitting submissions directly to the cloud database and admin dashboard.

### 🔐 Secure Management Portal (`/admin`)
- **Double-Field Authentication**: Requires User ID (`krishna_admin`) and Password validation.
- **SHA-256 Web Crypto Encryption**: Password verification performed using browser-native SHA-256 hashing.
- **Brute-Force Rate Limiting**: Automatically locks out unauthorized access attempts for 15 minutes after 5 consecutive failed attempts.
- **Session Expiration**: Automatic 4-hour session token persistence with secure cleanup.
- **Realtime Dashboard Analytics**: Track total admissions, pending inquiries, active notices, and gallery images.

### 🖼️ Cloud Gallery & Notice Management
- **Direct Media Upload**: Integrated file upload for mobile & desktop uploading to Supabase Storage (`gallery` bucket).
- **Interactive Lightbox**: Full-screen modal viewer with smooth keyboard navigation and category filtering.
- **Notice Board**: Pinned and categorized announcement management with live date tracking.

---

## 🛠️ Architecture & Tech Stack

| Layer | Technology Used | Description |
|---|---|---|
| **Framework** | **Next.js 16.2 (App Router)** | Hybrid SSG/SSR rendering with Turbopack bundler |
| **UI Library** | **React 19 & TypeScript 5** | Type-safe component architecture |
| **Styling** | **TailwindCSS v4 & Vanilla CSS** | Tailored design system, glassmorphism, and responsive grid |
| **Animations** | **Framer Motion 12 & Lucide Icons** | Micro-interactions, scroll progress, and reveal animations |
| **Database** | **Supabase PostgreSQL** | Cloud Database with Row Level Security (RLS) policies |
| **File Storage** | **Supabase Storage Engine** | Public S3-compatible bucket storage for gallery assets |
| **Security** | **SHA-256 Crypto Hashing** | Client-side cryptographic auth with brute-force rate limiter |
| **Hosting** | **Vercel Cloud Platform** | Global Edge Network CDN deployment |

---

## 🗄️ Database Schema & SQL Architecture

The backend database is structured across four primary PostgreSQL tables on Supabase:

```sql
-- 1. Admissions Table
CREATE TABLE admissions (
  id TEXT PRIMARY KEY,
  student_name TEXT NOT NULL,
  father_name TEXT NOT NULL,
  mother_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  target_class TEXT NOT NULL,
  subjects JSONB NOT NULL,
  school_name TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Notices Table
CREATE TABLE notices (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  is_pinned BOOLEAN DEFAULT false,
  date TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Gallery Table
CREATE TABLE gallery (
  id TEXT PRIMARY KEY,
  url TEXT NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Messages Table
CREATE TABLE messages (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 🚀 Local Setup & Installation Guide

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm** / **yarn** / **pnpm**

### 1. Clone Repository
```bash
git clone https://github.com/ranaji114/Shri-Krishna-coaching-center.git
cd Shri-Krishna-coaching-center
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=https://uvpjhaqwscwevxizrdiv.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production
```bash
npm run build
npm run start
```

---

## 👨‍💻 Developer & Author

<div align="center">

  ### **Ankur Rana**
  *Lead Full-Stack Web Developer & UI Designer*

  📧 **Email**: [ranaankur442@gmail.com](mailto:ranaankur442@gmail.com)  
  🐙 **GitHub**: [@ranaji114](https://github.com/ranaji114)  
  🏫 **Project**: Shri Krishna Coaching Center Web Application

  *Built with excellence, clean architecture, and modern design principles.*

</div>

---

© 2026 **Shri Krishna Coaching Center** • Developed by **Ankur Rana**. All Rights Reserved.
