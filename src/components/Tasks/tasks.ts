import { ref } from 'vue'
import { generateTasks } from '../../helpers/generateTasks'
import { type ITask } from './interfaceTasks'

export const tasks = ref<ITask[]>([])
export const curTask = ref<ITask>()
export const isVisibleAddTask = ref<boolean>(false)
export const isVisibleChangeTask = ref<boolean>(false)
const selectedTaskIds = ref<string[]>([])

// 1. Генерация задач
export const onGenerate = (quantity: string | null) => {
  tasks.value = generateTasks(Number(quantity))
}
// 2. Добавление новой задачи
export const addTask = (task: ITask) => {
  tasks.value.push(task)
  isVisibleAddTask.value = false
}
// 3. Удаление группы задач
export const removeGroupe = (ids: string[]) => {
  tasks.value = tasks.value.filter((task) => !ids.includes(task.id))
}
// 4. Обновление задачи
export const updateTask = (id: string) => {
  curTask.value = tasks.value.filter((task) => task.id === id)[0]
  isVisibleChangeTask.value = true
}
// 5. Изменение задач
export const toChangeTask = (curTask: ITask, action: string) => {
  if (action === 'remove') {
    tasks.value = tasks.value.filter((task) => curTask.id !== task.id)
  } else {
    const curIdx = tasks.value.findIndex((task) => curTask.id === task.id)
    tasks.value[curIdx] = curTask
  }
  isVisibleChangeTask.value = false
}
// 6. Выбрать/снять все задачи
export const selectAllTasks = (isSelectedAllTasks: boolean) => {
  tasks.value.forEach((task) => (task.checked = isSelectedAllTasks))
}
// 7. Выбрать/снять выбор с задачи
export const selectTask = (task: ITask) => {
  selectedTaskIds.value.push(task.id)
}
// 8. Изменить порядок строк в таблице

export const changeOrderTasks = (dragRowIdx: number, idx: number) => {
  console.log('dragRowIdx from TD', dragRowIdx)

  const draggedRow = tasks.value[dragRowIdx]
  console.log('draggedRow', draggedRow);
  
  tasks.value.splice(dragRowIdx, 1)
  console.log();
  
  tasks.value.splice(idx, 0, draggedRow)
}
