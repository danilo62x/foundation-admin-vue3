<template>
  <div class="flex -space-x-2">
    <span
      v-for="(child, i) in children"
      :key="i"
      class="rounded-full ring-2"
      :style="{ '--tw-ring-color': 'var(--tx-card-bg)' }"
    >
      <component :is="child" />
    </span>
    <span
      v-if="extra != null && extra > 0"
      class="flex items-center justify-center rounded-full ring-2 bg-gray-200 font-bold text-gray-700 dark:bg-gray-700 dark:text-gray-200"
      :class="SIZE_MAP[size]"
      :style="{ '--tw-ring-color': 'var(--tx-card-bg)' }"
    >
      +{{ extra }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed, Fragment, useSlots, type VNode } from 'vue'
import type { AvatarSize } from './Avatar.vue'

withDefaults(
  defineProps<{
    /** number of extra avatars hidden, shown as +N */
    extra?: number
    size?: AvatarSize
  }>(),
  { size: 'md' }
)

const slots = useSlots()

const children = computed<VNode[]>(() => {
  const nodes = slots.default ? slots.default() : []
  // Flatten in case the default slot is wrapped in a fragment.
  return nodes.flatMap((n) =>
    n.type === Fragment && Array.isArray(n.children) ? (n.children as VNode[]) : [n]
  )
})

const SIZE_MAP: Record<AvatarSize, string> = {
  xs: 'h-7 w-7 text-[10px]',
  sm: 'h-9 w-9 text-xs',
  md: 'h-11 w-11 text-sm',
  lg: 'h-14 w-14 text-base',
  xl: 'h-16 w-16 text-lg',
}
</script>
