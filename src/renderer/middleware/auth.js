import { Wallet } from 'decimal-js-sdk';

// eslint-disable-next-line consistent-return
export default function ({ store, redirect }) {
  if (!store.getters['wallet/getWallet']) {
    const mnemonic = localStorage.getItem('wallet');

    if (mnemonic) {
      try {
        const wallet = new Wallet(mnemonic);
        store.commit('wallet/setWallet', wallet);
      } catch (e) {
        localStorage.removeItem('wallet');
        return redirect('/');
      }
    } else {
      return redirect('/');
    }
  }
}
