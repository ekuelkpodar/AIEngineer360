"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/topics", label: "Topics" },
  { href: "/practice", label: "Practice" },
  { href: "/admin", label: "Admin" },
];

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen relative">
      <div className="grid-overlay" />
      <header className="sticky top-0 z-30 backdrop-blur border-b border-border bg-[#060a14e6]">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-display text-lg">
            <span className="h-9 w-9 rounded-2xl bg-accent/20 border border-accent/30 flex items-center justify-center text-accent font-bold shadow-glow">
              M
            </span>
            <span className="font-semibold tracking-tight">ModelPrep Hub</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm text-slate-200">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "hover:text-white transition font-medium",
                  pathname === item.href && "text-accent"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="md:hidden">
            <button
              onClick={() => setOpen((v) => !v)}
              className="p-2 rounded-lg border border-border text-slate-200"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
        {open && (
          <div className="md:hidden border-t border-border bg-[#0f172a] px-4 pb-4">
            <div className="flex flex-col gap-3 pt-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-slate-200"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>
      <main className="max-w-6xl mx-auto px-4 py-10 md:py-14 relative">{children}</main>
      <footer className="border-t border-border mt-12">
        <div className="max-w-6xl mx-auto px-4 py-8 text-sm text-slate-400 flex flex-col md:flex-row justify-between gap-3">
          <div>
            <span className="text-slate-100 font-semibold">ModelPrep Hub</span>
            <span className="block text-slate-400">Curated ML and DS interview prep.</span>
          </div>
          <div className="flex gap-4">
            <Link href="/topics">Browse</Link>
            <Link href="/practice">Practice</Link>
            <Link href="/admin">Admin</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
