export default {
  data() {
    return {
      defaults: {
        network: '',
        mode: 'confirm',
        title: '',
        text: '',
        callback: null,
        hash: '',
        locales: {
          ok: 'Ok',
          cancel: 'Cancel',
          confirm: 'Confirm',
          txHash: 'Transaction hash: ',
        },
      },
      msg: null,
      isClose: false,
    };
  },
  computed: {

  },
  methods: {
    getTxLink(hash, network) {
      if (!hash) {
        throw new Error('invalid hash');
      }
      if (network !== 'mainnet') {
        return `http://${network}.explorer.decimalchain.com/transactions/${hash}`;
      }

      return `http://explorer.decimalchain.com/transactions/${hash}`;
    },
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
