const localeRU = require('./assets/locales/ru.json');
const localeEN = require('./assets/locales/en.json');

require('dotenv').config();

module.exports = {
  mode: 'spa',
  head: {
    title: 'Wallet - Decimal',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Wallet - Decimal' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Montserrat:300,400,500,600,700,800&display=swap' },
    ],
  },
  loading: { color: '#3B8070' },
  build: {
    extend(config, { isDev, isClient }) {
      /* eslint-disable */
      config.externals = ["node_modules/bootstrap-vue"];
      if (isDev && isClient) {
        config.node = {
          fs: 'empty',
        };
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        });
      }
    },
  },
  buildModules: [
    '@nuxtjs/dotenv',
  ],
  styleResources: {
    scss: [
      '~assets/scss/vars.scss',
      '~assets/scss/mixins.scss',
    ],
  },
  css: [
    '~assets/scss/global.scss',
    '~assets/scss/vars.scss',
  ],
  modules: ['@nuxtjs/style-resources', 'nuxt-i18n', 'bootstrap-vue/nuxt'],
  bootstrapVue: {
    bootstrapCSS: false, // Or `css: false`
    bootstrapVueCSS: false, // Or `bvCSS: false`
    components: ['BTable', 'BPagination'],
  },
  i18n: {
    locales: ['ru', 'en'],
    defaultLocale: 'ru',
    strategy: 'no_prefix',
    vueI18n: {
      messages: {
        ru: localeRU,
        en: localeEN,
      },
    },
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      alwaysRedirect: true,
      fallbackLocale: 'ru',
    },
  },
  plugins: [
    { src: '~/plugins/i18n.js', mode: 'client', ssr: false },
    { src: '~/plugins/helpers.js', mode: 'client', ssr: false },
    { src: '~/plugins/vuescroll.js', mode: 'client', ssr: false },
    { src: '~/plugins/sdk.js', mode: 'client', ssr: false },
    { src: '~/plugins/vee-validate', mode: 'client', ssr: false },
    { src: '~/plugins/math.js', mode: 'client', ssr: false },
    { src: '~/plugins/confirm', mode: 'client', ssr: false },
    { src: '~/plugins/global.js', mode: 'client', ssr: false },
  ],
  env: {
    baseURL: process.env.BASE_URL,
    baseCoin: process.env.BASE_COIN,
    network: process.env.NETWORK,
  },
};
