<script setup lang="ts">
import { ref, computed } from 'vue'
import { ArrowUp } from 'lucide-vue-next'

const emit = defineEmits<{
  submit: [message: string]
}>()

defineProps<{
  disabled?: boolean
}>()

const inputValue = ref('')
const textareaRef = ref<HTMLTextAreaElement | null>(null)

const canSubmit = computed(() => inputValue.value.trim().length > 0)

function handleSubmit() {
  if (!canSubmit.value) return
  emit('submit', inputValue.value.trim())
  inputValue.value = ''
  resetHeight()
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault()
    handleSubmit()
  }
}

function autoResize() {
  const textarea = textareaRef.value
  if (!textarea) return
  textarea.style.height = 'auto'
  textarea.style.height = Math.min(textarea.scrollHeight, 200) + 'px'
}

function resetHeight() {
  const textarea = textareaRef.value
  if (!textarea) return
  textarea.style.height = 'auto'
}
</script>

<template>
  <div class="flex-shrink-0 border-t border-border bg-background px-4 py-4">
    <div class="max-w-3xl mx-auto">
      <div class="relative flex items-end gap-2 p-2 bg-muted/50 border border-border rounded-2xl focus-within:border-ring focus-within:ring-1 focus-within:ring-ring transition-all">
        <textarea
          ref="textareaRef"
          v-model="inputValue"
          @keydown="handleKeydown"
          @input="autoResize"
          :disabled="disabled"
          placeholder="Message Analytics Chat..."
          rows="1"
          class="flex-1 resize-none bg-transparent text-foreground placeholder:text-muted-foreground text-sm leading-6 px-2 py-1.5 focus:outline-none disabled:opacity-50 max-h-[200px]"
        />
        <button
          @click="handleSubmit"
          :disabled="!canSubmit || disabled"
          class="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all"
          :class="canSubmit && !disabled
            ? 'bg-foreground text-background hover:opacity-80 cursor-pointer'
            : 'bg-muted text-muted-foreground cursor-not-allowed'"
        >
          <ArrowUp class="w-4 h-4" />
        </button>
      </div>
      <p class="text-xs text-muted-foreground text-center mt-2">
        Press Enter to send, Shift + Enter for new line
      </p>
    </div>
  </div>
</template>

