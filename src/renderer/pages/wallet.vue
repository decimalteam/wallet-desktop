<template>
  <div class="content">
    <h2 class="title mb-40">
      {{ $t('wallet.title') }}
    </h2>
    <div class="info-wrap mb-35">
      <div class="col">
        <div class="balance-box info-box">
          <div class="title">
            {{ $t('wallet.balance') }}
          </div>
          <div class="count">
            12.2345<span class="currency">del</span>
          </div>
          <div class="cost">
            $ 32 234
          </div>
        </div>
      </div>
      <div class="col">
        <div class="wallet-box info-box">
          <div class="title">
            {{ $t('wallet.wallet') }}
          </div>
          <div class="key">
            Mxe579989b3de8706e3a2280f5fa59ae9cdbe81bde
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
    <h2 class="mb-15">
      {{ $t('wallet.transaction') }}
    </h2>
    <table class="transaction-table">
      <thead>
        <tr>
          <th>{{ $t('wallet.last') }}</th>
          <th>{{ $t('wallet.block') }}</th>
          <th>{{ $t('wallet.time') }}</th>
          <th>{{ $t('wallet.sender') }}</th>
          <th>{{ $t('wallet.type') }}</th>
          <th>{{ $t('wallet.amount') }}</th>
          <th />
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>M23rwefu7...hw384f7b</td>
          <td class="small-text">
            123123123
          </td>
          <td class="small-text">
            02 June 2020 15:23:43
          </td>
          <td>Moie7s8...7cesb8e7</td>
          <td>Sell</td>
          <td>DEL 12.32</td>
          <td>
            <img
              src="~assets/imgs/icons/arrow-down.svg"
              alt="arrow-down"
              width="8"
              height="8"
            >
          </td>
        </tr>
        <tr>
          <td>M23rwefu7...hw384f7b</td>
          <td class="small-text">
            123123123
          </td>
          <td class="small-text">
            02 June 2020 15:23:43
          </td>
          <td>Moie7s8...7cesb8e7</td>
          <td>Sell</td>
          <td>DEL 12.32</td>
          <td>
            <img
              src="~assets/imgs/icons/arrow-down.svg"
              alt="arrow-down"
              width="8"
              height="8"
            >
          </td>
        </tr>
        <tr>
          <td>M23rwefu7...hw384f7b</td>
          <td class="small-text">
            123123123
          </td>
          <td class="small-text">
            02 June 2020 15:23:43
          </td>
          <td>Moie7s8...7cesb8e7</td>
          <td>Sell</td>
          <td>DEL 12.32</td>
          <td>
            <img
              src="~assets/imgs/icons/arrow-down.svg"
              alt="arrow-down"
              width="8"
              height="8"
            >
          </td>
        </tr>
        <tr>
          <td>M23rwefu7...hw384f7b</td>
          <td class="small-text">
            123123123
          </td>
          <td class="small-text">
            02 June 2020 15:23:43
          </td>
          <td>Moie7s8...7cesb8e7</td>
          <td>Sell</td>
          <td>DEL 12.32</td>
          <td>
            <img
              src="~assets/imgs/icons/arrow-down.svg"
              alt="arrow-down"
              width="8"
              height="8"
            >
          </td>
        </tr>
        <tr>
          <td>M23rwefu7...hw384f7b</td>
          <td class="small-text">
            123123123
          </td>
          <td class="small-text">
            02 June 2020 15:23:43
          </td>
          <td>Moie7s8...7cesb8e7</td>
          <td>Sell</td>
          <td>DEL 12.32</td>
          <td>
            <img
              src="~assets/imgs/icons/arrow-down.svg"
              alt="arrow-down"
              width="8"
              height="8"
            >
          </td>
        </tr>
        <tr>
          <td>M23rwefu7...hw384f7b</td>
          <td class="small-text">
            123123123
          </td>
          <td class="small-text">
            02 June 2020 15:23:43
          </td>
          <td>Moie7s8...7cesb8e7</td>
          <td>Sell</td>
          <td>DEL 12.32</td>
          <td>
            <img
              src="~assets/imgs/icons/arrow-down.svg"
              alt="arrow-down"
              width="8"
              height="8"
            >
          </td>
        </tr>
        <tr>
          <td>M23rwefu7...hw384f7b</td>
          <td class="small-text">
            123123123
          </td>
          <td class="small-text">
            02 June 2020 15:23:43
          </td>
          <td>Moie7s8...7cesb8e7</td>
          <td>Sell</td>
          <td>DEL 12.32</td>
          <td>
            <img
              src="~assets/imgs/icons/arrow-down.svg"
              alt="arrow-down"
              width="8"
              height="8"
            >
          </td>
        </tr>
        <tr>
          <td>M23rwefu7...hw384f7b</td>
          <td class="small-text">
            123123123
          </td>
          <td class="small-text">
            02 June 2020 15:23:43
          </td>
          <td>Moie7s8...7cesb8e7</td>
          <td>Sell</td>
          <td>DEL 12.32</td>
          <td>
            <img
              src="~assets/imgs/icons/arrow-down.svg"
              alt="arrow-down"
              width="8"
              height="8"
            >
          </td>
        </tr>
        <tr>
          <td>M23rwefu7...hw384f7b</td>
          <td class="small-text">
            123123123
          </td>
          <td class="small-text">
            02 June 2020 15:23:43
          </td>
          <td>Moie7s8...7cesb8e7</td>
          <td>Sell</td>
          <td>DEL 12.32</td>
          <td>
            <img
              src="~assets/imgs/icons/arrow-down.svg"
              alt="arrow-down"
              width="8"
              height="8"
            >
          </td>
        </tr>
        <tr>
          <td>M23rwefu7...hw384f7b</td>
          <td class="small-text">
            123123123
          </td>
          <td class="small-text">
            02 June 2020 15:23:43
          </td>
          <td>Moie7s8...7cesb8e7</td>
          <td>Sell</td>
          <td>DEL 12.32</td>
          <td>
            <img
              src="~assets/imgs/icons/arrow-down.svg"
              alt="arrow-down"
              width="8"
              height="8"
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  layout: 'main',
  middleware: 'auth',
  data() {
    return {
      copiedStatus: false,
    };
  },
  methods: {
    copyPhrase() {
      this.copiedStatus = true;
      setTimeout(() => {
        this.copiedStatus = false;
      }, 400);
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
