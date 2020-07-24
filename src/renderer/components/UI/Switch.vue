<template>
  <div>
    <label
      class="switch"
      :class="{'style-round': styling === 'round', 'checked': value}"
    >
      <slot>
        <input
          :value="value"
          type="checkbox"
          @input="$emit('input', $event.target.checked)"
        >
      </slot>
      <span class="slider" />
    </label>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    styling: {
      type: String,
      default: 'default',
    },
  },
};
</script>
<style lang="scss" scoped>
  .switch {
    position: relative;
    display: flex;
    width: 64px;
    height: 32px;
    border-radius: 6px;
    background: rgba($grey, 0.14);

    &.style-round {
      border-radius: 36.5px;

      width: 52px;

      .slider:before {
        border-radius: 50%;
        background: white;
        width: 28px;
        height: 28px;
        bottom: 2px;
        left: 2px;
        border: 0.5px solid rgba(0, 0, 0, 0.04);
        box-shadow: 0px 3px 1px rgba(0, 0, 0, 0.1), 0px 1px 1px rgba(0, 0, 0, 0.16), 0px 3px 8px rgba(0, 0, 0, 0.15);
      }

      &.checked {
        background: $soft-blue;

        .slider:before {
          -webkit-transform: translateX(20px);
          -ms-transform: translateX(20px);
          transform: translateX(20px);
        }
      }
    }
  }

  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    -webkit-transition: .4s;
    transition: .4s;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 32px;
    width: 32px;
    left: 0;
    bottom: 0;
    border-radius: 6px;
    background: rgba($grey, 0.3);
    -webkit-transition: .4s;
    transition: .4s;
  }

  input:checked + .slider:before {
    background: #fff;
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(32px);
    -ms-transform: translateX(32px);
    transform: translateX(32px);
  }

</style>
