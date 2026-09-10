<template>
  <div class="flex flex-col gap-6 items-center py-12 w-full min-h-[700px]">
    <h1
      class="text-3xl tracking-widest uppercase text-surface-50"
      v-if="!selectedLevel"
    >
      Chip's Challenge JS
    </h1>

    <div v-if="!selectedLevel" class="flex flex-wrap gap-4 justify-center">
      <button
        v-for="entry in levels"
        :key="entry.id"
        class="flex gap-1 justify-center items-center p-4 border aspect-square bg-surface-900 border-surface-700 hover:border-primary-400"
        @click="selectLevel(entry)"
      >
        <span class="text-lg font-semibold text-surface-50">{{
          entry.name
        }}</span>
      </button>
    </div>

    <GameBoard
      v-else
      :key="`${selectedLevel.id}-${attempt}`"
      :level="selectedLevel"
      :has-next-level="hasNextLevel"
      @exit="exitToSelect"
      @restart="restart"
      @next-level="nextLevel"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import GameBoard from "./components/GameBoard.vue";
import { type LEVEL } from "./game/types";
import { levels } from "./game/levels";

definePageMeta({
  layout: "arcade",
});

const selectedLevel = ref<LEVEL | null>(null);
const attempt = ref(0);

const selectedIndex = computed(() =>
  selectedLevel.value
    ? levels.findIndex((entry) => entry.id === selectedLevel.value!.id)
    : -1,
);

const hasNextLevel = computed(
  () => selectedIndex.value !== -1 && selectedIndex.value < levels.length - 1,
);

const selectLevel = (level: LEVEL) => {
  selectedLevel.value = level;
  attempt.value = 0;
};

const exitToSelect = () => {
  selectedLevel.value = null;
};

const restart = () => {
  attempt.value += 1;
};

const nextLevel = () => {
  if (!hasNextLevel.value) {
    exitToSelect();
    return;
  }
  selectedLevel.value = levels[selectedIndex.value + 1];
  attempt.value = 0;
};
</script>
