import { onMounted, onUnmounted } from 'vue'

// 模块级单例:整个应用共用一个 IntersectionObserver
// 这样无论多少组件用了 useReveal,都是同一个观察实例,效率最佳
let intersectionObserver = null
let mutationObserver = null
let staggerCounter = 0
let staggerResetTimer = null

function ensureObservers() {
  if (intersectionObserver) return

  // ① IntersectionObserver:负责检测元素是否进入视口
  intersectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return
        // 节流的"批次错峰":同一批进入视口的元素依次延迟,营造瀑布感
        // 但批次之间会重置,避免后期元素延迟过长
        const delay = staggerCounter * 80
        setTimeout(() => entry.target.classList.add('visible'), delay)
        staggerCounter++

        // 触发动画后停止观察这个元素(只播一次)
        intersectionObserver.unobserve(entry.target)

        // 250ms 没有新元素进入,重置错峰计数
        clearTimeout(staggerResetTimer)
        staggerResetTimer = setTimeout(() => { staggerCounter = 0 }, 250)
      })
    },
    { threshold: 0.1 }
  )

  // ② MutationObserver:监听 DOM 变化,自动接管新出现的 .reveal 元素
  // 这一步是关键——异步加载的卡片渲染出来时,会被这里捕获
  mutationObserver = new MutationObserver((mutations) => {
    for (const m of mutations) {
      m.addedNodes.forEach(node => {
        if (node.nodeType !== 1) return // 只处理元素节点
        // 节点本身是 .reveal
        if (node.classList?.contains('reveal') && !node.classList.contains('visible')) {
          intersectionObserver.observe(node)
        }
        // 节点内部包含 .reveal 子元素
        node.querySelectorAll?.('.reveal:not(.visible)').forEach(el => {
          intersectionObserver.observe(el)
        })
      })
    }
  })

  mutationObserver.observe(document.body, {
    childList: true,
    subtree: true
  })
}

export function useReveal() {
  onMounted(() => {
    ensureObservers()
    // 接管当前 DOM 里所有未处理的 .reveal 元素
    document.querySelectorAll('.reveal:not(.visible)').forEach(el => {
      intersectionObserver.observe(el)
    })
  })

  // 注:故意不在 onUnmounted 销毁全局 observer
  // 因为这是单例,其他组件可能还在用
}