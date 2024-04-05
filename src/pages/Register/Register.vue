<template>
  <div class="register-page">
    <!-- <div v-if="authStore.error">{{ authStore.error }}</div> -->
    <form @submit.prevent="create">
      <div v-if="isEmailExist" class="register-page__email">
        {{ form.email }}
        <IconSprite
          :id="`_update`"
          :height="14"
          name="edit"
          style="cursor: pointer"
          @click="isEmailExist = !isEmailExist"
        />
      </div>
      <h2 class="register-page__title">
        {{ isEmailExist ? 'Придумайте пароль' : 'Регистрация' }}
      </h2>
      <div v-if="isEmailExist">
        <BaseInput
          v-model="form.password"
          :errorMsg="authStore.error"
          placeholder="Придумайте пароль"
          isPassword
        />
        <Button class="btn" type="submit">Создать аккаунт</Button>
      </div>
      <div v-else>
        <BaseInput
          v-model="form.email"
          :errorMsg="errorEmailMsg"
          placeholder="Введите Email"
          isEmail
        />
        <Button class="btn" type="button" @click="onNext">Продолжить</Button>
      </div>

      <p>Есть аккаунт? <router-link class="login" to="/login">Войти</router-link> </p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '../../stores/auth'
import { validators } from '../../helpers/validators'

const router = useRouter()
const authStore = useAuthStore()

const isEmailExist = ref<boolean>(false)
const startValidation = ref(false)
const form = reactive({
  email: '',
  password: ''
})

const isValidEmail = computed(() =>
  startValidation.value ? validators.email.regx.test(form.email) : null
)

const errorEmailMsg = computed(() => {
  if (!startValidation.value) return null
  return isValidEmail.value ? null : validators.email.msg
})

const onNext = () => {
  startValidation.value = true
  if (isValidEmail.value) isEmailExist.value = !isEmailExist.value
}

const create = async () => {
  await authStore.auth(form, 'register')
  router.push({ name: 'home' })
}
</script>

<style scoped lang="scss">
.register-page {
  max-width: 400px;
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  &__email {
    margin-bottom: 30px;
  }
  &__title {
    margin-bottom: 30px;
  }
}
.btn {
  width: 100%;
  margin-bottom: 30px;
  padding: 10px;
}
.login{
  color: $primary !important;
}
</style>
