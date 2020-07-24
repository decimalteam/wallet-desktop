import { Wallet } from 'decimal-js-sdk';

// eslint-disable-next-line consistent-return
export default function ({ store, redirect }) {
  const mnemonic = localStorage.getItem('wallet');

  if (mnemonic) {
    try {
      const wallet = new Wallet(mnemonic);
      store.commit('wallet/setWallet', wallet);
      return redirect('/wallet');
    } catch (e) {
      localStorage.removeItem('wallet');
    }
  }
}
