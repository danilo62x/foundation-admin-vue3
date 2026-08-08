<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-title-sm font-bold text-heading">Tabelas</h1>
      <p class="mt-1 text-sm text-muted">
        Listagens com filtros, paginação e seleção múltipla.
      </p>
    </div>

    <CardComponent title="Pedidos" subtitle="Filtre por status e pesquise por cliente" icon="tables">
      <template #toolbar>
        <div class="flex items-center gap-2">
          <div class="relative">
            <span class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <IconBase name="search" :size="16" />
            </span>
            <input
              v-model="search"
              type="text"
              placeholder="Buscar..."
              class="h-9 w-44 rounded-lg border border-themed bg-gray-50 pl-9 pr-3 text-sm text-body outline-none focus:border-brand-300 focus-ring dark:bg-gray-900"
            />
          </div>
          <select
            v-model="statusFilter"
            class="h-9 rounded-lg border border-themed bg-card-bg px-3 text-sm text-body outline-none focus:border-brand-300 focus-ring surface-card"
          >
            <option value="">Todos</option>
            <option value="Pago">Pago</option>
            <option value="Pendente">Pendente</option>
            <option value="Cancelado">Cancelado</option>
          </select>
        </div>
      </template>

      <div v-if="selected.length > 0" class="mb-3 flex items-center justify-between rounded-lg bg-brand-50 px-4 py-2 text-sm dark:bg-brand-500/10">
        <span class="font-medium text-brand-700 dark:text-brand-400">
          {{ selected.length }} {{ selected.length === 1 ? 'pedido' : 'pedidos' }} selecionado{{ selected.length === 1 ? '' : 's' }}
        </span>
        <div class="flex gap-2">
          <button class="rounded-md border border-brand-300 px-2.5 py-1 text-xs font-medium text-brand-700 hover:bg-brand-100 dark:border-brand-500/40 dark:text-brand-400 dark:hover:bg-brand-500/20">Exportar</button>
          <button class="rounded-md border border-error-300 bg-white px-2.5 py-1 text-xs font-medium text-error-700 hover:bg-error-50 dark:border-error-500/40 dark:bg-transparent dark:text-error-400 dark:hover:bg-error-500/10">Excluir</button>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm">
          <thead class="border-b border-themed text-xs uppercase tracking-wide text-muted">
            <tr>
              <th class="w-12 py-3">
                <input
                  type="checkbox"
                  :checked="allSelected"
                  class="h-4 w-4 rounded border-gray-300 text-brand-500 focus:ring-brand-500 dark:border-gray-700 dark:bg-gray-800"
                  @change="toggleAll"
                />
              </th>
              <th class="py-3 pr-4 font-medium">Pedido</th>
              <th class="py-3 pr-4 font-medium">Cliente</th>
              <th class="py-3 pr-4 font-medium">Valor</th>
              <th class="py-3 pr-4 font-medium">Status</th>
              <th class="py-3 pr-4 font-medium">Data</th>
              <th class="py-3 pr-4 font-medium text-right">Ações</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-themed">
            <tr v-for="row in filteredRows" :key="row.id" class="text-body">
              <td class="py-3">
                <input
                  type="checkbox"
                  v-model="selected"
                  :value="row.id"
                  class="h-4 w-4 rounded border-gray-300 text-brand-500 focus:ring-brand-500 dark:border-gray-700 dark:bg-gray-800"
                />
              </td>
              <td class="py-3 pr-4 font-mono text-xs text-muted">#{{ row.id.padStart(5, '0') }}</td>
              <td class="py-3 pr-4 font-medium text-heading">{{ row.customer }}</td>
              <td class="py-3 pr-4">R$ {{ row.amount }}</td>
              <td class="py-3 pr-4">
                <span :class="['inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium', statusClass(row.status)]">
                  {{ row.status }}
                </span>
              </td>
              <td class="py-3 pr-4 text-muted">{{ row.date }}</td>
              <td class="py-3 pr-4">
                <div class="flex items-center justify-end gap-1">
                  <button class="rounded-md p-1.5 text-muted hover:bg-gray-100 hover:text-brand-500 dark:hover:bg-gray-800">
                    <IconBase name="eye" :size="16" />
                  </button>
                  <button class="rounded-md p-1.5 text-muted hover:bg-gray-100 hover:text-brand-500 dark:hover:bg-gray-800">
                    <IconBase name="edit" :size="16" />
                  </button>
                  <button class="rounded-md p-1.5 text-muted hover:bg-error-50 hover:text-error-600 dark:hover:bg-error-500/15">
                    <IconBase name="trash" :size="16" />
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="filteredRows.length === 0">
              <td colspan="7" class="py-8 text-center text-sm text-muted">
                Nenhum registro encontrado.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <template #footer>
        <div class="flex items-center justify-between text-xs text-muted">
          <span>Mostrando {{ filteredRows.length }} de {{ rows.length }} pedidos</span>
          <div class="flex items-center gap-1">
            <button class="rounded-md border border-themed px-2.5 py-1 hover:bg-gray-50 dark:hover:bg-gray-800">
              Anterior
            </button>
            <button class="rounded-md bg-brand-500 px-2.5 py-1 text-white">1</button>
            <button class="rounded-md border border-themed px-2.5 py-1 hover:bg-gray-50 dark:hover:bg-gray-800">2</button>
            <button class="rounded-md border border-themed px-2.5 py-1 hover:bg-gray-50 dark:hover:bg-gray-800">3</button>
            <button class="rounded-md border border-themed px-2.5 py-1 hover:bg-gray-50 dark:hover:bg-gray-800">
              Próximo
            </button>
          </div>
        </div>
      </template>
    </CardComponent>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useUiStore } from '@/stores/ui'
import CardComponent from '@/components/ui/CardComponent.vue'
import IconBase from '@/components/ui/IconBase.vue'

const ui = useUiStore()
onMounted(() => ui.setPageTitle('Tabelas'))

const rows = [
  { id: '1', customer: 'Marina Costa', amount: '299,00', status: 'Pago', date: '25/05/2026' },
  { id: '2', customer: 'Lucas Pereira', amount: '79,00', status: 'Pendente', date: '24/05/2026' },
  { id: '3', customer: 'Aline Souza', amount: '299,00', status: 'Pago', date: '24/05/2026' },
  { id: '4', customer: 'Rafael Lima', amount: '1.290,00', status: 'Cancelado', date: '23/05/2026' },
  { id: '5', customer: 'Bianca Rocha', amount: '79,00', status: 'Pago', date: '22/05/2026' },
  { id: '6', customer: 'Pedro Alves', amount: '129,00', status: 'Pendente', date: '21/05/2026' },
  { id: '7', customer: 'Carla Mendes', amount: '299,00', status: 'Pago', date: '20/05/2026' },
]

const search = ref('')
const statusFilter = ref('')
const selected = ref<string[]>([])

const filteredRows = computed(() =>
  rows.filter((r) => {
    if (search.value && !r.customer.toLowerCase().includes(search.value.toLowerCase())) return false
    if (statusFilter.value && r.status !== statusFilter.value) return false
    return true
  })
)

const allSelected = computed(
  () => filteredRows.value.length > 0 && filteredRows.value.every((r) => selected.value.includes(r.id))
)

function toggleAll() {
  if (allSelected.value) selected.value = []
  else selected.value = filteredRows.value.map((r) => r.id)
}

function statusClass(status: string) {
  if (status === 'Pago') return 'bg-success-50 text-success-700 dark:bg-success-500/15 dark:text-success-500'
  if (status === 'Pendente') return 'bg-warning-50 text-warning-700 dark:bg-warning-500/15 dark:text-warning-500'
  return 'bg-error-50 text-error-600 dark:bg-error-500/15 dark:text-error-500'
}
</script>
