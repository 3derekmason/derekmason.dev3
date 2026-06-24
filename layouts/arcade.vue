<template>
  <main class="flex flex-col items-center w-screen h-screen text-surface-50">
    <div
      class="flex flex-col items-center w-full h-full bg-gradient-to-b to-black/90 from-black/50"
    >
      <div class="flex flex-col p-4 w-full max-w-7xl h-full">
        <!-- <AppMenu class="absolute top-4 right-4" /> -->
        <div class="flex gap-4 justify-between items-end py-4 md:p-12">
          <div class="flex gap-2 items-end">
            <NuxtLink
              to="/"
              class="flex gap-2 items-center text-primary-50 hover:text-primary-300"
              aria-label="Navigate Home"
            >
              <AppIcon name="back" :width="24" :height="24" class="md:hidden" />
              <h1 class="block text-4xl md:hidden">dm</h1>
              <h1 class="hidden text-4xl md:block">derek mason</h1>
            </NuxtLink>
            <h1 class="text-4xl text-primary-300">/arcade</h1>
          </div>
          <nav class="hidden gap-2 items-end md:flex">
            <template v-for="(navRoute, i) in allRoutes" :key="navRoute">
              <NuxtLink
                v-if="!isCurrentRoute(navRoute)"
                :to="`/${navRoute}`"
                class="text-primary-50 hover:text-primary-300"
                aria-label="Navigate to {{ navRoute }}"
              >
                {{ navRoute }}
              </NuxtLink>
              <p class="underline opacity-60" v-else aria-label="Current Route">
                {{ navRoute }}
              </p>
              <span v-if="i !== allRoutes.length - 1" class="opacity-60"
                >/</span
              >
            </template>
          </nav>
        </div>

        <div
          class="flex overflow-y-auto flex-col items-center pt-8 w-full h-full md:pt-0 md:px-12"
          style="scrollbar-width: thin"
        >
          <div class="w-full max-w-[800px] p-4 bg-surface-950/80 relative">
            <NuxtLink
              to="/arcade"
              class="absolute top-4 left-4"
              aria-label="Navigate Back"
            >
              <AppIcon name="back" :width="24" :height="24" />
            </NuxtLink>
            <slot />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
const route = useRoute();
const currentRoute = computed(() => route.path.split("/").pop());
const allRoutes = ["about", "projects", "music", "arcade"];
const isCurrentRoute = (route: string) => route === currentRoute.value;
</script>

<style scoped></style>
