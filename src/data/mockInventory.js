// Sample PDF URL reused for all demo documents (reliable public PDF)
const SAMPLE_PDF = 'https://www.africau.edu/images/general/sample.pdf';

// Category definitions shared across the app
export const DOC_CATEGORIES = [
  { id: 'all',         label: 'All Documents',      color: '#16a34a', bg: '#dcfce7' },
  { id: 'resume',      label: 'Resume / CV',         color: '#0ea5e9', bg: '#e0f2fe' },
  { id: 'certificate', label: 'Certificates',        color: '#f59e0b', bg: '#fef3c7' },
  { id: 'research',    label: 'Research Papers',     color: '#8b5cf6', bg: '#ede9fe' },
  { id: 'personal',    label: 'Personal Documents',  color: '#ef4444', bg: '#fee2e2' },
  { id: 'project',     label: 'Project Reports',     color: '#06b6d4', bg: '#cffafe' },
  { id: 'other',       label: 'Other',               color: '#6b7280', bg: '#f3f4f6' },
];

// Demo inventory — keyed by employee ID
export const mockInventoryByEmployee = {
  // ─── Arjun Sharma (ID: 1) — Full-Stack Developer ────────────────────────
  1: [
    {
      id: 10001, name: 'Arjun_Sharma_Resume_2024.pdf', category: 'resume',
      description: 'Updated resume with Infosys and Wipro experience. Includes all projects, tech stack, and GitHub links.',
      isPublic: true, uploadDate: '2024-03-10', size: '320 KB', fileType: 'pdf',
      previewUrl: SAMPLE_PDF,
    },
    {
      id: 10002, name: 'AWS_Solutions_Architect_Certificate.pdf', category: 'certificate',
      description: 'AWS Certified Solutions Architect – Associate (SAA-C03). Issued by Amazon Web Services, valid through 2026.',
      isPublic: true, uploadDate: '2023-11-05', size: '215 KB', fileType: 'pdf',
      previewUrl: SAMPLE_PDF,
    },
    {
      id: 10003, name: 'PayFlow_Technical_Architecture_Report.pdf', category: 'project',
      description: 'Full technical architecture document for the PayFlow payments dashboard — system design, API specs, and scalability benchmarks.',
      isPublic: true, uploadDate: '2024-01-22', size: '1.4 MB', fileType: 'pdf',
      previewUrl: SAMPLE_PDF,
    },
    {
      id: 10004, name: 'ShopKart_Case_Study.pdf', category: 'project',
      description: 'Detailed case study of ShopKart multi-vendor e-commerce platform development, Razorpay integration, and performance metrics.',
      isPublic: true, uploadDate: '2023-09-14', size: '890 KB', fileType: 'pdf',
      previewUrl: SAMPLE_PDF,
    },
    {
      id: 10005, name: 'Infosys_Offer_Letter.pdf', category: 'personal',
      description: 'Original offer letter from Infosys Ltd. for Senior Software Engineer role — dated June 2021.',
      isPublic: false, uploadDate: '2021-06-01', size: '145 KB', fileType: 'pdf',
      previewUrl: SAMPLE_PDF,
    },
    {
      id: 10006, name: 'PAN_Card_Scan.pdf', category: 'personal',
      description: 'Self-attested copy of PAN Card — required for tax filings and background checks.',
      isPublic: false, uploadDate: '2022-04-03', size: '98 KB', fileType: 'pdf',
      previewUrl: SAMPLE_PDF,
    },
  ],

  // ─── Priya Nair (ID: 2) — AI/ML Engineer ────────────────────────────────
  2: [
    {
      id: 20001, name: 'Priya_Nair_Resume_ML_2024.pdf', category: 'resume',
      description: 'AI/ML-focused resume highlighting NLP research, Samsung R&D tenure, and patent filings.',
      isPublic: true, uploadDate: '2024-02-18', size: '355 KB', fileType: 'pdf',
      previewUrl: SAMPLE_PDF,
    },
    {
      id: 20002, name: 'Bhasha_NLP_Research_Paper.pdf', category: 'research',
      description: 'Published research paper: "Bhasha — Multilingual NLP for Indian Languages". Presented at ACL 2023.',
      isPublic: true, uploadDate: '2023-07-12', size: '2.1 MB', fileType: 'pdf',
      previewUrl: SAMPLE_PDF,
    },
    {
      id: 20003, name: 'RetinalScan_AI_Project_Report.pdf', category: 'project',
      description: 'Technical documentation for RetinalScan deep learning pipeline: model architecture, dataset, GCP deployment, and accuracy benchmarks.',
      isPublic: true, uploadDate: '2023-03-28', size: '1.7 MB', fileType: 'pdf',
      previewUrl: SAMPLE_PDF,
    },
    {
      id: 20004, name: 'Google_ML_Engineer_Certificate.pdf', category: 'certificate',
      description: 'Google Professional Machine Learning Engineer certification. Issued June 2023.',
      isPublic: true, uploadDate: '2023-06-20', size: '210 KB', fileType: 'pdf',
      previewUrl: SAMPLE_PDF,
    },
    {
      id: 20005, name: 'IIT_Madras_MTech_Transcript.pdf', category: 'personal',
      description: 'Official M.Tech (Artificial Intelligence) transcripts from IIT Madras — all 4 semesters.',
      isPublic: false, uploadDate: '2020-06-15', size: '430 KB', fileType: 'pdf',
      previewUrl: SAMPLE_PDF,
    },
    {
      id: 20006, name: 'Samsung_Employment_Verification_Letter.pdf', category: 'personal',
      description: 'HR-issued employment verification letter from Samsung R&D India confirming role and tenure.',
      isPublic: false, uploadDate: '2024-01-10', size: '118 KB', fileType: 'pdf',
      previewUrl: SAMPLE_PDF,
    },
    {
      id: 20007, name: 'Patent_App_Transformer_Compression.pdf', category: 'research',
      description: 'Filed patent application: "Efficient Transformer Model Compression for On-Device Inference". Patent pending at IP India.',
      isPublic: false, uploadDate: '2023-12-01', size: '780 KB', fileType: 'pdf',
      previewUrl: SAMPLE_PDF,
    },
  ],

  // ─── Rohan Mehta (ID: 3) — Frontend Developer ───────────────────────────
  3: [
    {
      id: 30001, name: 'Rohan_Mehta_Resume_2024.pdf', category: 'resume',
      description: 'Frontend-focused resume with Razorpay and Zoho experience, open-source contributions, and design system highlights.',
      isPublic: true, uploadDate: '2024-03-01', size: '298 KB', fileType: 'pdf',
      previewUrl: SAMPLE_PDF,
    },
    {
      id: 30002, name: 'Meta_Frontend_Developer_Certificate.pdf', category: 'certificate',
      description: 'Meta Frontend Developer Professional Certificate — completed via Coursera. Includes React, advanced HTML/CSS, and UX fundamentals.',
      isPublic: true, uploadDate: '2023-08-30', size: '225 KB', fileType: 'pdf',
      previewUrl: SAMPLE_PDF,
    },
    {
      id: 30003, name: 'DesignKit_Component_Library_Docs.pdf', category: 'project',
      description: 'Full documentation of the DesignKit open-source React component library — architecture, API reference, and contribution guide.',
      isPublic: true, uploadDate: '2023-10-15', size: '3.2 MB', fileType: 'pdf',
      previewUrl: SAMPLE_PDF,
    },
    {
      id: 30004, name: 'Vyaapar_Performance_Improvement_Report.pdf', category: 'project',
      description: 'Before/after performance report for Vyaapar SME Suite: Core Web Vitals improvement, bundle size reduction (38%), and Lighthouse scores.',
      isPublic: true, uploadDate: '2023-05-22', size: '1.1 MB', fileType: 'pdf',
      previewUrl: SAMPLE_PDF,
    },
    {
      id: 30005, name: 'Aadhaar_Card.pdf', category: 'personal',
      description: 'Self-attested Aadhaar card copy for identity verification and address proof.',
      isPublic: false, uploadDate: '2022-11-08', size: '87 KB', fileType: 'pdf',
      previewUrl: SAMPLE_PDF,
    },
    {
      id: 30006, name: 'Razorpay_Experience_Certificate.pdf', category: 'personal',
      description: 'Experience certificate from Razorpay HR confirming Senior Frontend Engineer tenure (2022–Present).',
      isPublic: false, uploadDate: '2024-01-25', size: '132 KB', fileType: 'pdf',
      previewUrl: SAMPLE_PDF,
    },
  ],

  // ─── Kavya Reddy (ID: 4) — DevOps & Cloud Engineer ──────────────────────
  4: [
    {
      id: 40001, name: 'Kavya_Reddy_DevOps_Resume_2024.pdf', category: 'resume',
      description: 'DevOps & cloud-focused resume with Flipkart SRE and Mindtree experience, Kubernetes, AWS, and GCP expertise.',
      isPublic: true, uploadDate: '2024-02-05', size: '315 KB', fileType: 'pdf',
      previewUrl: SAMPLE_PDF,
    },
    {
      id: 40002, name: 'CKA_Kubernetes_Administrator_Certificate.pdf', category: 'certificate',
      description: 'CNCF Certified Kubernetes Administrator (CKA) — Score: 94/100. Valid through 2025.',
      isPublic: true, uploadDate: '2023-04-12', size: '240 KB', fileType: 'pdf',
      previewUrl: SAMPLE_PDF,
    },
    {
      id: 40003, name: 'AWS_DevOps_Engineer_Professional_Certificate.pdf', category: 'certificate',
      description: 'AWS Certified DevOps Engineer – Professional (DOP-C02). Demonstrates expertise in CI/CD, monitoring, and IaC.',
      isPublic: true, uploadDate: '2022-09-18', size: '218 KB', fileType: 'pdf',
      previewUrl: SAMPLE_PDF,
    },
    {
      id: 40004, name: 'Mindtree_Experience_Certificate.pdf', category: 'certificate',
      description: 'Official experience certificate from Mindtree Ltd. confirming Cloud Engineer role (2019–2021).',
      isPublic: true, uploadDate: '2021-07-05', size: '128 KB', fileType: 'pdf',
      previewUrl: SAMPLE_PDF,
    },
    {
      id: 40005, name: 'CloudGuard_Platform_Architecture.pdf', category: 'project',
      description: 'Technical architecture document for CloudGuard multi-cloud cost optimiser — FinOps framework, resource tagging strategy, and ₹2Cr savings analysis.',
      isPublic: true, uploadDate: '2024-01-30', size: '2.5 MB', fileType: 'pdf',
      previewUrl: SAMPLE_PDF,
    },
    {
      id: 40006, name: 'Birth_Certificate.pdf', category: 'personal',
      description: 'Government-issued birth certificate for identity and age proof.',
      isPublic: false, uploadDate: '2021-03-14', size: '95 KB', fileType: 'pdf',
      previewUrl: SAMPLE_PDF,
    },
    {
      id: 40007, name: 'Flipkart_Salary_Slip_Q1_2024.pdf', category: 'personal',
      description: 'Latest quarterly salary slip from Flipkart for Q1 2024 — required for loan applications.',
      isPublic: false, uploadDate: '2024-04-01', size: '112 KB', fileType: 'pdf',
      previewUrl: SAMPLE_PDF,
    },
  ],

  // ─── Vikram Iyer (ID: 5) — Data Scientist ───────────────────────────────
  5: [
    {
      id: 50001, name: 'Vikram_Iyer_Data_Scientist_Resume_2024.pdf', category: 'resume',
      description: 'Data science resume showcasing HDFC Bank CoE, Mu Sigma projects, ML publications, and Azure certification.',
      isPublic: true, uploadDate: '2024-02-28', size: '335 KB', fileType: 'pdf',
      previewUrl: SAMPLE_PDF,
    },
    {
      id: 50002, name: 'Credit_Risk_Prediction_Research_Paper.pdf', category: 'research',
      description: 'Published paper: "LoanSafe — Explainable ML for Credit Risk in Indian NBFCs". Published in Journal of Financial Data Science, 2023.',
      isPublic: true, uploadDate: '2023-09-05', size: '1.9 MB', fileType: 'pdf',
      previewUrl: SAMPLE_PDF,
    },
    {
      id: 50003, name: 'AgriPredict_Project_Technical_Report.pdf', category: 'project',
      description: 'Detailed report on AgriPredict: satellite + weather data ingestion pipeline, crop yield ML model, and deployment results for Maharashtra AG dept.',
      isPublic: true, uploadDate: '2023-06-14', size: '2.8 MB', fileType: 'pdf',
      previewUrl: SAMPLE_PDF,
    },
    {
      id: 50004, name: 'Azure_Data_Scientist_Associate_Certificate.pdf', category: 'certificate',
      description: 'Microsoft Certified: Azure Data Scientist Associate (DP-100). Issued December 2022.',
      isPublic: true, uploadDate: '2022-12-10', size: '222 KB', fileType: 'pdf',
      previewUrl: SAMPLE_PDF,
    },
    {
      id: 50005, name: 'HDFC_Bank_Salary_Slip_March_2024.pdf', category: 'personal',
      description: 'Salary slip for March 2024 from HDFC Bank Analytics CoE — used for rental and loan documentation.',
      isPublic: false, uploadDate: '2024-04-03', size: '108 KB', fileType: 'pdf',
      previewUrl: SAMPLE_PDF,
    },
    {
      id: 50006, name: 'CMI_MSc_Statistics_Transcript.pdf', category: 'personal',
      description: 'Official M.Sc. Statistics academic transcript from Chennai Mathematical Institute.',
      isPublic: false, uploadDate: '2019-07-20', size: '390 KB', fileType: 'pdf',
      previewUrl: SAMPLE_PDF,
    },
  ],
};
