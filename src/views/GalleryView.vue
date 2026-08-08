<template>
  <div class="space-y-6">
    <div class="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 class="text-title-sm font-bold text-heading">Galeria</h1>
        <p class="mt-1 text-sm text-muted">Imagens e vídeos da sua biblioteca de mídia.</p>
      </div>
      <div class="inline-flex rounded-lg border border-themed p-0.5">
        <button
          v-for="t in TABS"
          :key="t.id"
          class="rounded-md px-4 py-1.5 text-sm font-medium transition"
          :class="
            tab === t.id
              ? 'bg-brand-500 text-white'
              : 'text-muted hover:bg-gray-50 dark:hover:bg-gray-800'
          "
          @click="changeTab(t.id)"
        >
          {{ t.label }}
        </button>
      </div>
    </div>

    <div class="grid auto-rows-[180px] grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      <button
        v-for="(m, idx) in filtered"
        :key="m.id"
        class="group relative overflow-hidden rounded-2xl border border-themed text-left shadow-theme-sm"
        :class="m.span ? 'row-span-2' : ''"
        @click="lightboxIndex = idx"
      >
        <div
          class="h-full w-full bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
          :style="{ backgroundImage: `url(&quot;${m.thumb}&quot;)`, backgroundColor: '#1f2937' }"
        />
        <span
          v-if="m.type === 'video'"
          class="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-gray-900/60 px-2 py-0.5 text-xs font-medium text-white backdrop-blur-sm"
        >
          <IconBase name="eye" :size="12" /> Vídeo
        </span>
        <div
          class="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-gray-900/70 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        >
          <p class="text-sm font-semibold text-white">{{ m.title }}</p>
          <p class="text-xs text-white/70">{{ m.meta }}</p>
        </div>
        <span
          class="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg bg-white/90 text-gray-700 opacity-0 transition-opacity duration-200 group-hover:opacity-100 dark:bg-gray-900/80 dark:text-gray-100"
        >
          <IconBase name="grid" :size="16" />
        </span>
      </button>
    </div>

    <div
      v-if="filtered.length === 0"
      class="surface-card rounded-2xl border p-12 text-center text-sm text-muted shadow-theme-sm"
    >
      Nenhuma mídia nesta categoria.
    </div>

    <!-- Lightbox -->
    <Teleport to="body">
      <div
        v-if="active"
        class="fixed inset-0 z-[80] flex items-center justify-center bg-gray-900/80 p-4 backdrop-blur-sm"
        @click.self="close"
      >
        <button
          class="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
          aria-label="Fechar"
          @click="close"
        >
          <IconBase name="x" :size="22" />
        </button>

        <button
          class="absolute left-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
          aria-label="Anterior"
          @click="prev"
        >
          <IconBase name="chevron-right" :size="24" class="rotate-180" />
        </button>

        <div class="w-full max-w-3xl">
          <div
            class="aspect-video w-full overflow-hidden rounded-2xl bg-[#0c111d] shadow-theme-xl"
          >
            <video
              v-if="active.type === 'video'"
              :key="active.id"
              class="tx-lightbox-media"
              :src="active.video"
              :poster="active.thumb"
              controls
              autoplay
              playsinline
            />
            <img v-else class="tx-lightbox-media" :src="active.thumb" :alt="active.title" />
          </div>
          <div class="mt-4 flex items-center justify-between">
            <div>
              <p class="text-base font-semibold text-white">{{ active.title }}</p>
              <p class="text-sm text-white/60">
                {{ active.type === 'video' ? 'Vídeo' : 'Imagem' }} · {{ active.meta }}
              </p>
            </div>
            <span class="text-sm text-white/60">
              {{ (lightboxIndex ?? 0) + 1 }} / {{ filtered.length }}
            </span>
          </div>
        </div>

        <button
          class="absolute right-4 bottom-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:bottom-auto"
          aria-label="Próximo"
          @click="next"
        >
          <IconBase name="chevron-right" :size="24" />
        </button>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useUiStore } from '@/stores/ui'
import IconBase from '@/components/ui/IconBase.vue'

type MediaType = 'image' | 'video'
type Tab = 'all' | 'image' | 'video'

interface Media {
  id: string
  title: string
  type: MediaType
  meta: string
  /** Imagem (ou poster do vídeo) — Lorem Picsum, livre de direitos autorais */
  thumb: string
  /** URL do vídeo (Blender open movies / amostras públicas — Creative Commons) */
  video?: string
  span: boolean
}

const ui = useUiStore()
onMounted(() => ui.setPageTitle('Galeria'))

// Mídia 100% livre de direitos autorais:
//  • Imagens: Lorem Picsum (picsum.photos) — domínio público, sem atribuição.
//  • Vídeos: open movies da Blender Foundation (CC-BY) / amostras públicas CC0.
const pic = (seed: string, w = 800, h = 600) => `https://picsum.photos/seed/${seed}/${w}/${h}`
const VID_BBB720 = 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_2MB.mp4'
const VID_BBB360 = 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4'
const VID_FLOWER = 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4'
const VID_BBB_W3 = 'https://www.w3schools.com/html/mov_bbb.mp4'

const MEDIA: Media[] = [
  { id: '1', title: 'Pôr do sol na praia', type: 'image', meta: '1920 × 1080', thumb: pic('praia', 800, 1100), span: true },
  { id: '2', title: 'Montanhas ao amanhecer', type: 'image', meta: '2400 × 1600', thumb: pic('montanha'), span: false },
  { id: '3', title: 'Tour pelo escritório', type: 'video', meta: '00:10 · MP4', thumb: pic('escritorio'), video: VID_BBB720, span: false },
  { id: '4', title: 'Arquitetura moderna', type: 'image', meta: '1600 × 2000', thumb: pic('arquitetura', 800, 1100), span: true },
  { id: '5', title: 'Lançamento do produto', type: 'video', meta: '00:10 · MP4', thumb: pic('produto'), video: VID_FLOWER, span: false },
  { id: '6', title: 'Floresta tropical', type: 'image', meta: '2048 × 1365', thumb: pic('floresta'), span: false },
  { id: '7', title: 'Cidade à noite', type: 'image', meta: '1920 × 1280', thumb: pic('cidade'), span: false },
  { id: '8', title: 'Depoimento de cliente', type: 'video', meta: '00:10 · MP4', thumb: pic('depoimento', 800, 1100), video: VID_BBB_W3, span: true },
  { id: '9', title: 'Detalhe de textura', type: 'image', meta: '1500 × 1500', thumb: pic('textura'), span: false },
  { id: '10', title: 'Equipe em reunião', type: 'image', meta: '2200 × 1400', thumb: pic('equipe'), span: false },
  { id: '11', title: 'Bastidores do evento', type: 'video', meta: '00:10 · MP4', thumb: pic('evento'), video: VID_BBB360, span: false },
  { id: '12', title: 'Paisagem minimalista', type: 'image', meta: '1920 × 1080', thumb: pic('paisagem', 800, 1100), span: true },
]

const TABS: { id: Tab; label: string }[] = [
  { id: 'all', label: 'Todos' },
  { id: 'image', label: 'Imagens' },
  { id: 'video', label: 'Vídeos' },
]

const tab = ref<Tab>('all')
const lightboxIndex = ref<number | null>(null)

const filtered = computed(() => MEDIA.filter((m) => tab.value === 'all' || m.type === tab.value))

const active = computed(() =>
  lightboxIndex.value !== null ? filtered.value[lightboxIndex.value] : null
)

function changeTab(id: Tab) {
  tab.value = id
  lightboxIndex.value = null
}

function close() {
  lightboxIndex.value = null
}

function prev() {
  if (lightboxIndex.value === null) return
  lightboxIndex.value = (lightboxIndex.value - 1 + filtered.value.length) % filtered.value.length
}

function next() {
  if (lightboxIndex.value === null) return
  lightboxIndex.value = (lightboxIndex.value + 1) % filtered.value.length
}
</script>

<style scoped>
.tx-lightbox-media {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>
