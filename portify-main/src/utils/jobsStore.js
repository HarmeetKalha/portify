const STORAGE_KEY = 'portify_jobs_v1';

function safeParse(json, fallback) {
  try {
    const parsed = JSON.parse(json);
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}

export function getAllJobs() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return safeParse(raw, []);
}

export function getJobsByEmployer(employerId) {
  const jobs = getAllJobs();
  return jobs.filter(j => j.employerId === employerId);
}

export function addJob(jobData) {
  const jobs = getAllJobs();
  const newJob = {
    ...jobData,
    id: Date.now(),
    createdAt: Date.now()
  };
  jobs.unshift(newJob);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
  return newJob;
}

export function deleteJob(jobId) {
  const jobs = getAllJobs();
  const filtered = jobs.filter(j => j.id !== jobId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}
