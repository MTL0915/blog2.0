<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  categories as initialCategories,
  experience as initialExperience,
  metrics as initialMetrics,
  navItems as initialNavItems,
  posts as initialPosts,
  profile as initialProfile,
  skills as initialSkills,
  works as initialWorks,
} from './data/portfolio'
import {
  API_BASE_URL,
  createPost,
  createWork,
  deletePost,
  deleteWork,
  fetchAdminMe,
  fetchSiteContent,
  loginAdmin,
  resetContent,
  updatePost,
  updateWork,
  uploadImage,
} from './services/api'

gsap.registerPlugin(ScrollTrigger)

const currentHash = ref(window.location.hash)
const adminOnly = import.meta.env.VITE_ADMIN_ONLY === 'true'
const adminEnabled = adminOnly || import.meta.env.VITE_ADMIN_ENABLED === 'true'
const activeCategory = ref('all')
const selectedWork = ref(null)
const adminToken = ref(window.localStorage.getItem('ai-worklog-auth-token') || '')
const adminUser = ref(null)
const loginForm = ref({ username: 'admin', password: '' })
const adminSection = ref('works')
const activeAdminWorkId = ref('')
const activeAdminPostId = ref('')
const saveMessage = ref('')
const apiError = ref('')

const profile = ref(clone(initialProfile))
const navItems = ref(clone(initialNavItems))
const metrics = ref(clone(initialMetrics))
const categories = ref(clone(initialCategories))
const experience = ref(clone(initialExperience))
const skills = ref(clone(initialSkills))
const posts = ref(clone(initialPosts))
const works = ref(clone(initialWorks))
const editDraft = ref(createWorkDraft(works.value[0]))
const postDraft = ref(createPostDraft(posts.value[0]))
let ctx

const isAdmin = computed(() => adminOnly || (adminEnabled && currentHash.value === '#admin'))
const featuredWork = computed(() => works.value[0])
const filteredWorks = computed(() => {
  if (activeCategory.value === 'all') return works.value
  return works.value.filter((work) => work.type === activeCategory.value)
})

function clone(value) {
  return JSON.parse(JSON.stringify(value))
}

function createWorkDraft(work) {
  return work
    ? {
        id: work.id,
        title: work.title,
        type: work.type,
        date: work.date,
        summary: work.summary,
        detail: work.detail,
        cover: work.cover,
        tagsText: work.tags.join('，'),
      }
    : {
        id: '',
        title: '',
        type: 'visual',
        date: new Date().toISOString().slice(0, 7).replace('-', '.'),
        summary: '',
        detail: '',
        cover: '',
        tagsText: '',
      }
}

function createPostDraft(post) {
  return post
    ? {
        id: post.id,
        title: post.title,
        category: post.category,
        date: post.date,
        readTime: post.readTime,
        summary: post.summary,
      }
    : {
        id: '',
        title: '',
        category: 'review',
        date: new Date().toISOString().slice(0, 10).replaceAll('-', '.'),
        readTime: '3 min',
        summary: '',
      }
}

function applyContent(payload) {
  profile.value = payload.profile
  metrics.value = payload.metrics
  categories.value = payload.categories
  experience.value = payload.experience
  skills.value = payload.skills
  posts.value = payload.posts
  works.value = payload.works

  if (!activeAdminWorkId.value) activeAdminWorkId.value = works.value[0]?.id || ''
  if (!activeAdminPostId.value) activeAdminPostId.value = posts.value[0]?.id || ''

  editDraft.value = createWorkDraft(works.value.find((work) => work.id === activeAdminWorkId.value) || works.value[0])
  postDraft.value = createPostDraft(posts.value.find((post) => post.id === activeAdminPostId.value) || posts.value[0])
}

function loadContent() {
  fetchSiteContent()
    .then((payload) => {
      applyContent(payload)
      apiError.value = ''
    })
    .catch((error) => {
      apiError.value = `API 暂不可用，当前显示前端备用数据：${error.message}`
    })
}

function login() {
  apiError.value = ''
  loginAdmin(loginForm.value)
    .then(({ token, user }) => {
      adminToken.value = token
      adminUser.value = user
      window.localStorage.setItem('ai-worklog-auth-token', token)
      loadContent()
    })
    .catch((error) => {
      apiError.value = error.message
    })
}

function logout() {
  adminToken.value = ''
  adminUser.value = null
  window.localStorage.removeItem('ai-worklog-auth-token')
}

function selectAdminWork(work) {
  activeAdminWorkId.value = work.id
  editDraft.value = createWorkDraft(work)
  saveMessage.value = ''
  apiError.value = ''
}

function workPayload() {
  return {
    title: editDraft.value.title.trim() || '未命名作品',
    type: editDraft.value.type,
    date: editDraft.value.date.trim(),
    summary: editDraft.value.summary.trim(),
    detail: editDraft.value.detail.trim(),
    cover: editDraft.value.cover.trim(),
    tags: editDraft.value.tagsText
      .split(/[，,]/)
      .map((tag) => tag.trim())
      .filter(Boolean),
  }
}

function newWork() {
  activeAdminWorkId.value = ''
  editDraft.value = createWorkDraft(null)
  editDraft.value.title = '新作品'
  saveMessage.value = '正在创建新作品'
}

function saveAdminWork() {
  const request = editDraft.value.id
    ? updateWork(editDraft.value.id, workPayload(), adminToken.value)
    : createWork(workPayload(), adminToken.value)

  request
    .then(({ work }) => {
      works.value = editDraft.value.id ? works.value.map((item) => (item.id === work.id ? work : item)) : [work, ...works.value]
      selectAdminWork(work)
      saveMessage.value = '作品已保存到数据库'
    })
    .catch((error) => {
      apiError.value = error.message
    })
}

function removeWork() {
  if (!activeAdminWorkId.value || !window.confirm('确定删除这个作品吗？')) return
  deleteWork(activeAdminWorkId.value, adminToken.value)
    .then(() => {
      works.value = works.value.filter((work) => work.id !== activeAdminWorkId.value)
      selectAdminWork(works.value[0] || null)
      saveMessage.value = '作品已删除'
    })
    .catch((error) => {
      apiError.value = error.message
    })
}

function handleCoverUpload(event) {
  const file = event.target.files?.[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = () => {
    uploadImage(String(reader.result), adminToken.value)
      .then(({ url }) => {
        editDraft.value.cover = url.startsWith('http') ? url : `${API_BASE_URL}${url}`
        saveMessage.value = '图片已上传，记得保存修改'
      })
      .catch((error) => {
        apiError.value = error.message
      })
  }
  reader.readAsDataURL(file)
}

function selectAdminPost(post) {
  activeAdminPostId.value = post.id
  postDraft.value = createPostDraft(post)
  saveMessage.value = ''
  apiError.value = ''
}

function newPost() {
  activeAdminPostId.value = ''
  postDraft.value = createPostDraft(null)
  postDraft.value.title = '新文章'
  saveMessage.value = '正在创建新文章'
}

function postPayload() {
  return {
    title: postDraft.value.title.trim() || '未命名文章',
    category: postDraft.value.category,
    date: postDraft.value.date,
    readTime: postDraft.value.readTime,
    summary: postDraft.value.summary,
  }
}

function saveAdminPost() {
  const request = postDraft.value.id
    ? updatePost(postDraft.value.id, postPayload(), adminToken.value)
    : createPost(postPayload(), adminToken.value)

  request
    .then(({ post }) => {
      posts.value = postDraft.value.id ? posts.value.map((item) => (item.id === post.id ? post : item)) : [post, ...posts.value]
      selectAdminPost(post)
      saveMessage.value = '文章已保存到数据库'
    })
    .catch((error) => {
      apiError.value = error.message
    })
}

function removePost() {
  if (!activeAdminPostId.value || !window.confirm('确定删除这篇文章吗？')) return
  deletePost(activeAdminPostId.value, adminToken.value)
    .then(() => {
      posts.value = posts.value.filter((post) => post.id !== activeAdminPostId.value)
      selectAdminPost(posts.value[0] || null)
      saveMessage.value = '文章已删除'
    })
    .catch((error) => {
      apiError.value = error.message
    })
}

function resetAdminWorks() {
  if (!window.confirm('确定恢复示例数据吗？这会覆盖现有作品和文章。')) return
  resetContent(adminToken.value)
    .then((payload) => {
      activeAdminWorkId.value = ''
      activeAdminPostId.value = ''
      applyContent(payload)
      saveMessage.value = '已恢复数据库示例数据'
    })
    .catch((error) => {
      apiError.value = error.message
    })
}

function openWork(work) {
  selectedWork.value = work
  document.body.classList.add('modal-open')
  nextTick(() => {
    gsap.fromTo('.work-dialog', { y: 54, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.72, ease: 'power4.out' })
    gsap.fromTo('.dialog-reveal', { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.72, stagger: 0.07, delay: 0.12, ease: 'power3.out' })
  })
}

function closeWork() {
  gsap.to('.work-dialog', {
    y: 32,
    opacity: 0,
    scale: 0.98,
    duration: 0.28,
    ease: 'power2.in',
    onComplete: () => {
      selectedWork.value = null
      document.body.classList.remove('modal-open')
    },
  })
}

function syncHash() {
  currentHash.value = window.location.hash
  if (isAdmin.value) {
    selectedWork.value = null
    document.body.classList.remove('modal-open')
  }
}

function setupMotion() {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduceMotion || isAdmin.value) return

  ctx = gsap.context(() => {
    const intro = gsap.timeline({ defaults: { ease: 'power4.out' } })
    intro
      .set('.intro-mask span', { yPercent: 108, scaleY: 0.82, transformOrigin: '50% 100%' })
      .from('.topbar', { y: -22, opacity: 0, filter: 'blur(10px)', duration: 0.8 })
      .to('.intro-mask span', { yPercent: 0, scaleY: 1, duration: 1, stagger: 0.08 }, 0.16)
      .from('.hero-copy, .hero-panel, .filter-bar', { y: 28, opacity: 0, duration: 0.85, stagger: 0.08 }, 0.38)
  })
}

onMounted(() => {
  loadContent()
  setupMotion()
  window.addEventListener('hashchange', syncHash)
  if (adminToken.value) {
    fetchAdminMe(adminToken.value)
      .then(({ user }) => {
        adminUser.value = user
      })
      .catch(() => logout())
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('hashchange', syncHash)
  document.body.classList.remove('modal-open')
  ctx?.revert()
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
})
</script>

<template>
  <main v-if="isAdmin" class="admin-shell">
    <aside class="admin-sidebar">
      <a class="brand admin-brand" href="#home" aria-label="返回前台">
        <span></span>
        <strong>AI Worklog</strong>
      </a>
      <nav v-if="adminToken" aria-label="后台导航">
        <a href="#admin" :class="{ active: adminSection === 'works' }" @click.prevent="adminSection = 'works'">作品管理</a>
        <a href="#admin" :class="{ active: adminSection === 'posts' }" @click.prevent="adminSection = 'posts'">文章笔记</a>
        <a href="#admin" :class="{ active: adminSection === 'profile' }" @click.prevent="adminSection = 'profile'">个人资料</a>
      </nav>
      <button v-if="adminToken" class="admin-back" type="button" @click="logout">退出登录</button>
      <a class="admin-back" href="#home">返回前台</a>
    </aside>

    <section class="admin-main">
      <section v-if="!adminToken" class="login-panel">
        <p class="eyebrow">ADMIN LOGIN</p>
        <h1>登录后台</h1>
        <label>
          账号
          <input v-model="loginForm.username" autocomplete="username" />
        </label>
        <label>
          密码
          <input v-model="loginForm.password" type="password" autocomplete="current-password" @keydown.enter="login" />
        </label>
        <p v-if="apiError" class="api-alert">{{ apiError }}</p>
        <button type="button" @click="login">登录</button>
      </section>

      <template v-else>
        <header class="admin-header">
          <div>
            <p class="eyebrow">CONTENT MANAGEMENT</p>
            <h1>后台管理系统</h1>
            <span>当前登录：{{ adminUser?.username || 'admin' }}。内容会写入服务器数据库。</span>
          </div>
          <button type="button" @click="adminSection === 'posts' ? newPost() : newWork()">新建内容</button>
        </header>

        <p v-if="apiError" class="api-alert">{{ apiError }}</p>

        <div class="admin-stats">
          <article>
            <span>作品总数</span>
            <strong>{{ works.length }}</strong>
            <p>可新增、编辑、删除</p>
          </article>
          <article>
            <span>笔记文章</span>
            <strong>{{ posts.length }}</strong>
            <p>最近更新 {{ posts[0]?.date }}</p>
          </article>
          <article>
            <span>分类标签</span>
            <strong>{{ categories.length - 1 }}</strong>
            <p>{{ skills.length }} 个能力标签</p>
          </article>
          <article>
            <span>API 域名</span>
            <strong>OK</strong>
            <p>{{ API_BASE_URL }}</p>
          </article>
        </div>

        <div v-if="adminSection === 'works'" class="admin-layout">
          <section class="admin-panel admin-wide">
            <div class="panel-head">
              <div>
                <p class="eyebrow">WORKS</p>
                <h2>作品管理</h2>
              </div>
              <div class="admin-tabs">
                <button type="button" class="active">全部</button>
                <button type="button" @click="newWork">新建</button>
              </div>
            </div>
            <div class="admin-table">
              <article
                v-for="work in works"
                :key="work.id"
                :class="{ selected: activeAdminWorkId === work.id }"
                @click="selectAdminWork(work)"
              >
                <img :src="work.cover" :alt="work.title" />
                <div>
                  <strong>{{ work.title }}</strong>
                  <span>{{ work.date }} · {{ categories.find((item) => item.id === work.type)?.label }}</span>
                </div>
                <p>{{ work.summary }}</p>
                <b>已发布</b>
              </article>
            </div>
          </section>

          <aside class="admin-panel editor-panel">
            <p class="eyebrow">EDITOR</p>
            <h2>{{ editDraft.id ? '编辑作品' : '新建作品' }}</h2>
            <label>标题<input v-model="editDraft.title" /></label>
            <label>
              分类
              <select v-model="editDraft.type">
                <option v-for="item in categories.filter((category) => category.id !== 'all')" :key="item.id" :value="item.id">
                  {{ item.label }}
                </option>
              </select>
            </label>
            <label>日期<input v-model="editDraft.date" /></label>
            <label>封面 URL<input v-model="editDraft.cover" /></label>
            <label class="upload-field">
              上传封面
              <input type="file" accept="image/*" @change="handleCoverUpload" />
            </label>
            <label>标签<input v-model="editDraft.tagsText" /></label>
            <label>摘要<textarea v-model="editDraft.summary"></textarea></label>
            <label>详情<textarea v-model="editDraft.detail"></textarea></label>
            <div class="publish-row">
              <span>{{ saveMessage || '修改会写入后端数据库' }}</span>
              <button type="button" @click="saveAdminWork">保存</button>
            </div>
            <button class="reset-button" type="button" @click="removeWork">删除作品</button>
            <button class="reset-button" type="button" @click="resetAdminWorks">恢复示例数据</button>
          </aside>
        </div>

        <div v-else-if="adminSection === 'posts'" class="admin-layout">
          <section class="admin-panel admin-wide">
            <div class="panel-head">
              <div>
                <p class="eyebrow">BLOG</p>
                <h2>文章笔记</h2>
              </div>
              <div class="admin-tabs">
                <button type="button" class="active">全部</button>
                <button type="button" @click="newPost">新建</button>
              </div>
            </div>
            <div class="admin-list">
              <article
                v-for="post in posts"
                :key="post.id"
                :class="{ selected: activeAdminPostId === post.id }"
                @click="selectAdminPost(post)"
              >
                <strong>{{ post.title }}</strong>
                <span>{{ post.date }} · {{ post.readTime }}</span>
              </article>
            </div>
          </section>

          <aside class="admin-panel editor-panel">
            <p class="eyebrow">EDITOR</p>
            <h2>{{ postDraft.id ? '编辑文章' : '新建文章' }}</h2>
            <label>标题<input v-model="postDraft.title" /></label>
            <label>
              分类
              <select v-model="postDraft.category">
                <option v-for="item in categories.filter((category) => category.id !== 'all')" :key="item.id" :value="item.id">
                  {{ item.label }}
                </option>
              </select>
            </label>
            <label>日期<input v-model="postDraft.date" /></label>
            <label>阅读时间<input v-model="postDraft.readTime" /></label>
            <label>摘要<textarea v-model="postDraft.summary"></textarea></label>
            <div class="publish-row">
              <span>{{ saveMessage || '文章会写入后端数据库' }}</span>
              <button type="button" @click="saveAdminPost">保存</button>
            </div>
            <button class="reset-button" type="button" @click="removePost">删除文章</button>
          </aside>
        </div>

        <div v-else class="admin-layout">
          <section class="admin-panel">
            <p class="eyebrow">PROFILE</p>
            <h2>个人资料</h2>
            <div class="profile-admin">
              <span>{{ profile.role }}</span>
              <strong>{{ profile.name }}</strong>
              <p>{{ profile.email }}</p>
              <p>{{ profile.location }}</p>
            </div>
          </section>
        </div>
      </template>
    </section>
  </main>

  <main v-else class="blog-shell">
    <header class="topbar">
      <a class="brand" href="#home" aria-label="返回首页"><span></span><strong>AI Worklog</strong></a>
      <nav aria-label="主导航"><a v-for="item in navItems" :key="item.href" :href="item.href">{{ item.label }}</a></nav>
      <a class="contact-link" href="#contact">联系</a>
    </header>

    <section class="hero-section" id="home">
      <div class="hero-grid">
        <div class="hero-main">
          <p class="eyebrow">PERSONAL AI PORTFOLIO BLOG</p>
          <h1>
            <span class="intro-mask"><span>AI 作品、</span></span>
            <span class="intro-mask"><span>训练笔记</span></span>
            <span class="intro-mask muted"><span>与项目复盘</span></span>
          </h1>
          <p class="hero-copy">{{ profile.summary }}</p>
          <div class="hero-actions"><a href="#works">查看作品</a><a href="#notes">阅读笔记</a></div>
        </div>
        <aside class="hero-panel">
          <div class="profile-card"><div class="avatar">AI</div><p>{{ profile.role }}</p><h2>{{ profile.name }}</h2><span>{{ profile.availability }}</span></div>
          <div class="metric-grid"><div v-for="item in metrics" :key="item.label"><strong>{{ item.value }}</strong><span>{{ item.label }}</span></div></div>
        </aside>
      </div>
      <div class="filter-bar"><button v-for="item in categories" :key="item.id" type="button" :class="{ active: activeCategory === item.id }" @click="activeCategory = item.id">{{ item.label }}</button></div>
      <div class="recent-strip">
        <article v-for="work in works.slice(0, 2)" :key="work.id" @click="openWork(work)"><img :src="work.cover" :alt="work.title" /><div><span>{{ work.date }}</span><strong>{{ work.title }}</strong></div></article>
        <a href="#notes"><span>{{ posts[0]?.date }}</span><strong>{{ posts[0]?.title }}</strong></a>
      </div>
    </section>

    <section class="featured-section section-block">
      <div class="section-title"><p class="eyebrow">FEATURED</p><h2>精选展示</h2></div>
      <article v-if="featuredWork" class="featured-card motion-card" @click="openWork(featuredWork)">
        <div class="featured-media parallax-image"><img :src="featuredWork.cover" :alt="featuredWork.title" /></div>
        <div class="featured-copy"><span>{{ featuredWork.date }}</span><h3>{{ featuredWork.title }}</h3><p>{{ featuredWork.summary }}</p><div><b v-for="tag in featuredWork.tags" :key="tag">{{ tag }}</b></div></div>
      </article>
    </section>

    <section class="works-section section-block" id="works">
      <div class="section-title"><p class="eyebrow">AI WORKS</p><h2>作品归档</h2></div>
      <div class="work-grid"><article v-for="work in filteredWorks" :key="work.id" class="work-card motion-card" @click="openWork(work)"><div class="work-thumb parallax-image"><img :src="work.cover" :alt="work.title" /></div><div class="work-content"><span>{{ work.date }}</span><h3>{{ work.title }}</h3><p>{{ work.summary }}</p><div class="tag-list"><b v-for="tag in work.tags" :key="tag">{{ tag }}</b></div></div></article></div>
    </section>

    <section class="notes-section section-block" id="notes">
      <div class="section-title"><p class="eyebrow">BLOG NOTES</p><h2>最新笔记</h2></div>
      <div class="note-list"><article v-for="post in posts" :key="post.id" class="note-card motion-card"><time>{{ post.date }}</time><h3>{{ post.title }}</h3><p>{{ post.summary }}</p><span>{{ post.readTime }} · {{ categories.find((item) => item.id === post.category)?.label }}</span></article></div>
    </section>

    <section class="experience-section section-block" id="experience">
      <div class="section-title"><p class="eyebrow">EXPERIENCE</p><h2>经历与能力</h2></div>
      <div class="experience-layout"><div class="timeline"><article v-for="item in experience" :key="item.id" class="motion-card"><time>{{ item.period }}</time><h3>{{ item.role }}</h3><strong>{{ item.company }}</strong><p>{{ item.summary }}</p></article></div><div class="skill-panel motion-card"><span v-for="skill in skills" :key="skill">{{ skill }}</span></div></div>
    </section>

    <section class="contact-section section-block" id="contact">
      <div class="section-title"><p class="eyebrow">CONTACT</p><h2>希望这份博客像一份可浏览的作品简历。</h2></div>
      <div class="contact-card motion-card"><p>{{ profile.email }}</p><p>{{ profile.phone }}</p><p>{{ profile.location }}</p></div>
    </section>

    <div v-if="selectedWork" class="modal-backdrop" @click.self="closeWork">
      <article class="work-dialog"><button type="button" aria-label="关闭" @click="closeWork">×</button><div class="dialog-image dialog-reveal"><img :src="selectedWork.cover" :alt="selectedWork.title" /></div><div class="dialog-copy"><p class="eyebrow dialog-reveal">CASE DETAIL</p><h2 class="dialog-reveal">{{ selectedWork.title }}</h2><p class="dialog-reveal">{{ selectedWork.detail }}</p><div class="tag-list dialog-reveal"><b v-for="tag in selectedWork.tags" :key="tag">{{ tag }}</b></div></div></article>
    </div>
  </main>
</template>
