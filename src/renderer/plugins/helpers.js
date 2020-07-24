import Vue from 'vue';
// import BigNumber from 'bignumber.js';
// import { TX_TYPE } from 'decimal-js-sdk';
// import DecimalJS from 'decimal.js-light';
// import rules from '~/plugins/vee-validate';

Vue.mixin({
  computed: {
    currentLocale() {
      return this.$i18n.locale;
    },
  },
  methods: {
    formatAmount(x) {
      const parts = x.toString().split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
      return parts.join('.');
    },
  },
});

Vue.filter('formatAmount', (value) => {
  if (!value) return '';
  const number = Number(value);
  return number.toLocaleString('ru-RU', { maximumFractionDigits: 4 }).replace(/,/, '.');
});
