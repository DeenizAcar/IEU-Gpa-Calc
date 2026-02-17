"use client";

import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Course, WeightField, CourseGrade } from "@/lib/types";
import {
  calculateWeightedAverage,
  scoreToLetterGrade,
  letterToGradePoint,
  isPassed,
  getGradeColor,
} from "@/lib/calculator-logic";
import { CheckCircle, XCircle, Calculator, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useLanguage } from "@/components/language-provider";

interface GradeCardProps {
  course: Course;
  weights: WeightField[];
  scores: Record<string, number>;
  cumulativeGPA?: number;
  onScoreChange: (courseId: string, fieldId: string, value: number) => void;
}

export function GradeCard({
  course,
  weights,
  scores,
  cumulativeGPA,
  onScoreChange,
}: GradeCardProps) {
  const { language, t } = useLanguage();

  // Only show weights with percentage > 0
  const activeWeights = weights.filter((w) => w.percentage > 0);
  const weightedAvg = calculateWeightedAverage(scores, weights);
  const letter = scoreToLetterGrade(weightedAvg);
  const point = letterToGradePoint(letter);
  const passed = isPassed(letter, cumulativeGPA);
  const gradeColor = getGradeColor(letter);

  const hasAnyScore = Object.values(scores).some((s) => s > 0);

  const courseName = language === "tr" ? course.nameTr : course.name;

  const handleInputChange = useCallback(
    (fieldId: string, value: string) => {
      const num = Math.min(100, Math.max(0, parseInt(value) || 0));
      onScoreChange(course.id, fieldId, num);
    },
    [course.id, onScoreChange]
  );

  const handleSliderChange = useCallback(
    (fieldId: string, values: number[]) => {
      onScoreChange(course.id, fieldId, values[0]);
    },
    [course.id, onScoreChange]
  );

  const getWeightLabel = (weight: WeightField) =>
    language === "tr" ? weight.labelTr : weight.label;

  const getWeightTooltip = (weight: WeightField) =>
    language === "tr"
      ? `${weight.label} — %${weight.percentage} ${t.weight}`
      : `${weight.labelTr} — ${weight.percentage}% ${t.weight}`;

  return (
    <Card
      className={`transition-all duration-300 hover:shadow-lg border-2 ${
        hasAnyScore
          ? passed
            ? "border-green-500/30 dark:border-green-400/30"
            : "border-red-500/30 dark:border-red-400/30"
          : "border-transparent"
      }`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-base sm:text-lg leading-tight">
              {courseName}
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {course.code} • {course.credits} {t.credits}
            </p>
          </div>
          {hasAnyScore && (
            <div className="flex flex-col items-end gap-1 shrink-0">
              <Badge
                className="text-base font-bold px-3 py-1 min-w-[52px] justify-center"
                style={{ backgroundColor: gradeColor, color: "#fff" }}
              >
                {letter}
              </Badge>
              <div className="flex items-center gap-1.5">
                {passed ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-500" />
                )}
                <span
                  className={`text-xs font-medium ${
                    passed ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {passed ? t.passed : t.failed}
                </span>
              </div>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {activeWeights.map((weight) => (
          <div key={weight.id} className="space-y-2">
            <div className="flex items-center justify-between">
              <Label
                htmlFor={`${course.id}-${weight.id}`}
                className="text-sm font-medium flex items-center gap-1.5"
              >
                {getWeightLabel(weight)}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="text-muted-foreground cursor-help">
                      <Info className="h-3.5 w-3.5" />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{getWeightTooltip(weight)}</p>
                  </TooltipContent>
                </Tooltip>
              </Label>
              <span className="text-xs text-muted-foreground font-mono tabular-nums">
                %{weight.percentage}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Slider
                value={[scores[weight.id] ?? 0]}
                onValueChange={(v) => handleSliderChange(weight.id, v)}
                max={100}
                min={0}
                step={1}
                className="flex-1"
                aria-label={`${getWeightLabel(weight)} - ${courseName}`}
              />
              <Input
                id={`${course.id}-${weight.id}`}
                type="number"
                min={0}
                max={100}
                value={scores[weight.id] ?? 0}
                onChange={(e) => handleInputChange(weight.id, e.target.value)}
                className="w-16 h-11 min-h-[44px] text-center font-mono tabular-nums"
                aria-label={`${getWeightLabel(weight)} - ${courseName}`}
              />
            </div>
          </div>
        ))}

        {hasAnyScore && (
          <div className="pt-3 border-t flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Calculator className="h-4 w-4 text-muted-foreground" />
              <span>{t.weightedAverage}</span>
            </div>
            <span
              className="text-lg font-bold font-mono tabular-nums"
              style={{ color: gradeColor }}
            >
              {weightedAvg.toFixed(2)}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
