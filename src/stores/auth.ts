import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

const url = import.meta.env.VITE_URL_API

export const useAuthStore = defineStore('auth', () => {
  const userInfo = ref({
    token: '',
    email: '',
    userId: ''
  })
  const error = ref('')

  const isAuthenticated = computed(() => !!userInfo.value.token)

  const auth = async (form: { email: string; password: string }, type: string) => {
    error.value = ''
    try {
      const res = await axios.post(`${url}${type}`, form)
      userInfo.value = {
        token: res.data.accessToken,
        email: res.data.user.email,
        userId: res.data.user.id
      }
      localStorage.setItem(
        'token',
        JSON.stringify(res.data.accessToken)
      )
    } catch (err: any) {
      switch (err.response.data) {
        case 'Email already exists':
          error.value = 'Email уже существует'
          break
        case 'Email format is invalid':
          error.value = 'Неправильный Email'
          break
        case 'Cannot find user':
          error.value = 'Пользователь не найден'
          break
        case 'Password is too short':
          error.value = 'Пароль слишком короткий'
          break
        case 'Incorrect password':
          error.value = 'Пароль неправильный'
          break
        case 'Email and password are required':
          error.value = 'Пароль не может быть пустым'
          break
        default:
          error.value = 'Напредвиденная ошибка'
          break
      }
      throw error.value
    }
  }

  const logout = () => {
    localStorage.removeItem('token');
    userInfo.value.token = ''
  }

  return { userInfo, error, auth, isAuthenticated, logout }
})
