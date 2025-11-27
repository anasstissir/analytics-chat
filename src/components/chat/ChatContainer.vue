<script setup lang="ts">
import { ref, nextTick, onMounted } from 'vue'
import type { Message } from '@/types/message'
import { initialMessages } from '@/data/initialMessages'
import { mockLLM } from '@/utils/mockLLM'
import ChatMessage from './ChatMessage.vue'
import LoadingIndicator from './LoadingIndicator.vue'
import ThemeSwitcher from './ThemeSwitcher.vue'
import ChatInput from './ChatInput.vue'

let messageIdCounter = 1000

const messages = ref<Message[]>([...initialMessages])
const isLoading = ref(false)
const containerRef = ref<HTMLElement | null>(null)

onMounted(async () => {
  const lastMessage = messages.value[messages.value.length - 1]
  if (lastMessage?.role === 'user' && lastMessage.content?.type === 'text') {
    isLoading.value = true
    await scrollToBottom()
    
    const response = await mockLLM(lastMessage.content.value)
    messages.value.push(...response)
    
    isLoading.value = false
    await scrollToBottom()
  }
})

async function handleEdit(messageId: string, newValue: string) {
  const messageIndex = messages.value.findIndex((m) => m.id === messageId)
  if (messageIndex === -1) return

  const editedMessage = messages.value[messageIndex]
  if (editedMessage.content?.type === 'text') {
    editedMessage.content.value = newValue
    editedMessage.timestamp = new Date().toISOString()
  }

  messages.value = messages.value.slice(0, messageIndex + 1)

  isLoading.value = true
  await scrollToBottom()

  const response = await mockLLM(newValue)

  messages.value.push(...response)
  isLoading.value = false
  await scrollToBottom()
}

async function handleNewMessage(text: string) {
  const userMessage: Message = {
    id: `msg_${++messageIdCounter}`,
    role: 'user',
    content: {
      type: 'text',
      value: text
    },
    timestamp: new Date().toISOString()
  }
  messages.value.push(userMessage)
  
  isLoading.value = true
  await scrollToBottom()

  const response = await mockLLM(text)

  messages.value.push(...response)
  isLoading.value = false
  await scrollToBottom()
}

async function scrollToBottom() {
  await nextTick()
  if (containerRef.value) {
    containerRef.value.scrollTop = containerRef.value.scrollHeight
  }
}
</script>

<template>
  <div class="flex flex-col h-screen bg-background">
    <header class="flex-shrink-0 px-6 py-4 border-b border-border bg-card">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-xl font-semibold text-foreground">Analytics Chat</h1>
          <p class="text-sm text-muted-foreground mt-0.5">made by Anass</p>
        </div>
        <ThemeSwitcher />
      </div>
    </header>

    <div ref="containerRef" class="flex-1 overflow-y-auto px-6 py-6">
      <div class="max-w-3xl mx-auto space-y-6">
        <ChatMessage
          v-for="message in messages"
          :key="message.id"
          :message="message"
          @edit="handleEdit"
        />
        <LoadingIndicator v-if="isLoading" />
      </div>
    </div>

    <ChatInput :disabled="isLoading" @submit="handleNewMessage" />
  </div>
</template>
