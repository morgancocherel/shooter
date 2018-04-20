import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Commande from '@/components/commande/Commande'
import Basket from '@/components/commande/Basket'
import Payment from '@/components/paiement/Payment'
import FinalOperation from '@/components/finalisation/FinalOperation'
import FinalCommande from '@/components/finalisation/FinalCommande'
import FinalTransaction from '@/components/finalisation/FinalTransaction'

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
      path: '/trajetsOffres',
      name: 'Commande',
      component: Commande
    },
    {
      path: '/commandes/current/voyages',
      name: 'Basket',
      component: Basket
    },
    {
      path: '/commandes',
      name: 'Payment',
      component: Payment
    },
    {
      path: '/soap/finTransaction',
      name: 'FinalOperation',
      component: FinalOperation
    },
    {
      path: '/commandes/paiements',
      name: 'FinalCommande',
      component: FinalCommande
    },
    {
      path: '/commandes/paiements/transaction',
      name: 'FinalTransaction',
      component: FinalTransaction
    }
  ]
})
