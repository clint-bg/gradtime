import React, { useState, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { DashboardTab } from './components/DashboardTab';
import { InterventionsTab } from './components/InterventionsTab';
import { StudentInspectorTab } from './components/StudentInspectorTab';
import { PrereqMapTab } from './components/PrereqMapTab';
import { CatalogTab } from './components/CatalogTab';
import { GitHubDeployGuide } from './components/GitHubDeployGuide';
import { runSimulation, getDefaultInterventions } from './simulator/engine';
import { Interventions } from './simulator/types';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'interventions' | 'inspector' | 'prereqMap' | 'catalog'>('dashboard');
  const [interventions, setInterventions] = useState<Interventions>(getDefaultInterventions());
  const [isDeployGuideOpen, setIsDeployGuideOpen] = useState<boolean>(false);

  // Compute baseline result (100 students)
  const baselineResult = useMemo(() => {
    return runSimulation(100, getDefaultInterventions());
  }, []);

  // Compute current experiment result whenever interventions change
  const currentResult = useMemo(() => {
    return runSimulation(100, interventions);
  }, [interventions]);

  const handleResetToBaseline = () => {
    setInterventions(getDefaultInterventions());
  };

  const handleApplyPreset = (presetName: string) => {
    const base = getDefaultInterventions();

    if (presetName === 'baseline') {
      setInterventions(base);
    } else if (presetName === 'doubleOfferings') {
      setInterventions({
        ...base,
        offeringOverrides: {
          '001': ['Fall', 'Winter'],
          '005': ['Fall', 'Winter'],
          '014': ['Fall', 'Winter'],
          '017': ['Fall', 'Winter'],
          '018': ['Fall', 'Winter'],
          '021': ['Fall', 'Winter'],
          '023': ['Fall', 'Winter'],
          '026': ['Fall', 'Winter'],
          '025': ['Fall', 'Winter'],
        },
      });
    } else if (presetName === 'reduceElectives') {
      setInterventions({
        ...base,
        relCreditsRequired: 10,
        engCreditsRequired: 6,
        emsbCreditsRequired: 2,
      });
    } else if (presetName === 'relaxPrereqs') {
      setInterventions({
        ...base,
        relCreditsRequired: 10,
        engCreditsRequired: 6,
        offeringOverrides: {
          '023': ['Fall', 'Winter'],
          '026': ['Fall', 'Winter'],
          '018': ['Fall', 'Winter'],
        },
      });
    } else if (presetName === 'higherCreditLoad') {
      setInterventions({
        ...base,
        populationMeanCredits: 16.0,
        workingPercentage: 0.20,
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onResetToBaseline={handleResetToBaseline}
        onApplyPreset={handleApplyPreset}
        onOpenDeployGuide={() => setIsDeployGuideOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-[90rem] w-full mx-auto px-4 sm:px-6 lg:px-10 py-6">
        {activeTab === 'dashboard' && (
          <DashboardTab
            baselineResult={baselineResult}
            currentResult={currentResult}
            onNavigateToInterventions={() => setActiveTab('interventions')}
          />
        )}

        {activeTab === 'interventions' && (
          <InterventionsTab
            interventions={interventions}
            onChangeInterventions={setInterventions}
            onReset={handleResetToBaseline}
          />
        )}

        {activeTab === 'inspector' && (
          <StudentInspectorTab simulationResult={currentResult} />
        )}

        {activeTab === 'prereqMap' && (
          <PrereqMapTab simulationResult={currentResult} />
        )}

        {activeTab === 'catalog' && <CatalogTab />}
      </main>

      {/* GitHub Pages Deploy Modal */}
      <GitHubDeployGuide
        isOpen={isDeployGuideOpen}
        onClose={() => setIsDeployGuideOpen(false)}
      />

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 mt-8">
        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-10 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>BYU Department of Chemical Engineering — Undergraduate Graduation Time Simulator</span>
          <span>Built with Node.js, React, Vite & Tailwind CSS</span>
        </div>
      </footer>
    </div>
  );
};
