import React from 'react';
import { Step } from '../types/profile';
import { Sparkles, User, Cpu, Compass, Check } from 'lucide-react';

interface HeaderProps {
  currentStep: Step;
  onStepClick?: (step: Step) => void;
  canNavigateToSimulation?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentStep,
  onStepClick,
  canNavigateToSimulation = false,
}) => {
  const steps: { id: Step; label: string; icon: React.ReactNode; number: number }[] = [
    { id: 'profile', label: 'Profile', icon: <User className="w-3.5 h-3.5" />, number: 1 },
    { id: 'simulation', label: 'Simulation', icon: <Cpu className="w-3.5 h-3.5" />, number: 2 },
    { id: 'future', label: 'Future', icon: <Compass className="w-3.5 h-3.5" />, number: 3 },
  ];

  const getStepStatus = (stepId: Step) => {
    if (stepId === currentStep) return 'active';
    if (stepId === 'profile' && currentStep !== 'profile') return 'completed';
    if (stepId === 'simulation' && currentStep === 'future') return 'completed';
    return 'upcoming';
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-8 lg:px-12 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-200">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900">
                AI FUTURE <span className="text-indigo-600 font-bold">SIMULATOR</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100/80">
                v1.0
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium hidden sm:block">
              Career Trajectory & Growth Engine
            </p>
          </div>
        </div>

        {/* Stepper Indicator */}
        <nav aria-label="Progress" className="flex items-center gap-1 sm:gap-2">
          {steps.map((step, idx) => {
            const status = getStepStatus(step.id);
            const isClickable =
              (step.id === 'profile') ||
              (step.id === 'simulation' && canNavigateToSimulation);

            return (
              <React.Fragment key={step.id}>
                {idx > 0 && (
                  <div
                    className={`w-6 sm:w-10 h-[2px] transition-colors duration-300 ${
                      status === 'active' || status === 'completed'
                        ? 'bg-indigo-600'
                        : 'bg-slate-200'
                    }`}
                  />
                )}
                <button
                  type="button"
                  onClick={() => isClickable && onStepClick && onStepClick(step.id)}
                  disabled={!isClickable}
                  className={`group flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    status === 'active'
                      ? 'bg-indigo-50 text-indigo-700 border border-indigo-200/70 shadow-sm'
                      : status === 'completed'
                      ? 'text-slate-700 hover:bg-slate-100 cursor-pointer'
                      : 'text-slate-400 opacity-60 cursor-not-allowed'
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      status === 'active'
                        ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-300'
                        : status === 'completed'
                        ? 'bg-emerald-500 text-white'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {status === 'completed' ? (
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    ) : (
                      step.number
                    )}
                  </div>
                  <span className="hidden md:inline font-medium tracking-tight">
                    {step.label}
                  </span>
                </button>
              </React.Fragment>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
