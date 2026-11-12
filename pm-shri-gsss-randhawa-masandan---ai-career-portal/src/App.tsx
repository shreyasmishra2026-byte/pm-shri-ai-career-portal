import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AssessmentForm } from './components/AssessmentForm';
import { AssessmentResults } from './components/AssessmentResults';
import { AiCounsellorSection } from './components/AiCounsellorSection';
import { ExploreCareers } from './components/ExploreCareers';
import { AboutUs } from './components/AboutUs';
import { Footer } from './components/Footer';
import { AssessmentInput, AssessmentResult } from './types';

// Default initial blueprint so the results section is immediately viewable and showcase-ready
const INITIAL_DEMO_RESULT: AssessmentResult = {
  studentProfileSummary: "Student demonstrating high aptitude for logical reasoning, mathematical problem-solving, and technology. Strong foundation in Physics and Computer Science with an ambition for cutting-edge engineering and global innovation.",
  topStreamsClass11_12: [
    {
      streamName: "Science: Non-Medical (PCM with Computer Science / AI)",
      suggestedElectives: ["Physics", "Chemistry", "Mathematics", "Computer Science / Artificial Intelligence", "English Core"],
      whyRecommended: "Optimal pathway for Premier Engineering (IITs/NITs), National Defence Academy (Air Force/Naval technical wings), and Central University Computing programs."
    },
    {
      streamName: "Alternative: PM SHRI Vocational IT & Green Energy Track",
      suggestedElectives: ["Information Technology (IT/ITes)", "Applied Mathematics", "Physics", "English"],
      whyRecommended: "Skill-oriented NSQF Level 4 curriculum with early technical certifications and industry internships."
    }
  ],
  recommendedCareers: [
    {
      title: "Artificial Intelligence & Software Engineer",
      streamRoadmap: "Class 11-12: Non-Medical (Physics, Chemistry, Mathematics & CS/AI)",
      degree: "B.Tech in Computer Science / Artificial Intelligence & Data Science",
      entranceExams: "JEE Main, JEE Advanced, CUET-UG, BITSAT",
      topInstitutes: "IIT Ropar, NIT Jalandhar, Panjab University UIET Chandigarh, Thapar Institute",
      startingSalary: "₹8.5 - 22.0 LPA",
      matchScore: 97,
      outlook: "Exponential expansion driven by generative AI, cloud computing, and automated robotics",
      whyFit: "Combines your passion for coding, discrete mathematics, and logical system architecture."
    },
    {
      title: "Technical Defence Officer (Indian Armed Forces via NDA)",
      streamRoadmap: "Class 11-12: Non-Medical (Mandatory Mathematics & Physics)",
      degree: "B.Tech / B.Sc from NDA Khadakwasla + Indian Naval Academy / IMA",
      entranceExams: "UPSC NDA & NA Examination, 5-Day SSB Interview, 10+2 TES Entry",
      topInstitutes: "National Defence Academy (NDA Khadakwasla), Indian Military Academy (IMA Dehradun)",
      startingSalary: "₹10.5 - 16.0 LPA + Subsidized Officer Accommodation, High Honor & Pension",
      matchScore: 91,
      outlook: "Pinnacle of national service, leadership development, and strategic military technology",
      whyFit: "Leverages problem-solving and leadership qualities within a disciplined, prestigious career."
    },
    {
      title: "Data Scientist & Quantitative Analyst",
      streamRoadmap: "Class 11-12: Non-Medical or Commerce with Mathematics",
      degree: "B.S. in Data Science / B.Sc Statistics & Computing (IIT Madras / ISI)",
      entranceExams: "CUET-UG, ISI Admission Test, JEE Main",
      topInstitutes: "Indian Statistical Institute (ISI Delhi/Kolkata), IITs, Panjab University",
      startingSalary: "₹8.0 - 20.0 LPA",
      matchScore: 89,
      outlook: "High demand across financial analytics, healthcare genomics, and e-commerce",
      whyFit: "Capitalizes on analytical problem solving and scientific data modeling."
    }
  ],
  actionPlan: [
    {
      timeline: "Immediate (Current Session)",
      title: "NCERT Conceptual Mastery & Practical Lab Focus",
      details: "Focus on building deep conceptual clarity in Class 10/11 NCERT Math & Science. Utilize the PM SHRI Atal Tinkering Lab for robotics & coding."
    },
    {
      timeline: "Class 11th - 12th Academic Years",
      title: "Target Entrance Exam Preparation (JEE / CUET / NDA)",
      details: "Enroll in school Saturday mentorship batches. Solve past 10-year question banks and take bi-weekly timed mock tests."
    },
    {
      timeline: "Skill Enhancement & Certifications",
      title: "Digital Portfolio & SWAYAM Courses",
      details: "Complete certified Python/AI foundational modules on government SWAYAM/DIKSHA portals to gain a competitive edge."
    }
  ],
  scholarships: [
    {
      name: "PM YASASVI Central Scheme",
      eligibility: "Meritorious students in accredited PM SHRI schools (OBC, EBC, DNT categories)",
      benefit: "Up to ₹1,25,000 per year for senior secondary studies",
      portal: "National Scholarship Portal (scholarships.gov.in)"
    },
    {
      name: "Post-Matric Scholarship Scheme for SC/BC Students (Punjab)",
      eligibility: "Punjab domicile students pursuing post-matriculation studies in govt schools",
      benefit: "Full tuition fee reimbursement + monthly maintenance grant",
      portal: "Dr. Ambedkar Scholarship Portal Punjab (scholarships.punjab.gov.in)"
    },
    {
      name: "National Means-cum-Merit Scholarship (NMMSS)",
      eligibility: "Students scoring qualifying marks in state-level merit test",
      benefit: "₹12,000 per annum throughout Class 9th to 12th",
      portal: "National Scholarship Portal (NSP)"
    }
  ],
  schoolSupport: "The PM SHRI GSSS Randhawa Masandan Guidance Desk (Room 14) is open Monday through Saturday for physical document verification, mock interview practice, and personalized stream counselling."
};

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult>(INITIAL_DEMO_RESULT);
  const [assessedStudentName, setAssessedStudentName] = useState('Amanpreet Singh');
  const [isAssessing, setIsAssessing] = useState(false);
  const [counsellorPrompt, setCounsellorPrompt] = useState<string>('');

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    
    // Smooth scroll to the corresponding section element
    const targetMap: { [key: string]: string } = {
      home: 'top-anchor',
      assessment: 'assessment-section',
      explore: 'explore-section',
      counsellor: 'counsellor-section',
      about: 'about-section',
    };

    const targetElId = targetMap[sectionId];
    if (targetElId) {
      if (targetElId === 'top-anchor') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const el = document.getElementById(targetElId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  const handleAssessmentSubmit = async (formData: AssessmentInput) => {
    setIsAssessing(true);
    setAssessedStudentName(formData.fullName || 'Student Scholar');

    try {
      const response = await fetch('/api/career/assess', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success && data.data) {
        setAssessmentResult(data.data);
      }
    } catch (err) {
      console.error('Assessment submit error:', err);
    } finally {
      setIsAssessing(false);
      // Smoothly scroll down to the results section
      setTimeout(() => {
        const resultsEl = document.getElementById('results-section');
        if (resultsEl) {
          resultsEl.scrollIntoView({ behavior: 'smooth' });
        }
      }, 250);
    }
  };

  const handleConsultCounsellor = (prompt: string) => {
    setCounsellorPrompt(prompt);
    setActiveSection('counsellor');
    setTimeout(() => {
      const counsellorEl = document.getElementById('counsellor-section');
      if (counsellorEl) {
        counsellorEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  };

  return (
    <div id="top-anchor" className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      {/* 1. Traditional Website Header & Full-Width Top Navigation */}
      <Header activeSection={activeSection} onNavigate={handleNavigate} />

      {/* 2. Main Content Container */}
      <main className="flex-1">
        {/* Homepage Hero with School Branding */}
        <Hero onNavigate={handleNavigate} />

        {/* Career Assessment Form Section */}
        <AssessmentForm onSubmit={handleAssessmentSubmit} isLoading={isAssessing} />

        {/* AI Career Assessment Results Section (Appears below form) */}
        <AssessmentResults
          result={assessmentResult}
          studentName={assessedStudentName}
          onAskCounsellor={handleConsultCounsellor}
        />

        {/* Embedded Full-Width AI Career Chatbox Section (Beneath results) */}
        <AiCounsellorSection
          currentResult={assessmentResult}
          externalPrompt={counsellorPrompt}
          onClearExternalPrompt={() => setCounsellorPrompt('')}
        />

        {/* Explore 150+ Careers Directory Section */}
        <ExploreCareers onSelectCareerToConsult={handleConsultCounsellor} />

        {/* About Us: PM SHRI GSSS Randhawa Masandan Institutional Profile */}
        <AboutUs />
      </main>

      {/* 3. Official Educational Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
