import React from 'react';
import { Sparkles, Shield, GraduationCap, Cpu } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-200/80 bg-white/80 backdrop-blur-sm py-8 px-4 sm:px-8 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-indigo-600 flex items-center justify-center text-white">
            <Sparkles className="w-3 h-3" />
          </div>
          <span className="font-bold text-slate-700">AI Student Future Simulator</span>
          <span className="text-slate-300">|</span>
          <span>Next-Gen Career Pathways</span>
        </div>

        <div className="flex items-center gap-6 text-slate-400">
          <span className="flex items-center gap-1">
            <GraduationCap className="w-3.5 h-3.5 text-indigo-500" />
            Student Centered
          </span>
          <span className="flex items-center gap-1">
            <Cpu className="w-3.5 h-3.5 text-indigo-500" />
            AI Trajectory Ready
          </span>
          <span className="flex items-center gap-1">
            <Shield className="w-3.5 h-3.5 text-emerald-500" />
            Encrypted State
          </span>
        </div>
      </div>
    </footer>
  );
};
