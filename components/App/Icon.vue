<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="props.width || 24"
    :height="props.height || 24"
    viewBox="0 0 24 24"
  >
    <path fill="currentColor" :d="path" />
  </svg>
</template>

<script setup lang="ts">
import { icons } from "~/data/icons";

const props = defineProps<{
  name: string;
  width?: number;
  height?: number;
}>();

const path = computed(() => {
  return icons[props.name as keyof typeof icons];
});
</script>
