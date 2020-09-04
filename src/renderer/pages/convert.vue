<template>
  <section class="content-wrap">
    <LeftMenu :title="$t('convert.title')" />
    <div class="container__main">
      <div class="content">
        <h2 class="title mb-40">
          {{ $t('convert.title') }}
        </h2>
        <ValidationObserver
          v-slot="{ handleSubmit }"
          ref="observer"
          tag="div"
        >
          <div class="convert-wrap mb-20">
            <div class="col">
              <div class="convert-box">
                <div class="title">
                  {{ $t('convert.you-pay') }}
                </div>
                <CustomDropdown
                  id="convert-give-coin"
                  v-model.trim="giveCoin"
                  class="mb-20"
                  :options="myCoinList"
                  :error="!giveCoin"
                />
                <ValidationProvider
                  v-slot="{ errors }"
                  :rules="validateRules.amount"
                >
                  <div class="d-flex">
                    <CustomInput
                      id="convert-give-amount"
                      v-model.trim="giveAmount"
                      type="number"
                      class="w-100"
                      :symbol="giveCoin"
                      :placeholder="$t('convert.amount')"
                      :error="!!errors[0] || !!estimatedGet.key"
                      @input="estimate('giveCoin')"
                    >
                      <template v-slot:tip>
                        <div v-if="estimatedGet.key">
                          <div
                            v-if="estimatedGet.key === 'reserve-limit'"
                            class="input__tip input__tip--error"
                          >
                            {{ $tc('errors.reserve-limit-short', estimatedGet.coin) }}
                          </div>
                          <div
                            v-if="estimatedGet.key === 'more-limit-volume'"
                            class="input__tip input__tip--error"
                          >
                            {{ $tc('errors.more-limit-short', estimatedGet.coin) }}
                          </div>
                        </div>
                        <div
                          v-else
                          class="input__tip input__tip--hide"
                        >
                          not calculated
                        </div>
                      </template>
                    </CustomInput>
                    <button
                      class="mini-btn convert-mini-btn"
                      :class="{'active': mode === 'sell-all'}"
                      @click="sellAll"
                    >
                      {{ $t('convert.all') }}
                    </button>
                  </div>
                </ValidationProvider>
              </div>
            </div>
            <div class="col">
              <div class="convert-box">
                <div class="title">
                  {{ $t('convert.you-receive') }}
                </div>
                <ValidationProvider
                  v-slot="{ errors }"
                  rules="required"
                >
                  <CoinsList
                    id="convert-get-coin"
                    v-model.trim="getCoin"
                    class="mb-20"
                    placeholder="SOMECOIN"
                    :error="!!errors[0] || err.unknowBuyCoin"
                  />
                </ValidationProvider>
                <ValidationProvider
                  v-slot="{ errors }"
                  :rules="validateRules.amount"
                >
                  <CustomInput
                    id="convert-get-amount"
                    v-model.trim="getAmount"
                    type="number"
                    class="w-100"
                    :symbol="getCoin"
                    :placeholder="$t('convert.amount')"
                    :error="!!errors[0] || !!estimatedSpend.key"
                    @input="estimate('getCoin')"
                  >
                    <template v-slot:tip>
                      <div v-if="estimatedSpend.key">
                        <div
                          v-if="estimatedSpend.key === 'reserve-limit'"
                          class="input__tip input__tip--error"
                        >
                          {{ $tc('errors.reserve-limit-short', estimatedSpend.coin) }}
                        </div>
                        <div
                          v-if="estimatedSpend.key === 'more-limit-volume'"
                          class="input__tip input__tip--error"
                        >
                          {{ $tc('errors.more-limit-short', estimatedSpend.coin) }}
                        </div>
                      </div>
                      <div
                        v-else
                        class="input__tip input__tip--hide"
                      >
                        not calculated
                      </div>
                    </template>
                  </CustomInput>
                </ValidationProvider>
              </div>
              <div class="convert-btn">
                <div class="convert-btn-bg">
                  <img
                    src="~assets/imgs/icons/convert-icon.svg"
                    width="19"
                    height="23"
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="message-wrap mb-40">
            <div class="row">
              <div class="col">
                <div class="message-box">
                  <div class="title">
                    {{ $t('convert.coin-to-pay-fee') }}
                  </div>
                  <CustomDropdown
                    id="convert-fee-coin"
                    v-model="feeCoin"
                    class="w-100"
                    :placeholder="$t('convert.coin')"
                    :options="myCoins"
                  />
                </div>
              </div>
              <div class="col">
                <div class="message-box">
                  <div class="title">
                    {{ $t('convert.message') }}
                  </div>
                  <CustomInput
                    id="convert-message"
                    v-model.trim="message"
                    class="w-100"
                    :placeholder="$t('convert.input-text')"
                    maxlength="256"
                  />
                </div>
              </div>
              <div class="col">
                <div class="message-box">
                  <button
                    class="main-btn"
                    @click="handleSubmit(send)"
                  >
                    {{ $t('convert.convert') }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </ValidationObserver>
        <template v-if="txsData.length">
          <h2 class="mb-25">
            {{ $t('convert.history') }}
          </h2>
          <txs-table
            :txs="txsData"
            table-class="history-table"
            no-head
            :fields="fields"
          />
          <pagination
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
          />
        </template>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import CustomDropdown from '~/components/UI/Dropdown';
import CustomInput from '~/components/UI/Input';
import LeftMenu from '~/components/LeftMenu';
import CoinsList from '~/components/UI/CoinsList';
import { buy, sell } from '~/plugins/math';
import pagination from '~/components/UI/pagination';
import TxsTable from '~/components/UI/TxsTable';

export default {
  components: {
    CustomInput, CustomDropdown, LeftMenu, CoinsList, pagination, TxsTable,
  },
  middleware: 'auth',
  data() {
    return {
      perPage: 10,
      currentPage: 1,
      rows: 0,

      txsData: [],
      fields: ['convert-icon', 'convert-title', 'time', 'get', 'give', 'details'],

      estimatedSpend: {
        success: false,
        value: '0',
      },

      estimatedGet: {
        success: false,
        value: '0',
      },

      err: {
        unknowBuyCoin: false,
      },

      mode: 'sell', // buy / sell / sellAll

      giveCoinFullInfo: null,
      getCoinFullInfo: null,

      feeCoin: '',
      message: '',

      giveCoin: '',
      getCoin: '',

      giveAmount: '',
      getAmount: '',
    };
  },
  computed: {
    ...mapGetters({
      myCoins: 'wallet/getMyCoins',
      sdk: 'decimal/getSDK',
      txs: 'wallet/getMyTxs',
    }),
    getLabel() {
      switch (this.mode) {
        case 'sell':
          return this.$t('notify.sell');
        case 'sell-all':
          return this.$t('notify.sell-all');
        case 'buy':
          return this.$t('notify.buy');
        default: {
          return '';
        }
      }
    },

    confirmParams() {
      return {
        label: this.getLabel,
        params: [
          {
            label: this.$t('notify.amountToGet'),
            value: `${this.mode !== 'buy' ? '~' : ''}${this.formatAmount(this.DecimalNumber(this.getAmount).toFixed())} ${this.getCoin}`,
          },
          {
            label: this.$t('notify.spend-coins'),
            value: `${this.mode === 'buy' ? '~' : ''}${this.formatAmount(this.DecimalNumber(this.giveAmount).toFixed())} ${this.giveCoin}`,
          },
          {
            label: this.$t('notify.message'),
            value: this.message,
          },
          {
            label: this.$t('notify.fee'),
            value: `${this.txFee.amount} ${this.txFee.coin}`,
          },
        ],
      };
    },

    myCoinList() {
      return this.getMyCoinsList(this.getCoin);
    },
  },
  watch: {
    currentPage() {
      this.getTxs();
    },
    sdk(oldVal, newVal) {
      if (oldVal !== newVal) {
        this.getTxs();
      }
    },
    txs(oldVal, newVal) {
      if (oldVal[0] && newVal[0]) {
        if (oldVal[0].id !== newVal[0].id) {
          this.getTxs();
        }
      }
    },
    async getCoin() {
      this.err.unknowBuyCoin = false;
      try {
        this.getCoinFullInfo = await this.sdk.getCoin(this.getCoin.toLowerCase());
        this.estimate('getCoin');
      } catch (e) {
        this.buyCoinFullInfo = null;
      }
    },
    async giveCoin() {
      try {
        this.giveCoinFullInfo = await this.sdk.getCoin(this.giveCoin.toLowerCase());
        this.estimate('giveCoin');
      } catch (e) {
        this.sellCoinFullInfo = null;
      }
    },
  },
  mounted() {
    if (this.sdk) {
      this.getTxs();
    }
  },
  methods: {
    async getTxs() {
      const limit = this.perPage;
      const offset = (this.currentPage - 1) * limit;
      const data = await this.sdk.getMyTransactions(limit, offset, 'sell_coin,sell_all_coin,buy_coin');

      this.rows = data.count;
      this.txsData = data.txs;
    },

    sellAll() {
      this.mode = 'sell-all';
      const balance = this.getBalanceByCoin(this.giveCoin);
      this.giveAmount = balance;

      this.estimate('sellAll');
    },
    estimate(field) {
      let estimated = { success: false, value: '0' };

      if (field === 'giveCoin' || field === 'sellAll') {
        if (field !== 'sellAll') {
          this.mode = 'sell';
        }
        if (this.getCoinFullInfo && this.giveCoinFullInfo && this.giveAmount && this.getCoin && this.giveCoin) {
          estimated = sell(this.giveCoinFullInfo, this.giveAmount, this.getCoinFullInfo);
          this.getAmount = estimated.success ? this.DecimalNumber(estimated.value).toFixed(18).replace(/^0+(?!\.)|(?:\.|(\..*?))0+$/gm, '$1') : '';
        } else if (!this.giveAmount) {
          this.getAmount = '';
        }
        this.estimatedGet = estimated;
      } else if (field === 'getCoin') {
        this.mode = 'buy';
        if (this.getCoinFullInfo && this.giveCoinFullInfo && this.getAmount && this.getCoin && this.giveCoin) {
          estimated = buy(this.getCoinFullInfo, this.getAmount, this.giveCoinFullInfo);
          this.giveAmount = estimated.success ? this.DecimalNumber(estimated.value).toFixed(18).replace(/^0+(?!\.)|(?:\.|(\..*?))0+$/gm, '$1') : '';
        } else if (!this.getAmount) {
          this.giveAmount = '';
        }
        this.estimatedSpend = estimated;
      }
    },
    reset() {
      this.$refs.observer.reset();
    },

    getTxParams() {
      switch (this.mode) {
        case 'sell':
          return {
            sellCoin: this.giveCoin,
            amount: this.giveAmount,
            getCoin: this.getCoin,
          };
        case 'sell-all':
          return {
            sellCoin: this.giveCoin,
            getCoin: this.getCoin,
          };
        case 'buy':
          return {
            buyCoin: this.getCoin,
            amount: this.getAmount,
            spendCoin: this.giveCoin,
          };
        default:
          throw new Error('invalid mode');
      }
    },

    async send() {
      if (!this.giveCoinFullInfo) {
        this.errorModal(this.$t('errors.unknow-coin'));
        this.err.unknowBuyCoin = true;
        return;
      }

      const data = this.getTxParams();
      const options = {
        feeCoin: this.feeCoin,
        message: this.message,
      };

      if ((this.mode === 'buy' && this.estimatedSpend.success)
          || (this.mode !== 'buy' && this.estimatedGet.success)) {
        // this.txFee = await this.getTxFee(this.TX_TYPE.COIN_SELL, data, options);
        // if (!this.isEnoughMoney(this.giveCoin, this.giveAmount, this.txFee)) return;
      } else {
        if (this.mode === 'sell' || this.mode === 'sell-all') {
          this.errorModal(this.$tc(`errors.${this.estimatedGet.key}`, this.estimatedGet.coin));
        } else {
          this.errorModal(this.$tc(`errors.${this.estimatedSpend.key}`, this.estimatedSpend.coin));
        }
        return;
      }

      let result = null;

      switch (this.mode) {
        case 'sell':
          this.txFee = await this.getTxFee(this.TX_TYPE.COIN_SELL, data, options);
          if (!this.isEnoughMoney(this.giveCoin, this.giveAmount, this.txFee)) return;

          result = await this.sendTransaction(data, options, this.sdk.sellCoins, this.confirmParams);
          break;
        case 'sell-all':
          this.txFee = await this.getTxFee(this.TX_TYPE.COIN_SELL_ALL, data, options);
          if (!this.isEnoughMoney(this.giveCoin, this.giveAmount, this.txFee)) return;

          result = await this.sendTransaction(data, options, this.sdk.sellAllCoins, this.confirmParams);
          break;
        case 'buy':
          this.txFee = await this.getTxFee(this.TX_TYPE.COIN_BUY, data, options);
          if (!this.isEnoughMoney(this.giveCoin, this.giveAmount, this.txFee)) return;

          result = await this.sendTransaction(data, options, this.sdk.buyCoins, this.confirmParams);
          break;
        default:
          throw new Error('invalid mode');
      }
      if (result) {
        this.reset();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.convert-wrap {
  display: flex;
  justify-content: space-between;
  margin-left: -15px;
  margin-right: -15px;
  position: relative;
  flex-wrap: wrap;
  & .col {
    padding-right: 15px;
    padding-left: 15px;
    width: 50%;
    @media (max-width: 1199px) {
      width: 100%;
      &:first-child {
        margin-bottom: 15px;
      }
      &:last-child {
        margin-top: 15px;
      }
    }
  }
}
.convert-box {
  padding: 25px 30px 30px;
  background-color: #2A2A38;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  & .title {
    font-size: 18px;
    line-height: 1.23;
    font-weight: 600;
    margin-bottom: 20px;
  }
}
.convert-btn {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 10px;
  border-radius: 50%;
  background-color: #1B1B28;
  & .convert-btn-bg {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: radial-gradient(210.3% 488.85% at -35.44% -104.81%, #6FF3DB 0%, #00A1FC 47.41%, #0047FC 99.3%);
  }
}
.message-wrap {
  background-color: #2A2A38;
  border-radius: 10px;
  padding: 30px;
  & .row {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-left: -15px;
    margin-right: -15px;
    flex-wrap: wrap;
    & .col {
      padding-left: 15px;
      padding-right: 15px;
      width: 33.3333%;
      @media (max-width: 991px) {
        width: 100%;
        &:first-child {
          margin-bottom: 15px;
        }
        &:last-child {
          margin-top: 30px;
        }
      }
    }
  }
  & .title {
    line-height: 1.25;
    font-weight: 500;
    margin-bottom: 10px;
  }
}
.message-box {
  width: 100%;
}
@media (max-width: 991px) {
  .message-wrap, .convert-box {
    padding: 15px;
  }
}
</style>

<style lang="scss">
.convert-mini-btn {
  height: 56px;
  min-width: 56px;
  color: rgba(255, 255, 255, .3);
  margin-left: 20px;
}
</style>
