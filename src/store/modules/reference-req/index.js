import * as actionTypes from './references-req-action-types'
import * as mutationTypes from '../reference-req/references-req-mutation-types'
import { getReferences } from '../../../core/main'
import * as mainFormState from '../main-form/index'

const state = {
  allReferences: null
}

const getters = {}

const mutations = {
  [mutationTypes.SET_REFERENCES] (state, references) {
    console.log(references)
    state.references = references
  }
}

const actions = {
  [actionTypes.GET_REFERENCES] ({commit}) {
    console.log(getReferences('get', '/api/references', mainFormState.mainFormExport.environment, mainFormState.mainFormExport.username, mainFormState.mainFormExport.password))
    commit(mutationTypes.SET_REFERENCES, getReferences('get', '/api/references', mainFormState.mainFormExport.environment, mainFormState.mainFormExport.username, mainFormState.mainFormExport.password))
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
