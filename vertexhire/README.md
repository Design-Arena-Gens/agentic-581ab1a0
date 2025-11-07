# Vertexhire · Consultancy Agent

Vertexhire is an opinionated Next.js experience that acts as a full-stack consultancy copilot. It helps boutique recruiting teams orchestrate candidate pipelines, keep follow-ups on track, and respond to talent with polished, on-brand messaging.

## ✨ Highlights

- **Pipeline intelligence** – filterable candidate list with live status, progress, and quick-glance tags.
- **Operational cockpit** – detailed profile view with compensation, availability, and enriched narrative context.
- **Action automation** – track follow-up tasks, add operational notes, and send templated responses in one place.
- **Insight layer** – dynamic control room metrics that surface pipeline health at a glance.

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:3000` to experience the Vertexhire dashboard. Edits to files inside `src/` will hot-reload automatically.

## 🧱 Project Structure

```
src/
├─ app/
│  ├─ layout.tsx       # App-wide shell + metadata
│  ├─ page.tsx         # Landing page that renders the dashboard
│  └─ globals.css      # Tailwind/Tokens + global utilities
└─ components/
   ├─ VertexhireDashboard.tsx  # Main orchestration layer
   ├─ CandidateList.tsx        # Pipeline list & filters
   ├─ InteractionFeed.tsx      # Timeline of engagements
   ├─ TaskBoard.tsx            # Follow-up planner
   ├─ ResponseComposer.tsx     # AI-guided comms composer
   ├─ MetricsPanel.tsx         # Performance snapshot
   └─ types.ts                 # Shared domain models
```

## 🧪 Scripts

- `npm run dev` – start the local development server
- `npm run build` – create a production build
- `npm run start` – serve the production output
- `npm run lint` – run Next.js linting

## 📦 Deployment

Vertexhire is optimized for Vercel. Run `npm run build` to verify locally, then deploy with the Vercel CLI. The provided production command targets `https://agentic-581ab1a0.vercel.app`.

## 📄 License

MIT – feel free to adapt Vertexhire to your consultancy workflow.
