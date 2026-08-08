<template>
  <div class="space-y-6">
    <div class="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 class="text-title-sm font-bold text-heading">Gráficos & Analytics</h1>
        <p class="mt-1 text-sm text-muted">Visualizações SVG puras, leves e sem dependências.</p>
      </div>
      <div class="flex gap-2">
        <button class="inline-flex h-9 items-center gap-1.5 rounded-lg border border-themed px-3 text-sm text-body hover:bg-gray-50 dark:hover:bg-gray-800">
          <IconBase name="download" :size="14" /> Exportar
        </button>
      </div>
    </div>

    <!-- Sparkline KPIs -->
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <div
        v-for="stat in sparkStats"
        :key="stat.key"
        class="surface-card flex items-center gap-4 rounded-2xl border p-4 shadow-theme-sm"
      >
        <div
          class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
          :style="{ background: stat.color + '22', color: stat.color }"
        >
          <IconBase :name="stat.icon" :size="20" />
        </div>
        <div class="flex-1">
          <p class="text-lg font-bold text-heading">{{ stat.value }}</p>
          <p class="text-xs text-muted">{{ stat.label }}</p>
          <p class="mt-0.5 text-xs font-medium" :class="stat.up ? 'text-success-600' : 'text-error-500'">
            <span>{{ stat.up ? '▲' : '▼' }}</span> {{ stat.delta }}
          </p>
        </div>
        <svg width="64" height="36" viewBox="0 0 64 36">
          <defs>
            <linearGradient :id="`grad-${stat.key}`" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" :stop-color="stat.color" stop-opacity="0.4" />
              <stop offset="100%" :stop-color="stat.color" stop-opacity="0" />
            </linearGradient>
          </defs>
          <path :d="stat.areaPath" :fill="`url(#grad-${stat.key})`" />
          <path :d="stat.linePath" fill="none" :stroke="stat.color" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </div>
    </div>

    <!-- Bar + Donut -->
    <div class="grid grid-cols-1 gap-6 xl:grid-cols-3">
      <CardComponent title="Receita mensal 2026" subtitle="Comparativo trimestral" icon="chart" class="xl:col-span-2">
        <div class="overflow-x-auto">
          <svg width="100%" viewBox="0 0 700 280" class="min-w-[500px]">
            <g v-for="g in barChart.grid" :key="g.y">
              <line :x1="barChart.pl" :y1="g.y" x2="690" :y2="g.y" stroke="var(--tx-border)" stroke-width="1" stroke-dasharray="4 4" />
              <text :x="barChart.pl - 8" :y="g.y + 4" text-anchor="end" font-size="10" fill="var(--tx-text-muted)">
                {{ g.label }}
              </text>
            </g>
            <g v-for="(b, i) in barChart.bars" :key="i">
              <rect
                :x="b.x"
                :y="b.y"
                :width="b.w"
                :height="b.h"
                fill="var(--color-brand-500)"
                :opacity="barHover === -1 || barHover === i ? 0.9 : 0.35"
                rx="4"
                @mouseenter="barHover = i"
                @mouseleave="barHover = -1"
                class="transition-opacity"
              />
              <text
                v-if="barHover === i"
                :x="b.x + b.w / 2"
                :y="b.y - 6"
                text-anchor="middle"
                font-size="11"
                font-weight="700"
                fill="var(--color-brand-600)"
              >
                {{ b.value }}k
              </text>
              <text
                :x="b.x + b.w / 2"
                y="270"
                text-anchor="middle"
                font-size="10"
                fill="var(--tx-text-muted)"
              >
                {{ b.month }}
              </text>
            </g>
          </svg>
        </div>
      </CardComponent>

      <CardComponent title="Fontes de tráfego" subtitle="Top canais" icon="globe">
        <div class="flex flex-col items-center">
          <svg width="190" height="190" viewBox="0 0 180 180">
            <circle cx="90" cy="90" r="65" fill="none" stroke="var(--tx-border)" stroke-width="22" />
            <circle
              v-for="seg in donut.segments"
              :key="seg.label"
              cx="90"
              cy="90"
              r="65"
              fill="none"
              :stroke="seg.color"
              stroke-width="22"
              :stroke-dasharray="`${seg.dash} ${donut.C - seg.dash}`"
              :transform="`rotate(${seg.rot} 90 90)`"
              stroke-linecap="butt"
            />
            <text x="90" y="86" text-anchor="middle" font-size="22" font-weight="700" fill="var(--tx-text-heading)">
              {{ donut.total }}
            </text>
            <text x="90" y="104" text-anchor="middle" font-size="10" fill="var(--tx-text-muted)">
              Visitantes
            </text>
          </svg>

          <ul class="mt-4 w-full space-y-2">
            <li v-for="seg in donut.segments" :key="seg.label" class="flex items-center gap-2 text-sm">
              <span class="h-2.5 w-2.5 rounded-full" :style="{ background: seg.color }" />
              <span class="flex-1 text-body">{{ seg.label }}</span>
              <span class="font-semibold text-heading">{{ seg.pct }}%</span>
            </li>
          </ul>
        </div>
      </CardComponent>
    </div>

    <!-- Area chart -->
    <CardComponent title="Usuários ativos — últimas 24 semanas" subtitle="Engajamento ao longo do tempo" icon="chart">
      <template #toolbar>
        <div class="flex rounded-lg border border-themed p-0.5">
          <button
            v-for="t in tabs"
            :key="t"
            type="button"
            class="rounded-md px-3 py-1 text-xs font-medium transition"
            :class="areaTab === t ? 'bg-brand-500 text-white' : 'text-body hover:text-heading'"
            @click="areaTab = t"
          >
            {{ t }}
          </button>
        </div>
      </template>

      <div class="overflow-x-auto">
        <svg width="100%" viewBox="0 0 800 240" class="min-w-[500px]">
          <defs>
            <linearGradient id="areagrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="var(--color-brand-500)" stop-opacity="0.35" />
              <stop offset="100%" stop-color="var(--color-brand-500)" stop-opacity="0" />
            </linearGradient>
          </defs>
          <g v-for="g in area.grid" :key="g.y">
            <line x1="40" :y1="g.y" x2="790" :y2="g.y" stroke="var(--tx-border)" stroke-width="1" stroke-dasharray="4 4" />
            <text x="32" :y="g.y + 4" text-anchor="end" font-size="10" fill="var(--tx-text-muted)">
              {{ g.label }}
            </text>
          </g>
          <path :d="area.areaPath" fill="url(#areagrad)" />
          <path :d="area.linePath" fill="none" stroke="var(--color-brand-500)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />
          <g v-for="(p, i) in area.points" :key="i">
            <circle :cx="p.x" :cy="p.y" r="3.5" fill="var(--color-brand-500)" />
          </g>
        </svg>
      </div>
    </CardComponent>

    <!-- Funnel + Progress list -->
    <div class="grid grid-cols-1 gap-6 xl:grid-cols-2">
      <CardComponent title="Funil de conversão" subtitle="Jornada do usuário" icon="filter">
        <div class="space-y-3">
          <div
            v-for="(step, i) in funnel"
            :key="step.label"
            class="flex items-center gap-3"
          >
            <span class="w-6 text-xs font-semibold text-muted">{{ i + 1 }}</span>
            <div class="flex-1">
              <div class="mb-1 flex items-center justify-between text-xs">
                <span class="font-medium text-heading">{{ step.label }}</span>
                <span class="text-muted">{{ step.value.toLocaleString('pt-BR') }} · {{ step.pct }}%</span>
              </div>
              <div class="h-3 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                <div
                  class="h-full rounded-full transition-all"
                  :style="{ width: step.pct + '%', background: 'var(--color-brand-500)' }"
                />
              </div>
            </div>
          </div>
        </div>
      </CardComponent>

      <CardComponent title="Performance por produto" subtitle="Top 5 vendas" icon="package">
        <div class="space-y-4">
          <div v-for="row in products" :key="row.name" class="space-y-1.5">
            <div class="flex items-center justify-between text-sm">
              <span class="font-medium text-heading">{{ row.name }}</span>
              <span class="text-muted">R$ {{ row.revenue }}</span>
            </div>
            <div class="flex h-2 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
              <div class="h-full" :style="{ width: row.pct + '%', background: row.color }" />
            </div>
          </div>
        </div>
      </CardComponent>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useUiStore } from '@/stores/ui'
import CardComponent from '@/components/ui/CardComponent.vue'
import IconBase from '@/components/ui/IconBase.vue'

const ui = useUiStore()
onMounted(() => ui.setPageTitle('Gráficos & Analytics'))

// ====== Sparkline KPIs ======
function buildSpark(values: number[]) {
  const w = 64
  const h = 36
  const max = Math.max(...values)
  const min = Math.min(...values)
  const range = max - min || 1
  const stepX = w / (values.length - 1)
  const pts = values.map((v, i) => ({
    x: i * stepX,
    y: h - 4 - ((v - min) / range) * (h - 8),
  }))
  const linePath = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')
  const areaPath = `${linePath} L ${w} ${h} L 0 ${h} Z`
  return { linePath, areaPath }
}

const sparkStats = computed(() => [
  { key: 'rev', icon: 'dollar', label: 'Receita', value: 'R$ 128k', delta: '12,4%', up: true, color: '#465fff', ...buildSpark([18, 22, 19, 25, 28, 24, 30, 35, 32, 38, 36, 42]) },
  { key: 'ord', icon: 'shopping-bag', label: 'Pedidos', value: '2.481', delta: '8,1%', up: true, color: '#12b76a', ...buildSpark([12, 18, 15, 22, 20, 28, 26, 32, 28, 36, 34, 40]) },
  { key: 'cli', icon: 'users', label: 'Clientes', value: '948', delta: '3,2%', up: false, color: '#f79009', ...buildSpark([22, 25, 20, 28, 30, 26, 24, 28, 26, 24, 22, 20]) },
  { key: 'cvr', icon: 'trending-up', label: 'Conversão', value: '3,87%', delta: '15,8%', up: true, color: '#0ba5ec', ...buildSpark([8, 10, 12, 11, 14, 16, 15, 18, 20, 22, 24, 26]) },
])

// ====== Bar chart ======
const barHover = ref(-1)
const barChart = computed(() => {
  const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
  const values = [42, 58, 35, 72, 88, 65, 80, 95, 70, 102, 85, 110]
  const pl = 36
  const pr = 10
  const pt = 20
  const pb = 30
  const w = 700
  const h = 280
  const chartW = w - pl - pr
  const chartH = h - pt - pb
  const max = 120
  const barWidth = (chartW / months.length) * 0.6
  const slot = chartW / months.length
  return {
    pl,
    grid: [0, 30, 60, 90, 120].map((v) => ({ y: pt + chartH - (v / max) * chartH, label: v + 'k' })),
    bars: values.map((v, i) => ({
      x: pl + slot * i + (slot - barWidth) / 2,
      y: pt + chartH - (v / max) * chartH,
      w: barWidth,
      h: (v / max) * chartH,
      month: months[i],
      value: v,
    })),
  }
})

// ====== Donut ======
const donut = computed(() => {
  const C = 2 * Math.PI * 65
  const data = [
    { label: 'Google', val: 42, color: '#465fff' },
    { label: 'Direto', val: 24, color: '#12b76a' },
    { label: 'Social', val: 18, color: '#f79009' },
    { label: 'Email', val: 10, color: '#ec4899' },
    { label: 'Outros', val: 6, color: '#0ba5ec' },
  ]
  const total = data.reduce((s, d) => s + d.val, 0)
  let acc = -90
  return {
    C,
    total: '24,8k',
    segments: data.map((d) => {
      const pct = Math.round((d.val / total) * 100)
      const seg = { ...d, pct, dash: (d.val / total) * C, rot: acc }
      acc += (d.val / total) * 360
      return seg
    }),
  }
})

// ====== Area chart ======
const tabs = ['Novos', 'Recorrentes', 'Total'] as const
const areaTab = ref<(typeof tabs)[number]>('Novos')

const area = computed(() => {
  const weeks = 24
  const seed = areaTab.value === 'Novos' ? 1 : areaTab.value === 'Recorrentes' ? 2 : 3
  const values: number[] = []
  for (let i = 0; i < weeks; i++) {
    values.push(20 + Math.round(Math.sin(i / 2 + seed) * 15 + i * 1.6 + (i % 3) * 4))
  }
  const w = 800
  const h = 240
  const pl = 40
  const pr = 10
  const pt = 20
  const pb = 30
  const chartW = w - pl - pr
  const chartH = h - pt - pb
  const max = Math.max(...values, 80)
  const stepX = chartW / (values.length - 1)
  const points = values.map((v, i) => ({
    x: pl + i * stepX,
    y: pt + chartH - (v / max) * chartH,
  }))
  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${pt + chartH} L ${points[0].x} ${pt + chartH} Z`
  const grid = [0, 25, 50, 75, 100].map((v) => ({
    y: pt + chartH - (v / 100) * chartH,
    label: v,
  }))
  return { points, linePath, areaPath, grid }
})

// ====== Funnel ======
const funnel = [
  { label: 'Visitantes', value: 24800, pct: 100 },
  { label: 'Visualizações de produto', value: 18650, pct: 75 },
  { label: 'Carrinho', value: 8240, pct: 33 },
  { label: 'Checkout iniciado', value: 4120, pct: 17 },
  { label: 'Compra concluída', value: 2480, pct: 10 },
]

// ====== Product performance ======
const products = [
  { name: 'Plano Pro Anual', revenue: '58.420', pct: 92, color: 'var(--color-brand-500)' },
  { name: 'Plano Start Mensal', revenue: '34.180', pct: 68, color: 'var(--color-success-500)' },
  { name: 'Add-on Storage', revenue: '21.350', pct: 48, color: 'var(--color-warning-500)' },
  { name: 'Plano Enterprise', revenue: '18.900', pct: 38, color: 'var(--color-blue-light-500)' },
  { name: 'Treinamentos', revenue: '9.640', pct: 22, color: 'var(--color-error-500)' },
]
</script>
