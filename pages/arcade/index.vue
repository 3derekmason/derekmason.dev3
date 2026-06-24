<template>
  <div class="flex flex-col w-full max-w-[800px] h-full">
    <span class="flex gap-4 items-center py-4">
      <AppIcon name="arcade" :width="48" :height="48" />
      <p class="text-3xl">Play a Game!</p>
    </span>
    <p class="leading-8 md:text-lg">
      <NuxtLink
        to="https://github.com/3derekmason/"
        target="_blank"
        class="underline hover:no-underline text-primary-300"
        >View source code</NuxtLink
      >
    </p>
    <nav class="flex flex-wrap gap-4 mt-4">
      <ArcadeTile
        v-for="game in allGames"
        :key="game.name"
        :name="game.name"
        :url="game.url"
        :thumbnail="game.thumbnail"
        :description="game.description"
      />
    </nav>
  </div>
</template>

<script setup lang="ts">
import ArcadeTile from "~/components/Arcade/Tile.vue";

const allGames = [
  {
    name: "Tetris",
    url: "/arcade/tetris",
    thumbnail: "/images/arcade/tetris.png",
    description: "Standard classic Tetris game.",
  },
  {
    name: "Brick Break",
    url: "/arcade/brick-break",
    thumbnail: "/images/arcade/brick-break.png",
    description: "Classic brick break game.",
  },
];
</script>
