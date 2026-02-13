// Mock user profiles for demonstration
export const mockEmployees = [
  {
    id: 1,
    name: "Sarah Chen",
    email: "sarah.chen@email.com",
    role: "Full-Stack Developer",
    profilePicture: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    bio: "Passionate full-stack developer with 5 years of experience building scalable web applications. Love working with modern frameworks and solving complex problems.",
    portfolio: {
      projects: [
        {
          title: "E-Commerce Platform",
          description: "Built a complete e-commerce solution with React, Node.js, and MongoDB. Implemented payment processing, inventory management, and real-time notifications.",
          technologies: ["React", "Node.js", "MongoDB", "Stripe", "Socket.io"],
          link: "https://github.com/example/ecommerce"
        },
        {
          title: "AI Chatbot Assistant",
          description: "Developed an intelligent chatbot using natural language processing and machine learning to provide customer support.",
          technologies: ["Python", "TensorFlow", "Flask", "React"],
          link: "https://github.com/example/chatbot"
        }
      ],
      experience: [
        {
          company: "TechCorp Inc.",
          role: "Senior Full-Stack Developer",
          duration: "2021 - Present",
          description: "Led development of microservices architecture. Mentored junior developers and improved deployment processes, reducing deployment time by 60%."
        },
        {
          company: "StartupXYZ",
          role: "Full-Stack Developer",
          duration: "2019 - 2021",
          description: "Built core features for SaaS platform. Worked closely with product team to deliver user-centric solutions."
        }
      ],
      socials: {
        linkedin: "https://linkedin.com/in/sarachen",
        github: "https://github.com/sarachen",
        twitter: "https://twitter.com/sarachen",
        portfolio: "https://sarachen.dev"
      },
      education: [
        {
          degree: "B.S. Computer Science",
          institution: "Stanford University",
          year: "2019"
        }
      ],
      skills: ["React", "Node.js", "Python", "MongoDB", "PostgreSQL", "AWS", "Docker", "Kubernetes", "TensorFlow", "GraphQL"]
    },
    tags: {
      technical: "Full-Stack Developer",
      softSkill: "Team Leader"
    }
  },
  {
    id: 2,
    name: "Marcus Johnson",
    email: "marcus.j@email.com",
    role: "AI/ML Engineer",
    profilePicture: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
    bio: "AI enthusiast specializing in deep learning and computer vision. Published researcher with a passion for solving real-world problems using artificial intelligence.",
    portfolio: {
      projects: [
        {
          title: "Medical Image Analysis",
          description: "Developed deep learning models for detecting anomalies in medical images with 95% accuracy.",
          technologies: ["Python", "PyTorch", "OpenCV", "FastAPI"],
          link: "https://github.com/example/medical-ai"
        },
        {
          title: "Recommendation Engine",
          description: "Built a scalable recommendation system serving 1M+ users using collaborative filtering and neural networks.",
          technologies: ["Python", "TensorFlow", "Redis", "Kafka"],
          link: "https://github.com/example/recommender"
        }
      ],
      experience: [
        {
          company: "AI Labs",
          role: "Senior ML Engineer",
          duration: "2020 - Present",
          description: "Research and development of state-of-the-art machine learning models. Published 3 papers in top-tier conferences."
        }
      ],
      socials: {
        linkedin: "https://linkedin.com/in/marcusj",
        github: "https://github.com/marcusj",
        twitter: "https://twitter.com/marcusj",
        portfolio: "https://marcusj.ai"
      },
      education: [
        {
          degree: "Ph.D. Machine Learning",
          institution: "MIT",
          year: "2020"
        }
      ],
      skills: ["Python", "TensorFlow", "PyTorch", "Computer Vision", "NLP", "Deep Learning", "AWS", "Docker", "Research"]
    },
    tags: {
      technical: "AI Specialist",
      softSkill: "Detail-Oriented"
    }
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    email: "emily.r@email.com",
    role: "Frontend Developer",
    profilePicture: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    bio: "Creative frontend developer focused on building beautiful, accessible, and performant user interfaces. Strong advocate for user experience and design systems.",
    portfolio: {
      projects: [
        {
          title: "Design System Library",
          description: "Created a comprehensive design system used across 20+ products, improving development speed by 40%.",
          technologies: ["React", "TypeScript", "Storybook", "CSS-in-JS"],
          link: "https://github.com/example/design-system"
        }
      ],
      experience: [
        {
          company: "DesignTech",
          role: "Lead Frontend Developer",
          duration: "2020 - Present",
          description: "Spearheaded frontend architecture decisions. Championed accessibility standards and performance optimization."
        }
      ],
      socials: {
        linkedin: "https://linkedin.com/in/emilyrodriguez",
        github: "https://github.com/emilyrodriguez",
        portfolio: "https://emilyrodriguez.design"
      },
      education: [
        {
          degree: "B.A. Interactive Media",
          institution: "NYU",
          year: "2020"
        }
      ],
      skills: ["React", "Vue.js", "TypeScript", "CSS", "HTML", "Accessibility", "Performance", "Design Systems", "Figma"]
    },
    tags: {
      technical: "Frontend Specialist",
      softSkill: "Creative Thinker"
    }
  },
  {
    id: 4,
    name: "David Kim",
    email: "david.kim@email.com",
    role: "DevOps Engineer",
    profilePicture: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    bio: "DevOps engineer passionate about automation, infrastructure as code, and building reliable systems. Expert in cloud platforms and CI/CD pipelines.",
    portfolio: {
      projects: [
        {
          title: "Kubernetes Orchestration",
          description: "Designed and implemented Kubernetes infrastructure handling 10M+ requests per day with 99.99% uptime.",
          technologies: ["Kubernetes", "Docker", "Terraform", "AWS", "Prometheus"],
          link: "https://github.com/example/k8s-infra"
        }
      ],
      experience: [
        {
          company: "CloudScale",
          role: "Senior DevOps Engineer",
          duration: "2019 - Present",
          description: "Managed cloud infrastructure and deployment pipelines. Reduced deployment failures by 80% through automation."
        }
      ],
      socials: {
        linkedin: "https://linkedin.com/in/davidkim",
        github: "https://github.com/davidkim"
      },
      education: [
        {
          degree: "B.S. Information Systems",
          institution: "UC Berkeley",
          year: "2019"
        }
      ],
      skills: ["Kubernetes", "Docker", "AWS", "Terraform", "Jenkins", "GitLab CI", "Monitoring", "Linux", "Python"]
    },
    tags: {
      technical: "DevOps Specialist",
      softSkill: "High-Pressure Performer"
    }
  },
  {
    id: 5,
    name: "Priya Patel",
    email: "priya.p@email.com",
    role: "Data Scientist",
    profilePicture: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
    bio: "Data scientist with expertise in statistical modeling and predictive analytics. Experienced in turning data into actionable business insights.",
    portfolio: {
      projects: [
        {
          title: "Customer Churn Prediction",
          description: "Built predictive models that reduced customer churn by 25% through early intervention strategies.",
          technologies: ["Python", "Scikit-learn", "Pandas", "SQL", "Tableau"],
          link: "https://github.com/example/churn-model"
        }
      ],
      experience: [
        {
          company: "DataCorp",
          role: "Senior Data Scientist",
          duration: "2020 - Present",
          description: "Led data science initiatives across multiple business units. Delivered insights that drove $5M in revenue growth."
        }
      ],
      socials: {
        linkedin: "https://linkedin.com/in/priyapatel",
        github: "https://github.com/priyapatel"
      },
      education: [
        {
          degree: "M.S. Statistics",
          institution: "Columbia University",
          year: "2020"
        }
      ],
      skills: ["Python", "R", "SQL", "Machine Learning", "Statistics", "Tableau", "Pandas", "Scikit-learn", "A/B Testing"]
    },
    tags: {
      technical: "Data Science Expert",
      softSkill: "Analytical Thinker"
    }
  }
];

export const mockEmployers = [
  {
    id: 101,
    name: "TechVentures Inc.",
    email: "hr@techventures.com",
    type: "employer",
    companyName: "TechVentures Inc.",
    industry: "Technology",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=TechVentures",
    description: "Leading technology company focused on innovative solutions for enterprise clients.",
    employees: [1, 3], // Sarah and Emily work here
    recentlyViewed: [2, 4]
  },
  {
    id: 102,
    name: "AI Innovations",
    email: "careers@aiinnovations.com",
    type: "employer",
    companyName: "AI Innovations",
    industry: "Artificial Intelligence",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=AI",
    description: "Cutting-edge AI research and development company pushing the boundaries of machine learning.",
    employees: [2], // Marcus works here
    recentlyViewed: [1, 5]
  }
];

// Recently viewed tracking (in a real app, this would be in a database)
export const recentlyViewedData = {
  employee: {
    1: [2, 3, 4], // Sarah recently viewed Marcus, Emily, David
    2: [1, 5],
    3: [1, 2],
    4: [1, 3],
    5: [2, 4]
  },
  employer: {
    101: [2, 4, 5],
    102: [1, 3, 4]
  }
};
