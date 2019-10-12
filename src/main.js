// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';

import './assets/font/font.css';

import echarts from 'echarts';

import '../src/utils/tools';

Vue.prototype.$echarts = echarts;

import axios from '../node_modules/axios';

Vue.config.productionTip = false;

Vue.prototype.$axios = axios;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  axios,
  components: { App },
  template: '<App/>'
});
if (module.hot) {
  module.hot.accept();
}
