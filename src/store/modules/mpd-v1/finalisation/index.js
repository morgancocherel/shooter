import * as mutationTypes from './finalisation-mutation-types'
import * as actionTypes from './finalisation-action-types'
import * as constShooter from '../../../const'
import router from '../../../../router/index'
import { callServiceNoAccountRef } from '../../../../core/main'
import { getBodyRRP, getBodyFRC } from '../../../../core/finalisation/index'
import { formatRequestConsole } from '../../../../core/console/index'

import * as actionTypesHeaderTop from '../../header-top/header-top-action-types'
import * as actionTypesConsole from '../../console/console-action-types'

const state = {
  emailTravelerContact: constShooter.commande.emailTravelerContact,
  firstname: constShooter.commande.firstname,
  lastname: constShooter.commande.lastname,
  proposalSelected: constShooter.commande.proposalSelected,
  jetonTransaction: constShooter.finalisation.jetonTransaction,
  dureeValiditeJeton: constShooter.finalisation.dureeValiditeJeton,
  urlIhmPaiement: constShooter.finalisation.urlIhmPaiement,
  operationDistributionId: constShooter.finalisation.operationDistributionId,
  idCommande: constShooter.commande.idCommande,
  finalData: constShooter.finalisation.finalData,
  finalisationButtonIsLoading: constShooter.finalisation.finalisationButtonIsLoading
}

const getters = {
  getEmailTravelerContact: state => state.emailTravelerContact,
  getFirstname: state => state.firstname,
  getLastname: state => state.lastname,
  getProposalSelected: state => state.proposalSelected,
  getJetonTransaction: state => state.jetonTransaction,
  getDureeValiditeJeton: state => state.dureeValiditeJeton,
  getUrlIhmPaiement: state => state.urlIhmPaiement,
  getOperationDistributionId: state => state.operationDistributionId,
  getidCommande: state => state.idCommande,
  getFinalData: state => state.finalData,
  getFinalisationButtonIsLoading: state => state.finalisationButtonIsLoading
}

const mutations = {
  [mutationTypes.SET_TRAVELER_EMAIL_CONTACT] (state, email) {
    state.emailTravelerContact = email
  },
  [mutationTypes.SET_FIRSTNAME] (state, firstname) {
    state.firstname = firstname
  },
  [mutationTypes.SET_LASTNAME] (state, lastname) {
    state.lastname = lastname
  },
  [mutationTypes.SET_PROPOSAL_SELECTED] (state, proposal) {
    state.proposalSelected = proposal
  },
  [mutationTypes.SET_JETON_TRANSACTION] (state, jeton) {
    state.jetonTransaction = jeton
  },
  [mutationTypes.SET_DUREE_VALIDATE_JETON] (state, duree) {
    state.dureeValiditeJeton = duree
  },
  [mutationTypes.SET_URL_IHM_PAIEMENT] (state, url) {
    state.urlIhmPaiement = url
  },
  [mutationTypes.SET_OPERATION_DISTRIBUTION_ID] (state, id) {
    state.operationDistributionId = id
  },
  [mutationTypes.SET_ID_COMMANDE] (state, id) {
    state.idCommande = id
  },
  [mutationTypes.SET_FINAL_DATA] (state, data) {
    state.finalData = data
  },
  [mutationTypes.SET_FINALISATION_BUTTON_IS_LOADING] (state, boolean) {
    state.finalisationButtonIsLoading = boolean
  }
}

const actions = {
  [actionTypes.EDIT_TRAVELER_EMAIL_CONTACT] ({commit}, email) {
    commit(mutationTypes.SET_TRAVELER_EMAIL_CONTACT, email)
  },
  [actionTypes.EDIT_FIRSTNAME] ({commit}, firstname) {
    commit(mutationTypes.SET_FIRSTNAME, firstname)
  },
  [actionTypes.EDIT_LASTNAME] ({commit}, lastname) {
    commit(mutationTypes.SET_LASTNAME, lastname)
  },
  [actionTypes.EDIT_PROPOSAL_SELECTED] ({commit}, proposal) {
    commit(mutationTypes.SET_PROPOSAL_SELECTED, proposal)
  },
  [actionTypes.EDIT_JETON_TRANSACTION] ({commit}, jeton) {
    commit(mutationTypes.SET_JETON_TRANSACTION, jeton)
  },
  [actionTypes.EDIT_DUREE_VALIDATE_JETON] ({commit}, duree) {
    commit(mutationTypes.SET_DUREE_VALIDATE_JETON, duree)
  },
  [actionTypes.EDIT_URL_IHM_PAIEMENT] ({commit}, url) {
    commit(mutationTypes.SET_URL_IHM_PAIEMENT, url)
  },
  [actionTypes.SUBMIT_TRANSACTION] ({commit, dispatch, rootState}) {
    dispatch(actionTypes.EDIT_FINALISATION_BUTTON_IS_LOADING, true)

    let mainFormState = rootState.MainForm

    let method = constShooter.methods.methodPost
    let service = '/api' + constShooter.servicesMPDV1.serviceRRP
    let env = mainFormState.environment
    let contentType = constShooter.contentType.xml
    let username = mainFormState.username
    let password = mainFormState.password
    let body = getBodyRRP(state.jetonTransaction)
    let idService = 10

    callServiceNoAccountRef(method, service, env, contentType, body, username, password)
      .then((response) => {
        dispatch('Console/' + actionTypesConsole.EDIT_ADD_REQUEST_TO_CONSOLE, formatRequestConsole(method, service, env, body, response, idService), {root: true})

        router.push({name: 'FinalPayment'})
        dispatch(actionTypes.EDIT_FINALISATION_BUTTON_IS_LOADING, false)
      })
      .catch((error) => {
        let response = null
        dispatch('Console/' + actionTypesConsole.EDIT_ADD_REQUEST_TO_CONSOLE, formatRequestConsole(method, service, env, body, response, idService), {root: true})

        console.log(error, 'Request RRP error')
        dispatch(actionTypes.EDIT_FINALISATION_BUTTON_IS_LOADING, false)
      })
  },
  [actionTypes.EDIT_OPERATION_DISTRIBUTION_ID] ({commit}, id) {
    commit(mutationTypes.SET_OPERATION_DISTRIBUTION_ID, id)
  },
  [actionTypes.SUBMIT_FINALISATION] ({rootState, dispatch}) {
    dispatch(actionTypes.EDIT_FINALISATION_BUTTON_IS_LOADING, true)

    let mainFormState = rootState.MainForm

    let method = constShooter.methods.methodPost
    let service = '/api' + constShooter.servicesMPDV1.serviceFRC.replace(/{idCommande}/i, state.idCommande).replace(/{jetonTransaction}/i, state.jetonTransaction)
    let env = mainFormState.environment
    let contentType = constShooter.contentType.json
    let username = mainFormState.username
    let password = mainFormState.password
    let dateBirth = '1995-01-18'
    let idService = 11

    let body = getBodyFRC(state.operationDistributionId, state.lastname, state.firstname, dateBirth)
    callServiceNoAccountRef(method, service, env, contentType, body, username, password)
      .then((response) => {
        dispatch(actionTypes.EDIT_FINAL_DATA, response.data.commande)

        dispatch('Console/' + actionTypesConsole.EDIT_ADD_REQUEST_TO_CONSOLE, formatRequestConsole(method, service, env, body, response, idService), {root: true})

        router.push({name: 'FinalCommande'})
        dispatch(actionTypes.EDIT_FINALISATION_BUTTON_IS_LOADING, false)
      })
      .catch((error) => {
        let response = null
        dispatch('Console/' + actionTypesConsole.EDIT_ADD_REQUEST_TO_CONSOLE, formatRequestConsole(method, service, env, body, response, idService), {root: true})

        console.log(error, 'Request FRC error')
        dispatch(actionTypes.EDIT_FINALISATION_BUTTON_IS_LOADING, false)
      })
  },
  [actionTypes.EDIT_ID_COMMANDE] ({commit}, id) {
    commit(mutationTypes.SET_ID_COMMANDE, id)
  },
  [actionTypes.EDIT_FINAL_DATA] ({commit}, data) {
    commit(mutationTypes.SET_FINAL_DATA, data)
  },
  [actionTypes.EDIT_FINALISATION_BUTTON_IS_LOADING] ({commit}, boolean) {
    commit(mutationTypes.SET_FINALISATION_BUTTON_IS_LOADING, boolean)
  },
  [actionTypes.RETURN_TO_PAYMENT] ({dispatch}) {
    dispatch('HeaderTop/' + actionTypesHeaderTop.EDIT_FINALISATION_ACTIVE_STEP, false, {root: true})
    dispatch('HeaderTop/' + actionTypesHeaderTop.EDIT_PAYMENT_ACTIVE_STEP, true, {root: true})

    router.push({name: 'Payment'})
  },
  [actionTypes.RETURN_TO_FINAL_PAYMENT] () {
    router.push({name: 'FinalPayment'})
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
