import * as mutationTypes from './commande-mutation-types'
import * as actionTypes from './commande-action-types'
import * as constShooter from '../../../const'
import { callServiceWithAccountRef } from '../../../../core/main'
import router from '../../../../router'

import * as actionTypesConsole from '../../console/console-action-types'
import {formatRequestConsole} from '../../../../core/console'
import * as actionTypesHeaderTop from '../../header-top/header-top-action-types'

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
  [actionTypes.SUBMIT_COMMANDE] ({dispatch, rootState}) {
    dispatch(actionTypes.EDIT_COMMANDE_IS_LOADING, true)

    let mainFormState = rootState.MainForm

    // Data required for create commande request
    let method = constShooter.methods.methodGet
    let service = '/api' + constShooter.servicesMPDV2.serviceFinalCommande.replace(/{idCommande}/i, state.idCommande)
    let env = mainFormState.environment
    let contentType = constShooter.contentType.json
    let username = null
    let password = null
    let body = null
    let versionmpd = constShooter.versionmpd.mpdv2
    let idService = 4
    let xaccountref = rootState.CompteClientMPDV2.referenceExterne
    let XConsumerCustomID = null

    callServiceWithAccountRef(method, service, env, contentType, body, username, password, versionmpd, xaccountref, XConsumerCustomID)
      .then((response) => {
        dispatch(actionTypes.EDIT_FINAL_COMMANDE_DATA, response.data)
        router.push({name: 'FinalCommandeMPDV2'})
        dispatch('Console/' + actionTypesConsole.EDIT_ADD_REQUEST_TO_CONSOLE, formatRequestConsole(method, service, env, body, response, idService, versionmpd), {root: true})
        dispatch(actionTypes.EDIT_COMMANDE_IS_LOADING, false)
      })
      .catch((error) => {
        let response = {
          data: null,
          status: error.message.split('code')[1]
        }
        dispatch('Console/' + actionTypesConsole.EDIT_ADD_REQUEST_TO_CONSOLE, formatRequestConsole(method, service, env, body, response, idService), {root: true})
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
    dispatch('HeaderTop/' + actionTypesHeaderTop.EDIT_COMMANDE_ACTIVE_STEP, false, {root: true})
    dispatch('HeaderTop/' + actionTypesHeaderTop.EDIT_DEVIS_ACTIVE_STEP, true, {root: true})

    router.push({name: 'PropositionSelected'})
  },
  [actionTypes.EDIT_COMMANDE_IS_LOADING] ({commit}, boolean) {
    commit(mutationTypes.SET_COMMANDE_IS_LOADING, boolean)
  },
  [actionTypes.SUBMIT_PAYMENT] ({dispatch, rootState}) {
    dispatch(actionTypes.EDIT_COMMANDE_IS_LOADING, true)

    let mainFormState = rootState.MainForm

    // Data required for create commande request
    let method = constShooter.methods.methodPost
    let service = '/api' + constShooter.servicesMPDV2.servicePaiementCommande.replace(/{id}/i, state.idCommande)
    let env = mainFormState.environment
    let contentType = constShooter.contentType.json
    let username = null
    let password = null
    let body = {
      email: 'mcocherel@oui.sncf',
      urlRedirection: 'https://www.google.com/'
    }
    let versionmpd = constShooter.versionmpd.mpdv2
    let idService = 5
    let xaccountref = rootState.CompteClientMPDV2.referenceExterne
    let XConsumerCustomID = constShooter.constMPDV2.xConsumerCustomID
    console.log(method, service, env, contentType, body, username, password, versionmpd, xaccountref, XConsumerCustomID)
    callServiceWithAccountRef(method, service, env, contentType, body, username, password, versionmpd, xaccountref, XConsumerCustomID)
      .then((response) => {
        console.log(response.data)
        dispatch('mpdV2/Paiment/' + actionTypes.EDIT_COMMANDE_IS_LOADING, response.data.urlIhmPaiement)
        router.push({name: 'Paiement'})
        dispatch('Console/' + actionTypesConsole.EDIT_ADD_REQUEST_TO_CONSOLE, formatRequestConsole(method, service, env, body, response, idService, versionmpd), {root: true})
        dispatch(actionTypes.EDIT_COMMANDE_IS_LOADING, false)
      })
      .catch((error) => {
        let response = {
          data: null,
          status: error.message.split('code')[1]
        }
        dispatch('Console/' + actionTypesConsole.EDIT_ADD_REQUEST_TO_CONSOLE, formatRequestConsole(method, service, env, body, response, idService), {root: true})
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
