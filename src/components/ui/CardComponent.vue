<template>
  <section class="surface-card rounded-2xl border shadow-theme-sm">
    <header
      v-if="title || $slots.header || $slots.toolbar"
      class="flex items-center justify-between gap-3 border-b border-themed px-5 py-4 md:px-6"
    >
      <div class="flex items-center gap-3">
        <span
          v-if="icon"
          class="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-500 dark:bg-brand-500/15"
        >
          <IconBase :name="icon" :size="18" />
        </span>
        <div>
          <h3 v-if="title" class="text-base font-semibold text-heading">{{ title }}</h3>
          <p v-if="subtitle" class="mt-0.5 text-xs text-muted">{{ subtitle }}</p>
        </div>
        <slot name="header" />
      </div>
      <slot name="toolbar" />
    </header>

    <div :class="bodyClass">
      <slot />
    </div>

    <footer
      v-if="$slots.footer"
      class="border-t border-themed px-5 py-3 md:px-6"
    >
      <slot name="footer" />
    </footer>
  </section>
</template>

<script setup lang="ts">
import IconBase from './IconBase.vue'

withDefaults(
  defineProps<{
    title?: string
    subtitle?: string
    icon?: string
    bodyClass?: string
  }>(),
  {
    bodyClass: 'p-5 md:p-6',
  }
)
</script>
