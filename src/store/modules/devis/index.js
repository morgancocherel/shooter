import * as actionTypes from './devis-action-types'
import * as mutationTypes from './devis-mutation-types'
import * as constShooter from '../../const'
import { callService } from '../../../core/main'
import { addData, toDisplayDate, getBodyCTO, toDateEntered } from '../../../core/devis/index'
import { formatRequestConsole } from '../../../core/console/index'
import router from '../../../router/index'

import * as actionTypesConsole from '../console/console-action-types'
import * as actionTypesCommande from '../commande/commande-action-types'

const state = {
  devis: constShooter.devis.travelMode,
  originTrain: constShooter.devis.originTrain,
  departureDate: constShooter.devis.departureDate,
  departureTime: constShooter.devis.departureTime,
  destinationTrain: constShooter.devis.destinationTrain,
  returnDate: constShooter.devis.returnDate,
  returnTime: constShooter.devis.returnTime,
  proposalBrut: constShooter.devis.proposalBrut,
  returnForm: constShooter.devis.returnForm,
  devisIsLoading: constShooter.devis.devisIsLoading,
  travelerData: constShooter.devis.travelerData
}

const getters = {
  getDevis: state => state.devis,
  getOriginTrain: state => state.originTrain,
  getDepartureDate: state => state.departureDate,
  getDepartureTime: state => state.departureTime,
  getDestinationTrain: state => state.destinationTrain,
  getReturnDate: state => state.returnDate,
  getReturnTime: state => state.returnTime,
  getReturnForm: state => state.returnForm,
  getDevisIsLoading: state => state.devisIsLoading,
  getTravelerData: state => state.travelerData
}

const mutations = {
  [mutationTypes.SET_DEVIS] (state, devis) {
    state.devis = devis
  },
  [mutationTypes.SET_ORIGIN_TRAIN] (state, originTrain) {
    state.originTrain = originTrain
  },
  [mutationTypes.SET_DEPARTURE_DATE] (state, departureDate) {
    state.departureDate = departureDate
  },
  [mutationTypes.SET_DEPARTURE_TIME] (state, departureTime) {
    state.departureTime = departureTime
  },
  [mutationTypes.SET_DESTINATION_TRAIN] (state, destinationTrain) {
    state.destinationTrain = destinationTrain
  },
  [mutationTypes.SET_RETURN_DATE] (state, returnDate) {
    state.returnDate = returnDate
  },
  [mutationTypes.SET_RETURN_TIME] (state, returnTime) {
    state.returnTime = returnTime
  },
  [mutationTypes.SET_RETURN_FORM] (state, value) {
    state.returnForm = value === constShooter.travelMode.oneWay
  },
  [mutationTypes.SET_DEVIS_IS_LOADING] (state, boolean) {
    state.devisIsLoading = boolean
  },
  [mutationTypes.SET_TRAVELER_DATA] (state, data) {
    state.travelerData = data
  }
}

const actions = {
  [actionTypes.EDIT_DEVIS] ({commit, dispatch}, devis) {
    let value = devis.target.value
    dispatch(actionTypes.EDIT_RETURN_FORM, value)
    dispatch('Commande/' + actionTypesCommande.EDIT_HIDE_DEVIS_RESULT, true, {root: true})
    commit(mutationTypes.SET_DEVIS, value)
  },
  [actionTypes.EDIT_ORIGIN_TRAIN] ({commit, dispatch}, originTrain) {
    dispatch('Commande/' + actionTypesCommande.EDIT_HIDE_DEVIS_RESULT, true, {root: true})
    commit(mutationTypes.SET_ORIGIN_TRAIN, originTrain.target.value)
  },
  [actionTypes.EDIT_DEPARTURE_DATE] ({commit, dispatch}, departureDate) {
    dispatch('Commande/' + actionTypesCommande.EDIT_HIDE_DEVIS_RESULT, true, {root: true})
    commit(mutationTypes.SET_DEPARTURE_DATE, departureDate)
  },
  [actionTypes.EDIT_DEPARTURE_TIME] ({commit, dispatch}, departureTime) {
    dispatch('Commande/' + actionTypesCommande.EDIT_HIDE_DEVIS_RESULT, true, {root: true})
    commit(mutationTypes.SET_DEPARTURE_TIME, departureTime)
  },
  [actionTypes.EDIT_DESTINATION_TRAIN] ({commit, dispatch}, destinationTrain) {
    dispatch('Commande/' + actionTypesCommande.EDIT_HIDE_DEVIS_RESULT, true, {root: true})
    commit(mutationTypes.SET_DESTINATION_TRAIN, destinationTrain.target.value)
  },
  [actionTypes.EDIT_RETURN_DATE] ({commit, dispatch}, returnTime) {
    dispatch('Commande/' + actionTypesCommande.EDIT_HIDE_DEVIS_RESULT, true, {root: true})
    commit(mutationTypes.SET_RETURN_DATE, returnTime)
  },
  [actionTypes.EDIT_RETURN_TIME] ({commit, dispatch}, returnTime) {
    dispatch('Commande/' + actionTypesCommande.EDIT_HIDE_DEVIS_RESULT, true, {root: true})
    commit(mutationTypes.SET_RETURN_TIME, returnTime)
  },
  [actionTypes.EDIT_RETURN_FORM] ({commit}, returnForm) {
    commit(mutationTypes.SET_RETURN_FORM, returnForm)
  },
  [actionTypes.SUBMIT_DEVIS_FORM] ({commit, dispatch, rootState}) {
    commit(mutationTypes.SET_DEVIS_IS_LOADING, true)

    let mainFormState = rootState.MainForm

    // Data required for the CTO Request
    let method = constShooter.methods.methodPost
    let service = '/api' + constShooter.servicesMPD.serviceCTO
    let env = mainFormState.environment
    let contentType = constShooter.contentType.json
    let username = mainFormState.username
    let password = mainFormState.password
    let departureDate = toDateEntered(state.departureDate, state.departureTime)
    let originTrain = state.originTrain
    let destinationTrain = state.destinationTrain
    let travelerData = state.travelerData
    let body = getBodyCTO(departureDate, travelerData, originTrain, destinationTrain)
    let idService = 5

    dispatch('Commande/' + actionTypesCommande.EDIT_DATE_DISPLAY, toDisplayDate(departureDate), {root: true})

    callService(method, service, env, contentType, body, username, password)
      .then((response) => {
        let proposals = addData(response.data.trajets)
        dispatch('Commande/' + actionTypesCommande.EDIT_PROPOSAL_BRUT, proposals, {root: true})
        dispatch('Commande/' + actionTypesCommande.EDIT_DEFAULT_PROPOSAL_SELECTED, proposals[0], {root: true})
        dispatch('Commande/' + actionTypesCommande.EDIT_PRICE_SELECTED, proposals[0].proposal, {root: true})
        dispatch('Console/' + actionTypesConsole.EDIT_ADD_REQUEST_TO_CONSOLE, formatRequestConsole(method, service, env, body, response, idService), {root: true})

        router.push({path: '/trajetsOffres'})
        commit(mutationTypes.SET_DEVIS_IS_LOADING, false)
      })
      .catch((error) => {
        let response = null
        dispatch('Console/' + actionTypesConsole.EDIT_ADD_REQUEST_TO_CONSOLE, formatRequestConsole(method, service, env, body, response, idService), {root: true})
        console.log(error, 'Request CTO error')
        commit(mutationTypes.SET_DEVIS_IS_LOADING, false)
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
