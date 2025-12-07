"use client";

import { useState } from "react";
import { Button, Card, TextArea } from "./ui";
import { Badge } from "./ui";

export function QuestionModes({ answer }: { answer: string }) {
  const [mode, setMode] = useState<"study" | "interview">("study");
  const [showAnswer, setShowAnswer] = useState(mode === "study");
  return (
    <Card className="p-4 space-y-3 border border-border/70">
      <div className="flex items-center gap-2 text-sm">
        <Badge color="muted">{mode === "study" ? "Study mode" : "Interview mode"}</Badge>
        <Button variant="ghost" size="sm" onClick={() => setMode(mode === "study" ? "interview" : "study")}>
          Switch to {mode === "study" ? "Interview" : "Study"}
        </Button>
      </div>
      {mode === "interview" && !showAnswer ? (
        <Button variant="primary" onClick={() => setShowAnswer(true)} aria-label="Reveal answer">
          Reveal answer
        </Button>
      ) : (
        <div className="prose prose-invert prose-sm">
          <p className="whitespace-pre-wrap">{answer}</p>
        </div>
      )}
    </Card>
  );
}
