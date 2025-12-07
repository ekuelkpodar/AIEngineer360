import React from "react";
import Link from "next/link";
import { ArrowRight, Brain, Compass, Layers, LineChart, Sparkles, TimerReset, Zap } from "lucide-react";
import { Badge, Button, Card } from "@/components/ui";
import { getFeaturedTopics } from "@/lib/questions";

export default async function LandingPage() {
  const topics = await getFeaturedTopics();

  return (
    <div className="space-y-12">
      <section className="grid md:grid-cols-[1.1fr,0.9fr] gap-10 items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent shadow-glow">
            <Sparkles size={14} /> Crafted for ML, DS, Python interviews
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold leading-tight tracking-tight">
            Elegant drills for ambitious ML candidates.
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl leading-relaxed">
            ModelPrep Hub combines curated question banks, guided practice modes, and progress tracking so you can perform with confidence—whether you are live-coding, whiteboarding, or aligning with product teams.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button as-child variant="primary" size="lg" className="shadow-glow">
              <Link href="/topics">Browse topics</Link>
            </Button>
            <Button as-child variant="outline" size="lg">
              <Link href="/practice">Run a timed session</Link>
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-4 text-sm text-slate-400">
            <Stat label="Seeded questions" value="120+" />
            <Stat label="Core topics" value="20" />
            <Stat label="Practice modes" value="2" />
          </div>
        </div>
        <div className="relative">
          <Card className="p-6 gradient-border">
            <div className="gradient-border rounded-2xl">
              <div className="rounded-2xl border border-border bg-[#0b1021] p-6 space-y-5">
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <Brain size={16} className="text-accent" />
                  Personalized drill planner
                </div>
                <div className="grid gap-3">
                  <PracticeTile
                    title="Random Drill"
                    description="Pull 5 fresh questions across ML/DS tracks."
                    icon={<Zap className="text-accent" size={18} />}
                  />
                  <PracticeTile
                    title="Timed Session"
                    description="Ship answers under a 12-minute clock with reveal toggles."
                    icon={<TimerReset className="text-accent" size={18} />}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <MiniCard icon={<Compass size={16} />} title="Topic targeting" copy="Dial difficulty and type chips." />
                  <MiniCard icon={<LineChart size={16} />} title="Mastery tracking" copy="Mark mastered and revisit." />
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section className="space-y-5">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Knowledge map</p>
            <h2 className="text-2xl font-semibold">Browse the ML interview surface area</h2>
          </div>
          <Link href="/topics" className="text-sm text-accent inline-flex items-center gap-1">
            See all topics <ArrowRight size={16} />
          </Link>
        </div>
        <Card className="p-5 border border-border/80 bg-[#0c1224]">
          <div className="flex flex-wrap gap-2">
            {topics.slice(0, 18).map((topic) => (
              <Link
                key={topic.id}
                href={`/topics/${topic.slug}`}
                className="px-3 py-1.5 rounded-full border border-border text-xs text-slate-200 hover:border-accent hover:text-accent transition"
              >
                {topic.name}
              </Link>
            ))}
          </div>
        </Card>
      </section>

      <section className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Curriculum</p>
            <h2 className="text-2xl font-semibold">Browse by topic</h2>
          </div>
          <Link href="/topics" className="text-sm text-accent flex items-center gap-1">
            View all <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {topics.map((topic) => (
            <Card key={topic.id} className="p-5 hover:border-accent/80 transition duration-200">
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
        <Card className="p-5 space-y-2">
          <div className="flex items-center gap-2 text-slate-200 font-semibold">
            <Sparkles size={16} className="text-accent" /> Designed for mastery
          </div>
          <p className="text-sm text-slate-400">
            Track progress, mark questions as mastered, and revisit flagged items so interview muscle stays warm.
          </p>
        </Card>
        <Card className="p-5 space-y-2">
          <div className="flex items-center gap-2 text-slate-200 font-semibold">
            <Brain size={16} className="text-accent" /> Research-grade taxonomy
          </div>
          <p className="text-sm text-slate-400">
            Topics mirror real ML workflows: data, modeling, evaluation, launch, and monitoring.
          </p>
        </Card>
        <Card className="p-5 space-y-2">
          <div className="flex items-center gap-2 text-slate-200 font-semibold">
            <LineChart size={16} className="text-accent" /> Built for speed
          </div>
          <p className="text-sm text-slate-400">
            Static-optimized pages, clean metadata, and JSON-LD to keep performance snappy and SEO-friendly.
          </p>
        </Card>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Collections</p>
            <h2 className="text-2xl font-semibold">Interview-ready playlists</h2>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <CollectionCard
            title="ML system design"
            description="Latency budgets, online vs offline eval, feature stores, and rollout playbooks."
            accent="from-emerald-500/30 to-cyan-500/20"
          />
          <CollectionCard
            title="Deep learning & transformers"
            description="Architectures, attention, training stability, and production safety checks."
            accent="from-indigo-500/30 to-purple-500/20"
          />
          <CollectionCard
            title="Data science core"
            description="Experimentation, causal inference, SQL fluency, and stakeholder communication."
            accent="from-amber-500/30 to-rose-500/20"
          />
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-[#0f172a] px-4 py-3">
      <div className="text-lg font-semibold text-white">{value}</div>
      <div className="text-xs text-slate-400">{label}</div>
    </div>
  );
}

function PracticeTile({ title, description, icon }: { title: string; description: string; icon: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-border bg-[#0f172a] px-4 py-3">
      <div>
        <div className="font-semibold">{title}</div>
        <p className="text-slate-400 text-xs">{description}</p>
      </div>
      {icon}
    </div>
  );
}

function MiniCard({ icon, title, copy }: { icon: React.ReactNode; title: string; copy: string }) {
  return (
    <div className="rounded-xl border border-border bg-[#0f172a] p-3 flex gap-3">
      <div className="h-9 w-9 rounded-lg bg-accent/10 border border-accent/30 text-accent flex items-center justify-center">
        {icon}
      </div>
      <div className="text-sm">
        <div className="font-semibold text-slate-100">{title}</div>
        <p className="text-slate-400 text-xs leading-relaxed">{copy}</p>
      </div>
    </div>
  );
}

function CollectionCard({
  title,
  description,
  accent,
}: {
  title: string;
  description: string;
  accent: string;
}) {
  return (
    <Card className="p-5 border border-border/80 hover:border-accent/60 transition">
      <div className={`h-32 rounded-xl bg-gradient-to-br ${accent} mb-4 border border-border/60`} />
      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-slate-500 mb-2">
        <Layers size={14} className="text-accent" /> Curated path
      </div>
      <h3 className="font-semibold text-lg text-white">{title}</h3>
      <p className="text-sm text-slate-400 mt-2">{description}</p>
    </Card>
  );
}
