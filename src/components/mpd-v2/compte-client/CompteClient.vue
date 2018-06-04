<template>
    <div class="ui grid main-container">
      <div class="eleven wide column client-account-container active-console js-site-content">
        <h1 class="ui header">Compte client</h1>
        <router-link class="ui button submit-button back-button" to="/">Retour</router-link>
        <button class="ui button submit-button create-account-client" @click="createClientAccount" v-bind:class="{ loading: createAccountClientSubmitIsLoading }">Créer un compte client</button>
      </div>
      <console></console>
    </div>
</template>

<script>
import Console from '../../console/Console'
import { createNamespacedHelpers } from 'vuex'
import * as actions from '../../../store/modules/mpd-v2/compte-client/compte-client-action-types'

const {mapState, mapActions} = createNamespacedHelpers('mpdV2/compteClient')

export default {
  name: 'compteClient',
  components: { Console },
  computed: {
    ...mapState([
      'createAccountClientSubmitIsLoading'
    ])
  },
  methods: {
    ...mapActions({
      'createClientAccount': actions.CREATE_ACCOUNT_CLIENT
    })
  }
}
</script>

<style scoped>
  .main-container {
    margin: 0 !important;
  }

  .client-account-container {
    padding: 0 !important;
    margin-top: 40px;
  }

  .client-account-container.active-console {
    padding-right: 20px !important;
  }

  h1.ui.header {
    margin-bottom: 1rem;
  }

  /* navigation buttons */
  .submit-button {
    color: #FFF;
    padding: 12px 22px;
    border-radius: 0.3125em;
    text-transform: uppercase;
    font-weight: 400;
  }

  .back-button {
    background-color: #8C9DA1;
    color: #FFF;
  }

  .back-button:hover {
    background-color: #7e9196;
    color: #FFF;
  }

  .create-account-client {
    background-color: #01C3A7;
  }

  .create-account-client:hover,
  .create-account-client:focus {
    background-color: #01aa91;
    border-color: #01aa91;
    color: #FFF;
  }
</style>
