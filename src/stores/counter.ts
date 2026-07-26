import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useTaskStore = defineStore('task', () => {
  const tasks = ref([
    {
      title: "Test",
      time: "00:00"
    }
  ])

  return { tasks }
})
