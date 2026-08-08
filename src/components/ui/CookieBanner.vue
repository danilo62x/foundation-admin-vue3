<template>
  <Transition name="cookie-slide">
    <div
      v-if="ui.showCookieBanner"
      class="fixed inset-x-4 bottom-4 z-50 mx-auto flex max-w-2xl flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark sm:flex-row sm:items-center sm:gap-4 sm:p-5"
    >
      <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-warning-50 text-warning-500 dark:bg-warning-500/15">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2a10 10 0 1 0 10 10 6 6 0 0 1-8-8 6 6 0 0 1-2-2zm-2.5 7.5a1.5 1.5 0 1 1-1.5 1.5 1.5 1.5 0 0 1 1.5-1.5zm0 6a1.5 1.5 0 1 1-1.5 1.5 1.5 1.5 0 0 1 1.5-1.5zm5 1a1.5 1.5 0 1 1-1.5 1.5 1.5 1.5 0 0 1 1.5-1.5zm.5-5a1 1 0 1 1-1 1 1 1 0 0 1 1-1z"/>
        </svg>
      </div>

      <div class="flex-1">
        <p class="text-sm font-semibold text-heading">Usamos cookies</p>
        <p class="mt-1 text-xs leading-relaxed text-muted">
          Utilizamos cookies para melhorar sua experiência, personalizar conteúdo e analisar o tráfego.
          Ao continuar navegando, você concorda com a nossa
          <a href="#" class="font-medium text-brand-500 hover:text-brand-600" @click.prevent="ui.notify('Abrindo política de privacidade...', 'info')">
            Política de Privacidade</a>.
        </p>
      </div>

      <div class="flex items-center gap-2">
        <button
          type="button"
          class="inline-flex h-9 items-center rounded-lg border border-gray-200 px-3 text-sm font-medium text-body hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
          @click="ui.declineCookies()"
        >
          Recusar
        </button>
        <button
          type="button"
          class="inline-flex h-9 items-center gap-1.5 rounded-lg bg-brand-500 px-3 text-sm font-medium text-white shadow-theme-xs hover:bg-brand-600"
          @click="ui.acceptCookies()"
        >
          <IconBase name="check" :size="14" :stroke-width="2.5" /> Aceitar
        </button>
        <button
          type="button"
          class="ml-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          aria-label="Fechar"
          @click="ui.closeCookieBanner()"
        >
          <IconBase name="x" :size="18" />
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useUiStore } from '@/stores/ui'
import IconBase from './IconBase.vue'

const ui = useUiStore()

onMounted(() => {
  if (!ui.cookiesAccepted) ui.openCookieBanner()
})
</script>

<style scoped>
.cookie-slide-enter-active,
.cookie-slide-leave-active {
  transition: all 0.3s ease;
}
.cookie-slide-enter-from,
.cookie-slide-leave-to {
  opacity: 0;
  transform: translateY(40px);
}
</style>
