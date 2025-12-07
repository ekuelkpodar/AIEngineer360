import Link from "next/link";
import { Badge, Button, Card } from "@/components/ui";
import { difficultyMeta, getQuestionsByTopic, getTopicBySlug, typeLabels } from "@/lib/questions";
import { Difficulty, QuestionType } from "@prisma/client";
import { notFound } from "next/navigation";
import { ArrowRight, Filter } from "lucide-react";

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
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 mb-3">
          <Filter size={14} className="text-accent" /> Filters
        </div>
        <div className="flex flex-wrap gap-2 text-sm text-slate-300">
          <FilterChip label="All" href={`/topics/${topic.slug}`} active={!searchParams.difficulty && !searchParams.type} />
          {(Object.keys(difficultyMeta) as Difficulty[]).map((diff) => (
            <FilterChip
              key={diff}
              label={difficultyMeta[diff].label}
              href={`/topics/${topic.slug}?difficulty=${diff}`}
              active={searchParams.difficulty === diff}
            />
          ))}
          {(Object.keys(typeLabels) as QuestionType[]).map((t) => (
            <FilterChip
              key={t}
              label={typeLabels[t]}
              href={`/topics/${topic.slug}?type=${t}`}
              active={searchParams.type === t}
            />
          ))}
        </div>
      </Card>

      <div className="grid gap-3">
        {questions.map((q) => (
          <Card key={q.id} className="p-5 hover:border-accent/60 transition duration-200">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2">
                <Link href={`/questions/${q.slug}`} className="font-semibold text-lg hover:text-accent">
                  {q.title}
                </Link>
                <p className="text-sm text-slate-400 line-clamp-2">{q.prompt}</p>
                <div className="flex flex-wrap gap-2">
                  <Badge color={difficultyMeta[q.difficulty].color}>{difficultyMeta[q.difficulty].label}</Badge>
                  <Badge color="muted">{typeLabels[q.type]}</Badge>
                  {q.tags.map((tag) => (
                    <Badge key={tag.tagId} color="muted">
                      {tag.tag.name}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="text-right text-sm text-slate-400 min-w-[140px] space-y-1">
                <div className="text-slate-300 font-semibold flex items-center justify-end gap-2">
                  <ArrowRight size={14} className="text-accent" /> {q.estimatedMinutes} min
                </div>
                <div className="text-xs uppercase tracking-wide text-slate-500">{q.topics[0]?.topic.name}</div>
              </div>
            </div>
          </Card>
        ))}
        {questions.length === 0 && <Card className="p-5 text-slate-400">No questions yet for this filter.</Card>}
      </div>
    </div>
  );
}

function FilterChip({ label, href, active }: { label: string; href: string; active?: boolean }) {
  return (
    <Link
      href={href}
      className={`px-3 py-1.5 rounded-full border text-xs ${active ? "border-accent text-accent bg-accent/10" : "border-border text-slate-300 hover:border-accent/40"}`}
    >
      {label}
    </Link>
  );
}
