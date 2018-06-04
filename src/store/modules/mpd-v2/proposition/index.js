import * as mutationTypes from './proposition-mutation-types'
import * as actionTypes from './proposition-action-types'
import * as constShooter from '../../../const'
import { getProposionsCatalogueSelected, removeFalseProposal, submitPropositionSelected, createNewCommande } from '../../../../core/mpd-v2/proposition'
// import { formatRequestConsole } from '../../../../core/console'
import router from '../../../../router'

// import * as actionTypesConsole from '../../console/console-action-types'
import * as actionTypesCommande from '../../mpd-v2/commande/commande-action-types'

const state = {
  listProposition: constShooter.proposition.listProposition,
  idProposition: constShooter.proposition.idProposition,
  quantite: constShooter.proposition.quantite,
  totalAffiche: constShooter.proposition.totalAffiche,
  proposalSelected: constShooter.proposition.proposalSelected,
  returnToProposition: constShooter.proposition.returnToProposition,
  message: constShooter.error.message,
  responseDataError: constShooter.error.responseDataError,
  propositionIsLoading: constShooter.proposition.propositionIsLoading,
  listCatalogue: constShooter.proposition.listCatalogue,
  catalogueSelected: constShooter.proposition.catalogueSelected
}

const getters = {
  getlistProposition: state => state.listProposition,
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
    state.listProposition = list
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
  },
  [mutationTypes.SET_CATALOGUE_SELECTED] (state, cat) {
    state.catalogueSelected = cat
  }
}

const actions = {
  [actionTypes.GET_PROPOSITIONS_CATALOGUE_SELECTED] ({dispatch}) {
    dispatch(actionTypes.EDIT_PROPOSITION_IS_LOADING, true)

    let cat = state.catalogueSelected

    getProposionsCatalogueSelected(cat)
      .then((response) => {
        dispatch(actionTypes.EDIT_LISTE_PROPOSITIONS, removeFalseProposal(response.data.propositions))
        // dispatch('console/' + actionTypesConsole.EDIT_ADD_REQUEST_TO_CONSOLE, formatRequestConsole(response, idService, versionmpd), {root: true})
        router.push({name: 'Proposition'})
        dispatch(actionTypes.EDIT_PROPOSITION_IS_LOADING, false)
      })
      .catch((error) => {
        // let response = {
        //   data: null,
        //   status: error.message.split('code')[1]
        // }
        // dispatch('console/' + actionTypesConsole.EDIT_ADD_REQUEST_TO_CONSOLE, formatRequestConsole(method, service, env, body, response, idService, versionmpd), {root: true})
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

    let idProp = state.idProposition

    submitPropositionSelected(idProp)
      .then((response) => {
        dispatch(actionTypes.EDIT_PROPOSITION_SELECTED, response.data)
        router.push({name: 'PropositionSelected'})
        // dispatch('console/' + actionTypesConsole.EDIT_ADD_REQUEST_TO_CONSOLE, formatRequestConsole(method, service, env, body, response, idService, versionmpd), {root: true})
      })
      .catch((error) => {
        // let response = {
        //   data: state.responseDataError,
        //   status: error.message.split('code')[1]
        // }
        // dispatch('console/' + actionTypesConsole.EDIT_ADD_REQUEST_TO_CONSOLE, formatRequestConsole(method, service, env, body, response, idService, versionmpd), {root: true})
        console.log(error, 'Request Proposition selected error')
      })
  },
  [actionTypes.CREATE_NEW_COMMANDE] ({dispatch}) {
    let idProposition = state.idProposition
    let quantite = state.quantite
    let totalAffiche = state.totalAffiche

    createNewCommande(idProposition, quantite, totalAffiche)
      .then((response) => {
        dispatch('mpdV2/commande/' + actionTypesCommande.EDIT_ID_COMMANDE, response.data.idCommande, {root: true})
        router.push({name: 'Commande'})
        // dispatch('console/' + actionTypesConsole.EDIT_ADD_REQUEST_TO_CONSOLE, formatRequestConsole(response, idService), {root: true})
      })
      .catch((error) => {
        // let response = {
        //   data: state.responseDataError,
        //   status: error.message.split('code')[1]
        // }
        // dispatch('console/' + actionTypesConsole.EDIT_ADD_REQUEST_TO_CONSOLE, formatRequestConsole(method, service, env, body, response, idService), {root: true})
        console.log(error, 'Erreur lors de la création de la commande')
        // dispatch(actionTypes.EDIT_MESSAGE, error.message)
      })
  },
  [actionTypes.EDIT_PROPOSITION_SELECTED] ({commit}, prop) {
    commit(mutationTypes.SET_PROPOSITION_SELECTED, prop)
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
  },
  [actionTypes.EDIT_CATALOGUE_SELECTED] ({commit}, cat) {
    commit(mutationTypes.SET_CATALOGUE_SELECTED, cat.target.value)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
