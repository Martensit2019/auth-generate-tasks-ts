<template>
  <div class="layout">
    <TheHeader />
    <main class="main">
      <Container>
        <router-view />
      </Container>
    </main>
    <TheFooter />
  </div>
</template>

<style scoped lang="scss">
.layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.main {
  flex: 1;
}
</style>
