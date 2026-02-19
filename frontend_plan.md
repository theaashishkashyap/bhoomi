# BHOOMI - Frontend Development Plan

> **Objective**: Complete a high-fidelity, government-aligned, and legally safe frontend before finalizing backend systems.

## 1. Technology Stack
- **Framework**: Next.js 15+ (App Router)
- **Styling**: BHOOMI Custom Design System (globals.css + CSS Modules)
- **Authentication**: Google Firebase (Email/Password + Google Auth)
- **Animations**: Framer Motion
- **Maps**: Leaflet/Mapbox (for Discovery Map)
- **State Management**: Zustand (for light-weight user/filter state)
- **Icons**: Lucide React

## 2. Core Identity & UX Principles
- **Aesthetic**: "Digital Trust" (Modern, Clean, Authoritative)
- **Palette**: Navy Blue (#0A1D37), Muted Green (#064E3B), Legal Grey.
- micro-interactions: Subtle reveal animations on scroll, glassmorphism hovers, and smooth page transitions.
- **Transparency**: Contextual legal disclaimers at every user action point.

## 3. Page-by-Page Breakdown

### Phase 1: Authentication & User Onboarding
- **Login/Signup Page**: 
  - Integrated with Firebase.
  - Multi-tier verification indicator.
- **Auth Guard**: Role-based access control (RBAC) on the client side.

### Phase 2: Land Discovery (The Registry)
- **Registry Page**: 
  - Advanced filtering interface (State, District, Area, Price, Category).
  - Search engine for land parcels.
- **Map View (Discovery Mode)**: 
  - Split-screen map view.
  - Interactive pins with status (Government Vacant vs. Private).

### Phase 3: Property Insights
- **Listing Details Page**:
  - Interactive image gallery.
  - Verification badge details.
  - Privacy layer (Contact details locked behind verification tier).
  - Request Access workflow (Consent-based).

### Phase 4: Verification Portal
- **Verification Dashboard**:
  - Profile tier status (Guest → Basic → Strongly Verified).
  - Document upload interface (OCR-ready UI).
  - Verification status timeline/tracker.

### Phase 5: User Dashboard & AI Support
- **Personal Dashboard**: 
  - Saved listings, recent searches, and contact request history.
- **Assistive AI (BHOOMI Assistant)**:
  - Floating glassmorphism chat interface.
  - Policy/Information discovery-only assistant.

## 4. Animation Strategy (Framer Motion)
- **Page Transitions**: Subtle slide/fade transitions on route change.
- **Card Reveals**: Staggered entry animations for listing cards.
- **Button Micro-interactions**: Scale-up on hover, localized loading spinners.
- **Skeleton Screens**: Premium pulse effect for data loading states.

## 5. Security & Transparency (Frontend First)
- **Client-Side Validation**: Robust form validation and error handling.
- **Legal Banners**: Sticky banners for informational-only disclaimers.
- **Consent Modals**: Pop-ups requiring explicit "Accept" before exposing seller info.

---

## Next Immediate Steps
1.  [/] Install Firebase SDK, Framer Motion, & Lucide Icons.
2.  [/] Setup Firebase Config & Auth context.
3.  [ ] Build Login/Signup Page with BHOOMI styling.
4.  [ ] Polish Landing Page animations using `framer-motion`.
