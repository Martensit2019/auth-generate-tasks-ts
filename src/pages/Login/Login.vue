<template>
  <div v-if="false" class="login-page">
    <div v-if="authStore.error">{{ authStore.error }}</div>
  </div>
  <div class="login-page">
    <div v-if="authStore.error">{{ authStore.error }}</div>
    <form @submit.prevent="onSubmit">
      <h2 class="login-page__title">Вход</h2>
      <div> 
        <BaseInput v-model="form.email" placeholder="Введите Email" isEmail />
        <BaseInput v-model="form.password" placeholder="Придумайте пароль" isPassword />
        <Button class="btn" type="submit">Войти</Button>
      </div>

      <p>Нет аккаунта? <router-link class="register" to="/register">Зарегистрироваться</router-link> </p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '../../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const form = reactive({
  email: '',
  password: ''
})

const onSubmit = async () => {
  await authStore.auth(form, 'login')
  router.push({ name: 'home' })
}
</script>

<style scoped lang="scss">
.login-page {
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
.register{
  color: $primary !important;
}
</style>
