<template>
  <button
    class="flex absolute inset-0 justify-center items-center w-full h-full transition-all duration-200 hover:tracking-widest hover:bg-surface-950/80"
    @click="start"
    aria-label="Start Game"
  >
    <AppIcon name="play" :width="24" :height="24" />
    <p class="text-2xl transition-all duration-100">Start</p>
  </button>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: "start"): void;
}>();

const start = () => {
  emit("start");
};
</script>
