import * as actionTypes from './booking-action-types'
import * as mutationTypes from './booking-mutation-types'
import * as actionTypesConsole from '../console/console-action-types'
import * as constShooter from '../../const'
import {callService, formatCTOResponse, formatRequestConsole, addId, toDisplayDate, toDateEntered} from '../../../core/main'
import router from '../../../router/index'
import $ from 'jquery'

const state = {
  devis: constShooter.booking.travelMode,
  originTrain: constShooter.booking.originTrain,
  departureDate: constShooter.booking.departureDate,
  departureTime: constShooter.booking.departureTime,
  destinationTrain: constShooter.booking.destinationTrain,
  returnDate: constShooter.booking.returnDate,
  returnTime: constShooter.booking.returnTime,
  proposalBrut: constShooter.booking.proposalBrut,
  proposalFormated: constShooter.booking.proposalFormated,
  dateDisplay: constShooter.booking.dateDisplay,
  returnForm: constShooter.booking.returnForm,
  bookingIsLoading: constShooter.booking.bookingIsLoading,
  proposalSelected: constShooter.booking.proposalSelected,
  travelerData: constShooter.booking.travelerData
}

const getters = {
  getDevis: state => state.devis,
  getOriginTrain: state => state.originTrain,
  getDepartureDate: state => state.departureDate,
  getDepartureTime: state => state.departureTime,
  getDestinationTrain: state => state.destinationTrain,
  getReturnDate: state => state.returnDate,
  getReturnTime: state => state.returnTime,
  getProposalBrut: state => state.proposalBrut,
  getProposalFormated: state => state.proposalFormated,
  getDateDisplay: state => state.dateDisplay,
  getReturnForm: state => state.returnForm,
  getBookingIsLoading: state => state.bookingIsLoading,
  getProposalSelected: state => state.proposalSelected,
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
  [mutationTypes.SET_DATE_ARRIVEE] (state, returnDate) {
    state.returnDate = returnDate
  },
  [mutationTypes.SET_RETURN_TIME] (state, returnTime) {
    state.returnTime = returnTime
  },
  [mutationTypes.SET_PROPOSAL_BRUT] (state, proposal) {
    state.proposalBrut = proposal
  },
  [mutationTypes.SET_PROPOSAL_FORMATED] (state, proposal) {
    state.proposalFormated = proposal
  },
  [mutationTypes.SET_DATE_DISPLAY] (state, date) {
    state.dateDisplay = date
  },
  [mutationTypes.SET_RETURN_FORM] (state, value) {
    state.returnForm = value === 'AR'
  },
  [mutationTypes.SET_BOOKING_IS_LOADING] (state, boolean) {
    state.bookingIsLoading = boolean
  },
  [mutationTypes.SET_PROPOSAL_SELECTED] (state, proposal) {
    state.proposalSelected = proposal
  },
  [mutationTypes.SET_TRAVELER_DATA] (state, data) {
    state.travelerData = data
  }
}

const actions = {
  [actionTypes.EDIT_DEVIS] ({commit}, devis) {
    let value = devis.target.value
    commit(mutationTypes.SET_RETURN_FORM, value)
    commit(mutationTypes.SET_DEVIS, value)
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
  [actionTypes.EDIT_DATE_ARRIVEE] ({commit}, returnTime) {
    commit(mutationTypes.SET_DATE_ARRIVEE, returnTime)
  },
  [actionTypes.EDIT_RETURN_TIME] ({commit}, returnTime) {
    commit(mutationTypes.SET_RETURN_TIME, returnTime)
  },
  [actionTypes.SWAP_ORIGIN_DESTINATION_TRAIN] ({commit}, train) {
    commit(mutationTypes.SET_ORIGIN_TRAIN, train.origin)
    commit(mutationTypes.SET_DESTINATION_TRAIN, train.destination)
  },
  [actionTypes.SUBMIT_BOOKING_FORM] ({commit, dispatch, rootState}) {
    commit(mutationTypes.SET_BOOKING_IS_LOADING, true)

    let mainFormState = rootState.HeaderDown

    // Data required for the CTO Request
    let method = constShooter.methods.methodPost
    let service = constShooter.servicesMPD.serviceCTO
    let env = mainFormState.environment
    let username = mainFormState.username
    let password = mainFormState.password
    let departureDate = toDateEntered(state.departureDate, state.departureTime)
    let originTrain = state.originTrain
    let destinationTrain = state.destinationTrain
    let travelerData = state.travelerData
    let body = getBodyCTO(departureDate, travelerData, originTrain, destinationTrain)

    commit(mutationTypes.SET_DATE_DISPLAY, toDisplayDate(departureDate))

    callService(method, service, env, username, password, body)
      .then((response) => {
        let trajets = response.data.trajets
        let CTOResponseFormated = formatCTOResponse(trajets)
        let trajetsWithId = addId(trajets)

        commit(mutationTypes.SET_PROPOSAL_FORMATED, CTOResponseFormated)
        commit(mutationTypes.SET_PROPOSAL_BRUT, trajetsWithId)
        commit(mutationTypes.SET_PROPOSAL_SELECTED, trajetsWithId[0])

        dispatch('Console/' + actionTypesConsole.EDIT_NEW_REQUEST_TO_CONSOLE, formatRequestConsole(method, service, env, body, response), {root: true})

        router.push({path: '/proposal'})

        commit(mutationTypes.SET_BOOKING_IS_LOADING, false)
      })
      .catch((error, response) => {
        // dispatch('Console/' + actionTypesConsole.EDIT_NEW_REQUEST_TO_CONSOLE, formatRequestConsole(response), {root: true})
        console.log(error, 'Request COP error')
      })
  },
  [actionTypes.EDIT_PROPOSAL_SELECTED] ({commit}, proposalId) {
    $.each(state.proposalBrut, function () {
      if (this.id.toString() === proposalId.toString()) {
        commit(mutationTypes.SET_PROPOSAL_SELECTED, this)
      }
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

function getBodyCTO (departureDate, travelerData, originTrain, destinationTrain) {
  const bodyCTO =
    {
      trajet: {
        origin: originTrain,
        destination: destinationTrain,
        departureDatetime: departureDate,
        includeTypes: 'TER'
      },
      voyageurs: travelerData,
      idDemande: 1,
      diffusion: 'HORAIRE',
      supportsMat: [
        'DIGITALISE'
      ]
    }
  return bodyCTO
}
