<template>
  <div class="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-brand-50 via-white to-brand-100 px-4 dark:from-gray-900 dark:via-gray-dark dark:to-gray-900">
    <div class="absolute inset-0 -z-10 overflow-hidden">
      <div class="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-brand-200/40 blur-3xl dark:bg-brand-500/10" />
      <div class="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-warning-100/60 blur-3xl dark:bg-brand-700/10" />
    </div>

    <div class="w-full max-w-xl text-center">
      <span class="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-brand-500 text-white shadow-theme-md">
        <IconBase name="rocket" :size="40" />
      </span>

      <h1 class="mt-8 text-title-md font-bold text-heading">Em breve</h1>

      <p class="mx-auto mt-3 max-w-md text-sm text-muted">
        Estamos preparando algo incrível para você. Inscreva-se abaixo e seja o primeiro a saber
        quando lançarmos.
      </p>

      <div class="mt-8 grid grid-cols-4 gap-3">
        <div
          v-for="unit in units"
          :key="unit.label"
          class="surface-card flex flex-col items-center rounded-2xl border px-2 py-4 shadow-theme-xs"
        >
          <span class="text-title-sm font-bold tabular-nums text-heading sm:text-title-md">
            {{ String(unit.value).padStart(2, '0') }}
          </span>
          <span class="mt-1 text-xs font-medium uppercase tracking-wide text-muted">
            {{ unit.label }}
          </span>
        </div>
      </div>

      <form
        @submit.prevent="handleSubscribe"
        class="mx-auto mt-8 flex w-full max-w-md flex-col gap-3 sm:flex-row"
      >
        <div class="relative flex-1">
          <span class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <IconBase name="mail" :size="18" />
          </span>
          <input
            v-model="email"
            type="email"
            required
            placeholder="seu@email.com"
            class="h-11 w-full rounded-lg border border-themed bg-white pl-10 pr-3 text-sm text-body placeholder-gray-400 outline-none focus:border-brand-300 focus-ring dark:bg-gray-900"
          />
        </div>
        <button
          type="submit"
          class="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-brand-500 px-6 text-sm font-medium text-white shadow-theme-xs transition hover:bg-brand-600 focus-ring"
        >
          <IconBase name="bell" :size="18" />
          Avise-me
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import IconBase from '@/components/ui/IconBase.vue'
import { useUiStore } from '@/stores/ui'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function getTimeLeft(target: number): TimeLeft {
  const diff = Math.max(0, target - Date.now())
  const totalSeconds = Math.floor(diff / 1000)
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  }
}

const ui = useUiStore()

// Alvo fixo: ~30 dias a partir do carregamento do componente.
const target = Date.now() + 30 * 24 * 60 * 60 * 1000

const timeLeft = ref<TimeLeft>(getTimeLeft(target))
const email = ref('')

let interval: ReturnType<typeof setInterval> | undefined

const units = computed<{ label: string; value: number }[]>(() => [
  { label: 'Dias', value: timeLeft.value.days },
  { label: 'Horas', value: timeLeft.value.hours },
  { label: 'Minutos', value: timeLeft.value.minutes },
  { label: 'Segundos', value: timeLeft.value.seconds },
])

function handleSubscribe() {
  ui.notifySuccess('Você será avisado!')
  email.value = ''
}

onMounted(() => {
  ui.setPageTitle('Em breve')
  interval = setInterval(() => {
    timeLeft.value = getTimeLeft(target)
  }, 1000)
})

onUnmounted(() => {
  if (interval) clearInterval(interval)
})
</script>
