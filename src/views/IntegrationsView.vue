<template>
  <div class="space-y-6">
    <!-- Page heading -->
    <div class="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 class="text-title-sm font-bold text-heading">Integrações &amp; Bibliotecas</h1>
        <p class="mt-1 text-sm text-muted">
          Demonstração das bibliotecas integradas ao template — gráficos, tabelas, formulários e mais.
        </p>
      </div>
    </div>

    <!-- a) ApexCharts -------------------------------------------------- -->
    <section class="space-y-4">
      <div class="flex flex-wrap items-center gap-3">
        <h2 class="text-base font-semibold text-heading">Gráficos</h2>
        <span class="inline-flex items-center gap-1 rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-medium text-brand-600 dark:bg-brand-500/15 dark:text-brand-400">
          <IconBase name="zap" :size="12" /> ApexCharts
        </span>
        <p class="text-sm text-muted">Gráficos interativos e responsivos com tema claro/escuro automático.</p>
      </div>

      <div class="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <CardComponent title="Receita x Despesas" subtitle="Área · 12 meses" icon="chart" class="xl:col-span-2">
          <ApexChart type="area" :series="areaSeries" :options="areaOptions" :height="320" />
        </CardComponent>

        <CardComponent title="Vendas por produto" subtitle="Barras" icon="package">
          <ApexChart type="bar" :series="barSeries" :options="barOptions" :height="300" />
        </CardComponent>

        <CardComponent title="Fontes de tráfego" subtitle="Rosca" icon="globe">
          <ApexChart type="donut" :series="donutSeries" :options="donutOptions" :height="300" />
        </CardComponent>
      </div>
    </section>

    <!-- b) DataTable --------------------------------------------------- -->
    <section class="space-y-4">
      <div class="flex flex-wrap items-center gap-3">
        <h2 class="text-base font-semibold text-heading">Tabela de dados</h2>
        <span class="inline-flex items-center gap-1 rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-medium text-brand-600 dark:bg-brand-500/15 dark:text-brand-400">
          <IconBase name="zap" :size="12" /> TanStack Table
        </span>
        <p class="text-sm text-muted">Ordenação, busca global e paginação no cliente.</p>
      </div>
      <DataTable :columns="userColumns" :data="users" :page-size="5" />
    </section>

    <!-- c) vee-validate + yup  /  d) RichTextEditor -------------------- -->
    <div class="grid grid-cols-1 gap-6 xl:grid-cols-2">
      <section class="space-y-4">
        <div class="flex flex-wrap items-center gap-3">
          <h2 class="text-base font-semibold text-heading">Formulário validado</h2>
          <span class="inline-flex items-center gap-1 rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-medium text-brand-600 dark:bg-brand-500/15 dark:text-brand-400">
            <IconBase name="zap" :size="12" /> vee-validate + yup
          </span>
        </div>
        <CardComponent title="Cadastro" subtitle="Validação inline com Yup" icon="forms">
          <form class="space-y-4" @submit="onSubmit">
            <FormField name="nome" label="Nome completo" placeholder="Seu nome" />
            <FormField name="email" label="E-mail" type="email" placeholder="voce@empresa.com" />
            <FormField name="plano" label="Plano" as="select">
              <option value="">Selecione…</option>
              <option value="start">Start</option>
              <option value="pro">Pro</option>
              <option value="enterprise">Enterprise</option>
            </FormField>
            <div class="space-y-1.5">
              <FormField name="termos" as="checkbox" label="Aceito os termos de uso" />
              <p v-if="termosError" class="text-xs text-error-500">{{ termosError }}</p>
            </div>
            <button
              type="submit"
              class="focus-ring inline-flex h-10 items-center gap-2 rounded-lg bg-brand-500 px-4 text-sm font-medium text-white shadow-theme-xs hover:bg-brand-600 disabled:opacity-50"
            >
              <IconBase name="check" :size="16" /> Enviar
            </button>
          </form>
        </CardComponent>
      </section>

      <!-- d) RichTextEditor -->
      <section class="space-y-4">
        <div class="flex flex-wrap items-center gap-3">
          <h2 class="text-base font-semibold text-heading">Editor de texto rico</h2>
          <span class="inline-flex items-center gap-1 rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-medium text-brand-600 dark:bg-brand-500/15 dark:text-brand-400">
            <IconBase name="zap" :size="12" /> Tiptap
          </span>
        </div>
        <CardComponent title="Conteúdo" subtitle="Negrito, listas, títulos e citações" icon="type">
          <RichTextEditor v-model="content" placeholder="Comece a escrever o seu conteúdo aqui…" />
        </CardComponent>
      </section>
    </div>

    <!-- e) Date picker  /  f) Upload ----------------------------------- -->
    <div class="grid grid-cols-1 gap-6 xl:grid-cols-2">
      <section class="space-y-4">
        <div class="flex flex-wrap items-center gap-3">
          <h2 class="text-base font-semibold text-heading">Seletor de data</h2>
          <span class="inline-flex items-center gap-1 rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-medium text-brand-600 dark:bg-brand-500/15 dark:text-brand-400">
            <IconBase name="zap" :size="12" /> @vuepic/vue-datepicker
          </span>
        </div>
        <CardComponent title="Datas" subtitle="Apenas data e data + hora" icon="dashboard">
          <div class="space-y-4">
            <DatePickerInput v-model="d1" label="Data" placeholder="Selecione a data" />
            <DatePickerInput v-model="d2" label="Data e hora" :show-time="true" placeholder="Selecione data e hora" />
          </div>
        </CardComponent>
      </section>

      <!-- f) Upload -->
      <section class="space-y-4">
        <div class="flex flex-wrap items-center gap-3">
          <h2 class="text-base font-semibold text-heading">Upload de arquivos</h2>
          <span class="inline-flex items-center gap-1 rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-medium text-brand-600 dark:bg-brand-500/15 dark:text-brand-400">
            <IconBase name="zap" :size="12" /> Dropzone
          </span>
        </div>
        <CardComponent title="Enviar arquivos" subtitle="Arraste e solte ou clique" icon="download">
          <FileDropzone :max-files="5" accept="image/*,application/pdf" @files="onFiles" />
        </CardComponent>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { h, ref, computed, onMounted } from 'vue'
import type { ApexOptions } from 'apexcharts'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import * as yup from 'yup'
import type { ColumnDef } from '@tanstack/vue-table'
import { useUiStore } from '@/stores/ui'
import CardComponent from '@/components/ui/CardComponent.vue'
import IconBase from '@/components/ui/IconBase.vue'
import ApexChart from '@/components/ui/ApexChart.vue'
import DataTable from '@/components/ui/DataTable.vue'
import FormField from '@/components/ui/FormField.vue'
import RichTextEditor from '@/components/ui/RichTextEditor.vue'
import DatePickerInput from '@/components/ui/DatePickerInput.vue'
import FileDropzone from '@/components/ui/FileDropzone.vue'

const ui = useUiStore()
onMounted(() => useUiStore().setPageTitle('Integrações & Bibliotecas'))

/* ------------------------------------------------------------------ */
/* a) ApexCharts — mock data                                          */
/* ------------------------------------------------------------------ */

const MONTHS = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']

const areaSeries = ref<ApexOptions['series']>([
  { name: 'Receita', data: [31, 40, 28, 51, 42, 62, 58, 70, 65, 82, 78, 95] },
  { name: 'Despesas', data: [22, 28, 25, 33, 30, 38, 36, 44, 41, 50, 47, 55] },
])

const areaOptions = computed<ApexOptions>(() => ({
  chart: { type: 'area' },
  xaxis: { categories: MONTHS },
  fill: { type: 'gradient', gradient: { opacityFrom: 0.4, opacityTo: 0 } },
  legend: { show: true, position: 'top' },
}))

const barSeries = ref<ApexOptions['series']>([{ name: 'Vendas', data: [44, 55, 41, 67, 22, 43, 36, 52] }])

const barOptions = computed<ApexOptions>(() => ({
  chart: { type: 'bar' },
  plotOptions: { bar: { borderRadius: 4, columnWidth: '55%' } },
  xaxis: { categories: ['Pro', 'Start', 'Storage', 'Ent.', 'Treino', 'API', 'SMS', 'Extra'] },
}))

const donutSeries = ref<ApexOptions['series']>([42, 24, 18, 10, 6])

const donutOptions = computed<ApexOptions>(() => ({
  chart: { type: 'donut' },
  labels: ['Google', 'Direto', 'Social', 'Email', 'Outros'],
  legend: { show: true, position: 'bottom' },
  plotOptions: { pie: { donut: { size: '65%' } } },
}))

/* ------------------------------------------------------------------ */
/* b) DataTable — mock users                                          */
/* ------------------------------------------------------------------ */

interface UserRow {
  id: number
  nome: string
  email: string
  funcao: string
  status: 'Ativo' | 'Pendente' | 'Inativo'
  valor: number
}

const users = ref<UserRow[]>([
  { id: 1, nome: 'Marina Costa', email: 'marina@empresa.com', funcao: 'Administradora', status: 'Ativo', valor: 1299.9 },
  { id: 2, nome: 'Lucas Pereira', email: 'lucas@empresa.com', funcao: 'Editor', status: 'Pendente', valor: 349.5 },
  { id: 3, nome: 'Aline Souza', email: 'aline@empresa.com', funcao: 'Visualizador', status: 'Ativo', valor: 89.0 },
  { id: 4, nome: 'Rafael Lima', email: 'rafael@empresa.com', funcao: 'Editor', status: 'Inativo', valor: 0 },
  { id: 5, nome: 'Bianca Rocha', email: 'bianca@empresa.com', funcao: 'Administradora', status: 'Ativo', valor: 2499.0 },
  { id: 6, nome: 'Diego Martins', email: 'diego@empresa.com', funcao: 'Visualizador', status: 'Pendente', valor: 159.9 },
])

function statusBadgeClass(status: UserRow['status']) {
  if (status === 'Ativo') return 'bg-success-50 text-success-700 dark:bg-success-500/15 dark:text-success-500'
  if (status === 'Pendente') return 'bg-warning-50 text-warning-700 dark:bg-warning-500/15 dark:text-warning-500'
  return 'bg-error-50 text-error-600 dark:bg-error-500/15 dark:text-error-500'
}

const currencyFmt = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

const userColumns: ColumnDef<UserRow, any>[] = [
  {
    accessorKey: 'nome',
    header: 'Nome',
    cell: (info) => h('span', { class: 'font-medium text-heading' }, info.getValue() as string),
  },
  { accessorKey: 'email', header: 'E-mail' },
  { accessorKey: 'funcao', header: 'Função' },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: (info) => {
      const status = info.getValue() as UserRow['status']
      return h(
        'span',
        { class: `inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${statusBadgeClass(status)}` },
        status
      )
    },
  },
  {
    accessorKey: 'valor',
    header: 'Valor',
    cell: (info) =>
      h('span', { class: 'font-medium text-heading' }, currencyFmt.format(info.getValue() as number)),
  },
]

/* ------------------------------------------------------------------ */
/* c) vee-validate + yup                                              */
/* ------------------------------------------------------------------ */

const schema = yup.object({
  nome: yup.string().min(3, 'Mínimo de 3 caracteres').required('Informe o nome'),
  email: yup.string().email('E-mail inválido').required('Informe o e-mail'),
  plano: yup.string().required('Selecione um plano'),
  termos: yup.boolean().oneOf([true], 'É preciso aceitar os termos').required(),
})

const { handleSubmit, errors, meta, resetForm } = useForm({
  validationSchema: toTypedSchema(schema),
  initialValues: { nome: '', email: '', plano: '', termos: false },
})

const termosError = computed(() => (meta.value.touched ? errors.value.termos : undefined))

const onSubmit = handleSubmit((values) => {
  ui.notifySuccess(`Formulário enviado com sucesso para ${values.nome}!`)
  resetForm()
})

/* ------------------------------------------------------------------ */
/* d) RichTextEditor                                                  */
/* ------------------------------------------------------------------ */

const content = ref('<p></p>')

/* ------------------------------------------------------------------ */
/* e) Date picker                                                     */
/* ------------------------------------------------------------------ */

const d1 = ref<Date | null>(new Date())
const d2 = ref<Date | null>(new Date())

/* ------------------------------------------------------------------ */
/* f) FileDropzone                                                    */
/* ------------------------------------------------------------------ */

function onFiles(files: File[]) {
  if (files.length) ui.notifySuccess(`${files.length} arquivo(s) selecionado(s).`)
}
</script>
