import * as actionTypes from './main-form-action-types'
import * as mutationTypes from './main-form-mutation-types'
import { healthCheck } from '../../../core/main'
import * as constShooter from '../../const'

const state = {
  username: constShooter.username.username,
  password: constShooter.username.password,
  allEnvironments: constShooter.env.allEnvironments,
  environment: constShooter.env.environment,
  currentHealthcheck: null
}

const getters = {
  getUsername: state => state.username,
  getPassword: state => state.password,
  getAllEnvironments: state => state.allEnvironments,
  getEnvironment: state => state.environment
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
    state.currentHealthcheck = response
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
        commit(mutationTypes.SET_CURRENT_HEALTHCHECK, response)
      })
      .catch(() => {
        commit(mutationTypes.SET_CURRENT_HEALTHCHECK, false)
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
