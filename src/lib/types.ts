// ─── Core Type Definitions ───────────────────────────────────────────

export interface WeightField {
  id: string;
  label: string;
  labelTr: string;
  percentage: number;
}

export interface CourseConfig {
  courseId: string;
  weights: WeightField[];
}

export interface Course {
  id: string;
  code: string;
  name: string;
  nameTr: string;
  credits: number;
  semester: string;
  isElective: boolean;
  category?: string;
}

export interface CourseGrade {
  courseId: string;
  scores: Record<string, number>; // weightFieldId -> score (0-100)
  weightedAverage: number;
  letterGrade: string;
  gradePoint: number;
  passed: boolean;
}

export interface SemesterGPA {
  semester: string;
  gpa: number;
  totalCredits: number;
  courses: CourseGrade[];
}

export interface AdminState {
  courseConfigs: Record<string, CourseConfig>;
  courseNameOverrides: Record<string, { name: string; nameTr: string; code: string }>;
  deletedCourses: string[];
  isLocked: boolean;
  password: string;
}

export interface StudentState {
  courseGrades: Record<string, CourseGrade>;
  selectedElectives: string[];
  notTakenCourses: string[];
  customAkts: Record<string, number>;
}

export type ThemeMode = "dark" | "light" | "high-contrast";

export interface GradeScale {
  letter: string;
  point: number;
  minScore: number;
  maxScore: number;
  color: string;
}
