"use client";

import { Card, CardContent } from "@/components/ui/card";
import { getGPAColor, getGPALabelKey } from "@/lib/calculator-logic";
import { GraduationCap, TrendingUp, BookOpen, Target } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import type { Translations } from "@/lib/i18n";

interface GPASummaryProps {
  cumulativeGPA: number;
  totalCredits: number;
  completedCourses: number;
  semesterGPAs: { semester: string; gpa: number }[];
}

export function GPASummary({
  cumulativeGPA,
  totalCredits,
  completedCourses,
  semesterGPAs,
}: GPASummaryProps) {
  const { t } = useLanguage();
  const gpaColor = getGPAColor(cumulativeGPA);
  const gpaLabelKey = getGPALabelKey(cumulativeGPA) as keyof Translations;
  const gpaLabel = t[gpaLabelKey] as string;

  const stats = [
    {
      icon: GraduationCap,
      label: t.cumulativeGPA,
      value: cumulativeGPA.toFixed(2),
      color: gpaColor,
      subtext: gpaLabel,
    },
    {
      icon: BookOpen,
      label: t.totalCredits,
      value: totalCredits.toString(),
      color: "#3b82f6",
      subtext: t.creditHours,
    },
    {
      icon: Target,
      label: t.coursesGraded,
      value: completedCourses.toString(),
      color: "#8b5cf6",
      subtext: t.courses,
    },
    {
      icon: TrendingUp,
      label: t.bestSemester,
      value:
        semesterGPAs.length > 0
          ? Math.max(...semesterGPAs.map((s) => s.gpa)).toFixed(2)
          : "—",
      color: "#22c55e",
      subtext:
        semesterGPAs.length > 0
          ? semesterGPAs.reduce((best, s) =>
              s.gpa > best.gpa ? s : best
            ).semester
          : "",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card
            key={stat.label}
            className="transition-all duration-200 hover:shadow-md"
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Icon className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground font-medium">
                  {stat.label}
                </span>
              </div>
              <div
                className="text-2xl sm:text-3xl font-bold font-mono tabular-nums"
                style={{ color: stat.color }}
              >
                {stat.value}
              </div>
              {stat.subtext && (
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.subtext}
                </p>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
