const STORAGE_KEY = 'portify_applications_v1';

function safeParse(json, fallback) {
  try {
    const parsed = JSON.parse(json);
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}

export function getAllApplications() {
  const raw = localStorage.getItem(STORAGE_KEY);
  const parsed = safeParse(raw, []);
  return Array.isArray(parsed) ? parsed : [];
}

export function getApplicationsForEmployer(employerId) {
  const id = Number(employerId);
  return getAllApplications()
    .filter(a => Number(a.employerId) === id)
    .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
}

export function hasEmployeeApplied(employerId, employeeId) {
  const eId = Number(employerId);
  const empId = Number(employeeId);
  return getAllApplications().some(a => Number(a.employerId) === eId && Number(a.employeeId) === empId);
}

export function addApplication(application) {
  const existing = getAllApplications();
  const next = [application, ...existing];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}

