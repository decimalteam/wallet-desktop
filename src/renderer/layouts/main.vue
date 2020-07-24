<template>
  <div class="container">
    <div class="burger">
      <button
        class="burger-btn"
        @click="menuOpen = !menuOpen"
      >
        <img
          src="~assets/imgs/icons/burger.svg"
          alt="burger-icon"
          widht="23"
          height="20"
        >
      </button>
      <h2 class="ml-20">
        Title
      </h2>
    </div>
    <div
      class="menu-box"
      :class="{ open: menuOpen }"
    >
      <div class="header">
        <img
          src="~/assets/imgs/square-logo.svg"
          alt="logo"
          width="33"
          height="33"
        >
        <div class="title">
          {{ $t('menu.decimal') }}
        </div>
      </div>
      <button
        class="icon-btn logout"
        @click="logout()"
      >
        <img
          width="22"
          height="22"
          src="~assets/imgs/icons/logout.svg"
          alt="back"
        >
      </button>
      <div class="navigation">
        <nuxt-link
          class="item-box"
          active-class="active"
          to="/wallet"
        >
          <div class="icon-box">
            <img
              class="icon"
              width="22"
              src="~assets/imgs/icons/wallet-icon.svg"
              alt="wallet-icon"
            >
          </div>
          <div class="link-name">
            {{ $t('menu.wallet') }}
          </div>
          <div class="arrow-box">
            <img
              class="arrow"
              width="5"
              src="~assets/imgs/icons/arrow-right.svg"
              alt="arrow-right"
            >
          </div>
        </nuxt-link>
        <nuxt-link
          class="item-box"
          active-class="active"
          to="/my-coins"
        >
          <div class="icon-box">
            <img
              class="icon"
              width="20"
              src="~assets/imgs/icons/my-coins-icon.svg"
              alt="my-coins-icon"
            >
          </div>
          <div class="link-name">
            {{ $t('menu.my-coins') }}
          </div>
          <div class="arrow-box">
            <img
              class="arrow"
              width="5"
              src="~assets/imgs/icons/arrow-right.svg"
              alt="arrow-right"
            >
          </div>
        </nuxt-link>
        <nuxt-link
          class="item-box"
          active-class="active"
          to="/convert"
        >
          <div class="icon-box">
            <img
              class="icon"
              width="19"
              src="~assets/imgs/icons/convert-icon.svg"
              alt="convert-icon"
            >
          </div>
          <div class="link-name">
            {{ $t('menu.convert') }}
          </div>
          <div class="arrow-box">
            <img
              class="arrow"
              width="5"
              src="~assets/imgs/icons/arrow-right.svg"
              alt="arrow-right"
            >
          </div>
        </nuxt-link>
      </div>
      <div class="services-box">
        <div class="title">
          {{ $t('menu.services') }}
        </div>
        <a
          target="_blank"
          href="https://explorer.decimalchain.com/"
          class="item-box"
        >
          <div class="link-name">
            {{ $t('menu.explorer') }}
          </div>
          <div class="arrow-box">
            <img
              class="arrow"
              width="5"
              src="~assets/imgs/icons/arrow-right.svg"
              alt="arrow-right"
            >
          </div>
        </a>
        <a
          target="_blank"
          href="https://testnet.console.decimalchain.com/"
          class="item-box"
        >
          <div class="link-name">
            {{ $t('menu.console') }}
          </div>
          <div class="arrow-box">
            <img
              class="arrow"
              width="5"
              src="~assets/imgs/icons/arrow-right.svg"
              alt="arrow-right"
            >
          </div>
        </a>
        <a
          target="_blank"
          href="https://status.decimalchain.com/"
          class="item-box"
        >
          <div class="link-name">
            {{ $t('menu.status') }}
          </div>
          <div class="arrow-box">
            <img
              class="arrow"
              width="5"
              src="~assets/imgs/icons/arrow-right.svg"
              alt="arrow-right"
            >
          </div>
        </a>
        <a
          target="_blank"
          href="/"
          class="item-box"
        >
          <div class="link-name">
            {{ $t('menu.wallet') }}
          </div>
          <div class="arrow-box">
            <img
              class="arrow"
              width="5"
              src="~assets/imgs/icons/arrow-right.svg"
              alt="arrow-right"
            >
          </div>
        </a>
        <a
          target="_blank"
          href="https://calculator.decimalchain.com/"
          class="item-box"
        >
          <div class="link-name">
            {{ $t('menu.calculator') }}
          </div>
          <div class="arrow-box">
            <img
              class="arrow"
              width="5"
              src="~assets/imgs/icons/arrow-right.svg"
              alt="arrow-right"
            >
          </div>
        </a>
        <a
          target="_blank"
          href="https://help.decimalchain.com/"
          class="item-box"
        >
          <div class="link-name">
            {{ $t('menu.help') }}
          </div>
          <div class="arrow-box">
            <img
              class="arrow"
              width="5"
              src="~assets/imgs/icons/arrow-right.svg"
              alt="arrow-right"
            >
          </div>
        </a>
      </div>
      <div class="change-lang-box">
        <div
          class="item"
          :class="{ active: lang === 'En' }"
          @click="changeLang('En')"
        >
          En
        </div>
        <div
          class="item"
          :class="{ active: lang === 'Ru' }"
          @click="changeLang('Ru')"
        >
          Ru
        </div>
      </div>
    </div>
    <div class="container__main">
      <nuxt />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuOpen: false,
    };
  },
  computed: {
    lang: {
      get() {
        return this.$i18n.locale === 'ru' ? 'Ru' : 'En';
      },
      set(lang) {
        const setLang = lang.toLowerCase();
        this.$i18n.locale = setLang;
        this.$i18n.setLocaleCookie(setLang);
      },
    },
  },
  methods: {
    changeLang(lang) {
      this.lang = lang;
    },
    logout() {
      // const isConfirm = await this.$confirm.open({
      //   mode: 'confirm',
      //   title: this.$t('notify.confirm-logout-title'),
      //   text: this.$t('notify.confirm-logout-text'),
      // });

      // if (!isConfirm) return;

      this.$store.commit('wallet/logout');
      localStorage.removeItem('wallet');
      this.$router.push('/');
    },
  },
};
</script>

<style lang="scss" scoped>
.logout {
  margin-left: 40px;
  width: 35px;
  min-width: 35px;
  height: 35px;
  min-height: 35px;
}
.burger {
  position: fixed;
  width: 100vw;
  background-color: $light-black;
  z-index: 100;
  display: flex;
  align-items: center;
  top: 0;
  left: 0;
  padding: 15px;
  @media (min-width: 1365px) {
    display: none;
  }
}
.menu-box {
  @media (max-width: 1365px) {
    transition: width .35s, min-width .35s;
    width: 0;
    min-width: 0;
    z-index: 90;
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    &.open {
      min-width: 275px;
      width: 275px;
    }
    & .header {
      display: none;
    }
    & .logout {
      margin-top: 92px !important;
    }
  }
  overflow-x: hidden;
  white-space: nowrap;
  background-color: #2A2A38;
  min-width: 275px;
  width: 275px;
  min-height: 100vh;
  overflow-y: auto;
  @include scrollbar;
  display: flex;
  flex-direction: column;
  & .header {
    padding: 40px 40px 20px;
    & .title {
      margin-top: 20px;
      font-size: 30px;
      line-height: 1;
      font-weight: bold;
    }
  }
  & .navigation {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    & .item-box {
      padding: 10px 30px;
      display: flex;
      align-items: center;
      transition: opacity .35s;
      opacity: .4;
      &:hover {
        opacity: 1;
      }
      &.active {
        opacity: 1;
      }
      & .icon-box {
        width: 37px;
        height: 37px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      & .arrow-box {
        width: 25px;
        height: 25px;
        margin-left: auto;
        @extend .icon-box;
      }
      & .link-name {
        font-size: 18px;
        line-height: 1;
        font-weight: 500;
        margin-left: 20px;
      }
    }
  }
  .services-box {
    display: flex;
    flex-direction: column;
    & .title {
      padding: 20px 30px;
      opacity: .2;
      font-size: 14px;
      line-height: 1;
      font-weight: 500;
    }
    & .item-box {
      display: flex;
      align-items: center;
      padding: 15px 30px;
      opacity: .7;
      transition: opacity .35s; // нет в дизайне
      &:hover {
        opacity: 1; // нет в дизайне
      }
      & .link-name {
        font-weight: 500;
        line-height: 1;
      }
      & .arrow-box {
        width: 25px;
        height: 25px;
        margin-left: auto;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
  .change-lang-box {
    border-top: 1px solid #404053;
    margin-top: auto;
    padding: 30px;
    display: flex;
    & .item {
      line-height: 1;
      font-weight: 500;
      padding: 10px 5px;
      margin-right: 10px;
      cursor: pointer;
      opacity: .4;
      border-bottom: 1px solid transparent;
      transition: opacity .35s, border-color .35s;
      &:hover {
        opacity: 1;
      }
      &.active {
        border-bottom-color: #fff;
        opacity: 1;
      }
    }
  }
}
</style>
