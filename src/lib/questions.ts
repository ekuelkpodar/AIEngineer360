import { prisma } from "./prisma";
import { Difficulty, QuestionType } from "@prisma/client";

export const difficultyMeta: Record<Difficulty, { label: string; color: "green" | "blue" | "orange" | "red" }>= {
  junior: { label: "Junior", color: "green" },
  mid: { label: "Mid", color: "blue" },
  senior: { label: "Senior", color: "orange" },
  expert: { label: "Expert", color: "red" },
};

export const typeLabels: Record<QuestionType, string> = {
  conceptual: "Conceptual",
  coding: "Coding",
  math: "Math",
  system_design: "System Design",
};

export async function getTopics() {
  return prisma.topic.findMany({ orderBy: { orderIndex: "asc" } });
}

export async function getFeaturedTopics() {
  return prisma.topic.findMany({ where: { isFeatured: true }, orderBy: { orderIndex: "asc" } });
}

export async function getTopicBySlug(slug: string) {
  return prisma.topic.findUnique({ where: { slug } });
}

export async function getQuestionsByTopic(slug: string, filters?: { difficulty?: Difficulty; type?: QuestionType }) {
  return prisma.question.findMany({
    where: {
      topics: { some: { topic: { slug } } },
      difficulty: filters?.difficulty,
      type: filters?.type,
      isPublished: true,
    },
    include: { topics: { include: { topic: true } }, tags: { include: { tag: true } } },
    orderBy: { createdAt: "desc" },
  });
}

export async function getQuestionBySlug(slug: string) {
  return prisma.question.findUnique({
    where: { slug },
    include: {
      topics: { include: { topic: true } },
      tags: { include: { tag: true } },
    },
  });
}

export async function searchQuestions(term: string) {
  return prisma.question.findMany({
    where: {
      OR: [
        { title: { contains: term, mode: "insensitive" } },
        { prompt: { contains: term, mode: "insensitive" } },
      ],
    },
    select: { id: true, title: true, slug: true, difficulty: true, type: true },
    take: 12,
  });
}

export async function randomQuestions(limit = 5, topicSlug?: string) {
  const where = topicSlug ? { topics: { some: { topic: { slug: topicSlug } } } } : {};
  const all = await prisma.question.findMany({
    where,
    include: { topics: { include: { topic: true } }, tags: { include: { tag: true } } },
  });
  const shuffled = all.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, limit);
}
