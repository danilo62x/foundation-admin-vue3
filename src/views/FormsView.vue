<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-title-sm font-bold text-heading">Formulários</h1>
      <p class="mt-1 text-sm text-muted">
        Inputs, selects, checkboxes e validação inline.
      </p>
    </div>

    <div class="grid grid-cols-1 gap-6 xl:grid-cols-2">
      <CardComponent title="Dados pessoais" subtitle="Preencha as informações do cliente" icon="forms">
        <form @submit.prevent="onSubmit" class="space-y-5">
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label class="mb-2 block text-sm font-medium text-heading">
                Nome <span class="text-error-500">*</span>
              </label>
              <input
                v-model="form.name"
                type="text"
                placeholder="João da Silva"
                class="h-11 w-full rounded-lg border border-themed bg-card-bg px-3 text-sm text-body placeholder-gray-400 outline-none focus:border-brand-300 focus-ring surface-card"
              />
            </div>
            <div>
              <label class="mb-2 block text-sm font-medium text-heading">
                Email
              </label>
              <input
                v-model="form.email"
                type="email"
                placeholder="email@exemplo.com"
                class="h-11 w-full rounded-lg border border-themed bg-card-bg px-3 text-sm text-body placeholder-gray-400 outline-none focus:border-brand-300 focus-ring surface-card"
              />
            </div>
          </div>

          <div>
            <label class="mb-2 block text-sm font-medium text-heading">País</label>
            <div class="relative">
              <select
                v-model="form.country"
                class="h-11 w-full appearance-none rounded-lg border border-themed bg-card-bg px-3 pr-10 text-sm text-body outline-none focus:border-brand-300 focus-ring surface-card"
              >
                <option value="BR">Brasil</option>
                <option value="PT">Portugal</option>
                <option value="US">Estados Unidos</option>
                <option value="UK">Reino Unido</option>
              </select>
              <span class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted">
                <IconBase name="chevron-down" :size="18" />
              </span>
            </div>
          </div>

          <div>
            <label class="mb-2 block text-sm font-medium text-heading">Mensagem</label>
            <textarea
              v-model="form.message"
              rows="4"
              placeholder="Escreva aqui..."
              class="w-full rounded-lg border border-themed bg-card-bg px-3 py-2.5 text-sm text-body placeholder-gray-400 outline-none focus:border-brand-300 focus-ring surface-card"
            />
          </div>

          <div class="flex flex-wrap items-center gap-6">
            <label class="flex items-center gap-2 text-sm text-body">
              <input
                type="checkbox"
                v-model="form.terms"
                class="h-4 w-4 rounded border-gray-300 text-brand-500 focus:ring-brand-500 dark:border-gray-700 dark:bg-gray-800"
              />
              Aceito os termos
            </label>

            <div class="flex items-center gap-2">
              <span class="text-sm text-body">Notificações</span>
              <SwitchToggle v-model="form.notifications" />
            </div>
          </div>

          <div class="flex justify-end gap-2 border-t border-themed pt-4">
            <button type="button" class="h-10 rounded-lg border border-themed px-4 text-sm font-medium text-body hover:bg-gray-50 dark:hover:bg-gray-800">
              Cancelar
            </button>
            <button type="submit" class="inline-flex h-10 items-center gap-2 rounded-lg bg-brand-500 px-4 text-sm font-medium text-white shadow-theme-xs hover:bg-brand-600">
              <IconBase name="check" :size="16" /> Salvar
            </button>
          </div>
        </form>
      </CardComponent>

      <CardComponent title="Variações de input" subtitle="Estados e tamanhos" icon="forms">
        <div class="space-y-5">
          <div>
            <label class="mb-2 block text-sm font-medium text-heading">Padrão</label>
            <input
              type="text"
              placeholder="Texto..."
              class="h-11 w-full rounded-lg border border-themed bg-card-bg px-3 text-sm outline-none focus:border-brand-300 focus-ring surface-card"
            />
          </div>

          <div>
            <label class="mb-2 block text-sm font-medium text-heading">Com sucesso</label>
            <input
              type="text"
              value="João da Silva"
              class="h-11 w-full rounded-lg border border-success-500 bg-success-50/40 px-3 text-sm text-success-800 outline-none focus-ring dark:border-success-500/40 dark:bg-success-500/10 dark:text-success-300"
            />
            <p class="mt-1 text-xs text-success-600">Tudo certo!</p>
          </div>

          <div>
            <label class="mb-2 block text-sm font-medium text-heading">Com erro</label>
            <input
              type="text"
              value="invalid@"
              class="h-11 w-full rounded-lg border border-error-500 bg-error-50/40 px-3 text-sm text-error-800 outline-none focus-ring dark:border-error-500/40 dark:bg-error-500/10 dark:text-error-300"
            />
            <p class="mt-1 text-xs text-error-600">Email inválido</p>
          </div>

          <div>
            <label class="mb-2 block text-sm font-medium text-heading">Desabilitado</label>
            <input
              type="text"
              value="Bloqueado"
              disabled
              class="h-11 w-full cursor-not-allowed rounded-lg border border-themed bg-gray-50 px-3 text-sm text-gray-400 dark:bg-gray-900"
            />
          </div>

          <div>
            <label class="mb-2 block text-sm font-medium text-heading">Radio</label>
            <div class="flex items-center gap-4">
              <label class="flex items-center gap-2 text-sm text-body">
                <input type="radio" name="plan" value="start" v-model="radio" class="h-4 w-4 border-gray-300 text-brand-500 focus:ring-brand-500" />
                Start
              </label>
              <label class="flex items-center gap-2 text-sm text-body">
                <input type="radio" name="plan" value="pro" v-model="radio" class="h-4 w-4 border-gray-300 text-brand-500 focus:ring-brand-500" />
                Pro
              </label>
              <label class="flex items-center gap-2 text-sm text-body">
                <input type="radio" name="plan" value="enterprise" v-model="radio" class="h-4 w-4 border-gray-300 text-brand-500 focus:ring-brand-500" />
                Enterprise
              </label>
            </div>
          </div>

          <div>
            <label class="mb-2 block text-sm font-medium text-heading">Slider</label>
            <input type="range" min="0" max="100" v-model="slider" class="w-full" />
            <div class="mt-1 flex justify-between text-xs text-muted">
              <span>0%</span>
              <span class="font-semibold text-heading">{{ slider }}%</span>
              <span>100%</span>
            </div>
          </div>
        </div>
      </CardComponent>
    </div>

    <CardComponent title="Upload de arquivos" subtitle="Drag & drop ou clique para selecionar" icon="package">
      <label
        class="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-themed bg-gray-50/40 px-6 py-10 text-center transition hover:border-brand-300 hover:bg-brand-50/40 dark:bg-gray-900/40 dark:hover:bg-brand-500/5"
      >
        <span class="flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-brand-500 dark:bg-brand-500/15">
          <IconBase name="download" :size="24" />
        </span>
        <p class="mt-3 text-sm font-medium text-heading">Arraste arquivos aqui</p>
        <p class="text-xs text-muted">ou clique para selecionar (PNG, JPG, PDF até 10 MB)</p>
        <input type="file" class="hidden" multiple />
      </label>
    </CardComponent>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import { useUiStore } from '@/stores/ui'
import CardComponent from '@/components/ui/CardComponent.vue'
import IconBase from '@/components/ui/IconBase.vue'
import SwitchToggle from '@/components/ui/SwitchToggle.vue'

const ui = useUiStore()
onMounted(() => ui.setPageTitle('Formulários'))

const form = reactive({
  name: '',
  email: '',
  country: 'BR',
  message: '',
  terms: false,
  notifications: true,
})

const radio = ref('pro')
const slider = ref(45)

function onSubmit() {
  ui.notifySuccess('Formulário salvo com sucesso!')
}
</script>
