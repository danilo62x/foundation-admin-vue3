<template>
  <div class="space-y-1.5">
    <label v-if="label" class="block text-sm font-medium text-heading">{{ label }}</label>
    <VueDatePicker
      :model-value="modelValue"
      :enable-time-picker="showTime"
      :dark="ui.darkMode"
      :format="showTime ? 'dd/MM/yyyy HH:mm' : 'dd/MM/yyyy'"
      :placeholder="placeholder"
      auto-apply
      @update:model-value="emit('update:modelValue', $event)"
    />
  </div>
</template>

<script setup lang="ts">
import { VueDatePicker } from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { useUiStore } from '@/stores/ui'

withDefaults(
  defineProps<{ modelValue: Date | null; label?: string; showTime?: boolean; placeholder?: string }>(),
  { showTime: false, placeholder: 'Selecione uma data' }
)
const emit = defineEmits<{ 'update:modelValue': [value: Date | null] }>()
const ui = useUiStore()
</script>

<style>
:root {
  --dp-primary-color: var(--color-brand-500);
  --dp-border-radius: 8px;
}
.dp__input {
  font-family: var(--font-sans);
}
</style>
