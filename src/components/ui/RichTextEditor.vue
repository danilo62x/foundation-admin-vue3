<template>
  <div class="surface-card overflow-hidden rounded-xl border">
    <div v-if="editor" class="flex flex-wrap items-center gap-1 border-b border-themed p-2">
      <button type="button" :class="btn(editor.isActive('bold'))" @click="editor.chain().focus().toggleBold().run()">B</button>
      <button type="button" :class="btn(editor.isActive('italic'))" @click="editor.chain().focus().toggleItalic().run()"><em>I</em></button>
      <button type="button" :class="btn(editor.isActive('strike'))" @click="editor.chain().focus().toggleStrike().run()"><s>S</s></button>
      <button type="button" :class="btn(editor.isActive('code'))" @click="editor.chain().focus().toggleCode().run()">&lt;/&gt;</button>
      <span class="mx-1 h-5 w-px bg-gray-200 dark:bg-white/10" />
      <button type="button" :class="btn(editor.isActive('heading', { level: 1 }))" @click="editor.chain().focus().toggleHeading({ level: 1 }).run()">H1</button>
      <button type="button" :class="btn(editor.isActive('heading', { level: 2 }))" @click="editor.chain().focus().toggleHeading({ level: 2 }).run()">H2</button>
      <button type="button" :class="btn(editor.isActive('blockquote'))" @click="editor.chain().focus().toggleBlockquote().run()">❝</button>
      <span class="mx-1 h-5 w-px bg-gray-200 dark:bg-white/10" />
      <button type="button" :class="btn(editor.isActive('bulletList'))" @click="editor.chain().focus().toggleBulletList().run()">•</button>
      <button type="button" :class="btn(editor.isActive('orderedList'))" @click="editor.chain().focus().toggleOrderedList().run()">1.</button>
    </div>
    <EditorContent :editor="editor" class="tiptap-content min-h-40 px-4 py-3 text-sm text-body" />
  </div>
</template>

<script setup lang="ts">
import { watch, onBeforeUnmount } from 'vue'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'

const props = withDefaults(
  defineProps<{ modelValue?: string; placeholder?: string }>(),
  { modelValue: '<p></p>' }
)
const emit = defineEmits<{ 'update:modelValue': [value: string] }>()

const editor = useEditor({
  content: props.modelValue,
  extensions: [StarterKit],
  editorProps: { attributes: { class: 'focus:outline-none' } },
  onUpdate: ({ editor }) => emit('update:modelValue', editor.getHTML()),
})

watch(
  () => props.modelValue,
  (val) => {
    if (editor.value && val !== editor.value.getHTML())
      editor.value.commands.setContent(val, { emitUpdate: false })
  }
)

onBeforeUnmount(() => editor.value?.destroy())

function btn(active: boolean) {
  return [
    'h-8 min-w-8 rounded-md px-2 text-sm font-medium transition',
    active ? 'bg-brand-50 text-brand-600 dark:bg-brand-500/15' : 'text-muted hover:bg-gray-100 dark:hover:bg-white/5',
  ]
}
</script>

<style>
.tiptap-content h1 { font-size: 1.5rem; font-weight: 700; margin-bottom: 0.5rem; }
.tiptap-content h2 { font-size: 1.25rem; font-weight: 600; margin-bottom: 0.5rem; }
.tiptap-content p { margin-bottom: 0.5rem; }
.tiptap-content ul { list-style: disc; margin-left: 1.5rem; }
.tiptap-content ol { list-style: decimal; margin-left: 1.5rem; }
.tiptap-content blockquote { border-left: 4px solid var(--color-brand-500); padding-left: 0.75rem; font-style: italic; color: var(--tx-text-muted); }
.tiptap-content code { background: rgba(0,0,0,0.06); border-radius: 4px; padding: 0 4px; }
</style>
