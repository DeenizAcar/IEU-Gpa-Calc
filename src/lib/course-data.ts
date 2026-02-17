import { Course, WeightField } from "./types";
import type { Language } from "./i18n";

// ─── Default Weight Fields (fallback) ─────────────────────────────────
export const DEFAULT_WEIGHT_FIELDS: WeightField[] = [
  { id: "midterm", label: "Midterm", labelTr: "Vize", percentage: 30 },
  { id: "final", label: "Final", labelTr: "Final", percentage: 40 },
  { id: "project", label: "Project", labelTr: "Proje", percentage: 15 },
  { id: "homework", label: "Homework", labelTr: "Ödev", percentage: 10 },
  { id: "participation", label: "Participation", labelTr: "Katılım", percentage: 5 },
];

// ─── Per-Course Default Weights (Admin-Exported) ──────────────────────
export const DEFAULT_COURSE_WEIGHTS: Record<string, WeightField[]> = {
  "s11-ieu110": [
    { id: "midterm", label: "Quiz 1", labelTr: "Küçük Sınav 1", percentage: 20 },
    { id: "final", label: "Final", labelTr: "Final", percentage: 60 },
    { id: "custom-1771336249655", label: "Quiz 2", labelTr: "Küçük Sınav 2", percentage: 20 },
  ],
  "s11-ing101": [
    { id: "midterm", label: "Quiz 1", labelTr: "Küçük Sınav 1", percentage: 30 },
    { id: "final", label: "Final", labelTr: "Final", percentage: 40 },
    { id: "custom-1771336303312", label: "Quiz 2", labelTr: "Küçük Sınav 2", percentage: 30 },
  ],
  "s11-mbp101": [
    { id: "midterm", label: "Midterm", labelTr: "Vize", percentage: 30 },
    { id: "final", label: "Final", labelTr: "Final", percentage: 40 },
    { id: "project", label: "Project", labelTr: "Proje", percentage: 20 },
    { id: "participation", label: "Participation", labelTr: "Katılım", percentage: 10 },
  ],
  "s11-mbp191": [
    { id: "midterm", label: "Midterm", labelTr: "Vize", percentage: 20 },
    { id: "final", label: "Final", labelTr: "Final", percentage: 40 },
    { id: "project", label: "Project", labelTr: "Proje", percentage: 30 },
    { id: "participation", label: "Participation", labelTr: "Katılım", percentage: 10 },
  ],
  "s11-mbp193": [
    { id: "midterm", label: "Midterm", labelTr: "Vize", percentage: 30 },
    { id: "final", label: "Final", labelTr: "Final", percentage: 40 },
    { id: "project", label: "Project", labelTr: "Proje", percentage: 20 },
    { id: "participation", label: "Participation", labelTr: "Katılım", percentage: 10 },
  ],
  "s11-mmat113": [
    { id: "midterm", label: "Midterm", labelTr: "Vize", percentage: 30 },
    { id: "final", label: "Final", labelTr: "Final", percentage: 40 },
    { id: "project", label: "Project", labelTr: "Proje", percentage: 20 },
    { id: "participation", label: "Participation", labelTr: "Katılım", percentage: 10 },
  ],
  "s11-trk100": [
    { id: "midterm", label: "Midterm", labelTr: "Vize", percentage: 30 },
    { id: "final", label: "Final", labelTr: "Final", percentage: 40 },
    { id: "project", label: "Quiz 1", labelTr: "Küçük Sınav 1", percentage: 15 },
    { id: "homework", label: "Quiz 2", labelTr: "Küçük Sınav 2", percentage: 15 },
  ],
};

// ─── IUE Computer Programming Course Database (Official Syllabus) ───
export const COURSES: Course[] = [
  // ═══════════════════════════════════════════════════════════════════
  // SEMESTER 1.1 (Year 1, Fall) — 30 AKTS
  // ═══════════════════════════════════════════════════════════════════
  {
    id: "s11-ieu110",
    code: "IEU 110",
    name: "Academic Orientation",
    nameTr: "Akademik Oryantasyon",
    credits: 1,
    semester: "1.1",
    isElective: false,
  },
  {
    id: "s11-ing101",
    code: "ING 101",
    name: "English I",
    nameTr: "İngilizce I",
    credits: 3,
    semester: "1.1",
    isElective: false,
  },
  {
    id: "s11-mbp101",
    code: "MBP 101",
    name: "Introduction to Computer Programming",
    nameTr: "Bilgisayar Programlamaya Giriş",
    credits: 5,
    semester: "1.1",
    isElective: false,
  },
  {
    id: "s11-mbp191",
    code: "MBP 191",
    name: "Database I",
    nameTr: "Veritabanı I",
    credits: 6,
    semester: "1.1",
    isElective: false,
  },
  {
    id: "s11-mbp193",
    code: "MBP 193",
    name: "Web Design Basics",
    nameTr: "Web Tasarım Temelleri",
    credits: 6,
    semester: "1.1",
    isElective: false,
  },
  {
    id: "s11-mmat113",
    code: "MMAT 113",
    name: "Mathematics",
    nameTr: "Matematik",
    credits: 5,
    semester: "1.1",
    isElective: false,
  },
  {
    id: "s11-trk100",
    code: "TRK 100",
    name: "Turkish Language",
    nameTr: "Türk Dili",
    credits: 4,
    semester: "1.1",
    isElective: false,
  },

  // ═══════════════════════════════════════════════════════════════════
  // SEMESTER 1.2 (Year 1, Spring) — 30 AKTS
  // ═══════════════════════════════════════════════════════════════════
  {
    id: "s12-ing102",
    code: "ING 102",
    name: "English II",
    nameTr: "İngilizce II",
    credits: 3,
    semester: "1.2",
    isElective: false,
  },
  {
    id: "s12-mbp104",
    code: "MBP 104",
    name: "Visual Programming I",
    nameTr: "Görsel Programlama I",
    credits: 5,
    semester: "1.2",
    isElective: false,
  },
  {
    id: "s12-mbp106",
    code: "MBP 106",
    name: "Object-Oriented Programming I",
    nameTr: "Nesne Yönelimli Programlama I",
    credits: 5,
    semester: "1.2",
    isElective: false,
  },
  {
    id: "s12-mbp108",
    code: "MBP 108",
    name: "Database II",
    nameTr: "Veritabanı II",
    credits: 5,
    semester: "1.2",
    isElective: false,
  },
  {
    id: "s12-mbp192",
    code: "MBP 192",
    name: "Internet Programming I",
    nameTr: "İnternet Programcılığı I",
    credits: 4,
    semester: "1.2",
    isElective: false,
  },
  {
    id: "s12-myst104",
    code: "MYST 104",
    name: "Occupational Health and Safety",
    nameTr: "İş Sağlığı ve Güvenliği",
    credits: 4,
    semester: "1.2",
    isElective: false,
  },
  {
    id: "s12-trh100",
    code: "TRH 100",
    name: "Principles of Ataturk and History of Turkish Revolution",
    nameTr: "Atatürk İlkeleri ve İnkılap Tarihi",
    credits: 4,
    semester: "1.2",
    isElective: false,
  },

  // ═══════════════════════════════════════════════════════════════════
  // SEMESTER 2.1 (Year 2, Fall) — 30 AKTS
  // ═══════════════════════════════════════════════════════════════════
  {
    id: "s21-elec001",
    code: "ELEC 001",
    name: "Elective I",
    nameTr: "Seçmeli I",
    credits: 3,
    semester: "2.1",
    isElective: true,
    category: "elective",
  },
  {
    id: "s21-elec002",
    code: "ELEC 002",
    name: "Elective II",
    nameTr: "Seçmeli II",
    credits: 4,
    semester: "2.1",
    isElective: true,
    category: "elective",
  },
  {
    id: "s21-elec003",
    code: "ELEC 003",
    name: "Elective III",
    nameTr: "Seçmeli III",
    credits: 4,
    semester: "2.1",
    isElective: true,
    category: "elective",
  },
  {
    id: "s21-elec004",
    code: "ELEC 004",
    name: "Elective IV",
    nameTr: "Seçmeli IV",
    credits: 5,
    semester: "2.1",
    isElective: true,
    category: "elective",
  },
  {
    id: "s21-mbp205",
    code: "MBP 205",
    name: "Internet Programming II",
    nameTr: "İnternet Programcılığı II",
    credits: 5,
    semester: "2.1",
    isElective: false,
  },
  {
    id: "s21-mbp207",
    code: "MBP 207",
    name: "Object-Oriented Programming II",
    nameTr: "Nesne Yönelimli Programlama II",
    credits: 5,
    semester: "2.1",
    isElective: false,
  },
  {
    id: "s21-mbp281",
    code: "MBP 281",
    name: "Internship I",
    nameTr: "Staj I",
    credits: 4,
    semester: "2.1",
    isElective: false,
  },

  // ═══════════════════════════════════════════════════════════════════
  // SEMESTER 2.2 (Year 2, Spring) — 30 AKTS
  // ═══════════════════════════════════════════════════════════════════
  {
    id: "s22-elec005",
    code: "ELEC 005",
    name: "Elective V",
    nameTr: "Seçmeli V",
    credits: 4,
    semester: "2.2",
    isElective: true,
    category: "elective",
  },
  {
    id: "s22-elec006",
    code: "ELEC 006",
    name: "Elective VI",
    nameTr: "Seçmeli VI",
    credits: 5,
    semester: "2.2",
    isElective: true,
    category: "elective",
  },
  {
    id: "s22-elec007",
    code: "ELEC 007",
    name: "Elective VII",
    nameTr: "Seçmeli VII",
    credits: 5,
    semester: "2.2",
    isElective: true,
    category: "elective",
  },
  {
    id: "s22-mbp206",
    code: "MBP 206",
    name: "Visual Programming II",
    nameTr: "Görsel Programlama II",
    credits: 5,
    semester: "2.2",
    isElective: false,
  },
  {
    id: "s22-mbp214",
    code: "MBP 214",
    name: "System Analysis",
    nameTr: "Sistem Analizi",
    credits: 3,
    semester: "2.2",
    isElective: false,
  },
  {
    id: "s22-mbp282",
    code: "MBP 282",
    name: "Internship II",
    nameTr: "Staj II",
    credits: 4,
    semester: "2.2",
    isElective: false,
  },
  {
    id: "s22-myst204",
    code: "MYST 204",
    name: "Quality Assurance and Standards",
    nameTr: "Kalite Güvencesi ve Standartları",
    credits: 4,
    semester: "2.2",
    isElective: false,
  },
];

// ─── Semester Labels ──────────────────────────────────────────────────
export const SEMESTER_LABELS: Record<string, Record<Language, string>> = {
  "1.1": { tr: "1. Sene 1. Dönem", en: "Year 1 Fall" },
  "1.2": { tr: "1. Sene 2. Dönem", en: "Year 1 Spring" },
  "2.1": { tr: "2. Sene 1. Dönem", en: "Year 2 Fall" },
  "2.2": { tr: "2. Sene 2. Dönem", en: "Year 2 Spring" },
};

export function getSemesterLabel(semester: string, language: Language): string {
  return SEMESTER_LABELS[semester]?.[language] ?? semester;
}

export const SEMESTERS = ["1.1", "1.2", "2.1", "2.2"] as const;

export function getCoursesBySemester(semester: string): Course[] {
  return COURSES.filter((c) => c.semester === semester);
}
