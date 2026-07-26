<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
import TaskTable from '@/components/TaskTable.vue'
import ProgressBar from '@/components/ProgressBar.vue'
import CurrentTask from './components/CurrentTask.vue';
</script>

<template>
  <Navbar />
  <main class="app-container">
    <div class="status-card">
      <CurrentTask />
      <ProgressBar />
    </div>
    <div class="table-card">
      <TaskTable />
    </div>
  </main>
</template>

<style>
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  overflow-x: hidden;
}
body {
  font-family: "Inter", sans-serif;
  background-color: #f5f7fa;
  color: #1c1d1f;
}
.app-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 80px 20px 20px 20px;
}
.status-card,
.table-card {
  background: #ffffff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);
  border: 1px solid #ebeef5;
}
</style>
