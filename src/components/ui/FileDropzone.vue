<template>
  <div class="space-y-3">
    <label
      class="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed p-8 text-center transition"
      :class="dragging ? 'border-brand-500 bg-brand-25 dark:bg-brand-500/10' : 'border-themed hover:border-brand-300'"
      @dragover.prevent="dragging = true"
      @dragleave.prevent="dragging = false"
      @drop.prevent="onDrop"
    >
      <input type="file" class="hidden" :accept="accept" multiple @change="onPick" />
      <span class="text-brand-500"><IconBase name="download" :size="28" :stroke-width="1.6" /></span>
      <p class="text-sm font-medium text-heading">
        {{ dragging ? 'Solte os arquivos aqui' : 'Arraste arquivos ou clique para enviar' }}
      </p>
      <p class="text-xs text-muted">Até {{ maxFiles }} arquivos</p>
    </label>

    <ul v-if="files.length" class="space-y-2">
      <li
        v-for="(file, idx) in files"
        :key="`${file.name}-${idx}`"
        class="surface-card flex items-center justify-between gap-3 rounded-lg border px-3 py-2"
      >
        <div class="flex min-w-0 items-center gap-2">
          <span class="text-muted"><IconBase name="package" :size="16" /></span>
          <span class="truncate text-sm text-body">{{ file.name }}</span>
          <span class="shrink-0 text-xs text-muted">{{ formatSize(file.size) }}</span>
        </div>
        <button type="button" class="text-muted hover:text-error-500" aria-label="Remover" @click="remove(idx)">
          <IconBase name="x" :size="16" />
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import IconBase from '@/components/ui/IconBase.vue'

const props = withDefaults(defineProps<{ accept?: string; maxFiles?: number }>(), { maxFiles: 5 })
const emit = defineEmits<{ files: [files: File[]] }>()

const files = ref<File[]>([])
const dragging = ref(false)

function add(list: FileList | null) {
  if (!list) return
  files.value = [...files.value, ...Array.from(list)].slice(0, props.maxFiles)
  emit('files', files.value)
}

function onDrop(e: DragEvent) {
  dragging.value = false
  add(e.dataTransfer?.files ?? null)
}

function onPick(e: Event) {
  add((e.target as HTMLInputElement).files)
}

function remove(idx: number) {
  files.value.splice(idx, 1)
  emit('files', files.value)
}

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}
</script>
