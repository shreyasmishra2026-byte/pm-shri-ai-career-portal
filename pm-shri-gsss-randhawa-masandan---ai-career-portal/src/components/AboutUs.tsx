import React from 'react';
import { 
  Building2, 
  Award, 
  Cpu, 
  Briefcase, 
  Compass, 
  MapPin, 
  PhoneCall, 
  Mail, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  GraduationCap
} from 'lucide-react';
import { SCHOOL_INFO } from '../data/schoolInfo';

export const AboutUs: React.FC = () => {
  return (
    <section id="about-section" className="w-full py-12 px-4 sm:px-8 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Masthead */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-100 text-blue-900 border border-blue-200 rounded-md text-xs font-bold mb-2 uppercase tracking-wider">
            <Building2 className="w-4 h-4 text-blue-700" />
            <span>Institutional Profile</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif">
            About PM SHRI GSSS Randhawa Masandan, Jalandhar
          </h2>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed">
            Designated under the prestigious Government of India <strong>PM SHRI (Pradhan Mantri Schools for Rising India)</strong> scheme, 
            Government Senior Secondary School Randhawa Masandan serves as an exemplar educational institution delivering high-quality, inclusive, and futuristic education in the Doaba region of Punjab.
          </p>
        </div>

        {/* PM SHRI Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl hover:border-blue-300 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-blue-900 text-amber-300 flex items-center justify-center mb-4">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 font-serif mb-2">
              PM SHRI Exemplar Status
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Showcase school embodying National Education Policy (NEP 2020) with child-centric pedagogy, experiential learning, and modern digital classrooms.
            </p>
          </div>

          <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl hover:border-blue-300 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-blue-900 text-amber-300 flex items-center justify-center mb-4">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 font-serif mb-2">
              Atal Tinkering Lab (ATL)
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              State-of-the-art innovation lab equipped with 3D printers, robotics kits, IoT sensors, and programming microcontrollers for young innovators.
            </p>
          </div>

          <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl hover:border-blue-300 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-blue-900 text-amber-300 flex items-center justify-center mb-4">
              <Briefcase className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 font-serif mb-2">
              Vocational Skill Hubs
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              NSQF certified vocational training in Information Technology, Electronic Maintenance, and Green Energy to prepare students for real-world careers.
            </p>
          </div>

          <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl hover:border-blue-300 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-blue-900 text-amber-300 flex items-center justify-center mb-4">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 font-serif mb-2">
              Career & Psychometric Cell
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Dedicated counseling room offering personalized psychometric assessments, CUET/NDA mentorship, and state scholarship facilitation desks.
            </p>
          </div>
        </div>

        {/* Leadership & Faculty Message */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-blue-900 to-indigo-950 text-white rounded-xl p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-amber-400 text-blue-950 flex items-center justify-center font-bold text-lg">
                <GraduationCap className="w-7 h-7" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">
                  Principal's Desk
                </h4>
                <p className="text-xs text-amber-300">
                  {SCHOOL_INFO.principalName}
                </p>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-blue-100 leading-relaxed italic">
              "Under the PM SHRI initiative, our mission is to ensure that no child in rural or semi-urban Punjab is left behind in the 21st-century knowledge economy. We provide our students with the same modern AI guidance, labs, and competitive exam coaching that was once confined only to metropolitan institutions."
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 sm:p-8 shadow-2xs">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-900 flex items-center justify-center font-bold text-lg">
                <Compass className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900">
                  Guidance & Counseling Cell
                </h4>
                <p className="text-xs text-blue-700 font-semibold">
                  {SCHOOL_INFO.counsellorHead}
                </p>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              "Our school guidance cell runs round the year. We assist students right from Class 8th foundation, stream allocation in Class 10th, to board exams and entrance applications. Every student has free access to Margdarshak AI and physical counseling desks."
            </p>
          </div>
        </div>

        {/* Institutional Contact & Verification Matrix */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 sm:p-8">
          <h3 className="text-lg font-bold text-slate-900 font-serif mb-4 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-blue-700" />
            <span>School Identification & Contact Information</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Campus Address</span>
              <p className="mt-1 font-semibold text-slate-800 leading-snug">
                {SCHOOL_INFO.location}, {SCHOOL_INFO.district}, Punjab - {SCHOOL_INFO.pincode}
              </p>
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">UDISE+ Code</span>
              <p className="mt-1 font-mono font-bold text-blue-900 text-sm">
                {SCHOOL_INFO.udiseCode}
              </p>
              <span className="text-[10px] text-slate-500">Dept. of School Education Punjab</span>
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Helpline & Career Desk</span>
              <p className="mt-1 font-semibold text-slate-800">
                {SCHOOL_INFO.helplinePhone}
              </p>
              <span className="text-[10px] text-slate-500">{SCHOOL_INFO.officialEmail}</span>
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">School Working Hours</span>
              <p className="mt-1 font-semibold text-slate-800">
                {SCHOOL_INFO.schoolHours}
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
