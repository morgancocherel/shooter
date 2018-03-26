import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'

/*eslint-disable */
import '../plugins/jquery'
import '../plugins/semantic-ui'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    }
  ]
})
