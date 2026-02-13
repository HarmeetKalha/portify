// Matching engine for connecting employers with employees

export function matchEmployeesToRequirements(employees, requirements) {
  if (!requirements || (!requirements.technical && !requirements.softSkill)) {
    return employees;
  }

  return employees
    .map(employee => {
      let score = 0;
      
      // Match technical requirements
      if (requirements.technical) {
        const techReq = requirements.technical.toLowerCase();
        const empTech = employee.tags?.technical?.toLowerCase() || '';
        const empSkills = (employee.portfolio?.skills || []).join(' ').toLowerCase();
        
        if (empTech.includes(techReq) || techReq.includes(empTech)) {
          score += 10;
        }
        
        // Check if any skills match
        if (empSkills.includes(techReq)) {
          score += 5;
        }
      }
      
      // Match soft skill requirements
      if (requirements.softSkill) {
        const softReq = requirements.softSkill.toLowerCase();
        const empSoft = employee.tags?.softSkill?.toLowerCase() || '';
        
        if (empSoft.includes(softReq) || softReq.includes(empSoft)) {
          score += 10;
        }
      }
      
      return { ...employee, matchScore: score };
    })
    .filter(emp => emp.matchScore > 0)
    .sort((a, b) => b.matchScore - a.matchScore);
}

export function findWorkplaceSuggestions(employee, allEmployers) {
  if (!employee || !employee.tags) {
    return [];
  }

  // In a real app, this would match based on company needs, culture, etc.
  // For now, we'll return a simple filtered list
  return allEmployers.filter(employer => {
    // Don't suggest if already working there
    if (employer.employees?.includes(employee.id)) {
      return false;
    }
    return true;
  });
}

export function searchByName(query, employees, employers = []) {
  if (!query || query.trim() === '') {
    return [...employees, ...employers];
  }

  const searchTerm = query.toLowerCase().trim();
  
  // Search employees
  const matchedEmployees = employees.filter(employee => {
    const name = employee.name?.toLowerCase() || '';
    const role = employee.role?.toLowerCase() || '';
    const bio = employee.bio?.toLowerCase() || '';
    
    return name.includes(searchTerm) || 
           role.includes(searchTerm) || 
           bio.includes(searchTerm);
  });

  // Search employers
  const matchedEmployers = employers.filter(employer => {
    const name = employer.name?.toLowerCase() || '';
    const companyName = employer.companyName?.toLowerCase() || '';
    const industry = employer.industry?.toLowerCase() || '';
    const description = employer.description?.toLowerCase() || '';
    
    return name.includes(searchTerm) || 
           companyName.includes(searchTerm) || 
           industry.includes(searchTerm) || 
           description.includes(searchTerm);
  });

  return [...matchedEmployees, ...matchedEmployers];
}

