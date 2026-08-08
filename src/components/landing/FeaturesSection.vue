<template>
  <section id="features" class="scroll-mt-20 py-20 md:py-28">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-2xl text-center">
        <span class="text-sm font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
          Recursos
        </span>
        <h2 class="mt-2 text-title-sm font-bold text-heading md:text-title-md">
          Tudo que você precisa para construir
        </h2>
        <p class="mt-4 text-base text-muted md:text-lg">
          Uma base sólida e moderna para o seu próximo painel administrativo ou SaaS.
        </p>
      </div>

      <div class="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="f in FEATURES"
          :key="f.title"
          class="surface-card group rounded-2xl border p-6 shadow-theme-sm transition hover:-translate-y-1 hover:shadow-theme-lg"
        >
          <div
            class="flex h-12 w-12 items-center justify-center rounded-xl transition group-hover:scale-110"
            :style="{ background: f.color + '22', color: f.color }"
          >
            <IconBase :name="f.icon" :size="24" />
          </div>
          <h3 class="mt-5 text-lg font-bold text-heading">{{ f.title }}</h3>
          <p class="mt-2 text-sm leading-relaxed text-muted">{{ f.desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import IconBase from '@/components/ui/IconBase.vue'

const FEATURES = [
  {
    icon: 'zap',
    color: '#465fff',
    title: 'Performance de ponta',
    desc: 'Build com Vite 6 e Vue 3. Code-splitting automático e carregamento instantâneo.',
  },
  {
    icon: 'grid',
    color: '#0ba5ec',
    title: 'Componentes prontos',
    desc: 'Dezenas de componentes acessíveis e reutilizáveis para montar telas em minutos.',
  },
  {
    icon: 'globe',
    color: '#12b76a',
    title: 'Internacionalização',
    desc: 'Suporte a múltiplos idiomas com vue-i18n. Troque a língua sem recarregar a página.',
  },
  {
    icon: 'moon',
    color: '#7c3aed',
    title: 'Dark mode nativo',
    desc: 'Tema claro e escuro com tokens de design consistentes em toda a interface.',
  },
  {
    icon: 'shield',
    color: '#f79009',
    title: 'Segurança em primeiro lugar',
    desc: 'Autenticação, rotas protegidas e boas práticas de segurança já configuradas.',
  },
  {
    icon: 'package',
    color: '#f04438',
    title: 'PWA pronto',
    desc: 'Instalável, com suporte offline e cache inteligente para uma experiência de app.',
  },
]
</script>
