import { clsx } from "clsx";

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
}) {
  const base = "inline-flex items-center justify-center rounded-lg font-semibold transition focus:outline-none focus:ring-2 focus:ring-accent/60";
  const variants = {
    primary: "bg-accent text-slate-900 hover:brightness-95",
    ghost: "bg-transparent text-accent hover:bg-accent/10",
    outline: "border border-border bg-transparent text-slate-100 hover:border-accent hover:text-accent",
  } as const;
  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2.5 text-sm",
    lg: "px-5 py-3 text-base",
  } as const;

  return (
    <button className={clsx(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  );
}

export function Badge({
  children,
  color = "muted",
  className,
}: {
  children: React.ReactNode;
  color?: "muted" | "green" | "blue" | "orange" | "red";
  className?: string;
}) {
  const map = {
    muted: "bg-slate-800 text-slate-200 border border-border",
    green: "bg-emerald-900/40 text-emerald-200 border border-emerald-700/40",
    blue: "bg-sky-900/40 text-sky-200 border border-sky-700/40",
    orange: "bg-amber-900/40 text-amber-200 border border-amber-700/40",
    red: "bg-rose-900/40 text-rose-200 border border-rose-700/40",
  } as const;
  return (
    <span className={clsx("inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium", map[color], className)}>
      {children}
    </span>
  );
}

export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={clsx("rounded-2xl border border-border bg-[#0f172a] shadow-lg shadow-black/20", className)}>
      {children}
    </div>
  );
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={clsx(
        "w-full rounded-xl border border-border bg-[#0b1021] px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40",
        props.className
      )}
    />
  );
}

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={clsx(
        "w-full rounded-xl border border-border bg-[#0b1021] px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40",
        props.className
      )}
    />
  );
}
