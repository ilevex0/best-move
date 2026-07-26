<template>
    <h3>FAZENDO AGORA</h3>
    <h3 style="color: #409eff;">{{ taskStore.currentTime.toLocaleTimeString() }} - {{ taskStore.currentTask?.title || 'Nenhuma tarefa' }}</h3>
</template>

<script lang="ts" setup>
import { useTaskStore } from '@/stores/tasks'

const taskStore = useTaskStore()
</script>