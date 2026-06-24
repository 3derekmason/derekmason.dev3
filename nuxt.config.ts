// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  css: ["~/assets/css/main.css"],
  app: {
    head: {
      title: "Derek Mason",
      meta: [
        { name: "description", content: "Derek Mason's personal website" },
      ],
      htmlAttrs: {
        lang: "en",
      },
    },
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  compatibilityDate: "2025-11-15",
  modules: ["@pinia/nuxt", "@nuxt/image"],
});