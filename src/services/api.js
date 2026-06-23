import COS from 'cos-js-sdk-v5'

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
  || (import.meta.env.DEV ? 'http://127.0.0.1:3000' : 'https://api.matianle.com')

export async function fetchSiteContent() {
  const payload = await request('/api/public')
  return {
    ...payload,
    works: payload.works.map((work) => ({
      ...work,
      cover: resolveApiAsset(work.cover),
      videoUrl: resolveApiAsset(work.videoUrl),
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

export async function uploadMedia(file, token) {
  try {
    return await uploadToCos(file, token)
  } catch (error) {
    if (!import.meta.env.DEV) throw error
    const dataUrl = await fileToDataUrl(file)
    return uploadImage(dataUrl, token)
  }
}

async function uploadToCos(file, token) {
  const mediaType = file.type.startsWith('video/') ? 'video' : 'image'
  const extension = getFileExtension(file)
  const key = `portfolio/${mediaType}s/${new Date().toISOString().slice(0, 10)}/${Date.now()}-${Math.random()
    .toString(16)
    .slice(2)}.${extension}`
  const config = await request('/api/admin/media/credentials', {
    method: 'POST',
    token,
    body: { key, type: mediaType },
  })

  if (!config.enabled) throw new Error(config.reason || 'COS is not configured')

  const cos = new COS({
    getAuthorization: (_, callback) => {
      callback({
        TmpSecretId: config.credentials.tmpSecretId,
        TmpSecretKey: config.credentials.tmpSecretKey,
        SecurityToken: config.credentials.sessionToken,
        StartTime: config.startTime,
        ExpiredTime: config.expiredTime,
      })
    },
  })

  await new Promise((resolve, reject) => {
    cos.uploadFile(
      {
        Bucket: config.bucket,
        Region: config.region,
        Key: config.key,
        Body: file,
        SliceSize: 5 * 1024 * 1024,
      },
      (error) => {
        if (error) reject(error)
        else resolve()
      },
    )
  })

  return { url: config.publicUrl, mediaType, mime: file.type }
}

function getFileExtension(file) {
  const nameExt = file.name.split('.').pop()?.toLowerCase()
  if (nameExt) return nameExt.replace(/[^a-z0-9]/g, '') || 'bin'
  if (file.type === 'image/jpeg') return 'jpg'
  if (file.type === 'image/png') return 'png'
  if (file.type === 'image/webp') return 'webp'
  if (file.type === 'image/gif') return 'gif'
  if (file.type === 'video/mp4') return 'mp4'
  if (file.type === 'video/webm') return 'webm'
  if (file.type === 'video/quicktime') return 'mov'
  return 'bin'
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = () => reject(new Error('文件读取失败'))
    reader.readAsDataURL(file)
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
