<template>
  <div
    class="flex flex-col justify-between items-center pb-12 w-full h-full home lg:pb-40"
  >
    <div
      class="flex justify-start items-center p-4 md:p-12 w-full max-w-[1200px]"
    >
      <div class="flex gap-2 items-end">
        <h1 class="text-4xl">{{ introPlayed ? title : currentTitle }}</h1>
        <h1
          :class="`text-4xl text-primary-300 ${showCursor ? 'blink' : 'enter'}`"
        >
          /
        </h1>
      </div>
    </div>
    <AppNavbar />
  </div>
</template>

<script setup lang="ts">
import { useStateStore } from "~/store/state";
import { storeToRefs } from "pinia";
definePageMeta({
  layout: "home",
});

const state = useStateStore();

const { introPlayed } = storeToRefs(state);

const title = ref("derek mason");
const splitTitle = ref(title.value.split(""));
const currentTitle = ref("");
const showCursor = ref(false);

onMounted(() => {
  if (introPlayed.value) {
    showCursor.value = true;
    return;
  }

  setInterval(() => {
    currentTitle.value += splitTitle.value.shift() || "";
  }, 100);
  setInterval(() => {
    showCursor.value = true;
    state.setIntroPlayed(true);
  }, 1200);
});
</script>

<style scoped>
@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

@keyframes shrinkIn {
  from {
    font-size: 64px;
  }
  to {
    font-size: 36px;
  }
}

.blink {
  animation: blink 1.5s step-end infinite;
}
.enter {
  animation: shrinkIn 1.2s forwards;
}
</style>
