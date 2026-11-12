import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  BookOpen, 
  TrendingUp, 
  ArrowRight, 
  X, 
  GraduationCap, 
  CheckCircle2, 
  Building2, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { CAREERS_DIRECTORY, CAREER_CATEGORIES } from '../data/careersData';
import { CareerItem } from '../types';

interface ExploreCareersProps {
  onSelectCareerToConsult?: (careerTitle: string) => void;
}

export const ExploreCareers: React.FC<ExploreCareersProps> = ({ onSelectCareerToConsult }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Careers');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCareerDetail, setActiveCareerDetail] = useState<CareerItem | null>(null);

  const filteredCareers = CAREERS_DIRECTORY.filter((career) => {
    const matchesCategory = selectedCategory === 'All Careers' || career.category === selectedCategory;
    const matchesQuery = 
      career.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      career.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      career.degrees.some((d) => d.toLowerCase().includes(searchQuery.toLowerCase())) ||
      career.entranceExams.some((e) => e.toLowerCase().includes(searchQuery.toLowerCase())) ||
      career.topColleges.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesQuery;
  });

  return (
    <section id="explore-section" className="w-full py-12 px-4 sm:px-8 bg-slate-50/70 border-b border-slate-200">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-100 text-blue-900 border border-blue-200 rounded-md text-xs font-bold mb-2 uppercase tracking-wider">
            <BookOpen className="w-4 h-4 text-blue-700" />
            <span>National & State Educational Repository</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif">
            Explore 150+ Career Pathways & Degree Trajectories
          </h2>
          <p className="text-sm text-slate-600 mt-1 leading-relaxed">
            Curated specifically for senior school students under NEP 2020. Discover entrance examinations, top colleges in Punjab and India, and starting compensations across all academic disciplines.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-xs mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search careers, entrance exams (e.g. JEE, NEET, NDA, CLAT), colleges, or skills..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Stream Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
            {CAREER_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-xs font-semibold px-3.5 py-2 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-blue-900 text-white shadow-2xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Career Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCareers.map((career) => (
            <div
              key={career.id}
              className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-blue-900 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
                    {career.category}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    career.growthRating === 'Very High' 
                      ? 'bg-emerald-100 text-emerald-800' 
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {career.growthRating} Growth
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 font-serif mb-1.5">
                  {career.title}
                </h3>
                <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">
                  {career.shortDesc}
                </p>

                <div className="space-y-2 text-xs border-t border-slate-100 pt-3">
                  <div className="text-slate-700">
                    <strong className="text-slate-900">Entrance:</strong> {career.entranceExams.slice(0, 2).join(', ')}
                  </div>
                  <div className="text-slate-700">
                    <strong className="text-slate-900">Top Institutes:</strong> {career.topColleges.slice(0, 2).join(', ')}
                  </div>
                  <div className="text-emerald-800 font-bold">
                    Est. Salary: {career.salaryRange}
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {career.keySkills.slice(0, 2).map((sk, i) => (
                    <span key={i} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                      {sk}
                    </span>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setActiveCareerDetail(career)}
                  className="text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1 hover:underline cursor-pointer"
                >
                  <span>Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}

          {filteredCareers.length === 0 && (
            <div className="col-span-full bg-white rounded-xl border border-slate-200 p-10 text-center text-slate-500">
              <p className="text-base font-semibold text-slate-800">No matching careers found</p>
              <p className="text-xs mt-1">Try modifying your keyword search or selecting "All Careers".</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All Careers');
                }}
                className="mt-4 px-4 py-2 bg-blue-700 text-white rounded text-xs font-bold"
              >
                Reset Search
              </button>
            </div>
          )}
        </div>

        {/* Modal for Deep Career Details */}
        {activeCareerDetail && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 animate-in fade-in duration-200">
              
              {/* Modal Masthead */}
              <div className="bg-[#0f2342] text-white p-6 sticky top-0 z-10 flex items-start justify-between">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300">
                    {activeCareerDetail.category} Pathway
                  </span>
                  <h3 className="text-xl font-bold font-serif mt-1">
                    {activeCareerDetail.title}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveCareerDetail(null)}
                  className="p-1 rounded-md text-slate-300 hover:text-white hover:bg-blue-900 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-5 text-xs sm:text-sm text-slate-700">
                <div>
                  <h4 className="font-bold text-slate-900 uppercase text-xs tracking-wider mb-1">
                    Role Description
                  </h4>
                  <p className="leading-relaxed text-slate-600">
                    {activeCareerDetail.shortDesc}
                  </p>
                </div>

                <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-lg">
                  <h5 className="font-bold text-blue-950 text-xs uppercase tracking-wider mb-1">
                    Senior Secondary Stream Requirement
                  </h5>
                  <p className="text-xs text-blue-900 font-medium">
                    {activeCareerDetail.streamReq}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
                    <h5 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2">
                      Target Degrees / Diplomas
                    </h5>
                    <ul className="space-y-1 text-xs">
                      {activeCareerDetail.degrees.map((d, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-700 flex-shrink-0 mt-0.5" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
                    <h5 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2">
                      Key National Entrance Exams
                    </h5>
                    <ul className="space-y-1 text-xs">
                      {activeCareerDetail.entranceExams.map((e, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
                          <span className="font-semibold text-slate-800">{e}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2">
                    Premier Colleges & Universities (Punjab & India)
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {activeCareerDetail.topColleges.map((col, i) => (
                      <span key={i} className="bg-slate-100 border border-slate-200 text-slate-800 text-xs px-2.5 py-1 rounded">
                        {col}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                    <div className="text-[11px] font-bold text-emerald-900 uppercase">Estimated Compensation</div>
                    <div className="text-base font-black text-emerald-800 mt-0.5">
                      {activeCareerDetail.salaryRange}
                    </div>
                  </div>
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="text-[11px] font-bold text-blue-900 uppercase">Future Outlook</div>
                    <div className="text-base font-black text-blue-900 mt-0.5">
                      {activeCareerDetail.growthRating} Demand
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-1">
                    Day in the Life of a Professional
                  </h4>
                  <p className="text-xs text-slate-600 italic">
                    "{activeCareerDetail.dayInTheLife}"
                  </p>
                </div>

                {/* Modal Footer */}
                <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <span className="text-[11px] text-slate-500">
                    PM SHRI GSSS Randhawa Masandan Guidance Repository
                  </span>
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => setActiveCareerDetail(null)}
                      className="flex-1 sm:flex-none px-4 py-2 border border-slate-300 rounded text-xs font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      Close
                    </button>
                    {onSelectCareerToConsult && (
                      <button
                        onClick={() => {
                          const title = activeCareerDetail.title;
                          setActiveCareerDetail(null);
                          onSelectCareerToConsult(`I am interested in becoming a ${title}. Can you guide me on the Class 11-12 subject choices, entrance exam preparation, and top colleges in Punjab?`);
                        }}
                        className="flex-1 sm:flex-none px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded text-xs font-bold flex items-center justify-center gap-1.5"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                        <span>Consult AI Mentor</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
