// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  pages: true,
  modules: [
    // '@nuxtjs/supabase',
    '@pinia/nuxt',
    '@unocss/nuxt',
    'nuxt-icon',
  ],
  css: ['~/assets/css/main.css'],
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      stripePK: process.env.STRIPE_PK_KEY,
    },
  },
  app: {
    head: {
      script: [
        {
          src: 'https://js.stripe.com/v3/',
          defer: true,
        },
      ],
    },
  },
})
