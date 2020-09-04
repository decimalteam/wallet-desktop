/* eslint-disable */
let store;
if (process.browser) {
  window.onNuxtReady(async ({ $store }) => {
    store = $store;

    const baseURL = process.env.baseURL;
    const baseCoin = process.env.baseCoin;
    const network = process.env.network;


    store.commit('decimal/setBaseURL', baseURL);
    store.commit('decimal/setBaseCoin', baseCoin);
    store.commit('decimal/setNetwork', network);
  });
}
