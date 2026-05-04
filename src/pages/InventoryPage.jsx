import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { DOC_CATEGORIES } from '../data/mockInventory';
import { api } from '../services/api';
import './InventoryPage.css';

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric'
  });
}

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function getFileType(filename) {
  return filename.split('.').pop()?.toLowerCase() || 'file';
}


function getCategoryMeta(id) {
  return DOC_CATEGORIES.find(c => c.id === id) || DOC_CATEGORIES[DOC_CATEGORIES.length - 1];
}

// ── File Type Icon ─────────────────────────────────────────────────────────
function FileIcon({ type, size = 36 }) {
  const icons = {
    pdf: { color: '#ef4444', label: 'PDF' },
    docx: { color: '#2563eb', label: 'DOC' },
    doc:  { color: '#2563eb', label: 'DOC' },
    xlsx: { color: '#16a34a', label: 'XLS' },
    xls:  { color: '#16a34a', label: 'XLS' },
    pptx: { color: '#ea580c', label: 'PPT' },
    png:  { color: '#8b5cf6', label: 'IMG' },
    jpg:  { color: '#8b5cf6', label: 'IMG' },
    jpeg: { color: '#8b5cf6', label: 'IMG' },
    zip:  { color: '#6b7280', label: 'ZIP' },
  };
  const meta = icons[type] || { color: '#6b7280', label: type.toUpperCase().slice(0, 3) };

  return (
    <div className="file-icon" style={{ width: size, height: size, background: `${meta.color}18`, border: `2px solid ${meta.color}40` }}>
      <span style={{ color: meta.color, fontSize: size * 0.28, fontWeight: 700 }}>{meta.label}</span>
    </div>
  );
}

// ── Toggle Switch ─────────────────────────────────────────────────────────
function Toggle({ checked, onChange, disabled }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={onChange}
      className={`inv-toggle ${checked ? 'inv-toggle--on' : ''}`}
    >
      <span className="inv-toggle-thumb" />
    </button>
  );
}

// ── Upload Modal ───────────────────────────────────────────────────────────
function UploadModal({ onClose, onUpload }) {
  const fileInputRef = useRef();
  const [selectedFile, setSelectedFile] = useState(null);
  const [form, setForm] = useState({ name: '', category: 'resume', description: '', isPublic: false });
  const [error, setError] = useState('');
  const MAX_SIZE = 5 * 1024 * 1024; // 5 MB

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > MAX_SIZE) {
      setError('File size must be under 5 MB.');
      return;
    }
    setError('');
    setSelectedFile(file);
    if (!form.name) setForm(f => ({ ...f, name: file.name }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedFile) { setError('Please select a file.'); return; }
    if (!form.name.trim()) { setError('Please enter a document name.'); return; }

    const blobUrl = URL.createObjectURL(selectedFile);

    onUpload({
      name: form.name.trim(),
      category: form.category,
      description: form.description.trim(),
      isPublic: form.isPublic,
      uploadDate: new Date().toISOString(),
      size: formatSize(selectedFile.size),
      fileType: getFileType(selectedFile.name),
      previewUrl: blobUrl,
    });
  };

  return (
    <div className="inv-modal-overlay" onClick={onClose}>
      <div className="inv-modal glass-card" onClick={e => e.stopPropagation()}>
        <div className="inv-modal-header">
          <h2>Upload Document</h2>
          <button className="inv-modal-close" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="inv-upload-form">
          {/* File Dropzone */}
          <div
            className={`inv-dropzone ${selectedFile ? 'inv-dropzone--filled' : ''}`}
            onClick={() => fileInputRef.current?.click()}
          >
            <input ref={fileInputRef} type="file" accept=".pdf,.doc,.docx,.xlsx,.xls,.pptx,.png,.jpg,.jpeg,.zip" onChange={handleFileChange} hidden />
            {selectedFile ? (
              <div className="inv-dropzone-selected">
                <FileIcon type={getFileType(selectedFile.name)} size={48} />
                <p className="inv-dropzone-filename">{selectedFile.name}</p>
                <p className="inv-dropzone-size">{formatSize(selectedFile.size)}</p>
              </div>
            ) : (
              <div className="inv-dropzone-placeholder">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="17 8 12 3 7 8"/>
                  <line x1="12" y1="3" x2="12" y2="15"/>
                </svg>
                <p>Click to browse files</p>
                <p className="inv-dropzone-hint">PDF, DOCX, XLSX, PPTX, PNG, JPG, ZIP — max 5 MB</p>
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="doc-name">Document Name *</label>
            <input
              id="doc-name"
              type="text"
              className="input"
              placeholder="e.g., My Resume 2024"
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="doc-cat">Category *</label>
            <select
              id="doc-cat"
              className="input inv-select"
              value={form.category}
              onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
            >
              {DOC_CATEGORIES.filter(c => c.id !== 'all').map(c => (
                <option key={c.id} value={c.id}>{c.label}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="doc-desc">Description</label>
            <textarea
              id="doc-desc"
              className="input textarea"
              rows={3}
              placeholder="Brief description of this document..."
              value={form.description}
              onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
            />
          </div>

          <div className="inv-public-row">
            <div>
              <p className="inv-public-label">Make Public</p>
              <p className="inv-public-hint">Public documents are visible to employers on your profile</p>
            </div>
            <Toggle checked={form.isPublic} onChange={() => setForm(f => ({ ...f, isPublic: !f.isPublic }))} />
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="inv-modal-actions">
            <button type="button" className="btn btn-outline" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">Upload Document</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Document Card ──────────────────────────────────────────────────────────
function DocCard({ doc, onTogglePublic, onDelete }) {
  const catMeta = getCategoryMeta(doc.category);

  const handleView = () => {
    if (doc.previewUrl) {
      window.open(doc.previewUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="doc-card glass-card">
      <div className="doc-card-top">
        <FileIcon type={doc.fileType} size={48} />
        <div className="doc-card-actions">
          <button className="doc-action-btn doc-view-btn" onClick={handleView} title="Open document">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15 3 21 3 21 9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
            View
          </button>
          <button className="doc-action-btn doc-delete-btn" onClick={() => onDelete(doc.id)} title="Delete document">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6l-1 14H6L5 6"/>
              <path d="M10 11v6M14 11v6"/>
            </svg>
          </button>
        </div>
      </div>

      <div className="doc-card-body">
        <h4 className="doc-name" title={doc.name}>{doc.name}</h4>
        {doc.description && <p className="doc-desc">{doc.description}</p>}
      </div>

      <div className="doc-card-footer">
        <span className="doc-cat-badge" style={{ background: catMeta.bg, color: catMeta.color }}>
          {catMeta.label}
        </span>
        <span className="doc-meta">{doc.size} · {formatDate(doc.uploadDate)}</span>
      </div>

      <div className="doc-public-row">
        <div className="doc-public-info">
          {doc.isPublic ? (
            <>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
              <span style={{ color: '#16a34a', fontSize: '0.8rem', fontWeight: 600 }}>Public</span>
            </>
          ) : (
            <>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              <span style={{ color: '#6b7280', fontSize: '0.8rem' }}>Private</span>
            </>
          )}
        </div>
        <Toggle checked={doc.isPublic} onChange={() => onTogglePublic(doc.id)} />
      </div>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────
export default function InventoryPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [docs, setDocs] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  // Load documents from API
  useEffect(() => {
    if (!user?.id) return;
    api.getInventory(user.id)
      .then(setDocs)
      .catch(() => setDocs([]));
  }, [user?.id]);

  const handleUpload = async (doc) => {
    try {
      const created = await api.addDocument({ ...doc, employeeId: user.id });
      setDocs(prev => [created, ...prev]);
      setShowUploadModal(false);
    } catch (e) {
      console.error('Upload failed:', e);
    }
  };

  const handleTogglePublic = async (id) => {
    try {
      const updated = await api.togglePublic(id);
      setDocs(prev => prev.map(d => d.id === id ? updated : d));
    } catch (e) {
      console.error('Toggle failed:', e);
    }
  };

  const handleDelete = async (id) => {
    if (confirmDeleteId === id) {
      try {
        await api.deleteDocument(id);
        setDocs(prev => prev.filter(d => d.id !== id));
        setConfirmDeleteId(null);
      } catch (e) {
        console.error('Delete failed:', e);
      }
    } else {
      setConfirmDeleteId(id);
      setTimeout(() => setConfirmDeleteId(null), 3000);
    }
  };

  // Filter + search
  const filtered = docs.filter(d => {
    const inCategory = activeCategory === 'all' || d.category === activeCategory;
    const inSearch = !searchQuery || d.name.toLowerCase().includes(searchQuery.toLowerCase()) || d.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return inCategory && inSearch;
  });

  // Category counts
  const countByCategory = (catId) => catId === 'all' ? docs.length : docs.filter(d => d.category === catId).length;
  const publicCount = docs.filter(d => d.isPublic).length;

  return (
    <div className="inventory-page">
      {/* Header */}
      <header className="inv-header">
        <div className="inv-header-inner">
          <button className="back-btn" onClick={() => navigate('/employee/home')}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back to Home
          </button>

          <div className="inv-header-title">
            <h1>My Documents</h1>
            <p>{docs.length} total · {publicCount} public</p>
          </div>

          <button className="btn btn-primary inv-upload-btn" onClick={() => setShowUploadModal(true)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Upload Document
          </button>
        </div>
      </header>

      <div className="inv-layout">
        {/* Sidebar */}
        <aside className="inv-sidebar">
          <div className="inv-sidebar-inner glass-card">
            <p className="inv-sidebar-title">Categories</p>
            <nav className="inv-cat-nav">
              {DOC_CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  className={`inv-cat-btn ${activeCategory === cat.id ? 'inv-cat-btn--active' : ''}`}
                  onClick={() => setActiveCategory(cat.id)}
                  style={activeCategory === cat.id ? { background: cat.bg, color: cat.color, borderColor: cat.color + '60' } : {}}
                >
                  <span className="inv-cat-label">{cat.label}</span>
                  <span className="inv-cat-count" style={activeCategory === cat.id ? { background: cat.color, color: '#fff' } : {}}>
                    {countByCategory(cat.id)}
                  </span>
                </button>
              ))}
            </nav>

            {/* Stats panel */}
            <div className="inv-stats">
              <div className="inv-stat">
                <span className="inv-stat-value" style={{ color: '#16a34a' }}>{publicCount}</span>
                <span className="inv-stat-label">Public</span>
              </div>
              <div className="inv-stat-divider" />
              <div className="inv-stat">
                <span className="inv-stat-value" style={{ color: '#6b7280' }}>{docs.length - publicCount}</span>
                <span className="inv-stat-label">Private</span>
              </div>
            </div>

            <div className="inv-privacy-note">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              <p>Only <strong>Public</strong> documents are visible to employers on your profile.</p>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="inv-main">
          {/* Search */}
          <div className="inv-search-bar glass-card">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              type="text"
              className="inv-search-input"
              placeholder="Search documents by name or description..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button className="inv-search-clear" onClick={() => setSearchQuery('')}>✕</button>
            )}
          </div>

          {/* Document Grid */}
          {filtered.length > 0 ? (
            <div className="doc-grid">
              {filtered.map(doc => (
                <DocCard
                  key={doc.id}
                  doc={doc}
                  onTogglePublic={handleTogglePublic}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          ) : (
            <div className="inv-empty glass-card">
              <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
              </svg>
              <h3>{searchQuery ? 'No documents match your search' : 'No documents in this category'}</h3>
              <p>{searchQuery ? 'Try different keywords' : 'Upload your first document to get started'}</p>
              {!searchQuery && (
                <button className="btn btn-primary" onClick={() => setShowUploadModal(true)} style={{ marginTop: '1rem' }}>
                  Upload Document
                </button>
              )}
            </div>
          )}
        </main>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <UploadModal onClose={() => setShowUploadModal(false)} onUpload={handleUpload} />
      )}
    </div>
  );
}
