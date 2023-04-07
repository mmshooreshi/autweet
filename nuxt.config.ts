// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    chatgpt: {
      apiKey: ''
    }
  },
  app: {
    head: {
      charset: 'utf-8',
      title: 'اُتوییت',
      meta: [
        { name: 'description', content: 'اندپوینتِ سازنده‌ی توییت' }
      ]
    }
  },
  typescript: {
    // typeCheck: true
    shim: false
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    'nuxt-icon',
    '@nuxt/image-edge',
    'nuxt-icon',
    'nuxt-font-loader',
    [
      '@pinia/nuxt',
      {
        autoImports: [
          'defineStore',
          ['defineStore', 'definePiniaStore']
        ]
      }
    ]
  ],
  fontLoader: {
    autoImport: true,
    local: [
      {
        src: '/fonts/PeydaWeb/woff2/PeydaWeb-Black.woff2',
        family: 'PeydaWeb',
        weight: '100 900',
        class: 'font-peyda'
      }
    ]
  },

  tailwindcss: {
    // add '~tailwind.config` alias
    exposeConfig: true
  },
  colorMode: {
    classSuffix: ''
  },
  css: [
    '@vueform/multiselect/themes/default.css'
  ]
})
