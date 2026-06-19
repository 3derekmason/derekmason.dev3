<template>
  <div
    class="flex flex-col justify-between items-center pb-12 w-full h-full home lg:pb-40"
  >
    <div
      class="flex justify-start items-center p-4 md:p-12 w-full max-w-[1200px]"
    >
      <div class="flex gap-4 items-end">
        <h1 class="text-4xl">derek mason</h1>
        <h1 class="text-3xl text-primary-300">/</h1>
      </div>
    </div>
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
