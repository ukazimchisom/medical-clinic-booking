<div align="center">

# 🏥 DocSlot

**A full-stack medical clinic booking platform — built on Next.js, Supabase, and EmailJS.**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://docslot.vercel.app/)
[![GitHub](https://img.shields.io/badge/Source%20Code-GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/ukazimchisom/medical-clinic-booking)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?style=flat-square&logo=supabase&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![React Query](https://img.shields.io/badge/React_Query-FF4154?style=flat-square&logo=reactquery&logoColor=white)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Screenshots](#-screenshots)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Database Setup](#database-setup)
  - [Running the App](#running-the-app)
- [Project Structure](#-project-structure)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)
- [Acknowledgements](#-acknowledgements)

---

## 🌟 Overview

DocSlot is a full-stack medical clinic booking web application that allows patients to browse qualified doctors, book appointments, manage their schedules, and receive email confirmations — all in one place. It features a patient-facing interface and a full-featured admin panel for managing doctors, appointments, and users.

Built with Next.js App Router, Supabase for authentication and database, TanStack Query for intelligent data caching, and EmailJS for transactional emails.

---

## ✨ Features

### 🧑‍⚕️ Patient Interface

- Browse a directory of doctors with search by name and filter by specialty
- Book appointments with an interactive date picker and time slot selector
- View booked slots in real time — already booked times are disabled automatically
- Dedicated booking confirmation page with appointment details
- Dashboard to view, reschedule, and cancel appointments
- Filter appointments by status — All, Scheduled, or Cancelled
- Appointment count badge on the navbar showing scheduled appointments
- Email confirmation sent after booking, cancellation, and rescheduling
- Profile page — update full name and upload a profile photo

### 🔧 Admin Panel

- Protected admin dashboard accessible only to users with the `admin` role
- Doctors tab — view all doctors, add new doctors, and delete existing ones
- Appointments tab — view all appointments across all users with patient details
- Users tab — view all registered users with their roles

### ⚡ UX & Developer Experience

- Skeleton loading states on all data-heavy pages — dashboard, doctors, booking, and profile
- Toast notifications for all user-facing actions via Sonner
- Custom 404 page and global error boundary with recovery options
- Protected routes — unauthenticated users are redirected to login with return URL
- Fully responsive — mobile, tablet, and desktop
- React Query caching — navigating back to visited pages loads data instantly
- Row Level Security on all Supabase tables — users can only access their own data

---

## 🛠 Tech Stack

| Layer           | Technology                             |
| --------------- | -------------------------------------- |
| Framework       | Next.js (App Router)                   |
| Language        | TypeScript                             |
| Styling         | Tailwind CSS                           |
| Backend & Auth  | Supabase (PostgreSQL + Auth + Storage) |
| Data Fetching   | TanStack React Query                   |
| Form Validation | React Hook Form + Zod                  |
| Email           | EmailJS (client-side)                  |
| Calendar        | react-day-picker                       |
| Notifications   | Sonner                                 |
| Testing         | Vitest + Testing Library               |
| Deployment      | Vercel                                 |

---

## 📸 Screenshots

![](/Docslot-screenshot.png)

---

## 🚀 Getting Started

### Prerequisites

Ensure the following are installed and available:

- [Node.js](https://nodejs.org/) v18+
- [npm](https://npmjs.com/) v9+
- A [Supabase](https://supabase.com) account (free tier works)
- An [EmailJS](https://emailjs.com) account (free tier works)

---

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/your-username/docslot.git
cd docslot
```

**2. Install dependencies**

```bash
npm install
```

---

### Environment Variables

**3. Create a `.env.local` file at the root of the project and add the following:**

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# EmailJS
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxxxxxx
NEXT_PUBLIC_EMAILJS_BOOKING_TEMPLATE_ID=template_xxxxxxx
NEXT_PUBLIC_EMAILJS_CANCELLATION_TEMPLATE_ID=template_xxxxxxx
NEXT_PUBLIC_EMAILJS_RESCHEDULE_TEMPLATE_ID=template_xxxxxxx
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxx
```

| Variable                                       | Where to Get It                   |
| ---------------------------------------------- | --------------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`                     | Supabase → Project Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY`                | Supabase → Project Settings → API |
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID`               | EmailJS → Email Services          |
| `NEXT_PUBLIC_EMAILJS_BOOKING_TEMPLATE_ID`      | EmailJS → Email Templates         |
| `NEXT_PUBLIC_EMAILJS_CANCELLATION_TEMPLATE_ID` | EmailJS → Email Templates         |
| `NEXT_PUBLIC_EMAILJS_RESCHEDULE_TEMPLATE_ID`   | EmailJS → Email Templates         |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`               | EmailJS → Account → General       |

---

### Database Setup

**4. Create a Supabase project** at [supabase.com](https://supabase.com), then go to **SQL Editor → New Query** and run the following schema:

```sql
-- Profiles table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT NOT NULL DEFAULT 'patient' CHECK (role IN ('patient', 'admin')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Doctors table
CREATE TABLE doctors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  specialty TEXT NOT NULL,
  photo TEXT,
  availability TEXT[],
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Appointments table
CREATE TABLE appointments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  doctor_id UUID REFERENCES doctors(id) ON DELETE CASCADE NOT NULL,
  appointment_date DATE NOT NULL,
  appointment_time TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'cancelled')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- Helper function to get user role (prevents infinite recursion in RLS)
CREATE OR REPLACE FUNCTION public.get_user_role()
RETURNS text AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid();
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- Profiles policies
CREATE POLICY "Users can view own profile or admins can view all"
  ON profiles FOR SELECT TO authenticated
  USING (auth.uid() = id OR public.get_user_role() = 'admin');

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE TO authenticated
  USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- Doctors policies
CREATE POLICY "Anyone can view doctors"
  ON doctors FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Only admins can insert doctors"
  ON doctors FOR INSERT TO authenticated
  WITH CHECK (public.get_user_role() = 'admin');

CREATE POLICY "Only admins can update doctors"
  ON doctors FOR UPDATE TO authenticated
  USING (public.get_user_role() = 'admin')
  WITH CHECK (public.get_user_role() = 'admin');

CREATE POLICY "Only admins can delete doctors"
  ON doctors FOR DELETE TO authenticated
  USING (public.get_user_role() = 'admin');

-- Appointments policies
CREATE POLICY "Users can view own appointments or admins can view all"
  ON appointments FOR SELECT TO authenticated
  USING (auth.uid() = user_id OR public.get_user_role() = 'admin');

CREATE POLICY "Users can insert their own appointments"
  ON appointments FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own appointments"
  ON appointments FOR UPDATE TO authenticated
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role, full_name)
  VALUES (NEW.id, NEW.email, 'patient', '');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

**5. Grant yourself admin access** (after signing up via the app):

```sql
UPDATE profiles SET role = 'admin' WHERE email = 'your-email@example.com';
```

**6. Create a storage bucket** for profile photos:

1. Go to **Supabase → Storage → New Bucket**
2. Name it `profile_photos` and set it to **Public**
3. Add INSERT and UPDATE policies with `bucket_id = 'profile_photos'`

---

### Running the App

**7. Start the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
docslot/
├── src/
│   ├── app/
│   │   ├── actions/                  # Next.js server actions
│   │   │   ├── book-appointment.ts
│   │   │   ├── cancel-appointment.ts
│   │   │   ├── reschedule-appointment.ts
│   │   │   ├── update-profile.ts
│   │   │   └── admin-actions.ts
│   │   ├── admin/                    # Admin dashboard
│   │   │   └── page.tsx
│   │   ├── book/[doctorId]/          # Booking page
│   │   │   └── page.tsx
│   │   ├── booking-confirmation/     # Confirmation page
│   │   │   └── page.tsx
│   │   ├── dashboard/                # Patient dashboard
│   │   │   └── page.tsx
│   │   ├── doctors/                  # Doctors listing
│   │   │   └── page.tsx
│   │   ├── profile/                  # Profile page
│   │   │   └── page.tsx
│   │   ├── login/                    # Login page
│   │   │   └── page.tsx
│   │   ├── register/                 # Register page
│   │   │   └── page.tsx
│   │   ├── error.tsx                 # Global error boundary
│   │   ├── not-found.tsx             # Custom 404 page
│   │   └── layout.tsx                # Root layout
│   ├── components/
│   │   ├── layout/
│   │   │   └── Navbar.tsx
│   │   ├── providers/
│   │   │   └── QueryProvider.tsx
│   │   └── ui/                       # Reusable UI components
│   │       ├── AppointmentSkeleton.tsx
│   │       ├── BookingPageSkeleton.tsx
│   │       ├── Button.tsx
│   │       ├── Calendar.tsx
│   │       ├── DoctorCard.tsx
│   │       ├── DoctorCardSkeleton.tsx
│   │       ├── Input.tsx
│   │       ├── Modal.tsx
│   │       ├── ProfileSkeleton.tsx
│   │       ├── RescheduleModal.tsx
│   │       └── SearchFilter.tsx
│   ├── hooks/
│   │   └── useAuth.ts                # Auth state hook
│   ├── lib/
│   │   ├── emailjs.ts                # EmailJS email functions (client)
│   │   ├── supabase-client.ts        # Browser Supabase client
│   │   ├── supabase-server.ts        # Server Supabase client
│   │   └── validators/
│   │       ├── appointment.ts        # Appointment Zod schema
│   │       └── auth.ts               # Auth Zod schema
│   ├── services/
│   │   └── appointment-service.ts    # All Supabase query functions
│   └── types/
│       └── index.ts                  # Global TypeScript types
├── middleware.ts                      # Session refresh middleware
├── vitest.config.ts                  # Vitest configuration
├── vitest.setup.ts                   # Vitest setup file
└── src/__tests__/                    # Unit tests
    ├── validators/
    │   ├── appointment.test.ts
    │   └── auth.test.ts
    └── services/
        └── appointment-service.test.ts
```

---

## 🧪 Testing

This project uses **Vitest** and **Testing Library** for unit tests.

**Run tests once:**

```bash
npm run test:run
```

**Run tests in watch mode:**

```bash
npm run test
```

**Current test coverage:**

| File                                   | Tests        |
| -------------------------------------- | ------------ |
| `validators/appointment.test.ts`       | 10 tests     |
| `validators/auth.test.ts`              | 12 tests     |
| `services/appointment-service.test.ts` | 6 tests      |
| **Total**                              | **28 tests** |

---

## 🌐 Deployment

This project is optimised for deployment on **Vercel**.

**Steps:**

1. Push your repository to GitHub
2. Go to [vercel.com](https://vercel.com) → **New Project** → Import your repo
3. Add all environment variables from `.env.local` under **Project Settings → Environment Variables**
4. Click **Deploy**

**After deploying:**

Go to **Supabase → Authentication → URL Configuration** and add your Vercel domain to the allowed redirect URLs:

```
https://your-project.vercel.app
https://your-project.vercel.app/**
```

Vercel automatically deploys on every push to `main` and creates preview deployments for every pull request.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create a feature branch:

```bash
git checkout -b feature/your-feature-name
```

3. Commit your changes:

```bash
git commit -m 'feat: add your feature'
```

4. Push to the branch:

```bash
git push origin feature/your-feature-name
```

5. Open a Pull Request

Please follow the [Conventional Commits](https://www.conventionalcommits.org/) standard for commit messages.

---

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgements

- [Supabase](https://supabase.com) — Backend, authentication, and storage
- [TanStack Query](https://tanstack.com/query) — Powerful data fetching and caching
- [EmailJS](https://emailjs.com) — Client-side transactional email
- [Sonner](https://sonner.emilkowal.ski) — Toast notifications
- [react-day-picker](https://daypicker.dev) — Accessible date picker
- [Vercel](https://vercel.com) — Deployment and hosting

---

<div align="center">
  <sub>Built with ❤️ using Next.js and Supabase</sub>
</div>
