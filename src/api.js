// ============================================
// 前端展示站的 API 调用封装
// 用浏览器原生 fetch,不引入 axios(更轻)
// ============================================

const API_BASE = import.meta.env.VITE_API_BASE
const ASSET_BASE = API_BASE.replace('/api', '')

async function get(path) {
  const res = await fetch(`${API_BASE}${path}`)
  if (!res.ok) {
    throw new Error(`API 错误: ${res.status}`)
  }
  return res.json()
}

export const fetchWorks  = () => get('/works')
export const fetchTools  = () => get('/tools')
export const fetchConfig = () => get('/config')

// 把数据库里的相对路径(如 /uploads/xxx.png)转成完整 URL
export function resolveAsset(url) {
  if (!url) return ''
  if (url.startsWith('http')) return url
  return ASSET_BASE + url
}