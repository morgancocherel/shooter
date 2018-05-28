import * as actionTypes from './main-form-action-types'
import * as mutationTypes from './main-form-mutation-types'
import { callServiceNoAccountRef } from '../../../core/main'
import * as constShooter from '../../const'

const state = {
  username: constShooter.mainForm.username,
  password: constShooter.mainForm.password,
  allEnvironments: constShooter.mainForm.allEnvironments,
  environment: constShooter.mainForm.environment,
  currentHealthCheck: constShooter.mainForm.currentHealthCheck,
  currentEnvVersion: constShooter.mainForm.currentEnvVersion,
  loadingHealthCheck: constShooter.mainForm.loadingHealthCheck
}

const getters = {
  getUsername: state => state.username,
  getPassword: state => state.password,
  getAllEnvironments: state => state.allEnvironments,
  getEnvironment: state => state.environment,
  getCurrentHealthCheck: state => state.currentHealthCheck,
  getCurrentEnvVersion: state => state.currentEnvVersion,
  getLoadingHealthCheck: state => state.loadingHealthCheck
}

const mutations = {
  [mutationTypes.SET_ENV] (state, environment) {
    state.environment = environment
  },
  [mutationTypes.SET_USERNAME] (state, username) {
    state.username = username
  },
  [mutationTypes.SET_PASSWORD] (state, password) {
    state.password = password
  },
  [mutationTypes.SET_CURRENT_HEALTHCHECK] (state, response) {
    state.currentHealthCheck = response
  },
  [mutationTypes.SET_CURRENT_ENV_VERSION] (state, response) {
    state.currentEnvVersion = response
  },
  [mutationTypes.SET_LOADING_HEALTH_CHECK] (state, boolean) {
    state.loadingHealthCheck = boolean
  }
}

const actions = {
  [actionTypes.EDIT_ENV] ({commit, dispatch}, environment) {
    console.log(environment.target)
    let env = environment.target.value
    commit(mutationTypes.SET_ENV, env)
    // dispatch(actionTypes.SEND_HEALTH_CHECK, env)
  },
  [actionTypes.EDIT_USERNAME] ({commit}, username) {
    commit(mutationTypes.SET_USERNAME, username.target.value)
  },
  [actionTypes.EDIT_PASSWORD] ({commit}, password) {
    commit(mutationTypes.SET_PASSWORD, password.target.value)
  },
  [actionTypes.SEND_HEALTH_CHECK] ({commit}) {
    // commit(mutationTypes.SET_LOADING_HEALTH_CHECK, true)
    let method = constShooter.methods.methodGet
    let service = '/api' + constShooter.servicesMPDV1.serviceHealthcheck
    let env = state.environment
    let username = null
    let password = null
    let body = null
    let contentType = constShooter.contentType.json
    let versionmpd = null

    callServiceNoAccountRef(method, service, env, contentType, body, username, password, versionmpd)
      .then((response) => {
        let version = response.data.version
        let status = response.data.status === 200

        // timeout(commit(mutationTypes.SET_LOADING_HEALTH_CHECK, false))
        commit(mutationTypes.SET_CURRENT_ENV_VERSION, version)
        commit(mutationTypes.SET_CURRENT_HEALTHCHECK, status)
      })
      .catch(() => {
        // let status = response.data.status === 200
        // timeout(commit(mutationTypes.SET_LOADING_HEALTH_CHECK, false))
        commit(mutationTypes.SET_CURRENT_HEALTHCHECK, 'error')
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
