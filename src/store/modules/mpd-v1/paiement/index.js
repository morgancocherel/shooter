import * as actionTypes from './paiement-action-types'
import * as mutationTypes from './paiement-mutation-types'
// import { formatRequestConsole } from '../../../../core/console/index'
import {submitPayment} from '../../../../core/mpd-v1/paiement'
import * as constShooter from '../../../const'
import router from '../../../../router/index'

import * as actionTypesFinalisation from '../finalisation/finalisation-action-types'

const state = {
  firstname: constShooter.commande.firsname,
  lastname: constShooter.commande.lastname,
  proposalSelected: constShooter.commande.proposalSelected,
  priceSelected: constShooter.commande.priceSelected,
  emailTravelerContact: constShooter.commande.emailTravelerContact,
  paymentButtonIsLoading: constShooter.payment.paymentButtonIsLoading
}

const getters = {
  getFirstname: state => state.firstname,
  getLastname: state => state.lastname,
  getProposalSelected: state => state.proposalSelected,
  getPriceSelected: state => state.priceSelected,
  getEmailTravelerContact: state => state.emailTravelerContact,
  getPaymentButtonIsLoading: state => state.paymentButtonIsLoading
}

const mutations = {
  [mutationTypes.SET_FIRSTANME] (state, firstname) {
    state.firstname = firstname
  },
  [mutationTypes.SET_LASTANME] (state, lastname) {
    state.lastname = lastname
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
  [mutationTypes.SET_PAYMENT_BUTTON_IS_LOADING] (state, boolean) {
    state.paymentButtonIsLoading = boolean
  }
}

const actions = {
  [actionTypes.SUBMIT_PAYMENT] ({rootState, dispatch}) {
    dispatch(actionTypes.EDIT_PAYMENT_BUTTON_IS_LOADING, true)

    submitPayment()
      .then((response) => {
        dispatch('mpdV1/finalisation/' + actionTypesFinalisation.EDIT_TRAVELER_EMAIL_CONTACT, state.emailTravelerContact, {root: true})
        dispatch('mpdV1/finalisation/' + actionTypesFinalisation.EDIT_FIRSTNAME, state.firstname, {root: true})
        dispatch('mpdV1/finalisation/' + actionTypesFinalisation.EDIT_LASTNAME, state.lastname, {root: true})
        dispatch('mpdV1/finalisation/' + actionTypesFinalisation.EDIT_PROPOSAL_SELECTED, state.proposalSelected, {root: true})
        dispatch('mpdV1/finalisation/' + actionTypesFinalisation.EDIT_JETON_TRANSACTION, response.data.jetonTransaction, {root: true})
        dispatch('mpdV1/finalisation/' + actionTypesFinalisation.EDIT_DUREE_VALIDATE_JETON, response.data.dureeValiditeJeton, {root: true})
        dispatch('mpdV1/finalisation/' + actionTypesFinalisation.EDIT_URL_IHM_PAIEMENT, response.data.urlIhmPaiement, {root: true})

        // dispatch('console/' + actionTypesConsole.EDIT_ADD_REQUEST_TO_CONSOLE, formatRequestConsole(method, service, env, body, response, idService), {root: true})

        router.push({name: 'FinalTransaction'})
        dispatch(actionTypes.EDIT_PAYMENT_BUTTON_IS_LOADING, false)
      })
      .catch((error) => {
        // let response = {
        //   data: null,
        //   status: error.message.split('code')[1]
        // }
        // dispatch('console/' + actionTypesConsole.EDIT_ADD_REQUEST_TO_CONSOLE, formatRequestConsole(method, service, env, body, response, idService), {root: true})
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
  [actionTypes.EDIT_PROPOSAL_SELECTED] ({commit}, proposal) {
    commit(mutationTypes.SET_PROPOSAL_SELECTED, proposal)
  },
  [actionTypes.EDIT_PRICE_SELECTED] ({commit}, price) {
    commit(mutationTypes.SET_PRICE_SELECTED, price)
  },
  [actionTypes.EDIT_PAYMENT_BUTTON_IS_LOADING] ({commit}, boolean) {
    commit(mutationTypes.SET_PAYMENT_BUTTON_IS_LOADING, boolean)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
