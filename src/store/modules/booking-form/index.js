import * as actionTypes from './booking-form-action-types'
import * as mutationTypes from './booking-form-mutation-types'

// Get the currently hour for the booking form
const today = new Date()

const state = {
  travelMode: 'AS',
  originTrain: null,
  departureDate: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
  departureTime: today.getHours(),
  destinationTrain: null,
  returnDate: 'Retour',
  returnTime: 7
}

const getters = {
  getTravelMode: state => state.travelMode,
  getOriginTrain: state => state.originTrain,
  getDepartureDate: state => state.departureDate,
  getDepartureTime: state => state.departureTime,
  getDestinationTrain: state => state.destinationTrain,
  getReturnDate: state => state.returnDate,
  getReturnTime: state => state.returnTime
}

const mutations = {
  [mutationTypes.SET_TRAVEL_MODE] (state, travelMode) {
    state.travelMode = travelMode
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
    state.returndate = returnDate
  },
  [mutationTypes.SET_RETURN_TIME] (state, returnTime) {
    state.returnTime = returnTime
  }
}

const actions = {
  [actionTypes.EDIT_TRAVEL_MODE] ({commit}, travelMode) {
    commit(mutationTypes.SET_TRAVEL_MODE, travelMode.target.value)
  },
  [actionTypes.EDIT_ORIGIN_TRAIN] ({commit}, originTrain) {
    commit(mutationTypes.SET_ORIGIN_TRAIN, originTrain.target.value)
  },
  [actionTypes.EDIT_DEPARTURE_DATE] ({commit}, departureDate) {
    commit(mutationTypes.SET_DEPARTURE_DATE, departureDate)
  },
  [actionTypes.EDIT_DEPARTURE_TIME] ({commit}, departureTime) {
    commit(mutationTypes.SET_DEPARTURE_TIME, departureTime)
  },
  [actionTypes.EDIT_DESTINATION_TRAIN] ({commit}, destinationTrain) {
    commit(mutationTypes.SET_DESTINATION_TRAIN, destinationTrain.target.value)
  },
  [actionTypes.EDIT_RETURN_DATE] ({commit}, returnTime) {
    commit(mutationTypes.SET_RETURN_DATE, returnTime)
  },
  [actionTypes.EDIT_RETURN_TIME] ({commit}, returnTime) {
    commit(mutationTypes.SET_RETURN_TIME, returnTime)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
