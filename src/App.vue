<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script setup lang="ts">
import { useAuthStore } from './stores/auth'

const authStore = useAuthStore()

const route = useRoute()
const layout = computed(() => route.meta.layout)

const getToken = () => {
  const token = JSON.parse(localStorage.getItem('token') as string)
  if (token) authStore.userInfo.token = token
}
getToken()
</script>
