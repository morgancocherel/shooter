import Vue from 'vue'
import Vuex from 'vuex'
import BookingForm from './modules/booking-form/index'
import HeaderDown from './modules/main-form/index'
import ReferenceReq from './modules/reference-req/index'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    BookingForm,
    HeaderDown,
    ReferenceReq
  }
})
