<template>
  <div class="base-input">
    <input
      :class="['input', { invalid: errorMsg }]"
      :type="typeInput"
      :value="modelValue"
      :placeholder="placeholder"
      @input="onInput"
    />
    <div style="min-height: 20px;">
      <span v-if="errorMsg" style="font-size: 12px; color: red">{{ errorMsg }}</span>
    </div>
    <IconSprite
      v-if="isPassword"
      :id="`_update`"
      :height="14"
      :name="isOpenEye ? 'eye_open' : 'eye_close'"
      style="cursor: pointer; position: absolute; right: 10px; top: 13px"
      @click="isOpenEye = !isOpenEye"
    />
  </div>
</template>

<script setup lang="ts">
type TType = 'text' | 'password'
interface IProps {
  type?: TType
  isEmail?: boolean
  isPassword?: boolean
  modelValue: string | null
  placeholder?: string
  errorMsg: string | null
  // label?: string
  // search?: boolean
}

const props = withDefaults(defineProps<IProps>(), {
  type: 'text',
  isEmail: false,
  isPassword: false,
  errorMsg: null,
  placeholder: ''
  // label: '',
  // search: false
})

interface IEmits {
  (e: 'update:modelValue', value: string): void
  // (e: 'enter'): void
  // (e: 'search'): void
  // (e: 'clear'): void
}

const emit = defineEmits<IEmits>()

const onInput = (e: Event) => {
  emit('update:modelValue', (e.target as HTMLInputElement).value)
}

const isOpenEye = ref<boolean>(false)

const typeInput = computed(() => {
  if (props.isEmail) return 'text'
  return props.isPassword && isOpenEye.value ? 'text' : 'password'
})
</script>

<style scoped lang="scss">
.base-input {
  position: relative;
  text-align: left;
  margin-bottom: 20px;
  input {
    width: 100%;
    height: 40px;
    padding: 15px;
    border: 1px solid $primary;
    border-radius: 6px;
    &:focus {
      outline: none;
      border: 1px solid $primary;
      box-shadow: $boxShadowPrimary;
    }
    &.invalid {
      border: 1px solid $danger;
      box-shadow: $boxShadowDanger;
    }
  }
}
// $boxShadowDanger
</style>
