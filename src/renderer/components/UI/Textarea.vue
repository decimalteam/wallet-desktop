<template>
  <div class="textarea">
    <div
      class="textarea__label"
      :class="{'hidden-label' : !label}"
    >
      {{ label || 'label' }}
    </div>
    <textarea
      :id="id"
      :value="value"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      autocomplete="off"
      :rows="rows"
      :class="{'error': error}"
      @input="$emit('input', $event.target.value)"
      @keydown.enter="enter"
    />
  </div>
</template>
<script>
export default {
  props: {
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
      default: '',
    },
    id: {
      type: String,
      default: 'none',
    },
    error: {
      type: Boolean,
      default: false,
    },
    rows: {
      type: String,
      default: '4',
    },
    label: {
      type: String,
      default: '',
    },
  },

  methods: {
    enter() {
      this.$emit('enter');
    },
  },

};
</script>

<style lang="scss" scoped>
.textarea.darken textarea {
  background: #292938;
}
.textarea {
  textarea {
    width: 100%;
    resize: none;
    border: 1px solid transparent;
    padding: 20px;
    transition: .35s;
    background: rgba($gray, 0.08);
    border-radius: 10px;
    border: 1px solid transparent;
    color: white;

    font-size: 16px;
    line-height: 175.95%;
    letter-spacing: 0.01em;
    color: $gray;

    @media (max-width: 425px) {
      padding: 10px 20px;
    }

    &.error {
      border: 1px solid $red;
    }

    &:focus, &:hover {
      outline: none;
      border-color: $soft-blue;
    }
  }
  &__label {
    @include input-label;

    &.hidden-label {
      display: none;
    }
  }
}
</style>
