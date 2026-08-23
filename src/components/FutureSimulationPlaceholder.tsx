import React, { useState } from 'react';
import { StudentProfile } from '../types/profile';
import {
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  Cpu,
  Target,
  GraduationCap,
  Calendar,
  Clock,
  Code,
  Compass,
  Copy,
  Check,
  TrendingUp,
  Brain,
  Rocket,
  ShieldCheck,
  Zap,
} from 'lucide-react';

interface FutureSimulationPlaceholderProps {
  profile: StudentProfile;
  isStep3?: boolean;
  onBackToProfile: () => void;
  onNextStep?: () => void;
}

export const FutureSimulationPlaceholder: React.FC<FutureSimulationPlaceholderProps> = ({
  profile,
  isStep3,
  onBackToProfile,
  onNextStep,
}) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'skills' | 'roadmap'>('overview');

  // Compute a preliminary readiness metric based on user input
  const calculateReadinessScore = () => {
    let score = 40;
    // Add points for score
    const num = parseFloat(profile.scoreValue) || 0;
    if (profile.scoreType === 'cgpa') {
      score += Math.min(30, (num / 10) * 30);
    } else {
      score += Math.min(30, (num / 100) * 30);
    }

    // Add points for skills count
    score += Math.min(20, profile.technicalSkills.length * 3);

    // Add points for commitment time
    if (profile.learningTimePerDay.includes('5+')) score += 10;
    else if (profile.learningTimePerDay.includes('3–5')) score += 8;
    else if (profile.learningTimePerDay.includes('2–3')) score += 6;
    else score += 4;

    return Math.round(Math.min(98, score));
  };

  const readinessScore = calculateReadinessScore();

  const handleCopyProfile = () => {
    navigator.clipboard.writeText(JSON.stringify(profile, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const branchDisplay =
    profile.course === 'Other' && profile.customCourse
      ? profile.customCourse
      : profile.course;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 sm:py-12 animate-fadeIn">
      {/* Simulation Header */}
      <div className="text-center mb-8 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold tracking-wide">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>Profile Saved & Simulation Engine Initialized</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          {isStep3 ? 'Unscripted Future Roadmap' : 'Future Simulation Preview'}
        </h2>

        <p className="text-slate-500 max-w-2xl mx-auto text-sm sm:text-base">
          Student profile successfully indexed for{' '}
          <span className="font-semibold text-slate-800">{profile.name}</span>. The AI
          trajectory matrix is ready to project career paths.
        </p>
      </div>

      {isStep3 ? (
          <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6 mb-8 border border-slate-800">
            <div className="border-b border-slate-800 pb-4">
              <h3 className="text-2xl font-bold text-indigo-400">Career Execution Roadmap</h3>
              <p className="text-sm text-slate-400 mt-1">Target Role: Artificial Intelligence & Machine Learning Engineer</p>
            </div>

            <div className="space-y-4">
              <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700">
                <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Phase 1: Next 3 Months</span>
                <h4 className="font-semibold text-lg text-white mt-1">Core Fundamentals & Applied Projects</h4>
                <p className="text-sm text-slate-300 mt-1">Build 2 flagship projects using Python, SQL, and core ML algorithms.</p>
              </div>

              <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700">
                <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">Phase 2: Month 4 - Month 8</span>
                <h4 className="font-semibold text-lg text-white mt-1">Advanced Specialization & Internships</h4>
                <p className="text-sm text-slate-300 mt-1">Apply for practical internships and contribute to open-source AIML repos.</p>
              </div>

              <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700">
                <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">Phase 3: Graduation Ready</span>
                <h4 className="font-semibold text-lg text-white mt-1">Placement & Interview Prep</h4>
                <p className="text-sm text-slate-300 mt-1">System design, mock technical interviews, and full portfolio deployment.</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden mb-8 border border-indigo-500/20">
      {/* Hero Simulation Status Card */}
      <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden mb-8 border border-indigo-800/40">
        {/* Background glow & grid */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-700/60">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-indigo-300 text-xs font-bold uppercase tracking-wider">
                <Brain className="w-4 h-4 text-indigo-400" />
                <span>Simulated Candidate Profile</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                {profile.name}
              </h3>
              <p className="text-slate-300 text-sm flex flex-wrap items-center gap-2">
                <span className="text-indigo-200">{branchDisplay}</span>
                <span>•</span>
                <span>{profile.currentYear} ({profile.currentSemester})</span>
                <span>•</span>
                <span className="bg-indigo-500/20 text-indigo-200 px-2 py-0.5 rounded-md border border-indigo-400/30 text-xs font-semibold">
                  {profile.scoreType.toUpperCase()}: {profile.scoreValue}
                </span>
              </p>
            </div>

            {/* Target Career Pill */}
            <div className="bg-white/10 backdrop-blur-md border border-white/15 px-5 py-3 rounded-2xl flex items-center gap-3 shrink-0">
              <div className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center text-white shadow-md">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] uppercase font-bold text-indigo-200 tracking-wider">
                  Target Career
                </div>
                <div className="text-sm font-extrabold text-white">
                  {profile.desiredCareer}
                </div>
              </div>
            </div>
          </div>

          {/* Metric Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
            <div className="bg-slate-800/60 backdrop-blur border border-slate-700/60 rounded-2xl p-4">
              <div className="text-xs text-slate-400 font-medium">Trajectory Index</div>
              <div className="text-2xl sm:text-3xl font-black text-indigo-300 mt-1 flex items-baseline gap-1">
                {readinessScore}
                <span className="text-xs text-slate-400 font-normal">/ 100</span>
              </div>
              <div className="w-full bg-slate-700/60 h-1.5 rounded-full mt-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-full rounded-full transition-all duration-1000"
                  style={{ width: `${readinessScore}%` }}
                />
              </div>
            </div>

            <div className="bg-slate-800/60 backdrop-blur border border-slate-700/60 rounded-2xl p-4">
              <div className="text-xs text-slate-400 font-medium">Tech Skills</div>
              <div className="text-2xl sm:text-3xl font-black text-emerald-400 mt-1">
                {profile.technicalSkills.length}
              </div>
              <p className="text-[11px] text-slate-400 mt-1 truncate">
                {profile.technicalSkills.slice(0, 2).join(', ')}...
              </p>
            </div>

            <div className="bg-slate-800/60 backdrop-blur border border-slate-700/60 rounded-2xl p-4">
              <div className="text-xs text-slate-400 font-medium">Focus Areas</div>
              <div className="text-2xl sm:text-3xl font-black text-violet-300 mt-1">
                {profile.areasOfInterest.length}
              </div>
              <p className="text-[11px] text-slate-400 mt-1 truncate">
                {profile.areasOfInterest.slice(0, 2).join(', ')}...
              </p>
            </div>

            <div className="bg-slate-800/60 backdrop-blur border border-slate-700/60 rounded-2xl p-4">
              <div className="text-xs text-slate-400 font-medium">Study Band</div>
              <div className="text-xl sm:text-2xl font-bold text-amber-300 mt-1 truncate">
                {profile.learningTimePerDay}
              </div>
              <p className="text-[11px] text-slate-400 mt-1">Per day pace</p>
            </div>
          </div>
        </div>
      </div>

      {/* AI Simulation Stage Placeholder Box */}
      <div className="bg-white rounded-3xl shadow-xl shadow-indigo-100/50 border border-slate-200/80 p-6 sm:p-8 space-y-6">
        {/* Navigation Tabs */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4 flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <button
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
            className="px-3.5 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-indigo-50 hover:text-indigo-600 text-slate-600 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied JSON!' : 'Export Profile JSON'}</span>
          </button>
        </div>
        )}

        {/* Tab 1: AI Future Trajectory Placeholder */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* AI Module Readiness Banner */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 border border-indigo-100/80 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-indigo-200 mt-0.5">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm sm:text-base font-bold text-slate-900">
                  Ready for Gemini AI Integration (Next Step)
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  The student profile schema has been constructed and validated. In the upcoming simulation release, Gemini AI will process these 8 vectors to generate real-time milestones, salary projections, project recommendations, and skill gap roadmaps!
                </p>
              </div>
            </div>

            {/* Projected Trajectory Timeline Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/80 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-100">
                    Phase 1 (Now - 6m)
                  </span>
                  <Rocket className="w-4 h-4 text-slate-400" />
                </div>
                <h5 className="font-bold text-slate-900 text-sm">
                  Core Skill Reinforcement
                </h5>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Focus on mastering {profile.technicalSkills.slice(0, 2).join(' & ')} through 2 production-grade capstone projects.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/80 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-violet-600 bg-violet-50 px-2.5 py-1 rounded-lg border border-violet-100">
                    Phase 2 (6m - 18m)
                  </span>
                  <Zap className="w-4 h-4 text-slate-400" />
                </div>
                <h5 className="font-bold text-slate-900 text-sm">
                  Industry Specialization
                </h5>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Align domain expertise toward {profile.desiredCareer} with open-source contributions & internships.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/80 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100">
                    Phase 3 (Post Grad)
                  </span>
                  <TrendingUp className="w-4 h-4 text-slate-400" />
                </div>
                <h5 className="font-bold text-slate-900 text-sm">
                  Market Trajectory
                </h5>
                <p className="text-xs text-slate-500 leading-relaxed">
                  High-demand candidacy in top tech ecosystems with projected 85th+ percentile market readiness.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Indexed Profile Details */}
        {activeTab === 'skills' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Registered Technical Skills ({profile.technicalSkills.length})
                </h5>
                <div className="flex flex-wrap gap-2">
                  {profile.technicalSkills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Targeted Focus Areas ({profile.areasOfInterest.length})
                </h5>
                <div className="flex flex-wrap gap-2">
                  {profile.areasOfInterest.map((interest) => (
                    <span
                      key={interest}
                      className="px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-semibold"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 text-slate-200 font-mono text-xs overflow-x-auto">
              <pre>{JSON.stringify(profile, null, 2)}</pre>
            </div>
          </div>
        )}

        {/* Bottom Actions */}
        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            type="button"
            onClick={onBackToProfile}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors flex items-center justify-center gap-2 text-sm cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>← Edit Profile Information</span>
          </button>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={onNextStep}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-slate-900 text-white font-bold text-sm shadow-md hover:bg-slate-800 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Cpu className="w-4 h-4" />
              <span>View Future Simulation</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
