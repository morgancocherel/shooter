import * as mutationTypes from './console-mutation-types'
import * as actionTypes from './console-action-types'
import * as constShooter from '../../const'
import {setUpAllRequest} from '../../../core/console'

const state = {
  allRequest: constShooter.console.allRequest,
  id: constShooter.console.id
}

const getters = {
  getAllRequest: state => state.allRequest,
  getId: state => state.id
}

const mutations = {
  [mutationTypes.SET_ADD_REQUEST_TO_CONSOLE] (state, data) {
    // Set at false previous requests except for those was open/active
    setUpAllRequest(state.allRequest)

    state.allRequest.push({
      currentRequest: true,
      active: true,
      id: state.id,
      requestSent: data.requestSent,
      responseReceived: data.response
    })
    state.id = state.id + 1
  },
  [mutationTypes.CLEAR_ALL_REQUEST] (state) {
    state.allRequest = []
  }
}

const actions = {
  [actionTypes.EDIT_ADD_REQUEST_TO_CONSOLE] ({commit}, request) {
    commit(mutationTypes.SET_ADD_REQUEST_TO_CONSOLE, request)
  },
  [actionTypes.CLEAR_ALL_REQUEST] ({commit}) {
    commit(mutationTypes.CLEAR_ALL_REQUEST)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
