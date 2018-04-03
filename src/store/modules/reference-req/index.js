import * as actionTypes from './references-req-action-types'
import * as mutationTypes from '../reference-req/references-req-mutation-types'
import { callService } from '../../../core/main'
import * as constShooter from '../../const'

const state = {
  allReferences: null,
  copRequestResponse: null
}

const getters = {
  getReferences: state => state.allReferences,
  getCopResponse: state => state.copRequestResponse
}

const mutations = {
  [mutationTypes.SET_REFERENCES] (state, references) {
    state.allReferences = references
  },
  [mutationTypes.SET_COP] (state, copResponse) {
    state.copRequestResponse = copResponse
  }
}

const actions = {
  [actionTypes.GET_REFERENCES] ({commit, rootState}) {
    callService(constShooter.methods.methodGet, constShooter.servicesMPD.serviceREF, rootState.HeaderDown.environment, rootState.HeaderDown.username, rootState.HeaderDown.password, null)
      .then((response) => {
        commit(mutationTypes.SET_REFERENCES, response)
      })
      .catch((error) => {
        console.log(error, 'Pas de références')
      })
  },
  [actionTypes.GET_COP] ({commit, rootState}) {
    callService(constShooter.methods.methodPost, constShooter.servicesMPD.serviceCOP, rootState.HeaderDown.environment, rootState.HeaderDown.username, rootState.HeaderDown.password, constShooter.bodyCOP)
      .then((response) => {
        commit(mutationTypes.SET_COP, response)
      })
      .catch((error) => {
        console.log(error, 'Request COP error')
      })
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
