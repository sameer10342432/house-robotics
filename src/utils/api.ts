import { 
  SERVICES_LIST, 
  BLOG_POSTS, 
  TESTIMONIALS, 
  FAQS as DEFAULT_FAQS 
} from '../data/agencyData';

const envApiUrl = (typeof import.meta !== 'undefined' && import.meta.env && !import.meta.env.PROD && import.meta.env.VITE_API_URL) 
  ? String(import.meta.env.VITE_API_URL).replace(/\/$/, '') 
  : '';
const API_BASE = envApiUrl ? `${envApiUrl}/api` : '/api';

// Generic fetch wrapper
async function apiRequest<T>(
  endpoint: string, 
  options: RequestInit = {}
): Promise<{ success: boolean; data?: T; message?: string; code?: string; pagination?: any; errors?: any }> {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {})
      },
      credentials: 'include', // for HTTP-only cookies
      ...options
    });

    const data = await res.json();
    return data;
  } catch (err: any) {
    console.warn(`[API] Network error calling ${endpoint}:`, err);
    return {
      success: false,
      message: err.message || 'Network request failed'
    };
  }
}

// ----------------------------------------------------
// Public APIs with Graceful Fallback
// ----------------------------------------------------

export async function submitContact(payload: {
  name: string;
  email: string;
  phone: string;
  company?: string;
  service?: string;
  budget?: string;
  message: string;
  source?: string;
}) {
  return apiRequest<{ id: string; inquiryId: string }>('/contact', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
}

export async function submitNewsletter(email: string, name?: string) {
  return apiRequest('/newsletter/subscribe', {
    method: 'POST',
    body: JSON.stringify({ email, name, source: 'WEBSITE' })
  });
}

export async function fetchServices() {
  const res = await apiRequest<any[]>('/services');
  if (res.success && Array.isArray(res.data) && res.data.length > 0) {
    return res.data;
  }
  return SERVICES_LIST;
}

export async function fetchBlogPosts(params: {
  category?: string;
  tag?: string;
  search?: string;
  featured?: boolean;
  page?: number;
  limit?: number;
} = {}) {
  const query = new URLSearchParams();
  if (params.category) query.append('category', params.category);
  if (params.tag) query.append('tag', params.tag);
  if (params.search) query.append('search', params.search);
  if (params.featured) query.append('featured', 'true');
  if (params.page) query.append('page', String(params.page));
  if (params.limit) query.append('limit', String(params.limit));

  const queryString = query.toString();
  const res = await apiRequest<any>(`/blog${queryString ? `?${queryString}` : ''}`);
  if (res.success && res.data) {
    return Array.isArray(res.data) ? res.data : (res.data.items || res.data);
  }
  return BLOG_POSTS;
}

export async function fetchBlogPostBySlug(slug: string, preview: boolean = false) {
  return apiRequest<any>(`/blog/${slug}${preview ? '?preview=true' : ''}`);
}

export async function fetchBlogCategories() {
  return apiRequest<any[]>('/blog/categories');
}

export async function fetchTestimonials() {
  const res = await apiRequest<any[]>('/testimonials');
  if (res.success && Array.isArray(res.data) && res.data.length > 0) {
    return res.data;
  }
  return TESTIMONIALS;
}

export async function fetchFaqs() {
  const res = await apiRequest<any[]>('/faqs');
  if (res.success && Array.isArray(res.data) && res.data.length > 0) {
    return res.data;
  }
  return DEFAULT_FAQS;
}

export function trackEvent(eventType: string, eventName: string, metadata?: any) {
  try {
    fetch(`${API_BASE}/analytics/event`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventType,
        eventName,
        metadata: metadata ? JSON.stringify(metadata) : undefined
      })
    }).catch(() => {});
  } catch {
    // Ignore analytics errors
  }
}

// ----------------------------------------------------
// Admin APIs
// ----------------------------------------------------

// Admin Auth
export async function adminLogin(email: string, password: string) {
  return apiRequest<{ token: string; user: any }>('/admin/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });
}

export async function adminLogout() {
  return apiRequest('/admin/auth/logout', { method: 'POST' });
}

export async function adminGetMe() {
  return apiRequest<{ id: string; name: string; email: string; role: string }>('/admin/auth/me');
}

// Dashboard
export async function adminGetDashboard() {
  return apiRequest<any>('/admin/dashboard');
}

// Leads CRM
export async function adminGetLeads(params: {
  status?: string;
  search?: string;
  service?: string;
  source?: string;
  page?: number;
  limit?: number;
} = {}) {
  const query = new URLSearchParams();
  if (params.status) query.append('status', params.status);
  if (params.search) query.append('search', params.search);
  if (params.service) query.append('service', params.service);
  if (params.source) query.append('source', params.source);
  if (params.page) query.append('page', String(params.page));
  if (params.limit) query.append('limit', String(params.limit));

  return apiRequest<any>(`/admin/leads?${query.toString()}`);
}

export async function adminUpdateLeadStatus(id: string, status: string) {
  return apiRequest(`/admin/leads/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status })
  });
}

export async function adminAddLeadNote(id: string, note: string) {
  return apiRequest(`/admin/leads/${id}/notes`, {
    method: 'POST',
    body: JSON.stringify({ note })
  });
}

// Messages / Inquiries
export async function adminGetMessages(params: {
  isRead?: boolean;
  search?: string;
  page?: number;
  limit?: number;
} = {}) {
  const query = new URLSearchParams();
  if (params.isRead !== undefined) query.append('isRead', String(params.isRead));
  if (params.search) query.append('search', params.search);
  if (params.page) query.append('page', String(params.page));
  if (params.limit) query.append('limit', String(params.limit));

  return apiRequest<any>(`/admin/messages?${query.toString()}`);
}

export async function adminMarkMessageRead(id: string, isRead = true) {
  return apiRequest(`/admin/messages/${id}/read`, {
    method: 'PATCH',
    body: JSON.stringify({ isRead })
  });
}

export async function adminDeleteMessage(id: string) {
  return apiRequest(`/admin/messages/${id}`, { method: 'DELETE' });
}

// Services CRUD
export async function adminGetServices() {
  return apiRequest<any[]>('/admin/services');
}

export async function adminCreateService(data: any) {
  return apiRequest('/admin/services', {
    method: 'POST',
    body: JSON.stringify(data)
  });
}

export async function adminUpdateService(id: string, data: any) {
  return apiRequest(`/admin/services/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  });
}

export async function adminDeleteService(id: string) {
  return apiRequest(`/admin/services/${id}`, { method: 'DELETE' });
}

// Blog CRUD & Advanced Publishing CMS
export async function adminGetBlogPosts(params: {
  search?: string;
  status?: string;
  categoryId?: string;
  author?: string;
  featured?: boolean;
  page?: number;
  limit?: number;
} = {}) {
  const query = new URLSearchParams();
  if (params.search) query.append('search', params.search);
  if (params.status) query.append('status', params.status);
  if (params.categoryId) query.append('categoryId', params.categoryId);
  if (params.author) query.append('author', params.author);
  if (params.featured) query.append('featured', 'true');
  if (params.page) query.append('page', String(params.page));
  if (params.limit) query.append('limit', String(params.limit));

  return apiRequest<any>(`/admin/blog?${query.toString()}`);
}

export async function adminGetBlogPost(id: string) {
  return apiRequest<any>(`/admin/blog/${id}`);
}

export async function adminCreateBlogPost(data: any) {
  return apiRequest('/admin/blog', {
    method: 'POST',
    body: JSON.stringify(data)
  });
}

export async function adminUpdateBlogPost(id: string, data: any) {
  return apiRequest(`/admin/blog/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  });
}

export async function adminDuplicateBlogPost(id: string) {
  return apiRequest(`/admin/blog/${id}/duplicate`, {
    method: 'POST'
  });
}

export async function adminDeleteBlogPost(id: string) {
  return apiRequest(`/admin/blog/${id}`, { method: 'DELETE' });
}

export async function adminGetBlogRevisions(id: string) {
  return apiRequest<any[]>(`/admin/blog/${id}/revisions`);
}

export async function adminRestoreBlogRevision(id: string, revisionId: string) {
  return apiRequest(`/admin/blog/${id}/revisions/${revisionId}/restore`, {
    method: 'POST'
  });
}

export async function adminGetBlogCategories() {
  return apiRequest<any[]>('/admin/blog/categories/all');
}

export async function adminCreateBlogCategory(data: { name: string; slug: string; description?: string }) {
  return apiRequest('/admin/blog/categories', {
    method: 'POST',
    body: JSON.stringify(data)
  });
}

export async function adminDeleteBlogCategory(id: string) {
  return apiRequest(`/admin/blog/categories/${id}`, { method: 'DELETE' });
}

export async function adminGetBlogTags() {
  return apiRequest<any[]>('/admin/blog/tags/all');
}

export async function adminCreateBlogTag(data: { name: string; slug?: string }) {
  return apiRequest('/admin/blog/tags', {
    method: 'POST',
    body: JSON.stringify(data)
  });
}

export async function adminDeleteBlogTag(id: string) {
  return apiRequest(`/admin/blog/tags/${id}`, { method: 'DELETE' });
}

export async function adminGetAuthors() {
  return apiRequest<any[]>('/admin/blog/authors/all');
}

export async function adminCreateAuthor(data: any) {
  return apiRequest('/admin/blog/authors', {
    method: 'POST',
    body: JSON.stringify(data)
  });
}

export async function adminUpdateAuthor(id: string, data: any) {
  return apiRequest(`/admin/blog/authors/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  });
}

export async function adminDeleteAuthor(id: string) {
  return apiRequest(`/admin/blog/authors/${id}`, { method: 'DELETE' });
}

export async function adminGetInternalLinks() {
  return apiRequest<any[]>('/admin/blog/internal-links/destinations');
}

// Testimonials CRUD
export async function adminGetTestimonials() {
  return apiRequest<any[]>('/admin/testimonials');
}

export async function adminCreateTestimonial(data: any) {
  return apiRequest('/admin/testimonials', {
    method: 'POST',
    body: JSON.stringify(data)
  });
}

export async function adminUpdateTestimonial(id: string, data: any) {
  return apiRequest(`/admin/testimonials/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  });
}

export async function adminDeleteTestimonial(id: string) {
  return apiRequest(`/admin/testimonials/${id}`, { method: 'DELETE' });
}

// FAQs CRUD
export async function adminGetFaqs() {
  return apiRequest<any[]>('/admin/faqs');
}

export async function adminCreateFaq(data: any) {
  return apiRequest('/admin/faqs', {
    method: 'POST',
    body: JSON.stringify(data)
  });
}

export async function adminUpdateFaq(id: string, data: any) {
  return apiRequest(`/admin/faqs/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  });
}

export async function adminDeleteFaq(id: string) {
  return apiRequest(`/admin/faqs/${id}`, { method: 'DELETE' });
}

// Newsletter Subscribers
export async function adminGetSubscribers(params: {
  status?: string;
  search?: string;
  page?: number;
  limit?: number;
} = {}) {
  const query = new URLSearchParams();
  if (params.status) query.append('status', params.status);
  if (params.search) query.append('search', params.search);
  if (params.page) query.append('page', String(params.page));
  if (params.limit) query.append('limit', String(params.limit));

  return apiRequest<any>(`/admin/newsletter?${query.toString()}`);
}

export async function adminUpdateSubscriberStatus(id: string, status: string) {
  return apiRequest(`/admin/newsletter/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status })
  });
}

export async function adminDeleteSubscriber(id: string) {
  return apiRequest(`/admin/newsletter/${id}`, { method: 'DELETE' });
}

// Media
export async function adminGetMedia(params: { search?: string; page?: number; limit?: number } = {}) {
  const query = new URLSearchParams();
  if (params.search) query.append('search', params.search);
  if (params.page) query.append('page', String(params.page));
  if (params.limit) query.append('limit', String(params.limit));

  return apiRequest<any>(`/admin/media?${query.toString()}`);
}

export async function adminUploadFile(
  file: File, 
  metadata?: { altText?: string; title?: string; caption?: string; description?: string } | string
) {
  const formData = new FormData();
  formData.append('files', file);

  if (typeof metadata === 'string') {
    formData.append('altText', metadata);
  } else if (metadata) {
    if (metadata.altText) formData.append('altText', metadata.altText);
    if (metadata.title) formData.append('title', metadata.title);
    if (metadata.caption) formData.append('caption', metadata.caption);
    if (metadata.description) formData.append('description', metadata.description);
  }

  try {
    const res = await fetch(`${API_BASE}/admin/media/upload`, {
      method: 'POST',
      body: formData,
      credentials: 'include'
    });
    return await res.json();
  } catch (err: any) {
    return { success: false, message: err.message };
  }
}

export async function adminUpdateMedia(id: string, data: { altText?: string; title?: string; caption?: string; description?: string }) {
  return apiRequest(`/admin/media/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  });
}

export async function adminDeleteMedia(id: string) {
  return apiRequest(`/admin/media/${id}`, { method: 'DELETE' });
}

// SEO
export async function adminGetSeo() {
  return apiRequest<any[]>('/admin/seo');
}

export async function adminUpdateSeo(data: any) {
  return apiRequest('/admin/seo', {
    method: 'POST',
    body: JSON.stringify(data)
  });
}

// Site Settings
export async function adminGetSettings() {
  return apiRequest<{ list: any[]; settings: Record<string, string> }>('/admin/settings');
}

export async function adminUpdateSettings(settings: Record<string, string>) {
  return apiRequest('/admin/settings', {
    method: 'PUT',
    body: JSON.stringify({ settings })
  });
}

// Activity Logs
export async function adminGetActivityLogs(params: { action?: string; entity?: string; page?: number; limit?: number } = {}) {
  const query = new URLSearchParams();
  if (params.action) query.append('action', params.action);
  if (params.entity) query.append('entity', params.entity);
  if (params.page) query.append('page', String(params.page));
  if (params.limit) query.append('limit', String(params.limit));

  return apiRequest<any>(`/admin/activity-logs?${query.toString()}`);
}

// Admin Users
export async function adminGetUsers() {
  return apiRequest<any[]>('/admin/users');
}

export async function adminCreateUser(data: any) {
  return apiRequest('/admin/users', {
    method: 'POST',
    body: JSON.stringify(data)
  });
}

export async function adminUpdateUser(id: string, data: any) {
  return apiRequest(`/admin/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  });
}

export async function adminDeleteUser(id: string) {
  return apiRequest(`/admin/users/${id}`, { method: 'DELETE' });
}
