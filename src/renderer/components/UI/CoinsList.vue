<template>
  <div class="vss-coins">
    <vue-simple-suggest
      ref="vss"
      v-click-outside="hide"
      class="suggest"
      :value="value"
      :list="getList"
      :debounce="200"
      :filter-by-query="false"
      :min-length="0"
      :nullable-select="true"
      mode="input"
      :display-attribute="'coin'"
      :value-attribute="'coin'"
      :destyled="true"
      :controls="{
        selectionUp: [38, 33],
        selectionDown: [40, 34],
        select: [13, 36],
        showList: [40],
        hideList: [27, 35]
      }"
      @input="$emit('input', $event)"
    >
      <CustomInput
        :id="id"
        ref="vssInput"
        :placeholder="placeholder"
        :value="value"
        :label="label"
        :error="error"
      />
    </vue-simple-suggest>
  </div>
</template>

<script>
import VueSimpleSuggest from 'vue-simple-suggest';
import ClickOutside from 'vue-click-outside';
import { mapGetters } from 'vuex';
import CustomInput from '~/components/UI/Input';
import 'vue-simple-suggest/dist/styles.css'; // Optional CSS

export default {
  directives: {
    ClickOutside,
  },
  components: {
    VueSimpleSuggest,
    CustomInput,
  },
  props: {
    id: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    error: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      chosen: '',
      currentCoins: [],
    };
  },
  computed: {
    ...mapGetters({
      sdk: 'decimal/getSDK',
    }),
  },
  watch: {
    currentCoins(newVal, oldVal) {
      if (!oldVal.length && newVal.length) {
        setTimeout(this.$refs.vss.showList, 200);
      }
    },
  },
  methods: {
    hide() {
      this.$refs.vss.hideList();
    },
    async getList(input) {
      const search = input || null;
      return new Promise((resolve, reject) => {
        try {
          this.sdk.getCoinsList(5, 0, search).then((coinsResp) => {
            const coins = [];
            if (coinsResp.coins) {
              coinsResp.coins.forEach((coin) => {
                if (coin.symbol === 'tdel') {
                  coins.push('tDEL');
                } else {
                  coins.push(coin.symbol.toUpperCase());
                }
              });
            }

            this.currentCoins = coins;
            resolve(coins);
          }).catch((err) => {
            reject(err);
          });
        } catch (err) {
          // reject(err);
        }
      });
    },
  },
};
</script>

<style lang="scss">

.vss-coins {
  &__label {
    @include input-label;
  }

  .vue-simple-suggest > ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .vue-simple-suggest.suggest {
    position: relative;
  }

  .vue-simple-suggest.suggest input {
    text-transform: uppercase;

    &::placeholder {
      text-transform: capitalize;
    }
  }

  .vue-simple-suggest.suggest, .vue-simple-suggest.suggest * {
    box-sizing: border-box;
  }

  .vue-simple-suggest.designed.focus .input-wrapper input {
    border: 1px solid #aaa;
  }

  .vue-simple-suggest.suggest .suggestions {
    position: absolute;
    left: 0;
    right: 0;
    border-radius: 10px;
    background: #262636;
    top: calc(100% + 7px);
    opacity: 1;
    z-index: 1000;
    color: rgba(249, 248, 251, 0.5);
  }

  .vue-simple-suggest.suggest .suggestions .suggest-item {
    cursor: pointer;
    user-select: none;
  }

  .vue-simple-suggest.suggest .suggestions .suggest-item,
  .vue-simple-suggest.suggest .suggestions .misc-item {
    padding: 18px 20px;
    padding-top: 0;

    transition: .25s;

    &:first-child {
      padding-top: 18px;
    }
  }

  .vue-simple-suggest.suggest .suggestions .suggest-item.hover {
    color: #fff;
  }

  .vue-simple-suggest.suggest .suggestions .suggest-item.selected {
    color: #fff;
  }
}
</style>
