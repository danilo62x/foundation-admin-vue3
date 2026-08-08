<template>
  <div class="inline-flex items-center gap-0.5" role="radiogroup">
    <button
      v-for="n in max"
      :key="n"
      type="button"
      :disabled="readonly"
      :aria-label="`${n} de ${max}`"
      class="transition"
      :class="readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110'"
      @click="onClick(n)"
      @mouseenter="onEnter(n)"
      @mouseleave="onLeave"
    >
      <IconBase
        name="star"
        :size="size"
        :class="
          n <= display
            ? 'fill-warning-400 text-warning-400'
            : 'fill-transparent text-gray-300 dark:text-gray-600'
        "
      />
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import IconBase from './IconBase.vue'

const props = withDefaults(
  defineProps<{
    modelValue: number
    max?: number
    size?: number
    readonly?: boolean
  }>(),
  { max: 5, size: 24, readonly: false }
)

const emit = defineEmits<{ (e: 'update:modelValue', v: number): void }>()

const hover = ref(0)
const display = computed(() => hover.value || props.modelValue)

function onClick(n: number) {
  if (!props.readonly) emit('update:modelValue', n)
}
function onEnter(n: number) {
  if (!props.readonly) hover.value = n
}
function onLeave() {
  if (!props.readonly) hover.value = 0
}
</script>
