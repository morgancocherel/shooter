import * as constShooter from '../../../const'
import * as actionTypes from './paiement-action-types'
import * as mutationTypes from './paiement-mutation-types'

const state = {
  urlIhmPaiement: constShooter.paiementMPDV.urlIhmPaiement
}

const getters = {}

const mutations = {
  [mutationTypes.SET_URL_IHM_PAIEMENT] (state, url) {
    state.urlIhmPaiement = url
  }
}

const actions = {
  [actionTypes.EDIT_URL_IHM_PAIEMENT] ({commit}, url) {
    commit(mutationTypes.SET_URL_IHM_PAIEMENT, url)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
