import * as mutationTypes from './console-mutation-types'
import * as actionTypes from './console-action-types'
import * as constShooter from '../../const'

const state = {
  allRequest: constShooter.console.allRequest
}

const getters = {
  getAllRequest: state => state.allRequest
}

const mutations = {
  [mutationTypes.SET_ADD_REQUEST_TO_CONSOLE] (state, data) {
    console.log(data)
    /*
    state.allRequest.push({
      requestSent: data.requestSent,
      responseReceived: data.response
    })
    */
  }
}

const actions = {
  [actionTypes.EDIT_ADD_REQUEST_TO_CONSOLE] ({commit}, request) {
    console.log(request)
    // commit(mutationTypes.SET_ADD_REQUEST_TO_CONSOLE, request)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
