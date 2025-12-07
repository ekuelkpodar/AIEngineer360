import Link from "next/link";
import { ArrowRight, Bookmark, Play, Sparkles } from "lucide-react";
import { Badge, Button, Card } from "./ui";
import { ProgressRing, DifficultyBadge } from "./ui/primitives";
import { difficultyMeta, typeLabels } from "@/lib/questions";
import { Difficulty, QuestionType } from "@prisma/client";

export function TopicCard({
  name,
  description,
  slug,
  progress,
  featured,
  why,
}: {
  name: string;
  description: string;
  slug: string;
  progress?: number;
  featured?: boolean;
  why?: string;
}) {
  return (
    <Card className="p-5 hover:border-accent/70 transition duration-200 space-y-4">
      <div className="flex justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-slate-500">
            <Sparkles size={14} className="text-accent" />
            {why ?? "Core skill"}
          </div>
          <h3 className="font-semibold text-lg leading-tight">{name}</h3>
          <p className="text-sm text-slate-400 line-clamp-2">{description}</p>
        </div>
        {featured && <Badge color="green">Featured</Badge>}
      </div>
      <div className="flex items-center justify-between">
        <Link href={`/topics/${slug}`} className="text-sm text-accent inline-flex items-center gap-1">
          Open topic <ArrowRight size={14} />
        </Link>
        <ProgressRing value={progress ?? 20} label="progress" ariaLabel={`${name} progress`} />
      </div>
    </Card>
  );
}

export function QuestionCard({
  title,
  slug,
  prompt,
  difficulty,
  type,
  estimatedMinutes,
}: {
  title: string;
  slug: string;
  prompt: string;
  difficulty: Difficulty;
  type: QuestionType;
  estimatedMinutes: number;
}) {
  return (
    <Card className="p-4 space-y-3 hover:border-accent/60 transition">
      <div className="flex justify-between items-start gap-3">
        <div className="space-y-1">
          <h3 className="font-semibold text-base leading-tight line-clamp-2">{title}</h3>
          <p className="text-sm text-slate-400 line-clamp-2">{prompt}</p>
          <div className="flex gap-2 flex-wrap">
            <DifficultyBadge label={difficultyMeta[difficulty].label} level={difficulty} />
            <Badge color="muted">{typeLabels[type]}</Badge>
            <Badge color="muted">{estimatedMinutes} min</Badge>
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        <Button as-child variant="primary" size="sm">
          <Link href={`/questions/${slug}`} aria-label={`Start ${title}`}>
            <Play size={14} className="mr-1" />
            Start
          </Link>
        </Button>
        <Button as-child variant="outline" size="sm">
          <Link href={`/questions/${slug}`} aria-label={`Save ${title}`}>
            <Bookmark size={14} className="mr-1" />
            Save
          </Link>
        </Button>
      </div>
    </Card>
  );
}
