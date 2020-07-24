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
        v-model="seedPhrase"
        class="w-100 mb-30"
        :placeholder="$t('auth.send-phrase')"
        :error="mnemonicError"
        without-label
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
  layout: 'empty',
  components: {
    CustomInput, CustomSwitch,
  },
  middleware: 'guest',
  data() {
    return {
      newWalletPage: false, // флаг перключения на регистрацию/авторизацию
      copiedClass: false, // для 400мс active класса на кнопке копирования
      confirmSavedPhrase: false, // подтвердили, что скопировали фразу
      seedPhrase: '', // наша мнемоник фраза
      generatedWallet: null, // новый мнемоник
      mnemonicError: false, // статус ошибка мнемоника
    };
  },
  watch: {
    seedPhrase() {
      this.mnemonicError = false;
    },
  },
  methods: {
    copyPhrase() {
      const copyText = this.generatedWallet.mnemonic;
      const aux = document.createElement('input');
      aux.setAttribute('value', copyText);
      document.body.appendChild(aux);
      aux.select();
      document.execCommand('copy');
      document.body.removeChild(aux);
      this.copiedClass = true;
      setTimeout(() => {
        this.copiedClass = false;
      }, 400);
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
