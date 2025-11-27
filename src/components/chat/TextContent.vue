<script setup lang="ts">
import type { TextContent } from '@/types/message'

defineProps<{
  content: TextContent
}>()
</script>

<template>
  <p class="text-sm leading-relaxed">{{ content.value }}</p>
</template>

