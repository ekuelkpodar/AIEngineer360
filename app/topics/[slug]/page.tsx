import Link from "next/link";
import { Badge, Button, Card } from "@/components/ui";
import { difficultyMeta, getQuestionsByTopic, getTopicBySlug, typeLabels } from "@/lib/questions";
import { Difficulty, QuestionType } from "@prisma/client";
import { notFound } from "next/navigation";

export default async function TopicPage({ params, searchParams }: { params: { slug: string }; searchParams: { difficulty?: Difficulty; type?: QuestionType } }) {
  const topic = await getTopicBySlug(params.slug);
  if (!topic) return notFound();

  const questions = await getQuestionsByTopic(params.slug, {
    difficulty: searchParams.difficulty,
    type: searchParams.type,
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <p className="text-sm text-slate-400 uppercase tracking-wide">Topic</p>
          <h1 className="text-3xl font-display font-semibold">{topic.name}</h1>
          <p className="text-slate-400 mt-1 max-w-2xl">{topic.description}</p>
        </div>
        <div className="flex gap-2">
          <Link href="/practice">
            <Button variant="primary">Practice this topic</Button>
          </Link>
        </div>
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
      <div className="grid gap-3">
        {questions.map((q) => (
          <Card key={q.id} className="p-5">
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
              <div className="text-right text-sm text-slate-400 min-w-[120px]">
                <div>{q.estimatedMinutes} min</div>
                <div>{q.topics[0]?.topic.name}</div>
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
      className={`px-3 py-1.5 rounded-full border text-xs ${active ? "border-accent text-accent" : "border-border text-slate-300"}`}
    >
      {label}
    </Link>
  );
}
