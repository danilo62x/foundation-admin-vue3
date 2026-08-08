<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-title-sm font-bold text-heading">Componentes</h1>
      <p class="mt-1 text-sm text-muted">Biblioteca completa de UI: botões, badges, alertas, modais e mais.</p>
    </div>

    <CardComponent title="Botões" subtitle="Variações de cor, tamanho e estado" icon="grid">
      <div class="flex flex-wrap gap-3">
        <button class="inline-flex h-10 items-center gap-2 rounded-lg bg-brand-500 px-4 text-sm font-medium text-white shadow-theme-xs hover:bg-brand-600">
          Primário
        </button>
        <button class="inline-flex h-10 items-center gap-2 rounded-lg border border-themed bg-card-bg px-4 text-sm font-medium text-body hover:bg-gray-50 dark:hover:bg-gray-800 surface-card">
          Secundário
        </button>
        <button class="inline-flex h-10 items-center gap-2 rounded-lg bg-success-500 px-4 text-sm font-medium text-white shadow-theme-xs hover:bg-success-600">
          Sucesso
        </button>
        <button class="inline-flex h-10 items-center gap-2 rounded-lg bg-warning-500 px-4 text-sm font-medium text-white shadow-theme-xs hover:bg-warning-600">
          Aviso
        </button>
        <button class="inline-flex h-10 items-center gap-2 rounded-lg bg-error-500 px-4 text-sm font-medium text-white shadow-theme-xs hover:bg-error-600">
          Perigo
        </button>
        <button class="inline-flex h-10 items-center gap-2 rounded-lg text-sm font-medium text-brand-500 hover:bg-brand-50 dark:hover:bg-brand-500/15">
          Ghost
        </button>
        <button class="inline-flex h-10 items-center gap-2 rounded-lg border-2 border-dashed border-gray-300 px-4 text-sm font-medium text-muted hover:border-brand-300 hover:text-brand-500 dark:border-gray-700">
          <IconBase name="plus" :size="16" /> Tracejado
        </button>
        <button class="inline-flex h-10 items-center gap-2 rounded-lg bg-brand-500 px-4 text-sm font-medium text-white opacity-60" disabled>
          <span class="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          Carregando
        </button>
      </div>

      <div class="mt-5 flex flex-wrap items-center gap-3 border-t border-themed pt-5">
        <button class="inline-flex h-7 items-center rounded-md bg-brand-500 px-2.5 text-xs font-medium text-white">XS</button>
        <button class="inline-flex h-9 items-center rounded-lg bg-brand-500 px-3 text-sm font-medium text-white">SM</button>
        <button class="inline-flex h-10 items-center rounded-lg bg-brand-500 px-4 text-sm font-medium text-white">MD</button>
        <button class="inline-flex h-12 items-center rounded-lg bg-brand-500 px-5 text-base font-medium text-white">LG</button>
        <button class="inline-flex h-14 items-center rounded-lg bg-brand-500 px-6 text-lg font-medium text-white">XL</button>
      </div>

      <div class="mt-5 flex flex-wrap items-center gap-3 border-t border-themed pt-5">
        <div class="inline-flex rounded-lg border border-themed bg-card-bg p-0.5 surface-card">
          <button class="rounded-md bg-brand-500 px-3 py-1.5 text-xs font-medium text-white">Tab 1</button>
          <button class="rounded-md px-3 py-1.5 text-xs font-medium text-body hover:bg-gray-100 dark:hover:bg-gray-800">Tab 2</button>
          <button class="rounded-md px-3 py-1.5 text-xs font-medium text-body hover:bg-gray-100 dark:hover:bg-gray-800">Tab 3</button>
        </div>
        <span class="text-xs text-muted">Button group / tabs</span>
      </div>
    </CardComponent>

    <div class="grid grid-cols-1 gap-6 xl:grid-cols-2">
      <CardComponent title="Badges & Tags" icon="tag">
        <div class="space-y-4">
          <div class="flex flex-wrap gap-2">
            <span class="inline-flex rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-600 dark:bg-brand-500/15 dark:text-brand-400">Primário</span>
            <span class="inline-flex rounded-full bg-success-50 px-3 py-1 text-xs font-medium text-success-700 dark:bg-success-500/15 dark:text-success-500">Sucesso</span>
            <span class="inline-flex rounded-full bg-warning-50 px-3 py-1 text-xs font-medium text-warning-700 dark:bg-warning-500/15 dark:text-warning-500">Aviso</span>
            <span class="inline-flex rounded-full bg-error-50 px-3 py-1 text-xs font-medium text-error-600 dark:bg-error-500/15 dark:text-error-500">Perigo</span>
            <span class="inline-flex rounded-full bg-blue-light-50 px-3 py-1 text-xs font-medium text-blue-light-600 dark:bg-blue-light-500/15 dark:text-blue-light-500">Info</span>
            <span class="inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300">Neutro</span>
          </div>
          <div class="flex flex-wrap gap-2">
            <span class="inline-flex items-center gap-1 rounded-full bg-success-50 px-2.5 py-1 text-xs font-medium text-success-700 dark:bg-success-500/15">
              <span class="h-1.5 w-1.5 rounded-full bg-success-500" /> Online
            </span>
            <span class="inline-flex items-center gap-1 rounded-full bg-warning-50 px-2.5 py-1 text-xs font-medium text-warning-700 dark:bg-warning-500/15">
              <span class="h-1.5 w-1.5 rounded-full bg-warning-500" /> Pendente
            </span>
            <span class="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700 dark:bg-gray-800">
              <span class="h-1.5 w-1.5 rounded-full bg-gray-400" /> Offline
            </span>
          </div>
          <div class="flex flex-wrap gap-2">
            <span class="inline-flex h-7 items-center gap-1.5 rounded-md border border-brand-200 bg-brand-50 px-2 text-xs font-medium text-brand-700 dark:border-brand-500/30 dark:bg-brand-500/10">
              <IconBase name="star" :size="12" />
              Premium
            </span>
            <span class="inline-flex h-7 items-center rounded-md border border-themed bg-card-bg px-2 text-xs font-medium text-body surface-card">v2.0.0</span>
            <span class="inline-flex h-7 items-center gap-1 rounded-md bg-brand-500 px-2 text-xs font-medium text-white">
              <IconBase name="check" :size="12" :stroke-width="2.5" /> Verificado
            </span>
          </div>
        </div>
      </CardComponent>

      <CardComponent title="Avatares" icon="user">
        <div class="space-y-4">
          <div class="flex items-end gap-3">
            <span class="flex h-7 w-7 items-center justify-center rounded-full bg-brand-500 text-[10px] font-bold text-white">XS</span>
            <span class="flex h-9 w-9 items-center justify-center rounded-full bg-brand-500 text-xs font-bold text-white">SM</span>
            <span class="flex h-11 w-11 items-center justify-center rounded-full bg-brand-500 text-sm font-bold text-white">MD</span>
            <span class="flex h-14 w-14 items-center justify-center rounded-full bg-brand-500 text-base font-bold text-white">LG</span>
            <span class="flex h-16 w-16 items-center justify-center rounded-full bg-brand-500 text-lg font-bold text-white">XL</span>
          </div>

          <div class="flex -space-x-2">
            <span class="flex h-10 w-10 items-center justify-center rounded-full border-2 border-card-bg bg-brand-500 text-xs font-bold text-white surface-card" style="border-color: var(--tx-card-bg)">MC</span>
            <span class="flex h-10 w-10 items-center justify-center rounded-full border-2 bg-success-500 text-xs font-bold text-white" style="border-color: var(--tx-card-bg)">LP</span>
            <span class="flex h-10 w-10 items-center justify-center rounded-full border-2 bg-warning-500 text-xs font-bold text-white" style="border-color: var(--tx-card-bg)">AS</span>
            <span class="flex h-10 w-10 items-center justify-center rounded-full border-2 bg-error-500 text-xs font-bold text-white" style="border-color: var(--tx-card-bg)">RL</span>
            <span class="flex h-10 w-10 items-center justify-center rounded-full border-2 bg-gray-200 text-xs font-bold text-gray-700 dark:bg-gray-700 dark:text-gray-200" style="border-color: var(--tx-card-bg)">+5</span>
          </div>

          <div class="flex items-center gap-3">
            <div class="relative">
              <span class="flex h-12 w-12 items-center justify-center rounded-full bg-brand-500 font-bold text-white">DC</span>
              <span class="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 bg-success-500" style="border-color: var(--tx-card-bg)" />
            </div>
            <div>
              <p class="text-sm font-medium text-heading">Daniela Costa</p>
              <p class="text-xs text-muted">Online · Produto</p>
            </div>
          </div>
        </div>
      </CardComponent>
    </div>

    <CardComponent title="Barras de progresso" icon="chart">
      <div class="space-y-4">
        <div v-for="p in progressBars" :key="p.label">
          <div class="mb-1.5 flex items-center justify-between text-xs">
            <span class="font-medium text-heading">{{ p.label }}</span>
            <span class="text-muted">{{ p.value }}%</span>
          </div>
          <div class="h-2 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
            <div class="h-full rounded-full transition-all" :style="{ width: p.value + '%', background: p.color }" />
          </div>
        </div>
        <div class="border-t border-themed pt-4">
          <p class="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">Variações circulares</p>
          <div class="flex gap-6">
            <div v-for="c in [25, 60, 88]" :key="c" class="flex flex-col items-center">
              <svg width="80" height="80" viewBox="0 0 80 80">
                <circle cx="40" cy="40" r="32" fill="none" stroke="var(--tx-border)" stroke-width="6" />
                <circle
                  cx="40"
                  cy="40"
                  r="32"
                  fill="none"
                  stroke="var(--color-brand-500)"
                  stroke-width="6"
                  stroke-linecap="round"
                  :stroke-dasharray="`${(c / 100) * 201} 201`"
                  transform="rotate(-90 40 40)"
                />
                <text x="40" y="45" text-anchor="middle" font-size="14" font-weight="700" fill="var(--tx-text-heading)">{{ c }}%</text>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </CardComponent>

    <CardComponent title="Alertas" icon="info">
      <div class="space-y-3">
        <div class="flex items-start gap-3 rounded-lg border border-success-200 bg-success-50 p-4 dark:border-success-500/30 dark:bg-success-500/10">
          <IconBase name="check" :size="20" class="shrink-0 text-success-600" :stroke-width="2.5" />
          <div class="flex-1">
            <p class="text-sm font-medium text-success-800 dark:text-success-300">Operação concluída</p>
            <p class="text-sm text-success-700 dark:text-success-400">As alterações foram salvas com sucesso.</p>
          </div>
        </div>
        <div class="flex items-start gap-3 rounded-lg border border-warning-200 bg-warning-50 p-4 dark:border-warning-500/30 dark:bg-warning-500/10">
          <IconBase name="bell" :size="20" class="shrink-0 text-warning-600" />
          <div class="flex-1">
            <p class="text-sm font-medium text-warning-800 dark:text-warning-300">Atenção necessária</p>
            <p class="text-sm text-warning-700 dark:text-warning-400">Revise os dados antes de continuar.</p>
          </div>
        </div>
        <div class="flex items-start gap-3 rounded-lg border border-error-200 bg-error-50 p-4 dark:border-error-500/30 dark:bg-error-500/10">
          <IconBase name="x" :size="20" class="shrink-0 text-error-600" :stroke-width="2.5" />
          <div class="flex-1">
            <p class="text-sm font-medium text-error-800 dark:text-error-300">Erro ao processar</p>
            <p class="text-sm text-error-700 dark:text-error-400">Tente novamente em alguns instantes.</p>
          </div>
        </div>
        <div class="flex items-start gap-3 rounded-lg border border-blue-light-200 bg-blue-light-50 p-4 dark:border-blue-light-500/30 dark:bg-blue-light-500/10">
          <IconBase name="info" :size="20" class="shrink-0 text-blue-light-600" />
          <div class="flex-1">
            <p class="text-sm font-medium text-blue-light-700 dark:text-blue-light-400">Informação</p>
            <p class="text-sm text-blue-light-600 dark:text-blue-light-500">Esta é uma nota informativa.</p>
          </div>
        </div>
      </div>
    </CardComponent>

    <CardComponent title="Modais" subtitle="Diálogos sobrepostos com Teleport" icon="grid">
      <div class="flex flex-wrap gap-3">
        <button class="inline-flex h-10 items-center rounded-lg bg-brand-500 px-4 text-sm font-medium text-white shadow-theme-xs hover:bg-brand-600" @click="showModal = true">
          Abrir modal
        </button>
        <button class="inline-flex h-10 items-center rounded-lg bg-warning-500 px-4 text-sm font-medium text-white shadow-theme-xs hover:bg-warning-600" @click="showConfirm = true">
          Confirmar ação
        </button>
        <button class="inline-flex h-10 items-center rounded-lg bg-error-500 px-4 text-sm font-medium text-white shadow-theme-xs hover:bg-error-600" @click="showDelete = true">
          Confirmação destrutiva
        </button>
      </div>
    </CardComponent>

    <CardComponent title="Toasts & Notificações" icon="bell">
      <div class="flex flex-wrap gap-3">
        <button class="rounded-lg bg-success-500 px-4 py-2 text-sm font-medium text-white hover:bg-success-600" @click="ui.notifySuccess('Tudo certo!')">
          Sucesso
        </button>
        <button class="rounded-lg bg-error-500 px-4 py-2 text-sm font-medium text-white hover:bg-error-600" @click="ui.notifyError('Algo deu errado.')">
          Erro
        </button>
        <button class="rounded-lg bg-warning-500 px-4 py-2 text-sm font-medium text-white hover:bg-warning-600" @click="ui.notifyWarning('Verifique os dados.')">
          Aviso
        </button>
        <button class="rounded-lg bg-blue-light-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-light-600" @click="ui.notify('Nova mensagem recebida.', 'info')">
          Info
        </button>
      </div>
    </CardComponent>

    <CardComponent title="Dropdowns" icon="grid">
      <div class="flex flex-wrap gap-4">
        <div class="relative" ref="ddRef">
          <button
            type="button"
            class="inline-flex h-10 items-center gap-2 rounded-lg border border-themed px-4 text-sm font-medium text-body hover:bg-gray-50 dark:hover:bg-gray-800"
            @click="ddOpen = !ddOpen"
          >
            Ações
            <IconBase name="chevron-down" :size="14" />
          </button>
          <div
            v-if="ddOpen"
            class="surface-card absolute left-0 mt-2 w-48 rounded-xl border shadow-theme-lg"
          >
            <ul class="py-1 text-sm">
              <li><button class="flex w-full items-center gap-2 px-4 py-2 text-body hover:bg-gray-50 dark:hover:bg-gray-800"><IconBase name="edit" :size="14" /> Editar</button></li>
              <li><button class="flex w-full items-center gap-2 px-4 py-2 text-body hover:bg-gray-50 dark:hover:bg-gray-800"><IconBase name="copy" :size="14" /> Duplicar</button></li>
              <li><button class="flex w-full items-center gap-2 px-4 py-2 text-body hover:bg-gray-50 dark:hover:bg-gray-800"><IconBase name="download" :size="14" /> Exportar</button></li>
              <li class="border-t border-themed"><button class="flex w-full items-center gap-2 px-4 py-2 text-error-600 hover:bg-error-50 dark:hover:bg-error-500/10"><IconBase name="trash" :size="14" /> Excluir</button></li>
            </ul>
          </div>
        </div>

        <div class="group relative">
          <button class="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-themed text-muted hover:bg-gray-50 dark:hover:bg-gray-800">
            <IconBase name="info" :size="16" />
          </button>
          <div class="pointer-events-none absolute left-1/2 top-full z-10 mt-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-gray-900 px-2.5 py-1.5 text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
            Tooltip — passe o mouse aqui
            <span class="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-gray-900" />
          </div>
        </div>

        <div class="flex items-center gap-2 rounded-lg border border-themed bg-card-bg px-3 py-1.5 text-sm text-body surface-card">
          <span>Filtros</span>
          <span class="rounded-full bg-brand-500 px-1.5 text-xs text-white">3</span>
          <IconBase name="filter" :size="14" />
        </div>
      </div>
    </CardComponent>

    <ModalBase v-model="showModal" title="Editar perfil" subtitle="Atualize suas informações" size="md">
      <div class="space-y-4">
        <div>
          <label class="mb-2 block text-sm font-medium text-heading">Nome</label>
          <input v-model="modalInput" type="text" class="h-11 w-full rounded-lg border border-themed bg-white px-3 text-sm text-body outline-none focus:border-brand-300 focus-ring dark:bg-gray-900" />
        </div>
        <div>
          <label class="mb-2 block text-sm font-medium text-heading">Email</label>
          <input type="email" placeholder="email@exemplo.com" class="h-11 w-full rounded-lg border border-themed bg-white px-3 text-sm text-body outline-none focus:border-brand-300 focus-ring dark:bg-gray-900" />
        </div>
      </div>
      <template #footer="{ close }">
        <button class="h-9 rounded-lg border border-themed px-3 text-sm text-body hover:bg-gray-50 dark:hover:bg-gray-800" @click="close">Cancelar</button>
        <button class="h-9 rounded-lg bg-brand-500 px-3 text-sm font-medium text-white hover:bg-brand-600" @click="handleSave">Salvar</button>
      </template>
    </ModalBase>

    <ModalBase v-model="showConfirm" title="Confirmar ação" size="sm">
      <p class="text-sm text-body">Deseja realmente prosseguir? Esta ação enviará uma notificação ao time.</p>
      <template #footer="{ close }">
        <button class="h-9 rounded-lg border border-themed px-3 text-sm text-body hover:bg-gray-50 dark:hover:bg-gray-800" @click="close">Cancelar</button>
        <button class="h-9 rounded-lg bg-brand-500 px-3 text-sm font-medium text-white hover:bg-brand-600" @click="close">Confirmar</button>
      </template>
    </ModalBase>

    <ModalBase v-model="showDelete" title="Excluir item" subtitle="Esta ação não pode ser desfeita" size="sm">
      <p class="text-sm text-body">
        Você está prestes a remover este item permanentemente. Todos os dados associados serão perdidos.
      </p>
      <template #footer="{ close }">
        <button class="h-9 rounded-lg border border-themed px-3 text-sm text-body hover:bg-gray-50 dark:hover:bg-gray-800" @click="close">Cancelar</button>
        <button class="h-9 rounded-lg bg-error-500 px-3 text-sm font-medium text-white hover:bg-error-600" @click="handleDelete">Excluir definitivamente</button>
      </template>
    </ModalBase>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useUiStore } from '@/stores/ui'
import CardComponent from '@/components/ui/CardComponent.vue'
import IconBase from '@/components/ui/IconBase.vue'
import ModalBase from '@/components/ui/ModalBase.vue'

const ui = useUiStore()
onMounted(() => ui.setPageTitle('Componentes'))

const showModal = ref(false)
const showConfirm = ref(false)
const showDelete = ref(false)
const modalInput = ref('João da Silva')

const ddOpen = ref(false)
const ddRef = ref<HTMLElement | null>(null)

function onClickOutside(e: MouseEvent) {
  if (ddRef.value && !ddRef.value.contains(e.target as Node)) ddOpen.value = false
}
onMounted(() => document.addEventListener('click', onClickOutside))
onUnmounted(() => document.removeEventListener('click', onClickOutside))

function handleSave() {
  showModal.value = false
  ui.notifySuccess('Perfil atualizado!')
}

function handleDelete() {
  showDelete.value = false
  ui.notifyError('Item excluído com sucesso.')
}

const progressBars = [
  { label: 'Vendas mensais', value: 72, color: 'var(--color-brand-500)' },
  { label: 'Meta de novos clientes', value: 45, color: 'var(--color-success-500)' },
  { label: 'Engajamento', value: 88, color: 'var(--color-warning-500)' },
  { label: 'Devoluções', value: 12, color: 'var(--color-error-500)' },
]
</script>
