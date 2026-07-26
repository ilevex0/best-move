<template>
    <h3>FAZENDO AGORA</h3>
    <h3>{{ currentTime.toLocaleTimeString() }} - CURRENT TASK</h3>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue'

let timer: number | undefined
const currentTime = ref(new Date())

onMounted( () => {
    timer = window.setInterval(() => {
        currentTime.value = new Date()
    }, 1000)
})

onUnmounted( () => {
    if (timer) clearInterval(timer)
})

</script>