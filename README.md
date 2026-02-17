# IUE GPA Calculator — Computer Programming

A **Progressive Web App (PWA)** for Izmir University of Economics Computer Programming students to calculate weighted grades, letter grades, and cumulative GPA using the official IUE grading scale.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?logo=tailwindcss)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript)

## Features

### Student Mode
- **Semester-organized courses** (1.1, 1.2, 2.1, 2.2)
- **Dynamic grade inputs** with both numeric fields and sliders (0–100)
- **IUE Grading Engine** — maps scores to: AA, BA, BB, CB, CC, DC, DD, FD, FF
- **Real-time GPA calculation** — cumulative and per-semester
- **Pass/Fail indicators** with DC/DD conditional pass logic (GPA ≥ 2.00)
- **Persistent scores** saved to LocalStorage

### Admin Mode
- **Password-protected** configuration panel
- **Per-course weight editor** — Midterm, Final, Project, Homework, Participation
- **Custom fields** — Add unlimited weight categories with the "+" button
- **0% = hidden** — Fields with 0% weight are hidden from students
- **Apply to All** — Copy one course's weights to all others
- **Persistent config** saved to LocalStorage

### Accessibility & Themes
- **Dark Mode** (default), **Light Mode**, and **High-Contrast** (B&W)
- **44×44px minimum touch targets** for mobile accessibility
- **Focus indicators** and keyboard navigation
- **Mobile-first** responsive design

### PWA Support
- Installable on iOS & Android
- Offline-capable with service worker caching
- Web app manifest for native-like experience

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── globals.css        # Tailwind + theme variables
│   ├── layout.tsx         # Root layout with providers
│   └── page.tsx           # Main page with view toggle
├── components/
│   ├── admin-panel.tsx    # Admin weight configuration
│   ├── app-header.tsx     # Navigation header
│   ├── grade-card.tsx     # Individual course grade entry
│   ├── gpa-summary.tsx    # GPA statistics dashboard
│   ├── grade-scale-reference.tsx
│   ├── sw-registration.tsx
│   ├── theme-provider.tsx
│   ├── theme-switcher.tsx
│   ├── user-view.tsx      # Student grade calculator
│   └── ui/                # Shadcn UI components
└── lib/
    ├── calculator-logic.ts # IUE grading engine
    ├── course-data.ts      # Full course database
    ├── storage.ts          # LocalStorage persistence
    ├── types.ts            # TypeScript definitions
    └── utils.ts            # Utility functions
```

## IUE Grading Scale

| Grade | Points | Score Range |
|-------|--------|-------------|
| AA    | 4.0    | 90–100      |
| BA    | 3.5    | 85–89       |
| BB    | 3.0    | 80–84       |
| CB    | 2.5    | 75–79       |
| CC    | 2.0    | 65–74       |
| DC    | 1.5    | 58–64       |
| DD    | 1.0    | 50–57       |
| FD    | 0.5    | 40–49       |
| FF    | 0.0    | 0–39        |

> **Note:** DC and DD grades require cumulative GPA ≥ 2.00 to pass.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS 4
- **Components:** Shadcn UI (Radix UI)
- **Icons:** Lucide React
- **Themes:** next-themes
- **Language:** TypeScript 5
