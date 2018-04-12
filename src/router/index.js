import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Proposal from '@/components/booking/Proposal'

/*eslint-disable */
import '../plugins/jquery'
import '../plugins/semantic-ui'

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/proposal',
      name: Proposal,
      component: Proposal
    }
  ]
})
