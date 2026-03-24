import { onMounted } from 'vue'

export function useReveal() {
  onMounted(() => {
    const els = document.querySelectorAll('.reveal')
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 80)
        }
      })
    }, { threshold: 0.1 })
    els.forEach(el => obs.observe(el))
  })
}
