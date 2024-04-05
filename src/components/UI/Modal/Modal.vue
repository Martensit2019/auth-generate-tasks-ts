<template>
  <div class="modal" @click.self="emit('close')">
    <div class="modal__wrapper">
      <div class="modal__header">
        <div class="modal__title">{{ props.title }}</div>
        <IconSprite id="modal_close" class="modal__close" name="close" @click="emit('close')" />
      </div>
      <div class="modal__body">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface IProps {
  title: string
}
const props = defineProps<IProps>()

interface IEmits {
  (e: 'close'): void
}

const emit = defineEmits<IEmits>()
</script>

<style scoped lang="scss">
@import 'modal.scss'
</style>
