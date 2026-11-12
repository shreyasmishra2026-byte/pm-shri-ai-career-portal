import React, { useState } from 'react';
import { 
  GraduationCap, 
  Menu, 
  X, 
  PhoneCall, 
  Compass, 
  BookOpen, 
  Sparkles, 
  Info, 
  Building2,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { SCHOOL_INFO } from '../data/schoolInfo';

interface HeaderProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeSection, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Building2 },
    { id: 'assessment', label: 'Career Assessment', icon: Compass },
    { id: 'explore', label: 'Explore Careers', icon: BookOpen },
    { id: 'counsellor', label: 'AI Counsellor', icon: Sparkles },
    { id: 'about', label: 'About Us', icon: Info },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="w-full bg-white border-b border-slate-200 sticky top-0 z-50 shadow-xs">
      {/* 1. Official Government Top Strip */}
      <div className="w-full bg-[#0a1b38] text-slate-200 text-xs py-1.5 px-4 sm:px-8 border-b border-blue-950">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-blue-200 font-semibold tracking-wide uppercase">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              Department of School Education, Govt. of Punjab
            </span>
            <span className="hidden md:inline text-slate-500">|</span>
            <span className="hidden md:inline text-slate-300">
              Ministry of Education, Government of India (PM SHRI Initiative)
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium">
            <span className="hidden sm:inline-flex items-center gap-1 text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              UDISE+: <strong className="text-white font-mono">{SCHOOL_INFO.udiseCode}</strong>
            </span>
            <div className="flex items-center gap-1 text-amber-300 hover:text-white transition-colors">
              <PhoneCall className="w-3 h-3" />
              <span>National Career Helpline: <strong>14425</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. School Masthead */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div 
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3.5 sm:gap-4 cursor-pointer group select-none"
        >
          {/* Institutional Crest / Emblem */}
          <div className="relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-lg bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-950 text-white shadow-md border-2 border-amber-400/80 p-2 flex-shrink-0">
            <div className="text-center flex flex-col items-center">
              <GraduationCap className="w-7 h-7 sm:w-8 sm:h-8 text-amber-300 group-hover:scale-105 transition-transform" />
              <span className="text-[8px] font-black tracking-widest text-amber-200 mt-0.5">PM SHRI</span>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                ਪੀ.ਐੱਮ. ਸ਼੍ਰੀ ਸਕੂਲ
              </span>
              <span className="text-xs font-semibold text-blue-900 hidden sm:inline">
                Randhawa Masandan • Jalandhar, Punjab
              </span>
            </div>
            <h1 className="text-lg sm:text-2xl font-bold tracking-tight text-slate-900 group-hover:text-blue-900 transition-colors font-serif">
              PM SHRI GSSS Randhawa Masandan
            </h1>
            <p className="text-xs text-slate-600 font-medium">
              Official AI Career Guidance, Stream Selection & Psychometric Portal
            </p>
          </div>
        </div>

        {/* Desktop Quick Right Badge */}
        <div className="hidden lg:flex items-center gap-3">
          <div className="text-right">
            <div className="text-xs font-bold text-slate-800">PM SHRI Career Desk</div>
            <div className="text-[11px] text-emerald-700 font-medium flex items-center justify-end gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              NEP 2020 Multi-Stream Active
            </div>
          </div>
          <button
            onClick={() => handleNavClick('assessment')}
            className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold rounded-md shadow-xs transition-colors flex items-center gap-1.5"
          >
            <Compass className="w-4 h-4" />
            <span>Take Assessment</span>
          </button>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-md text-slate-700 hover:text-blue-900 hover:bg-slate-100 transition-colors"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* 3. Traditional Full-Width Desktop Navigation Bar */}
      <nav className="w-full bg-[#102a54] text-white border-t border-blue-900/60 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold tracking-wide transition-colors relative ${
                    isActive
                      ? 'bg-blue-900 text-amber-300 shadow-inner'
                      : 'text-slate-100 hover:bg-blue-900/60 hover:text-white'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-blue-300'}`} />
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-1 bg-amber-400"></span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center text-xs text-blue-200 font-medium py-2">
            <span>Punjab Career Portal & NEP Hub</span>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0d2244] border-t border-blue-900 px-4 py-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded text-sm font-semibold transition-colors text-left ${
                    isActive
                      ? 'bg-blue-800 text-amber-300 border-l-4 border-amber-400'
                      : 'text-slate-100 hover:bg-blue-900/70 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
            <div className="pt-2 border-t border-blue-900/80 mt-2 flex justify-between items-center text-xs text-blue-300">
              <span>UDISE+: {SCHOOL_INFO.udiseCode}</span>
              <span className="text-amber-300 font-medium">Toll-Free: 14425</span>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
