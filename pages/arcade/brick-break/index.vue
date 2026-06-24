<template>
  <div class="flex flex-col gap-6 justify-center items-center py-12">
    <h1 class="text-3xl font-bold tracking-widest uppercase text-surface-50">
      Brick Break
    </h1>

    <div class="flex gap-8 items-start">
      <!-- Game board -->
      <div class="relative p-1 border-2 border-surface-600 bg-surface-800">
        <div v-for="(row, i) in gameFrame" :key="i" class="flex">
          <div
            v-for="(cell, j) in row"
            :key="j"
            class="m-px w-2 h-2 transition-colors duration-75"
            :class="{
              'bg-surface-700': cell === EMPTY,
              'bg-blue-400': cell === PLAYER,
              'bg-slate-400 rounded-full': cell === BALL,
              'bg-slate-300': cell === BRICK,
            }"
          />
        </div>

        <!-- Game over overlay -->
        <Transition name="fade">
          <div
            v-if="isGameOver"
            class="flex absolute inset-0 flex-col gap-4 justify-center items-center backdrop-blur-sm bg-surface-900/80"
          >
            <p class="text-2xl font-bold tracking-widest uppercase text-primary-400">
              Game Over
            </p>
            <p class="text-sm text-slate-300">Score: {{ player.score }}</p>
            <button
              class="px-5 py-2 mt-2 font-semibold text-white rounded transition-colors bg-primary-500 hover:bg-primary-400"
              @click="restart"
            >
              Play Again
            </button>
          </div>
        </Transition>
      </div>

      <!-- Sidebar -->
      <div class="flex flex-col gap-4 min-w-[100px]">
        <div class="p-4 text-center rounded border bg-surface-800 border-surface-600">
          <p class="mb-1 text-xs tracking-widest uppercase text-surface-400">Score</p>
          <p class="text-3xl font-bold tabular-nums text-surface-50">
            {{ player.score }}
          </p>
        </div>

        <div class="p-4 text-center rounded border bg-surface-800 border-surface-600">
          <p class="mb-1 text-xs tracking-widest uppercase text-surface-400">Lives</p>
          <p class="text-3xl font-bold tabular-nums text-surface-50">
            {{ player.lives }}
          </p>
        </div>

        <div class="p-4 space-y-1 text-xs rounded border bg-surface-800 border-surface-600 text-surface-400">
          <p class="mb-2 font-semibold text-surface-300">Controls</p>
          <p>← → Move</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { fromEvent, interval, combineLatest, merge } from 'rxjs';
import { map, startWith, scan, tap, takeWhile, finalize } from 'rxjs/operators';
import type { Subscription } from 'rxjs';
import type { GameObject, Player, Ball } from '@/types/game/brick-break';
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
} from './game';

// ── Reactive state ────────────────────────────────────────────────────────────

const player = ref<Player>(createInitialPlayer());
const ball = ref<Ball>(createInitialBall());
const bricks = ref<GameObject[]>(createBricks());
const isGameOver = ref(false);
let subscription: Subscription | null = null;

// ── Computed display frame ────────────────────────────────────────────────────

const gameFrame = computed(() => {
  const frame = Array.from({ length: gameSize }, () => Array(gameSize).fill(EMPTY));
  const p = player.value;
  const b = ball.value;

  for (let offset = -PADDLE_HALF; offset <= PADDLE_HALF; offset++) {
    const py = p.y + offset;
    if (frame[p.x]?.[py] !== undefined) frame[p.x][py] = PLAYER;
  }
  if (frame[b.x]?.[b.y] !== undefined) frame[b.x][b.y] = BALL;
  bricks.value.forEach(br => {
    if (frame[br.x]?.[br.y] !== undefined) frame[br.x][br.y] = BRICK;
  });

  return frame;
});

// ── Game loop ─────────────────────────────────────────────────────────────────

function startGame() {
  isGameOver.value = false;
  player.value = createInitialPlayer();
  ball.value = createInitialBall();
  bricks.value = createBricks();

  const keydown$ = fromEvent<KeyboardEvent>(document, 'keydown').pipe(map(e => e.code));
  const keyup$ = fromEvent<KeyboardEvent>(document, 'keyup').pipe(map(() => ''));
  const key$ = merge(keydown$, keyup$).pipe(startWith(''));

  const game$ = combineLatest([key$, interval(150)]).pipe(
    scan<[string, number], [Player, Ball, GameObject[]]>(
      ([p, b, br], [key]) => {
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
