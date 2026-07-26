<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
import TaskTable from '@/components/TaskTable.vue'
import ProgressBar from '@/components/ProgressBar.vue'
import CurrentTask from './components/CurrentTask.vue';
</script>

<template>
  <Navbar />
  <CurrentTask />
  <ProgressBar />
  <TaskTable />

</template>

<style scoped></style>
