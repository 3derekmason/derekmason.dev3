<template>
  <button
    :aria-label="isOpen ? 'Close Menu' : 'Open Menu'"
    :aria-expanded="isOpen"
    @click="toggleMenu"
    class="flex justify-center items-center w-10 h-10 rounded-md border transition-all duration-200 menu-button bg-surface-950/60 hover:bg-black/90 border-primary-700/50"
  >
    <AppIcon name="menu" :width="24" :height="24" class="text-primary-100" />
  </button>
</template>

<script setup lang="ts">
const isOpen = ref(false);

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};
</script>

<style scoped>
.menu-button::before {
  content: "Menu";
  position: absolute;
  right: calc(100%);
  top: 50%;
  transform: translateY(-50%);
  opacity: 0;
  pointer-events: none;
  transition: all 200ms ease-in-out;
  white-space: nowrap;
  padding: 0.375rem 0.75rem;
  border-radius: 0.375rem;
  color: rgb(var(--color-primary-100) / 0.8);
  font-size: 0.875rem;
  letter-spacing: 0.05em;
}

.menu-button:hover::before {
  opacity: 1;
  right: calc(100% + 0.5rem);
}
</style>
