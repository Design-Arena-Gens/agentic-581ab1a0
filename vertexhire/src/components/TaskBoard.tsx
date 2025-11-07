"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2, Circle, Clock, Plus, TriangleAlert } from "lucide-react";

import { CandidateTask } from "./types";

type TaskBoardProps = {
  tasks: CandidateTask[];
  onToggleTask: (taskId: string) => void;
  onCreateTask: (payload: {
    title: string;
    due: string;
    priority: CandidateTask["priority"];
  }) => void;
};

export function TaskBoard({
  tasks,
  onToggleTask,
  onCreateTask,
}: TaskBoardProps) {
  const [title, setTitle] = useState("");
  const [due, setDue] = useState("");
  const [priority, setPriority] = useState<CandidateTask["priority"]>("medium");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!title.trim()) return;
    onCreateTask({ title, due, priority });
    setTitle("");
    setDue("");
    setPriority("medium");
  };

  const priorityBadge: Record<CandidateTask["priority"], string> = {
    high: "bg-rose-100 text-rose-700 border-rose-200",
    medium: "bg-amber-100 text-amber-700 border-amber-200",
    low: "bg-emerald-100 text-emerald-700 border-emerald-200",
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-sm">
      <header className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-slate-900">
            Follow-up actions
          </h3>
          <p className="text-sm text-slate-500">
            Keep the Vertexhire pipeline moving with clear next steps.
          </p>
        </div>
        <TriangleAlert className="h-5 w-5 text-amber-500" />
      </header>

      <ul className="space-y-3">
        {tasks.map((task) => {
          const Icon = task.status === "done" ? CheckCircle2 : Circle;
          return (
            <li
              key={task.id}
              className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white/60 p-3"
            >
              <button
                type="button"
                onClick={() => onToggleTask(task.id)}
                className="mt-1 text-slate-500 transition hover:text-slate-900"
              >
                <Icon className="h-5 w-5" />
              </button>
              <div className="flex-1">
                <p className="text-sm font-semibold text-slate-800">
                  {task.title}
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                  <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-2 py-0.5">
                    <Clock className="h-3.5 w-3.5" />
                    Due {task.due || "TBD"}
                  </span>
                  <span
                    className={`rounded-full border px-2 py-0.5 font-medium ${priorityBadge[task.priority]}`}
                  >
                    {task.priority.toUpperCase()}
                  </span>
                  <span className="font-medium text-slate-400">
                    {task.assignee}
                  </span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <form
        onSubmit={handleSubmit}
        className="mt-4 space-y-3 rounded-xl border border-dashed border-slate-300 bg-slate-50/60 p-4"
      >
        <p className="flex items-center gap-2 text-sm font-semibold text-slate-700">
          <Plus className="h-4 w-4" /> Schedule a new follow-up
        </p>
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Task description"
          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
        />
        <div className="grid gap-3 md:grid-cols-2">
          <label className="text-xs font-medium text-slate-500">
            Due date
            <input
              type="date"
              value={due}
              onChange={(event) => setDue(event.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
            />
          </label>
          <label className="text-xs font-medium text-slate-500">
            Priority
            <select
              value={priority}
              onChange={(event) =>
                setPriority(event.target.value as CandidateTask["priority"])
              }
              className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </label>
        </div>
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          <Plus className="h-4 w-4" />
          Add follow-up
        </button>
      </form>
    </section>
  );
}
