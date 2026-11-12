import React, { useState, useEffect } from 'react';
import { 
  Compass, 
  Sparkles, 
  BookOpen, 
  Award, 
  ArrowRight, 
  CheckCircle2, 
  BellRing, 
  ShieldCheck, 
  Target,
  GraduationCap
} from 'lucide-react';
import { SCHOOL_INFO } from '../data/schoolInfo';

interface HeroProps {
  onNavigate: (section: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const [activeNoticeIdx, setActiveNoticeIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveNoticeIdx((prev) => (prev + 1) % SCHOOL_INFO.announcements.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full bg-linear-to-b from-blue-50 via-white to-slate-50 border-b border-slate-200">
      {/* 1. Official Live Notification Ticker */}
      <div className="w-full bg-amber-500/10 border-b border-amber-200/80 px-4 sm:px-8 py-2">
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-xs font-bold uppercase text-amber-900 bg-amber-200/80 px-2 py-0.5 rounded flex-shrink-0">
            <BellRing className="w-3.5 h-3.5 text-amber-800 animate-bounce" />
            Notice Board
          </span>
          <div className="text-xs text-slate-800 font-medium truncate flex-1">
            {SCHOOL_INFO.announcements[activeNoticeIdx]}
          </div>
          <button 
            onClick={() => onNavigate('about')}
            className="text-xs text-blue-800 hover:text-blue-950 font-semibold underline hidden sm:inline flex-shrink-0"
          >
            View All Circulars
          </button>
        </div>
      </div>

      {/* 2. Main University / School Hero Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Heading & Narrative */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-900 rounded-md text-xs font-bold border border-blue-200">
              <Award className="w-4 h-4 text-amber-600" />
              <span>Government of India PM SHRI Exemplar School</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-serif leading-tight">
              Shaping Tomorrow’s Leaders & Pioneers
            </h2>

            <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
              Welcome to the official Career Guidance & Stream Assessment Portal of{' '}
              <strong className="text-blue-900 font-bold">PM SHRI GSSS Randhawa Masandan, Jalandhar</strong>.
              Aligned with NEP 2020, we empower students to identify their natural passions, select optimal subjects, explore premier colleges, and unlock national scholarships.
            </p>

            {/* Quick Benefits Bullet Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 text-sm text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>AI Stream Mapping after 10th & 12th</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>National Exams: JEE, NEET, CUET, NDA</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Punjab & Central Govt Scholarships</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>24/7 Margdarshak AI Counsellor Desk</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-wrap gap-3 sm:gap-4">
              <button
                onClick={() => onNavigate('assessment')}
                className="px-6 py-3.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm rounded-lg shadow-sm hover:shadow transition-all flex items-center gap-2 group cursor-pointer"
              >
                <Compass className="w-5 h-5 text-amber-300" />
                <span>Take Career Assessment</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onNavigate('counsellor')}
                className="px-6 py-3.5 bg-white hover:bg-slate-50 text-blue-900 font-bold text-sm rounded-lg border-2 border-blue-800/80 shadow-2xs hover:shadow-xs transition-all flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-5 h-5 text-amber-500" />
                <span>Consult Margdarshak AI</span>
              </button>

              <button
                onClick={() => onNavigate('explore')}
                className="px-5 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-slate-600" />
                <span>Browse 150+ Careers</span>
              </button>
            </div>
          </div>

          {/* Right Column: Institutional Trust Card / Campus Highlights */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-xl border border-slate-200/90 shadow-md p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100/60 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>

              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-blue-900 text-amber-400 flex items-center justify-center font-bold">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Career Guidance Cell</h3>
                    <p className="text-xs text-slate-500">PM SHRI GSSS Randhawa Masandan</p>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                  Open Desk
                </span>
              </div>

              {/* Principal's Inspiring Message */}
              <div className="bg-slate-50 rounded-lg p-3.5 border border-slate-200/80 mb-5">
                <p className="text-xs text-slate-700 italic leading-relaxed">
                  "Every student in Randhawa Masandan possesses infinite potential. Through this AI-powered portal and our dedicated teachers, no child will lack direction, scholarship support, or career clarity."
                </p>
                <div className="mt-2 text-[11px] font-bold text-slate-900 text-right">
                  — {SCHOOL_INFO.principalName}
                </div>
              </div>

              {/* Quick Key Highlights Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-blue-50/70 border border-blue-100 rounded-lg">
                  <div className="text-xl font-black text-blue-900">{SCHOOL_INFO.stats[0].value}</div>
                  <div className="text-xs font-semibold text-slate-800">{SCHOOL_INFO.stats[0].label}</div>
                  <div className="text-[10px] text-slate-500">{SCHOOL_INFO.stats[0].sublabel}</div>
                </div>

                <div className="p-3 bg-emerald-50/70 border border-emerald-100 rounded-lg">
                  <div className="text-xl font-black text-emerald-800">{SCHOOL_INFO.stats[1].value}</div>
                  <div className="text-xs font-semibold text-slate-800">{SCHOOL_INFO.stats[1].label}</div>
                  <div className="text-[10px] text-slate-500">{SCHOOL_INFO.stats[1].sublabel}</div>
                </div>

                <div className="p-3 bg-amber-50/70 border border-amber-100 rounded-lg">
                  <div className="text-xl font-black text-amber-800">{SCHOOL_INFO.stats[2].value}</div>
                  <div className="text-xs font-semibold text-slate-800">{SCHOOL_INFO.stats[2].label}</div>
                  <div className="text-[10px] text-slate-500">{SCHOOL_INFO.stats[2].sublabel}</div>
                </div>

                <div className="p-3 bg-purple-50/70 border border-purple-100 rounded-lg">
                  <div className="text-xl font-black text-purple-900">{SCHOOL_INFO.stats[3].value}</div>
                  <div className="text-xs font-semibold text-slate-800">{SCHOOL_INFO.stats[3].label}</div>
                  <div className="text-[10px] text-slate-500">{SCHOOL_INFO.stats[3].sublabel}</div>
                </div>
              </div>

              {/* Institutional verification badge */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span className="flex items-center gap-1 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-700" />
                  Verified Govt. Exemplar
                </span>
                <span className="font-mono text-slate-600">Jalandhar, Punjab</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
