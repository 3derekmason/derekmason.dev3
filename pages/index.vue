<template>
  <div
    class="flex flex-col justify-end items-center pb-12 w-full h-full home lg:pb-40"
  >
    <AppNavbar />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "home",
});
</script>

<style scoped>
.home {
  z-index: 20;
}
</style>
