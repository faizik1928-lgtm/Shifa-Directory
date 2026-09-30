// ============================================================
//  SHIFA DIRECTORY — data.js
//  All application data: cities, specialties, doctors
// ============================================================

const CITIES = [
  { id: 1, name: "Peshawar",    province: "KPK" },
  { id: 2, name: "Islamabad",   province: "Federal" },
  { id: 3, name: "Rawalpindi",  province: "Punjab" },
  { id: 4, name: "Lahore",      province: "Punjab" },
  { id: 5, name: "Karachi",     province: "Sindh" },
  { id: 6, name: "Quetta",      province: "Balochistan" },
  { id: 7, name: "Multan",      province: "Punjab" },
  { id: 8, name: "Faisalabad",  province: "Punjab" },
  { id: 9, name: "Abbottabad",  province: "KPK" },
  { id: 10, name: "Hyderabad", province: "Sindh" },
];

const SPECIALTIES = [
  { id: 1,  name: "Ophthalmologist (Eye)",     icon: "👁️",  slug: "eye" },
  { id: 2,  name: "Cardiologist (Heart)",       icon: "❤️",  slug: "heart" },
  { id: 3,  name: "Diabetes Specialist",        icon: "🩸",  slug: "diabetes" },
  { id: 4,  name: "Burn & Plastic Surgeon",     icon: "🔥",  slug: "burn" },
  { id: 5,  name: "ENT Specialist",             icon: "👂",  slug: "ent" },
  { id: 6,  name: "Psychiatrist",               icon: "🧠",  slug: "mental" },
  { id: 7,  name: "General Physician",          icon: "🩺",  slug: "general" },
  { id: 8,  name: "Dermatologist",              icon: "🌿",  slug: "skin" },
  { id: 9,  name: "Gynecologist",               icon: "🌸",  slug: "gynae" },
  { id: 10, name: "Pediatrician",               icon: "👶",  slug: "child" },
  { id: 11, name: "Orthopedic Surgeon",         icon: "🦴",  slug: "ortho" },
  { id: 12, name: "Neurologist",                icon: "⚡",  slug: "neuro" },
  { id: 13, name: "Urologist",                  icon: "💧",  slug: "uro" },
  { id: 14, name: "Dentist",                    icon: "🦷",  slug: "dental" },
  { id: 15, name: "Pulmonologist",              icon: "🫁",  slug: "lung" },
  { id: 16, name: "Gastroenterologist",         icon: "🫄",  slug: "gastro" },
  { id: 17, name: "Nephrologist",               icon: "🫘",  slug: "kidney" },
  { id: 18, name: "Oncologist",                 icon: "🎗️",  slug: "cancer" },
];

const DOCTORS = [
  // ── PESHAWAR ──────────────────────────────────────────────
  {
    id: 1, name: "Dr. Adnan Khan", gender: "Male",
    specialty_id: 1, qualifications: "MBBS, FCPS (Ophthalmology)",
    experience_years: 14, hospital_name: "Hayatabad Medical Complex",
    city_id: 1, area: "Hayatabad", address: "Phase 4, Hayatabad, Peshawar",
    phone: "0912-345678", whatsapp: "923001234567", fee: 800,
    timings: "10:00 AM – 2:00 PM", days_available: ["Mon","Tue","Wed","Thu","Fri"],
    about: "Dr. Adnan Khan is a senior eye specialist with over 14 years of experience treating glaucoma, cataracts, and retinal diseases.",
    is_active: true, photo: null, rating: 4.8, reviews: 124
  },
  {
    id: 2, name: "Dr. Samina Gul", gender: "Female",
    specialty_id: 9, qualifications: "MBBS, FCPS (Gynecology & Obstetrics)",
    experience_years: 11, hospital_name: "Lady Reading Hospital",
    city_id: 1, area: "University Town", address: "University Road, Peshawar",
    phone: "0912-456789", whatsapp: "923012345678", fee: 1000,
    timings: "3:00 PM – 7:00 PM", days_available: ["Mon","Wed","Fri","Sat"],
    about: "Dr. Samina Gul specializes in high-risk pregnancies, infertility treatment, and laparoscopic surgery.",
    is_active: true, photo: null, rating: 4.9, reviews: 215
  },
  {
    id: 3, name: "Dr. Fawad Hussain", gender: "Male",
    specialty_id: 7, qualifications: "MBBS, MRCGP",
    experience_years: 8, hospital_name: "Khyber Teaching Hospital",
    city_id: 1, area: "Jamrud Road", address: "Khyber Medical University, Peshawar",
    phone: "0912-567890", whatsapp: "923023456789", fee: 500,
    timings: "9:00 AM – 1:00 PM", days_available: ["Mon","Tue","Thu","Sat"],
    about: "Dr. Fawad Hussain provides quality primary healthcare with a focus on preventive medicine and chronic disease management.",
    is_active: true, photo: null, rating: 4.5, reviews: 88
  },
  {
    id: 4, name: "Dr. Zubair Ahmad", gender: "Male",
    specialty_id: 12, qualifications: "MBBS, FCPS (Neurology), Fellowship (London)",
    experience_years: 18, hospital_name: "Rehman Medical Institute",
    city_id: 1, area: "Phase 5, Hayatabad", address: "Rehman Medical Complex, Peshawar",
    phone: "0912-678901", whatsapp: "923034567890", fee: 2000,
    timings: "4:00 PM – 8:00 PM", days_available: ["Tue","Wed","Thu","Sun"],
    about: "One of KPK's leading neurologists specializing in stroke, epilepsy, migraine, and Parkinson's disease.",
    is_active: true, photo: null, rating: 4.9, reviews: 302
  },
  // ── ISLAMABAD ────────────────────────────────────────────
  {
    id: 5, name: "Dr. Tariq Mehmood", gender: "Male",
    specialty_id: 2, qualifications: "MBBS, MRCP, FCPS (Cardiology)",
    experience_years: 20, hospital_name: "PIMS Hospital",
    city_id: 2, area: "G-8/3", address: "Shaheed Zulfiqar Ali Bhutto Medical University, Islamabad",
    phone: "051-9261170", whatsapp: "923045678901", fee: 2500,
    timings: "2:00 PM – 6:00 PM", days_available: ["Mon","Tue","Wed","Thu"],
    about: "Senior consultant cardiologist with expertise in interventional cardiology, angioplasty, and heart failure management.",
    is_active: true, photo: null, rating: 4.9, reviews: 410
  },
  {
    id: 6, name: "Dr. Nadia Riaz", gender: "Female",
    specialty_id: 6, qualifications: "MBBS, MRCPsych (UK), Fellowship Psychiatry",
    experience_years: 13, hospital_name: "Shifa International Hospital",
    city_id: 2, area: "H-8/4", address: "Pitras Bukhari Road, Islamabad",
    phone: "051-8464646", whatsapp: "923056789012", fee: 3000,
    timings: "10:00 AM – 3:00 PM", days_available: ["Mon","Wed","Fri"],
    about: "Dr. Nadia Riaz is a UK-trained psychiatrist specializing in depression, anxiety disorders, PTSD, and addiction therapy.",
    is_active: true, photo: null, rating: 4.8, reviews: 178
  },
  {
    id: 7, name: "Dr. Imran Bashir", gender: "Male",
    specialty_id: 3, qualifications: "MBBS, MRCP (UK), Endocrinology Fellowship",
    experience_years: 16, hospital_name: "Islamabad Diagnostic Centre",
    city_id: 2, area: "Blue Area", address: "Fazal-ul-Haq Road, Blue Area, Islamabad",
    phone: "051-2822851", whatsapp: "923067890123", fee: 2000,
    timings: "9:00 AM – 1:00 PM", days_available: ["Tue","Thu","Sat"],
    about: "Specialist in Type 1 & 2 Diabetes, thyroid disorders, hormonal imbalances, and metabolic syndrome.",
    is_active: true, photo: null, rating: 4.7, reviews: 256
  },
  {
    id: 8, name: "Dr. Ayesha Siddiqui", gender: "Female",
    specialty_id: 10, qualifications: "MBBS, DCH, MRCPCH (UK)",
    experience_years: 9, hospital_name: "Children's Hospital PIMS",
    city_id: 2, area: "G-8", address: "Children's Hospital, G-8, Islamabad",
    phone: "051-9261373", whatsapp: "923078901234", fee: 1200,
    timings: "11:00 AM – 3:00 PM", days_available: ["Mon","Tue","Wed","Thu","Fri"],
    about: "Passionate pediatrician with expertise in newborn care, childhood vaccinations, and developmental disorders.",
    is_active: true, photo: null, rating: 4.9, reviews: 334
  },
  {
    id: 9, name: "Dr. Hassan Raza", gender: "Male",
    specialty_id: 11, qualifications: "MBBS, FCPS (Orthopedics), Fellowship (Germany)",
    experience_years: 22, hospital_name: "Maroof International Hospital",
    city_id: 2, area: "F-11", address: "F-11 Markaz, Islamabad",
    phone: "051-2228128", whatsapp: "923089012345", fee: 3500,
    timings: "5:00 PM – 9:00 PM", days_available: ["Mon","Wed","Sat"],
    about: "Leading orthopedic surgeon specializing in joint replacement, arthroscopic surgery, and sports injuries.",
    is_active: true, photo: null, rating: 4.8, reviews: 289
  },
  {
    id: 10, name: "Dr. Sana Malik", gender: "Female",
    specialty_id: 8, qualifications: "MBBS, DDV (Austria), FCPS (Dermatology)",
    experience_years: 7, hospital_name: "Quaid-e-Azam International Hospital",
    city_id: 2, area: "G-10", address: "Islamabad",
    phone: "051-2355001", whatsapp: "923090123456", fee: 1500,
    timings: "3:00 PM – 7:00 PM", days_available: ["Tue","Thu","Fri","Sat"],
    about: "Expert in acne, psoriasis, vitiligo, hair loss, laser treatments, and cosmetic dermatology.",
    is_active: true, photo: null, rating: 4.6, reviews: 198
  },
  // ── LAHORE ──────────────────────────────────────────────
  {
    id: 11, name: "Dr. Khalid Pervez", gender: "Male",
    specialty_id: 2, qualifications: "MBBS, FCPS, FRCP (London)",
    experience_years: 25, hospital_name: "Services Hospital Lahore",
    city_id: 4, area: "Jail Road", address: "Jail Road, Lahore",
    phone: "042-99203040", whatsapp: "923101234567", fee: 3000,
    timings: "11:00 AM – 2:00 PM", days_available: ["Mon","Tue","Wed","Thu"],
    about: "Pioneer of interventional cardiology in Punjab. Expert in complex angioplasties and electrophysiology.",
    is_active: true, photo: null, rating: 5.0, reviews: 520
  },
  {
    id: 12, name: "Dr. Rukhsana Hameed", gender: "Female",
    specialty_id: 9, qualifications: "MBBS, FCPS (Obs & Gynae), MRCOG (UK)",
    experience_years: 17, hospital_name: "Lahore General Hospital",
    city_id: 4, area: "Ferozepur Road", address: "Ferozepur Road, Lahore",
    phone: "042-35761999", whatsapp: "923112345678", fee: 1500,
    timings: "4:00 PM – 8:00 PM", days_available: ["Mon","Wed","Thu","Sat"],
    about: "Specialist in fertility treatment, PCOS, laparoscopic surgery, and complicated deliveries.",
    is_active: true, photo: null, rating: 4.8, reviews: 376
  },
  {
    id: 13, name: "Dr. Bilal Chaudhry", gender: "Male",
    specialty_id: 14, qualifications: "BDS, FCPS (Oral Surgery), MSc (UK)",
    experience_years: 12, hospital_name: "Fatima Memorial Hospital",
    city_id: 4, area: "Shadman", address: "Shadman Colony, Lahore",
    phone: "042-35761234", whatsapp: "923123456789", fee: 700,
    timings: "10:00 AM – 6:00 PM", days_available: ["Mon","Tue","Wed","Thu","Fri","Sat"],
    about: "Expert in dental implants, teeth whitening, root canal treatment, and cosmetic dentistry.",
    is_active: true, photo: null, rating: 4.7, reviews: 243
  },
  {
    id: 14, name: "Dr. Uzma Akhtar", gender: "Female",
    specialty_id: 6, qualifications: "MBBS, FCPS (Psychiatry), DBT Certified",
    experience_years: 10, hospital_name: "Doctors Hospital",
    city_id: 4, area: "Canal Bank", address: "Canal Bank Road, Lahore",
    phone: "042-35302000", whatsapp: "923134567890", fee: 2500,
    timings: "6:00 PM – 9:00 PM", days_available: ["Tue","Wed","Fri","Sat"],
    about: "Compassionate psychiatrist specializing in mood disorders, OCD, ADHD, eating disorders, and child psychiatry.",
    is_active: true, photo: null, rating: 4.9, reviews: 189
  },
  {
    id: 15, name: "Dr. Shahzad Mirza", gender: "Male",
    specialty_id: 16, qualifications: "MBBS, FCPS (Gastroenterology), ERCP Fellowship",
    experience_years: 15, hospital_name: "Hameed Latif Hospital",
    city_id: 4, area: "Ferozepur Road", address: "Ferozepur Road, Lahore",
    phone: "042-35761590", whatsapp: "923145678901", fee: 2000,
    timings: "2:00 PM – 5:00 PM", days_available: ["Mon","Tue","Thu","Sat"],
    about: "Specialized in liver diseases, endoscopy, colonoscopy, inflammatory bowel disease, and hepatitis treatment.",
    is_active: true, photo: null, rating: 4.7, reviews: 267
  },
  {
    id: 16, name: "Dr. Amna Farooq", gender: "Female",
    specialty_id: 10, qualifications: "MBBS, MCPS (Pediatrics), Neonatology Fellowship",
    experience_years: 8, hospital_name: "The Children's Hospital Lahore",
    city_id: 4, area: "Ferozepur Road", address: "Ferozepur Road, Lahore",
    phone: "042-99230600", whatsapp: "923156789012", fee: 1000,
    timings: "9:00 AM – 1:00 PM", days_available: ["Mon","Tue","Wed","Thu","Fri"],
    about: "Neonatologist with expertise in premature babies, childhood asthma, and childhood growth disorders.",
    is_active: true, photo: null, rating: 4.8, reviews: 312
  },
  // ── KARACHI ────────────────────────────────────────────
  {
    id: 17, name: "Dr. Arif Hussain", gender: "Male",
    specialty_id: 5, qualifications: "MBBS, FCPS (ENT), Fellowship (Australia)",
    experience_years: 19, hospital_name: "Aga Khan University Hospital",
    city_id: 5, area: "Stadium Road", address: "Stadium Road, Karachi",
    phone: "021-34864000", whatsapp: "923167890123", fee: 3000,
    timings: "10:00 AM – 1:00 PM", days_available: ["Mon","Tue","Wed","Thu"],
    about: "Senior ENT specialist with expertise in cochlear implants, sinusitis surgery, and head & neck tumors.",
    is_active: true, photo: null, rating: 4.9, reviews: 445
  },
  {
    id: 18, name: "Dr. Fatima Zahra", gender: "Female",
    specialty_id: 8, qualifications: "MBBS, FCPS (Dermatology), Trichology Diploma",
    experience_years: 11, hospital_name: "Liaquat National Hospital",
    city_id: 5, area: "Gulshan-e-Iqbal", address: "National Stadium Road, Karachi",
    phone: "021-34412000", whatsapp: "923178901234", fee: 1800,
    timings: "4:00 PM – 8:00 PM", days_available: ["Mon","Wed","Thu","Sat"],
    about: "Specialist in hair loss, alopecia, vitiligo, laser treatments, Botox, and skin rejuvenation.",
    is_active: true, photo: null, rating: 4.8, reviews: 287
  },
  {
    id: 19, name: "Dr. Omar Sheikh", gender: "Male",
    specialty_id: 18, qualifications: "MBBS, FCPS (Oncology), Fellowship (USA)",
    experience_years: 17, hospital_name: "Aga Khan University Hospital",
    city_id: 5, area: "Stadium Road", address: "Stadium Road, Karachi",
    phone: "021-34864001", whatsapp: "923189012345", fee: 5000,
    timings: "1:00 PM – 5:00 PM", days_available: ["Mon","Tue","Thu"],
    about: "Leading oncologist specializing in breast cancer, lymphoma, chemotherapy, and targeted therapies.",
    is_active: true, photo: null, rating: 4.9, reviews: 198
  },
  {
    id: 20, name: "Dr. Hina Qureshi", gender: "Female",
    specialty_id: 3, qualifications: "MBBS, MRCP (UK), Endocrinology Diploma",
    experience_years: 12, hospital_name: "Ziauddin Hospital",
    city_id: 5, area: "Clifton", address: "Block 6, Clifton, Karachi",
    phone: "021-35862937", whatsapp: "923190123456", fee: 2000,
    timings: "11:00 AM – 3:00 PM", days_available: ["Tue","Wed","Fri","Sat"],
    about: "Expert in diabetes management, thyroid disorders, Cushing's syndrome, and hormonal replacement therapy.",
    is_active: true, photo: null, rating: 4.7, reviews: 231
  },
  {
    id: 21, name: "Dr. Waqas Ali", gender: "Male",
    specialty_id: 15, qualifications: "MBBS, FCPS (Pulmonology), CHEST Fellowship",
    experience_years: 14, hospital_name: "Jinnah Postgraduate Medical Centre",
    city_id: 5, area: "Saddar", address: "Rafiqui Shaheed Road, Karachi",
    phone: "021-35165000", whatsapp: "923201234567", fee: 1500,
    timings: "9:00 AM – 12:00 PM", days_available: ["Mon","Tue","Wed","Thu","Fri"],
    about: "Respiratory specialist treating asthma, COPD, tuberculosis, pulmonary fibrosis, and sleep apnea.",
    is_active: true, photo: null, rating: 4.6, reviews: 176
  },
  {
    id: 22, name: "Dr. Saima Noor", gender: "Female",
    specialty_id: 7, qualifications: "MBBS, MCPS (Family Medicine)",
    experience_years: 6, hospital_name: "South City Hospital",
    city_id: 5, area: "PECHS", address: "PECHS Block 2, Karachi",
    phone: "021-34520900", whatsapp: "923212345678", fee: 800,
    timings: "5:00 PM – 9:00 PM", days_available: ["Mon","Wed","Fri","Sat","Sun"],
    about: "Friendly and approachable GP providing comprehensive primary care for all ages including preventive screenings.",
    is_active: true, photo: null, rating: 4.6, reviews: 142
  },
  // ── RAWALPINDI ──────────────────────────────────────────
  {
    id: 23, name: "Dr. Naeem Akhtar", gender: "Male",
    specialty_id: 11, qualifications: "MBBS, FCPS (Orthopedics), AO Fellowship",
    experience_years: 16, hospital_name: "Holy Family Hospital",
    city_id: 3, area: "Satellite Town", address: "Satellite Town, Rawalpindi",
    phone: "051-5469000", whatsapp: "923223456789", fee: 1500,
    timings: "3:00 PM – 7:00 PM", days_available: ["Mon","Tue","Thu","Fri"],
    about: "Expert in knee and hip replacement, spine surgery, trauma, and pediatric orthopedics.",
    is_active: true, photo: null, rating: 4.7, reviews: 209
  },
  {
    id: 24, name: "Dr. Rabia Tahir", gender: "Female",
    specialty_id: 1, qualifications: "MBBS, FCPS (Ophthalmology), FRCS (Glasgow)",
    experience_years: 13, hospital_name: "Benazir Bhutto Hospital",
    city_id: 3, area: "Murree Road", address: "Murree Road, Rawalpindi",
    phone: "051-9290500", whatsapp: "923234567890", fee: 1200,
    timings: "10:00 AM – 2:00 PM", days_available: ["Mon","Wed","Thu","Sat"],
    about: "LASIK surgery, cataract extraction, diabetic retinopathy treatment, and squint correction specialist.",
    is_active: true, photo: null, rating: 4.8, reviews: 187
  },
  {
    id: 25, name: "Dr. Asim Raza", gender: "Male",
    specialty_id: 17, qualifications: "MBBS, FCPS (Nephrology), Dialysis Fellowship",
    experience_years: 11, hospital_name: "Rawalpindi Institute of Urology",
    city_id: 3, area: "Chaklala", address: "Chaklala Scheme 3, Rawalpindi",
    phone: "051-5765432", whatsapp: "923245678901", fee: 2000,
    timings: "6:00 PM – 9:00 PM", days_available: ["Tue","Wed","Fri","Sat"],
    about: "Kidney specialist treating chronic kidney disease, kidney stones, glomerulonephritis, and managing dialysis patients.",
    is_active: true, photo: null, rating: 4.7, reviews: 156
  },
  // ── QUETTA ──────────────────────────────────────────────
  {
    id: 26, name: "Dr. Gulnaz Kakar", gender: "Female",
    specialty_id: 9, qualifications: "MBBS, DGO, FCPS (Gynecology)",
    experience_years: 20, hospital_name: "Bolan Medical Complex",
    city_id: 6, area: "Zarghoon Road", address: "Zarghoon Road, Quetta",
    phone: "081-9201800", whatsapp: "923256789012", fee: 1000,
    timings: "10:00 AM – 2:00 PM", days_available: ["Mon","Tue","Wed","Thu","Sat"],
    about: "Senior gynecologist serving the women of Balochistan for two decades with compassion and expertise.",
    is_active: true, photo: null, rating: 4.9, reviews: 398
  },
  {
    id: 27, name: "Dr. Khalil Mengal", gender: "Male",
    specialty_id: 7, qualifications: "MBBS, MCPS (Family Medicine)",
    experience_years: 9, hospital_name: "Sandeman Provincial Hospital",
    city_id: 6, area: "Shalkot", address: "Quetta, Balochistan",
    phone: "081-9202020", whatsapp: "923267890123", fee: 400,
    timings: "8:00 AM – 12:00 PM", days_available: ["Mon","Tue","Wed","Thu","Fri","Sat"],
    about: "Dedicated general physician providing affordable healthcare to the people of Quetta and surrounding areas.",
    is_active: true, photo: null, rating: 4.5, reviews: 112
  },
  {
    id: 28, name: "Dr. Nasreen Baloch", gender: "Female",
    specialty_id: 10, qualifications: "MBBS, DCH, MCPS (Pediatrics)",
    experience_years: 7, hospital_name: "Civil Hospital Quetta",
    city_id: 6, area: "Mission Road", address: "Mission Road, Quetta",
    phone: "081-9201600", whatsapp: "923278901234", fee: 600,
    timings: "2:00 PM – 6:00 PM", days_available: ["Mon","Wed","Thu","Sat"],
    about: "Committed pediatrician ensuring the health and development of children across Balochistan.",
    is_active: true, photo: null, rating: 4.6, reviews: 134
  },
  // ── MULTAN ──────────────────────────────────────────────
  {
    id: 29, name: "Dr. Javed Iqbal", gender: "Male",
    specialty_id: 4, qualifications: "MBBS, FCPS (Plastic Surgery), Burns Fellowship",
    experience_years: 21, hospital_name: "Nishtar Hospital",
    city_id: 7, area: "Nishtar Road", address: "Nishtar Medical University, Multan",
    phone: "061-9210305", whatsapp: "923289012345", fee: 2500,
    timings: "11:00 AM – 3:00 PM", days_available: ["Mon","Tue","Wed","Thu"],
    about: "Pioneer burn surgeon in South Punjab. Expert in skin grafting, reconstructive surgery, and burn rehabilitation.",
    is_active: true, photo: null, rating: 4.9, reviews: 287
  },
  {
    id: 30, name: "Dr. Shazia Bokhari", gender: "Female",
    specialty_id: 8, qualifications: "MBBS, MCPS (Dermatology), Cosmetology Diploma",
    experience_years: 8, hospital_name: "Multan Medical & Cardiac Centre",
    city_id: 7, area: "Abdali Road", address: "Abdali Road, Multan",
    phone: "061-4510888", whatsapp: "923290123456", fee: 1200,
    timings: "4:00 PM – 8:00 PM", days_available: ["Mon","Wed","Thu","Sat"],
    about: "Dermatologist specializing in skin diseases, cosmetic procedures, PRP therapy, and chemical peels.",
    is_active: true, photo: null, rating: 4.7, reviews: 165
  },
  // ── FAISALABAD ──────────────────────────────────────────
  {
    id: 31, name: "Dr. Rao Anwar", gender: "Male",
    specialty_id: 2, qualifications: "MBBS, FCPS (Cardiology), FSCAI (USA)",
    experience_years: 18, hospital_name: "Allied Hospital Faisalabad",
    city_id: 8, area: "Jail Road", address: "Jail Road, Faisalabad",
    phone: "041-9220013", whatsapp: "923301234567", fee: 2500,
    timings: "12:00 PM – 4:00 PM", days_available: ["Mon","Tue","Wed","Thu","Sat"],
    about: "Renowned cardiologist performing complex cardiac procedures including coronary stenting and valve repair.",
    is_active: true, photo: null, rating: 4.8, reviews: 334
  },
  {
    id: 32, name: "Dr. Kiran Shahid", gender: "Female",
    specialty_id: 14, qualifications: "BDS, FCPS (Orthodontics)",
    experience_years: 6, hospital_name: "Faisalabad Dental Center",
    city_id: 8, area: "Peoples Colony", address: "Peoples Colony No.1, Faisalabad",
    phone: "041-8760000", whatsapp: "923312345678", fee: 500,
    timings: "10:00 AM – 5:00 PM", days_available: ["Tue","Wed","Thu","Fri","Sat"],
    about: "Specialist in orthodontic treatment, braces, invisible aligners (Invisalign), and smile makeovers.",
    is_active: true, photo: null, rating: 4.7, reviews: 148
  },
  {
    id: 33, name: "Dr. Naveed Butt", gender: "Male",
    specialty_id: 13, qualifications: "MBBS, FCPS (Urology), Endourology Fellowship",
    experience_years: 14, hospital_name: "DHQ Hospital Faisalabad",
    city_id: 8, area: "Kotwali Road", address: "Kotwali Road, Faisalabad",
    phone: "041-9220025", whatsapp: "923323456789", fee: 1500,
    timings: "5:00 PM – 9:00 PM", days_available: ["Mon","Tue","Thu","Fri"],
    about: "Expert urologist treating kidney stones, prostate diseases, bladder issues, and male infertility.",
    is_active: true, photo: null, rating: 4.6, reviews: 192
  },
  // ── ABBOTTABAD ──────────────────────────────────────────
  {
    id: 34, name: "Dr. Sajid Ali", gender: "Male",
    specialty_id: 12, qualifications: "MBBS, FCPS (Neurology)",
    experience_years: 10, hospital_name: "Ayub Teaching Hospital",
    city_id: 9, area: "Mansehra Road", address: "Mansehra Road, Abbottabad",
    phone: "0992-383550", whatsapp: "923334567890", fee: 1500,
    timings: "3:00 PM – 7:00 PM", days_available: ["Mon","Wed","Fri","Sat"],
    about: "Neurologist serving patients in Hazara region with expertise in stroke, headache disorders, and movement disorders.",
    is_active: true, photo: null, rating: 4.7, reviews: 143
  },
  {
    id: 35, name: "Dr. Maryam Shaheen", gender: "Female",
    specialty_id: 7, qualifications: "MBBS, MCPS (Family Medicine)",
    experience_years: 5, hospital_name: "Combined Military Hospital Abbottabad",
    city_id: 9, area: "Abbottabad Cantt", address: "Abbottabad Cantt, KPK",
    phone: "0992-380001", whatsapp: "923345678901", fee: 600,
    timings: "9:00 AM – 1:00 PM", days_available: ["Mon","Tue","Wed","Thu","Fri"],
    about: "Dedicated family physician providing comprehensive care for acute and chronic illnesses in Hazara region.",
    is_active: true, photo: null, rating: 4.5, reviews: 87
  },
  {
    id: 36, name: "Dr. Tahir Nawaz", gender: "Male",
    specialty_id: 5, qualifications: "MBBS, FCPS (ENT), Skull Base Fellowship",
    experience_years: 12, hospital_name: "Ayub Teaching Hospital",
    city_id: 9, area: "Mansehra Road", address: "Mansehra Road, Abbottabad",
    phone: "0992-383551", whatsapp: "923356789012", fee: 1200,
    timings: "10:00 AM – 2:00 PM", days_available: ["Mon","Tue","Thu","Sat"],
    about: "ENT specialist known for tonsillectomy, septoplasty, ear microsurgery, and hearing loss treatment.",
    is_active: true, photo: null, rating: 4.7, reviews: 168
  },
  // ── Extra ───────────────────────────────────────────────
  {
    id: 37, name: "Dr. Farhan Qazi", gender: "Male",
    specialty_id: 15, qualifications: "MBBS, FCPS (Pulmonology)",
    experience_years: 9, hospital_name: "Nishtar Hospital",
    city_id: 7, area: "Nishtar Road", address: "Nishtar Medical University, Multan",
    phone: "061-9210300", whatsapp: "923367890123", fee: 1000,
    timings: "9:00 AM – 1:00 PM", days_available: ["Tue","Wed","Thu","Fri"],
    about: "Pulmonologist specializing in tuberculosis, chronic bronchitis, occupational lung disease, and breathing difficulties.",
    is_active: true, photo: null, rating: 4.6, reviews: 134
  },
  {
    id: 38, name: "Dr. Lubna Jafri", gender: "Female",
    specialty_id: 16, qualifications: "MBBS, FCPS (Gastroenterology)",
    experience_years: 13, hospital_name: "Aga Khan University Hospital",
    city_id: 5, area: "Stadium Road", address: "Stadium Road, Karachi",
    phone: "021-34864002", whatsapp: "923378901234", fee: 3500,
    timings: "2:00 PM – 6:00 PM", days_available: ["Mon","Tue","Thu","Sat"],
    about: "Gastroenterologist with expertise in liver cirrhosis, Crohn's disease, ulcerative colitis, and therapeutic endoscopy.",
    is_active: true, photo: null, rating: 4.8, reviews: 219
  },
  {
    id: 39, name: "Dr. Zulfiqar Ahmed", gender: "Male",
    specialty_id: 17, qualifications: "MBBS, FCPS (Nephrology), Transplant Fellowship",
    experience_years: 15, hospital_name: "Shifa International Hospital",
    city_id: 2, area: "H-8/4", address: "Pitras Bukhari Road, Islamabad",
    phone: "051-8464647", whatsapp: "923389012345", fee: 3000,
    timings: "4:00 PM – 7:00 PM", days_available: ["Mon","Wed","Fri"],
    about: "Kidney transplant specialist with expertise in CKD, peritoneal dialysis, and renal hypertension.",
    is_active: true, photo: null, rating: 4.8, reviews: 176
  },
  {
    id: 40, name: "Dr. Parveen Akhtar", gender: "Female",
    specialty_id: 4, qualifications: "MBBS, FCPS (Plastic Surgery)",
    experience_years: 11, hospital_name: "Doctors Hospital",
    city_id: 4, area: "Canal Bank", address: "Canal Bank Road, Lahore",
    phone: "042-35302001", whatsapp: "923390123456", fee: 3000,
    timings: "3:00 PM – 7:00 PM", days_available: ["Mon","Tue","Thu","Sat"],
    about: "Plastic and reconstructive surgeon specializing in rhinoplasty, cleft lip repair, breast reconstruction, and scar revision.",
    is_active: true, photo: null, rating: 4.8, reviews: 198
  },
];

const EMERGENCY_NUMBERS = [
  { name: "Rescue (Ambulance)", number: "1122" },
  { name: "Police Emergency",   number: "15" },
  { name: "Edhi Foundation",    number: "115" },
  { name: "Chippa Welfare",     number: "1020" },
  { name: "Aman Foundation",    number: "021-111-AMAN" },
  { name: "JEMS Ambulance",     number: "115" },
];

// Helper: get specialty by id
function getSpecialty(id) { return SPECIALTIES.find(s => s.id === id) || {}; }
// Helper: get city by id
function getCity(id) { return CITIES.find(c => c.id === id) || {}; }
// Helper: get doctor by id
function getDoctor(id) { return DOCTORS.find(d => d.id === id); }
