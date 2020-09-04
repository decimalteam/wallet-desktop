<template>
  <div
    v-if="value"
    class="details-item"
  >
    <div class="heading">
      {{ heading }}
    </div>
    <div class="value">
      <slot :name="itemKey">
        {{ value }}
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VerticalTableRow',
  /* eslint-disable */
  props: ['itemKey', 'heading', 'value'],
  data() {
    return {
      itemValue: this.value,
    };
  },
};
</script>

<style lang="scss" scoped>
tr {
  font-family: $roboto;
  height: 40px;
  text-align: left;
  vertical-align: middle;
  display: table-row;
  * {
    box-sizing: border-box;
  }
   @media (max-width: 900px) {
      max-width: 90vw;
    }
}
th {
   @include detail-prop-label;
  width: 190px;
  padding: 0;
  margin: 0;
  vertical-align: middle;
  display: table-cell;
  @media (max-width: 900px) {
    display: block;
    width: unset;
    border-spacing: 5px;
  }
}
  td {
    @include detail-prop-value;
    display: table-cell;
    word-break: break-word;
    vertical-align: middle;
    @media (max-width: 900px) {
      display: block;
      max-width: 70vw;
    }
  }
</style>
