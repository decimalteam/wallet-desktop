/* eslint-disable camelcase */
import DecimalJS from 'decimal.js-light';
import Vue from 'vue';
import {
  ValidationProvider,
  ValidationObserver,
  extend,
  setInteractionMode,
} from 'vee-validate';

import {
  required,
  length,
  min,
  max_value,
} from 'vee-validate/dist/rules';

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

setInteractionMode('eager');

extend('required', {
  ...required,
  message: 'This field is required',
});

extend('length', {
  ...length,
  message: 'Invalid field',
});

extend('max_value', {
  ...max_value,
});

extend('numeric', {
  validate: (value) => {
    let isValid = true;
    const number = parseFloat(value);
    isValid = !Number.isNaN(number);

    if (isValid && new DecimalJS(value).lt(0.000000000000000001)) {
      isValid = false;
    }

    return isValid;
  },
  message: 'Only number',
});

extend('address', {
  computesRequired: true,
  validate: (value) => value.slice(0, 2) === 'dx',
});

extend('validator', {
  computesRequired: true,
  validate: (value) => value.slice(0, 9) === 'dxvaloper',
});

extend('ticker', {
  computesRequired: true,
  validate: (value) => {
    const pattern = /[a-zA-Z]/;
    const isLetter = pattern.test(value.slice(0, 1));
    return isLetter;
  },
});
extend('url', {
  computesRequired: true,
  validate: (value) => {
    const pattern = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
    return pattern.test(value);
  },
});

extend('min', {
  ...min,
});

export default {
  address: {
    address: true,
    required: true,
    length: 41,
  },
  amount: {
    required: true,
    numeric: true,
  },
  validator: {
    required: true,
    validator: true,
    length: 48,
  },
  pubKey: {
    required: true,
    length: 44,
  },
  ticker: {
    required: true,
    ticker: true,
    min: 3,
  },
};
