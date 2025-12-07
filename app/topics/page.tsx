import Link from "next/link";
import { Input, Card, Badge, Button } from "@/components/ui";
import { getTopics } from "@/lib/questions";
import { Filter, FolderTree } from "lucide-react";
import { TopicCard } from "@/components/cards";

export const dynamic = "force-dynamic";

export default async function TopicsPage({ searchParams }: { searchParams: { q?: string } }) {
  const q = searchParams.q?.toLowerCase() ?? "";
  const topics = await getTopics();
  const filtered = q
    ? topics.filter((t) => t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q))
    : topics;

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-border bg-gradient-to-r from-[#0f172a] to-[#0b1021] p-6 md:p-8 relative overflow-hidden">
        <div className="absolute right-6 top-6 h-20 w-20 rounded-full bg-accent/15 blur-3xl" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              <FolderTree size={14} className="text-accent" /> Topic directory
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-semibold">Master the ML stack</h1>
            <p className="text-slate-400 max-w-2xl">
              Search across curated ML, DS, and Python domains. Each topic includes bite-sized prompts, answers, and practice links.
            </p>
          </div>
          <form className="w-full md:w-80">
            <Input
              name="q"
              placeholder="Search topics..."
              defaultValue={searchParams.q}
              className="w-full bg-[#0b1021] border-accent/30 focus:ring-accent/30"
            />
          </form>
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        {filtered.map((topic) => (
          <TopicCard
            key={topic.id}
            name={topic.name}
            description={topic.description}
            slug={topic.slug}
            featured={topic.isFeatured}
            progress={topic.orderIndex * 3 + 10}
            why="Practice ready"
          />
        ))}
      </div>
    </div>
  );
}
