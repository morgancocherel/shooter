import Vue from 'vue'
import Vuex from 'vuex'
import Devis from './modules/devis/index'
import MainForm from './modules/main-form/index'
import Console from './modules/console/index'
import Commande from './modules/commande/index'
import Payment from './modules/paiement/index'
import Finalisation from './modules/finalisation/index'
import HeaderTop from './modules/header-top/index'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Devis,
    MainForm,
    Console,
    Commande,
    Payment,
    Finalisation,
    HeaderTop
  }
})
