<template>
  <div class="main-form-content js-main-form-content inactive-main-form">
    <div class="ui grid form">
      <div class="sixteen wide column right aligned">
        <button type="button" tabindex="11" title="close" class="close-sidebar js-close-sidebar"></button>
      </div>
      <div class="eight wide column left aligned">
        <label>Identifiant</label>
        <input class="fluid input-username" placeholder="Identifiant" type="text" title="username" :value="username"
               @input="updateUsername"/>
      </div>
      <div class="eight wide column left aligned">
        <label>Mot de passe</label>
        <input class="fluid input-password" placeholder="Mot de passe" type="password" title="password" :value="password"
               @input="updatePassword"/>
      </div>
      <div class="ten wide column left aligned">
        <label>Environnement</label>
        <select class="ui dropdown fluid env-select" title="environment" @input="updateEnv">
          <option v-for="env in allEnvironments" :value="env" :key="env" :selected="env === environment">{{ env }}</option>
        </select>
      </div>
      <div class="six wide column center aligned middle aligned current-health-check-container">
        <label>Version</label>
        <div v-show="currentHealthCheck" class="health-check-icon-text">
          <div class="content up-down-env">
            <i class="check large icon grey"></i>
            <h5 class="ui header current-health-check-text">Up - {{ currentEnvVersion }}</h5>
          </div>
        </div>
        <div v-show="!currentHealthCheck" class="health-check-icon-text">
          <div class="content up-down-env">
            <i class="exclamation large icon grey"></i>
            <h5 class="ui header current-health-check-text">Down</h5>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {createNamespacedHelpers} from 'vuex'
import * as actions from '../../store/modules/main-form/main-form-action-types'
import $ from 'jquery'

const {mapState, mapActions} = createNamespacedHelpers('mainForm')

export default {
  name: 'mainForm',
  computed: {
    ...mapState([
      'allEnvironments',
      'environment',
      'currentHealthCheck',
      'currentEnvVersion',
      'username',
      'password'
    ])
  },
  methods: {
    ...mapActions({
      'updateEnv': actions.EDIT_ENV,
      'updateUsername': actions.EDIT_USERNAME,
      'updatePassword': actions.EDIT_PASSWORD,
      'sendHealthCheck': actions.SEND_HEALTH_CHECK
    })
  },
  mounted () {
    // this.sendHealthCheck()

    $('.js-close-sidebar').click(function () {
      $('.js-main-form-content').toggleClass('inactive-main-form')
      $('.js-main-form-content').toggleClass('active-main-form')
    })
  }
}
</script>

<style scoped>
  .main-form-content {
    height: 30%;
    width: 0;
    position: fixed;
    z-index: 1;
    top: 0;
    right: 0;
    background-color: #FFF;
    overflow-x: hidden;
    margin-top: 60px;
    transition: 0.5s;
  }

  .main-form-content div {
    margin: 0;
  }

  .main-form-content label {
    font-weight: 600;
  }

  .current-health-check-text {
    margin: 0;
  }

  .current-health-check-container label {
    color: #FFF;
  }

  .close-sidebar i:hover {
    opacity: 1.0;
  }

  button.close-sidebar:hover {
    opacity: 1;
    cursor: pointer;
  }

  button.close-sidebar {
    width: 30px;
    height: 30px;
    border: none;
    background: url('../../assets/closeIcon.svg') no-repeat center center transparent;
    background-size: 20px 20px;
    opacity: 0.5;
  }

  .health-check-icon-text,
  .env-select{
    margin-top: 7px;
  }

  /* active - inactive sidebar */

  .active-main-form {
    width: 600px;
  }

  .inactive-main-form {
    width: 0;
  }
</style>
