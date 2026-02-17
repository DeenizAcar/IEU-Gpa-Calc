"use client";

import { Card, CardContent } from "@/components/ui/card";
import { getGPAColor, getGPALabel } from "@/lib/calculator-logic";
import { GraduationCap, TrendingUp, BookOpen, Target } from "lucide-react";

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
  const gpaColor = getGPAColor(cumulativeGPA);
  const gpaLabel = getGPALabel(cumulativeGPA);

  const stats = [
    {
      icon: GraduationCap,
      label: "Cumulative GPA",
      value: cumulativeGPA.toFixed(2),
      color: gpaColor,
      subtext: gpaLabel,
    },
    {
      icon: BookOpen,
      label: "Total Credits",
      value: totalCredits.toString(),
      color: "#3b82f6",
      subtext: "credit hours",
    },
    {
      icon: Target,
      label: "Courses Graded",
      value: completedCourses.toString(),
      color: "#8b5cf6",
      subtext: "courses",
    },
    {
      icon: TrendingUp,
      label: "Best Semester",
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
