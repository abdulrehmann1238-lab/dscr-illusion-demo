# Northline — Interactive GoHighLevel Partner Demo

High-fidelity frontend interactive demonstration designed for a proposal to a Canadian local-business web agency owner. Demonstrates snapshot architecture, workflow automations, webhook debugging, continuous maintenance queue, and agency capacity scaling up to 50 clients.

---

## 🚀 Live Netlify Deployment

This project is pre-configured for one-click deployment on **Netlify**:
- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **SPA Redirects**: Handled via `netlify.toml` and `public/_redirects` (`/* -> /index.html 200`)
- **Node Version**: Node 20+

---

## 🛠️ Tech Stack

- **Framework**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + Custom CSS Variables ("Spruce & Paper" design system)
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **State Management**: Zustand with `sessionStorage` persistence & one-click demo reset
- **Routing**: React Router v6 with lazy-loaded route splitting

---

## 💻 Local Development

```bash
# Install dependencies
npm install

# Start Vite local development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

---

## 🧭 Key Features & WOW Moments

1. **Snapshot Deploy Wizard (`/console/deploy`)**: 4-step wizard with real-time log streaming, resilience error-recovery simulation, and live branded preview.
2. **Workflows & Pipeline Board (`/console/workflows`)**: Interactive node chain runner that animates lead progression and adds deal cards to the CRM board.
3. **Webhook Inspector (`/console/integrations`)**: Raw JSON payload inspector, simulate 500 server error, exponential backoff retries (1m, 5m, 15m), and replay test runner.
4. **Maintenance Queue (`/console/maintenance`)**: Kanban board with an interactive Before/After visual comparison slider, QA checklists, and approval triggers.
5. **Ridgeline Plumbing Sample Site (`/demo/site/ridgeline-plumbing`)**: Conversion-focused local trades site in a responsive device frame (Mobile/Tablet/Desktop) with click-to-call, Canadian postal code validation, CASL consent, and instant CRM lead dispatch.
6. **Capacity & Growth Model (`/console/growth`)**: Interactive site slider calculating maintenance requests, dev hours, and partner bandwidth up to 50 clients.
