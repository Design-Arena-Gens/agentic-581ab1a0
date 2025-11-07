import { VertexhireDashboard } from "@/components/VertexhireDashboard";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-white px-4 py-10 text-slate-900 md:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <VertexhireDashboard />
      </div>
    </div>
  );
}
