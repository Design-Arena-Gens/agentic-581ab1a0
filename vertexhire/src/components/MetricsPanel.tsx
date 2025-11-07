"use client";

import { ArrowUpRight } from "lucide-react";

import { PipelineMetric } from "./types";

type MetricsPanelProps = {
  metrics: PipelineMetric[];
};

export function MetricsPanel({ metrics }: MetricsPanelProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 text-white shadow-xl shadow-slate-900/20">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold">Vertexhire Control Room</h3>
          <p className="mt-1 text-sm text-slate-300">
            Real-time health of your consultancy pipeline at a glance.
          </p>
        </div>
        <ArrowUpRight className="h-5 w-5 text-slate-300" />
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm"
          >
            <p className="text-xs font-medium uppercase text-slate-300">
              {metric.label}
            </p>
            <p className="mt-2 text-2xl font-semibold">{metric.value}</p>
            <p
              className={`mt-1 text-xs font-medium ${
                metric.change >= 0 ? "text-emerald-300" : "text-rose-300"
              }`}
            >
              {metric.change >= 0 ? "+" : ""}
              {metric.change}% vs last week
            </p>
          </div>
        ))}
      </div>

      <footer className="mt-6 rounded-xl border border-dashed border-white/20 bg-white/10 p-4 text-sm text-slate-200">
        Vertexhire automates candidate touchpoints. 92% of candidates reported
        faster follow-ups compared with legacy agencies.
      </footer>
    </section>
  );
}
