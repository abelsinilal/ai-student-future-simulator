import React, { useState } from 'react';
import {
  StudentProfile,
  COURSE_OPTIONS,
  YEAR_OPTIONS,
  SEMESTER_OPTIONS,
  DEFAULT_TECHNICAL_SKILLS,
  DEFAULT_AREAS_OF_INTEREST,
  DESIRED_CAREER_OPTIONS,
  LEARNING_TIME_OPTIONS,
  DEMO_PROFILES,
} from '../types/profile';
import {
  User,
  GraduationCap,
  Calendar,
  Award,
  Code,
  Compass,
  Target,
  Clock,
  Plus,
  X,
  Sparkles,
  ArrowRight,
  RotateCcw,
  AlertCircle,
  CheckCircle2,
  HelpCircle,
} from 'lucide-react';

interface StudentProfileFormProps {
  profile: StudentProfile;
  onChange: (profile: StudentProfile) => void;
  onSubmit: () => void;
  onReset: () => void;
}

export const StudentProfileForm: React.FC<StudentProfileFormProps> = ({
  profile,
  onChange,
  onSubmit,
  onReset,
}) => {
  const [customSkillInput, setCustomSkillInput] = useState('');
  const [showSkillInput, setShowSkillInput] = useState(false);

  const [customInterestInput, setCustomInterestInput] = useState('');
  const [showInterestInput, setShowInterestInput] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Field change helpers
  const updateField = <K extends keyof StudentProfile>(field: K, value: StudentProfile[K]) => {
    const updated = { ...profile, [field]: value };

    // Auto update semester if year changes
    if (field === 'currentYear') {
      const year = value as string;
      const validSems = SEMESTER_OPTIONS[year] || [];
      if (!validSems.includes(updated.currentSemester)) {
        updated.currentSemester = validSems[0] || 'Semester 1';
      }
    }

    onChange(updated);

    // Clear error for this field if valid
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateSingle(field);
  };

  const validateSingle = (field: string) => {
    const newErrors: Record<string, string> = { ...errors };

    if (field === 'name') {
      if (!profile.name.trim()) {
        newErrors.name = 'Full name is required';
      } else if (profile.name.trim().length < 2) {
        newErrors.name = 'Name must be at least 2 characters';
      } else {
        delete newErrors.name;
      }
    }

    if (field === 'course') {
      if (profile.course === 'Other' && !profile.customCourse.trim()) {
        newErrors.customCourse = 'Please specify your branch/course name';
      } else {
        delete newErrors.customCourse;
      }
    }

    if (field === 'scoreValue') {
      if (!profile.scoreValue) {
        newErrors.scoreValue = `Please enter your ${profile.scoreType.toUpperCase()}`;
      } else {
        const num = parseFloat(profile.scoreValue);
        if (isNaN(num)) {
          newErrors.scoreValue = 'Enter a valid number';
        } else if (profile.scoreType === 'cgpa' && (num < 0 || num > 10)) {
          newErrors.scoreValue = 'CGPA must be between 0.0 and 10.0';
        } else if (profile.scoreType === 'percentage' && (num < 0 || num > 100)) {
          newErrors.scoreValue = 'Percentage must be between 0% and 100%';
        } else {
          delete newErrors.scoreValue;
        }
      }
    }

    if (field === 'technicalSkills') {
      if (profile.technicalSkills.length === 0) {
        newErrors.technicalSkills = 'Please select at least 1 technical skill';
      } else {
        delete newErrors.technicalSkills;
      }
    }

    if (field === 'areasOfInterest') {
      if (profile.areasOfInterest.length === 0) {
        newErrors.areasOfInterest = 'Please select at least 1 area of interest';
      } else {
        delete newErrors.areasOfInterest;
      }
    }

    setErrors(newErrors);
  };

  const handleAddCustomSkill = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const clean = customSkillInput.trim();
    if (clean && !profile.technicalSkills.includes(clean)) {
      updateField('technicalSkills', [...profile.technicalSkills, clean]);
      setCustomSkillInput('');
      setShowSkillInput(false);
    }
  };

  const toggleSkill = (skill: string) => {
    if (profile.technicalSkills.includes(skill)) {
      const updated = profile.technicalSkills.filter((s) => s !== skill);
      updateField('technicalSkills', updated);
    } else {
      updateField('technicalSkills', [...profile.technicalSkills, skill]);
    }
  };

  const handleAddCustomInterest = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const clean = customInterestInput.trim();
    if (clean && !profile.areasOfInterest.includes(clean)) {
      updateField('areasOfInterest', [...profile.areasOfInterest, clean]);
      setCustomInterestInput('');
      setShowInterestInput(false);
    }
  };

  const toggleInterest = (interest: string) => {
    if (profile.areasOfInterest.includes(interest)) {
      const updated = profile.areasOfInterest.filter((i) => i !== interest);
      updateField('areasOfInterest', updated);
    } else {
      updateField('areasOfInterest', [...profile.areasOfInterest, interest]);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const newErrors: Record<string, string> = {};

    if (!profile.name.trim()) {
      newErrors.name = 'Full name is required';
    }

    if (profile.course === 'Other' && !profile.customCourse.trim()) {
      newErrors.customCourse = 'Please enter your branch';
    }

    if (!profile.scoreValue) {
      newErrors.scoreValue = `Please enter your ${profile.scoreType.toUpperCase()}`;
    } else {
      const num = parseFloat(profile.scoreValue);
      if (isNaN(num)) {
        newErrors.scoreValue = 'Enter a valid numeric score';
      } else if (profile.scoreType === 'cgpa' && (num < 0 || num > 10)) {
        newErrors.scoreValue = 'CGPA must be between 0.0 and 10.0';
      } else if (profile.scoreType === 'percentage' && (num < 0 || num > 100)) {
        newErrors.scoreValue = 'Percentage must be between 0% and 100%';
      }
    }

    if (profile.technicalSkills.length === 0) {
      newErrors.technicalSkills = 'Select at least one technical skill';
    }

    if (profile.areasOfInterest.length === 0) {
      newErrors.areasOfInterest = 'Select at least one area of interest';
    }

    if (!profile.desiredCareer) {
      newErrors.desiredCareer = 'Please select a desired career';
    }

    if (!profile.learningTimePerDay) {
      newErrors.learningTimePerDay = 'Please select your daily learning time';
    }

    setTouched({
      name: true,
      course: true,
      customCourse: true,
      scoreValue: true,
      technicalSkills: true,
      areasOfInterest: true,
      desiredCareer: true,
      learningTimePerDay: true,
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Scroll smoothly to the first error
      window.scrollTo({ top: 120, behavior: 'smooth' });
      return;
    }

    onSubmit();
  };

  const loadDemo = (key: keyof typeof DEMO_PROFILES) => {
    onChange({ ...DEMO_PROFILES[key] });
    setErrors({});
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 sm:py-12">
      {/* Page Title & Subtitle */}
      <div className="text-center mb-8 sm:mb-10 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold tracking-wide">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          <span>Step 1: Student Foundation</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
          Complete Your Profile
        </h2>

        <p className="text-base sm:text-lg text-slate-500 max-w-2xl mx-auto font-normal">
          Tell us a little about yourself so we can simulate your future.
        </p>

        {/* Quick Demo Pre-fills */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500">
          <span className="font-medium text-slate-400">Quick Fill Profiles:</span>
          <button
            type="button"
            onClick={() => loadDemo('ai_explorer')}
            className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-600 font-medium transition-colors border border-slate-200/60"
          >
            ⚡ Alex (AI Explorer)
          </button>
          <button
            type="button"
            onClick={() => loadDemo('web_builder')}
            className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-600 font-medium transition-colors border border-slate-200/60"
          >
            ⚡ Sarah (Full-Stack)
          </button>
          <button
            type="button"
            onClick={() => loadDemo('exploring')}
            className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-600 font-medium transition-colors border border-slate-200/60"
          >
            ⚡ Rohan (Exploring Path)
          </button>
        </div>
      </div>

      {/* Main Card Container */}
      <div className="bg-white rounded-3xl shadow-xl shadow-indigo-100/50 border border-slate-200/80 p-6 sm:p-10 lg:p-12 transition-all">
        {/* Validation Summary Error if any */}
        {Object.keys(errors).length > 0 && (
          <div className="mb-8 p-4 rounded-2xl bg-rose-50 border border-rose-200/80 flex items-start gap-3 text-rose-800 animate-fadeIn">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-semibold text-rose-900">
                Please complete the highlighted fields before continuing:
              </p>
              <ul className="list-disc list-inside mt-1 text-xs space-y-0.5 text-rose-700">
                {Object.values(errors).map((err, i) => (
                  <li key={i}>{err}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <form onSubmit={handleFormSubmit} className="space-y-8 sm:space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-12 gap-y-7">
            {/* Field 1: Name */}
            <div className="space-y-2">
              <label className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-500">
                <span className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-indigo-600" />
                  1. Full Name <span className="text-rose-500">*</span>
                </span>
                {profile.name.trim() && (
                  <span className="text-emerald-600 flex items-center gap-1 text-[11px] font-medium lowercase">
                    <CheckCircle2 className="w-3 h-3" /> valid
                  </span>
                )}
              </label>

              <div className="relative">
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  onBlur={() => handleBlur('name')}
                  placeholder="Enter your name"
                  className={`w-full px-4 py-3.5 rounded-xl border text-slate-800 placeholder:text-slate-400 bg-slate-50/70 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 outline-none transition-all font-medium text-sm sm:text-base ${
                    errors.name && touched.name
                      ? 'border-rose-400 bg-rose-50/30'
                      : 'border-slate-200'
                  }`}
                />
              </div>
              {errors.name && touched.name && (
                <p className="text-xs text-rose-600 font-medium">{errors.name}</p>
              )}
            </div>

            {/* Field 2: Course / Branch */}
            <div className="space-y-2">
              <label className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-500">
                <span className="flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-indigo-600" />
                  2. Course / Branch <span className="text-rose-500">*</span>
                </span>
              </label>

              <div className="space-y-2">
                <div className="relative">
                  <select
                    value={profile.course}
                    onChange={(e) => updateField('course', e.target.value)}
                    className="w-full appearance-none px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50/70 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 outline-none transition-all font-medium text-sm sm:text-base text-slate-800 cursor-pointer"
                  >
                    {COURSE_OPTIONS.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                  </div>
                </div>

                {/* If "Other" branch is selected */}
                {profile.course === 'Other' && (
                  <div className="animate-fadeIn">
                    <input
                      type="text"
                      value={profile.customCourse}
                      onChange={(e) => updateField('customCourse', e.target.value)}
                      onBlur={() => handleBlur('course')}
                      placeholder="Specify your branch / degree (e.g. BioTech, Robotics, BCA)"
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 outline-none transition-all ${
                        errors.customCourse
                          ? 'border-rose-400 bg-rose-50/30'
                          : 'border-slate-200'
                      }`}
                    />
                    {errors.customCourse && (
                      <p className="text-xs text-rose-600 font-medium mt-1">
                        {errors.customCourse}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Field 3: Current Year / Semester */}
            <div className="space-y-2">
              <label className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-500">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-indigo-600" />
                  3. Current Year / Semester <span className="text-rose-500">*</span>
                </span>
              </label>

              <div className="grid grid-cols-2 gap-2.5">
                {/* Year picker */}
                <div className="relative">
                  <select
                    value={profile.currentYear}
                    onChange={(e) => updateField('currentYear', e.target.value)}
                    className="w-full appearance-none px-3.5 py-3.5 rounded-xl border border-slate-200 bg-slate-50/70 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 outline-none transition-all font-medium text-sm text-slate-800 cursor-pointer"
                  >
                    {YEAR_OPTIONS.map((yr) => (
                      <option key={yr} value={yr}>
                        {yr}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                  </div>
                </div>

                {/* Semester picker */}
                <div className="relative">
                  <select
                    value={profile.currentSemester}
                    onChange={(e) => updateField('currentSemester', e.target.value)}
                    className="w-full appearance-none px-3.5 py-3.5 rounded-xl border border-slate-200 bg-slate-50/70 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 outline-none transition-all font-medium text-sm text-slate-800 cursor-pointer"
                  >
                    {(SEMESTER_OPTIONS[profile.currentYear] || []).map((sem) => (
                      <option key={sem} value={sem}>
                        {sem}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Field 4: CGPA / Percentage */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500">
                  <Award className="w-3.5 h-3.5 text-indigo-600" />
                  4. Academic Score <span className="text-rose-500">*</span>
                </label>

                {/* Score Toggle */}
                <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
                  <button
                    type="button"
                    onClick={() => updateField('scoreType', 'cgpa')}
                    className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                      profile.scoreType === 'cgpa'
                        ? 'bg-white text-indigo-600 shadow-sm'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    CGPA (10)
                  </button>
                  <button
                    type="button"
                    onClick={() => updateField('scoreType', 'percentage')}
                    className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                      profile.scoreType === 'percentage'
                        ? 'bg-white text-indigo-600 shadow-sm'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Percentage (%)
                  </button>
                </div>
              </div>

              <div className="relative">
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max={profile.scoreType === 'cgpa' ? 10 : 100}
                  value={profile.scoreValue}
                  onChange={(e) => updateField('scoreValue', e.target.value)}
                  onBlur={() => handleBlur('scoreValue')}
                  placeholder={
                    profile.scoreType === 'cgpa'
                      ? 'e.g. 8.75 (out of 10.0)'
                      : 'e.g. 85.5 (out of 100%)'
                  }
                  className={`w-full px-4 py-3.5 rounded-xl border text-slate-800 bg-slate-50/70 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 outline-none transition-all font-medium text-sm sm:text-base ${
                    errors.scoreValue && touched.scoreValue
                      ? 'border-rose-400 bg-rose-50/30'
                      : 'border-slate-200'
                  }`}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-4 text-xs font-bold text-slate-400">
                  {profile.scoreType === 'cgpa' ? '/ 10.0' : '%'}
                </div>
              </div>
              {errors.scoreValue && touched.scoreValue && (
                <p className="text-xs text-rose-600 font-medium">{errors.scoreValue}</p>
              )}
            </div>

            {/* Field 5: Current Technical Skills (Full Width) */}
            <div className="col-span-1 md:col-span-2 space-y-3 pt-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500">
                  <Code className="w-3.5 h-3.5 text-indigo-600" />
                  5. Current Technical Skills <span className="text-rose-500">*</span>
                </label>
                <span className="text-xs font-medium text-slate-400">
                  {profile.technicalSkills.length} selected
                </span>
              </div>

              <p className="text-xs text-slate-400">
                Click chips to toggle or add custom skills you know:
              </p>

              <div className="flex flex-wrap gap-2.5 items-center">
                {DEFAULT_TECHNICAL_SKILLS.map((skill) => {
                  const isSelected = profile.technicalSkills.includes(skill);
                  return (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => toggleSkill(skill)}
                      className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                        isSelected
                          ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-200 border border-indigo-600 scale-[1.02]'
                          : 'bg-slate-50 text-slate-700 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/80'
                      }`}
                    >
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                      <span>{skill}</span>
                    </button>
                  );
                })}

                {/* Custom skills already added */}
                {profile.technicalSkills
                  .filter((s) => !DEFAULT_TECHNICAL_SKILLS.includes(s))
                  .map((custom) => (
                    <span
                      key={custom}
                      className="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 flex items-center gap-1.5 shadow-sm"
                    >
                      <span>{custom}</span>
                      <button
                        type="button"
                        onClick={() => toggleSkill(custom)}
                        className="p-0.5 hover:bg-indigo-200/60 rounded-full text-indigo-700 transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </span>
                  ))}

                {/* Add custom skill inline input */}
                {showSkillInput ? (
                  <div className="flex items-center gap-1.5 bg-white rounded-xl border border-indigo-300 p-1 shadow-sm">
                    <input
                      type="text"
                      autoFocus
                      value={customSkillInput}
                      onChange={(e) => setCustomSkillInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddCustomSkill();
                        }
                      }}
                      placeholder="e.g. Rust, Kotlin, AWS"
                      className="px-3 py-1 text-xs sm:text-sm outline-none text-slate-800 placeholder:text-slate-400 w-36 sm:w-44"
                    />
                    <button
                      type="button"
                      onClick={() => handleAddCustomSkill()}
                      disabled={!customSkillInput.trim()}
                      className="px-2.5 py-1 rounded-lg bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 disabled:opacity-50"
                    >
                      Add
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowSkillInput(false);
                        setCustomSkillInput('');
                      }}
                      className="p-1 text-slate-400 hover:text-slate-600 rounded"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowSkillInput(true)}
                    className="px-3.5 py-2 rounded-xl border border-dashed border-slate-300 text-slate-500 hover:text-indigo-600 hover:border-indigo-400 text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all bg-white hover:bg-indigo-50/50"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>+ Add Custom Skill</span>
                  </button>
                )}
              </div>

              {errors.technicalSkills && touched.technicalSkills && (
                <p className="text-xs text-rose-600 font-medium">{errors.technicalSkills}</p>
              )}
            </div>

            {/* Field 6: Areas of Interest (Full Width) */}
            <div className="col-span-1 md:col-span-2 space-y-3 pt-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500">
                  <Compass className="w-3.5 h-3.5 text-indigo-600" />
                  6. Areas of Interest <span className="text-rose-500">*</span>
                </label>
                <span className="text-xs font-medium text-slate-400">
                  {profile.areasOfInterest.length} selected
                </span>
              </div>

              <p className="text-xs text-slate-400">
                Select topics and technologies that inspire you:
              </p>

              <div className="flex flex-wrap gap-2.5 items-center">
                {DEFAULT_AREAS_OF_INTEREST.map((interest) => {
                  const isSelected = profile.areasOfInterest.includes(interest);
                  return (
                    <button
                      key={interest}
                      type="button"
                      onClick={() => toggleInterest(interest)}
                      className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                        isSelected
                          ? 'bg-slate-900 text-white shadow-sm border border-slate-900 scale-[1.02]'
                          : 'bg-slate-50 text-slate-700 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/80'
                      }`}
                    >
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                      <span>{interest}</span>
                    </button>
                  );
                })}

                {/* Custom interests */}
                {profile.areasOfInterest
                  .filter((i) => !DEFAULT_AREAS_OF_INTEREST.includes(i))
                  .map((custom) => (
                    <span
                      key={custom}
                      className="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-slate-100 text-slate-800 border border-slate-300 flex items-center gap-1.5 shadow-sm"
                    >
                      <span>{custom}</span>
                      <button
                        type="button"
                        onClick={() => toggleInterest(custom)}
                        className="p-0.5 hover:bg-slate-200 rounded-full text-slate-600 transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </span>
                  ))}

                {/* Add custom interest inline input */}
                {showInterestInput ? (
                  <div className="flex items-center gap-1.5 bg-white rounded-xl border border-slate-300 p-1 shadow-sm">
                    <input
                      type="text"
                      autoFocus
                      value={customInterestInput}
                      onChange={(e) => setCustomInterestInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddCustomInterest();
                        }
                      }}
                      placeholder="e.g. Quantum Computing, AR/VR"
                      className="px-3 py-1 text-xs sm:text-sm outline-none text-slate-800 placeholder:text-slate-400 w-44"
                    />
                    <button
                      type="button"
                      onClick={() => handleAddCustomInterest()}
                      disabled={!customInterestInput.trim()}
                      className="px-2.5 py-1 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 disabled:opacity-50"
                    >
                      Add
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowInterestInput(false);
                        setCustomInterestInput('');
                      }}
                      className="p-1 text-slate-400 hover:text-slate-600 rounded"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowInterestInput(true)}
                    className="px-3.5 py-2 rounded-xl border border-dashed border-slate-300 text-slate-500 hover:text-slate-900 hover:border-slate-400 text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all bg-white hover:bg-slate-50"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>+ Add Other Interest</span>
                  </button>
                )}
              </div>

              {errors.areasOfInterest && touched.areasOfInterest && (
                <p className="text-xs text-rose-600 font-medium">{errors.areasOfInterest}</p>
              )}
            </div>

            {/* Field 7: Desired Career */}
            <div className="space-y-2">
              <label className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-500">
                <span className="flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5 text-indigo-600" />
                  7. Desired Career <span className="text-rose-500">*</span>
                </span>
              </label>

              <div className="relative">
                <select
                  value={profile.desiredCareer}
                  onChange={(e) => updateField('desiredCareer', e.target.value)}
                  className="w-full appearance-none px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50/70 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 outline-none transition-all font-medium text-sm sm:text-base text-slate-800 cursor-pointer"
                >
                  {DESIRED_CAREER_OPTIONS.map((car) => (
                    <option key={car} value={car}>
                      {car}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                  </svg>
                </div>
              </div>

              {/* Special callout if "Not Sure Yet" */}
              {profile.desiredCareer === 'Not Sure Yet' && (
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-900 text-xs flex items-start gap-2 animate-fadeIn">
                  <HelpCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>AI Exploration Mode:</strong> No worries! The AI simulation will automatically evaluate your skill profile, interests, and potential paths to recommend optimal career fits.
                  </span>
                </div>
              )}
            </div>

            {/* Field 8: Learning Time Per Day */}
            <div className="space-y-2">
              <label className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-500">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-indigo-600" />
                  8. Daily Learning Time <span className="text-rose-500">*</span>
                </span>
                <span className="text-xs text-indigo-600 font-semibold">
                  {profile.learningTimePerDay}
                </span>
              </label>

              {/* Selectable Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-1">
                {LEARNING_TIME_OPTIONS.map((opt) => {
                  const isSelected = profile.learningTimePerDay === opt.label;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => updateField('learningTimePerDay', opt.label)}
                      className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${
                        isSelected
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200 scale-[1.02]'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                      }`}
                    >
                      <span className="text-xs sm:text-sm font-extrabold tracking-tight">
                        {opt.hours}
                      </span>
                      <span
                        className={`text-[9px] font-medium leading-tight ${
                          isSelected ? 'text-indigo-100' : 'text-slate-400'
                        }`}
                      >
                        {opt.badge}
                      </span>
                    </button>
                  );
                })}
              </div>

              {errors.learningTimePerDay && (
                <p className="text-xs text-rose-600 font-medium">{errors.learningTimePerDay}</p>
              )}
            </div>
          </div>

          {/* Form Action Controls */}
          <div className="pt-8 border-t border-slate-100 flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
            <button
              type="button"
              onClick={onReset}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors flex items-center justify-center gap-2 text-sm cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset Profile</span>
            </button>

            <button
              type="submit"
              className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-indigo-600 text-white font-bold text-base shadow-xl shadow-indigo-200 hover:bg-indigo-700 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 cursor-pointer group"
            >
              <span>Generate My Future</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </form>
      </div>

      {/* Info note under card */}
      <div className="mt-6 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
        <span>Your profile will be processed by the AI Future Trajectory Engine.</span>
      </div>
    </div>
  );
};
