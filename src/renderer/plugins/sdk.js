/* eslint-disable */
let store;
if (process.browser) {
  window.onNuxtReady(async ({ $store }) => {
    store = $store;

    const baseURL = process.env.BASE_URL;
    const baseCoin = process.env.BASE_COIN;
    const network = process.env.NETWORK;


    store.commit('decimal/setBaseURL', baseURL);
    store.commit('decimal/setBaseCoin', baseCoin);
    store.commit('decimal/setNetwork', network);
  });
}
