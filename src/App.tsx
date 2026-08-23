import ReactDOM from 'react-dom/client';
import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { StudentProfileForm } from './components/StudentProfileForm';
import { FutureSimulationPlaceholder } from './components/FutureSimulationPlaceholder';
import { FutureRoadmap } from './components/FutureRoadmap';
import { Footer } from './components/Footer';
import { StudentProfile, INITIAL_PROFILE, Step } from './types/profile';

const STORAGE_KEY = 'ai_student_future_profile_v1';
const STEP_KEY = 'ai_student_future_step_v1';

export default function App() {
  const [profile, setProfile] = useState<StudentProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback
    }
    return INITIAL_PROFILE;
  });

  const [currentStep, setCurrentStep] = useState<Step>(() => {
    try {
      const savedStep = localStorage.getItem(STEP_KEY);
      if (savedStep === 'simulation' || savedStep === 'profile' || savedStep === 'future') {
        return savedStep as Step;
      }
    } catch {
      // Fallback
    }
    return 'profile';
  });

  const [hasCompletedProfile, setHasCompletedProfile] = useState<boolean>(() => {
    return Boolean(profile.name.trim() && profile.scoreValue.trim());
  });

  // Keep localStorage in sync with profile edits
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch {
      // Ignore
    }
  }, [profile]);

  // Keep step in sync
  useEffect(() => {
    try {
      localStorage.setItem(STEP_KEY, currentStep);
    } catch {
      // Ignore
    }
  }, [currentStep]);

  const handleProfileChange = (updated: StudentProfile) => {
    setProfile(updated);
  };

  const handleGenerateFuture = () => {
    const enrichedProfile = {
      ...profile,
      createdAt: new Date().toISOString(),
    };
    setProfile(enrichedProfile);
    setHasCompletedProfile(true);
    setCurrentStep('simulation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    if (window.confirm('Reset all fields to default values?')) {
      setProfile(INITIAL_PROFILE);
      setHasCompletedProfile(false);
      setCurrentStep('profile');
      try {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(STEP_KEY);
      } catch {
        // Ignore
      }
    }
  };

  const handleStepNavigation = (step: Step) => {
    if (step === 'simulation' && !hasCompletedProfile) {
      return;
    }
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800 antialiased selection:bg-indigo-600 selection:text-white">
      {/* Top Header */}
      <Header
        currentStep={currentStep}
        onStepClick={handleStepNavigation}
        canNavigateToSimulation={hasCompletedProfile}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        {currentStep === 'profile' && (
          <StudentProfileForm
            profile={profile}
            onChange={handleProfileChange}
            onSubmit={handleGenerateFuture}
            onReset={handleReset}
            onNextStep={() => handleStepNavigation('simulation')}
          />
        )}

        {/* Step 2: Simulation */}
        {currentStep === 'simulation' && (
          <FutureSimulationPlaceholder
            profile={profile}
            onBackToProfile={() => handleStepNavigation('profile')}
            onNextStep={() => handleStepNavigation('future')}
          />
        )}

        {/* Step 3: Future Roadmap */}
        {currentStep === 'future' && (
          <FutureRoadmap
            profile={profile}
            onBackToProfile={() => handleStepNavigation('simulation')}
            onReset={handleReset}
          />
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
const rootElement = document.getElementById('root');
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
}
