<template>
  <div class="space-y-6">
    <CardComponent>
      <div class="flex flex-col items-center gap-6 md:flex-row md:items-start md:justify-between">
        <div class="flex flex-col items-center gap-4 md:flex-row md:items-center">
          <span class="flex h-20 w-20 items-center justify-center rounded-full bg-brand-500 text-2xl font-bold text-white shadow-theme-md">
            {{ initials }}
          </span>
          <div class="text-center md:text-left">
            <h1 class="text-xl font-semibold text-heading">
              {{ auth.user?.name || 'Convidado' }}
            </h1>
            <p class="text-sm text-muted">{{ auth.user?.role || '—' }}</p>
            <p class="mt-1 text-xs text-muted">{{ auth.user?.email || '' }}</p>
            <div class="mt-3 flex flex-wrap items-center justify-center gap-2 md:justify-start">
              <span class="inline-flex rounded-full bg-success-50 px-2 py-0.5 text-xs font-medium text-success-700 dark:bg-success-500/15 dark:text-success-500">
                <span class="mr-1 inline-flex h-2 w-2 self-center rounded-full bg-success-500" /> Online
              </span>
              <span class="inline-flex rounded-full bg-brand-50 px-2 py-0.5 text-xs font-medium text-brand-700 dark:bg-brand-500/15 dark:text-brand-400">
                Premium
              </span>
            </div>
          </div>
        </div>
        <div class="flex gap-2">
          <button class="inline-flex h-10 items-center gap-2 rounded-lg border border-themed px-4 text-sm font-medium text-body hover:bg-gray-50 dark:hover:bg-gray-800">
            <IconBase name="mail" :size="16" /> Mensagem
          </button>
          <button class="inline-flex h-10 items-center gap-2 rounded-lg bg-brand-500 px-4 text-sm font-medium text-white shadow-theme-xs hover:bg-brand-600">
            <IconBase name="edit" :size="16" /> Editar perfil
          </button>
        </div>
      </div>
    </CardComponent>

    <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <div class="surface-card rounded-2xl border p-5 shadow-theme-sm">
        <p class="text-xs text-muted">Pedidos</p>
        <p class="mt-1 text-2xl font-bold text-heading">128</p>
      </div>
      <div class="surface-card rounded-2xl border p-5 shadow-theme-sm">
        <p class="text-xs text-muted">Projetos</p>
        <p class="mt-1 text-2xl font-bold text-heading">12</p>
      </div>
      <div class="surface-card rounded-2xl border p-5 shadow-theme-sm">
        <p class="text-xs text-muted">Membro desde</p>
        <p class="mt-1 text-2xl font-bold text-heading">2024</p>
      </div>
    </div>

    <div class="grid grid-cols-1 gap-6 xl:grid-cols-3">
      <CardComponent title="Informações pessoais" icon="user" class="xl:col-span-2">
        <dl class="grid grid-cols-1 gap-x-6 gap-y-4 text-sm sm:grid-cols-2">
          <div>
            <dt class="text-muted">Nome completo</dt>
            <dd class="mt-1 font-medium text-heading">{{ auth.user?.name || '—' }}</dd>
          </div>
          <div>
            <dt class="text-muted">Email</dt>
            <dd class="mt-1 font-medium text-heading">{{ auth.user?.email || '—' }}</dd>
          </div>
          <div>
            <dt class="text-muted">Telefone</dt>
            <dd class="mt-1 font-medium text-heading">+55 (11) 9 8765-4321</dd>
          </div>
          <div>
            <dt class="text-muted">Localização</dt>
            <dd class="mt-1 font-medium text-heading">São Paulo, BR</dd>
          </div>
          <div class="sm:col-span-2">
            <dt class="text-muted">Sobre</dt>
            <dd class="mt-1 text-body">
              Designer e desenvolvedor focado em produtos digitais com atenção a detalhes.
            </dd>
          </div>
        </dl>
      </CardComponent>

      <CardComponent title="Atividade recente" icon="bell">
        <ul class="space-y-4">
          <li v-for="item in activity" :key="item.id" class="flex items-start gap-3">
            <span class="mt-1 flex h-2 w-2 shrink-0 rounded-full bg-brand-500" />
            <div>
              <p class="text-sm font-medium text-heading">{{ item.title }}</p>
              <p class="text-xs text-muted">{{ item.time }}</p>
            </div>
          </li>
        </ul>
      </CardComponent>
    </div>

    <CardComponent title="Habilidades" icon="star">
      <div class="space-y-4">
        <div v-for="skill in skills" :key="skill.name">
          <div class="mb-1.5 flex items-center justify-between text-sm">
            <span class="font-medium text-heading">{{ skill.name }}</span>
            <span class="text-xs text-muted">{{ skill.level }}%</span>
          </div>
          <div class="h-2 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
            <div class="h-full rounded-full bg-brand-500" :style="{ width: skill.level + '%' }" />
          </div>
        </div>
      </div>
    </CardComponent>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useUiStore } from '@/stores/ui'
import { useAuthStore } from '@/stores/auth'
import CardComponent from '@/components/ui/CardComponent.vue'
import IconBase from '@/components/ui/IconBase.vue'

const ui = useUiStore()
const auth = useAuthStore()

onMounted(() => ui.setPageTitle('Meu Perfil'))

const initials = computed(() => {
  if (!auth.user) return '?'
  return auth.user.name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join('')
})

const activity = [
  { id: 1, title: 'Atualizou o perfil', time: 'Há 2 horas' },
  { id: 2, title: 'Aprovou pagamento #00023', time: 'Há 5 horas' },
  { id: 3, title: 'Comentou em "Roadmap 2026"', time: 'Ontem' },
  { id: 4, title: 'Entrou no time de Produto', time: 'Há 3 dias' },
]

const skills = [
  { name: 'Vue 3 / TypeScript', level: 92 },
  { name: 'Foundation CSS', level: 88 },
  { name: 'UX & Product Design', level: 76 },
  { name: 'Node.js', level: 70 },
  { name: 'Postgres / SQL', level: 65 },
]
</script>
