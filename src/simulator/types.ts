export type Term = 'Fall' | 'Winter' | 'Spring' | 'Summer';
export type CourseCategory = 'Major' | 'Eng' | 'EMSB' | 'EPSEL' | 'Gen' | 'Rel';

export interface Course {
  classId: string;
  classNumber: string;
  deptCode: string;
  typicalYear: 'Freshman' | 'Sophomore' | 'Junior' | 'Senior' | string;
  credits: number;
  topic: string;
  termsTaught: Term[];
  prereqs: string[];
  concurrentPrereqs: string[];
  category: CourseCategory;
  genEdSets: string[];
  substitutionAllowed: boolean;
  substitutionClassIds: string[];
  abetCategory?: string;
  isCriticalPath?: boolean;
}

export interface StudentSemesterLog {
  semester: number;
  term: Term;
  targetCreditLimit: number;
  enrolledCourseIds: string[];
  totalCredits: number;
  bottleneckNotes: string[];
}

export interface Student {
  id: string;
  name: string;
  meanCreditHours: number;
  stdDevCreditHours: number;
  maxCreditHours: number; // sampled max credit hours student is willing to take (12 to 20)
  isWorking: boolean;
  workCreditPenalty: number;
  effectiveCreditLimit: number;
  currentSemester: number;
  currentTerm: Term;
  incomingApCourses: string[];
  springSummerBudget: number;
  springSummerUsed: number;
  parityFlipAfterSem?: number;
  retakenCourses: string[];
  completedCourses: Set<string>;
  failedPrereqs: Array<{ courseId: string; missingPrereqId: string; semester: number }>;
  isGraduated: boolean;
  graduationSemester?: number;
  semesterHistory: StudentSemesterLog[];
}

export interface Interventions {
  // Course offering overrides (courseId -> Array of terms, e.g. '023' -> ['Fall', 'Winter'])
  offeringOverrides: Record<string, Term[]>;
  // Credit hour requirement reductions
  relCreditsRequired: number;     // default 14
  engCreditsRequired: number;     // default 9 (non-EPSEL Eng electives; + 3 cr EPSEL = 12 cr total)
  emsbCreditsRequired: number;    // default 4
  epselCreditsRequired: number;   // default 3 (counts toward 12 cr total engineering electives)
  // General Education Set selection
  genEdSet: 1 | 2;               // default 1 (Set 1 vs Set 2)
  // Specific course credit hour overrides (courseId -> credits)
  creditOverrides: Record<string, number>;
  // Prerequisite modifications (courseId -> allowed prereqs or empty to bypass)
  prereqOverrides: Record<string, string[]>;
  // Course requirement removals
  removeWrtg316: boolean;        // default false (remove WRTG 316)
  removeEcon110: boolean;        // default false (remove ECON 110)
  removeMath303: boolean;        // default false (remove MATH 303)
  removeChem464: boolean;        // default true (exempt CHEM 464 by default; taken by only 6.5% of actual graduates)
  removeStat121: boolean;        // default false (remove STAT 121)
  removeCbeSeminars: boolean;    // default false (remove CBE 191, 291, 391)
  removeCbe436: boolean;         // default false (remove CBE 436 Process Control)
  removeCbe476: boolean;         // default false (remove CBE 476 Separations)
  removeCbe445: boolean;         // default false (remove CBE 445 Separations & Control Lab)
  // Student population parameters
  populationMeanCredits: number; // default 17.0 (yields ~14.6 cr/sem realized, matching 14.7 cr/sem observed)
  populationStdDevCredits: number; // default 1.6 (empirical per-student std dev: 1.61)
  workingPercentage: number;     // default 30% (0.3)
  workPenaltyCredits: number;    // default 2.5 credits
  enableSpringSummer: boolean;   // default false (when true, 100% universal Spring/Summer policy)
  springSummerParticipationRate: number; // default 0.74 (empirical 74.2% of graduating seniors)
  enableApTransferCredits: boolean; // default true (empirical incoming AP/transfer credit profiles)
  enableEmpiricalRetakes: boolean;  // default true (empirical DFW/retake rates from studentdata_anon.csv)
  enableStopOutParityFlips: boolean; // default true (empirical mission/co-op term parity flips)
  // Prerequisite Relaxation Interventions
  prereqMode: 'strict' | 'concurrentCore' | 'waiveMathChem' | 'none'; // default 'strict'
  relaxCbe273To374: boolean;     // default false
  relaxCbe374To376: boolean;     // default false
  relaxCbe376To476: boolean;     // default false
  relaxMath302ToCbe374: boolean; // default false
  relaxChem351ToCbe386: boolean; // default false
}

export interface BottleneckStat {
  courseId: string;
  courseName: string;
  category: CourseCategory;
  timesDelayed: number;
  totalSemestersDelayed: number;
  affectedStudentsCount: number;
  primaryReason: string;
}

export interface SimulationResult {
  cohortSize: number;
  averageGraduationSemesters: number;
  medianGraduationSemesters: number;
  minSemesters: number;
  maxSemesters: number;
  eightSemesterGradRate: number;  // % graduating in <= 8 sem
  tenSemesterGradRate: number;    // % graduating in <= 10 sem
  semesterDistribution: Record<number, number>; // semester -> count of students
  cumulativeGraduation: Array<{ semester: number; rate: number; count: number }>;
  bottlenecks: BottleneckStat[];
  students: Student[];
}

export interface ReferencePlanItem {
  classId: string;
  term: Term;
  semester: number;
}
