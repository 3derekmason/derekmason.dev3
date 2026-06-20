<template>
  <NuxtLink
    class="flex flex-col w-full h-[200px] md:w-[calc(50%-8px)] md:h-[300px] rounded-md overflow-hidden bg-surface-800/20 shadow-lg p-2"
    :to="url"
    aria-label="Navigate to {{ name }}"
  >
    <img
      :src="thumbnail"
      :alt="name"
      class="object-cover w-full h-full rounded-md border border-surface-600"
    />
    <p class="mt-2 text-lg font-bold">{{ name }}</p>
    <p class="text-sm text-gray-500">{{ description }}</p>
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
