<template>
  <header class="surface-header sticky top-0 z-30 flex w-full border-b">
    <div class="flex flex-grow items-center justify-between gap-4 px-4 py-3 md:px-6 2xl:px-10">
      <div class="flex items-center gap-3">
        <button
          type="button"
          class="flex h-10 w-10 items-center justify-center rounded-lg border border-themed text-muted hover:bg-gray-50 dark:hover:bg-gray-800"
          @click="toggleSidebar"
          aria-label="Toggle sidebar"
        >
          <IconBase name="menu" :size="20" />
        </button>

        <div class="hidden md:block">
          <form @submit.prevent>
            <div class="relative">
              <span class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <IconBase name="search" :size="18" />
              </span>
              <input
                type="text"
                placeholder="Buscar ou digitar comando..."
                class="h-10 w-[260px] rounded-lg border border-themed bg-gray-50 pl-10 pr-12 text-sm text-body placeholder-gray-400 outline-none focus:border-brand-300 focus-ring dark:bg-gray-900 xl:w-[400px]"
              />
              <kbd class="absolute right-3 top-1/2 -translate-y-1/2 rounded border border-themed bg-white px-1.5 py-0.5 text-xs text-muted dark:bg-gray-900">
                ⌘ K
              </kbd>
            </div>
          </form>
        </div>
      </div>

      <div class="flex items-center gap-2">
        <LanguageSwitcher />
        <button
          type="button"
          class="flex h-10 w-10 items-center justify-center rounded-full border border-themed text-muted hover:bg-gray-50 dark:hover:bg-gray-800"
          @click="ui.toggleDarkMode()"
          :aria-label="ui.darkMode ? 'Switch to light mode' : 'Switch to dark mode'"
        >
          <IconBase v-if="ui.darkMode" name="sun" :size="18" />
          <IconBase v-else name="moon" :size="18" />
        </button>

        <div class="relative" ref="notifRef">
          <button
            type="button"
            class="relative flex h-10 w-10 items-center justify-center rounded-full border border-themed text-muted hover:bg-gray-50 dark:hover:bg-gray-800"
            aria-label="Notifications"
            @click="notifOpen = !notifOpen"
          >
            <IconBase name="bell" :size="18" />
            <span class="absolute top-1.5 right-1.5 flex h-2 w-2">
              <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-error-400 opacity-75"></span>
              <span class="relative inline-flex h-2 w-2 rounded-full bg-error-500"></span>
            </span>
          </button>
          <div
            v-if="notifOpen"
            class="surface-card absolute right-0 mt-3 w-80 rounded-xl border shadow-theme-lg"
          >
            <div class="flex items-center justify-between border-b border-themed px-4 py-3">
              <p class="text-sm font-semibold text-heading">Notificações</p>
              <span class="rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-medium text-brand-600 dark:bg-brand-500/15 dark:text-brand-400">
                3 novas
              </span>
            </div>
            <ul class="max-h-72 overflow-y-auto divide-y divide-themed">
              <li v-for="n in notifications" :key="n.id" class="flex gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800">
                <span class="mt-1 flex h-2 w-2 shrink-0 rounded-full" :class="n.read ? 'bg-gray-300' : 'bg-brand-500'" />
                <div class="flex-1">
                  <p class="text-sm font-medium text-heading">{{ n.title }}</p>
                  <p class="text-xs text-muted">{{ n.time }}</p>
                </div>
              </li>
            </ul>
            <div class="border-t border-themed px-4 py-2">
              <button class="w-full text-center text-xs font-medium text-brand-500 hover:text-brand-600">
                Ver todas
              </button>
            </div>
          </div>
        </div>

        <div class="relative" ref="dropdownRef">
          <button
            type="button"
            class="ml-1 flex items-center gap-3"
            @click="dropdownOpen = !dropdownOpen"
          >
            <span class="hidden text-right lg:block">
              <span class="block text-sm font-medium text-heading">
                {{ auth.user?.name || 'Convidado' }}
              </span>
              <span class="block text-xs text-muted">
                {{ auth.user?.role || '—' }}
              </span>
            </span>
            <span class="flex h-10 w-10 items-center justify-center rounded-full bg-brand-500 font-semibold text-white">
              {{ initials }}
            </span>
            <IconBase name="chevron-down" :size="16" class="text-muted" />
          </button>

          <div
            v-if="dropdownOpen"
            class="surface-card absolute right-0 mt-3 w-56 rounded-xl border shadow-theme-lg"
          >
            <div class="border-b border-themed px-4 py-3">
              <p class="text-sm font-medium text-heading">
                {{ auth.user?.name || 'Convidado' }}
              </p>
              <p class="text-xs text-muted">{{ auth.user?.email || '' }}</p>
            </div>
            <ul class="py-1">
              <li>
                <RouterLink
                  to="/profile"
                  class="flex items-center gap-2 px-4 py-2 text-sm text-body hover:bg-gray-50 dark:hover:bg-gray-800"
                  @click="dropdownOpen = false"
                >
                  <IconBase name="user" :size="16" /> Meu perfil
                </RouterLink>
              </li>
              <li>
                <RouterLink
                  to="/settings"
                  class="flex items-center gap-2 px-4 py-2 text-sm text-body hover:bg-gray-50 dark:hover:bg-gray-800"
                  @click="dropdownOpen = false"
                >
                  <IconBase name="settings" :size="16" /> Configurações
                </RouterLink>
              </li>
              <li>
                <button
                  type="button"
                  class="flex w-full items-center gap-2 px-4 py-2 text-sm text-body hover:bg-gray-50 dark:hover:bg-gray-800"
                  @click="openCookies"
                >
                  <IconBase name="cookie" :size="16" /> Preferências de cookies
                </button>
              </li>
            </ul>
            <div class="border-t border-themed py-1">
              <button
                type="button"
                class="flex w-full items-center gap-2 px-4 py-2 text-sm text-error-600 hover:bg-error-50 dark:hover:bg-error-500/10"
                @click="handleLogout"
              >
                <IconBase name="logout" :size="16" /> Sair
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUiStore } from '@/stores/ui'
import { useAuthStore } from '@/stores/auth'
import IconBase from '@/components/ui/IconBase.vue'
import LanguageSwitcher from '@/components/ui/LanguageSwitcher.vue'

const ui = useUiStore()
const auth = useAuthStore()
const router = useRouter()

const dropdownOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)
const notifOpen = ref(false)
const notifRef = ref<HTMLElement | null>(null)

const notifications = [
  { id: 1, title: 'Novo pedido #00231 recebido', time: 'Há 5 min', read: false },
  { id: 2, title: 'Pagamento confirmado de Marina Costa', time: 'Há 32 min', read: false },
  { id: 3, title: 'Pedro Alves se cadastrou', time: 'Há 1 hora', read: false },
  { id: 4, title: 'Backup semanal concluído', time: 'Ontem', read: true },
]

const initials = computed(() => {
  if (!auth.user) return '?'
  return auth.user.name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join('')
})

function toggleSidebar() {
  if (window.innerWidth < 1024) ui.toggleSidebarMobile()
  else ui.toggleSidebar()
}

function openCookies() {
  dropdownOpen.value = false
  ui.openCookieBanner()
}

function handleLogout() {
  auth.logout()
  router.push({ name: 'login' })
  dropdownOpen.value = false
}

function handleClickOutside(e: MouseEvent) {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target as Node)) {
    dropdownOpen.value = false
  }
  if (notifRef.value && !notifRef.value.contains(e.target as Node)) {
    notifOpen.value = false
  }
}

onMounted(() => document.addEventListener('click', handleClickOutside))
onUnmounted(() => document.removeEventListener('click', handleClickOutside))
</script>
