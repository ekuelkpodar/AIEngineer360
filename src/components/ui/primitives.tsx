import { clsx } from "clsx";
import React from "react";

export function Surface({
  as: Component = "div",
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { as?: React.ElementType }) {
  return (
    <Component
      className={clsx(
        "bg-[#0f172a] border border-border/80 rounded-2xl shadow-lg shadow-black/20",
        className
      )}
      {...props}
    />
  );
}

export function ProgressRing({
  value,
  size = 52,
  stroke = 6,
  label,
  ariaLabel,
}: {
  value: number;
  size?: number;
  stroke?: number;
  label?: string;
  ariaLabel?: string;
}) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;
  return (
    <div className="flex flex-col items-center justify-center gap-1" aria-label={ariaLabel}>
      <svg width={size} height={size}>
        <circle
          stroke="var(--border)"
          fill="transparent"
          strokeWidth={stroke}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          stroke="var(--accent)"
          fill="transparent"
          strokeLinecap="round"
          strokeWidth={stroke}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={offset}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      {label && <div className="text-xs text-slate-400">{label}</div>}
    </div>
  );
}

export function DifficultyBadge({ label, level }: { label: string; level: "junior" | "mid" | "senior" | "expert" }) {
  const map = {
    junior: "bg-emerald-900/40 text-emerald-200 border-emerald-700/40",
    mid: "bg-sky-900/40 text-sky-200 border-sky-700/40",
    senior: "bg-amber-900/40 text-amber-200 border-amber-700/40",
    expert: "bg-rose-900/40 text-rose-200 border-rose-700/40",
  };
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-semibold",
        map[level]
      )}
    >
      {label}
    </span>
  );
}
