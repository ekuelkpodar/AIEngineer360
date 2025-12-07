"use client";

import { useState } from "react";
import { Badge, Button, Card, TextArea } from "@/components/ui";
import { Difficulty, QuestionType, Topic } from "@prisma/client";
import { difficultyMeta, typeLabels } from "@/lib/questions";
import Link from "next/link";
import { ArrowRight, Bookmark, CheckCircle, Clock, Shuffle } from "lucide-react";

export type QuestionViewModel = {
  id: string;
  slug: string;
  title: string;
  prompt: string;
  answer: string;
  difficulty: Difficulty;
  type: QuestionType;
  estimatedMinutes: number;
  topics: { topic: Topic }[];
  tags: { tag: { id: string; name: string } }[];
};

export function QuestionView({ question, related }: { question: QuestionViewModel; related: QuestionViewModel[] }) {
  const [showAnswer, setShowAnswer] = useState(false);
  const [note, setNote] = useState("");
  const [status, setStatus] = useState<"not_started" | "in_progress" | "mastered">("not_started");

  return (
    <div className="grid lg:grid-cols-[2fr,1fr] gap-6">
      <Card className="p-6 space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <Badge color={difficultyMeta[question.difficulty].color}>
              {difficultyMeta[question.difficulty].label}
            </Badge>
          </div>
          <div className="text-sm text-slate-400 flex items-center gap-2">
            <Clock size={14} /> {question.estimatedMinutes} min
          </div>
        </div>
        <h1 className="text-2xl font-display font-semibold">{question.title}</h1>
        <p className="text-slate-300 whitespace-pre-wrap leading-relaxed">{question.prompt}</p>

        <div className="space-y-2">
          <Button variant="primary" onClick={() => setShowAnswer((v) => !v)}>
            {showAnswer ? "Hide answer" : "Reveal answer"}
          </Button>
          {showAnswer && (
            <div className="prose prose-invert prose-sm">
              <p className="text-slate-200 whitespace-pre-wrap">{question.answer}</p>
            </div>
          )}
        </div>

        <div className="space-y-3">
          <div className="font-semibold">Personal notes</div>
          <TextArea
            rows={4}
            placeholder="Jot down improvements, follow-ups, or how you would explain this to a PM."
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>
      </Card>

      <div className="space-y-4">
        <Card className="p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="font-semibold">Progress</div>
            <Bookmark size={16} className="text-accent" />
          </div>
          <div className="flex flex-wrap gap-2 text-sm">
            <ProgressButton label="Not started" active={status === "not_started"} onClick={() => setStatus("not_started")} />
            <ProgressButton label="In progress" active={status === "in_progress"} onClick={() => setStatus("in_progress")} />
            <ProgressButton label="Mastered" active={status === "mastered"} onClick={() => setStatus("mastered")} />
          </div>
        </Card>
        <Card className="p-5 space-y-2">
          <div className="font-semibold">Metadata</div>
          <div className="flex flex-wrap gap-2">
            <Badge color="muted">{typeLabels[question.type]}</Badge>
            {question.tags.map((t) => (
              <Badge key={t.tag.id} color="muted">
                {t.tag.name}
              </Badge>
            ))}
          </div>
          <div className="text-sm text-slate-400">
            Topics: {question.topics.map((t) => t.topic.name).join(", ")}
          </div>
        </Card>
        <Card className="p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="font-semibold">Navigate</div>
            <Shuffle size={16} className="text-accent" />
          </div>
          <div className="flex flex-col gap-2 text-sm">
            <Button as-child variant="outline">
              <Link href="/practice">Random question</Link>
            </Button>
            <Button as-child variant="ghost">
              <Link href="/practice?mode=timed">Timed session</Link>
            </Button>
          </div>
        </Card>
        <Card className="p-5 space-y-3">
          <div className="font-semibold">Related questions</div>
          <div className="flex flex-col gap-2 text-sm">
            {related.map((r) => (
              <Link key={r.id} href={`/questions/${r.slug}`} className="text-accent inline-flex items-center gap-2">
                <ArrowRight size={14} /> {r.title}
              </Link>
            ))}
            {related.length === 0 && <div className="text-slate-500">No related questions yet.</div>}
          </div>
        </Card>
      </div>
    </div>
  );
}

function ProgressButton({ label, active, onClick }: { label: string; active?: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 rounded-full border px-3 py-2 ${
        active ? "border-accent text-accent bg-accent/10" : "border-border text-slate-300"
      }`}
    >
      {active && <CheckCircle size={14} />}
      {label}
    </button>
  );
}
