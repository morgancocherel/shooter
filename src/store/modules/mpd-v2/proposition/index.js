import * as mutationTypes from './proposition-mutation-types'
import * as actionTypes from './proposition-action-types'
import * as constShooter from '../../../const'
import {callService} from '../../../../core/main'
import {getBodyProposition, removeFalseProposal, getBodyCreateCommande} from '../../../../core/mpd-v2/proposition'
import { formatRequestConsole } from '../../../../core/console'
import router from '../../../../router'

import * as actionTypesCommande from '../commande/commande-action-types'
import * as actionTypesConsole from '../../console/console-action-types'
import * as actionTypesHeaderTop from '../../header-top/header-top-action-types'

const state = {
  listePropositions: constShooter.proposition.listePropositions,
  idProposition: constShooter.proposition.idProposition,
  quantite: constShooter.proposition.quantite,
  totalAffiche: constShooter.proposition.totalAffiche,
  proposalSelected: constShooter.proposition.proposalSelected,
  returnToProposition: constShooter.proposition.returnToProposition,
  message: constShooter.error.message,
  responseDataError: constShooter.error.responseDataError,
  propositionIsLoading: constShooter.proposition.propositionIsLoading
}

const getters = {
  getListePropositions: state => state.listePropositions,
  getIdProposition: state => state.idProposition,
  getQuantite: state => state.quantite,
  getTotalAffiche: state => state.totalAffiche,
  getProposalSelected: state => state.proposalSelected,
  getReturnToProposition: state => state.returnToProposition,
  getMessage: state => state.message,
  getPropositionIsLoading: state => state.propositionIsLoading
}

const mutations = {
  [mutationTypes.SET_LISTE_PROPOSITIONS] (state, list) {
    state.listePropositions = list
  },
  [mutationTypes.SET_ID_PROPOSITION] (state, id) {
    state.idProposition = id
  },
  [mutationTypes.SET_QUANTITE] (state, quant) {
    state.quantite = quant
  },
  [mutationTypes.SET_TOTAL_AFFICHE] (state, total) {
    state.totalAffiche = total
  },
  [mutationTypes.SET_PROPOSITION_SELECTED] (state, prop) {
    state.proposalSelected = prop
  },
  [mutationTypes.SET_RETURN_TO_PROPOSITION] (state, boolean) {
    state.returnToProposition = boolean
  },
  [mutationTypes.SET_MESSAGE] (state, message) {
    state.message = message
  },
  [mutationTypes.SET_PROPOSITION_IS_LOADING] (state, prop) {
    state.propositionIsLoading = prop
  }
}

const actions = {
  [actionTypes.SUBMIT_PROPOSITION] ({dispatch, rootState}) {
    dispatch(actionTypes.EDIT_PROPOSITION_IS_LOADING, true)

    let mainFormState = rootState.MainForm

    // Data required for proposition request
    let method = constShooter.methods.methodPost
    let service = '/api' + constShooter.servicesMPDV2.servicePropositions.replace(/{id}/i, constShooter.proposition.catalogueSTIF)
    let env = mainFormState.environment
    let contentType = constShooter.contentType.json
    let username = null
    let password = null
    let body = getBodyProposition()
    let versionMPD = constShooter.versionMPD.mpdv2
    let idService = 1

    callService(method, service, env, contentType, body, username, password, versionMPD)
      .then((response) => {
        dispatch(actionTypes.EDIT_LISTE_PROPOSITIONS, removeFalseProposal(response.data.propositions))
        dispatch('Console/' + actionTypesConsole.EDIT_ADD_REQUEST_TO_CONSOLE, formatRequestConsole(method, service, env, body, response, idService, versionMPD), {root: true})
        dispatch(actionTypes.EDIT_PROPOSITION_IS_LOADING, false)
      })
      .catch((error) => {
        dispatch('Console/' + actionTypesConsole.EDIT_ADD_REQUEST_TO_CONSOLE, formatRequestConsole(method, service, env, body, state.responseDataError, idService, versionMPD), {root: true})
        console.log(error, 'Request Proposition error')
        dispatch(actionTypes.EDIT_PROPOSITION_IS_LOADING, false)
      })
  },
  [actionTypes.EDIT_LISTE_PROPOSITIONS] ({commit}, list) {
    commit(mutationTypes.SET_LISTE_PROPOSITIONS, list)
  },
  [actionTypes.SUBMIT_PROPOSITION_SELECTED] ({dispatch, rootState}, data) {
    dispatch(actionTypes.EDIT_ID_PROPOSITION, data.idProposition)
    dispatch(actionTypes.EDIT_QUANTITE, data.amount)
    dispatch(actionTypes.EDIT_TOTAL_AFFICHE, data.priceCalculated)
    dispatch('mpdV2/Commande/' + actionTypesCommande.EDIT_ID_PROPOSITION, data.idProposition, {root: true})
    dispatch('mpdV2/Commande/' + actionTypesCommande.EDIT_QUANTITE, data.amount, {root: true})
    dispatch('mpdV2/Commande/' + actionTypesCommande.EDIT_TOTAL_AFFICHE, data.priceCalculated, {root: true})

    let mainFormState = rootState.MainForm

    // Data required for proposition request
    let method = constShooter.methods.methodGet
    let service = '/api' + constShooter.servicesMPDV2.servicePropositionSelected.replace(/{idProposition}/i, state.idProposition)
    let env = mainFormState.environment
    let contentType = constShooter.contentType.json
    let username = null
    let password = null
    let body = null
    let versionMPD = constShooter.versionMPD.mpdv2
    let idService = 2

    callService(method, service, env, contentType, body, username, password, versionMPD)
      .then((response) => {
        dispatch(actionTypes.EDIT_PROPOSITION_SELECTED, response.data)
        router.push({name: 'PropositionSelected'})
        dispatch('Console/' + actionTypesConsole.EDIT_ADD_REQUEST_TO_CONSOLE, formatRequestConsole(method, service, env, body, response, idService, versionMPD), {root: true})
      })
      .catch((error) => {
        dispatch('Console/' + actionTypesConsole.EDIT_ADD_REQUEST_TO_CONSOLE, formatRequestConsole(method, service, env, body, state.responseDataError, idService, versionMPD), {root: true})
        console.log(error, 'Request Proposition selected error')
      })
  },
  [actionTypes.EDIT_PROPOSITION_SELECTED] ({commit}, prop) {
    commit(mutationTypes.SET_PROPOSITION_SELECTED, prop)
  },
  [actionTypes.CREATE_NEW_COMMANDE] ({dispatch, rootState}) {
    dispatch(actionTypes.EDIT_PROPOSITION_IS_LOADING, true)

    let mainFormState = rootState.MainForm

    // Data required for create commande request
    let method = constShooter.methods.methodPost
    let service = '/api' + constShooter.servicesMPDV2.serviceCreateCommande
    let env = mainFormState.environment
    let contentType = constShooter.contentType.json
    let username = null
    let password = null
    let body = getBodyCreateCommande(state.idProposition, state.quantite, state.totalAffiche)
    let versionMPD = constShooter.versionMPD.mpdv2
    let idService = 3

    callService(method, service, env, contentType, body, username, password, versionMPD)
      .then((response) => {
        dispatch('mpdV2/Commande/' + actionTypesCommande.EDIT_ID_COMMANDE, response.data.idCommande, {root: true})
        router.push({name: 'Commande'})
        dispatch('Console/' + actionTypesConsole.EDIT_ADD_REQUEST_TO_CONSOLE, formatRequestConsole(method, service, env, body, response, idService), {root: true})
        dispatch('HeaderTop/' + actionTypesHeaderTop.EDIT_DEVIS_ACTIVE_STEP, false, {root: true})
        dispatch('HeaderTop/' + actionTypesHeaderTop.EDIT_COMMANDE_ACTIVE_STEP, true, {root: true})
        dispatch(actionTypes.EDIT_PROPOSITION_IS_LOADING, false)
      })
      .catch((error) => {
        let response = {
          data: state.responseDataError,
          status: error.message.split('code')[1]
        }
        dispatch('Console/' + actionTypesConsole.EDIT_ADD_REQUEST_TO_CONSOLE, formatRequestConsole(method, service, env, body, response, idService), {root: true})
        dispatch(actionTypes.EDIT_MESSAGE, error.message)
        dispatch(actionTypes.EDIT_PROPOSITION_IS_LOADING, false)
      })
  },
  [actionTypes.EDIT_ID_PROPOSITION] ({commit}, id) {
    commit(mutationTypes.SET_ID_PROPOSITION, id)
  },
  [actionTypes.EDIT_QUANTITE] ({commit}, quant) {
    commit(mutationTypes.SET_QUANTITE, quant)
  },
  [actionTypes.EDIT_TOTAL_AFFICHE] ({commit}, total) {
    commit(mutationTypes.SET_TOTAL_AFFICHE, total)
  },
  [actionTypes.EDIT_RETURN_TO_PROPOSITION] ({commit}, boolean) {
    commit(mutationTypes.SET_RETURN_TO_PROPOSITION, boolean)
  },
  [actionTypes.RETURN_TO_PROPOSITION] ({dispatch}) {
    dispatch(actionTypes.EDIT_RETURN_TO_PROPOSITION, true)
    router.push({name: 'Proposition'})
  },
  [actionTypes.EDIT_MESSAGE] ({commit}, message) {
    commit(mutationTypes.SET_MESSAGE, message)
  },
  [actionTypes.EDIT_PROPOSITION_IS_LOADING] ({commit}, prop) {
    commit(mutationTypes.SET_PROPOSITION_IS_LOADING, prop)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
