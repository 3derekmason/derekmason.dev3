<template>
  <NuxtLink
    class="flex flex-col w-full h-[200px] md:w-[calc(50%-8px)] md:h-[300px] rounded-md overflow-hidden bg-surface-900/40 shadow-lg p-2 group"
    :to="url"
    aria-label="Navigate to {{ name }}"
  >
    <img
      :src="thumbnail"
      :alt="name"
      class="object-cover overflow-hidden w-full h-full rounded-md border transition-all duration-200 scale-90 border-surface-600 group-hover:scale-100"
    />
    <p class="mx-2 mt-2 text-lg font-bold">{{ name }}</p>
    <p class="mx-4 text-sm text-gray-500 group-hover:hidden">
      {{ description }}
    </p>
    <p
      class="hidden mx-4 text-sm text-center text-primary-300 group-hover:block pulse"
    >
      Play Now
    </p>
  </NuxtLink>
</template>

<script setup lang="ts">
const props = defineProps<{
  name: string;
  url: string;
  thumbnail: string;
  description: string;
}>();
</script>

<style scoped>
.pulse {
  animation: pulse 1s infinite;
}

@keyframes pulse {
  0% {
    scale: 0.9;
  }
  50% {
    scale: 1.1;
  }
  100% {
    scale: 0.9;
  }
}
</style>
