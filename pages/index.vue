<template>
  <div
    class="flex flex-col justify-between items-center pb-12 w-full h-full home lg:pb-40"
  >
    <div
      class="flex justify-start items-center p-4 md:p-12 w-full max-w-[1200px]"
    >
      <div class="flex gap-2 items-end type">
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

@keyframes typewriter {
  to {
    width: 11ch;
  }
}

@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

.type h1:first-child {
  overflow: hidden;
  white-space: nowrap;
  width: 0;
  animation: typewriter 1.5s steps(11, end) forwards;
}

.type h1:last-child {
  animation: blink 1s step-end infinite;
}
</style>
