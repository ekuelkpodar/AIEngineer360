import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const body = await request.json();
  const { userId, questionId } = body;
  await prisma.bookmark.create({ data: { userId, questionId } });
  return NextResponse.json({ ok: true });
}

export async function DELETE(request: Request) {
  const body = await request.json();
  const { userId, questionId } = body;
  await prisma.bookmark.delete({ where: { userId_questionId: { userId, questionId } } });
  return NextResponse.json({ ok: true });
}
