import Vue from 'vue'
import Vuex from 'vuex'
import Booking from './modules/booking/index'
import HeaderDown from './modules/main-form/index'
import ReferenceReq from './modules/reference-req/index'
import AllRequest from './modules/all-request/index'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Booking,
    HeaderDown,
    ReferenceReq,
    AllRequest
  }
})
