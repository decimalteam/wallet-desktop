<template>
  <div
    :id="id"
    class="dd dd--3"
    :class="{ 'dd--3': mode === 3 }"
  >
    <div
      class="dd__label"
      :class="{'hidden-label' : !label}"
    >
      {{ label || 'label' }}
    </div>
    <div
      v-click-outside="hide"
      class="dd__btn"
      :class="{'dd__btn--disable': disabled}"
      @click="toggleDd"
    >
      <div
        v-if="mode === 1"
        class="dd__title dd__title--1"
      >
        {{ title }}
      </div>
      <div
        v-if="mode === 2"
        class="dd__title dd__title--2 text-mono"
      >
        {{ value }}
      </div>
      <div
        v-if="mode === 3"
        class="dd--3__box"
      >
        <img
          src="~assets/imgs/decimal-icon.svg"
          alt="icon"
          width="38"
          height="38"
          class="mr-20"
        >
        <div class="dd--3__text-dark mr-10">
          DEL
        </div>
        <div class="dd--3__coin-title mr-40">
          Decimal
        </div>
        <div class="dd--3__text-dark mr-10">
          Balance:
        </div>
        <div class="dd--3__balance">
          12.334
        </div>
      </div>
      <div
        class="dd__left"
      >
        <div
          v-if="mode === 1"
          class="dd__value text-mono"
        >
          {{ value }}
        </div>
        <div class="dd__img">
          <img
            src="~assets/imgs/icons/arrow_bottom.svg"
            alt="arrow"
          >
        </div>
      </div>

      <div
        v-if="mode === 1 || mode === 3"
        class="dd__options"
        :class="{'dd__options_show': show }"
      >
        <vue-scroll
          :class="{'dd-scroll': options.length > 4}"
          :ops="scrollOptions"
        >
          <div
            v-for="(item, i) in options"
            :key="`dd__option__${item.coin}`"
            class="dd__option text-mono"
            :class="{'dd__option--first': i === 0}"
            @click="setValue(item.coin)"
          >
            <div class="dd__option__left">
              {{ item.coin }}
            </div>
            <div class="dd__option__right">
              {{ item.balance | formatAmount }}
            </div>
          </div>
        </vue-scroll>
      </div>

      <div
        v-if="mode === 2"
        class="dd__options"
        :class="{'dd__options_show': show }"
      >
        <vue-scroll
          :class="{'dd-scroll': options.length > 4}"
          :ops="scrollOptions"
        >
          <div
            v-for="(item, i) in options"
            :key="`dd__option__${item}`"
            class="dd__option text-mono"
            :class="{'dd__option--first': i === 0}"
            @click="setValue(item)"
          >
            <div class="dd__option__left">
              {{ item }}
            </div>
          </div>
        </vue-scroll>
      </div>
    </div>
  </div>
</template>
<script>
import ClickOutside from 'vue-click-outside';

export default {
  directives: {
    ClickOutside,
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
    title: {
      type: String,
      default: '',
    },
    options: {
      type: Array,
      default: null,
    },
    mode: {
      type: Number,
      default: 1,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: '',
    },
  },
  data: () => ({
    show: false,
    loaded: false,

    scrollOptions: {
      vuescroll: {
        zooming: false,

      },
      scrollPanel: {
        scrollingX: false,
      },
      rail: {
        keepShow: true,
      },
      bar: {
        background: '#7B98F9',
        keepShow: true,
      },
    },
  }),
  watch: {
    options() {
      if (!this.loaded) {
        this.init();
      }

      if (this.mode === 1 && this.loaded) {
        if (!this.options.length) {
          this.$emit('input', '');
          return;
        }

        const hasCoin = !!this.options.find((item) => item.coin === this.value);
        if (!hasCoin) {
          this.$emit('input', this.options[0].coin);
        }
      }
    },
  },
  mounted() {
    this.init();
    this.popupItem = this.$el;
    window.onload = () => {
      document.body.addEventListener('click', (e) => this.closeOnDocClick(e));
    };
  },
  methods: {
    init() {
      if (this.options.length) {
        if (this.mode === 1) { this.$emit('input', this.options[0].coin); }
        if (this.mode === 2) { this.$emit('input', this.options[0]); }
        this.loaded = true;
      }
    },
    closeOnDocClick(e) {
      if (e.target.closest('.dd__btn') === null) {
        this.show = false;
      }
    },
    setValue(value) {
      this.$emit('input', value);
    },
    toggleDd(e) {
      if (this.disabled) return;
      e.preventDefault();
      this.show = !this.show;
    },
    hide() {
      this.show = false;
    },
  },
};
</script>
<style lang="scss" scoped>
  .dd {
    position: relative;
    color: rgba($grey, .5);

    &__label {
      @include input-label;

      &.hidden-label {
        visibility: hidden;
        display: none;
      }
    }

    &__title {
      font-size: 14px;
      // white-space: nowrap;
      &--2 {
        color: white;
        max-width: calc(100% - 30px);
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    &__btn {
      cursor: pointer;
      padding: 0 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-radius: 10px;
      background: rgba($grey, .08);
      width: 100%;
      height: 56px;
      border: 1px solid transparent;
      transition: .35s;
      position: relative;

      &--disable {
        cursor: default;
        opacity: .7;
        border: 1px solid transparent !important;
      }

      &:hover {
        border-color: $soft-blue;
      }
    }

    &__left {
      display: flex;
      align-items: center;
      padding-left: 7px;
    }

    &__img {
      margin: 0 0 0 12px;
    }

    &__options {
      position: absolute;
      z-index: 400;
      border-radius: 10px;
      width: 100%;
      background: #262636;;
      top: calc(100% + 10px);
      left: 0;
      display: none;
      &_show {
        display: block;
      }
    }

    &__option {
      padding: 18px 20px;
      padding-top: 0;
      transition: .25s;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      max-width: 100%;

      &--first {
        padding-top: 18px;
      }

      &:hover {
        color: #FFFFFF;
      }

      &__left {
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    .dd-scroll {
      height: 200px !important;
    }
  }
  .dd--3 {
    font-size: 16px;
    & .dd__btn {
      height: 84px;
      background: #373747;
      border-radius: 12px;
    }
    & .dd__img {
      opacity: .4;
    }
    &__box {
      color: #fff;
      display: flex;
      align-items: center;
    }
    &__text-dark {
      opacity: .3;
      line-height: 1;
    }
    &__coin-title {
      font-weight: 500;
      line-height: 1.25;
    }
    &__balance {
      font-weight: bold;
      line-height: 1.25;
    }
  }
</style>
