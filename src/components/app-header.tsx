"use client";

import { ThemeSwitcher } from "@/components/theme-switcher";
import { Button } from "@/components/ui/button";
import { Settings, Calculator, Languages } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface AppHeaderProps {
  activeView: "student" | "admin";
  onViewChange: (view: "student" | "admin") => void;
}

export function AppHeader({ activeView, onViewChange }: AppHeaderProps) {
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60">
      <div className="container max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* View Toggle */}
        <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
          <Button
            variant={activeView === "student" ? "default" : "ghost"}
            size="sm"
            onClick={() => onViewChange("student")}
            className="h-9 min-h-[44px] min-w-[44px] gap-1.5"
            aria-label={t.studentMode}
          >
            <Calculator className="h-4 w-4" />
            <span className="hidden sm:inline">{t.student}</span>
          </Button>
          <Button
            variant={activeView === "admin" ? "default" : "ghost"}
            size="sm"
            onClick={() => onViewChange("admin")}
            className="h-9 min-h-[44px] min-w-[44px] gap-1.5"
            aria-label={t.adminMode}
          >
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">{t.admin}</span>
          </Button>
        </div>

        {/* Right-side controls */}
        <div className="flex items-center gap-2">
          {/* Language Toggle */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setLanguage(language === "tr" ? "en" : "tr")}
                className="h-11 min-h-[44px] min-w-[44px] px-3 font-bold text-sm gap-1.5 transition-all duration-200 active:scale-95"
                aria-label={t.switchLanguage}
              >
                <Languages className="h-4 w-4" />
                <span>{language === "tr" ? "EN" : "TR"}</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{t.switchLanguage}</p>
            </TooltipContent>
          </Tooltip>

          {/* Theme Switcher */}
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
}
