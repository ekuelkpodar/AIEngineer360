"use client";

import { useEffect, useMemo, useState } from "react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "cmdk";
import { useRouter } from "next/navigation";
import { Search, Clock } from "lucide-react";
import { debounce } from "@/lib/debounce";

type Result = { title: string; slug: string };

export function SearchOverlay() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const [recent, setRecent] = useState<string[]>([]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const search = useMemo(
    () =>
      debounce(async (value: string) => {
        if (!value.trim()) {
          setResults([]);
          return;
        }
        const res = await fetch(`/api/search?q=${encodeURIComponent(value)}`);
        const data = await res.json();
        setResults(data.results ?? []);
      }, 180),
    []
  );

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="hidden md:inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-border bg-surface text-sm text-slate-300 hover:border-accent/50"
        aria-label="Open search"
      >
        <Search size={16} />
        Search
        <span className="ml-2 text-xs text-slate-500 border border-border rounded-md px-2 py-0.5">⌘K</span>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center pt-24">
          <Command
            label="Global search"
            className="bg-[#0f172a] border border-border rounded-2xl shadow-2xl shadow-black/50 w-full max-w-2xl text-sm text-slate-100"
          >
            <CommandInput
              autoFocus
              placeholder="Search questions, topics, tags..."
              onValueChange={(v) => {
                setQuery(v);
                search(v);
              }}
            />
            <CommandList>
              <CommandEmpty className="p-4 text-slate-400">Try searching “transformer attention”</CommandEmpty>
              {query ? (
                <CommandGroup heading="Results">
                  {results.map((r) => (
                    <CommandItem
                      key={r.slug}
                      onSelect={() => {
                        setRecent((prev) => Array.from(new Set([r.title, ...prev])).slice(0, 5));
                        setOpen(false);
                        router.push(`/questions/${r.slug}`);
                      }}
                    >
                      <Search size={14} className="mr-2 text-accent" />
                      {r.title}
                    </CommandItem>
                  ))}
                </CommandGroup>
              ) : (
                <CommandGroup heading="Recent">
                  {recent.length === 0 && <div className="px-4 py-3 text-slate-400">No recent searches yet.</div>}
                  {recent.map((item) => (
                    <CommandItem
                      key={item}
                      onSelect={() => {
                        search(item);
                        setQuery(item);
                      }}
                    >
                      <Clock size={14} className="mr-2 text-slate-400" />
                      {item}
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </div>
      )}
    </>
  );
}
