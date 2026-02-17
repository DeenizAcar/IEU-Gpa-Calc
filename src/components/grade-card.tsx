"use client";

import { useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Course, WeightField } from "@/lib/types";
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
  isTaken: boolean;
  onScoreChange: (courseId: string, fieldId: string, value: number) => void;
  onTakenChange: (courseId: string, isTaken: boolean) => void;
  customAkts?: number;
  onAktsChange?: (courseId: string, value: number) => void;
  nameOverride?: { name: string; nameTr: string; code: string };
}

export function GradeCard({
  course,
  weights,
  scores,
  cumulativeGPA,
  isTaken,
  onScoreChange,
  onTakenChange,
  customAkts,
  onAktsChange,
  nameOverride,
}: GradeCardProps) {
  const { language, t } = useLanguage();

  // Only show weights with percentage > 0
  const activeWeights = weights.filter((w) => w.percentage > 0);
  const weightedAvg = calculateWeightedAverage(scores, weights);
  const letter = scoreToLetterGrade(weightedAvg);
  const passed = isPassed(letter, cumulativeGPA);
  const gradeColor = getGradeColor(letter);

  const hasAnyScore = Object.values(scores).some((s) => s > 0);

  const courseName = nameOverride
    ? (language === "tr" ? nameOverride.nameTr : nameOverride.name)
    : (language === "tr" ? course.nameTr : course.name);
  const courseCode = nameOverride?.code ?? course.code;
  const displayCredits = customAkts ?? course.credits;

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
      className={`transition-all duration-300 border-2 ${
        !isTaken
          ? "opacity-45 border-dashed border-muted-foreground/20"
          : hasAnyScore
            ? passed
              ? "border-green-500/30 dark:border-green-400/30 hover:shadow-lg"
              : "border-red-500/30 dark:border-red-400/30 hover:shadow-lg"
            : "border-transparent hover:shadow-lg"
      }`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-base sm:text-lg leading-tight">
              {courseName}
            </CardTitle>
            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
              <Badge variant="outline" className="text-[11px] font-mono px-1.5 py-0">
                {courseCode}
              </Badge>
              {course.isElective && onAktsChange ? (
                <div className="flex items-center gap-1">
                  <Badge variant="secondary" className="text-[11px] font-mono px-1.5 py-0">
                    AKTS:
                  </Badge>
                  <Input
                    type="number"
                    min={1}
                    max={30}
                    value={displayCredits}
                    onChange={(e) => {
                      const v = Math.max(1, Math.min(30, parseInt(e.target.value) || 1));
                      onAktsChange(course.id, v);
                    }}
                    className="w-14 h-6 text-[11px] text-center font-mono px-1 py-0"
                    title={t.enterAkts}
                  />
                </div>
              ) : (
                <Badge variant="secondary" className="text-[11px] font-mono px-1.5 py-0">
                  {displayCredits} AKTS
                </Badge>
              )}
              {course.isElective && (
                <Badge variant="secondary" className="text-[11px] px-1.5 py-0">
                  {t.elective}
                </Badge>
              )}
            </div>
          </div>
          {isTaken && hasAnyScore && (
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

        {/* Not Taking Toggle */}
        <div className="flex items-center gap-2 mt-3 pt-2 border-t border-dashed">
          <Checkbox
            id={`not-taken-${course.id}`}
            checked={!isTaken}
            onCheckedChange={(checked) => onTakenChange(course.id, !checked)}
            className="h-4 w-4"
          />
          <Label
            htmlFor={`not-taken-${course.id}`}
            className="text-xs text-muted-foreground cursor-pointer select-none"
          >
            {t.notTakingCourse}
          </Label>
        </div>
      </CardHeader>

      {isTaken && (
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
      )}
    </Card>
  );
}
