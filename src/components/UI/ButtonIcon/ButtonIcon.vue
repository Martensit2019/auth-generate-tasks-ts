<template>
  <button
    :class="['btn', `btn_${size}`, `btn_${color}`, { btn_full: isFull }]"
    :disabled="isDisabled"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
type TSize = 'large' | 'small'
type TColor = 'primary' | 'success' | 'danger'
interface IProps {
  size?: TSize
  color?: TColor
  isDisabled?: boolean
  isFull?: boolean
}

withDefaults(defineProps<IProps>(), {
  size: 'large',
  color: 'primary',
  isDisabled: false,
  isFull: false
})
</script>

<style scoped lang="scss">
@import 'button';
</style>