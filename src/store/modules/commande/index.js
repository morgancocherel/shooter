import * as mutationTypes from './commande-mutation-types'
import * as actionTypes from './commande-action-types'
import * as constShooter from '../../const'
import { getPriceSelected, setProposalSelected, setOffreSelected } from '../../../core/commande'
import { callService } from '../../../core/main'
import router from '../../../router'

import * as actionTypesPayment from '../paiement/payment-action-types'
import * as actionTypesFinalisation from '../finalisation/finalisation-action-types'
import * as actionTypesHeaderTop from '../header-top/header-top-action-types'

const state = {
  dateDisplay: constShooter.commande.dateDisplay,
  proposalBrut: constShooter.commande.proposalBrut,
  proposalSelected: constShooter.commande.priceSelected,
  priceSelected: constShooter.commande.priceSelected,
  proposalSelectedData: constShooter.commande.proposalSelectedData,
  idCommande: constShooter.commande.idCommande,
  allCivilities: constShooter.commande.allCivilities,
  civility: constShooter.commande.civility,
  firstname: constShooter.commande.firsname,
  lastname: constShooter.commande.lastname,
  dayBirth: constShooter.commande.dayBirth,
  monthBirth: constShooter.commande.monthBirth,
  yearBirth: constShooter.commande.yearBirth,
  allMonths: constShooter.commande.allMonths,
  allTravelers: constShooter.commande.allTravelers,
  emailTravelerContact: constShooter.commande.emailTravelerContact,
  travelerContact: constShooter.commande.travelerContact
}

const getters = {
  getDateDisplay: state => state.dateDisplay,
  getProposalBrut: state => state.proposalBrut,
  getProposalSelected: state => state.proposalSelected,
  getPriceSelected: state => state.priceSelected,
  getProposalSelectedData: state => state.proposalSelectedData,
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
  getTravelerContact: state => state.travelerContact
}

const mutations = {
  [mutationTypes.SET_DATE_DISPLAY] (state, date) {
    state.dateDisplay = date
  },
  [mutationTypes.SET_PROPOSAL_BRUT] (state, proposal) {
    state.proposalBrut = proposal
  },
  [mutationTypes.SET_PROPOSAL_SELECTED] (state, proposal) {
    state.proposalSelected = proposal
  },
  [mutationTypes.SET_PRICE_SELECTED] (state, price) {
    state.priceSelected = price
  },
  [mutationTypes.SET_PROPOSAL_SELECTED_DATA] (state, data) {
    state.proposalSelectedData = {
      id: data.id,
      classSelected: data.classSelected
    }
  },
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
  }
}

const actions = {
  [actionTypes.EDIT_ORIGIN_TRAIN] ({commit}, originTrain) {
    commit(mutationTypes.SET_ORIGIN_TRAIN, originTrain.target.value)
  },
  [actionTypes.EDIT_DESTINATION_TRAIN] ({commit}, destinationTrain) {
    commit(mutationTypes.SET_DESTINATION_TRAIN, destinationTrain.target.value)
  },
  [actionTypes.EDIT_DATE_DISPLAY] ({commit}, date) {
    commit(mutationTypes.SET_DATE_DISPLAY, date)
  },
  [actionTypes.EDIT_PROPOSAL_BRUT] ({commit}, proposals) {
    commit(mutationTypes.SET_PROPOSAL_BRUT, proposals)
  },
  [actionTypes.EDIT_DEFAULT_PROPOSAL_SELECTED] ({commit}, proposal) {
    proposal.proposal.secondClass.selected = true
    commit(mutationTypes.SET_PROPOSAL_SELECTED, proposal)
  },
  [actionTypes.EDIT_PROPOSAL_SELECTED] ({commit, dispatch}, proposals) {
    let proposalBrut = state.proposalBrut
    let proposalSelectedData = state.proposalSelectedData
    commit(mutationTypes.SET_PROPOSAL_SELECTED, setProposalSelected(proposalBrut, proposals, proposalSelectedData))

    let proposalSelected = state.proposalSelected.proposal

    // Set the proposal selected data for the next one
    let classStored = proposalSelected.firstClass.selected ? constShooter.classes.premiere : constShooter.classes.deuxieme
    if (proposals.classSelected === constShooter.classes.noClass) {
      proposalSelectedData.classSelected = classStored
    }
    commit(mutationTypes.SET_PROPOSAL_SELECTED_DATA, proposalSelectedData)

    // Set the price and class selected
    dispatch(actionTypes.EDIT_PRICE_SELECTED, proposalSelected)
  },
  [actionTypes.EDIT_PRICE_SELECTED] ({commit}, price) {
    commit(mutationTypes.SET_PRICE_SELECTED, getPriceSelected(price))
  },
  [actionTypes.EDIT_PROPOSAL_SELECTED_DATA] ({commit}, data) {
    commit(mutationTypes.SET_PROPOSAL_SELECTED_DATA, data)
  },
  [actionTypes.ADD_TO_BASKET] ({commit, dispatch, rootState}) {
    let mainFormState = rootState.MainForm
    let method = constShooter.methods.methodPost
    let service = '/api' + constShooter.servicesMPD.serviceAVOnew
    let env = mainFormState.environment
    let contentType = constShooter.contentType.json
    let username = mainFormState.username
    let password = mainFormState.password
    let body = setOffreSelected(state.proposalSelected.voyage, state.proposalSelected.proposal.classSelected)

    callService(method, service, env, contentType, body, username, password)
      .then((response) => {
        let idCommande = response.data.idCommande
        dispatch(actionTypes.EDIT_ID_COMMANDE, idCommande)
        dispatch('Finalisation/' + actionTypesFinalisation.EDIT_ID_COMMANDE, idCommande, {root: true})
        router.push({path: '/commandes/current/voyages'})
      })
      .catch((error, response) => {
        console.log(error, 'Request AVO error')
      })
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
    let mainFormState = rootState.MainForm
    let method = constShooter.methods.methodGet
    let service = '/api' + constShooter.servicesMPD.serviceCCM.replace(/{idCommande}/i, state.idCommande)
    let env = mainFormState.environment
    let contentType = constShooter.contentType.json
    let username = mainFormState.username
    let password = mainFormState.password
    let body = null

    callService(method, service, env, contentType, body, username, password)
      .then((response) => {
        dispatch('Payment/' + actionTypesPayment.EDIT_TRAVELER_EMAIL_CONTACT, state.emailTravelerContact, {root: true})
        dispatch('Payment/' + actionTypesPayment.EDIT_FIRSTANME, state.firstname, {root: true})
        dispatch('Payment/' + actionTypesPayment.EDIT_LASTANME, state.lastname, {root: true})
        dispatch('Payment/' + actionTypesPayment.EDIT_DATE_DISPLAY, state.dateDisplay, {root: true})
        dispatch('Payment/' + actionTypesPayment.EDIT_PROPOSAL_SELECTED, state.proposalSelected, {root: true})
        dispatch('Payment/' + actionTypesPayment.EDIT_PRICE_SELECTED, state.priceSelected, {root: true})
        dispatch('Payment/' + actionTypesPayment.EDIT_ID_COMMANDE, state.idCommande, {root: true})

        let id = response.data.voyages[0].offres[0].operationDistributions[0].id
        dispatch('Finalisation/' + actionTypesFinalisation.EDIT_OPERATION_DISTRIBUTION_ID, id, {root: true})

        dispatch('HeaderTop/' + actionTypesHeaderTop.EDIT_COMMANDE_ACTIVE_STEP, false, {root: true})
        dispatch('HeaderTop/' + actionTypesHeaderTop.EDIT_PAYMENT_ACTIVE_STEP, true, {root: true})
        router.push({path: '/commandes'})
      })
      .catch((error) => {
        console.log(error, 'Request CTO error')
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
