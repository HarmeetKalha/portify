// AI-powered tagging engine that analyzes portfolios and generates relevant tags

const technicalKeywords = {
  'Full-Stack Developer': ['react', 'node', 'full-stack', 'mongodb', 'postgresql', 'express', 'vue', 'angular'],
  'Frontend Specialist': ['react', 'vue', 'angular', 'css', 'html', 'ui', 'ux', 'design', 'frontend'],
  'Backend Developer': ['node', 'python', 'java', 'go', 'api', 'database', 'backend', 'server'],
  'AI Specialist': ['ai', 'machine learning', 'deep learning', 'tensorflow', 'pytorch', 'nlp', 'computer vision'],
  'Data Science Expert': ['data', 'analytics', 'statistics', 'pandas', 'scikit-learn', 'tableau', 'sql'],
  'DevOps Specialist': ['kubernetes', 'docker', 'aws', 'azure', 'gcp', 'terraform', 'jenkins', 'ci/cd', 'devops'],
  'Mobile Developer': ['ios', 'android', 'react native', 'flutter', 'swift', 'kotlin', 'mobile'],
  'Web App Developer': ['react', 'vue', 'angular', 'web', 'javascript', 'typescript', 'webapp'],
  'Cloud Engineer': ['aws', 'azure', 'gcp', 'cloud', 'serverless', 'lambda'],
  'Security Engineer': ['security', 'penetration', 'encryption', 'cybersecurity', 'authentication']
};

const softSkillPatterns = {
  'Team Leader': ['led', 'mentored', 'managed', 'coordinated', 'leadership', 'team'],
  'Detail-Oriented': ['optimized', 'improved', 'accuracy', 'precision', 'thorough', 'meticulous'],
  'High-Pressure Performer': ['deadline', 'fast-paced', 'critical', 'urgent', 'uptime', 'reliability'],
  'Creative Thinker': ['innovative', 'designed', 'created', 'invented', 'creative', 'novel'],
  'Analytical Thinker': ['analyzed', 'data-driven', 'metrics', 'insights', 'research', 'statistical'],
  'Disciplined': ['consistent', 'systematic', 'organized', 'structured', 'methodical'],
  'Collaborative': ['collaborated', 'partnered', 'cross-functional', 'teamwork', 'communication'],
  'Problem Solver': ['solved', 'resolved', 'troubleshoot', 'debugged', 'fixed', 'solution']
};

export function generateTags(portfolio) {
  if (!portfolio) {
    return {
      technical: 'Developer',
      softSkill: 'Professional'
    };
  }

  // Combine all text from portfolio
  const allText = [
    ...(portfolio.skills || []),
    ...(portfolio.projects || []).map(p => `${p.title} ${p.description} ${(p.technologies || []).join(' ')}`),
    ...(portfolio.experience || []).map(e => `${e.role} ${e.description}`)
  ].join(' ').toLowerCase();

  // Find technical tag
  let technicalTag = 'Developer';
  let maxTechnicalScore = 0;

  Object.entries(technicalKeywords).forEach(([tag, keywords]) => {
    const score = keywords.reduce((acc, keyword) => {
      const regex = new RegExp(keyword.toLowerCase(), 'gi');
      const matches = allText.match(regex);
      return acc + (matches ? matches.length : 0);
    }, 0);

    if (score > maxTechnicalScore) {
      maxTechnicalScore = score;
      technicalTag = tag;
    }
  });

  // Find soft skill tag
  let softSkillTag = 'Professional';
  let maxSoftSkillScore = 0;

  Object.entries(softSkillPatterns).forEach(([tag, patterns]) => {
    const score = patterns.reduce((acc, pattern) => {
      const regex = new RegExp(pattern.toLowerCase(), 'gi');
      const matches = allText.match(regex);
      return acc + (matches ? matches.length : 0);
    }, 0);

    if (score > maxSoftSkillScore) {
      maxSoftSkillScore = score;
      softSkillTag = tag;
    }
  });

  // Additional heuristics based on portfolio completeness
  const projectCount = portfolio.projects?.length || 0;
  const experienceCount = portfolio.experience?.length || 0;
  const skillCount = portfolio.skills?.length || 0;

  // If portfolio is very complete, likely detail-oriented
  if (projectCount >= 3 && experienceCount >= 2 && skillCount >= 8 && maxSoftSkillScore < 3) {
    softSkillTag = 'Detail-Oriented';
  }

  return {
    technical: technicalTag,
    softSkill: softSkillTag
  };
}

// Analyze a portfolio and return tags
export function analyzePortfolio(portfolio) {
  return generateTags(portfolio);
}
