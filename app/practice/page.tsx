import { randomQuestions, getTopics, difficultyMeta, typeLabels } from "@/lib/questions";
import { Card, Button, Badge, Input } from "@/components/ui";
import { AlarmClock, Sparkles } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function PracticePage({ searchParams }: { searchParams: { topic?: string; mode?: string } }) {
  const topics = await getTopics();
  const questions = await randomQuestions(5, searchParams.topic);
  const mode = searchParams.mode ?? "random";

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-border bg-gradient-to-r from-[#0f172a] via-[#0c1327] to-[#0b1021] p-6 md:p-8 relative overflow-hidden">
        <div className="absolute right-4 bottom-4 h-16 w-16 rounded-full bg-accent/20 blur-3xl" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Drills</p>
            <h1 className="text-3xl font-display font-semibold">Practice modes</h1>
            <p className="text-slate-400 max-w-2xl">
              Switch between fast random drills and focused timed sessions. Keep the clock visible, reveal answers when ready, and log progress.
            </p>
          </div>
          <div className="flex gap-2">
            <Button as-child variant={mode === "random" ? "primary" : "outline"} className="shadow-glow">
              <a href="/practice?mode=random">Random Drill</a>
            </Button>
            <Button as-child variant={mode === "timed" ? "primary" : "outline"}>
              <a href="/practice?mode=timed">Timed Session</a>
            </Button>
          </div>
        </div>
      </div>

      <Card className="p-5 space-y-3 border border-border/80 bg-[#0c1224]">
        <div className="flex items-center gap-2 text-sm text-slate-300 font-semibold">
          <AlarmClock size={16} className="text-accent" /> Build your session
        </div>
        <form className="grid md:grid-cols-3 gap-3">
          <select
            name="topic"
            defaultValue={searchParams.topic}
            className="rounded-xl border border-border bg-[#0b1021] px-3 py-2.5 text-sm focus:border-accent focus:outline-none"
          >
            <option value="">All topics</option>
            {topics.map((t) => (
              <option key={t.id} value={t.slug}>
                {t.name}
              </option>
            ))}
          </select>
          <Input name="minutes" type="number" placeholder="Minutes (optional)" />
          <Button type="submit">Refresh drill</Button>
        </form>
      </Card>

      <div className="grid gap-3">
        {questions.map((q) => (
          <Card key={q.id} className="p-5 space-y-2 hover:border-accent/60 transition duration-200">
            <div className="flex justify-between items-start gap-3">
              <div className="flex flex-col gap-2">
                <div className="text-xs text-slate-400 uppercase tracking-wide">{q.topics[0]?.topic.name}</div>
                <div className="font-semibold text-lg">{q.title}</div>
                <p className="text-sm text-slate-400 line-clamp-2">{q.prompt}</p>
                <div className="flex flex-wrap gap-2">
                  <Badge color={difficultyMeta[q.difficulty].color}>{difficultyMeta[q.difficulty].label}</Badge>
                  <Badge color="muted">{typeLabels[q.type]}</Badge>
                </div>
              </div>
              <div className="text-sm text-slate-300 inline-flex items-center gap-1">
                <Sparkles size={14} className="text-accent" /> {q.estimatedMinutes} min
              </div>
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
