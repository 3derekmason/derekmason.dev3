<script setup lang="ts">
const title = ref("Hello!");
const splitTitle = ref(title.value.split(""));
const currentTitle = ref("");

onMounted(() => {
  setInterval(() => {
    currentTitle.value += splitTitle.value.shift() || "";
  }, 100);
});
</script>

<template>
  <div
    class="flex flex-col w-full max-w-[800px] h-full max-h-screen md:mt-10 gap-8"
  >
    <span class="flex flex-col gap-6 md:items-center md:flex-row">
      <!-- <AppIcon name="hello" :width="48" :height="48" class="wave" /> -->
      <p class="leading-8 md:text-2xl">{{ currentTitle }}</p>
    </span>
    <p class="leading-8 md:text-lg md:pl-10">
      I'm Derek, a software developer, music enthusiast, and lifelong learner.
      Formerly I worked as a preschool teacher and a personal trainer. I build
      to try and impact people's lives in a positive way. I have always been
      interested in creating things - music, games, workouts, websites, some
      crummy art - while learning as much as I can through the process.
      Nowadays, when I'm not behind a computer screen I'm probably enjoying some
      music, exploring rivers, lakes, and mountains, or entertaining my slight
      obsession with my favorite basketball team. (Go Sixers!)
    </p>
    <div class="flex flex-col gap-4">
      <p class="leading-8 md:text-lg">Get in touch:</p>
      <div class="flex flex-col gap-4 md:gap-8 md:flex-row md:pl-10">
        <div class="flex gap-2 items-center">
          <AppIcon name="mail" :width="24" :height="24" />
          <a href="mailto:me@derekmason.dev" class="text-primary-500"
            >me@derekmason.dev</a
          >
        </div>
        <div class="flex gap-2 items-center">
          <AppIcon name="github" :width="24" :height="24" />
          <a
            href="https://github.com/3derekmason"
            target="_blank"
            class="text-primary-500"
            >Github</a
          >
        </div>
        <div class="flex gap-2 items-center">
          <AppIcon name="linkedin" :width="24" :height="24" />
          <a
            href="https://www.linkedin.com/in/3derekmason"
            target="_blank"
            class="text-primary-500"
            >LinkedIn</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wave {
  animation: wave 2s infinite;
}

@keyframes wave {
  0% {
    transform: rotate(0deg);
  }
  15% {
    transform: rotate(15deg);
  }
  25% {
    transform: rotate(10deg);
  }
  35% {
    transform: rotate(15deg);
  }
  50% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
</style>
