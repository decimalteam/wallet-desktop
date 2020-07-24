/* eslint-disable */
import Decimal from 'decimal-js-sdk';

let store;
if (process.browser) {
  window.onNuxtReady(async ({ $store }) => {
    store = $store;

    const baseURL = store.getters['decimal/getBaseURL'];
    // const chainId = store.getters['decimal/getChainId'];
    // const decimal = new Decimal({ baseURL, chainId });
    const decimal = new Decimal({ baseURL });

    store.commit('decimal/setSDK', decimal);
    store.dispatch('wallet/GET_USER');
    // store.dispatch('wallet/GET_MY_VALIDATOR');
  });
}
