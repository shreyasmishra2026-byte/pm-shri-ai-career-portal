import React from 'react';
import { 
  GraduationCap, 
  PhoneCall, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  ExternalLink,
  Heart
} from 'lucide-react';
import { SCHOOL_INFO } from '../data/schoolInfo';

interface FooterProps {
  onNavigate: (section: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="w-full bg-[#0a192f] text-slate-300 border-t-4 border-amber-400">
      
      {/* Main Footer Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Column 1: School Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-blue-900 border border-amber-400 flex items-center justify-center text-amber-300">
                <GraduationCap className="w-7 h-7" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white font-serif">
                  PM SHRI GSSS Randhawa Masandan
                </h4>
                <p className="text-[11px] text-amber-300">
                  Jalandhar, Punjab
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Exemplar government senior secondary school under the Ministry of Education, Government of India. Empowering students with cutting-edge vocational, STEM, and AI career guidance.
            </p>

            <div className="text-xs text-slate-400 space-y-1 font-mono">
              <div>UDISE+ Code: <strong className="text-white">{SCHOOL_INFO.udiseCode}</strong></div>
              <div>School Category: Senior Secondary (Co-ed)</div>
            </div>
          </div>

          {/* Column 2: Quick Portal Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider border-b border-slate-700 pb-2">
              Portal Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-amber-300 transition-colors text-left cursor-pointer"
                >
                  School Homepage & Announcements
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('assessment')}
                  className="hover:text-amber-300 transition-colors text-left cursor-pointer"
                >
                  Take Career Assessment Form
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('explore')}
                  className="hover:text-amber-300 transition-colors text-left cursor-pointer"
                >
                  Explore 150+ Career Trajectories
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('counsellor')}
                  className="hover:text-amber-300 transition-colors text-left cursor-pointer"
                >
                  Consult Margdarshak AI Counsellor
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-amber-300 transition-colors text-left cursor-pointer"
                >
                  About PM SHRI School & Leadership
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Official Govt Portals */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider border-b border-slate-700 pb-2">
              National & State Portals
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://scholarships.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-300 transition-colors flex items-center justify-between group"
                >
                  <span>National Scholarship Portal (NSP)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-amber-300" />
                </a>
              </li>
              <li>
                <a
                  href="https://scholarships.punjab.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-300 transition-colors flex items-center justify-between group"
                >
                  <span>Dr. Ambedkar Scholarship Punjab</span>
                  <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-amber-300" />
                </a>
              </li>
              <li>
                <a
                  href="https://ncs.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-300 transition-colors flex items-center justify-between group"
                >
                  <span>National Career Service (NCS)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-amber-300" />
                </a>
              </li>
              <li>
                <a
                  href="https://swayam.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-300 transition-colors flex items-center justify-between group"
                >
                  <span>SWAYAM Free Online Courses</span>
                  <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-amber-300" />
                </a>
              </li>
              <li>
                <a
                  href="https://cuetug.ntaonline.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-300 transition-colors flex items-center justify-between group"
                >
                  <span>NTA CUET-UG Examination Portal</span>
                  <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-amber-300" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider border-b border-slate-700 pb-2">
              Career Desk Contact
            </h4>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>Village Randhawa Masandan, Dist. Jalandhar, Punjab - 144004</span>
              </div>
              <div className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>+91 181 2924102</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>gsss.randhawamasandan@punjab.gov.in</span>
              </div>
              <div className="pt-2">
                <div className="text-[11px] text-amber-300 font-bold">
                  National Career Helpline: 14425
                </div>
                <div className="text-[10px] text-slate-400">Toll-free advisory (Mon-Sat, 8am-8pm)</div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Sub-bar */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} PM SHRI GSSS Randhawa Masandan, Jalandhar. Department of School Education, Government of Punjab.
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Empowered by NEP 2020</span>
            <span>•</span>
            <span>Margdarshak AI Cell</span>
            <span>•</span>
            <span>Accessibility Compliant</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
