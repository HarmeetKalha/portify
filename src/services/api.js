// Central API client — all requests go through /api (proxied to backend by Vite)
const BASE = '/api';

async function request(method, path, body) {
  const opts = {
    method,
    headers: { 'Content-Type': 'application/json' },
  };
  if (body !== undefined) opts.body = JSON.stringify(body);

  const res = await fetch(`${BASE}${path}`, opts);
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
  return data;
}

export const api = {
  // Auth
  login:   (email, password, type)   => request('POST', '/auth/login',   { email, password, type }),
  signup:  (formData, type)          => request('POST', '/auth/signup',  { formData, type }),
  profile: (type, id)                => request('GET',  `/auth/profile/${type}/${id}`),

  // Employees
  getEmployees:  ()   => request('GET',  '/employees'),
  getEmployee:   (id) => request('GET',  `/employees/${id}`),
  updateEmployee:(id, data) => request('PUT', `/employees/${id}`, data),

  // Employers
  getEmployers:  ()   => request('GET',  '/employers'),
  getEmployer:   (id) => request('GET',  `/employers/${id}`),
  updateEmployer:(id, data) => request('PUT', `/employers/${id}`, data),

  // Inventory
  getInventory:     (employeeId)  => request('GET',    `/inventory/${employeeId}`),
  addDocument:      (doc)         => request('POST',   '/inventory', doc),
  togglePublic:     (docId)       => request('PUT',    `/inventory/${docId}/toggle-public`),
  deleteDocument:   (docId)       => request('DELETE', `/inventory/${docId}`),

  // Applications
  getApplications:  (employerId)              => request('GET',  `/applications/employer/${employerId}`),
  checkApplied:     (employerId, applicantId) => request('GET',  `/applications/check/${employerId}/${applicantId}`),
  submitApplication:(data)                    => request('POST', '/applications', data),
};
