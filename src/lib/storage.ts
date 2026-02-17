import { AdminState, CourseConfig, StudentState } from "./types";
import { COURSES, DEFAULT_WEIGHT_FIELDS } from "./course-data";

const ADMIN_STORAGE_KEY = "ieu-gpa-admin";
const STUDENT_STORAGE_KEY = "ieu-gpa-student";

// ─── Generate default admin state ─────────────────────────────────────
export function getDefaultAdminState(): AdminState {
  const courseConfigs: Record<string, CourseConfig> = {};

  for (const course of COURSES) {
    courseConfigs[course.id] = {
      courseId: course.id,
      weights: DEFAULT_WEIGHT_FIELDS.map((w) => ({ ...w })),
    };
  }

  return {
    courseConfigs,
    deletedCourses: [],
    isLocked: false,
    password: "admin123", // Default password
  };
}

// ─── Admin State Persistence ──────────────────────────────────────────
export function loadAdminState(): AdminState {
  if (typeof window === "undefined") return getDefaultAdminState();

  try {
    const stored = localStorage.getItem(ADMIN_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as AdminState;
      // Ensure deletedCourses exists (backward compat)
      if (!parsed.deletedCourses) parsed.deletedCourses = [];
      // Merge with defaults to handle new courses added
      const defaults = getDefaultAdminState();
      for (const courseId of Object.keys(defaults.courseConfigs)) {
        if (!parsed.courseConfigs[courseId]) {
          parsed.courseConfigs[courseId] = defaults.courseConfigs[courseId];
        }
      }
      return parsed;
    }
  } catch (e) {
    console.error("Failed to load admin state:", e);
  }

  return getDefaultAdminState();
}

export function saveAdminState(state: AdminState): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error("Failed to save admin state:", e);
  }
}

// ─── Student State Persistence ────────────────────────────────────────
export function getDefaultStudentState(): StudentState {
  return {
    courseGrades: {},
    selectedElectives: [],
    notTakenCourses: [],
  };
}

export function loadStudentState(): StudentState {
  if (typeof window === "undefined") return getDefaultStudentState();

  try {
    const stored = localStorage.getItem(STUDENT_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored) as StudentState;
    }
  } catch (e) {
    console.error("Failed to load student state:", e);
  }

  return getDefaultStudentState();
}

export function saveStudentState(state: StudentState): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STUDENT_STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error("Failed to save student state:", e);
  }
}

// ─── Reset Functions ──────────────────────────────────────────────────
export function resetAdminState(): AdminState {
  const state = getDefaultAdminState();
  saveAdminState(state);
  return state;
}

export function resetStudentState(): StudentState {
  const state = getDefaultStudentState();
  saveStudentState(state);
  return state;
}

export function clearAllData(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(ADMIN_STORAGE_KEY);
  localStorage.removeItem(STUDENT_STORAGE_KEY);
}
