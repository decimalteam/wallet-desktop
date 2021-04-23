import axios from 'axios';
import { GET_USER, GET_DEL_RATE } from './consts.js';

export default {
  async [GET_USER]({ rootState, state, commit }) {
    const { sdk } = rootState.decimal;
    if (state.wallet) {
      const { address } = state.wallet;
      const user = await sdk.getAddress(address);
      const { baseCoin } = rootState.decimal;
      const baseCoinInfo = await sdk.getCoin(baseCoin.toLowerCase());
      commit('setBaseCoinInfo', baseCoinInfo);
      commit('setUser', user);
    }
  },
  async [GET_DEL_RATE]({ commit }) {
    try {
      const c3Exchange = {
        url: 'https://c3.exchange/api/marketdata/getcoinmarketcap/ticker',
        pair: 'DEL_USDT',
      };
      const resp = await axios.get(c3Exchange.url);
      commit('setPrice', resp.data[c3Exchange.pair].last_price);
      return resp.data[c3Exchange.pair].last_price;
    } catch {
      commit('setPrice', 0);
      return 0;
    }
  },
};
