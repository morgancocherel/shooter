import * as mutationTypes from './proposition-mutation-types'
import * as actionTypes from './proposition-action-types'
import * as constShooter from '../../../const'
import {callService} from '../../../../core/main'
import {getBodyProposition} from '../../../../core/mpd-v2/proposition'

// import * as actionTypesConsole from '../../console/console-action-types'

const state = {
  listePropositions: constShooter.proposition.listePropositions
}

const getters = {
  getListePropositions: state => state.listePropositions
}

const mutations = {
  [mutationTypes.SET_LISTE_PROPOSITIONS] (state, list) {
    state.listePropositions = list
  }
}

const actions = {
  [actionTypes.EDIT_LISTE_PROPOSITIONS] ({commit, dispatch, rootState}) {
    let mainFormState = rootState.MainForm

    // Data required for proposition request
    let method = constShooter.methods.methodPost
    let service = '/api' + constShooter.servicesMPDV2.servicePropositions.replace(/{id}/i, constShooter.proposition.catalogueSTIF)
    let env = mainFormState.environment
    let contentType = constShooter.contentType.json
    let username = null
    let password = null
    let body = getBodyProposition()
    // let idService = 1
    console.log(method, service, env, contentType, body, username, password)
    callService(method, service, env, contentType, body, username, password)
      .then((response) => {
        console.log(response)
        // dispatch('Console/' + actionTypesConsole.EDIT_ADD_REQUEST_TO_CONSOLE, formatRequestConsole(method, service, env, body, response, idService), {root: true})
      })
      .catch((error) => {
        // let response = null
        // dispatch('Console/' + actionTypesConsole.EDIT_ADD_REQUEST_TO_CONSOLE, formatRequestConsole(method, service, env, body, response, idService), {root: true})
        console.log(error, 'Request Proposition error')
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
