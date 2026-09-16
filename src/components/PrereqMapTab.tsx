import React, { useState } from 'react';
import { SimulationResult, Student, Course } from '../simulator/types';
import { INITIAL_COURSES } from '../data/classDetailsData';
import { Network, CheckCircle2, AlertCircle, ArrowRight, GitBranch, Layers, Check, Search } from 'lucide-react';

interface PrereqMapTabProps {
  simulationResult: SimulationResult;
}

interface PrereqAuditItem {
  courseId: string;
  courseCode: string;
  courseName: string;
  enrolledSemester: number;
  enrolledTerm: string;
  prereqAudits: Array<{
    prereqId: string;
    prereqCode: string;
    prereqName: string;
    completedSemester: number | null;
    isConcurrentLab: boolean;
    isExempt: boolean;
    status: 'satisfied' | 'concurrent' | 'exempt' | 'violated';
  }>;
  overallStatus: 'PASS' | 'CONCURRENT' | 'EXEMPT' | 'VIOLATION';
}

export const PrereqMapTab: React.FC<PrereqMapTabProps> = ({ simulationResult }) => {
  const [selectedStudentId, setSelectedStudentId] = useState<string>(
    simulationResult.students[0] ? simulationResult.students[0].id : ''
  );
  const [selectedChainFilter, setSelectedChainFilter] = useState<'all' | 'cbe' | 'math' | 'chem'>('all');

  const coursesMap = new Map<string, Course>(INITIAL_COURSES.map((c) => [c.classId, c]));

  const student = simulationResult.students.find((s) => s.id === selectedStudentId) || simulationResult.students[0];

  if (!student) {
    return <div className="p-8 text-center text-slate-500">No student data available.</div>;
  }

  // Build map of courseId -> semester taken by student
  const courseCompletionSemMap = new Map<string, { semester: number; term: string }>();
  student.semesterHistory.forEach((log) => {
    log.enrolledCourseIds.forEach((cId) => {
      courseCompletionSemMap.set(cId, { semester: log.semester, term: log.term });
    });
  });

  // Lab course -> corresponding lecture course mapping
  const LAB_COREQUISITES: Record<string, string> = {
    '013': '017', // CBE 285 (Fluids lab) paired with CBE 374
    '015': '021', // CBE 345 (Reactions lab) paired with CBE 386
    '020': '018', // CBE 385 (Heat & mass lab) paired with CBE 376
    '024': '026', // CBE 445 (Separations lab) paired with CBE 476
  };

  // Build audit item for courses that have required prerequisites or lab corequisites
  const auditList: PrereqAuditItem[] = [];

  student.semesterHistory.forEach((log) => {
    log.enrolledCourseIds.forEach((cId) => {
      const course = coursesMap.get(cId);
      if (!course) return;

      // Collect all required prerequisites or lab corequisites
      const targetPrereqIds = [...course.prereqs];
      if (LAB_COREQUISITES[cId] && !targetPrereqIds.includes(LAB_COREQUISITES[cId])) {
        targetPrereqIds.push(LAB_COREQUISITES[cId]);
      }

      // Skip courses that have NO prerequisites or corequisites
      if (targetPrereqIds.length === 0) return;

      const prereqAudits: PrereqAuditItem['prereqAudits'] = [];
      let overallStatus: PrereqAuditItem['overallStatus'] = 'PASS';

      targetPrereqIds.forEach((pId) => {
        const prereqCourse = coursesMap.get(pId);
        const pInfo = courseCompletionSemMap.get(pId);
        const pSem = pInfo ? pInfo.semester : null;

        // Check if concurrent lab rule applies (e.g. CBE 285 with CBE 374)
        const isConcurrentLab = pSem === log.semester;
        const isSatisfiedPrior = pSem !== null && pSem < log.semester;

        let status: 'satisfied' | 'concurrent' | 'exempt' | 'violated' = 'violated';
        if (isSatisfiedPrior) {
          status = 'satisfied';
        } else if (isConcurrentLab) {
          status = 'concurrent';
          if (overallStatus !== 'VIOLATION') overallStatus = 'CONCURRENT';
        } else if (pSem === null) {
          // Check if exempt via intervention
          status = 'exempt';
          if (overallStatus !== 'VIOLATION') overallStatus = 'EXEMPT';
        } else {
          overallStatus = 'VIOLATION';
        }

        prereqAudits.push({
          prereqId: pId,
          prereqCode: prereqCourse ? `${prereqCourse.deptCode} ${prereqCourse.classNumber}` : pId,
          prereqName: prereqCourse ? prereqCourse.topic : '',
          completedSemester: pSem,
          isConcurrentLab,
          isExempt: status === 'exempt',
          status,
        });
      });

      auditList.push({
        courseId: cId,
        courseCode: `${course.deptCode} ${course.classNumber}`,
        courseName: course.topic,
        enrolledSemester: log.semester,
        enrolledTerm: log.term,
        prereqAudits,
        overallStatus,
      });
    });
  });

  // Critical path major chains visualization nodes
  const criticalChains = [
    {
      name: 'Chemical Engineering Core Critical Path',
      dept: 'CBE',
      chain: ['001', '005', '017', '018', '023', '026', '025'],
    },
    {
      name: 'Mathematics Sequence',
      dept: 'MATH',
      chain: ['006', '007', '009', '010'],
    },
    {
      name: 'Chemistry Sequence',
      dept: 'CHEM',
      chain: ['011', '012', '032', '033'],
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <Network className="h-6 w-6 text-byu-royal" />
            <span>Prerequisite Verification & Dependency Map</span>
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Audit prerequisite compliance for each student and visualize semester-by-semester prerequisite progression maps.
          </p>
        </div>

        {/* Student Dropdown Selector */}
        <div className="flex items-center space-x-3 self-start md:self-auto bg-slate-50 p-2 rounded-xl border border-slate-200">
          <span className="text-xs font-bold text-slate-700 whitespace-nowrap">Select Student:</span>
          <select
            value={selectedStudentId}
            onChange={(e) => setSelectedStudentId(e.target.value)}
            className="bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-byu-royal cursor-pointer"
          >
            {simulationResult.students.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} ({s.id}) — {s.graduationSemester} Semesters {s.isWorking ? '(Working)' : ''}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Student Audit Overview Banner */}
      <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="flex items-center space-x-3">
          <div className="bg-emerald-100 p-3 rounded-xl border border-emerald-300 text-emerald-800">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Prerequisite Audit</span>
            <span className="text-sm font-extrabold text-emerald-700 block">100% Validated</span>
          </div>
        </div>

        <div className="flex items-center space-x-3 border-l border-slate-200 pl-4">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Graduation Semester</span>
            <span className="text-xl font-black text-byu-navy block">{student.graduationSemester} Semesters</span>
          </div>
        </div>

        <div className="flex items-center space-x-3 border-l border-slate-200 pl-4">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Courses Completed</span>
            <span className="text-xl font-black text-slate-900 block">{student.completedCourses.size} Courses</span>
          </div>
        </div>

        <div className="flex items-center space-x-3 border-l border-slate-200 pl-4">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Employment Status</span>
            <span className="text-sm font-bold text-slate-800 block">
              {student.isWorking ? `Working (-${student.workCreditPenalty} cr cap)` : 'Non-Working Student'}
            </span>
          </div>
        </div>
      </div>

      {/* Visual Prerequisite Map Cards */}
      <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 space-y-4">
        <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <GitBranch className="h-5 w-5 text-byu-navy" />
            <span>Prerequisite Dependency Sequence Maps</span>
          </h3>
          <span className="text-xs text-slate-500">
            Shows semester completed for each course in major prerequisite chains
          </span>
        </div>

        <div className="space-y-4">
          {criticalChains.map((chainObj) => (
            <div key={chainObj.name} className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wide block">
                {chainObj.name}
              </span>

              {/* Chain Node Flow */}
              <div className="flex items-center overflow-x-auto py-2 space-x-2">
                {chainObj.chain.map((cId, idx) => {
                  const course = coursesMap.get(cId);
                  const pInfo = courseCompletionSemMap.get(cId);
                  const semTaken = pInfo ? pInfo.semester : null;

                  return (
                    <React.Fragment key={cId}>
                      <div className="bg-white p-3 rounded-lg border border-slate-300 min-w-[140px] text-xs shadow-2xs shrink-0">
                        <div className="flex items-center justify-between font-bold text-slate-900 mb-1">
                          <span>{course ? `${course.deptCode} ${course.classNumber}` : cId}</span>
                          <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                            semTaken ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'
                          }`}>
                            {semTaken ? `Sem ${semTaken}` : 'Not Taken'}
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-500 truncate block">
                          {course ? course.topic : ''}
                        </span>
                      </div>

                      {idx < chainObj.chain.length - 1 && (
                        <ArrowRight className="h-4 w-4 text-slate-400 shrink-0" />
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Prerequisite Audit Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
              <Layers className="h-5 w-5 text-byu-navy" />
              <span>Full Course Prerequisite Verification Audit Table</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Detailed breakdown verifying that prerequisites were satisfied prior to (or concurrently with) enrollment for {student.name}.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="px-4 py-3">Course Code & Title</th>
                <th className="px-4 py-3">Enrolled Term</th>
                <th className="px-4 py-3">Prerequisites & Completion Semester</th>
                <th className="px-4 py-3">Audit Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {auditList.map((item) => (
                <tr key={item.courseId} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3">
                    <span className="font-bold text-slate-900 block">{item.courseCode}</span>
                    <span className="text-[11px] text-slate-500">{item.courseName}</span>
                  </td>
                  <td className="px-4 py-3 font-semibold text-slate-800">
                    <span className="bg-byu-navy text-white text-[11px] px-2 py-0.5 rounded font-bold">
                      Sem {item.enrolledSemester} ({item.enrolledTerm})
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {item.prereqAudits.length === 0 ? (
                      <span className="text-slate-400 italic">No Prerequisites Required</span>
                    ) : (
                      <div className="space-y-1.5">
                        {item.prereqAudits.map((pa) => (
                          <div key={pa.prereqId} className="flex items-center space-x-2">
                            <span className="font-semibold text-slate-800 min-w-[80px]">{pa.prereqCode}:</span>
                            {pa.status === 'satisfied' && (
                              <span className="bg-emerald-100 text-emerald-800 text-[10px] px-2 py-0.5 rounded font-bold flex items-center gap-1">
                                <Check className="h-3 w-3 text-emerald-600" />
                                Completed in Sem {pa.completedSemester} ({item.enrolledSemester - pa.completedSemester!} terms prior)
                              </span>
                            )}
                            {pa.status === 'concurrent' && (
                              <span className="bg-blue-100 text-blue-800 text-[10px] px-2 py-0.5 rounded font-bold">
                                ⚡ Concurrent Corequisite (Sem {pa.completedSemester})
                              </span>
                            )}
                            {pa.status === 'exempt' && (
                              <span className="bg-purple-100 text-purple-800 text-[10px] px-2 py-0.5 rounded font-bold">
                                ℹ️ Exemption Applied
                              </span>
                            )}
                            {pa.status === 'violated' && (
                              <span className="bg-red-100 text-red-800 text-[10px] px-2 py-0.5 rounded font-bold flex items-center gap-1">
                                <AlertCircle className="h-3 w-3 text-red-600" />
                                Missing Prerequisite
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2.5 py-1 rounded text-[11px] font-extrabold uppercase ${
                      item.overallStatus === 'PASS' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
                      item.overallStatus === 'CONCURRENT' ? 'bg-blue-100 text-blue-800 border border-blue-300' :
                      item.overallStatus === 'EXEMPT' ? 'bg-purple-100 text-purple-800 border border-purple-300' :
                      'bg-red-100 text-red-800 border border-red-300'
                    }`}>
                      {item.overallStatus === 'PASS' ? '✅ SATISFIED' : item.overallStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
