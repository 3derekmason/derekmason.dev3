<template>
  <div class="flex flex-col w-full max-w-[600px] h-full">
    <span class="py-4">
      <AppIcon name="music" :width="48" :height="48" />
    </span>
    <div class="flex flex-col gap-4 pb-12 h-full">
      <p class="text-lg leading-8">
        Music has always been something I've had a huge passion for... I started
        learning the guitar when I was pretty young and began producing my own
        songs around 2010.
      </p>
      <p class="text-lg leading-8">
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
      <span class="h-20"></span>
      <p class="text-lg leading-8">
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
      <span class="h-20"></span>
      <p class="text-xl leading-8 text-primary-300">
        5 Albums to get to know me:
      </p>
      <ul class="ml-4">
        <li
          v-for="album in getToKnowMeAlbums"
          :key="album.title"
          class="flex gap-2 items-center mb-2"
        >
          <p>{{ album.title }}</p>
          <em>- {{ album.artist }}</em>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
const getToKnowMeAlbums = [
  {
    title: "A Color Map of the Sun",
    artist: "Pretty Lights",
  },
  {
    title: "NO THANK YOU",
    artist: "Little Simz",
  },
  {
    title: "GO:OD AM",
    artist: "Mac Miller",
  },
  {
    title: "Noir",
    artist: "Blue Sky Black Death",
  },
  {
    title: "CHILDREN OF THE SLUMS",
    artist: "Mozzy",
  },
];
</script>
