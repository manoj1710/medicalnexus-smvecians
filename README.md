# 🏥 MedIntel Nexus  
### AI-Powered Clinical Triage & Intelligent Care Routing System

---

## 📌 Overview

MedIntel Nexus is an AI-driven clinical triage platform designed to simulate real-world hospital pre-consultation workflows.  

It intelligently analyzes patient-reported symptoms, assigns a structured risk score, recommends the appropriate medical specialist, and seamlessly routes the patient into a guided appointment booking system.

Built for **TetherX – 24 Hour Industry Simulation Hackathon**, this project focuses on strategic healthcare automation rather than just chatbot-style responses.

---

## 🎯 Problem Statement

Modern healthcare systems face:

- ❌ Overloaded emergency rooms  
- ❌ Incorrect specialist bookings  
- ❌ Delayed triage prioritization  
- ❌ Manual pre-consultation inefficiencies  

Patients often book the wrong department, leading to increased wait times and operational strain.

---

## 💡 Our Solution

MedIntel Nexus introduces:

> **AI-Based Pre-Consultation Triage + Automated Specialist Routing**

### 🔍 System Flow

Patient → Symptom Input → AI Triage Engine → Risk Classification → Specialist Mapping → Smart Booking Highlight

---

## 🧠 Core Features

### 1️⃣ AI Clinical Triage Engine
- NLP-powered symptom analysis (Gemini API)
- Structured JSON response
- Triage score (0–10)
- Risk level classification
- Specialist recommendation
- Clinical advisory note

---

### 2️⃣ Intelligent Workflow Routing
- Automatically highlights recommended specialist
- Seamless booking page integration
- Reduces wrong-department appointments

---

### 3️⃣ Emergency Escalation System
- Detects critical conditions
- Visual emergency banner
- Escalation UI simulation

---

### 4️⃣ Risk Visualization
- Animated circular risk meter
- Color-coded severity mapping
- Smooth UI transitions

---

### 5️⃣ Multi-Stage AI Simulation
Simulates clinical reasoning process:
- Analyzing symptoms
- Identifying risk factors
- Matching specialist
- Finalizing triage

---

### 6️⃣ Responsive Industry-Grade UI
- Clean medical aesthetic
- Mobile responsive design
- Structured data visualization
- Professional empty states

---

## 🏗 System Architecture

Frontend:  
React.js  

Backend:  
FastAPI (Python)  

AI Model:  
Google Gemini (Structured JSON Output)  

Deployment:  
Render (Backend)  

---

## 🔄 API Flow

### POST `/triage`

**Request:**
```json
{
  "symptoms": "Severe chest pain radiating to left arm",
  "severity": 9
}
