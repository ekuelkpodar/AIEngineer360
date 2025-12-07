import Link from "next/link";
import { ArrowRight, Sparkles, TimerReset, Zap } from "lucide-react";
import { Badge, Button, Card } from "@/components/ui";
import { getFeaturedTopics } from "@/lib/questions";

export default async function LandingPage() {
  const topics = await getFeaturedTopics();

  return (
    <div className="space-y-10">
      <section className="grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-5">
          <Badge color="blue">Interview-ready in weeks, not months</Badge>
          <h1 className="font-display text-4xl md:text-5xl font-bold leading-tight">
            ModelPrep Hub is your ML interview copilot.
          </h1>
          <p className="text-lg text-slate-300 max-w-xl">
            Drill 1,000+ curated machine learning, data science, and Python questions. Practice by topic, run timed sessions, and track mastery without losing momentum.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button as-child variant="primary" size="lg">
              <Link href="/topics">Browse topics</Link>
            </Button>
            <Button as-child variant="ghost" size="lg">
              <Link href="/practice">Start a practice run</Link>
            </Button>
          </div>
          <div className="flex gap-6 text-sm text-slate-400">
            <div>
              <div className="text-2xl font-bold text-accent">120+</div>
              <div>sample questions seeded</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-accent">20</div>
              <div>core topics</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-accent">2</div>
              <div>practice modes</div>
            </div>
          </div>
        </div>
        <Card className="p-6 gradient-border">
          <div className="gradient-border rounded-2xl">
            <div className="rounded-2xl border border-border bg-[#0b1021] p-6 space-y-4">
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <Sparkles size={16} className="text-accent" />
                Curated drills
              </div>
              <div className="space-y-3 text-sm text-slate-200">
                <p className="font-semibold text-slate-100">Practice modes</p>
                <div className="flex items-center justify-between rounded-xl border border-border bg-[#0f172a] px-4 py-3">
                  <div>
                    <div className="font-semibold">Random Drill</div>
                    <p className="text-slate-400 text-xs">Pull 5 questions matching your filters.</p>
                  </div>
                  <Zap className="text-accent" size={18} />
                </div>
                <div className="flex items-center justify-between rounded-xl border border-border bg-[#0f172a] px-4 py-3">
                  <div>
                    <div className="font-semibold">Timed Session</div>
                    <p className="text-slate-400 text-xs">Stay sharp with a 12-minute countdown.</p>
                  </div>
                  <TimerReset className="text-accent" size={18} />
                </div>
              </div>
            </div>
          </div>
        </Card>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Browse by topic</h2>
          <Link href="/topics" className="text-sm text-accent flex items-center gap-1">
            View all <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {topics.map((topic) => (
            <Card key={topic.id} className="p-5 hover:border-accent/80 transition">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-semibold text-lg mb-1">{topic.name}</h3>
                  <p className="text-sm text-slate-400 line-clamp-3">{topic.description}</p>
                </div>
                <Badge color="muted">Featured</Badge>
              </div>
              <div className="mt-4">
                <Link href={`/topics/${topic.slug}`} className="text-sm text-accent inline-flex items-center gap-1">
                  Open topic <ArrowRight size={14} />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-4">
        <Card className="p-5">
          <h3 className="font-semibold text-lg mb-2">Designed for mastery</h3>
          <p className="text-sm text-slate-400">
            Track progress, mark questions as mastered, and revisit flagged items so interview muscle stays warm.
          </p>
        </Card>
        <Card className="p-5">
          <h3 className="font-semibold text-lg mb-2">Research-grade taxonomy</h3>
          <p className="text-sm text-slate-400">
            Topics mirror real ML workflows: data, modeling, evaluation, launch, and monitoring.
          </p>
        </Card>
        <Card className="p-5">
          <h3 className="font-semibold text-lg mb-2">Built for speed</h3>
          <p className="text-sm text-slate-400">
            Static-optimized pages, clean metadata, and JSON-LD to keep performance snappy and SEO-friendly.
          </p>
        </Card>
      </section>
    </div>
  );
}
