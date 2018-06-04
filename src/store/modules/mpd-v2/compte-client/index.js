import * as actionTypes from './compte-client-action-types'
import * as mutationTypes from './compte-client-mutation-types'
import * as constShooter from '../../../const'
import {createAccountClient} from '../../../../core/mpd-v2/compte-client'
import {formatRequestConsole} from '../../../../core/console'
import router from '../../../../router'
import * as actionTypesConsole from '../../console/console-action-types'

const state = {
  createAccountClientSubmitIsLoading: constShooter.compteclient.createAccountClientSubmitIsLoading,
  referenceExterne: constShooter.compteclient.referenceExterne
}

const getters = {
  getCreateAccountClientSubmitIsLoading: state => state.createAccountClientSubmitIsLoading,
  getReferenceExterne: state => state.referenceExterne
}

const mutations = {
  [mutationTypes.SET_CREATE_ACCOUNT_CLIENT_SUBMIT_IS_LOADING] (state, boolean) {
    state.createAccountClientSubmitIsLoading = boolean
  },
  [mutationTypes.SET_REFERENCE_EXTERNE] (state, ref) {
    state.referenceExterne = ref
  }
}

const actions = {
  [actionTypes.CREATE_ACCOUNT_CLIENT] ({dispatch}) {
    dispatch(actionTypes.CREATE_ACCOUNT_CLIENT_SUBMIT_IS_LOADING, true)
    let idService = 5
    createAccountClient()
      .then((response) => {
        dispatch(actionTypes.EDIT_REFERENCE_EXTERNE, response.data.referenceExterne)
        router.push({name: 'Catalogue'})
        dispatch('console/' + actionTypesConsole.EDIT_ADD_REQUEST_TO_CONSOLE, formatRequestConsole(response, idService), {root: true})
        dispatch(actionTypes.CREATE_ACCOUNT_CLIENT_SUBMIT_IS_LOADING, false)
      })
      .catch((error) => {
        let response = {
          data: null,
          status: error.message.split('code')[1]
        }
        dispatch('console/' + actionTypesConsole.EDIT_ADD_REQUEST_TO_CONSOLE, formatRequestConsole(response, idService), {root: true})
        console.log(error, 'Request création compte client error')
        dispatch(actionTypes.CREATE_ACCOUNT_CLIENT_SUBMIT_IS_LOADING, false)
      })
  },
  [actionTypes.CREATE_ACCOUNT_CLIENT_SUBMIT_IS_LOADING] ({commit}, boolean) {
    commit(mutationTypes.SET_CREATE_ACCOUNT_CLIENT_SUBMIT_IS_LOADING, boolean)
  },
  [actionTypes.EDIT_REFERENCE_EXTERNE] ({commit}, ref) {
    commit(mutationTypes.SET_REFERENCE_EXTERNE, ref)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
