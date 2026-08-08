<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-title-sm font-bold text-heading">Tipografia</h1>
      <p class="mt-1 text-sm text-muted">Sistema editorial completo com escala, pesos e cores.</p>
    </div>

    <CardComponent title="Títulos" icon="type">
      <div class="space-y-3">
        <div v-for="h in headings" :key="h.tag" class="flex items-baseline justify-between border-b border-themed pb-3 last:border-b-0 last:pb-0">
          <component :is="h.tag" :class="['font-bold text-heading', h.class]">
            {{ h.label }}
          </component>
          <code class="rounded bg-gray-100 px-1.5 py-0.5 text-xs text-muted dark:bg-gray-800">{{ h.tag }}.{{ h.class }}</code>
        </div>
      </div>
    </CardComponent>

    <CardComponent title="Pesos de fonte" icon="type">
      <div class="space-y-3">
        <div v-for="w in weights" :key="w.class" class="flex items-baseline justify-between">
          <p :class="['text-lg text-heading', w.class]">{{ w.label }} — {{ w.value }}</p>
          <code class="rounded bg-gray-100 px-1.5 py-0.5 text-xs text-muted dark:bg-gray-800">{{ w.class }}</code>
        </div>
      </div>
    </CardComponent>

    <div class="grid grid-cols-1 gap-6 xl:grid-cols-2">
      <CardComponent title="Tamanhos de texto" icon="type">
        <div class="space-y-2">
          <p v-for="s in sizes" :key="s.class" :class="['text-heading', s.class]">
            {{ s.label }} <code class="ml-2 rounded bg-gray-100 px-1.5 py-0.5 text-xs text-muted dark:bg-gray-800">{{ s.class }}</code>
          </p>
        </div>
      </CardComponent>

      <CardComponent title="Transformações" icon="type">
        <div class="space-y-3 text-base">
          <p class="capitalize text-body">capitalized text <span class="text-xs text-muted">.capitalize</span></p>
          <p class="lowercase text-body">LOWERCASE TEXT <span class="text-xs text-muted normal-case">.lowercase</span></p>
          <p class="uppercase text-body">uppercase text <span class="text-xs text-muted normal-case">.uppercase</span></p>
          <p class="italic text-body">Texto em itálico <span class="text-xs text-muted not-italic">.italic</span></p>
          <p class="text-body"><del>Texto riscado</del> <span class="text-xs text-muted">&lt;del&gt;</span></p>
          <p class="text-body"><u>Texto sublinhado</u> <span class="text-xs text-muted no-underline">&lt;u&gt;</span></p>
          <p class="text-body">Texto com <mark class="bg-warning-100 px-1 dark:bg-warning-500/30 dark:text-warning-100">destaque</mark></p>
        </div>
      </CardComponent>
    </div>

    <CardComponent title="Cores de texto" icon="palette">
      <div class="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        <div
          v-for="c in colors"
          :key="c.class"
          class="rounded-lg border border-themed p-3"
        >
          <p :class="['text-base font-semibold', c.class]">{{ c.label }}</p>
          <code class="text-[10px] text-muted">{{ c.class }}</code>
        </div>
      </div>
    </CardComponent>

    <CardComponent title="Escala do design system" icon="type">
      <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        <div
          v-for="s in scale"
          :key="s.label"
          class="flex flex-col items-center rounded-xl border border-themed p-4"
        >
          <p class="text-heading" :style="{ fontSize: s.size, fontWeight: s.bold ? 700 : 400, lineHeight: 1.2 }">
            Aa
          </p>
          <p class="mt-3 text-sm font-semibold text-heading">{{ s.label }}</p>
          <p class="text-xs text-muted">{{ s.size }} · {{ s.usage }}</p>
        </div>
      </div>
    </CardComponent>

    <div class="grid grid-cols-1 gap-6 xl:grid-cols-2">
      <CardComponent title="Alinhamento" icon="type">
        <div class="space-y-2">
          <p class="rounded-lg border border-themed p-3 text-left text-sm text-body">Alinhado à esquerda <code class="text-xs text-muted">.text-left</code></p>
          <p class="rounded-lg border border-themed p-3 text-center text-sm text-body">Centralizado <code class="text-xs text-muted">.text-center</code></p>
          <p class="rounded-lg border border-themed p-3 text-right text-sm text-body">Alinhado à direita <code class="text-xs text-muted">.text-right</code></p>
          <p class="rounded-lg border border-themed p-3 text-justify text-sm text-body">
            Justificado: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </CardComponent>

      <CardComponent title="Citação & código" icon="type">
        <blockquote class="border-l-4 border-brand-500 bg-brand-50/40 p-4 italic text-body dark:bg-brand-500/10">
          "A boa tipografia cria harmonia entre forma e função."
          <footer class="mt-2 text-xs not-italic text-muted">— Ellen Lupton</footer>
        </blockquote>
        <pre class="mt-4 overflow-x-auto rounded-lg bg-gray-900 p-4 text-sm text-gray-100"><code>const greet = (name: string) =&gt; {
  return `Olá, ${name}!`
}

greet('Mundo')</code></pre>
      </CardComponent>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useUiStore } from '@/stores/ui'
import CardComponent from '@/components/ui/CardComponent.vue'

const ui = useUiStore()
onMounted(() => ui.setPageTitle('Tipografia'))

const headings = [
  { tag: 'h1', label: 'Heading 1', class: 'text-title-md' },
  { tag: 'h2', label: 'Heading 2', class: 'text-title-sm' },
  { tag: 'h3', label: 'Heading 3', class: 'text-2xl' },
  { tag: 'h4', label: 'Heading 4', class: 'text-xl' },
  { tag: 'h5', label: 'Heading 5', class: 'text-lg' },
  { tag: 'h6', label: 'Heading 6', class: 'text-base' },
]

const weights = [
  { class: 'font-light', value: 300, label: 'Light' },
  { class: 'font-normal', value: 400, label: 'Normal' },
  { class: 'font-medium', value: 500, label: 'Medium' },
  { class: 'font-semibold', value: 600, label: 'Semibold' },
  { class: 'font-bold', value: 700, label: 'Bold' },
  { class: 'font-extrabold', value: 800, label: 'Extra Bold' },
]

const sizes = [
  { class: 'text-xs', label: 'Tamanho XS (0.75rem)' },
  { class: 'text-sm', label: 'Tamanho SM (0.875rem)' },
  { class: 'text-base', label: 'Tamanho Base (1rem)' },
  { class: 'text-lg', label: 'Tamanho LG (1.125rem)' },
  { class: 'text-xl', label: 'Tamanho XL (1.25rem)' },
  { class: 'text-2xl', label: 'Tamanho 2XL (1.5rem)' },
]

const colors = [
  { class: 'text-brand-500', label: 'Primary' },
  { class: 'text-success-600', label: 'Success' },
  { class: 'text-warning-600', label: 'Warning' },
  { class: 'text-error-500', label: 'Danger' },
  { class: 'text-blue-light-500', label: 'Info' },
  { class: 'text-heading', label: 'Heading' },
  { class: 'text-body', label: 'Body' },
  { class: 'text-muted', label: 'Muted' },
]

const scale = [
  { label: 'Display', size: '3rem', usage: 'Hero, titles', bold: true },
  { label: 'H1', size: '2.25rem', usage: 'Page title', bold: true },
  { label: 'H2', size: '1.875rem', usage: 'Section', bold: true },
  { label: 'H3', size: '1.5rem', usage: 'Card title', bold: true },
  { label: 'Body', size: '1rem', usage: 'Default text', bold: false },
  { label: 'Small', size: '0.875rem', usage: 'Labels', bold: false },
  { label: 'Caption', size: '0.75rem', usage: 'Meta, badges', bold: false },
  { label: 'Tiny', size: '0.625rem', usage: 'Footnotes', bold: false },
]
</script>
