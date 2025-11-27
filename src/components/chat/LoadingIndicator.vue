<script setup lang="ts">
import { Bot } from 'lucide-vue-next'
</script>

<template>
  <div class="flex gap-3">
    <!-- Avatar -->
    <div class="flex-shrink-0 w-8 h-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center">
      <Bot class="w-4 h-4" />
    </div>

    <!-- Loading Animation -->
    <div class="px-4 py-3 bg-secondary rounded-2xl rounded-tl-sm">
      <div class="flex items-center gap-1.5">
        <span class="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce" style="animation-delay: 0ms" />
        <span class="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce" style="animation-delay: 150ms" />
        <span class="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce" style="animation-delay: 300ms" />
      </div>
    </div>
  </div>
</template>

