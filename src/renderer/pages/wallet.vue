<template>
  <section class="content-wrap">
    <LeftMenu :title="$t('wallet.title')" />
    <div class="container__main">
      <Loader ref="loader" />
      <div
        v-if="wallet"
        class="content"
      >
        <h2 class="title mb-40">
          {{ $t('wallet.title') }}
        </h2>
        <div class="info-wrap mb-15">
          <div class="col">
            <div class="balance-box info-box">
              <div class="title">
                {{ $t('wallet.balance') }}
              </div>
              <div class="count">
                {{ balance | formatAmount(currentLocale, 8) }}<span class="currency">{{ BASE_COIN }}</span>
              </div>
              <div class="cost">
                $ {{ conversionToDollars(balance) ? (formatAmount(conversionToDollars(balance), 2)) : 0 }}
              </div>
            </div>
          </div>
          <div class="col">
            <div class="wallet-box info-box">
              <div class="title">
                {{ $t('wallet.wallet') }}
              </div>
              <div class="key">
                {{ wallet.address }}
              </div>
              <button
                class="copy-btn"
                :class="{ active: copiedStatus }"
                @click="copyPhrase"
              >
                <div class="text">
                  <template v-if="copiedStatus">
                    {{ $t('wallet.copied') }}
                  </template>
                  <template v-else>
                    {{ $t('wallet.copy') }}
                  </template>
                </div>
                <img
                  src="~assets/imgs/icons/copy.svg"
                  width="24"
                  height="24"
                  alt="copy-icon"
                >
              </button>
            </div>
          </div>
        </div>
        <template v-if="txsData.length">
          <h2 class="mb-15">
            {{ $t('wallet.transaction') }}
          </h2>
          <!-- {{ txsData }} -->
          <txs-table
            :txs="txsData"
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
import LeftMenu from '~/components/LeftMenu';
import pagination from '~/components/UI/pagination';
import TxsTable from '~/components/UI/TxsTable';
import Loader from '~/components/loader';

export default {
  components: {
    LeftMenu, pagination, TxsTable, Loader,
  },
  middleware: 'auth',
  data() {
    return {
      perPage: 10,
      currentPage: 1,
      rows: 0,

      copiedStatus: false,

      txsData: [],
    };
  },
  computed: {
    ...mapGetters({
      wallet: 'wallet/getWallet',
      balance: 'wallet/getBalance',
      sdk: 'decimal/getSDK',
      txs: 'wallet/getMyTxs',
    }),
    fields() {
      return [
        { key: 'hash', label: this.$t('wallet.last') },
        { key: 'block', label: this.$t('wallet.block') },
        { key: 'time', label: this.$t('wallet.time') },
        { key: 'sender', label: this.$t('wallet.sender') },
        { key: 'type', label: this.$t('wallet.type') },
        { key: 'amount', label: this.$t('wallet.amount') },
        { key: 'details', label: '' },
      ];
    },
  },
  watch: {
    async currentPage() {
      this.$refs.loader.show();
      await this.getTxs();
      this.$refs.loader.hide();
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
  async mounted() {
    if (this.sdk) {
      this.$refs.loader.show();
      await this.getTxs();
      this.$refs.loader.hide();
    }
  },
  methods: {
    async getTxs() {
      const limit = this.perPage;
      const offset = (this.currentPage - 1) * limit;
      const data = await this.sdk.getMyTransactions(limit, offset);

      this.rows = data.count;
      this.txsData = data.txs;
    },
    copyPhrase() {
      this.copyText(this.wallet.address);
      this.copiedStatus = true;
      setTimeout(() => {
        this.copiedStatus = false;
      }, 1000);
    },
  },
};
</script>

<style lang="scss" scoped>
.balance-box {
  background-image: url('~assets/imgs/wallet-box.png'), linear-gradient(44.61deg, #7B98F9 30.36%, #93ACFF 86.18%);
  background-position: center bottom;
  background-repeat: no-repeat;
  background-size: 100%;
}
.wallet-box {
  & .key {
    color: #F000FF;
    font-size: 18px;
    padding: 13px 0;
    margin-top: auto;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  & .copy-btn {
    margin-left: auto;
  }
}
</style>
