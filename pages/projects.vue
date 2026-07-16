<template>
  <div class="flex flex-col w-full max-w-[800px] h-full">
    <span class="flex gap-4 items-center py-4">
      <AppIcon name="code" :width="48" :height="48" />
      <p class="text-xl">Professional & Open Source Projects</p>
    </span>
    <div class="flex flex-col gap-4 w-full">
      <ProjectTile
        v-for="project in projects"
        :key="project.name"
        :name="project.name"
        :url="project.url"
        :description="project.description"
        :archived="project.archived"
        :image="project.image ?? undefined"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { projects } from "~/data/projects";
</script>
