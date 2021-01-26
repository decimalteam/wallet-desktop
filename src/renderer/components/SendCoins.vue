<template>
  <ValidationObserver
    v-slot="{ handleSubmit }"
    ref="observer"
    tag="div"
    class="send-coins-wrap"
  >
    <Loader ref="loader" />
    <button
      class="icon-btn back"
      @click="back()"
    >
      <img
        width="18"
        height="18"
        src="~assets/imgs/icons/back.svg"
        alt="back"
      >
    </button>
    <div class="send-coins-box">
      <img
        :src="coin.avatar"
        alt="coin-icon"
        width="71"
        height="71"
        class="mb-20 coin-avatar"
      >
      <div class="title mb-40">
        {{ $t('send-coins.send') }} {{ coin.coin }}
      </div>
      <ValidationProvider
        v-slot="{ errors }"
        :rules="validateRules.address"
        class="w-100"
      >
        <CustomInput
          id="send-to"
          v-model.trim="sendTo"
          class="w-100 mb-20 darken"
          :error="!!errors[0]"
          :placeholder="'[dx...]'"
          :label="$t('send-coins.address')"
        />
      </ValidationProvider>
      <ValidationProvider
        v-slot="{ errors }"
        :rules="validateRules.amount"
        class="w-100"
      >
        <CustomInput
          id="amount"
          v-model.trim="amount"
          type="number"
          :error="!!errors[0]"
          :symbol="coin.coin"
          class="w-100 mb-20 darken"
          :placeholder="formatAmount(0.05) + ' ' + coin.coin"
          :label="$t('send-coins.amount')"
        />
      </ValidationProvider>
      <div class="switch-box mr-auto mb-20">
        <CustomSwitch
          v-model="advancedMode"
          styling="round"
        />
        <span class="switch__label">{{ $t('send-coins.advanced') }}</span>
      </div>
      <div
        class="w-100 advanced-box"
        :class="{ 'show': advancedMode }"
      >
        <CustomDropdown
          id="send-fee-coin"
          v-model="feeCoin"
          class="w-100 mb-20 darken"
          :options="myCoins"
          :label="$t('send-coins.fee')"
        />
        <CustomTextarea
          :id="'send-message'"
          v-model.trim="message"
          :placeholder="$t('send-coins.any-text')"
          class="mb-20 w-100 darken"
          :rows="'3'"
          maxlength="256"
          :label="$t('send-coins.message')"
        />
      </div>
      <button
        class="main-btn mt-20"
        @click="handleSubmit(sendCoins)"
      >
        {{ $t('send-coins.send') }}
      </button>
    </div>
  </ValidationObserver>
</template>

<script>
import { mapGetters } from 'vuex';
import CustomInput from '~/components/UI/Input';
import CustomSwitch from '~/components/UI/Switch';
import CustomDropdown from '~/components/UI/Dropdown';
import CustomTextarea from '~/components/UI/Textarea';
import Loader from '~/components/loader';

export default {
  components: {
    CustomInput, CustomSwitch, CustomDropdown, CustomTextarea, Loader,
  },
  props: {
    coin: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      advancedMode: false,

      sendTo: '',
      amount: '',
      feeCoin: '',
      message: '',

      txFee: {},
    };
  },
  computed: {
    ...mapGetters({
      myCoins: 'wallet/getMyCoins',
      sdk: 'decimal/getSDK',
      wallet: 'wallet/getWallet',
    }),
    confirmParams() {
      return {
        label: this.$t('notify.send'),
        params: [
          {
            label: this.$t('notify.from'),
            value: this.wallet.address,
          },
          {
            label: this.$t('notify.to'),
            value: this.sendTo,
          },
          {
            label: this.$t('notify.amount'),
            value: `${this.formatAmount(this.amount)} ${this.coin.coin}`,
          },
          {
            label: this.$t('notify.message'),
            value: this.message,
          },
          {
            label: this.$t('notify.fee'),
            value: `${this.formatAmount(this.txFee.amount)} ${this.txFee.coin}`,
          },
        ],
      };
    },
  },
  methods: {
    async sendCoins() {
      const data = {
        to: this.sendTo,
        coin: this.coin.coin.toLowerCase(),
        amount: this.amount,
      };
      const options = {
        feeCoin: this.feeCoin.toLowerCase(),
        message: this.message,
      };
      this.$refs.loader.show();
      this.txFee = await this.getTxFee(this.TX_TYPE.COIN_SEND, data, options);
      this.$refs.loader.hide();
      if (!this.isEnoughMoney(this.coin.coin, this.amount, this.txFee)) return;

      const result = await this.sendTransaction(data, options, this.sdk.sendCoins, this.confirmParams);
      if (result) {
        this.reset();
      }
    },
    reset() {
      this.sendTo = '';
      this.amount = '';
      this.message = '';
      this.feeCoin = this.myCoins[0].coin || '';
      this.$refs.observer.reset();
    },
    back() {
      this.$emit('close-send');
    },
  },
};
</script>

<style lang="scss" scoped>
.send-coins-wrap {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: $light-black;
  z-index: 150
}
.send-coins-box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 493px;
  padding: 30px 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.coin-avatar {
  border-radius: 50%;
}
.title {
  font-size: 30px;
  line-height: 1;
  font-weight: bold;
}
.back {
  position: absolute;
  top: 40px;
  left: 40px;
  @media (max-width: 575.9px) {
    top: 25px;
    left: 25px;
  }
}
.advanced-box {
  height: 0;
  opacity: 0;
  overflow: hidden;
  transition: height .5s, opacity .5s;
}
.advanced-box.show {
  height: 285px;
  opacity: 1;
}
</style>
