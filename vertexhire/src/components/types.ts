export type CandidateStage =
  | "Sourced"
  | "Screening"
  | "Interview"
  | "Offer"
  | "Placed";

export type InteractionType = "note" | "email" | "call" | "meeting";

export interface CandidateInteraction {
  id: string;
  date: string;
  author: string;
  summary: string;
  type: InteractionType;
}

export interface CandidateTask {
  id: string;
  title: string;
  due: string;
  status: "pending" | "done";
  priority: "high" | "medium" | "low";
  assignee: string;
}

export interface CandidateDocument {
  id: string;
  name: string;
  url: string;
  updated: string;
}

export interface Candidate {
  id: string;
  name: string;
  headline: string;
  role: string;
  company: string;
  status: CandidateStage;
  progress: number;
  location: string;
  salary: string;
  email: string;
  phone: string;
  experience: string;
  availability: string;
  preferredChannel: "email" | "phone" | "slack";
  tags: string[];
  lastContact: string;
  summary: string;
  interactions: CandidateInteraction[];
  tasks: CandidateTask[];
  documents: CandidateDocument[];
}

export interface ResponseTemplate {
  id: string;
  label: string;
  subject: string;
  body: string;
}

export interface PipelineMetric {
  label: string;
  value: string;
  change: number;
}
