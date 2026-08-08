<template>
  <footer class="border-t border-themed bg-white dark:bg-gray-dark">
    <div class="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div class="grid grid-cols-2 gap-8 md:grid-cols-5">
        <div class="col-span-2">
          <div class="flex items-center gap-2.5">
            <span class="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500 text-lg font-bold text-white shadow-theme-md">
              A
            </span>
            <span class="text-lg font-bold text-heading">Admin Template</span>
          </div>
          <p class="mt-4 max-w-xs text-sm text-muted">
            O template admin moderno para acelerar o desenvolvimento do seu próximo produto.
          </p>
          <div class="mt-5 flex gap-2">
            <a
              v-for="icon in SOCIAL"
              :key="icon"
              href="#"
              :aria-label="icon"
              class="flex h-10 w-10 items-center justify-center rounded-full border border-themed text-muted transition hover:bg-gray-50 hover:text-brand-600 dark:hover:bg-gray-800"
            >
              <IconBase :name="icon" :size="18" />
            </a>
          </div>
        </div>

        <div v-for="col in COLUMNS" :key="col.title">
          <h3 class="text-sm font-semibold text-heading">{{ col.title }}</h3>
          <ul class="mt-4 space-y-3">
            <li v-for="link in col.links" :key="link">
              <a href="#" class="text-sm text-muted transition hover:text-brand-600">
                {{ link }}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="mt-12 flex flex-col items-center justify-between gap-4 border-t border-themed pt-6 sm:flex-row">
        <p class="text-sm text-muted">© 2026 Admin Template. Todos os direitos reservados.</p>
        <p class="flex items-center gap-1.5 text-sm text-muted">
          Feito com <IconBase name="zap" :size="14" class="text-brand-500" /> em Vue 3
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import IconBase from '@/components/ui/IconBase.vue'

const COLUMNS = [
  {
    title: 'Produto',
    links: ['Recursos', 'Preços', 'Integrações', 'Changelog'],
  },
  {
    title: 'Empresa',
    links: ['Sobre', 'Blog', 'Carreiras', 'Contato'],
  },
  {
    title: 'Legal',
    links: ['Privacidade', 'Termos', 'Cookies', 'Licença'],
  },
]

const SOCIAL = ['globe', 'mail', 'users', 'star']
</script>
