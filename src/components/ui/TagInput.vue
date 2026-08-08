<template>
  <div
    class="flex min-h-11 flex-wrap items-center gap-1.5 rounded-lg border border-themed bg-white px-2 py-1.5 transition focus-within:border-brand-300 focus-within:shadow-[0_0_0_4px_rgba(70,95,255,0.12)] dark:bg-gray-900"
  >
    <span
      v-for="t in modelValue"
      :key="t"
      class="inline-flex items-center gap-1 rounded-md bg-brand-50 py-1 pl-2 pr-1 text-xs font-medium text-brand-700 dark:bg-brand-500/15 dark:text-brand-400"
    >
      {{ t }}
      <button
        type="button"
        :aria-label="`Remover ${t}`"
        class="rounded p-0.5 text-brand-500 transition hover:bg-brand-100 hover:text-brand-700 dark:hover:bg-brand-500/25"
        @click="removeTag(t)"
      >
        <IconBase name="x" :size="12" :stroke-width="2.5" />
      </button>
    </span>
    <input
      v-model="text"
      :placeholder="modelValue.length === 0 ? placeholder : ''"
      class="h-7 min-w-[6rem] flex-1 bg-transparent px-1 text-sm text-body outline-none placeholder:text-muted"
      @keydown="handleKey"
      @blur="addTag(text)"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import IconBase from './IconBase.vue'

const props = withDefaults(
  defineProps<{
    modelValue: string[]
    placeholder?: string
    /** max number of tags allowed */
    max?: number
  }>(),
  { placeholder: 'Adicionar…' }
)

const emit = defineEmits<{ (e: 'update:modelValue', v: string[]): void }>()

const text = ref('')

function addTag(raw: string) {
  const t = raw.trim()
  if (!t || props.modelValue.includes(t)) return
  if (props.max != null && props.modelValue.length >= props.max) return
  emit('update:modelValue', [...props.modelValue, t])
  text.value = ''
}

function removeTag(t: string) {
  emit(
    'update:modelValue',
    props.modelValue.filter((v) => v !== t)
  )
}

function handleKey(e: KeyboardEvent) {
  if (e.key === 'Enter' || e.key === ',') {
    e.preventDefault()
    addTag(text.value)
  } else if (e.key === 'Backspace' && text.value === '' && props.modelValue.length > 0) {
    removeTag(props.modelValue[props.modelValue.length - 1])
  }
}
</script>
