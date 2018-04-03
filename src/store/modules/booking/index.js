import * as actionTypes from './booking-form-action-types'
import * as mutationTypes from './booking-form-mutation-types'
import * as mutationTypesAllRequest from '../all-request/all-request-mutation-types'
import * as constShooter from '../../const'
import {callService} from '../../../core/main'

const state = {
  devis: constShooter.booking.travelMode,
  originTrain: constShooter.booking.originTrain,
  dateDepart: constShooter.booking.dateDepart,
  departureTime: constShooter.booking.departureTime,
  destinationTrain: constShooter.booking.destinationTrain,
  dateArrivee: constShooter.booking.dateArrivee,
  returnTime: constShooter.booking.returnTime,
  proposal: constShooter.booking.proposal
}

const getters = {
  getDevis: state => state.devis,
  getOriginTrain: state => state.originTrain,
  getDateDepart: state => state.dateDepart,
  getDepartureTime: state => state.departureTime,
  getDestinationTrain: state => state.destinationTrain,
  getDateArrivee: state => state.dateArrivee,
  getReturnTime: state => state.returnTime,
  getProposal: state => state.proposal
}

const mutations = {
  [mutationTypes.SET_DEVIS] (state, devis) {
    state.devis = devis
  },
  [mutationTypes.SET_ORIGIN_TRAIN] (state, originTrain) {
    state.originTrain = originTrain
  },
  [mutationTypes.SET_DATE_DEPART] (state, dateDepart) {
    state.dateDepart = dateDepart
  },
  [mutationTypes.SET_DEPARTURE_TIME] (state, departureTime) {
    state.departureTime = departureTime
  },
  [mutationTypes.SET_DESTINATION_TRAIN] (state, destinationTrain) {
    state.destinationTrain = destinationTrain
  },
  [mutationTypes.SET_DATE_ARRIVEE] (state, dateArrivee) {
    state.dateArrivee = dateArrivee
  },
  [mutationTypes.SET_RETURN_TIME] (state, returnTime) {
    state.returnTime = returnTime
  },
  [mutationTypes.SET_PROPOSAL] (state, response) {
    state.proposal = response
  }
}

const actions = {
  [actionTypes.EDIT_DEVIS] ({commit}, devis) {
    commit(mutationTypes.SET_DEVIS, devis.target.value)
  },
  [actionTypes.EDIT_ORIGIN_TRAIN] ({commit}, originTrain) {
    commit(mutationTypes.SET_ORIGIN_TRAIN, originTrain.target.value)
  },
  [actionTypes.EDIT_DATE_DEPART] ({commit}, dateDepart) {
    commit(mutationTypes.SET_DATE_DEPART, dateDepart)
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
  [actionTypes.SUBMIT_BOOKING_FORM] ({commit, rootState}) {
    let mainFormState = rootState.HeaderDown
    let dateDepart = state.dateDepart
    let dateArrivee = state.dateArrivee
    let originTrain = state.originTrain
    let destinationTrain = state.destinationTrain

    let requestContent = null
    callService(
      constShooter.methods.methodPost,
      constShooter.servicesMPD.serviceCOH,
      mainFormState.environment,
      mainFormState.username,
      mainFormState.password,
      getBodyCOH(dateDepart, dateArrivee, originTrain, destinationTrain))
      .then((response) => {
        requestContent = response
        commit(mutationTypes.SET_PROPOSAL, response.data)
      })
      .catch((error) => {
        requestContent = error
        console.log(error, 'Request COP error')
      })
    console.log('fff', requestContent)
    commit(mutationTypesAllRequest.SET_ALL_REQUEST, requestContent)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}

function getBodyCOH (dateDepart, dateArrivee, originTrain, destinationTrain) {
  const bodyCOH =
    {
      idDemande: '0041',
      diffusion: 'HORAIRE',
      supportsMat: [
        {
          libelle: 'DIGITALISE'
        }
      ],
      itineraires: [
        {
          idItineraire: 1,
          origine: {
            uic: '87481002'
          },
          destination: {
            uic: '87471003'
          },
          dateDepart: dateDepart,
          dateArrivee: dateArrivee,
          segments: [
            {
              id: 1,
              typeNumTrain: 'SUM',
              origine: {
                uic: '87481002',
                libelle: originTrain
              },
              destination: {
                uic: '87471003',
                libellele: destinationTrain
              },
              numTrain: '856619',
              dateDepart: dateDepart,
              dateArrivee: dateArrivee,
              codeEquipement: 'TER'
            }
          ]
        }
      ],
      voyageurs: [
        {
          num: 1,
          typologie: 'Adulte',
          age: 30
        }
      ]
    }
  return bodyCOH
}
