import { BPagination } from 'bootstrap-vue';

export default {
  props: ['value', 'total-rows', 'per-page', 'aria-controls'],
  components: {
    BPagination,
  },
  computed: {
    currentPage: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      },
    },
  },
};
