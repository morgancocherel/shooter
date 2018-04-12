import * as actionTypes from './main-form-action-types'
import * as mutationTypes from './main-form-mutation-types'
import { healthCheck } from '../../../core/main'
import * as constShooter from '../../const'

const state = {
  username: constShooter.mainForm.username,
  password: constShooter.mainForm.password,
  allEnvironments: constShooter.mainForm.allEnvironments,
  environment: constShooter.mainForm.environment,
  currentHealthCheck: constShooter.mainForm.currentHealthCheck,
  currentEnvVersion: constShooter.mainForm.currentEnvVersion
}

const getters = {
  getUsername: state => state.username,
  getPassword: state => state.password,
  getAllEnvironments: state => state.allEnvironments,
  getEnvironment: state => state.environment,
  getCurrentHealthCheck: state => state.currentHealthCheck,
  getCurrentEnvVersion: state => state.currentEnvVersion
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
  }
}

const actions = {
  [actionTypes.EDIT_ENV] ({commit, dispatch}, environment) {
    let env = environment.target.value
    commit(mutationTypes.SET_ENV, env)
    dispatch(actionTypes.SEND_HEALTH_CHECK, env)
  },
  [actionTypes.EDIT_USERNAME] ({commit}, username) {
    commit(mutationTypes.SET_USERNAME, username.target.value)
  },
  [actionTypes.EDIT_PASSWORD] ({commit}, password) {
    commit(mutationTypes.SET_PASSWORD, password.target.value)
  },
  [actionTypes.SEND_HEALTH_CHECK] ({commit}) {
    healthCheck(constShooter.methods.methodGet, constShooter.servicesMPD.serviceHealthcheck, state.environment)
      .then((response) => {
        let version = response.data.version
        let status = response.data.status === 200

        commit(mutationTypes.SET_CURRENT_ENV_VERSION, version)
        commit(mutationTypes.SET_CURRENT_HEALTHCHECK, status)
      })
      .catch((response) => {
        let status = response.data.status === 200
        commit(mutationTypes.SET_CURRENT_HEALTHCHECK, status)
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
