"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  ArrowUp,
  BriefcaseBusiness,
  CheckCircle,
  Globe,
  Mail,
  Phone,
  Sparkle,
  Users,
} from "lucide-react";

import { CandidateList } from "./CandidateList";
import { InteractionFeed } from "./InteractionFeed";
import { MetricsPanel } from "./MetricsPanel";
import { ResponseComposer } from "./ResponseComposer";
import { TaskBoard } from "./TaskBoard";
import {
  Candidate,
  CandidateInteraction,
  CandidateStage,
  PipelineMetric,
  ResponseTemplate,
} from "./types";

const initialCandidates: Candidate[] = [
  {
    id: "cand-1",
    name: "Amina Farouk",
    headline: "AI Product Leader · Full-cycle healthcare platforms",
    role: "Director of Product",
    company: "MedScribe AI",
    status: "Interview",
    progress: 68,
    location: "Austin, TX",
    salary: "$185k base · 25% bonus",
    email: "amina.farouk@medscribe.ai",
    phone: "+1 (512) 555-2910",
    experience: "12 years · AI healthtech · Ex-Uber Health",
    availability: "Open to offers · 2 week notice",
    preferredChannel: "email",
    tags: ["Healthcare AI", "Product Strategy", "Equity negotiable"],
    lastContact: "Aug 4 · 09:20",
    summary:
      "Scaled AI-driven documentation platform from seed to Series C. Led cross-functional pods of 45+, shipped HIPAA-compliant tooling, and improved adoption by 240%.",
    interactions: [
      {
        id: "int-1",
        date: "Aug 4 · 09:20",
        author: "Vertexhire · Jason",
        summary:
          "Sent pre-interview briefing and context for Cedar Health onsite panel.",
        type: "email",
      },
      {
        id: "int-2",
        date: "Aug 3 · 17:05",
        author: "Cedar Health · Maya",
        summary:
          "Requested competency matrix for leadership alignment. Interviewers aligned to product roadmap session.",
        type: "call",
      },
      {
        id: "int-3",
        date: "Aug 2 · 11:40",
        author: "Vertexhire · Ops",
        summary: "Uploaded updated comp expectations and relocation preferences.",
        type: "note",
      },
    ],
    tasks: [
      {
        id: "task-1",
        title: "Confirm onsite briefing deck delivery",
        due: "2024-08-05",
        status: "pending",
        priority: "high",
        assignee: "Jason (You)",
      },
      {
        id: "task-2",
        title: "Schedule comp calibration sync with Cedar",
        due: "2024-08-07",
        status: "pending",
        priority: "medium",
        assignee: "Ops Team",
      },
    ],
    documents: [
      {
        id: "doc-1",
        name: "Vertexhire briefing deck.pdf",
        url: "#",
        updated: "Aug 4 · 09:15",
      },
      {
        id: "doc-2",
        name: "Comp expectations.xlsx",
        url: "#",
        updated: "Aug 2 · 10:05",
      },
    ],
  },
  {
    id: "cand-2",
    name: "Diego Nakamura",
    headline: "Revenue-generating GTM leader · SaaS & PLG motions",
    role: "VP of Growth",
    company: "AtlasForge",
    status: "Offer",
    progress: 92,
    location: "San Francisco, CA",
    salary: "$210k base · 0.4% equity",
    email: "diego@atlasforge.io",
    phone: "+1 (415) 555-7712",
    experience: "14 years · Hypergrowth SaaS · PLG expert",
    availability: "Accepting decision · 48h hold",
    preferredChannel: "phone",
    tags: ["GTM", "Enterprise SaaS", "Multilingual"],
    lastContact: "Aug 3 · 14:10",
    summary:
      "Built and scaled GTM orgs for high-growth SaaS. Ex-Notion & Figma. Delivered 3x YoY ARR growth with hybrid PLG/enterprise playbooks.",
    interactions: [
      {
        id: "int-4",
        date: "Aug 3 · 14:10",
        author: "Vertexhire · Priya",
        summary:
          "Hosted negotiation prep call before executive offer presentation.",
        type: "meeting",
      },
      {
        id: "int-5",
        date: "Aug 2 · 16:45",
        author: "AtlasForge · CEO",
        summary:
          "Extended formal offer with relocation stipend and performance kicker.",
        type: "call",
      },
      {
        id: "int-6",
        date: "Aug 2 · 09:00",
        author: "Vertexhire · Legal",
        summary:
          "Completed comp benchmarking and risk diligence with counsel sign-off.",
        type: "note",
      },
    ],
    tasks: [
      {
        id: "task-3",
        title: "Draft counteroffer guardrails & scenario planning",
        due: "2024-08-04",
        status: "pending",
        priority: "high",
        assignee: "Priya (You)",
      },
      {
        id: "task-4",
        title: "Record 1-pager for AtlasForge board alignment",
        due: "2024-08-05",
        status: "pending",
        priority: "medium",
        assignee: "Strategy Pod",
      },
    ],
    documents: [
      {
        id: "doc-3",
        name: "Offer letter.pdf",
        url: "#",
        updated: "Aug 2 · 16:40",
      },
      {
        id: "doc-4",
        name: "Negotiation plan.docx",
        url: "#",
        updated: "Aug 3 · 13:30",
      },
    ],
  },
  {
    id: "cand-3",
    name: "Linh Tran",
    headline: "Founding engineer · Fintech & cloud infra specialist",
    role: "Principal Engineer",
    company: "LedgerLeap",
    status: "Screening",
    progress: 42,
    location: "Remote · Singapore",
    salary: "$230k base · 0.6% equity",
    email: "linh.tran@ledgerleap.dev",
    phone: "+65 9852 1023",
    experience: "9 years · Stripe · AWS · Fintech infrastructure",
    availability: "Open · 1 month notice",
    preferredChannel: "email",
    tags: ["Fintech", "Distributed Systems", "APAC"],
    lastContact: "Aug 1 · 22:30",
    summary:
      "Architected compliant payment rails at Stripe APAC. Spearheaded multi-region platform migrations with zero downtime across 28 markets.",
    interactions: [
      {
        id: "int-7",
        date: "Aug 1 · 22:30",
        author: "Vertexhire · Ops",
        summary: "Screening call recap with follow-up assessment links.",
        type: "email",
      },
      {
        id: "int-8",
        date: "Aug 1 · 21:10",
        author: "Vertexhire · Linh",
        summary: "Submitted availability grid and relocation preferences.",
        type: "note",
      },
    ],
    tasks: [
      {
        id: "task-5",
        title: "Share async coding challenge walkthrough",
        due: "2024-08-06",
        status: "pending",
        priority: "medium",
        assignee: "Engineering Pod",
      },
      {
        id: "task-6",
        title: "Prep APAC relocation checklist",
        due: "2024-08-08",
        status: "pending",
        priority: "low",
        assignee: "People Ops",
      },
    ],
    documents: [
      {
        id: "doc-5",
        name: "Tech screening notes.md",
        url: "#",
        updated: "Aug 1 · 22:45",
      },
    ],
  },
  {
    id: "cand-4",
    name: "Sophia Al Hadi",
    headline: "Fractional talent partner · Venture-backed startups",
    role: "Principal Consultant",
    company: "Vertexhire Collective",
    status: "Placed",
    progress: 100,
    location: "Remote · Dubai",
    salary: "$145/hr retainer",
    email: "sophia@vertexhire.com",
    phone: "+971 55 202 1104",
    experience: "11 years · Bain · Sequoia talent network",
    availability: "In mission · 6 months retained",
    preferredChannel: "slack",
    tags: ["Executive Search", "MENA", "Fractional"],
    lastContact: "Jul 29 · 10:15",
    summary:
      "Grew Vertexhire&apos;s retained search program. Leads playbooks for executive onboarding and stakeholder success metrics.",
    interactions: [
      {
        id: "int-9",
        date: "Jul 29 · 10:15",
        author: "Vertexhire · Jason",
        summary: "Kickoff call for venture studio expansion roadmap.",
        type: "meeting",
      },
    ],
    tasks: [
      {
        id: "task-7",
        title: "Share onboarding outcomes dashboard",
        due: "2024-08-10",
        status: "pending",
        priority: "medium",
        assignee: "Finance Ops",
      },
    ],
    documents: [
      {
        id: "doc-6",
        name: "Retained agreement.pdf",
        url: "#",
        updated: "Jul 29 · 09:20",
      },
    ],
  },
];

const responseTemplates: ResponseTemplate[] = [
  {
    id: "tmpl-1",
    label: "Interview confirmation",
    subject: "Interview confirmation & prep notes",
    body:
      "Hi {{firstName}},\n\nGreat news — the {{company}} team is excited to meet you. I've attached their interview format, focus areas, and panel bios.\n\nVertexhire will be on standby before and after the session. Let me know if you'd like a quick rehearsal.\n\nYou’ve got this,\nJason from Vertexhire",
  },
  {
    id: "tmpl-2",
    label: "Offer negotiation",
    subject: "Offer alignment next steps",
    body:
      "Hi {{firstName}},\n\nCongrats on reaching the offer stage! I’ve outlined the compensation levers we can explore and included benchmarks from similar roles Vertexhire closed this quarter.\n\nShare your instant reaction when you’re ready and we’ll map the negotiation strategy together.\n\nWith you all the way,\nPriya @ Vertexhire",
  },
  {
    id: "tmpl-3",
    label: "Re-engagement pulse",
    subject: "Quick check-in",
    body:
      "Hi {{firstName}},\n\nJust wanted to pulse-check where your head’s at. We’ve had new openings that match your profile and wanted to give you first look.\n\nIf it’s easier, drop me a time for a 10-minute touchpoint. Vertexhire keeps your search moving on your terms.\n\nTalk soon,\nTeam Vertexhire",
  },
];

const missionHighlights = [
  "Full lifecycle support — sourcing to onboarding — with measurable SLAs.",
  "AI assisted insights so every agent acts with the full Vertexhire brain.",
  "Talent, hiring teams, and partners connected in a single command center.",
];

export function VertexhireDashboard() {
  const [candidates, setCandidates] = useState(initialCandidates);
  const [searchTerm, setSearchTerm] = useState("");
  const [stageFilter, setStageFilter] =
    useState<CandidateStage | "All">("All");
  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(
    initialCandidates[0]?.id ?? null,
  );
  const [isSending, setIsSending] = useState(false);
  const [noteDraft, setNoteDraft] = useState("");

  const filteredCandidates = useMemo(() => {
    const normalizedQuery = searchTerm.trim().toLowerCase();
    return candidates
      .filter((candidate) =>
        stageFilter === "All" ? true : candidate.status === stageFilter,
      )
      .filter((candidate) => {
        if (!normalizedQuery) return true;
        return (
          candidate.name.toLowerCase().includes(normalizedQuery) ||
          candidate.company.toLowerCase().includes(normalizedQuery) ||
          candidate.role.toLowerCase().includes(normalizedQuery) ||
          candidate.tags.some((tag) =>
            tag.toLowerCase().includes(normalizedQuery),
          )
        );
      });
  }, [candidates, searchTerm, stageFilter]);

  const selectedCandidate = useMemo(() => {
    if (!selectedCandidateId) return filteredCandidates[0] ?? null;
    return (
      candidates.find((candidate) => candidate.id === selectedCandidateId) ??
      candidates[0] ??
      null
    );
  }, [candidates, filteredCandidates, selectedCandidateId]);

  const metrics: PipelineMetric[] = useMemo(() => {
    if (candidates.length === 0) {
      return [
        { label: "Pipeline status", value: "0 candidates", change: 0 },
        { label: "Interview velocity", value: "0%", change: 0 },
        { label: "Response SLA", value: "0m", change: 0 },
      ];
    }

    const active = candidates.filter((candidate) => candidate.progress < 100);
    const interviewRate =
      (candidates.filter((candidate) => candidate.status === "Interview")
        .length /
        candidates.length) *
      100;
    const averageProgress =
      candidates.reduce((acc, candidate) => acc + candidate.progress, 0) /
      candidates.length;

    return [
      {
        label: "Active pipeline",
        value: `${active.length} candidates`,
        change: 12,
      },
      {
        label: "Interview velocity",
        value: `${Math.round(interviewRate)}%`,
        change: 8,
      },
      {
        label: "Avg progress score",
        value: `${Math.round(averageProgress)} pts`,
        change: 5,
      },
    ];
  }, [candidates]);

  const handleSelectCandidate = (candidateId: string) => {
    setSelectedCandidateId(candidateId);
    setNoteDraft("");
  };

  const upsertCandidate = (candidateId: string, updater: (candidate: Candidate) => Candidate) => {
    setCandidates((prev) =>
      prev.map((candidate) =>
        candidate.id === candidateId ? updater(candidate) : candidate,
      ),
    );
  };

  const handleStageChange = (candidateId: string, stage: CandidateStage) => {
    upsertCandidate(candidateId, (candidate) => ({
      ...candidate,
      status: stage,
      progress:
        stage === "Sourced"
          ? 20
          : stage === "Screening"
            ? 40
            : stage === "Interview"
              ? 65
              : stage === "Offer"
                ? 85
                : 100,
    }));
  };

  const handleAddInteraction = (
    candidateId: string,
    payload: Omit<CandidateInteraction, "id" | "date">,
  ) => {
    const now = new Date();
    const readable = now.toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
    upsertCandidate(candidateId, (candidate) => ({
      ...candidate,
      interactions: [
        {
          id: crypto.randomUUID(),
          date: readable,
          ...payload,
        },
        ...candidate.interactions,
      ],
      lastContact: readable,
    }));
  };

  const handleToggleTask = (candidateId: string, taskId: string) => {
    upsertCandidate(candidateId, (candidate) => ({
      ...candidate,
      tasks: candidate.tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: task.status === "done" ? "pending" : "done",
            }
          : task,
      ),
    }));
  };

  const handleCreateTask = (
    candidateId: string,
    payload: { title: string; due: string; priority: Candidate["tasks"][number]["priority"] },
  ) => {
    upsertCandidate(candidateId, (candidate) => ({
      ...candidate,
      tasks: [
        {
          id: crypto.randomUUID(),
          title: payload.title,
          due: payload.due || new Date().toISOString().slice(0, 10),
          status: "pending",
          priority: payload.priority,
          assignee: "Vertexhire Agent",
        },
        ...candidate.tasks,
      ],
    }));
  };

  const handleSendResponse = async ({
    subject,
    body,
    templateId,
  }: {
    subject: string;
    body: string;
    templateId: string;
  }) => {
    if (!selectedCandidate) return;
    setIsSending(true);
    const personalizedBody = body.replaceAll(
      "{{firstName}}",
      selectedCandidate.name.split(" ")[0],
    );
    const enrichedBody = personalizedBody.replaceAll(
      "{{company}}",
      selectedCandidate.company,
    );

    await new Promise((resolve) => setTimeout(resolve, 750));

    handleAddInteraction(selectedCandidate.id, {
      author: "Vertexhire · Automation",
      summary: `Sent "${subject}" via ${selectedCandidate.preferredChannel.toUpperCase()} (template ${templateId}).`,
      type: "email",
    });

    handleAddInteraction(selectedCandidate.id, {
      author: "Vertexhire · CRM",
      summary: enrichedBody.split("\n").slice(0, 2).join(" "),
      type: "note",
    });
    setIsSending(false);
  };

  const handleAddNote = () => {
    if (!selectedCandidate || !noteDraft.trim()) return;
    handleAddInteraction(selectedCandidate.id, {
      author: "Vertexhire · You",
      summary: noteDraft.trim(),
      type: "note",
    });
    setNoteDraft("");
  };

  if (!selectedCandidate) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-300 bg-white/50 p-12 text-center text-slate-500">
        Add candidates to see the Vertexhire agent in action.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <header className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Vertexhire · Consultancy Agent
            </p>
            <h1 className="mt-1 text-3xl font-semibold text-slate-900">
              Your end-to-end hiring copilot
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Operate like a full-stack talent firm with automation,
              intelligence, and human-grade candidate care built into every
              workflow.
            </p>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-900 px-5 py-3 text-white shadow">
            <Sparkle className="h-6 w-6 text-amber-300" />
            <div>
              <p className="text-sm font-semibold">Vertexhire Reliability</p>
              <p className="text-xs text-slate-200">
                98.6% SLA adherence · Live triage by senior partners
              </p>
            </div>
          </div>
        </div>
        <ul className="mt-4 grid gap-2 text-sm text-slate-600 md:grid-cols-3">
          {missionHighlights.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2 rounded-xl border border-slate-200 bg-slate-50/60 p-3"
            >
              <CheckCircle className="mt-0.5 h-4 w-4 text-emerald-500" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </header>

      <div className="grid gap-6 lg:grid-cols-[320px_1.5fr_1fr]">
        <CandidateList
          candidates={filteredCandidates}
          selectedCandidateId={selectedCandidate.id}
          onSelect={handleSelectCandidate}
          searchTerm={searchTerm}
          onSearchTermChange={setSearchTerm}
          stageFilter={stageFilter}
          onStageFilterChange={setStageFilter}
        />

        <main className="flex h-full flex-col gap-4">
          <section className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <BriefcaseBusiness className="h-3.5 w-3.5" />
                  Active candidate
                </div>
                <h2 className="text-2xl font-semibold text-slate-900">
                  {selectedCandidate.name}
                </h2>
                <p className="text-sm text-slate-600">
                  {selectedCandidate.role} · {selectedCandidate.company}
                </p>
                <p className="text-sm text-slate-500">
                  {selectedCandidate.headline}
                </p>
                <div className="flex flex-wrap gap-3 text-xs text-slate-500">
                  <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-2 py-0.5">
                    <Users className="h-3.5 w-3.5" />
                    {selectedCandidate.experience}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-2 py-0.5">
                    <Globe className="h-3.5 w-3.5" />
                    {selectedCandidate.location}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm font-semibold text-slate-600">
                  <ArrowUp className="h-4 w-4 text-emerald-500" />
                  Progress {selectedCandidate.progress}%
                </div>
                <select
                  value={selectedCandidate.status}
                  onChange={(event) =>
                    handleStageChange(
                      selectedCandidate.id,
                      event.target.value as CandidateStage,
                    )
                  }
                  className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200"
                >
                  <option value="Sourced">Sourced</option>
                  <option value="Screening">Screening</option>
                  <option value="Interview">Interview</option>
                  <option value="Offer">Offer</option>
                  <option value="Placed">Placed</option>
                </select>
                <div className="text-xs text-slate-500">
                  Last touchpoint: {selectedCandidate.lastContact}
                </div>
              </div>
            </div>
            <div className="mt-4 grid gap-3 text-sm text-slate-600 md:grid-cols-3">
              <div className="rounded-xl border border-slate-200 bg-white/70 p-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Compensation
                </p>
                <p className="mt-1 text-sm font-semibold">
                  {selectedCandidate.salary}
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white/70 p-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Availability
                </p>
                <p className="mt-1 text-sm font-semibold">
                  {selectedCandidate.availability}
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white/70 p-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Preferred channel
                </p>
                <p className="mt-1 inline-flex items-center gap-2 text-sm font-semibold">
                  {selectedCandidate.preferredChannel === "email" && (
                    <Mail className="h-4 w-4 text-slate-500" />
                  )}
                  {selectedCandidate.preferredChannel === "phone" && (
                    <Phone className="h-4 w-4 text-slate-500" />
                  )}
                  {selectedCandidate.preferredChannel === "slack" && (
                    <Sparkle className="h-4 w-4 text-slate-500" />
                  )}
                  {selectedCandidate.preferredChannel.toUpperCase()}
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm">
            <h3 className="text-base font-semibold text-slate-900">
              Vertexhire briefing
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              {selectedCandidate.summary}
            </p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs">
              {selectedCandidate.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-600"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-4 grid gap-3 text-sm text-slate-600 md:grid-cols-2">
              <a
                href={`mailto:${selectedCandidate.email}`}
                className="inline-flex items-center justify-between rounded-xl border border-slate-200 bg-white/70 px-3 py-2 transition hover:border-slate-300 hover:bg-slate-50"
              >
                <span className="font-medium">{selectedCandidate.email}</span>
                <ArrowRight className="h-4 w-4 text-slate-400" />
              </a>
              <a
                href={`tel:${selectedCandidate.phone}`}
                className="inline-flex items-center justify-between rounded-xl border border-slate-200 bg-white/70 px-3 py-2 transition hover:border-slate-300 hover:bg-slate-50"
              >
                <span className="font-medium">{selectedCandidate.phone}</span>
                <ArrowRight className="h-4 w-4 text-slate-400" />
              </a>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm">
            <h3 className="text-base font-semibold text-slate-900">
              Add operational note
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Keep the Vertexhire brain fresh with every nuance you uncover.
            </p>
            <textarea
              value={noteDraft}
              onChange={(event) => setNoteDraft(event.target.value)}
              rows={4}
              placeholder="Ex: Confirmed they can start after sabbatical. Needs relocation stipend."
              className="mt-3 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
            />
            <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
              <span>Auto-shared to hiring pods &amp; executive sponsors.</span>
              <button
                type="button"
                onClick={handleAddNote}
                className="inline-flex items-center gap-1 rounded-full bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-slate-800"
              >
                <Sparkle className="h-3.5 w-3.5 text-amber-300" />
                Log note
              </button>
            </div>
          </section>

          <InteractionFeed interactions={selectedCandidate.interactions} />
        </main>

        <div className="flex h-full flex-col gap-4">
          <MetricsPanel metrics={metrics} />
          <TaskBoard
            tasks={selectedCandidate.tasks}
            onToggleTask={(taskId) =>
              handleToggleTask(selectedCandidate.id, taskId)
            }
            onCreateTask={(payload) =>
              handleCreateTask(selectedCandidate.id, payload)
            }
          />
          <ResponseComposer
            candidate={selectedCandidate}
            templates={responseTemplates}
            isSending={isSending}
            onSend={handleSendResponse}
          />
        </div>
      </div>
    </div>
  );
}
