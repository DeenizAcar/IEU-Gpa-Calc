"use client";

import { ThemeSwitcher } from "@/components/theme-switcher";
import { Button } from "@/components/ui/button";
import { GraduationCap, Settings, Calculator } from "lucide-react";

interface AppHeaderProps {
  activeView: "student" | "admin";
  onViewChange: (view: "student" | "admin") => void;
}

export function AppHeader({ activeView, onViewChange }: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60">
      <div className="container max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center">
            <GraduationCap className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-sm font-bold leading-tight">IUE GPA</h1>
            <p className="text-[10px] text-muted-foreground leading-tight">
              Computer Programming
            </p>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
          <Button
            variant={activeView === "student" ? "default" : "ghost"}
            size="sm"
            onClick={() => onViewChange("student")}
            className="h-9 min-h-[44px] min-w-[44px] gap-1.5"
            aria-label="Student Mode"
          >
            <Calculator className="h-4 w-4" />
            <span className="hidden sm:inline">Student</span>
          </Button>
          <Button
            variant={activeView === "admin" ? "default" : "ghost"}
            size="sm"
            onClick={() => onViewChange("admin")}
            className="h-9 min-h-[44px] min-w-[44px] gap-1.5"
            aria-label="Admin Mode"
          >
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">Admin</span>
          </Button>
        </div>

        {/* Theme Switcher */}
        <ThemeSwitcher />
      </div>
    </header>
  );
}
