<template>
  <div>
    <sidebar></sidebar>
    <header-top></header-top>
    <main-form></main-form>
    <div class="ui grid container">
      <div class="sixteen wide column left aligned">
        <h3 class="ui header">Finalisation paiement</h3>
        <p class="sub-travel-information-reminder">Une email a été envoyé à l'adresse suivante.</p>
      </div>
      <div class="eight wide column left aligned">
        <router-link to="/commandes"><button class="ui button submit-button back-button">Annuler la commande</button></router-link>
      </div>
      <div class="eight wide column right aligned">
        <button @click="submitCommande"  class="ui button submit-button submit-finalisation" v-bind:class="{ loading: getTransactionIsLoading }">Terminer</button>
      </div>
    </div>
  </div>
</template>

<script>
import {createNamespacedHelpers} from 'vuex'
import HeaderTop from '../header-top/HeaderTop'
import MainForm from '../main-form/MainForm'
import Sidebar from '../console/Console'
import * as actions from '../../store/modules/finalisation/finalisation-action-types'

const {mapGetters, mapActions} = createNamespacedHelpers('Finalisation')

export default {
  name: 'Finalisation',
  components: {Sidebar, MainForm, HeaderTop},
  computed: {
    ...mapGetters([
      'getTransactionIsLoading'
    ])
  },
  methods: {
    ...mapActions({
      'submitCommande': actions.SUBMIT_COMMANDE
    })
  }
}
</script>

<style scoped>
  /* Navigation buttons */
  .submit-button {
    color: #FFF;
    padding: 12px 22px;
    border-radius: 0.3125em;
    text-transform: uppercase;
    font-weight: 400;
  }

  .submit-finalisation {
    background-color: #01C3A7;
  }

  .submit-finalisation:hover,
  .submit-finalisation:focus {
    background-color: #01aa91;
    border-color: #01aa91;
    color: #FFF;
  }

  .back-button {
    background-color: #8C9DA1;
    color: #FFF;
  }

  .back-button:hover {
    background-color: #7e9196;
    color: #FFF;
  }
</style>
