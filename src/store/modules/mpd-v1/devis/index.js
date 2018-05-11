import * as actionTypes from './devis-action-types'
import * as mutationTypes from './devis-mutation-types'
import * as constShooter from '../../../const'
import { callService } from '../../../../core/main'
import { addData, getBodyCTO, toDateEntered, getPriceSelected, setOffreSelected, setProposalSelected } from '../../../../core/devis/index'
import { formatRequestConsole } from '../../../../core/console/index'
import router from '../../../../router/index'

import * as actionTypesConsole from '../../console/console-action-types'
import * as actionTypesFinalisation from '../finalisation/finalisation-action-types'
import * as actionTypesHeaderTop from '../../header-top/header-top-action-types'
import * as actionTypesCommande from '../commande/commande-action-types'

const state = {
  devis: constShooter.devis.travelMode,
  originTrain: constShooter.devis.originTrain,
  departureDate: constShooter.devis.departureDate,
  departureTime: constShooter.devis.departureTime,
  destinationTrain: constShooter.devis.destinationTrain,
  returnDate: constShooter.devis.returnDate,
  returnTime: constShooter.devis.returnTime,
  returnForm: constShooter.devis.returnForm,
  devisButtonIsLoading: constShooter.devis.devisButtonIsLoading,
  travelerData: constShooter.devis.travelerData,
  proposalSelected: constShooter.devis.priceSelected,
  proposalBrut: constShooter.devis.proposalBrut,
  priceSelected: constShooter.devis.priceSelected,
  proposalSelectedData: constShooter.devis.proposalSelectedData
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
  getDevisButtonIsLoading: state => state.devisButtonIsLoading,
  getTravelerData: state => state.travelerData,
  getProposalBrut: state => state.proposalBrut,
  getProposalSelected: state => state.proposalSelected,
  getPriceSelected: state => state.priceSelected,
  getProposalSelectedData: state => state.proposalSelectedData
}

const mutations = {
  [mutationTypes.SET_DEVIS] (state, newDevis) {
    state.devis = newDevis
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
  [mutationTypes.SET_DEVIS_BUTTON_IS_LOADING] (state, boolean) {
    state.devisButtonIsLoading = boolean
  }
}

const actions = {
  [actionTypes.EDIT_DEVIS] ({commit, dispatch}, newDevis) {
    let value = newDevis.target.value
    dispatch(actionTypes.EDIT_RETURN_FORM, value)
    commit(mutationTypes.SET_DEVIS, value)
  },
  [actionTypes.EDIT_ORIGIN_TRAIN] ({commit, dispatch}, originTrain) {
    commit(mutationTypes.SET_ORIGIN_TRAIN, originTrain.target.value)
  },
  [actionTypes.EDIT_DEPARTURE_DATE] ({commit, dispatch}, departureDate) {
    commit(mutationTypes.SET_DEPARTURE_DATE, departureDate)
  },
  [actionTypes.EDIT_DEPARTURE_TIME] ({commit, dispatch}, departureTime) {
    commit(mutationTypes.SET_DEPARTURE_TIME, departureTime)
  },
  [actionTypes.EDIT_DESTINATION_TRAIN] ({commit, dispatch}, destinationTrain) {
    commit(mutationTypes.SET_DESTINATION_TRAIN, destinationTrain.target.value)
  },
  [actionTypes.EDIT_RETURN_DATE] ({commit, dispatch}, returnTime) {
    commit(mutationTypes.SET_RETURN_DATE, returnTime)
  },
  [actionTypes.EDIT_RETURN_TIME] ({commit, dispatch}, returnTime) {
    commit(mutationTypes.SET_RETURN_TIME, returnTime)
  },
  [actionTypes.EDIT_RETURN_FORM] ({commit}, returnForm) {
    commit(mutationTypes.SET_RETURN_FORM, returnForm)
  },
  [actionTypes.SUBMIT_DEVIS_FORM] ({commit, dispatch, rootState}) {
    commit(mutationTypes.SET_DEVIS_BUTTON_IS_LOADING, true)

    let mainFormState = rootState.MainForm

    // Data required for the CTO Request
    let method = constShooter.methods.methodPost
    let service = '/api' + constShooter.servicesMPDV1.serviceCTO
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
    let versionMPD = constShooter.versionMPD.mpdv1

    callService(method, service, env, contentType, body, username, password, versionMPD)
      .then((response) => {
        let proposals = addData(response.data.trajets)
        dispatch(actionTypes.EDIT_PROPOSAL_BRUT, proposals)
        dispatch(actionTypes.EDIT_DEFAULT_PROPOSAL_SELECTED, proposals[0])
        dispatch(actionTypes.EDIT_PRICE_SELECTED, proposals[0].proposal)
        dispatch('Console/' + actionTypesConsole.EDIT_ADD_REQUEST_TO_CONSOLE, formatRequestConsole(method, service, env, body, response, idService), {root: true})

        router.push({name: 'TrajetsOffres'})
        commit(mutationTypes.SET_DEVIS_BUTTON_IS_LOADING, false)
      })
      .catch((error) => {
        let response = null
        dispatch('Console/' + actionTypesConsole.EDIT_ADD_REQUEST_TO_CONSOLE, formatRequestConsole(method, service, env, body, response, idService), {root: true})
        console.log(error, 'Request CTO error')
        commit(mutationTypes.SET_DEVIS_BUTTON_IS_LOADING, false)
      })
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
    dispatch(actionTypes.EDIT_DEVIS_BUTTON_IS_LOADING, true)

    let mainFormState = rootState.MainForm
    let method = constShooter.methods.methodPost
    let service = '/api' + constShooter.servicesMPDV1.serviceAVOnew
    let env = mainFormState.environment
    let contentType = constShooter.contentType.json
    let username = mainFormState.username
    let password = mainFormState.password
    let body = setOffreSelected(state.proposalSelected.voyage, state.proposalSelected.proposal.classSelected)
    let idService = 7
    let versionMPD = constShooter.versionMPD.mpdv1

    callService(method, service, env, contentType, body, username, password, versionMPD)
      .then((response) => {
        let idCommande = response.data.idCommande
        dispatch('mpdV1/Commande/' + actionTypesCommande.EDIT_ID_COMMANDE, idCommande, {root: true})
        dispatch('mpdV1/Commande/' + actionTypesCommande.EDIT_PROPOSAL_SELECTED, state.proposalSelected, {root: true})
        dispatch('mpdV1/Commande/' + actionTypesCommande.EDIT_PRICE_SELECTED, state.priceSelected, {root: true})
        dispatch('mpdV1/Finalisation/' + actionTypesFinalisation.EDIT_ID_COMMANDE, idCommande, {root: true})
        dispatch('Console/' + actionTypesConsole.EDIT_ADD_REQUEST_TO_CONSOLE, formatRequestConsole(method, service, env, body, response, idService), {root: true})

        dispatch('HeaderTop/' + actionTypesHeaderTop.EDIT_DEVIS_ACTIVE_STEP, false, {root: true})
        dispatch('HeaderTop/' + actionTypesHeaderTop.EDIT_COMMANDE_ACTIVE_STEP, true, {root: true})

        router.push({name: 'Basket'})
        dispatch(actionTypes.EDIT_DEVIS_BUTTON_IS_LOADING, false)
      })
      .catch((error) => {
        let response = null
        dispatch('Console/' + actionTypesConsole.EDIT_ADD_REQUEST_TO_CONSOLE, formatRequestConsole(method, service, env, body, response, idService), {root: true})
        dispatch(actionTypes.EDIT_DEVIS_BUTTON_IS_LOADING, false)
        console.log(error, 'Request AVO error')
      })
  },
  [actionTypes.EDIT_DEVIS_BUTTON_IS_LOADING] ({commit}, boolean) {
    commit(mutationTypes.SET_DEVIS_BUTTON_IS_LOADING, boolean)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
