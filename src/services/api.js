export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8787'

export async function fetchSiteContent() {
  const payload = await request('/api/public')
  return {
    ...payload,
    works: payload.works.map((work) => ({
      ...work,
      cover: resolveApiAsset(work.cover),
    })),
  }
}

export function resolveApiAsset(url) {
  if (!url || /^(?:https?:|data:|blob:)/.test(url)) return url || ''
  return new URL(url, `${API_BASE_URL}/`).href
}

export async function loginAdmin(credentials) {
  return request('/api/auth/login', {
    method: 'POST',
    body: credentials,
  })
}

export async function fetchAdminMe(token) {
  return request('/api/admin/me', { token })
}

export async function createWork(work, token) {
  return request('/api/admin/works', {
    method: 'POST',
    token,
    body: work,
  })
}

export async function updateWork(id, work, token) {
  return request(`/api/admin/works/${encodeURIComponent(id)}`, {
    method: 'PUT',
    token,
    body: work,
  })
}

export async function deleteWork(id, token) {
  return request(`/api/admin/works/${encodeURIComponent(id)}`, {
    method: 'DELETE',
    token,
  })
}

export async function createPost(post, token) {
  return request('/api/admin/posts', {
    method: 'POST',
    token,
    body: post,
  })
}

export async function updatePost(id, post, token) {
  return request(`/api/admin/posts/${encodeURIComponent(id)}`, {
    method: 'PUT',
    token,
    body: post,
  })
}

export async function deletePost(id, token) {
  return request(`/api/admin/posts/${encodeURIComponent(id)}`, {
    method: 'DELETE',
    token,
  })
}

export async function uploadImage(dataUrl, token) {
  return request('/api/admin/uploads', {
    method: 'POST',
    token,
    body: { dataUrl },
  })
}

export async function resetContent(token) {
  return request('/api/admin/reset', {
    method: 'POST',
    token,
  })
}

async function request(path, options = {}) {
  const headers = {
    ...(options.body ? { 'Content-Type': 'application/json' } : {}),
    ...(options.token ? { Authorization: `Bearer ${options.token}` } : {}),
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: options.method || 'GET',
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  })

  const payload = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(payload.error || 'Request failed')
  return payload
}
