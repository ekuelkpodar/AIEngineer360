import { randomQuestions, getTopics, difficultyMeta, typeLabels } from "@/lib/questions";
import { Card, Button, Badge, Input } from "@/components/ui";
import { Difficulty, QuestionType } from "@prisma/client";

export const dynamic = "force-dynamic";

export default async function PracticePage({ searchParams }: { searchParams: { topic?: string; mode?: string } }) {
  const topics = await getTopics();
  const questions = await randomQuestions(5, searchParams.topic);
  const mode = searchParams.mode ?? "random";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <p className="text-sm text-slate-400">Drills</p>
          <h1 className="text-3xl font-display font-semibold">Practice modes</h1>
        </div>
        <div className="flex gap-2">
          <Button as-child variant={mode === "random" ? "primary" : "outline"}>
            <a href="/practice?mode=random">Random Drill</a>
          </Button>
          <Button as-child variant={mode === "timed" ? "primary" : "outline"}>
            <a href="/practice?mode=timed">Timed Session</a>
          </Button>
        </div>
      </div>

      <Card className="p-5 space-y-3">
        <div className="text-sm text-slate-400">Filters</div>
        <form className="grid md:grid-cols-3 gap-3">
          <select name="topic" defaultValue={searchParams.topic} className="rounded-xl border border-border bg-[#0b1021] px-3 py-2.5 text-sm">
            <option value="">All topics</option>
            {topics.map((t) => (
              <option key={t.id} value={t.slug}>
                {t.name}
              </option>
            ))}
          </select>
          <Input name="minutes" type="number" placeholder="Minutes" />
          <Button type="submit">Refresh drill</Button>
        </form>
      </Card>

      <div className="grid gap-3">
        {questions.map((q) => (
          <Card key={q.id} className="p-5 space-y-2">
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-2">
                <div className="text-xs text-slate-400 uppercase">{q.topics[0]?.topic.name}</div>
                <div className="font-semibold">{q.title}</div>
                <p className="text-sm text-slate-400 line-clamp-2">{q.prompt}</p>
                <div className="flex flex-wrap gap-2">
                  <Badge color={difficultyMeta[q.difficulty].color}>{difficultyMeta[q.difficulty].label}</Badge>
                  <Badge color="muted">{typeLabels[q.type]}</Badge>
                </div>
              </div>
              <div className="text-sm text-slate-400">{q.estimatedMinutes} min</div>
            </div>
            <Button as-child variant="ghost">
              <a href={`/questions/${q.slug}`}>Open</a>
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
