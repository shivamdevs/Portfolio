# Portfolio Project Specification

## 1. Vision & Aesthetic

- **Theme:** "The Architect’s Console."
- **Style:** Dark Mode primary (Deep Charcoal/Black) with **Emerald Green** (representing health/uptime) or **Electric Blue** accents.
- **Visual Language:** Abstract technical diagrams, grid patterns, and "glassmorphism" for UI components.
- **Abstract Background:** A **Three.js** canvas rendering a "Neural Data Flow"—a 3D constellation of nodes and lines that react to mouse movement, symbolizing your work with 10M+ records and interconnected systems.

## 2. Technical Stack

- **Runtime:** `Bun` (for blazing fast builds/scripts).
- **Framework:** `Next.js 14+` (App Router).
- **Language:** `TypeScript` (Strict mode).
- **Styling:** `Tailwind CSS`.
- **UI Components:** `shadcn/ui` (Customized with thinner borders and sharper corners).
- **Animations:** `Framer Motion` (for scroll reveals) + `Three.js / React Three Fiber` (for the BG).

---

## 3. Site Structure (The "Sections")

### **I. The Hero: "The Systems Owner"**

- **Visual:** The 3D background is most prominent here.
- **Copy:** Instead of "Hi, I'm Shivam," use: **"I build and scale the engines of modern startups."**
- **Sub-copy:** Highlight the "Founding Engineer" title and the **10M+ records** metric immediately.
- **CTA:** "View System Architecture" (Scrolls to Projects).

### **II. The "Live Status" Dashboard (Unique Skill Section)**

- Instead of a boring list of icons, create a **System Health Dashboard** using `shadcn` cards.
- **Category Cards:** \* `Infrastructure`: AWS, EKS, Docker (Visualized with a "99.9% Uptime" mock badge).
- `Data Engine`: Python, Dagster, PostgreSQL (Visualized with a "Throughput" sparkline).
- `Frontend`: Next.js, React, Tailwind (Visualized with a "Performance" score).

### **III. The Timeline: "The Evolution"**

- A vertical, interactive timeline showing the **Acquisition Journey**.
- Start from **Intern (TTT)** **Acquisition** **Founding Engineer** **Engineering Lead**.
- Hovering over each milestone reveals a specific "Core Achievement" (e.g., "Hired pod of 3," "Owned AWS Root").

### **IV. The "Lab" (Project Section)**

- **HookPulse:** Feature this as an "Internal Tooling" case study. Show a mock-up of a terminal-style interface receiving webhooks.
- **Data Lake:** Use an abstract

SVG that animates as the user scrolls.

### **V. The "Hiring Mindset" (Lead Section)**

- A unique section for recruiters: **"What I look for in a team."**
- Briefly outline your philosophy on "Technical DNA" and "Compounding Talent." This reinforces your Senior/Lead status.

---

## 4. Interaction Details & Polish

- **Custom Cursor:** A small ring that expands when hovering over "Active" components.
- **Command Palette:** Use `shadcn` Command component (K Bar). Pressing `Cmd + K` allows users to quickly jump to "Resume," "GitHub," or "Contact."
- **Loading State:** A "System Initializing" terminal sequence that lists your core skills as it loads the Three.js assets.

---

## 5. Implementation Notes for the Agent

- **File Structure:**
- `/components/canvas/DataScene.tsx`: The Three.js background.
- `/components/dashboard/StatusCard.tsx`: The metric-driven skill cards.
- `/lib/constants.ts`: Store all 10M+ metrics and dates here for easy updates.

- **Optimization:** Use `next/dynamic` to import the Three.js scene to ensure a high **Lighthouse score** for SEO (relevant for your Writesonic application).
