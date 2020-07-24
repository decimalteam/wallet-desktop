/* eslint-disable no-param-reassign */
import QrReader from './index.vue';

QrReader.install = (Vue, options = {}) => {
  Vue.prototype.$qr = new (Vue.extend(QrReader))({ propsData: options });
};

export default QrReader;
