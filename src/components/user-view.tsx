"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { GradeCard } from "@/components/grade-card";
import { GPASummary } from "@/components/gpa-summary";
import { GradeScaleReference } from "@/components/grade-scale-reference";
import { AdminState, CourseGrade } from "@/lib/types";
import {
  COURSES,
  SEMESTERS,
  getCoursesBySemester,
  getSemesterLabel,
} from "@/lib/course-data";
import {
  loadAdminState,
  loadStudentState,
  saveStudentState,
  resetStudentState,
} from "@/lib/storage";
import {
  calculateCourseGrade,
  calculateCumulativeGPA,
  calculateSemesterGPA,
} from "@/lib/calculator-logic";
import {
  Trash2,
  AlertTriangle,
  BookOpen,
  GraduationCap,
} from "lucide-react";
import { useLanguage } from "@/components/language-provider";

export function UserView() {
  const { language, t } = useLanguage();
  const [adminState, setAdminState] = useState<AdminState | null>(null);
  const [scores, setScores] = useState<Record<string, Record<string, number>>>({});
  const [notTakenCourses, setNotTakenCourses] = useState<Set<string>>(new Set());
  const [resetDialogOpen, setResetDialogOpen] = useState(false);

  // Load persisted data on mount
  useEffect(() => {
    const admin = loadAdminState();
    const student = loadStudentState();
    setAdminState(admin);

    // Reconstruct scores from student state
    const reconstructed: Record<string, Record<string, number>> = {};
    for (const [courseId, grade] of Object.entries(student.courseGrades)) {
      reconstructed[courseId] = { ...grade.scores };
    }
    setScores(reconstructed);

    // Load notTakenCourses
    if (student.notTakenCourses) {
      setNotTakenCourses(new Set(student.notTakenCourses));
    }
  }, []);

  // Save whenever scores or notTakenCourses change
  useEffect(() => {
    if (!adminState) return;

    const courseGrades: Record<string, CourseGrade> = {};
    for (const [courseId, courseScores] of Object.entries(scores)) {
      const config = adminState.courseConfigs[courseId];
      if (!config) continue;
      const hasScore = Object.values(courseScores).some((s) => s > 0);
      if (!hasScore) continue;
      courseGrades[courseId] = calculateCourseGrade(courseId, courseScores, config);
    }

    saveStudentState({
      courseGrades,
      selectedElectives: [],
      notTakenCourses: Array.from(notTakenCourses),
    });
  }, [scores, adminState, notTakenCourses]);

  const handleScoreChange = useCallback(
    (courseId: string, fieldId: string, value: number) => {
      setScores((prev) => ({
        ...prev,
        [courseId]: {
          ...(prev[courseId] || {}),
          [fieldId]: value,
        },
      }));
    },
    []
  );

  const handleTakenChange = useCallback(
    (courseId: string, isTaken: boolean) => {
      setNotTakenCourses((prev) => {
        const next = new Set(prev);
        if (isTaken) {
          next.delete(courseId);
        } else {
          next.add(courseId);
        }
        return next;
      });
    },
    []
  );

  const handleReset = useCallback(() => {
    resetStudentState();
    setScores({});
    setNotTakenCourses(new Set());
    setResetDialogOpen(false);
  }, []);

  // ─── Computed GPA values (excluding notTaken courses) ──────────────
  const allGrades = useMemo(() => {
    if (!adminState) return [];
    const grades: CourseGrade[] = [];
    for (const [courseId, courseScores] of Object.entries(scores)) {
      // Exclude courses not being taken
      if (notTakenCourses.has(courseId)) continue;
      const config = adminState.courseConfigs[courseId];
      if (!config) continue;
      const hasScore = Object.values(courseScores).some((s) => s > 0);
      if (!hasScore) continue;
      grades.push(calculateCourseGrade(courseId, courseScores, config));
    }
    return grades;
  }, [scores, adminState, notTakenCourses]);

  const { gpa: cumulativeGPA, totalCredits } = useMemo(
    () => calculateCumulativeGPA(allGrades),
    [allGrades]
  );

  const semesterGPAs = useMemo(() => {
    return SEMESTERS.map((sem) => {
      const semGrades = allGrades.filter((g) => {
        const course = COURSES.find((c) => c.id === g.courseId);
        return course?.semester === sem;
      });
      return {
        semester: getSemesterLabel(sem, language),
        gpa: calculateSemesterGPA(semGrades),
        count: semGrades.length,
      };
    }).filter((s) => s.count > 0);
  }, [allGrades, language]);

  if (!adminState) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-pulse text-muted-foreground">{t.loading}</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <GraduationCap className="h-6 w-6" />
            {t.gradeCalculator}
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            {t.gradeCalculatorDesc}
          </p>
        </div>
        <Dialog open={resetDialogOpen} onOpenChange={setResetDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="h-11 min-h-[44px]"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              {t.clearAllScores}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                {t.clearAllScoresConfirm}
              </DialogTitle>
              <DialogDescription>
                {t.clearAllScoresDesc}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setResetDialogOpen(false)}
              >
                {t.cancel}
              </Button>
              <Button variant="destructive" onClick={handleReset}>
                {t.clearAll}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* GPA Summary */}
      <GPASummary
        cumulativeGPA={cumulativeGPA}
        totalCredits={totalCredits}
        completedCourses={allGrades.length}
        semesterGPAs={semesterGPAs}
      />

      {/* Grade Scale Reference */}
      <GradeScaleReference />

      {/* Semester Tabs */}
      <Tabs defaultValue="1.1" className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full h-auto gap-1 bg-muted p-1 rounded-lg">
          {SEMESTERS.map((sem) => (
            <TabsTrigger
              key={sem}
              value={sem}
              className="w-full min-h-[44px] px-3 py-2.5 text-xs sm:text-sm font-medium text-center leading-tight whitespace-normal rounded-md data-[state=active]:font-bold data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all"
            >
              {getSemesterLabel(sem, language)}
            </TabsTrigger>
          ))}
        </TabsList>

        {SEMESTERS.map((sem) => {
          const semCourses = getCoursesBySemester(sem);
          const semGrades = allGrades.filter((g) => {
            const course = COURSES.find((c) => c.id === g.courseId);
            return course?.semester === sem;
          });
          const semGPA = calculateSemesterGPA(semGrades);

          return (
            <TabsContent key={sem} value={sem} className="space-y-4 mt-4">
              {/* Semester Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">{getSemesterLabel(sem, language)}</h3>
                </div>
                {semGrades.length > 0 && (
                  <span className="text-sm font-mono text-muted-foreground">
                    {t.semesterGPA}:{" "}
                    <strong className="text-foreground">{semGPA.toFixed(2)}</strong>
                  </span>
                )}
              </div>

              {/* Course Grade Cards */}
              <div className="grid gap-4 md:grid-cols-2">
                {semCourses.map((course) => {
                  const config = adminState.courseConfigs[course.id];
                  if (!config) return null;

                  // Only show if admin has configured at least one weight > 0
                  const hasActiveWeights = config.weights.some(
                    (w) => w.percentage > 0
                  );
                  if (!hasActiveWeights) return null;

                  const isTaken = !notTakenCourses.has(course.id);

                  return (
                    <GradeCard
                      key={course.id}
                      course={course}
                      weights={config.weights}
                      scores={scores[course.id] || {}}
                      cumulativeGPA={cumulativeGPA}
                      isTaken={isTaken}
                      onScoreChange={handleScoreChange}
                      onTakenChange={handleTakenChange}
                    />
                  );
                })}
              </div>
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}
