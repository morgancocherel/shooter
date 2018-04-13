<template>
  <div class="ui grid form container">
    <div class="sixteen wide column middle aligned">
      <h3 class="ui header js-hide-show-form">Identifiants et environnement</h3>
    </div>
    <div class="four wide column username-container">
      <input class="fluid" placeholder="Identifiant" type="text" title="username" :value="getUsername"
             @input="updateUsername"/>
    </div>
    <div class="four wide column password-container">
      <input class="fluid" placeholder="Mot de passe" type="password" title="password" :value="getPassword"
             @input="updatePassword"/>
    </div>
    <div class="five wide column env-container">
      <select class="ui dropdown fluid" title="environment" @input="updateEnv">
        <option v-for="env in getAllEnvironments" :key="env.id" :value="env.value">{{ env.text }}</option>
      </select>
    </div>
    <div class="three wide column current-health-check-container">
      <div v-show="getLoadingHealthCheck">
        <div class="ui loader"></div>
      </div>
      <div v-show="getCurrentHealthCheck">
        <div class="content up-down-env">
          <i class="check large icon grey"></i>
          <h5 class="ui header current-health-check-text">Up - {{ getCurrentEnvVersion }}</h5>
        </div>
      </div>
      <div v-show="!getCurrentHealthCheck">
        <div class="content up-down-env">
          <i class="exclamation large icon grey"></i>
          <h5 class="ui header current-health-check-text">Down - {{ getCurrentEnvVersion }}</h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {createNamespacedHelpers} from 'vuex'
import * as actions from '../../store/modules/main-form/main-form-action-types'
import $ from 'jquery'

const {mapGetters, mapActions} = createNamespacedHelpers('HeaderDown')

export default {
  name: 'HeaderDown',
  computed: {
    ...mapGetters([
      'getAllEnvironments',
      'getUsername',
      'getPassword',
      'getCurrentHealthCheck',
      'getCurrentEnvVersion',
      'getLoadingHealthCheck'
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
    $(this.$el).find('.js-hide-show-form').click(function () {
      $('.current-health-check-container, .username-container, .password-container, .env-container').slideToggle()
    })
    this.sendHealthCheck()
  }
}

</script>

<style scoped>
  input, select {
    height: 32px !important;
  }

  select {
    padding: 0 7px !important;
  }

  .sixteen.wide.column .ui.header:hover{
    text-decoration: underline;
    cursor: pointer;
  }

  .username-container,
  .password-container,
  .env-container {
    padding-top: 0 !important;
  }

  .hide-show-form i {
    cursor: pointer;
    margin: 0;
  }

  .up-down-env i {
    margin: 0;
  }

  .current-health-check-container {
    padding-top: 0 !important;
  }

  .current-health-check-text {
    margin: 0;
  }

</style>
