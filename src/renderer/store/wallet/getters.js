import DecimalNumber from 'decimal.js';

DecimalNumber.set({ precision: 40 });

export default {
  getWallet: (state) => state.wallet,
  getBalance: (state, getters, rootState) => {
    const baseCoin = rootState.decimal.baseCoin.toLowerCase();
    if (state.user && state.user.address.balance[baseCoin]) {
      return new DecimalNumber(state.user.address.balance[baseCoin]).times(new DecimalNumber(10).pow(-18)).toFixed();
    }
    return '0';
  },
  getBaseCoinInfo: (state) => state.baseCoinInfo,
  getUser: (state) => state.user,
  getMyTxs(state) {
    if (!state.user) return [];
    return state.user.address.txs;
  },
  getMyConvertations(state) {
    if (!state.user) return [];
    const { txs } = state.user.address;
    const convertations = [];
    for (const tx of txs) {
      if (tx.type === 'buy_coin' || tx.type === 'sell_coin' || tx.type === 'sell_all_coin') {
        convertations.push(tx);
      }
    }
    return convertations;
  },
  getMyCoins: (state, getters, rootState) => {
    if (!state.user) return [];
    const coins = [];
    const balances = state.user.address.balance;
    let baseCoinInfo = null;
    let baseCoinFlag = false;
    const baseCoin = getters.getBaseCoinInfo;
    if (balances) {
      for (const coin in balances) {
        const { avatar } = state.user.coins.find((coinInfo) => coinInfo.symbol === coin);
        if (coin === baseCoin.symbol.toLowerCase()) {
          baseCoinInfo = {
            coin: rootState.decimal.baseCoin,
            balance: new DecimalNumber(balances[coin]).times(new DecimalNumber(10).pow(-18)).toFixed(),
            avatar,
          };
          baseCoinFlag = true;
        } else {
          coins.push({
            coin: coin.toUpperCase(),
            balance: new DecimalNumber(balances[coin]).times(new DecimalNumber(10).pow(-18)).toFixed(),
            avatar,
          });
        }
      }
    }

    if (!baseCoinFlag) {
      baseCoinInfo = {
        coin: rootState.decimal.baseCoin,
        balance: '0',
        avatar: baseCoin.avatar,
      };
    }
    coins.unshift(baseCoinInfo);
    return coins;
  },
};
