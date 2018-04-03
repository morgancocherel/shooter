<template>
  <div id="headerDown">
    <div class="ui grid container tiny form">
      <div class="sixteen wide column">
        <h3 class="ui header">Identifiants et environnement</h3>
      </div>
      <div class="five wide column">
        <input class="fluid" placeholder="Identifiant" type="text" title="username" :value="getUsername" @input="updateUsername" />
      </div>
      <div class="five wide column">
        <input class="fluid" placeholder="Mot de passe" type="password" title="password" :value="getPassword" @input="updatePassword" />
      </div>
      <div class="five wide column">
        <select class="ui dropdown fluid" title="environment" @input="updateEnv">
          <option v-for="env in getAllEnvironments" :key="env.id" :value="env.value">{{ env.text }}</option>
        </select>
      </div>
      <div class="one wide column">
        <div v-show="currentHealthcheck">
          <div class="content up-down-env">
            <i class="check large icon grey"></i>
            <div class="sub header">Up</div>
          </div>
        </div>
        <div v-show="!currentHealthcheck">
          <div class="content up-down-env">
            <i class="exclamation large icon grey"></i>
            <div class="sub header">Down</div>
          </div>
        </div>
      </div>
      <div class="sixteen wide column hide-show-form" id="js-hide-show-form">
        <a class="item">
          <i class="large grey angle down icon"></i>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import {createNamespacedHelpers} from 'vuex'
import * as actions from '../../store/modules/main-form/main-form-action-types'
import $ from 'jquery'

const {mapGetters, mapActions, mapState} = createNamespacedHelpers('HeaderDown')

export default {
  name: 'HeaderDown',
  computed: {
    ...mapState([
      'currentHealthcheck'
    ]),
    ...mapGetters([
      'getAllEnvironments',
      'getUsername',
      'getPassword'
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
    $(this.$el).find('#js-hide-show-form').click(function () {
      $('.five.wide.column, .one.wide.column').slideToggle()
      $(this).toggleClass('rotate')
    })
    this.sendHealthCheck()
  }
}
</script>

<style scoped>
  #headerDown {background-color: #F48A4F; }

  #headerDown .ui.header{ color: #FFF; }

  #headerDown .form{ padding-top: 0; }

  input, select{ height: 32px !important; }

  .rotate{
    -ms-transform: rotate(180deg);
    -moz-transform: rotate(180deg);
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg);
  }

  .hide-show-form{ cursor: pointer; padding: 0 !important; }
</style>
