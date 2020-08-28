// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
/** 引入vant css */
import 'vant/lib/index.css'
Vue.config.productionTip = false
/* eslint-disable no-new */
/* 所有id为app的都会引入App.vue页面 */

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
