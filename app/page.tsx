import React from "react";
import Link from "next/link";
import { ArrowRight, Compass, Layers, Play, Sparkles, TimerReset, Zap } from "lucide-react";
import { Badge, Button, Card } from "@/components/ui";
import { getFeaturedTopics, getTopics } from "@/lib/questions";

function TagCloud({ topics }: { topics: { id: string; name: string; slug: string }[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {topics.map((topic) => (
        <Link
          key={topic.id}
          href={`/topics/${topic.slug}`}
          className="px-3 py-1.5 rounded-full border border-border text-xs text-[#1f2430] hover:border-accent hover:text-accent transition"
        >
          {topic.name}
        </Link>
      ))}
    </div>
  );
}

export default async function LandingPage() {
  const topics = await getTopics();
  const featured = await getFeaturedTopics();

  return (
    <div className="space-y-12">
      <section className="bg-white/80 border border-border rounded-3xl shadow-lg shadow-black/5 overflow-hidden">
        <div className="px-6 md:px-10 py-10 flex flex-col items-center text-center gap-4 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#f5f0ff] via-white to-[#eef4ff] opacity-80" />
          <div className="relative space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/30 bg-accent/10 text-xs font-semibold text-[#1f2430]">
              <Sparkles size={14} className="text-accent" /> Curated ML, DS, Python interview prep
            </div>
            <h1 className="relative font-display text-4xl md:text-5xl font-bold leading-tight text-[#1f2430]">
              Master your ML & DS interview with clarity.
            </h1>
            <p className="text-base md:text-lg text-slate-600">
              1,000+ original questions, revealable answers, and practice sessions tuned for modern ML roles. Pick a goal, browse a path, and start a 10-minute drill.
            </p>
          </div>
          <div className="relative flex flex-wrap justify-center gap-3">
            <Button as-child size="lg" variant="primary" className="shadow-glow">
              <Link href="/practice?mode=timed">Start 10-minute session</Link>
            </Button>
            <Button as-child size="lg" variant="outline">
              <Link href="/topics">Browse topics</Link>
            </Button>
          </div>
          <Card className="relative w-full max-w-5xl p-6 border-dashed border-border/80 bg-white/70">
            <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
              <div className="text-sm font-semibold text-[#1f2430]">Explore the stack</div>
              <Link href="/topics" className="text-sm text-accent flex items-center gap-1">
                View all <ArrowRight size={14} />
              </Link>
            </div>
            <TagCloud topics={topics.slice(0, 42)} />
          </Card>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-4">
        {featured.slice(0, 3).map((topic) => (
          <Card key={topic.id} className="p-5 space-y-3 bg-white border border-border shadow-sm">
            <div className="h-32 rounded-2xl bg-gradient-to-br from-[#c7d2ff] to-[#f2e8ff] border border-border/80" />
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-slate-500">
              <Layers size={14} className="text-accent" /> Featured path
            </div>
            <h3 className="font-semibold text-lg text-[#1f2430]">{topic.name}</h3>
            <p className="text-sm text-slate-600 line-clamp-3">{topic.description}</p>
            <div className="flex gap-2">
              <Button as-child size="sm" variant="primary">
                <Link href={`/topics/${topic.slug}`}>Open</Link>
              </Button>
              <Button as-child size="sm" variant="outline">
                <Link href={`/practice?topic=${topic.slug}`}>Practice</Link>
              </Button>
            </div>
          </Card>
        ))}
      </section>

      <section className="bg-white border border-border rounded-3xl p-6 md:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Pick your goal</p>
            <h2 className="text-2xl font-semibold text-[#1f2430]">Choose how you want to practice</h2>
          </div>
          <Button as-child variant="primary">
            <Link href="/practice">Start a quick sample</Link>
          </Button>
        </div>
        <div className="grid md:grid-cols-3 gap-4 mt-4">
          {[
            {
              title: "Learn fundamentals",
              copy: "Structured walkthrough of core ML, stats, and Python essentials.",
              icon: <Compass size={16} />, 
            },
            {
              title: "Prep for interviews",
              copy: "Timed drills, reveal-on-demand answers, and difficulty ladders.",
              icon: <TimerReset size={16} />, 
            },
            {
              title: "Master a specialty",
              copy: "Deep dives into NLP, recsys, and MLOps with production cues.",
              icon: <Zap size={16} />, 
            },
          ].map((item) => (
            <Card key={item.title} className="p-5 border border-border/80 bg-surface">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
                {item.icon} Path
              </div>
              <h3 className="mt-2 font-semibold text-lg text-[#1f2430]">{item.title}</h3>
              <p className="text-sm text-slate-600 mt-2">{item.copy}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-4">
        {["Random Drill", "Timed Session", "Browse & Bookmark"].map((title, idx) => (
          <Card key={title} className="p-5 bg-white border border-border shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-slate-500">
              <Play size={14} className="text-accent" /> Mode {idx + 1}
            </div>
            <h3 className="font-semibold text-lg text-[#1f2430]">{title}</h3>
            <p className="text-sm text-slate-600">
              {idx === 0 && "Pull a handful of questions tailored to a topic and difficulty."}
              {idx === 1 && "Run a 10-minute timer, hide answers until you're ready, then reflect."}
              {idx === 2 && "Skim topics, open questions, bookmark favorites, and return later."}
            </p>
            <Button as-child size="sm" variant="outline">
              <Link href={idx === 2 ? "/topics" : "/practice"}>Try it</Link>
            </Button>
          </Card>
        ))}
      </section>
    </div>
  );
}
