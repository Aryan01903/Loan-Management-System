# CREDAXIS — Loan Management System

A full-stack Loan Management System built with **Next.js**, **Node.js**, **Express**, **MongoDB**, and **TypeScript**. It supports a complete loan lifecycle — from borrower application to loan closure — with role-based access control for internal operations.

🌐 **Live Demo:** [https://credaxis.vercel.app](https://credaxis.vercel.app)
⚙️ **API:** [https://api-credaxis.onrender.com](https://api-credaxis.onrender.com)

---

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | Next.js (App Router) + TypeScript + Tailwind CSS |
| Backend | Node.js + Express.js + TypeScript |
| Database | MongoDB + Mongoose |
| Auth | JWT + bcrypt |
| File Upload | Cloudinary |
| Frontend Hosting | Vercel |
| Backend Hosting | Render |

---

## Features

### Borrower Portal
- Sign up / Login with JWT auth
- Personal details form with BRE (Business Rule Engine) eligibility check
- Salary slip upload (PDF)
- Loan configuration with live SI calculator (Amount: ₹50K–₹5L, Tenure: 30–365 days)
- Real-time interest and repayment preview

### Operations Dashboard
- **Sales** — Lead tracking (registered but not applied users)
- **Sanction** — Review applied loans, approve or reject with reason
- **Disbursement** — Mark sanctioned loans as disbursed
- **Collection** — Record payments via UTR, auto-close on full repayment

### Role-Based Access Control
- Roles: `borrower`, `sales`, `sanction`, `disbursement`, `collection`, `admin`
- Each executive sees only their module
- Admin sees all modules
- Enforced on both frontend routes and backend APIs

---

## Business Rule Engine (BRE)

Loan applications are rejected if any of these rules fail:

| Rule | Condition |
|---|---|
| Age | Must be between 23 and 50 |
| Salary | Must be ≥ ₹25,000/month |
| PAN | Must match format: `ABCDE1234F` |
| Employment | Must not be Unemployed |

---

## Interest Calculation

```
SI = (P × R × T) / (365 × 100)
Total Repayment = P + SI

Where:
  P = Principal Amount
  R = 12% per annum (fixed)
  T = Tenure in days
```

## Getting Started

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)
- Cloudinary account (for file uploads)

---

## Seed Database

Run the seed script to pre-create one account per role:

```bash
cd api
npm run seed
```

### Login Credentials

| Role | Email | Password |
|---|---|---|
| Admin | admin@credaxis.com | Admin@123 |
| Sales | sales@credaxis.com | Sales@123 |
| Sanction | sanction@credaxis.com | Sanction@123 |
| Disbursement | disbursement@credaxis.com | Disburse@123 |
| Collection | collection@credaxis.com | Collect@123 |
| Borrower | borrower@credaxis.com | Borrower@123 |

### Backend Setup

```bash
cd api
npm install
cp .env.example .env
# Fill in your .env values
npm run dev
```

### Frontend Setup

```bash
cd client
npm install
npm run dev
```

---

## Environment Variables

### Backend — `api/.env.example`

```env
PORT=5050
DB_URL=mongodb://localhost:27017/credaxis
JWT_SECRET=your_jwt_secret_here
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## API Overview

Base URL: `https://api-credaxis.onrender.com`

### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | `/user/register` | Register a new user |
| POST | `/user/login` | Login and get JWT token |

### Loans
| Method | Endpoint | Description |
|---|---|---|
| POST | `/loan/create` | Create a new loan |
| GET | `/loan/status/:status` | Get loans by status |
| GET | `/loan/borrower/:borrowerId` | Get loans by borrower |
| GET | `/loan/:id` | Get loan by ID |
| PATCH | `/loan/:id/status` | Update loan status |
| GET | `/loan/leads` | Get sales leads |

### Payments
| Method | Endpoint | Description |
|---|---|---|
| POST | `/payment/:loanId/record` | Record a payment |
| GET | `/payment/:loanId/all` | Get all payments for a loan |
| GET | `/payment/:loanId/outstanding` | Get outstanding balance |

---

## Loan Status Flow

```
PENDING → APPLIED → SANCTIONED → DISBURSED → CLOSED
                  ↘ REJECTED
```

---

## Author

**Aryan Kumar Shrivastav**
- GitHub: [@Aryan01903](https://github.com/Aryan01903)
- LinkedIn: [aryan-kumar-shrivastav](https://www.linkedin.com/in/aryan-kumar-shrivastav-638831268/)
