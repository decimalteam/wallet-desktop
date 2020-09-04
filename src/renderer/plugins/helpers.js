import Vue from 'vue';
import { TX_TYPE } from 'decimal-js-sdk';
import DecimalNumber from 'decimal.js';

import rules from '~/plugins/vee-validate';

DecimalNumber.set({ precision: 50 });

Vue.mixin({
  computed: {
    currentLocale() {
      return this.$i18n.locale;
    },
    pageName() {
      return this.$route.name;
    },
    validateRules() {
      return rules;
    },
    TX_TYPE() {
      return TX_TYPE;
    },
    BASE_COIN() {
      return this.$store.getters['decimal/getBaseCoin'];
    },
    NETWORK() {
      return this.$store.getters['decimal/getNetwork'];
    },
  },
  methods: {
    DecimalNumber(value) {
      return new DecimalNumber(value);
    },
    _getModalLocales() {
      return {
        ok: this.$t('notify.ok'),
        cancel: this.$t('notify.cancel'),
        confirm: this.$t('notify.confirm'),
        txHash: this.$t('notify.txHash'),
      };
    },
    getTxLink(hash) {
      if (!hash) {
        throw new Error('invalid hash');
      }
      if (this.NETWORK !== 'mainnet') {
        return `http://${this.NETWORK}.explorer.decimalchain.com/transactions/${hash}`;
      }

      return `http://explorer.decimalchain.com/transactions/${hash}`;
    },

    getAddressLink(address) {
      if (!address) {
        throw new Error('invalid address');
      }
      if (this.NETWORK !== 'mainnet') {
        return `https://${this.NETWORK}.explorer.decimalchain.com/address/${address}`;
      }

      return `https://explorer.decimalchain.com/address/${address}`;
    },

    dateTransform(date) {
      let lang;
      if (this.currentLocale === 'en') {
        lang = 'en-En';
      } else {
        lang = 'ru-RU';
      }
      const timeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        // hour12: false,
      };
      return new Date(date).toLocaleString(lang, timeFormatOptions);
    },
    conversionToDollars(amount) {
      return amount ? amount * 0.25 : 0;
    },
    copyText(text) {
      const copyText = text;
      const aux = document.createElement('input');
      aux.setAttribute('value', copyText);
      document.body.appendChild(aux);
      aux.select();
      document.execCommand('copy');
      document.body.removeChild(aux);
    },
    getFee(txData, baseCoin) {
      let { fee } = txData;
      if (fee.gas_coin !== null) {
        fee = `${fee.gas_coin.toUpperCase()} ${this.formatAmount(this.getAmountFromSatoshi((txData.fee.gas_amount)))}`;
        fee += ` (${baseCoin} ${this.formatAmount(this.getAmountFromSatoshi(txData.fee.gas_used))})`;
      } else {
        fee = `${baseCoin} ${this.formatAmount(this.getAmountFromSatoshi(txData.fee.gas_used))}`;
      }
      return fee;
    },
    getSubdomen() {
      if (this.NETWORK !== 'mainnet') {
        return `${this.NETWORK}.`;
      }
      return '';
    },

    shortText(text, size) {
      return `${text.slice(0, size)}...${text.slice(-size)}`;
    },
    getAmountFromSatoshi(amount) {
      return this.DecimalNumber(amount).times(new DecimalNumber(10).pow(-18)).toFixed();
    },
    getAmountToSatoshi(amount) {
      return this.DecimalNumber(amount).times(new DecimalNumber(10).pow(18)).toFixed(0);
    },
    // eslint-disable-next-line no-unused-vars
    async sendTransaction(data, options, method, confirmParams) {
      // awaiting approvement
      const confirm = await this.confirmModal(confirmParams);
      if (!confirm) return null;

      const _options = JSON.parse(JSON.stringify(options));

      let txResult = null;

      if (_options.feeCoin && _options.feeCoin.toLowerCase() === this.BASE_COIN.toLowerCase()) {
        _options.feeCoin = '';
      }

      // send tx
      try {
        txResult = await method(data, _options);
        if (txResult.success) {
          this.successModal(txResult.hash);
        } else if (txResult.error) {
          this.errorModal(txResult.error.errorMessage);
        }
      } catch (e) {
        console.log(e);
        this.errorModal();
        txResult = e;
      }

      return txResult;
    },
    async openQrReader(target) {
      if (target && this[target] !== undefined) {
        this[target] = await this.$qr.read() || this[target];
      } else {
        throw new Error('Invalid target');
      }
    },
    setWalletMode(mode) {
      this.$store.commit('changeWalletMode', mode);
    },

    successModal(hash, text = '') {
      return this.$confirm.open({
        mode: 'success',
        title: this.$t('notify.tx-sent'),
        hash,
        text,
        network: this.NETWORK,
        locales: this._getModalLocales(),
      });
    },
    errorModal(error) {
      return this.$confirm.open({
        mode: 'error',
        title: this.$t('notify.error'),
        text: error || this.$t('notify.default-error'),
        locales: this._getModalLocales(),
      });
    },
    // eslint-disable-next-line no-unused-vars
    async confirmModal(confirmMeta) {
      const confirm = await this.$confirm.open({
        mode: 'confirm',
        title: confirmMeta.label,
        text: this.$t('notify.check'),
        params: confirmMeta.params,
        locales: this._getModalLocales(),
      });
      return confirm;
    },
    /*eslint-disable*/
    getBalanceByCoin(coin, coinsList) {
      const coins = coinsList || this.$store.getters['wallet/getMyCoins'];
      const result = coins.find((item) => {
        return item.coin.toLowerCase() === coin.toLowerCase();
      });

      if (result) {
        return result.balance;
      } else {
        return new Error('The coin not found');
      }
    },

    getFirstObjectField(obj) {
      return Object.keys(obj)[0];
    },
    formatAmount(value, amount) {
      let num = String(value);
      if (amount) {
        num = num.replace(/\.\d+/, num.match(new RegExp(`\\.\\d{1,${amount}}`))).replace(/\.0+$/, '');
        num = this.DecimalNumber(num).toFixed();
      }
      var parts = num.toString().split(".");
      if (this.currentLocale === 'en') {
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
      } else {
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        return parts.join(",");
      }
    },
    async getCoinPrice(ticker, coinData) {
      if (ticker === 'tDEL' || ticker === 'tdel' || ticker === 'del') return this.DecimalNumber(1);

      const coin = coinData || await this.sdk.getCoin(ticker.toLowerCase());
      const reserve = this.getAmountFromSatoshi(coin.reserve);
      const crr = this.DecimalNumber(coin.crr).div(100);
      const supply = this.getAmountFromSatoshi(coin.volume);

      let result = this.DecimalNumber(1).div(supply);
      result = this.DecimalNumber(1).minus(result);
      result = result.pow(this.DecimalNumber(1).div(crr));
      result = this.DecimalNumber(1).minus(result).times(reserve);

      return result;
    },
    getMyCoinsList(exclude) {
      const coinsList = [...this.$store.getters['wallet/getMyCoins']];
      if (!exclude) return coinsList;

      const excludeIndex = coinsList.findIndex((item) => item.coin.toLowerCase() === exclude.toLowerCase());

      if (excludeIndex !== -1) {
        coinsList.splice(excludeIndex, 1);
      }
      return coinsList;
    },
    isEnoughMoney(coinTicker, amount, fee, coinsList) {

      const prettyAmount = (amount) => {
        return this.formatAmount(this.DecimalNumber(amount).toFixed(), 4);
      }

      const includeTxFee = fee && fee.coin.toLowerCase() === coinTicker.toLowerCase() ? fee.amount : '0';
      
      if (fee) {
        const balanceForFee = this.getBalanceByCoin(fee.coin);

        if (this.DecimalNumber(fee.amount).gt(balanceForFee)) {
          this.errorModal(this.$tc('errors.influent-funds-for-fee', `${prettyAmount(fee.amount)} ${fee.coin}`))
          return false;
        }
      }

      const balance = this.DecimalNumber(this.getBalanceByCoin(coinTicker, coinsList)).minus(includeTxFee);
      const isEnough = !(this.DecimalNumber(amount).gt(balance));
      
      if (!isEnough) {
        const tickerFormatted = coinTicker.toLowerCase() === 'tdel' ? 'tDEL' : coinTicker.toUpperCase();
        const balanceFormatted = `${prettyAmount(balance)} ${tickerFormatted}`;
        const wantedFormatted = `${prettyAmount(amount)} ${tickerFormatted}`;

        if (includeTxFee === '0') {
          this.errorModal(this.$t('errors.influent-funds', {
            balance: balanceFormatted,
            wanted: wantedFormatted
          }));
        } else {
          this.errorModal(this.$t('errors.influent-funds-inc-fee', {
            balance: balanceFormatted,
            wanted: wantedFormatted,
            fee: `${prettyAmount(fee.amount)} ${fee.coin}`
          }));
        }
      }

      return isEnough;
    },
    async getTxFee(type, data, options) {
      const sdk = this.$store.getters['decimal/getSDK'];
      
      if (options.feeCoin && options.feeCoin.toLowerCase() === this.BASE_COIN.toLowerCase()) {
        options.feeCoin = '';
      } else if (options.feeCoin){
        options.feeCoin = options.feeCoin.toLowerCase();
      }

      const txFeeAmount = await sdk.estimateTxFee(type, data, options);
      return {
        coin: this.feeCoin,
        amount: txFeeAmount,
      };
    },
    throttleFunc(func, ms) {

      let isThrottled = false,
        savedArgs,
        savedThis;
    
      function wrapper() {
    
        if (isThrottled) {
          savedArgs = arguments;
          savedThis = this;
          return;
        }
    
        func.apply(this, arguments);
    
        isThrottled = true;
    
        setTimeout(function() {
          isThrottled = false;
          if (savedArgs) {
            wrapper.apply(savedThis, savedArgs);
            savedArgs = savedThis = null;
          }
        }, ms);
      }
    
      return wrapper;
    }
  },
});

Vue.filter('formatAmount', (value, currentLocale, amount) => {
  if (!value) return '';
  let num = String(value);
  if (amount) {
    num = num.replace(/\.\d+/, num.match(new RegExp(`\\.\\d{1,${amount}}`))).replace(/\.0+$/, '');
    num = new DecimalNumber(num).toFixed();
    if (num == '') num = '0';
  }
  var parts = num.toString().split(".");
    if (currentLocale === 'en') {
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return parts.join(".");
    } else {
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
      return parts.join(",");
    }
});
