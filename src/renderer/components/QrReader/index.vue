<template>
  <div
    v-if="isOpen"
    id="qr-modal"
  >
    <div
      class="qr-reader-wrap"
      @click.self="close('')"
    >
      <div
        v-if="isOpen"
        class="qr-reader"
      >
        <qrcode-stream @decode="close" />
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      callback: null,
      isOpen: false,
    };
  },
  methods: {
    close(text) {
      if (this.callback) {
        this.callback(text);
        this.callback = null;
        this.isOpen = false;
      }
    },
    read() {
      return new Promise((resolve) => {
        if (!this.$el) {
          this.$mount('#qr-modal');
        }
        this.isOpen = true;

        this.callback = resolve;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.qr-reader {
  &-wrap {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;

    background: rgba(0, 0, 0, .5);
  }

  width: 400px;
  height: 400px;

  @media (max-width: 425px) {
    width: 280px;
    height: 280px;
  }
}
</style>
