<template>
  <main class="flex flex-col items-center w-screen h-screen text-surface-50">
    <div
      class="flex flex-col items-center w-full h-full bg-gradient-to-b to-black/90 from-black/50"
    >
      <div class="flex flex-col p-4 w-full max-w-7xl h-full">
        <AppMenu class="absolute top-4 right-4" />

        <div class="flex flex-col w-full h-full">
          <slot />
          <button
            v-if="route.path !== '/'"
            @click="$router.push('/')"
            class="flex absolute 2xl:top-[4%] top-5 left-5 2xl:left-[8%] justify-center items-center w-10 h-10 rounded-md border transition-all duration-200 bg-surface-950/60 hover:bg-black/90 border-primary-700/50"
          >
            <AppIcon
              name="home"
              :width="24"
              :height="24"
              class="text-primary-100"
            />
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
const route = useRoute();
</script>

<style scoped>
main {
  background-image: url("/images/background.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
