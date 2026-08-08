<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-title-sm font-bold text-heading">Configurações</h1>
      <p class="mt-1 text-sm text-muted">Personalize a aparência, layout e preferências da conta.</p>
    </div>

    <div class="grid grid-cols-1 gap-6 xl:grid-cols-3">
      <div class="xl:col-span-2 space-y-6">
        <CardComponent title="Aparência" subtitle="Tema, idioma e tamanho de fonte" icon="palette">
          <div class="space-y-5">
            <div>
              <label class="mb-2 block text-sm font-medium text-heading">Tema</label>
              <div class="flex gap-2">
                <button
                  type="button"
                  class="inline-flex h-10 items-center gap-2 rounded-lg border px-4 text-sm font-medium transition"
                  :class="!ui.darkMode
                    ? 'border-brand-500 bg-brand-50 text-brand-600 dark:bg-brand-500/15'
                    : 'border-themed text-body hover:bg-gray-50 dark:hover:bg-gray-800'"
                  @click="ui.setDarkMode(false)"
                >
                  <IconBase name="sun" :size="16" /> Claro
                </button>
                <button
                  type="button"
                  class="inline-flex h-10 items-center gap-2 rounded-lg border px-4 text-sm font-medium transition"
                  :class="ui.darkMode
                    ? 'border-brand-500 bg-brand-50 text-brand-600 dark:bg-brand-500/15'
                    : 'border-themed text-body hover:bg-gray-50 dark:hover:bg-gray-800'"
                  @click="ui.setDarkMode(true)"
                >
                  <IconBase name="moon" :size="16" /> Escuro
                </button>
              </div>
            </div>

            <div class="border-t border-themed pt-5">
              <label class="mb-2 block text-sm font-medium text-heading">Tamanho da fonte</label>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="size in fontSizes"
                  :key="size.value"
                  type="button"
                  class="inline-flex h-10 items-center gap-2 rounded-lg border px-4 text-sm font-medium transition"
                  :class="ui.fontSize === size.value
                    ? 'border-brand-500 bg-brand-50 text-brand-600 dark:bg-brand-500/15'
                    : 'border-themed text-body hover:bg-gray-50 dark:hover:bg-gray-800'"
                  @click="ui.setFontSize(size.value)"
                >
                  {{ size.label }}
                </button>
              </div>
            </div>
          </div>
        </CardComponent>

        <CardComponent title="Paletas de cores" subtitle="Aplique um conjunto pré-definido" icon="palette">
          <div class="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <button
              v-for="(p, idx) in PALETTES"
              :key="p.name"
              type="button"
              class="group overflow-hidden rounded-xl border-2 text-left transition"
              :class="activePaletteIdx === idx
                ? 'border-brand-500 shadow-theme-md'
                : 'border-themed hover:border-brand-300 hover:shadow-theme-sm'"
              @click="applyPalette(idx)"
            >
              <div class="flex h-16">
                <div class="flex-1 flex items-center justify-center" :style="{ background: p.vars['--color-brand-500'] }">
                  <IconBase v-if="activePaletteIdx === idx" name="check" :size="20" class="text-white" :stroke-width="2.5" />
                </div>
                <div class="flex w-6 flex-col justify-center gap-1 px-1.5" :style="{ background: p.vars['--tx-sidebar-bg'] || '#1a2231' }">
                  <span v-for="i in 3" :key="i" class="block h-[3px] rounded-sm bg-white/30" />
                </div>
              </div>
              <div class="bg-card-bg px-2 py-1.5 text-center text-xs font-medium text-heading" style="background: var(--tx-card-bg)">
                {{ p.name }}
              </div>
            </button>
          </div>
        </CardComponent>

        <CardComponent title="Personalização avançada" subtitle="Ajuste cada cor individualmente" icon="settings">
          <div class="space-y-5">
            <div v-for="group in themeGroups" :key="group.title">
              <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-muted">
                {{ group.title }}
              </p>
              <div class="space-y-2">
                <div
                  v-for="def in group.vars"
                  :key="def.key"
                  class="flex items-center gap-3 rounded-lg border border-themed px-3 py-2"
                >
                  <span class="flex-1 text-sm text-heading">{{ def.label }}</span>
                  <span
                    class="h-5 w-5 shrink-0 rounded-md border border-themed"
                    :style="{ background: ui.getThemeVar(def.key) }"
                  />
                  <input
                    type="color"
                    :value="ui.getThemeVar(def.key)"
                    class="h-8 w-10"
                    @input="onColorChange(def.key, $event)"
                  />
                  <code class="hidden text-xs text-muted sm:inline">{{ ui.getThemeVar(def.key) }}</code>
                </div>
              </div>
            </div>

            <div class="flex items-center gap-3 border-t border-themed pt-4">
              <button
                type="button"
                class="inline-flex h-9 items-center gap-1.5 rounded-lg border border-themed px-3 text-xs font-medium text-body hover:bg-gray-50 dark:hover:bg-gray-800"
                @click="resetTheme"
              >
                <IconBase name="reset" :size="14" /> Restaurar padrões
              </button>
              <span class="text-xs text-muted">
                Remove todas as customizações e restaura as cores originais
              </span>
            </div>
          </div>
        </CardComponent>

        <CardComponent title="Layout" subtitle="Ajustes do menu lateral" icon="grid">
          <div class="space-y-5">
            <div>
              <div class="mb-2 flex items-center justify-between">
                <label class="text-sm font-medium text-heading">Largura do menu</label>
                <span class="rounded-md bg-brand-50 px-2 py-0.5 text-xs font-semibold text-brand-600 dark:bg-brand-500/15 dark:text-brand-400">
                  {{ ui.sidebarWidth }}px
                </span>
              </div>
              <input
                type="range"
                min="200"
                max="360"
                step="5"
                :value="ui.sidebarWidth"
                class="w-full"
                @input="(e) => ui.setSidebarWidth(Number((e.target as HTMLInputElement).value))"
              />
              <div class="mt-1 flex justify-between text-xs text-muted">
                <span>200px</span>
                <span>360px</span>
              </div>
            </div>

            <div class="flex items-center justify-between rounded-lg border border-themed p-4">
              <div>
                <p class="text-sm font-medium text-heading">Menu compacto</p>
                <p class="text-xs text-muted">Mostra apenas ícones</p>
              </div>
              <SwitchToggle :model-value="ui.sidebarCollapsed" @update:model-value="ui.toggleSidebar()" />
            </div>
          </div>
        </CardComponent>

        <CardComponent title="Conta" subtitle="Informações pessoais" icon="user">
          <form @submit.prevent="saveAccount" class="space-y-4">
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label class="mb-2 block text-sm font-medium text-heading">Nome</label>
                <input
                  v-model="accountForm.name"
                  type="text"
                  class="h-11 w-full rounded-lg border border-themed bg-white px-3 text-sm text-body outline-none focus:border-brand-300 focus-ring dark:bg-gray-900"
                />
              </div>
              <div>
                <label class="mb-2 block text-sm font-medium text-heading">Email</label>
                <input
                  v-model="accountForm.email"
                  type="email"
                  class="h-11 w-full rounded-lg border border-themed bg-white px-3 text-sm text-body outline-none focus:border-brand-300 focus-ring dark:bg-gray-900"
                />
              </div>
              <div>
                <label class="mb-2 block text-sm font-medium text-heading">Nova senha</label>
                <input
                  v-model="accountForm.newPassword"
                  type="password"
                  placeholder="Deixe em branco para manter"
                  class="h-11 w-full rounded-lg border border-themed bg-white px-3 text-sm text-body outline-none focus:border-brand-300 focus-ring dark:bg-gray-900"
                />
              </div>
              <div>
                <label class="mb-2 block text-sm font-medium text-heading">Confirmar senha</label>
                <input
                  v-model="accountForm.confirmPassword"
                  type="password"
                  placeholder="Confirme a nova senha"
                  class="h-11 w-full rounded-lg border border-themed bg-white px-3 text-sm text-body outline-none focus:border-brand-300 focus-ring dark:bg-gray-900"
                />
              </div>
            </div>
            <div class="flex justify-end gap-2 border-t border-themed pt-4">
              <button type="submit" :disabled="saving" class="inline-flex h-10 items-center gap-2 rounded-lg bg-brand-500 px-4 text-sm font-medium text-white shadow-theme-xs hover:bg-brand-600 disabled:opacity-60">
                <IconBase v-if="!saving" name="check" :size="16" />
                <span v-if="saving" class="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                {{ saving ? 'Salvando...' : 'Salvar' }}
              </button>
            </div>
          </form>
        </CardComponent>
      </div>

      <div class="space-y-6">
        <CardComponent title="Preview do tema" icon="eye">
          <div class="overflow-hidden rounded-xl border border-themed">
            <div class="flex h-32">
              <div class="flex w-12 flex-col gap-1.5 p-2" :style="{ background: ui.getThemeVar('--tx-sidebar-bg') }">
                <span class="block h-2 rounded-sm" :style="{ background: ui.getThemeVar('--color-brand-500') }" />
                <span class="block h-2 rounded-sm bg-white/20" />
                <span class="block h-2 rounded-sm bg-white/20" />
                <span class="block h-2 rounded-sm bg-white/20" />
              </div>
              <div class="flex-1" :style="{ background: ui.getThemeVar('--tx-body-bg') }">
                <div class="h-6 border-b" :style="{ background: ui.getThemeVar('--tx-header-bg'), borderColor: ui.getThemeVar('--tx-border') }" />
                <div class="flex gap-1.5 p-2">
                  <div class="flex-1 rounded-md p-1" :style="{ background: ui.getThemeVar('--tx-card-bg') }">
                    <span class="block h-1 rounded-sm" :style="{ background: ui.getThemeVar('--color-brand-500') }" />
                    <span class="mt-1 block h-1 w-2/3 rounded-sm" :style="{ background: ui.getThemeVar('--tx-text-muted') }" />
                  </div>
                  <div class="flex-1 rounded-md p-1" :style="{ background: ui.getThemeVar('--tx-card-bg') }">
                    <span class="block h-1 rounded-sm" :style="{ background: ui.getThemeVar('--color-success-500') }" />
                    <span class="mt-1 block h-1 w-2/3 rounded-sm" :style="{ background: ui.getThemeVar('--tx-text-muted') }" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <dl class="mt-4 space-y-2 text-xs">
            <div class="flex justify-between">
              <dt class="text-muted">Largura do menu</dt>
              <dd class="font-semibold text-heading">{{ ui.sidebarWidth }}px</dd>
            </div>
            <div class="flex justify-between">
              <dt class="text-muted">Estado</dt>
              <dd class="font-semibold text-heading">{{ ui.sidebarCollapsed ? 'Compacto' : 'Expandido' }}</dd>
            </div>
            <div class="flex justify-between">
              <dt class="text-muted">Tema</dt>
              <dd class="font-semibold text-heading">{{ ui.darkMode ? 'Escuro' : 'Claro' }}</dd>
            </div>
            <div class="flex justify-between">
              <dt class="text-muted">Fonte base</dt>
              <dd class="font-semibold text-heading">{{ fontSizeLabel }}</dd>
            </div>
          </dl>
        </CardComponent>

        <CardComponent title="Cookies" icon="cookie">
          <div class="text-sm text-body">
            <p class="mb-3">
              Status:
              <span :class="ui.cookiesAccepted ? 'text-success-600' : 'text-warning-600'" class="font-semibold">
                {{ ui.cookiesAccepted ? 'Aceitos' : 'Não aceitos' }}
              </span>
            </p>
            <button
              type="button"
              class="inline-flex h-9 items-center gap-1.5 rounded-lg border border-themed px-3 text-xs font-medium text-body hover:bg-gray-50 dark:hover:bg-gray-800"
              @click="ui.openCookieBanner()"
            >
              Reabrir banner
            </button>
          </div>
        </CardComponent>

        <CardComponent title="Sobre o template" icon="info">
          <ul class="space-y-2 text-sm text-body">
            <li><strong class="text-heading">Vue 3</strong> + Composition API</li>
            <li><strong class="text-heading">Foundation Sites 6</strong> com <code class="text-xs">SCSS</code></li>
            <li><strong class="text-heading">Pinia</strong> + Vue Router 4</li>
            <li><strong class="text-heading">Vite 6</strong> + TypeScript 5</li>
          </ul>
        </CardComponent>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useUiStore } from '@/stores/ui'
import { useAuthStore } from '@/stores/auth'
import CardComponent from '@/components/ui/CardComponent.vue'
import IconBase from '@/components/ui/IconBase.vue'
import SwitchToggle from '@/components/ui/SwitchToggle.vue'

const ui = useUiStore()
const auth = useAuthStore()
onMounted(() => ui.setPageTitle('Configurações'))

const fontSizes = [
  { value: 'sm' as const, label: 'Pequena' },
  { value: 'base' as const, label: 'Normal' },
  { value: 'lg' as const, label: 'Grande' },
  { value: 'xl' as const, label: 'Extra' },
]

const fontSizeLabel = computed(() => fontSizes.find((f) => f.value === ui.fontSize)?.label ?? 'Normal')

interface Palette {
  name: string
  vars: Record<string, string>
}

// Every palette MUST define ALL sidebar tokens so switching palettes resets
// state from the previously selected palette (e.g. Esmeralda → Indigo should
// restore --tx-sidebar-text to the default dark color).
const PALETTES: Palette[] = [
  {
    name: 'Indigo (padrão)',
    vars: {
      '--color-brand-500': '#465fff',
      '--color-brand-600': '#3641f5',
      '--tx-sidebar-bg': '#ffffff',
      '--tx-sidebar-active-bg': '#ecf3ff',
      '--tx-sidebar-text': '#475467',
      '--tx-sidebar-text-active': '#465fff',
    },
  },
  {
    name: 'Esmeralda',
    vars: {
      '--color-brand-500': '#10b981',
      '--color-brand-600': '#059669',
      '--tx-sidebar-bg': '#0f3a2e',
      '--tx-sidebar-active-bg': 'rgba(16,185,129,0.18)',
      '--tx-sidebar-text': '#a7f3d0',
      '--tx-sidebar-text-active': '#ffffff',
    },
  },
  {
    name: 'Violeta',
    vars: {
      '--color-brand-500': '#8b5cf6',
      '--color-brand-600': '#7c3aed',
      '--tx-sidebar-bg': '#1e1b4b',
      '--tx-sidebar-active-bg': 'rgba(139,92,246,0.2)',
      '--tx-sidebar-text': '#c4b5fd',
      '--tx-sidebar-text-active': '#ffffff',
    },
  },
  {
    name: 'Tangerina',
    vars: {
      '--color-brand-500': '#f97316',
      '--color-brand-600': '#ea580c',
      '--tx-sidebar-bg': '#1c1917',
      '--tx-sidebar-active-bg': 'rgba(249,115,22,0.18)',
      '--tx-sidebar-text': '#fdba74',
      '--tx-sidebar-text-active': '#ffffff',
    },
  },
  {
    name: 'Rosa',
    vars: {
      '--color-brand-500': '#ec4899',
      '--color-brand-600': '#db2777',
      '--tx-sidebar-bg': '#2d1b35',
      '--tx-sidebar-active-bg': 'rgba(236,72,153,0.2)',
      '--tx-sidebar-text': '#f9a8d4',
      '--tx-sidebar-text-active': '#ffffff',
    },
  },
  {
    name: 'Ciano',
    vars: {
      '--color-brand-500': '#06b6d4',
      '--color-brand-600': '#0891b2',
      '--tx-sidebar-bg': '#083344',
      '--tx-sidebar-active-bg': 'rgba(6,182,212,0.2)',
      '--tx-sidebar-text': '#a5f3fc',
      '--tx-sidebar-text-active': '#ffffff',
    },
  },
]

const activePaletteIdx = ref(-1)

function applyPalette(idx: number) {
  activePaletteIdx.value = idx
  for (const [key, val] of Object.entries(PALETTES[idx].vars)) {
    ui.setThemeVar(key, val)
  }
  ui.notifySuccess(`Paleta "${PALETTES[idx].name}" aplicada`)
}

const themeGroups = [
  {
    title: 'Cores principais',
    vars: [
      { key: '--color-brand-500', label: 'Primária' },
      { key: '--color-success-500', label: 'Sucesso' },
      { key: '--color-warning-500', label: 'Aviso' },
      { key: '--color-error-500', label: 'Perigo' },
      { key: '--color-blue-light-500', label: 'Info' },
    ],
  },
  {
    title: 'Menu lateral',
    vars: [
      { key: '--tx-sidebar-bg', label: 'Fundo' },
      { key: '--tx-sidebar-text', label: 'Texto' },
      { key: '--tx-sidebar-active-bg', label: 'Fundo ativo' },
    ],
  },
  {
    title: 'Layout',
    vars: [
      { key: '--tx-body-bg', label: 'Fundo da página' },
      { key: '--tx-card-bg', label: 'Cards' },
      { key: '--tx-header-bg', label: 'Header' },
      { key: '--tx-border', label: 'Bordas' },
    ],
  },
  {
    title: 'Tipografia',
    vars: [
      { key: '--tx-text-heading', label: 'Títulos' },
      { key: '--tx-text', label: 'Texto principal' },
      { key: '--tx-text-muted', label: 'Texto secundário' },
    ],
  },
]

function onColorChange(key: string, e: Event) {
  activePaletteIdx.value = -1
  ui.setThemeVar(key, (e.target as HTMLInputElement).value)
}

function resetTheme() {
  ui.resetThemeVars()
  activePaletteIdx.value = -1
  ui.notify('Tema restaurado para os padrões', 'info')
}

const saving = ref(false)
const accountForm = reactive({
  name: auth.user?.name ?? '',
  email: auth.user?.email ?? '',
  newPassword: '',
  confirmPassword: '',
})

async function saveAccount() {
  if (accountForm.newPassword && accountForm.newPassword !== accountForm.confirmPassword) {
    ui.notifyError('As senhas não coincidem')
    return
  }
  saving.value = true
  await new Promise((r) => setTimeout(r, 600))
  if (auth.user) {
    auth.user.name = accountForm.name
    auth.user.email = accountForm.email
  }
  saving.value = false
  accountForm.newPassword = ''
  accountForm.confirmPassword = ''
  ui.notifySuccess('Configurações salvas com sucesso')
}
</script>
