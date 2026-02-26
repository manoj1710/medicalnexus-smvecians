# MedIntel Nexus: AI-Powered Clinical Triage & Smart Appointment System

MedIntel Nexus is a premium, intelligent healthcare platform designed to streamline the patient experience from symptom onset to specialist consultation. Using advanced clinical linguistics (simulated) and priority-based routing, it ensures that critical cases receive immediate attention while optimizing resource allocation across medical networks.

## 🚀 Tech Stack

- **Framework**: React.js (Javascript)
- **Styling**: Tailwind CSS (Tailwind UI patterns)
- **Animations**: Framer Motion (Page transitions, score meters, hover effects)
- **Icons**: Lucide React
- **Charts**: Recharts (Clinical load analytics, appointment distribution)
- **Routing**: React Router v6
- **Architecture**: Enterprise-level modular structure

## 📂 Project Architecture

The project follows a feature-based folder structure for high scalability:

- `src/core/`: Global theme configurations and constants.
- `src/ui/`: Shared, high-fidelity UI components (Buttons, Cards, Navbar).
- `src/features/`: Domain-specific modules:
  - `landing/`: Premium visual entry point.
  - `triage/`: AI Clinical Assessment engine.
  - `booking/`: Smart appointment scheduling.
  - `dashboard/`: Medical facility KPI overview.
  - `admin/`: Network management and clinical oversight.
- `src/layouts/`: Base structural components for consistent framing.

## 🎨 UI Design Philosophy: *Clinical Intelligence Interface*

- **Visual Clarity**: Large spacing, clean modern typography (Inter-style), and `rounded-2xl` cards.
- **Priority Signaling**: High-contrast urgency indicators (Deep Teal for safe, Urgent Red with glow effects for high-risk triage).
- **Interactive Depth**: Smooth micro-animations and page transitions using Framer Motion to provide a premium "app-like" feel.
- **Information Hierarchy**: Critical data (Triage scores, KPI trends) is emphasized through typography and color-coding.

## 🛠️ How to Run

1. Navigate to the project directory:
   ```bash
   cd client
   ```
2. Install dependencies (if not already installed):
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
4. Access the application at `http://localhost:3000`.

## 🔮 Future Integration Plan

- **Supabase Integration**: Move from simulated data to a live Postgres backend for patient records and appointment persistence.
- **LLM Engine**: Connect the Clinical Assessment page to a real-world Medical LLM (e.g., GPT-4o with medical grounding) for genuine symptom parsing.
- **Real-time Notifications**: Implement WebSockets or Push notifications for clinical staff when a High-Priority (Score 8+) case is detected.
- **Auth Flow**: Secure the Admin Panel and User Profile using Supabase Auth.
