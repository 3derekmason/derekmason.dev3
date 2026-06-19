<template>
  <main class="flex flex-col items-center w-screen h-screen text-surface-50">
    <div
      class="flex flex-col items-center w-full h-full bg-gradient-to-b to-black/90 from-black/50"
    >
      <div class="flex flex-col p-4 w-full max-w-7xl h-full">
        <!-- <AppMenu class="absolute top-4 right-4" /> -->
        <div class="flex gap-4 items-end p-4 md:p-12">
          <NuxtLink
            v-if="route.path !== '/'"
            to="/"
            class="text-primary-50 hover:text-primary-300"
          >
            <h1 class="block text-4xl md:hidden">dm</h1>
            <h1 class="hidden text-4xl md:block">derek mason</h1>
          </NuxtLink>
          <h1 class="text-3xl text-primary-300">
            /{{ route.path.split("/").pop() }}
          </h1>
        </div>

        <div
          class="flex overflow-y-auto flex-col items-center px-4 pt-8 w-full h-full md:pt-0 md:px-12"
          style="scrollbar-width: thin"
        >
          <slot />
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
const route = useRoute();
</script>

<style scoped></style>
