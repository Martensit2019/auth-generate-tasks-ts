<template>
  <header class="header">
    <Container>
      <div class="nav">
        <router-link to="/"><div class="logo">Генератор задач</div></router-link>
        <div class="menu">
          <router-link v-for="item in menu" :to="item.link" :key="item.slug"
            ><div class="menu__btn">{{ item.title }}</div></router-link
          >
          <div class="menu__btn" @click="onLogout">Выйти</div>
        </div>
        <!-- <nav class="nav">
          <div>
            
          </div>
          <div class="menu">
            <router-link v-for="item in menu" :to="item.link" :key="item.slug"
              ><div class="menu__btn">{{ item.title }}</div></router-link
            >
            <div class="menu__btn" @click="onLogout">Выйти</div>
          </div>
        </nav> -->
      </div>
    </Container>
  </header>
</template>

<script setup lang="ts">
import { useAuthStore } from '../../stores/auth'
const { logout } = useAuthStore()
const router = useRouter()
const menu = [
  {
    link: '/',
    slug: 'main',
    title: 'Генератор задач'
  },
  {
    link: '/about',
    slug: 'about',
    title: 'О программе'
  }
  // {
  //   link: '/login',
  //   slug: 'login',
  //   title: 'Выйти'
  // }
]
const onLogout = () => {
  logout()
  router.push({ name: 'login' })
}
</script>

<style scoped lang="scss">
@import 'theHeader';
</style>
