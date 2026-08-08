import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

export interface Toast {
  id: number
  message: string
  type: ToastType
  duration: number
}

let toastId = 0

export const THEME_DEFAULTS: Record<string, string> = {
  // Brand palette (mapped to --color-brand-* CSS vars)
  '--color-brand-500': '#465fff',
  '--color-brand-600': '#3641f5',
  '--color-brand-700': '#2a31d8',

  // Status colors
  '--color-success-500': '#12b76a',
  '--color-warning-500': '#f79009',
  '--color-error-500': '#f04438',
  '--color-blue-light-500': '#0ba5ec',

  // Sidebar palette (custom — referenced via inline styles)
  '--tx-sidebar-bg': '#ffffff',
  '--tx-sidebar-bg-dark': '#1a2231',
  '--tx-sidebar-text': '#475467',
  '--tx-sidebar-text-active': '#465fff',
  '--tx-sidebar-active-bg': '#ecf3ff',

  // Layout
  '--tx-body-bg': '#f9fafb',
  '--tx-body-bg-dark': '#101828',
  '--tx-card-bg': '#ffffff',
  '--tx-card-bg-dark': '#1a2231',
  '--tx-header-bg': '#ffffff',
  '--tx-header-bg-dark': '#1a2231',
  '--tx-border': '#e4e7ec',
  '--tx-border-dark': '#1f2937',

  // Text
  '--tx-text': '#344054',
  '--tx-text-dark': '#d0d5dd',
  '--tx-text-heading': '#101828',
  '--tx-text-heading-dark': '#f9fafb',
  '--tx-text-muted': '#667085',
  '--tx-text-muted-dark': '#98a2b3',
}

export const useUiStore = defineStore(
  'ui',
  () => {
    const darkMode = ref(false)
    const sidebarCollapsed = ref(false)
    const sidebarMobileOpen = ref(false)
    const sidebarWidth = ref(290)
    const pageTitle = ref('Dashboard')
    const toasts = ref<Toast[]>([])
    const fontSize = ref<'sm' | 'base' | 'lg' | 'xl'>('base')

    const customTheme = ref<Record<string, string>>({})

    const cookiesAccepted = ref(false)
    const showCookieBanner = ref(false)

    const sidebarStyleWidth = computed(() =>
      sidebarCollapsed.value ? '90px' : `${sidebarWidth.value}px`
    )

    function toggleDarkMode() {
      darkMode.value = !darkMode.value
      applyTheme()
    }

    function setDarkMode(val: boolean) {
      darkMode.value = val
      applyTheme()
    }

    function applyTheme() {
      const root = document.documentElement
      if (darkMode.value) root.classList.add('dark')
      else root.classList.remove('dark')

      for (const [key, val] of Object.entries(customTheme.value)) {
        root.style.setProperty(key, val)
      }
      applyFontSize()
    }

    function setThemeVar(key: string, val: string) {
      customTheme.value[key] = val
      document.documentElement.style.setProperty(key, val)
    }

    function resetThemeVars() {
      for (const key of Object.keys(customTheme.value)) {
        document.documentElement.style.removeProperty(key)
      }
      customTheme.value = {}
    }

    function getThemeVar(key: string): string {
      return customTheme.value[key] ?? THEME_DEFAULTS[key] ?? '#000000'
    }

    function applyFontSize() {
      const sizes: Record<string, string> = {
        sm: '13px',
        base: '14px',
        lg: '15px',
        xl: '16px',
      }
      document.documentElement.style.fontSize = sizes[fontSize.value] ?? '14px'
    }

    function setFontSize(size: 'sm' | 'base' | 'lg' | 'xl') {
      fontSize.value = size
      applyFontSize()
    }

    function toggleSidebar() {
      sidebarCollapsed.value = !sidebarCollapsed.value
    }

    function setSidebarWidth(w: number) {
      sidebarWidth.value = Math.min(360, Math.max(200, w))
    }

    function toggleSidebarMobile(val?: boolean) {
      sidebarMobileOpen.value = val !== undefined ? val : !sidebarMobileOpen.value
    }

    function setPageTitle(title: string) {
      pageTitle.value = title
      document.title = title ? `${title} — Admin Template` : 'Admin Template'
    }

    function notify(message: string, type: ToastType = 'info', duration = 4000) {
      const id = ++toastId
      toasts.value.push({ id, message, type, duration })
      setTimeout(() => dismissToast(id), duration)
    }

    function notifySuccess(message: string) {
      notify(message, 'success')
    }
    function notifyError(message: string) {
      notify(message, 'error')
    }
    function notifyWarning(message: string) {
      notify(message, 'warning')
    }

    function dismissToast(id: number) {
      const idx = toasts.value.findIndex((t) => t.id === id)
      if (idx !== -1) toasts.value.splice(idx, 1)
    }

    function acceptCookies() {
      cookiesAccepted.value = true
      showCookieBanner.value = false
    }
    function declineCookies() {
      cookiesAccepted.value = false
      showCookieBanner.value = false
    }
    function openCookieBanner() {
      showCookieBanner.value = true
    }
    function closeCookieBanner() {
      showCookieBanner.value = false
    }

    return {
      darkMode,
      sidebarCollapsed,
      sidebarMobileOpen,
      sidebarWidth,
      sidebarStyleWidth,
      pageTitle,
      toasts,
      fontSize,
      customTheme,
      cookiesAccepted,
      showCookieBanner,
      toggleDarkMode,
      setDarkMode,
      applyTheme,
      setThemeVar,
      resetThemeVars,
      getThemeVar,
      setFontSize,
      applyFontSize,
      toggleSidebar,
      setSidebarWidth,
      toggleSidebarMobile,
      setPageTitle,
      notify,
      notifySuccess,
      notifyError,
      notifyWarning,
      dismissToast,
      acceptCookies,
      declineCookies,
      openCookieBanner,
      closeCookieBanner,
    }
  },
  {
    persist: {
      pick: [
        'darkMode',
        'sidebarCollapsed',
        'sidebarWidth',
        'customTheme',
        'cookiesAccepted',
        'fontSize',
      ],
    },
  }
)
