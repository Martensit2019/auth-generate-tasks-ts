<template>
  <table :id="`table_`" class="table">
    <thead class="table__header">
      <tr>
        <th v-if="isCheckboxes" class="table__checkbox" style="width: 40px">
          <Checkbox
            id="checkbox"
            v-model="isSelectedAllTasks"
            @update:model-value="emit('select-all', isSelectedAllTasks)"
          />
        </th>
        <th
          v-for="(header, colIdx) in headers"
          :ref="
            (el: any) => {
              refHeadColumn[header.code] = el as HTMLTableElement
            }
          "
          :id="`${tableColumnId}-${colIdx}`"
          :style="{ width: header.width }"
          style="position: relative; cursor: move"
          :key="header.code"
          :draggable="isDraggableColumn"
          @dragstart="
            onColumnDragStart(
              $event,
              colIdx,
              (refHeadColumn[header.code] as HTMLTableElement) || null
            )
          "
          @dragover="onColumnDragOver($event)"
          @drop="onColumnDrop($event, colIdx)"
        >
          {{ header.title }}
          <div
            class="resize-col"
            @mousedown.stop="startResizeColumn($event, header.code, colIdx)"
          ></div>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(task, rowIdx) in tasks"
        :ref="
          (el: any) => {
            refRow[rowIdx] = el as HTMLTableElement
          }
        "
        :id="`${tableRowId}-${rowIdx}`"
        style="position: relative"
        :key="rowIdx"
        :draggable="isDraggableRow"
        @dragstart="onRowDragStart($event, rowIdx, (refRow[rowIdx] as HTMLTableElement) || null)"
        @dragover="onRowDragOver($event)"
        @drop="onRowDrop($event, rowIdx)"
      >
        <td v-if="isCheckboxes" class="center">
          <Checkbox
            id="checkbox"
            v-model="task.checked"
            @update:model-value="emit('select-task', task)"
          />
        </td>
        <td v-for="(header, colIdx) in headers" :key="header.code + rowIdx + colIdx">
          <div v-if="header.code === 'status'">
            <div class="status" :style="{ background: task.isActive ? 'red' : 'green' }"></div>
          </div>
          <div v-if="header.code === 'actions'">
            <IconSprite
              :id="`${task.id}_update`"
              :height="18"
              name="edit"
              class="btn-action"
              @click="emit('update-task', task.id)"
            />
            <IconSprite
              :id="`${task.id}_remove`"
              :height="18"
              name="trash"
              class="btn-action red"
              @click="emit('remove-groupe', [task.id])"
            />
          </div>

          {{ task[header.code as keyof ITask] }}
        </td>
        <div class="resize-row" style=""></div>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { type ITask } from '../Tasks/interfaceTasks'
import { type IHeader } from './interfaceTaskTable'
import { tableHeaders } from './dataTaskTable'

const initialHeaders = tableHeaders

interface IProps {
  tasks: ITask[]
}

export interface refTableElement {
  [key: string | number]: HTMLTableElement | null
}

const props = defineProps<IProps>()

interface IEmits {
  (e: 'update-task', id: string): void
  (e: 'remove-groupe', removedTaskIds: string[]): void
  (e: 'select-all', isSelectedAllTasks: boolean): void
  (e: 'select-task', task: ITask): void
  (e: 'change-order-tasks', taskIdx: number, idx: number): void
}

const emit = defineEmits<IEmits>()

const refHeadColumn = reactive<refTableElement>({})

const refRow = reactive<refTableElement>({})

const isCheckboxes = ref<boolean>(true)

const isSelectedAllTasks = ref<boolean>(props.tasks.every((task) => task.checked))
const selectedTaskIds = computed(() =>
  props.tasks.filter((task) => task.checked).map((task) => task.id)
)

const headers = ref<IHeader[]>(initialHeaders)

defineExpose({
  selectedTaskIds
})

// start: работа с перемещением столбцов

const isDraggableColumn = ref<boolean>(true)
const tableColumnId = 'colunmData'
const draggableСolumnId = ref<string | null>(null)

const onColumnDragStart = (e: DragEvent, idx: number, el: HTMLTableElement): void => {
  draggableRowId.value = null
  draggableСolumnId.value = el.id.split('-')[0]
  e.dataTransfer?.setData('dragColumnIdx', idx.toString())
}
const onColumnDragOver = (e: DragEvent): void => {
  if (draggableСolumnId.value === tableColumnId) e.preventDefault()
}

const onColumnDrop = (e: DragEvent, idx: number): void => {
  const dragColumnIdx = Number(e.dataTransfer?.getData('dragColumnIdx'))
  const draggedColumn = headers.value[dragColumnIdx]
  headers.value.splice(dragColumnIdx, 1)
  headers.value.splice(idx, 0, draggedColumn)
  draggableСolumnId.value = null
}

// end: работа с перемещением столбцов

// start: работа с перемещением строк

const isDraggableRow = ref<boolean>(true)
const tableRowId = 'rowData'
const draggableRowId = ref<string | null>(null)

const onRowDragStart = (e: DragEvent, idx: number, el: HTMLTableElement): void => {
  draggableСolumnId.value = null
  console.log("el.id.split('-')[0]", el.id)
  draggableRowId.value = null

  draggableRowId.value = el.id.split('-')[0]
  e.dataTransfer?.setData('dragRowIdx', idx.toString())
}
const onRowDragOver = (e: DragEvent): void => {
  if (draggableRowId.value === tableRowId) e.preventDefault()
}

const onRowDrop = (e: DragEvent, idx: number): void => {
  console.log('onRowDrop')

  const dragRowIdx = Number(e.dataTransfer?.getData('dragRowIdx'))
  emit('change-order-tasks', dragRowIdx, idx)
  draggableСolumnId.value = null
  draggableRowId.value = null
}

// end: работа с перемещением строк

const x = ref(0)
const currentColumnCode = ref<string | null>(null)
const widthCurrentColumn = ref(0)
const newWidthCurrentColumn = ref(0)
const resizedColumnIdx = ref()

const startResizeColumn = (e: MouseEvent, code: string, idx: number) => {
  isDraggableColumn.value = false
  currentColumnCode.value = code
  resizedColumnIdx.value = idx
  if (refHeadColumn[code])
    widthCurrentColumn.value = (refHeadColumn[code] as HTMLElement).offsetWidth
  x.value = e.clientX
  document.addEventListener('mousemove', mouseMoveHandler)
  document.addEventListener('mouseup', mouseUpHandler)
}

const mouseMoveHandler = function (e: MouseEvent) {
  const dx = e.clientX - x.value
  newWidthCurrentColumn.value = widthCurrentColumn.value + dx
  headers.value[resizedColumnIdx.value].width = newWidthCurrentColumn.value + 'px'
}

const mouseUpHandler = function () {
  isDraggableColumn.value = true
  document.removeEventListener('mousemove', mouseMoveHandler)
  document.removeEventListener('mouseup', mouseUpHandler)
}

onMounted(() => {
  document.removeEventListener('mouseup', mouseUpHandler)
})
</script>

<style scoped lang="scss">
@import 'taskTable';

</style>
