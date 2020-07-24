/* eslint-disable no-restricted-properties */
/* eslint-disable no-param-reassign */

import DecimalJS from 'decimal.js-light';

let store;

if (process.browser) {
  window.onNuxtReady(async ({ $store }) => {
    store = $store;
  });
}

function getBalanceByCoin(coin) {
  const coins = store.getters['wallet/getMyCoins'];
  const result = coins.find((item) => item.coin.toLowerCase() === coin.toLowerCase());

  if (result) {
    return result.balance;
  }
  return new Error('The coin not found');
}

function getAmountFromSatoshi(amount) {
  return new DecimalJS(amount).times(new DecimalJS(10).pow(-18)).toFixed();
}

function getCoinFormatted(coinData) {
  return {
    supply: getAmountFromSatoshi(coinData.volume),
    reserve: getAmountFromSatoshi(coinData.reserve),
    crr: new DecimalJS(coinData.crr).div(100).toFixed(),
    maxSupply: getAmountFromSatoshi(coinData.limitVolume),
    ticker: coinData.symbol,
  };
}

/**
 * Sell:
 * Продажа монеты, подсчет получаемых del
 */
export const sellCoin = (coin, coinAmount) => {
  coinAmount = Math.min(coin.supply, coinAmount);
  if (coin.supply === '0') {
    return '0';
  }
  const result = coin.reserve * (1 - Math.pow(1 - coinAmount / coin.supply, 1 / coin.crr)); // => del

  return result;
};

/**
* Sell:
* Продажа монеты, подсчет необходимых монет
*/
export const sellCoinByDel = (coin, delAmount) => {
  delAmount = Math.min(coin.reserve, delAmount);
  const e1 = new DecimalJS(delAmount).div(coin.reserve);
  const e2 = new DecimalJS(1).minus(e1).pow(coin.crr);
  const result = new DecimalJS(1).minus(e2).times(coin.supply); // => coin

  return result.toFixed();
};

/**
* Buy:
* Покупка монеты, подсчет получаемых монет
*/
export const buyCoin = (coin, delAmount) => {
  const e1 = new DecimalJS(delAmount).div(coin.reserve).plus(1).pow(coin.crr);
  const result = new DecimalJS(e1).minus(1).times(coin.supply); // => coin

  return result.toFixed();
};

/**
* Buy:
* Покупка монеты, подсчет необходимых del
*/
export const buyCoinByCoin = (coin, coinAmount) => {
  const e1 = new DecimalJS(coinAmount).div(coin.supply).plus(1);
  const e2 = new DecimalJS(1).div(coin.crr);
  const result = new DecimalJS(e1).pow(e2).minus(1).times(coin.reserve); // => del

  return result.toFixed();
};


function isLessReserve(spendCoin, amount) {
  const maxDelSpend = new DecimalJS(spendCoin.reserve).minus(10000).toFixed();

  if (new DecimalJS(amount).gt(maxDelSpend)) {
    return {
      key: 'reserve-limit',
      coin: spendCoin.ticker.toUpperCase(),
    };
  }
  return false;
}
function isMoreMaxSupply(getCoin, amount) {
  const available = new DecimalJS(getCoin.maxSupply).minus(getCoin.supply).toFixed(); // => coin

  if (new DecimalJS(amount).gt(available)) {
    return {
      key: 'more-limit-volume',
      coin: getCoin.ticker.toUpperCase(),
    };
  }
  return false;
}
// eslint-disable-next-line no-unused-vars
function isInfluentFunds(value, spendCoin) {
  const balance = getBalanceByCoin(spendCoin.ticker);
  if (new DecimalJS(balance).lt(value)) {
    return {
      key: 'influent-funds',
      coin: spendCoin.ticker.toUpperCase(),
    };
  }
  return false;
}


export function buy(getCoin, amount, spendCoin) {
  spendCoin = getCoinFormatted(spendCoin);
  getCoin = getCoinFormatted(getCoin);

  let estimated = '';
  let error = false;

  if (getCoin.ticker === 'tdel') {
    estimated = sellCoinByDel(spendCoin, amount); // => coin
    error = isLessReserve(spendCoin, amount);
  } else if (spendCoin.ticker === 'tdel') {
    estimated = buyCoinByCoin(getCoin, amount); // => tdel
    error = isMoreMaxSupply(getCoin, amount);
  } else {
    const needDel = buyCoinByCoin(getCoin, amount); // => tdel
    estimated = sellCoinByDel(spendCoin, needDel); // => coin
    error = isMoreMaxSupply(getCoin, amount);
    error = error || isLessReserve(spendCoin, needDel);
  }

  // error = error || isInfluentFunds(estimated, spendCoin);

  if (error) {
    return {
      success: false,
      ...error,
    };
  }

  return {
    success: true,
    value: estimated,
  };
}

export function sell(spendCoin, amount, getCoin) {
  spendCoin = getCoinFormatted(spendCoin);
  getCoin = getCoinFormatted(getCoin);

  let estimated = '';
  let error = false;

  if (spendCoin.ticker === 'tdel') {
    estimated = buyCoin(getCoin, amount); // => coin
    error = isMoreMaxSupply(getCoin, estimated);
  } else if (getCoin.ticker === 'tdel') {
    estimated = sellCoin(spendCoin, amount);
    error = isLessReserve(spendCoin, amount);
  } else {
    const needDel = sellCoin(spendCoin, amount); // => tdel
    estimated = buyCoin(getCoin, needDel); // => coin
    error = isMoreMaxSupply(getCoin, amount);
    error = error || isLessReserve(spendCoin, needDel);
  }

  // error = error || isInfluentFunds(amount, spendCoin);

  if (error) {
    return {
      success: false,
      ...error,
    };
  }

  return {
    success: true,
    value: estimated,
  };
}
