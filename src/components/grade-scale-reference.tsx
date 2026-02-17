"use client";

import { IUE_GRADE_SCALE } from "@/lib/calculator-logic";
import { Info } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLanguage } from "@/components/language-provider";

export function GradeScaleReference() {
  const { t } = useLanguage();

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="grade-scale" className="border rounded-lg px-4">
        <AccordionTrigger className="hover:no-underline py-3">
          <div className="flex items-center gap-2">
            <Info className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-semibold">{t.gradingScale}</span>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2 pt-1 pb-2">
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
          <p className="text-xs text-muted-foreground mt-2 mb-1 leading-relaxed">
            {t.gradingScaleNote}
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
