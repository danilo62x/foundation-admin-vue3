<template>
  <span class="group/tooltip relative inline-flex">
    <slot />
    <span
      role="tooltip"
      class="pointer-events-none absolute z-30 whitespace-nowrap rounded-md bg-gray-900 px-2.5 py-1.5 text-xs font-medium text-white opacity-0 shadow-theme-md transition-opacity duration-150 group-hover/tooltip:opacity-100 group-focus-within/tooltip:opacity-100 dark:bg-gray-700"
      :class="POS[placement]"
    >
      {{ content }}
      <span class="absolute h-2 w-2 rotate-45 bg-gray-900 dark:bg-gray-700" :class="ARROW[placement]" />
    </span>
  </span>
</template>

<script setup lang="ts">
type Placement = 'top' | 'bottom' | 'left' | 'right'

withDefaults(
  defineProps<{
    content: string
    placement?: Placement
  }>(),
  { placement: 'top' }
)

const POS: Record<Placement, string> = {
  top: 'bottom-full left-1/2 mb-2 -translate-x-1/2',
  bottom: 'top-full left-1/2 mt-2 -translate-x-1/2',
  left: 'right-full top-1/2 mr-2 -translate-y-1/2',
  right: 'left-full top-1/2 ml-2 -translate-y-1/2',
}

const ARROW: Record<Placement, string> = {
  top: 'top-full left-1/2 -translate-x-1/2 -mt-1',
  bottom: 'bottom-full left-1/2 -translate-x-1/2 -mb-1',
  left: 'left-full top-1/2 -translate-y-1/2 -ml-1',
  right: 'right-full top-1/2 -translate-y-1/2 -mr-1',
}
</script>
