<template>
  <div class="flex flex-col gap-6 justify-center items-center py-12">
    <h1 class="text-3xl font-bold tracking-widest uppercase text-surface-50">
      Tetris
    </h1>

    <div class="flex gap-8 items-start">
      <!-- Game board -->
      <div class="relative p-1 border-2 border-surface-600 bg-surface-800">
        <div v-for="(row, i) in gameFrame" :key="i" class="flex">
          <div
            v-for="(cell, j) in row"
            :key="j"
            class="m-px w-6 h-6 transition-colors duration-75"
            :class="cell === BRICK ? 'bg-primary-400' : 'bg-surface-700'"
          />
        </div>

        <!-- Game over overlay -->
        <Transition name="fade">
          <div
            v-if="isGameOver"
            class="flex absolute inset-0 flex-col gap-4 justify-center items-center backdrop-blur-sm bg-surface-900/80"
          >
            <p
              class="text-2xl font-bold tracking-widest uppercase text-primary-400"
            >
              Game Over
            </p>
            <p class="text-sm text-slate-300">Score: {{ gameState.score }}</p>
            <button
              class="px-5 py-2 mt-2 font-semibold text-white rounded transition-colors bg-primary-500"
              @click="restart"
            >
              Play Again
            </button>
          </div>
        </Transition>
      </div>

      <!-- Sidebar -->
      <div class="flex flex-col gap-4 min-w-[100px]">
        <div
          class="p-4 text-center rounded border bg-surface-800 border-surface-600"
        >
          <p class="mb-1 text-xs tracking-widest uppercase text-surface-400">
            Score
          </p>
          <p class="text-3xl font-bold tabular-nums text-surface-50">
            {{ gameState.score }}
          </p>
        </div>

        <div
          class="p-4 space-y-1 text-xs rounded border bg-surface-800 border-surface-600 text-surface-400"
        >
          <p class="mb-2 font-semibold text-surface-300">Controls</p>
          <p>← → Move</p>
          <p>↓ Drop</p>
          <p>↑ Rotate</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { fromEvent, interval, combineLatest } from "rxjs";
import { scan, startWith, map, tap, takeWhile, finalize } from "rxjs/operators";
import type { Subscription } from "rxjs";
import type { State, Brick, Key } from "@/types/game/tetris";
import {
  BRICK,
  clearGame,
  validGame,
  validBrick,
  updatePosition,
  randomBrick,
  initialState,
  handleKeyPress,
  rotate,
  collide,
  score,
  resetKey,
} from "./game";

// ── Reactive state ────────────────────────────────────────────────────────────

const gameState = ref<State>({ ...initialState, game: clearGame() });
const brick = ref<Brick>(randomBrick());
const isGameOver = ref(false);
let subscription: Subscription | null = null;

// ── Computed display frame ────────────────────────────────────────────────────

const gameFrame = computed(() => {
  const frame = clearGame();
  gameState.value.game.forEach((r, i) =>
    r.forEach((c, j) => (frame[i][j] = c)),
  );
  validBrick(brick.value).forEach((r, i) =>
    r.forEach((c, j) => {
      const x = i + gameState.value.x;
      const y = j + gameState.value.y;
      if (frame[x] !== undefined && frame[x][y] !== undefined) {
        frame[x][y] = updatePosition(frame[x][y], c);
      }
    }),
  );
  return validGame(frame);
});

// ── Game loop ─────────────────────────────────────────────────────────────────

function startGame() {
  isGameOver.value = false;
  gameState.value = { ...initialState, game: clearGame() };
  brick.value = randomBrick();

  const key: Key = { code: undefined };

  const keyup$ = fromEvent<KeyboardEvent>(document, "keyup").pipe(
    startWith({ code: undefined } as unknown as Pick<KeyboardEvent, "code">),
    map((e) => e.code),
  );

  const player$ = keyup$.pipe(
    map((keyCode) => {
      key.code = keyCode;
      return key;
    }),
  );

  const state$ = interval(500).pipe(
    scan<number, State>((state) => {
      state.x++;
      return state;
    }, gameState.value),
  );

  const game$ = combineLatest([state$, player$]).pipe(
    scan<[State, Key], [State, Brick]>(
      ([_prevState, currentBrick], [state, pressedKey]) => {
        state = handleKeyPress(state, currentBrick, pressedKey);
        const [rotatedState, rotatedBrick] = rotate(
          state,
          currentBrick,
          pressedKey,
        );
        state = rotatedState;
        currentBrick = rotatedBrick;
        const [collidedState, collidedBrick] = collide(state, currentBrick);
        state = collidedState;
        currentBrick = collidedBrick;
        state = score(state);
        resetKey(pressedKey);
        return [state, currentBrick];
      },
      [gameState.value, brick.value],
    ),
    tap(([state, currentBrick]) => {
      gameState.value = { ...state, game: state.game.map((r) => [...r]) };
      brick.value = currentBrick;
    }),
    takeWhile(([state]) => !state.game[1]?.some((c) => c === BRICK)),
    finalize(() => {
      isGameOver.value = true;
    }),
  );

  subscription = game$.subscribe();
}

function restart() {
  subscription?.unsubscribe();
  subscription = null;
  startGame();
}

// ── Lifecycle ─────────────────────────────────────────────────────────────────

onMounted(() => startGame());
onUnmounted(() => subscription?.unsubscribe());
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
