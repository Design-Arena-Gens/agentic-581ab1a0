"use client";

import { Briefcase, CalendarDays, MapPin, Search, Tag } from "lucide-react";
import { Candidate, CandidateStage } from "./types";

const stageStyles: Record<CandidateStage, string> = {
  Sourced: "bg-slate-100 text-slate-700 border-slate-200",
  Screening: "bg-blue-50 text-blue-700 border-blue-200",
  Interview: "bg-purple-50 text-purple-700 border-purple-200",
  Offer: "bg-amber-50 text-amber-700 border-amber-200",
  Placed: "bg-emerald-50 text-emerald-700 border-emerald-200",
};

type CandidateListProps = {
  candidates: Candidate[];
  selectedCandidateId: string | null;
  onSelect: (id: string) => void;
  searchTerm: string;
  onSearchTermChange: (value: string) => void;
  stageFilter: CandidateStage | "All";
  onStageFilterChange: (stage: CandidateStage | "All") => void;
};

const filters: (CandidateStage | "All")[] = [
  "All",
  "Sourced",
  "Screening",
  "Interview",
  "Offer",
  "Placed",
];

export function CandidateList({
  candidates,
  selectedCandidateId,
  onSelect,
  searchTerm,
  onSearchTermChange,
  stageFilter,
  onStageFilterChange,
}: CandidateListProps) {
  return (
    <aside className="flex h-full flex-col gap-4 rounded-2xl border border-slate-200 bg-white/70 p-4 backdrop-blur-sm">
      <header className="flex flex-col gap-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Candidate Pipeline
          </h2>
          <p className="text-sm text-slate-500">
            Track candidates across every stage of Vertexhire&apos;s funnel.
          </p>
        </div>

        <label className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500 focus-within:border-slate-400 focus-within:ring-2 focus-within:ring-slate-200">
          <Search className="h-4 w-4 text-slate-400" />
          <input
            value={searchTerm}
            onChange={(event) => onSearchTermChange(event.target.value)}
            placeholder="Search candidates or companies"
            className="w-full bg-transparent text-slate-700 outline-none"
          />
        </label>

        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => {
            const isActive = stageFilter === filter;
            return (
              <button
                key={filter}
                onClick={() => onStageFilterChange(filter)}
                className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                  isActive
                    ? "border-slate-900 bg-slate-900 text-white shadow-sm"
                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>
      </header>

      <div className="scrollbar-thin flex-1 space-y-3 overflow-y-auto pr-1">
        {candidates.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50/80 p-6 text-center text-sm text-slate-500">
            No candidates match this view. Adjust filters or clear your search.
          </div>
        )}
        {candidates.map((candidate) => {
          const isSelected = selectedCandidateId === candidate.id;
          return (
            <button
              key={candidate.id}
              onClick={() => onSelect(candidate.id)}
              className={`w-full rounded-xl border p-4 text-left transition ${
                isSelected
                  ? "border-slate-900 bg-slate-900 text-white shadow-lg shadow-slate-900/10"
                  : "border-slate-200 bg-white/80 hover:border-slate-300 hover:bg-white"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold">{candidate.name}</p>
                  <span
                    className={`mt-1 inline-flex items-center gap-2 rounded-full border px-2.5 py-0.5 text-xs font-medium ${
                      stageStyles[candidate.status]
                    } ${isSelected ? "border-white/40 bg-white/10 text-white" : ""}`}
                  >
                    <Briefcase className="h-3.5 w-3.5" />
                    {candidate.status}
                  </span>
                </div>
                <span className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  {candidate.progress}%
                </span>
              </div>
              <p
                className={`mt-2 text-sm ${
                  isSelected ? "text-slate-200" : "text-slate-500"
                }`}
              >
                {candidate.role} · {candidate.company}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium ${
                    isSelected
                      ? "border-white/30 text-white/90"
                      : "border-slate-200 text-slate-500"
                  }`}
                >
                  <MapPin className="h-3.5 w-3.5" />
                  {candidate.location}
                </span>
                <span
                  className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium ${
                    isSelected
                      ? "border-white/30 text-white/90"
                      : "border-slate-200 text-slate-500"
                  }`}
                >
                  <CalendarDays className="h-3.5 w-3.5" />
                  Next: {candidate.lastContact}
                </span>
                {candidate.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${
                      isSelected
                        ? "bg-white/10 text-white"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    <Tag className="mr-1 h-3 w-3" />
                    <span>{tag}</span>
                  </span>
                ))}
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
