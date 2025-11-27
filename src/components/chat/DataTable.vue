<script setup lang="ts">
import type { TableContent } from '@/types/message'

defineProps<{
  content: TableContent
}>()
</script>

<template>
  <div class="w-full overflow-hidden rounded-lg border border-border">
    <table class="w-full text-sm">
      <thead class="bg-muted/50">
        <tr>
          <th
            v-for="header in content.headers"
            :key="header"
            class="px-4 py-3 text-left font-semibold text-foreground"
          >
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-border">
        <tr
          v-for="(row, rowIndex) in content.rows"
          :key="rowIndex"
          class="hover:bg-muted/30 transition-colors"
        >
          <td
            v-for="(cell, cellIndex) in row"
            :key="cellIndex"
            class="px-4 py-3 text-muted-foreground"
          >
            {{ cell }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

