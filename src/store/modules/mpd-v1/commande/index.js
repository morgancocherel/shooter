import * as mutationTypes from './commande-mutation-types'
import * as actionTypes from './commande-action-types'
import * as constShooter from '../../../const'
import { formatRequestConsole } from '../../../../core/console/index'
import { callServiceNoAccountRef } from '../../../../core/main'
import router from '../../../../router/index'

import * as actionTypesPaiement from '../paiement/paiement-action-types'
import * as actionTypesFinalisation from '../finalisation/finalisation-action-types'
import * as actionTypesHeaderTop from '../../header-top/header-top-action-types'
import * as actionTypesConsole from '../../console/console-action-types'

const state = {
  idCommande: constShooter.commande.idCommande,
  allCivilities: constShooter.commande.allCivilities,
  civility: constShooter.commande.civility,
  firstname: constShooter.commande.firstname,
  lastname: constShooter.commande.lastname,
  dayBirth: constShooter.commande.dayBirth,
  monthBirth: constShooter.commande.monthBirth,
  yearBirth: constShooter.commande.yearBirth,
  allMonths: constShooter.commande.allMonths,
  allTravelers: constShooter.commande.allTravelers,
  emailTravelerContact: constShooter.commande.emailTravelerContact,
  travelerContact: constShooter.commande.travelerContact,
  commandeButtonIsLoading: constShooter.commande.commandeButtonIsLoading,
  proposalSelected: constShooter.commande.proposalSelected,
  priceSelected: constShooter.commande.priceSelected
}

const getters = {
  getIdCommande: state => state.idCommande,
  getAllCivilities: state => state.allCivilities,
  getCivivilty: state => state.civility,
  getFirstname: state => state.firstname,
  getLastname: state => state.lastname,
  getDayBirth: state => state.dayBirth,
  getMonthBirth: state => state.monthBirth,
  getYearBirth: state => state.yearBirth,
  getAllMonths: state => state.allMonths,
  getAllTravelers: state => state.allTravelers,
  getEmailTravelerContact: state => state.emailTravelerContact,
  getTravelerContact: state => state.travelerContact,
  getCommandeButtonIsLoading: state => state.commandeButtonIsLoading,
  getProposalSelected: state => state.proposalSelected,
  getPriceSelected: state => state.priceSelected
}

const mutations = {
  [mutationTypes.SET_ID_COMMANDE] (state, id) {
    state.idCommande = id
  },
  [mutationTypes.SET_CIVILITY] (state, civility) {
    state.civility = civility
  },
  [mutationTypes.SET_FIRSTNAME] (state, firstname) {
    state.firstname = firstname
  },
  [mutationTypes.SET_LASTNAME] (state, lastname) {
    state.lastname = lastname
  },
  [mutationTypes.SET_DAY_BIRTH] (state, day) {
    state.dayBirth = day
  },
  [mutationTypes.SET_MONTH_BIRTH] (state, month) {
    state.monthBirth = month
  },
  [mutationTypes.SET_YEAR_BIRTH] (state, year) {
    state.yearBirth = year
  },
  [mutationTypes.SET_ALL_TRAVELERS] (state, traveler) {
    state.allTravelers.push(traveler)
  },
  [mutationTypes.SET_TRAVELER_EMAIL_CONTACT] (state, email) {
    state.emailTravelerContact = email
  },
  [mutationTypes.SET_TRAVELER_CONTACT] (state, traveler) {
    state.travelerContact = traveler
  },
  [mutationTypes.SET_COMMANDE_BUTTON_IS_LOADING] (state, boolean) {
    state.commandeButtonIsLoading = boolean
  },
  [mutationTypes.SET_PROPOSAL_SELECTED] (state, proposal) {
    state.proposalSelected = proposal
  },
  [mutationTypes.SET_PRICE_SELECTED] (state, price) {
    state.priceSelected = price
  }
}

const actions = {
  [actionTypes.EDIT_ORIGIN_TRAIN] ({commit}, originTrain) {
    commit(mutationTypes.SET_ORIGIN_TRAIN, originTrain.target.value)
  },
  [actionTypes.EDIT_DESTINATION_TRAIN] ({commit}, destinationTrain) {
    commit(mutationTypes.SET_DESTINATION_TRAIN, destinationTrain.target.value)
  },
  [actionTypes.EDIT_ID_COMMANDE] ({commit}, id) {
    commit(mutationTypes.SET_ID_COMMANDE, id)
  },
  [actionTypes.EDIT_CIVILITY] ({commit}, civility) {
    commit(mutationTypes.SET_CIVILITY, civility.target.value)
  },
  [actionTypes.EDIT_FIRSTNAME] ({commit}, firstname) {
    commit(mutationTypes.SET_FIRSTNAME, firstname.target.value)
  },
  [actionTypes.EDIT_LASTNAME] ({commit}, lastname) {
    commit(mutationTypes.SET_LASTNAME, lastname.target.value)
  },
  [actionTypes.EDIT_DAY_BIRTH] ({commit}, day) {
    commit(mutationTypes.SET_DAY_BIRTH, day.target.value)
  },
  [actionTypes.EDIT_MONTH_BIRTH] ({commit}, month) {
    commit(mutationTypes.SET_MONTH_BIRTH, month.target.value)
  },
  [actionTypes.EDIT_YEAR_BIRTH] ({commit}, year) {
    commit(mutationTypes.SET_YEAR_BIRTH, year.target.value)
  },
  [actionTypes.EDIT_ALL_TRAVELERS] ({commit}, traveler) {
    commit(mutationTypes.SET_ALL_TRAVELERS, traveler)
  },
  [actionTypes.EDIT_TRAVELER_EMAIL_CONTACT] ({commit}, email) {
    commit(mutationTypes.SET_TRAVELER_EMAIL_CONTACT, email.target.value)
  },
  [actionTypes.EDIT_TRAVELER_CONTACT] ({commit}, traveler) {
    commit(mutationTypes.SET_TRAVELER_CONTACT, traveler.target.value)
  },
  [actionTypes.CONSULT_COMMANDE_IN_PROGRESS] ({dispatch, rootState}) {
    dispatch(actionTypes.EDIT_COMMANDE_BUTTON_IS_LOADING, true)

    let mainFormState = rootState.MainForm
    let method = constShooter.methods.methodGet
    let service = '/api' + constShooter.servicesMPDV1.serviceCCM.replace(/{idCommande}/i, state.idCommande)
    let env = mainFormState.environment
    let contentType = constShooter.contentType.json
    let username = mainFormState.username
    let password = mainFormState.password
    let body = null
    let idService = 8

    callServiceNoAccountRef(method, service, env, contentType, body, username, password)
      .then((response) => {
        dispatch('mpdV1/Paiment/' + actionTypesPaiement.EDIT_TRAVELER_EMAIL_CONTACT, state.emailTravelerContact, {root: true})
        dispatch('mpdV1/Paiment/' + actionTypesPaiement.EDIT_FIRSTANME, state.firstname, {root: true})
        dispatch('mpdV1/Paiment/' + actionTypesPaiement.EDIT_LASTANME, state.lastname, {root: true})
        dispatch('mpdV1/Paiment/' + actionTypesPaiement.EDIT_PROPOSAL_SELECTED, state.proposalSelected, {root: true})
        dispatch('mpdV1/Paiment/' + actionTypesPaiement.EDIT_PRICE_SELECTED, state.priceSelected, {root: true})
        dispatch('mpdV1/Paiment/' + actionTypesPaiement.EDIT_ID_COMMANDE, state.idCommande, {root: true})

        let id = response.data.voyages[0].offres[0].operationDistributions[0].id
        dispatch('mpdV1/Finalisation/' + actionTypesFinalisation.EDIT_OPERATION_DISTRIBUTION_ID, id, {root: true})

        dispatch('HeaderTop/' + actionTypesHeaderTop.EDIT_COMMANDE_ACTIVE_STEP, false, {root: true})
        dispatch('HeaderTop/' + actionTypesHeaderTop.EDIT_PAYMENT_ACTIVE_STEP, true, {root: true})

        dispatch('Console/' + actionTypesConsole.EDIT_ADD_REQUEST_TO_CONSOLE, formatRequestConsole(method, service, env, body, response, idService), {root: true})

        router.push({name: 'Paiment'})
        dispatch(actionTypes.EDIT_COMMANDE_BUTTON_IS_LOADING, false)
      })
      .catch((error) => {
        let response = null
        dispatch(actionTypes.EDIT_COMMANDE_BUTTON_IS_LOADING, false)
        dispatch('Console/' + actionTypesConsole.EDIT_ADD_REQUEST_TO_CONSOLE, formatRequestConsole(method, service, env, body, response, idService), {root: true})
        console.log(error, 'Request CTO error')
      })
  },
  [actionTypes.EDIT_COMMANDE_BUTTON_IS_LOADING] ({commit}, boolean) {
    commit(mutationTypes.SET_COMMANDE_BUTTON_IS_LOADING, boolean)
  },
  [actionTypes.RETURN_TO_TRAJETS_OFFRES] () {
    router.push({name: 'TrajetsOffres'})
  },
  [actionTypes.EDIT_PROPOSAL_SELECTED] ({commit}, proposal) {
    commit(mutationTypes.SET_PROPOSAL_SELECTED, proposal)
  },
  [actionTypes.EDIT_PRICE_SELECTED] ({commit}, price) {
    commit(mutationTypes.SET_PRICE_SELECTED, price)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
