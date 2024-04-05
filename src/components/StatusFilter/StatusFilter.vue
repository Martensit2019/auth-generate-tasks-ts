<template>
  <div class="status-filter">
    Сортировать задачи по статусу:
    <span @click="isOpen = !isOpen">{{ getTaskStatusLabel(activeStatus) }}</span>
    <div v-if="isOpen" class="status-filter__popup">
      <ul style="">
        <li
          v-for="(status, idx) in statuses"
          :class="['status-filter__popup-item', { active: status === activeStatus }]"
          :key="idx"
          @click="setStatus(status)"
        >
          {{ getTaskStatusLabel(status) }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getTaskStatusLabel, statusesList } from '../../helpers/getTaskStatuseLabel'

const isOpen = ref<boolean>(false)
const statuses: string[] = statusesList
const activeStatus = ref<string>(statuses[0])
const setStatus = (status: string) => {
  activeStatus.value = status
  isOpen.value = false
}

defineExpose({ activeStatus })
</script>

<style scoped lang="scss">
@import 'statusFilter';
</style>
