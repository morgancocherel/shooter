// import * as actionTypes from './-action-types'
import * as mutationTypes from './all-request-mutation-types'

const state = {
  allRequest: null
}

const getters = {
  getAllRequest: state => state.allRequest
}

const mutations = {
  [mutationTypes.SET_ALL_REQUEST] (state, request) {
    console.log('rrr', request)
    state.allRequest = request
  }
}

const actions = {}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
