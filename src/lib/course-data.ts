import { Course, WeightField } from "./types";

// ─── Default Weight Fields ────────────────────────────────────────────
export const DEFAULT_WEIGHT_FIELDS: WeightField[] = [
  { id: "midterm", label: "Midterm", labelTr: "Vize", percentage: 30 },
  { id: "final", label: "Final", labelTr: "Final", percentage: 40 },
  { id: "project", label: "Project", labelTr: "Proje", percentage: 15 },
  { id: "homework", label: "Homework", labelTr: "Ödev", percentage: 10 },
  { id: "participation", label: "Participation", labelTr: "Katılım", percentage: 5 },
];

// ─── IUE Computer Programming Course Database ──────────────────────
export const COURSES: Course[] = [
  // ═══════════════════════════════════════════════════════════════════
  // SEMESTER 1.1 (Year 1, Fall)
  // ═══════════════════════════════════════════════════════════════════
  {
    id: "s11-academic-orientation",
    code: "UNI101",
    name: "Academic Orientation",
    nameTr: "Akademik Oryantasyon",
    credits: 1,
    semester: "1.1",
    isElective: false,
  },
  {
    id: "s11-english-1",
    code: "ING101",
    name: "English I",
    nameTr: "İngilizce I",
    credits: 3,
    semester: "1.1",
    isElective: false,
  },
  {
    id: "s11-database-1",
    code: "BLP101",
    name: "Database I",
    nameTr: "Veritabanı I",
    credits: 4,
    semester: "1.1",
    isElective: false,
  },
  {
    id: "s11-web-design",
    code: "BLP103",
    name: "Web Design Basics",
    nameTr: "Web Tasarım Temelleri",
    credits: 3,
    semester: "1.1",
    isElective: false,
  },
  {
    id: "s11-programming-basics",
    code: "BLP105",
    name: "Programming Basics",
    nameTr: "Programlama Temelleri",
    credits: 4,
    semester: "1.1",
    isElective: false,
  },
  {
    id: "s11-math-1",
    code: "MAT101",
    name: "Mathematics I",
    nameTr: "Matematik I",
    credits: 3,
    semester: "1.1",
    isElective: false,
  },
  {
    id: "s11-turkish-1",
    code: "TDL101",
    name: "Turkish I",
    nameTr: "Türk Dili I",
    credits: 2,
    semester: "1.1",
    isElective: false,
  },

  // ═══════════════════════════════════════════════════════════════════
  // SEMESTER 1.2 (Year 1, Spring)
  // ═══════════════════════════════════════════════════════════════════
  {
    id: "s12-english-2",
    code: "ING102",
    name: "English II",
    nameTr: "İngilizce II",
    credits: 3,
    semester: "1.2",
    isElective: false,
  },
  {
    id: "s12-visual-programming-1",
    code: "BLP102",
    name: "Visual Programming I",
    nameTr: "Görsel Programlama I",
    credits: 4,
    semester: "1.2",
    isElective: false,
  },
  {
    id: "s12-oop-1",
    code: "BLP104",
    name: "Object-Oriented Programming I",
    nameTr: "Nesne Yönelimli Programlama I",
    credits: 4,
    semester: "1.2",
    isElective: false,
  },
  {
    id: "s12-database-2",
    code: "BLP106",
    name: "Database II",
    nameTr: "Veritabanı II",
    credits: 4,
    semester: "1.2",
    isElective: false,
  },
  {
    id: "s12-internet-programming-1",
    code: "BLP108",
    name: "Internet Programming I",
    nameTr: "İnternet Programcılığı I",
    credits: 3,
    semester: "1.2",
    isElective: false,
  },
  {
    id: "s12-internship-1",
    code: "BLP190",
    name: "Internship I",
    nameTr: "Staj I",
    credits: 6,
    semester: "1.2",
    isElective: false,
  },
  {
    id: "s12-history",
    code: "ATA102",
    name: "Atatürk's Principles and History",
    nameTr: "Atatürk İlkeleri ve İnkılap Tarihi",
    credits: 2,
    semester: "1.2",
    isElective: false,
  },

  // ═══════════════════════════════════════════════════════════════════
  // SEMESTER 2.1 (Year 2, Fall)
  // ═══════════════════════════════════════════════════════════════════
  {
    id: "s21-oop-2",
    code: "BLP201",
    name: "Object-Oriented Programming II",
    nameTr: "Nesne Yönelimli Programlama II",
    credits: 4,
    semester: "2.1",
    isElective: false,
  },
  {
    id: "s21-visual-programming-2",
    code: "BLP203",
    name: "Visual Programming II",
    nameTr: "Görsel Programlama II",
    credits: 4,
    semester: "2.1",
    isElective: false,
  },
  {
    id: "s21-internet-programming-2",
    code: "BLP205",
    name: "Internet Programming II",
    nameTr: "İnternet Programcılığı II",
    credits: 3,
    semester: "2.1",
    isElective: false,
  },
  {
    id: "s21-elective-1",
    code: "SEC201",
    name: "Elective I",
    nameTr: "Seçmeli I",
    credits: 3,
    semester: "2.1",
    isElective: true,
    category: "elective",
  },
  {
    id: "s21-elective-2",
    code: "SEC202",
    name: "Elective II",
    nameTr: "Seçmeli II",
    credits: 3,
    semester: "2.1",
    isElective: true,
    category: "elective",
  },
  {
    id: "s21-elective-3",
    code: "SEC203",
    name: "Elective III",
    nameTr: "Seçmeli III",
    credits: 3,
    semester: "2.1",
    isElective: true,
    category: "elective",
  },
  {
    id: "s21-elective-4",
    code: "SEC204",
    name: "Elective IV",
    nameTr: "Seçmeli IV",
    credits: 3,
    semester: "2.1",
    isElective: true,
    category: "elective",
  },

  // ═══════════════════════════════════════════════════════════════════
  // SEMESTER 2.2 (Year 2, Spring)
  // ═══════════════════════════════════════════════════════════════════
  {
    id: "s22-system-analysis",
    code: "BLP202",
    name: "System Analysis",
    nameTr: "Sistem Analizi",
    credits: 3,
    semester: "2.2",
    isElective: false,
  },
  {
    id: "s22-web-programming",
    code: "BLP204",
    name: "Web Programming",
    nameTr: "Web Programlama",
    credits: 4,
    semester: "2.2",
    isElective: false,
  },
  {
    id: "s22-computer-hardware",
    code: "BLP206",
    name: "Computer Hardware",
    nameTr: "Bilgisayar Donanımı",
    credits: 3,
    semester: "2.2",
    isElective: false,
  },
  {
    id: "s22-internship-2",
    code: "BLP290",
    name: "Internship II",
    nameTr: "Staj II",
    credits: 6,
    semester: "2.2",
    isElective: false,
  },
  {
    id: "s22-elective-5",
    code: "SEC205",
    name: "Elective V",
    nameTr: "Seçmeli V",
    credits: 3,
    semester: "2.2",
    isElective: true,
    category: "elective",
  },
  {
    id: "s22-elective-6",
    code: "SEC206",
    name: "Elective VI",
    nameTr: "Seçmeli VI",
    credits: 3,
    semester: "2.2",
    isElective: true,
    category: "elective",
  },
  {
    id: "s22-elective-7",
    code: "SEC207",
    name: "Elective VII",
    nameTr: "Seçmeli VII",
    credits: 3,
    semester: "2.2",
    isElective: true,
    category: "elective",
  },
];

// ─── Elective Course Pool ─────────────────────────────────────────────
export const ELECTIVE_COURSES: Course[] = [
  {
    id: "elec-ecommerce",
    code: "SEC301",
    name: "E-Commerce",
    nameTr: "E-Ticaret",
    credits: 3,
    semester: "elective",
    isElective: true,
    category: "elective",
  },
  {
    id: "elec-game-programming",
    code: "SEC302",
    name: "Game Programming",
    nameTr: "Oyun Programlama",
    credits: 3,
    semester: "elective",
    isElective: true,
    category: "elective",
  },
  {
    id: "elec-ai-blockchain",
    code: "SEC303",
    name: "AI & Blockchain",
    nameTr: "Yapay Zeka ve Blok Zincir",
    credits: 3,
    semester: "elective",
    isElective: true,
    category: "elective",
  },
  {
    id: "elec-mobile-apps",
    code: "SEC304",
    name: "Mobile Applications",
    nameTr: "Mobil Uygulamalar",
    credits: 3,
    semester: "elective",
    isElective: true,
    category: "elective",
  },
  {
    id: "elec-data-science",
    code: "SEC305",
    name: "Data Science",
    nameTr: "Veri Bilimi",
    credits: 3,
    semester: "elective",
    isElective: true,
    category: "elective",
  },
  {
    id: "elec-cyber-security",
    code: "SEC306",
    name: "Cyber Security",
    nameTr: "Siber Güvenlik",
    credits: 3,
    semester: "elective",
    isElective: true,
    category: "elective",
  },
  {
    id: "elec-cloud-computing",
    code: "SEC307",
    name: "Cloud Computing",
    nameTr: "Bulut Bilişim",
    credits: 3,
    semester: "elective",
    isElective: true,
    category: "elective",
  },
  {
    id: "elec-network-admin",
    code: "SEC308",
    name: "Network Administration",
    nameTr: "Ağ Yönetimi",
    credits: 3,
    semester: "elective",
    isElective: true,
    category: "elective",
  },
];

// ─── Semester Labels ──────────────────────────────────────────────────
import type { Language } from "./i18n";

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
