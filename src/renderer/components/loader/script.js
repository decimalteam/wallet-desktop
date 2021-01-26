export default {
  data() {
    return {
      hidden: true,
    };
  },
  methods: {
    show() {
      this.hidden = false;
    },
    hide() {
      this.hidden = true;
    },
  },
};
