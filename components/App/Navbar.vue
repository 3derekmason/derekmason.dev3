<script setup lang="ts">
const route = useRoute();
const navOptions = [
  {
    label: route.path === "/" ? "About" : "Home",
    href: route.path === "/" ? "/about" : "/",
    icon: route.path === "/" ? "user" : "home",
  },
  {
    label: "Projects",
    href: "/projects",
    icon: "code",
  },
  {
    label: "Music",
    href: "/music",
    icon: "music",
  },
  {
    label: "Games",
    href: "/arcade",
    icon: "game",
  },
];
</script>

<template>
  <div
    class="flex flex-wrap gap-4 justify-center items-center w-full md:justify-around"
  >
    <NuxtLink
      v-for="option in navOptions"
      :key="option.label"
      class="group lg:w-[180px] lg:h-[180px] w-[120px] h-[120px] flex flex-col items-center justify-center rounded-md bg-surface-950/60 hover:bg-black/90 border border-primary-700/50 transition-all duration-200"
      :to="option.href"
    >
      <AppIcon
        :name="option.icon"
        :width="64"
        :height="64"
        class="text-primary-100 group-hover:text-primary-300 transition-all duration-200 group-hover:w-[72px] group-hover:h-[72px]"
      />
      <span
        class="tracking-wider text-primary-100/80 font-pixel group-hover:tracking-[0.2em] transition-all duration-200 text-lg"
        >{{ option.label }}</span
      >
    </NuxtLink>
  </div>
</template>
