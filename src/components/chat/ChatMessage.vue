<script setup lang="ts">
import { ref, computed, nextTick } from 'vue'
import { User, Bot, Pencil, Check, X } from 'lucide-vue-next'
import type { Message } from '@/types/message'
import TextContent from './TextContent.vue'
import ThinkingIndicator from './ThinkingIndicator.vue'
import HistogramChart from './HistogramChart.vue'
import DataTable from './DataTable.vue'

const props = defineProps<{
  message: Message
}>()

const emit = defineEmits<{
  edit: [messageId: string, newValue: string]
}>()

const isEditing = ref(false)
const editValue = ref('')
const inputRef = ref<HTMLInputElement | null>(null)

const isUser = computed(() => props.message.role === 'user')
const hasThinking = computed(() => !!props.message.thinking)
const hasContent = computed(() => !!props.message.content)

function startEditing() {
  if (!isUser.value || !props.message.content || props.message.content.type !== 'text') return
  editValue.value = props.message.content.value
  isEditing.value = true
  nextTick(() => {
    inputRef.value?.focus()
    inputRef.value?.select()
  })
}

function cancelEditing() {
  isEditing.value = false
  editValue.value = ''
}

function submitEdit() {
  if (!editValue.value.trim()) return
  emit('edit', props.message.id, editValue.value.trim())
  isEditing.value = false
  editValue.value = ''
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault()
    submitEdit()
  } else if (event.key === 'Escape') {
    cancelEditing()
  }
}
</script>

<template>
  <div class="group flex gap-3" :class="isUser ? 'flex-row-reverse' : 'flex-row'">
    <div
      class="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
      :class="isUser ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'"
    >
      <User v-if="isUser" class="w-4 h-4" />
      <Bot v-else class="w-4 h-4" />
    </div>

    <div class="flex-1 max-w-[80%] space-y-2" :class="isUser ? 'items-end' : 'items-start'">
      <ThinkingIndicator v-if="hasThinking" :thinking="message.thinking!" />

      <div v-if="hasContent" class="space-y-3">
        <div v-if="isUser && message.content?.type === 'text'" class="relative">
          <div v-if="isEditing" class="flex items-center gap-2">
            <input
              ref="inputRef"
              v-model="editValue"
              type="text"
              class="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-2xl rounded-tr-sm text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              @keydown="handleKeydown"
            />
            <button
              @click="submitEdit"
              class="p-2 rounded-full bg-green-500 text-white hover:bg-green-600 transition-colors"
            >
              <Check class="w-4 h-4" />
            </button>
            <button
              @click="cancelEditing"
              class="p-2 rounded-full bg-muted text-muted-foreground hover:bg-muted/80 transition-colors"
            >
              <X class="w-4 h-4" />
            </button>
          </div>

          <div
            v-else
            class="relative px-4 py-2 bg-primary text-primary-foreground rounded-2xl rounded-tr-sm cursor-pointer hover:ring-2 hover:ring-ring/50 transition-all"
            @click="startEditing"
          >
            <p class="text-sm">{{ message.content.value }}</p>
            <Pencil class="absolute -left-8 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>

        <div
          v-else-if="message.content?.type === 'text'"
          class="px-4 py-2 bg-secondary rounded-2xl rounded-tl-sm"
        >
          <TextContent :content="message.content" />
        </div>

        <HistogramChart v-else-if="message.content?.type === 'histogram'" :content="message.content" />
        <DataTable v-else-if="message.content?.type === 'table'" :content="message.content" />
      </div>
    </div>
  </div>
</template>

