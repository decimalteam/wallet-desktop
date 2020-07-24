<template>
  <div class="content">
    <h2 class="title mb-40">
      {{ $t('convert.title') }}
    </h2>
    <div class="convert-wrap mb-20">
      <div class="convert-box">
        <div class="title">
          {{ $t('convert.you-pay') }}
        </div>
        <CustomDropdown
          id="you-pay"
          v-model="feeCoin"
          class="mb-20"
          :options="[{coin: 'tDEL', balance: '10', title: 'Decimal', icon: '~assets/imgs/decimal-icon.svg'},{coin: 'qwe', balance: '100', title: 'Decimal', icon: '~assets/imgs/btc-icon.svg'},{coin: 'asd', balance: '10', title: 'Decimal', icon: '~assets/imgs/btc-icon.svg'},{coin: 'zxc', balance: '100', title: 'Decimal', icon: '~assets/imgs/decimal-icon.svg'},{coin: 'dfg', balance: '10', title: 'Decimal', icon: '~assets/imgs/decimal-icon.svg'},{coin: 'cvb', balance: '100', title: 'Decimal', icon: '~assets/imgs/decimal-icon.svg'},{coin: 'fghfgh', balance: '100', title: 'Decimal', icon: '~assets/imgs/decimal-icon.svg'},{coin: 'nmfr', balance: '100', title: 'Decimal', icon: '~assets/imgs/decimal-icon.svg'},{coin: 'rty', balance: '100', title: 'Decimal', icon: '~assets/imgs/decimal-icon.svg'}]"
          :mode="3"
        />
        <div class="d-flex">
          <CustomInput
            id="payAmount"
            v-model="payAmount"
            class="w-100 convert-input"
            :placeholder="$t('convert.amount')"
            without-label
          />
          <button class="mini-btn convert-mini-btn">
            {{ $t('convert.all') }}
          </button>
        </div>
      </div>
      <div class="convert-box">
        <div class="title">
          {{ $t('convert.you-receive') }}
        </div>
        <CustomDropdown
          id="you-receive"
          v-model="youReceive"
          class="mb-20"
          :options="[{coin: 'tDEL', balance: '10', title: 'Decimal', icon: '~assets/imgs/decimal-icon.svg'},{coin: 'qwe', balance: '100', title: 'Decimal', icon: '~assets/imgs/btc-icon.svg'},{coin: 'asd', balance: '10', title: 'Decimal', icon: '~assets/imgs/btc-icon.svg'},{coin: 'zxc', balance: '100', title: 'Decimal', icon: '~assets/imgs/decimal-icon.svg'},{coin: 'dfg', balance: '10', title: 'Decimal', icon: '~assets/imgs/decimal-icon.svg'},{coin: 'cvb', balance: '100', title: 'Decimal', icon: '~assets/imgs/decimal-icon.svg'},{coin: 'fghfgh', balance: '100', title: 'Decimal', icon: '~assets/imgs/decimal-icon.svg'},{coin: 'nmfr', balance: '100', title: 'Decimal', icon: '~assets/imgs/decimal-icon.svg'},{coin: 'rty', balance: '100', title: 'Decimal', icon: '~assets/imgs/decimal-icon.svg'}]"
          :mode="3"
        />
        <CustomInput
          id="receive"
          v-model="receive"
          class="w-100 convert-input"
          :placeholder="$t('convert.amount')"
          without-label
        />
      </div>
      <button class="convert-btn">
        <div class="convert-btn-bg">
          <img
            src="~assets/imgs/icons/convert-icon.svg"
            width="19"
            height="23"
          >
        </div>
      </button>
    </div>
    <div class="message-wrap mb-40">
      <div class="row">
        <div class="message-box">
          <div class="title">
            {{ $t('convert.coin-to-pay-fee') }}
          </div>
          <CustomInput
            id="coin"
            v-model="coin"
            class="w-100 convert-input"
            :placeholder="$t('convert.coin')"
            without-label
          />
        </div>
        <div class="message-box">
          <div class="title">
            {{ $t('convert.coin-to-pay-fee') }}
          </div>
          <CustomInput
            id="message"
            v-model="message"
            class="w-100 convert-input"
            :placeholder="$t('convert.input-text')"
            without-label
          />
        </div>
        <div class="message-box">
          <button class="main-btn">
            {{ $t('convert.convert') }}
          </button>
        </div>
      </div>
    </div>
    <h2 class="mb-25">
      {{ $t('convert.history') }}
    </h2>
    <table class="history-table">
      <tr>
        <td>
          <div class="icon">
            <img
              src="~assets/imgs/icons/convert-blue-icon.svg"
              alt="convert"
              width="15"
            >
          </div>
        </td>
        <td class="operation">
          {{ $t('convert.convert') }}
        </td>
        <td class="date">
          Dec 14, 2020
        </td>
        <td class="big-text">
          + 10 DEL
        </td>
        <td class="big-text">
          - 12 EDR
        </td>
      </tr>
      <tr>
        <td>
          <div class="icon">
            <img
              src="~assets/imgs/icons/convert-blue-icon.svg"
              alt="convert"
              width="15"
            >
          </div>
        </td>
        <td class="operation">
          {{ $t('convert.convert') }}
        </td>
        <td class="date">
          Dec 14, 2020
        </td>
        <td class="big-text">
          + 10 DEL
        </td>
        <td class="big-text">
          - 12 EDR
        </td>
      </tr>
      <tr>
        <td>
          <div class="icon">
            <img
              src="~assets/imgs/icons/convert-blue-icon.svg"
              alt="convert"
              width="15"
            >
          </div>
        </td>
        <td class="operation">
          {{ $t('convert.convert') }}
        </td>
        <td class="date">
          Dec 14, 2020
        </td>
        <td class="big-text">
          + 10 DEL
        </td>
        <td class="big-text">
          - 12 EDR
        </td>
      </tr>
      <tr>
        <td>
          <div class="icon">
            <img
              src="~assets/imgs/icons/convert-blue-icon.svg"
              alt="convert"
              width="15"
            >
          </div>
        </td>
        <td class="operation">
          {{ $t('convert.convert') }}
        </td>
        <td class="date">
          Dec 14, 2020
        </td>
        <td class="big-text">
          + 10 DEL
        </td>
        <td class="big-text">
          - 12 EDR
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import CustomDropdown from '~/components/UI/Dropdown';
import CustomInput from '~/components/UI/Input';

export default {
  layout: 'main',
  components: {
    CustomInput, CustomDropdown,
  },
  middleware: 'auth',
  data() {
    return {
      payAmount: '',
      receive: '',
      youReceive: '',
      coin: '',
      message: '',
      feeCoin: '',
    };
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
}
.convert-box {
  width: 100%;
  margin-left: 15px;
  margin-right: 15px;
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
  @include btn;
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
  .row {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-left: -15px;
    margin-right: -15px;
  }
  & .title {
    line-height: 1.25;
    font-weight: 500;
    margin-bottom: 10px;
  }
}
.message-box {
  width: 100%;
  margin-left: 15px;
  margin-right: 15px;
}
</style>

<style lang="scss">
.convert-mini-btn {
  height: 56px;
  min-width: 56px;
  color: rgba(255, 255, 255, .3);
  margin-left: 20px;
}
.convert-input {
  & .input {
    background: #373747 !important;
  }
}
</style>
