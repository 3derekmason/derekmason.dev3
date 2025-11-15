<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="props.width || 24"
    :height="props.height || 24"
    viewBox="0 0 24 24"
  >
    <!-- Icon from Pixelarticons by Gerrit Halfmann - https://github.com/halfmage/pixelarticons/blob/master/LICENSE -->
    <path fill="currentColor" :d="path" />
  </svg>
</template>

<script setup lang="ts">
const props = defineProps<{
  name: string;
  width?: number;
  height?: number;
}>();

const path = computed(() => {
  switch (props.name) {
    case "home":
      return "M14 2h-4v2H8v2H6v2H4v2H2v2h2v10h7v-6h2v6h7V12h2v-2h-2V8h-2V6h-2V4h-2zm0 2v2h2v2h2v2h2v2h-2v8h-3v-6H9v6H6v-8H4v-2h2V8h2V6h2V4z";
    case "code":
      return "M8 5h2v2H8zM6 7h2v2H6zM4 9h2v2H4zm-2 2h2v2H2zm2 2h2v2H4zm2 2h2v2H6zm2 2h2v2H8zm8-12h-2v2h2zm2 2h-2v2h2zm2 2h-2v2h2zm2 2h-2v2h2zm-2 2h-2v2h2zm-2 2h-2v2h2zm-2 2h-2v2h2z";
    case "music":
      return "M8 4h12v16h-8v-8h6V8h-8v12H2v-8h6zm0 10H4v4h4zm10 0h-4v4h4z";
    case "game":
      return "M2 5h20v14H2zm18 12V7H4v10zM8 9h2v2h2v2h-2v2H8v-2H6v-2h2zm6 0h2v2h-2zm4 4h-2v2h2z";
    case "user":
      return "M15 2H9v2H7v6h2V4h6zm0 8H9v2h6zm0-6h2v6h-2zM4 16h2v-2h12v2H6v4h12v-4h2v6H4z";
    case "menu":
      return "M4 6h16v2H4zm0 5h16v2H4zm16 5H4v2h16z";
    default:
      return "";
  }
});
</script>
