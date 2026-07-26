<template>
    <h3>FAZENDO AGORA</h3>
    <h3>{{ currentTime.toLocaleTimeString() }} - {{ currentTask?.title || 'Nenhuma tarefa' }}</h3>
</template>

<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useTaskStore } from '@/stores/tasks'

// MOSTRA TEMPO ATUAL DO PC A CADA 1s
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

// CONVERTE O FORMATO 01:00 PARA MINUTOS
function timeStringToMinutes(timeStr: string): number {
    const [hours, minutes] = timeStr.split(":").map(Number)
    return (hours * 60) + minutes
}

// VERIFICA SEMPRE QUE HOUVER ATUALIZAÇÃO E RETORNA EM MINUTOS O TEMPO ATUAL DO PC
const currentTotalMinutes = computed(() => {
    const h = currentTime.value.getHours()
    const m = currentTime.value.getMinutes()
    const s = currentTime.value.getSeconds()
    return (h * 60) + m + (s / 60)
})

const taskStore = useTaskStore()

// PEGA A LISTA taskStore NO FORMATO STRING "00:00" FAZ A CONVERSÃO PARA MINUTOS E FAZ A LISTA FICAR ORDENADA
const sortedTasks = computed(() => {
  if (!taskStore.tasks || taskStore.tasks.length === 0) return []

  return [...taskStore.tasks].sort((a, b) => {
    return timeStringToMinutes(a.time) - timeStringToMinutes(b.time)
  })
})

// ENCONTRA A TAREFA ATUAL BASEADA NO HORÁRIO DO PC
const currentTask = computed(() => {
  if (sortedTasks.value.length === 0) return null

  let activeTask = null

  for (const task of sortedTasks.value) {
    const taskMinutes = timeStringToMinutes(task.time)
    // Se o horário atual passou ou igualou o horário da tarefa, ela passa a ser a candidata ativa
    if (currentTotalMinutes.value >= taskMinutes) {
      activeTask = task
    } else {
      // Como a lista está ordenada, se o horário atual for menor que a task, paramos a busca
      break
    }
  }

  return activeTask
})
</script>