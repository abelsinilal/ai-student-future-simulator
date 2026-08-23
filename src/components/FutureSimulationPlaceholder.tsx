import React, { useState } from 'react';
import { Brain, Sparkles, Cpu, Check, Copy } from 'lucide-react';

interface FutureSimulationPlaceholderProps {
  profile: {
    name: string;
    currentYear: string;
    currentSemester: string;
    branchDisplay: string;
  };
  currentStep?: number;
  onNextStep?: () => void;
}

export default function FutureSimulationPlaceholder({
  profile,
  currentStep = 2,
  onNextStep
}: FutureSimulationPlaceholderProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'skills'>('overview');
  const [copied, setCopied] = useState(false);

  const handleCopyProfile = () => {
    navigator.clipboard.writeText(JSON.stringify(profile, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isStep3 = currentStep === 3;

  return (
    <div className="space-y-8">
      {/* Dynamic Step Display */}
      {isStep3 ? (
        /* Step 3: Roadmap Timeline View */
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6 mb-8 border border-slate-800">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-2xl font-bold text-indigo-400">Career Execution Roadmap</h3>
            <p className="text-sm text-slate-400 mt-1">
              Target Role: Artificial Intelligence & Machine Learning Engineer
            </p>
          </div>

          <div className="space-y-4">
            <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700">
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                Phase 1: Next 3 Months
              </span>
              <h4 className="font-semibold text-lg text-white mt-1">
                Core Fundamentals & Applied Projects
              </h4>
              <p className="text-sm text-slate-300 mt-1">
                Build 2 flagship projects using Python, SQL, and core ML algorithms.
              </p>
            </div>

            <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700">
              <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
                Phase 2: Month 4 - Month 8
              </span>
              <h4 className="font-semibold text-lg text-white mt-1">
                Advanced Specialization & Internships
              </h4>
              <p className="text-sm text-slate-300 mt-1">
                Apply for practical internships and contribute to open-source AIML repos.
              </p>
            </div>

            <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700">
              <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">
                Phase 3: Graduation Ready
              </span>
              <h4 className="font-semibold text-lg text-white mt-1">
                Placement & Interview Prep
              </h4>
              <p className="text-sm text-slate-300 mt-1">
                System design, mock technical interviews, and full portfolio deployment.
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* Step 2: Simulation Matrix Card */
        <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden mb-8 border border-indigo-500/20">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-700/60">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-indigo-300 text-xs font-bold uppercase tracking-wider">
                  <Brain className="w-4 h-4 text-indigo-400" />
                  <span>Simulated Candidate Profile</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {profile.name}
                </h3>
              </div>
              <div className="text-slate-300 text-sm flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 bg-indigo-500/20 rounded-full text-indigo-300 font-semibold">
                  {profile.branchDisplay}
                </span>
                <span className="px-3 py-1 bg-indigo-500/20 rounded-full text-indigo-300 font-semibold">
                  {profile.currentYear} ({profile.currentSemester})
                </span>
              </div>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Student profile successfully indexed for{' '}
              <span className="font-semibold text-slate-100">{profile.name}</span>. The AI trajectory matrix is ready to project career paths.
            </p>
          </div>
        </div>
      )}

      {/* Tabs Control */}
      <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-3">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'overview'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Simulation Matrix
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('skills')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'skills'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Indexed Profile Data
          </button>
        </div>

        <button
          type="button"
          onClick={handleCopyProfile}
          className="px-3.5 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-700 flex items-center gap-2 transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>Copied JSON!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-slate-500" />
              <span>Export Profile JSON</span>
            </>
          )}
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 border border-indigo-100 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-md">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm sm:text-base font-bold text-slate-900">
                Ready for Gemini AI Integration
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                The student profile schema has been constructed and validated.
              </p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'skills' && (
        <div className="bg-slate-900 rounded-2xl p-4 text-slate-200 text-xs font-mono overflow-x-auto shadow-inner">
          <pre>{JSON.stringify(profile, null, 2)}</pre>
        </div>
      )}

      {/* Next Step Action Button */}
      {onNextStep && (
        <div className="flex items-center justify-end pt-4">
          <button
            type="button"
            onClick={onNextStep}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 transition-all"
          >
            <Cpu className="w-4 h-4" />
            <span>View Future Simulation</span>
          </button>
        </div>
      )}
    </div>
  );
}
