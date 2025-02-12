// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: {enabled: true},
  sourcemap: true,
  runtimeConfig: {
    public: {
      API_URL: process.env.NUXT_PUBLIC_API_URL,
      PAYMENT: {
        NICE_PAY: {
          MID: process.env.NICE_PAY_MID,
          MERCHANT_KEY: process.env.NICE_PAY_MERCHANT_KEY
        }
      }
    }
  },
})
