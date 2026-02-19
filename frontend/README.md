# 🌐 BHOOMI Frontend: The Discovery Interface

This is the official frontend for the **BHOOMI** platform, built with performance, security, and institutional aesthetics in mind.

---

## 🏗 Architecture & Design

The frontend is a **Next.js 16** application utilizing the **App Router** and **React 19**. It features a "Premium Governance" aesthetic with:
- **Glassmorphism**: Subtle translucent layers for a modern feel.
- **Cinematic Transitions**: Powered by **Framer Motion**.
- **Geospatial Visualization**: High-fidelity mapping using **React-Leaflet**.
- **Real-time Analytics**: Visual data tracking with **Recharts**.

---

## 🛠 Tech Stack

- **Core**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS 4 (PostCSS)
- **State Management**: Zustand
- **Maps**: Leaflet & React-Leaflet
- **Authentication**: Firebase Client SDK
- **Animation**: Framer Motion
- **Icons**: Lucide React

---

## 🚀 Development

### Installation

```bash
npm install
```

### Environment Variables
Create a `.env.local` file with the following keys:
```bash
NEXT_PUBLIC_FIREBASE_API_KEY=YOUR_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=YOUR_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
```

### Run Server

```bash
npm run dev
```

---

## 📂 Features Implemented

- **Registry Explorer**: Interactive map and list view for land parcels.
- **Verification Flow**: Multi-step identity verification for landowners.
- **Price Trend Charts**: Dynamic data visualization for market trends.
- **Responsive Dashboard**: Optimized for desktop and mobile governance users.

© 2026 BHOOMI NATIONAL LAND REGISTRY
