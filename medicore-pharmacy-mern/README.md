# MediCore Pharmacy ERP — MERN Stack

Enterprise-style Pharmacy Management System starter with React + Vite, Tailwind CSS, Redux Toolkit, Express, MongoDB/Mongoose, JWT access + refresh tokens, RBAC, Recharts, Framer Motion, Socket.io, barcode/QR utilities, PDF invoice generation, and responsive light/dark SaaS UI.

> This repository is designed to run locally and provide a strong production-oriented foundation. External services such as Cloudinary, SMTP, SMS, and an AI provider are enabled through environment variables; the core application works without them.

## 1. Requirements

- Node.js 20+ (Node 24 LTS is recommended)
- npm 10+
- MongoDB Atlas account or local MongoDB
- Git (optional)
- Modern browser

Official installers/docs:
- Node.js: https://nodejs.org/en/download/
- MongoDB Atlas: https://www.mongodb.com/atlas
- Vite: https://vite.dev/
- Tailwind CSS + Vite: https://tailwindcss.com/docs/installation/using-vite

## 2. Project structure

pharmacy-erp-mern/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── sockets/
│   │   ├── utils/
│   │   └── server.js
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── store/
│   │   ├── lib/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env.example
│   ├── vite.config.js
│   └── package.json
└── README.md

## 3. MongoDB Atlas

Create an Atlas project and cluster, then create a database user and allow your development IP. Copy the Node.js driver connection string.

Atlas guide:
https://www.mongodb.com/docs/atlas/create-connect-deployments/

Put it in `backend/.env` as `MONGO_URI`.

## 4. Install dependencies

Open two terminals.

### Terminal A — backend

```bash
cd pharmacy-erp-mern/backend
npm install
copy .env.example .env
npm run dev
```

On macOS/Linux:
```bash
cp .env.example .env
```

Backend runs at:
http://localhost:5000

### Terminal B — frontend

```bash
cd pharmacy-erp-mern/frontend
npm install
copy .env.example .env
npm run dev
```

On macOS/Linux:
```bash
cp .env.example .env
```

Frontend runs at:
http://localhost:5173

## 5. Environment variables

### backend/.env

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb+srv://USERNAME:PASSWORD@CLUSTER.mongodb.net/medicore
JWT_ACCESS_SECRET=replace_with_a_long_random_secret
JWT_REFRESH_SECRET=replace_with_another_long_random_secret
ACCESS_TOKEN_EXPIRES=15m
REFRESH_TOKEN_EXPIRES=7d
CLIENT_URL=http://localhost:5173

# Optional Cloudinary
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Optional SMTP
SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
SMTP_FROM=

# Optional Socket.io
SOCKET_CORS_ORIGIN=http://localhost:5173
```

### frontend/.env

```env
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

## 6. First login

For development, register a user through `/register`, or use the seed command:

```bash
cd backend
npm run seed
```

Seed credentials:
- Email: admin@medicore.local
- Password: Admin@12345
- Role: super_admin

Change the password immediately for real use.

## 7. Main APIs

Authentication:
- POST `/api/auth/register`
- POST `/api/auth/login`
- POST `/api/auth/refresh`
- POST `/api/auth/logout`
- POST `/api/auth/forgot-password`
- POST `/api/auth/reset-password`
- POST `/api/auth/verify-otp`

Medicines:
- GET `/api/medicines`
- POST `/api/medicines`
- PUT `/api/medicines/:id`
- DELETE `/api/medicines/:id`

Dashboard:
- GET `/api/dashboard/summary`

Customers:
- GET `/api/customers`
- POST `/api/customers`

Suppliers:
- GET `/api/suppliers`
- POST `/api/suppliers`

Sales:
- GET `/api/sales`
- POST `/api/sales`

Health:
- GET `/api/health`

## 8. Role-based access

Roles:
- super_admin
- pharmacy_admin
- pharmacist
- cashier
- inventory_manager

The backend uses JWT middleware and role guards. Never rely on frontend-only permissions for security.

## 9. Production build

Frontend:
```bash
cd frontend
npm run build
npm run preview
```

Backend:
```bash
cd backend
npm start
```

Set production `CLIENT_URL`, HTTPS, secure secrets, a production MongoDB cluster, SMTP/SMS provider, Cloudinary, logging/monitoring, reverse proxy, and backups before deployment.

## 10. Feature map

Included in this starter:
- Premium dashboard UI
- KPI cards with animated counters
- Revenue/sales charts
- Inventory and category analytics
- Medicine CRUD
- Categories
- Batch/expiry/stock fields
- Suppliers and customers
- Sales/POS-style billing
- GST + discounts
- PDF invoice download
- Barcode/QR generation utilities
- Prescription records model
- Purchases/invoices/notifications/audit logs/branches models
- JWT + refresh tokens
- RBAC
- Socket.io notifications
- Dark/light theme
- Responsive sidebar and tables
- Framer Motion page/card animations
- Toast notifications
- Search/filtering
- API health endpoint

Advanced integrations such as Cloudinary upload, SMTP/SMS, and AI demand forecasting are scaffolded through service boundaries so provider credentials can be added without redesigning the app.

## 11. Important production notes

Healthcare and pharmacy data can be sensitive. Before production:
- enforce HTTPS
- rotate secrets
- use strong MongoDB users and IP/network restrictions
- encrypt backups
- add field-level encryption where required
- configure audit retention
- configure least-privilege RBAC
- validate prescription and controlled-drug workflows against applicable regulations
- add rate limiting/WAF and centralized logs
- perform security and compliance review
