// import { GET_USER, GET_MY_VALIDATOR } from './consts';
import { GET_USER } from './consts.js';

export default {
  async [GET_USER]({ rootState, state, commit }) {
    const { sdk } = rootState.decimal;
    if (state.wallet) {
      const { address } = state.wallet;
      const user = await sdk.getAddress(address);
      // const multisigsList = await sdk.getMultisigsByAddress(address);
      // const stakes = await sdk.getStakesByAddress(address);
      commit('setUser', user);
      // commit('setMultisigsList', multisigsList);
      // commit('setUserStakes', stakes);
    }
  },
  // async [GET_MY_VALIDATOR]({ rootState, state, commit }) {
  //   const { sdk } = rootState.decimal;
  //   if (state.wallet) {
  //     const { validatorAddress } = state.wallet;

  //     try {
  //       const myValidator = await sdk.getValidator(validatorAddress);
  //       commit('setMyValidator', myValidator);
  //     } catch (e) {
  //       commit('setMyValidator', null);
  //     }
  //   }
  // },
};
