<template>
  <section class="flex">
    <div class="content">
      <h2 class="title mb-40">
        DEL coin
      </h2>
      <div class="info-box mb-40">
        <div class="title">
          Balance
        </div>
        <img
          width="36"
          height="36"
          src="~assets/imgs/decimal-icon.svg"
          alt="decimal-icon"
          class="coin-icon"
        >
        <div class="count">
          12.2345
          <div class="currency">
            DEL
          </div>
        </div>
        <div class="cost">
          $ 32 234
        </div>
      </div>
      <h2 class="mb-23">
        History
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
    <!-- <button
      class="burger-btn"
      @click="rightMenu = !rightMenu"
    >
      <img
        src="~assets/imgs/icons/burger.svg"
        alt="burger-icon"
        widht="23"
        height="20"
      >
    </button> -->
    <div
      class="right-menu"
      :class="{ open: rightMenu }"
    >
      <div class="top-wrap">
        <h2 class="mb-40">
          My coins
        </h2>
        <CustomInput
          v-model="search"
          class="w-100 search"
          :placeholder="$t('my-coins.search')"
          without-label
        />
      </div>
      <div class="bottom-wrap">
        <div class="item-box active">
          <img
            class="mr-15"
            width="36"
            height="36"
            src="~assets/imgs/decimal-icon.svg"
            alt="decimal-icon"
          >
          <div class="link-name">
            DEL
          </div>
          <div class="balance">
            12.123123
          </div>
        </div>
        <div class="item-box">
          <img
            class="mr-15"
            width="36"
            height="36"
            src="~assets/imgs/decimal-icon.svg"
            alt="decimal-icon"
          >
          <div class="link-name">
            FRT
          </div>
          <div class="balance">
            12.123123
          </div>
        </div>
        <div class="item-box">
          <img
            class="mr-15"
            width="36"
            height="36"
            src="~assets/imgs/decimal-icon.svg"
            alt="decimal-icon"
          >
          <div class="link-name">
            TrueZone
          </div>
          <div class="balance">
            12.123123
          </div>
        </div>
        <div class="item-box">
          <img
            class="mr-15"
            width="36"
            height="36"
            src="~assets/imgs/decimal-icon.svg"
            alt="decimal-icon"
          >
          <div class="link-name">
            Name coin
          </div>
          <div class="balance">
            12.123123
          </div>
        </div>
        <div class="item-box">
          <img
            class="mr-15"
            width="36"
            height="36"
            src="~assets/imgs/decimal-icon.svg"
            alt="decimal-icon"
          >
          <div class="link-name">
            Some coin
          </div>
          <div class="balance">
            12.123123
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import CustomInput from '~/components/UI/Input';

export default {
  layout: 'main',
  components: {
    CustomInput,
  },
  middleware: 'auth',
  data() {
    return {
      search: '',
      rightMenu: false,
    };
  },
};
</script>

<style lang="scss" scoped>
.flex {
  display: flex;
  width: 100%;
}
.flex-between {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}
// .burger-btn {
//   position: absolute;
//   top: 15px;
//   right: 15px;
// }
.right-menu {
  @media (max-width: 1365px) {
    margin-top: -72px;
    padding-top: 72px;
    // transition: width .35s, min-width .35s;
    // width: 0;
    // min-width: 0;
    // z-index: 110;
    // position: fixed;
    // top: 0;
    // right: 0;
    // height: 100%;
    // white-space: nowrap;
    // overflow-y: auto;
    // @include scrollbar;
    // &.open {
    //   width: 460px;
    //   min-width: 460px;
    // }
  }
  width: 460px;
  min-width: 460px;
  min-height: 100vh;
  background-color: #2A2A38;
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
    &.active {
      background-color: #1B1B28;
      border-left-color: $soft-blue;
    }
    cursor: pointer;
    border-left: 4px solid transparent;
    padding: 22px 40px;
    display: flex;
    align-items: center;
    & .link-name {
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
