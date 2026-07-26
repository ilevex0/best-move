import { ref, computed, onMounted, onUnmounted } from 'vue'
import { defineStore } from 'pinia'

interface Task {
  title: string
  time: string
}

export const useTaskStore = defineStore('task', () => {
  const tasks = ref([
    { title: "Teste 1", time: "00:00" },
    { title: "Teste 2", time: "00:15" },
    { title: "Teste 3", time: "00:30" },
    { title: "Teste 4", time: "00:45" },
    { title: "Teste 5", time: "01:00" },
    { title: "Teste 6", time: "01:15" },
    { title: "Teste 7", time: "01:30" },
    { title: "Teste 8", time: "01:45" },
    { title: "Teste 9", time: "02:00" },
    { title: "Teste 10", time: "02:15" },
    { title: "Teste 11", time: "02:30" },
    { title: "Teste 12", time: "02:45" },
    { title: "Teste 13", time: "03:00" },
    { title: "Teste 14", time: "03:15" },
    { title: "Teste 15", time: "03:30" },
    { title: "Teste 16", time: "03:45" },
    { title: "Teste 17", time: "04:00" },
    { title: "Teste 18", time: "04:15" },
    { title: "Teste 19", time: "04:30" },
    { title: "Teste 20", time: "04:45" },
    { title: "Teste 21", time: "05:00" },
    { title: "Teste 22", time: "05:15" },
    { title: "Teste 23", time: "05:30" },
    { title: "Teste 24", time: "05:45" },
    { title: "Teste 25", time: "06:00" },
    { title: "Teste 26", time: "06:15" },
    { title: "Teste 27", time: "06:30" },
    { title: "Teste 28", time: "06:45" },
    { title: "Teste 29", time: "07:00" },
    { title: "Teste 30", time: "07:15" },
    { title: "Teste 31", time: "07:30" },
    { title: "Teste 32", time: "07:45" },
    { title: "Teste 33", time: "08:00" },
    { title: "Teste 34", time: "08:15" },
    { title: "Teste 35", time: "08:30" },
    { title: "Teste 36", time: "08:45" },
    { title: "Teste 37", time: "09:00" },
    { title: "Teste 38", time: "09:15" },
    { title: "Teste 39", time: "09:30" },
    { title: "Teste 40", time: "09:45" },
    { title: "Teste 41", time: "10:00" },
    { title: "Teste 42", time: "10:15" },
    { title: "Teste 43", time: "10:30" },
    { title: "Teste 44", time: "10:45" },
    { title: "Teste 45", time: "11:00" },
    { title: "Teste 46", time: "11:15" },
    { title: "Teste 47", time: "11:30" },
    { title: "Teste 48", time: "11:45" },
    { title: "Teste 49", time: "12:00" },
    { title: "Teste 50", time: "12:15" },
    { title: "Teste 51", time: "12:30" },
    { title: "Teste 52", time: "12:45" },
    { title: "Teste 53", time: "13:00" },
    { title: "Teste 54", time: "13:15" },
    { title: "Teste 55", time: "13:30" },
    { title: "Teste 56", time: "13:45" },
    { title: "Teste 57", time: "14:00" },
    { title: "Teste 58", time: "14:15" },
    { title: "Teste 59", time: "14:30" },
    { title: "Teste 60", time: "14:45" },
    { title: "Teste 61", time: "15:00" },
    { title: "Teste 62", time: "15:15" },
    { title: "Teste 63", time: "15:30" },
    { title: "Teste 64", time: "15:45" },
    { title: "Teste 65", time: "16:00" },
    { title: "Teste 66", time: "16:15" },
    { title: "Teste 67", time: "16:30" },
    { title: "Teste 68", time: "16:45" },
    { title: "Teste 69", time: "17:00" },
    { title: "Teste 70", time: "17:15" },
    { title: "Teste 71", time: "17:30" },
    { title: "Teste 72", time: "17:45" },
    { title: "Teste 73", time: "18:00" },
    { title: "Teste 74", time: "18:15" },
    { title: "Teste 75", time: "18:30" },
    { title: "Teste 76", time: "18:45" },
    { title: "Teste 77", time: "19:00" },
    { title: "Teste 78", time: "19:15" },
    { title: "Teste 79", time: "19:30" },
    { title: "Teste 80", time: "19:45" },
    { title: "Teste 81", time: "20:00" },
    { title: "Teste 82", time: "20:15" },
    { title: "Teste 83", time: "20:30" },
    { title: "Teste 84", time: "20:45" },
    { title: "Teste 85", time: "21:00" },
    { title: "Teste 86", time: "21:15" },
    { title: "Teste 87", time: "21:30" },
    { title: "Teste 88", time: "21:45" },
    { title: "Teste 89", time: "22:00" },
    { title: "Teste 90", time: "22:15" },
    { title: "Teste 91", time: "22:30" },
    { title: "Teste 92", time: "22:45" },
    { title: "Teste 93", time: "23:00" },
    { title: "Teste 94", time: "23:15" },
    { title: "Teste 95", time: "23:30" },
    { title: "Teste 96", time: "23:45" }
  ])

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
    const parts = timeStr.split(":")
    const hours = Number(parts[0]) || 0
    const minutes = Number(parts[1]) || 0
    return (hours * 60) + minutes
  }

  // VERIFICA SEMPRE QUE HOUVER ATUALIZAÇÃO E RETORNA EM MINUTOS O TEMPO ATUAL DO PC
  const currentTotalMinutes = computed(() => {
    const h = currentTime.value.getHours()
    const m = currentTime.value.getMinutes()
    const s = currentTime.value.getSeconds()
    return (h * 60) + m + (s / 60)
  })

  // PEGA A LISTA taskStore NO FORMATO STRING "00:00" FAZ A CONVERSÃO PARA MINUTOS E FAZ A LISTA FICAR ORDENADA
  const sortedTasks = computed(() => {
    if (!tasks.value || tasks.value.length === 0) return []

    return [...tasks.value].sort((a, b) => {
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

  // Encontra a tarefa atual e a próxima para definir o intervalo de tempo
  const activeTaskInterval = computed(() => {
    const taskList = sortedTasks.value
    if (taskList.length === 0) return null

    let currentIndex = -1

    for (let i = 0; i < taskList.length; i++) {
      const task = taskList[i]
      if (!task) continue
      const taskMinutes = timeStringToMinutes(task.time)
      if (currentTotalMinutes.value >= taskMinutes) {
        currentIndex = i
      } else {
        break
      }
    }

    if (currentIndex === -1) {
      const firstTask = taskList[0]
      if (!firstTask) return null
      return {
        current: null,
        next: firstTask,
        startMinutes: timeStringToMinutes(firstTask.time) - 60, // Exemplo de margem
        endMinutes: timeStringToMinutes(firstTask.time)
      }
    }

    const current = taskList[currentIndex]
    const next = taskList[currentIndex + 1] || null
    if (!current) return null
    const startMinutes = timeStringToMinutes(current.time)
    const endMinutes = next ? timeStringToMinutes(next.time) : startMinutes + 60

    return { current, next, startMinutes, endMinutes }
  })

  return {
    tasks,
    currentTotalMinutes,
    currentTime,
    currentTask,
    activeTaskInterval
  }
})
