<template>
  <div class="divide-y divide-[var(--tx-border)] overflow-hidden rounded-xl border border-themed surface-card">
    <div v-for="(item, i) in items" :key="item.title">
      <button
        type="button"
        :aria-expanded="open.includes(i)"
        class="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left text-sm font-medium text-heading transition hover:bg-gray-50 dark:hover:bg-gray-800/50"
        @click="toggle(i)"
      >
        <span class="flex items-center gap-2.5">
          <IconBase v-if="item.icon" :name="item.icon" :size="18" class="text-muted" />
          {{ item.title }}
        </span>
        <IconBase
          name="chevron-down"
          :size="18"
          class="text-muted transition-transform duration-300"
          :class="open.includes(i) ? 'rotate-180' : ''"
        />
      </button>
      <div
        class="grid transition-all duration-300 ease-in-out"
        :style="{ gridTemplateRows: open.includes(i) ? '1fr' : '0fr' }"
      >
        <div class="overflow-hidden">
          <div class="px-4 pb-4 text-sm text-body">
            <slot :name="`content-${i}`">{{ item.content }}</slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import IconBase from './IconBase.vue'

export interface AccordionItem {
  title: string
  icon?: string
  content?: string
}

const props = withDefaults(
  defineProps<{
    items: AccordionItem[]
    multiple?: boolean
    /** Indexes initially open */
    defaultOpen?: number[]
  }>(),
  {
    multiple: false,
    defaultOpen: () => [],
  }
)

const open = ref<number[]>([...props.defaultOpen])

function toggle(idx: number) {
  const isOpen = open.value.includes(idx)
  if (props.multiple) {
    open.value = isOpen ? open.value.filter((i) => i !== idx) : [...open.value, idx]
  } else {
    open.value = isOpen ? [] : [idx]
  }
}
</script>
