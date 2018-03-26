<template>
  <div id="headerDown">
    <div class="ui container">
      <div class="ui medium header">Identifiants et environnement</div>
      <div class="ui tiny form" id="js-header-down-form">
        <div class="three fields">
          <div class="field">
            <input class="fluid" placeholder="Identifiant" type="text" title="username" :value="getUsername" @input="updateUsername" />
          </div>
          <div class="field">
            <input class="fluid" placeholder="Mot de passe" type="password" title="password" :value="getPassword" @input="updatePassword" />
          </div>
          <div class="field">
            <select class="ui dropdown fluid" title="environment" @input="updateEnv">
              <option v-for="env in getAllEnvironments" :key="env.id" :value="env.value">{{ env.text }}</option>
            </select>
          </div>
        </div>
      </div>
      <a class="item">
        <i id="js-hide-show-form" class="large grey angle down icon"></i>
      </a>
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
      'getPassword'
    ])
  },
  methods: {
    ...mapActions({
      'updateEnv': actions.EDIT_ENV,
      'updateUsername': actions.EDIT_USERNAME,
      'updatePassword': actions.EDIT_PASSWORD
    })
  },
  mounted () {
    $(this.$el).find('#js-hide-show-form').click(function () {
      $('#js-header-down-form').slideToggle()
      $(this).toggleClass('rotate')
    })
  }
}
</script>

<style scoped>
  #headerDown { background-color: #F48A4F; }

  #headerDown .ui.medium.header{ padding-top: 14px; }

  #headerDown .ui.form .field > label { display: flex; }

  #headerDown .ui.medium.header { color: #FFF; }

  #headerDown .item i{ cursor: pointer; }

  .rotate{
    -ms-transform: rotate(180deg);
    -moz-transform: rotate(180deg);
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg);
  }

  select{ height: 32px !important; }
</style>
