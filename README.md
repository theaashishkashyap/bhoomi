# 🌏 BHOOMI: Unified Land Registry & Discovery Platform

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

**BHOOMI** (Land) is a government-grade smart land registry and discovery platform designed to solve the challenges of transparency, trust, and efficiency in land management. It serves as a digital bridge between institutional land records and citizens, providing a secure, verified, and geospatial-first exploration experience.

---

## 🏛 Strategic Vision

BHOOMI is engineered to bring institutional-level transparency to land utilization. By leveraging modern web technologies and a "verification-first" discovery model, BHOOMI ensures that every listing—whether government-owned or private—is backed by authorized data sources.

### ⚖ Legal Positioning
BHOOMI is strictly an **information and verification facilitator**. It is NOT a broker, agent, or intermediary. We do not participate in negotiations or transactions, ensuring a neutral and authoritative platform for discovery.

---

## ✨ Key Features

- **🏆 Sovereign Discovery Hub**: A professional SaaS-style dashboard for exploring land listings with precise status indicators.
- **🗺 Interactive Geospatial Engine**: High-fidelity mapping powered by **Leaflet** and **React-Leaflet** for visualizing parcel boundaries and local infrastructure.
- **🛡 Identity Shield & Trust Wall**: Cryptographically signed records and secure custodial contact protocols to ensure data sovereignty.
- **🔍 Advanced Verification System**: Automated cross-referencing with government records for private listings.
- **📊 Price Trends & Analytics**: Visual data tracking for land valuations and market trends using **Recharts**.

---

## 🛠 Tech Stack

### Frontend
- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **UI Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Maps**: [Leaflet](https://leafletjs.com/) & [React-Leaflet](https://react-leaflet.js.org/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)

### Backend
- **Runtime**: [Node.js](https://nodejs.org/) with [Express 5](https://expressjs.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Database**: PostgreSQL (via Prisma)
- **Auth**: Firebase Admin & Passport.js (Google OAuth)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v20+)
- npm / yarn / pnpm
- Docker (for PostgreSQL)

### Quick Start

1. **Clone the Project**
   ```bash
   git clone <repository-url>
   cd BHOOMI
   ```

2. **Backend Configuration**
   ```bash
   cd backend
   npm install
   # Copy .env.example to .env and configure your DATABASE_URL
   npx prisma generate
   npm run dev
   ```

3. **Frontend Configuration**
   ```bash
   cd ../frontend
   npm install
   # Copy .env.example to .env.local
   npm run dev
   ```

The application will be accessible at [http://localhost:3000](http://localhost:3000).

---

## 📂 Project Structure

```text
BHOOMI/
├── backend/                # Node.js/Express API
│   ├── prisma/             # Database schema & migrations
│   └── src/                # Backend logic (Controllers, Services, Routes)
├── frontend/               # Next.js Application
│   ├── public/             # Static assets
│   └── src/                # React components & pages
├── docker-compose.yml      # Infrastructure orchestration
├── PRD.md                  # Product Requirements Document
└── README.md               # You are here
```

---

## 🛡 Security & Compliance

BHOOMI is built with security as a core pillar:
- **RBAC**: Role-Based Access Control for Guest, Basic, and Strongly Verified users.
- **Audit Logs**: Every access to sensitive land data is logged for total transparency.
- **Encryption**: Secure handling of ownership documents and personal identifiers.

---

## 🤝 Contributing

We welcome contributions that align with our mission of land transparency. Please ensure all pull requests follow the established coding standards and include relevant tests.

---

## 📞 Contact & Support

For institutional inquiries or developer support, please visit the **Developer Hub** within the application.

© 2026 BHOOMI NATIONAL LAND REGISTRY • DIGITAL INDIA ALIGNED
