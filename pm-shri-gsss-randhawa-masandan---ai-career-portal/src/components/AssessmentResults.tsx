import React from 'react';
import { 
  Award, 
  BookOpen, 
  GraduationCap, 
  TrendingUp, 
  Briefcase, 
  CheckCircle, 
  Printer, 
  MessageSquare, 
  Landmark, 
  FileText, 
  ExternalLink,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { AssessmentResult } from '../types';
import { SCHOOL_INFO } from '../data/schoolInfo';

interface AssessmentResultsProps {
  result: AssessmentResult | null;
  studentName?: string;
  onAskCounsellor: (prompt: string) => void;
}

export const AssessmentResults: React.FC<AssessmentResultsProps> = ({ 
  result, 
  studentName,
  onAskCounsellor 
}) => {
  if (!result) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="results-section" className="w-full py-12 px-4 sm:px-8 bg-slate-50 border-b border-slate-200 print:bg-white print:p-0">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Dossier Header Strip */}
        <div className="bg-white border-2 border-blue-900 rounded-xl p-6 sm:p-8 shadow-sm print:border-none print:shadow-none">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-900 bg-blue-100 px-2.5 py-0.5 rounded border border-blue-200">
                  Official Career Assessment Dossier
                </span>
                <span className="text-xs text-slate-500 font-mono">
                  REF: PMSHRI-RM-{new Date().getFullYear()}-CAREER
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif">
                Personalized Career & Stream Strategy
              </h3>
              <p className="text-sm text-slate-600 mt-1">
                Prepared for: <strong className="text-slate-900 font-bold">{studentName || 'Student Scholar'}</strong> • PM SHRI GSSS Randhawa Masandan
              </p>
            </div>

            <div className="flex items-center gap-2 print:hidden">
              <button
                type="button"
                onClick={handlePrint}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-md border border-slate-300 transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Printer className="w-4 h-4 text-slate-600" />
                <span>Print Official Dossier</span>
              </button>
              <button
                type="button"
                onClick={() => onAskCounsellor(`I just generated my career assessment report. My top recommendation is ${result.recommendedCareers[0]?.title}. Can you provide a detailed month-by-month study plan?`)}
                className="px-4 py-2.5 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold rounded-md transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-amber-300" />
                <span>Discuss with AI Mentor</span>
              </button>
            </div>
          </div>

          {/* Student Profile Executive Summary */}
          <div className="mt-6 bg-blue-50/70 border border-blue-200 rounded-lg p-4 sm:p-5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-950 flex items-center gap-1.5 mb-2">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Aptitude & Diagnostic Summary</span>
            </h4>
            <p className="text-sm text-slate-800 leading-relaxed font-medium">
              {result.studentProfileSummary}
            </p>
          </div>

          {/* Stream Recommendations for Class 11-12 */}
          {result.topStreamsClass11_12 && result.topStreamsClass11_12.length > 0 && (
            <div className="mt-6">
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-blue-700" />
                <span>Recommended Senior Secondary Streams (Class 11 & 12 Subject Combos)</span>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {result.topStreamsClass11_12.map((st, idx) => (
                  <div key={idx} className="bg-slate-50 border border-slate-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-blue-900">{st.streamName}</span>
                      <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded">
                        {idx === 0 ? 'Primary Stream' : 'Alternative Track'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mb-3">{st.whyRecommended}</p>
                    <div className="text-[11px] text-slate-500 font-medium">
                      <strong className="text-slate-700">Suggested Electives:</strong>{' '}
                      {st.suggestedElectives.join(' • ')}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Primary Recommended Careers Grid */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif flex items-center gap-2">
              <Award className="w-6 h-6 text-amber-500" />
              <span>Top 3 Matching Career Trajectories</span>
            </h3>
            <span className="text-xs text-slate-500 hidden sm:inline">
              Ranked by psychometric aptitude & Indian industry outlook
            </span>
          </div>

          <div className="space-y-5">
            {result.recommendedCareers.map((career, index) => (
              <div 
                key={index}
                className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs hover:border-blue-400 hover:shadow-md transition-all relative overflow-hidden"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-slate-100 pb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-blue-900 text-amber-300 font-bold text-xs flex items-center justify-center">
                        #{index + 1}
                      </span>
                      <h4 className="text-lg sm:text-xl font-bold text-slate-900 font-serif">
                        {career.title}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-600">
                      <strong>Stream Foundation:</strong> {career.streamRoadmap}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 self-start md:self-auto">
                    <div className="text-right">
                      <div className="text-xs text-slate-500 font-medium">Aptitude Match</div>
                      <div className="text-lg font-black text-blue-900">{career.matchScore}%</div>
                    </div>
                    <div className="w-12 h-12 rounded-full border-4 border-blue-100 border-t-blue-700 flex items-center justify-center font-bold text-xs text-blue-900">
                      {career.matchScore}%
                    </div>
                  </div>
                </div>

                {/* Career Attributes Matrix */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 py-3 bg-slate-50/80 rounded-lg px-4 border border-slate-200/60 text-xs">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">Degree / Qualifications</span>
                    <span className="font-semibold text-slate-800">{career.degree}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">Key Entrance Exams</span>
                    <span className="font-semibold text-blue-900">{career.entranceExams}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">Top Institutes</span>
                    <span className="font-semibold text-slate-800">{career.topInstitutes}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">Estimated Compensation</span>
                    <span className="font-bold text-emerald-800">{career.startingSalary}</span>
                  </div>
                </div>

                <div className="mt-4 space-y-2 text-xs">
                  <div className="text-slate-700">
                    <strong className="text-slate-900">Why this fits your profile:</strong> {career.whyFit}
                  </div>
                  <div className="text-slate-600 flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-blue-700 flex-shrink-0" />
                    <span><strong>Market Demand & Outlook:</strong> {career.outlook}</span>
                  </div>
                </div>

                {/* Footer action button */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end print:hidden">
                  <button
                    type="button"
                    onClick={() => onAskCounsellor(`Tell me more about how to prepare for ${career.title}. What entrance exams (${career.entranceExams}) should I focus on and which books to study?`)}
                    className="text-xs text-blue-700 hover:text-blue-900 font-bold flex items-center gap-1 hover:underline cursor-pointer"
                  >
                    <span>Ask AI Counsellor for syllabus & prep guide for {career.title}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Plan & Scholarship Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Step-by-Step Action Plan */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
            <h4 className="text-base font-bold text-slate-900 font-serif mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
              <span>Recommended Milestone Roadmap</span>
            </h4>
            <div className="space-y-4">
              {result.actionPlan?.map((plan, idx) => (
                <div key={idx} className="relative pl-6 border-l-2 border-blue-600 pb-2 last:pb-0">
                  <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-blue-600"></div>
                  <span className="text-[11px] font-bold text-blue-800 uppercase tracking-wider">{plan.timeline}</span>
                  <h5 className="text-xs font-bold text-slate-900 mt-0.5">{plan.title}</h5>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{plan.details}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Applicable Government Scholarships */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
            <h4 className="text-base font-bold text-slate-900 font-serif mb-4 flex items-center gap-2">
              <Landmark className="w-5 h-5 text-amber-600" />
              <span>Eligible Government Scholarships</span>
            </h4>
            <div className="space-y-3">
              {result.scholarships?.map((sch, idx) => (
                <div key={idx} className="p-3 bg-amber-50/50 border border-amber-200/70 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">{sch.name}</span>
                    <span className="text-[10px] font-semibold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                      Govt Scheme
                    </span>
                  </div>
                  <div className="text-xs text-emerald-800 font-bold mt-1">{sch.benefit}</div>
                  <p className="text-[11px] text-slate-600 mt-0.5">{sch.eligibility}</p>
                  <div className="text-[10px] text-slate-500 font-mono mt-1">
                    Portal: {sch.portal}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* School Support Cell Footer Note */}
        <div className="bg-blue-900 text-white rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-amber-300">
              PM SHRI GSSS Randhawa Masandan Guidance Cell
            </h4>
            <p className="text-xs text-blue-100 max-w-2xl leading-relaxed">
              {result.schoolSupport || 'Visit the school Career Guidance Desk for one-on-one parent-student counseling, physical mock test papers, and scholarship document verification.'}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onAskCounsellor("What specific career mentorship workshops does PM SHRI GSSS Randhawa Masandan organize for students?")}
            className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-blue-950 font-bold text-xs rounded-md shadow-xs transition-colors flex-shrink-0 cursor-pointer"
          >
            Ask Guidance Desk
          </button>
        </div>

      </div>
    </section>
  );
};
