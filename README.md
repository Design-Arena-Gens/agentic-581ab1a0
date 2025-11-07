# Vertexhire Consultancy Agent

This workspace houses the Vertexhire web agent — a Next.js + Tailwind experience that lets consultancy teams steer their candidate pipelines with full visibility, fast follow-ups, and AI-assisted communication.

## Quickstart

```bash
cd vertexhire
npm install
npm run dev
```

Visit `http://localhost:3000` to explore the live dashboard. The project is optimized for deployment on Vercel and ships with production build support via `npm run build`.

## Key Capabilities

- Candidate pipeline filtering and selection with instant context cards.
- Deep candidate profile view covering compensation, availability, and narrative intel.
- Interaction logging, automated responses, and templated communications.
- Follow-up planner with priority tagging and due date tracking.
- Insight panel summarizing pipeline health metrics.

## Deployment

The project is wired for Vercel. Run the provided deployment command to publish to `https://agentic-581ab1a0.vercel.app`. After deployment, you can verify with:

```bash
curl https://agentic-581ab1a0.vercel.app
```

## Directory Map

```
/vertexhire
  ├─ src/app           # App router entry points, global styles, metadata
  └─ src/components    # Dashboard building blocks and shared domain types
```

## License

MIT — adapt and extend Vertexhire for your own consultancy workflows.
