<template>
  <footer class="surface-header border-t px-4 py-4 md:px-6 2xl:px-10">
    <div class="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
      <p class="text-xs text-muted">
        © {{ year }} Foundation Admin Template. Construído com Vue 3 + TypeScript + Foundation Sites 6.
      </p>
      <div class="flex items-center gap-4 text-xs text-muted">
        <a href="#" class="hover:text-brand-500">Documentação</a>
        <a href="#" class="hover:text-brand-500">Suporte</a>
        <a href="#" class="hover:text-brand-500">Changelog</a>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const year = new Date().getFullYear()
</script>
