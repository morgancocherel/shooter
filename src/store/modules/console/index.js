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
  [mutationTypes.SET_NEW_REQUEST_TO_CONSOLE] (state, data) {
    state.allRequest.push({
      requestSent: data.requestSent,
      responseReceived: data.response
    })
  }
}

const actions = {
  [actionTypes.EDIT_NEW_REQUEST_TO_CONSOLE] ({commit}, request) {
    commit(mutationTypes.SET_NEW_REQUEST_TO_CONSOLE, request)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
