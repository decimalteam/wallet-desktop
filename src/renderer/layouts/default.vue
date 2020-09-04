<template>
  <div class="container">
    <nuxt />
    <div id="confirm-modal" />
  </div>
</template>

<script>
import { Decimal } from 'decimal-js-sdk';
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      wallet: 'wallet/getWallet',
      sdk: 'decimal/getSDK',
      baseURL: 'decimal/getBaseURL',
    }),
  },
  watch: {
    wallet() {
      this.init();
    },
    baseURL() {
      this.init();
    },
  },
  methods: {
    init() {
      if (this.wallet && this.baseURL) {
        this.setSDK();
        this.getData();
        this.updateUser();
      }
    },
    updateUser() {
      setInterval(() => {
        this.getData();
      }, 5000);
    },
    getData() {
      this.$store.dispatch('wallet/GET_USER');
    },
    setSDK() {
      const decimal = new Decimal({ baseURL: this.baseURL, wallet: this.wallet });
      this.$store.commit('decimal/setSDK', decimal);
    },
  },
};
</script>
