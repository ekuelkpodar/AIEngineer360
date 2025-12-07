import Link from "next/link";
import { Badge, Button, Card } from "@/components/ui";
import { difficultyMeta, getQuestionsByTopic, getTopicBySlug, typeLabels } from "@/lib/questions";
import { Difficulty, QuestionType } from "@prisma/client";
import { notFound } from "next/navigation";
import { ArrowRight, Filter } from "lucide-react";
import { QuestionCard } from "@/components/cards";
import { FilterBar } from "@/components/filter-bar";

export default async function TopicPage({ params, searchParams }: { params: { slug: string }; searchParams: { difficulty?: Difficulty; type?: QuestionType } }) {
  const topic = await getTopicBySlug(params.slug);
  if (!topic) return notFound();

  const questions = await getQuestionsByTopic(params.slug, {
    difficulty: searchParams.difficulty,
    type: searchParams.type,
  });

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-border bg-gradient-to-r from-[#0f172a] via-[#0c1327] to-[#0b1021] p-6 md:p-8 relative overflow-hidden">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent/10 blur-3xl" />
        <div className="relative space-y-3">
          <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Topic</p>
          <h1 className="text-3xl md:text-4xl font-display font-semibold">{topic.name}</h1>
          <p className="text-slate-300 max-w-3xl leading-relaxed">{topic.description}</p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link href={`/practice?topic=${topic.slug}`}>
              <Button variant="primary">Practice this topic</Button>
            </Link>
            <Link href="/topics">
              <Button variant="outline">Back to topics</Button>
            </Link>
          </div>
        </div>
      </div>

      <Card className="p-4 md:p-5 border border-border/80 bg-[#0c1224]">
        <div className="flex items-center justify-between mb-3 gap-3 flex-wrap">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            <Filter size={14} className="text-accent" /> Filters
          </div>
          <div className="text-xs text-slate-500">Refine by difficulty, type, and time</div>
        </div>
        <FilterBar
          param="difficulty"
          options={(Object.keys(difficultyMeta) as Difficulty[]).map((diff) => ({
            label: difficultyMeta[diff].label,
            value: diff,
          }))}
        />
        <div className="h-3" />
        <FilterBar
          param="type"
          options={(Object.keys(typeLabels) as QuestionType[]).map((t) => ({ label: typeLabels[t], value: t }))}
        />
      </Card>

      <div className="grid md:grid-cols-[2fr,1fr] gap-4">
        <div className="grid gap-3">
          {questions.map((q) => (
            <QuestionCard
              key={q.id}
              title={q.title}
              slug={q.slug}
              prompt={q.prompt}
              difficulty={q.difficulty}
              type={q.type}
              estimatedMinutes={q.estimatedMinutes}
            />
          ))}
          {questions.length === 0 && <Card className="p-5 text-slate-400">No questions yet for this filter.</Card>}
        </div>
        <Card className="p-5 space-y-3">
          <div className="font-semibold">Difficulty mix</div>
          <DifficultyBars questions={questions} />
          <div className="font-semibold">Recommended sequence</div>
          <ul className="list-disc list-inside text-sm text-slate-300 space-y-1">
            <li>Start with fundamentals</li>
            <li>Move to modeling trade-offs</li>
            <li>Finish with production/MLOps</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}

function DifficultyBars({ questions }: { questions: any[] }) {
  const totals: Record<Difficulty, number> = { junior: 0, mid: 0, senior: 0, expert: 0 };
  questions.forEach((q) => (totals[q.difficulty] += 1));
  const all = Math.max(1, questions.length);
  return (
    <div className="space-y-2">
      {(Object.keys(totals) as Difficulty[]).map((d) => {
        const pct = Math.round((totals[d] / all) * 100);
        return (
          <div key={d} className="text-xs text-slate-400">
            <div className="flex items-center justify-between">
              <span>{difficultyMeta[d].label}</span>
              <span>{pct}%</span>
            </div>
            <div className="h-2 rounded-full bg-border overflow-hidden mt-1">
              <div className="h-full bg-accent" style={{ width: `${pct}%` }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
