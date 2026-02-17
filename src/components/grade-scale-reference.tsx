"use client";

import { Card, CardContent } from "@/components/ui/card";
import { IUE_GRADE_SCALE } from "@/lib/calculator-logic";
import { Info } from "lucide-react";

export function GradeScaleReference() {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <Info className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-sm font-semibold">IUE Grading Scale</h3>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2">
          {IUE_GRADE_SCALE.map((grade) => (
            <div
              key={grade.letter}
              className="flex flex-col items-center p-2 rounded-lg border transition-all hover:scale-105"
              style={{ borderColor: grade.color + "40" }}
            >
              <span
                className="text-lg font-bold"
                style={{ color: grade.color }}
              >
                {grade.letter}
              </span>
              <span className="text-xs text-muted-foreground font-mono">
                {grade.point.toFixed(1)}
              </span>
              <span className="text-[10px] text-muted-foreground">
                {grade.minScore}–{Math.floor(grade.maxScore)}
              </span>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
          <strong>Note:</strong> DC (1.5) and DD (1.0) grades require a
          cumulative GPA of ≥ 2.00 to pass. FD and FF are automatic failures.
        </p>
      </CardContent>
    </Card>
  );
}
