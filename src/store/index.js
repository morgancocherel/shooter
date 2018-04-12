import Vue from 'vue'
import Vuex from 'vuex'
import Booking from './modules/booking/index'
import HeaderDown from './modules/main-form/index'
import Console from './modules/console/index'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Booking,
    HeaderDown,
    Console
  }
})
