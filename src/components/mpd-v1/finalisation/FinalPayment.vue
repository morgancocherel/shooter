<template>
  <div class="ui grid main-container" data-content="middle-on-hide-console">
    <div class="eleven wide column final-payment-container active-console js-site-content">
      <div class="ui grid">
        <div class="sixteen wide column left aligned">
          <h3 class="ui header">Résultat du paiement</h3>
          <p class="sub-travel-information-reminder">
            Un email récapitulatif de confirmation sera envoyé à <strong>{{ firstname }} {{ lastname }}</strong>
            à l'adresse suivante: <strong>{{ emailTravelerContact }}</strong>
          </p>
        </div>
        <div class="eight wide column left aligned">
          <router-link class="ui button submit-button back-button" to="/mpdV1/finalisation/finTransaction">Annuler la commande</router-link>
        </div>
        <div class="eight wide column right aligned">
          <button @click="submitFinalisation"  class="ui button submit-button submit-finalisation" v-bind:class="{ loading: finalisationButtonIsLoading }">Terminer</button>
        </div>
      </div>
    </div>
    <console></console>
  </div>
</template>

<script>
import {createNamespacedHelpers} from 'vuex'
import * as actions from '../../../store/modules/mpd-v1/finalisation/finalisation-action-types'
import Console from '../../console/Console'

const {mapState, mapActions} = createNamespacedHelpers('mpdV1/finalisation')

export default {
  name: 'finalisation',
  components: {Console},
  computed: {
    ...mapState([
      'finalisationButtonIsLoading',
      'emailTravelerContact',
      'firstname',
      'lastname'
    ])
  },
  methods: {
    ...mapActions({
      'submitFinalisation': actions.SUBMIT_FINALISATION
    })
  }
}
</script>

<style scoped>
  /* Mutual styles */
  .main-container {
    margin: 0 !important;
  }

  .container {
    display: inline-flex;
    margin: 0 !important;
  }

  .final-payment-container {
    padding: 0 !important;
    margin-top: 40px;
  }

  .final-payment-container.active-console {
    padding-right: 20px !important;
  }

  .final-payment-container .ui.grid {
    margin: 0;
  }

  /* Navigation buttons */
  .final-payment-container {
    margin: 40px 0 0 0;
    display: inline-flex;
  }

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
