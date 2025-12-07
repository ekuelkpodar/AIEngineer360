"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { clsx } from "clsx";
import { Button } from "./ui";

export type FilterOption = { label: string; value: string };

export function FilterBar({
  options,
  param,
  label,
}: {
  options: FilterOption[];
  param: string;
  label?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const active = params.get(param);

  const pills = useMemo(() => options, [options]);

  const setFilter = (value?: string) => {
    const next = new URLSearchParams(params.toString());
    if (!value) next.delete(param);
    else next.set(param, value);
    router.push(`${pathname}?${next.toString()}` as any);
  };

  return (
    <div className="sticky top-16 z-10 bg-background/80 backdrop-blur rounded-2xl border border-border px-3 py-2 flex items-center gap-2 flex-wrap">
      {label && <span className="text-xs uppercase tracking-[0.2em] text-slate-500">{label}</span>}
      <Pill active={!active} onClick={() => setFilter(undefined)}>
        All
      </Pill>
      {pills.map((opt) => (
        <Pill key={opt.value} active={active === opt.value} onClick={() => setFilter(opt.value)}>
          {opt.label}
        </Pill>
      ))}
      {active && (
        <Button size="sm" variant="ghost" className="ml-auto" onClick={() => setFilter(undefined)}>
          Clear
        </Button>
      )}
    </div>
  );
}

function Pill({ children, active, onClick }: { children: React.ReactNode; active?: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "px-3 py-1.5 rounded-full border text-xs transition duration-160",
        active
          ? "border-accent text-accent bg-accent/10 shadow-glow"
          : "border-border text-slate-300 hover:border-accent/50 hover:text-accent"
      )}
    >
      {children}
    </button>
  );
}
