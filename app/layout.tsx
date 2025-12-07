import "./globals.css";
import { ReactNode } from "react";
import { Metadata } from "next";
import { LayoutShell } from "@/components/layout-shell";

export const metadata: Metadata = {
  title: "ModelPrep Hub | Machine Learning Interview Prep",
  description:
    "Curated machine learning, data science, and Python interview questions with answers, practice modes, and topic browsing.",
  metadataBase: new URL("https://modelprephub.example.com"),
  openGraph: {
    title: "ModelPrep Hub",
    description: "Level up ML and DS interview prep with curated questions and practice.",
    url: "https://modelprephub.example.com",
    siteName: "ModelPrep Hub",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-background text-slate-100">
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
