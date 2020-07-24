export default {
  getSDK: (state) => state.sdk,
  getBaseURL: (state) => state.baseURL,
  // getChainId: (state) => state.chainId,
  // getCoinsList: (state) => {
  //   const coins = [];

  //   if (state.coinsList.coins) {
  //     state.coinsList.coins.forEach((coin) => {
  //       if (coin.symbol === 'tdel') {
  //         coins.push('tDEL');
  //       } else {
  //         coins.push(coin.symbol.toUpperCase());
  //       }
  //     });
  //   }

  //   return coins;
  // },
};
