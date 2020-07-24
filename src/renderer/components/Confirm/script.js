export default {
  data() {
    return {
      defaults: {
        mode: 'confirm',
        title: '',
        text: '',
        callback: null,
        hash: '',
      },
      msg: null,
      isClose: false,
    };
  },
  computed: {

  },
  created() {
    // console.log(this.i18n);
  },
  methods: {
    close(val) {
      if (this.msg.callback) {
        this.msg.callback(val);
      }

      this.msg = null;
    },
    open(option) {
      return new Promise((resolve) => {
        if (!this.$parent) {
          if (!this.$el) {
            this.$mount('#confirm-modal');
          }
        }
        this.msg = { ...this.defaults, ...option, callback: resolve };
      });
    },
  },
};
