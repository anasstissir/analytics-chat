<script setup lang="ts">
import { Brain } from 'lucide-vue-next'

defineProps<{
  thinking: string
}>()
</script>

<template>
  <div class="flex items-start gap-3 px-4 py-3 bg-muted/50 rounded-lg border border-border/50">
    <div class="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
      <Brain class="w-3.5 h-3.5 text-primary animate-pulse" />
    </div>
    <div class="flex-1 min-w-0">
      <span class="text-xs font-medium text-muted-foreground uppercase tracking-wide">Thinking</span>
      <p class="text-sm text-muted-foreground italic mt-1">{{ thinking }}</p>
    </div>
  </div>
</template>

