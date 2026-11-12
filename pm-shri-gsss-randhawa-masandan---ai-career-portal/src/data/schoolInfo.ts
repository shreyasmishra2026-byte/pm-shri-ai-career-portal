export interface SchoolDetail {
  schoolName: string;
  punjabiName: string;
  location: string;
  district: string;
  state: string;
  pincode: string;
  udiseCode: string;
  affiliation: string;
  pmShriBatch: string;
  principalName: string;
  counsellorHead: string;
  helplinePhone: string;
  officialEmail: string;
  schoolHours: string;
  announcements: string[];
  stats: {
    label: string;
    value: string;
    sublabel: string;
  }[];
  pillars: {
    title: string;
    description: string;
    icon: string;
  }[];
}

export const SCHOOL_INFO: SchoolDetail = {
  schoolName: 'PM SHRI Government Senior Secondary School, Randhawa Masandan',
  punjabiName: 'ਪੀ.ਐੱਮ. ਸ਼੍ਰੀ ਸਰਕਾਰੀ ਸੀਨੀਅਰ ਸੈਕੰਡਰੀ ਸਕੂਲ, ਰੰਧਾਵਾ ਮਸੰਦਾਂ, ਜਲੰਧਰ',
  location: 'Village Randhawa Masandan, Near Jalandhar-Hoshiarpur Highway',
  district: 'Jalandhar',
  state: 'Punjab',
  pincode: '144004',
  udiseCode: '03040103504',
  affiliation: 'Department of School Education, Govt. of Punjab / Ministry of Education, Govt. of India',
  pmShriBatch: 'PM SHRI Exemplar Institution (Phase 1 Approved)',
  principalName: 'Sardar Gurpreet Singh Dhillon, M.Sc, M.Ed (State Best Teacher Awardee)',
  counsellorHead: 'Mrs. Harpreet Kaur, M.A. (Psychology), Post-Graduate Diploma in Guidance & Counselling (NCERT)',
  helplinePhone: '+91 181 2924102 / 14425 (NCS Helpline)',
  officialEmail: 'gsss.randhawamasandan@punjab.gov.in',
  schoolHours: 'Summer: 08:00 AM - 02:00 PM | Winter: 09:00 AM - 03:00 PM (Career Desk: Monday-Saturday)',
  announcements: [
    '🔔 Admissions Open for Class 11th (Medical, Non-Medical, Commerce, Humanities & PM SHRI Vocational IT Hub).',
    '🎓 Free Saturday CUET-UG & NDA Written Exam Mentorship batch active in ATL Room.',
    '🌟 PM YASASVI Scholarship 2026-27 registration desk open at the Career Guidance Room.',
    '💡 Congratulations to 14 students of GSSS Randhawa Masandan selected for State Level Science Exhibition!'
  ],
  stats: [
    { label: 'Excellence in Board Results', value: '98.6%', sublabel: 'Class 10 & 12 pass rate' },
    { label: 'Students Receiving Career Mentoring', value: '1,200+', sublabel: 'Annual psychometric guidance' },
    { label: 'Scholarships Disbursed', value: '₹42+ Lakh', sublabel: 'NSP & Punjab Post-Matric' },
    { label: 'Modern Labs & Smart Rooms', value: '18+', sublabel: 'Robotics ATL, ICT & STEM' }
  ],
  pillars: [
    {
      title: 'PM SHRI Exemplar Learning',
      description: 'Designated showcase school under the Government of India PM SHRI initiative, embodying the modern spirit of NEP 2020.',
      icon: 'Award'
    },
    {
      title: 'Atal Tinkering Lab (ATL)',
      description: 'Hands-on experimentation with IoT, robotics, drone basics, and 3D prototyping from Class 6th upwards.',
      icon: 'Cpu'
    },
    {
      title: 'Vocational Skill Hubs',
      description: 'Integrated NSQF industry-certified skill curricula in Information Technology, Electronic Hardware, and Green Energy.',
      icon: 'Briefcase'
    },
    {
      title: 'Dedicated Career & Psychometric Cell',
      description: 'Continuous diagnostic support helping students discover their natural aptitudes, entrance targets, and scholarship options.',
      icon: 'Compass'
    }
  ]
};
