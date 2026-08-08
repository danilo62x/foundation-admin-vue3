<template>
  <section id="contact" class="scroll-mt-20 bg-gray-50 py-20 dark:bg-gray-900/40 md:py-28">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-2xl text-center">
        <span class="text-sm font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
          Contato
        </span>
        <h2 class="mt-2 text-title-sm font-bold text-heading md:text-title-md">
          Fale com a gente
        </h2>
        <p class="mt-4 text-base text-muted md:text-lg">
          Tem dúvidas? Envie uma mensagem e nossa equipe responde rapidinho.
        </p>
      </div>

      <div class="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div class="flex flex-col justify-center gap-6">
          <div v-for="item in INFO" :key="item.label" class="flex items-start gap-4">
            <span class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400">
              <IconBase :name="item.icon" :size="22" />
            </span>
            <div>
              <p class="text-sm font-semibold text-heading">{{ item.label }}</p>
              <p class="mt-0.5 text-sm text-muted">{{ item.value }}</p>
            </div>
          </div>

          <div class="surface-card mt-2 rounded-2xl border p-5">
            <div class="flex items-center gap-2 text-success-600">
              <IconBase name="check" :size="18" :stroke-width="2.5" />
              <p class="text-sm font-semibold text-heading">Resposta em até 24h</p>
            </div>
            <p class="mt-2 text-sm text-muted">
              Atendimento de segunda a sexta, das 9h às 18h (horário de Brasília).
            </p>
          </div>
        </div>

        <form
          class="surface-card rounded-2xl border p-6 shadow-theme-sm md:p-8"
          @submit.prevent="handleSubmit"
        >
          <div class="space-y-5">
            <div>
              <label class="mb-2 block text-sm font-medium text-heading" for="contact-nome">
                Nome
              </label>
              <input
                id="contact-nome"
                v-model="nome"
                type="text"
                required
                placeholder="Seu nome"
                class="h-11 w-full rounded-lg border border-themed bg-gray-50 px-3 text-sm text-body placeholder-gray-400 outline-none focus:border-brand-300 focus-ring dark:bg-gray-900"
              />
            </div>

            <div>
              <label class="mb-2 block text-sm font-medium text-heading" for="contact-email">
                Email
              </label>
              <input
                id="contact-email"
                v-model="email"
                type="email"
                required
                placeholder="seu@email.com"
                class="h-11 w-full rounded-lg border border-themed bg-gray-50 px-3 text-sm text-body placeholder-gray-400 outline-none focus:border-brand-300 focus-ring dark:bg-gray-900"
              />
            </div>

            <div>
              <label class="mb-2 block text-sm font-medium text-heading" for="contact-mensagem">
                Mensagem
              </label>
              <textarea
                id="contact-mensagem"
                v-model="mensagem"
                required
                :rows="4"
                placeholder="Como podemos ajudar?"
                class="w-full resize-none rounded-lg border border-themed bg-gray-50 px-3 py-2.5 text-sm text-body placeholder-gray-400 outline-none focus:border-brand-300 focus-ring dark:bg-gray-900"
              />
            </div>

            <button
              type="submit"
              class="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-brand-500 text-sm font-medium text-white shadow-theme-xs transition hover:bg-brand-600 focus-ring"
            >
              <IconBase name="mail" :size="18" />
              Enviar mensagem
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUiStore } from '@/stores/ui'
import IconBase from '@/components/ui/IconBase.vue'

const INFO = [
  { icon: 'mail', label: 'Email', value: 'contato@template.com' },
  { icon: 'bell', label: 'Telefone', value: '+55 (11) 4002-8922' },
  { icon: 'globe', label: 'Endereço', value: 'Av. Paulista, 1000 — São Paulo, SP' },
]

const ui = useUiStore()
const nome = ref('')
const email = ref('')
const mensagem = ref('')

function handleSubmit() {
  ui.notifySuccess('Mensagem enviada!')
  nome.value = ''
  email.value = ''
  mensagem.value = ''
}
</script>
