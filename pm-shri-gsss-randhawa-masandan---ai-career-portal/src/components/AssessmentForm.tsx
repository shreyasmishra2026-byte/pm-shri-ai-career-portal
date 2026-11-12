import React, { useState } from 'react';
import { 
  Compass, 
  Sparkles, 
  Check, 
  RotateCcw, 
  HelpCircle, 
  GraduationCap, 
  BookOpen, 
  BrainCircuit, 
  Layers, 
  Target, 
  MapPin, 
  MessageSquare
} from 'lucide-react';
import { AssessmentInput } from '../types';

interface AssessmentFormProps {
  onSubmit: (data: AssessmentInput) => void;
  isLoading: boolean;
}

const AVAILABLE_SUBJECTS = [
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'Computer Science / AI',
  'Economics',
  'Accountancy',
  'Business Studies',
  'Political Science',
  'History',
  'Psychology',
  'English Literature',
  'Physical Education',
  'Geography',
  'Punjabi / Regional Language',
  'Fine Arts & Design'
];

const AVAILABLE_SKILLS = [
  'Analytical & Math Problem Solving',
  'Creative Writing & Communication',
  'Coding & Logical Thinking',
  'Hands-on Mechanical & Lab Experimentation',
  'Empathy & Healthcare Compassion',
  'Leadership & Public Speaking',
  'Visual Design & 3D Imagination',
  'Financial Calculation & Budgeting',
  'Research & Critical Investigation',
  'Physical Fitness & Sports Endurance'
];

export const AssessmentForm: React.FC<AssessmentFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<AssessmentInput>({
    fullName: '',
    classLevel: 'Class 10th (Matriculation - Choosing 11th Stream)',
    streamInterest: 'Science (Non-Medical - PCM: Engineering & Technology)',
    favoriteSubjects: ['Mathematics', 'Physics', 'Computer Science / AI'],
    skills: ['Analytical & Math Problem Solving', 'Coding & Logical Thinking'],
    workStyle: 'Technology Company / Software Lab / Innovation Hub',
    careerGoal: 'High Growth, Global Opportunities & Technological Innovation',
    locationPreference: 'Premier National Institutes (IITs, NITs, Central Universities) & Punjab',
    studentNotes: ''
  });

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const handleSubjectToggle = (subj: string) => {
    setFormData((prev) => {
      const exists = prev.favoriteSubjects.includes(subj);
      if (exists) {
        return { ...prev, favoriteSubjects: prev.favoriteSubjects.filter((s) => s !== subj) };
      } else {
        if (prev.favoriteSubjects.length >= 5) return prev; // max 5
        return { ...prev, favoriteSubjects: [...prev.favoriteSubjects, subj] };
      }
    });
  };

  const handleSkillToggle = (skill: string) => {
    setFormData((prev) => {
      const exists = prev.skills.includes(skill);
      if (exists) {
        return { ...prev, skills: prev.skills.filter((s) => s !== skill) };
      } else {
        if (prev.skills.length >= 4) return prev; // max 4
        return { ...prev, skills: [...prev.skills, skill] };
      }
    });
  };

  const loadPreset = (presetType: 'pcm' | 'pcb' | 'comm' | 'arts') => {
    if (presetType === 'pcm') {
      setFormData({
        fullName: 'Amanpreet Singh',
        classLevel: 'Class 10th (Matriculation - Choosing 11th Stream)',
        streamInterest: 'Science (Non-Medical - PCM: Engineering & Technology)',
        favoriteSubjects: ['Mathematics', 'Physics', 'Computer Science / AI'],
        skills: ['Analytical & Math Problem Solving', 'Coding & Logical Thinking'],
        workStyle: 'Technology Company / Software Lab / Innovation Hub',
        careerGoal: 'High Growth, Global Opportunities & Technological Innovation',
        locationPreference: 'Premier National Institutes (IITs, NITs, Central Universities) & Punjab',
        studentNotes: 'Interested in IIT JEE Main preparation and AI engineering.'
      });
    } else if (presetType === 'pcb') {
      setFormData({
        fullName: 'Simranjeet Kaur',
        classLevel: 'Class 11th (Senior Secondary)',
        streamInterest: 'Science (Medical - PCB: Medicine & Allied Healthcare)',
        favoriteSubjects: ['Biology', 'Chemistry', 'Physics'],
        skills: ['Empathy & Healthcare Compassion', 'Research & Critical Investigation'],
        workStyle: 'Hospital / Clinical Center / Healthcare Institution',
        careerGoal: 'Social Impact, Noble Public Service & Healthcare Excellence',
        locationPreference: 'Premier National Institutes (IITs, NITs, Central Universities) & Punjab',
        studentNotes: 'Targeting NEET-UG and B.Sc Agriculture at PAU Ludhiana.'
      });
    } else if (presetType === 'comm') {
      setFormData({
        fullName: 'Harman Sharma',
        classLevel: 'Class 12th (Final Board Year)',
        streamInterest: 'Commerce (With Applied Mathematics - Finance & Corporate)',
        favoriteSubjects: ['Accountancy', 'Economics', 'Business Studies', 'Mathematics'],
        skills: ['Financial Calculation & Budgeting', 'Analytical & Math Problem Solving'],
        workStyle: 'Corporate Financial Firm / Banking Headquarters / Investment Office',
        careerGoal: 'High Salary, Prestigious Corporate Advisory & Business Leadership',
        locationPreference: 'Top Central Universities (CUET-UG Delhi University, PU Chandigarh)',
        studentNotes: 'Aiming for Chartered Accountancy (CA) and B.Com (Hons).'
      });
    } else if (presetType === 'arts') {
      setFormData({
        fullName: 'Navneet Kaur',
        classLevel: 'Class 10th (Matriculation - Choosing 11th Stream)',
        streamInterest: 'Humanities & Social Sciences (Civil Services, Law & Policy)',
        favoriteSubjects: ['Political Science', 'History', 'English Literature', 'Psychology'],
        skills: ['Creative Writing & Communication', 'Leadership & Public Speaking'],
        workStyle: 'Government Administration / Civil Services / Public Governance',
        careerGoal: 'Prestigious Government Authority, Social Justice & National Administration',
        locationPreference: 'Premier National Institutes (IITs, NITs, Central Universities) & Punjab',
        studentNotes: 'Aspiring for UPSC Civil Services / Punjab PCS and CLAT Law.'
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { [key: string]: string } = {};

    if (!formData.fullName.trim()) {
      errors.fullName = 'Please enter student name';
    }
    if (formData.favoriteSubjects.length === 0) {
      errors.favoriteSubjects = 'Please select at least 1 favorite subject';
    }
    if (formData.skills.length === 0) {
      errors.skills = 'Please select at least 1 key skill';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    onSubmit(formData);
  };

  return (
    <section id="assessment-section" className="w-full py-12 px-4 sm:px-8 bg-white border-b border-slate-200">
      <div className="max-w-5xl mx-auto">
        
        {/* Section Institutional Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200 text-blue-900 rounded-md text-xs font-bold mb-3 uppercase tracking-wider">
            <Compass className="w-4 h-4 text-blue-700" />
            <span>PM SHRI Career Guidance Cell Assessment</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif">
            Student Career Aptitude & Stream Assessment
          </h2>
          <p className="mt-2 text-sm text-slate-600 leading-relaxed">
            Fill in the official school assessment form below. Our institutional AI engine synthesizes CBSE/PSEB curriculum options, NEP 2020 skill tracks, national entrance exams, and premier colleges in Punjab and India.
          </p>

          {/* Preset Buttons for Quick Demo / Ease */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="text-slate-500 font-medium">Quick Sample Profiles:</span>
            <button
              type="button"
              onClick={() => loadPreset('pcm')}
              className="px-2.5 py-1 bg-slate-100 hover:bg-blue-100 text-slate-800 hover:text-blue-900 rounded border border-slate-200 transition-colors cursor-pointer"
            >
              Class 10 Non-Med (PCM)
            </button>
            <button
              type="button"
              onClick={() => loadPreset('pcb')}
              className="px-2.5 py-1 bg-slate-100 hover:bg-emerald-100 text-slate-800 hover:text-emerald-900 rounded border border-slate-200 transition-colors cursor-pointer"
            >
              Class 11 Medical (PCB)
            </button>
            <button
              type="button"
              onClick={() => loadPreset('comm')}
              className="px-2.5 py-1 bg-slate-100 hover:bg-amber-100 text-slate-800 hover:text-amber-900 rounded border border-slate-200 transition-colors cursor-pointer"
            >
              Class 12 Commerce & CA
            </button>
            <button
              type="button"
              onClick={() => loadPreset('arts')}
              className="px-2.5 py-1 bg-slate-100 hover:bg-purple-100 text-slate-800 hover:text-purple-900 rounded border border-slate-200 transition-colors cursor-pointer"
            >
              Humanities & Civil Services
            </button>
          </div>
        </div>

        {/* The Assessment Form Container */}
        <form onSubmit={handleSubmit} className="bg-slate-50/70 border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Field 1: Full Name */}
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-blue-700" />
                <span>1. Student Full Name</span>
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="e.g. Gurleen Kaur / Rohan Sharma"
                className="w-full bg-white border border-slate-300 rounded-md px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
              />
              {formErrors.fullName && (
                <p className="text-red-600 text-xs mt-1">{formErrors.fullName}</p>
              )}
            </div>

            {/* Field 2: Current Academic Level (Dropdown) */}
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-blue-700" />
                <span>2. Current Academic Level / Class</span>
                <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.classLevel}
                onChange={(e) => setFormData({ ...formData, classLevel: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-md px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
              >
                <option value="Class 8th / 9th (Foundational Secondary)">Class 8th / 9th (Foundational Secondary)</option>
                <option value="Class 10th (Matriculation - Choosing 11th Stream)">Class 10th (Matriculation - Choosing 11th Stream)</option>
                <option value="Class 11th (Senior Secondary)">Class 11th (Senior Secondary)</option>
                <option value="Class 12th (Final Board Year)">Class 12th (Final Board Year - College Prep)</option>
                <option value="Passed Class 12th / Drop Year Aspirant">Passed Class 12th / Competitive Exam Aspirant</option>
                <option value="Vocational / ITI / Polytechnic Student">Vocational / ITI / Polytechnic Student</option>
              </select>
            </div>

            {/* Field 3: Stream / Broad Interest Cluster (Dropdown) */}
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-blue-700" />
                <span>3. Preferred Academic Stream / Interest Cluster</span>
                <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.streamInterest}
                onChange={(e) => setFormData({ ...formData, streamInterest: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-md px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
              >
                <option value="Science (Non-Medical - PCM: Engineering & Technology)">
                  Science (Non-Medical - PCM: Engineering, Computer Science, Architecture, NDA)
                </option>
                <option value="Science (Medical - PCB: Medicine & Allied Healthcare)">
                  Science (Medical - PCB: MBBS, BDS, Nursing, Agriculture, Biotechnology, Pharmacy)
                </option>
                <option value="Science (PCMB: Dual Math & Biology Flexibility)">
                  Science (PCMB: Dual Math & Biology - Bio-Informatics, Biomedical Engg, Agri-Tech)
                </option>
                <option value="Commerce (With Applied Mathematics - Finance & Corporate)">
                  Commerce (With Mathematics: CA, Investment Banking, Economics, FinTech)
                </option>
                <option value="Commerce (Without Mathematics - Business & Trade)">
                  Commerce (Without Mathematics: Business Management, Banking, Digital Marketing, Retail)
                </option>
                <option value="Humanities & Social Sciences (Civil Services, Law & Policy)">
                  Humanities & Social Sciences: UPSC Civil Services, Law (CLAT), Journalism, Psychology, Teaching
                </option>
                <option value="PM SHRI Vocational & Skill Tracks (IT/ITes, Green Energy, Electronics)">
                  PM SHRI Vocational Hub: IT/ITes, Solar Energy, Automobile, Artificial Intelligence Skill Electives
                </option>
                <option value="Defence, Armed Forces & Uniformed Services">
                  Defence & Uniformed Services: NDA (Army/Navy/Air Force), Merchant Navy, Paramilitary
                </option>
                <option value="Creative Arts, Media, Animation & Visual Design">
                  Creative Arts, Media, Animation & Visual Design: NID, NIFT, Film & Multimedia
                </option>
              </select>
            </div>

            {/* Field 4: Favorite Subjects (Multi-selection dropdown style badges) */}
            <div className="md:col-span-2">
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-blue-700" />
                  <span>4. Favorite / High Scoring Subjects</span>
                  <span className="text-red-500">*</span>
                </label>
                <span className="text-[11px] text-slate-500">
                  Selected ({formData.favoriteSubjects.length}/5)
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-white p-3.5 rounded-md border border-slate-300">
                {AVAILABLE_SUBJECTS.map((subj) => {
                  const isSelected = formData.favoriteSubjects.includes(subj);
                  return (
                    <button
                      type="button"
                      key={subj}
                      onClick={() => handleSubjectToggle(subj)}
                      className={`text-xs px-2.5 py-1.5 rounded text-left flex items-center justify-between border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-blue-50 border-blue-600 text-blue-900 font-bold'
                          : 'bg-slate-50/70 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span className="truncate">{subj}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-blue-700 flex-shrink-0" />}
                    </button>
                  );
                })}
              </div>
              {formErrors.favoriteSubjects && (
                <p className="text-red-600 text-xs mt-1">{formErrors.favoriteSubjects}</p>
              )}
            </div>

            {/* Field 5: Natural Skills & Strengths */}
            <div className="md:col-span-2">
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <BrainCircuit className="w-4 h-4 text-blue-700" />
                  <span>5. Key Aptitudes & Natural Talents</span>
                  <span className="text-red-500">*</span>
                </label>
                <span className="text-[11px] text-slate-500">
                  Selected ({formData.skills.length}/4)
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-white p-3.5 rounded-md border border-slate-300">
                {AVAILABLE_SKILLS.map((skill) => {
                  const isSelected = formData.skills.includes(skill);
                  return (
                    <button
                      type="button"
                      key={skill}
                      onClick={() => handleSkillToggle(skill)}
                      className={`text-xs px-3 py-2 rounded text-left flex items-center justify-between border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-blue-50 border-blue-600 text-blue-900 font-bold'
                          : 'bg-slate-50/70 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span>{skill}</span>
                      {isSelected && <Check className="w-4 h-4 text-blue-700 flex-shrink-0" />}
                    </button>
                  );
                })}
              </div>
              {formErrors.skills && (
                <p className="text-red-600 text-xs mt-1">{formErrors.skills}</p>
              )}
            </div>

            {/* Field 6: Preferred Work Environment (Dropdown) */}
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Target className="w-4 h-4 text-blue-700" />
                <span>6. Preferred Work Environment</span>
              </label>
              <select
                value={formData.workStyle}
                onChange={(e) => setFormData({ ...formData, workStyle: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-md px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
              >
                <option value="Technology Company / Software Lab / Innovation Hub">
                  Technology Company / Software Lab / Innovation Hub
                </option>
                <option value="Hospital / Clinical Center / Healthcare Institution">
                  Hospital / Clinical Center / Healthcare Institution
                </option>
                <option value="Government Administration / Civil Services / Public Governance">
                  Government Administration / Civil Services / Public Governance
                </option>
                <option value="Corporate Financial Firm / Banking Headquarters / Investment Office">
                  Corporate Financial Firm / Banking Headquarters / Investment Office
                </option>
                <option value="Defence Military Base / Outdoor Field / Uniformed Duty">
                  Defence Military Base / Outdoor Field / Uniformed Duty
                </option>
                <option value="Scientific Research Institute / University Academia">
                  Scientific Research Institute / University Academia
                </option>
                <option value="Creative Design Studio / Media & Broadcasting House">
                  Creative Design Studio / Media & Broadcasting House
                </option>
                <option value="Entrepreneurial Startup / Independent Venture">
                  Entrepreneurial Startup / Independent Business Venture
                </option>
              </select>
            </div>

            {/* Field 7: Long-term Career Ambition (Dropdown) */}
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Target className="w-4 h-4 text-blue-700" />
                <span>7. Primary Career Ambition / Motivation</span>
              </label>
              <select
                value={formData.careerGoal}
                onChange={(e) => setFormData({ ...formData, careerGoal: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-md px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
              >
                <option value="High Growth, Global Opportunities & Technological Innovation">
                  High Growth, Global Opportunities & Technological Innovation
                </option>
                <option value="Social Impact, Noble Public Service & Healthcare Excellence">
                  Social Impact, Noble Public Service & Healthcare Excellence
                </option>
                <option value="Prestigious Government Authority, Social Justice & National Administration">
                  Prestigious Government Authority, Social Justice & National Administration
                </option>
                <option value="High Salary, Prestigious Corporate Advisory & Business Leadership">
                  High Salary, Prestigious Corporate Advisory & Business Leadership
                </option>
                <option value="National Defence Honor, High Physical Discipline & Patriotism">
                  National Defence Honor, High Physical Discipline & Patriotism
                </option>
                <option value="Scientific Discovery, Patent Innovations & Academic Research">
                  Scientific Discovery, Patent Innovations & Academic Research
                </option>
                <option value="Creative Freedom, Artistic Expression & Storytelling">
                  Creative Freedom, Artistic Expression & Storytelling
                </option>
              </select>
            </div>

            {/* Field 8: Preferred Higher Education Target (Dropdown) */}
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-blue-700" />
                <span>8. Higher Education & Institution Target Preference</span>
              </label>
              <select
                value={formData.locationPreference}
                onChange={(e) => setFormData({ ...formData, locationPreference: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-md px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
              >
                <option value="Premier National Institutes (IITs, NITs, Central Universities) & Punjab">
                  Premier National Institutes (IITs, NITs, AIIMS, CUET Central Universities) + Top Punjab Univs (PAU, PU, GNDU)
                </option>
                <option value="Top State Government Colleges & Universities in Punjab (Affordable / Subsidized)">
                  Top State Government Colleges & Universities in Punjab (Affordable / Subsidized State Quota)
                </option>
                <option value="Direct Defense Academies (NDA Khadakwasla / TES Military)">
                  Direct Defense Academies (NDA Khadakwasla / TES Military Technical Entry)
                </option>
                <option value="International / Overseas University Education Opportunities">
                  International / Overseas University Education Opportunities
                </option>
                <option value="Vocational Polytechnic / Flexible & Distance Learning (SWAYAM / IGNOU)">
                  Vocational Polytechnic / Flexible & Distance Learning (SWAYAM / IGNOU)
                </option>
              </select>
            </div>

            {/* Field 9: Optional Student Notes */}
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-blue-700" />
                <span>9. Specific Query or Special Aspirations (Optional)</span>
              </label>
              <textarea
                rows={2}
                value={formData.studentNotes}
                onChange={(e) => setFormData({ ...formData, studentNotes: e.target.value })}
                placeholder="e.g. Wondering about fee concessions, preparation for JEE alongside boards, or how to register for PM YASASVI scholarship..."
                className="w-full bg-white border border-slate-300 rounded-md px-3.5 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
              />
            </div>

          </div>

          {/* Submit Action Bar */}
          <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-500 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              <span>All assessments are reviewed by PM SHRI Career Guidance Cell models.</span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => loadPreset('pcm')}
                className="px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1 border border-slate-200 rounded bg-white hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset to Default</span>
              </button>

              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 sm:flex-none px-6 py-3 bg-blue-700 hover:bg-blue-800 disabled:bg-blue-400 text-white text-sm font-bold rounded-md shadow-xs hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Analyzing Career Pathways...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>Generate AI Career Blueprint</span>
                  </>
                )}
              </button>
            </div>
          </div>

        </form>

      </div>
    </section>
  );
};
