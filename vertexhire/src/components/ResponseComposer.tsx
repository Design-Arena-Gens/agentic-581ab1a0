"use client";

import { useState } from "react";
import { Loader2, MessageSquare, Send, Sparkles } from "lucide-react";

import { Candidate, ResponseTemplate } from "./types";

type ResponseComposerProps = {
  candidate: Candidate;
  templates: ResponseTemplate[];
  isSending?: boolean;
  onSend: (payload: { subject: string; body: string; templateId: string }) => Promise<void> | void;
};

export function ResponseComposer({
  candidate,
  templates,
  isSending = false,
  onSend,
}: ResponseComposerProps) {
  const [selectedTemplateId, setSelectedTemplateId] = useState(() => {
    return templates[0]?.id ?? "";
  });
  const [subject, setSubject] = useState(() => templates[0]?.subject ?? "");
  const [body, setBody] = useState(() => templates[0]?.body ?? "");

  const handleTemplateSelect = (templateId: string) => {
    const template = templates.find((entry) => entry.id === templateId);
    setSelectedTemplateId(templateId);
    if (template) {
      setSubject(template.subject);
      setBody(template.body);
    }
  };

  const handleSend = async () => {
    if (!subject.trim() || !body.trim()) {
      return;
    }
    await onSend({
      subject,
      body,
      templateId: selectedTemplateId,
    });
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-sm">
      <header className="flex items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white shadow-inner shadow-slate-900/20">
          <MessageSquare className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-base font-semibold text-slate-900">
            Respond to {candidate.name.split(" ")[0]}
          </h3>
          <p className="text-sm text-slate-500">
            Use Vertexhire&apos;s curated templates or craft a custom message.
          </p>
        </div>
      </header>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {templates.map((template) => {
          const isActive = selectedTemplateId === template.id;
          return (
            <button
              type="button"
              key={template.id}
              onClick={() => handleTemplateSelect(template.id)}
              className={`flex h-full flex-col gap-2 rounded-xl border p-3 text-left transition ${
                isActive
                  ? "border-slate-900 bg-slate-900 text-white shadow-lg shadow-slate-900/10"
                  : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Sparkles className="h-4 w-4" />
                {template.label}
              </div>
              <p
                className={`text-xs ${
                  isActive ? "text-slate-200" : "text-slate-500"
                }`}
              >
                {template.body.slice(0, 120)}...
              </p>
            </button>
          );
        })}
      </div>

      <div className="mt-4 space-y-3">
        <label className="block text-sm font-medium text-slate-600">
          Subject
          <input
            value={subject}
            onChange={(event) => setSubject(event.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
          />
        </label>
        <label className="block text-sm font-medium text-slate-600">
          Message
          <textarea
            value={body}
            onChange={(event) => setBody(event.target.value)}
            rows={6}
            className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
          />
        </label>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
        <p className="text-xs text-slate-500">
          Sending on {candidate.preferredChannel.toUpperCase()} · Reply ETA 12
          minutes • Automatically tracked in Vertexhire
        </p>
        <button
          type="button"
          onClick={handleSend}
          disabled={isSending || !subject.trim() || !body.trim()}
          className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          {isSending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Sending
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              Send response
            </>
          )}
        </button>
      </div>
    </section>
  );
}
