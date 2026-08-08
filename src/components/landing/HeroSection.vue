<template>
  <section
    id="hero"
    class="relative scroll-mt-20 overflow-hidden bg-gradient-to-br from-brand-50 via-white to-brand-100 dark:from-gray-900 dark:via-gray-dark dark:to-gray-900"
  >
    <div class="absolute inset-0 -z-10 overflow-hidden">
      <div class="absolute -top-40 -right-32 h-96 w-96 rounded-full bg-brand-300/40 blur-3xl dark:bg-brand-500/10" />
      <div class="absolute top-40 -left-40 h-96 w-96 rounded-full bg-warning-100/60 blur-3xl dark:bg-brand-700/10" />
    </div>

    <div class="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 md:py-28 lg:grid-cols-2 lg:gap-8 lg:px-8">
      <div class="text-center lg:text-left">
        <span class="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700 dark:border-brand-500/30 dark:bg-brand-500/10 dark:text-brand-400">
          <IconBase name="zap" :size="14" />
          Vue 3 + Foundation Sites 6
        </span>

        <h1 class="mt-5 text-title-sm font-bold leading-tight text-heading sm:text-title-md lg:text-title-lg">
          O template admin que acelera seu próximo produto
        </h1>
        <p class="mx-auto mt-5 max-w-xl text-base text-muted lg:mx-0 md:text-lg">
          Componentes prontos, dark mode, internacionalização e performance de primeira.
          Lance sua aplicação em dias, não meses.
        </p>

        <div class="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
          <RouterLink
            to="/register"
            class="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-brand-500 px-6 text-sm font-semibold text-white shadow-theme-md transition hover:bg-brand-600 focus-ring sm:w-auto"
          >
            <IconBase name="rocket" :size="18" />
            Começar grátis
          </RouterLink>
          <RouterLink
            to="/dashboard"
            class="surface-card inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg border px-6 text-sm font-semibold text-body shadow-theme-xs transition hover:bg-gray-50 dark:hover:bg-gray-800 sm:w-auto"
          >
            Ver demo
            <IconBase name="chevron-right" :size="18" />
          </RouterLink>
        </div>

        <div class="mt-8 flex flex-col items-center gap-3 text-sm text-muted sm:flex-row lg:justify-start">
          <div class="flex -space-x-2">
            <span
              v-for="c in AVATARS"
              :key="c"
              class="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white text-white dark:border-gray-dark"
              :style="{ background: c }"
            >
              <IconBase name="user" :size="14" />
            </span>
          </div>
          <span>
            <strong class="text-heading">+2.000 equipes</strong> já constroem com a gente
          </span>
        </div>
      </div>

      <div class="relative">
        <div class="surface-card rounded-2xl border p-5 shadow-theme-xl">
          <div class="flex items-center gap-1.5 border-b border-themed pb-4">
            <span class="h-3 w-3 rounded-full bg-error-400" />
            <span class="h-3 w-3 rounded-full bg-warning-400" />
            <span class="h-3 w-3 rounded-full bg-success-400" />
            <span class="ml-3 text-xs text-muted">app.template.com</span>
          </div>

          <div class="mt-4 grid grid-cols-3 gap-3">
            <div
              v-for="s in STATS"
              :key="s.label"
              class="rounded-xl border border-themed bg-gray-50/60 p-3 dark:bg-gray-900/40"
            >
              <p class="text-xs text-muted">{{ s.label }}</p>
              <p class="mt-1 text-lg font-bold text-heading">{{ s.value }}</p>
              <span
                class="mt-1 inline-flex items-center gap-1 text-[11px] font-medium"
                :class="
                  s.accent === 'success'
                    ? 'text-success-600'
                    : s.accent === 'warning'
                      ? 'text-warning-600'
                      : 'text-brand-600'
                "
              >
                <IconBase name="trending-up" :size="12" />
                +12%
              </span>
            </div>
          </div>

          <div class="mt-4 rounded-xl border border-themed p-4">
            <div class="flex items-center justify-between">
              <p class="text-sm font-semibold text-heading">Visão geral</p>
              <span class="rounded-full bg-brand-50 px-2 py-0.5 text-[11px] font-medium text-brand-700 dark:bg-brand-500/10 dark:text-brand-400">
                7 dias
              </span>
            </div>
            <div class="mt-4 flex h-32 items-end gap-2">
              <div
                v-for="(h, i) in BARS"
                :key="i"
                class="flex-1 rounded-t-md bg-gradient-to-t from-brand-200 to-brand-500 dark:from-brand-500/40 dark:to-brand-500"
                :style="{ height: `${h}%` }"
              />
            </div>
          </div>
        </div>

        <div class="absolute -bottom-4 -left-4 hidden rounded-xl border border-themed bg-white p-3 shadow-theme-lg dark:bg-gray-dark sm:block">
          <div class="flex items-center gap-2">
            <span class="flex h-9 w-9 items-center justify-center rounded-lg bg-success-50 text-success-600 dark:bg-success-500/15">
              <IconBase name="check" :size="18" :stroke-width="2.5" />
            </span>
            <div>
              <p class="text-xs font-semibold text-heading">Deploy pronto</p>
              <p class="text-[11px] text-muted">build otimizado</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import IconBase from '@/components/ui/IconBase.vue'

const STATS = [
  { label: 'Receita', value: 'R$ 84.2k', accent: 'brand' },
  { label: 'Usuários', value: '12.480', accent: 'success' },
  { label: 'Conversão', value: '4,8%', accent: 'warning' },
]

const BARS = [42, 68, 55, 80, 62, 95, 74]

const AVATARS = ['#465fff', '#12b76a', '#f79009', '#0ba5ec']
</script>
