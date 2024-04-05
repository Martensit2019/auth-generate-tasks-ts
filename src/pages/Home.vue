<template>
  <Container>
    <Tasks />
  </Container>
</template>
<script setup lang="ts">
const route = useRoute()
onMounted(() => {
  console.log('route', route.meta);
  
})
</script>
