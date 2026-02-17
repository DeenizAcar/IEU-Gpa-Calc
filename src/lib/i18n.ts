export type Language = "tr" | "en";

export interface Translations {
  // ─── Common ─────────────────────────────────────────────────────
  loading: string;
  cancel: string;
  credits: string;
  creditAbbr: string;
  courses: string;
  elective: string;
  passed: string;
  failed: string;
  weightedAverage: string;
  semesterGPA: string;
  weight: string;

  // ─── Header ─────────────────────────────────────────────────────
  studentMode: string;
  adminMode: string;
  student: string;
  admin: string;

  // ─── Theme Switcher ─────────────────────────────────────────────
  darkMode: string;
  lightMode: string;
  highContrast: string;
  themeSelector: string;

  // ─── Language ───────────────────────────────────────────────────
  switchLanguage: string;

  // ─── User View ──────────────────────────────────────────────────
  gradeCalculator: string;
  gradeCalculatorDesc: string;
  clearAllScores: string;
  clearAllScoresConfirm: string;
  clearAllScoresDesc: string;
  clearAll: string;

  // ─── GPA Summary ───────────────────────────────────────────────
  cumulativeGPA: string;
  totalCredits: string;
  creditHours: string;
  coursesGraded: string;
  bestSemester: string;

  // ─── GPA Labels ────────────────────────────────────────────────
  honorStudent: string;
  highStanding: string;
  goodStanding: string;
  satisfactory: string;
  conditional: string;
  academicProbation: string;

  // ─── Grade Scale Reference ─────────────────────────────────────
  gradingScale: string;
  gradingScaleNote: string;

  // ─── Admin Panel ───────────────────────────────────────────────
  adminAccess: string;
  adminAccessDesc: string;
  password: string;
  enterPassword: string;
  incorrectPassword: string;
  unlockAdmin: string;
  defaultPassword: string;
  courseWeightConfig: string;
  courseWeightConfigDesc: string;
  resetAll: string;
  resetAllConfirm: string;
  resetAllDesc: string;
  saveConfig: string;
  saved: string;
  applyToAll: string;
  applyToAllTitle: string;
  weightsMustSum: string;
  labelEN: string;
  labelTR: string;
  weightPercent: string;
  addCustomField: string;
  electiveCoursePool: string;

  // ─── Semester Labels ────────────────────────────────────────────
  semester1Fall: string;
  semester1Spring: string;
  semester2Fall: string;
  semester2Spring: string;

  // ─── Footer ────────────────────────────────────────────────────
  footerText: string;
}

export const tr: Translations = {
  // ─── Common ─────────────────────────────────────────────────────
  loading: "Yükleniyor…",
  cancel: "İptal",
  credits: "Kredi",
  creditAbbr: "kr",
  courses: "ders",
  elective: "Seçmeli",
  passed: "Geçti",
  failed: "Kaldı",
  weightedAverage: "Ağırlıklı Ortalama",
  semesterGPA: "Dönem GNO",
  weight: "ağırlık",

  // ─── Header ─────────────────────────────────────────────────────
  studentMode: "Öğrenci Modu",
  adminMode: "Yönetici Modu",
  student: "Öğrenci",
  admin: "Yönetici",

  // ─── Theme Switcher ─────────────────────────────────────────────
  darkMode: "Karanlık Mod",
  lightMode: "Aydınlık Mod",
  highContrast: "Yüksek Kontrast",
  themeSelector: "Tema seçici",

  // ─── Language ───────────────────────────────────────────────────
  switchLanguage: "Dil değiştir",

  // ─── User View ──────────────────────────────────────────────────
  gradeCalculator: "Not Hesaplayıcı",
  gradeCalculatorDesc: "Notlarınızı girerek anlık olarak harf notlarınızı ve GNO'nuzu hesaplayın.",
  clearAllScores: "Tüm Notları Sil",
  clearAllScoresConfirm: "Tüm Notlar Silinsin mi?",
  clearAllScoresDesc: "Bu işlem girdiğiniz tüm notları silecektir. Bu işlem geri alınamaz.",
  clearAll: "Tümünü Sil",

  // ─── GPA Summary ───────────────────────────────────────────────
  cumulativeGPA: "Genel GNO",
  totalCredits: "Toplam Kredi",
  creditHours: "kredi saati",
  coursesGraded: "Notlandırılan Ders",
  bestSemester: "En İyi Dönem",

  // ─── GPA Labels ────────────────────────────────────────────────
  honorStudent: "Onur Öğrencisi",
  highStanding: "Yüksek Başarı",
  goodStanding: "İyi Başarı",
  satisfactory: "Yeterli",
  conditional: "Koşullu",
  academicProbation: "Akademik Uyarı",

  // ─── Grade Scale Reference ─────────────────────────────────────
  gradingScale: "İEÜ Not Skalası",
  gradingScaleNote: "Not: DC (1.5) ve DD (1.0) notları geçmek için genel GNO'nun ≥ 2.00 olması gerekir. FD ve FF otomatik başarısızdır.",

  // ─── Admin Panel ───────────────────────────────────────────────
  adminAccess: "Yönetici Girişi",
  adminAccessDesc: "Ders ağırlıklarını yapılandırmak için şifreyi girin.",
  password: "Şifre",
  enterPassword: "Yönetici şifresini girin",
  incorrectPassword: "Yanlış şifre. Tekrar deneyin.",
  unlockAdmin: "Yönetici Panelini Aç",
  defaultPassword: "Varsayılan şifre",
  courseWeightConfig: "Ders Ağırlık Yapılandırması",
  courseWeightConfigDesc: "Her ders için not ağırlık yüzdelerini ayarlayın. %0 olan alanlar öğrencilerden gizlenir.",
  resetAll: "Tümünü Sıfırla",
  resetAllConfirm: "Tüm Yapılandırmalar Sıfırlansın mı?",
  resetAllDesc: "Bu işlem tüm ders ağırlıklarını varsayılan değerlerine geri yükleyecektir. Bu işlem geri alınamaz.",
  saveConfig: "Yapılandırmayı Kaydet",
  saved: "Kaydedildi!",
  applyToAll: "Tümüne Uygula",
  applyToAllTitle: "Bu ağırlıkları tüm derslere uygula",
  weightsMustSum: "Ağırlıklar toplamı %100 olmalıdır (şu an %{value})",
  labelEN: "Etiket (EN)",
  labelTR: "Etiket (TR)",
  weightPercent: "Ağırlık %",
  addCustomField: "Özel Alan Ekle",
  electiveCoursePool: "Seçmeli Ders Havuzu",

  // ─── Semester Labels ────────────────────────────────────────────
  semester1Fall: "1. Sene 1. Dönem",
  semester1Spring: "1. Sene 2. Dönem",
  semester2Fall: "2. Sene 1. Dönem",
  semester2Spring: "2. Sene 2. Dönem",

  // ─── Footer ────────────────────────────────────────────────────
  footerText: "Deniz Acar",
};

export const en: Translations = {
  // ─── Common ─────────────────────────────────────────────────────
  loading: "Loading…",
  cancel: "Cancel",
  credits: "Credits",
  creditAbbr: "cr",
  courses: "courses",
  elective: "Elective",
  passed: "Passed",
  failed: "Failed",
  weightedAverage: "Weighted Average",
  semesterGPA: "Semester GPA",
  weight: "weight",

  // ─── Header ─────────────────────────────────────────────────────
  studentMode: "Student Mode",
  adminMode: "Admin Mode",
  student: "Student",
  admin: "Admin",

  // ─── Theme Switcher ─────────────────────────────────────────────
  darkMode: "Dark Mode",
  lightMode: "Light Mode",
  highContrast: "High Contrast",
  themeSelector: "Theme selector",

  // ─── Language ───────────────────────────────────────────────────
  switchLanguage: "Switch language",

  // ─── User View ──────────────────────────────────────────────────
  gradeCalculator: "Grade Calculator",
  gradeCalculatorDesc: "Enter your scores to calculate grades and GPA instantly.",
  clearAllScores: "Clear All Scores",
  clearAllScoresConfirm: "Clear All Scores?",
  clearAllScoresDesc: "This will remove all entered scores. This action cannot be undone.",
  clearAll: "Clear All",

  // ─── GPA Summary ───────────────────────────────────────────────
  cumulativeGPA: "Cumulative GPA",
  totalCredits: "Total Credits",
  creditHours: "credit hours",
  coursesGraded: "Courses Graded",
  bestSemester: "Best Semester",

  // ─── GPA Labels ────────────────────────────────────────────────
  honorStudent: "Honor Student",
  highStanding: "High Standing",
  goodStanding: "Good Standing",
  satisfactory: "Satisfactory",
  conditional: "Conditional",
  academicProbation: "Academic Probation",

  // ─── Grade Scale Reference ─────────────────────────────────────
  gradingScale: "IUE Grading Scale",
  gradingScaleNote: "Note: DC (1.5) and DD (1.0) grades require a cumulative GPA of ≥ 2.00 to pass. FD and FF are automatic failures.",

  // ─── Admin Panel ───────────────────────────────────────────────
  adminAccess: "Admin Access",
  adminAccessDesc: "Enter the password to configure course weights.",
  password: "Password",
  enterPassword: "Enter admin password",
  incorrectPassword: "Incorrect password. Try again.",
  unlockAdmin: "Unlock Admin Panel",
  defaultPassword: "Default password",
  courseWeightConfig: "Course Weight Configuration",
  courseWeightConfigDesc: "Set grading weight percentages for each course. Fields with 0% are hidden from students.",
  resetAll: "Reset All",
  resetAllConfirm: "Reset All Configurations?",
  resetAllDesc: "This will restore all course weights to their default values. This action cannot be undone.",
  saveConfig: "Save Configuration",
  saved: "Saved!",
  applyToAll: "Apply to All",
  applyToAllTitle: "Apply these weights to all courses",
  weightsMustSum: "Weights must sum to 100% (currently {value}%)",
  labelEN: "Label (EN)",
  labelTR: "Label (TR)",
  weightPercent: "Weight %",
  addCustomField: "Add Custom Field",
  electiveCoursePool: "Elective Course Pool",

  // ─── Semester Labels ────────────────────────────────────────────
  semester1Fall: "Year 1 Fall",
  semester1Spring: "Year 1 Spring",
  semester2Fall: "Year 2 Fall",
  semester2Spring: "Year 2 Spring",

  // ─── Footer ────────────────────────────────────────────────────
  footerText: "Deniz Acar",
};

export const translations: Record<Language, Translations> = { tr, en };
