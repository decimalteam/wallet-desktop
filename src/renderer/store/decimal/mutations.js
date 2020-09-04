/* eslint-disable no-param-reassign */
export default {
  setSDK(state, data) {
    state.sdk = data;
  },
  setBaseCoin(state, coin) {
    state.baseCoin = coin;
  },
  setNetwork(state, network) {
    state.network = network;
  },
  setBaseURL(state, baseURL) {
    state.baseURL = baseURL;
  },
};
