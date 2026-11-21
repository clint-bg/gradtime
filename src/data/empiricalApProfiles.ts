/**
 * Empirical Incoming AP / Transfer Credit Profiles
 *
 * Derived directly from the 31 graduating seniors (students completing CBE 451)
 * in `studentdata_anon.csv`. Each entry is an array of catalog `classId`s that
 * an actual student bypassed via AP, IB, or transfer credit before entering
 * Semester 1.
 *
 * Sampling with replacement (bootstrap) from these 31 joint profiles preserves
 * real-world correlations (e.g., Calc BC students skipping both MATH 112 & 113,
 * AP Chem students skipping both CHEM 111 & 112).
 *
 * ClassID reference:
 *  - '006': MATH 112 (4 cr) - 77.4% (24/31)
 *  - '007': MATH 113 (4 cr) - 51.6% (16/31)
 *  - '008': PHYS 121 (3 cr) - 16.1% (5/31)
 *  - '011': CHEM 111 (4 cr) - 45.2% (14/31)
 *  - '012': CHEM 112 (3 cr) - 32.3% (10/31)
 *  - '034': ECON 110 (3 cr) -  9.7% (3/31)
 *  - '036': STAT 121 (3 cr) -  6.5% (2/31)
 *  - '092': WRTG 150 (3 cr) - 71.0% (22/31) [Gen Ed Set 1]
 *  - '093': AHTG 100 (3 cr) - 77.4% (24/31) [Gen Ed Set 1]
 */
export const EMPIRICAL_AP_PROFILES: readonly (readonly string[])[] = [
  [],                                                         // 0 cr
  ['006', '007', '008', '093'],                               // 14 cr
  ['006', '007', '092', '093'],                               // 14 cr
  ['006', '007', '011', '012', '092', '093'],                 // 21 cr
  ['006', '092', '093'],                                      // 10 cr
  ['006', '093'],                                             // 7 cr
  [],                                                         // 0 cr
  ['006', '011', '092'],                                      // 11 cr
  ['006', '007', '008', '011', '012', '092', '093'],          // 24 cr
  ['006', '007', '093'],                                      // 11 cr
  ['006', '011', '012', '092', '093'],                        // 17 cr
  ['006', '092', '093'],                                      // 10 cr
  ['006', '007', '011', '012', '034', '092', '093'],          // 24 cr
  ['093'],                                                    // 3 cr
  ['006', '007', '008', '011', '012', '092', '093'],          // 24 cr
  ['006', '007', '036', '092', '093'],                        // 17 cr
  ['006', '007', '034', '093'],                               // 14 cr
  ['006', '007', '011', '012', '034', '092', '093'],          // 24 cr
  ['006', '007', '092', '093'],                               // 14 cr
  ['036', '092', '093'],                                      // 9 cr
  ['092', '093'],                                             // 6 cr
  ['006', '007', '092', '093'],                               // 14 cr
  ['006', '011', '012'],                                      // 11 cr
  ['006', '092'],                                             // 7 cr
  ['006', '007', '008', '011', '092'],                        // 18 cr
  ['006', '007', '011', '092'],                               // 15 cr
  ['006', '093'],                                             // 7 cr
  ['011', '012', '092', '093'],                               // 13 cr
  ['006', '007', '011', '012', '092', '093'],                 // 21 cr
  ['011', '012', '092', '093'],                               // 13 cr
  ['006', '007', '008', '011', '092', '093'],                 // 21 cr
];

export const EMPIRICAL_AP_SUMMARY = {
  sampleSize: 31,
  avgCredits: 13.4,
  minCredits: 0,
  maxCredits: 24,
  courseRates: [
    { classId: '006', label: 'MATH 112', pct: 77.4 },
    { classId: '007', label: 'MATH 113', pct: 51.6 },
    { classId: '092', label: 'WRTG 150', pct: 71.0 },
    { classId: '093', label: 'AHTG 100', pct: 77.4 },
    { classId: '011', label: 'CHEM 111', pct: 45.2 },
    { classId: '012', label: 'CHEM 112', pct: 32.3 },
    { classId: '008', label: 'PHYS 121', pct: 16.1 },
    { classId: '034', label: 'ECON 110', pct: 9.7 },
    { classId: '036', label: 'STAT 121', pct: 6.5 },
  ],
} as const;

/**
 * Empirical Spring / Summer Enrollment Distribution
 * Derived from the 31 graduating seniors in `studentdata_anon.csv`:
 *  - 23 / 31 (74.2%) took at least one Spring or Summer term.
 *  - Among participating seniors, total Spring/Summer terms taken:
 *    1 term (6), 2 terms (10), 3 terms (4), 4 terms (2), 5 terms (1) [avg ~2.2 terms].
 */
export const EMPIRICAL_SS_PARTICIPATION_RATE = 0.74;

export const EMPIRICAL_SS_TERM_BUDGETS: readonly number[] = [
  1, 1, 1, 1, 1, 1,
  2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
  3, 3, 3, 3,
  4, 4,
  5,
];

/**
 * Empirical Course Retake / DFW Rates (Non-R academic repeats)
 * Derived from all 45 students in `studentdata_anon.csv` (repeats / unique takers).
 */
export const EMPIRICAL_RETAKE_RATES: Readonly<Record<string, number>> = {
  '033': 0.154, // CHEM 467 (6/39)
  '018': 0.128, // CBE 376 (5/39)
  '006': 0.125, // MATH 112 (2/16)
  '032': 0.098, // CHEM 357 (4/41)
  '035': 0.081, // WRTG 316 (3/37)
  '034': 0.079, // ECON 110 (3/38)
  '007': 0.074, // MATH 113 (2/27)
  '005': 0.070, // CBE 273 (3/43)
  '002': 0.070, // CBE 191 (3/43)
  '012': 0.062, // CHEM 112 (2/32)
  '009': 0.056, // MATH 302 (1/18)
  '016': 0.053, // CBE 373 (2/38)
  '036': 0.053, // STAT 121 (2/38)
  '019': 0.050, // CBE 378 (2/40)
  '003': 0.047, // CBE 263 (2/43)
  '008': 0.027, // PHYS 121 (1/37)
  '020': 0.026, // CBE 385 (1/38)
  '021': 0.026, // CBE 386 (1/38)
  '017': 0.024, // CBE 374 (1/41)
};

/**
 * Empirical Stop-Out / Leave Term Parity-Flip Distribution
 * Derived from `studentdata_anon.csv`:
 *  - 10 / 45 (22.2%) of students had a Fall/Winter gap with an odd number of missed
 *    semesters (e.g., 18-month mission or 1-semester co-op), flipping their return
 *    term parity (Fall <-> Winter) relative to once-a-year core CBE offerings.
 *  - Distribution of enrolled Fall/Winter semester immediately preceding the flip:
 *    Sem 1 (1), Sem 2 (4), Sem 3 (2), Sem 5 (2), Sem 7 (1).
 */
export const EMPIRICAL_PARITY_FLIP_RATE = 0.222;
export const EMPIRICAL_PARITY_FLIP_AFTER_SEMS: readonly number[] = [1, 2, 2, 2, 2, 3, 3, 5, 5, 7];

/**
 * Actual Historical Graduating Cohort Reference (n = 31)
 * Derived from all students in `studentdata_anon.csv` who completed Senior Design (CBE 451).
 * Fall/Winter semester counts: 6 sem (1), 8 sem (20), 9 sem (4), 10 sem (5), 11 sem (1).
 */
export const ACTUAL_HISTORICAL_COHORT = {
  cohortSize: 31,
  averageGraduationSemesters: 8.5,
  medianGraduationSemesters: 8,
  eightSemesterGradRate: 67.7,
  tenSemesterGradRate: 96.8,
  semesterDistribution: {
    6: 1,
    8: 20,
    9: 4,
    10: 5,
    11: 1,
  } as Record<number, number>,
};

export interface ActualCoursePathwayStat {
  freshmanPct: number;
  sophomorePct: number;
  juniorPct: number;
  seniorPct: number;
  superSeniorPct: number;
  apSkippedPct: number;
  avgSemester: number;
}

/**
 * Actual Historical Course Placement Percentages for Cohort Flow Map
 * Derived from the 31 graduating seniors in `studentdata_anon.csv` (21 on-time <=8 sem, 10 delayed >8 sem).
 */
export const ACTUAL_COHORT_PATHWAY_STATS: Record<'all' | 'ontime' | 'delayed', { n: number; courses: Record<string, ActualCoursePathwayStat> }> = {
  all: {
    n: 31,
    courses: {
      '001': { freshmanPct: 97, sophomorePct: 0, juniorPct: 0, seniorPct: 0, superSeniorPct: 0, apSkippedPct: 3, avgSemester: 1.3 },
      '006': { freshmanPct: 23, sophomorePct: 0, juniorPct: 0, seniorPct: 0, superSeniorPct: 0, apSkippedPct: 77, avgSemester: 1.4 },
      '011': { freshmanPct: 55, sophomorePct: 0, juniorPct: 0, seniorPct: 0, superSeniorPct: 0, apSkippedPct: 45, avgSemester: 1.1 },
      '005': { freshmanPct: 26, sophomorePct: 74, juniorPct: 0, seniorPct: 0, superSeniorPct: 0, apSkippedPct: 0, avgSemester: 2.8 },
      '003': { freshmanPct: 42, sophomorePct: 58, juniorPct: 0, seniorPct: 0, superSeniorPct: 0, apSkippedPct: 0, avgSemester: 2.6 },
      '017': { freshmanPct: 6, sophomorePct: 77, juniorPct: 16, seniorPct: 0, superSeniorPct: 0, apSkippedPct: 0, avgSemester: 4.1 },
      '016': { freshmanPct: 0, sophomorePct: 6, juniorPct: 61, seniorPct: 29, superSeniorPct: 3, apSkippedPct: 0, avgSemester: 6.4 },
      '021': { freshmanPct: 0, sophomorePct: 6, juniorPct: 84, seniorPct: 6, superSeniorPct: 0, apSkippedPct: 3, avgSemester: 5.2 },
      '018': { freshmanPct: 0, sophomorePct: 6, juniorPct: 61, seniorPct: 29, superSeniorPct: 3, apSkippedPct: 0, avgSemester: 6.4 },
      '023': { freshmanPct: 0, sophomorePct: 0, juniorPct: 3, seniorPct: 81, superSeniorPct: 16, apSkippedPct: 0, avgSemester: 7.4 },
      '026': { freshmanPct: 0, sophomorePct: 0, juniorPct: 3, seniorPct: 77, superSeniorPct: 19, apSkippedPct: 0, avgSemester: 7.5 },
      '025': { freshmanPct: 0, sophomorePct: 0, juniorPct: 3, seniorPct: 65, superSeniorPct: 32, apSkippedPct: 0, avgSemester: 8.5 },
    },
  },
  ontime: {
    n: 21,
    courses: {
      '001': { freshmanPct: 95, sophomorePct: 0, juniorPct: 0, seniorPct: 0, superSeniorPct: 0, apSkippedPct: 5, avgSemester: 1.2 },
      '006': { freshmanPct: 19, sophomorePct: 0, juniorPct: 0, seniorPct: 0, superSeniorPct: 0, apSkippedPct: 81, avgSemester: 1.2 },
      '011': { freshmanPct: 57, sophomorePct: 0, juniorPct: 0, seniorPct: 0, superSeniorPct: 0, apSkippedPct: 43, avgSemester: 1.1 },
      '005': { freshmanPct: 29, sophomorePct: 71, juniorPct: 0, seniorPct: 0, superSeniorPct: 0, apSkippedPct: 0, avgSemester: 2.7 },
      '003': { freshmanPct: 48, sophomorePct: 52, juniorPct: 0, seniorPct: 0, superSeniorPct: 0, apSkippedPct: 0, avgSemester: 2.5 },
      '017': { freshmanPct: 10, sophomorePct: 90, juniorPct: 0, seniorPct: 0, superSeniorPct: 0, apSkippedPct: 0, avgSemester: 3.8 },
      '016': { freshmanPct: 0, sophomorePct: 10, juniorPct: 90, seniorPct: 0, superSeniorPct: 0, apSkippedPct: 0, avgSemester: 5.8 },
      '021': { freshmanPct: 0, sophomorePct: 10, juniorPct: 90, seniorPct: 0, superSeniorPct: 0, apSkippedPct: 0, avgSemester: 4.8 },
      '018': { freshmanPct: 0, sophomorePct: 10, juniorPct: 90, seniorPct: 0, superSeniorPct: 0, apSkippedPct: 0, avgSemester: 5.8 },
      '023': { freshmanPct: 0, sophomorePct: 0, juniorPct: 5, seniorPct: 95, superSeniorPct: 0, apSkippedPct: 0, avgSemester: 6.9 },
      '026': { freshmanPct: 0, sophomorePct: 0, juniorPct: 5, seniorPct: 95, superSeniorPct: 0, apSkippedPct: 0, avgSemester: 6.9 },
      '025': { freshmanPct: 0, sophomorePct: 0, juniorPct: 5, seniorPct: 95, superSeniorPct: 0, apSkippedPct: 0, avgSemester: 7.9 },
    },
  },
  delayed: {
    n: 10,
    courses: {
      '001': { freshmanPct: 100, sophomorePct: 0, juniorPct: 0, seniorPct: 0, superSeniorPct: 0, apSkippedPct: 0, avgSemester: 1.3 },
      '006': { freshmanPct: 30, sophomorePct: 0, juniorPct: 0, seniorPct: 0, superSeniorPct: 0, apSkippedPct: 70, avgSemester: 1.7 },
      '011': { freshmanPct: 50, sophomorePct: 0, juniorPct: 0, seniorPct: 0, superSeniorPct: 0, apSkippedPct: 50, avgSemester: 1.0 },
      '005': { freshmanPct: 20, sophomorePct: 80, juniorPct: 0, seniorPct: 0, superSeniorPct: 0, apSkippedPct: 0, avgSemester: 3.1 },
      '003': { freshmanPct: 30, sophomorePct: 70, juniorPct: 0, seniorPct: 0, superSeniorPct: 0, apSkippedPct: 0, avgSemester: 2.9 },
      '017': { freshmanPct: 0, sophomorePct: 50, juniorPct: 50, seniorPct: 0, superSeniorPct: 0, apSkippedPct: 0, avgSemester: 4.6 },
      '016': { freshmanPct: 0, sophomorePct: 0, juniorPct: 0, seniorPct: 90, superSeniorPct: 10, apSkippedPct: 0, avgSemester: 7.7 },
      '021': { freshmanPct: 0, sophomorePct: 0, juniorPct: 70, seniorPct: 20, superSeniorPct: 0, apSkippedPct: 10, avgSemester: 6.0 },
      '018': { freshmanPct: 0, sophomorePct: 0, juniorPct: 0, seniorPct: 90, superSeniorPct: 10, apSkippedPct: 0, avgSemester: 7.7 },
      '023': { freshmanPct: 0, sophomorePct: 0, juniorPct: 0, seniorPct: 50, superSeniorPct: 50, apSkippedPct: 0, avgSemester: 8.5 },
      '026': { freshmanPct: 0, sophomorePct: 0, juniorPct: 0, seniorPct: 40, superSeniorPct: 60, apSkippedPct: 0, avgSemester: 8.7 },
      '025': { freshmanPct: 0, sophomorePct: 0, juniorPct: 0, seniorPct: 0, superSeniorPct: 100, apSkippedPct: 0, avgSemester: 9.7 },
    },
  },
};
