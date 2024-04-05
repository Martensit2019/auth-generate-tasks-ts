<template>
  <div class="tasks-result">
    <div v-if="tasks.length">
      <Button style="margin-bottom: 20px" @click="emit('create-task')"
        >Добавить новую задачу</Button
      >
      <Input
      v-if="false"
        v-model="search"
        placeholder="Поиск по задачам"
        search
        @search="onSearchInput"
        @enter="onSearchInput"
        @clear="onSearchReset"
      />

      <div>
        <div style="display: flex">
          <Button color="danger" size="small" @click="emit('remove-groupe', selectedTaskIds)"
            >Удалить выделенные задачи</Button
          >
          <StatusFilter ref="refStatusFilter" />
        </div>
        <!-- <BaseTable /> -->
        <div style="border: 1px solid white"></div>
        <div
          style="overflow: auto"
          :style="{
            height: props.resizeHeightTable ? `${props.resizeHeightTable - 140}px` : '300px'
          }"
        >
          <TaskTable
            ref="refTaskTable"
            :tasks="filteredAndSearcedTasks"
            @update-task="(id: string) => emit('update-task', id)"
            @remove-groupe="(removedTaskIds: string[]) => emit('remove-groupe', removedTaskIds)"
            @select-all="(isSelectedAllTasks) => emit('select-all', isSelectedAllTasks)"
            @select-task="(task) => emit('select-task', task)"
            @change-order-tasks="(taskIdx, idx) => emit('change-order-tasks', taskIdx, idx)"            
          />
        </div>
      </div>
    </div>
    <div v-else>
      <h3 class="tasks-result__title">Задач нет</h3>
      <p>
        Но Вы можете сгенерировать задачи в окошке слева. Для этого в поле ввода введите количество
        задач, которые надо сгенерировать от 1 до 10.
      </p>
      <p>Или добавить задачу самостоятельно, нажав на кнопку ниже:</p>
      <div class="add-btn">
        <Button @click="emit('create-task')">Создать задачу</Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { TASK_STATUS } from '../../enams/taskStatuses'
import { type ITask } from '../Tasks/interfaceTasks'
import StatusFilter from '../StatusFilter/StatusFilter.vue'
import TaskTable from '../TaskTable/TaskTable.vue'

interface IProps {
  tasks: ITask[]
  resizeHeightTable: number | null
}
const props = defineProps<IProps>()

interface IEmits {
  (e: 'create-task'): void
  (e: 'update-task', id: string): void
  (e: 'remove-groupe', removedTaskIds: string[]): void
  (e: 'select-all', isSelectedAllTasks: boolean): void
  (e: 'select-task', task: ITask): void
  (e: 'change-order-tasks', taskIdx: number, idx: number): void
}

const emit = defineEmits<IEmits>()

const refStatusFilter = ref<InstanceType<typeof StatusFilter> | null>(null)
const refTaskTable = ref<InstanceType<typeof TaskTable> | null>(null)
const search = ref<string | null>(null)

const currentStatus = computed(() =>
  refStatusFilter.value !== null ? refStatusFilter.value?.activeStatus : TASK_STATUS.all
)
const selectedTaskIds = computed(() =>
  refTaskTable.value !== null ? refTaskTable.value?.selectedTaskIds : []
)

const filteredTasks = computed(() => {
  if (currentStatus.value === TASK_STATUS.all) return props.tasks
  if (currentStatus.value === TASK_STATUS.active) return props.tasks.filter((task) => task.isActive)
  if (currentStatus.value === TASK_STATUS.done) return props.tasks.filter((task) => !task.isActive)
  return []
})

const filteredAndSearcedTasks = computed(() => {
  if (search.value) {
    return filteredTasks.value.filter(
      (task) => {
        task.name.includes(search.value as string) || task.descr.includes(search.value as string)
      }
    )
  }
  return filteredTasks.value
})

const onSearchInput = () => {
  console.log('onSearchInput', search.value)
}
const onSearchReset = () => {
  search.value = null
}
</script>

<style scoped lang="scss">
.tasks-result {
  padding: 20px;
  &__title {
    margin-bottom: 20px;
  }
  &__input {
    margin-bottom: 20px;
  }
  .add-btn {
    margin-top: 20px;
  }
}
</style>
