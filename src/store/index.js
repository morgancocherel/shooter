import Vue from 'vue'
import Vuex from 'vuex'
import mpdV1 from './modules/mpd-v1'
import mpdV2 from './modules/mpd-v2'
import mainForm from './modules/main-form'
import console from './modules/console'
import headerTop from './modules/header-top'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    mpdV1,
    mpdV2,
    mainForm,
    console,
    headerTop
  }
})
