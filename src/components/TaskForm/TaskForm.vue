<template>
  <div class="task-frorm">
    <form @submit.prevent="createTask">
      <Input v-model="title" label="Введите название задачи" />
      <Input v-model="descr" label="Введите описание задачи" />
      <div v-if="isUpdate">
        <Button v-if="props.task?.isActive" color="success" is-full @click="toCompleted"
          >Пометить выполненной</Button
        >
        <div class="task-frorm__update-btns">
          <Button v-if="props.task?.isActive" :isDisabled="!isDisabled" @click="toUpdate">Обновить задачу</Button>
          <Button color="danger" @click="toRemove">Удалить задачу</Button>
        </div>
      </div>
      <Button v-else is-full :isDisabled="!isDisabled">Добавить задачу</Button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { generateUniqueIid } from '../../helpers/generateTasks'
import { type ITask } from '../Tasks/interfaceTasks'

interface IProps {
  task?: ITask
}
const props = defineProps<IProps>()

interface IEmits {
  (e: 'add-task', task: ITask): void
  (e: 'to-change-task', task: ITask, action: string): void
}

const emit = defineEmits<IEmits>()

const title = ref<string>(props.task?.name || '')
const descr = ref<string>(props.task?.descr || '')

const isUpdate = computed(() => Boolean(props.task))
const isDisabled = computed(() => Boolean(title.value) && Boolean(descr.value))

const createTask = () => {
  const newTask = {
    id: generateUniqueIid(),
    name: title.value,
    descr: descr.value,
    isActive: true,
    checked: false
  }
  emit('add-task', newTask)
}

const toCompleted = () => {
  if(props.task) emit('to-change-task', { ...props.task, isActive: false }, 'completed')
}
const toUpdate = (task: ITask) => {
  if(props.task) emit('to-change-task', { ...props?.task, name: title.value, descr: descr.value }, 'update')
}
const toRemove = () => {
  if(props.task) emit('to-change-task', props.task, 'remove')
}
</script>
<script setup lang="ts"></script>

<style scoped lang="scss">
.task-frorm {
  &__update-btns {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  }
}
</style>