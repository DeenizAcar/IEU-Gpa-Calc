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
        <div className="container max-w-6xl mx-auto px-4 text-center text-sm text-muted-foreground">
          Deniz Acar |{" "}
          <a
            href="mailto:2008denizacar@gmail.com"
            className="hover:text-foreground transition-colors"
          >
            2008denizacar@gmail.com
          </a>
        </div>
      </footer>
    </div>
  );
}
