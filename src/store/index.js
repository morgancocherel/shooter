import Vue from 'vue'
import Vuex from 'vuex'
import mpdV1 from './modules/mpd-v1'
import mpdV2 from './modules/mpd-v2'
import MainForm from './modules/main-form'
import Console from './modules/console'
import HeaderTop from './modules/header-top'
import CompteClientMPDV2 from './modules/mpd-v2/compte-client'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    mpdV1,
    mpdV2,
    MainForm,
    Console,
    HeaderTop,
    CompteClientMPDV2
  }
})
