# 🏥 MedIntel Nexus — Intelligent Healthcare Management Platform

<div align="center">

![React](https://img.shields.io/badge/React-19.2.4-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-2.97.0-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-FF6B6B?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Active-4CAF50?style=for-the-badge)

**The Next-Generation AI-Powered Healthcare Platform**

MedIntel Nexus is a comprehensive healthcare management system featuring intelligent triage automation, smart specialist routing, priority-based appointment scheduling, and robust administrative controls — all built with modern web technologies.

[🚀 Getting Started](#-quick-start) • [📋 Features](#-key-features) • [🛠️ Tech Stack](#-technology-stack) • [🏗️ Architecture](#-project-structure) • [🤝 Contributing](#-contributing) • [📄 License](#-license)

</div>

---

## 📑 Table of Contents

1. [🌟 Overview](#-overview)
2. [🚀 Quick Start](#-quick-start)
3. [📋 Key Features](#-key-features)
4. [🛠️ Technology Stack](#-technology-stack)
5. [🏗️ Project Structure](#-project-structure)
6. [🔐 Authentication & Security](#-authentication--security)
7. [📊 User Roles](#-user-roles)
8. [🧩 Component Overview](#-component-overview)
9. [🤝 Contributing](#-contributing)
10. [📄 License](#-license)
11. [🙏 Acknowledgments](#-acknowledgments)

---

## 🌟 Overview

MedIntel Nexus is designed to revolutionize healthcare delivery through intelligent automation and seamless user experiences. The platform bridges the gap between patients and healthcare providers with cutting-edge features:

- **🤖 AI-Powered Triage**: Advanced symptom analysis for rapid clinical assessment
- **🎯 Smart Routing**: Intelligent matching of patients to appropriate specialists
- **⚡ Priority Scheduling**: Critical cases get immediate attention
- **📈 Comprehensive Analytics**: Real-time insights for administrators
- **🔒 Enterprise-Grade Security**: Robust protection for sensitive medical data

---

## 🚀 Quick Start

### Prerequisites

Ensure you have the following installed:

| Requirement | Version |
|-------------|---------|
| Node.js | ≥ 18.0.0 |
| npm | ≥ 9.0.0 |

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/MedIntel_Nexus.git

# Navigate to client directory
cd MedIntel_Nexus/client

# Install dependencies
npm install

# Start development server
npm start
```

The application will be available at `http://localhost:3000`

### Building for Production

```bash
# Create optimized production build
npm run build

# The build output will be in the /build directory
```

---

## 📋 Key Features

### 🧑‍⚕️ Patient Portal

| Feature | Description |
|---------|-------------|
| **Dashboard** | Personalized health overview with upcoming appointments and recent activity |
| **AI Assessment** | Intelligent symptom checker with priority scoring |
| **Smart Booking** | Automated specialist matching and priority-based scheduling |
| **Medical History** | Comprehensive records of past consultations and assessments |
| **Profile Management** | Secure management of personal and medical information |

### 👨‍💻 Admin Portal

| Feature | Description |
|---------|-------------|
| **Analytics Dashboard** | Real-time metrics on patient flow, wait times, and department performance |
| **Query Management** | Handle and track patient inquiries efficiently |
| **Appointment Oversight** | Comprehensive view and management of all scheduled appointments |
| **Security Center** | Audit logs, access controls, and security monitoring |

### 🌐 Public Features

- **Landing Page**: Engaging introduction to platform capabilities
- **Authentication**: Secure login with role-based access control
- **Role Selection**: Seamless switching between Patient and Admin views

---

## 🛠️ Technology Stack

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 19.2.4 | Core UI framework |
| **React Router** | 7.13.1 | Client-side routing |
| **Tailwind CSS** | 3.4.x | Utility-first styling |
| **Framer Motion** | 12.34.3 | Smooth animations |
| **Lucide React** | 0.575.0 | Icon library |
| **Recharts** | 3.7.0 | Data visualization |
| **React Hook Form** | 7.71.2 | Form management |

### Backend & Services

| Technology | Version | Purpose |
|------------|---------|---------|
| **Supabase** | 2.97.0 | Backend-as-a-Service (Auth & Database) |
| **Axios** | 1.13.5 | HTTP client |

### Development Tools

| Tool | Purpose |
|------|---------|
| **ESLint** | Code linting |
| **Create React App** | Project bootstrapping |
| **Web Vitals** | Performance monitoring |

---

## 🏗️ Project Structure

```
client/
├── public/                     # Static assets
│   ├── index.html             # HTML template
│   ├── manifest.json          # PWA manifest
│   └── favicon.ico            # App icon
├── src/
│   ├── App.js                 # Main application component
│   ├── index.js               # Application entry point
│   ├── index.css              # Global styles
│   ├── App.css                # App-level styles
│   │
│   ├── components/            # Reusable components
│   │   └── ProtectedRoute.js  # Route guard component
│   │
│   ├── config/                # Configuration files
│   │
│   ├── core/                  # Core utilities
│   │
│   ├── features/              # Feature modules
│   │   ├── admin/            # Admin portal features
│   │   │   ├── AdminDashboard.js
│   │   │   ├── AdminAnalytics.js
│   │   │   ├── AdminAppointments.js
│   │   │   ├── AdminQueries.js
│   │   │   ├── AdminSecurity.js
│   │   │   └── AdminPanel.js
│   │   │
│   │   ├── auth/             # Authentication features
│   │   │   ├── LoginPage.js
│   │   │   └── ProfilePage.js
│   │   │
│   │   ├── booking/          # Appointment booking
│   │   │   └── BookingPage.js
│   │   │
│   │   ├── dashboard/        # Main dashboard
│   │   │   └── DashboardPage.js
│   │   │
│   │   ├── landing/          # Public landing page
│   │   │   └── LandingPage.js
│   │   │
│   │   ├── patient/          # Patient portal features
│   │   │   ├── PatientHome.js
│   │   │   ├── PatientAssessment.js
│   │   │   ├── PatientBooking.js
│   │   │   ├── PatientHistory.js
│   │   │   └── PatientProfile.js
│   │   │
│   │   └── triage/           # Triage system
│   │       └── AssessmentPage.js
│   │
│   ├── hooks/                # Custom React hooks
│   │
│   ├── layouts/              # Layout components
│   │   ├── AdminLayout.js    # Admin portal layout
│   │   ├── MainLayout.js     # Main layout
│   │   └── PatientLayout.js  # Patient portal layout
│   │
│   ├── services/             # API services
│   │
│   ├── state/                # State management
│   │   └── AuthContext.js    # Authentication context
│   │
│   ├── ui/                  # UI components
│   │   └── Navbar.js         # Navigation component
│   │
│   └── utils/               # Utility functions
│
├── package.json             # Dependencies
├── tailwind.config.js       # Tailwind configuration
└── README.md                # This file
```

---

## 🔐 Authentication & Security

### Role-Based Access Control (RBAC)

MedIntel Nexus implements a robust role-based access control system:

```
┌─────────────────────────────────────────────────────────────┐
│                      USER ROLES                             │
├──────────────────┬──────────────────────────────────────────┤
│     PATIENT      │  • View personal health information       │
│                  │  • Complete assessments                   │
│                  │  • Book appointments                      │
│                  │  • View medical history                   │
│                  │  • Manage profile                         │
├──────────────────┼──────────────────────────────────────────┤
│      ADMIN       │  • Full system access                    │
│                  │  • View all analytics                     │
│                  │  • Manage appointments                    │
│                  │  • Handle patient queries                │
│                  │  • Configure security settings           │
└──────────────────┴──────────────────────────────────────────┘
```

### Security Features

- ✅ **Protected Routes**: All sensitive routes are guarded
- ✅ **Context-Based Auth**: Centralized authentication state
- ✅ **Session Management**: Secure login/logout handling
- ✅ **Input Validation**: Form validation with React Hook Form

---

## 📊 User Roles

### Patient Workflow

```
┌──────────────┐     ┌────────────────┐     ┌─────────────┐
│   Landing    │────▶│ Login/Register │────▶│   Dashboard │
│    Page      │     │                │     │             │
└──────────────┘     └────────────────┘     └──────┬──────┘
                                                   │
                    ┌───────────────────────────────┼───────────┐
                    │                               │           │
                    ▼                               ▼           ▼
          ┌─────────────────┐           ┌────────────┐  ┌─────────────┐
          │   Assessment    │           │  Booking   │  │   History   │
          │   (AI Triage)   │           │            │  │             │
          └─────────────────┘           └────────────┘  └─────────────┘
```

### Admin Workflow

```
┌──────────────┐     ┌────────────────┐     ┌─────────────┐
│   Landing    │────▶│     Login      │────▶│   Admin     │
│    Page      │     │                │     │  Dashboard  │
└──────────────┘     └────────────────┘     └──────┬──────┘
                                                   │
         ┌────────────────────────────────────────┼────────────────┐
         │                    │                    │                │
         ▼                    ▼                    ▼                ▼
┌─────────────────┐  ┌────────────┐  ┌────────────┐  ┌────────────┐
│   Analytics     │  │ Appointments│  │  Queries   │  │  Security  │
│                 │  │            │  │            │  │            │
└─────────────────┘  └────────────┘  └────────────┘  └────────────┘
```

---

## 🧩 Component Overview

### Core Components

| Component | Purpose |
|-----------|---------|
| [`App.js`](src/App.js) | Main routing and application orchestration |
| [`AuthContext.js`](src/state/AuthContext.js) | Global authentication state |
| [`ProtectedRoute.js`](src/components/ProtectedRoute.js) | Route access control |
| [`Navbar.js`](src/ui/Navbar.js) | Global navigation |

### Layout Components

| Component | Description |
|-----------|-------------|
| [`PatientLayout.js`](src/layouts/PatientLayout.js) | Patient portal shell |
| [`AdminLayout.js`](src/layouts/AdminLayout.js) | Admin portal shell |
| [`MainLayout.js`](src/layouts/MainLayout.js) | Public pages layout |

### Feature Components

#### Patient Features

- [`PatientHome.js`](src/features/patient/PatientHome.js) - Patient dashboard
- [`PatientAssessment.js`](src/features/patient/PatientAssessment.js) - AI triage system
- [`PatientBooking.js`](src/features/patient/PatientBooking.js) - Appointment booking
- [`PatientHistory.js`](src/features/patient/PatientHistory.js) - Medical history
- [`PatientProfile.js`](src/features/patient/PatientProfile.js) - User profile

#### Admin Features

- [`AdminDashboard.js`](src/features/admin/AdminDashboard.js) - Admin overview
- [`AdminAnalytics.js`](src/features/admin/AdminAnalytics.js) - Data analytics
- [`AdminAppointments.js`](src/features/admin/AdminAppointments.js) - Appointment management
- [`AdminQueries.js`](src/features/admin/AdminQueries.js) - Patient inquiries
- [`AdminSecurity.js`](src/features/admin/AdminSecurity.js) - Security settings

---

## 🤝 Contributing

We welcome contributions to MedIntel Nexus! Here's how you can help:

### Development Workflow

```bash
# 1. Fork the repository
# 2. Create your feature branch
git checkout -b feature/amazing-feature

# 3. Make your changes
# 4. Commit your changes
git commit -m 'Add some amazing feature'

# 5. Push to the branch
git push origin feature/amazing-feature

# 6. Open a Pull Request
```

### Code Style

- Follow React best practices
- Use functional components with hooks
- Keep components small and focused
- Write meaningful comments
- Use meaningful variable names

### Reporting Issues

If you find a bug or have a suggestion:

1. Check existing issues
2. Create a new issue with detailed description
3. Include steps to reproduce (if applicable)

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 MedIntel Nexus

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 🙏 Acknowledgments

### Open Source Libraries

| Library | Description |
|---------|-------------|
| [React](https://react.dev/) | UI library |
| [Tailwind CSS](https://tailwindcss.com/) | Styling framework |
| [Framer Motion](https://www.framer.com/motion/) | Animation library |
| [Supabase](https://supabase.com/) | Backend services |
| [Lucide](https://lucide.dev/) | Beautiful icons |
| [Recharts](https://recharts.org/) | Charts library |

### Inspiration

Built with ❤️ for healthcare professionals and patients everywhere.

---

## 📞 Support

Need help? Here's where to find support:

- 📧 **Email**: support@medintelnexus.com
- 💬 **Discord**: [Join our community](https://discord.gg/medintelnexus)
- 📖 **Documentation**: [View docs](client/DOCUMENTATION.md)
- 🐛 **Issues**: [Report bugs](https://github.com/your-org/MedIntel_Nexus/issues)

---

<div align="center">

**⭐ Star us on GitHub if this project helped you!**

Built with ❤️ by the MedIntel Nexus Team

</div>
