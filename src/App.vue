<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
import TaskTable from '@/components/TaskTable.vue'
import ProgressBar from '@/components/ProgressBar.vue'
import CurrentTask from './components/CurrentTask.vue';
</script>

<template>
  <Navbar />
  <div style="padding: 5px 10px;">
    <CurrentTask />
    <ProgressBar />
    <TaskTable />
  </div>

</template>

<style>
body {
  font-family: "Inter", sans-serif;
}
</style>
