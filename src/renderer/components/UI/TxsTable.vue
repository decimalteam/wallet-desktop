<template>
  <div class="scroll-x">
    <b-table
      :id="tableId"
      :class="[{ 'no-header': noHead }, tableClass]"
      :items="txsFormatted"
      :fields="fields"
    >
      <template v-slot:cell(icon)="data">
        <template v-if="data.item.detailsData.type === 'buy_coin'">
          <img
            src="~assets/imgs/icons/buy_coin.svg"
            alt="type-icon"
            width="30"
          >
        </template>
        <template v-if="data.item.detailsData.type === 'create_coin'">
          <img
            src="~assets/imgs/icons/create_coin.svg"
            alt="type-icon"
            width="30"
          >
        </template>
        <template v-if="data.item.detailsData.type === 'create_transaction'">
          <img
            src="~assets/imgs/icons/create_transaction.svg"
            alt="type-icon"
            width="30"
          >
        </template>
        <template v-if="data.item.detailsData.type === 'create_wallet'">
          <img
            src="~assets/imgs/icons/create_wallet.svg"
            alt="type-icon"
            width="30"
          >
        </template>
        <template v-if="data.item.detailsData.type === 'declare_candidate'">
          <img
            src="~assets/imgs/icons/declare_candidate.svg"
            alt="type-icon"
            width="30"
          >
        </template>
        <template v-if="data.item.detailsData.type === 'delegate'">
          <img
            src="~assets/imgs/icons/delegate.svg"
            alt="type-icon"
            width="30"
          >
        </template>
        <template v-if="data.item.detailsData.type === 'delegate_coin'">
          <img
            src="~assets/imgs/icons/delegate_coin.svg"
            alt="type-icon"
            width="30"
          >
        </template>
        <template v-if="data.item.detailsData.type === 'edit_candidate'">
          <img
            src="~assets/imgs/icons/edit_candidate.svg"
            alt="type-icon"
            width="30"
          >
        </template>
        <template v-if="data.item.detailsData.type === 'multi_send_coin'">
          <img
            src="~assets/imgs/icons/multi_send_coin.svg"
            alt="type-icon"
            width="30"
          >
        </template>
        <template v-if="data.item.detailsData.type === 'redeem_check'">
          <img
            src="~assets/imgs/icons/redeem_check.svg"
            alt="type-icon"
            width="30"
          >
        </template>
        <template v-if="data.item.detailsData.type === 'sell_all_coin'">
          <img
            src="~assets/imgs/icons/sell_all_coin.svg"
            alt="type-icon"
            width="30"
          >
        </template>
        <template v-if="data.item.detailsData.type === 'sell_coin'">
          <img
            src="~assets/imgs/icons/sell_coin.svg"
            alt="type-icon"
            width="30"
          >
        </template>
        <template v-if="data.item.detailsData.type === 'send_coin'">
          <img
            src="~assets/imgs/icons/send_coin.svg"
            alt="type-icon"
            width="30"
          >
        </template>
        <template v-if="data.item.detailsData.type === 'set_offline'">
          <img
            src="~assets/imgs/icons/set_offline.svg"
            alt="type-icon"
            width="30"
          >
        </template>
        <template v-if="data.item.detailsData.type === 'set_online'">
          <img
            src="~assets/imgs/icons/set_online.svg"
            alt="type-icon"
            width="30"
          >
        </template>
        <template v-if="data.item.detailsData.type === 'sign_transaction'">
          <img
            src="~assets/imgs/icons/sign_transaction.svg"
            alt="type-icon"
            width="30"
          >
        </template>
        <template v-if="data.item.detailsData.type === 'unbond'">
          <img
            src="~assets/imgs/icons/unbond.svg"
            alt="type-icon"
            width="30"
          >
        </template>
      </template>
      <template v-slot:cell(convert-icon)>
        <img
          src="~assets/imgs/icons/convert.svg"
          alt="type-icon"
          width="30"
        >
      </template>
      <template v-slot:cell(convert-title)>
        <div class="operation">
          {{ $t('convert.convert') }}
        </div>
      </template>
      <template v-slot:cell(title)="data">
        <div class="operation">
          {{ $t(`txs-type.${data.item.detailsData.type}`) }}
        </div>
      </template>
      <template v-slot:cell(block)="data">
        <div class="small-text">
          {{ data.item.block }}
        </div>
      </template>
      <template v-slot:cell(time)="data">
        <div class="small-text">
          {{ data.item.time }}
        </div>
      </template>
      <template v-slot:cell(amount)="data">
        <template v-if="data.item.amount">
          {{ data.item.amount }}
        </template>
        <template v-else>
          -
        </template>
      </template>
      <template v-slot:cell(coin-amount)="data">
        <div class="big-text">
          {{ data.item.amount }}
        </div>
      </template>
      <template v-slot:cell(get)="data">
        <div class="big-text">
          {{ data.item.get }}
        </div>
      </template>
      <template v-slot:cell(give)="data">
        <div class="big-text">
          {{ data.item.give }}
        </div>
      </template>
      <template v-slot:cell(details)="data">
        <button
          class="table-btn"
          @click="data.toggleDetails($event), showDetails[data.item.detailsData.hash] = data.item._showDetails"
        >
          <img
            src="~assets/imgs/icons/arrow-down.svg"
            alt="arrow-down"
            width="8"
            height="8"
          >
        </button>
      </template>

      <template v-slot:row-details="row">
        <div class="table-details-wrap">
          <vertical-table-row
            v-for="(itemKey, index) in fieldDetails"
            :key="index"
            :item-key="itemKey"
            :heading="$t(`txs-type.details.${itemKey}`)"
            :value="row.item.detailsData[itemKey]"
          >
            <template v-slot:timestamp>
              {{ dateTransform(row.item.detailsData.timestamp) }}
            </template>
            <template v-slot:status>
              <span
                :class="{'success': row.item.detailsData.status==='Success', 'error': row.item.detailsData.status==='Fail'}"
              >
                {{ row.item.detailsData.status }}
              </span>
            </template>
            <template v-slot:blockId>
              <a
                target="_blank"
                :href="`https://${getSubdomen()}explorer.decimalchain.com/blocks/${row.item.detailsData.blockId}`"
              >
                {{ $n(row.item.detailsData.blockId) }}
              </a>
            </template>
            <template v-slot:type>
              {{ $t(`txs-type.${row.item.detailsData.type}`) }}
            </template>
            <template v-slot:from>
              <a
                target="_blank"
                :href="`https://${getSubdomen()}explorer.decimalchain.com/address/${row.item.detailsData.from}`"
              >
                {{ row.item.detailsData.from }}
              </a>
            </template>
            <template v-slot:to>
              <a
                target="_blank"
                :href="`https://${getSubdomen()}explorer.decimalchain.com/address/${row.item.detailsData.to}`"
              >
                {{ row.item.detailsData.to }}
              </a>
            </template>
            <template v-slot:multisig>
              <a
                target="_blank"
                :href="`https://${getSubdomen()}explorer.decimalchain.com/address/${row.item.detailsData.multisig}`"
              >
                {{ row.item.detailsData.multisig }}
              </a>
            </template>
            <template v-slot:amount>
              {{ row.item.detailsData.coin }} {{ getAmountFromSatoshi(row.item.detailsData.amount) | formatAmount(currentLocale) }}
            </template>
            <template v-slot:sell_amount>
              {{ row.item.detailsData.sell_coin }} {{ getAmountFromSatoshi(row.item.detailsData.sell_amount) | formatAmount(currentLocale) }}
            </template>
            <template v-slot:get_amount>
              {{ row.item.detailsData.get_coin }} {{ getAmountFromSatoshi(row.item.detailsData.get_amount) | formatAmount(currentLocale) }}
            </template>
            <template v-slot:buy_amount>
              {{ row.item.detailsData.buy_coin }} {{ getAmountFromSatoshi(row.item.detailsData.buy_amount) | formatAmount(currentLocale) }}
            </template>
            <template v-slot:max_amount_to_sell>
              {{ row.item.detailsData.spend_coin }} {{ getAmountFromSatoshi(row.item.detailsData.max_amount_to_sell) | formatAmount(currentLocale) }}
            </template>
            <template v-slot:max_amount_to_buy>
              {{ row.item.detailsData.get_coin }} {{ getAmountFromSatoshi(row.item.detailsData.max_amount_to_buy) | formatAmount(currentLocale) }}
            </template>
            <template v-slot:spend_amount>
              {{ row.item.detailsData.spend_coin }} {{ getAmountFromSatoshi(row.item.detailsData.spend_amount) | formatAmount(currentLocale) }}
            </template>
            <template v-slot:crr>
              {{ row.item.detailsData.crr | formatAmount(currentLocale, 2) }} %
            </template>
            <template v-slot:initial_reserve>
              {{ BASE_COIN }} {{ getAmountFromSatoshi(row.item.detailsData.initial_reserve) | formatAmount(currentLocale) }}
            </template>
            <template v-slot:initial_volume>
              {{ row.item.detailsData.symbol }} {{ getAmountFromSatoshi(row.item.detailsData.initial_volume) | formatAmount(currentLocale) }}
            </template>
            <template v-slot:limit_volume>
              {{ row.item.detailsData.symbol }} {{ getAmountFromSatoshi(row.item.detailsData.limit_volume) | formatAmount(currentLocale) }}
            </template>
            <template v-slot:completion_time>
              {{ dateTransform(row.item.detailsData.completion_time) }}
            </template>
            <template v-slot:validator_address>
              <a
                target="_blank"
                :href="`https://${getSubdomen()}explorer.decimalchain.com/validators/${row.item.detailsData.validator_address}`"
              >
                {{ row.item.detailsData.validator_address }}
              </a>
            </template>
            <template v-slot:commission>
              {{ row.item.detailsData.commission | formatAmount(currentLocale, 2) }} %
            </template>
            <template v-slot:reward_address>
              <a
                target="_blank"
                :href="`https://${getSubdomen()}explorer.decimalchain.com/address/${row.item.detailsData.reward_address}`"
              >
                {{ row.item.detailsData.reward_address }}
              </a>
            </template>
            <template v-slot:issuer>
              <a
                target="_blank"
                :href="`https://${getSubdomen()}explorer.decimalchain.com/address/${row.item.detailsData.issuer}`"
              >
                {{ row.item.detailsData.issuer }}
              </a>
            </template>
            <template v-slot:receiver>
              <a
                target="_blank"
                :href="`https://${getSubdomen()}explorer.decimalchain.com/address/${row.item.detailsData.receiver}`"
              >
                {{ row.item.detailsData.receiver }}
              </a>
            </template>
            <template v-slot:amount_check>
              {{ row.item.detailsData.coin_check }} {{ getAmountFromSatoshi(row.item.detailsData.amount_check) | formatAmount(currentLocale) }}
            </template>
            <template v-slot:fee>
              {{ getFee(row.item.detailsData, BASE_COIN) }}
            </template>
            <template v-slot:message>
              {{ row.item.detailsData.message === '' ? this.$t('txs-type.details.blank') : row.item.detailsData.message }}
            </template>
          </vertical-table-row>
          <div
            v-if="row.item.participantsTable"
            class="details-table"
          >
            <div class="title">
              {{ $t('txs-type.details.multisig_table.heading') }}
            </div>
            <div class="flex-box">
              <div class="w-500">
                {{ $t('txs-type.details.multisig_table.owners') }}
              </div>
              <div>
                {{ $t('txs-type.details.multisig_table.weights') }}
              </div>
            </div>
            <div
              v-for="index in row.item.participantsTable.count"
              :key="index-1"
              class="flex-box"
            >
              <div class="header">
                <a
                  target="_blank"
                  :href="`https://${getSubdomen()}explorer.decimalchain.com/address/${row.item.participantsTable.owners[index-1]}`"
                >
                  {{ row.item.participantsTable.owners[index-1] }}
                </a>
              </div>
              <div class="value">
                {{ row.item.participantsTable.weights[index-1] }}
              </div>
            </div>
          </div>
          <div
            v-if="row.item.multisendTable"
            class="details-table"
          >
            <div class="title">
              {{ $t('txs-type.details.receivers') }}
            </div>
            <div class="flex-box">
              <div class="w-500">
                {{ $t('txs-type.details.address') }}
              </div>
              <div>
                {{ $t('txs-type.details.amount') }}
              </div>
            </div>
            <div
              v-for="(item, index) in row.item.multisendTable"
              :key="index"
              class="flex-box"
            >
              <div class="header">
                <a
                  target="_blank"
                  :href="`https://${getSubdomen()}explorer.decimalchain.com/address/${getFirstObjectField(item)}`"
                >
                  {{ getFirstObjectField(item) }}
                </a>
              </div>
              <div class="value">
                {{ formatAmount(getAmountFromSatoshi(item[getFirstObjectField(item)].amount)) }}  {{ item[getFirstObjectField(item)].coin ==='tdel' ? 'tDEL' : item[getFirstObjectField(item)].coin.toUpperCase() }}
              </div>
            </div>
          </div>
        </div>
      </template>
    </b-table>
  </div>
</template>

<script>
import { Transaction } from '~/plugins/transaction';
import VerticalTableRow from '~/components/verticalTableRow';

export default {
  components: {
    VerticalTableRow,
  },
  props: {
    txs: {
      type: Array,
      default: null,
    },
    tableId: {
      type: String,
      default: 'default-table',
    },
    tableClass: {
      type: String,
      default: 'transaction-table',
    },
    noHead: {
      type: Boolean,
      default: false,
    },
    fields: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
      showDetails: {},

      fieldDetails: ['hash', 'timestamp', 'status', 'reason', 'blockId',
        'type', 'from', 'multisig', 'to', 'amount', 'sell_amount',
        'get_amount', 'buy_amount', 'max_amount_to_sell', 'max_amount_to_buy',
        'spend_amount', 'title', 'symbol', 'crr', 'initial_reserve', 'initial_volume',
        'limit_volume', 'completion_time', 'validator_address', 'commission',
        'reward_address', 'validator_moniker', 'validator_website', 'validator_identity',
        'validator_security_contact', 'validator_details', 'threshold', 'coins', 'confirmed', 'signer_weight',
        'confirmations', 'transaction', 'issuer', 'receiver', 'amount_check', 'check',
        'proof', 'due_block', 'fee', 'nonce', 'message', 'participantsTable', 'multisendTable',
      ],
    };
  },
  computed: {
    txsFormatted() {
      const txs = [];
      this.txs.forEach((tx, i) => {
        txs.push({
          hash: this.shortText(tx.hash, 7),
          block: tx.blockId,
          time: this.dateTransform(tx.timestamp),
          sender: this.shortText(tx.from, 7),
          type: this.$t(`txs-type.${tx.type}`),

          give: this.giveConvertInfo(tx),
          get: this.getConvertInfo(tx),

          amount: this.amountInfo(tx),
          detailsData: new Transaction(tx),
          _showDetails: this.showDetails[tx.hash] ? this.showDetails[tx.hash] : false,
        });
        if (txs[i].detailsData.owners && txs[i].detailsData.weights) {
          txs[i].participantsTable = {
            count: JSON.parse(txs[i].detailsData.owners).length,
            owners: JSON.parse(txs[i].detailsData.owners),
            weights: JSON.parse(txs[i].detailsData.weights),
          };
        }
        if (txs[i].detailsData.multisend_receivers) {
          txs[i].multisendTable = JSON.parse(txs[i].detailsData.multisend_receivers);
        }
      });
      return txs;
    },
  },
  methods: {
    giveConvertInfo(tx) {
      switch (tx.type) {
        case 'sell_coin':
        case 'sell_all_coin': {
          const amount = this.getAmountFromSatoshi(tx.data.amount_to_sell);
          const coin = tx.data.coin_to_sell === this.BASE_COIN.toLowerCase() ? this.BASE_COIN : tx.data.coin_to_sell.toUpperCase();
          return `- ${this.formatAmount(amount, 4)} ${coin}`;
        }
        case 'buy_coin': {
          const amount = this.getAmountFromSatoshi(tx.data.amount_base);
          const coin = tx.data.coin_base === this.BASE_COIN.toLowerCase() ? this.BASE_COIN : tx.data.coin_to_sell.toUpperCase();
          return `- ${this.formatAmount(amount, 4)} ${coin}`;
        }
        default:
          return '';
      }
    },
    getConvertInfo(tx) {
      switch (tx.type) {
        case 'sell_coin':
        case 'sell_all_coin': {
          const amount = this.getAmountFromSatoshi(tx.data.amount_base);
          const coin = tx.data.coin_base === this.BASE_COIN.toLowerCase() ? this.BASE_COIN : tx.data.coin_base.toUpperCase();
          return `+ ${this.formatAmount(amount, 4)} ${coin}`;
        }
        case 'buy_coin': {
          const amount = this.getAmountFromSatoshi(tx.data.amount_to_buy);
          const coin = tx.data.coin_to_buy === this.BASE_COIN.toLowerCase() ? this.BASE_COIN : tx.data.coin_to_buy.toUpperCase();
          return `+ ${this.formatAmount(amount, 4)} ${coin}`;
        }
        default:
          return '';
      }
    },

    amountInfo(tx) {
      switch (tx.type) {
        case 'buy_coin': {
          const amount = this.getAmountFromSatoshi(tx.data.amount_to_buy);
          const coin = tx.data.coin_to_buy === this.BASE_COIN.toLowerCase() ? this.BASE_COIN : tx.data.coin_to_buy.toUpperCase();
          return `${this.formatAmount(amount, 4)} ${coin}`;
        }
        case 'sell_coin':
        case 'sell_all_coin': {
          const amount = this.getAmountFromSatoshi(tx.data.amount_to_sell);
          const coin = tx.data.coin_to_sell === this.BASE_COIN.toLowerCase() ? this.BASE_COIN : tx.data.coin_to_sell.toUpperCase();
          return `${this.formatAmount(amount, 4)} ${coin}`;
        }
        case 'redeem_check': {
          const amount = this.getAmountFromSatoshi(tx.data.amount_check);
          const coin = tx.data.coin_check === this.BASE_COIN.toLowerCase() ? this.BASE_COIN : tx.data.coin_check.toUpperCase();
          return `${this.formatAmount(amount, 4)} ${coin}`;
        }
        case 'multi_send_coin':
          return this.$t('txs-type.details.see_details');
        case 'create_transaction': {
          const data = JSON.parse(tx.data.coins);
          const amount = this.getAmountFromSatoshi(data[0].amount);
          const coin = data[0].coin === this.BASE_COIN.toLowerCase() ? this.BASE_COIN : data[0].coin.toUpperCase();
          return `${this.formatAmount(amount, 4)} ${coin}`;
        }
        case 'create_coin': {
          const amount = this.getAmountFromSatoshi(tx.data.initial_volume);
          const coin = tx.data.symbol.toUpperCase();
          return `${this.formatAmount(amount, 4)} ${coin}`;
        }
        default: {
          const amount = tx.data.amount ? this.getAmountFromSatoshi(tx.data.amount) : '';
          const coin = tx.data.coin === this.BASE_COIN.toLowerCase() ? this.BASE_COIN : tx.data.coin.toUpperCase();
          return amount ? `${this.formatAmount(amount, 4)} ${coin}` : '';
        }
      }
    },
  },
};
</script>

<style lang="scss">
.b-table.no-header {
  & thead {
    display: none;
  }
}
.history-table {
  @extend .transaction-table;

  & th, td:nth-child(3) {
    width: 100%;
  }
  & th, td:first-child {
    padding-right: 0;
  }
}

.transaction-table {
  border-collapse: collapse;
  width: 100%;
  & tr {
    &:focus {
      outline: none !important;
    }
  }
  & th, td {
    white-space: nowrap;
    text-align: left;
    line-height: 1.3;
    font-weight: 400;
    border-bottom: 1px solid #2A2A38;
    padding: 13px 15px;
    &:first-child {
      padding-left: 0;
    }
    &:last-child {
      padding-right: 0;
      text-align: right;
    }
  }
  & th {
    font-size: 14px;
    color: $soft-blue;
  }
  & .small-text {
    font-size: 14px;
    opacity: .4;
  }
  & .operation {
    font-weight: 500;
  }
  & .big-text {
    font-size: 18px;
    font-weight: bold;
  }
}

.table-btn {
  @include btn;
  width: 30px;
  min-width: 30px;
  height: 30px;
  min-height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 7px;
  &:hover {
    background-color: $soft-blue;
  }
}

.table-details-wrap {
  display: flex;
  flex-wrap: wrap;
  border-left: 1px solid $soft-blue;
  margin-top: -13px;
  margin-bottom: -13px;
  text-align: left;
  & .details-item {
    @media (max-width: 767px) {
      width: 100%;
    }
    word-break: break-all;
    white-space: normal;
    width: 50%;
    padding-left: 20px;
    padding-top: 15px;
    padding-bottom: 15px;
    display: flex;
    font-size: 14px;
    line-height: 1.3;
    & .heading {
      width: 190px;
      min-width: 190px;
      font-weight: 500;
    }
    & .value {
      color: rgba(255, 255, 255, .7);
      & .success {
        color: #27AE60;
      }
      & .error {
        color: #eb5757;
      }
      & a {
        color: #f000ff;
        &:hover {
          opacity: .8;
        }
      }
    }
  }
  & .details-table {
    @extend .details-item;
    width: 100%;
    flex-direction: column;
    border-top: 1px solid rgba(255, 255, 255, .7);
    & .title {
      font-weight: 600;
      font-size: 16px;
    }
    & .flex-box {
      padding-top: 13px;
      display: flex;
      width: 100%;
      & .w-500 {
        width: 500px;
        min-width: 500px;
      }
      & .header {
        width: 500px;
        min-width: 500px;
        font-weight: 400;
        & a {
          color: #f000ff;
          &:hover {
            opacity: .8;
          }
        }
      }
      & .value {
        color: #fff;
        font-weight: 700;
      }
    }
  }
}
</style>
