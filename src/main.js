// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
/** 引入vant css */
import 'vant/lib/index.css'
// 引入阿里巴巴 图标
import './assets/iconfont/iconfont.css'
import './assets/iconfont/iconfont.js'
Vue.config.productionTip = false
/* eslint-disable no-new */
/* 所有id为app的都会引入App.vue页面 */
// state 变量
// eslint-disable-next-line no-unused-vars
new Vue({
  el: '#app',
  router,
  // eslint-disable-next-line no-undef
  store,
  components: { App },
  template: '<App/>'
})
