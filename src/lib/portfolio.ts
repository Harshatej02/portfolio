import ieeeDoc from "@/assets/docs/ieee.pdf.asset.json";
import reportDoc from "@/assets/docs/report.pdf.asset.json";
import slidesDoc from "@/assets/docs/slides.pdf.asset.json";
import profilePhoto from "@/assets/profile.png.asset.json";

export const profile = {
  name: "Kambala Teja Sri Harsha",
  photoUrl: profilePhoto.url,
  role: "Data Analyst",
  location: "Bangalore, India",
  email: "harshatej2003@gmail.com",
  phone: "+91 6301276815",
  linkedin: "https://linkedin.com/in/harsha-tej-48b134264",
  github: "https://github.com/Harshatej02",
  // Placeholder: add your real resume file path here when available.
  resumeUrl: "" as string,
};

export const skills = [
  {
    title: "Data Analysis",
    items: ["Data Cleaning", "Exploratory Data Analysis", "Statistical Analysis"],
  },
  { title: "Programming", items: ["Python", "Java", "SQL"] },
  { title: "Databases", items: ["SQL", "SQLite", "Relational Database Management Systems"] },
  {
    title: "Data Science",
    items: [
      "Pandas",
      "NumPy",
      "Scikit-learn",
      "Feature Engineering",
      "Predictive Modeling",
      "NLP",
      "Deep Learning",
    ],
  },
  { title: "Visualization", items: ["Dashboards", "GIS-based Visualization"] },
  { title: "Web & Tools", items: ["HTML", "CSS", "Flask", "Remote Sensing"] },
];

export type Project = {
  slug: string;
  title: string;
  period: string;
  tag: string;
  summary: string;
  highlights: string[];
  stack: string[];
  note?: string;
  repo?: string;
  team?: string;
  documents?: { label: string; url: string; filename: string }[];
};

export const projects: Project[] = [
  {
    slug: "ckd-explainable-ai",
    title: "Chronic Kidney Disease Prediction Using Explainable AI",
    period: "February 2026 – May 2026",
    tag: "Machine Learning · XAI",
    summary:
      "An educational machine learning project that predicts chronic kidney disease risk from clinical data and explains each prediction.",
    highlights: [
      "Clinical dataset preprocessing and feature engineering.",
      "SMOTE-based class-imbalance correction.",
      "Ensemble learning for predictive modeling.",
      "Flask-based web application for predictions and explanations.",
    ],
    stack: ["Python", "Scikit-learn", "SMOTE", "Flask"],
    note: "Educational project only — not clinically validated or deployed for medical use.",
  },
  {
    slug: "soil-erosion-risk",
    title: "Soil Erosion Risk Prediction System",
    period: "August 2025 – November 2025",
    tag: "Geospatial · Classification",
    summary:
      "A Random Forest system that classifies land into erosion-risk categories using RUSLE-based factors, satellite data and GIS, with a case study of central Gujarat, to support land-management decisions.",
    highlights: [
      "Combined RUSLE factors — rainfall erosivity, soil erodibility (K), slope length and steepness (LS), vegetation cover and conservation practice — with land-use and soil-moisture data.",
      "Gathered spatial data from satellite imagery (Landsat, Sentinel-2) and digital elevation models, processed with GIS tools such as QGIS and Google Earth Engine.",
      "Random Search-tuned Random Forest (RS-RF) classifier, evaluated with accuracy, precision, recall, F1-score, MCC and AUC; reported predictive accuracy of 66.67%.",
      "Produced soil-loss risk maps for central Gujarat (Ahmedabad, Vadodara region) on a scale from slight to severe; most of the area fell in the slight (32.4%) and moderate (35.4%) categories.",
      "System design covering data sources, preprocessing, AI model, database, user interface and a reports & alerts module.",
    ],
    stack: ["Python", "Random Forest", "GIS", "Remote Sensing", "QGIS", "Google Earth Engine"],
    team: "Team project with Bathula Nithin Kumar, Mendu Ramanjan Reddy and Avula Nithish, guided by Dr. K. Upendra Babu, Bharath Institute of Higher Education and Research.",
    documents: [
      {
        label: "Research paper (IEEE format)",
        url: ieeeDoc.url,
        filename: "soil-erosion-ieee-paper.pdf",
      },
      { label: "Project report", url: reportDoc.url, filename: "soil-erosion-project-report.pdf" },
      {
        label: "Presentation slides",
        url: slidesDoc.url,
        filename: "soil-erosion-presentation.pdf",
      },
    ],
  },
];

export const experience = [
  { title: "Data Science Intern", org: "Exposys Data Labs", type: "Internship" },
  {
    title: "AI/ML Virtual Intern",
    org: "Google for Developers (AICTE/EduSkills)",
    type: "Virtual Internship",
  },
  { title: "Java Full Stack Program", org: "Wipro TalentNext", type: "Training Program" },
  { title: "Data Analytics Job Simulation", org: "Deloitte (Forage)", type: "Job Simulation" },
];

export const education = [
  {
    degree: "Bachelor of Computer Science Engineering",
    school: "Bharath Institute of Science and Technology, Chennai",
    years: "2022 – 2026",
    extra: "CGPA: 8.61/10",
  },
  {
    degree: "Intermediate (MPC)",
    school: "Narayana Junior College, Kakinada",
    years: "2020 – 2022",
  },
];

export const certifications = [
  { name: "Machine Learning with Python", issuer: "IBM Developer Skills Network" },
  { name: "Data Analysis with Python", issuer: "IBM Developer Skills Network" },
  { name: "Data Visualization with Python", issuer: "IBM Developer Skills Network" },
  { name: "SQL and Relational Databases", issuer: "IBM Developer Skills Network" },
  { name: "Application of AI/ML Model for Crop Acreage Mapping", issuer: "ISRO (IIRS)" },
];
