<template>
  <main
    ref="mainRef"
    class="flex flex-col items-center w-screen h-screen text-surface-50"
  >
    <!-- Main background -->
    <div
      class="background-layer"
      :class="{ 'is-visible': imagesPreloaded }"
      :style="{
        backgroundImage: currentPair ? `url('${currentPair.main}')` : 'none',
      }"
    ></div>

    <!-- Pixel overlay -->
    <div
      class="overlay-layer"
      :class="{ 'is-visible': imagesPreloaded }"
      :style="{
        backgroundImage: currentPair ? `url('${currentPair.pixel}')` : 'none',
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
        <!-- <AppMenu class="absolute top-4 right-4" /> -->

        <div class="flex flex-col w-full h-full">
          <slot />
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
];

const mainRef = ref<HTMLElement | null>(null);
const mouseX = ref(0);
const mouseY = ref(0);
// Chosen on the client only so every page load gets a fresh pick
// without a server/client hydration mismatch.
const currentImageIndex = ref<number | null>(null);
const currentPair = computed(() =>
  currentImageIndex.value === null ? null : imagePairs[currentImageIndex.value],
);
const revealRadius = 80;
const imagesPreloaded = ref(false);

let mouseSubscription: Subscription | null = null;

const revealMask = computed(
  () =>
    `radial-gradient(circle ${revealRadius}px at ${mouseX.value}px ${mouseY.value}px, black 50%, transparent 100%)`,
);

const preloadImages = (urls: string[]) => {
  const promises = urls.map((url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = resolve;
      img.onerror = reject;
      img.src = url;
    });
  });

  Promise.allSettled(promises).then(() => {
    imagesPreloaded.value = true;
  });
};

onMounted(async () => {
  if (import.meta.client) {
    const index = Math.floor(Math.random() * imagePairs.length);
    currentImageIndex.value = index;
    preloadImages([imagePairs[index].main, imagePairs[index].pixel]);

    if (mainRef.value) {
      // Import client side to prevent server side errors
      const { fromEvent } = await import("rxjs");
      const { map, throttleTime } = await import("rxjs/operators");

      mouseSubscription = fromEvent<MouseEvent>(mainRef.value, "mousemove")
        .pipe(
          throttleTime(16),
          map((event) => ({
            x: event.clientX,
            y: event.clientY,
          })),
        )
        .subscribe(({ x, y }) => {
          mouseX.value = x;
          mouseY.value = y;
        });
    }
  }
});

onUnmounted(() => {
  if (mouseSubscription) {
    mouseSubscription.unsubscribe();
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

.background-layer.is-visible,
.overlay-layer.is-visible {
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
