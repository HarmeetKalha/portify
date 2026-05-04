// Mock user profiles for demonstration
export const mockEmployees = [
  {
    id: 1,
    name: "Arjun Sharma",
    email: "arjun.sharma@email.com",
    password: "1234",
    role: "Full-Stack Developer",
    profilePicture: "https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun",
    bio: "Passionate full-stack developer with 6 years of experience building scalable web applications for fintech and e-commerce. Loves clean code, system design, and mentoring junior engineers.",
    portfolio: {
      projects: [
        {
          title: "PayFlow – Payments Dashboard",
          description: "Architected a real-time payments dashboard processing ₹10Cr+ daily transactions with React, Node.js, and PostgreSQL. Integrated UPI, NEFT, and IMPS APIs.",
          technologies: ["React", "Node.js", "PostgreSQL", "Redis", "UPI API"],
          link: "https://github.com/arjunsharma/payflow"
        },
        {
          title: "ShopKart – E-Commerce Platform",
          description: "Built a fully featured multi-vendor e-commerce platform with dynamic inventory, Razorpay integration, and an admin analytics panel.",
          technologies: ["Next.js", "Express", "MongoDB", "Razorpay", "AWS S3"],
          link: "https://github.com/arjunsharma/shopkart"
        }
      ],
      experience: [
        {
          company: "Infosys Ltd.",
          role: "Senior Software Engineer",
          duration: "2021 – Present",
          description: "Led a team of 6 engineers building microservices for the banking domain. Reduced API latency by 45% through caching and query optimisation."
        },
        {
          company: "Wipro Technologies",
          role: "Software Engineer",
          duration: "2018 – 2021",
          description: "Developed REST APIs and frontend modules for enterprise resource planning systems. Collaborated with global clients across 4 time zones."
        }
      ],
      socials: {
        linkedin: "https://linkedin.com/in/arjunsharma",
        github: "https://github.com/arjunsharma",
        twitter: "https://twitter.com/arjunsharma_dev",
        portfolio: "https://arjunsharma.dev"
      },
      education: [
        {
          degree: "B.Tech Computer Science & Engineering",
          institution: "IIT Bombay",
          year: "2018"
        }
      ],
      skills: ["React", "Next.js", "Node.js", "PostgreSQL", "MongoDB", "Redis", "Docker", "AWS", "System Design", "GraphQL"]
    },
    tags: {
      technical: "Full-Stack Developer",
      softSkill: "Team Leader"
    }
  },
  {
    id: 2,
    name: "Priya Nair",
    email: "priya.nair@email.com",
    password: "1234",
    role: "AI/ML Engineer",
    profilePicture: "https://api.dicebear.com/7.x/avataaars/svg?seed=PriyaNair",
    bio: "AI/ML engineer specialising in NLP and computer vision with 4 years of research and production experience. Published author with a love for applied mathematics and real-world AI solutions.",
    portfolio: {
      projects: [
        {
          title: "Bhasha – Multilingual NLP Engine",
          description: "Built a production-grade NLP engine supporting 10 Indian languages for sentiment analysis and named-entity recognition, achieving 91% F1 score.",
          technologies: ["Python", "PyTorch", "Hugging Face", "FastAPI", "Docker"],
          link: "https://github.com/priyanair/bhasha"
        },
        {
          title: "RetinalScan AI",
          description: "Developed a deep learning pipeline to detect diabetic retinopathy from fundus images with 94% accuracy, deployed on GCP.",
          technologies: ["Python", "TensorFlow", "OpenCV", "GCP", "Flask"],
          link: "https://github.com/priyanair/retinalscan"
        }
      ],
      experience: [
        {
          company: "Samsung R&D India",
          role: "Senior ML Engineer",
          duration: "2022 – Present",
          description: "Researching on-device AI models for low-power inference on Galaxy devices. Filed 2 patents in transformer model compression."
        },
        {
          company: "Fractal Analytics",
          role: "Data Scientist",
          duration: "2020 – 2022",
          description: "Delivered predictive analytics solutions for Fortune 500 clients in FMCG and insurance verticals."
        }
      ],
      socials: {
        linkedin: "https://linkedin.com/in/priyanair-ml",
        github: "https://github.com/priyanair",
        twitter: "https://twitter.com/priyanair_ai",
        portfolio: "https://priyanair.ai"
      },
      education: [
        {
          degree: "M.Tech Artificial Intelligence",
          institution: "IIT Madras",
          year: "2020"
        }
      ],
      skills: ["Python", "PyTorch", "TensorFlow", "NLP", "Computer Vision", "Hugging Face", "GCP", "Docker", "Research", "MLOps"]
    },
    tags: {
      technical: "AI/ML Specialist",
      softSkill: "Analytical Thinker"
    }
  },
  {
    id: 3,
    name: "Rohan Mehta",
    email: "rohan.mehta@email.com",
    password: "1234",
    role: "Frontend Developer",
    profilePicture: "https://api.dicebear.com/7.x/avataaars/svg?seed=RohanMehta",
    bio: "Creative frontend developer with 5 years of experience crafting pixel-perfect, accessible UIs. Obsessed with performance, design systems, and delightful micro-animations.",
    portfolio: {
      projects: [
        {
          title: "DesignKit – UI Component Library",
          description: "Open-source React component library with 80+ components, full dark mode, accessibility-first design, and Storybook documentation.",
          technologies: ["React", "TypeScript", "Storybook", "Radix UI", "CSS Modules"],
          link: "https://github.com/rohanmehta/designkit"
        },
        {
          title: "Vyaapar – SME Business Suite",
          description: "Redesigned and built the frontend of a business management SaaS used by 15,000+ Indian SMEs. Improved Core Web Vitals scores by 60%.",
          technologies: ["React", "Vite", "TailwindCSS", "Chart.js", "Zustand"],
          link: "https://github.com/rohanmehta/vyaapar"
        }
      ],
      experience: [
        {
          company: "Razorpay",
          role: "Senior Frontend Engineer",
          duration: "2022 – Present",
          description: "Built and maintained the Razorpay Dashboard used by 500,000+ merchants. Led the migration from Angular to React, reducing bundle size by 38%."
        },
        {
          company: "Zoho Corporation",
          role: "Frontend Developer",
          duration: "2019 – 2022",
          description: "Developed UI modules for Zoho CRM and Zoho Projects. Introduced component-driven architecture that cut dev time by 30%."
        }
      ],
      socials: {
        linkedin: "https://linkedin.com/in/rohanmehta",
        github: "https://github.com/rohanmehta",
        portfolio: "https://rohanmehta.design"
      },
      education: [
        {
          degree: "B.E. Information Technology",
          institution: "BITS Pilani",
          year: "2019"
        }
      ],
      skills: ["React", "TypeScript", "Vue.js", "HTML5", "CSS3", "Figma", "Performance Optimisation", "Accessibility", "Design Systems", "Vite"]
    },
    tags: {
      technical: "Frontend Specialist",
      softSkill: "Creative Thinker"
    }
  },
  {
    id: 4,
    name: "Kavya Reddy",
    email: "kavya.reddy@email.com",
    password: "1234",
    role: "DevOps & Cloud Engineer",
    profilePicture: "https://api.dicebear.com/7.x/avataaars/svg?seed=KavyaReddy",
    bio: "DevOps engineer with 5 years of expertise in cloud infrastructure, CI/CD automation, and site reliability engineering. Committed to building resilient, cost-efficient systems at scale.",
    portfolio: {
      projects: [
        {
          title: "CloudGuard – Multi-Cloud Cost Optimiser",
          description: "Built an automated cost-optimisation tool across AWS, GCP, and Azure that saved organisations ₹2Cr annually through right-sizing and reserved instance management.",
          technologies: ["Python", "Terraform", "AWS", "GCP", "Azure", "Grafana"],
          link: "https://github.com/kavyareddy/cloudguard"
        },
        {
          title: "ZeroDown – High-Availability Kubernetes Platform",
          description: "Designed a Kubernetes platform for mission-critical workloads achieving 99.995% uptime across 40+ microservices.",
          technologies: ["Kubernetes", "Helm", "Istio", "Prometheus", "ArgoCD"],
          link: "https://github.com/kavyareddy/zerodown"
        }
      ],
      experience: [
        {
          company: "Flipkart",
          role: "Senior DevOps Engineer",
          duration: "2021 – Present",
          description: "Manage cloud infrastructure for peak-season traffic (Big Billion Days) handling 1B+ API requests/day. Reduced incident MTTR by 70% through automated runbooks."
        },
        {
          company: "Mindtree Ltd.",
          role: "Cloud Engineer",
          duration: "2019 – 2021",
          description: "Implemented CI/CD pipelines and Infrastructure as Code for 12 enterprise clients, cutting release cycles from 2 weeks to 4 hours."
        }
      ],
      socials: {
        linkedin: "https://linkedin.com/in/kavyareddy-devops",
        github: "https://github.com/kavyareddy"
      },
      education: [
        {
          degree: "B.Tech Electronics & Communication",
          institution: "NIT Warangal",
          year: "2019"
        }
      ],
      skills: ["Kubernetes", "Docker", "Terraform", "AWS", "GCP", "Azure", "Jenkins", "ArgoCD", "Prometheus", "Python", "Linux", "SRE"]
    },
    tags: {
      technical: "DevOps & Cloud Expert",
      softSkill: "High-Pressure Performer"
    }
  },
  {
    id: 5,
    name: "Vikram Iyer",
    email: "vikram.iyer@email.com",
    password: "1234",
    role: "Data Scientist",
    profilePicture: "https://api.dicebear.com/7.x/avataaars/svg?seed=VikramIyer",
    bio: "Data scientist with 5 years of experience in statistical modelling, predictive analytics, and building data pipelines. Passionate about translating raw data into clear business strategies.",
    portfolio: {
      projects: [
        {
          title: "LoanSafe – Credit Risk Prediction",
          description: "Developed an ML model to predict loan default risk for a leading NBFC, reducing NPAs by 18% and improving approval accuracy by 22%.",
          technologies: ["Python", "XGBoost", "Scikit-learn", "SQL", "Power BI"],
          link: "https://github.com/vikramiyer/loansafe"
        },
        {
          title: "AgriPredict – Crop Yield Forecasting",
          description: "Built a satellite imagery + weather data pipeline to forecast crop yields for 50,000 farmers across Maharashtra and AP, used by the state agriculture department.",
          technologies: ["Python", "Pandas", "GIS", "Random Forest", "Streamlit"],
          link: "https://github.com/vikramiyer/agripredict"
        }
      ],
      experience: [
        {
          company: "HDFC Bank – Analytics CoE",
          role: "Senior Data Scientist",
          duration: "2021 – Present",
          description: "Leads a 4-person data science team delivering models for credit risk, fraud detection, and customer lifetime value. Generated ₹120Cr additional revenue in FY24."
        },
        {
          company: "Mu Sigma",
          role: "Decision Scientist",
          duration: "2019 – 2021",
          description: "Delivered analytics and machine learning solutions for retail, healthcare, and logistics clients across the US and India."
        }
      ],
      socials: {
        linkedin: "https://linkedin.com/in/vikramiyer-data",
        github: "https://github.com/vikramiyer"
      },
      education: [
        {
          degree: "M.Sc. Statistics",
          institution: "Chennai Mathematical Institute",
          year: "2019"
        }
      ],
      skills: ["Python", "R", "SQL", "Machine Learning", "XGBoost", "Statistics", "Power BI", "Tableau", "Pandas", "Scikit-learn", "A/B Testing"]
    },
    tags: {
      technical: "Data Science Expert",
      softSkill: "Strategic Communicator"
    }
  }
];

export const mockEmployers = [
  {
    id: 101,
    name: "TechVentures India Pvt. Ltd.",
    email: "hr@techventuresindia.com",
    password: "1234",
    type: "employer",
    companyName: "TechVentures India Pvt. Ltd.",
    industry: "Technology",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=TechVentures",
    description: "A Bengaluru-based product company building next-generation SaaS platforms for global enterprise clients. We invest in people, innovation, and open-source culture.",
    employees: [1, 3],
    recentlyViewed: [2, 4]
  },
  {
    id: 102,
    name: "NeuralBridge AI Labs",
    email: "careers@neuralbridgeai.com",
    password: "1234",
    type: "employer",
    companyName: "NeuralBridge AI Labs",
    industry: "Artificial Intelligence",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=NeuralBridge",
    description: "India's fastest-growing applied AI research company, with teams in Hyderabad and Singapore. We build AI-first products for healthcare, fintech, and smart cities.",
    employees: [2],
    recentlyViewed: [1, 5]
  },
  {
    id: 103,
    name: "InfraEdge Solutions",
    email: "talent@infraedge.io",
    password: "1234",
    type: "employer",
    companyName: "InfraEdge Solutions",
    industry: "Cloud Infrastructure",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=InfraEdge",
    description: "A cloud-native infrastructure company helping Indian startups and enterprises scale reliably. We specialise in multi-cloud architecture, DevSecOps, and platform engineering.",
    employees: [4],
    recentlyViewed: [1, 2]
  },
  {
    id: 104,
    name: "DataSutra Analytics",
    email: "jobs@datasutra.in",
    password: "1234",
    type: "employer",
    companyName: "DataSutra Analytics",
    industry: "Data & Analytics",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=DataSutra",
    description: "A Mumbai-headquartered data intelligence firm powering decisions for BFSI, retail, and healthcare enterprises across India. Our platform processes over 5 billion data points daily.",
    employees: [5],
    recentlyViewed: [2, 3]
  },
  {
    id: 105,
    name: "Kalpavriksha Digital",
    email: "hr@kalpavriksha.tech",
    password: "1234",
    type: "employer",
    companyName: "Kalpavriksha Digital",
    industry: "Digital Transformation",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=Kalpavriksha",
    description: "A digital transformation consultancy headquartered in Pune, serving mid-market and enterprise clients across manufacturing, retail, and government sectors in India.",
    employees: [1, 3],
    recentlyViewed: [4, 5]
  }
];

// Recently viewed tracking (in a real app, this would be in a database)
export const recentlyViewedData = {
  employee: {
    1: [2, 3, 4],
    2: [1, 5],
    3: [1, 2],
    4: [1, 3],
    5: [2, 4]
  },
  employer: {
    101: [2, 4, 5],
    102: [1, 3, 4],
    103: [1, 2, 5],
    104: [1, 3, 4],
    105: [2, 4, 5]
  }
};
