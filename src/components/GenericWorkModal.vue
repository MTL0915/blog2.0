<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="visible" class="modal-overlay" @click.self="$emit('close')">
        <div class="modal-card">
          <button class="modal-close" @click="$emit('close')">✕</button>

          <div v-if="work" class="modal-content">
            <!-- 头部 -->
            <header class="modal-header">
              <div v-if="work.cat_label" class="modal-tag">{{ work.cat_label }}</div>
              <h2 class="modal-title">{{ work.title }}</h2>
              <div v-if="work.cat" class="modal-cat">{{ work.cat }}</div>
              <p v-if="work.description" class="modal-desc">{{ work.description }}</p>
            </header>

            <!-- 封面图(如果有) -->
            <img
              v-if="work.cover_url"
              :src="resolveAsset(work.cover_url)"
              class="modal-cover"
            />

            <!-- 区块内容 -->
            <div v-if="hasBlocks" class="modal-blocks">
              <template v-for="(block, i) in work.modal_blocks" :key="i">
                <h3 v-if="block.type === 'heading'" class="block-heading">
                  {{ block.text }}
                </h3>

                <p v-else-if="block.type === 'paragraph'" class="block-paragraph">
                  {{ block.text }}
                </p>

                <figure v-else-if="block.type === 'image' && block.url" class="block-image">
                  <img :src="resolveAsset(block.url)" :alt="block.caption || ''" />
                  <figcaption v-if="block.caption">{{ block.caption }}</figcaption>
                </figure>

                <div v-else-if="block.type === 'video' && block.url" class="block-video">
                  <iframe
                    v-if="block.platform === 'bilibili'"
                    :src="getBilibiliEmbedUrl(block.url)"
                    frameborder="0"
                    allowfullscreen
                  />
                  <iframe
                    v-else-if="block.platform === 'youtube'"
                    :src="getYoutubeEmbedUrl(block.url)"
                    frameborder="0"
                    allowfullscreen
                  />
                  <video v-else :src="resolveAsset(block.url)" controls />
                  <p v-if="block.caption" class="video-caption">{{ block.caption }}</p>
                </div>
              </template>
            </div>

            <div v-else-if="!work.cover_url" class="modal-empty">
              这个作品还没有详细内容
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { computed } from 'vue'
import { resolveAsset } from '../api'

const props = defineProps({
  visible: Boolean,
  work: Object
})
defineEmits(['close'])

const hasBlocks = computed(() =>
  props.work?.modal_blocks && Array.isArray(props.work.modal_blocks) && props.work.modal_blocks.length > 0
)

// B 站链接转嵌入 URL
function getBilibiliEmbedUrl(url) {
  const match = url.match(/BV[\w]+/)
  if (!match) return url
  return `https://player.bilibili.com/player.html?bvid=${match[0]}&autoplay=0`
}

// YouTube 链接转嵌入
function getYoutubeEmbedUrl(url) {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]+)/)
  if (!match) return url
  return `https://www.youtube.com/embed/${match[1]}`
}
</script>

<style scoped>
.modal-overlay {
  position: fixed; inset: 0; z-index: 9999;
  background: rgba(28, 10, 0, 0.7);
  backdrop-filter: blur(8px);
  display: flex; align-items: center; justify-content: center;
  padding: 40px 20px;
  overflow-y: auto;
}

.modal-card {
  position: relative;
  width: 100%; max-width: 800px;
  background: #fff7ee;
  border-radius: 24px;
  box-shadow: 0 30px 80px rgba(28, 10, 0, 0.4);
  margin: auto;
  overflow: hidden;
  border: 1px solid rgba(249, 115, 22, 0.15);
}

.modal-close {
  position: absolute; top: 20px; right: 20px;
  width: 36px; height: 36px;
  border: none; border-radius: 50%;
  background: rgba(255, 255, 255, 0.8);
  font-size: 14px; font-weight: 600; color: #6b3a17;
  cursor: pointer; z-index: 10;
  backdrop-filter: blur(8px);
  transition: all 0.2s;
}
.modal-close:hover { background: #fff; transform: scale(1.05); }

.modal-content { padding: 56px 56px 48px; }

.modal-header { margin-bottom: 28px; }
.modal-tag {
  display: inline-block;
  font-size: 11px; font-weight: 600; letter-spacing: 2px;
  text-transform: uppercase; color: #f97316;
  padding: 4px 12px;
  background: rgba(249,115,22,0.1);
  border-radius: 100px;
  margin-bottom: 14px;
}
.modal-title {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 36px; font-weight: 700; line-height: 1.15;
  color: #2d1810; margin: 0 0 8px;
  letter-spacing: -0.5px;
}
.modal-cat {
  font-size: 13px; color: #b45309; font-weight: 500;
  margin-bottom: 16px;
}
.modal-desc {
  font-size: 15px; color: #6b4226; line-height: 1.7;
  margin: 0;
}

.modal-cover {
  width: 100%; max-height: 400px;
  object-fit: cover; border-radius: 14px;
  margin-bottom: 32px;
  box-shadow: 0 8px 30px rgba(28, 10, 0, 0.12);
}

.modal-blocks { display: flex; flex-direction: column; gap: 24px; }

.block-heading {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 22px; font-weight: 700;
  color: #2d1810; margin: 12px 0 0;
  position: relative; padding-left: 14px;
}
.block-heading::before {
  content: ''; position: absolute; left: 0; top: 6px;
  width: 4px; height: 20px;
  background: linear-gradient(to bottom, #f97316, #fbbf24);
  border-radius: 2px;
}

.block-paragraph {
  font-size: 15px; line-height: 1.85;
  color: #4a3525; margin: 0;
}

.block-image {
  margin: 0; border-radius: 12px; overflow: hidden;
  box-shadow: 0 4px 20px rgba(28, 10, 0, 0.08);
}
.block-image img { width: 100%; display: block; }
.block-image figcaption {
  font-size: 13px; color: #8b6f47;
  text-align: center; padding: 10px 16px;
  background: rgba(249, 115, 22, 0.05);
}

.block-video {
  border-radius: 12px; overflow: hidden;
  box-shadow: 0 4px 20px rgba(28, 10, 0, 0.08);
}
.block-video iframe,
.block-video video {
  width: 100%; aspect-ratio: 16 / 9;
  display: block; background: #000;
}
.video-caption {
  font-size: 13px; color: #8b6f47;
  text-align: center; padding: 10px 16px;
  background: rgba(249, 115, 22, 0.05);
  margin: 0;
}

.modal-empty {
  text-align: center; padding: 40px 20px;
  color: #a78a6e; font-size: 14px;
}

.modal-enter-active, .modal-leave-active {
  transition: opacity 0.3s ease;
}
.modal-enter-from, .modal-leave-to { opacity: 0; }
.modal-enter-active .modal-card, .modal-leave-active .modal-card {
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.modal-enter-from .modal-card { transform: translateY(40px) scale(0.96); }
.modal-leave-to .modal-card { transform: translateY(20px) scale(0.98); }

@media (max-width: 768px) {
  .modal-card { border-radius: 18px; }
  .modal-content { padding: 40px 24px 32px; }
  .modal-title { font-size: 26px; }
  .modal-cover { margin-bottom: 24px; }
}
</style>