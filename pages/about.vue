<template>
  <div
    class="flex flex-col w-full max-w-[800px] h-full max-h-screen md:mt-10 gap-8"
  >
    <span class="flex flex-col gap-6 md:items-center md:flex-row">
      <AppIcon name="hello" :width="48" :height="48" class="wave" />
      <p class="leading-8 md:text-lg">
        Hi, I'm Derek, a software developer who took a slightly unconventional
        route into tech.
      </p>
    </span>
    <p class="leading-8 md:text-lg md:pl-[62px]">
      Before switching to code, I worked as a preschool teacher and a personal
      trainer. Both of which taught me a lot about patience, communication,
      problem solving, and empathy. A few years ago, I made the leap into
      software development and have been building ever since.
    </p>
    <p class="leading-8 md:text-lg md:pl-[62px]">
      These days, I work primarily on web applications, but I still love the
      same things that drew me to tech in the first place... Figuring out how
      things work behind the scenes, solving interesting and unique problems,
      and turning an idea into something real.
    </p>
    <p class="leading-8 md:text-lg md:pl-[62px]">
      Outside of coding, my biggest passions are music, family, friends, and
      health.
    </p>
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
