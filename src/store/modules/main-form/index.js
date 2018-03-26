import * as actionTypes from './main-form-action-types'
import * as mutationTypes from './main-form-mutation-types'

const state = {
  username: 'mpdWEB',
  password: 'mpdWEB',
  allEnvironments: [
    { id: 1, text: 'integ1 public', value: 'integ1 public' },
    { id: 2, text: 'cur1 mobile', value: 'cur1 mobile' },
    { id: 3, text: 'cur1 private', value: 'cur1 private' },
    { id: 4, text: 'cur1 public', value: 'cur1 public' },
    { id: 5, text: 'Pipeline public', value: 'Pipeline public' },
    { id: 6, text: 'Pipeline mobile', value: 'Pipeline mobile' },
    { id: 7, text: 'usn1 public', value: 'usn1 public' }
  ],
  environment: 'integ1 public'
}

const getters = {
  getAllEnvironments: state => state.allEnvironments,
  getUsername: state => state.username,
  getPassword: state => state.password
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
  }
}

const actions = {
  [actionTypes.EDIT_ENV] ({commit}, environment) {
    commit(mutationTypes.SET_ENV, environment.target.value)
  },
  [actionTypes.EDIT_USERNAME] ({commit}, username) {
    commit(mutationTypes.SET_USERNAME, username.target.value)
  },
  [actionTypes.EDIT_PASSWORD] ({commit}, password) {
    commit(mutationTypes.SET_PASSWORD, password.target.value)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}

export const mainFormExport = {
  environment: state.environment,
  username: state.username,
  password: state.password
}
