<script setup lang="ts">
import { computed } from 'vue'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip
} from 'chart.js'
import type { HistogramContent } from '@/types/message'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip)

const props = defineProps<{
  content: HistogramContent
}>()

const chartData = computed(() => ({
  labels: props.content.labels,
  datasets: [
    {
      label: 'Value',
      data: props.content.values,
      backgroundColor: 'oklch(0.646 0.222 41.116)',
      borderRadius: 6,
      borderSkipped: false
    }
  ]
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: 'oklch(0.205 0 0)',
      titleColor: 'oklch(0.985 0 0)',
      bodyColor: 'oklch(0.985 0 0)',
      padding: 12,
      cornerRadius: 8
    }
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: { color: 'oklch(0.556 0 0)' }
    },
    y: {
      grid: { color: 'oklch(0.922 0 0)' },
      ticks: { color: 'oklch(0.556 0 0)' }
    }
  }
}
</script>

<template>
  <div class="w-full h-48 p-4 bg-card rounded-lg border border-border">
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>

