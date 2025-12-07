import Link from "next/link";
import { Input, Card, Badge } from "@/components/ui";
import { getTopics } from "@/lib/questions";

export const dynamic = "force-dynamic";

export default async function TopicsPage({ searchParams }: { searchParams: { q?: string } }) {
  const q = searchParams.q?.toLowerCase() ?? "";
  const topics = await getTopics();
  const filtered = q
    ? topics.filter((t) => t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q))
    : topics;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <p className="text-sm text-slate-400">Topic directory</p>
          <h1 className="text-3xl font-display font-semibold">Master the ML stack</h1>
        </div>
        <form>
          <Input name="q" placeholder="Search topics" defaultValue={searchParams.q} />
        </form>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        {filtered.map((topic) => (
          <Card key={topic.id} className="p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg">{topic.name}</h3>
              {topic.isFeatured && <Badge color="green">Featured</Badge>}
            </div>
            <p className="text-sm text-slate-400 line-clamp-3">{topic.description}</p>
            <Link href={`/topics/${topic.slug}`} className="text-sm text-accent">
              Explore questions →
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
