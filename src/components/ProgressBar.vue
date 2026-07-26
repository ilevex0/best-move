<template>
  <div class="demo-progress">
    <h3>Progresso Atual</h3>
    <el-progress :percentage="taskProgress" :format="formatProgress" />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useTaskStore } from '@/stores/tasks'

const taskStore = useTaskStore()

// Calcula a porcentagem concluída da tarefa atual (0 a 100)
const taskProgress = computed(() => {
  const interval = taskStore.activeTaskInterval
  if (!interval) return 0

  const { startMinutes, endMinutes } = interval
  const now = taskStore.currentTotalMinutes

  if (now <= startMinutes) return 0
  if (now >= endMinutes) return 100

  const totalDuration = endMinutes - startMinutes
  const elapsed = now - startMinutes

  const percentage = (elapsed / totalDuration) * 100
  return Math.min(Math.max(Number(percentage.toFixed(1)), 0), 100)
})

// Formata o texto exibido dentro da barra (mostra o tempo restante, por exemplo)
const formatProgress = (percentage: number) => {
  const interval = taskStore.activeTaskInterval
  if (!interval) return `${percentage}%`

  const remainingMinutes = Math.max(0, Math.floor(interval.endMinutes - taskStore.currentTotalMinutes))
  const hours = Math.floor(remainingMinutes / 60)
  const mins = remainingMinutes % 60

  if (percentage >= 100) return 'Bloco Finalizado'
  return `${hours}h ${mins}m restantes`
}
</script>

<style scoped>
.demo-progress {
  max-width: 500px;
}
</style>