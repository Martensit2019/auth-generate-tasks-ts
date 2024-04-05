<template>
  <div class="input__group" style="position: relative">
    <label v-if="label" class="label">{{ label }}</label>
    <input
      class="input"
      :type="type"
      :value="modelValue"
      min="1"
      max="10"
      :placeholder="placeholder"
      @input="onInput"
      @keyup.enter="onEnter"
    />
    <Button
      v-if="search && modelValue"
      size="small"
      color="transparent"
      class="btn-search"
      @click="emit('search')"
    >
      <IconSprite :id="`search`" name="search" class="btn-search__icon" />
    </Button>
    <Button
      v-if="search && modelValue"
      size="small"
      color="transparent"
      class="btn-clear"
      @click="emit('clear')"
    >
      <IconSprite :id="`close`" name="close" class="btn-clear__icon" />
    </Button>
  </div>
</template>

<script setup lang="ts">
type TType = 'text' | 'number'
interface IProps {
  type?: TType
  modelValue: string | null
  placeholder?: string
  label?: string
  search?: boolean
}

withDefaults(defineProps<IProps>(), {
  type: 'text',
  placeholder: '',
  label: '',
  search: false
})

interface IEmits {
  (e: 'update:modelValue', value: string): void
  (e: 'enter'): void
  (e: 'search'): void
  (e: 'clear'): void
}

const emit = defineEmits<IEmits>()

const onInput = (e: Event) => {
  emit('update:modelValue', (e.target as HTMLInputElement).value)
}
const onEnter = () => {
  emit('enter')
}
</script>

<style scoped lang="scss">
@import './input';
</style>
