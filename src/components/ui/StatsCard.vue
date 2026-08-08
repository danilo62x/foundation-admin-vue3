<template>
  <div class="rounded-2xl border border-gray-200 bg-white p-5 shadow-theme-sm dark:border-gray-800 dark:bg-gray-dark md:p-6">
    <div
      class="flex h-12 w-12 items-center justify-center rounded-xl"
      :class="iconBg"
    >
      <IconBase :name="icon" :size="22" :class="iconColor" />
    </div>

    <div class="mt-5 flex items-end justify-between">
      <div>
        <span class="text-sm text-gray-500 dark:text-gray-400">{{ title }}</span>
        <h4 class="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
          {{ value }}
        </h4>
      </div>

      <span
        v-if="trend"
        :class="[
          'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium',
          trend === 'up'
            ? 'bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500'
            : 'bg-error-50 text-error-600 dark:bg-error-500/15 dark:text-error-500',
        ]"
      >
        <IconBase :name="trend === 'up' ? 'arrow-up' : 'arrow-down'" :size="12" :stroke-width="2.5" />
        {{ trendValue }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import IconBase from './IconBase.vue'

const props = withDefaults(
  defineProps<{
    title: string
    value: string | number
    icon: string
    accent?: 'brand' | 'success' | 'warning' | 'error' | 'info'
    trend?: 'up' | 'down'
    trendValue?: string
  }>(),
  {
    accent: 'brand',
  }
)

const iconBg = computed(() => {
  const map = {
    brand: 'bg-brand-50 dark:bg-brand-500/15',
    success: 'bg-success-50 dark:bg-success-500/15',
    warning: 'bg-warning-50 dark:bg-warning-500/15',
    error: 'bg-error-50 dark:bg-error-500/15',
    info: 'bg-blue-light-50 dark:bg-blue-light-500/15',
  }
  return map[props.accent]
})

const iconColor = computed(() => {
  const map = {
    brand: 'text-brand-500',
    success: 'text-success-600',
    warning: 'text-warning-600',
    error: 'text-error-500',
    info: 'text-blue-light-500',
  }
  return map[props.accent]
})
</script>
