<template>
  <div class="checkbox" :class="[{ active }]">
    <div class="checkbox__box" @click="toggleActive">
      <input :id="id" v-model="active" type="checkbox" class="checkbox__input" />
      <IconSprite name="check" class="checkbox__icon" viewBox="0 0 20 20" :width="20" :height="20"  />
    </div>

    <label v-if="title" :for="id" class="checkbox__label d-flex">
      <slot name="title">
        <span v-if="title" class="checkbox__title">
          {{ title }}
        </span>
      </slot>

      <slot name="subtitle">
        <span v-if="subtitle" class="checkbox__subtitle">
          {{ subtitle }}
        </span>
      </slot>
    </label>
  </div>
</template>

<script setup lang="ts">
interface IProps {
  id: string
  modelValue: boolean
  title?: string
  subtitle?: string
}

interface IEmits {
  (e: 'update:modelValue', val: boolean): void
}

const props = defineProps<IProps>()
const emit = defineEmits<IEmits>()

const active = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

function toggleActive() {
  active.value = !active.value
}
</script>

<style lang="scss" scoped>
@import 'checkbox.scss';

</style>
