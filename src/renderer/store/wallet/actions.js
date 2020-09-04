import { GET_USER } from './consts.js';

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
};
