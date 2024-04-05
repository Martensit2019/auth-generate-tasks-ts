<template>
  <div class="auth-layout">
    <div class="auth-layout__img">
      <img
        src="https://weeek.net/uploads/blog/c0e616f2f03dbc55f394cedf068fe9d5_fitted_1230_690.webp"
        alt=""
      />
    </div>
    <div class="auth-layout__content">
    <router-view />
    </div>
  </div>
</template>

<style scoped lang="scss">
.auth-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100vh;
  &__img {
    display: flex;
    align-items: center;
    img {
      width: 100%;
      object-fit: contain;
    }
  }
  &__content {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
