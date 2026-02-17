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

const themes = [
  { value: "dark", label: "Dark Mode", icon: Moon },
  { value: "light", label: "Light Mode", icon: Sun },
  { value: "high-contrast", label: "High Contrast", icon: Contrast },
] as const;

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="flex gap-1">
        {themes.map((t) => (
          <div
            key={t.value}
            className="h-11 w-11 rounded-md bg-muted animate-pulse"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="flex gap-1" role="radiogroup" aria-label="Theme selector">
      {themes.map((t) => {
        const Icon = t.icon;
        const isActive = theme === t.value;
        return (
          <Tooltip key={t.value}>
            <TooltipTrigger asChild>
              <Button
                variant={isActive ? "default" : "outline"}
                size="icon"
                className="h-11 w-11 min-w-[44px] min-h-[44px] transition-all duration-200 active:scale-95"
                onClick={() => setTheme(t.value)}
                aria-label={t.label}
                aria-checked={isActive}
                role="radio"
              >
                <Icon className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{t.label}</p>
            </TooltipContent>
          </Tooltip>
        );
      })}
    </div>
  );
}
