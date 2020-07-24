/* eslint-disable no-param-reassign */
import Confirm from './index.vue';

Confirm.install = (Vue, options = {}) => {
  Vue.prototype.$confirm = new (Vue.extend(Confirm))({ propsData: options });
};

export default Confirm;
