<template>
    <h3>FAZENDO AGORA</h3>
    <h3>{{ currentTime.toLocaleTimeString() }} - CURRENT TASK</h3>
</template>

<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useTaskStore } from '@/stores/tasks'


//MOSTRA TEMPO ATUAL DO PC A CADA 1s
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

//CONVERTE O FORMATO 01:00 PARA MINUTOS
function timeStringToMinutes(timeStr: string): number {
    const [hours, minutes] = timeStr.split(":").map(Number)
    return (hours * 60) + minutes
}

//VERIFICA SEMPRE QUE HOUVER ATUALIZAÇÃO E RETORNA EM MINUTOS O TEMPO ATUAL DO PC
const currentTotalMinutes = computed(() => {
    const h = currentTime.value.getHours()
    const m = currentTime.value.getMinutes()
    const s = currentTime.value.getSeconds()
    return (h * 60) + m + (s / 60)
})

const taskStore = useTaskStore()

//PEGA A LISTA taskStore NO FORMATO STRING "00:00" FAZ A CONVERSÃO PARA MINUTOS E COM A CONVERSÃO, FAZ A LISTA FICAR ORDENADA
const sortedTasks = computed(() => {
  if (!taskStore.tasks || taskStore.tasks.length === 0) return []

  return [...taskStore.tasks].sort((a, b) => {
    return timeStringToMinutes(a.time) - timeStringToMinutes(b.time)
  })
})
</script>