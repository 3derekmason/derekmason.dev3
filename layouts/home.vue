<template>
  <main
    ref="mainRef"
    class="flex flex-col items-center w-screen h-screen text-surface-50"
  >
    <!-- Main background -->
    <div
      v-for="(pair, index) in imagePairs"
      :key="`main-${index}`"
      class="background-layer"
      :class="{ active: index === currentImageIndex }"
      :style="{ backgroundImage: `url('${pair.main}')` }"
    ></div>

    <!-- Pixel overlay -->
    <div
      v-for="(pair, index) in imagePairs"
      :key="`pixel-${index}`"
      class="overlay-layer"
      :class="{ active: index === currentImageIndex }"
      :style="{
        backgroundImage: `url('${pair.pixel}')`,
        maskImage: revealMask,
        WebkitMaskImage: revealMask,
      }"
    ></div>

    <!-- Gradient overlay -->
    <div
      class="absolute top-0 left-0 w-full h-full bg-gradient-to-b to-black pointer-events-none from-black/40"
      style="z-index: 20"
    ></div>
    <div
      class="flex relative flex-col items-center w-full h-full"
      style="z-index: 30"
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
        <div
          class="flex absolute bottom-0 left-0 z-20 justify-center items-center pb-2 w-full h-16 lg:pb-10"
        >
          <div class="flex gap-8 items-center">
            <button
              v-for="(pair, index) in imagePairs"
              :key="index"
              class="w-8 h-8 rounded-full border transition-all duration-200 bg-primary-500/20 disabled:bg-primary-500/60 border-primary-500/40 disabled:border-primary-500/80"
              :disabled="index === currentImageIndex"
              @click="setImageIndex(index)"
              :aria-label="pair.label"
            ></button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import type { Subscription } from "rxjs";

const imagePairs = [
  {
    main: "/images/background.jpg",
    pixel: "/images/background_pixel.jpg",
    label: "Background One",
  },
  {
    main: "/images/bg2.jpg",
    pixel: "/images/bg2_pixel.jpg",
    label: "Background Two",
  },
  {
    main: "/images/bg3.jpg",
    pixel: "/images/bg3_pixel.jpg",
    label: "Background Three",
  },
];

const route = useRoute();
const mainRef = ref<HTMLElement | null>(null);
const mouseX = ref(0);
const mouseY = ref(0);
const currentImageIndex = ref(0);
const revealRadius = 80;
const imagesPreloaded = ref(false);

let mouseSubscription: Subscription | null = null;
let cycleSubscription: Subscription | null = null;
let intervalFn: any = null;

const revealMask = computed(
  () =>
    `radial-gradient(circle ${revealRadius}px at ${mouseX.value}px ${mouseY.value}px, black 50%, transparent 100%)`
);

const preloadImages = () => {
  const imageUrls = imagePairs.flatMap((pair) => [pair.main, pair.pixel]);
  const promises = imageUrls.map((url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = resolve;
      img.onerror = reject;
      img.src = url;
    });
  });

  Promise.all(promises).then(() => {
    imagesPreloaded.value = true;
  });
};

const startImageCycle = () => {
  if (cycleSubscription) {
    cycleSubscription.unsubscribe();
  }
  if (intervalFn) {
    cycleSubscription = intervalFn(10000).subscribe(() => {
      currentImageIndex.value =
        (currentImageIndex.value + 1) % imagePairs.length;
    });
  }
};

const setImageIndex = (index: number) => {
  currentImageIndex.value = index;
  startImageCycle();
};

onMounted(async () => {
  if (process.client) {
    preloadImages();

    if (mainRef.value) {
      // Import client side to prevent server side errors
      const { fromEvent, interval } = await import("rxjs");
      const { map, throttleTime } = await import("rxjs/operators");

      intervalFn = interval;

      mouseSubscription = fromEvent<MouseEvent>(mainRef.value, "mousemove")
        .pipe(
          throttleTime(16),
          map((event) => ({
            x: event.clientX,
            y: event.clientY,
          }))
        )
        .subscribe(({ x, y }) => {
          mouseX.value = x;
          mouseY.value = y;
        });

      startImageCycle();
    }
  }
});

onUnmounted(() => {
  if (mouseSubscription) {
    mouseSubscription.unsubscribe();
  }
  if (cycleSubscription) {
    cycleSubscription.unsubscribe();
  }
});
</script>

<style scoped>
main {
  position: relative;
  contain: layout style paint;
  will-change: contents;
}

.background-layer,
.overlay-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0;
  transition: opacity 1s ease-in-out;
  pointer-events: none;
}

.background-layer.active,
.overlay-layer.active {
  opacity: 1;
}

.background-layer {
  z-index: 1;
}

.overlay-layer {
  z-index: 10;
  will-change: mask-position;
}
</style>
