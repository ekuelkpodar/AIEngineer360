import { prisma } from "@/lib/prisma";
import { Badge, Button, Card, Input, TextArea } from "@/components/ui";
import { slugify } from "@/lib/slugify";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const topics = await prisma.topic.findMany({ orderBy: { orderIndex: "asc" } });
  const recentQuestions = await prisma.question.findMany({
    orderBy: { createdAt: "desc" },
    take: 8,
    include: { topics: { include: { topic: true } }, tags: { include: { tag: true } } },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-display font-semibold">Admin dashboard</h1>
        <Badge color="orange">Demo only</Badge>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="p-5 space-y-3">
          <div className="font-semibold">Add topic</div>
          <form action={createTopic} className="space-y-3">
            <Input name="name" placeholder="Name" required />
            <TextArea name="description" placeholder="Description" rows={3} required />
            <Button type="submit">Create topic</Button>
          </form>
        </Card>
        <Card className="p-5 space-y-3">
          <div className="font-semibold">Add question</div>
          <form action={createQuestion} className="space-y-3">
            <Input name="title" placeholder="Title" required />
            <TextArea name="prompt" placeholder="Prompt" rows={3} required />
            <TextArea name="answer" placeholder="Answer" rows={4} required />
            <Input name="topic" list="topics" placeholder="Topic slug" required />
            <datalist id="topics">
              {topics.map((t) => (
                <option key={t.id} value={t.slug} />
              ))}
            </datalist>
            <Button type="submit">Create</Button>
          </form>
        </Card>
      </div>
      <Card className="p-5 space-y-3">
        <div className="font-semibold">Recent questions</div>
        <div className="grid gap-3">
          {recentQuestions.map((q) => (
            <div key={q.id} className="border border-border rounded-xl p-3">
              <div className="flex items-center justify-between">
                <div className="font-semibold">{q.title}</div>
                <Badge color="muted">{q.topics[0]?.topic.name}</Badge>
              </div>
              <div className="text-xs text-slate-400">{q.tags.map((t) => t.tag.name).join(", ")}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

async function createTopic(formData: FormData) {
  "use server";
  const name = String(formData.get("name"));
  const description = String(formData.get("description"));
  await prisma.topic.create({
    data: { name, slug: slugify(name), description },
  });
}

async function createQuestion(formData: FormData) {
  "use server";
  const title = String(formData.get("title"));
  const prompt = String(formData.get("prompt"));
  const answer = String(formData.get("answer"));
  const topicSlug = String(formData.get("topic"));
  const topic = await prisma.topic.findUnique({ where: { slug: topicSlug } });
  if (!topic) throw new Error("Topic not found");
  await prisma.question.create({
    data: {
      title,
      slug: slugify(`${title}-${Date.now()}`),
      prompt,
      answer,
      difficulty: "mid",
      type: "conceptual",
      estimatedMinutes: 5,
      topics: { create: [{ topicId: topic.id }] },
    },
  });
}
