<template>
  <div class="flex flex-col items-center">
    <div class="flex justify-between items-center w-full">
      <div class="flex gap-4 items-center">
        <button
          class="p-2 text-xs uppercase border bg-surface-900 border-surface-700 text-surface-400 hover:text-surface-200"
          @click="emit('exit')"
        >
          <AppIcon name="back" :width="32" :height="32" />
        </button>
        <h2 class="text-xl tracking-widest uppercase text-surface-200">
          {{ level.name }}
        </h2>
      </div>

      <div class="p-1 border bg-surface-800 border-surface-700">
        <div class="cc-inventory" aria-label="Inventory">
          <div class="cc-inventory-row">
            <div
              v-for="color in keySlots"
              :key="`key-${color}`"
              class="cc-inventory-slot"
              :class="player.keys.includes(color) ? `key-${color}` : ''"
            />
          </div>
          <div class="cc-inventory-row">
            <div
              v-for="boot in bootSlots"
              :key="`boot-${boot}`"
              class="cc-inventory-slot"
              :class="player.boots.includes(boot) ? `boot-${boot}` : ''"
            />
          </div>
        </div>
      </div>
      <div
        class="p-2 px-4 text-center border bg-surface-900 border-surface-700"
      >
        <p class="mb-1 text-xs tracking-widest uppercase text-surface-400">
          Chips
        </p>
        <p class="text-xl font-bold tabular-nums text-surface-50">
          {{ player.chipsCollected }} / {{ totalChips }}
        </p>
      </div>
    </div>

    <div class="flex flex-col gap-4 items-center">
      <div
        ref="viewportRef"
        class="relative border cc-viewport border-surface-700"
      >
        <div class="cc-board" :style="boardStyle">
          <div v-for="(row, y) in board" :key="y" class="cc-row">
            <div v-for="(cell, x) in row" :key="x" class="cc-cell">
              <div class="tile" :class="cell.terrain.type" />
              <div
                v-if="cell.object"
                class="cc-cell-object"
                :class="cell.object.type"
              />
            </div>
          </div>
        </div>

        <div class="tile cc-player">
          <span class="player-head"></span>
          <span class="player-body"></span>
        </div>

        <Transition name="fade">
          <div v-if="status === GAME_STATUS.WON" class="cc-overlay">
            <p class="cc-overlay-title">Level Complete!</p>
            <div class="flex gap-3">
              <button
                v-if="hasNextLevel"
                ref="nextLevelButtonRef"
                class="cc-overlay-button"
                @click="emit('next-level')"
              >
                Next Level
              </button>
              <button
                ref="winExitButtonRef"
                class="cc-overlay-button"
                @click="emit('exit')"
              >
                Exit
              </button>
            </div>
          </div>
        </Transition>

        <Transition name="fade">
          <div v-if="status === GAME_STATUS.LOST" class="cc-overlay">
            <p class="cc-overlay-title">Oops!</p>
            <button
              ref="restartButtonRef"
              class="cc-overlay-button"
              @click="emit('restart')"
            >
              Restart
            </button>
          </div>
        </Transition>
      </div>
    </div>
    <div class="flex justify-center items-center mt-4 w-full">
      <button
        class="p-2 text-xs uppercase border bg-surface-900 border-surface-700 text-surface-400 hover:text-surface-200"
        @click="emit('restart')"
      >
        Reset Level
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, onMounted, onUnmounted, watch } from "vue";
import AppIcon from "~/components/App/Icon.vue";
import "../tiles.css";
import {
  type LEVEL,
  BOOT_TYPE,
  DIRECTION,
  GAME_STATUS,
  KEY_COLORS,
} from "../game/types";
import { useGameState } from "../game/engine/gameState";

const props = defineProps<{
  level: LEVEL;
  hasNextLevel: boolean;
}>();

const emit = defineEmits<{
  (e: "restart"): void;
  (e: "exit"): void;
  (e: "next-level"): void;
}>();

const { board, player, status, totalChips, move } = useGameState(props.level);

const keySlots = Object.values(KEY_COLORS);
const bootSlots = Object.values(BOOT_TYPE);

const viewportRef = ref<HTMLElement | null>(null);

// Measured from the rendered DOM rather than hardcoded, so this stays in
// sync with whatever tile size ends up in tiles.css.
const tileSize = ref(0);
const viewportWidth = ref(0);
const viewportHeight = ref(0);

// The board is translated so that the tile the player currently occupies
// is always centered under the fixed `.cc-player` element
const boardStyle = computed(() => {
  if (!tileSize.value) return {};

  const offsetX =
    viewportWidth.value / 2 -
    (player.value.x * tileSize.value + tileSize.value / 2);
  const offsetY =
    viewportHeight.value / 2 -
    (player.value.y * tileSize.value + tileSize.value / 2);

  return {
    transform: `translate(${offsetX}px, ${offsetY}px)`,
  };
});

const KEY_DIRECTIONS: Record<string, DIRECTION> = {
  ArrowUp: DIRECTION.UP,
  ArrowDown: DIRECTION.DOWN,
  ArrowLeft: DIRECTION.LEFT,
  ArrowRight: DIRECTION.RIGHT,
};

const restartButtonRef = ref<HTMLButtonElement | null>(null);
const nextLevelButtonRef = ref<HTMLButtonElement | null>(null);
const winExitButtonRef = ref<HTMLButtonElement | null>(null);

watch(status, async (value) => {
  await nextTick();
  if (value === GAME_STATUS.LOST) {
    restartButtonRef.value?.focus();
  } else if (value === GAME_STATUS.WON) {
    (nextLevelButtonRef.value ?? winExitButtonRef.value)?.focus();
  }
});

const onKeydown = (event: KeyboardEvent) => {
  if (status.value !== GAME_STATUS.PLAYING) {
    if (event.code !== "Space") return;

    // If a dialog button already has focus (autofocused above, or
    // reached via Tab), let the browser's native Space-activates-button
    // behavior handle it so the *focused* button is the one that fires.
    const active = document.activeElement;
    const focusedIsDialogButton =
      active === restartButtonRef.value ||
      active === nextLevelButtonRef.value ||
      active === winExitButtonRef.value;
    if (focusedIsDialogButton) return;

    // Otherwise, Space triggers the primary action directly: Restart on
    // loss, Next Level (or Exit, if there isn't one) on a win.
    event.preventDefault();
    if (status.value === GAME_STATUS.LOST) {
      emit("restart");
    } else if (props.hasNextLevel) {
      emit("next-level");
    } else {
      emit("exit");
    }
    return;
  }

  const direction = KEY_DIRECTIONS[event.key];
  if (!direction) return;
  event.preventDefault();
  move(direction);
};

let resizeObserver: ResizeObserver | null = null;

const measure = () => {
  const viewport = viewportRef.value;
  if (!viewport) return;

  viewportWidth.value = viewport.clientWidth;
  viewportHeight.value = viewport.clientHeight;

  const sampleTile = viewport.querySelector<HTMLElement>(".tile");
  if (sampleTile) {
    tileSize.value = sampleTile.getBoundingClientRect().width;
  }
};

onMounted(() => {
  measure();

  if (viewportRef.value) {
    resizeObserver = new ResizeObserver(() => measure());
    resizeObserver.observe(viewportRef.value);
  }

  window.addEventListener("keydown", onKeydown);
});

onUnmounted(() => {
  resizeObserver?.disconnect();
  window.removeEventListener("keydown", onKeydown);
});
</script>

<style scoped>
.cc-viewport {
  /* Needs an explicit size since its children are positioned
     absolutely and contribute no intrinsic size of their own. */
  width: 504px;
  height: 504px;
  overflow: hidden;
}

.cc-board {
  position: absolute;
  top: 0;
  left: 0;
}

.cc-row {
  display: flex;
}

.cc-cell {
  position: relative;
}

.cc-cell-object {
  position: absolute;
  inset: 5%;
  pointer-events: none;
}

.cc-player {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.player-head {
  width: 50%;
  height: 40%;
  border-radius: 100%;
  background-color: #000;
}

.player-body {
  width: 50%;
  height: 60%;
  background-color: #000;
  border-top-left-radius: 100%;
  border-top-right-radius: 100%;
}

.cc-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(2px);
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
}

.cc-overlay-title {
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.cc-overlay-button {
  padding: 0.5rem 1.25rem;
  border: 1px solid #fff;
  color: #fff;
  background: transparent;
}

.cc-inventory {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.cc-inventory-row {
  display: flex;
  gap: 0.5rem;
}

.cc-inventory-slot {
  width: 32px;
  height: 32px;
  border: 1px solid #787677;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
