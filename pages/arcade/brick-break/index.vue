<template>
  <div class="flex flex-col gap-6 justify-center items-center py-12 w-full">
    <h1 class="text-3xl tracking-widest uppercase text-surface-50">
      Brick Break
    </h1>

    <div class="flex gap-8 items-start">
      <!-- Game board -->
      <div class="relative p-1 border-2 border-surface-700 bg-surface-950">
        <div v-for="(row, i) in gameFrame" :key="i" class="flex">
          <div
            v-for="(cell, j) in row"
            :key="j"
            class="w-3 h-3 transition-colors duration-75"
            :class="{
              'bg-surface-700': cell === EMPTY,
              'bg-primary-400': cell === PLAYER,
              'bg-primary-200': cell === BALL,
              'bg-secondary-500': cell === BRICK,
            }"
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
            <p class="text-sm text-slate-300">Score: {{ player.score }}</p>
            <button
              class="px-5 py-2 mt-2 font-semibold text-white transition-colors bg-primary-500 hover:bg-primary-400"
              @click="restart"
            >
              Play Again
            </button>
          </div>
        </Transition>
        <ArcadeStart @start="startGame" v-if="!isGameOver && !isGameStarted" />
      </div>

      <!-- Sidebar -->
      <div class="flex flex-col gap-4 min-w-[100px]">
        <div class="p-4 text-center border bg-surface-900 border-surface-700">
          <p class="mb-1 text-xs tracking-widest uppercase text-surface-400">
            Lives
          </p>
          <p class="text-3xl font-bold tabular-nums text-surface-50">
            {{ player.lives }}
          </p>
        </div>

        <div
          class="p-4 space-y-1 text-xs border bg-surface-900 border-surface-700 text-surface-400"
        >
          <p class="mb-2 font-semibold text-surface-300">Controls</p>
          <p>← → Move</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { fromEvent, interval, merge } from "rxjs";
import {
  map,
  startWith,
  scan,
  tap,
  takeWhile,
  finalize,
  withLatestFrom,
  shareReplay,
} from "rxjs/operators";
import type { Subscription } from "rxjs";
import type { GameObject, Player, Ball } from "@/types/game/brick-break";
import {
  gameSize,
  EMPTY,
  PLAYER,
  BALL,
  BRICK,
  PADDLE_HALF,
  createInitialPlayer,
  createInitialBall,
  createBricks,
  movePlayer,
  moveBall,
  processCollisions,
} from "./game";

definePageMeta({
  layout: "arcade",
});

const player = ref<Player>(createInitialPlayer());
const ball = ref<Ball>(createInitialBall());
const bricks = ref<GameObject[]>(createBricks());
const isGameOver = ref(false);
const isGameStarted = ref(false);
let subscription: Subscription | null = null;

const gameFrame = computed(() => {
  const frame = Array.from({ length: gameSize }, () =>
    Array(gameSize).fill(EMPTY),
  );
  const p = player.value;
  const b = ball.value;

  for (let offset = -PADDLE_HALF; offset <= PADDLE_HALF; offset++) {
    const py = p.y + offset;
    if (frame[p.x]?.[py] !== undefined) frame[p.x][py] = PLAYER;
  }
  if (frame[b.x]?.[b.y] !== undefined) frame[b.x][b.y] = BALL;
  bricks.value.forEach((br) => {
    if (frame[br.x]?.[br.y] !== undefined) frame[br.x][br.y] = BRICK;
  });

  return frame;
});

function startGame() {
  isGameStarted.value = true;
  isGameOver.value = false;
  player.value = createInitialPlayer();
  ball.value = createInitialBall();
  bricks.value = createBricks();

  const keydown$ = fromEvent<KeyboardEvent>(document, "keydown").pipe(
    map((e) => e.code),
  );
  const keyup$ = fromEvent<KeyboardEvent>(document, "keyup").pipe(
    map(() => ""),
  );
  const key$ = merge(keydown$, keyup$).pipe(startWith(""), shareReplay(1));

  const game$ = interval(150).pipe(
    withLatestFrom(key$),
    scan<[number, string], [Player, Ball, GameObject[]]>(
      ([p, b, br], [_, key]) => {
        const movedPlayer = movePlayer(p, key);
        const movedBall = moveBall(b);
        return processCollisions(movedPlayer, movedBall, br);
      },
      [player.value, ball.value, bricks.value],
    ),
    tap(([p, b, br]) => {
      player.value = { ...p };
      ball.value = { ...b };
      bricks.value = [...br];
    }),
    takeWhile(([p]) => p.lives > 0),
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
