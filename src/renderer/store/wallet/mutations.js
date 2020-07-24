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
    // state.balance = 0;
    state.user = null;
    // state.multisig = null;
    // state.multisigsList = null;
  },
  // setMultisigAddress(state, address) {
  //   state.multisig = address;
  // },
  // setMultisigsList(state, multisigs) {
  //   state.multisigsList = multisigs;
  // },
  // setLastUpdated(state, timestamp) {
  //   state.lastUpdated = timestamp;
  // },
  // setUserStakes(state, stakes) {
  //   state.stakes = stakes;
  // },
  // setMyValidator(state, address) {
  //   state.myValidator = address;
  // },
};
