import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ProgressStatus } from "@prisma/client";

export async function POST(request: Request) {
  const body = await request.json();
  const { userId, questionId, status, confidence } = body as {
    userId: string;
    questionId: string;
    status: ProgressStatus;
    confidence?: number;
  };

  await prisma.progress.upsert({
    where: { userId_questionId: { userId, questionId } },
    update: { status, confidence, lastReviewedAt: new Date() },
    create: { userId, questionId, status, confidence },
  });

  return NextResponse.json({ ok: true });
}
