# ⚙️ BHOOMI Backend: The Sovereign Data Engine

The backend for **BHOOMI** is a high-performance, modular Node.js API designed to handle land records, identity verification, and audit logging with institutional-grade security.

---

## 🏗 Architecture

Built as a **Modular Monolith** in **TypeScript**, the backend is designed for eventual microservices migration. It features:
- **Prisma ORM**: Type-safe database access for PostgreSQL.
- **Express 5**: Modern routing and middleware.
- **RBAC**: Robust Role-Based Access Control logic.
- **Audit Trails**: Immuteable logging for sensitive data access.

---

## 🛠 Tech Stack

- **Runtime**: Node.js, TypeScript (tsx)
- **Framework**: Express 5
- **ORM**: Prisma 6
- **Database**: PostgreSQL
- **Security**: JWT, bcryptjs, Firebase Admin
- **OAuth**: Passport.js (Google Strategy)

---

## 🚀 Development

### Installation

```bash
npm install
```

### Database Setup
1. Configure your PostgreSQL connection in `.env`.
2. Sync the database:
   ```bash
   npx prisma migrate dev
   npx prisma db seed
   ```

### Run Server

```bash
npm run dev
```

---

## 📂 Domain Services

- **Auth Service**: Identity management and session control.
- **Listing Service**: Verified land data management.
- **Verification Service**: Government record cross-referencing.
- **Audit Service**: Platform-wide activity logging.

© 2026 BHOOMI NATIONAL LAND REGISTRY
