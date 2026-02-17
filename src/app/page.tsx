"use client";

import { useState } from "react";
import { AppHeader } from "@/components/app-header";
import { UserView } from "@/components/user-view";
import { AdminPanel } from "@/components/admin-panel";

export default function Home() {
  const [activeView, setActiveView] = useState<"student" | "admin">("student");

  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader activeView={activeView} onViewChange={setActiveView} />

      <main className="flex-1 container max-w-6xl mx-auto px-4 py-6">
        {activeView === "student" ? <UserView /> : <AdminPanel />}
      </main>

      <footer className="border-t py-4">
        <div className="container max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <p>
            IUE Computer Programming — GPA Calculator
          </p>
          <p>
            Built with Next.js, Tailwind CSS & Shadcn UI
          </p>
        </div>
      </footer>
    </div>
  );
}
