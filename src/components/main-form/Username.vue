<template>
  <div class="username-form-content js-username-form-content inactive-username-form">
    <div class="ui grid form">
      <div class="eight wide column left aligned">
        <label>Identifiant</label>
        <input class="fluid" placeholder="Identifiant" type="text" title="username" :value="getUsername"
               @input="updateUsername"/>
      </div>
      <div class="eight wide column left aligned">
        <label>Mot de passe</label>
        <input class="fluid" placeholder="Mot de passe" type="password" title="password" :value="getPassword"
               @input="updatePassword"/>
      </div>
    </div>
  </div>
</template>
<script>
import {createNamespacedHelpers} from 'vuex'
import * as actions from '../../store/modules/main-form/main-form-action-types'
// import $ from 'jquery'

const {mapGetters, mapActions} = createNamespacedHelpers('MainForm')

export default {
  name: 'MainForm',
  computed: {
    ...mapGetters([
      'getUsername',
      'getPassword'
    ])
  },
  methods: {
    ...mapActions({
      'updateUsername': actions.EDIT_USERNAME,
      'updatePassword': actions.EDIT_PASSWORD
    })
  }
}
</script>

<style scoped>
  .username-form-content {
    height: 17%;
    width: 0;
    position: fixed;
    z-index: 1;
    top: 0;
    right: 0;
    background-color: #FFF;
    overflow-x: hidden;
    padding-top: 60px;
    transition: 0.5s;
  }

  .username-form-content div {
    margin-top: 0;
    padding-left: 28px !important;
  }

  .username-form-content label {
    font-weight: 600;
  }

  @media screen and (max-height: 450px) {
    .username-form-content {padding-top: 15px;}
  }

  .active-username-form {
    width: 600px;
  }

  .inactive-username-form {
    width: 0;
  }
</style>
