<template>
  <section class="content-wrap">
    <send-coins
      v-if="sendCoinPage"
      :coin="coins[coinPage]"
      @close-send="sendCoinPage = false"
    />
    <LeftMenu :title="`${activeCoinPageTitle}`" />
    <div class="container__main">
      <div class="content">
        <template v-if="coins[coinPage]">
          <h2 class="title mb-40">
            {{ activeCoinPageTitle }}
          </h2>
          <div class="info-box mb-40">
            <div class="title">
              {{ $t('my-coins.balance') }}
            </div>
            <img
              width="36"
              height="36"
              :src="coins[coinPage].avatar"
              alt="decimal-icon"
              class="coin-icon"
            >
            <button
              class="send-coin-btn"
              @click="sendCoinPage = true"
            >
              <div class="text">
                {{ $t('my-coins.send-coins') }}
              </div>
              <img
                src="~assets/imgs/icons/send-coin.svg"
                alt="send-coin-icon"
                width="15"
                height="13"
              >
            </button>
            <div class="count">
              {{ coins[coinPage].balance | formatAmount(currentLocale, 8) }}
              <div class="currency">
                {{ coins[coinPage].coin }}
              </div>
            </div>
            <div class="cost">
              $ {{ conversionToDollars(coins[coinPage].balance) ? (formatAmount(conversionToDollars(coins[coinPage].balance), 2)) : 0 }}
            </div>
          </div>
          <template v-if="txsData.length">
            <h2 class="mb-23">
              {{ $t('my-coins.history') }}
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
              aria-controls="coin-table"
            />
          </template>
        </template>
      </div>
    </div>
    <h2
      class="right-menu-btn"
      @click="rightMenu = !rightMenu"
    >
      {{ $t('my-coins.title') }}
    </h2>
    <div
      class="right-menu"
      :class="{ open: rightMenu }"
    >
      <div class="top-wrap">
        <h2 class="title mb-40">
          {{ $t('my-coins.title') }}
        </h2>
        <CustomInput
          v-model.trim="search"
          icon="~assets/imgs/icons/send-coin.svg"
          maxlength="10"
          class="w-100 search"
          :placeholder="$t('my-coins.search')"
          without-label
        />
      </div>
      <div class="bottom-wrap">
        <template v-for="(coin, i) of coins">
          <div
            v-if="coin.coin.toLowerCase().indexOf(search.toLowerCase()) === 0"
            :key="coin.coin"
            class="item-box"
            :class="{ active: coinPage === i }"
            @click="coinPage = i"
          >
            <img
              class="mr-15 img"
              width="36"
              height="36"
              :src="coin.avatar"
              alt="decimal-icon"
            >
            <div class="link-name">
              {{ coin.coin }}
            </div>
            <div class="balance">
              {{ coin.balance | formatAmount(currentLocale, 2) }}
            </div>
          </div>
        </template>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import CustomInput from '~/components/UI/Input';
import LeftMenu from '~/components/LeftMenu';
import pagination from '~/components/UI/pagination';
import SendCoins from '~/components/SendCoins';
import TxsTable from '~/components/UI/TxsTable';

export default {
  components: {
    CustomInput, LeftMenu, pagination, SendCoins, TxsTable,
  },
  middleware: 'auth',
  data() {
    return {
      perPage: 10,
      currentPage: 1,
      rows: 0,

      txsData: [],

      fields: ['icon', 'title', 'time', 'coin-amount', 'details'],
      search: '',
      rightMenu: false,
      coinPage: 0,
      sendCoinPage: false,
    };
  },
  computed: {
    ...mapGetters({
      coins: 'wallet/getMyCoins',
      txs: 'wallet/getMyTxs',
      sdk: 'decimal/getSDK',
    }),
    activeCoinPageTitle() {
      return this.coins[this.coinPage] ? this.coins[this.coinPage].coin : '';
    },
  },
  watch: {
    currentPage() {
      this.getTxs();
    },
    coinPage() {
      this.currentPage = 1;
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
  },
  mounted() {
    if (this.sdk) {
      this.getTxs();
    }
  },
  methods: {
    async getTxs() {
      const coin = this.coins[this.coinPage] ? this.coins[this.coinPage].coin.toLowerCase() : this.BASE_COIN.toLowerCase();
      const limit = this.perPage;
      const offset = (this.currentPage - 1) * limit;
      const data = await this.sdk.getMyTransactions(limit, offset, '', coin);

      this.rows = data.count;
      this.txsData = data.txs;
    },
  },
};
</script>

<style lang="scss" scoped>
.flex-between {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}
.right-menu-btn {
  @include btn;
  font-size: 20px;
  text-align: center;
  font-weight: 500;
  text-decoration: underline;
  height: 42px;
  align-items: center;
  z-index: 110;
  position: absolute;
  top: 15px;
  right: 15px;
  display: none;
  &:hover {
    text-decoration: none;
  }
  @media (max-width: 1365px) {
    display: flex;
  }
  @media (max-width: 479px) {
    font-size: 16px;
  }
}
.container__main {
  margin-right: 350px;
  @media (max-width: 1365px) {
    margin-right: 0
  }
}
.right-menu {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 80;
  height: 100%;
  overflow-x: hidden;
  min-height: 100vh;
  overflow-y: auto;
  min-width: 350px;
  width: 350px;
  @include scrollbar;
  background-color: #2A2A38;
  @media (max-width: 1365px) {
    & .title {
      display: none;
    }
    & .top-wrap {
      padding-top: 87px !important;
    }
    // transition: width .35s, min-width .35s;
    // width: 0;
    // min-width: 0;
    transition: transform .35s;
    min-width: 350px;
    width: 350px;
    transform: translateX(350px);
    &.open {
      transform: translateX(0);
      // min-width: 350px;
      // width: 350px;
    }
  }
  & .top-wrap {
    padding: 40px;
    border-bottom: 1px solid #383848;
  }
  & .bottom-wrap {
    padding: 40px 0;
    display: flex;
    flex-direction: column;
  }
  & .item-box {
    white-space: nowrap;
    & .img {
      border-radius: 50%;
    }
    &:hover {
      background-color: #383848;
    }
    &.active {
      background-color: #1B1B28;
      border-left-color: $soft-blue;
    }
    transition: all .35s;
    cursor: pointer;
    border-left: 4px solid transparent;
    padding: 22px 40px;
    display: flex;
    align-items: center;
    & .link-name {
      margin-right: 25px;
      font-size: 18px;
      line-height: 1;
    }
    & .balance {
      font-weight: 500;
      font-size: 18px;
      line-height: 1;
      margin-left: auto;
    }
  }
}
</style>
