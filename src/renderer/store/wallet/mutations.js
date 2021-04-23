/* eslint-disable no-param-reassign */
export default {
  setWallet(state, wallet) {
    state.wallet = wallet;
  },
  setUser(state, user) {
    state.user = user;
  },
  logout(state) {
    state.wallet = null;
    state.balance = 0;
    state.user = null;
  },
  setBaseCoinInfo(state, baseCoinInfo) {
    state.baseCoinInfo = baseCoinInfo;
  },
  setPrice(state, price) {
    state.price = price;
  },
};
