// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-01-01',
  devtools: { enabled: true },
  modules: ['@nuxt/content'],
  css: ['~/assets/css/blog.css'],
  app: {
    head: {
      htmlAttrs: { lang: 'es' },
      title: 'Historia de los Mundiales'
    }
  }
})
