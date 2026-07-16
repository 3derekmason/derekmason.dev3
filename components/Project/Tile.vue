<template>
  <NuxtLink
    class="flex overflow-hidden flex-col p-2 w-full rounded-sm shadow-md transition-all duration-200 bg-surface-900/40 group hover:shadow-surface-500 hover:shadow-sm"
    :to="url"
    aria-label="Navigate to {{ name }}"
    target="_blank"
    v-if="!archived"
  >
    <p
      class="flex gap-4 items-center mx-2 mt-2 text-lg font-bold text-primary-300"
    >
      {{ name }}
      <code
        class="text-xs tracking-wider text-secondary-300 group-hover:underline"
        >{{ url.split("/").pop() }}</code
      >
    </p>
    <p class="m-4 text-sm text-gray-500">
      {{ description }}
    </p>
  </NuxtLink>
  <div
    v-else
    class="flex overflow-hidden flex-col p-2 w-full rounded-sm shadow-md bg-surface-900/40 group"
  >
    <p
      class="flex gap-4 items-center mx-2 mt-2 text-lg font-bold text-primary-300"
    >
      {{ name }}
      <code class="text-xs text-surface-400">Archived</code>
    </p>
    <p class="m-4 text-sm text-gray-500">
      {{ description }}
    </p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  name: string;
  url: string;
  description: string;
  archived: boolean;
}>();
</script>
