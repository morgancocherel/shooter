// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import VeeValidate from 'vee-validate'
import Notification from 'vue-notification'
import './plugins/jquery'
import './plugins/semantic-ui'
import './plugins/customScrollBarPlugin'
import TreeView from 'vue-json-tree-view'

Vue.config.productionTip = false

Vue.use(TreeView)
Vue.use(VeeValidate)
Vue.use(Notification)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router,
  store,
  VeeValidate,
  Notification
})
