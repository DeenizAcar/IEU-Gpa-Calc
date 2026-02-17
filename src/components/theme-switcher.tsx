"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon, Contrast } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useLanguage } from "@/components/language-provider";
import type { Translations } from "@/lib/i18n";

const getThemes = (t: Translations) => [
  { value: "dark" as const, label: t.darkMode, icon: Moon },
  { value: "light" as const, label: t.lightMode, icon: Sun },
  { value: "high-contrast" as const, label: t.highContrast, icon: Contrast },
];

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { t } = useLanguage();

  useEffect(() => setMounted(true), []);

  const themes = getThemes(t);

  if (!mounted) {
    return (
      <div className="flex gap-1">
        {themes.map((th) => (
          <div
            key={th.value}
            className="h-11 w-11 rounded-md bg-muted animate-pulse"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="flex gap-1" role="radiogroup" aria-label={t.themeSelector}>
      {themes.map((th) => {
        const Icon = th.icon;
        const isActive = theme === th.value;
        return (
          <Tooltip key={th.value}>
            <TooltipTrigger asChild>
              <Button
                variant={isActive ? "default" : "outline"}
                size="icon"
                className="h-11 w-11 min-w-[44px] min-h-[44px] transition-all duration-200 active:scale-95"
                onClick={() => setTheme(th.value)}
                aria-label={th.label}
                aria-checked={isActive}
                role="radio"
              >
                <Icon className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{th.label}</p>
            </TooltipContent>
          </Tooltip>
        );
      })}
    </div>
  );
}
