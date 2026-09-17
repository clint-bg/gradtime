import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';
import { SimulationResult } from '../simulator/types';
import { Clock, TrendingDown, Award, AlertTriangle, ArrowRight, Layers, CheckCircle2 } from 'lucide-react';

interface DashboardTabProps {
  baselineResult: SimulationResult;
  currentResult: SimulationResult;
  onNavigateToInterventions: () => void;
}

export const DashboardTab: React.FC<DashboardTabProps> = ({
  baselineResult,
  currentResult,
  onNavigateToInterventions,
}) => {
  const avgDiff = Math.round((currentResult.averageGraduationSemesters - baselineResult.averageGraduationSemesters) * 10) / 10;
  const isImproved = avgDiff < 0;

  // Prepare chart data comparing baseline and current experiment year distributions
  const allSemesters = Array.from(
    new Set([
      ...Object.keys(baselineResult.semesterDistribution).map(Number),
      ...Object.keys(currentResult.semesterDistribution).map(Number),
    ])
  ).sort((a, b) => a - b);

  const distributionChartData = allSemesters.map((sem) => {
    const years = (sem / 2).toFixed(1);
    return {
      year: `${years} Yrs`,
      semLabel: `${sem} Sem (${years} Yrs)`,
      Baseline: baselineResult.semesterDistribution[sem] || 0,
      Experiment: currentResult.semesterDistribution[sem] || 0,
    };
  });

  // Prepare cumulative graduation chart data mapped to Years
  const cumulativeChartData = currentResult.cumulativeGraduation.map((item) => {
    const baselineItem = baselineResult.cumulativeGraduation.find((b) => b.semester === item.semester);
    const years = (item.semester / 2).toFixed(1);
    return {
      year: `${years} Yrs`,
      semLabel: `Sem ${item.semester} (${years} Yrs)`,
      BaselineRate: baselineItem ? baselineItem.rate : 0,
      ExperimentRate: item.rate,
    };
  });

  return (
    <div className="space-y-6">
      {/* Top Banner / Scenario Status */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="bg-byu-navy/10 text-byu-navy font-semibold text-xs px-2.5 py-1 rounded-md uppercase tracking-wide">
              Simulation Cohort: {currentResult.cohortSize} Students
            </span>
            {avgDiff !== 0 && (
              <span className={`text-xs font-bold px-2.5 py-1 rounded-md ${isImproved ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-amber-100 text-amber-800'}`}>
                {isImproved ? `📉 ${Math.abs(avgDiff)} Semesters Faster` : `📈 +${avgDiff} Semesters Longer`}
              </span>
            )}
          </div>
          <h2 className="text-xl font-bold text-slate-800 mt-1">Undergraduate Graduation Time Analysis</h2>
          <p className="text-sm text-slate-500 mt-0.5">
            Simulating prerequisite chains, credit capacity limits, employment constraints, and course offering frequencies.
          </p>
        </div>

        <div className="flex items-center space-x-3 self-start md:self-auto">
          <button
            onClick={onNavigateToInterventions}
            className="bg-byu-navy hover:bg-byu-royal text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors shadow-sm flex items-center space-x-2"
          >
            <span>Modify Interventions</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Average Semesters */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Average Graduation</span>
            <Clock className="h-5 w-5 text-byu-royal" />
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-slate-900">{currentResult.averageGraduationSemesters}</span>
            <span className="text-xs text-slate-500 font-medium">semesters</span>
          </div>
          <div className="mt-2 text-xs flex items-center text-slate-500">
            <span>Baseline: <strong className="text-slate-700">{baselineResult.averageGraduationSemesters}</strong> sem</span>
            {avgDiff !== 0 && (
              <span className={`ml-auto font-bold ${isImproved ? 'text-emerald-600' : 'text-amber-600'}`}>
                {isImproved ? `${avgDiff} sem` : `+${avgDiff} sem`}
              </span>
            )}
          </div>
        </div>

        {/* 8-Semester Rate */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider">8-Semester Grad Rate</span>
            <Award className="h-5 w-5 text-emerald-600" />
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-slate-900">{currentResult.eightSemesterGradRate}%</span>
            <span className="text-xs text-emerald-600 font-medium">on-time</span>
          </div>
          <div className="mt-2 text-xs text-slate-500">
            <span>Baseline: <strong className="text-slate-700">{baselineResult.eightSemesterGradRate}%</strong> of cohort</span>
          </div>
        </div>

        {/* 10-Semester Rate */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider">10-Semester Grad Rate</span>
            <CheckCircle2 className="h-5 w-5 text-blue-600" />
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-slate-900">{currentResult.tenSemesterGradRate}%</span>
            <span className="text-xs text-blue-600 font-medium">cumulative</span>
          </div>
          <div className="mt-2 text-xs text-slate-500">
            <span>Baseline: <strong className="text-slate-700">{baselineResult.tenSemesterGradRate}%</strong> of cohort</span>
          </div>
        </div>

        {/* Top Bottleneck Course */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Top Bottleneck</span>
            <AlertTriangle className="h-5 w-5 text-amber-500" />
          </div>
          <div className="mt-2">
            <span className="text-lg font-bold text-slate-900 truncate block">
              {currentResult.bottlenecks[0] ? currentResult.bottlenecks[0].courseId : 'None'}
            </span>
            <span className="text-xs text-slate-500 truncate block">
              {currentResult.bottlenecks[0] ? currentResult.bottlenecks[0].courseName : 'No bottlenecks detected'}
            </span>
          </div>
          <div className="mt-2 text-xs text-amber-700 font-medium">
            {currentResult.bottlenecks[0] ? `${currentResult.bottlenecks[0].affectedStudentsCount} students delayed` : ''}
          </div>
        </div>
      </div>

      {/* Visual Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Semester Distribution Histogram */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-800">Graduation Time Distribution</h3>
              <p className="text-xs text-slate-500">Number of students graduating at each year mark (2 semesters = 1 year)</p>
            </div>
            <div className="flex items-center space-x-3 text-xs">
              <span className="flex items-center"><span className="w-3 h-3 bg-slate-400 rounded-sm mr-1.5 inline-block"></span> Baseline</span>
              <span className="flex items-center"><span className="w-3 h-3 bg-byu-royal rounded-sm mr-1.5 inline-block"></span> Experiment</span>
            </div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={distributionChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="year" tick={{ fontSize: 12, fill: '#64748B' }} />
                <YAxis tick={{ fontSize: 12, fill: '#64748B' }} allowDecimals={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0F172A', color: '#fff', borderRadius: '8px', fontSize: '12px' }}
                  labelFormatter={(label, payload) => payload[0]?.payload?.semLabel || label}
                />
                <Bar dataKey="Baseline" fill="#94A3B8" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Experiment" fill="#0062B8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Cumulative Graduation Curve */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-800">Cumulative Graduation Rate Curve</h3>
              <p className="text-xs text-slate-500">% of cohort graduated by year mark (2 semesters = 1 year)</p>
            </div>
            <div className="flex items-center space-x-3 text-xs">
              <span className="flex items-center"><span className="w-3 h-0.5 bg-slate-400 mr-1.5 inline-block"></span> Baseline</span>
              <span className="flex items-center"><span className="w-3 h-0.5 bg-emerald-600 mr-1.5 inline-block"></span> Experiment</span>
            </div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={cumulativeChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="year" tick={{ fontSize: 12, fill: '#64748B' }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: '#64748B' }} unit="%" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0F172A', color: '#fff', borderRadius: '8px', fontSize: '12px' }}
                  labelFormatter={(label, payload) => payload[0]?.payload?.semLabel || label}
                  formatter={(val: any) => [`${val}%`, '']}
                />
                <Line type="monotone" dataKey="BaselineRate" stroke="#94A3B8" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="ExperimentRate" stroke="#10B981" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottleneck Analysis Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-5 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
              <Layers className="h-5 w-5 text-byu-navy" />
              <span>Curriculum Bottleneck Identification & Impact</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Courses that delayed student progression due to term offering constraints or prerequisite dependencies.
            </p>
          </div>
          <span className="text-xs font-medium text-slate-500">
            {currentResult.bottlenecks.length} Bottlenecks Identified
          </span>
        </div>

        {currentResult.bottlenecks.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-sm">
            🎉 No major course bottlenecks detected in this scenario!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-600 text-xs font-semibold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="px-5 py-3">Course Code & Title</th>
                  <th className="px-5 py-3">Category</th>
                  <th className="px-5 py-3">Affected Students</th>
                  <th className="px-5 py-3">Times Delayed</th>
                  <th className="px-5 py-3">Primary Bottleneck Cause</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {currentResult.bottlenecks.slice(0, 8).map((b, idx) => (
                  <tr key={b.courseId} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-3 font-semibold text-slate-900">
                      {b.courseName}
                    </td>
                    <td className="px-5 py-3">
                      <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                        b.category === 'Major' ? 'bg-blue-100 text-blue-800' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {b.category}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-slate-700 font-medium">
                      {b.affectedStudentsCount} / {currentResult.cohortSize} students
                    </td>
                    <td className="px-5 py-3">
                      <span className="bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded font-bold">
                        {b.timesDelayed} delays
                      </span>
                    </td>
                    <td className="px-5 py-3 text-slate-600 text-xs">
                      {b.primaryReason}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
