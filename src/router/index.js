import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import mpdV1 from '@/components/mpd-v1/mpdV1'
import Devis from '@/components/mpd-v1/devis/DevisForm'
import TrajetsOffres from '@/components/mpd-v1/devis/TrajetOffre'
import Basket from '@/components/mpd-v1/commande/Basket'
import Paiement from '@/components/mpd-v1/paiement/Paiement'
import FinalTransaction from '@/components/mpd-v1/finalisation/FinalTransaction'
import FinalPayment from '@/components/mpd-v1/finalisation/FinalPayment'
import FinalCommande from '@/components/mpd-v1/finalisation/FinalCommande'
import mpdV2 from '@/components/mpd-v2/mpdV2'
import Proposition from '@/components/mpd-v2/proposition/Proposition'
import Catalogue from '@/components/mpd-v2/proposition/Catalogue'
import CompteClient from '@/components/mpd-v2/compte-client/CompteClient'
import PropositionSelected from '@/components/mpd-v2/proposition/PropositionSelected'
import Commande from '@/components/mpd-v2/commande/Commande'
import FinalCommandeMPDV2 from '@/components/mpd-v2/commande/FinalCommande'
import PaiementMPDV2 from '@/components/mpd-v2/paiement/Paiement'

/*eslint-disable */
import '../plugins/jquery'
import '../plugins/semantic-ui'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/mpdV1',
      name: 'mpdV1',
      component: mpdV1,
      children: [
        {
          path: 'devis/devisForm',
          name: 'Devis',
          component: Devis
        },
        {
          path: 'devis/trajetsOffres',
          name: 'TrajetsOffres',
          component: TrajetsOffres
        },
        {
          path: 'commande/basket',
          name: 'Basket',
          component: Basket
        },
        {
          path: 'paiement',
          name: 'Paiement',
          component: Paiement
        },
        {
          path: 'finalisation/finTransaction',
          name: 'FinalTransaction',
          component: FinalTransaction
        },
        {
          path: 'finalisation/finPaiement',
          name: 'FinalPayment',
          component: FinalPayment
        },
        {
          path: 'finalisation/finCommande',
          name: 'FinalCommande',
          component: FinalCommande
        }
      ]
    },
    {
      path: '/mpdV2',
      name: 'mpdV2',
      component: mpdV2,
      children: [
        {
          path: 'comptesclients',
          name: 'CompteClient',
          component: CompteClient
        },
        {
          path: 'catalogues',
          name: 'Catalogue',
          component: Catalogue
        },
        {
          path: 'propositions/catalogues',
          name: 'Proposition',
          component: Proposition
        },
        {
          path: 'proposition',
          name: 'PropositionSelected',
          component: PropositionSelected
        },
        {
          path: 'commandes',
          name: 'Commande',
          component: Commande
        },
        {
          path: 'commandes/finCommande',
          name: 'FinalCommandeMPDV2',
          component: FinalCommandeMPDV2
        },
        {
          path: 'paiement',
          name: 'PaiementMPDV2',
          component: PaiementMPDV2
        }
      ]
    },
  ]
})
