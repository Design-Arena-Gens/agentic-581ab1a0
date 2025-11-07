"use client";

import { CalendarClock, Mail, MessageCircle, StickyNote } from "lucide-react";

import { CandidateInteraction } from "./types";

type InteractionFeedProps = {
  interactions: CandidateInteraction[];
};

const iconMap: Record<
  CandidateInteraction["type"],
  { icon: React.ComponentType<{ className?: string }>; label: string }
> = {
  note: { icon: StickyNote, label: "Note" },
  email: { icon: Mail, label: "Email" },
  call: { icon: MessageCircle, label: "Call" },
  meeting: { icon: CalendarClock, label: "Meeting" },
};

export function InteractionFeed({ interactions }: InteractionFeedProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-sm">
      <header className="mb-4">
        <h3 className="text-base font-semibold text-slate-900">
          Recent interactions
        </h3>
        <p className="text-sm text-slate-500">
          Every touchpoint Vertexhire has managed for this candidate.
        </p>
      </header>

      <ol className="space-y-4">
        {interactions.map((interaction) => {
          const { icon: Icon, label } = iconMap[interaction.type];
          return (
            <li
              key={interaction.id}
              className="relative rounded-xl border border-slate-200 bg-white/70 p-4"
            >
              <div className="absolute -left-3 top-5 h-6 w-6 rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm">
                <Icon className="h-4 w-4 translate-x-1 translate-y-1" />
              </div>
              <div className="mb-2 flex items-center justify-between">
                <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                  {label}
                </div>
                <p className="text-xs font-medium text-slate-400">
                  {interaction.date}
                </p>
              </div>
              <p className="text-sm font-semibold text-slate-700">
                {interaction.summary}
              </p>
              <p className="mt-2 text-xs font-medium uppercase tracking-wide text-slate-400">
                By {interaction.author}
              </p>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
