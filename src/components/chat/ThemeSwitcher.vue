<script setup lang="ts">
import { Sun, Moon, Monitor } from 'lucide-vue-next'
import { useTheme, type Theme } from '@/composables/useTheme'

const { theme, setTheme } = useTheme()

const themes: { value: Theme; icon: typeof Sun; label: string }[] = [
  { value: 'light', icon: Sun, label: 'Light' },
  { value: 'dark', icon: Moon, label: 'Dark' },
  { value: 'system', icon: Monitor, label: 'System' }
]
</script>

<template>
  <div class="flex items-center gap-1 p-1 bg-muted rounded-lg">
    <button
      v-for="t in themes"
      :key="t.value"
      @click="setTheme(t.value)"
      class="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all"
      :class="theme === t.value 
        ? 'bg-background text-foreground shadow-sm' 
        : 'text-muted-foreground hover:text-foreground'"
      :title="t.label"
    >
      <component :is="t.icon" class="w-4 h-4" />
      <span class="hidden sm:inline">{{ t.label }}</span>
    </button>
  </div>
</template>

