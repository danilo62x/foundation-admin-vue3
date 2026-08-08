<template>
  <div class="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-brand-50 via-white to-brand-100 px-4 dark:from-gray-900 dark:via-gray-dark dark:to-gray-900">
    <div class="absolute inset-0 -z-10 overflow-hidden">
      <div class="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-brand-200/40 blur-3xl dark:bg-brand-500/10" />
      <div class="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-warning-100/60 blur-3xl dark:bg-brand-700/10" />
    </div>

    <div class="w-full max-w-lg text-center">
      <span class="block text-[6rem] font-bold leading-none text-brand-500 sm:text-[8rem]">
        404
      </span>

      <h1 class="mt-4 text-title-md font-bold text-heading">Página não encontrada</h1>

      <p class="mx-auto mt-3 max-w-md text-sm text-muted">
        A página que você está procurando não existe, foi removida ou mudou de endereço.
        Verifique o link ou volte para um lugar seguro.
      </p>

      <div class="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <RouterLink
          to="/"
          class="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-brand-500 px-6 text-sm font-medium text-white shadow-theme-xs transition hover:bg-brand-600 focus-ring sm:w-auto"
        >
          <IconBase name="arrow-up" :size="18" class="-rotate-90" />
          Voltar ao início
        </RouterLink>
        <RouterLink
          to="/dashboard"
          class="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-themed bg-white px-6 text-sm font-medium text-body shadow-theme-xs transition hover:bg-gray-50 focus-ring dark:bg-gray-900 dark:hover:bg-gray-800 sm:w-auto"
        >
          <IconBase name="dashboard" :size="18" />
          Ir para o dashboard
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
onMounted(() => ui.setPageTitle('Não encontrado'))
</script>
