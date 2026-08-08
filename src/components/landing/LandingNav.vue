<template>
  <header
    class="sticky top-0 z-50 w-full transition-colors"
    :class="
      scrolled
        ? 'surface-header border-b border-themed shadow-theme-sm backdrop-blur supports-[backdrop-filter]:bg-white/80 dark:supports-[backdrop-filter]:bg-gray-dark/80'
        : 'border-b border-transparent'
    "
  >
    <div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
      <button
        type="button"
        class="flex items-center gap-2.5 focus-ring rounded-lg"
        @click="scrollTo('hero')"
      >
        <span class="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500 text-lg font-bold text-white shadow-theme-md">
          A
        </span>
        <span class="text-lg font-bold text-heading">Admin Template</span>
      </button>

      <nav class="hidden items-center gap-1 md:flex">
        <button
          v-for="link in LINKS"
          :key="link.id"
          type="button"
          class="rounded-lg px-3 py-2 text-sm font-medium text-body transition hover:bg-gray-100 hover:text-heading dark:hover:bg-gray-800"
          @click="scrollTo(link.id)"
        >
          {{ link.label }}
        </button>
      </nav>

      <div class="flex items-center gap-2">
        <button
          type="button"
          aria-label="Alternar tema"
          class="flex h-10 w-10 items-center justify-center rounded-full border border-themed text-body transition hover:bg-gray-50 dark:hover:bg-gray-800"
          @click="ui.toggleDarkMode()"
        >
          <IconBase :name="ui.darkMode ? 'sun' : 'moon'" :size="18" />
        </button>

        <RouterLink
          to="/login"
          class="hidden h-10 items-center rounded-lg px-4 text-sm font-medium text-body transition hover:bg-gray-100 hover:text-heading dark:hover:bg-gray-800 sm:inline-flex"
        >
          Entrar
        </RouterLink>
        <RouterLink
          to="/register"
          class="hidden h-10 items-center rounded-lg bg-brand-500 px-4 text-sm font-medium text-white shadow-theme-xs transition hover:bg-brand-600 focus-ring sm:inline-flex"
        >
          Começar agora
        </RouterLink>

        <button
          type="button"
          aria-label="Abrir menu"
          :aria-expanded="open"
          class="flex h-10 w-10 items-center justify-center rounded-full border border-themed text-body transition hover:bg-gray-50 dark:hover:bg-gray-800 md:hidden"
          @click="open = !open"
        >
          <IconBase :name="open ? 'x' : 'menu'" :size="20" />
        </button>
      </div>
    </div>

    <div v-if="open" class="surface-card border-t border-themed md:hidden">
      <nav class="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6">
        <button
          v-for="link in LINKS"
          :key="link.id"
          type="button"
          class="rounded-lg px-3 py-2.5 text-left text-sm font-medium text-body transition hover:bg-gray-100 hover:text-heading dark:hover:bg-gray-800"
          @click="scrollTo(link.id)"
        >
          {{ link.label }}
        </button>
        <div class="mt-2 flex flex-col gap-2 border-t border-themed pt-3">
          <RouterLink
            to="/login"
            class="flex h-11 items-center justify-center rounded-lg border border-themed text-sm font-medium text-body transition hover:bg-gray-50 dark:hover:bg-gray-800"
            @click="open = false"
          >
            Entrar
          </RouterLink>
          <RouterLink
            to="/register"
            class="flex h-11 items-center justify-center rounded-lg bg-brand-500 text-sm font-medium text-white shadow-theme-xs transition hover:bg-brand-600"
            @click="open = false"
          >
            Começar agora
          </RouterLink>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useUiStore } from '@/stores/ui'
import IconBase from '@/components/ui/IconBase.vue'

const LINKS = [
  { id: 'features', label: 'Recursos' },
  { id: 'pricing', label: 'Preços' },
  { id: 'faq', label: 'FAQ' },
  { id: 'contact', label: 'Contato' },
]

const ui = useUiStore()
const open = ref(false)
const scrolled = ref(false)

function onScroll() {
  scrolled.value = window.scrollY > 8
}

function scrollTo(id: string) {
  open.value = false
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>
