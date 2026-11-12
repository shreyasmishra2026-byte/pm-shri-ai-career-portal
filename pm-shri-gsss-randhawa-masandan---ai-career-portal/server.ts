import express from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProduction = process.env.NODE_ENV === 'production';
const port = parseInt(process.env.PORT || '3000', 10);

const app = express();
app.use(express.json());

// Initialize Google GenAI client if GEMINI_API_KEY is present
let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  try {
    ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  } catch (err) {
    console.error('Failed to initialize GoogleGenAI client:', err);
  }
}

// Fallback career assessment generator when API key is not present or on API error
function generateFallbackAssessment(data: any) {
  const { classLevel, streamInterest, favoriteSubjects = [], skills = [], workStyle, careerGoal } = data;
  
  const subjectsList = Array.isArray(favoriteSubjects) ? favoriteSubjects.join(', ') : favoriteSubjects;
  const skillsList = Array.isArray(skills) ? skills.join(', ') : skills;

  // Tailored recommendations based on stream interest
  let primaryCareers = [
    {
      title: 'Full Stack AI / Software Engineering',
      streamRoadmap: 'Class 11-12: Science (PCM with Computer Science / AI elective)',
      degree: 'B.Tech / B.E. in Computer Science, AI & Data Science, or BCA + MCA',
      entranceExams: 'JEE Main, JEE Advanced, CUET-UG, Punjab State CET',
      topInstitutes: 'IIT Ropar, NIT Jalandhar, Panjab University Chandigarh, Thapar Institute, GNDU Amritsar',
      startingSalary: '₹6.5 - 18 LPA',
      matchScore: 96,
      outlook: 'High Demand (Projected 28% growth over next decade under Industry 4.0)',
      whyFit: `Directly leverages your strengths in ${subjectsList || 'analytical disciplines'} and ${skillsList || 'problem solving'}. Matches your goal of ${careerGoal || 'innovation and high-growth careers'}.`
    },
    {
      title: 'Data Scientist & AI Product Analyst',
      streamRoadmap: 'Class 11-12: Science (PCM) or Commerce with Applied Mathematics',
      degree: 'B.Sc / B.S. in Data Science, Statistics, Mathematics & Computing, or B.Tech CSE',
      entranceExams: 'CUET-UG, ISI Admission Test, JEE Main, CMI Entrance',
      topInstitutes: 'IITs, ISI Kolkata/Delhi, Delhi University, Panjab University, Chandigarh University',
      startingSalary: '₹7.0 - 16 LPA',
      matchScore: 92,
      outlook: 'Very High Growth across FinTech, E-Commerce, Healthcare & Public Policy',
      whyFit: `Combines quantitative reasoning with real-world technological decision making.`
    },
    {
      title: 'Technical Defence Officer (Indian Armed Forces)',
      streamRoadmap: 'Class 11-12: Science (PCM) with Physical Education / NCC',
      degree: 'National Defence Academy (NDA) B.Tech / TES 10+2 Entry (Indian Army/Navy/Air Force)',
      entranceExams: 'UPSC NDA & NA Exam, SSB Interview, 10+2 Technical Entry Scheme (TES)',
      topInstitutes: 'National Defence Academy Khadakwasla, Indian Military Academy Dehradun, Indian Naval Academy Ezhimala',
      startingSalary: '₹10 - 15 LPA + Subsidized Officer Perks, High National Prestige',
      matchScore: 88,
      outlook: 'Exceptional Honor, Job Security, and Direct Leadership in National Defense',
      whyFit: `Fulfills leadership, discipline and national service while offering world-class government technical training.`
    }
  ];

  if (streamInterest?.toLowerCase().includes('medical') || streamInterest?.toLowerCase().includes('pcb')) {
    primaryCareers = [
      {
        title: 'MBBS / Healthcare Specialist (Doctor)',
        streamRoadmap: 'Class 11-12: Science (PCB - Physics, Chemistry, Biology)',
        degree: 'MBBS followed by MD/MS specialization',
        entranceExams: 'NEET-UG (National Eligibility cum Entrance Test)',
        topInstitutes: 'AIIMS Bathinda, AIIMS New Delhi, Govt. Medical College Amritsar, GMC Patiala, CMC Ludhiana',
        startingSalary: '₹8.0 - 20 LPA',
        matchScore: 95,
        outlook: 'Perpetual high need, noble healthcare impact and steady respect in society',
        whyFit: `Aligns with your empathy and passion for biology and health sciences.`
      },
      {
        title: 'Biotechnology & Bioinformatics Researcher',
        streamRoadmap: 'Class 11-12: Science (PCB / PCMB with Computer/Biotech)',
        degree: 'B.Tech / B.Sc in Biotechnology, Genetics, or Pharmaceutical Sciences',
        entranceExams: 'CUET-UG, NEET-UG, ICAR AIEEA',
        topInstitutes: 'Punjab Agricultural University (PAU) Ludhiana, NIPER Mohali, IISER Mohali, DU',
        startingSalary: '₹5.5 - 14 LPA',
        matchScore: 90,
        outlook: 'Surging research in vaccine development, agricultural biotech and genomic medicine',
        whyFit: `Great synergy between biological understanding and cutting-edge laboratory research.`
      },
      {
        title: 'Clinical Psychologist / Neuropsychologist',
        streamRoadmap: 'Class 11-12: PCB or Humanities with Psychology / Biology',
        degree: 'B.A. / B.Sc Psychology followed by M.Sc & M.Phil in Clinical Psychology (RCI recognized)',
        entranceExams: 'CUET-UG, State Central University Entrance',
        topInstitutes: 'NIMHANS Bengaluru, Panjab University, Delhi University, TISS Mumbai',
        startingSalary: '₹5.0 - 12 LPA',
        matchScore: 87,
        outlook: 'Rising awareness of mental healthcare across schools, corporates, and hospitals',
        whyFit: `Capitalizes on deep active listening, empathy and human behavior analysis.`
      }
    ];
  } else if (streamInterest?.toLowerCase().includes('commerce') || streamInterest?.toLowerCase().includes('finance')) {
    primaryCareers = [
      {
        title: 'Chartered Accountant (CA) & Financial Strategist',
        streamRoadmap: 'Class 11-12: Commerce with Accountancy, Economics & Mathematics',
        degree: 'ICAI CA Certification (Foundation -> Intermediate -> Final) + B.Com (Hons)',
        entranceExams: 'CA Foundation (ICAI), CUET-UG (B.Com Hons)',
        topInstitutes: 'The Institute of Chartered Accountants of India (ICAI), SRCC Delhi, Panjab University',
        startingSalary: '₹8.5 - 22 LPA',
        matchScore: 96,
        outlook: 'Critical across corporate governance, taxation, auditing and startup investments',
        whyFit: `Strong fit for structured numbers, analytical taxation and prestigious financial advisory.`
      },
      {
        title: 'Investment Banker & Fintech Product Manager',
        streamRoadmap: 'Class 11-12: Commerce with Mathematics / Computer Applications',
        degree: 'BBA / BMS / Integrated MBA (IIM IPMAT) or B.Com + CFA Level 1',
        entranceExams: 'IIM IPMAT (Indore/Rohtak), CUET-UG, NPAT, SET',
        topInstitutes: 'IIM Indore, IIM Rohtak, Shaheed Sukhdev College of Business Studies (SSCBS Delhi), NMIMS',
        startingSalary: '₹10 - 24 LPA',
        matchScore: 91,
        outlook: 'Fast-paced corporate growth in digital banking, equity research and venture capital',
        whyFit: `Combines financial acumen with strategic commercial negotiation skills.`
      },
      {
        title: 'Civil Services / Indian Revenue Service (IRS)',
        streamRoadmap: 'Class 11-12: Commerce or Humanities with Economics & Public Policy',
        degree: 'Graduation in Any Discipline (B.Com / B.A. Economics / BBA)',
        entranceExams: 'UPSC Civil Services Examination (CSE), Punjab Civil Services (PCS)',
        topInstitutes: 'LBSNAA Mussoorie (post-selection), Delhi University, Panjab University',
        startingSalary: '₹9.0 - 16 LPA + Apex Government Authority and Perquisites',
        matchScore: 89,
        outlook: 'Top-tier prestige, social policy leadership and direct national development administration',
        whyFit: `Matches your vision for public service, governance and high societal impact.`
      }
    ];
  } else if (streamInterest?.toLowerCase().includes('humanities') || streamInterest?.toLowerCase().includes('arts')) {
    primaryCareers = [
      {
        title: 'Civil Services Administrator (IAS / IPS / PCS)',
        streamRoadmap: 'Class 11-12: Humanities (History, Political Science, Geography, Sociology/Economics)',
        degree: 'B.A. (Hons) in Political Science / History / Public Administration or Law (BA LLB)',
        entranceExams: 'UPSC Civil Services Examination (CSE), Punjab Civil Services (PPSC)',
        topInstitutes: 'Delhi University (Hindu, Miranda, St. Stephen’s), Panjab University Chandigarh, JNU',
        startingSalary: '₹9.0 - 15 LPA + Official Residence, Vehicle and District Administration Authority',
        matchScore: 97,
        outlook: 'Pinnacle of public governance and policymaking in India',
        whyFit: `Perfect harmony with broad humanities depth, constitutional understanding and community leadership.`
      },
      {
        title: 'Corporate Lawyer / Constitutional Advocate',
        streamRoadmap: 'Class 11-12: Humanities or Commerce with Legal Studies / Political Science',
        degree: '5-Year Integrated B.A. LL.B. (Hons)',
        entranceExams: 'CLAT (Common Law Admission Test), AILET, PU Law Entrance',
        topInstitutes: 'NLSIU Bengaluru, NALSAR Hyderabad, RGNUL Patiala, Faculty of Law Delhi University',
        startingSalary: '₹7.5 - 20 LPA',
        matchScore: 92,
        outlook: 'Robust demand in corporate arbitration, cyber law, patent rights and constitutional litigation',
        whyFit: `Excels with sharp debating, critical textual analysis and civic justice orientation.`
      },
      {
        title: 'Digital Media Journalist & Content Strategist',
        streamRoadmap: 'Class 11-12: Humanities with Mass Media, English & Psychology',
        degree: 'B.A. in Journalism & Mass Communication (BJMC)',
        entranceExams: 'CUET-UG, IIMC Entrance Exam, IP University CET',
        topInstitutes: 'Indian Institute of Mass Communication (IIMC) New Delhi, AJK MCRC Jamia, Asian College of Journalism',
        startingSalary: '₹5.0 - 12 LPA',
        matchScore: 88,
        outlook: 'Booming multimedia journalism, podcasting, corporate PR and brand communication',
        whyFit: `Leverages creative communication, storytelling and keen observational awareness.`
      }
    ];
  }

  return {
    studentProfileSummary: `Student currently in ${classLevel || 'Class 10-12'}, showing strong orientation towards ${streamInterest || 'academic excellence'}, keen interest in ${subjectsList || 'core curriculum'}, and strengths in ${skillsList || 'practical problem-solving'}.`,
    topStreamsClass11_12: [
      {
        streamName: streamInterest || 'Science with Computer Science',
        suggestedElectives: ['Mathematics', 'Computer Science / Artificial Intelligence', 'English Core', 'Physical Education'],
        whyRecommended: 'Provides the strongest foundational flexibility for premier engineering, technology and central university programs.'
      },
      {
        streamName: 'Alternative Stream: Multi-disciplinary Vocational Track',
        suggestedElectives: ['Information Technology (IT/ITes)', 'Data Entry Operations', 'Applied Mathematics', 'Entrepreneurship'],
        whyRecommended: 'Fully aligned with NEP 2020 PM SHRI Skill Hub modules with early industry certifications.'
      }
    ],
    recommendedCareers: primaryCareers,
    actionPlan: [
      {
        timeline: 'Immediate (Next 30-90 Days)',
        title: 'Curriculum Mastery & Foundational Strength',
        details: 'Build NCERT conceptual clarity in your core subjects. Take part in PM SHRI Atal Tinkering Lab activities or school science exhibitions.'
      },
      {
        timeline: 'Class 11th - 12th',
        title: 'Exam Target Mapping & Mock Practice',
        details: 'Begin structured preparation for target entrance exams (CUET, JEE, NEET, or NDA). Practice previous 5-year question papers weekly.'
      },
      {
        timeline: 'Skill Building',
        title: 'Digital & Soft Skills Portfolio',
        details: 'Enroll in SWAYAM / DIKSHA free certified courses. Participate in state-level debates, science Olympiads, or sports.'
      }
    ],
    scholarships: [
      {
        name: 'PM YASASVI Scholarship Scheme',
        eligibility: 'Class 9 to 12 students from OBC, EBC, DNT categories in top accredited schools.',
        benefit: 'Up to ₹75,000 to ₹1,25,000 per year for academic expenses.',
        portal: 'National Scholarship Portal (scholarships.gov.in)'
      },
      {
        name: 'Post-Matric Scholarship Scheme for SC/BC Students (Punjab)',
        eligibility: 'Punjab domicile students belonging to SC/BC communities pursuing Post-Matriculation studies.',
        benefit: '100% tuition fee waiver plus maintenance allowance.',
        portal: 'Dr. Ambedkar Scholarship Portal Punjab (scholarships.punjab.gov.in)'
      },
      {
        name: 'National Means-cum-Merit Scholarship Scheme (NMMSS)',
        eligibility: 'Meritorious students studying in Govt/Govt-aided schools after passing class 8th.',
        benefit: '₹12,000 per annum (₹1,000/month) from Class 9th through Class 12th.',
        portal: 'NSP Portal via State Education Department'
      },
      {
        name: 'INSPIRE Scholarship for Higher Education (SHE)',
        eligibility: 'Top 1% students in 12th Board examinations joining Natural & Basic Sciences degrees.',
        benefit: '₹80,000 per annum for five years (B.Sc & M.Sc).',
        portal: 'Department of Science and Technology (online-inspire.gov.in)'
      }
    ],
    schoolSupport: 'PM SHRI GSSS Randhawa Masandan provides free dedicated career mentoring, smart lab sessions, CUET/board preparation resources, and scholarship application desk at the school guidance cell.'
  };
}

// Career Assessment Endpoint
app.post('/api/career/assess', async (req, res) => {
  try {
    const studentData = req.body;
    
    if (ai) {
      try {
        const prompt = `
You are the Chief AI Career Strategist for "PM SHRI GSSS Randhawa Masandan, Jalandhar" (an exemplar government senior secondary school under the PM SHRI scheme in Punjab, India).
Analyze the following student profile and generate a comprehensive, highly accurate, and encouraging Career Assessment Dossier tailored to Indian educational pathways, national entrance examinations, premier colleges, scholarships, and NEP 2020 guidelines:

Student Profile:
- Class/Grade Level: ${studentData.classLevel || 'Class 10th'}
- Primary Stream Interest: ${studentData.streamInterest || 'Science / Engineering'}
- Favorite Subjects: ${Array.isArray(studentData.favoriteSubjects) ? studentData.favoriteSubjects.join(', ') : studentData.favoriteSubjects}
- Natural Skills & Strengths: ${Array.isArray(studentData.skills) ? studentData.skills.join(', ') : studentData.skills}
- Preferred Work Environment: ${studentData.workStyle || 'Technology / Corporate'}
- Core Ambition / Career Goal: ${studentData.careerGoal || 'High Growth & Innovation'}
- Location / Higher Education Target: ${studentData.locationPreference || 'Punjab & National Premier Institutes'}
- Additional Student Notes: ${studentData.studentNotes || 'None'}

Return ONLY valid JSON with this exact schema (no markdown fences, just pure JSON):
{
  "studentProfileSummary": "A 2-3 sentence personalized executive summary praising the student's unique combination of subjects and strengths.",
  "topStreamsClass11_12": [
    {
      "streamName": "e.g., Non-Medical (Science PCM with CS/AI)",
      "suggestedElectives": ["Maths", "Physics", "Chemistry", "Computer Science / AI", "Physical Education"],
      "whyRecommended": "Detailed rationale"
    },
    {
      "streamName": "Alternative recommended stream or vocational track",
      "suggestedElectives": ["Subject 1", "Subject 2", "Subject 3"],
      "whyRecommended": "Detailed rationale"
    }
  ],
  "recommendedCareers": [
    {
      "title": "Exact Career Title (e.g. AI & Machine Learning Engineer)",
      "streamRoadmap": "Recommended 10+2 stream and subjects",
      "degree": "Target undergraduate and postgraduate qualifications in India",
      "entranceExams": "Key national/state entrance tests (e.g. JEE Main, CUET-UG, NEET, NDA, CLAT)",
      "topInstitutes": "Specific top government & accredited institutions in India and Punjab (e.g., IITs, NIT Jalandhar, Panjab University, PAU, AIIMS)",
      "startingSalary": "Realistic starting to mid-level salary range in LPA (₹ Lakhs per Annum)",
      "matchScore": 95,
      "outlook": "Industry 4.0 future demand and growth trend",
      "whyFit": "Specific reason this career matches their stated strengths and subjects"
    },
    {
      "title": "Second Career Title",
      "streamRoadmap": "10+2 stream",
      "degree": "Degree path",
      "entranceExams": "Exams",
      "topInstitutes": "Institutes",
      "startingSalary": "Salary range in LPA",
      "matchScore": 91,
      "outlook": "Outlook",
      "whyFit": "Why it fits"
    },
    {
      "title": "Third Career Title",
      "streamRoadmap": "10+2 stream",
      "degree": "Degree path",
      "entranceExams": "Exams",
      "topInstitutes": "Institutes",
      "startingSalary": "Salary range in LPA",
      "matchScore": 87,
      "outlook": "Outlook",
      "whyFit": "Why it fits"
    }
  ],
  "actionPlan": [
    {
      "timeline": "Immediate (Class 9-10 or Current)",
      "title": "Action title",
      "details": "Concrete actionable steps"
    },
    {
      "timeline": "Senior Secondary (Class 11-12)",
      "title": "Action title",
      "details": "Concrete actionable steps"
    },
    {
      "timeline": "Skill Development & Certifications",
      "title": "Action title",
      "details": "Concrete actionable steps"
    }
  ],
  "scholarships": [
    {
      "name": "Scholarship Name (e.g., PM YASASVI, Punjab Post-Matric, NMMSS, Inspire)",
      "eligibility": "Eligibility criteria",
      "benefit": "Financial grant details",
      "portal": "Application portal name"
    },
    {
      "name": "Second Scholarship Name",
      "eligibility": "Eligibility criteria",
      "benefit": "Financial grant details",
      "portal": "Application portal name"
    },
    {
      "name": "Third Scholarship Name",
      "eligibility": "Eligibility criteria",
      "benefit": "Financial grant details",
      "portal": "Application portal name"
    }
  ],
  "schoolSupport": "A warm concluding message from PM SHRI GSSS Randhawa Masandan Guidance & Career Counselling Cell detailing support available on campus."
}
        `;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
          },
        });

        const text = response.text;
        if (text) {
          const parsed = JSON.parse(text);
          return res.json({ success: true, data: parsed });
        }
      } catch (geminiErr) {
        console.warn('Gemini assessment API call error, using expert fallback:', geminiErr);
      }
    }

    // Fallback if AI not available or error occurred
    const fallback = generateFallbackAssessment(studentData);
    return res.json({ success: true, data: fallback, fallbackUsed: !ai });
  } catch (error: any) {
    console.error('Career assess endpoint error:', error);
    return res.status(500).json({ success: false, error: error.message || 'Internal error' });
  }
});

// AI Career Counsellor Chat Endpoint
app.post('/api/counsellor/chat', async (req, res) => {
  try {
    const { messages = [], studentProfile } = req.body;
    
    const lastUserMessage = messages[messages.length - 1]?.content || 'Hello';
    
    if (ai) {
      try {
        const systemInstruction = `
You are "Margdarshak AI" (ਮਾਰਗਦਰਸ਼ਕ ਏ.ਆਈ.), the Senior AI Career & Educational Counsellor of PM SHRI Government Senior Secondary School (GSSS) Randhawa Masandan, Jalandhar, Punjab.
You represent the official Career Guidance & Counselling Cell of the school under the aegis of the Department of School Education, Govt. of Punjab and Ministry of Education, Govt. of India.

Your core objectives:
1. Provide authoritative, empathetic, student-friendly, and precise guidance to students of Classes 8th to 12th and their parents.
2. Specialize in Indian educational pathways, CBSE/PSEB curriculum, NEP 2020 multi-disciplinary & vocational choices, National entrance tests (JEE, NEET, CUET, NDA, CLAT, NID, CA, ICAR, etc.), and premier colleges (IITs, NITs, AIIMS, IIM IPM, Central Universities, Panjab University Chandigarh, GNDU Amritsar, PAU Ludhiana, Thapar, etc.).
3. Assist with government scholarships (PM YASASVI, Punjab Post-Matric, NMMSS, Inspire SHE, Vidyasaarathi).
4. Tone: Dignified, highly encouraging, structured, polite, educational (like a wise senior school principal or career mentor). You can understand and respond in English, Hinglish, or Punjabi if queried.
5. Format answers cleanly using bullet points, bold key terms, and concise action steps. Never sound like a generic chatbot; address the student as a proud scholar of PM SHRI GSSS Randhawa Masandan.

${studentProfile ? `Current Student Profile Context: ${JSON.stringify(studentProfile)}` : ''}
`;

        // Format history for chat
        const conversationHistory = messages.slice(0, -1).map((m: any) => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.content }]
        }));

        const chat = ai.chats.create({
          model: 'gemini-3.8-flash',
          config: {
            systemInstruction,
          },
          history: conversationHistory.length > 0 ? conversationHistory : undefined
        });

        const reply = await chat.sendMessage({
          message: lastUserMessage
        });

        return res.json({
          success: true,
          reply: reply.text || 'I am here to guide you with your career and academic journey at PM SHRI GSSS Randhawa Masandan. What would you like to explore next?'
        });
      } catch (geminiErr) {
        console.warn('Gemini chat error, using expert fallback:', geminiErr);
      }
    }

    // Dynamic, high-quality fallback counsellor responses based on common queries
    const qLower = lastUserMessage.toLowerCase();
    let replyText = '';

    if (qLower.includes('stream') || qLower.includes('after 10th') || qLower.includes('10th ke baad')) {
      replyText = `**Greetings from the PM SHRI GSSS Randhawa Masandan Career Guidance Cell!** 🎓

Choosing your stream after Class 10th is a crucial milestone under **NEP 2020**. Here is how to evaluate your options:

1. **Non-Medical (Science PCM):**
   - **Best for:** Engineering, Computer Science, Architecture, NDA (Air Force & Navy), Data Science, Pilot Training.
   - **Key Subjects:** Physics, Chemistry, Mathematics, English + Computer Science/Physical Education elective.

2. **Medical (Science PCB):**
   - **Best for:** MBBS, BDS, Nursing, B.Sc Agriculture (PAU Ludhiana), Biotechnology, Veterinary Sciences, Pharmacy.
   - **Key Subjects:** Physics, Chemistry, Biology, English + Biotechnology/Psychology elective.

3. **Commerce (With or Without Maths):**
   - **Best for:** Chartered Accountancy (CA), Company Secretary (CS), Investment Banking, Corporate Law, Digital Marketing, B.Com (Hons).
   - **Key Subjects:** Accountancy, Business Studies, Economics + Applied Mathematics.

4. **Humanities & Social Sciences:**
   - **Best for:** Civil Services (UPSC IAS/IPS, Punjab PCS), Corporate Law (CLAT), Journalism, Psychology, International Relations.
   - **Key Subjects:** Political Science, History, Economics, Psychology, Geography.

5. **PM SHRI Vocational & Skill Tracks:**
   - IT/ITes, Web Technologies, Artificial Intelligence, and Electronics.

*Tip:* You are welcome to visit our school's Career Counselling Room at the campus for one-on-one psychometric counselling!`;
    } else if (qLower.includes('nda') || qLower.includes('army') || qLower.includes('defence') || qLower.includes('navy')) {
      replyText = `**A Noble Ambition: Preparing for National Defence Academy (NDA) at PM SHRI GSSS Randhawa Masandan!** 🇮🇳

Here is your exact blueprint for the **UPSC NDA & NA Examination**:

- **Eligibility:** Class 12 appearing or passed (unmarried male & female candidates, age between 16.5 and 19.5 years).
- **Stream Requirement:**
  - *Army Wing:* Any stream (Arts, Commerce, or Science).
  - *Air Force & Naval Wings:* Mandatory Physics and Mathematics in Class 12.
- **Exam Pattern (900 Marks Written):**
  - **Paper 1:** Mathematics (300 marks - Class 11 & 12 NCERT Math syllabus).
  - **Paper 2:** General Ability Test / GAT (600 marks - English 200 marks, GK/Physics/Chemistry/History/Current Affairs 400 marks).
- **Phase 2:** 5-Day SSB Interview (Services Selection Board - 900 marks) testing Officer Like Qualities (OLQs).
- **Preparation at School:** Join our school's NCC unit, practice daily physical fitness on our grounds, read daily English newspapers (The Tribune / The Hindu), and master NCERT Mathematics!`;
    } else if (qLower.includes('neet') || qLower.includes('doctor') || qLower.includes('mbbs')) {
      replyText = `**Aspiring for Medicine & NEET-UG at PM SHRI GSSS Randhawa Masandan!** 🩺

To secure an MBBS or BDS seat in premier medical colleges (like **AIIMS Bathinda, GMC Amritsar, or GMC Patiala**):

1. **NCERT is the Holy Grail:** Over 90% of NEET questions in Biology, Chemistry, and Physics stem directly from Class 11 and 12 NCERT textbooks.
2. **Marks Target:** Aim for 650+ out of 720 marks in NEET-UG to ensure admission into a top government medical college with affordable fee structures.
3. **Alternative Allied Medical Careers:**
   - BDS (Dental Surgery)
   - BAMS / BHMS (Ayush & Homeopathy)
   - B.Sc Nursing & AIIMS Allied Health Sciences
   - B.Pharm & Pharm.D
   - B.Sc (Hons) Agriculture at PAU Ludhiana (via ICAR/PAU CET)
4. **School Resources:** Make full use of our PM SHRI Smart Science Labs for hands-on biology experiments!`;
    } else if (qLower.includes('scholarship') || qLower.includes('fees') || qLower.includes('money') || qLower.includes('paisa')) {
      replyText = `**Top Government Scholarships for PM SHRI GSSS Randhawa Masandan Students:** 💰

1. **PM YASASVI Central Scheme:**
   - Financial assistance of ₹75,000/yr (Class 9-10) and ₹1,25,000/yr (Class 11-12) for OBC, EBC, and DNT students.
2. **Punjab Post-Matric Scholarship Scheme:**
   - 100% fee waiver for SC/BC students pursuing Class 11, 12, and higher education.
3. **National Means-cum-Merit Scholarship (NMMSS):**
   - ₹12,000 annually for meritorious students whose parental income is below ₹3.5 Lakh.
4. **INSPIRE SHE (DST Govt of India):**
   - ₹80,000 per year for top 1% students pursuing B.Sc / M.Sc in basic natural sciences.

*The school office and Career Desk will help you upload your domicile, Aadhaar, and income certificates directly on the National Scholarship Portal (NSP).*`;
    } else {
      replyText = `**Namaste & Sat Sri Akal from PM SHRI GSSS Randhawa Masandan, Jalandhar!** 🏫

I am **Margdarshak AI**, your dedicated Senior Career Counsellor. I can assist you with:

- **Stream Selection:** Which stream fits your marks, interest and skills after Class 10th.
- **National Entrance Exams:** Preparation tips for JEE, NEET, CUET, NDA, CLAT, NID, and CA Foundation.
- **Top Government Colleges in Punjab & India:** Admissions in IITs, NIT Jalandhar, Panjab University, GNDU, PAU, and Central Universities.
- **Scholarships & NEP 2020 Skill Hubs:** PM YASASVI, Post-Matric schemes, and vocational courses.

Feel free to ask your question or fill out our **Career Assessment Form** above for a personalized career blueprint!`;
    }

    return res.json({
      success: true,
      reply: replyText
    });
  } catch (error: any) {
    console.error('Counsellor chat endpoint error:', error);
    return res.status(500).json({ success: false, error: error.message || 'Internal error' });
  }
});

// Configure Vite middleware in dev or static server in prod
async function startServer() {
  if (!isProduction) {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR !== 'true',
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`PM SHRI AI Career Portal server listening on port ${port}`);
  });
}

startServer().catch((err) => {
  console.error('Server startup error:', err);
  process.exit(1);
});
