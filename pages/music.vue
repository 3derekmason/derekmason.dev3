<template>
  <div class="flex flex-col w-full max-w-[800px] h-full">
    <span class="py-4">
      <AppIcon name="music" :width="48" :height="48" />
    </span>
    <div class="flex flex-col gap-4 pb-12 h-full">
      <div class="flex flex-col p-2 w-full rounded-md shadow transition-all duration-200 md:mb-8 aspect-video bg-surface-800/20 hover:shadow-surface-300/60 hover:p-1">
        <NuxtLink to="https://w2bb.vercel.app" target="_blank" class="w-full h-full" aria-label="Navigate to W2BB">
          <img src="/images/screenshots/w2bbss.png" alt="W2BB" class="object-cover w-full h-full rounded-md" />
        </NuxtLink>
      </div>
      <p class="leading-8 md:text-lg">
        Music has always been something I've had a huge passion for... I started
        learning the guitar when I was pretty young and began producing my own
        songs around 2010.
      </p>
      <p class="leading-8 md:text-lg">
        Everything I've made is just for fun, most of what I make is only ever
        intended for me to hear... but if you'd like to check out some of what
        I've made public, you can find everything over on
        <a
          href="https://w2bb.vercel.app"
          target="_blank"
          class="underline hover:no-underline text-primary-300"
          >W2BB</a
        >.
      </p>
      <hr class="my-8"></hr>
      <p class="leading-8 md:text-lg">
        I thought it would be cool to build an app to host my own music... and
        got the idea that anyone who wanted to should be able to do the same
        thing on thier own terms. If you are maybe interested in a similar site
        of your own, or want to learn more about how I made W2BB, head over to
        <a
          href="https://w2bb.vercel.app"
          target="_blank"
          class="underline hover:no-underline text-primary-300"
          >blankspace.music</a
        >
        to get started.
      </p>
      <hr class="my-8"></hr>
      <p class="leading-8 md:text-xl text-primary-300">
        5 Albums to get to know me:
      </p>
      <div class="flex flex-wrap gap-4 justify-center pb-8 w-full">
        <div class="flex flex-col gap-2 w-[calc(50%-16px)] md:w-1/4" v-for="album in getToKnowMeAlbums" :key="album.title">
          <img :src="album.thumbnail" :alt="album.title" class="object-cover w-full aspect-square" />
          <div class="flex flex-col text-center">
            <p>{{ album.title }}</p>
            <em>{{ album.artist }}</em>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const getToKnowMeAlbums = [
  {
    title: "A Color Map of the Sun",
    artist: "Pretty Lights",
    thumbnail: "/images/music/acmots.webp",
  },
  {
    title: "NO THANK YOU",
    artist: "Little Simz",
    thumbnail: "/images/music/nty.jpg",
  },
  {
    title: "GO:OD AM",
    artist: "Mac Miller",
    thumbnail: "/images/music/ga.jpg",
  },
  {
    title: "Noir",
    artist: "Blue Sky Black Death",
    thumbnail: "/images/music/noir.jpg",
  },
  {
    title: "CHILDREN OF THE SLUMS",
    artist: "Mozzy",
    thumbnail: "/images/music/cots.jpg",
  },
];
</script>
