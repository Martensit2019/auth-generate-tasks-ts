<template>
  <div class="tasks">
    <grid-layout
      v-model:layout="windowSettings"
      :col-num="12"
      :row-height="30"
      :is-draggable="true"
      :is-resizable="true"
      :vertical-compact="true"
      :use-css-transforms="true"
    >
      <grid-item
        v-for="(item, idx) in windowSettings"
        :is-resizable="item.resizable"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :i="item.i"
        :key="idx"
        drag-allow-from=".window__title"
        drag-ignore-from=".no-drag"
        @resize="resizeEvent"
      >
        <div v-if="item.i === '0'">
          <Window title="Форма генерации задач" :i="item.i" @state-window="onStateWindow">
            <TasksFormGenerate @generate="onGenerate" />
          </Window>
        </div>
        <div v-if="item.i === '1'">
          <Window title="Результат генерации задач" :i="item.i" @state-window="onStateWindow">
            <TasksResult
              :tasks="tasks"
              :resize-height-table="resizeHeightTable"
              @create-task="isVisibleAddTask = true"
              @update-task="updateTask"
              @remove-groupe="removeGroupe"
              @to-change-task="toChangeTask"
              @select-all="selectAllTasks"
              @select-task="selectTask"
              @change-order-tasks="changeOrderTasks"
            />
          </Window>
        </div>
        <div v-if="item.i === '2'">
          <Window title="Настройки таблицы" :i="item.i" @state-window="onStateWindow" />
        </div>
      </grid-item>
    </grid-layout>
  </div>
  <Modal v-if="isVisibleAddTask" title="Добавить новую задачу" @close="isVisibleAddTask = false">
    <TaskForm @add-task="addTask" />
  </Modal>
  <Modal
    v-if="isVisibleChangeTask"
    title="Изменить текущую задачу"
    @close="isVisibleChangeTask = false"
  >
    <TaskForm :task="curTask" @to-change-task="toChangeTask" />
  </Modal>
</template>

<script setup lang="ts">
import { GridLayout, GridItem } from 'vue3-grid-layout-next'
import { type IGridLayout } from './interfaceTasks'
import { taskWindowSettings } from './dataTasks'
import {
  tasks,
  curTask,
  isVisibleAddTask,
  isVisibleChangeTask,
  onGenerate,
  addTask,
  updateTask,
  removeGroupe,
  toChangeTask,
  selectAllTasks,
  selectTask,
  changeOrderTasks
} from './tasks'

const windowSettings = ref<IGridLayout[]>(taskWindowSettings)
const defaultHeights: number[] = windowSettings.value.map((window) => window.h)
const resizeHeightTable = ref<number | null>(null)

const onStateWindow = (setting: [boolean, string]) => {
  const [isCollapsed, i] = setting
  const curIdx = windowSettings.value.findIndex((window: IGridLayout) => window.i === i)
  windowSettings.value[curIdx].h = isCollapsed ? defaultHeights[curIdx] : 1
  // убираем возможность ресайза свернутоко окошка
  windowSettings.value[i as unknown as number].resizable = !!isCollapsed
  // обновляем положение соседних окошек после сворачивая/разворачивания текущего
  windowSettings.value = [...windowSettings.value]
}
const resizeEvent = (i: string | number, newH: number, newW: number, newHPx: number) => {
  if (i === '1' && newHPx) resizeHeightTable.value = newHPx
}
</script>

<style scoped lang="scss">
@import 'tasks';
</style>