import * as actionTypes from './payment-action-types'
import * as mutationTypes from './payment-mutation-types'
import { callService } from '../../../core/main'
import { getBodyDPC } from '../../../core/paiement/index'
import { formatRequestConsole } from '../../../core/console/index'
import * as constShooter from '../../const'
import router from '../../../router'

import * as actionTypesFinalisation from '../finalisation/finalisation-action-types'
import * as actionTypesHeaderTop from '../header-top/header-top-action-types'
import * as actionTypesConsole from '../console/console-action-types'

const state = {
  firstname: constShooter.commande.firsname,
  lastname: constShooter.commande.lastname,
  dateDisplay: constShooter.commande.dateDisplay,
  proposalSelected: constShooter.commande.proposalSelected,
  priceSelected: constShooter.commande.priceSelected,
  emailTravelerContact: constShooter.commande.emailTravelerContact,
  idCommande: constShooter.commande.idCommande,
  paymentButtonIsLoading: constShooter.payment.paymentButtonIsLoading
}

const getters = {
  getFirstname: state => state.firstname,
  getLastname: state => state.lastname,
  getDateDisplay: state => state.dateDisplay,
  getProposalSelected: state => state.proposalSelected,
  getPriceSelected: state => state.priceSelected,
  getEmailTravelerContact: state => state.emailTravelerContact,
  getIdCommande: state => state.idCommande,
  getPaymentButtonIsLoading: state => state.paymentButtonIsLoading
}

const mutations = {
  [mutationTypes.SET_FIRSTANME] (state, firstname) {
    state.firstname = firstname
  },
  [mutationTypes.SET_LASTANME] (state, lastname) {
    state.lastname = lastname
  },
  [mutationTypes.SET_DATE_DISPLAY] (state, date) {
    state.dateDisplay = date
  },
  [mutationTypes.SET_PROPOSAL_SELECTED] (state, proposal) {
    state.proposalSelected = proposal
  },
  [mutationTypes.SET_PRICE_SELECTED] (state, price) {
    state.priceSelected = price
  },
  [mutationTypes.SET_TRAVELER_EMAIL_CONTACT] (state, email) {
    state.emailTravelerContact = email
  },
  [mutationTypes.SET_ID_COMMANDE] (state, id) {
    state.idCommande = id
  },
  [mutationTypes.SET_PAYMENT_BUTTON_IS_LOADING] (state, boolean) {
    state.paymentButtonIsLoading = boolean
  }
}

const actions = {
  [actionTypes.SUBMIT_PAYMENT] ({rootState, dispatch}) {
    dispatch(actionTypes.EDIT_PAYMENT_BUTTON_IS_LOADING, true)

    let mainFormState = rootState.MainForm

    let method = constShooter.methods.methodPost
    let service = '/api' + constShooter.servicesMPD.serviceDPC.replace(/{idCommande}/i, state.idCommande)
    let env = mainFormState.environment
    let contentType = constShooter.contentType.json
    let username = mainFormState.username
    let password = mainFormState.password
    let body = getBodyDPC(state.emailTravelerContact)
    let idService = 9

    callService(method, service, env, contentType, body, username, password)
      .then((response) => {
        dispatch('Finalisation/' + actionTypesFinalisation.EDIT_TRAVELER_EMAIL_CONTACT, state.emailTravelerContact, {root: true})
        dispatch('Finalisation/' + actionTypesFinalisation.EDIT_FIRSTNAME, state.firstname, {root: true})
        dispatch('Finalisation/' + actionTypesFinalisation.EDIT_LASTNAME, state.lastname, {root: true})
        dispatch('Finalisation/' + actionTypesFinalisation.EDIT_PROPOSAL_SELECTED, state.proposalSelected, {root: true})
        dispatch('Finalisation/' + actionTypesFinalisation.EDIT_JETON_TRANSACTION, response.data.jetonTransaction, {root: true})
        dispatch('Finalisation/' + actionTypesFinalisation.EDIT_DUREE_VALIDATE_JETON, response.data.dureeValiditeJeton, {root: true})
        dispatch('Finalisation/' + actionTypesFinalisation.EDIT_URL_IHM_PAIEMENT, response.data.urlIhmPaiement, {root: true})

        dispatch('HeaderTop/' + actionTypesHeaderTop.EDIT_PAYMENT_ACTIVE_STEP, false, {root: true})
        dispatch('HeaderTop/' + actionTypesHeaderTop.EDIT_FINALISATION_ACTIVE_STEP, true, {root: true})

        dispatch('Console/' + actionTypesConsole.EDIT_ADD_REQUEST_TO_CONSOLE, formatRequestConsole(method, service, env, body, response, idService), {root: true})

        router.push({path: '/soap/finTransaction'})
        dispatch(actionTypes.EDIT_PAYMENT_BUTTON_IS_LOADING, false)
      })
      .catch((error) => {
        let response = null
        dispatch('Console/' + actionTypesConsole.EDIT_ADD_REQUEST_TO_CONSOLE, formatRequestConsole(method, service, env, body, response, idService), {root: true})
        console.log(error, 'Request DPC error')
        dispatch(actionTypes.EDIT_PAYMENT_BUTTON_IS_LOADING, false)
      })
  },
  [actionTypes.EDIT_TRAVELER_EMAIL_CONTACT] ({commit}, email) {
    commit(mutationTypes.SET_TRAVELER_EMAIL_CONTACT, email)
  },
  [actionTypes.EDIT_FIRSTANME] ({commit}, firstname) {
    commit(mutationTypes.SET_FIRSTANME, firstname)
  },
  [actionTypes.EDIT_LASTANME] ({commit}, lastname) {
    commit(mutationTypes.SET_LASTANME, lastname)
  },
  [actionTypes.EDIT_DATE_DISPLAY] ({commit}, date) {
    commit(mutationTypes.SET_DATE_DISPLAY, date)
  },
  [actionTypes.EDIT_PROPOSAL_SELECTED] ({commit}, proposal) {
    commit(mutationTypes.SET_PROPOSAL_SELECTED, proposal)
  },
  [actionTypes.EDIT_PRICE_SELECTED] ({commit}, price) {
    commit(mutationTypes.SET_PRICE_SELECTED, price)
  },
  [actionTypes.EDIT_ID_COMMANDE] ({commit}, id) {
    commit(mutationTypes.SET_ID_COMMANDE, id)
  },
  [actionTypes.EDIT_PAYMENT_BUTTON_IS_LOADING] ({commit}, boolean) {
    commit(mutationTypes.SET_PAYMENT_BUTTON_IS_LOADING, boolean)
  },
  [actionTypes.RETURN_TO_BASKET] ({dispatch}) {
    dispatch('HeaderTop/' + actionTypesHeaderTop.EDIT_PAYMENT_ACTIVE_STEP, false, {root: true})
    dispatch('HeaderTop/' + actionTypesHeaderTop.EDIT_COMMANDE_ACTIVE_STEP, true, {root: true})

    router.push({path: '/commandes/current/voyages'})
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
