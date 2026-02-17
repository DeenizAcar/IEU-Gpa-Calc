"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AdminState, WeightField } from "@/lib/types";
import { COURSES, SEMESTERS, ELECTIVE_COURSES, getSemesterLabel } from "@/lib/course-data";
import { loadAdminState, saveAdminState, resetAdminState } from "@/lib/storage";
import {
  Plus,
  Trash2,
  Save,
  RotateCcw,
  Lock,
  Unlock,
  Settings,
  AlertTriangle,
  CheckCircle,
  BookOpen,
} from "lucide-react";
import { useLanguage } from "@/components/language-provider";

export function AdminPanel() {
  const { language, t } = useLanguage();
  const [adminState, setAdminState] = useState<AdminState | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saved" | "error">("idle");
  const [resetDialogOpen, setResetDialogOpen] = useState(false);

  // Load on mount
  useEffect(() => {
    setAdminState(loadAdminState());
  }, []);

  const handleAuthenticate = useCallback(() => {
    if (!adminState) return;
    if (passwordInput === adminState.password) {
      setIsAuthenticated(true);
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  }, [passwordInput, adminState]);

  const handleSave = useCallback(() => {
    if (!adminState) return;
    try {
      saveAdminState(adminState);
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 2000);
    } catch {
      setSaveStatus("error");
      setTimeout(() => setSaveStatus("idle"), 3000);
    }
  }, [adminState]);

  const handleReset = useCallback(() => {
    const state = resetAdminState();
    setAdminState(state);
    setResetDialogOpen(false);
    setSaveStatus("saved");
    setTimeout(() => setSaveStatus("idle"), 2000);
  }, []);

  const updateWeight = useCallback(
    (courseId: string, weightId: string, field: keyof WeightField, value: string | number) => {
      setAdminState((prev) => {
        if (!prev) return prev;
        const config = { ...prev.courseConfigs[courseId] };
        config.weights = config.weights.map((w) =>
          w.id === weightId
            ? { ...w, [field]: field === "percentage" ? Math.max(0, Math.min(100, Number(value) || 0)) : value }
            : w
        );
        return {
          ...prev,
          courseConfigs: { ...prev.courseConfigs, [courseId]: config },
        };
      });
    },
    []
  );

  const addWeightField = useCallback((courseId: string) => {
    setAdminState((prev) => {
      if (!prev) return prev;
      const config = { ...prev.courseConfigs[courseId] };
      const newId = `custom-${Date.now()}`;
      config.weights = [
        ...config.weights,
        {
          id: newId,
          label: "Custom",
          labelTr: "Özel",
          percentage: 0,
        },
      ];
      return {
        ...prev,
        courseConfigs: { ...prev.courseConfigs, [courseId]: config },
      };
    });
  }, []);

  const removeWeightField = useCallback((courseId: string, weightId: string) => {
    setAdminState((prev) => {
      if (!prev) return prev;
      const config = { ...prev.courseConfigs[courseId] };
      config.weights = config.weights.filter((w) => w.id !== weightId);
      return {
        ...prev,
        courseConfigs: { ...prev.courseConfigs, [courseId]: config },
      };
    });
  }, []);

  const applyToAll = useCallback(
    (sourceId: string) => {
      setAdminState((prev) => {
        if (!prev) return prev;
        const sourceWeights = prev.courseConfigs[sourceId]?.weights;
        if (!sourceWeights) return prev;

        const newConfigs = { ...prev.courseConfigs };
        for (const courseId of Object.keys(newConfigs)) {
          if (courseId !== sourceId) {
            newConfigs[courseId] = {
              ...newConfigs[courseId],
              weights: sourceWeights.map((w) => ({ ...w })),
            };
          }
        }
        return { ...prev, courseConfigs: newConfigs };
      });
    },
    []
  );

  const getCourseName = (course: { name: string; nameTr: string }) =>
    language === "tr" ? course.nameTr : course.name;

  if (!adminState) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-pulse text-muted-foreground">{t.loading}</div>
      </div>
    );
  }

  // ─── Authentication Gate ────────────────────────────────────────────
  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="w-full max-w-sm">
          <CardHeader className="text-center">
            <div className="mx-auto mb-3 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Lock className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>{t.adminAccess}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {t.adminAccessDesc}
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="admin-password">{t.password}</Label>
              <Input
                id="admin-password"
                type="password"
                placeholder={t.enterPassword}
                value={passwordInput}
                onChange={(e) => {
                  setPasswordInput(e.target.value);
                  setPasswordError(false);
                }}
                onKeyDown={(e) => e.key === "Enter" && handleAuthenticate()}
                className={`h-11 min-h-[44px] ${passwordError ? "border-red-500" : ""}`}
                autoFocus
              />
              {passwordError && (
                <p className="text-sm text-red-500 mt-1" role="alert">
                  {t.incorrectPassword}
                </p>
              )}
            </div>
            <Button
              onClick={handleAuthenticate}
              className="w-full h-11 min-h-[44px]"
            >
              <Unlock className="h-4 w-4 mr-2" />
              {t.unlockAdmin}
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              {t.defaultPassword}: <code className="bg-muted px-1 py-0.5 rounded">admin123</code>
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // ─── Admin Panel Content ──────────────────────────────────────────
  return (
    <div className="space-y-6">
      {/* Header & Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Settings className="h-6 w-6" />
            {t.courseWeightConfig}
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            {t.courseWeightConfigDesc}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Dialog open={resetDialogOpen} onOpenChange={setResetDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-11 min-h-[44px]"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                {t.resetAll}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                  {t.resetAllConfirm}
                </DialogTitle>
                <DialogDescription>
                  {t.resetAllDesc}
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
                  {t.resetAll}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button
            onClick={handleSave}
            className="h-11 min-h-[44px]"
            disabled={saveStatus === "saved"}
          >
            {saveStatus === "saved" ? (
              <>
                <CheckCircle className="h-4 w-4 mr-2" />
                {t.saved}
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                {t.saveConfig}
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Semester Accordions */}
      <Accordion type="multiple" defaultValue={["1.1"]} className="space-y-4">
        {SEMESTERS.map((semester) => {
          const semesterCourses = COURSES.filter(
            (c) => c.semester === semester
          );
          return (
            <AccordionItem
              key={semester}
              value={semester}
              className="border rounded-lg px-4"
            >
              <AccordionTrigger className="hover:no-underline py-4">
                <div className="flex items-center gap-3">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <div className="text-left">
                    <span className="font-semibold">
                      {getSemesterLabel(semester, language)}
                    </span>
                    <span className="text-sm text-muted-foreground ml-2">
                      ({semesterCourses.length} {t.courses})
                    </span>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 pb-4">
                  {semesterCourses.map((course) => {
                    const config = adminState.courseConfigs[course.id];
                    if (!config) return null;

                    const totalWeight = config.weights.reduce(
                      (sum, w) => sum + w.percentage,
                      0
                    );
                    const isValid = totalWeight === 100 || totalWeight === 0;

                    return (
                      <Card key={course.id} className="border">
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <CardTitle className="text-base">
                                {getCourseName(course)}
                              </CardTitle>
                              <p className="text-xs text-muted-foreground">
                                {course.code} • {course.credits} {t.creditAbbr}
                                {course.isElective && (
                                  <Badge
                                    variant="secondary"
                                    className="ml-2 text-[10px]"
                                  >
                                    {t.elective}
                                  </Badge>
                                )}
                              </p>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                              <Badge
                                variant={isValid ? "secondary" : "destructive"}
                                className="font-mono"
                              >
                                {totalWeight}%
                              </Badge>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => applyToAll(course.id)}
                                className="text-xs h-8 min-h-[44px] min-w-[44px]"
                                title={t.applyToAllTitle}
                              >
                                {t.applyToAll}
                              </Button>
                            </div>
                          </div>
                          {!isValid && totalWeight > 0 && (
                            <p className="text-xs text-destructive flex items-center gap-1 mt-1">
                              <AlertTriangle className="h-3 w-3" />
                              {t.weightsMustSum.replace("{value}", String(totalWeight))}
                            </p>
                          )}
                        </CardHeader>
                        <CardContent className="space-y-3">
                          {config.weights.map((weight) => (
                            <div
                              key={weight.id}
                              className="grid grid-cols-[1fr_1fr_80px_40px] gap-2 items-end"
                            >
                              <div>
                                <Label className="text-xs">{t.labelEN}</Label>
                                <Input
                                  value={weight.label}
                                  onChange={(e) =>
                                    updateWeight(
                                      course.id,
                                      weight.id,
                                      "label",
                                      e.target.value
                                    )
                                  }
                                  className="h-9"
                                  placeholder="e.g., Midterm"
                                />
                              </div>
                              <div>
                                <Label className="text-xs">{t.labelTR}</Label>
                                <Input
                                  value={weight.labelTr}
                                  onChange={(e) =>
                                    updateWeight(
                                      course.id,
                                      weight.id,
                                      "labelTr",
                                      e.target.value
                                    )
                                  }
                                  className="h-9"
                                  placeholder="e.g., Vize"
                                />
                              </div>
                              <div>
                                <Label className="text-xs">{t.weightPercent}</Label>
                                <Input
                                  type="number"
                                  min={0}
                                  max={100}
                                  value={weight.percentage}
                                  onChange={(e) =>
                                    updateWeight(
                                      course.id,
                                      weight.id,
                                      "percentage",
                                      e.target.value
                                    )
                                  }
                                  className="h-9 font-mono"
                                />
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() =>
                                  removeWeightField(course.id, weight.id)
                                }
                                className="h-9 w-9 min-h-[44px] min-w-[44px] text-destructive hover:text-destructive"
                                aria-label={`Remove ${weight.label} field`}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => addWeightField(course.id)}
                            className="w-full h-9 min-h-[44px] mt-2"
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            {t.addCustomField}
                          </Button>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}

        {/* Elective Pool */}
        <AccordionItem
          value="electives"
          className="border rounded-lg px-4"
        >
          <AccordionTrigger className="hover:no-underline py-4">
            <div className="flex items-center gap-3">
              <BookOpen className="h-5 w-5 text-primary" />
              <div className="text-left">
                <span className="font-semibold">{t.electiveCoursePool}</span>
                <span className="text-sm text-muted-foreground ml-2">
                  ({ELECTIVE_COURSES.length} {t.courses})
                </span>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pb-4">
              {ELECTIVE_COURSES.map((course) => (
                <Card key={course.id} className="border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">{getCourseName(course)}</p>
                      <p className="text-xs text-muted-foreground">
                        {course.code} • {course.credits} {t.credits}
                      </p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {language === "tr" ? course.name : course.nameTr}
                    </Badge>
                  </div>
                </Card>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
