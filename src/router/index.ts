import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'
import { useAuthStore } from '../stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to) => {
  const {isAuthenticated} = useAuthStore()
  if (to.meta.needAuth && !isAuthenticated) {
    return { name: 'login' }
  }else if(!to.meta.needAuth && isAuthenticated){
    return { name: 'home' }
  }else{
    return true
  }

})

export default router
