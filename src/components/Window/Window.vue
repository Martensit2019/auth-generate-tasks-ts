<template>
  <div class="window">
    <div class="window__head">
      <div class="window__title">{{ props.title }}</div>
      <div class="window__btns">
        <IconSprite
          :id="`${props.i}_collapse`"
          name="collapse"
          :style="{ cursor: isCollapsed ? 'pointer' : 'default' }"
          @click="onCollapse"
        />
        <IconSprite
          :id="`${props.i}_rollup`"
          name="remove-square"
          :style="{ cursor: isCollapsed ? 'default' : 'pointer' }"
          @click="onExpand"
        />
      </div>
    </div>
    <slot v-if="isCollapsed" />
  </div>
</template>

<script setup lang="ts">
interface IProps {
  title: string
  i: string
}
const props = defineProps<IProps>()

interface IEmits {
  (e: 'state-window', setting: [boolean, string]): void
}

const emit = defineEmits<IEmits>()

const isCollapsed = ref<boolean>(true)

const onCollapse = () => {
  isCollapsed.value = false
  emit('state-window', [isCollapsed.value, props.i])
}

const onExpand = () => {
  isCollapsed.value = true
  emit('state-window', [isCollapsed.value, props.i])
}
</script>

<style scoped lang="scss">
@import 'window.scss';
</style>
