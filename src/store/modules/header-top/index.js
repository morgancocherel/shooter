import * as mutationTypes from './header-top-mutation-types'
import * as actionTypes from './header-top-action-types'
import * as constShooter from '../../const'
import router from '../../../router'

const state = {
  devisActiveStep: constShooter.headerTop.devisActiveStep,
  commandeActiveStep: constShooter.headerTop.commandeActiveStep,
  paymentActiveStep: constShooter.headerTop.paymentActiveStep,
  finalisationActiveStep: constShooter.headerTop.finalisationActiveStep
}

const getters = {
  getDevisActiveStep: state => state.devisActiveStep,
  getCommandeActiveStep: state => state.commandeActiveStep,
  getPaymentActiveStep: state => state.paymentActiveStep,
  getFinalisationActiveStep: state => state.finalisationActiveStep
}

const mutations = {
  [mutationTypes.SET_DEVIS_ACTIVE_STEP] (state, step) {
    state.devisActiveStep = step
  },
  [mutationTypes.SET_COMMANDE_ACTIVE_STEP] (state, step) {
    state.commandeActiveStep = step
  },
  [mutationTypes.SET_PAYMENT_ACTIVE_STEP] (state, step) {
    state.paymentActiveStep = step
  },
  [mutationTypes.SET_FINALISATION_ACTIVE_STEP] (state, step) {
    state.finalisationActiveStep = step
  }
}

const actions = {
  [actionTypes.EDIT_DEVIS_ACTIVE_STEP] ({commit}, step) {
    commit(mutationTypes.SET_DEVIS_ACTIVE_STEP, step)
  },
  [actionTypes.EDIT_COMMANDE_ACTIVE_STEP] ({commit}, step) {
    commit(mutationTypes.SET_COMMANDE_ACTIVE_STEP, step)
  },
  [actionTypes.EDIT_PAYMENT_ACTIVE_STEP] ({commit}, step) {
    commit(mutationTypes.SET_PAYMENT_ACTIVE_STEP, step)
  },
  [actionTypes.EDIT_FINALISATION_ACTIVE_STEP] ({commit}, step) {
    commit(mutationTypes.SET_FINALISATION_ACTIVE_STEP, step)
  },
  [actionTypes.GO_HOME] ({commit}) {
    commit(mutationTypes.SET_DEVIS_ACTIVE_STEP, true)
    commit(mutationTypes.SET_COMMANDE_ACTIVE_STEP, false)
    commit(mutationTypes.SET_PAYMENT_ACTIVE_STEP, false)
    commit(mutationTypes.SET_FINALISATION_ACTIVE_STEP, false)
    router.push({path: '/'})
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
