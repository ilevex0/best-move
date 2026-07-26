<template>
  <div class="demo-progress">
    <h3>Progresso Atual</h3>
    <el-progress :percentage="taskProgress" :format="formatProgress" />
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useTaskStore } from '@/stores/tasks'

// Relógio reativo
let timer: number | undefined
const currentTime = ref(new Date())

onMounted(() => {
  timer = window.setInterval(() => {
    currentTime.value = new Date()
  }, 1000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})

// Conversor de "00:00" para minutos totais do dia
function timeStringToMinutes(timeStr: string): number {
  const [hours, minutes] = timeStr.split(":").map(Number)
  return (hours * 60) + minutes
}

// Minutos atuais do PC (com fração de segundos)
const currentTotalMinutes = computed(() => {
  const h = currentTime.value.getHours()
  const m = currentTime.value.getMinutes()
  const s = currentTime.value.getSeconds()
  return (h * 60) + m + (s / 60)
})

const taskStore = useTaskStore()

// Lista ordenada de tarefas
const sortedTasks = computed(() => {
  if (!taskStore.tasks || taskStore.tasks.length === 0) return []

  return [...taskStore.tasks].sort((a, b) => {
    return timeStringToMinutes(a.time) - timeStringToMinutes(b.time)
  })
})

// Encontra a tarefa atual e a próxima para definir o intervalo de tempo
const activeTaskInterval = computed(() => {
  const tasks = sortedTasks.value
  if (tasks.length === 0) return null

  let currentIndex = -1

  for (let i = 0; i < tasks.length; i++) {
    const taskMinutes = timeStringToMinutes(tasks[i].time)
    if (currentTotalMinutes.value >= taskMinutes) {
      currentIndex = i
    } else {
      break
    }
  }

  if (currentIndex === -1) {
    // Antes da primeira tarefa do dia
    return {
      current: null,
      next: tasks[0],
      startMinutes: timeStringToMinutes(tasks[0].time) - 60, // Exemplo de margem
      endMinutes: timeStringToMinutes(tasks[0].time)
    }
  }

  const current = tasks[currentIndex]
  const next = tasks[currentIndex + 1] || null

  const startMinutes = timeStringToMinutes(current.time)
  // Se houver próxima tarefa, ela é o fim. Se não, damos mais 1 hora de tolerância.
  const endMinutes = next ? timeStringToMinutes(next.time) : startMinutes + 60

  return { current, next, startMinutes, endMinutes }
})

// Calcula a porcentagem concluída da tarefa atual (0 a 100)
const taskProgress = computed(() => {
  const interval = activeTaskInterval.value
  if (!interval) return 0

  const { startMinutes, endMinutes } = interval
  const now = currentTotalMinutes.value

  if (now <= startMinutes) return 0
  if (now >= endMinutes) return 100

  const totalDuration = endMinutes - startMinutes
  const elapsed = now - startMinutes

  const percentage = (elapsed / totalDuration) * 100
  return Math.min(Math.max(Number(percentage.toFixed(1)), 0), 100)
})

// Formata o texto exibido dentro da barra (mostra o tempo restante, por exemplo)
const formatProgress = (percentage: number) => {
  const interval = activeTaskInterval.value
  if (!interval) return `${percentage}%`

  const remainingMinutes = Math.max(0, Math.floor(interval.endMinutes - currentTotalMinutes.value))
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