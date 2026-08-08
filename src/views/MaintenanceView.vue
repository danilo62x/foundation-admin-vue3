<template>
  <div class="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-brand-50 via-white to-brand-100 px-4 dark:from-gray-900 dark:via-gray-dark dark:to-gray-900">
    <div class="absolute inset-0 -z-10 overflow-hidden">
      <div class="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-brand-200/40 blur-3xl dark:bg-brand-500/10" />
      <div class="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-warning-100/60 blur-3xl dark:bg-brand-700/10" />
    </div>

    <div class="w-full max-w-lg text-center">
      <span class="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-brand-500 text-white shadow-theme-md">
        <IconBase name="settings" :size="40" />
      </span>

      <h1 class="mt-8 text-title-md font-bold text-heading">Estamos em manutenção</h1>

      <p class="mx-auto mt-3 max-w-md text-sm text-muted">
        Nosso sistema está passando por uma atualização programada para melhorar sua experiência.
        Voltaremos em instantes. Agradecemos a sua paciência.
      </p>

      <div class="mt-6 inline-flex items-center gap-2 rounded-full border border-themed bg-white/70 px-4 py-2 text-sm font-medium text-body shadow-theme-xs dark:bg-gray-900/60">
        <span class="h-2 w-2 animate-pulse rounded-full bg-warning-500" />
        Tempo estimado: aproximadamente 2 horas
      </div>

      <div class="mt-8">
        <RouterLink
          to="/"
          class="inline-flex h-11 items-center gap-2 rounded-lg bg-brand-500 px-6 text-sm font-medium text-white shadow-theme-xs transition hover:bg-brand-600 focus-ring"
        >
          <IconBase name="arrow-up" :size="18" class="-rotate-90" />
          Voltar ao início
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import IconBase from '@/components/ui/IconBase.vue'
import { useUiStore } from '@/stores/ui'

const ui = useUiStore()
onMounted(() => ui.setPageTitle('Em manutenção'))
</script>
