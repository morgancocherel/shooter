import * as mutationTypes from './commande-mutation-types'
import * as actionTypes from './commande-action-types'
import * as constShooter from '../../../const'
import router from '../../../../router'
import { consultOrderInProgress, submitPayment } from '../../../../core/mpd-v2/commande'
import * as actionTypesPaiement from '../paiement/paiement-action-types'

const state = {
  idCommande: constShooter.commandeMPDV2.idCommande,
  finalCommandeData: constShooter.commandeMPDV2.finalCommandeData,
  quantite: constShooter.commandeMPDV2.quantite,
  totalAffiche: constShooter.commandeMPDV2.totalAffiche,
  idProposition: constShooter.commandeMPDV2.idProposition,
  commandeIsLoading: constShooter.commandeMPDV2.commandeIsLoading
}

const getters = {
  getIdCommande: state => state.idCommande,
  getFinalCommandeData: state => state.finalCommandeData,
  getTotalAffiche: state => state.totalAffiche,
  getQuantite: state => state.quantite,
  getIdProposition: state => state.idProposition,
  getCommandeIsLoading: state => state.commandeIsLoading
}

const mutations = {
  [mutationTypes.SET_ID_COMMANDE] (state, id) {
    state.idCommande = id
  },
  [mutationTypes.SET_FINAL_COMMANDE_DATA] (state, data) {
    state.finalCommandeData = data
  },
  [mutationTypes.SET_QUANTITE] (state, quant) {
    state.quantite = quant
  },
  [mutationTypes.SET_TOTAL_AFFICHE] (state, total) {
    state.totalAffiche = total
  },
  [mutationTypes.SET_ID_PROPOSITION] (state, id) {
    state.idProposition = id
  },
  [mutationTypes.SET_COMMANDE_IS_LOADING] (state, boolean) {
    state.commandeIsLoading = boolean
  }
}

const actions = {
  [actionTypes.EDIT_ID_COMMANDE] ({commit}, id) {
    commit(mutationTypes.SET_ID_COMMANDE, id)
  },
  [actionTypes.CONSULT_ORDER_IN_PROGRESS] ({dispatch}) {
    dispatch(actionTypes.EDIT_COMMANDE_IS_LOADING, true)

    let idCommande = state.idCommande

    consultOrderInProgress(idCommande)
      .then((response) => {
        dispatch(actionTypes.EDIT_FINAL_COMMANDE_DATA, response.data)
        router.push({name: 'FinalCommandeMPDV2'})
        // dispatch('console/' + actionTypesConsole.EDIT_ADD_REQUEST_TO_CONSOLE, formatRequestConsole(method, service, env, body, response, idService, versionmpd), {root: true})
        dispatch(actionTypes.EDIT_COMMANDE_IS_LOADING, false)
      })
      .catch((error) => {
        // let response = {
        //   data: null,
        //   status: error.message.split('code')[1]
        // }
        // dispatch('console/' + actionTypesConsole.EDIT_ADD_REQUEST_TO_CONSOLE, formatRequestConsole(method, service, env, body, response, idService), {root: true})
        console.log(error, 'Request Commande error')
        dispatch(actionTypes.EDIT_COMMANDE_IS_LOADING, false)
      })
  },
  [actionTypes.EDIT_FINAL_COMMANDE_DATA] ({commit}, data) {
    commit(mutationTypes.SET_FINAL_COMMANDE_DATA, data)
  },
  [actionTypes.EDIT_QUANTITE] ({commit}, quant) {
    commit(mutationTypes.SET_QUANTITE, quant)
  },
  [actionTypes.EDIT_TOTAL_AFFICHE] ({commit}, total) {
    commit(mutationTypes.SET_TOTAL_AFFICHE, total)
  },
  [actionTypes.EDIT_ID_PROPOSITION] ({commit}, id) {
    commit(mutationTypes.SET_ID_PROPOSITION, id)
  },
  [actionTypes.RETURN_TO_PROPOSITION_SELECTED] ({dispatch}) {
    router.push({name: 'PropositionSelected'})
  },
  [actionTypes.EDIT_COMMANDE_IS_LOADING] ({commit}, boolean) {
    commit(mutationTypes.SET_COMMANDE_IS_LOADING, boolean)
  },
  [actionTypes.SUBMIT_PAYMENT] ({dispatch}) {
    dispatch(actionTypes.EDIT_COMMANDE_IS_LOADING, true)

    submitPayment()
      .then((response) => {
        dispatch('mpdV2/paiement/' + actionTypesPaiement.EDIT_URL_IHM_PAIEMENT, response.data.urlIhmPaiement, {root: true})
        router.push({name: 'PaiementMPDV2'})
        // dispatch('console/' + actionTypesConsole.EDIT_ADD_REQUEST_TO_CONSOLE, formatRequestConsole(method, service, env, body, response, idService, versionmpd), {root: true})
        dispatch(actionTypes.EDIT_COMMANDE_IS_LOADING, false)
      })
      .catch((error) => {
        // let response = {
        //   data: null,
        //   status: error.message.split('code')[1]
        // }
        // dispatch('console/' + actionTypesConsole.EDIT_ADD_REQUEST_TO_CONSOLE, formatRequestConsole(method, service, env, body, response, idService), {root: true})
        console.log(error, 'Request demande paiement error')
        dispatch(actionTypes.EDIT_COMMANDE_IS_LOADING, false)
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
