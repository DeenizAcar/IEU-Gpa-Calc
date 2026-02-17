import { GradeScale, WeightField, CourseGrade, SemesterGPA, CourseConfig } from "./types";
import { COURSES } from "./course-data";

// ─── IUE Grading Scale ────────────────────────────────────────────────
export const IUE_GRADE_SCALE: GradeScale[] = [
  { letter: "AA", point: 4.0, minScore: 90, maxScore: 100, color: "#22c55e" },
  { letter: "BA", point: 3.5, minScore: 85, maxScore: 89.99, color: "#4ade80" },
  { letter: "BB", point: 3.0, minScore: 80, maxScore: 84.99, color: "#86efac" },
  { letter: "CB", point: 2.5, minScore: 75, maxScore: 79.99, color: "#a3e635" },
  { letter: "CC", point: 2.0, minScore: 65, maxScore: 74.99, color: "#facc15" },
  { letter: "DC", point: 1.5, minScore: 58, maxScore: 64.99, color: "#fb923c" },
  { letter: "DD", point: 1.0, minScore: 50, maxScore: 57.99, color: "#f97316" },
  { letter: "FD", point: 0.5, minScore: 40, maxScore: 49.99, color: "#ef4444" },
  { letter: "FF", point: 0.0, minScore: 0, maxScore: 39.99, color: "#dc2626" },
];

/**
 * Calculate the weighted average from individual scores.
 * Only considers weights that are > 0.
 */
export function calculateWeightedAverage(
  scores: Record<string, number>,
  weights: WeightField[]
): number {
  const activeWeights = weights.filter((w) => w.percentage > 0);
  const totalPercentage = activeWeights.reduce((sum, w) => sum + w.percentage, 0);

  if (totalPercentage === 0) return 0;

  const weightedSum = activeWeights.reduce((sum, w) => {
    const score = scores[w.id] ?? 0;
    return sum + score * (w.percentage / totalPercentage);
  }, 0);

  return Math.round(weightedSum * 100) / 100;
}

/**
 * Map a numeric score (0-100) to the IUE letter grade.
 */
export function scoreToLetterGrade(score: number): string {
  for (const grade of IUE_GRADE_SCALE) {
    if (score >= grade.minScore) {
      return grade.letter;
    }
  }
  return "FF";
}

/**
 * Map a letter grade to its grade point value.
 */
export function letterToGradePoint(letter: string): number {
  const grade = IUE_GRADE_SCALE.find((g) => g.letter === letter);
  return grade ? grade.point : 0.0;
}

/**
 * Determine if a student passes with this grade.
 * DC and DD require cumulative GPA >= 2.00 to pass.
 * CC and above always pass.
 * FD and FF always fail.
 */
export function isPassed(letter: string, cumulativeGPA?: number): boolean {
  const point = letterToGradePoint(letter);
  if (point >= 2.0) return true; // CC and above
  if (point <= 0.5) return false; // FD and FF
  // DC (1.5) and DD (1.0) — conditional pass
  if (cumulativeGPA !== undefined) {
    return cumulativeGPA >= 2.0;
  }
  return false; // conservative: fail if GPA unknown
}

/**
 * Get the color associated with a letter grade.
 */
export function getGradeColor(letter: string): string {
  const grade = IUE_GRADE_SCALE.find((g) => g.letter === letter);
  return grade?.color ?? "#71717a";
}

/**
 * Calculate a full CourseGrade from scores and configuration.
 */
export function calculateCourseGrade(
  courseId: string,
  scores: Record<string, number>,
  config: CourseConfig,
  cumulativeGPA?: number
): CourseGrade {
  const weightedAverage = calculateWeightedAverage(scores, config.weights);
  const letterGrade = scoreToLetterGrade(weightedAverage);
  const gradePoint = letterToGradePoint(letterGrade);
  const passed = isPassed(letterGrade, cumulativeGPA);

  return {
    courseId,
    scores,
    weightedAverage,
    letterGrade,
    gradePoint,
    passed,
  };
}

/**
 * Calculate semester GPA.
 */
export function calculateSemesterGPA(courseGrades: CourseGrade[]): number {
  let totalPoints = 0;
  let totalCredits = 0;

  for (const grade of courseGrades) {
    const course = COURSES.find((c) => c.id === grade.courseId);
    if (!course) continue;
    totalPoints += grade.gradePoint * course.credits;
    totalCredits += course.credits;
  }

  if (totalCredits === 0) return 0;
  return Math.round((totalPoints / totalCredits) * 100) / 100;
}

/**
 * Calculate cumulative GPA across all semesters.
 */
export function calculateCumulativeGPA(
  allGrades: CourseGrade[]
): { gpa: number; totalCredits: number; totalPoints: number } {
  let totalPoints = 0;
  let totalCredits = 0;

  for (const grade of allGrades) {
    const course = COURSES.find((c) => c.id === grade.courseId);
    if (!course) continue;
    totalPoints += grade.gradePoint * course.credits;
    totalCredits += course.credits;
  }

  const gpa = totalCredits > 0 ? Math.round((totalPoints / totalCredits) * 100) / 100 : 0;
  return { gpa, totalCredits, totalPoints };
}

/**
 * Group course grades by semester.
 */
export function groupBySemester(courseGrades: CourseGrade[]): SemesterGPA[] {
  const semesters = new Map<string, CourseGrade[]>();

  for (const grade of courseGrades) {
    const course = COURSES.find((c) => c.id === grade.courseId);
    if (!course) continue;

    const sem = course.semester;
    if (!semesters.has(sem)) semesters.set(sem, []);
    semesters.get(sem)!.push(grade);
  }

  return Array.from(semesters.entries()).map(([semester, courses]) => ({
    semester,
    gpa: calculateSemesterGPA(courses),
    totalCredits: courses.reduce((sum, g) => {
      const c = COURSES.find((c) => c.id === g.courseId);
      return sum + (c?.credits ?? 0);
    }, 0),
    courses,
  }));
}

/**
 * Get GPA classification label key.
 */
export function getGPALabelKey(gpa: number): string {
  if (gpa >= 3.5) return "honorStudent";
  if (gpa >= 3.0) return "highStanding";
  if (gpa >= 2.5) return "goodStanding";
  if (gpa >= 2.0) return "satisfactory";
  if (gpa >= 1.0) return "conditional";
  return "academicProbation";
}

/**
 * Get GPA status color.
 */
export function getGPAColor(gpa: number): string {
  if (gpa >= 3.5) return "#22c55e";
  if (gpa >= 3.0) return "#4ade80";
  if (gpa >= 2.5) return "#a3e635";
  if (gpa >= 2.0) return "#facc15";
  if (gpa >= 1.0) return "#fb923c";
  return "#ef4444";
}
