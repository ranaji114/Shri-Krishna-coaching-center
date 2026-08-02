import { AdmissionRecord, NoticeRecord, GalleryRecord, MessageRecord } from "./supabase";

export const INITIAL_NOTICES: NoticeRecord[] = [
  {
    id: "not-1",
    title: "Registration Open for Academic Session 2026-27 (Classes 6 to 12)",
    content: "Admissions are officially open for new batches starting this month. Special discount packages for multi-subject enrollments at ₹250 per subject. Contact office at Mudila Bazar.",
    category: "Admission",
    is_pinned: true,
    date: "August 2, 2026",
    created_at: new Date().toISOString(),
  },
  {
    id: "not-2",
    title: "Upcoming Monthly Assessment Test Series for Classes 9, 10, 11 & 12",
    content: "The monthly offline test series for Mathematics and Science will take place this Sunday at 9:00 AM. Attendance is mandatory for all batch students.",
    category: "Exam",
    is_pinned: true,
    date: "August 10, 2026",
    created_at: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "not-3",
    title: "Special Sunday Doubt Resolution & Physics Practical Workshop",
    content: "Priyanshu Sir will be leading an extended 3-hour concept clearing and problem-solving workshop for Class 11 and Class 12 Physics & Chemistry numericals.",
    category: "General",
    is_pinned: false,
    date: "August 15, 2026",
    created_at: new Date(Date.now() - 172800000).toISOString(),
  },
];

export const INITIAL_GALLERY: GalleryRecord[] = [
  {
    id: "gal-1",
    title: "Modern Whiteboard Interactive Classroom Setup",
    url: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1200&q=80",
    category: "Classroom",
    created_at: new Date().toISOString(),
  },
  {
    id: "gal-2",
    title: "Dedicated Science Numerical & Concept Session",
    url: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80",
    category: "Classroom",
    created_at: new Date().toISOString(),
  },
  {
    id: "gal-3",
    title: "Weekly Evaluation & Offline Examination Hall",
    url: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80",
    category: "Events",
    created_at: new Date().toISOString(),
  },
  {
    id: "gal-4",
    title: "Shri Krishna Coaching Center Front Entrance at Mudila Bazar",
    url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80",
    category: "Campus",
    created_at: new Date().toISOString(),
  },
  {
    id: "gal-5",
    title: "Student Achievers & Top Scorer Recognition Ceremony",
    url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80",
    category: "Achievements",
    created_at: new Date().toISOString(),
  },
  {
    id: "gal-6",
    title: "Fan-Equipped Well Ventilated Classroom Workspace",
    url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80",
    category: "Campus",
    created_at: new Date().toISOString(),
  },
];

export const INITIAL_ADMISSIONS: AdmissionRecord[] = [
  {
    id: "adm-1",
    student_name: "Aditya Verma",
    father_name: "Ramesh Chandra Verma",
    mother_name: "Sunita Verma",
    phone: "9839123456",
    address: "Akhand Nagar Road, Kadipur, Sultanpur",
    target_class: "Class 10",
    subjects: ["Mathematics", "Physics", "Chemistry"],
    school_name: "St. Thomas School, Kadipur",
    status: "approved",
    created_at: new Date().toISOString(),
  },
  {
    id: "adm-2",
    student_name: "Priya Sharma",
    father_name: "Anil Kumar Sharma",
    mother_name: "Rekha Sharma",
    phone: "7388998877",
    address: "Mudila Bazar, Kadipur, Sultanpur",
    target_class: "Class 12",
    subjects: ["Physics", "Chemistry", "Biology"],
    school_name: "Government Inter College, Sultanpur",
    status: "pending",
    created_at: new Date(Date.now() - 3600000 * 5).toISOString(),
  },
];

export const INITIAL_MESSAGES: MessageRecord[] = [
  {
    id: "msg-1",
    name: "Vikram Pratap Singh",
    phone: "9450123789",
    email: "vikram.singh@gmail.com",
    subject: "Class 11 Science & Maths Batch Timings Query",
    message: "Namaste Sir, I want to inquire about morning batch timings for Class 11 Mathematics and Physics. Is separate batch available for English medium students?",
    is_read: false,
    created_at: new Date().toISOString(),
  },
];

export const FACULTY_ROSTER = [
  {
    id: "krishna",
    name: "Krishna Sir",
    role: "Founder & Senior Faculty",
    qualification: "B.Com, LL.B.",
    experience: "5+ Years Teaching Experience",
    subjects: ["Mathematics", "English Grammar", "Commerce Foundations"],
    photo: "/krishna-sir.png",
    bio: "Krishna Sir founded Shri Krishna Coaching Center in 2021 with a singular mission: to make world-class, structured conceptual education accessible to students in Kadipur and Sultanpur. Holding degrees in Commerce and Law (B.Com, LL.B.), Krishna Sir brings exceptional analytical clarity, discipline, and exam-focused rigor to every session.",
  },
  {
    id: "priyanshu",
    name: "Priyanshu Singh Sir",
    role: "Senior Science & Tech Faculty",
    qualification: "B.Sc. (Physics & Chemistry)",
    experience: "4+ Years Teaching Experience",
    subjects: ["Physics", "Chemistry", "Biology"],
    photo: "/priyanshu-sir.png",
    bio: "Priyanshu Singh Sir is renowned for breaking down complex physics numericals and organic chemistry reaction mechanisms into intuitive, visual concepts. His student-centric approach, weekly practice drills, and dedicated doubt clearance have helped dozens of students score 90%+ in board exams.",
  },
];

export const COURSES_LIST = [
  { classLevel: "Class 6", description: "Foundational mastery in Math, Basic Science & Grammar." },
  { classLevel: "Class 7", description: "Strengthening analytical skills, arithmetic, and basic physics/chemistry." },
  { classLevel: "Class 8", description: "Pre-high school bridge program for board-level preparation." },
  { classLevel: "Class 9", description: "Core Science (Physics/Chemistry/Biology) & Advanced Mathematics." },
  { classLevel: "Class 10", description: "Intensive UP/CBSE Board Examination prep with test series." },
  { classLevel: "Class 11", description: "Senior Secondary specialization in PCMB and analytical problem solving." },
  { classLevel: "Class 12", description: "Final Board Mastery + Entrance Foundations + Full Mock Exams." },
];

export const FACILITIES_LIST = [
  { title: "White Board Teaching", desc: "Crystal clear visual exposition with structured notes and diagrammatic board work.", icon: "Presentation" },
  { title: "Doubt Classes", desc: "Dedicated post-lecture 1-on-1 time to clear all numerical and theoretical doubts.", icon: "HelpCircle" },
  { title: "Weekly Tests", desc: "Rigorous Sunday tests to track chapter progress and time management.", icon: "CheckSquare" },
  { title: "Monthly Tests", desc: "Comprehensive cumulative exams matching official board patterns.", icon: "Award" },
  { title: "Study Material", desc: "Curated chapter summaries, formula sheets, and past 10-year question banks.", icon: "BookOpen" },
  { title: "WhatsApp Support", desc: "Instant evening doubt support for homework and numerical questions.", icon: "MessageSquare" },
  { title: "Offline Tests", desc: "Simulated exam hall environment for genuine confidence building.", icon: "FileText" },
  { title: "Spacious Parking", desc: "Secure vehicle and bicycle parking area inside the coaching premises.", icon: "Car" },
  { title: "Fan Equipped Classrooms", desc: "Cool, well-ventilated, comfortable seating for optimal study focus.", icon: "Wind" },
];
