<template>
  <div class="container__auth">
    <div
      v-if="!newWalletPage"
      class="auth"
    >
      <img
        class="mb-30"
        width="74"
        height="74"
        src="~assets/imgs/square-logo.svg"
        alt="big-logo"
      >
      <div class="label mb-12">
        {{ $t('auth.welcome-to') }}
      </div>
      <h1 class="mb-60">
        {{ $t('auth.title') }}
      </h1>
      <button
        class="main-btn mb-30"
        @click="newWalletPage = true, createWallet()"
      >
        {{ $t('auth.generate') }}
      </button>
      <div class="separator mb-30">
        {{ $t('auth.or') }}
      </div>
      <CustomInput
        v-model.trim="seedPhrase"
        class="w-100 mb-30 darken"
        :placeholder="$t('auth.send-phrase')"
        :error="mnemonicError"
        without-label
        @blur="removeSpecSymbols"
      />
      <button
        class="main-btn"
        :class="{'main-btn__dis': !seedPhrase}"
        @click="activate()"
      >
        {{ $t('auth.activate') }}
      </button>
    </div>
    <div
      v-else
      class="auth"
    >
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
      <div class="save-note mb-50">
        {{ $t('auth.save-note') }}
      </div>
      <div class="px-20 w-100 mb-50">
        <div class="phrase-title mb-15">
          {{ $t('auth.you-phrase') }}
        </div>
        <div class="phrase mb-15">
          {{ generatedWallet.mnemonic }}
        </div>
        <button
          class="mini-btn"
          :class="{ active: copiedClass }"
          @click="copyPhrase"
        >
          <template v-if="copiedClass">
            {{ $t('auth.copied') }}
          </template>
          <template v-else>
            {{ $t('auth.copy') }}
          </template>
        </button>
      </div>
      <div class="switch-box ml-auto mb-30">
        <span class="switch__label">{{ $t('auth.save-confirm') }}</span>
        <CustomSwitch
          v-model="confirmSavedPhrase"
          styling="round"
        />
      </div>
      <button
        class="main-btn"
        :class="{ 'main-btn__dis': !confirmSavedPhrase }"
        @click="next()"
      >
        {{ $t('auth.next') }}
      </button>
    </div>
  </div>
</template>

<script>
import { Wallet } from 'decimal-js-sdk';
import CustomInput from '~/components/UI/Input';
import CustomSwitch from '~/components/UI/Switch';

export default {
  components: {
    CustomInput, CustomSwitch,
  },
  middleware: 'guest',
  data() {
    return {
      newWalletPage: false,
      copiedClass: false,
      confirmSavedPhrase: false,
      seedPhrase: '',
      generatedWallet: null,
      mnemonicError: false,
    };
  },
  watch: {
    seedPhrase() {
      this.mnemonicError = false;
    },
  },
  methods: {
    removeSpecSymbols() {
      if (this.seedPhrase.charCodeAt(0) === 0xFEFF) {
        this.seedPhrase = this.seedPhrase.substr(1);
      }

      this.seedPhrase = this.seedPhrase.replace(/[^a-zA-Z ]/g, '');
      this.seedPhrase = this.seedPhrase.replace(/\n/g, ' ');
      this.seedPhrase = this.seedPhrase.replace(/\s+/g, ' ').trim();
    },
    copyPhrase() {
      this.copyText(this.generatedWallet.mnemonic);
      this.copiedClass = true;
      setTimeout(() => {
        this.copiedClass = false;
      }, 1000);
    },
    activate() {
      if (this.seedPhrase) {
        this.signIn();
      }
    },
    next() {
      if (this.generatedWallet && this.confirmSavedPhrase) {
        this.signIn();
      }
    },
    signIn() {
      try {
        const wallet = this.generateWallet(this.seedPhrase);
        this.$store.commit('wallet/setWallet', wallet);
        this.$store.dispatch('wallet/GET_USER');

        localStorage.setItem('wallet', wallet.mnemonic);
        this.$router.push('/wallet');
      } catch (e) {
        this.mnemonicError = true;
      }
    },
    generateWallet(mnemonic) {
      this.mnemonicError = false;
      return new Wallet(mnemonic);
    },
    createWallet() {
      this.generatedWallet = this.generateWallet();
      this.seedPhrase = this.generatedWallet.mnemonic;
    },
    back() {
      this.newWalletPage = false;
      this.confirmSavedPhrase = false;
      this.seedPhrase = '';
      this.mnemonicError = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.auth {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 543px;
  padding: 65px 40px;
  @media (max-width: 575.9px) {
    padding: 90px 25px 40px;
  }
}
.label {
  font-size: 18px;
  line-height: 1;
}
h1 {
  font-size: 35px;
  line-height: 1;
  text-align: center;
}
.separator {
  font-size: 16px;
  line-height: 1;
  color: $text-dark;
}
.save-note {
  font-weight: 500;
  font-size: 25px;
  line-height: 35px;
}
.phrase-title {
  font-weight: 500;
  font-size: 25px;
  line-height: 35px;
  font-weight: 700;
}
.phrase {
  font-size: 18px;
  line-height: 31px;
  color: $text-dark;
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
</style>
