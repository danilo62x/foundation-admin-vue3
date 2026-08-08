<template>
  <aside
    :style="{ width: ui.sidebarStyleWidth }"
    :class="[
      'surface-sidebar fixed left-0 top-0 z-50 flex h-screen flex-col overflow-y-hidden border-r px-4 lg:static lg:translate-x-0',
      ui.sidebarMobileOpen ? 'translate-x-0' : '-translate-x-full',
      dragging ? 'transition-none select-none' : 'transition-[transform,width] duration-300',
    ]"
  >
    <div
      v-if="!ui.sidebarCollapsed"
      class="group/handle absolute right-0 top-0 hidden h-full w-1.5 cursor-ew-resize lg:block"
      :class="dragging && 'bg-brand-500/40'"
      @mousedown="startDrag"
      @dblclick="ui.setSidebarWidth(290)"
      title="Arraste para redimensionar • Duplo clique para resetar"
    >
      <span
        class="absolute right-0 top-1/2 h-12 w-1 -translate-y-1/2 rounded-l-full transition-all"
        :class="dragging ? 'bg-brand-500' : 'bg-transparent group-hover/handle:bg-brand-400'"
      />
    </div>
    <div
      :class="[
        'flex items-center pt-7 pb-6',
        ui.sidebarCollapsed ? 'justify-center' : 'justify-between',
      ]"
    >
      <RouterLink to="/dashboard" class="flex items-center gap-2.5">
        <span class="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-500 text-white shadow-theme-sm">
          <span class="font-bold">A</span>
        </span>
        <span v-if="!ui.sidebarCollapsed" data-brand-text class="text-lg font-semibold">
          Admin
        </span>
      </RouterLink>
      <button
        v-if="!ui.sidebarCollapsed"
        type="button"
        class="is-sidebar-inactive hidden h-8 w-8 items-center justify-center rounded-lg border border-themed lg:flex"
        @click="ui.toggleSidebar()"
        title="Recolher menu"
      >
        <IconBase name="chevron-right" :size="14" class="rotate-180" />
      </button>
    </div>

    <div class="flex flex-col gap-4 overflow-y-auto no-scrollbar pb-4">
      <nav v-for="section in menu.sections" :key="section.title">
        <h3
          v-if="!ui.sidebarCollapsed"
          class="mb-2 px-2 text-[11px] font-semibold uppercase tracking-wider"
        >
          {{ section.title }}
        </h3>
        <ul class="flex flex-col gap-1">
          <li v-for="item in section.items" :key="item.label">
            <RouterLink
              v-if="item.href"
              :to="item.href"
              :class="navLinkClass(isActive(item.href))"
              :title="ui.sidebarCollapsed ? item.label : undefined"
            >
              <IconBase :name="item.icon" :size="20" />
              <span v-if="!ui.sidebarCollapsed" class="flex-1">{{ item.label }}</span>
              <span
                v-if="item.badge && !ui.sidebarCollapsed"
                class="rounded-full bg-brand-500/15 px-1.5 text-[10px] font-semibold text-brand-500"
              >
                {{ item.badge }}
              </span>
            </RouterLink>

            <div v-else-if="item.children">
              <button
                type="button"
                :class="navLinkClass(isGroupActive(item))"
                @click="toggleGroup(item.label)"
                :title="ui.sidebarCollapsed ? item.label : undefined"
              >
                <IconBase :name="item.icon" :size="20" />
                <span v-if="!ui.sidebarCollapsed" class="flex-1 text-left">{{ item.label }}</span>
                <IconBase
                  v-if="!ui.sidebarCollapsed"
                  name="chevron-down"
                  :size="14"
                  :class="['transition-transform', isGroupOpen(item.label) && 'rotate-180']"
                />
              </button>
              <Transition name="collapse">
                <ul
                  v-if="isGroupOpen(item.label) && !ui.sidebarCollapsed"
                  class="mt-1 ml-3 flex flex-col gap-1 border-l border-themed pl-3"
                >
                  <li v-for="child in item.children" :key="child.label">
                    <RouterLink
                      v-if="child.href"
                      :to="child.href"
                      :class="navLinkClass(isActive(child.href), true)"
                    >
                      <span class="flex-1">{{ child.label }}</span>
                    </RouterLink>
                  </li>
                </ul>
              </Transition>
            </div>
          </li>
        </ul>
      </nav>
    </div>

    <div class="mt-auto border-t border-themed py-4">
      <button
        type="button"
        :class="navLinkClass(false)"
        :title="ui.sidebarCollapsed ? 'Sair' : undefined"
        @click="handleLogout"
      >
        <IconBase name="logout" :size="20" />
        <span v-if="!ui.sidebarCollapsed">Sair</span>
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUiStore } from '@/stores/ui'
import { useMenuStore, type MenuItem } from '@/stores/menu'
import { useAuthStore } from '@/stores/auth'
import IconBase from '@/components/ui/IconBase.vue'

const ui = useUiStore()
const menu = useMenuStore()
const auth = useAuthStore()
const route = useRoute()
const router = useRouter()

const openGroups = ref<Set<string>>(new Set())
const dragging = ref(false)
let rafId = 0
let pendingWidth = 0

function startDrag(e: MouseEvent) {
  if (ui.sidebarCollapsed) return
  e.preventDefault()
  dragging.value = true
  document.body.style.cursor = 'ew-resize'
  document.addEventListener('mousemove', onDrag)
  document.addEventListener('mouseup', stopDrag, { once: true })
}

function onDrag(e: MouseEvent) {
  pendingWidth = e.clientX
  if (rafId) return
  rafId = requestAnimationFrame(() => {
    ui.setSidebarWidth(pendingWidth)
    rafId = 0
  })
}

function stopDrag() {
  dragging.value = false
  document.body.style.cursor = ''
  document.removeEventListener('mousemove', onDrag)
  if (rafId) {
    cancelAnimationFrame(rafId)
    rafId = 0
  }
}

function isActive(href: string): boolean {
  return route.path === href || route.path.startsWith(href + '/')
}

function isGroupActive(item: MenuItem): boolean {
  if (!item.children) return false
  return item.children.some((c) => c.href && isActive(c.href))
}

function isGroupOpen(label: string): boolean {
  return openGroups.value.has(label)
}

function toggleGroup(label: string) {
  if (openGroups.value.has(label)) openGroups.value.delete(label)
  else openGroups.value.add(label)
}

function autoOpenActiveGroups() {
  for (const section of menu.sections) {
    for (const item of section.items) {
      if (item.children && isGroupActive(item)) {
        openGroups.value.add(item.label)
      }
    }
  }
}

function navLinkClass(active: boolean, child = false) {
  const base = [
    'group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
    ui.sidebarCollapsed && !child && 'justify-center',
    child ? 'py-1.5' : '',
  ]
  return active ? [...base, 'is-sidebar-active'] : [...base, 'is-sidebar-inactive']
}

function handleLogout() {
  auth.logout()
  router.push({ name: 'login' })
}

onMounted(autoOpenActiveGroups)
watch(() => route.path, autoOpenActiveGroups)
onUnmounted(() => {
  document.removeEventListener('mousemove', onDrag)
  document.body.style.cursor = ''
})
</script>

<style scoped>
.collapse-enter-active,
.collapse-leave-active {
  transition: opacity 0.18s ease, max-height 0.22s ease;
  overflow: hidden;
  max-height: 400px;
}
.collapse-enter-from,
.collapse-leave-to {
  opacity: 0;
  max-height: 0;
}
</style>
