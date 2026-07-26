<template>
  <el-table :data="taskStore.tasks" stripe style="width: 100%">
      <el-table-column prop="time" label="Time" width="200" />
    <el-table-column prop="title" label="Title" />
  </el-table>
</template>

<script lang="ts" setup>
import { useTaskStore } from '@/stores/tasks'
import { ref } from 'vue'

const taskStore = useTaskStore()
</script>
