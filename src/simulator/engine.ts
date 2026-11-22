import {
  Course,
  CourseCategory,
  Student,
  Term,
  Interventions,
  SimulationResult,
  BottleneckStat,
  StudentSemesterLog
} from './types';
import { INITIAL_COURSES } from '../data/classDetailsData';
import {
  EMPIRICAL_AP_PROFILES,
  EMPIRICAL_SS_PARTICIPATION_RATE,
  EMPIRICAL_SS_TERM_BUDGETS,
  EMPIRICAL_RETAKE_RATES,
  EMPIRICAL_PARITY_FLIP_RATE,
  EMPIRICAL_PARITY_FLIP_AFTER_SEMS,
} from '../data/empiricalApProfiles';

// Lab course -> corresponding lecture course mapping (can be taken concurrently or afterwards)
const LAB_COREQUISITES: Record<string, string> = {
  '013': '017', // CBE 285 (Fluids lab, 0.5 cr) paired with CBE 374 (Fluid mechanics)
  '015': '021', // CBE 345 (Reactions lab, 0.5 cr) paired with CBE 386 (Chemical reactions eng)
  '020': '018', // CBE 385 (Heat & mass lab, 0.5 cr) paired with CBE 376 (Heat & mass transfer)
  '024': '026', // CBE 445 (Separations lab, 0.5 cr) paired with CBE 476 (Separations)
};

// Normal distribution box-muller transform
function sampleNormal(mean: number, stdDev: number): number {
  let u = 0, v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  const num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  return mean + num * stdDev;
}

export function isCourseOffered(c: Course, currentTerm: Term, sem: number): boolean {
  for (const t of c.termsTaught) {
    if (t === currentTerm) return true;
    if (t.startsWith(currentTerm)) {
      if (t.toLowerCase().includes('every other')) {
        const academicYear = Math.ceil(sem / 2);
        return academicYear % 2 === 1;
      }
      return true;
    }
  }
  return false;
}

export function isCourseExempted(classId: string, interventions: Interventions): boolean {
  if (classId === '035' && interventions.removeWrtg316) return true;
  if (classId === '034' && interventions.removeEcon110) return true;
  if (classId === '010' && interventions.removeMath303) return true;
  if (classId === '038' && interventions.removeChem464) return true;
  if (classId === '036' && interventions.removeStat121) return true;
  if ((classId === '002' || classId === '004' || classId === '022') && interventions.removeCbeSeminars) return true;
  if (classId === '023' && interventions.removeCbe436) return true;
  if (classId === '026' && interventions.removeCbe476) return true;
  if (classId === '024' && interventions.removeCbe445) return true;
  return false;
}

export function getDefaultInterventions(): Interventions {
  return {
    offeringOverrides: {},
    relCreditsRequired: 14,
    engCreditsRequired: 12,
    emsbCreditsRequired: 4,
    epselCreditsRequired: 3,
    genEdSet: 1,
    creditOverrides: {},
    prereqOverrides: {},
    removeWrtg316: false,
    removeEcon110: false,
    removeMath303: false,
    removeChem464: true,
    removeStat121: false,
    removeCbeSeminars: false,
    removeCbe436: false,
    removeCbe476: false,
    removeCbe445: false,
    populationMeanCredits: 17.0,
    populationStdDevCredits: 1.6,
    workingPercentage: 0.30,
    workPenaltyCredits: 2.5,
    enableSpringSummer: false,
    springSummerParticipationRate: EMPIRICAL_SS_PARTICIPATION_RATE,
    enableApTransferCredits: true,
    enableEmpiricalRetakes: true,
    enableStopOutParityFlips: true,
    prereqMode: 'strict',
    relaxCbe273To374: false,
    relaxCbe374To376: false,
    relaxCbe376To476: false,
    relaxMath302ToCbe374: false,
    relaxChem351ToCbe386: false,
  };
}

// Compute prerequisite DAG depth for critical path prioritization
function computeCourseDepths(coursesMap: Map<string, Course>): Map<string, number> {
  const depthMap = new Map<string, number>();

  function getDepth(classId: string, visited = new Set<string>()): number {
    if (depthMap.has(classId)) return depthMap.get(classId)!;
    if (visited.has(classId)) return 0; // handle potential cycles safely
    visited.add(classId);

    const course = coursesMap.get(classId);
    if (!course || course.prereqs.length === 0) {
      depthMap.set(classId, 0);
      return 0;
    }

    let maxPrereqDepth = 0;
    for (const prereqId of course.prereqs) {
      const d = getDepth(prereqId, new Set(visited));
      if (d > maxPrereqDepth) maxPrereqDepth = d;
    }
    const depth = maxPrereqDepth + 1;
    depthMap.set(classId, depth);
    return depth;
  }

  for (const classId of coursesMap.keys()) {
    getDepth(classId);
  }
  return depthMap;
}

// Topological downstream dependency depth (how many dependent courses rely on this course)
function computeDownstreamWeights(coursesMap: Map<string, Course>): Map<string, number> {
  const weightMap = new Map<string, number>();

  // Count how many courses directly or indirectly require classId
  for (const [id, course] of coursesMap.entries()) {
    const dependents = new Set<string>();
    const stack = [id];
    while (stack.length > 0) {
      const current = stack.pop()!;
      for (const [otherId, otherCourse] of coursesMap.entries()) {
        if (otherCourse.prereqs.includes(current) && !dependents.has(otherId)) {
          dependents.add(otherId);
          stack.push(otherId);
        }
      }
    }
    weightMap.set(id, dependents.size);
  }
  return weightMap;
}

export function runSimulation(
  cohortSize = 250,
  customInterventions?: Partial<Interventions>,
  courses: Course[] = INITIAL_COURSES
): SimulationResult {
  const interventions: Interventions = {
    ...getDefaultInterventions(),
    ...customInterventions,
  };

  // Build course dictionary applying credit & prerequisite overrides
  const coursesMap = new Map<string, Course>();
  for (const c of courses) {
    const overrideCredits = interventions.creditOverrides[c.classId] !== undefined
      ? interventions.creditOverrides[c.classId]
      : c.credits;
    let overridePrereqs = interventions.prereqOverrides[c.classId] !== undefined
      ? interventions.prereqOverrides[c.classId]
      : c.prereqs;
    let overrideConcurrent = [...c.concurrentPrereqs];

    // Global Prerequisite Modes
    if (interventions.prereqMode === 'none') {
      overridePrereqs = [];
      overrideConcurrent = [];
    } else if (interventions.prereqMode === 'concurrentCore') {
      if (c.classId === '017') overrideConcurrent.push('005');
      if (c.classId === '018') overrideConcurrent.push('017');
      if (c.classId === '026' || c.classId === '023') overrideConcurrent.push('018');
    } else if (interventions.prereqMode === 'waiveMathChem') {
      if (c.classId === '017') overridePrereqs = overridePrereqs.filter(pId => pId !== '007');
      if (c.classId === '021') overridePrereqs = overridePrereqs.filter(pId => pId !== '032');
    }

    // Individual Prerequisite Toggles
    if (interventions.relaxCbe273To374 && c.classId === '017') {
      overrideConcurrent.push('005');
    }
    if (interventions.relaxCbe374To376 && c.classId === '018') {
      overrideConcurrent.push('017');
    }
    if (interventions.relaxCbe376To476 && (c.classId === '026' || c.classId === '023')) {
      overrideConcurrent.push('018');
    }
    if (interventions.relaxMath302ToCbe374 && c.classId === '017') {
      overridePrereqs = overridePrereqs.filter(pId => pId !== '007');
    }
    if (interventions.relaxChem351ToCbe386 && c.classId === '021') {
      overridePrereqs = overridePrereqs.filter(pId => pId !== '032');
    }

    // Filter out removed course requirements from any course prerequisites
    if (interventions.removeWrtg316) {
      overridePrereqs = overridePrereqs.filter(pId => pId !== '035');
    }
    if (interventions.removeEcon110) {
      overridePrereqs = overridePrereqs.filter(pId => pId !== '034');
    }
    if (interventions.removeMath303) {
      overridePrereqs = overridePrereqs.filter(pId => pId !== '010');
    }
    if (interventions.removeChem464) {
      overridePrereqs = overridePrereqs.filter(pId => pId !== '038');
    }
    if (interventions.removeCbe436) {
      overridePrereqs = overridePrereqs.filter(pId => pId !== '023');
    }
    if (interventions.removeCbe476) {
      overridePrereqs = overridePrereqs.filter(pId => pId !== '026');
    }
    if (interventions.removeCbe445) {
      overridePrereqs = overridePrereqs.filter(pId => pId !== '024');
    }

    const overrideTerms = interventions.offeringOverrides[c.classId] !== undefined
      ? interventions.offeringOverrides[c.classId]
      : c.termsTaught;

    coursesMap.set(c.classId, {
      ...c,
      credits: overrideCredits,
      prereqs: overridePrereqs,
      concurrentPrereqs: overrideConcurrent,
      termsTaught: overrideTerms,
    });
  }

  const downstreamWeights = computeDownstreamWeights(coursesMap);

  // Initialize students
  const students: Student[] = [];
  for (let i = 1; i <= cohortSize; i++) {
    const rawCreditPref = sampleNormal(
      interventions.populationMeanCredits,
      interventions.populationStdDevCredits
    );
    const maxCreditHours = Math.min(20, Math.max(12, Math.round(rawCreditPref * 2) / 2));
    const isWorking = Math.random() < interventions.workingPercentage;
    const workCreditPenalty = isWorking ? interventions.workPenaltyCredits : 0;
    const effectiveCreditLimit = Math.max(12, Math.round((maxCreditHours - workCreditPenalty) * 2) / 2);

    // Sample empirical incoming AP / transfer credit profile (preserving joint correlations)
    let incomingApCourses: string[] = [];
    if (interventions.enableApTransferCredits && EMPIRICAL_AP_PROFILES.length > 0) {
      const sampledProfile = EMPIRICAL_AP_PROFILES[Math.floor(Math.random() * EMPIRICAL_AP_PROFILES.length)];
      const activeGenSetStr = interventions.genEdSet.toString();
      incomingApCourses = sampledProfile.filter(cid => {
        const course = coursesMap.get(cid);
        if (!course) return false;
        if (isCourseExempted(cid, interventions)) return false;
        if (course.category === 'Gen' && course.genEdSets.length > 0 && !course.genEdSets.includes(activeGenSetStr)) {
          return false;
        }
        return true;
      });
    }

    // Sample empirical Spring / Summer term budget
    let springSummerBudget = 0;
    if (interventions.enableSpringSummer) {
      springSummerBudget = 99; // Universal policy: eligible every summer
    } else if (Math.random() < interventions.springSummerParticipationRate) {
      springSummerBudget = EMPIRICAL_SS_TERM_BUDGETS[Math.floor(Math.random() * EMPIRICAL_SS_TERM_BUDGETS.length)];
    }

    // Sample empirical stop-out / mission / co-op term parity flip
    let parityFlipAfterSem: number | undefined = undefined;
    if (interventions.enableStopOutParityFlips && Math.random() < EMPIRICAL_PARITY_FLIP_RATE) {
      parityFlipAfterSem = EMPIRICAL_PARITY_FLIP_AFTER_SEMS[Math.floor(Math.random() * EMPIRICAL_PARITY_FLIP_AFTER_SEMS.length)];
    }

    students.push({
      id: `STD-${1000 + i}`,
      name: `Student ${i}`,
      meanCreditHours: interventions.populationMeanCredits,
      stdDevCreditHours: interventions.populationStdDevCredits,
      maxCreditHours,
      isWorking,
      workCreditPenalty,
      effectiveCreditLimit,
      currentSemester: 1,
      currentTerm: 'Fall',
      incomingApCourses,
      springSummerBudget,
      springSummerUsed: 0,
      parityFlipAfterSem,
      retakenCourses: [],
      completedCourses: new Set<string>(incomingApCourses),
      failedPrereqs: [],
      isGraduated: false,
      semesterHistory: [],
    });
  }

  const bottleneckCounter = new Map<string, { timesDelayed: number; totalSemesters: number; studentSet: Set<string> }>();

  // Run simulation semester by semester up to max 20 semesters
  const MAX_SEMESTERS = 20;

  for (let sem = 1; sem <= MAX_SEMESTERS; sem++) {
    let activeStudents = 0;

    for (const student of students) {
      if (student.isGraduated) continue;
      activeStudents++;

      student.currentSemester = sem;
      // Term cycle: odd semesters = Fall, even semesters = Winter (shifted if student returned off-cycle from a leave/mission/co-op)
      const isParityFlipped = student.parityFlipAfterSem !== undefined && sem > student.parityFlipAfterSem;
      const currentTerm: Term = ((sem + (isParityFlipped ? 1 : 0)) % 2 === 1) ? 'Fall' : 'Winter';
      student.currentTerm = currentTerm;

      // Calculate completed credits per category so far
      let completedRelCredits = 0;
      let completedEngCredits = 0;
      let completedEmsbCredits = 0;
      let completedEpselCredits = 0;

      for (const classId of student.completedCourses) {
        const c = coursesMap.get(classId);
        if (!c) continue;
        if (c.category === 'Rel') completedRelCredits += c.credits;
        else if (c.category === 'Eng') completedEngCredits += c.credits;
        else if (c.category === 'EMSB') completedEmsbCredits += c.credits;
        else if (c.category === 'EPSEL') {
          completedEpselCredits += c.credits;
          completedEngCredits += c.credits; // EPSEL Capstone/Thesis credits count towards ENG elective
        }
      }

      // Identify unfulfilled requirements
      const neededCourses: Course[] = [];

      for (const c of coursesMap.values()) {
        if (student.completedCourses.has(c.classId)) continue;

        // Skip removed course requirements
        if (isCourseExempted(c.classId, interventions)) continue;

        // Check substitution rules
        if (c.substitutionAllowed && c.substitutionClassIds.length > 0) {
          const subDone = c.substitutionClassIds.some(subId => student.completedCourses.has(subId));
          if (subDone) continue;
        }

        if (c.category === 'Major') {
          neededCourses.push(c);
        } else if (c.category === 'Gen') {
          const genMatch = c.genEdSets.length === 0 || c.genEdSets.includes(interventions.genEdSet.toString());
          if (genMatch) {
            neededCourses.push(c);
          }
        } else if (c.category === 'Rel' && completedRelCredits < interventions.relCreditsRequired) {
          neededCourses.push(c);
        } else if (c.category === 'Eng') {
          const epselNeeded = Math.max(0, interventions.epselCreditsRequired - completedEpselCredits);
          if (completedEngCredits < interventions.engCreditsRequired - epselNeeded) {
            neededCourses.push(c);
          }
        } else if (c.category === 'EMSB' && completedEmsbCredits < interventions.emsbCreditsRequired) {
          neededCourses.push(c);
        } else if (c.category === 'EPSEL') {
          if (completedEpselCredits < interventions.epselCreditsRequired || (completedEngCredits < interventions.engCreditsRequired && completedEpselCredits < 6)) {
            neededCourses.push(c);
          }
        }
      }

      // Check prerequisites for needed courses
      const eligibleCourses: Course[] = [];
      const bottleneckNotes: string[] = [];

      for (const c of neededCourses) {
        // Enforce standing / year restrictions:
        // CBE 291 (classId '004') cannot be taken in Year 1 (semesters 1 & 2)
        // CBE 391 (classId '022') cannot be taken in Year 1 or Year 2 (semesters 1 through 4)
        // CHEM 357 (classId '032') requires Sophomore standing or completed CHEM 112 ('012')
        // CHEM 467 (classId '033') requires Junior standing (semesters 5+), aligning CBE 373 to Junior Winter
        // EPSEL Senior Capstone/Thesis courses require Senior standing (semesters 7+)
        if (c.classId === '004' && sem <= 2) continue;
        if (c.classId === '022' && sem <= 4) continue;
        if (c.classId === '032' && sem <= 2 && !student.completedCourses.has('012')) continue;
        if (c.classId === '033' && sem <= 4) continue;
        if (c.category === 'EPSEL' && sem <= 6) continue;
        // Evaluate missing prerequisites, accounting for concurrent enrollment allowed (c.concurrentPrereqs)
        const missingPrereqs = c.prereqs.filter(pId => {
          if (student.completedCourses.has(pId)) return false;

          // Check if pId is allowed for concurrent enrollment for course c
          if (c.concurrentPrereqs && c.concurrentPrereqs.includes(pId)) {
            const pCourse = coursesMap.get(pId);
            if (pCourse) {
              const pPrereqsMet = pCourse.prereqs.every(reqId => student.completedCourses.has(reqId));
              const pOffered = isCourseOffered(pCourse, currentTerm, sem);
              if (pPrereqsMet && pOffered) {
                return false; // Allowed concurrently!
              }
            }
          }

          // Check fallback LAB_COREQUISITES mapping
          const lectureId = LAB_COREQUISITES[c.classId];
          if (lectureId === pId) {
            const lectureCompleted = student.completedCourses.has(lectureId);
            const lectureCourse = coursesMap.get(lectureId);
            const lecturePrereqsMet = lectureCourse
              ? lectureCourse.prereqs.every(reqId => student.completedCourses.has(reqId))
              : false;
            const lectureOffered = lectureCourse ? isCourseOffered(lectureCourse, currentTerm, sem) : false;
            if (lectureCompleted || (lecturePrereqsMet && lectureOffered)) {
              return false;
            }
          }

          return true;
        });

        const isOffered = isCourseOffered(c, currentTerm, sem);
        const isPrereqSatisfied = missingPrereqs.length === 0;

        if (!isPrereqSatisfied) {
          if (c.category === 'Major') {
            student.failedPrereqs.push({
              courseId: c.classId,
              missingPrereqId: missingPrereqs[0] || lectureId || '',
              semester: sem,
            });
          }
        } else if (!isOffered) {
          if (c.category === 'Major') {
            const note = `${c.deptCode} ${c.classNumber} not offered in ${currentTerm} (Offered: ${c.termsTaught.join(', ')})`;
            bottleneckNotes.push(note);

            // Log bottleneck statistic
            const b = bottleneckCounter.get(c.classId) || { timesDelayed: 0, totalSemesters: 0, studentSet: new Set() };
            b.timesDelayed++;
            b.totalSemesters++;
            b.studentSet.add(student.id);
            bottleneckCounter.set(c.classId, b);
          }
        } else {
          eligibleCourses.push(c);
        }
      }

      // Sort eligible courses by priority
      // Priority 1: Downstream prerequisite weight (critical path major classes first)
      // Priority 2: Major category courses
      // Priority 3: Gen Ed courses
      // Priority 4: Religion & Electives
      
      // Priority sorting:
      // Critical path major courses (downstreamWeights > 0) get highest priority.
      // Gen Ed & Religion courses get steady priority (+50 / +40) so students take them evenly throughout semesters.
      // Non-critical electives fill remaining slots.
      eligibleCourses.sort((a, b) => {
        const getPriorityWeight = (c: Course): number => {
          const ds = downstreamWeights.get(c.classId) || 0;
          if (c.category === 'Major') {
            if (ds > 0) return 100 + ds * 10;
            return sem >= 7 ? 75 : 42;
          }
          if (c.category === 'EPSEL') {
            return sem >= 7 ? 85 : 30;
          }
          if (c.category === 'Eng' || c.category === 'EMSB') {
            return sem >= 5 ? 52 : 30;
          }
          if (c.category === 'Gen') return 55;
          if (c.category === 'Rel') return 45;
          return 30;
        };

        return getPriorityWeight(b) - getPriorityWeight(a);
      });

      // Flexible credit capacity near senior year or bottleneck
      let termCreditLimit = student.effectiveCreditLimit;

      // Fill schedule up to credit limit
      let currentCredits = 0;
      const enrolledIds: string[] = [];

      // Dynamic running count for category caps within this semester
      let runningRelCredits = completedRelCredits;
      let runningEngCredits = completedEngCredits;
      let runningEmsbCredits = completedEmsbCredits;
      let runningEpselCredits = completedEpselCredits;

      // Mandatory requirement: UNIV 101 (classId '091') in first semester
      if (sem === 1 && !student.completedCourses.has('091')) {
        const univ101 = coursesMap.get('091');
        if (univ101) {
          enrolledIds.push('091');
          currentCredits += univ101.credits;
        }
      }

      for (const c of eligibleCourses) {
        if (enrolledIds.includes(c.classId)) continue;

        // Strict Category Credit Caps:
        // Eng: required 12 cr (interventions.engCreditsRequired, includes EPSEL)
        // EMSB: required 4 cr (interventions.emsbCreditsRequired)
        // EPSEL: required 3 cr, max 6 cr accepted
        // Rel: required 14 cr (interventions.relCreditsRequired)
        const epselNeeded = Math.max(0, interventions.epselCreditsRequired - runningEpselCredits);
        if (c.category === 'Rel' && runningRelCredits >= interventions.relCreditsRequired) continue;
        if (c.category === 'Eng' && runningEngCredits >= interventions.engCreditsRequired - epselNeeded) continue;
        if (c.category === 'EMSB' && runningEmsbCredits >= interventions.emsbCreditsRequired) continue;
        if (c.category === 'EPSEL') {
          if (runningEpselCredits >= interventions.epselCreditsRequired && runningEngCredits >= interventions.engCreditsRequired) continue;
          if (runningEpselCredits >= Math.max(interventions.epselCreditsRequired, 6)) continue;
        }

        if (currentCredits + c.credits <= termCreditLimit + 0.5) {
          enrolledIds.push(c.classId);
          currentCredits += c.credits;

          if (c.category === 'Rel') runningRelCredits += c.credits;
          else if (c.category === 'Eng') runningEngCredits += c.credits;
          else if (c.category === 'EMSB') runningEmsbCredits += c.credits;
          else if (c.category === 'EPSEL') {
            runningEpselCredits += c.credits;
            runningEngCredits += c.credits; // EPSEL counts towards Eng electives
          }

          // Check if this course is a lecture paired with a concurrent lab
          for (const [labId, lecId] of Object.entries(LAB_COREQUISITES)) {
            if (lecId === c.classId && !isCourseExempted(labId, interventions) && !student.completedCourses.has(labId) && !enrolledIds.includes(labId)) {
              const labCourse = coursesMap.get(labId);
              if (labCourse && isCourseOffered(labCourse, currentTerm, sem)) {
                if (currentCredits + labCourse.credits <= student.maxCreditHours + 0.5) {
                  enrolledIds.push(labId);
                  currentCredits += labCourse.credits;
                }
              }
            }
          }
        } else if (c.category === 'Major' && currentCredits + c.credits <= student.maxCreditHours + 0.5) {
          // Allow flex credit for critical major class
          enrolledIds.push(c.classId);
          currentCredits += c.credits;

          // Check if this course is a lecture paired with a concurrent lab
          for (const [labId, lecId] of Object.entries(LAB_COREQUISITES)) {
            if (lecId === c.classId && !isCourseExempted(labId, interventions) && !student.completedCourses.has(labId) && !enrolledIds.includes(labId)) {
              const labCourse = coursesMap.get(labId);
              if (labCourse && isCourseOffered(labCourse, currentTerm, sem)) {
                if (currentCredits + labCourse.credits <= student.maxCreditHours + 0.5) {
                  enrolledIds.push(labId);
                  currentCredits += labCourse.credits;
                }
              }
            }
          }
        }
      }

      // Log return from stop-out / leave if parity flipped starting this semester
      if (student.parityFlipAfterSem !== undefined && sem === student.parityFlipAfterSem + 1) {
        bottleneckNotes.unshift(`Returned from leave/mission/co-op — term parity shifted to ${currentTerm}`);
      }

      // Mark enrolled courses completed at end of semester (accounting for empirical DFW/retake probability)
      // In actual data, 33.3% of students (15/45) account for all academic retakes (clustered risk rather than independent across 100% of students).
      const studentIdx = parseInt(student.id.replace('STD-', ''), 10) - 1000;
      const isRetakeProne = ((studentIdx * 2654435761) >>> 0) / 4294967296 < 0.42;
      for (const classId of enrolledIds) {
        if (interventions.enableEmpiricalRetakes && isRetakeProne) {
          const baseProb = EMPIRICAL_RETAKE_RATES[classId] || 0;
          const retakeProb = Math.min(0.35, baseProb * 2.0);
          if (retakeProb > 0 && !student.retakenCourses.includes(classId) && Math.random() < retakeProb) {
            student.retakenCourses.push(classId);
            const failedCourse = coursesMap.get(classId);
            if (failedCourse) {
              bottleneckNotes.push(`Retake required next offering: ${failedCourse.deptCode} ${failedCourse.classNumber}`);
            }
            continue; // Do not mark completed yet; will retake in next available term
          }
        }
        student.completedCourses.add(classId);
      }

      // Log semester transcript history
      const log: StudentSemesterLog = {
        semester: sem,
        term: currentTerm,
        targetCreditLimit: termCreditLimit,
        enrolledCourseIds: enrolledIds,
        totalCredits: currentCredits,
        bottleneckNotes,
      };
      student.semesterHistory.push(log);

      // Run optional Spring/Summer term after Winter semester (either universal policy or empirical student budget)
      if ((interventions.enableSpringSummer || student.springSummerUsed < student.springSummerBudget) && currentTerm === 'Winter' && !student.isGraduated) {
        let ssRelDone = 0;
        let ssEngDone = 0;
        let ssEmsbDone = 0;
        let ssEpselDone = 0;

        for (const classId of student.completedCourses) {
          const c = coursesMap.get(classId);
          if (!c) continue;
          if (c.category === 'Rel') ssRelDone += c.credits;
          else if (c.category === 'Eng') ssEngDone += c.credits;
          else if (c.category === 'EMSB') ssEmsbDone += c.credits;
          else if (c.category === 'EPSEL') {
            ssEpselDone += c.credits;
            ssEngDone += c.credits;
          }
        }

        const ssEligible: Course[] = [];
        for (const c of coursesMap.values()) {
          if (student.completedCourses.has(c.classId)) continue;
          if (isCourseExempted(c.classId, interventions)) continue;

          if (c.substitutionAllowed && c.substitutionClassIds.length > 0) {
            const subDone = c.substitutionClassIds.some(subId => student.completedCourses.has(subId));
            if (subDone) continue;
          }

          if (c.classId === '004' && sem <= 2) continue;
          if (c.classId === '022' && sem <= 4) continue;
          if (c.classId === '032' && sem <= 2 && !student.completedCourses.has('012')) continue;
          if (c.classId === '033' && sem <= 4) continue;
          if (c.category === 'EPSEL' && sem <= 6) continue;

          const missingPrereqs = c.prereqs.filter(pId => !student.completedCourses.has(pId));
          if (missingPrereqs.length > 0) continue;

          const isSpringSummerOffered = c.termsTaught.includes('Spring') || c.termsTaught.includes('Summer');
          const isGenEdOrRel = c.category === 'Gen' || c.category === 'Rel';
          const ssEpselNeeded = Math.max(0, interventions.epselCreditsRequired - ssEpselDone);

          // General education & Religion are available in Spring/Summer.
          // Engineering courses (Major, Eng, EMSB, EPSEL) are NOT taught in Spring/Summer unless explicitly listed in classdetails.csv.
          if (isGenEdOrRel || isSpringSummerOffered) {
            if (c.category === 'Gen') {
              const genMatch = c.genEdSets.length === 0 || c.genEdSets.includes(interventions.genEdSet.toString());
              if (genMatch) ssEligible.push(c);
            }
            else if (c.category === 'Rel' && ssRelDone < interventions.relCreditsRequired) ssEligible.push(c);
            else if (c.category === 'Eng' && isSpringSummerOffered && ssEngDone < interventions.engCreditsRequired - ssEpselNeeded) ssEligible.push(c);
            else if (c.category === 'EMSB' && isSpringSummerOffered && ssEmsbDone < interventions.emsbCreditsRequired) ssEligible.push(c);
            else if (c.category === 'EPSEL' && isSpringSummerOffered && (ssEpselDone < interventions.epselCreditsRequired || (ssEngDone < interventions.engCreditsRequired && ssEpselDone < 6))) ssEligible.push(c);
            else if (c.category === 'Major' && isSpringSummerOffered) ssEligible.push(c);
          }
        }

        let ssCredits = 0;
        const ssEnrolled: string[] = [];
        for (const c of ssEligible) {
          const ssEpselNeeded = Math.max(0, interventions.epselCreditsRequired - ssEpselDone);
          if (c.category === 'Rel' && ssRelDone >= interventions.relCreditsRequired) continue;
          if (c.category === 'Eng' && ssEngDone >= interventions.engCreditsRequired - ssEpselNeeded) continue;
          if (c.category === 'EMSB' && ssEmsbDone >= interventions.emsbCreditsRequired) continue;
          if (c.category === 'EPSEL') {
            if (ssEpselDone >= interventions.epselCreditsRequired && ssEngDone >= interventions.engCreditsRequired) continue;
            if (ssEpselDone >= Math.max(interventions.epselCreditsRequired, 6)) continue;
          }

          if (ssCredits + c.credits <= 6.5) {
            ssEnrolled.push(c.classId);
            ssCredits += c.credits;
            student.completedCourses.add(c.classId);

            if (c.category === 'Rel') ssRelDone += c.credits;
            else if (c.category === 'Eng') ssEngDone += c.credits;
            else if (c.category === 'EMSB') ssEmsbDone += c.credits;
            else if (c.category === 'EPSEL') {
              ssEpselDone += c.credits;
              ssEngDone += c.credits;
            }
          }
        }

        if (ssEnrolled.length > 0) {
          student.springSummerUsed += 1;
          student.semesterHistory.push({
            semester: sem,
            term: 'Spring',
            targetCreditLimit: 6,
            enrolledCourseIds: ssEnrolled,
            totalCredits: ssCredits,
            bottleneckNotes: [`Spring/Summer Term: Completed ${ssCredits} cr of GenEd/Rel/Electives`],
          });
        }
      }

      // Verify graduation requirement completion
      let relDone = 0;
      let engDone = 0;
      let emsbDone = 0;
      let epselDone = 0;

      for (const classId of student.completedCourses) {
        const c = coursesMap.get(classId);
        if (!c) continue;
        if (c.category === 'Rel') relDone += c.credits;
        else if (c.category === 'Eng') engDone += c.credits;
        else if (c.category === 'EMSB') emsbDone += c.credits;
        else if (c.category === 'EPSEL') {
          epselDone += c.credits;
          engDone += c.credits; // EPSEL counts towards Eng electives
        }
      }

      const majorCoursesAll = Array.from(coursesMap.values()).filter(c => c.category === 'Major');
      const majorFinished = majorCoursesAll.every(c => {
        if (isCourseExempted(c.classId, interventions)) return true;
        if (student.completedCourses.has(c.classId)) return true;
        if (c.substitutionAllowed && c.substitutionClassIds.some(subId => student.completedCourses.has(subId))) return true;
        return false;
      });

      const activeGenSetStr = interventions.genEdSet.toString();
      const genCoursesAll = Array.from(coursesMap.values()).filter(c =>
        c.category === 'Gen' && (c.genEdSets.length === 0 || c.genEdSets.includes(activeGenSetStr))
      );
      const genFinished = genCoursesAll.every(c => {
        if (isCourseExempted(c.classId, interventions)) return true;
        if (student.completedCourses.has(c.classId)) return true;
        if (c.substitutionAllowed && c.substitutionClassIds.some(subId => student.completedCourses.has(subId))) return true;
        return false;
      });

      const relFinished = relDone >= interventions.relCreditsRequired;
      const engFinished = engDone >= interventions.engCreditsRequired;
      const emsbFinished = emsbDone >= interventions.emsbCreditsRequired;
      const epselFinished = epselDone >= interventions.epselCreditsRequired;

      if (majorFinished && genFinished && relFinished && engFinished && emsbFinished && epselFinished) {
        student.isGraduated = true;
        student.graduationSemester = sem;
      }
    }

    if (activeStudents === 0) break;
  }

  // Handle any remaining ungraduated students by capping at MAX_SEMESTERS
  for (const s of students) {
    if (!s.isGraduated) {
      s.graduationSemester = MAX_SEMESTERS;
    }
  }

  // Compute simulation stats
  const semList = students.map(s => s.graduationSemester!);
  const sumSem = semList.reduce((a, b) => a + b, 0);
  const averageGraduationSemesters = Math.round((sumSem / cohortSize) * 10) / 10;

  semList.sort((a, b) => a - b);
  const medianGraduationSemesters = semList[Math.floor(cohortSize / 2)];
  const minSemesters = semList[0];
  const maxSemesters = semList[cohortSize - 1];

  const eightSemCount = semList.filter(s => s <= 8).length;
  const tenSemCount = semList.filter(s => s <= 10).length;
  const eightSemesterGradRate = Math.round((eightSemCount / cohortSize) * 100);
  const tenSemesterGradRate = Math.round((tenSemCount / cohortSize) * 100);

  const semesterDistribution: Record<number, number> = {};
  for (const sem of semList) {
    semesterDistribution[sem] = (semesterDistribution[sem] || 0) + 1;
  }

  // Build cumulative graduation curve data
  const cumulativeGraduation: Array<{ semester: number; rate: number; count: number }> = [];
  let cumCount = 0;
  for (let s = 6; s <= 14; s++) {
    const countAtSem = semesterDistribution[s] || 0;
    cumCount += countAtSem;
    cumulativeGraduation.push({
      semester: s,
      count: cumCount,
      rate: Math.round((cumCount / cohortSize) * 100),
    });
  }

  // Convert bottleneck counter to sorted array
  const bottlenecks: BottleneckStat[] = [];
  for (const [classId, stat] of bottleneckCounter.entries()) {
    const course = coursesMap.get(classId);
    if (!course) continue;
    bottlenecks.push({
      courseId: classId,
      courseName: `${course.deptCode} ${course.classNumber} - ${course.topic}`,
      category: course.category,
      timesDelayed: stat.timesDelayed,
      totalSemestersDelayed: stat.totalSemesters,
      affectedStudentsCount: stat.studentSet.size,
      primaryReason: `Course offered in ${course.termsTaught.join(', ')} only`,
    });
  }
  bottlenecks.sort((a, b) => b.timesDelayed - a.timesDelayed);

  return {
    cohortSize,
    averageGraduationSemesters,
    medianGraduationSemesters,
    minSemesters,
    maxSemesters,
    eightSemesterGradRate,
    tenSemesterGradRate,
    semesterDistribution,
    cumulativeGraduation,
    bottlenecks,
    students,
  };
}
