import * as actionTypes from './devis-action-types'
import * as mutationTypes from './devis-mutation-types'
import * as constShooter from '../../../const'
import { trajetsOffres, addData, getPriceSelected, addToBasket, setProposalSelected } from '../../../../core/mpd-v1/devis/index'
import { formatRequestConsole } from '../../../../core/console/index'
import router from '../../../../router/index'

import * as actionTypesConsole from '../../console/console-action-types'
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
  listTraveler: constShooter.devis.listTraveler,
  proposalSelected: constShooter.devis.priceSelected,
  proposalBrut: constShooter.devis.proposalBrut,
  priceSelected: constShooter.devis.priceSelected,
  proposalSelectedData: constShooter.devis.proposalSelectedData,
  listStation: constShooter.devis.listStation,
  listPassengerType: constShooter.devis.listPassengerType,
  subscriptionCard: constShooter.devis.subscriptionCard,
  listTime: constShooter.devis.listTime,
  currentNum: constShooter.devis.currentNum
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
  getListTraveler: state => state.listTraveler,
  getProposalBrut: state => state.proposalBrut,
  getProposalSelected: state => state.proposalSelected,
  getPriceSelected: state => state.priceSelected,
  getProposalSelectedData: state => state.proposalSelectedData,
  getListStation: state => state.listStation,
  getCurrentNum: state => state.currentNum
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
  },
  [mutationTypes.SET_LIST_TRAVELER] (state) {
    let newPassenger =
    {
      num: state.currentNum,
      typologie: 'Adulte',
      age: 30,
      droit: 'Sana carte de réduction'
    }
    state.listTraveler.push(newPassenger)
  },
  [mutationTypes.SET_CURRENT_NUM] (state, num) {
    state.currentNum = num
  }
}

const actions = {
  [actionTypes.EDIT_DEVIS] ({commit, dispatch}, newDevis) {
    let value = newDevis.target.value
    dispatch(actionTypes.EDIT_RETURN_FORM, value)
    commit(mutationTypes.SET_DEVIS, value)
  },
  [actionTypes.EDIT_ORIGIN_TRAIN] ({commit, dispatch}, originTrain) {
    commit(mutationTypes.SET_ORIGIN_TRAIN, originTrain)
  },
  [actionTypes.EDIT_DEPARTURE_DATE] ({commit, dispatch}, departureDate) {
    commit(mutationTypes.SET_DEPARTURE_DATE, departureDate)
  },
  [actionTypes.EDIT_DEPARTURE_TIME] ({commit, dispatch}, departureTime) {
    commit(mutationTypes.SET_DEPARTURE_TIME, departureTime)
  },
  [actionTypes.EDIT_DESTINATION_TRAIN] ({commit, dispatch}, destinationTrain) {
    commit(mutationTypes.SET_DESTINATION_TRAIN, destinationTrain)
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
  [actionTypes.SUBMIT_DEVIS_FORM] ({commit, dispatch}) {
    commit(mutationTypes.SET_DEVIS_BUTTON_IS_LOADING, true)
    trajetsOffres()
      .then((fullResponse) => {
        let proposals = addData(fullResponse.response.data.trajets)
        dispatch(actionTypes.EDIT_PROPOSAL_BRUT, proposals)
        dispatch(actionTypes.EDIT_DEFAULT_PROPOSAL_SELECTED, proposals[0])
        dispatch(actionTypes.EDIT_PRICE_SELECTED, proposals[0].proposal)

        let body = fullResponse.body
        let response = fullResponse.response
        let versionmpd = constShooter.versionmpd.mpdv1
        let idService = 5
        dispatch('console/' + actionTypesConsole.EDIT_ADD_REQUEST_TO_CONSOLE, formatRequestConsole(response, idService, body, versionmpd), {root: true})

        router.push({name: 'TrajetsOffres'})
        commit(mutationTypes.SET_DEVIS_BUTTON_IS_LOADING, false)
      })
      .catch((error) => {
        // let response = {
        //   data: null,
        //   status: error.message.split('code')[1]
        // }
        // dispatch('console/' + actionTypesConsole.EDIT_ADD_REQUEST_TO_CONSOLE, formatRequestConsole(response, idService), {root: true})
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
  [actionTypes.ADD_TO_BASKET] ({commit, dispatch}) {
    dispatch(actionTypes.EDIT_DEVIS_BUTTON_IS_LOADING, true)
    addToBasket()
      .then((fullResponse) => {
        let body = fullResponse.body
        let response = fullResponse.response
        let versionmpd = constShooter.versionmpd.mpdv1
        let idCommande = response.data.idCommande
        let idService = 6
        dispatch('mpdV1/commande/' + actionTypesCommande.EDIT_ID_COMMANDE, idCommande, {root: true})
        dispatch('mpdV1/commande/' + actionTypesCommande.EDIT_PROPOSAL_SELECTED, state.proposalSelected, {root: true})
        dispatch('mpdV1/commande/' + actionTypesCommande.EDIT_PRICE_SELECTED, state.priceSelected, {root: true})
        dispatch('console/' + actionTypesConsole.EDIT_ADD_REQUEST_TO_CONSOLE, formatRequestConsole(response, idService, body, versionmpd), {root: true})
        router.push({name: 'Basket'})
        dispatch(actionTypes.EDIT_DEVIS_BUTTON_IS_LOADING, false)
      })
      .catch((error) => {
        // let response = {
        //   data: null,
        //   status: error.message.split('code')[1]
        // }
        // dispatch('console/' + actionTypesConsole.EDIT_ADD_REQUEST_TO_CONSOLE, formatRequestConsole(method, service, env, body, response, idService), {root: true})
        dispatch(actionTypes.EDIT_DEVIS_BUTTON_IS_LOADING, false)
        console.log(error, 'Request AVO error')
      })
  },
  [actionTypes.EDIT_DEVIS_BUTTON_IS_LOADING] ({commit}, boolean) {
    commit(mutationTypes.SET_DEVIS_BUTTON_IS_LOADING, boolean)
  },
  [actionTypes.EDIT_LIST_TRAVELER] ({commit, dispatch}) {
    // dispatch(actionTypes.EDIT_CURRENT_NUM, state.currentNum + 1)
    // commit(mutationTypes.SET_LIST_TRAVELER)
  },
  [actionTypes.EDIT_CURRENT_NUM] ({commit}, num) {
    commit(mutationTypes.SET_CURRENT_NUM, num)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
