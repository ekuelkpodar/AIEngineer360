import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") ?? "";
  const results = await prisma.question.findMany({
    where: {
      OR: [
        { title: { contains: q, mode: "insensitive" } },
        { prompt: { contains: q, mode: "insensitive" } },
      ],
    },
    select: { id: true, title: true, slug: true, difficulty: true, type: true },
    take: 8,
  });

  return NextResponse.json({ results });
}
