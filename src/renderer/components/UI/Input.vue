<template>
  <div>
    <div
      class="input__label"
      :class="{'hidden-label' : !label}"
    >
      {{ label || 'label' }}
    </div>
    <div
      class="input"
      :class="{'input--error': error, 'input--focused': focused, 'input--disabled': disabled}"
      @click="setFocus"
    >
      <div
        v-if="icon"
        class="input__icon"
      >
        <img
          src="~assets/imgs/icons/search.svg"
          alt="icon"
          width="21"
          height="21"
        >
      </div>
      <slot name="input">
        <input
          v-if="type === 'number' && !focused && value"
          class="number-formatted"
          disabled
          :value="numberFormatted"
        >
        <input
          v-else
          :id="id"
          :type="type === 'password' ? 'password' : 'text'"
          :value="value"
          :placeholder="placeholder"
          :disabled="disabled"
          :readonly="readonly"
          autocomplete="off"
          :maxlength="maxlength"
          @focus="setFocus"
          @blur="removeFocus"
          @input="$emit('input', $event.target.value)"
          @keydown.enter="enter"
          @keypress="format"
        >
      </slot>
      <div class="input__left">
        <slot
          name="left"
        />
      </div>
    </div>
    <div>
      <slot name="tip">
        <div
          v-if="tip"
          class="input__tip"
          v-html="tip"
        />
      </slot>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    icon: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
    numberType: {
      type: String,
      default: 'decimal',
    },
    value: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: 'Field',
    },
    id: {
      type: String,
      default: 'none',
    },
    error: {
      type: Boolean,
      default: false,
    },
    symbol: {
      type: String,
      default: '',
    },
    max: {
      type: Number,
      default: 0,
    },
    min: {
      type: Number,
      default: 0,
    },
    maxlength: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    tip: {
      type: String,
      default: '',
    },
    withoutLabel: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      focused: false,
    };
  },
  computed: {
    numberFormatted() {
      if (!this.value) return '';

      let number = this.value;
      number = this.formatAmount(number);
      if (this.symbol) number += ` ${this.symbol}`;
      return number;
    },
  },
  watch: {
    disabled() {
      if (this.disabled) {
        this.$emit('input', '');
      }
    },
  },
  mounted() {
    if (this.$el.children[1] && this.$el.children[1].children[0]) {
      this.$el.children[1].children[0].addEventListener('click', (e) => { e.stopPropagation(); });
    }
  },
  methods: {
    setFocus(e) {
      if (this.disabled) {
        e.preventDefault();
      } else {
        this.focused = true;

        setTimeout(() => {
          document.getElementById(this.id).focus();
        }, 50);
      }
    },
    removeFocus() {
      this.focused = false;

      if (this.value && this.type === 'number' && !this.readonly) {
        try {
          let number = this.DecimalNumber(this.value);

          if (this.min && number.lessThan(this.min)) number = this.DecimalNumber(this.min);
          if (this.max && number.greaterThan(this.max)) number = this.DecimalNumber(this.max);
          number = number.toFixed();
          this.$emit('input', number);
        } catch (e) {
          this.$emit('input', '');
        }
      }
      this.$emit('blur');
    },
    enter() {
      this.$emit('enter');
    },

    format($event) {
      if (this.type === 'number') {
        const keyCode = $event.keyCode ? $event.keyCode : $event.which;
        if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
          $event.preventDefault();
        }
      } else if (this.type === 'only-latin') {
        const letter = /[a-zA-Z]/;
        const num = /[0-9]/;
        const val = String.fromCharCode($event.which);
        const isLetter = letter.test(val);
        const isNum = num.test(val);

        if ((isNum && !this.value) || (!isLetter && !isNum)) $event.preventDefault();
      }
    },

    getNumberPrecision(x) {
      return ((x.toString().includes('.')) ? (x.toString().split('.').pop().length) : (0));
    },
  },
};
</script>
<style lang="scss" scoped>
.search .input {
  background-color: #383848;
  border-radius: 12px;
}
.darken {
  & .input {
    background: #292938;
  }
}
  .input {
    position: relative;
    display: flex;
    align-items: center;
    height: 56px;
    transition: .35s;
    background: #383848;
    border-radius: 10px;
    border: 1px solid transparent;
    width: 100%;

    &--disabled {
      border: 1px solid transparent !important;
      pointer-events: none;
      opacity: .7;
    }

    &--error {
      border-color: $red !important;
    }
    &:hover, &--focused {
      border-color: $soft-blue;
    }
    &__left {
      height: 100%;
      position: absolute;
      right: -1px;
      top: -1px;
    }
    &__icon {
      position: absolute;
      left: 16px;
      opacity: .3;
      + input {
        padding-left: 54px !important;
      }
    }
    &__label {
      @include input-label;
      &.hidden-label {
        display: none;
      }
    }
    &__tip {
      @include input-subtext;

      &--error {
        color: $red;
      }
      &--hide {
        visibility: hidden;
      }
    }

    input, .number-formatted {
      position: relative;
      color: #FFF;
      background: transparent;
      width: 100%;
      padding: 0 20px;
      border: none;
      transition: .35s;
      font-size: 16px;
      height: 100%;

      &:focus {
        outline: none;
      }
      &::placeholder {
        font-size: 16px;
        color: rgba(255, 255, 255, .7);
        opacity: 0.5;
        font-family: $montserrat;
      }
    }

    &__btn {
      @include btn;
      @include btn_blue;
      width: 56px;
      height: 56px;
      border-radius: 10px;
      background: $soft-blue;
      border: 2px solid $soft-blue;

      img {
        width: 22px;
      }
    }

    &__btn_b {
      height: 100%;
      padding: 0 20px 0 0;
      white-space: nowrap;
      color: $soft-blue;
      font-weight: 500;
      @include btn;
    }
    &__btn_b-grey {
      color: $grey;
    }
  }
</style>
