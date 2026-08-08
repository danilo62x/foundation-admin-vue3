<template>
  <div class="space-y-6">
    <!-- Toolbar -->
    <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div class="flex items-center gap-1.5 text-sm">
        <button class="font-medium text-body hover:text-brand-500">Início</button>
        <IconBase name="chevron-right" :size="14" class="text-muted" />
        <span class="font-semibold text-heading">Meus arquivos</span>
      </div>
      <div class="flex items-center gap-2">
        <div class="inline-flex rounded-lg border border-themed p-0.5">
          <button
            class="flex h-8 w-8 items-center justify-center rounded-md"
            :class="
              view === 'grid'
                ? 'bg-brand-500 text-white'
                : 'text-muted hover:bg-gray-50 dark:hover:bg-gray-800'
            "
            aria-label="Visualização em grade"
            @click="view = 'grid'"
          >
            <IconBase name="grid" :size="16" />
          </button>
          <button
            class="flex h-8 w-8 items-center justify-center rounded-md"
            :class="
              view === 'list'
                ? 'bg-brand-500 text-white'
                : 'text-muted hover:bg-gray-50 dark:hover:bg-gray-800'
            "
            aria-label="Visualização em lista"
            @click="view = 'list'"
          >
            <IconBase name="tables" :size="16" />
          </button>
        </div>
        <button
          class="inline-flex h-10 items-center gap-2 rounded-lg bg-brand-500 px-4 text-sm font-medium text-white shadow-theme-xs hover:bg-brand-600"
          @click="uploadOpen = true"
        >
          <IconBase name="plus" :size="16" /> Enviar arquivo
        </button>
      </div>
    </div>

    <!-- Storage usage -->
    <div class="surface-card rounded-2xl border p-5 shadow-theme-sm md:p-6">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <span
            class="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-500 dark:bg-brand-500/15"
          >
            <IconBase name="package" :size="20" />
          </span>
          <div>
            <p class="text-sm font-semibold text-heading">Armazenamento</p>
            <p class="text-xs text-muted">{{ usedGb }} GB de {{ totalGb }} GB utilizados</p>
          </div>
        </div>
        <span class="text-sm font-semibold text-heading">{{ usedPct }}%</span>
      </div>
      <div class="mt-4 h-3 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
        <div
          class="h-full rounded-full transition-all"
          :class="usedPct > 80 ? 'bg-error-500' : 'bg-brand-500'"
          :style="{ width: `${usedPct}%` }"
        />
      </div>
    </div>

    <!-- Folders -->
    <div>
      <h2 class="mb-3 text-sm font-semibold text-heading">Pastas</h2>
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div
          v-for="f in FOLDERS"
          :key="f.id"
          class="surface-card group relative flex items-center gap-3 rounded-2xl border p-4 shadow-theme-sm transition hover:border-brand-300"
        >
          <span
            class="flex h-11 w-11 items-center justify-center rounded-xl bg-warning-50 text-warning-600 dark:bg-warning-500/15 dark:text-warning-500"
          >
            <IconBase name="grid" :size="22" />
          </span>
          <div class="min-w-0 flex-1">
            <p class="truncate text-sm font-medium text-heading">{{ f.name }}</p>
            <p class="text-xs text-muted">{{ f.items }} itens · {{ f.modified }}</p>
          </div>
          <div class="relative">
            <button
              class="rounded-md p-1.5 text-muted hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Opções"
              @click="toggleMenu(f.id)"
            >
              <IconBase name="dots-vertical" :size="16" />
            </button>
            <ItemMenu v-if="openMenu === f.id" @close="openMenu = null" @action="onAction" />
          </div>
        </div>
      </div>
    </div>

    <!-- Files -->
    <div>
      <h2 class="mb-3 text-sm font-semibold text-heading">Arquivos</h2>
      <div
        v-if="view === 'grid'"
        class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        <div
          v-for="file in FILES"
          :key="file.id"
          class="surface-card relative flex flex-col gap-3 rounded-2xl border p-4 shadow-theme-sm transition hover:border-brand-300"
        >
          <div class="flex items-start justify-between">
            <span
              class="flex h-11 w-11 items-center justify-center rounded-xl"
              :class="KIND_STYLE[file.kind].cls"
            >
              <IconBase :name="KIND_STYLE[file.kind].icon" :size="22" />
            </span>
            <div class="relative">
              <button
                class="rounded-md p-1.5 text-muted hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label="Opções"
                @click="toggleMenu(file.id)"
              >
                <IconBase name="dots-vertical" :size="16" />
              </button>
              <ItemMenu v-if="openMenu === file.id" @close="openMenu = null" @action="onAction" />
            </div>
          </div>
          <div class="min-w-0">
            <p class="truncate text-sm font-medium text-heading">{{ file.name }}</p>
            <p class="mt-0.5 text-xs text-muted">{{ file.size }} · {{ file.modified }}</p>
          </div>
        </div>
      </div>

      <div v-else class="surface-card overflow-hidden rounded-2xl border shadow-theme-sm">
        <table class="w-full text-left text-sm">
          <thead class="border-b border-themed text-xs uppercase tracking-wide text-muted">
            <tr>
              <th class="px-5 py-3 font-medium">Nome</th>
              <th class="px-5 py-3 font-medium">Tamanho</th>
              <th class="px-5 py-3 font-medium">Modificado</th>
              <th class="px-5 py-3 text-right font-medium">Ações</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-themed">
            <tr v-for="file in FILES" :key="file.id" class="text-body">
              <td class="px-5 py-3">
                <div class="flex items-center gap-3">
                  <span
                    class="flex h-9 w-9 items-center justify-center rounded-lg"
                    :class="KIND_STYLE[file.kind].cls"
                  >
                    <IconBase :name="KIND_STYLE[file.kind].icon" :size="18" />
                  </span>
                  <span class="font-medium text-heading">{{ file.name }}</span>
                </div>
              </td>
              <td class="px-5 py-3 text-muted">{{ file.size }}</td>
              <td class="px-5 py-3 text-muted">{{ file.modified }}</td>
              <td class="px-5 py-3">
                <div class="relative flex justify-end">
                  <button
                    class="rounded-md p-1.5 text-muted hover:bg-gray-100 dark:hover:bg-gray-800"
                    aria-label="Opções"
                    @click="toggleMenu(file.id)"
                  >
                    <IconBase name="dots-vertical" :size="16" />
                  </button>
                  <ItemMenu
                    v-if="openMenu === file.id"
                    @close="openMenu = null"
                    @action="onAction"
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <ModalBase
      v-model="uploadOpen"
      title="Enviar arquivos"
      subtitle="Arraste e solte ou selecione do seu dispositivo"
      size="lg"
    >
      <FileDropzone :max-files="8" />
      <template #footer="{ close }">
        <button
          class="h-10 rounded-lg border border-themed px-4 text-sm font-medium text-body hover:bg-gray-50 dark:hover:bg-gray-800"
          @click="close"
        >
          Cancelar
        </button>
        <button
          class="inline-flex h-10 items-center gap-2 rounded-lg bg-brand-500 px-4 text-sm font-medium text-white hover:bg-brand-600"
          @click="
            () => {
              close()
              ui.notifySuccess('Arquivos enviados com sucesso')
            }
          "
        >
          <IconBase name="download" :size="16" /> Concluir
        </button>
      </template>
    </ModalBase>
  </div>
</template>

<script setup lang="ts">
import { ref, defineComponent, h, onMounted } from 'vue'
import { useUiStore } from '@/stores/ui'
import IconBase from '@/components/ui/IconBase.vue'
import ModalBase from '@/components/ui/ModalBase.vue'
import FileDropzone from '@/components/ui/FileDropzone.vue'

interface FolderItem {
  id: string
  name: string
  items: number
  modified: string
}

type FileKind = 'document' | 'image' | 'archive' | 'sheet'

interface FileItem {
  id: string
  name: string
  kind: FileKind
  size: string
  modified: string
}

const ui = useUiStore()
onMounted(() => ui.setPageTitle('Arquivos'))

const FOLDERS: FolderItem[] = [
  { id: 'f1', name: 'Documentos', items: 24, modified: '24/05/2026' },
  { id: 'f2', name: 'Imagens', items: 132, modified: '22/05/2026' },
  { id: 'f3', name: 'Projetos', items: 9, modified: '20/05/2026' },
  { id: 'f4', name: 'Backups', items: 5, modified: '12/05/2026' },
]

const FILES: FileItem[] = [
  { id: 'a1', name: 'Proposta-comercial.pdf', kind: 'document', size: '2,4 MB', modified: 'Hoje, 09:42' },
  { id: 'a2', name: 'Relatorio-maio.xlsx', kind: 'sheet', size: '845 KB', modified: 'Ontem, 18:11' },
  { id: 'a3', name: 'Banner-home.png', kind: 'image', size: '1,1 MB', modified: 'Ontem, 14:25' },
  { id: 'a4', name: 'Apresentacao.pdf', kind: 'document', size: '5,8 MB', modified: '23/05/2026' },
  { id: 'a5', name: 'Logo-vetor.svg', kind: 'image', size: '64 KB', modified: '22/05/2026' },
  { id: 'a6', name: 'Codigo-fonte.zip', kind: 'archive', size: '18,2 MB', modified: '20/05/2026' },
]

const KIND_STYLE: Record<FileKind, { icon: string; cls: string }> = {
  document: { icon: 'forms', cls: 'bg-brand-50 text-brand-500 dark:bg-brand-500/15 dark:text-brand-400' },
  image: { icon: 'eye', cls: 'bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500' },
  archive: { icon: 'package', cls: 'bg-warning-50 text-warning-600 dark:bg-warning-500/15 dark:text-warning-500' },
  sheet: { icon: 'tables', cls: 'bg-blue-light-50 text-blue-light-600 dark:bg-blue-light-500/15 dark:text-blue-light-500' },
}

const view = ref<'grid' | 'list'>('grid')
const uploadOpen = ref(false)
const openMenu = ref<string | null>(null)

const usedGb = 64.5
const totalGb = 100
const usedPct = Math.round((usedGb / totalGb) * 100)

function toggleMenu(id: string) {
  openMenu.value = openMenu.value === id ? null : id
}

function onAction(label: string) {
  openMenu.value = null
  ui.notifySuccess(`${label} executado`)
}

const MENU_ACTIONS: { label: string; icon: string; danger?: boolean }[] = [
  { label: 'Abrir', icon: 'eye' },
  { label: 'Renomear', icon: 'edit' },
  { label: 'Baixar', icon: 'download' },
  { label: 'Excluir', icon: 'trash', danger: true },
]

const ItemMenu = defineComponent({
  name: 'ItemMenu',
  emits: ['close', 'action'],
  setup(_, { emit }) {
    return () =>
      h('div', [
        h('div', {
          class: 'fixed inset-0 z-10',
          onClick: () => emit('close'),
        }),
        h(
          'div',
          {
            class:
              'surface-card absolute right-0 top-full z-20 mt-1 w-40 overflow-hidden rounded-lg border py-1 shadow-theme-lg',
          },
          MENU_ACTIONS.map((a) =>
            h(
              'button',
              {
                key: a.label,
                class: [
                  'flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-800',
                  a.danger ? 'text-error-600 dark:text-error-500' : 'text-body',
                ],
                onClick: () => emit('action', a.label),
              },
              [h(IconBase, { name: a.icon, size: 15 }), ` ${a.label}`]
            )
          )
        ),
      ])
  },
})
</script>
