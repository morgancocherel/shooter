import Vue from 'vue'
import Vuex from 'vuex'
import mpdV1 from './modules/mpd-v1'
import mpdV2 from './modules/mpd-v2'
import MainForm from './modules/main-form/index'
import Console from './modules/console/index'
import HeaderTop from './modules/header-top/index'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    mpdV1,
    mpdV2,
    MainForm,
    Console,
    HeaderTop
  }
})
